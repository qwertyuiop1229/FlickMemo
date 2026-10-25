//! A single sleeping worker. No browser or WebView is needed for outgoing sync.
use crate::{
    history_store::{now, Entry},
    Shared,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
const API_KEY: &str = "AIzaSyB1Yt1bCaMmOe84_737RSMcd2NlMkPZLaE";
const BASE: &str = "https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app";
#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Session {
    pub uid: String,
    pub refresh_token: String,
}
#[derive(Deserialize)]
struct Refresh {
    id_token: String,
    refresh_token: String,
    user_id: String,
}

pub fn start(shared: Arc<Shared>) {
    std::thread::spawn(move || {
        let client = match reqwest::blocking::Client::builder()
            .connect_timeout(std::time::Duration::from_secs(10))
            .timeout(std::time::Duration::from_secs(20))
            .build()
        {
            Ok(c) => c,
            Err(_) => return,
        };
        let mut token: Option<(String, String, i64)> = None;
        let mut last_prune = 0;
        let mut wait = std::time::Duration::from_secs(60);
        loop {
            let mut inner = match shared.inner.lock() {
                Ok(s) => s,
                Err(_) => return,
            };
            let enabled =
                inner.sync_enabled && inner.session.as_ref().is_some_and(|s| s.uid == inner.owner);
            if !enabled {
                token = None;
            }
            if now() - last_prune >= 60000 {
                if let Err(error) = inner.store.prune_all() {
                    inner.last_error = Some(error);
                }
                last_prune = now();
            }
            let batch = if enabled {
                inner.store.page(&inner.owner, 0, "", true)
            } else {
                Ok(Vec::new())
            };
            let entries = match batch {
                Ok(e) => e,
                Err(error) => {
                    inner.last_error = Some(error);
                    Vec::new()
                }
            };
            if entries.is_empty() {
                let result = shared.wake.wait_timeout(inner, wait);
                if result.is_err() {
                    return;
                }
                continue;
            }
            let owner = inner.owner.clone();
            let generation = inner.generation;
            if let Err(error) = inner.store.mark_uploading(&owner, &entries) {
                inner.last_error = Some(error);
                let _ = shared.wake.wait_timeout(inner, wait);
                continue;
            }
            let session = inner.session.clone().unwrap();
            drop(inner);
            let refresh_needed = token
                .as_ref()
                .is_none_or(|(uid, _, until)| uid != &owner || *until < now());
            if refresh_needed {
                let result = client
                    .post(format!(
                        "https://securetoken.googleapis.com/v1/token?key={API_KEY}"
                    ))
                    .form(&[
                        ("grant_type", "refresh_token"),
                        ("refresh_token", session.refresh_token.as_str()),
                    ])
                    .send()
                    .and_then(|r| r.error_for_status())
                    .and_then(|r| r.json::<Refresh>());
                match result {
                    Ok(result) if result.user_id == owner => {
                        if let Ok(mut s) = shared.inner.lock() {
                            if s.owner != owner || s.generation != generation {
                                token = None;
                                continue;
                            }
                            let replacement = Session {
                                uid: owner.clone(),
                                refresh_token: result.refresh_token,
                            };
                            match serde_json::to_vec(&replacement)
                                .map_err(|_| "認証情報の保存に失敗しました".into())
                                .and_then(|v| s.store.set_secret("session", &v))
                            {
                                Ok(()) => s.session = Some(replacement),
                                Err(error) => {
                                    s.last_error = Some(error);
                                    let _ = shared.wake.wait_timeout(s, wait);
                                    continue;
                                }
                            }
                        }
                        token = Some((owner.clone(), result.id_token, now() + 45 * 60 * 1000));
                    }
                    _ => {
                        fail(&shared,"同期の認証を更新できません。通信状態を確認し、必要なら再ログインしてください");
                        wait = std::time::Duration::from_secs(60);
                        if let Ok(s) = shared.inner.lock() {
                            let _ = shared.wake.wait_timeout(s, wait);
                        }
                        continue;
                    }
                }
            }
            // Re-check after asynchronous refresh. A different account cannot inherit this queue or token.
            {
                let s = match shared.inner.lock() {
                    Ok(s) => s,
                    Err(_) => return,
                };
                if s.owner != owner || s.generation != generation || !s.sync_enabled {
                    token = None;
                    continue;
                }
            }
            let payload: serde_json::Map<String, serde_json::Value> = entries
                .iter()
                .map(|entry| (format!("{}_{}", shared.device, entry.id), wire(entry)))
                .collect();
            let auth = &token.as_ref().unwrap().1;
            let result = client
                .patch(format!("{BASE}/users/{owner}/clipboardHistory.json"))
                .query(&[("auth", auth)])
                .json(&payload)
                .send()
                .and_then(|r| r.error_for_status());
            match result {
                Ok(_) => {
                    if let Ok(mut s) = shared.inner.lock() {
                        for entry in &entries {
                            if let Err(error) = s.store.ack(&owner, entry) {
                                s.last_error = Some(error);
                            }
                        }
                    }
                    wait = std::time::Duration::from_secs(60);
                    shared.changed();
                }
                Err(_) => {
                    fail(
                        &shared,
                        "履歴はこのPCに保存済みです。クラウドへの送信は接続回復後に再試行します",
                    );
                    // Sleep even when work remains; an offline connection never becomes a busy loop.
                    if let Ok(s) = shared.inner.lock() {
                        let _ = shared.wake.wait_timeout(s, wait);
                    }
                    wait = (wait * 2).min(std::time::Duration::from_secs(15 * 60));
                    token = None;
                }
            }
        }
    });
}
fn fail(shared: &Shared, message: &str) {
    if let Ok(mut s) = shared.inner.lock() {
        s.last_error = Some(message.into());
    }
    shared.changed();
}
fn wire(entry: &Entry) -> serde_json::Value {
    serde_json::json!({"schemaVersion":1,"id":entry.id,"kind":entry.kind,"text":entry.text,
        "createdAt":entry.created_at,"updatedAt":entry.updated_at,"expiresAt":entry.expires_at,
        "pinned":entry.pinned,"count":entry.count,"deletedAt":entry.deleted_at,
        "originDeviceId":entry.origin_device_id})
}
