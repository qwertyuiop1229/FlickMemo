use serde::Serialize;
use std::{
    fs::{File, OpenOptions},
    io::Write,
    path::PathBuf,
    sync::{Arc, Mutex},
};
use tauri::{
    ipc::{InvokeBody, Request},
    State, WebviewWindow,
};
pub type Service = Arc<Mutex<Receiver>>;
#[derive(Default)]
pub struct Receiver {
    directory: Option<PathBuf>,
    active: Option<Partial>,
    selection_generation: u64,
}
struct Partial {
    id: String,
    file: Option<File>,
    temporary: PathBuf,
    destination: PathBuf,
    size: u64,
    written: u64,
}
impl Drop for Partial {
    fn drop(&mut self) {
        self.file.take();
        let _ = std::fs::remove_file(&self.temporary);
    }
}
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Started {
    id: String,
    saved_name: String,
}
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Saved {
    saved: bool,
    saved_name: String,
    size: u64,
}
fn safe_name(name: &str) -> String {
    let clean: String = name
        .chars()
        .take(100)
        .map(|c| {
            if c.is_control() || "\\/<>:\"|?*".contains(c) {
                '_'
            } else {
                c
            }
        })
        .collect();
    let clean = clean.trim_matches([' ', '.']);
    if clean.is_empty() {
        "file".into()
    } else {
        clean.into()
    }
}
impl Receiver {
    pub fn diagnostic(directory: PathBuf) -> Self {
        Self {
            directory: Some(directory),
            ..Self::default()
        }
    }
    fn begin_selection(&mut self) -> u64 {
        self.selection_generation = self.selection_generation.wrapping_add(1);
        self.selection_generation
    }
    fn select_directory(&mut self, generation: u64, directory: PathBuf) -> Result<bool, String> {
        if generation != self.selection_generation {
            return Ok(false);
        }
        if self.active.is_some() {
            return Err("受信が終了してから保存先を選択してください".into());
        }
        self.directory = Some(directory);
        Ok(true)
    }
    fn forget(&mut self) {
        self.begin_selection();
        self.active.take();
        self.directory = None;
    }

