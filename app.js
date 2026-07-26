import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ⚠️ ご自身のFirebaseキー情報を入力してください
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

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
let currentAppVersion = "1.3.0";

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
const btnRestoreTrash = document.getElementById('btn-restore-trash');

const btnNew = document.getElementById('btn-new');
const btnEmptyTrash = document.getElementById('btn-empty-trash');
const trashNotice = document.getElementById('trash-notice');

// モーダル
const tabNotes = document.getElementById('tab-notes');
const tabTrash = document.getElementById('tab-trash');
const deleteModal = document.getElementById('delete-modal');
const deleteModalTitle = document.getElementById('delete-modal-title');
const deleteModalMsg = document.getElementById('delete-modal-msg');
const btnDeleteCancel = document.getElementById('btn-delete-cancel');
const btnDeleteConfirm = document.getElementById('btn-delete-confirm');

const emptyTrashModal = document.getElementById('empty-trash-modal');
const btnEmptyCancel = document.getElementById('btn-empty-cancel');
const btnEmptyConfirm = document.getElementById('btn-empty-confirm');

const logoutModal = document.getElementById('logout-modal');
const btnLogoutTrigger = document.getElementById('btn-logout-trigger');
const btnModalCancel = document.getElementById('btn-modal-cancel');
const btnModalConfirm = document.getElementById('btn-modal-confirm');

const settingsModal = document.getElementById('settings-modal');
const btnSettingsTrigger = document.getElementById('btn-settings-trigger');
const btnSettingsClose = document.getElementById('btn-settings-close');
const btnUpdateCheck = document.getElementById('btn-update-check');
const appVersionDisplay = document.getElementById('app-version-display');

const toastMsg = document.getElementById('toast-msg');
const toastText = document.getElementById('toast-text');

let currentNotes = {};
let activeNoteId = null;
let pendingDeleteId = null;
let currentTab = 'notes';
let toastTimer = null;
let db = null;

function setStatus(type, text) {
    statusBar.className = `m3-badge status-${type}`;
    statusText.textContent = text;
}

function showToast(msg) {
    toastText.textContent = msg;
    toastMsg.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastMsg.classList.add('hidden'), 3000);
}

window.addEventListener('online', () => setStatus('saving', 'オンライン復帰・同期中...'));
window.addEventListener('offline', () => setStatus('offline', 'オフライン (ローカル保存済み)'));

async function checkVersion() {
    try {
        const res = await fetch(`version.json?t=${Date.now()}`);
        if (res.ok) {
            const data = await res.json();
            currentAppVersion = data.version;
            appVersionDisplay.textContent = `v${currentAppVersion}`;
        }
    } catch (err) {
        appVersionDisplay.textContent = `v1.3.0`;
    }
}
checkVersion();

// ★【多段階 Undo / Redo 記憶スタック】（入力停止や改行でスマートに記録）
let textHistory = [];
let historyIndex = -1;
let isUndoRedoAction = false;
let historyDebounceTimer = null;

function resetTextHistory(initialText = '') {
    textHistory = [initialText];
    historyIndex = 0;
    updateUndoRedoButtons();
}

