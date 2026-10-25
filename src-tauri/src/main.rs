#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[cfg(test)]
mod audit_tests;
mod auth;
mod clipboard;
mod history_store;
mod history_sync;
mod privacy;
mod retry;

use history_store::{Entry, Stats, Store};
use serde::Serialize;
use std::sync::{
    atomic::{AtomicBool, AtomicUsize, Ordering},
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
    session_verified: bool,
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
    auth_cancel: AtomicBool,
    import_busy: AtomicBool,
    quitting: AtomicBool,
    diagnostic_directory: Option<std::path::PathBuf>,
    ready_count: AtomicUsize,
}
impl Shared {
    pub fn changed(&self) {
        if let Ok(inner) = self.inner.try_lock() {
            if let Some(tray) = self.app.tray_by_id("flickmemo") {
                let _ = tray.set_tooltip(Some(if inner.recording && !inner.locked {
                    "FlickMemo — クリップボード記録中"
                } else {
                    "FlickMemo — クリップボード記録停止中"
                }));
            }
        }
        let _ = self.app.emit_to("main", "desktop-history-changed", ());
    }
}
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Status {
    version: &'static str,
    recording: bool,
    sync_enabled: bool,
    owner: String,
    locked: bool,
    listener_ready: bool,
    last_error: Option<String>,
    stats: Stats,
    excluded: Vec<String>,
}
fn check_owner(state: &Inner, expected: &str) -> Result<(), String> {
    if state.owner != expected {
        return Err("アカウントが変わったため操作を中止しました。履歴を開き直してください".into());
    }
    Ok(())
}

#[tauri::command]
async fn desktop_open_download(section: Option<String>) -> Result<(), String> {
    let url = match section.as_deref() {
        Some("extensions") => "https://flickmemo-qwe.web.app/download#browser-extensions",
        None | Some("windows") => "https://flickmemo-qwe.web.app/download#http-windows",
        _ => return Err("ダウンロード先が不正です".into()),
    };
    open::that(url).map_err(|_| "標準ブラウザでダウンロードページを開けません".into())
}

