//! DPAPI binds every encrypted payload to this Windows user and its logical owner.
use std::ffi::c_void;
#[repr(C)]
struct Blob {
    size: u32,
    data: *mut u8,
}
#[link(name = "crypt32")]
unsafe extern "system" {
    fn CryptProtectData(
        input: *const Blob,
        description: *const u16,
        entropy: *const Blob,
        reserved: *mut c_void,
        prompt: *mut c_void,
        flags: u32,
        output: *mut Blob,
    ) -> i32;
    fn CryptUnprotectData(
        input: *const Blob,
        description: *mut *mut u16,
        entropy: *const Blob,
        reserved: *mut c_void,
        prompt: *mut c_void,
        flags: u32,
        output: *mut Blob,
    ) -> i32;
}
#[link(name = "kernel32")]
unsafe extern "system" {
    fn LocalFree(memory: *mut c_void) -> *mut c_void;
}

fn crypt(data: &[u8], owner: &str, encrypt: bool) -> Result<Vec<u8>, String> {
    let input = Blob {
        size: data.len().try_into().map_err(|_| "データが大きすぎます")?,
        data: data.as_ptr() as *mut u8,
    };
    let entropy = Blob {
        size: owner.len() as u32,
        data: owner.as_ptr() as *mut u8,
    };
    let mut output = Blob {
        size: 0,
        data: std::ptr::null_mut(),
    };
    // CRYPTPROTECT_UI_FORBIDDEN: no modal prompt on the clipboard thread.
    let success = unsafe {
        if encrypt {
            CryptProtectData(
                &input,
                std::ptr::null(),
                &entropy,
                std::ptr::null_mut(),
                std::ptr::null_mut(),
                1,
                &mut output,
            )
        } else {
            CryptUnprotectData(
                &input,
                std::ptr::null_mut(),
                &entropy,
                std::ptr::null_mut(),
                std::ptr::null_mut(),
                1,
                &mut output,
            )
        }
    };
    if success == 0 {
        return Err(
            "Windowsの暗号化領域を利用できません。同じWindowsユーザーで開いてください".into(),
        );
    }
    let result = unsafe { std::slice::from_raw_parts(output.data, output.size as usize).to_vec() };
    unsafe {
        LocalFree(output.data.cast());
    }
    Ok(result)
}
pub fn seal(data: &[u8], owner: &str) -> Result<Vec<u8>, String> {
    crypt(data, owner, true)
}
pub fn unseal(data: &[u8], owner: &str) -> Result<Vec<u8>, String> {
    crypt(data, owner, false)
}

#[cfg(test)]
mod tests {
    #[test]
    fn dpapi_rejects_other_owner_and_modified_payload() {
        let bytes = super::seal("日本語\nprivate".as_bytes(), "owner-a").unwrap();
        assert_eq!(
            super::unseal(&bytes, "owner-a").unwrap(),
            "日本語\nprivate".as_bytes()
        );
        assert!(super::unseal(&bytes, "owner-b").is_err());
        let mut bad = bytes;
        bad[0] ^= 1;
        assert!(super::unseal(&bad, "owner-a").is_err());
    }
}
