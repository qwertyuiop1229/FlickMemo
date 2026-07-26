import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ⚠️ キーが入っているか確認してください
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
const splashScreen = document.getElementById('splash-screen');
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const mainLayout = document.getElementById('main-layout');
const noteList = document.getElementById('note-list');
const emptyState = document.getElementById('empty-state');
const noteBody = document.getElementById('note-body');
const statusBar = document.getElementById('status-bar');
const statusText = document.getElementById('status-text');
const btnBack = document.getElementById('btn-back');
const searchInput = document.getElementById('search-input');
const authLoading = document.getElementById('auth-loading');
const authButtons = document.getElementById('auth-buttons');
const editorToolbar = document.getElementById('editor-toolbar');
const charCount = document.getElementById('char-count');
const btnPin = document.getElementById('btn-pin');
const btnCopy = document.getElementById('btn-copy');
const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');

// モーダル・トースト
const logoutModal = document.getElementById('logout-modal');
const btnLogoutTrigger = document.getElementById('btn-logout-trigger');
const btnModalCancel = document.getElementById('btn-modal-cancel');
const btnModalConfirm = document.getElementById('btn-modal-confirm');
const toastUndo = document.getElementById('toast-undo');
const btnToastUndo = document.getElementById('btn-toast-undo');

let currentNotes = {};
let activeNoteId = null;
let lastDeletedNote = null;
let toastTimer = null;
let db = null;

// ★ 同期ステータスリアルタイム表示関数
function setStatus(type, text) {
    statusBar.className = `m3-badge status-${type}`;
    statusText.textContent = text;
}

// ネット切断・復帰のリアルタイム監視
window.addEventListener('online', () => setStatus('saving', 'オンライン復帰・同期中...'));
window.addEventListener('offline', () => setStatus('offline', 'オフライン (ローカル保存済み)'));

// Undo / Redo
let textHistory = [];
let historyIndex = -1;
let isUndoRedoAction = false;

function resetTextHistory(initialText = '') {
    textHistory = [initialText];
    historyIndex = 0;
    updateUndoRedoButtons();
}

function pushTextHistory(text) {
    if (isUndoRedoAction) return;
    if (historyIndex >= 0 && textHistory[historyIndex] === text) return;
    textHistory = textHistory.slice(0, historyIndex + 1);
    textHistory.push(text);
    historyIndex = textHistory.length - 1;
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    btnUndo.disabled = historyIndex <= 0;
    btnRedo.disabled = historyIndex >= textHistory.length - 1;
}

btnUndo.onclick = () => {
    if (historyIndex > 0) {
        historyIndex--;
        isUndoRedoAction = true;
        noteBody.value = textHistory[historyIndex];
        handleInput();
        isUndoRedoAction = false;
        updateUndoRedoButtons();
    }
};

btnRedo.onclick = () => {
    if (historyIndex < textHistory.length - 1) {
        historyIndex++;
        isUndoRedoAction = true;
        noteBody.value = textHistory[historyIndex];
        handleInput();
        isUndoRedoAction = false;
        updateUndoRedoButtons();
    }
};

