use crate::{history_store::MAX_TEXT, Shared};
use std::{cell::RefCell, sync::Arc};
use windows_sys::Win32::{
    Foundation::*,
    System::{
        DataExchange::*, LibraryLoader::GetModuleHandleW, Memory::*, RemoteDesktop::*, Threading::*,
    },
    UI::WindowsAndMessaging::*,
};
thread_local! { static STATE: RefCell<Option<Arc<Shared>>> = const { RefCell::new(None) }; }
fn wide(text: &str) -> Vec<u16> {
    text.encode_utf16().chain(Some(0)).collect()
}

fn excluded() -> bool {
    unsafe {
        for name in [
            "ExcludeClipboardContentFromMonitorProcessing",
            "FlickMemo.PrivateClipboard",
        ] {
            let format = RegisterClipboardFormatW(wide(name).as_ptr());
            if format == 0 || IsClipboardFormatAvailable(format) != 0 {
                return true;
            }
        }
        // Explicit zero means an application prohibits Windows history/cloud recording.
        for name in ["CanIncludeInClipboardHistory", "CanUploadToCloudClipboard"] {
            let format = RegisterClipboardFormatW(wide(name).as_ptr());
            if format == 0 {
                return true;
            }
            if IsClipboardFormatAvailable(format) != 0 {
                let handle = GetClipboardData(format);
                if handle.is_null() || GlobalSize(handle) < 4 {
                    return true;
                }
                let data = GlobalLock(handle);
                if data.is_null() {
                    return true;
                }
                let value = std::ptr::read_unaligned(data.cast::<u32>());
                GlobalUnlock(handle);
                if value == 0 {
                    return true;
                }
            }
        }
    }
    false
}
fn excluded_process(shared: &Shared) -> bool {
    unsafe {
        let mut pid = 0;
        GetWindowThreadProcessId(GetClipboardOwner(), &mut pid);
        if pid == 0 {
            return false;
        }
        let handle = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, 0, pid);
        if handle.is_null() {
            return true;
        }
        let mut path = [0u16; 1024];
        let mut len = path.len() as u32;
        let success = QueryFullProcessImageNameW(handle, 0, path.as_mut_ptr(), &mut len);
        CloseHandle(handle);
        if success == 0 {
            return true;
        }
        let path = String::from_utf16_lossy(&path[..len as usize]).to_lowercase();
        let name = path.rsplit('\\').next().unwrap_or("");
        shared
            .inner
            .lock()
            .map(|s| s.excluded.iter().any(|item| item == name))
            .unwrap_or(true)
    }
}
struct ClipboardGuard;
impl Drop for ClipboardGuard {
    fn drop(&mut self) {
        unsafe {
            CloseClipboard();
        }
    }
}

fn read(hwnd: HWND, shared: &Shared) -> Result<Option<(String, &'static str)>, String> {
    unsafe {
        let mut opened = false;
        for _ in 0..3 {
            if OpenClipboard(hwnd) != 0 {
                opened = true;
                break;
            }
            std::thread::sleep(std::time::Duration::from_millis(15));
        }
        if !opened {
            return Err("他のアプリがクリップボードを使用中のため記録できませんでした".into());
        }
        let _guard = ClipboardGuard;
        if excluded() || excluded_process(shared) {
            return Ok(None);
        }
        if IsClipboardFormatAvailable(13) != 0 {
            let handle = GetClipboardData(13);
            if handle.is_null() {
                return Err("文字の取得に失敗しました".into());
            }
            let bytes = GlobalSize(handle);
            if bytes > (MAX_TEXT + 1) * 2 {
                return Err("64KiBを超える文字は記録しませんでした".into());
            }
            if bytes < 2 || bytes % 2 != 0 {
                return Err("文字データの形式が不正です".into());
            }
            let ptr = GlobalLock(handle).cast::<u16>();
            if ptr.is_null() {
                return Err("文字の読取りに失敗しました".into());
            }
            let data = std::slice::from_raw_parts(ptr, bytes / 2);
            let length = data.iter().position(|c| *c == 0);
            let result = match length {
                Some(length) => String::from_utf16(&data[..length])
                    .map_err(|_| "文字コードが不正です".to_string()),
                None => Err("文字データの終端がありません".into()),
            };
            GlobalUnlock(handle);
            let text = result?;
            if text.len() > MAX_TEXT {
                return Err("64KiBを超える文字は記録しませんでした".into());
            }
            return Ok(Some((text, "text")));
        }
        if IsClipboardFormatAvailable(8) != 0
            || IsClipboardFormatAvailable(17) != 0
            || IsClipboardFormatAvailable(2) != 0
        {
            return Ok(Some((String::new(), "image_placeholder")));
        }
        Ok(None)
    }
}