function pushTextHistory(text) {
    if (isUndoRedoAction) return;
    if (historyIndex >= 0 && textHistory[historyIndex] === text) return;

    clearTimeout(historyDebounceTimer);
    historyDebounceTimer = setTimeout(() => {
        textHistory = textHistory.slice(0, historyIndex + 1);
        textHistory.push(text);
        if (textHistory.length > 50) textHistory.shift(); // 最大50ステップ保持
        historyIndex = textHistory.length - 1;
        updateUndoRedoButtons();
    }, 350); // 350ms入力が止まったら履歴を新しく作成
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

// 空のメモ（カッコなし）
function getNoteTitle(body) {
    if (!body || !body.trim()) return "空のメモ";
    const lines = body.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return "空のメモ";
    const firstLine = lines[0];
    return firstLine.replace(/^([#*\-–—•>\d\.\s]+)/, '').trim() || firstLine;
}

// 日付グループ生成（今日・昨日・〇月〇日）
function getDateGroup(timestamp) {
    if (!timestamp) return 'それ以前';
    const now = new Date();
    const date = new Date(timestamp);

    if (now.toDateString() === date.toDateString()) return '今日';

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (yesterday.toDateString() === date.toDateString()) return '昨日';

    return `${date.getMonth() + 1}月${date.getDate()}日`;
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
        cleanExpiredTrash();
        renderList(searchInput.value);
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

function cleanExpiredTrash() {
    const now = Date.now();
    Object.values(currentNotes).forEach(n => {
        if (n.deletedAt && (now - n.deletedAt > SEVEN_DAYS_MS)) {
            delete currentNotes[n.id];
            deleteLocalNote(n.id);
            worker.postMessage({ type: 'PERMANENT_DELETE_NOTE', id: n.id });
        }
    });
}

// ★ 日付グループ表示＆ゴミ箱検索連動対応リスト描画
function renderList(filter = '') {
    noteList.innerHTML = '';
    const now = Date.now();

    const filtered = Object.values(currentNotes)
        .filter(n => {
            if (currentTab === 'notes') return !n.deletedAt;
            return !!n.deletedAt && (now - n.deletedAt <= SEVEN_DAYS_MS);
        })
        .filter(n => (n.body || '').includes(filter))
        .sort((a, b) => {
            if (currentTab === 'notes') {
                if (a.pinned !== b.pinned) return b.pinned ? -1 : 1;
            }
            return (b.updatedAt || 0) - (a.updatedAt || 0);
        });

    if (filtered.length === 0) {
        emptyState.textContent = currentTab === 'notes' ? "メモがありません" : "ゴミ箱は空です";
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    // ピン留めセクションと日付セクションに分類
    let currentGroupLabel = '';

    filtered.forEach(n => {
        let groupLabel = '';
        if (currentTab === 'notes' && n.pinned) {
            groupLabel = 'ピン留め';
        } else {
            groupLabel = getDateGroup(currentTab === 'notes' ? n.updatedAt : n.deletedAt);
        }

        // グループの変わり目に見出し（ヘッダー）を追加
        if (groupLabel !== currentGroupLabel) {
            currentGroupLabel = groupLabel;
            const groupHeader = document.createElement('div');
            groupHeader.className = 'date-group-header';
            groupHeader.textContent = groupLabel;
            noteList.appendChild(groupHeader);
        }

        const li = document.createElement('li');
        li.className = `note-item ${n.id === activeNoteId ? 'active' : ''}`;

        const titleSpan = document.createElement('span');
        titleSpan.className = 'title';
        if (n.pinned && currentTab === 'notes') {
            titleSpan.innerHTML = `<span class="material-symbols-outlined pin-icon">push_pin</span> ${getNoteTitle(n.body)}`;
        } else {
            titleSpan.textContent = getNoteTitle(n.body);
        }
        titleSpan.onclick = () => selectNote(n.id);

        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete';
        delBtn.title = currentTab === 'notes' ? 'ゴミ箱へ' : '完全削除';
        delBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">${currentTab === 'notes' ? 'delete' : 'delete_forever'}</span>`;
        delBtn.onclick = (e) => {
            e.stopPropagation();
            openDeleteModal(n.id);
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
    noteBody.disabled = !!n.deletedAt;

    editorToolbar.classList.remove('hidden');
    charCount.classList.remove('hidden');
    btnPin.classList.toggle('active', !!n.pinned);

    if (currentTab === 'trash') {
        btnRestoreTrash.classList.remove('hidden');
        btnPin.classList.add('hidden');
    } else {
        btnRestoreTrash.classList.add('hidden');
        btnPin.classList.remove('hidden');
    }

    resetTextHistory(n.body || '');
    updateCharCount();
    renderList(searchInput.value);

    if (window.innerWidth <= 768) {
        mainLayout.classList.add('view-editor');
        btnBack.classList.remove('hidden');
    }

    if (autoFocus && !n.deletedAt) {
        setTimeout(() => {
            noteBody.focus();
            noteBody.setSelectionRange(noteBody.value.length, noteBody.value.length);
        }, 50);
    }
}

// 単一削除モーダル
function openDeleteModal(id) {
    pendingDeleteId = id;
    const isTrash = currentTab === 'trash';
    deleteModalTitle.textContent = isTrash ? "メモを完全削除しますか？" : "メモをゴミ箱に移動しますか？";
    deleteModalMsg.textContent = isTrash ? "この操作は元に戻せません。" : "削除されたメモはゴミ箱に7日間保存されます。";
    deleteModal.classList.remove('hidden');
}

function executeDelete() {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    deleteModal.classList.add('hidden');

    if (currentTab === 'trash') {
        delete currentNotes[id];
        deleteLocalNote(id);
        worker.postMessage({ type: 'PERMANENT_DELETE_NOTE', id });
        showToast("メモを完全削除しました");
    } else {
        currentNotes[id].deletedAt = Date.now();
        saveLocalNote(currentNotes[id]);
        worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[id] });
        showToast("メモをゴミ箱に移動しました");
    }

    if (activeNoteId === id) {
        activeNoteId = null;
        noteBody.value = '';
        noteBody.disabled = true;
        editorToolbar.classList.add('hidden');
        charCount.classList.add('hidden');
    }
    pendingDeleteId = null;
    renderList(searchInput.value);
}

btnDeleteConfirm.onclick = executeDelete;
btnDeleteCancel.onclick = () => deleteModal.classList.add('hidden');

// ★ ゴミ箱を空にする（すべて削除）
btnEmptyTrash.onclick = () => emptyTrashModal.classList.remove('hidden');
btnEmptyCancel.onclick = () => emptyTrashModal.classList.add('hidden');

function executeEmptyTrash() {
    emptyTrashModal.classList.add('hidden');
    const now = Date.now();
    Object.values(currentNotes).forEach(n => {
        if (n.deletedAt) {
            delete currentNotes[n.id];
            deleteLocalNote(n.id);
            worker.postMessage({ type: 'PERMANENT_DELETE_NOTE', id: n.id });
        }
    });
    activeNoteId = null;
    noteBody.value = '';
    noteBody.disabled = true;
    editorToolbar.classList.add('hidden');
    charCount.classList.add('hidden');
    renderList(searchInput.value);
    showToast("ゴミ箱を空にしました");
}

btnEmptyConfirm.onclick = executeEmptyTrash;

// Enterキー決定の対応
window.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        if (!deleteModal.classList.contains('hidden')) {
            e.preventDefault();
            executeDelete();
        } else if (!emptyTrashModal.classList.contains('hidden')) {
            e.preventDefault();
            executeEmptyTrash();
        }
    }
});

btnRestoreTrash.onclick = () => {
    if (!activeNoteId || !currentNotes[activeNoteId]) return;
    delete currentNotes[activeNoteId].deletedAt;
    saveLocalNote(currentNotes[activeNoteId]);
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[activeNoteId] });
    showToast("メモを復元しました");
    selectNote(activeNoteId);
};

// タブ切り替え（メモ vs ゴミ箱）
tabNotes.onclick = () => {
    currentTab = 'notes';
    tabNotes.classList.add('active');
    tabTrash.classList.remove('active');
    btnNew.classList.remove('hidden');
    btnEmptyTrash.classList.add('hidden');
    trashNotice.classList.add('hidden');
    renderList(searchInput.value);
};

tabTrash.onclick = () => {
    currentTab = 'trash';
    tabTrash.classList.add('active');
    tabNotes.classList.remove('active');
    btnNew.classList.add('hidden'); // ゴミ箱では新規メモボタンを非表示
    btnEmptyTrash.classList.remove('hidden');
    trashNotice.classList.remove('hidden');
    renderList(searchInput.value);
};

// ピン留め
btnPin.onclick = () => {
    if (!activeNoteId || !currentNotes[activeNoteId]) return;
    const isPinned = !currentNotes[activeNoteId].pinned;
    currentNotes[activeNoteId].pinned = isPinned;
    btnPin.classList.toggle('active', isPinned);
    saveLocalNote(currentNotes[activeNoteId]);
    renderList(searchInput.value);
    setStatus('saving', '保存中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[activeNoteId] });
    showToast(isPinned ? "ピン留めしました" : "ピン留めを解除しました");
};

btnCopy.onclick = () => {
    if (!noteBody.value) return;
    navigator.clipboard.writeText(noteBody.value);
    showToast("クリップボードにコピーしました");
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
        if (currentTab === 'notes') createNewNote();
    }
});

// モーダル制御
btnLogoutTrigger.onclick = () => logoutModal.classList.remove('hidden');
btnModalCancel.onclick = () => logoutModal.classList.add('hidden');
btnModalConfirm.onclick = () => {
    logoutModal.classList.add('hidden');
    signOut(auth);
};

btnSettingsTrigger.onclick = () => {
    checkVersion();
    settingsModal.classList.remove('hidden');
};
btnSettingsClose.onclick = () => settingsModal.classList.add('hidden');

btnUpdateCheck.onclick = async () => {
    setStatus('saving', 'キャッシュをクリア中...');
    if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
    }
    if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (let r of regs) await r.unregister();
    }
    window.location.reload(true);
};

// 認証
async function loginWithProvider(provider) {
    try {
        authLoading.classList.remove('hidden');
        authButtons.classList.add('hidden');
        await signInWithPopup(auth, provider);
    } catch (error) {
        alert("ログインに失敗しました: " + error.message);
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
    }
}

document.getElementById('btn-google').onclick = () => loginWithProvider(new GoogleAuthProvider());
document.getElementById('btn-ms').onclick = () => loginWithProvider(new OAuthProvider('microsoft.com'));

onAuthStateChanged(auth, user => {
    splashScreen.classList.add('hidden');
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

// 同期受信
worker.onmessage = e => {
    if (e.data.type === 'SYNC_NOTES') {
        const remoteNotes = e.data.notes || {};
        Object.values(remoteNotes).forEach(n => {
            currentNotes[n.id] = n;
            saveLocalNote(n);
        });
        cleanExpiredTrash();
        renderList(searchInput.value);

        if (activeNoteId && currentNotes[activeNoteId]) {
            if (document.activeElement !== noteBody) {
                selectNote(activeNoteId, false);
            }
        }
        setStatus('synced', 'クラウド同期完了');
    }
};