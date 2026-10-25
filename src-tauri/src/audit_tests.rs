use crate::history_store::Store;
use std::path::Path;
#[test]
fn sync_recovery_preserves_disk_errors_and_old_accounts_cannot_set_new_errors() {
    let mut s = crate::Inner {
        store: Store::open(Path::new(":memory:")).unwrap(),
        owner: "a".into(),
        generation: 7,
        recording: false,
        locked: false,
        sync_enabled: true,
        session: None,
        session_verified: false,
        last_error: Some("disk error".into()),
        sync_error: Some("offline".into()),
        excluded: vec![],
        listener_ready: true,
    };
    assert!(!s.sync_result("b", 7, Some("wrong account".into())));
    assert!(!s.sync_result("a", 6, None));
    assert_eq!(s.sync_error.as_deref(), Some("offline"));
    assert!(s.sync_result("a", 7, None));
    assert!(s.sync_error.is_none());
    assert_eq!(s.last_error.as_deref(), Some("disk error"));
}
#[test]
fn settings_failure_rolls_back_sync_consent_and_exclusions_together() {
    let mut s = Store::open(Path::new(":memory:")).unwrap();
    s.save_preferences("a", false, &["old.exe".into()]).unwrap();
    s.db.execute_batch("CREATE TRIGGER fail_preference BEFORE INSERT ON settings WHEN NEW.key='excluded' BEGIN SELECT RAISE(ABORT,'synthetic disk failure'); END;").unwrap();
    assert!(s.save_preferences("a", true, &["new.exe".into()]).is_err());
    assert_eq!(s.secret("sync:a").unwrap().unwrap(), b"false");
    assert_eq!(
        serde_json::from_slice::<Vec<String>>(&s.secret("excluded").unwrap().unwrap()).unwrap(),
        vec!["old.exe"]
    );
}
#[test]
fn pin_unpin_and_delete_keep_monotonic_revisions_after_burst_copies() {
    let mut s = Store::open(Path::new(":memory:")).unwrap();
    s.record("a", "text", "text").unwrap();
    let mut entry = s.page("a", 0, "", false).unwrap().remove(0);
    let future = entry.updated_at + 5000;
    s.db.execute("UPDATE history SET updated=?1", [future])
        .unwrap();
    for action in ["pin", "unpin", "delete"] {
        s.mutate("a", &entry.id, action).unwrap();
        let updated = s.page("a", 0, "", true).unwrap().remove(0);
        assert!(updated.updated_at > entry.updated_at.max(future));
        entry = updated;
    }
}
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
