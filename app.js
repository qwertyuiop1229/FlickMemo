import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithCredential,
    OAuthProvider,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence
} from "firebase/auth";
import {
    getDatabase,
    ref,
    set,
    remove,
    get,
    update,
    onValue,
    off
} from "firebase/database";

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json';

// ★ アプリ内に直接埋め込まれたバージョン定数（bump.jsでデプロイ時に自動書き換え）
const APP_VERSION = "1.1.27";

// ⚠️ ご自身のキーを入れてください
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
const db = getDatabase(app);
let currentDbRef = null;

// 完全保存
function syncSaveNote(note) {
    if (!currentUserId || !note || !note.id) return;
    const noteRef = ref(db, `users/${currentUserId}/notes/${note.id}`);
    set(noteRef, note);
}

// 1文字単位の差分更新（RTDB通信量を最小限にする）
function syncUpdateNoteFields(id, fields) {
    if (!currentUserId || !id || !fields) return;
    const noteRef = ref(db, `users/${currentUserId}/notes/${id}`);
    update(noteRef, fields);
}

function syncDeleteNote(id) {
    if (!currentUserId || !id) return;
    const noteRef = ref(db, `users/${currentUserId}/notes/${id}`);
    remove(noteRef);
}

function syncClearTrash() {
    if (!currentUserId) return;
    const notesRef = ref(db, `users/${currentUserId}/notes`);
    get(notesRef).then(snapshot => {
        const data = snapshot.val();
        if (data) {
            const updates = {};
            Object.keys(data).forEach(key => {
                if (data[key].deletedAt) {
                    updates[key] = null;
                }
            });
            update(notesRef, updates);
        }
    }).catch(err => console.error("Clear trash error:", err));
}

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
const noteCodeView = document.getElementById('note-code-view');

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
const btnLogoutTrigger = document.getElementById('btn-logout-trigger');
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
let currentUserId = null;

// 省メモリ・通信節約用の最適化タイマー＆差分キャッシュ
let syncDebounceTimer = null;
let lastSyncedData = {};

function setupScrollFade(element) {
    if (!element) return;
    let timer = null;

    const triggerShow = () => {
        element.classList.add('is-scrolling');
        clearTimeout(timer);
        timer = setTimeout(() => {
            element.classList.remove('is-scrolling');
        }, 3000);
    };

    element.addEventListener('scroll', triggerShow);
    element.addEventListener('mousemove', triggerShow);
    element.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            element.classList.remove('is-scrolling');
        }, 1000);
    });
}

setupScrollFade(listContainer);
setupScrollFade(noteBody);
setupScrollFade(noteCodeView);

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
window.addEventListener('offline', () => setStatus('offline', 'ローカル保存済み'));

function renderAppVersion() {
    appVersionDisplay.textContent = `v${APP_VERSION}`;
}

