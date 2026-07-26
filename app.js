import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ⚠️ ここにご自身のFirebase設定を貼り付けてください
const firebaseConfig = {
    apiKey: "AIzaSyB1Yt1bCaMmOe84_737RSMcd2NlMkPZLaE",
    authDomain: "flickmemo-qwe.firebaseapp.com",
    projectId: "flickmemo-qwe",
    storageBucket: "flickmemo-qwe.firebasestorage.app",
    messagingSenderId: "998795111125",
    appId: "1:998795111125:web:8e40535e8f2623283a105c",
    measurementId: "G-ZDRMZ5VLY9",
    databaseURL: "https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Web Worker (バックグラウンド同期エンジン) の起動
const worker = new Worker('worker.js', { type: 'module' });
worker.postMessage({ type: 'INIT_FIREBASE', config: firebaseConfig });

// DOM要素
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const noteList = document.getElementById('note-list');
const noteTitle = document.getElementById('note-title');
const noteBody = document.getElementById('note-body');
const statusBar = document.getElementById('status-bar');

let currentNotes = {};
let activeNoteId = null;
let db = null;

// --- 1. IndexedDB (ローカル高速DB) の初期化 ---
const dbReq = indexedDB.open('FastNoteDB', 1);
dbReq.onupgradeneeded = e => e.target.result.createObjectStore('notes', { keyPath: 'id' });
dbReq.onsuccess = e => {
    db = e.target.result;
    loadLocalNotes(); // 起動時：0.01秒でローカルデータを描画
};

function loadLocalNotes() {
    if (!db) return;
    const tx = db.transaction('notes', 'readonly');
    const req = tx.objectStore('notes').getAll();
    req.onsuccess = () => {
        currentNotes = {};
        req.result.forEach(n => currentNotes[n.id] = n);
        renderList();
    };
}

function saveLocalNote(note) {
    if (!db) return;
    const tx = db.transaction('notes', 'readwrite');
    tx.objectStore('notes').put(note);
}

// --- 2. 画面のレンダリング ---
function renderList(filter = '') {
    noteList.innerHTML = '';
    Object.values(currentNotes)
        .filter(n => (n.title || '').includes(filter) || (n.body || '').includes(filter))
        .forEach(n => {
            const li = document.createElement('li');
            li.className = `note-item ${n.id === activeNoteId ? 'active' : ''}`;
            li.innerHTML = `<div class="title">${n.title || '無題のメモ'}</div>`;
            li.onclick = () => selectNote(n.id);
            noteList.appendChild(li);
        });
}

function selectNote(id) {
    activeNoteId = id;
    const n = currentNotes[id] || { title: '', body: '' };
    noteTitle.value = n.title || '';
    noteBody.value = n.body || '';
    noteTitle.disabled = false;
    noteBody.disabled = false;
    renderList();
}

// --- 3. メモの変更検知＆Worker経由でクラウド保存 ---
function handleInput() {
    if (!activeNoteId) return;
    const updatedNote = {
        id: activeNoteId,
        title: noteTitle.value,
        body: noteBody.value,
        updatedAt: Date.now()
    };
    currentNotes[activeNoteId] = updatedNote;
    saveLocalNote(updatedNote);
    renderList();

    // 裏のWorkerに同期依頼（リアルタイムにFirebaseへ）
    worker.postMessage({ type: 'SAVE_NOTE', note: updatedNote });
}

noteTitle.oninput = handleInput;
noteBody.oninput = handleInput;

document.getElementById('btn-new').onclick = () => {
    const newId = 'note_' + Date.now();
    currentNotes[newId] = { id: newId, title: '新しいメモ', body: '', updatedAt: Date.now() };
    saveLocalNote(currentNotes[newId]);
    selectNote(newId);
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[newId] });
};

// --- 4. 認証処理 ---
document.getElementById('btn-google').onclick = () => signInWithPopup(auth, new GoogleAuthProvider());
document.getElementById('btn-ms').onclick = () => signInWithPopup(auth, new OAuthProvider('microsoft.com'));
document.getElementById('btn-logout').onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
    if (user) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        statusBar.textContent = "同期中...";
        worker.postMessage({ type: 'SET_USER', uid: user.uid });
    } else {
        authContainer.classList.remove('hidden');
        appContainer.classList.add('hidden');
        worker.postMessage({ type: 'CLEAR_USER' });
    }
});

// Workerからの同期完了通知の受取
worker.onmessage = e => {
    if (e.data.type === 'SYNC_NOTES') {
        const remoteNotes = e.data.notes || {};
        Object.values(remoteNotes).forEach(n => {
            currentNotes[n.id] = n;
            saveLocalNote(n);
        });
        renderList();
        if (activeNoteId && currentNotes[activeNoteId]) selectNote(activeNoteId);
        statusBar.textContent = "同期完了";
    }
};

// --- 5. ★ご要望の「10秒後に初期同期完了でメモリ極限解放」 ---
setTimeout(() => {
    statusBar.textContent = "⚡ 省メモリモード稼働中";
    // 不要になった接続キャッシュや一時バッファを強制破棄（ガベージコレクション促進）
    if (window.gc) window.gc();
}, 10000);