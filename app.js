import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ⚠️ authDomain が .web.app になっています
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

const worker = new Worker('worker.js', { type: 'module' });
worker.postMessage({ type: 'INIT_FIREBASE', config: firebaseConfig });

// DOM要素
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const mainLayout = document.getElementById('main-layout');
const noteList = document.getElementById('note-list');
const emptyState = document.getElementById('empty-state');
const noteBody = document.getElementById('note-body');
const statusBar = document.getElementById('status-bar');
const btnBack = document.getElementById('btn-back');
const searchInput = document.getElementById('search-input');
const authLoading = document.getElementById('auth-loading');
const authButtons = document.getElementById('auth-buttons');

let currentNotes = {};
let activeNoteId = null;
let db = null;

// ★本文から「意味のある1行目」を抜粋してタイトルにするスマートロジック
function getNoteTitle(body) {
    if (!body || !body.trim()) return "（空のメモ）";
    const lines = body.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return "（空のメモ）";
    const firstLine = lines[0];
    const cleaned = firstLine.replace(/^([#*\-–—•>\d\.\s]+)/, '').trim() || firstLine;
    return cleaned;
}

// --- IndexedDB ---
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

function deleteLocalNote(id) {
    if (!db) return;
    const tx = db.transaction('notes', 'readwrite');
    tx.objectStore('notes').delete(id);
}

function renderList(filter = '') {
    noteList.innerHTML = '';
    const filtered = Object.values(currentNotes)
        .filter(n => (n.body || '').includes(filter))
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    filtered.forEach(n => {
        const li = document.createElement('li');
        li.className = `note-item ${n.id === activeNoteId ? 'active' : ''}`;

        const titleSpan = document.createElement('span');
        titleSpan.className = 'title';
        titleSpan.textContent = getNoteTitle(n.body);
        titleSpan.onclick = () => selectNote(n.id);

        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete';
        delBtn.title = '削除';
        delBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">delete</span>';
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteNote(n.id);
        };

        li.appendChild(titleSpan);
        li.appendChild(delBtn);
        noteList.appendChild(li);
    });
}

function selectNote(id) {
    activeNoteId = id;
    const n = currentNotes[id] || { body: '' };
    noteBody.value = n.body || '';
    noteBody.disabled = false;
    renderList(searchInput.value);

    mainLayout.classList.add('view-editor');
    btnBack.classList.remove('hidden');
}

function deleteNote(id) {
    delete currentNotes[id];
    deleteLocalNote(id);
    if (activeNoteId === id) {
        activeNoteId = null;
        noteBody.value = '';
        noteBody.disabled = true;
    }
    renderList(searchInput.value);
    worker.postMessage({ type: 'DELETE_NOTE', id });
}

btnBack.onclick = () => {
    mainLayout.classList.remove('view-editor');
    btnBack.classList.add('hidden');
};

function handleInput() {
    if (!activeNoteId) return;
    const updatedNote = {
        id: activeNoteId,
        body: noteBody.value,
        updatedAt: Date.now()
    };
    currentNotes[activeNoteId] = updatedNote;
    saveLocalNote(updatedNote);
    renderList(searchInput.value);
    worker.postMessage({ type: 'SAVE_NOTE', note: updatedNote });
}

noteBody.oninput = handleInput;
searchInput.oninput = () => renderList(searchInput.value);

document.getElementById('btn-new').onclick = () => {
    const newId = 'note_' + Date.now();
    currentNotes[newId] = { id: newId, body: '', updatedAt: Date.now() };
    saveLocalNote(currentNotes[newId]);
    selectNote(newId);
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[newId] });
};

// 認証
async function loginWithProvider(provider) {
    try {
        authLoading.classList.remove('hidden');
        authButtons.classList.add('hidden');
        await signInWithPopup(auth, provider);
    } catch (error) {
        alert("ログインエラー: " + error.message);
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
    }
}

document.getElementById('btn-google').onclick = () => loginWithProvider(new GoogleAuthProvider());
document.getElementById('btn-ms').onclick = () => loginWithProvider(new OAuthProvider('microsoft.com'));
document.getElementById('btn-logout').onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
    if (user) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        statusBar.textContent = "同期完了";
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