function getInitialsAvatar(name) {
    const initial = (name || 'U').charAt(0).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="#042f66" rx="32"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#a8c7fa" font-size="28" font-family="sans-serif" font-weight="bold">${initial}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function isFullSourceCode(text) {
    if (!text || !text.trim()) return false;

    const indicators = [
        /\bimport\s+[\s\S]*?\s+from\s+["']/,
        /\bexport\s+(default|const|let|var|function|class)\b/,
        /\binitializeApp\s*\(/,
        /\bgetAuth\s*\(/,
        /\bnew\s+Worker\s*\(/,
        /\bdocument\.getElementById\s*\(/,
        /\bwindow\.addEventListener\s*\(/,
        /\bfunction\s+\w+\s*\(/,
        /\bconst\s+\w+\s*=\s*/,
        /\blet\s+\w+\s*=\s*/,
        /\bclass\s+\w+/,
        /\bdef\s+\w+\s*\(/
    ];

    let matches = 0;
    for (const pat of indicators) {
        if (pat.test(text)) matches++;
    }
    return matches >= 2;
}

function isPureTextLine(line) {
    const l = line.trim();
    if (!l) return false;

    const hasJpChars = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(l);
    const hasCodeKeywords = /\b(function|const|let|var|if|else|for|while|return|import|export|class|def|async|await)\b/.test(l);

    return hasJpChars && !hasCodeKeywords;
}

function isCodeLine(line) {
    const l = line.trim();
    if (!l) return true;
    if (isPureTextLine(l)) return false;

    if (l.startsWith('//') || l.startsWith('/*') || l.startsWith('*') || l.startsWith('#')) {
        return true;
    }

    let cleanLine = l.replace(/\/\/.*$/, '').replace(/#.*$/, '');
    cleanLine = cleanLine.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''");

    const hasKeywords = /\b(import|export|const|let|var|function|async|await|return|class|if|else|for|while|def|console|document|window|MutationObserver|initializeApp|getAuth)\b/.test(cleanLine);
    const hasSymbols = /[\{\}\(\)\[\];=><\+\-\*\/]/.test(cleanLine);

    return hasKeywords || hasSymbols;
}

function updateAutoCodeRender(forceRender = false) {
    const text = noteBody.value || '';
    if (!text.trim()) {
        noteBody.classList.remove('hidden');
        noteCodeView.classList.add('hidden');
        return;
    }

    const activeNote = activeNoteId ? currentNotes[activeNoteId] : null;
    const collapsedState = (activeNote && activeNote.codeCollapsed) ? activeNote.codeCollapsed : {};

    const isFullCode = isFullSourceCode(text);
    const hasMarkdownBlock = /```[\s\S]*?```/.test(text);

    let hasAnyCode = false;
    let html = '';
    let blockIndex = 0;

    if (isFullCode) {
        hasAnyCode = true;
        const isCollapsed = !!collapsedState[`block_0`];
        html = buildCodeBlockHTML('javascript', text.trim(), 0, isCollapsed);
    } else if (hasMarkdownBlock) {
        hasAnyCode = true;
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(text)) !== null) {
            const plainText = text.substring(lastIndex, match.index);
            if (plainText.trim()) {
                html += `<p>${escapeHTML(plainText)}</p>`;
            }

            const lang = (match[1] || 'javascript').toLowerCase();
            const rawCode = match[2].trim();
            const isCollapsed = !!collapsedState[`block_${blockIndex}`];

            html += buildCodeBlockHTML(lang, rawCode, blockIndex, isCollapsed);
            blockIndex++;

            lastIndex = match.index + match[0].length;
        }

        const remaining = text.substring(lastIndex);
        if (remaining.trim()) {
            html += `<p>${escapeHTML(remaining)}</p>`;
        }
    } else {
        const lines = text.split('\n');
        let currentBlock = [];
        let currentIsCode = null;

        lines.forEach((line) => {
            const lineIsText = isPureTextLine(line);
            const lineIsCode = !lineIsText && isCodeLine(line);
            const isBlank = !line.trim();

            let targetType = 'TEXT';
            if (lineIsText) {
                targetType = 'TEXT';
            } else if (lineIsCode) {
                targetType = 'CODE';
            } else if (isBlank) {
                targetType = currentIsCode ?? 'TEXT';
            }

            if (currentIsCode === null) {
                currentIsCode = targetType;
                currentBlock.push(line);
            } else if (currentIsCode === targetType) {
                currentBlock.push(line);
            } else {
                const blockContent = currentBlock.join('\n').trim();
                if (blockContent) {
                    if (currentIsCode === 'CODE') {
                        hasAnyCode = true;
                        const isCollapsed = !!collapsedState[`block_${blockIndex}`];
                        html += buildCodeBlockHTML('javascript', blockContent, blockIndex, isCollapsed);
                        blockIndex++;
                    } else {
                        html += `<p>${escapeHTML(blockContent)}</p>`;
                    }
                }
                currentBlock = [line];
                currentIsCode = targetType;
            }
        });

        if (currentBlock.length > 0) {
            const blockContent = currentBlock.join('\n').trim();
            if (blockContent) {
                if (currentIsCode === 'CODE') {
                    hasAnyCode = true;
                    const isCollapsed = !!collapsedState[`block_${blockIndex}`];
                    html += buildCodeBlockHTML('javascript', blockContent, blockIndex, isCollapsed);
                    blockIndex++;
                } else {
                    html += `<p>${escapeHTML(blockContent)}</p>`;
                }
            }
        }
    }

    if (hasAnyCode && (forceRender || document.activeElement !== noteBody)) {
        noteCodeView.innerHTML = html;
        if (Prism) {
            Prism.highlightAllUnder(noteCodeView);
        }

        noteCodeView.querySelectorAll('.copy-code-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const code = decodeURIComponent(btn.getAttribute('data-code'));
                navigator.clipboard.writeText(code);
                showToast("コードをコピーしました");
            };
        });

        noteCodeView.querySelectorAll('.collapse-code-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const idx = btn.getAttribute('data-index');
                const wrapper = noteCodeView.querySelector(`.code-block-wrapper[data-index="${idx}"]`);

                if (activeNote) {
                    activeNote.codeCollapsed = activeNote.codeCollapsed || {};
                    const nextState = !wrapper.classList.contains('is-collapsed');
                    activeNote.codeCollapsed[`block_${idx}`] = nextState;

                    wrapper.classList.toggle('is-collapsed', nextState);
                    btn.querySelector('span').textContent = nextState ? 'unfold_more' : 'unfold_less';

                    if (activeNote.id) {
                        saveLocalNote(activeNote);
                        setStatus('saving', 'クラウドに保存中...');
                        syncUpdateNoteFields(activeNote.id, { codeCollapsed: activeNote.codeCollapsed });
                    }
                }
            };
        });

        noteBody.classList.add('hidden');
        noteCodeView.classList.remove('hidden');
    } else {
        noteBody.classList.remove('hidden');
        noteCodeView.classList.add('hidden');
    }
}

noteCodeView.onmouseup = (e) => {
    if (e.target.closest('.copy-code-btn') || e.target.closest('.collapse-code-btn')) return;

    const rect = noteCodeView.getBoundingClientRect();
    if (e.clientX >= rect.right - 14) return;

    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
        return;
    }

    const savedScrollTop = noteCodeView.scrollTop;
    const clickRelativeY = (e.clientY - rect.top) + savedScrollTop;
    const scrollHeight = noteCodeView.scrollHeight || 1;
    const clickRatio = Math.min(1, Math.max(0, clickRelativeY / scrollHeight));
    const targetCaretPos = Math.floor(noteBody.value.length * clickRatio);

    noteCodeView.classList.add('hidden');
    noteBody.classList.remove('hidden');

    noteBody.scrollTop = savedScrollTop;

    noteBody.focus({ preventScroll: true });
    setTimeout(() => {
        noteBody.setSelectionRange(targetCaretPos, targetCaretPos);
        noteBody.scrollTop = savedScrollTop;
    }, 10);
};

function buildCodeBlockHTML(lang, rawCode, index, isCollapsed) {
    const escapedCode = escapeHTML(rawCode);
    const iconName = isCollapsed ? 'unfold_more' : 'unfold_less';
    const collapseClass = isCollapsed ? 'is-collapsed' : '';

    return `
    <div class="code-block-wrapper ${collapseClass}" data-index="${index}">
      <div class="code-block-header">
        <span>${lang}</span>
        <div class="code-header-actions">
          <button class="code-header-btn collapse-code-btn" data-index="${index}" title="折りたたみ">
            <span class="material-symbols-outlined" style="font-size:16px;">${iconName}</span>
          </button>
          <button class="code-header-btn copy-code-btn" data-code="${encodeURIComponent(rawCode)}" title="コピー">
            <span class="material-symbols-outlined" style="font-size:14px;">content_copy</span> コピー
          </button>
        </div>
      </div>
      <pre><code class="language-${lang}">${escapedCode}</code></pre>
    </div>
  `;
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

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
        if (textHistory.length > 25) textHistory.shift();
        historyIndex = textHistory.length - 1;
        updateUndoRedoButtons();
    }, 300);
}

