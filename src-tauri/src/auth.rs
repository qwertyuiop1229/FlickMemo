//! Bounded, short-lived IPv4 loopback callback. No tokens in URLs or log messages.
use crate::Shared;
use serde::Serialize;
use std::{
    collections::HashMap,
    io::{Read, Write},
    net::{TcpListener, TcpStream},
    sync::{atomic::Ordering, Arc},
    time::{Duration, Instant},
};
const ORIGIN: &str = "https://flickmemo-qwe.web.app";
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Credential {
    google_id_token: Option<String>,
    google_access_token: Option<String>,
}
struct Busy(Arc<Shared>);
impl Drop for Busy {
    fn drop(&mut self) {
        self.0.auth_busy.store(false, Ordering::SeqCst);
    }
}

fn parse_callback(header: &str, body: &[u8], port: u16, state: &str) -> Option<Credential> {
    let mut lines = header.split("\r\n");
    if lines.next() != Some("POST /callback HTTP/1.1") {
        return None;
    }
    let mut headers = HashMap::new();
    for line in lines.filter(|line| !line.is_empty()) {
        let (name, value) = line.split_once(':')?;
        if headers
            .insert(name.to_ascii_lowercase(), value.trim().to_string())
            .is_some()
        {
            return None;
        }
    }
    if headers.get("origin").map(String::as_str) != Some(ORIGIN)
        || headers.get("host") != Some(&format!("127.0.0.1:{port}"))
        || headers.contains_key("transfer-encoding")
        || headers.get("content-length")?.parse::<usize>().ok()? != body.len()
        || body.len() > 40000
        || !headers
            .get("content-type")?
            .starts_with("application/x-www-form-urlencoded")
    {
        return None;
    }
    let mut fields = HashMap::new();
    for (name, value) in form_urlencoded::parse(body) {
        if fields
            .insert(name.into_owned(), value.into_owned())
            .is_some()
        {
            return None;
        }
    }
    if fields.get("state").map(String::as_str) != Some(state) {
        return None;
    }
    let token = |name: &str| {
        fields
            .get(name)
            .filter(|v| !v.is_empty() && v.len() < 16384)
            .cloned()
    };
    let credential = Credential {
        google_id_token: token("googleIdToken"),
        google_access_token: token("googleAccessToken"),
    };
    if credential.google_id_token.is_none() && credential.google_access_token.is_none() {
        None
    } else {
        Some(credential)
    }
}
fn receive(stream: &mut TcpStream, port: u16, state: &str) -> Option<Credential> {
    stream.set_read_timeout(Some(Duration::from_secs(2))).ok()?;
    stream
        .set_write_timeout(Some(Duration::from_secs(2)))
        .ok()?;
    let deadline = Instant::now() + Duration::from_secs(3);
    let mut data = Vec::with_capacity(4096);
    let mut buffer = [0u8; 2048];
    let end;
    loop {
        if Instant::now() > deadline || data.len() > 8192 {
            return None;
        }
        let count = stream.read(&mut buffer).ok()?;
        if count == 0 {
            return None;
        }
        data.extend_from_slice(&buffer[..count]);
        if let Some(index) = data.windows(4).position(|v| v == b"\r\n\r\n") {
            end = index + 4;
            break;
        }
    }
    if end > 8192 {
        return None;
    }
    let header = std::str::from_utf8(&data[..end]).ok()?.to_string();
    let sizes: Vec<_> = header
        .lines()
        .filter_map(|line| line.split_once(':'))
        .filter(|(key, _)| key.eq_ignore_ascii_case("Content-Length"))
        .collect();
    if sizes.len() != 1 {
        return None;
    }
    let size = sizes[0].1.trim().parse::<usize>().ok()?;
    if size > 40000 {
        return None;
    }
    while data.len() < end + size {
        if Instant::now() > deadline {
            return None;
        }
        let count = stream.read(&mut buffer).ok()?;
        if count == 0 {
            return None;
        }
        data.extend_from_slice(&buffer[..count]);
    }
    if data.len() != end + size {
        return None;
    }
    parse_callback(&header, &data[end..], port, state)
}
fn respond(stream: &mut TcpStream, success: bool) {
    let body = if success {
        "<!doctype html><meta charset=utf-8><title>FlickMemo</title><p>FlickMemoにログイン情報を渡しました。このタブを閉じてアプリに戻ってください。</p>"
    } else {
        "Invalid callback"
    };
    let _=write!(stream,"HTTP/1.1 {}\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\nCache-Control: no-store\r\nContent-Security-Policy: default-src 'none'; frame-ancestors 'none'\r\nConnection: close\r\n\r\n{}",if success {"200 OK"}else{"403 Forbidden"},body.len(),body);
}
pub fn login(shared: Arc<Shared>) -> Result<Credential, String> {
    if shared.auth_busy.swap(true, Ordering::SeqCst) {
        return Err("ログイン画面は既に開いています".into());
    }
    shared.auth_cancel.store(false, Ordering::SeqCst);
    let _guard = Busy(shared.clone());
    let listener = TcpListener::bind("127.0.0.1:0").map_err(|_| "ログインの受信口を開けません")?;
    listener
        .set_nonblocking(true)
        .map_err(|_| "ログインの受信口を設定できません")?;
    let port = listener
        .local_addr()
        .map_err(|_| "受信口を確認できません")?
        .port();
    let state = format!(
        "{}{}",
        uuid::Uuid::new_v4().simple(),
        uuid::Uuid::new_v4().simple()
    );
    let url = format!(
        "{ORIGIN}/auth?desktop_port={port}&state={state}&created_at={}",
        crate::history_store::now()
    );
    open::that(&url).map_err(|_| "標準ブラウザを開けません")?;
    let until = Instant::now() + Duration::from_secs(240);
    let mut attempts = 0;
    while Instant::now() < until && !shared.auth_cancel.load(Ordering::SeqCst) && attempts < 128 {
        match listener.accept() {
            Ok((mut stream, _)) => {
                attempts += 1;
                let result = receive(&mut stream, port, &state);
                respond(&mut stream, result.is_some());
                if let Some(credential) = result {
                    return Ok(credential);
                }
            }
            Err(error) if error.kind() == std::io::ErrorKind::WouldBlock => {
                std::thread::sleep(Duration::from_millis(50))
            }
            Err(_) => return Err("ログインの待受けに失敗しました".into()),
        }
    }
    Err("ログインを終了しました。アプリから再試行してください".into())
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn loopback_rejects_cross_origin_bad_state_duplicate_fields_and_oversized_tokens() {
        let state = "a".repeat(64);
        let body = format!("state={state}&googleIdToken=synthetic-token");
        let header=format!("POST /callback HTTP/1.1\r\nHost: 127.0.0.1:49152\r\nOrigin: {ORIGIN}\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: {}\r\n\r\n",body.len());
        assert!(parse_callback(&header, body.as_bytes(), 49152, &state).is_some());
        assert!(parse_callback(
            &header.replace(ORIGIN, "https://evil.example"),
            body.as_bytes(),
            49152,
            &state
        )
        .is_none());
        assert!(parse_callback(&header, body.as_bytes(), 49152, "wrong-state").is_none());
        assert!(parse_callback(
            &header.replace("49152", "80"),
            body.as_bytes(),
            49152,
            &state
        )
        .is_none());
        let duplicate = format!("{body}&state={state}");
        assert!(parse_callback(&header, duplicate.as_bytes(), 49152, &state).is_none());
    }
}
