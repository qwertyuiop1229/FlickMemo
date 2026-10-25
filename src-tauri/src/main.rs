#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod auth;
mod clipboard;
mod history_store;
mod history_sync;
mod privacy;

use history_store::{Entry, Stats, Store};
use serde::Serialize;
use std::sync::{
    atomic::{AtomicBool, Ordering},
    Arc, Condvar, Mutex,
};
use tauri::{Emitter, Manager, State, WebviewWindow};

pub struct Inner {
    store: Store,
    owner: String,
    generation: u64,
    recording: bool,
    locked: bool,
    sync_enabled: bool,
    session: Option<history_sync::Session>,
    last_error: Option<String>,
    excluded: Vec<String>,
    listener_ready: bool,
}
pub struct Shared {
    inner: Mutex<Inner>,
    wake: Condvar,
    app: tauri::AppHandle,
    device: String,
    auth_busy: AtomicBool,
    quitting: AtomicBool,
}
impl Shared {
    pub fn changed(&self) {
        let _ = self.app.emit_to("main", "desktop-history-changed", ());
    }
}
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Status {
    recording: bool,
    sync_enabled: bool,
    owner: String,
    locked: bool,
    listener_ready: bool,
    last_error: Option<String>,
    stats: Stats,
    excluded: Vec<String>,
}

#[tauri::command]
async fn desktop_status(state: State<'_, Arc<Shared>>) -> Result<Status, String> {
    let mut s = state.inner.lock().map_err(|_| "履歴を開けません")?;
    let owner = s.owner.clone();
    s.store.prune(&owner)?;
    Ok(Status {
        recording: s.recording,
        sync_enabled: s.sync_enabled,
        owner: s.owner.clone(),
        locked: s.locked,
        listener_ready: s.listener_ready,
        last_error: s.last_error.clone(),
        stats: s.store.stats(&s.owner)?,
        excluded: s.excluded.clone(),
    })
}
#[tauri::command]
async fn desktop_settings(
    state: State<'_, Arc<Shared>>,
    recording: bool,
    sync_enabled: bool,
    excluded: Vec<String>,
) -> Result<(), String> {
    if excluded.len() > 50
        || excluded.iter().any(|p| {
            p.is_empty()
                || p.len() > 100
                || !p.ends_with(".exe")
                || p.contains(['/', '\\', ':', '\n'])
        })
    {
        return Err("除外には実行ファイル名を50件まで指定してください（例: example.exe）".into());
    }
    let mut s = state.inner.lock().map_err(|_| "設定を開けません")?;
    if recording && !s.listener_ready {
        return Err("Windowsの変更通知を利用できません".into());
    }
    if sync_enabled && s.owner == "guest" {
        return Err("同期にはGoogleログインが必要です".into());
    }
    let owner = s.owner.clone();
    s.store.set_secret(
        &format!("sync:{owner}"),
        if sync_enabled { b"true" } else { b"false" },
    )?;
    s.store.set_secret(
        "excluded",
        &serde_json::to_vec(&excluded).map_err(|_| "設定を書き込めません")?,
    )?;
    s.recording = recording;
    s.sync_enabled = sync_enabled;
    s.excluded = excluded.into_iter().map(|p| p.to_lowercase()).collect();
    s.last_error = None;
    drop(s);
    state.wake.notify_one();
    state.changed();
    Ok(())
}
#[tauri::command]
async fn desktop_session(
    state: State<'_, Arc<Shared>>,
    session: Option<history_sync::Session>,
) -> Result<(), String> {
    if session.as_ref().is_some_and(|s| {
        s.uid.is_empty()
            || s.uid.len() > 128
            || !s
                .uid
                .bytes()
                .all(|c| c.is_ascii_alphanumeric() || c == b'_' || c == b'-')
            || s.refresh_token.len() > 16384
            || s.refresh_token.is_empty()
    }) {
        return Err("アカウント情報が不正です".into());
    }
    let mut s = state
        .inner
        .lock()
        .map_err(|_| "アカウントを変更できません")?;
    let owner = session
        .as_ref()
        .map(|s| s.uid.clone())
        .unwrap_or("guest".into());
    let enabled = s
        .store
        .secret(&format!("sync:{owner}"))?
        .is_some_and(|v| v == b"true");
    if s.owner != owner {
        s.recording = false;
        s.generation += 1;
    }
    s.owner = owner;
    s.session = session;
    s.sync_enabled = enabled && s.session.is_some();
    s.store.set_secret(
        "session",
        &serde_json::to_vec(&s.session).map_err(|_| "認証情報を保存できません")?,
    )?;
    drop(s);
    state.wake.notify_one();
    state.changed();
    Ok(())
}
#[tauri::command]
async fn desktop_history(
    state: State<'_, Arc<Shared>>,
    offset: u32,
    search: String,
) -> Result<Vec<Entry>, String> {
    let s = state.inner.lock().map_err(|_| "履歴を開けません")?;
    s.store.page(&s.owner, offset, &search, false)
}
#[tauri::command]
async fn desktop_mutate(
    state: State<'_, Arc<Shared>>,
    id: String,
    action: String,
) -> Result<(), String> {
    let mut s = state.inner.lock().map_err(|_| "履歴を更新できません")?;
    let owner = s.owner.clone();
    s.store.mutate(&owner, &id, &action)?;
    drop(s);
    state.wake.notify_one();
    state.changed();
    Ok(())
}
#[tauri::command]
async fn desktop_copy(window: WebviewWindow, text: String) -> Result<(), String> {
    let hwnd = window.hwnd().map_err(|_| "ウィンドウを確認できません")?;
    clipboard::copy_text(&text, hwnd.0)
}
#[tauri::command]
async fn desktop_import(state: State<'_, Arc<Shared>>) -> Result<usize, String> {
    let shared = state.inner().clone();
    tauri::async_runtime::spawn_blocking(move || clipboard::import_windows(&shared))
        .await
        .map_err(|_| "取込み処理が終了しました")?
}
#[tauri::command]
async fn desktop_login(state: State<'_, Arc<Shared>>) -> Result<auth::Credential, String> {
    let shared = state.inner().clone();
    tauri::async_runtime::spawn_blocking(move || auth::login(shared))
        .await
        .map_err(|_| "ログイン処理が終了しました")?
}
#[tauri::command]
async fn desktop_close(window: WebviewWindow, state: State<'_, Arc<Shared>>) -> Result<(), String> {
    if state.quitting.load(Ordering::SeqCst) {
        window.app_handle().exit(0);
        Ok(())
    } else {
        window.destroy().map_err(|_| "画面を閉じられません".into())
    }
}
#[tauri::command]
async fn desktop_cancel_close(state: State<'_, Arc<Shared>>) {
    state.quitting.store(false, Ordering::SeqCst);
}

