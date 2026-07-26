import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ⚠️ Firebase設定（ご自身のキーが入っているか確認してください）
const firebaseConfig = {
    apiKey: "AIzaSyB1Yt1bCaMmOe84_737RSMcd2NlMkPZLaE",
    authDomain: "flickmemo-qwe.firebaseapp.com",
    databaseURL: "https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "flickmemo-qwe",
    storageBucket: "flickmemo-qwe.firebasestorage.app",
    messagingSenderId: "998795111125",
    appId: "1:998795111125:web:8e40535e8f2623283a105c",
    measurementId: "G-ZDRMZ5VLY9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const worker = new Worker('worker.js', { type: 'module' });
worker.postMessage({ type: 'INIT_FIREBASE', config: firebaseConfig });

// DOM要素
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const mainLayout = document.getElementById('main-layout');
const noteList = document.getElementById('note-list');
const noteTitle = document.getElementById('note-title');
const noteBody = document.getElementById('note-body');
const statusBar = document.getElementById('status-bar');
const btnBack = document.getElementById('btn-back');
const searchInput = document.getElementById('search-input');
const authLoading = document.getElementById('auth-loading');
const authButtons = document.getElementById('auth-buttons');

let currentNotes = {};
let activeNoteId = null;
let db = null;

// IndexedDB ロード
const dbReq = indexedDB.open('FlickMemoDB', 1);
dbReq.onupgradeneeded = e => e.target.result.createObjectStore('notes', { keyPath: 'id' });
dbReq.onsuccess = e => {
    db = e.target.result;
    loadLocalNotes();
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

function renderList(filter = '') {
    noteList.innerHTML = '';
    Object.values(currentNotes)
        .filter(n => (n.title || '').includes(filter) || (n.body || '').includes(filter))
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
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
    renderList(searchInput.value);

    mainLayout.classList.add('view-editor');
    btnBack.classList.remove('hidden');
}

btnBack.onclick = () => {
    mainLayout.classList.remove('view-editor');
    btnBack.classList.add('hidden');
};

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
    renderList(searchInput.value);
    worker.postMessage({ type: 'SAVE_NOTE', note: updatedNote });
}

noteTitle.oninput = handleInput;
noteBody.oninput = handleInput;
searchInput.oninput = () => renderList(searchInput.value);

document.getElementById('btn-new').onclick = () => {
    const newId = 'note_' + Date.now();
    currentNotes[newId] = { id: newId, title: '新しいメモ', body: '', updatedAt: Date.now() };
    saveLocalNote(currentNotes[newId]);
    selectNote(newId);
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[newId] });
};

// ★【確実なポップアップログイン処理】
async function loginWithProvider(provider) {
    try {
        authLoading.classList.remove('hidden');
        authButtons.classList.add('hidden');
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login Error:", error);
        alert("ログインエラー: " + error.message);
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
    }
}

document.getElementById('btn-google').onclick = () => loginWithProvider(new GoogleAuthProvider());
document.getElementById('btn-ms').onclick = () => loginWithProvider(new OAuthProvider('microsoft.com'));

document.getElementById('btn-logout').onclick = () => signOut(auth);

// ★【ログイン状態監視】
onAuthStateChanged(auth, user => {
    if (user) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        statusBar.textContent = "同期中";
        worker.postMessage({ type: 'SET_USER', uid: user.uid });
    } else {
        authContainer.classList.remove('hidden');
        appContainer.classList.add('hidden');
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
        worker.postMessage({ type: 'CLEAR_USER' });
    }
});

worker.onmessage = e => {
    if (e.data.type === 'SYNC_NOTES') {
        const remoteNotes = e.data.notes || {};
        Object.values(remoteNotes).forEach(n => {
            currentNotes[n.id] = n;
            saveLocalNote(n);
        });
        renderList(searchInput.value);
        if (activeNoteId && currentNotes[activeNoteId]) selectNote(activeNoteId);
        statusBar.textContent = "同期完了";
    }
};

// 10秒後のメモリクリーンアップ
setTimeout(() => {
    statusBar.textContent = "⚡ 省メモリモード";
    if (window.gc) window.gc();
}, 10000);