// ★ アクティブなリスト項目だけのピンポイントDOM更新（全体DOM全破棄・全再構築を防止して省メモリ＆CPU化）
function updateActiveNoteItemDOM(id) {
    if (!id) return;
    const activeLi = noteList.querySelector(`.note-item.active`);
    if (!activeLi) {
        renderList(searchInput.value);
        return;
    }
    const note = currentNotes[id];
    if (!note) return;
    const titleSpan = activeLi.querySelector('.title');
    if (titleSpan) {
        const titleText = getNoteDisplayTitle(note);
        if (note.pinned && currentTab === 'notes') {
            titleSpan.innerHTML = `<span class="material-symbols-outlined pin-icon">push_pin</span> ${escapeHTML(titleText)}`;
        } else {
            titleSpan.textContent = titleText;
        }
    }
}

// ★ ローカル即時（0ms）反映＋RTDB通信デバウンス（750ms）で通信量を最少化
function scheduleSaveNote(id, updatedFields) {
    if (!id || !currentNotes[id]) return;

    Object.assign(currentNotes[id], updatedFields);
    currentNotes[id].updatedAt = Date.now();

    updateActiveNoteItemDOM(id);
    updateTitlePlaceholder(currentNotes[id]);
    updateEditorFooter();

    setStatus('saving', '保存中...');

    clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(() => {
        flushPendingSave(id);
    }, 750);
}