fn show(app: &tauri::AppHandle) -> tauri::Result<()> {
    if let Some(window) = app.get_webview_window("main") {
        window.show()?;
        window.unminimize()?;
        window.set_focus()?;
        return Ok(());
    }
    tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::App("index.html".into()))
        .title("FlickMemo")
        .inner_size(1100., 760.)
        .min_inner_size(500., 480.)
        .on_navigation(|url| {
            (url.scheme() == "http" && url.host_str() == Some("tauri.localhost"))
                || (url.scheme() == "tauri" && url.host_str() == Some("localhost"))
                || (cfg!(debug_assertions)
                    && url.scheme() == "http"
                    && url.host_str() == Some("127.0.0.1")
                    && url.port() == Some(5175))
        })
        .on_new_window(|_, _| tauri::webview::NewWindowResponse::Deny)
        .build()?;
    Ok(())
}
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _, _| {
            let _ = show(app);
        }))
        .invoke_handler(tauri::generate_handler![
            desktop_status,
            desktop_settings,
            desktop_session,
            desktop_history,
            desktop_mutate,
            desktop_copy,
            desktop_import,
            desktop_login,
            desktop_close,
            desktop_cancel_close
        ])
        .setup(|app| {
            let directory = app.path().app_local_data_dir()?;
            std::fs::create_dir_all(&directory)?;
            let store = Store::open(&directory.join("history.sqlite3"))?;
            let session: Option<history_sync::Session> = store
                .secret("session")?
                .map(|v| serde_json::from_slice::<Option<history_sync::Session>>(&v))
                .transpose()?
                .flatten();
            let owner = session
                .as_ref()
                .map(|s| s.uid.clone())
                .unwrap_or("guest".into());
            let sync_enabled = session.is_some()
                && store
                    .secret(&format!("sync:{owner}"))?
                    .is_some_and(|v| v == b"true");
            let excluded = store
                .secret("excluded")?
                .map(|v| serde_json::from_slice(&v))
                .transpose()?
                .unwrap_or_else(|| {
                    vec![
                        "1password.exe".into(),
                        "bitwarden.exe".into(),
                        "keepass.exe".into(),
                        "keepassxc.exe".into(),
                    ]
                });
            let shared = Arc::new(Shared {
                device: store.device.clone(),
                inner: Mutex::new(Inner {
                    store,
                    owner,
                    generation: 0,
                    recording: false,
                    locked: false,
                    sync_enabled,
                    session,
                    last_error: None,
                    excluded,
                    listener_ready: false,
                }),
                wake: Condvar::new(),
                app: app.handle().clone(),
                auth_busy: AtomicBool::new(false),
                quitting: AtomicBool::new(false),
            });
            match clipboard::start(shared.clone()) {
                Ok(()) => shared.inner.lock().unwrap().listener_ready = true,
                Err(error) => shared.inner.lock().unwrap().last_error = Some(error),
            }
            app.manage(shared.clone());
            history_sync::start(shared.clone());
            use tauri::{
                menu::{Menu, MenuItem},
                tray::TrayIconBuilder,
            };
            let open = MenuItem::with_id(app, "open", "FlickMemoを開く", true, None::<&str>)?;
            let pause =
                MenuItem::with_id(app, "pause", "クリップボード記録を停止", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "終了", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&open, &pause, &quit])?;
            TrayIconBuilder::new()
                .icon(
                    app.default_window_icon()
                        .ok_or("アイコンがありません")?
                        .clone(),
                )
                .tooltip("FlickMemo — 記録は初期OFF")
                .menu(&menu)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "open" => {
                        let _ = show(app);
                    }
                    "pause" => {
                        let state = app.state::<Arc<Shared>>();
                        if let Ok(mut s) = state.inner.lock() {
                            s.recording = false;
                        }
                        state.changed();
                    }
                    "quit" => {
                        let state = app.state::<Arc<Shared>>();
                        if app.get_webview_window("main").is_some() {
                            state.quitting.store(true, Ordering::SeqCst);
                            let _ = app.emit_to("main", "desktop-close-requested", ());
                        } else {
                            app.exit(0);
                        }
                    }
                    _ => {}
                })
                .build(app)?;
            show(app.handle())?;
            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                api.prevent_close();
                let _ = window.emit("desktop-close-requested", ());
            }
        })
        .build(tauri::generate_context!())
        .expect("FlickMemoを起動できませんでした")
        .run(|_, event| {
            if let tauri::RunEvent::ExitRequested { api, code, .. } = event {
                if code.is_none() {
                    api.prevent_exit();
                }
            }
        });
}
