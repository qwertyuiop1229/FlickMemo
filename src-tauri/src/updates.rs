//! The packaged app accepts only signed, newer installers from its official release.
use crate::Shared;
use serde::Serialize;
use std::io::Read;
use std::sync::{
    atomic::{AtomicU8, Ordering},
    Arc, Mutex,
};
use std::time::Duration;
use tauri::State;
use tauri_plugin_updater::{Update, UpdaterExt};

struct Pending {
    update: Update,
    bytes: Option<Vec<u8>>,
}
#[derive(Default)]
pub struct Updates {
    pub mode: AtomicU8,
    pending: Mutex<Option<Pending>>,
}
struct Busy(Arc<Updates>);
impl Drop for Busy {
    fn drop(&mut self) {
        self.0.mode.store(0, Ordering::SeqCst);
    }
}
impl Updates {
    pub fn discard(&self) {
        if let Ok(mut pending) = self.pending.lock() {
            pending.take();
        }
    }
    fn acquire(self: &Arc<Self>, mode: u8) -> Result<Busy, String> {
        self.mode
            .compare_exchange(0, mode, Ordering::SeqCst, Ordering::SeqCst)
            .map_err(|_| "更新処理は既に実行中です")?;
        Ok(Busy(self.clone()))
    }
}
#[derive(Serialize)]
pub struct Info {
    version: String,
}
fn allowed_url(version: &str, url: &str) -> bool {
    url == format!("https://github.com/qwertyuiop1229/FlickMemo/releases/download/v{version}/FlickMemo-Setup.exe")
}
const MAX_DOWNLOAD: usize = 64 * 1024 * 1024;
fn read_bounded(mut reader: impl Read, limit: usize) -> Result<Vec<u8>, String> {
    let mut bytes = Vec::new();
    let mut chunk = [0u8; 32 * 1024];
    loop {
        let n = reader
            .read(&mut chunk)
            .map_err(|_| "更新ファイルの受信に失敗しました")?;
        if n == 0 {
            return Ok(bytes);
        }
        if n > limit.saturating_sub(bytes.len()) {
            return Err("更新ファイルが大きすぎます".into());
        }
        bytes.extend_from_slice(&chunk[..n]);
    }
}
fn download_verified(update: Update) -> Result<Vec<u8>, String> {
    let client = reqwest::blocking::Client::builder()
        .connect_timeout(Duration::from_secs(15))
        .timeout(Duration::from_secs(180))
        .https_only(true)
        .build()
        .map_err(|_| "更新の受信を開始できません")?;
    let response = client
        .get(update.download_url.clone())
        .send()
        .and_then(|r| r.error_for_status())
        .map_err(|_| "更新ファイルを取得できません")?;
    if response
        .content_length()
        .is_some_and(|n| n > MAX_DOWNLOAD as u64)
    {
        return Err("更新ファイルが大きすぎます".into());
    }
    let bytes = read_bounded(response, MAX_DOWNLOAD)?;
    update
        .verify(&bytes)
        .map_err(|_| "更新ファイルの署名・バージョンを検証できません")?;
    Ok(bytes)
}
#[tauri::command]
pub async fn desktop_update_check(
    app: tauri::AppHandle,
    state: State<'_, Arc<Shared>>,
    updates: State<'_, Arc<Updates>>,
) -> Result<Option<Info>, String> {
    if state.diagnostic_directory.is_some() {
        return Ok(None);
    }
    let _busy = updates.inner().acquire(1)?;
    let updater = app
        .updater_builder()
        .timeout(Duration::from_secs(15))
        .header("Cache-Control", "no-cache")
        .map_err(|_| "更新確認を開始できません")?
        .build()
        .map_err(|_| "更新確認を開始できません")?;
    let update = updater
        .check()
        .await
        .map_err(|_| "更新情報を取得できません。通信状態を確認し、後でもう一度お試しください")?;
    let info = update.as_ref().map(|u| Info {
        version: u.version.clone(),
    });
    let pending = match update {
        Some(mut update) => {
            if !allowed_url(&update.version, update.download_url.as_str()) {
                return Err("正規の更新配布先を確認できません".into());
            }
            update.timeout = Some(Duration::from_secs(180));
            Some(Pending {
                update,
                bytes: None,
            })
        }
        None => None,
    };
    *updates
        .pending
        .lock()
        .map_err(|_| "更新状態を取得できません")? = pending;
    Ok(info)
}
#[tauri::command]
pub async fn desktop_update_download(
    state: State<'_, Arc<Shared>>,
    updates: State<'_, Arc<Updates>>,
) -> Result<(), String> {
    if state.diagnostic_directory.is_some() {
        return Err("診断中は更新しません".into());
    }
    let _busy = updates.inner().acquire(2)?;
    if updates
        .pending
        .lock()
        .map_err(|_| "更新状態を取得できません")?
        .as_ref()
        .is_some_and(|p| p.bytes.is_some())
    {
        return Ok(());
    }
    let update = updates
        .pending
        .lock()
        .map_err(|_| "更新状態を取得できません")?
        .as_ref()
        .map(|p| p.update.clone())
        .ok_or("先に更新を確認してください")?;
    let bytes = tauri::async_runtime::spawn_blocking(move || download_verified(update))
        .await
        .map_err(|_| "更新ファイルの取得を開始できません")??;
    updates
        .pending
        .lock()
        .map_err(|_| "更新状態を取得できません")?
        .as_mut()
        .ok_or("更新を再確認してください")?
        .bytes = Some(bytes);
    Ok(())
}
#[tauri::command]
pub async fn desktop_update_install(
    state: State<'_, Arc<Shared>>,
    updates: State<'_, Arc<Updates>>,
) -> Result<(), String> {
    if state.diagnostic_directory.is_some() {
        return Err("診断中は更新しません".into());
    }
    let _busy = updates.inner().acquire(3)?;
    let pending = updates
        .pending
        .lock()
        .map_err(|_| "更新状態を取得できません")?
        .take()
        .ok_or("先に更新をダウンロードしてください")?;
    let bytes = pending
        .bytes
        .ok_or("更新ファイルの検証が終わっていません")?;
    // Update::install verifies the signature and signed version again before launching NSIS.
    let (update, bytes, result) = tauri::async_runtime::spawn_blocking(move || {
        let result = pending.update.install(&bytes);
        (pending.update, bytes, result)
    })
    .await
    .map_err(|_| "更新処理を開始できません")?;
    if result.is_err() {
        *updates
            .pending
            .lock()
            .map_err(|_| "更新状態を取得できません")? = Some(Pending {
            update,
            bytes: Some(bytes),
        });
        return Err("更新の適用に失敗しました。現在のアプリを引き続き使用できます".into());
    }
    Ok(())
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn streaming_download_enforces_the_limit_before_retaining_excess_bytes() {
        assert_eq!(read_bounded(&b"1234"[..], 4).unwrap(), b"1234");
        assert!(read_bounded(&b"12345"[..], 4).is_err());
        assert!(read_bounded(std::io::repeat(0), 1024).is_err());
        assert!(read_bounded(&b"x"[..], 0).is_err());
    }
    #[test]
    fn real_update_signature_rejects_modified_bytes_and_binds_the_version() {
        use base64::Engine;
        let config: serde_json::Value =
            serde_json::from_str(include_str!("../tauri.conf.json")).unwrap();
        assert_eq!(config["plugins"]["updater"]["requireSignedVersion"], true);
        let pubkey = base64::engine::general_purpose::STANDARD
            .decode(config["plugins"]["updater"]["pubkey"].as_str().unwrap())
            .unwrap();
        let public =
            minisign_verify::PublicKey::decode(std::str::from_utf8(&pubkey).unwrap()).unwrap();
        let fixture: serde_json::Value =
            serde_json::from_str(include_str!("../../tests/fixtures/updater-signature.json"))
                .unwrap();
        let encoded = base64::engine::general_purpose::STANDARD
            .decode(fixture["signature"].as_str().unwrap())
            .unwrap();
        let signature =
            minisign_verify::Signature::decode(std::str::from_utf8(&encoded).unwrap()).unwrap();
        let bytes = include_bytes!("../../tests/fixtures/updater-synthetic.txt");
        public.verify(bytes, &signature, true).unwrap();
        assert!(public
            .verify(b"corrupted executable", &signature, true)
            .is_err());
        assert_eq!(
            signature
                .trusted_comment()
                .split('\t')
                .find_map(|s| s.strip_prefix("version:")),
            Some("0.0.1")
        );
    }
    #[test]
    fn only_official_installer_and_one_operation_at_a_time() {
        assert!(allowed_url("1.3.90","https://github.com/qwertyuiop1229/FlickMemo/releases/download/v1.3.90/FlickMemo-Setup.exe"));
        for url in ["http://github.com/qwertyuiop1229/FlickMemo/releases/download/v1.3.90/FlickMemo-Setup.exe","https://github.com/attacker/FlickMemo/releases/download/v1.3.90/FlickMemo-Setup.exe","https://github.com/qwertyuiop1229/FlickMemo/releases/download/v1.3.89/FlickMemo-Setup.exe"] { assert!(!allowed_url("1.3.90",url)); }
        let state = Arc::new(Updates::default());
        let busy = state.acquire(2).unwrap();
        assert!(state.acquire(1).is_err());
        drop(busy);
        assert!(state.acquire(1).is_ok());
    }
}
