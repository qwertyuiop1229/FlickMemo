use crate::Shared;
use serde::Serialize;
use std::{
    sync::{atomic::Ordering, Arc},
    time::{Duration, Instant},
};
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

pub fn login(shared: Arc<Shared>) -> Result<Credential, String> {
    if shared.auth_busy.swap(true, Ordering::SeqCst) {
        return Err("ログイン画面は既に開いています".into());
    }
    let _guard = Busy(shared);
    let server =
        tiny_http::Server::http("127.0.0.1:0").map_err(|_| "ログインの受信口を開けません")?;
    let port = server
        .server_addr()
        .to_ip()
        .ok_or("受信口を確認できません")?
        .port();
    let state = format!(
        "{}{}",
        uuid::Uuid::new_v4().simple(),
        uuid::Uuid::new_v4().simple()
    );
    let url = format!(
        "https://flickmemo-qwe.web.app/auth?desktop_port={port}&state={state}&created_at={}",
        crate::history_store::now()
    );
    open::that(&url).map_err(|_| "標準ブラウザを開けません")?;
    let until = Instant::now() + Duration::from_secs(240);
    while Instant::now() < until {
        let Some(mut request) = server
            .recv_timeout(Duration::from_millis(500))
            .map_err(|_| "ログインの待受けに失敗しました")?
        else {
            continue;
        };
        let origin = request
            .headers()
            .iter()
            .find(|h| h.field.equiv("Origin"))
            .map(|h| h.value.as_str());
        let valid = request.method() == &tiny_http::Method::Post
            && request.url() == "/callback"
            && origin == Some("https://flickmemo-qwe.web.app")
            && request.body_length().is_some_and(|n| n <= 40000);
        if !valid {
            let _ = request.respond(tiny_http::Response::empty(403));
            continue;
        }
        let mut body = String::new();
        use std::io::Read;
        if request
            .as_reader()
            .take(40001)
            .read_to_string(&mut body)
            .is_err()
            || body.len() > 40000
        {
            let _ = request.respond(tiny_http::Response::empty(400));
            continue;
        }
        let fields: std::collections::HashMap<String, String> =
            form_urlencoded::parse(body.as_bytes())
                .into_owned()
                .collect();
        if fields.get("state") != Some(&state) {
            let _ = request.respond(tiny_http::Response::empty(403));
            continue;
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
            let _ = request.respond(tiny_http::Response::empty(400));
            continue;
        }
        let response=tiny_http::Response::from_string("<!doctype html><meta charset=utf-8><title>FlickMemo</title><p>FlickMemoにログイン情報を渡しました。このタブを閉じてアプリに戻ってください。</p>")
            .with_header(tiny_http::Header::from_bytes("Content-Type","text/html; charset=utf-8").unwrap())
            .with_header(tiny_http::Header::from_bytes("Cache-Control","no-store").unwrap())
            .with_header(tiny_http::Header::from_bytes("Content-Security-Policy","default-src 'none'; frame-ancestors 'none'").unwrap());
        let _ = request.respond(response);
        return Ok(credential);
    }
    Err("ログインの有効期限が切れました。アプリから再試行してください".into())
}
