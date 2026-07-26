import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ★ アプリ内に直接埋め込まれたバージョン定数（bump.jsでデプロイ時に自動書き換え）
const APP_VERSION = "1.3.0";

// ⚠️ ご自身のFirebaseキーを入れてください
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

// DOM要素
const splashScreen = document.getElementById('splash-screen');
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const mainLayout = document.getElementById('main-layout');
const listContainer = document.getElementById('list-container');
const noteList = document.getElementById('note-list');
const emptyState = document.getElementById('empty-state');
const noteTitleInput = document.getElementById('note-title-input');
const noteBody = document.getElementById('note-body');
const statusBar = document.getElementById('status-bar');
const statusText = document.getElementById('status-text');
const btnBack = document.getElementById('btn-back');
const searchInput = document.getElementById('search-input');
const authLoading = document.getElementById('auth-loading');
const authButtons = document.getElementById('auth-buttons');
const editorToolbar = document.getElementById('editor-toolbar');
const charCount = document.getElementById('char-count');
const dateDisplay = document.getElementById('date-display');
const btnPin = document.getElementById('btn-pin');
const btnTrashIndicator = document.getElementById('btn-trash-indicator');
const btnCopy = document.getElementById('btn-copy');
const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');
const btnRestoreTrash = document.getElementById('btn-restore-trash');

const btnNew = document.getElementById('btn-new');
const btnEmptyTrash = document.getElementById('btn-empty-trash');
const trashNotice = document.getElementById('trash-notice');

// モーダル・ユーザー情報
const tabNotes = document.getElementById('tab-notes');
const tabTrash = document.getElementById('tab-trash');
const deleteModal = document.getElementById('delete-modal');
const btnDeleteCancel = document.getElementById('btn-delete-cancel');
const btnDeleteConfirm = document.getElementById('btn-delete-confirm');

const emptyTrashModal = document.getElementById('empty-trash-modal');
const btnEmptyCancel = document.getElementById('btn-empty-cancel');
const btnEmptyConfirm = document.getElementById('btn-empty-confirm');

const logoutModal = document.getElementById('logout-modal');
const btnModalCancel = document.getElementById('btn-modal-cancel');
const btnModalConfirm = document.getElementById('btn-modal-confirm');

// 設定画面
const settingsModal = document.getElementById('settings-modal');
const btnSettingsTrigger = document.getElementById('btn-settings-trigger');
const btnSettingsClose = document.getElementById('btn-settings-close');
const btnUpdateCheck = document.getElementById('btn-update-check');
const appVersionDisplay = document.getElementById('app-version-display');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userProviderTag = document.getElementById('user-provider-tag');
const btnSettingsLogoutAction = document.getElementById('btn-settings-logout-action');

const toastMsg = document.getElementById('toast-msg');
const toastText = document.getElementById('toast-text');
const btnToastAction = document.getElementById('btn-toast-action');

let currentNotes = {};
let activeNoteId = null;
let pendingDeleteId = null;
let lastMovedToTrashNote = null;
let currentTab = 'notes';
let toastTimer = null;
let db = null;

// iOS風スクロールバー監視
let scrollTimer = null;
listContainer.addEventListener('scroll', () => {
    listContainer.classList.add('is-scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        listContainer.classList.remove('is-scrolling');
    }, 800);
});

function setStatus(type, text) {
    statusBar.className = `m3-badge status-${type}`;
    statusText.textContent = text;
}

function showToast(msg, actionCallback = null) {
    toastText.textContent = msg;
    toastMsg.classList.remove('hidden');

    if (actionCallback) {
        btnToastAction.classList.remove('hidden');
        btnToastAction.onclick = () => {
            actionCallback();
            toastMsg.classList.add('hidden');
        };
    } else {
        btnToastAction.classList.add('hidden');
    }

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastMsg.classList.add('hidden'), 4000);
}

window.addEventListener('online', () => setStatus('saving', 'オンライン復帰・同期中...'));
window.addEventListener('offline', () => setStatus('offline', 'オフライン (ローカル保存済み)'));

function renderAppVersion() {
    appVersionDisplay.textContent = `v${APP_VERSION}`;
}

