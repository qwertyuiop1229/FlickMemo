use crate::history_store::Store;
use std::path::Path;
#[test]
fn japanese_search_counts_characters_and_pins_are_idempotent_at_the_limit() {
    let mut store = Store::open(Path::new(":memory:")).unwrap();
    let text = "日".repeat(260);
    store.record("a", &text, "text").unwrap();
    assert_eq!(
        store.page("a", 0, &"日".repeat(256), false).unwrap().len(),
        1
    );
    assert!(store.page("a", 0, &"日".repeat(257), false).is_err());
    for n in 0..99 {
        store
            .record("a", &format!("synthetic-{n}"), "text")
            .unwrap();
    }
    store.db.execute("UPDATE history SET pinned=1", []).unwrap();
    let id = store.page("a", 0, "", false).unwrap()[0].id.clone();
    store.mutate("a", &id, "pin").unwrap();
    store.record("a", "new unpinned", "text").unwrap();
    let new_id: String = store
        .db
        .query_row("SELECT id FROM history WHERE pinned=0", [], |r| r.get(0))
        .unwrap();
    assert!(store.mutate("a", &new_id, "pin").is_err());
}
#[test]
fn retention_keeps_storage_bounded_after_one_thousand_copies() {
    let mut store = Store::open(Path::new(":memory:")).unwrap();
    for n in 0..1001 {
        store
            .record("a", &format!("synthetic-{n}"), "text")
            .unwrap();
    }
    assert_eq!(store.stats("a").unwrap().count, 1000);
    let count: i64 = store
        .db
        .query_row("SELECT COUNT(*) FROM history", [], |r| r.get(0))
        .unwrap();
    assert_eq!(count, 1000);
}
#[test]
fn migration_requeues_old_uploaded_deletions_without_modifying_live_text() {
    let path = std::env::temp_dir().join(format!(
        "FlickMemo-migration-{}.sqlite3",
        uuid::Uuid::new_v4()
    ));
    {
        let mut s = Store::open(&path).unwrap();
        s.record("a", "keep", "text").unwrap();
        s.record("a", "delete", "text").unwrap();
        s.db.execute("UPDATE history SET uploaded=1,deleted=100,updated=100,ciphertext=x'',bytes=0,dirty=0 WHERE id=(SELECT id FROM history ORDER BY updated DESC LIMIT 1)",[]).unwrap();
        s.db.execute("DELETE FROM settings WHERE key='history-wire-v2'", [])
            .unwrap();
    }
    {
        let s = Store::open(&path).unwrap();
        assert_eq!(s.page("a", 0, "", true).unwrap().len(), 2);
        assert_eq!(s.page("a", 0, "", false).unwrap()[0].text, "keep");
    }
    std::fs::remove_file(path).unwrap();
}