function flushPendingSave(id) {
    clearTimeout(syncDebounceTimer);
    syncDebounceTimer = null;

    const note = id ? currentNotes[id] : (activeNoteId ? currentNotes[activeNoteId] : null);
    if (!note || !note.id) return;

    saveLocalNote(note);

    const last = lastSyncedData[note.id];
    if (last && last.body === note.body && last.title === note.title && last.pinned === note.pinned) {
        setStatus('synced', 'クラウド同期完了');
        return;
    }

    lastSyncedData[note.id] = { body: note.body, title: note.title, pinned: note.pinned };
    syncUpdateNoteFields(note.id, {
        body: note.body,
        title: note.title,
        pinned: note.pinned,
        updatedAt: note.updatedAt
    });
    setStatus('synced', 'クラウド同期完了');
}

function updateExtensionBadge() {
    if (typeof chrome !== 'undefined' && chrome?.action?.setBadgeText) {
        const count = Object.values(currentNotes).filter(n => !n.deletedAt).length;
        chrome.action.setBadgeText({ text: count > 0 ? String(count) : "" });
        chrome.action.setBadgeBackgroundColor({ color: "#28292a" });
    }
}

function checkPendingExtensionNotes() {
    if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        chrome.storage.local.get(['pendingQuickNote'], (result) => {
            if (result && result.pendingQuickNote) {
                const text = result.pendingQuickNote;
                chrome.storage.local.remove('pendingQuickNote');
                createNewNote(true);
                if (activeNoteId && currentNotes[activeNoteId]) {
                    noteBody.value = text;
                    handleInput();
                    flushPendingSave(activeNoteId);
                    showToast("選択したテキストを新しいメモに追加しました");
                }
            }
        });
    }
}

function updateUndoRedoButtons() {
    btnUndo.disabled = historyIndex <= 0;
    btnRedo.disabled = historyIndex >= textHistory.length - 1;
}

