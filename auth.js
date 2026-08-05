import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getAuth,
    signInWithPopup,
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

const msg = document.getElementById('msg');
function setMsg(text) { if (msg) msg.textContent = text; }

async function performAuth() {
    setMsg("Google 認証を実行しています...");
    try {
        await setPersistence(auth, browserLocalPersistence);

        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        provider.setCustomParameters({ prompt: 'select_account' });

        // ★ このページは常に signInWithPopup で認証（web.app ドメインで動作）
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();

        setMsg("ログイン成功！ウィンドウを閉じています...");

        // 開いた元（拡張機能のサイドパネル）に結果を送る
        if (window.opener) {
            window.opener.postMessage({
                type: 'FLICKMEMO_AUTH_SUCCESS',
                uid: result.user.uid,
                idToken: idToken
            }, '*');
        }

        setTimeout(() => window.close(), 600);
    } catch (err) {
        console.error("Auth error:", err);
        setMsg("ログインに失敗しました: " + (err.message || ""));
        setTimeout(() => window.close(), 3000);
    }
}

performAuth();