    fn begin(&mut self, name: &str, size: u64) -> Result<Started, String> {
        if self.active.is_some() || size > 9_007_199_254_740_991 {
            return Err("別のファイルを受信中、またはサイズが不正です".into());
        }
        let directory = self
            .directory
            .as_ref()
            .ok_or("受信の保存先を選択してください")?;
        let id = uuid::Uuid::new_v4().to_string();
        let clean = safe_name(name);
        let path = std::path::Path::new(&clean);
        let stem = path.file_stem().and_then(|v| v.to_str()).unwrap_or("file");
        let ext = path
            .extension()
            .and_then(|v| v.to_str())
            .map(|s| format!(".{s}"))
            .unwrap_or_default();
        let saved_name = format!("{stem} ({id}){ext}");
        let destination = directory.join(&saved_name);
        let temporary = directory.join(format!("FlickMemo-{id}.part"));
        let file = OpenOptions::new()
            .write(true)
            .create_new(true)
            .open(&temporary)
            .map_err(|_| "保存先へ書き込めません。空き容量と権限を確認してください")?;
        self.active = Some(Partial {
            id: id.clone(),
            file: Some(file),
            temporary,
            destination,
            size,
            written: 0,
        });
        Ok(Started { id, saved_name })
    }
    fn write(&mut self, id: &str, offset: u64, data: &[u8]) -> Result<(), String> {
        let active = self
            .active
            .as_mut()
            .filter(|p| p.id == id)
            .ok_or("受信が終了しています")?;
        if data.is_empty()
            || data.len() > 32768
            || offset != active.written
            || offset.saturating_add(data.len() as u64) > active.size
        {
            return Err("受信データの順序・サイズが不正です".into());
        }
        active
            .file
            .as_mut()
            .ok_or("受信が終了しています")?
            .write_all(data)
            .map_err(|_| "保存先へ書き込めません。空き容量を確認してください")?;
        active.written += data.len() as u64;
        Ok(())
    }
    fn finish(&mut self, id: &str) -> Result<Saved, String> {
        let active = self
            .active
            .as_mut()
            .filter(|p| p.id == id)
            .ok_or("受信が終了しています")?;
        if active.written != active.size {
            return Err("受信ファイルが不完全です".into());
        }
        active
            .file
            .as_mut()
            .ok_or("受信が終了しています")?
            .sync_all()
            .map_err(|_| "受信ファイルを保存できません")?;
        active.file.take();
        use std::os::windows::ffi::OsStrExt;
        let source =
            std::fs::canonicalize(&active.temporary).map_err(|_| "受信ファイルを確認できません")?;
        let target = source.parent().ok_or("保存先を確認できません")?.join(
            active
                .destination
                .file_name()
                .ok_or("ファイル名を確認できません")?,
        );
        let from: Vec<u16> = source.as_os_str().encode_wide().chain(Some(0)).collect();
        let to: Vec<u16> = target.as_os_str().encode_wide().chain(Some(0)).collect();
        if unsafe {
            windows_sys::Win32::Storage::FileSystem::MoveFileExW(
                from.as_ptr(),
                to.as_ptr(),
                windows_sys::Win32::Storage::FileSystem::MOVEFILE_WRITE_THROUGH,
            )
        } == 0
        {
            return Err("受信ファイルを確定できません。保存先を確認してください".into());
        }
        let result = Saved {
            saved: true,
            saved_name: active
                .destination
                .file_name()
                .unwrap_or_default()
                .to_string_lossy()
                .into(),
            size: active.size,
        };
        self.active.take();
        Ok(result)
    }
}
async fn task<T: Send + 'static>(
    work: impl FnOnce() -> Result<T, String> + Send + 'static,
) -> Result<T, String> {
    tauri::async_runtime::spawn_blocking(work)
        .await
        .map_err(|_| "ファイル保存処理が終了しました".to_string())?
}
#[tauri::command]
pub async fn desktop_receive_directory(
    window: WebviewWindow,
    state: State<'_, Service>,
) -> Result<Option<String>, String> {
    let state = state.inner().clone();
    let hwnd = window.hwnd().map_err(|_| "画面を確認できません")?.0 as usize;
    let generation = state
        .lock()
        .map_err(|_| "保存先選択を開始できません")?
        .begin_selection();
    task(move || unsafe {
        use windows::Win32::{Foundation::HWND, System::Com::*, UI::Shell::*};
        CoInitializeEx(None, COINIT_APARTMENTTHREADED)
            .ok()
            .map_err(|_| "保存先選択を開始できません")?;
        struct Com;
        impl Drop for Com {
            fn drop(&mut self) {
                unsafe {
                    CoUninitialize();
                }
            }
        }
        let _com = Com;
        let dialog: IFileOpenDialog = CoCreateInstance(&FileOpenDialog, None, CLSCTX_INPROC_SERVER)
            .map_err(|_| "保存先選択を開始できません")?;
        dialog
            .SetOptions(
                dialog
                    .GetOptions()
                    .map_err(|_| "保存先選択を開始できません")?
                    | FOS_PICKFOLDERS
                    | FOS_FORCEFILESYSTEM,
            )
            .map_err(|_| "保存先選択を開始できません")?;
        if let Err(error) = dialog.Show(Some(HWND(hwnd as *mut _))) {
            if error.code().0 as u32 == 0x800704c7 {
                return Ok(None);
            }
            return Err("保存先を選択できません".into());
        }
        let name = dialog
            .GetResult()
            .and_then(|item| item.GetDisplayName(SIGDN_FILESYSPATH))
            .map_err(|_| "保存先を確認できません")?;
        let value = name.to_string();
        CoTaskMemFree(Some(name.0.cast()));
        let path = PathBuf::from(value.map_err(|_| "保存先のパスを読めません")?);
        let display = path
            .file_name()
            .unwrap_or_default()
            .to_string_lossy()
            .into_owned();
        let mut receiver = state.lock().map_err(|_| "保存処理を開始できません")?;
        Ok(receiver
            .select_directory(generation, path)?
            .then_some(display))
    })
    .await
}
#[tauri::command]
pub async fn desktop_receive_begin(
    shared: State<'_, Arc<crate::Shared>>,
    state: State<'_, Service>,
    name: String,
    size: u64,
) -> Result<Started, String> {
    let diagnostic = shared
        .diagnostic_directory
        .as_ref()
        .map(|root| root.join("receive-test"));
    let state = state.inner().clone();
    task(move || {
        let mut receiver = state.lock().map_err(|_| "保存処理を開始できません")?;
        if receiver.directory.is_none() {
            if let Some(directory) = diagnostic {
                receiver.directory = Some(directory);
            }
        }
        receiver.begin(&name, size)
    })
    .await
}
#[tauri::command]
pub async fn desktop_receive_write(
    request: Request<'_>,
    state: State<'_, Service>,
) -> Result<(), String> {
    let id = request
        .headers()
        .get("x-flickmemo-transfer")
        .and_then(|v| v.to_str().ok())
        .ok_or("受信IDがありません")?
        .to_string();
    let offset = request
        .headers()
        .get("x-flickmemo-offset")
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.parse::<u64>().ok())
        .ok_or("受信位置が不正です")?;
    let data = match request.body() {
        InvokeBody::Raw(data) if data.len() <= 32768 => data.clone(),
        _ => return Err("受信データが不正です".into()),
    };
    let state = state.inner().clone();
    task(move || {
        state
            .lock()
            .map_err(|_| "保存処理を開始できません")?
            .write(&id, offset, &data)
    })
    .await
}
#[tauri::command]
pub async fn desktop_receive_finish(
    state: State<'_, Service>,
    id: String,
) -> Result<Saved, String> {
    let state = state.inner().clone();
    task(move || {
        state
            .lock()
            .map_err(|_| "保存処理を開始できません")?
            .finish(&id)
    })
    .await
}
#[tauri::command]
pub async fn desktop_receive_abort(
    state: State<'_, Service>,
    id: Option<String>,
) -> Result<(), String> {
    let state = state.inner().clone();
    task(move || {
        let mut receiver = state.lock().map_err(|_| "保存処理を終了できません")?;
        if id
            .as_ref()
            .is_none_or(|id| receiver.active.as_ref().is_some_and(|p| &p.id == id))
        {
            receiver.active.take();
        }
        if id.is_none() {
            receiver.forget();
        }
        Ok(())
    })
    .await
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn writes_in_order_commits_only_complete_files_and_cleans_partial_data() {
        let dir =
            std::env::temp_dir().join(format!("FlickMemo-receive-test-{}", uuid::Uuid::new_v4()));
        std::fs::create_dir(&dir).unwrap();
        let mut receiver = Receiver {
            directory: Some(dir.clone()),
            ..Receiver::default()
        };
        let started = receiver.begin("../日本語.txt", 3).unwrap();
        assert!(receiver.write(&started.id, 1, &[1]).is_err());
        receiver.write(&started.id, 0, &[1, 2]).unwrap();
        assert!(receiver.finish(&started.id).is_err());
        receiver.write(&started.id, 2, &[3]).unwrap();
        let result = receiver.finish(&started.id).unwrap();
        assert_eq!(
            std::fs::read(dir.join(&result.saved_name)).unwrap(),
            vec![1, 2, 3]
        );
        std::fs::remove_file(dir.join(result.saved_name)).unwrap();
        let empty = receiver.begin("empty.bin", 0).unwrap();
        let empty = receiver.finish(&empty.id).unwrap();
        assert_eq!(
            std::fs::metadata(dir.join(&empty.saved_name))
                .unwrap()
                .len(),
            0
        );
        std::fs::remove_file(dir.join(empty.saved_name)).unwrap();
        receiver.begin("cancel.bin", 100).unwrap();
        receiver.active.take();
        assert_eq!(std::fs::read_dir(&dir).unwrap().count(), 0);
        std::fs::remove_dir(dir).unwrap();
    }
    #[test]
    fn stale_directory_dialogs_cannot_restore_a_forgotten_or_newer_session_permission() {
        let mut receiver = Receiver::default();
        let old = receiver.begin_selection();
        receiver.forget();
        assert!(!receiver
            .select_directory(old, PathBuf::from("old-session"))
            .unwrap());
        assert!(receiver.directory.is_none());
        assert!(receiver.begin("blocked.bin", 1).is_err());
        let stale = receiver.begin_selection();
        let latest = receiver.begin_selection();
        assert!(!receiver
            .select_directory(stale, PathBuf::from("stale-choice"))
            .unwrap());
        assert!(receiver
            .select_directory(latest, PathBuf::from("current-choice"))
            .unwrap());
        assert_eq!(receiver.directory, Some(PathBuf::from("current-choice")));
    }
}