function applyUndoRedoText(targetText) {
    noteBody.value = targetText;
    if (!activeNoteId || !currentNotes[activeNoteId]) return;

    const updatedNote = {
        ...currentNotes[activeNoteId],
        id: activeNoteId,
        title: currentNotes[activeNoteId].title || '',
        body: targetText,
        pinned: currentNotes[activeNoteId].pinned || false,
        codeCollapsed: currentNotes[activeNoteId].codeCollapsed || {},
        updatedAt: Date.now()
    };

    if (updatedNote.id) {
        currentNotes[activeNoteId] = updatedNote;
        saveLocalNote(updatedNote);
        updateTitlePlaceholder(updatedNote);
        updateEditorFooter();
        renderList(searchInput.value);
        updateAutoCodeRender(true);
        setStatus('saving', 'クラウドに保存中...');
        syncUpdateNoteFields(activeNoteId, { body: targetText, updatedAt: updatedNote.updatedAt });
    }
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

// IndexedDB (ローカル高速読み書き用)
let idb = null;
const dbReq = indexedDB.open('FlickMemoDB', 1);
dbReq.onupgradeneeded = e => e.target.result.createObjectStore('notes', { keyPath: 'id' });
dbReq.onsuccess = e => {
    idb = e.target.result;
    loadLocalNotes();
};

function loadLocalNotes() {
    if (!idb) return;
    const tx = idb.transaction('notes', 'readonly');
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
    if (!idb || !note.id) return;
    const tx = idb.transaction('notes', 'readwrite');
    tx.objectStore('notes').put(note);
}

function deleteLocalNote(id) {
    if (!idb || !id) return;
    const tx = idb.transaction('notes', 'readwrite');
    tx.objectStore('notes').delete(id);
}

async function clearLocalData() {
    currentNotes = {};
    activeNoteId = null;
    pendingDeleteId = null;
    lastMovedToTrashNote = null;

    noteBody.value = '';
    noteTitleInput.value = '';
    noteBody.disabled = true;
    noteTitleInput.disabled = true;
    editorToolbar.classList.add('hidden');
    noteTitleInput.classList.add('hidden');
    charCount.classList.add('hidden');
    dateDisplay.classList.add('hidden');
    noteCodeView.classList.add('hidden');

    renderList('');

    if (idb) {
        return new Promise((resolve) => {
            const tx = idb.transaction('notes', 'readwrite');
            tx.objectStore('notes').clear();
            tx.oncomplete = () => resolve();
        });
    }
}

function cleanupEmptyNotes(exceptId = null) {
    let changed = false;
    Object.values(currentNotes).forEach(n => {
        if (n.id !== exceptId && !n.deletedAt && (!n.body || !n.body.trim()) && (!n.title || !n.title.trim())) {
            delete currentNotes[n.id];
            deleteLocalNote(n.id);
            syncDeleteNote(n.id);
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
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // スマホ閲覧時（幅768px以下）は勝手に新しいメモを作成せず、メモ一覧を表示
        mainLayout.classList.remove('view-editor');
        btnBack.classList.add('hidden');
        return;
    }

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
            syncDeleteNote(n.id);
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

function selectNote(id, autoFocus = true, isRemoteSync = false) {
    if (syncDebounceTimer && activeNoteId && activeNoteId !== id) {
        flushPendingSave(activeNoteId);
    }
    if (!isRemoteSync) cleanupEmptyNotes(id);

    const isSameNote = (activeNoteId === id);
    activeNoteId = id;
    const n = currentNotes[id] || { title: '', body: '', pinned: false, codeCollapsed: {}, updatedAt: Date.now() };

    const isTrashNote = !!n.deletedAt;
    noteBody.disabled = isTrashNote;
    noteTitleInput.disabled = isTrashNote;

    noteBody.scrollTop = 0;
    noteCodeView.scrollTop = 0;

    if (document.activeElement === noteTitleInput) {
        if (noteTitleInput.value !== (n.title || '')) {
            const start = noteTitleInput.selectionStart;
            const end = noteTitleInput.selectionEnd;
            noteTitleInput.value = n.title || '';
            noteTitleInput.setSelectionRange(start, end);
        }
    } else {
        noteTitleInput.value = n.title || '';
    }

    if (document.activeElement === noteBody) {
        if (noteBody.value !== (n.body || '')) {
            const start = noteBody.selectionStart;
            const end = noteBody.selectionEnd;
            noteBody.value = n.body || '';
            noteBody.setSelectionRange(start, end);
        }
    } else {
        noteBody.value = n.body || '';
        if (!isSameNote) {
            resetTextHistory(n.body || '');
        }
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

    updateAutoCodeRender();

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
    scheduleSaveNote(activeNoteId, { title: noteTitleInput.value });
};

function moveToTrash(id) {
    if (syncDebounceTimer && activeNoteId === id) {
        flushPendingSave(id);
    }
    if (!currentNotes[id]) return;
    lastMovedToTrashNote = { ...currentNotes[id] };

    currentNotes[id].deletedAt = Date.now();
    saveLocalNote(currentNotes[id]);
    syncUpdateNoteFields(id, { deletedAt: currentNotes[id].deletedAt });

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
        noteCodeView.classList.add('hidden');
    }

    renderList(searchInput.value);

    showToast("メモをゴミ箱に移動しました", () => {
        if (lastMovedToTrashNote) {
            delete currentNotes[lastMovedToTrashNote.id].deletedAt;
            saveLocalNote(currentNotes[lastMovedToTrashNote.id]);
            syncSaveNote(currentNotes[lastMovedToTrashNote.id]);
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
    syncDeleteNote(id);
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
        noteCodeView.classList.add('hidden');
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

    syncClearTrash();

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
        noteCodeView.classList.add('hidden');
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
    syncSaveNote(currentNotes[activeNoteId]);
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
    if (!activeNoteId || !currentNotes[activeNoteId] || !currentNotes[activeNoteId].id) return;
    const isPinned = !currentNotes[activeNoteId].pinned;
    currentNotes[activeNoteId].pinned = isPinned;
    btnPin.classList.toggle('active', isPinned);
    saveLocalNote(currentNotes[activeNoteId]);
    renderList(searchInput.value);
    setStatus('saving', '保存中...');
    syncUpdateNoteFields(activeNoteId, { pinned: isPinned, updatedAt: Date.now() });
    showToast(isPinned ? "メモをピン留めしました" : "ピン留めを解除しました");
};

btnCopy.onclick = () => {
    if (!noteBody.value) return;
    navigator.clipboard.writeText(noteBody.value);
    showToast("全文をコピーしました");
};

function updateEditorFooter() {
    charCount.textContent = `${noteBody.value.length} 文字`;
    if (activeNoteId && currentNotes[activeNoteId]) {
        const time = currentNotes[activeNoteId].updatedAt || Date.now();
        dateDisplay.textContent = formatDateOnly(time);
    }
}

btnBack.onclick = () => {
    if (syncDebounceTimer && activeNoteId) {
        flushPendingSave(activeNoteId);
    }
    cleanupEmptyNotes();
    mainLayout.classList.remove('view-editor');
    btnBack.classList.add('hidden');
};

// クイック検索ショートカットキー (Ctrl+F / /)
window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    } else if (e.key === '/' && document.activeElement !== noteBody && document.activeElement !== noteTitleInput && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
});

function handleInput() {
    if (!activeNoteId || !currentNotes[activeNoteId]) return;
    const val = noteBody.value;
    pushTextHistory(val);
    scheduleSaveNote(activeNoteId, { body: val });
}

noteBody.oninput = handleInput;

noteBody.addEventListener('paste', () => {
    setTimeout(() => {
        handleInput();
        updateAutoCodeRender(true);
    }, 50);
});

noteBody.onblur = () => {
    updateAutoCodeRender();
};

searchInput.oninput = () => renderList(searchInput.value);

function createNewNote(autoFocus = true) {
    if (syncDebounceTimer && activeNoteId) {
        flushPendingSave(activeNoteId);
    }
    cleanupEmptyNotes();

    const newId = 'note_' + Date.now();
    currentNotes[newId] = { id: newId, title: '', body: '', pinned: false, codeCollapsed: {}, updatedAt: Date.now() };
    saveLocalNote(currentNotes[newId]);
    selectNote(newId, autoFocus);
    setStatus('saving', '新規作成中...');
    syncSaveNote(currentNotes[newId]);
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
    setStatus('saving', 'キャッシュを強制クリア中...');
    try {
        if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
        }
        if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            for (let r of regs) await r.unregister();
        }
    } catch (err) {
        console.error("Cache clear error:", err);
    }
    showToast("最新コードで再読み込み中...");
    setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.set('v', Date.now());
        window.location.href = url.toString();
    }, 300);
};

// 認証処理（Webアプリ / Chrome拡張機能 自動対応）
async function loginWithProvider(provider) {
    try {
        authLoading.classList.remove('hidden');
        authButtons.classList.add('hidden');

        // Chrome 拡張機能環境（サイドパネルやポップアップ）の場合
        if (typeof chrome !== 'undefined' && chrome?.windows?.create) {
            // Web上の認証ページを開くことで拡張機能のCSP制限(script-src 'self')を完全回避
            const webAuthUrl = 'https://flickmemo-qwe.web.app/auth.html';
            chrome.windows.create({
                url: webAuthUrl,
                type: 'popup',
                width: 500,
                height: 620
            });

            // タイムアウト保護タイマー
            setTimeout(() => {
                if (!auth.currentUser) {
                    authLoading.classList.add('hidden');
                    authButtons.classList.remove('hidden');
                }
            }, 15000);
        } else {
            // 通常の Web アプリ環境 (flickmemo-qwe.web.app 等)
            try {
                await setPersistence(auth, browserLocalPersistence);
            } catch (pErr) {
                console.warn("Persistence set warning:", pErr);
            }
            await signInWithPopup(auth, provider);
        }
    } catch (error) {
        console.error("Login Error:", error);
        let msg = error.message || "認証に失敗しました";
        if (error.code === 'auth/popup-closed-by-user') {
            msg = "ログイン画面が閉じられました。";
        } else if (error.code === 'auth/popup-blocked') {
            msg = "ポップアップがブラウザにブロックされました。";
        } else if (error.code === 'auth/unauthorized-domain') {
            msg = "Firebase Console の「Authentication > 設定 > 承認済みドメイン」をご確認ください。";
        }
        alert("ログインに失敗しました: " + msg);
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
    }
}

document.getElementById('btn-google').onclick = () => loginWithProvider(new GoogleAuthProvider());

onAuthStateChanged(auth, async user => {
    splashScreen.classList.add('hidden');
    if (user) {
        if (currentUserId !== null && currentUserId !== user.uid) {
            await clearLocalData();
        }
        currentUserId = user.uid;

        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');

        const nameText = user.displayName || user.email?.split('@')[0] || 'ユーザー';
        const emailText = user.email || 'メールアドレス非公開';

        userName.textContent = nameText;
        userEmail.textContent = emailText;

        userAvatar.onerror = () => {
            userAvatar.src = getInitialsAvatar(nameText);
        };

        if (user.photoURL) {
            userAvatar.src = user.photoURL;
        } else {
            userAvatar.src = getInitialsAvatar(nameText);
        }

        if (userProviderTag) userProviderTag.textContent = "Google";

        if (currentDbRef) {
            off(currentDbRef);
        }
        currentDbRef = ref(db, `users/${user.uid}/notes`);
        onValue(currentDbRef, snapshot => {
            try {
                const remoteNotes = snapshot.val() || {};
                let hasChanges = false;

                Object.keys(currentNotes).forEach(id => {
                    if (!remoteNotes[id]) {
                        delete currentNotes[id];
                        deleteLocalNote(id);
                        hasChanges = true;
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
                            noteCodeView.classList.add('hidden');
                        }
                    }
                });

                Object.values(remoteNotes).forEach(n => {
                    const local = currentNotes[n.id];
                    if (!local || (n.updatedAt || 0) >= (local.updatedAt || 0)) {
                        if (!local || JSON.stringify(local) !== JSON.stringify(n)) {
                            currentNotes[n.id] = n;
                            saveLocalNote(n);
                            hasChanges = true;
                        }
                    }
                });

                cleanExpiredTrash();
                
                if (hasChanges) {
                    renderList(searchInput.value);
                }

                updateExtensionBadge();

                if (activeNoteId && currentNotes[activeNoteId]) {
                    selectNote(activeNoteId, false, true);
                } else {
                    const isMobile = window.innerWidth <= 768;
                    if (!isMobile) {
                        const validNotes = Object.values(currentNotes)
                            .filter(n => !n.deletedAt)
                            .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

                        if (validNotes.length > 0) {
                            selectNote(validNotes[0].id, false, true);
                        }
                    }
                }
                setStatus('synced', 'クラウド同期完了');
                checkPendingExtensionNotes();
            } catch (err) {
                console.error("onValue processing error:", err);
                setStatus('synced', '同期処理中にエラーが発生しました');
            }
        }, error => {
            console.error("Sync Error:", error);
            setStatus('offline', '同期オフライン');
        });
    } else {
        await clearLocalData();
        if (currentDbRef) {
            off(currentDbRef);
            currentDbRef = null;
        }
        currentUserId = null;

        authContainer.classList.remove('hidden');
        appContainer.classList.add('hidden');
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
    }
});

// ★ アプリ非表示・離脱時の即時同期確定ハンドラ
window.addEventListener('beforeunload', () => {
    cleanupEmptyNotes();
    if (activeNoteId && syncDebounceTimer) {
        flushPendingSave(activeNoteId);
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && activeNoteId && syncDebounceTimer) {
        flushPendingSave(activeNoteId);
    } else if (document.visibilityState === 'visible') {
        checkPendingExtensionNotes();
    }
});