// アバターフォールバック（インラインSVG）
function getInitialsAvatar(name) {
    const initial = (name || 'U').charAt(0).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="#042f66" rx="32"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#a8c7fa" font-size="28" font-family="sans-serif" font-weight="bold">${initial}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Undo / Redo 多段階スタック
let textHistory = [];
let historyIndex = -1;
let historyDebounceTimer = null;

function resetTextHistory(initialText = '') {
    textHistory = [initialText];
    historyIndex = 0;
    updateUndoRedoButtons();
}

function pushTextHistory(text) {
    if (historyIndex >= 0 && textHistory[historyIndex] === text) return;
    clearTimeout(historyDebounceTimer);
    historyDebounceTimer = setTimeout(() => {
        textHistory = textHistory.slice(0, historyIndex + 1);
        textHistory.push(text);
        if (textHistory.length > 50) textHistory.shift();
        historyIndex = textHistory.length - 1;
        updateUndoRedoButtons();
    }, 300);
}

function updateUndoRedoButtons() {
    btnUndo.disabled = historyIndex <= 0;
    btnRedo.disabled = historyIndex >= textHistory.length - 1;
}

function applyUndoRedoText(targetText) {
    noteBody.value = targetText;
    if (!activeNoteId) return;

    const updatedNote = {
        ...currentNotes[activeNoteId],
        id: activeNoteId,
        body: targetText,
        updatedAt: Date.now()
    };
    currentNotes[activeNoteId] = updatedNote;
    saveLocalNote(updatedNote);
    updateEditorFooter();
    renderList(searchInput.value);
    setStatus('saving', 'クラウドに保存中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: updatedNote });
}

btnUndo.onclick = () => {
    if (historyIndex > 0) {
        historyIndex--;
        applyUndoRedoText(textHistory[historyIndex]);
        updateUndoRedoButtons();
    }
};

btnRedo.onclick = () => {
    if (historyIndex < textHistory.length - 1) {
        historyIndex++;
        applyUndoRedoText(textHistory[historyIndex]);
        updateUndoRedoButtons();
    }
};

function getNoteDisplayTitle(note) {
    if (!note) return "空のメモ";
    if (note.title && note.title.trim()) {
        return note.title.trim();
    }
    const body = note.body || '';
    if (!body.trim()) return "空のメモ";
    const lines = body.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return "空のメモ";
    const firstLine = lines[0];
    return firstLine.replace(/^([#*\-–—•>\d\.\s]+)/, '').trim() || firstLine;
}

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

function formatDateOnly(timestamp) {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function getDaysRemaining(deletedAt) {
    if (!deletedAt) return 7;
    const elapsed = Date.now() - deletedAt;
    const remainingMs = SEVEN_DAYS_MS - elapsed;
    const days = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
    return Math.max(0, days);
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
        cleanupEmptyNotes();
        renderList(searchInput.value);
        initAutoNote();
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

function cleanupEmptyNotes(exceptId = null) {
    let changed = false;
    Object.values(currentNotes).forEach(n => {
        if (n.id !== exceptId && !n.deletedAt && (!n.body || !n.body.trim()) && (!n.title || !n.title.trim())) {
            delete currentNotes[n.id];
            deleteLocalNote(n.id);
            worker.postMessage({ type: 'PERMANENT_DELETE_NOTE', id: n.id });
            changed = true;
        }
    });
    if (changed) renderList(searchInput.value);
}

window.addEventListener('beforeunload', () => {
    cleanupEmptyNotes();
});

function initAutoNote() {
    if (currentTab !== 'notes') return;
    const existingEmpty = Object.values(currentNotes).find(n => !n.deletedAt && (!n.body || !n.body.trim()) && (!n.title || !n.title.trim()));
    if (existingEmpty) {
        selectNote(existingEmpty.id, true);
    } else {
        createNewNote(true);
    }
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

function renderList(filter = '') {
    noteList.innerHTML = '';
    const now = Date.now();

    const filtered = Object.values(currentNotes)
        .filter(n => {
            if (currentTab === 'notes') return !n.deletedAt;
            return !!n.deletedAt && (now - n.deletedAt <= SEVEN_DAYS_MS);
        })
        .filter(n => (n.body || '').includes(filter) || (n.title || '').includes(filter))
        .sort((a, b) => {
            if (currentTab === 'notes') {
                const aPinned = !!a.pinned;
                const bPinned = !!b.pinned;
                if (aPinned !== bPinned) return aPinned ? -1 : 1;
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

    let currentGroupKey = '';

    filtered.forEach(n => {
        let groupKey = '';
        let groupHeaderHTML = '';

        if (currentTab === 'notes' && n.pinned) {
            groupKey = 'pinned';
            groupHeaderHTML = `<span class="material-symbols-outlined" style="font-size:15px; vertical-align:middle; color:var(--m3-primary);">push_pin</span> ピン留め`;
        } else {
            const dateText = getDateGroup(currentTab === 'notes' ? n.updatedAt : n.deletedAt);
            groupKey = dateText;
            groupHeaderHTML = dateText;
        }

        if (groupKey !== currentGroupKey) {
            currentGroupKey = groupKey;
            const groupHeader = document.createElement('div');
            groupHeader.className = 'date-group-header';
            groupHeader.innerHTML = groupHeaderHTML;
            noteList.appendChild(groupHeader);
        }

        const li = document.createElement('li');
        li.className = `note-item ${n.id === activeNoteId ? 'active' : ''}`;
        li.onclick = () => selectNote(n.id);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'item-content';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'title';
        if (n.pinned && currentTab === 'notes') {
            titleSpan.innerHTML = `<span class="material-symbols-outlined pin-icon">push_pin</span> ${getNoteDisplayTitle(n)}`;
        } else {
            titleSpan.textContent = getNoteDisplayTitle(n);
        }
        contentDiv.appendChild(titleSpan);

        if (currentTab === 'trash') {
            const subMeta = document.createElement('span');
            subMeta.className = 'sub-meta';
            const daysLeft = getDaysRemaining(n.deletedAt);
            subMeta.textContent = `${formatDateOnly(n.deletedAt)} 移動 • 残り ${daysLeft}日`;
            contentDiv.appendChild(subMeta);
        }

        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete';
        delBtn.title = currentTab === 'notes' ? 'ゴミ箱へ' : '完全削除';
        delBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">${currentTab === 'notes' ? 'delete' : 'delete_forever'}</span>`;

        delBtn.onclick = (e) => {
            e.stopPropagation();
            if (currentTab === 'notes') {
                moveToTrash(n.id);
            } else {
                openDeleteModal(n.id);
            }
        };

        li.appendChild(contentDiv);
        li.appendChild(delBtn);
        noteList.appendChild(li);
    });
}

function selectNote(id, autoFocus = true) {
    cleanupEmptyNotes(id);

    const isSameNote = (activeNoteId === id);
    activeNoteId = id;
    const n = currentNotes[id] || { title: '', body: '', pinned: false, updatedAt: Date.now() };

    const isTrashNote = !!n.deletedAt;
    noteBody.disabled = isTrashNote;
    noteTitleInput.disabled = isTrashNote;

    if (!isSameNote) {
        noteTitleInput.value = n.title || '';
        noteBody.value = n.body || '';
        resetTextHistory(n.body || '');
    }

    updateTitlePlaceholder(n);

    editorToolbar.classList.remove('hidden');
    noteTitleInput.classList.remove('hidden');
    charCount.classList.remove('hidden');
    dateDisplay.classList.remove('hidden');

    if (isTrashNote) {
        btnRestoreTrash.classList.remove('hidden');
        btnPin.classList.add('hidden');
        btnTrashIndicator.classList.remove('hidden');
    } else {
        btnRestoreTrash.classList.add('hidden');
        btnTrashIndicator.classList.add('hidden');
        btnPin.classList.remove('hidden');
        btnPin.classList.toggle('active', !!n.pinned);
    }

    updateEditorFooter();
    renderList(searchInput.value);

    if (window.innerWidth <= 768) {
        mainLayout.classList.add('view-editor');
        btnBack.classList.remove('hidden');
    }

    if (autoFocus && !isTrashNote) {
        setTimeout(() => {
            noteBody.focus();
            noteBody.setSelectionRange(noteBody.value.length, noteBody.value.length);
        }, 50);
    }
}

function updateTitlePlaceholder(note) {
    if (!note) return;
    const tempNote = { ...note, title: '' };
    const autoTitle = getNoteDisplayTitle(tempNote);
    noteTitleInput.placeholder = autoTitle === "空のメモ" ? "タイトル（未入力時は自動抽出）" : `自動: ${autoTitle}`;
}

noteTitleInput.oninput = () => {
    if (!activeNoteId || !currentNotes[activeNoteId]) return;
    const val = noteTitleInput.value;

    currentNotes[activeNoteId].title = val;
    currentNotes[activeNoteId].updatedAt = Date.now();

    saveLocalNote(currentNotes[activeNoteId]);
    updateTitlePlaceholder(currentNotes[activeNoteId]);
    renderList(searchInput.value);

    setStatus('saving', 'クラウドに保存中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[activeNoteId] });
};

function moveToTrash(id) {
    if (!currentNotes[id]) return;
    lastMovedToTrashNote = { ...currentNotes[id] };

    currentNotes[id].deletedAt = Date.now();
    saveLocalNote(currentNotes[id]);
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[id] });

    if (activeNoteId === id) {
        activeNoteId = null;
        noteTitleInput.value = '';
        noteBody.value = '';
        noteBody.disabled = true;
        noteTitleInput.disabled = true;
        editorToolbar.classList.add('hidden');
        noteTitleInput.classList.add('hidden');
        charCount.classList.add('hidden');
        dateDisplay.classList.add('hidden');
    }

    renderList(searchInput.value);

    showToast("メモをゴミ箱に移動しました", () => {
        if (lastMovedToTrashNote) {
            delete currentNotes[lastMovedToTrashNote.id].deletedAt;
            saveLocalNote(currentNotes[lastMovedToTrashNote.id]);
            worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[lastMovedToTrashNote.id] });
            selectNote(lastMovedToTrashNote.id);
            showToast("メモを復元しました");
            lastMovedToTrashNote = null;
        }
    });
}

function openDeleteModal(id) {
    pendingDeleteId = id;
    deleteModal.classList.remove('hidden');
}

function executeDelete() {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    deleteModal.classList.add('hidden');

    delete currentNotes[id];
    deleteLocalNote(id);
    worker.postMessage({ type: 'PERMANENT_DELETE_NOTE', id });
    showToast("メモを完全削除しました");

    if (activeNoteId === id) {
        activeNoteId = null;
        noteTitleInput.value = '';
        noteBody.value = '';
        noteBody.disabled = true;
        noteTitleInput.disabled = true;
        editorToolbar.classList.add('hidden');
        noteTitleInput.classList.add('hidden');
        charCount.classList.add('hidden');
        dateDisplay.classList.add('hidden');
    }
    pendingDeleteId = null;
    renderList(searchInput.value);
}

btnDeleteConfirm.onclick = executeDelete;
btnDeleteCancel.onclick = () => deleteModal.classList.add('hidden');

btnEmptyTrash.onclick = () => emptyTrashModal.classList.remove('hidden');
btnEmptyCancel.onclick = () => emptyTrashModal.classList.add('hidden');

function executeEmptyTrash() {
    emptyTrashModal.classList.add('hidden');

    Object.values(currentNotes).forEach(n => {
        if (n.deletedAt) {
            delete currentNotes[n.id];
            deleteLocalNote(n.id);
        }
    });

    worker.postMessage({ type: 'CLEAR_ALL_TRASH' });

    if (activeNoteId && (!currentNotes[activeNoteId] || currentNotes[activeNoteId].deletedAt)) {
        activeNoteId = null;
        noteTitleInput.value = '';
        noteBody.value = '';
        noteBody.disabled = true;
        noteTitleInput.disabled = true;
        editorToolbar.classList.add('hidden');
        noteTitleInput.classList.add('hidden');
        charCount.classList.add('hidden');
        dateDisplay.classList.add('hidden');
    }

    renderList(searchInput.value);
    showToast("ゴミ箱を空にしました");
}

btnEmptyConfirm.onclick = executeEmptyTrash;

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
    btnNew.classList.add('hidden');
    btnEmptyTrash.classList.remove('hidden');
    trashNotice.classList.remove('hidden');
    renderList(searchInput.value);
};

btnPin.onclick = () => {
    if (!activeNoteId || !currentNotes[activeNoteId]) return;
    const isPinned = !currentNotes[activeNoteId].pinned;
    currentNotes[activeNoteId].pinned = isPinned;
    btnPin.classList.toggle('active', isPinned);
    saveLocalNote(currentNotes[activeNoteId]);
    renderList(searchInput.value);
    setStatus('saving', '保存中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[activeNoteId] });
    showToast(isPinned ? "メモをピン留めしました" : "ピン留めを解除しました");
};

btnCopy.onclick = () => {
    if (!noteBody.value) return;
    navigator.clipboard.writeText(noteBody.value);
    showToast("クリップボードにコピーしました");
};

function updateEditorFooter() {
    charCount.textContent = `${noteBody.value.length} 文字`;
    if (activeNoteId && currentNotes[activeNoteId]) {
        const time = currentNotes[activeNoteId].updatedAt || Date.now();
        dateDisplay.textContent = formatDateOnly(time);
    }
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
    updateTitlePlaceholder(updatedNote);
    updateEditorFooter();
    renderList(searchInput.value);

    setStatus('saving', 'クラウドに保存中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: updatedNote });
}

noteBody.oninput = handleInput;
searchInput.oninput = () => renderList(searchInput.value);

function createNewNote(autoFocus = true) {
    cleanupEmptyNotes();

    const newId = 'note_' + Date.now();
    currentNotes[newId] = { id: newId, title: '', body: '', pinned: false, updatedAt: Date.now() };
    saveLocalNote(currentNotes[newId]);
    selectNote(newId, autoFocus);
    setStatus('saving', '新規作成中...');
    worker.postMessage({ type: 'SAVE_NOTE', note: currentNotes[newId] });
}

document.getElementById('btn-new').onclick = () => createNewNote(true);

window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        if (currentTab === 'notes') createNewNote(true);
    }
});

btnModalCancel.onclick = () => logoutModal.classList.add('hidden');
btnModalConfirm.onclick = () => {
    logoutModal.classList.add('hidden');
    signOut(auth);
};

// Discord風設定タブ切り替え
document.querySelectorAll('.settings-tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

        btn.classList.add('active');
        const tabName = btn.getAttribute('data-tab');
        document.getElementById(`tab-content-${tabName}`).classList.remove('hidden');
    };
});

btnSettingsTrigger.onclick = () => {
    renderAppVersion();
    settingsModal.classList.remove('hidden');
};
btnSettingsClose.onclick = () => settingsModal.classList.add('hidden');

btnSettingsLogoutAction.onclick = () => {
    settingsModal.classList.add('hidden');
    logoutModal.classList.remove('hidden');
};

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

// 認証ハンドラー
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

// ★ Microsoft ログインの高度ハンドラー（個人・組織アカウント共通指定）
const msProvider = new OAuthProvider('microsoft.com');
msProvider.setCustomParameters({
    tenant: 'common' // 個人アカウント(Outlook/Hotmail)および組織アカウント両対応
});

document.getElementById('btn-google').onclick = () => loginWithProvider(new GoogleAuthProvider());
document.getElementById('btn-ms').onclick = () => loginWithProvider(msProvider);

// ★【ユーザーアカウント情報の高精度取得 ＆ 安全アバターフォールバック】
onAuthStateChanged(auth, user => {
    splashScreen.classList.add('hidden');
    if (user) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        setStatus('synced', 'クラウド同期完了');

        const nameText = user.displayName || user.email?.split('@')[0] || 'ユーザー';
        const emailText = user.email || 'メールアドレス非公開';

        userName.textContent = nameText;
        userEmail.textContent = emailText;

        // アバター設定 ＆ 読み込み失敗時のインラインSVG安全装置
        userAvatar.onerror = () => {
            userAvatar.src = getInitialsAvatar(nameText);
        };

        if (user.photoURL) {
            userAvatar.src = user.photoURL;
        } else {
            userAvatar.src = getInitialsAvatar(nameText);
        }

        // プロバイダ（Google / Microsoft）自動判定
        let providerName = "Google";
        if (user.providerData && user.providerData[0]) {
            const pId = user.providerData[0].providerId;
            if (pId.includes('microsoft')) providerName = "Microsoft";
            if (pId.includes('google')) providerName = "Google";
        }
        if (userProviderTag) userProviderTag.textContent = providerName;

        worker.postMessage({ type: 'SET_USER', uid: user.uid });
    } else {
        authContainer.classList.remove('hidden');
        appContainer.classList.add('hidden');
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
        worker.postMessage({ type: 'CLEAR_USER' });
    }
});

// クラウド同期受信
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
            if (document.activeElement !== noteBody && document.activeElement !== noteTitleInput) {
                selectNote(activeNoteId, false);
            }
        } else {
            initAutoNote();
        }
        setStatus('synced', 'クラウド同期完了');
    }
};