#[tauri::command]
async fn desktop_status(
    state: State<'_, Arc<Shared>>,
    expected_owner: String,
) -> Result<Status, String> {
    let mut s = state.inner.lock().map_err(|_| "履歴を開けません")?;
    check_owner(&s, &expected_owner)?;
    let owner = s.owner.clone();
    s.store.prune(&owner)?;
    Ok(Status {
        version: env!("CARGO_PKG_VERSION"),
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
    expected_owner: String,
) -> Result<(), String> {
    if recording && state.diagnostic_directory.is_some() {
        return Err("診断中は実際のクリップボードを記録しません".into());
    }
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
    check_owner(&s, &expected_owner)?;
    if recording && !s.listener_ready {
        return Err("Windowsの変更通知を利用できません".into());
    }
    if sync_enabled && (s.owner == "guest" || !s.session_verified) {
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
    if session.is_some() && state.diagnostic_directory.is_some() {
        return Err("診断中は実アカウントを使用しません".into());
    }
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
    if s.owner != owner {
        s.recording = false;
        s.generation += 1;
    }
    s.owner = owner;
    // Fail closed before disk IO. A failed preference/token write must not leave
    // a previous account capturing or sending while the UI shows a new one.
    s.session_verified = false;
    s.sync_enabled = false;
    s.session = None;
    let enabled = s
        .store
        .secret(&format!("sync:{}", s.owner))?
        .is_some_and(|v| v == b"true");
    s.store.set_secret(
        "session",
        &serde_json::to_vec(&session).map_err(|_| "認証情報を保存できません")?,
    )?;
    s.session = session;
    s.session_verified = true;
    s.sync_enabled = enabled && s.session.is_some();
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
    expected_owner: String,
) -> Result<Vec<Entry>, String> {
    let s = state.inner.lock().map_err(|_| "履歴を開けません")?;
    check_owner(&s, &expected_owner)?;
    s.store.page(&s.owner, offset, &search, false)
}
#[tauri::command]
async fn desktop_mutate(
    state: State<'_, Arc<Shared>>,
    id: String,
    action: String,
    expected_owner: String,
) -> Result<(), String> {
    let mut s = state.inner.lock().map_err(|_| "履歴を更新できません")?;
    check_owner(&s, &expected_owner)?;
    let owner = s.owner.clone();
    s.store.mutate(&owner, &id, &action)?;
    drop(s);
    state.wake.notify_one();
    state.changed();
    Ok(())
}
#[tauri::command]
async fn desktop_copy(
    window: WebviewWindow,
    state: State<'_, Arc<Shared>>,
    text: String,
) -> Result<(), String> {
    if state.diagnostic_directory.is_some() {
        return Err("診断中はOSのクリップボードを書き換えません".into());
    }
    let hwnd = window.hwnd().map_err(|_| "ウィンドウを確認できません")?;
    clipboard::copy_text(&text, hwnd.0)
}
#[tauri::command]
async fn desktop_import(
    state: State<'_, Arc<Shared>>,
    expected_owner: String,
) -> Result<usize, String> {
    if state.diagnostic_directory.is_some() {
        return Err("診断中はOSの履歴を読みません".into());
    }
    let shared = state.inner().clone();
    tauri::async_runtime::spawn_blocking(move || {
        clipboard::import_windows(&shared, &expected_owner)
    })
    .await
    .map_err(|_| "取込み処理が終了しました")?
}
#[tauri::command]
async fn desktop_login(state: State<'_, Arc<Shared>>) -> Result<auth::Credential, String> {
    if state.diagnostic_directory.is_some() {
        return Err("診断中はログインを行いません".into());
    }
    let shared = state.inner().clone();
    tauri::async_runtime::spawn_blocking(move || auth::login(shared))
        .await
        .map_err(|_| "ログイン処理が終了しました")?
}
#[tauri::command]
async fn desktop_close(window: WebviewWindow, state: State<'_, Arc<Shared>>) -> Result<(), String> {
    state.auth_cancel.store(true, Ordering::SeqCst);
    if state.quitting.load(Ordering::SeqCst) {
        window.app_handle().exit(0);
        Ok(())
    } else {
        window.destroy().map_err(|_| "画面を閉じられません".into())
    }
}
#[tauri::command]
async fn desktop_cancel_close(state: State<'_, Arc<Shared>>) -> Result<(), String> {
    state.quitting.store(false, Ordering::SeqCst);
    Ok(())
}

#[tauri::command]
async fn desktop_ready(state: State<'_, Arc<Shared>>, verified: bool) -> Result<bool, String> {
    if state.diagnostic_directory.is_some() {
        if verified {
            state.ready_count.fetch_add(1, Ordering::SeqCst);
        }
        return Ok(true);
    }
    Ok(false)
}
#[tauri::command]
async fn desktop_smoke_failed(state: State<'_, Arc<Shared>>, error: String) -> Result<(), String> {
    if let Some(root) = state.diagnostic_directory.as_ref() {
        let report = serde_json::json!({"stage":"failed","error":error.chars().take(256).collect::<String>()});
        let _ = std::fs::write(root.join("result.json"), report.to_string());
        state.app.exit(1);
    }
    Ok(())
}

fn show(app: &tauri::AppHandle) -> tauri::Result<()> {
    if let Some(window) = app.get_webview_window("main") {
        window.show()?;
        window.unminimize()?;
        window.set_focus()?;
        return Ok(());
    }
    let mut builder =
        tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::App("index.html".into()));
    if let Some(root) = app.state::<Arc<Shared>>().diagnostic_directory.as_ref() {
        builder = builder.data_directory(root.join("webview")).visible(false);
    }
    builder
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
fn diagnostic_smoke(shared: Arc<Shared>) {
    std::thread::spawn(move || {
        let root = shared.diagnostic_directory.as_ref().unwrap();
        let report = |cycle: usize, stage: &str, error: Option<&str>| {
            let data = serde_json::json!({"pid":std::process::id(),"cycle":cycle,"stage":stage,"error":error,"readyCount":shared.ready_count.load(Ordering::SeqCst)});
            let _ = std::fs::write(root.join("result.json"), serde_json::to_vec(&data).unwrap());
        };
        let wait = |predicate: &dyn Fn() -> bool| {
            let until = std::time::Instant::now() + std::time::Duration::from_secs(25);
            while std::time::Instant::now() < until {
                if predicate() {
                    return true;
                }
                std::thread::sleep(std::time::Duration::from_millis(25));
            }
            false
        };
        report(0, "starting", None);
        if std::env::var("GITHUB_ACTIONS").as_deref() == Ok("true") {
            let result = shared
                .app
                .get_webview_window("main")
                .ok_or("Diagnostic window missing".to_string())
                .and_then(|window| {
                    window
                        .hwnd()
                        .map_err(|_| "Diagnostic HWND missing".to_string())
                })
                .and_then(|hwnd| clipboard::diagnostic_capture(&shared, hwnd.0));
            let _ = std::fs::write(
                root.join("clipboard.json"),
                serde_json::json!({"passed":result.is_ok(),"error":result.as_ref().err()})
                    .to_string(),
            );
            if let Err(error) = result {
                report(0, "failed", Some(&error));
                shared.app.exit(1);
                return;
            }
        }
        for cycle in 1..=20 {
            if cycle > 1 {
                let app = shared.app.clone();
                let handle = app.clone();
                let _ = app.run_on_main_thread(move || {
                    let _ = show(&handle);
                });
            }
            if !wait(&|| shared.ready_count.load(Ordering::SeqCst) >= cycle) {
                report(cycle, "failed", Some("WebView/IPC startup timed out"));
                shared.app.exit(1);
                return;
            }
            report(cycle, "open", None);
            std::thread::sleep(std::time::Duration::from_millis(
                if cycle == 1 || cycle == 20 { 2000 } else { 100 },
            ));
            let _ = shared.app.emit_to("main", "desktop-close-requested", ());
            if !wait(&|| shared.app.get_webview_window("main").is_none()) {
                report(cycle, "failed", Some("WebView destroy timed out"));
                shared.app.exit(1);
                return;
            }
            report(cycle, "closed", None);
            std::thread::sleep(std::time::Duration::from_millis(
                if cycle == 1 || cycle == 20 { 5000 } else { 100 },
            ));
        }
        report(20, "passed", None);
        shared.app.exit(0);
    });
}
fn main() {
    let diagnostic = std::env::args().any(|a| a == "--diagnostic-smoke");
    let mut builder = tauri::Builder::default();
    if !diagnostic {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _, _| {
            let _ = show(app);
        }));
    }
    let built = builder
        .invoke_handler(tauri::generate_handler![
            desktop_status,
            desktop_open_download,
            desktop_settings,
            desktop_session,
            desktop_history,
            desktop_mutate,
            desktop_copy,
            desktop_import,
            desktop_login,
            desktop_close,
            desktop_cancel_close,
            desktop_ready,
            desktop_smoke_failed
        ])
        .setup(move |app| {
            let directory = if diagnostic {
                std::env::temp_dir().join(format!(
                    "FlickMemo-diagnostic-{}-{}",
                    std::process::id(),
                    uuid::Uuid::new_v4().simple()
                ))
            } else {
                app.path().app_local_data_dir()?
            };
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
                    session_verified: false,
                    last_error: None,
                    excluded,
                    listener_ready: false,
                }),
                wake: Condvar::new(),
                app: app.handle().clone(),
                auth_busy: AtomicBool::new(false),
                auth_cancel: AtomicBool::new(false),
                import_busy: AtomicBool::new(false),
                quitting: AtomicBool::new(false),
                diagnostic_directory: if diagnostic {
                    Some(directory.clone())
                } else {
                    None
                },
                ready_count: AtomicUsize::new(0),
            });
            {
                match clipboard::start(shared.clone()) {
                    Ok(()) => shared.inner.lock().unwrap().listener_ready = true,
                    Err(error) => shared.inner.lock().unwrap().last_error = Some(error),
                }
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
            TrayIconBuilder::with_id("flickmemo")
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
            if diagnostic {
                diagnostic_smoke(shared);
            }
            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                api.prevent_close();
                let _ = window.emit("desktop-close-requested", ());
            }
        })
        .build(tauri::generate_context!());
    let runtime = match built {
        Ok(app) => app,
        Err(error) => {
            if !diagnostic {
                let text=format!("FlickMemoを起動できませんでした。\n空き容量、WebView2、Windowsアカウントを確認してください。データを削除せずに再試行してください。\n\n{error}");
                let message: Vec<u16> = text.encode_utf16().chain(Some(0)).collect();
                let title: Vec<u16> = "FlickMemo — 起動エラー"
                    .encode_utf16()
                    .chain(Some(0))
                    .collect();
                unsafe {
                    windows_sys::Win32::UI::WindowsAndMessaging::MessageBoxW(
                        std::ptr::null_mut(),
                        message.as_ptr(),
                        title.as_ptr(),
                        windows_sys::Win32::UI::WindowsAndMessaging::MB_OK
                            | windows_sys::Win32::UI::WindowsAndMessaging::MB_ICONERROR,
                    );
                }
            }
            std::process::exit(1);
        }
    };
    runtime.run(|_, event| {
        if let tauri::RunEvent::ExitRequested { api, code, .. } = event {
            if code.is_none() {
                api.prevent_exit();
            }
        }
    });
}
