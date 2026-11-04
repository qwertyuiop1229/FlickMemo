//! On-demand, single-pixel GDI picker. Idle: no timer, screen DC, input hook or WebView.
use crate::{clipboard, Shared};
use serde::{Deserialize, Serialize};
use std::{
    cell::RefCell,
    sync::{
        atomic::{AtomicBool, AtomicU64, Ordering},
        mpsc, Arc,
    },
    time::{Duration, Instant},
};
use tauri::{Emitter, Manager, State};
use windows_sys::Win32::{
    Foundation::*,
    Graphics::{Dwm::DwmFlush, Gdi::*},
    System::LibraryLoader::GetModuleHandleW,
    UI::HiDpi::{
        GetDpiForWindow, SetThreadDpiAwarenessContext, DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2,
    },
    UI::{Input::KeyboardAndMouse::*, WindowsAndMessaging::*},
};
const REQUEST: u32 = WM_APP + 80;
const PICK: u32 = WM_APP + 81;
const CANCEL: u32 = WM_APP + 82;
const MOTION: u32 = WM_APP + 83;
const REFLOW: u32 = WM_APP + 84;
const FOLLOW_INTERVAL: Duration = Duration::from_millis(15);
const CLASS: &str = "FlickMemo.ColorPicker";
fn wide(value: &str) -> Vec<u16> {
    value.encode_utf16().chain(Some(0)).collect()
}
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
#[serde(default, rename_all = "camelCase", deny_unknown_fields)]
pub struct Preferences {
    pub enabled: bool,
    pub shortcut: String,
    pub format: String,
    pub uppercase: bool,
    pub remember: bool,
}
impl Default for Preferences {
    fn default() -> Self {
        Self {
            enabled: true,
            shortcut: "Ctrl+Alt+C".into(),
            format: "hex".into(),
            uppercase: true,
            remember: true,
        }
    }
}
fn shortcut(value: &str) -> Result<(u32, u32), String> {
    let parts: Vec<_> = value.split('+').collect();
    if parts.len() != 3 || parts[2].len() != 1 {
        return Err("キーは修飾キー2つと英数字1つを指定してください".into());
    }
    let modifiers = match (parts[0], parts[1]) {
        ("Ctrl", "Alt") => MOD_CONTROL | MOD_ALT,
        ("Ctrl", "Shift") => MOD_CONTROL | MOD_SHIFT,
        ("Alt", "Shift") => MOD_ALT | MOD_SHIFT,
        _ => return Err("使用できない修飾キーです".into()),
    };
    let key = parts[2].as_bytes()[0];
    if !key.is_ascii_uppercase() && !key.is_ascii_digit() {
        return Err("キーにはA〜Z、0〜9を指定してください".into());
    }
    Ok((modifiers | MOD_NOREPEAT, key as u32))
}
fn validate(value: &Preferences) -> Result<(), String> {
    shortcut(&value.shortcut)?;
    if !["hex", "rgb", "hsl"].contains(&value.format.as_str()) {
        return Err("コピー形式が不正です".into());
    }
    Ok(())
}
fn valid_hex(value: &str) -> bool {
    value.len() == 7
        && value.starts_with('#')
        && value.as_bytes()[1..].iter().all(u8::is_ascii_hexdigit)
}
fn hex(color: u32) -> String {
    format!(
        "#{:02X}{:02X}{:02X}",
        color & 255,
        (color >> 8) & 255,
        (color >> 16) & 255
    )
}
fn format(color: u32, p: &Preferences) -> String {
    let (r, g, b) = (color & 255, (color >> 8) & 255, (color >> 16) & 255);
    match p.format.as_str() {
        "rgb" => format!("rgb({r}, {g}, {b})"),
        "hsl" => {
            let (a, c, d) = (r as f64 / 255., g as f64 / 255., b as f64 / 255.);
            let max = a.max(c).max(d);
            let min = a.min(c).min(d);
            let delta = max - min;
            let l = (max + min) / 2.;
            let h = if delta == 0. {
                0.
            } else if max == a {
                ((c - d) / delta).rem_euclid(6.)
            } else if max == c {
                (d - a) / delta + 2.
            } else {
                (a - c) / delta + 4.
            };
            let s = if delta == 0. {
                0.
            } else {
                delta / (1. - (2. * l - 1.).abs())
            };
            format!(
                "hsl({}, {}%, {}%)",
                ((h * 60.).round() as u32) % 360,
                (s * 100.).round() as u32,
                (l * 100.).round() as u32
            )
        }
        _ => {
            let value = hex(color);
            if p.uppercase {
                value
            } else {
                value.to_lowercase()
            }
        }
    }
}
#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Status {
    preferences: Preferences,
    recent: Vec<String>,
    error: Option<String>,
    active: bool,
    position_updates: u64,
    sample_updates: u64,
    motion_updates: u64,
}
#[derive(Clone, Serialize)]
pub struct Picked {
    hex: String,
    copied: bool,
    error: Option<String>,
}
enum Operation {
    Status,
    Settings(Preferences),
    Start,
    Clear,
}
struct Request {
    operation: Operation,
    reply: mpsc::SyncSender<Result<Status, String>>,
}
#[derive(Clone)]
struct Controller {
    hwnd: usize,
    queue: mpsc::SyncSender<Request>,
}
pub struct Service(Result<Controller, String>);
impl Controller {
    fn request(&self, operation: Operation) -> Result<Status, String> {
        let (tx, rx) = mpsc::sync_channel(1);
        self.queue
            .try_send(Request {
                operation,
                reply: tx,
            })
            .map_err(|_| "カラーピッカーの処理を待って再試行してください")?;
        if unsafe { PostMessageW(self.hwnd as HWND, REQUEST, 0, 0) } == 0 {
            return Err("カラーピッカーを呼び出せません".into());
        }
        rx.recv_timeout(Duration::from_secs(5))
            .map_err(|_| "カラーピッカーの応答がありません")?
    }
}
async fn request(service: &Service, op: Operation) -> Result<Status, String> {
    let controller = service.0.clone()?;
    tauri::async_runtime::spawn_blocking(move || controller.request(op))
        .await
        .map_err(|_| "カラーピッカーを実行できません")?
}
#[tauri::command]
pub async fn desktop_color_status(state: State<'_, Service>) -> Result<Status, String> {
    request(&state, Operation::Status).await
}
#[tauri::command]
pub async fn desktop_color_settings(
    state: State<'_, Service>,
    preferences: Preferences,
) -> Result<Status, String> {
    validate(&preferences)?;
    request(&state, Operation::Settings(preferences)).await
}
#[tauri::command]
pub async fn desktop_color_pick(state: State<'_, Service>) -> Result<Status, String> {
    request(&state, Operation::Start).await
}
#[tauri::command]
pub async fn desktop_color_clear(state: State<'_, Service>) -> Result<Status, String> {
    request(&state, Operation::Clear).await
}
struct Worker {
    shared: Arc<Shared>,
    hwnd: HWND,
    queue: mpsc::Receiver<Request>,
    prefs: Preferences,
    recent: Vec<String>,
    error: Option<String>,
    registered: Option<i32>,
    active: bool,
    hook: Option<InputHook>,
    capture: Option<SampleBuffer>,
    last_sample: Instant,
    last_follow: Instant,
    follow_valid: bool,
    panel_buffer: Option<PanelBuffer>,
    position_updates: u64,
    sample_updates: u64,
    motion_updates: u64,
    previous: HWND,
    began: Instant,
    sample: u32,
    pixels: [u32; 49],
    point: POINT,
    confirmation: Option<String>,
}
thread_local! { static WORKER: RefCell<Option<Worker>> = const { RefCell::new(None) }; }
impl Worker {
    fn status(&self) -> Status {
        Status {
            preferences: self.prefs.clone(),
            recent: self.recent.clone(),
            error: self.error.clone(),
            active: self.active,
            position_updates: self.position_updates,
            sample_updates: self.sample_updates,
            motion_updates: self.motion_updates,
        }
    }
    fn persist(&self, p: &Preferences, recent: &[String]) -> Result<(), String> {
        let data = serde_json::to_vec(&(p, recent)).map_err(|_| "色の設定を保存できません")?;
        self.shared
            .inner
            .lock()
            .map_err(|_| "設定DBを開けません")?
            .store
            .set_secret("color-picker", &data)
    }
    fn configure(&mut self, p: Preferences) -> Result<(), String> {
        validate(&p)?;
        if self.active {
            return Err("色の取得を終了してから設定を変更してください".into());
        }
        let changed = self.prefs.shortcut != p.shortcut || self.registered.is_none();
        let candidate = if p.enabled && changed {
            let (modifiers, key) = shortcut(&p.shortcut)?;
            let id = if self.registered == Some(100) {
                101
            } else {
                100
            };
            if unsafe { RegisterHotKey(self.hwnd, id, modifiers, key) } == 0 {
                return Err(
                    "そのショートカットは別のアプリが使用中です。別のキーを選んでください".into(),
                );
            }
            Some(id)
        } else {
            self.registered
        };
        let recent = if p.remember {
            self.recent.clone()
        } else {
            Vec::new()
        };
        if let Err(e) = self.persist(&p, &recent) {
            if candidate != self.registered {
                if let Some(id) = candidate {
                    unsafe {
                        UnregisterHotKey(self.hwnd, id);
                    }
                }
            }
            return Err(e);
        }
        if !p.enabled || candidate != self.registered {
            if let Some(id) = self.registered {
                unsafe {
                    UnregisterHotKey(self.hwnd, id);
                }
            }
        }
        self.registered = if p.enabled { candidate } else { None };
        self.prefs = p;
        self.recent = recent;
        self.error = None;
        Ok(())
    }
    fn start(&mut self) -> Result<(), String> {
        if self.shared.diagnostic_directory.is_some() {
            return Err("診断中は実画面を取得しません".into());
        }
        if self.active {
            return Err("すでに色を選択中です。Escで中止できます".into());
        }
        if !clipboard::input_desktop_is_unlocked() {
            return Err("ロック画面では色を取得できません".into());
        }
        unsafe {
            self.previous = GetForegroundWindow();
            self.confirmation = None;
            KillTimer(self.hwnd, 2);
            self.capture = Some(SampleBuffer::new()?);
            self.hook = match InputHook::start(self.hwnd) {
                Ok(hook) => Some(hook),
                Err(error) => {
                    self.capture = None;
                    return Err(error);
                }
            };
            self.last_sample = Instant::now() - Duration::from_secs(1);
            self.last_follow = self.last_sample;
            self.follow_valid = false;
            self.active = true;
            self.position_updates = 0;
            self.sample_updates = 0;
            self.motion_updates = 0;
            if self
                .shared
                .app
                .get_webview_window("main")
                .is_some_and(|window| window.is_visible().unwrap_or(false))
            {
                let _ = self.shared.app.emit_to("main", "desktop-color-started", ());
            }
            self.began = Instant::now();
            self.update(None);
            InvalidateRect(self.hwnd, std::ptr::null(), 0);
            ShowWindow(self.hwnd, SW_SHOWNORMAL);
            SetForegroundWindow(self.hwnd);
            SetFocus(self.hwnd);
            // Motion follows input events. This slower timer handles animated
            // pixels beneath a stationary cursor, final motion and cancellation.
            if SetTimer(self.hwnd, 1, 33, None) == 0 {
                self.finish(None);
                return Err("色の取得を開始できません".into());
            }
        }
        Ok(())
    }
    unsafe fn update(&mut self, input: Option<POINT>) {
        let motion = input.is_some();
        let point = match input {
            Some(point) => point,
            None => {
                let mut point: POINT = std::mem::zeroed();
                if GetCursorPos(&mut point) == 0 {
                    return;
                }
                point
            }
        };
        let refresh_sample = self.last_sample.elapsed() >= Duration::from_millis(30);
        let moved = !self.follow_valid || point.x != self.point.x || point.y != self.point.y;
        // Input notifications are already rate-limited on the input thread.
        // Gating again here would drop alternating frames when dispatch latency
        // varies, or when a fallback tick ran just before a motion notification.
        if moved
            && (motion
                || !self.follow_valid
                || self.last_follow.elapsed() >= Duration::from_millis(33))
        {
            let mut monitor: MONITORINFO = std::mem::zeroed();
            monitor.cbSize = std::mem::size_of::<MONITORINFO>() as u32;
            let handle = MonitorFromPoint(point, MONITOR_DEFAULTTONEAREST);
            if GetMonitorInfoW(handle, &mut monitor) == 0 {
                return;
            }
            let dpi = GetDpiForWindow(self.hwnd).max(96);
            let scale = (dpi as f64 / 96.).min(4.);
            let width = (300. * scale).round() as i32;
            let height = (114. * scale).round() as i32;
            let x = if point.x + width + 20 < monitor.rcWork.right {
                point.x + 20
            } else {
                point.x - width - 20
            };
            let y = if point.y + height + 22 < monitor.rcWork.bottom {
                point.y + 22
            } else {
                point.y - height - 22
            };
            let mut bounds: RECT = std::mem::zeroed();
            GetWindowRect(self.hwnd, &mut bounds);
            let resized =
                bounds.right - bounds.left != width || bounds.bottom - bounds.top != height;
            let x = x.max(monitor.rcWork.left);
            let y = y.max(monitor.rcWork.top);
            if resized || bounds.left != x || bounds.top != y {
                let flags = SWP_NOACTIVATE | SWP_NOZORDER | if resized { 0 } else { SWP_NOSIZE };
                if SetWindowPos(self.hwnd, HWND_TOPMOST, x, y, width, height, flags) == 0 {
                    self.follow_valid = false;
                    return;
                }
                self.position_updates += 1;
            }
            if resized {
                let region = CreateRoundRectRgn(
                    0,
                    0,
                    width,
                    height,
                    (24. * scale) as i32,
                    (24. * scale) as i32,
                );
                if SetWindowRgn(self.hwnd, region, 0) == 0 {
                    DeleteObject(region);
                }
            }
            self.point = point;
            // Moving the window may synchronously change its monitor/DPI.
            self.follow_valid = GetDpiForWindow(self.hwnd).max(96) == dpi;
            self.last_follow = Instant::now();
        }
        // One 7x7 readback instead of 50 synchronous screen GetPixel calls.
        if refresh_sample {
            if let Some(capture) = self.capture.as_mut() {
                if let Some(pixels) = capture.read(point) {
                    self.sample_updates += 1;
                    let changed = self.pixels != pixels;
                    self.pixels = pixels;
                    self.sample = pixels[24];
                    self.last_sample = Instant::now();
                    if changed {
                        InvalidateRect(self.hwnd, std::ptr::null(), 0);
                    }
                }
            }
        }
    }
    unsafe fn finish(&mut self, point: Option<POINT>) {
        self.active = false;
        KillTimer(self.hwnd, 1);
        self.hook.take();
        self.capture.take();
        let restore = GetForegroundWindow() == self.hwnd;
        ShowWindow(self.hwnd, SW_HIDE);
        DwmFlush();
        if point.is_none() && restore && !self.previous.is_null() {
            SetForegroundWindow(self.previous);
        }
        if point.is_none() {
            self.panel_buffer = None;
            let _ = self
                .shared
                .app
                .emit_to("main", "desktop-color-cancelled", ());
        }
        if let Some(point) = point {
            if !clipboard::input_desktop_is_unlocked() {
                return;
            }
            let dc = GetDC(std::ptr::null_mut());
            if dc.is_null() {
                return;
            }
            let color = GetPixel(dc, point.x, point.y);
            ReleaseDC(std::ptr::null_mut(), dc);
            // Capture before restoring focus: activation can change the sampled UI color.
            if restore && !self.previous.is_null() {
                SetForegroundWindow(self.previous);
            }
            if color == CLR_INVALID {
                self.error =
                    Some("この画面の色を取得できません。保護された画面などは対象外です".into());
                let _ = self
                    .shared
                    .app
                    .emit_to("main", "desktop-color-error", &self.error);
                self.confirmation = Some("この画面の色を取得できません".into());
                self.sample = 0x00201f1e;
                ShowWindow(self.hwnd, SW_SHOWNOACTIVATE);
                InvalidateRect(self.hwnd, std::ptr::null(), 0);
                SetTimer(self.hwnd, 2, 1800, None);
                return;
            }
            self.sample = color;
            let hex = hex(color);
            let value = format(color, &self.prefs);
            let mut copied = Err("クリップボードを開けません".to_string());
            for _ in 0..12 {
                copied = clipboard::copy_text(&value, self.hwnd);
                if copied.is_ok() {
                    break;
                }
                std::thread::sleep(Duration::from_millis(30));
            }
            if self.prefs.remember {
                self.recent.retain(|x| !x.eq_ignore_ascii_case(&hex));
                self.recent.insert(0, hex.clone());
                self.recent.truncate(12);
            }
            let save_error = self.persist(&self.prefs, &self.recent).err();
            self.error = copied.as_ref().err().cloned().or(save_error);
            let result = Picked {
                hex,
                copied: copied.is_ok(),
                error: self.error.clone(),
            };
            let _ = self
                .shared
                .app
                .emit_to("main", "desktop-color-picked", &result);
            self.confirmation = Some(if result.copied {
                format!("{value} をコピーしました")
            } else {
                "コピーできませんでした".into()
            });
            ShowWindow(self.hwnd, SW_SHOWNOACTIVATE);
            InvalidateRect(self.hwnd, std::ptr::null(), 0);
            SetTimer(self.hwnd, 2, 1300, None);
        }
    }
    fn handle(&mut self, op: Operation) -> Result<Status, String> {
        match op {
            Operation::Status => {}
            Operation::Settings(p) => self.configure(p)?,
            Operation::Start => self.start()?,
            Operation::Clear => {
                if self.active {
                    return Err("色の取得を終了してから消去してください".into());
                }
                self.persist(&self.prefs, &[])?;
                self.recent.clear();
            }
        }
        Ok(self.status())
    }
}
// Dedicated input pump: screen readback/painting must never block a global input hook.
thread_local! { static INPUT_TARGET: std::cell::Cell<HWND> = const { std::cell::Cell::new(std::ptr::null_mut()) };
static INPUT_ENABLED: RefCell<Option<Arc<AtomicBool>>> = const { RefCell::new(None) };
static INPUT_MOTION: RefCell<Option<Arc<MotionState>>> = const { RefCell::new(None) };
static FOLLOW_MOTION: RefCell<Option<Arc<MotionState>>> = const { RefCell::new(None) };
static INPUT_LAST_MOTION: std::cell::Cell<Option<Instant>> = const { std::cell::Cell::new(None) }; }
struct InputHook {
    thread: u32,
    enabled: Arc<AtomicBool>,
    motion: Arc<MotionState>,
}
struct MotionState {
    pending: AtomicBool,
    point: AtomicU64,
}
fn pack_point(point: POINT) -> u64 {
    (point.x as u32 as u64) | ((point.y as u32 as u64) << 32)
}
fn unpack_point(point: u64) -> POINT {
    POINT {
        x: point as u32 as i32,
        y: (point >> 32) as u32 as i32,
    }
}
impl InputHook {
    unsafe fn start(hwnd: HWND) -> Result<Self, String> {
        let target = hwnd as usize;
        let enabled = Arc::new(AtomicBool::new(true));
        let hook_enabled = enabled.clone();
        let mut point = std::mem::zeroed();
        if GetCursorPos(&mut point) == 0 {
            return Err("カーソル位置を確認できません".into());
        }
        let motion = Arc::new(MotionState {
            pending: AtomicBool::new(false),
            point: AtomicU64::new(pack_point(point)),
        });
        let hook_motion = motion.clone();
        let (tx, rx) = mpsc::sync_channel(0);
        std::thread::Builder::new()
            .name("color-input".into())
            .spawn(move || unsafe {
                let mut message: MSG = std::mem::zeroed();
                PeekMessageW(&mut message, std::ptr::null_mut(), 0, 0, PM_NOREMOVE);
                INPUT_TARGET.with(|v| v.set(target as HWND));
                INPUT_ENABLED.with(|v| *v.borrow_mut() = Some(hook_enabled));
                INPUT_MOTION.with(|v| *v.borrow_mut() = Some(hook_motion));
                let hook = SetWindowsHookExW(
                    WH_MOUSE_LL,
                    Some(mouse_hook),
                    GetModuleHandleW(std::ptr::null()),
                    0,
                );
                if hook.is_null() {
                    let _ = tx.send(Err("画面の選択操作を開始できません".to_string()));
                    return;
                }
                if tx
                    .send(Ok(
                        windows_sys::Win32::System::Threading::GetCurrentThreadId(),
                    ))
                    .is_ok()
                {
                    while GetMessageW(&mut message, std::ptr::null_mut(), 0, 0) > 0 {
                        TranslateMessage(&message);
                        DispatchMessageW(&message);
                    }
                }
                UnhookWindowsHookEx(hook);
            })
            .map_err(|_| "画面の選択操作を開始できません")?;
        rx.recv_timeout(Duration::from_secs(2))
            .map_err(|_| "選択操作の準備がタイムアウトしました".to_string())?
            .map(|thread| {
                FOLLOW_MOTION.with(|slot| *slot.borrow_mut() = Some(motion.clone()));
                Self {
                    thread,
                    enabled,
                    motion,
                }
            })
    }
}
impl Drop for InputHook {
    fn drop(&mut self) {
        unsafe {
            self.enabled.store(false, Ordering::SeqCst);
            FOLLOW_MOTION.with(|slot| {
                let mut slot = slot.borrow_mut();
                if slot
                    .as_ref()
                    .is_some_and(|current| Arc::ptr_eq(current, &self.motion))
                {
                    slot.take();
                }
            });
            PostThreadMessageW(self.thread, WM_QUIT, 0, 0);
        }
    }
}
unsafe extern "system" fn mouse_hook(code: i32, w: WPARAM, l: LPARAM) -> LRESULT {
    if code >= 0 {
        let target = INPUT_TARGET.with(|v| v.get());
        let enabled = INPUT_ENABLED.with(|v| {
            v.borrow()
                .as_ref()
                .is_some_and(|flag| flag.load(Ordering::SeqCst))
        });
        if !target.is_null() && enabled {
            match w as u32 {
                WM_MOUSEMOVE => {
                    let point = (*(l as *const MSLLHOOKSTRUCT)).pt;
                    let now = Instant::now();
                    let due = INPUT_LAST_MOTION.with(|v| {
                        v.get()
                            .is_none_or(|last| now.duration_since(last) >= FOLLOW_INTERVAL)
                    });
                    INPUT_MOTION.with(|cell| {
                        if let Some(motion) = cell.borrow().as_ref() {
                            // Publish the event's coordinates atomically. Reading
                            // GetCursorPos on another thread can observe an older
                            // OS cursor state while this hook is still returning.
                            motion.point.store(pack_point(point), Ordering::Release);
                            // At most one queued motion message, independent
                            // of mouse polling rate. Never capture or paint here.
                            if due && !motion.pending.swap(true, Ordering::Relaxed) {
                                if PostMessageW(target, MOTION, 0, 0) != 0 {
                                    INPUT_LAST_MOTION.with(|v| v.set(Some(now)));
                                } else {
                                    motion.pending.store(false, Ordering::Relaxed);
                                }
                            }
                        }
                    });
                }
                WM_LBUTTONDOWN | WM_RBUTTONDOWN => return 1,
                WM_LBUTTONUP => {
                    let data = &*(l as *const MSLLHOOKSTRUCT);
                    PostMessageW(target, PICK, data.pt.x as usize, data.pt.y as isize);
                    return 1;
                }
                WM_RBUTTONUP => {
                    PostMessageW(target, CANCEL, 0, 0);
                    return 1;
                }
                _ => {}
            }
        }
    }
    CallNextHookEx(std::ptr::null_mut(), code, w, l)
}
struct SampleBuffer {
    dc: HDC,
    bitmap: HBITMAP,
    previous: HGDIOBJ,
    bits: *mut u32,
}
impl SampleBuffer {
    unsafe fn new() -> Result<Self, String> {
        let dc = CreateCompatibleDC(std::ptr::null_mut());
        if dc.is_null() {
            return Err("採色用メモリを作成できません".into());
        }
        let mut info: BITMAPINFO = std::mem::zeroed();
        info.bmiHeader.biSize = std::mem::size_of::<BITMAPINFOHEADER>() as u32;
        info.bmiHeader.biWidth = 7;
        info.bmiHeader.biHeight = -7;
        info.bmiHeader.biPlanes = 1;
        info.bmiHeader.biBitCount = 32;
        info.bmiHeader.biCompression = BI_RGB;
        let mut bits = std::ptr::null_mut();
        let bitmap = CreateDIBSection(
            dc,
            &info,
            DIB_RGB_COLORS,
            &mut bits,
            std::ptr::null_mut(),
            0,
        );
        if bitmap.is_null() || bits.is_null() {
            if !bitmap.is_null() {
                DeleteObject(bitmap);
            }
            DeleteDC(dc);
            return Err("採色用メモリを作成できません".into());
        }
        let previous = SelectObject(dc, bitmap);
        Ok(Self {
            dc,
            bitmap,
            previous,
            bits: bits.cast(),
        })
    }
    unsafe fn read(&mut self, point: POINT) -> Option<[u32; 49]> {
        let screen = GetDC(std::ptr::null_mut());
        if screen.is_null() {
            return None;
        }
        let ok = BitBlt(
            self.dc,
            0,
            0,
            7,
            7,
            screen,
            point.x - 3,
            point.y - 3,
            SRCCOPY | CAPTUREBLT,
        );
        ReleaseDC(std::ptr::null_mut(), screen);
        if ok == 0 {
            return None;
        }
        GdiFlush();
        let mut pixels = [0; 49];
        for (i, value) in pixels.iter_mut().enumerate() {
            let rgb = *self.bits.add(i);
            *value = ((rgb >> 16) & 255) | (rgb & 0x00ff00) | ((rgb & 255) << 16);
        }
        Some(pixels)
    }
}
impl Drop for SampleBuffer {
    fn drop(&mut self) {
        unsafe {
            SelectObject(self.dc, self.previous);
            DeleteObject(self.bitmap);
            DeleteDC(self.dc);
        }
    }
}
// Stock DC brush avoids allocating 50 GDI brushes per frame.
unsafe fn rect(dc: HDC, area: RECT, color: u32) {
    SetDCBrushColor(dc, color);
    FillRect(dc, &area, GetStockObject(DC_BRUSH));
}
struct PanelBuffer {
    dc: HDC,
    bitmap: HBITMAP,
    previous: HGDIOBJ,
    font: HFONT,
    old_font: HGDIOBJ,
    pen: HPEN,
    width: i32,
    height: i32,
}
impl PanelBuffer {
    unsafe fn new(target: HDC, width: i32, height: i32) -> Option<Self> {
        let dc = CreateCompatibleDC(target);
        if dc.is_null() {
            return None;
        }
        let bitmap = CreateCompatibleBitmap(target, width, height);
        if bitmap.is_null() {
            DeleteDC(dc);
            return None;
        }
        let previous = SelectObject(dc, bitmap);
        let mut font: LOGFONTW = std::mem::zeroed();
        font.lfHeight = -15;
        font.lfWeight = 500;
        let family = wide("Segoe UI");
        font.lfFaceName[..family.len()].copy_from_slice(&family);
        let font = CreateFontIndirectW(&font);
        let old_font = SelectObject(dc, font);
        let pen = CreatePen(PS_SOLID, 2, 0x00ffffff);
        Some(Self {
            dc,
            bitmap,
            previous,
            font,
            old_font,
            pen,
            width,
            height,
        })
    }
}
impl Drop for PanelBuffer {
    fn drop(&mut self) {
        unsafe {
            SelectObject(self.dc, self.old_font);
            SelectObject(self.dc, self.previous);
            DeleteObject(self.font);
            DeleteObject(self.pen);
            DeleteObject(self.bitmap);
            DeleteDC(self.dc);
        }
    }
}
unsafe fn text(dc: HDC, value: &str, area: RECT, color: u32) {
    let mut area = area;
    let value = wide(value);
    SetTextColor(dc, color);
    DrawTextW(
        dc,
        value.as_ptr(),
        (value.len() - 1) as i32,
        &mut area,
        DT_LEFT | DT_VCENTER | DT_SINGLELINE | DT_END_ELLIPSIS,
    );
}
unsafe fn paint(hwnd: HWND) {
    let mut ps: PAINTSTRUCT = std::mem::zeroed();
    let target = BeginPaint(hwnd, &mut ps);
    let mut area: RECT = std::mem::zeroed();
    GetClientRect(hwnd, &mut area);
    WORKER.with(|cell| {
        let Ok(mut cell) = cell.try_borrow_mut() else {
            return;
        };
        let Some(w) = cell.as_mut() else { return };
        if w.panel_buffer
            .as_ref()
            .is_none_or(|p| p.width != area.right || p.height != area.bottom)
        {
            w.panel_buffer = PanelBuffer::new(target, area.right, area.bottom);
        }
        let Some(buffer) = w.panel_buffer.as_ref() else {
            return;
        };
        let dc = buffer.dc;
        let pen = buffer.pen;
        SetMapMode(dc, MM_ANISOTROPIC);
        SetWindowExtEx(dc, 300, 114, std::ptr::null_mut());
        SetViewportExtEx(dc, area.right, area.bottom, std::ptr::null_mut());
        rect(
            dc,
            RECT {
                left: 0,
                top: 0,
                right: 300,
                bottom: 114,
            },
            0x00201f1e,
        );
        SetBkMode(dc, TRANSPARENT as i32);
        if let Some(value) = w.confirmation.as_ref() {
            rect(
                dc,
                RECT {
                    left: 14,
                    top: 18,
                    right: 58,
                    bottom: 62,
                },
                w.sample,
            );
            text(
                dc,
                value,
                RECT {
                    left: 72,
                    top: 20,
                    right: 286,
                    bottom: 58,
                },
                0x00e6e2e3,
            );
            text(
                dc,
                "FlickMemo",
                RECT {
                    left: 72,
                    top: 61,
                    right: 286,
                    bottom: 90,
                },
                0x009f9995,
            );
        } else {
            for row in 0..7 {
                for col in 0..7 {
                    rect(
                        dc,
                        RECT {
                            left: 14 + col * 9,
                            top: 14 + row * 9,
                            right: 23 + col * 9,
                            bottom: 23 + row * 9,
                        },
                        w.pixels[(row * 7 + col) as usize],
                    );
                }
            }
            let oldpen = SelectObject(dc, pen);
            let oldbrush = SelectObject(dc, GetStockObject(NULL_BRUSH));
            Rectangle(dc, 40, 40, 51, 51);
            SelectObject(dc, oldbrush);
            SelectObject(dc, oldpen);
            text(
                dc,
                &format(w.sample, &w.prefs),
                RECT {
                    left: 94,
                    top: 15,
                    right: 287,
                    bottom: 48,
                },
                0x00e6e2e3,
            );
            text(
                dc,
                "クリックでコピー / Escで中止",
                RECT {
                    left: 94,
                    top: 49,
                    right: 287,
                    bottom: 80,
                },
                0x00c0b7af,
            );
            text(
                dc,
                "矢印キーで1px移動 · Enterで決定",
                RECT {
                    left: 14,
                    top: 83,
                    right: 287,
                    bottom: 109,
                },
                0x009f9995,
            );
        }
        SetMapMode(dc, MM_TEXT);
        BitBlt(target, 0, 0, area.right, area.bottom, dc, 0, 0, SRCCOPY);
    });
    EndPaint(hwnd, &ps);
}
unsafe extern "system" fn window_proc(hwnd: HWND, msg: u32, w: WPARAM, l: LPARAM) -> LRESULT {
    if msg == WM_DPICHANGED
        || msg == WM_DISPLAYCHANGE
        || (msg == WM_SETTINGCHANGE && w as u32 == SPI_SETWORKAREA)
    {
        // Defer reflow: SetWindowPos can reenter this procedure while Worker is borrowed.
        PostMessageW(hwnd, REFLOW, 0, 0);
        return 0;
    }
    // Alt+F4 must cancel, never destroy the service window with an input hook alive.
    if msg == WM_CLOSE {
        PostMessageW(hwnd, CANCEL, 0, 0);
        return 0;
    }
    if msg == WM_DESTROY {
        PostQuitMessage(0);
        return 0;
    }
    if msg == WM_ERASEBKGND {
        return 1;
    }
    if msg == WM_PAINT {
        paint(hwnd);
        return 0;
    }
    if [
        REQUEST,
        PICK,
        CANCEL,
        MOTION,
        REFLOW,
        WM_TIMER,
        WM_HOTKEY,
        WM_KEYDOWN,
        WM_ACTIVATE,
    ]
    .contains(&msg)
    {
        // A native call can reenter window_proc while Worker is borrowed.
        // Acknowledge motion independently and never requeue it in a tight loop.
        let input_point = if msg == MOTION {
            FOLLOW_MOTION.with(|slot| {
                slot.borrow().as_ref().map(|motion| {
                    motion.pending.store(false, Ordering::Relaxed);
                    unpack_point(motion.point.load(Ordering::Acquire))
                })
            })
        } else {
            None
        };
        WORKER.with(|cell| {
            let Ok(mut cell) = cell.try_borrow_mut() else {
                return;
            };
            let Some(worker) = cell.as_mut() else { return };
            match msg {
                REFLOW => {
                    if worker.active {
                        worker.follow_valid = false;
                        worker.last_follow = Instant::now() - Duration::from_secs(1);
                        worker.update(None);
                        InvalidateRect(hwnd, std::ptr::null(), 0);
                    }
                }
                MOTION => {
                    if worker.active {
                        if let Some(point) = input_point {
                            worker.motion_updates += 1;
                            worker.update(Some(point));
                        }
                    }
                }
                REQUEST => {
                    while let Ok(request) = worker.queue.try_recv() {
                        let result = worker.handle(request.operation);
                        let _ = request.reply.send(result);
                    }
                }
                WM_HOTKEY => {
                    if worker.registered == Some(w as i32) {
                        if let Err(error) = worker.start() {
                            worker.error = Some(error);
                        }
                    }
                }
                PICK => {
                    if worker.active {
                        worker.finish(Some(POINT {
                            x: w as i32,
                            y: l as i32,
                        }));
                    }
                }
                CANCEL => {
                    if worker.active {
                        worker.finish(None);
                    }
                }
                WM_ACTIVATE => {
                    if w & 0xffff == WA_INACTIVE as usize && worker.active {
                        worker.finish(None);
                    }
                }
                WM_TIMER => {
                    if w == 2 {
                        ShowWindow(hwnd, SW_HIDE);
                        KillTimer(hwnd, 2);
                        worker.panel_buffer = None;
                    } else if worker.active {
                        if worker.began.elapsed() > Duration::from_secs(60)
                            || !clipboard::input_desktop_is_unlocked()
                        {
                            worker.finish(None);
                        } else {
                            worker.update(None);
                        }
                    }
                }
                WM_KEYDOWN => {
                    if worker.active {
                        match w as u16 {
                            VK_ESCAPE => worker.finish(None),
                            VK_RETURN => {
                                let mut p = std::mem::zeroed();
                                if GetCursorPos(&mut p) != 0 {
                                    worker.finish(Some(p));
                                }
                            }
                            VK_LEFT | VK_RIGHT | VK_UP | VK_DOWN => {
                                let mut p = std::mem::zeroed();
                                if GetCursorPos(&mut p) != 0 {
                                    match w as u16 {
                                        VK_LEFT => p.x -= 1,
                                        VK_RIGHT => p.x += 1,
                                        VK_UP => p.y -= 1,
                                        _ => p.y += 1,
                                    }
                                    SetCursorPos(p.x, p.y);
                                    worker.update(Some(p));
                                }
                            }
                            _ => {}
                        }
                    }
                }
                _ => {}
            }
        });
        return 0;
    }
    DefWindowProcW(hwnd, msg, w, l)
}
pub fn start(shared: Arc<Shared>) -> Service {
    let (ready_tx, ready_rx) = mpsc::sync_channel(1);
    let (queue_tx, queue_rx) = mpsc::sync_channel(8);
    let spawned = std::thread::Builder::new()
        .name("flickmemo-color-picker".into())
        .spawn(move || unsafe {
            SetThreadDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);
            let class = wide(CLASS);
            let instance = GetModuleHandleW(std::ptr::null());
            let mut wc: WNDCLASSW = std::mem::zeroed();
            wc.lpfnWndProc = Some(window_proc);
            wc.hInstance = instance;
            wc.lpszClassName = class.as_ptr();
            wc.hCursor = LoadCursorW(std::ptr::null_mut(), IDC_CROSS);
            if RegisterClassW(&wc) == 0 {
                let _ = ready_tx.send(Err("色の選択画面を作成できません".to_string()));
                return;
            }
            let hwnd = CreateWindowExW(
                WS_EX_TOOLWINDOW | WS_EX_TOPMOST,
                class.as_ptr(),
                wide("FlickMemo Color Picker").as_ptr(),
                WS_POPUP,
                0,
                0,
                300,
                114,
                std::ptr::null_mut(),
                std::ptr::null_mut(),
                instance,
                std::ptr::null(),
            );
            if hwnd.is_null() {
                let _ = ready_tx.send(Err("色の選択画面を作成できません".to_string()));
                return;
            }
            let region = CreateRoundRectRgn(0, 0, 300, 114, 24, 24);
            if SetWindowRgn(hwnd, region, 0) == 0 {
                DeleteObject(region);
            }
            let stored = shared
                .inner
                .lock()
                .ok()
                .and_then(|s| s.store.secret("color-picker").ok().flatten());
            let (prefs, recent) = stored
                .and_then(|v| serde_json::from_slice::<(Preferences, Vec<String>)>(&v).ok())
                .filter(|(p, _)| validate(p).is_ok())
                .unwrap_or_default();
            let recent = if prefs.remember {
                recent
                    .into_iter()
                    .filter(|v| valid_hex(v))
                    .take(12)
                    .collect()
            } else {
                Vec::new()
            };
            let mut worker = Worker {
                shared,
                hwnd,
                queue: queue_rx,
                prefs,
                recent,
                error: None,
                registered: None,
                active: false,
                hook: None,
                capture: None,
                last_sample: Instant::now(),
                last_follow: Instant::now(),
                follow_valid: false,
                panel_buffer: None,
                position_updates: 0,
                sample_updates: 0,
                motion_updates: 0,
                previous: std::ptr::null_mut(),
                began: Instant::now(),
                sample: 0,
                pixels: [0; 49],
                point: POINT { x: 0, y: 0 },
                confirmation: None,
            };
            if worker.prefs.enabled && worker.shared.diagnostic_directory.is_none() {
                let (modifiers, key) = shortcut(&worker.prefs.shortcut).unwrap();
                if RegisterHotKey(hwnd, 100, modifiers, key) != 0 {
                    worker.registered = Some(100);
                } else {
                    worker.error = Some(
                        "ショートカットが他のアプリと重複しています。設定で変更してください".into(),
                    );
                }
            }
            WORKER.with(|cell| *cell.borrow_mut() = Some(worker));
            // A timed-out caller no longer owns this worker. Clean up its hotkey/window.
            if ready_tx.send(Ok(hwnd as usize)).is_ok() {
                let mut message: MSG = std::mem::zeroed();
                while GetMessageW(&mut message, std::ptr::null_mut(), 0, 0) > 0 {
                    TranslateMessage(&message);
                    DispatchMessageW(&message);
                }
            }
            WORKER.with(|cell| {
                if let Some(mut worker) = cell.borrow_mut().take() {
                    worker.finish(None);
                    if let Some(id) = worker.registered {
                        UnregisterHotKey(hwnd, id);
                    }
                }
            });
            DestroyWindow(hwnd);
        });
    if spawned.is_err() {
        return Service(Err("色の取得処理を起動できません".into()));
    }
    Service(
        ready_rx
            .recv_timeout(Duration::from_secs(5))
            .map_err(|_| "色の取得処理の起動がタイムアウトしました".to_string())
            .and_then(|result| result)
            .map(|hwnd| Controller {
                hwnd,
                queue: queue_tx,
            }),
    )
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn motion_snapshots_preserve_negative_and_extreme_virtual_desktop_coordinates() {
        for (x, y) in [(0, 0), (-1920, -1080), (1920, 1080), (i32::MIN, i32::MAX)] {
            let state = MotionState {
                pending: AtomicBool::new(false),
                point: AtomicU64::new(0),
            };
            state
                .point
                .store(pack_point(POINT { x, y }), Ordering::Release);
            let actual = unpack_point(state.point.load(Ordering::Acquire));
            assert_eq!((actual.x, actual.y), (x, y));
        }
    }
    #[test]
    fn shortcuts_and_preferences_reject_reserved_or_ambiguous_input() {
        for key in ["Ctrl+Alt+C", "Alt+Shift+0", "Ctrl+Shift+Z"] {
            assert!(shortcut(key).is_ok());
        }
        for key in [
            "C",
            "Ctrl+C",
            "Win+Alt+C",
            "Ctrl+Alt+Escape",
            "Ctrl+Alt+c",
            "Ctrl+Alt+あ",
            "Ctrl+Alt+CC",
        ] {
            assert!(shortcut(key).is_err());
        }
        let mut p = Preferences::default();
        p.format = "javascript".into();
        assert!(validate(&p).is_err());
    }
    #[test]
    fn colorref_conversion_formats_and_achromatic_colors() {
        let mut p = Preferences::default();
        assert_eq!(format(0x003357cb, &p), "#CB5733");
        p.uppercase = false;
        assert_eq!(format(0x003357cb, &p), "#cb5733");
        p.format = "rgb".into();
        assert_eq!(format(0x003357cb, &p), "rgb(203, 87, 51)");
        p.format = "hsl".into();
        assert_eq!(format(0, &p), "hsl(0, 0%, 0%)");
        assert_eq!(format(0xffffff, &p), "hsl(0, 0%, 100%)");
        assert_eq!(format(255, &p), "hsl(0, 100%, 50%)");
        assert!(!valid_hex("#abc"));
        assert!(!valid_hex("url(x)"));
    }
}
