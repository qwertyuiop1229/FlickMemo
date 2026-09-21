import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB1Yt1bCaMmOe84_737RSMcd2NlMkPZLaE",
    authDomain: "flickmemo-qwe.web.app",
    databaseURL: "https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "flickmemo-qwe",
    storageBucket: "flickmemo-qwe.firebasestorage.app",
    messagingSenderId: "998795111125",
    appId: "1:998795111125:web:8e40535e8f2623283a105c",
    measurementId: "G-ZDRMZ5VLY9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const EXTENSION_ID = "nagoefenbiihdbenpagekmkagnlkcfif";

const msg = document.getElementById('msg');
const spinner = document.getElementById('spinner');
const btnManual = document.getElementById('btn-login-manual');

function setMsg(text) { if (msg) msg.textContent = text; }

function sendAuthSuccess(data) {
    // 1. 親ウィンドウ (window.opener) への通知
    try {
        if (window.opener) {
            window.opener.postMessage(data, '*');
        }
    } catch (e) {}

    // 2. 拡張機能 ID への直接 sendMessage (externally_connectable)
    try {
        if (typeof chrome !== 'undefined' && chrome?.runtime?.sendMessage) {
            chrome.runtime.sendMessage(EXTENSION_ID, data, () => {});
        }
    } catch (e) {}
}

async function performAuth() {
    try {
        await setPersistence(auth, browserLocalPersistence);

        // 1. まずリダイレクト認証から戻ってきた結果を確認
        const result = await getRedirectResult(auth);
        if (result && result.user) {
            const googleCredential = GoogleAuthProvider.credentialFromResult(result);
            const googleIdToken = googleCredential?.idToken;
            const googleAccessToken = googleCredential?.accessToken;

            if (!googleIdToken && !googleAccessToken) {
                throw new Error('Google クレデンシャルの取得に失敗しました');
            }

            setMsg("ログイン成功！ウィンドウを閉じています...");
            sendAuthSuccess({
                type: 'FLICKMEMO_AUTH_SUCCESS',
                uid: result.user.uid,
                googleIdToken: googleIdToken || null,
                googleAccessToken: googleAccessToken || null,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            });

            setTimeout(() => window.close(), 1000);
            return;
        }

        // 2. 初回訪問時: ポップアップブロッカーに阻害されない同一ウィンドウリダイレクトを起動
        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        provider.setCustomParameters({ prompt: 'select_account' });

        setMsg("Google ログイン画面へ移動しています...");
        await signInWithRedirect(auth, provider);
    } catch (err) {
        console.error("Auth redirect error:", err);
        setMsg("自動認証を待機中: 下のボタンを押してログインを完了してください");
        if (spinner) spinner.style.display = 'none';
        if (btnManual) {
            btnManual.style.display = 'inline-flex';
            btnManual.onclick = async () => {
                try {
                    if (spinner) spinner.style.display = 'block';
                    btnManual.style.display = 'none';
                    setMsg("Google ログインを実行中...");

                    const provider = new GoogleAuthProvider();
                    provider.addScope('email');
                    provider.addScope('profile');
                    provider.setCustomParameters({ prompt: 'select_account' });

                    const result = await signInWithPopup(auth, provider);
                    const googleCredential = GoogleAuthProvider.credentialFromResult(result);
                    const googleIdToken = googleCredential?.idToken;
                    const googleAccessToken = googleCredential?.accessToken;

                    if (!googleIdToken && !googleAccessToken) {
                        throw new Error('Google クレデンシャルの取得に失敗しました');
                    }

                    setMsg("ログイン成功！ウィンドウを閉じています...");
                    sendAuthSuccess({
                        type: 'FLICKMEMO_AUTH_SUCCESS',
                        uid: result.user.uid,
                        googleIdToken: googleIdToken || null,
                        googleAccessToken: googleAccessToken || null,
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL
                    });

                    setTimeout(() => window.close(), 800);
                } catch (popupErr) {
                    console.error("Popup login error:", popupErr);
                    setMsg("ログインに失敗しました: " + (popupErr.message || ""));
                    if (spinner) spinner.style.display = 'none';
                    btnManual.style.display = 'inline-flex';
                }
            };
        }
    }
}

performAuth();