use crate::Shared;
use serde::Serialize;
use std::sync::Arc;
use tauri::State;
use windows_sys::Win32::{Foundation::*, System::Registry::*};
const KEY: &str = "Software\\Microsoft\\Windows\\CurrentVersion\\Run";
fn wide(value: &str) -> Vec<u16> {
    value.encode_utf16().chain(Some(0)).collect()
}
fn command(path: &str) -> Result<String, String> {
    if path.contains(['"', '\r', '\n', '\0']) {
        return Err("自動起動パスが不正です".into());
    }
    let value = format!("\"{path}\"");
    if value.encode_utf16().count() > 260 {
        return Err("インストール先のパスが長すぎるため自動起動に登録できません".into());
    }
    Ok(value)
}
fn expected() -> Result<String, String> {
    command(
        &std::env::current_exe()
            .map_err(|_| "実行ファイルを確認できません")?
            .to_string_lossy(),
    )
}
fn current_value() -> Result<Option<String>, String> {
    let mut data = [0u16; 4096];
    let mut size = (data.len() * 2) as u32;
    let result = unsafe {
        RegGetValueW(
            HKEY_CURRENT_USER,
            wide(KEY).as_ptr(),
            wide("FlickMemo").as_ptr(),
            RRF_RT_REG_SZ,
            std::ptr::null_mut(),
            data.as_mut_ptr().cast(),
            &mut size,
        )
    };
    if result == ERROR_FILE_NOT_FOUND {
        return Ok(None);
    }
    if result != ERROR_SUCCESS {
        return Err("Windowsの自動起動設定を読めません".into());
    }
    let end = data.iter().position(|v| *v == 0).unwrap_or(data.len());
    Ok(Some(String::from_utf16_lossy(&data[..end])))
}
fn write_value(value: Option<&str>) -> Result<(), String> {
    let mut key = std::ptr::null_mut();
    if unsafe {
        RegCreateKeyExW(
            HKEY_CURRENT_USER,
            wide(KEY).as_ptr(),
            0,
            std::ptr::null(),
            REG_OPTION_NON_VOLATILE,
            KEY_SET_VALUE,
            std::ptr::null(),
            &mut key,
            std::ptr::null_mut(),
        )
    } != ERROR_SUCCESS
    {
        return Err("Windowsの自動起動設定を変更できません".into());
    }
    let result = if let Some(value) = value {
        let data = wide(value);
        unsafe {
            RegSetValueExW(
                key,
                wide("FlickMemo").as_ptr(),
                0,
                REG_SZ,
                data.as_ptr().cast(),
                (data.len() * 2) as u32,
            )
        }
    } else {
        unsafe { RegDeleteValueW(key, wide("FlickMemo").as_ptr()) }
    };
    unsafe {
        RegCloseKey(key);
    }
    if result != ERROR_SUCCESS && !(result == ERROR_FILE_NOT_FOUND && value.is_none()) {
        return Err("Windowsの自動起動設定を保存できません".into());
    }
    Ok(())
}
#[derive(Serialize)]
pub struct Status {
    enabled: bool,
    asked: bool,
}
#[tauri::command]
pub fn desktop_startup_status(state: State<'_, Arc<Shared>>) -> Result<Status, String> {
    let asked = state
        .inner
        .lock()
        .map_err(|_| "設定を読めません")?
        .store
        .secret("startup-choice")?
        .is_some();
    Ok(Status {
        enabled: current_value()?
            .is_some_and(|value| expected().is_ok_and(|expected| value == expected)),
        asked,
    })
}
#[tauri::command]
pub fn desktop_startup_set(state: State<'_, Arc<Shared>>, enable: bool) -> Result<Status, String> {
    let previous = current_value()?;
    let requested = if enable { Some(expected()?) } else { None };
    write_value(requested.as_deref())?;
    let saved = state
        .inner
        .lock()
        .map_err(|_| "設定を保存できません".to_string())
        .and_then(|inner| inner.store.set_secret("startup-choice", b"asked"));
    if let Err(error) = saved {
        if write_value(previous.as_deref()).is_err() {
            return Err(format!("{error}。Windowsの自動起動設定も確認してください"));
        }
        return Err(error);
    }
    Ok(Status {
        enabled: current_value()?
            .is_some_and(|value| expected().is_ok_and(|expected| value == expected)),
        asked: true,
    })
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn startup_path_is_quoted_and_rejects_command_injection_and_overlong_paths() {
        assert_eq!(
            command("C:\\Program Files\\FlickMemo.exe").unwrap(),
            "\"C:\\Program Files\\FlickMemo.exe\""
        );
        for path in ["bad\" --other", "bad\npath", "bad\0path"] {
            assert!(command(path).is_err());
        }
        assert!(command(&"x".repeat(261)).is_err());
    }
}