unsafe extern "system" fn wndproc(hwnd: HWND, msg: u32, wparam: WPARAM, lparam: LPARAM) -> LRESULT {
    STATE.with(|slot| {
        if let Some(shared) = slot.borrow().as_ref() {
            if msg == WM_WTSSESSION_CHANGE {
                if let Ok(mut inner) = shared.inner.lock() {
                    if wparam == WTS_SESSION_LOCK as usize {
                        inner.locked = true;
                    } else if wparam == WTS_SESSION_UNLOCK as usize {
                        inner.locked = false;
                    }
                }
            }
            if msg == WM_CLIPBOARDUPDATE {
                // Bind owner/generation before reading. Never move a captured value into a newly selected account.
                let context = shared.inner.lock().ok().and_then(|s| {
                    if s.recording && !s.locked {
                        Some((s.owner.clone(), s.generation))
                    } else {
                        None
                    }
                });
                if let Some((owner, generation)) = context {
                    let result = read(hwnd, shared);
                    if let Ok(mut s) = shared.inner.lock() {
                        if s.owner == owner
                            && s.generation == generation
                            && s.recording
                            && !s.locked
                        {
                            match result {
                                Ok(Some((text, kind))) => {
                                    s.last_error = s.store.record(&owner, &text, kind).err();
                                    shared.wake.notify_one();
                                }
                                Err(error) => s.last_error = Some(error),
                                _ => {}
                            }
                        }
                    }
                    shared.changed();
                }
                return 0;
            }
        }
        DefWindowProcW(hwnd, msg, wparam, lparam)
    })
}
pub fn start(shared: Arc<Shared>) -> Result<(), String> {
    let (tx, rx) = std::sync::mpsc::sync_channel(1);
    std::thread::Builder::new()
        .name("clipboard-events".into())
        .spawn(move || unsafe {
            STATE.with(|slot| *slot.borrow_mut() = Some(shared));
            let name = wide("FlickMemoClipboardListener");
            let module = GetModuleHandleW(std::ptr::null());
            let class = WNDCLASSW {
                lpfnWndProc: Some(wndproc),
                hInstance: module,
                lpszClassName: name.as_ptr(),
                ..std::mem::zeroed()
            };
            if RegisterClassW(&class) == 0 {
                let _ = tx.send(Err("クリップボード通知の登録に失敗しました".into()));
                return;
            }
            let hwnd = CreateWindowExW(
                0,
                name.as_ptr(),
                name.as_ptr(),
                0,
                0,
                0,
                0,
                0,
                std::ptr::null_mut(),
                std::ptr::null_mut(),
                module,
                std::ptr::null(),
            );
            if hwnd.is_null() {
                let _ = tx.send(Err("通知用ウィンドウを作成できません".into()));
                return;
            }
            // If locking notifications cannot be registered, disable capture entirely.
            if AddClipboardFormatListener(hwnd) == 0
                || WTSRegisterSessionNotification(hwnd, NOTIFY_FOR_THIS_SESSION) == 0
            {
                RemoveClipboardFormatListener(hwnd);
                DestroyWindow(hwnd);
                let _ = tx.send(Err(
                    "Windowsの変更通知・画面ロック通知を登録できません".into()
                ));
                return;
            }
            let _ = tx.send(Ok(()));
            let mut message = std::mem::zeroed();
            while GetMessageW(&mut message, std::ptr::null_mut(), 0, 0) > 0 {
                TranslateMessage(&message);
                DispatchMessageW(&message);
            }
            RemoveClipboardFormatListener(hwnd);
            WTSUnRegisterSessionNotification(hwnd);
            DestroyWindow(hwnd);
        })
        .map_err(|_| "通知処理を開始できません")?;
    rx.recv_timeout(std::time::Duration::from_secs(5))
        .map_err(|_| "通知処理の開始がタイムアウトしました")?
}
pub fn copy_text(text: &str, hwnd: HWND) -> Result<(), String> {
    if text.len() > MAX_TEXT {
        return Err("コピーできるのは64KiBまでです".into());
    }
    unsafe {
        if hwnd.is_null() || OpenClipboard(hwnd) == 0 {
            return Err("クリップボードを開けません".into());
        }
        let _guard = ClipboardGuard;
        let data = wide(text);
        let handle = GlobalAlloc(GMEM_MOVEABLE, data.len() * 2);
        if handle.is_null() {
            return Err("コピー用メモリを確保できません".into());
        }
        let ptr = GlobalLock(handle).cast::<u16>();
        if ptr.is_null() {
            GlobalFree(handle);
            return Err("コピー用メモリを取得できません".into());
        }
        std::ptr::copy_nonoverlapping(data.as_ptr(), ptr, data.len());
        GlobalUnlock(handle);
        if EmptyClipboard() == 0 {
            GlobalFree(handle);
            return Err("クリップボードを更新できません".into());
        }
        // An owner HWND is required for SetClipboardData after EmptyClipboard.
        if SetClipboardData(13, handle).is_null() {
            GlobalFree(handle);
            return Err("コピーできませんでした".into());
        }
        let marker = RegisterClipboardFormatW(wide("FlickMemo.PrivateClipboard").as_ptr());
        let flag = GlobalAlloc(GMEM_MOVEABLE | GMEM_ZEROINIT, 4);
        if marker != 0 && !flag.is_null() && SetClipboardData(marker, flag).is_null() {
            GlobalFree(flag);
        }
        Ok(())
    }
}

