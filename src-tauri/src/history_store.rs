use crate::privacy;
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::path::Path;

pub const MAX_TEXT: usize = 64 * 1024;
const MAX_BYTES: i64 = 16 * 1024 * 1024;
pub fn now() -> i64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as i64
}
fn db_error(_: rusqlite::Error) -> String {
    "履歴DBを操作できません。空き容量とファイルの権限を確認してください".into()
}

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Entry {
    pub id: String,
    pub kind: String,
    pub text: String,
    pub created_at: i64,
    pub updated_at: i64,
    pub expires_at: i64,
    pub pinned: bool,
    pub count: i64,
    pub deleted_at: i64,
    pub origin_device_id: String,
    pub sync_state: String,
}
#[derive(Serialize)]
pub struct Stats {
    pub count: i64,
    pub bytes: i64,
}

pub struct Store {
    pub db: Connection,
    pub device: String,
}
impl Store {
    pub fn open(path: &Path) -> Result<Self, String> {
        let db = Connection::open(path).map_err(db_error)?;
        db.busy_timeout(std::time::Duration::from_secs(3))
            .map_err(db_error)?;
        db.execute_batch("PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA secure_delete=ON;
            CREATE TABLE IF NOT EXISTS history(
                owner TEXT NOT NULL, id TEXT NOT NULL, kind TEXT NOT NULL, ciphertext BLOB NOT NULL,
                bytes INTEGER NOT NULL, created INTEGER NOT NULL, updated INTEGER NOT NULL,
                expires INTEGER NOT NULL, pinned INTEGER NOT NULL DEFAULT 0, count INTEGER NOT NULL DEFAULT 1,
                deleted INTEGER NOT NULL DEFAULT 0, dirty INTEGER NOT NULL DEFAULT 1,
                uploaded INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY(owner,id));
            CREATE INDEX IF NOT EXISTS history_page ON history(owner,deleted,updated DESC);
            CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value BLOB NOT NULL);
            CREATE TABLE IF NOT EXISTS imports(owner TEXT NOT NULL,source TEXT NOT NULL,created INTEGER NOT NULL,PRIMARY KEY(owner,source));").map_err(db_error)?;
        // Move previously uploaded deletions out of the live newest-50 query.
        let tx = db.unchecked_transaction().map_err(db_error)?;
        if tx
            .execute(
                "INSERT OR IGNORE INTO settings VALUES('history-wire-v2','1')",
                [],
            )
            .map_err(db_error)?
            == 1
        {
            tx.execute(
                "UPDATE history SET dirty=1 WHERE deleted>0 AND uploaded=1",
                [],
            )
            .map_err(db_error)?;
        }
        tx.commit().map_err(db_error)?;
        let device = match db.query_row("SELECT value FROM settings WHERE key='device'", [], |r| {
            r.get::<_, String>(0)
        }) {
            Ok(value) => value,
            Err(rusqlite::Error::QueryReturnedNoRows) => {
                let value = uuid::Uuid::new_v4().simple().to_string();
                db.execute("INSERT INTO settings VALUES('device',?1)", [&value])
                    .map_err(db_error)?;
                value
            }
            Err(e) => return Err(db_error(e)),
        };
        Ok(Self { db, device })
    }
    pub fn stats(&self, owner: &str) -> Result<Stats, String> {
        self.db
            .query_row(
                "SELECT COUNT(*),COALESCE(SUM(bytes),0) FROM history WHERE owner=?1 AND deleted=0",
                [owner],
                |r| {
                    Ok(Stats {
                        count: r.get(0)?,
                        bytes: r.get(1)?,
                    })
                },
            )
            .map_err(db_error)
    }
    pub fn record(&mut self, owner: &str, text: &str, kind: &str) -> Result<(), String> {
        self.prune(owner)?;
        if text.len() > MAX_TEXT {
            return Err("64KiBを超える文字は記録しませんでした".into());
        }
        if kind != "text" && kind != "image_placeholder" {
            return Err("非対応の形式です".into());
        }
        if kind == "text" && text.trim().is_empty() {
            return Ok(());
        }
        let pending_deletes: i64 = self
            .db
            .query_row(
                "SELECT COUNT(*) FROM history WHERE owner=?1 AND deleted>0 AND dirty=1",
                [owner],
                |r| r.get(0),
            )
            .map_err(db_error)?;
        if pending_deletes >= 2000 {
            return Err(
                "削除の同期待ちが上限に達しました。接続を回復して履歴を同期してください".into(),
            );
        }
        let encrypted = privacy::seal(text.as_bytes(), owner)?;
        let last: Option<(String, Vec<u8>, String)> = self.db.query_row(
            "SELECT id,ciphertext,kind FROM history WHERE owner=?1 AND deleted=0 ORDER BY updated DESC LIMIT 1", [owner],
            |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?))).optional().map_err(db_error)?;
        if let Some((id, data, old_kind)) = last {
            if old_kind == kind && privacy::unseal(&data, owner)? == text.as_bytes() {
                self.db.execute("UPDATE history SET updated=MAX(updated+1,?3),expires=?4,count=count+1,dirty=1 WHERE owner=?1 AND id=?2",
                    params![owner,id,now(),now()+7*86400000]).map_err(db_error)?;
                return Ok(());
            }
        }
        let previous: i64 = self
            .db
            .query_row(
                "SELECT COALESCE(MAX(updated),0) FROM history WHERE owner=?1",
                [owner],
                |r| r.get(0),
            )
            .map_err(db_error)?;
        let time = now().max(previous + 1);
        let tx = self.db.transaction().map_err(db_error)?;
        tx.execute("INSERT INTO history(owner,id,kind,ciphertext,bytes,created,updated,expires) VALUES(?1,?2,?3,?4,?5,?6,?6,?7)",
            params![owner,uuid::Uuid::new_v4().simple().to_string(),kind,encrypted,text.len() as i64,time,time+7*86400000]).map_err(db_error)?;
        tx.commit().map_err(db_error)?;
        self.prune(owner)
    }
    pub fn prune(&mut self, owner: &str) -> Result<(), String> {
        let time = now();
        // Keep tombstones for offline sync. Destroy the encrypted content on deletion.
        self.db.execute("UPDATE history SET deleted=?2,updated=MAX(updated+1,?2),bytes=0,ciphertext=x'',dirty=1 WHERE owner=?1 AND deleted=0 AND pinned=0 AND expires<?2", params![owner,time]).map_err(db_error)?;
        loop {
            let stats = self.stats(owner)?;
            if stats.count <= 1000 && stats.bytes <= MAX_BYTES {
                break;
            }
            let n = self.db.execute("UPDATE history SET deleted=?2,updated=MAX(updated+1,?2),bytes=0,ciphertext=x'',dirty=1 WHERE owner=?1 AND id=(SELECT id FROM history WHERE owner=?1 AND deleted=0 AND pinned=0 ORDER BY updated LIMIT 1)", params![owner,time]).map_err(db_error)?;
            if n == 0 {
                return Err("固定した履歴で保存容量がいっぱいです。固定を解除してください".into());
            }
        }
        self.db.execute("DELETE FROM history WHERE owner=?1 AND deleted>0 AND (uploaded=0 OR (dirty=0 AND deleted<?2))", params![owner,time-14*86400000]).map_err(db_error)?;
        Ok(())
    }
    pub fn page(
        &self,
        owner: &str,
        offset: u32,
        search: &str,
        dirty: bool,
    ) -> Result<Vec<Entry>, String> {
        if offset > 1000 || search.chars().count() > 256 {
            return Err("検索範囲が大きすぎます".into());
        }
        let mut stmt = self.db.prepare(if dirty {
            "SELECT id,kind,ciphertext,created,updated,expires,pinned,count,deleted,dirty FROM history WHERE owner=?1 AND dirty=1 ORDER BY updated LIMIT 10"
        } else {
            "SELECT id,kind,ciphertext,created,updated,expires,pinned,count,deleted,dirty FROM history WHERE owner=?1 AND deleted=0 AND (pinned=1 OR expires>=?2) ORDER BY pinned DESC,updated DESC"
        }).map_err(db_error)?;
        let map = |r: &rusqlite::Row<'_>| -> rusqlite::Result<(Entry, Vec<u8>)> {
            Ok((
                Entry {
                    id: r.get(0)?,
                    kind: r.get(1)?,
                    text: String::new(),
                    created_at: r.get(3)?,
                    updated_at: r.get(4)?,
                    expires_at: r.get(5)?,
                    pinned: r.get(6)?,
                    count: r.get(7)?,
                    deleted_at: r.get(8)?,
                    origin_device_id: self.device.clone(),
                    sync_state: if r.get::<_, bool>(9)? {
                        "pending"
                    } else {
                        "synced"
                    }
                    .into(),
                },
                r.get(2)?,
            ))
        };
        let mut result = Vec::new();
        let mut skipped = 0;
        // The live expiration is bound here; avoid retaining decrypted search results.
        let current_time = now();
        let values: Vec<&dyn rusqlite::ToSql> = if dirty {
            vec![&owner]
        } else {
            vec![&owner, &current_time]
        };
        let rows = stmt.query_map(values.as_slice(), map).map_err(db_error)?;
        let query = search.to_lowercase();
        for row in rows {
            let (mut entry, data) = row.map_err(db_error)?;
            if entry.deleted_at == 0 {
                entry.text = String::from_utf8(privacy::unseal(&data, owner)?)
                    .map_err(|_| "履歴を復号できません")?;
            }
            if !query.is_empty() && !entry.text.to_lowercase().contains(&query) {
                continue;
            }
            if skipped < offset {
                skipped += 1;
                continue;
            }
            result.push(entry);
            if result.len() >= if dirty { 10 } else { 50 } {
                break;
            }
        }
        Ok(result)
    }
    pub fn mutate(&mut self, owner: &str, id: &str, action: &str) -> Result<(), String> {
        if id.len() != 32 || !id.bytes().all(|b| b.is_ascii_hexdigit()) {
            return Err("履歴IDが不正です".into());
        }
        match action {
            "delete" => {
                self.db.execute("UPDATE history SET deleted=?3,updated=MAX(updated+1,?3),bytes=0,ciphertext=x'',dirty=1 WHERE owner=?1 AND id=?2",params![owner,id,now()]).map_err(db_error)?;
            }
            "pin" => {
                let count: i64 = self
                    .db
                    .query_row(
                        "SELECT COUNT(*) FROM history WHERE owner=?1 AND pinned=1 AND deleted=0",
                        [owner],
                        |r| r.get(0),
                    )
                    .map_err(db_error)?;
                let already:bool=self.db.query_row("SELECT EXISTS(SELECT 1 FROM history WHERE owner=?1 AND id=?2 AND pinned=1 AND deleted=0)",params![owner,id],|r|r.get(0)).map_err(db_error)?;
                if count >= 100 && !already {
                    return Err("固定できるのは100件までです".into());
                }
                self.db.execute("UPDATE history SET pinned=1,updated=MAX(updated+1,?3),dirty=1 WHERE owner=?1 AND id=?2 AND deleted=0",params![owner,id,now()]).map_err(db_error)?;
            }
            "unpin" => {
                self.db.execute("UPDATE history SET pinned=0,updated=MAX(updated+1,?3),dirty=1 WHERE owner=?1 AND id=?2 AND deleted=0",params![owner,id,now()]).map_err(db_error)?;
            }
            _ => return Err("非対応の操作です".into()),
        }
        Ok(())
    }
    pub fn ack(&self, owner: &str, entry: &Entry) -> Result<(), String> {
        self.db.execute("UPDATE history SET dirty=0 WHERE owner=?1 AND id=?2 AND updated=?3 AND deleted=?4 AND count=?5 AND pinned=?6",
            params![owner,entry.id,entry.updated_at,entry.deleted_at,entry.count,entry.pinned]).map_err(db_error)?;
        Ok(())
    }
    pub fn secret(&self, key: &str) -> Result<Option<Vec<u8>>, String> {
        let value: Option<Vec<u8>> = self
            .db
            .query_row("SELECT value FROM settings WHERE key=?1", [key], |r| {
                r.get(0)
            })
            .optional()
            .map_err(db_error)?;
        value.map(|data| privacy::unseal(&data, key)).transpose()
    }
    pub fn was_imported(&self, owner: &str, source: &str) -> Result<bool, String> {
        self.db
            .query_row(
                "SELECT EXISTS(SELECT 1 FROM imports WHERE owner=?1 AND source=?2)",
                params![owner, source],
                |r| r.get(0),
            )
            .map_err(db_error)
    }
    pub fn record_import(
        &mut self,
        owner: &str,
        source: &str,
        text: &str,
        kind: &str,
    ) -> Result<bool, String> {
        if source.is_empty() || source.len() > 256 {
            return Err("Windows履歴のIDが不正です".into());
        }
        if self.was_imported(owner, source)? {
            return Ok(false);
        }
        self.record(owner, text, kind)?;
        self.db
            .execute(
                "INSERT OR IGNORE INTO imports VALUES(?1,?2,?3)",
                params![owner, source, now()],
            )
            .map_err(db_error)?;
        self.db.execute("DELETE FROM imports WHERE owner=?1 AND (created<?2 OR rowid NOT IN (SELECT rowid FROM imports WHERE owner=?1 ORDER BY created DESC,rowid DESC LIMIT 2000))",params![owner,now()-7*86400000]).map_err(db_error)?;
        Ok(true)
    }
    pub fn prune_all(&mut self) -> Result<(), String> {
        let owners: Vec<String> = {
            let mut stmt = self
                .db
                .prepare("SELECT DISTINCT owner FROM history")
                .map_err(db_error)?;
            let rows = stmt.query_map([], |r| r.get(0)).map_err(db_error)?;
            rows.collect::<Result<Vec<_>, _>>().map_err(db_error)?
        };
        for owner in owners {
            self.prune(&owner)?;
        }
        Ok(())
    }
    pub fn mark_uploading(&self, owner: &str, entries: &[Entry]) -> Result<(), String> {
        for entry in entries {
            self.db
                .execute(
                    "UPDATE history SET uploaded=1 WHERE owner=?1 AND id=?2",
                    params![owner, entry.id],
                )
                .map_err(db_error)?;
        }
        Ok(())
    }
    pub fn set_secret(&self, key: &str, value: &[u8]) -> Result<(), String> {
        self.db
            .execute(
                "INSERT OR REPLACE INTO settings(key,value) VALUES(?1,?2)",
                params![key, privacy::seal(value, key)?],
            )
            .map_err(db_error)?;
        Ok(())
    }
    pub fn save_preferences(
        &mut self,
        owner: &str,
        sync: bool,
        excluded: &[String],
    ) -> Result<(), String> {
        let key = format!("sync:{owner}");
        let flag = privacy::seal(if sync { b"true" } else { b"false" }, &key)?;
        let exclusions = privacy::seal(
            &serde_json::to_vec(excluded).map_err(|_| "設定を書き込めません")?,
            "excluded",
        )?;
        let tx = self.db.transaction().map_err(db_error)?;
        tx.execute(
            "INSERT OR REPLACE INTO settings VALUES(?1,?2)",
            params![key, flag],
        )
        .map_err(db_error)?;
        tx.execute(
            "INSERT OR REPLACE INTO settings VALUES('excluded',?1)",
            [exclusions],
        )
        .map_err(db_error)?;
        tx.commit().map_err(db_error)
    }
}
use rusqlite::OptionalExtension;

