import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

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

async function performAuth() {
    const msg = document.getElementById('msg');
    try {
        await setPersistence(auth, browserLocalPersistence);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (msg) msg.textContent = "ログインが成功しました！";

        if (window.opener) {
            window.opener.postMessage({ type: 'FLICKMEMO_AUTH_SUCCESS', uid: user.uid }, '*');
        }

        setTimeout(() => window.close(), 600);
    } catch (err) {
        console.error("Auth window error:", err);
        if (msg) msg.textContent = "ログインに失敗しました: " + (err.message || "");
        setTimeout(() => window.close(), 3000);
    }
}

performAuth();