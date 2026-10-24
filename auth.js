import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult,
    GoogleAuthProvider, setPersistence, inMemoryPersistence } from 'firebase/auth';
import { AUTH_SUCCESS, authRequestFromUrl, validAuthRequest } from './authProtocol.js';

const auth = getAuth(initializeApp({
    apiKey: 'AIzaSyB1Yt1bCaMmOe84_737RSMcd2NlMkPZLaE',
    authDomain: 'flickmemo-qwe.web.app',
    projectId: 'flickmemo-qwe',
    appId: '1:998795111125:web:8e40535e8f2623283a105c'
}, 'extension-auth'));
const request = authRequestFromUrl(location.href);
const msg = document.getElementById('msg');
const spinner = document.getElementById('spinner');
const btnManual = document.getElementById('btn-login-manual');
const setMsg = text => { msg.textContent = text; };

async function complete(result) {
    if (!validAuthRequest(request)) throw new Error('認証の有効期限が切れました。拡張機能から再度ログインしてください。');
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.idToken && !credential?.accessToken) throw new Error('認証情報を取得できませんでした');
    const data = { type: AUTH_SUCCESS, state: request.state,
        googleIdToken: credential.idToken || null, googleAccessToken: credential.accessToken || null };
    const targetOrigin = `chrome-extension://${request.extensionId}`;
    let delivered = false;
    try {
        if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
            const response = await chrome.runtime.sendMessage(request.extensionId, data);
            delivered = response?.received === true;
        }
    } catch { /* The opener channel is used if external messaging is unavailable. */ }
    if (!delivered && window.opener) window.opener.postMessage(data, targetOrigin);
    if (!delivered && !window.opener) throw new Error('拡張機能に接続できません。サイドパネルを開いて再試行してください。');
    setMsg('ログイン情報を送信しました。拡張機能を確認してください。');
    spinner.style.display = 'none';
    btnManual.style.display = 'none';
    setTimeout(() => window.close(), 1000);
}

function showError(error) {
    setMsg(`ログインを完了できませんでした: ${error.message || error.code || '再試行してください'}`);
    spinner.style.display = 'none';
    btnManual.style.display = 'inline-flex';
    btnManual.disabled = false;
}

async function start() {
    if (!request) {
        spinner.style.display = 'none';
        setMsg('拡張機能のログインボタンからこの画面を開いてください。');
        return;
    }
    // Do not replace the website's persisted signed-in account.
    await setPersistence(auth, inMemoryPersistence);
    const result = await getRedirectResult(auth);
    if (result) { await complete(result); return; }
    spinner.style.display = 'none';
    setMsg('使用するGoogleアカウントを選んでログインしてください。');
    btnManual.style.display = 'inline-flex';
    btnManual.onclick = async () => {
        btnManual.disabled = true;
        spinner.style.display = 'block';
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            await complete(await signInWithPopup(auth, provider));
        } catch (error) {
            if (error.code === 'auth/popup-blocked') {
                try { await signInWithRedirect(auth, provider); } catch (redirectError) { showError(redirectError); }
            } else { showError(error); }
        }
    };
}
start().catch(showError);