#[cfg(test)]
mod tests {
    use super::*;
    fn store() -> Store {
        Store::open(Path::new(":memory:")).unwrap()
    }
    #[test]
    fn owner_separation_unicode_and_encrypted_database() {
        let mut s = store();
        s.record("a", "日本語\nhello😀", "text").unwrap();
        assert_eq!(
            s.page("a", 0, "😀", false).unwrap()[0].text,
            "日本語\nhello😀"
        );
        assert!(s.page("b", 0, "", false).unwrap().is_empty());
        let data: Vec<u8> =
            s.db.query_row("SELECT ciphertext FROM history", [], |r| r.get(0))
                .unwrap();
        assert!(!data.windows(5).any(|part| part == b"hello"));
    }
    #[test]
    fn consecutive_duplicates_and_limit_validation() {
        let mut s = store();
        s.record("a", "same", "text").unwrap();
        s.record("a", "same", "text").unwrap();
        let page = s.page("a", 0, "", false).unwrap();
        assert_eq!(page.len(), 1);
        assert_eq!(page[0].count, 2);
        assert!(s.record("a", &"x".repeat(MAX_TEXT + 1), "text").is_err());
        assert!(s.page("a", 1001, "", false).is_err());
        assert!(s.record("a", "x", "binary").is_err());
    }
    #[test]
    fn stale_ack_cannot_clear_a_new_delete() {
        let mut s = store();
        s.record("a", "keep", "text").unwrap();
        let entry = s.page("a", 0, "", true).unwrap().remove(0);
        s.mark_uploading("a", std::slice::from_ref(&entry)).unwrap();
        s.mutate("a", &entry.id, "delete").unwrap();
        s.ack("a", &entry).unwrap();
        let dirty = s.page("a", 0, "", true).unwrap();
        assert_eq!(dirty.len(), 1);
        assert!(dirty[0].deleted_at > 0);
        assert_eq!(dirty[0].text, "");
        s.ack("a", &dirty[0]).unwrap();
        assert!(s.page("a", 0, "", true).unwrap().is_empty());
    }
    #[test]
    fn expiry_keeps_pins_and_removes_local_only_tombstones() {
        let mut s = store();
        s.record("a", "pin", "text").unwrap();
        let id = s.page("a", 0, "", false).unwrap()[0].id.clone();
        s.mutate("a", &id, "pin").unwrap();
        s.record("a", "expire", "text").unwrap();
        s.db.execute("UPDATE history SET expires=1", []).unwrap();
        s.prune("a").unwrap();
        let page = s.page("a", 0, "", false).unwrap();
        assert_eq!(page.len(), 1);
        assert_eq!(page[0].text, "pin");
        let total: i64 =
            s.db.query_row("SELECT COUNT(*) FROM history", [], |r| r.get(0))
                .unwrap();
        assert_eq!(total, 1);
    }
    #[test]
    fn images_never_store_binary_and_pages_are_bounded() {
        let mut s = store();
        s.record("a", "", "image_placeholder").unwrap();
        let page = s.page("a", 0, "", false).unwrap();
        assert_eq!(page[0].kind, "image_placeholder");
        assert_eq!(page[0].text, "");
        for n in 0..60 {
            s.record("a", &format!("text-{n}"), "text").unwrap();
        }
        assert_eq!(s.page("a", 0, "", false).unwrap().len(), 50);
        assert_eq!(s.page("a", 50, "", false).unwrap().len(), 11);
        assert_eq!(s.page("a", 0, "", true).unwrap().len(), 10);
    }
    #[test]
    fn win_v_import_is_idempotent_and_owner_scoped() {
        let mut s = store();
        assert!(s.record_import("a", "win-id-1", "日本語", "text").unwrap());
        assert!(!s.record_import("a", "win-id-1", "日本語", "text").unwrap());
        assert_eq!(s.page("a", 0, "", false).unwrap()[0].count, 1);
        assert!(s.record_import("b", "win-id-1", "日本語", "text").unwrap());
    }
}