pub fn import_windows(shared: &Shared) -> Result<usize, String> {
    use windows_sys::Win32::System::Com::{CoInitializeEx, CoUninitialize, COINIT_MULTITHREADED};
    if unsafe { CoInitializeEx(std::ptr::null(), COINIT_MULTITHREADED as u32) } < 0 {
        return Err("Windows履歴の読取りを開始できません".into());
    }
    struct Apartment;
    impl Drop for Apartment {
        fn drop(&mut self) {
            unsafe {
                CoUninitialize();
            }
        }
    }
    let _apartment = Apartment;
    use windows::ApplicationModel::DataTransfer::{
        Clipboard, ClipboardHistoryItemsResultStatus, StandardDataFormats,
    };
    let (owner, generation) = {
        let s = shared.inner.lock().map_err(|_| "履歴を開けません")?;
        if s.locked {
            return Err("画面ロック中は取得できません".into());
        }
        (s.owner.clone(), s.generation)
    };
    let result = Clipboard::GetHistoryItemsAsync()
        .and_then(|op| op.get())
        .map_err(|_| "Win＋Vの履歴を取得できません")?;
    let status = result.Status().map_err(|_| "取得結果を確認できません")?;
    if status == ClipboardHistoryItemsResultStatus::ClipboardHistoryDisabled {
        return Err("Windowsの履歴は無効です。今後のコピーの記録は利用できます".into());
    }
    if status != ClipboardHistoryItemsResultStatus::Success {
        return Err("Windowsから既存履歴へのアクセスを許可されませんでした".into());
    }
    let items = result.Items().map_err(|_| "既存履歴を読めません")?;
    let mut saved = 0;
    // Windows history itself is bounded. Process oldest first, one item at a time.
    for index in (0..items.Size().map_err(|_| "履歴件数を読めません")?.min(1000)).rev() {
        let view = items
            .GetAt(index)
            .and_then(|v| v.Content())
            .map_err(|_| "履歴内容を読めません")?;
        let kind;
        let text;
        if view
            .Contains(&StandardDataFormats::Text().map_err(|_| "形式を確認できません")?)
            .unwrap_or(false)
        {
            text = view
                .GetTextAsync()
                .and_then(|op| op.get())
                .map_err(|_| "履歴の文字を読めません")?
                .to_string();
            kind = "text";
            if text.len() > MAX_TEXT {
                continue;
            }
        } else if view
            .Contains(&StandardDataFormats::Bitmap().map_err(|_| "形式を確認できません")?)
            .unwrap_or(false)
        {
            text = String::new();
            kind = "image_placeholder";
        } else {
            continue;
        }
        let mut s = shared.inner.lock().map_err(|_| "履歴を保存できません")?;
        if s.owner != owner || s.generation != generation || s.locked {
            return Err("アカウントが変わったため取込みを中止しました".into());
        }
        s.store.record(&owner, &text, kind)?;
        saved += 1;
    }
    shared.wake.notify_one();
    shared.changed();
    Ok(saved)
}