function getNoteTitle(body) {
    if (!body || !body.trim()) return "（空のメモ）";
    const lines = body.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return "（空のメモ）";
    const firstLine = lines[0];
    return firstLine.replace(/^([#*\-–—•>\d\.\s]+)/, '').trim() || firstLine;
}

// IndexedDB
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
        .sort((a, b) => {
            if (a.pinned !== b.pinned) return b.pinned ? -1 : 1;
            return (b.updatedAt || 0) - (a.updatedAt || 0);
        });

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
        if (n.pinned) {
            titleSpan.innerHTML = `<span class="material-symbols-outlined pin-icon">push_pin</span> ${getNoteTitle(n.body)}`;
        } else {
            titleSpan.textContent = getNoteTitle(n.body);
        }
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

function selectNote(id, autoFocus = true) {
    activeNoteId = id;
    const n = currentNotes[id] || { body: '', pinned: false };
    noteBody.value = n.body || '';
    noteBody.disabled = false;
    editorToolbar.classList.remove('hidden');
    charCount.classList.remove('hidden');
    btnPin.classList.toggle('active', !!n.pinned);

    resetTextHistory(n.body || '');
    updateCharCount();
    renderList(searchInput.value);

    // スマホ表示時のみ戻るボタン表示＆スライド
    if (window.innerWidth <= 768) {
        mainLayout.classList.add('view-editor');
        btnBack.classList.remove('hidden');
    }

    if (autoFocus) {
        setTimeout(() => {
            noteBody.focus();
            noteBody.setSelectionRange(noteBody.value.length, noteBody.value.length);
        }, 50);
    }
}

function deleteNote(id) {
    lastDeletedNote = { ...currentNotes[id] };
    delete currentNotes[id];
    deleteLocalNote(id);

    if (activeNoteId === id) {
        activeNoteId = null;
        noteBody.value = '';
        noteBody.disabled = true;
        editorToolbar.classList.add('hidden');
        charCount.classList.add('hidden');
    }
    renderList(searchInput.value);
    setStatus('saving', 'クラウドから削除中...');
    worker.postMessage({ type: 'DELETE_NOTE', id });
    showUndoToast();
}

function showUndoToast() {
    toastUndo.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastUndo.classList.add('hidden');
    }, 5000);
}

btnToastUndo.onclick = () => {
    if (lastDeletedNote) {
        currentNotes[lastDeletedNote.id] = lastDeletedNote;
        saveLocalNote(lastDeletedNote);
        selectNote(lastDeletedNote.id);
        setStatus('saving', '復元中...');
        worker.postMessage({ type: 'SAVE_NOTE', note: lastDeletedNote });
        toastUndo.classList.add('hidden');
        lastDeletedNote = null;
    }
};

btnPin.onclick = () => {
    if (!activeNoteId || !currentNotes[activeNoteId]) return;
    currentNotes[activeNoteId].pinned = !currentNotes[activeNoteId].pinned;
    btnPin.classList.toggle('active', currentNotes[activeNoteId].pinned);
    saveLocalNote(currentNotes[activeNoteId]);
    renderList(searchInput.value);
    setStatus('saving', '保存中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[activeNoteId] });
};

btnCopy.onclick = () => {
    if (!noteBody.value) return;
    navigator.clipboard.writeText(noteBody.value);
    setStatus('synced', 'クリップボードにコピー完了');
    setTimeout(() => setStatus('synced', '同期完了'), 2000);
};

function updateCharCount() {
    charCount.textContent = `${noteBody.value.length} 文字`;
}

btnBack.onclick = () => {
    mainLayout.classList.remove('view-editor');
    btnBack.classList.add('hidden');
};

function handleInput() {
    if (!activeNoteId) return;
    const val = noteBody.value;
    pushTextHistory(val);

    const updatedNote = {
        ...currentNotes[activeNoteId],
        id: activeNoteId,
        body: val,
        updatedAt: Date.now()
    };
    currentNotes[activeNoteId] = updatedNote;
    saveLocalNote(updatedNote);
    updateCharCount();
    renderList(searchInput.value);

    // ★ リアルタイムにステータス変更
    setStatus('saving', 'クラウドに保存中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: updatedNote });
}

noteBody.oninput = handleInput;
searchInput.oninput = () => renderList(searchInput.value);

function createNewNote() {
    const newId = 'note_' + Date.now();
    currentNotes[newId] = { id: newId, body: '', pinned: false, updatedAt: Date.now() };
    saveLocalNote(currentNotes[newId]);
    selectNote(newId, true);
    setStatus('saving', '新規保存中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[newId] });
}

document.getElementById('btn-new').onclick = createNewNote;

window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        createNewNote();
    }
});

btnLogoutTrigger.onclick = () => logoutModal.classList.remove('hidden');
btnModalCancel.onclick = () => logoutModal.classList.add('hidden');
btnModalConfirm.onclick = () => {
    logoutModal.classList.add('hidden');
    signOut(auth);
};

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

// ★【チラつき防止】ログイン状態確定後に画面を表示
onAuthStateChanged(auth, user => {
    splashScreen.classList.add('hidden'); // スプラッシュ削除

    if (user) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        setStatus('synced', 'クラウド同期完了');
        worker.postMessage({ type: 'SET_USER', uid: user.uid });
    } else {
        authContainer.classList.remove('hidden');
        appContainer.classList.add('hidden');
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
        worker.postMessage({ type: 'CLEAR_USER' });
    }
});

// ★ リアルタイム同期完了通知
worker.onmessage = e => {
    if (e.data.type === 'SYNC_NOTES') {
        const remoteNotes = e.data.notes || {};
        Object.values(remoteNotes).forEach(n => {
            currentNotes[n.id] = n;
            saveLocalNote(n);
        });
        renderList(searchInput.value);
        if (activeNoteId && currentNotes[activeNoteId]) selectNote(activeNoteId, false);
        setStatus('synced', 'クラウド同期完了');
    }
};