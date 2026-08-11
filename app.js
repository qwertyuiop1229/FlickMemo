import { initializeApp } from "firebase/app";
import JSZip from 'jszip';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    signInWithCredential,
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

import { FileTransferManager } from './fileTransfer.js';

// ★ アプリ内に直接埋め込まれたバージョン定数（bump.jsでデプロイ時に自動書き換え）
const APP_VERSION = "1.3.54";

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

// ★ 全デバイス対応 コンソールログ収集・保持（開発者タブ用）
const devLogs = [];
const MAX_DEV_LOGS = 500;
let currentDevFilter = 'all';

function formatLogArg(arg) {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'object') {
        try {
            if (arg instanceof Error) {
                return `${arg.name}: ${arg.message}\n${arg.stack || ''}`;
            }
            return JSON.stringify(arg, null, 2);
        } catch (e) {
            return String(arg);
        }
    }
    return String(arg);
}

function captureLog(level, args) {
    const timeStr = new Date().toISOString().slice(11, 23);
    const message = Array.from(args).map(formatLogArg).join(' ');
    devLogs.push({ time: timeStr, level, message });
    if (devLogs.length > MAX_DEV_LOGS) {
        devLogs.shift();
    }
    updateDevConsoleUI();
}

const origLog = console.log;
const origWarn = console.warn;
const origError = console.error;
const origInfo = console.info;

console.log = function (...args) {
    origLog.apply(console, args);
    captureLog('log', args);
};

console.warn = function (...args) {
    origWarn.apply(console, args);
    captureLog('warn', args);
};

console.error = function (...args) {
    origError.apply(console, args);
    captureLog('error', args);
};

console.info = function (...args) {
    origInfo.apply(console, args);
    captureLog('info', args);
};

window.addEventListener('error', (event) => {
    captureLog('uncaught', [event.error || event.message]);
});

window.addEventListener('unhandledrejection', (event) => {
    captureLog('uncaught', ['Unhandled Rejection:', event.reason]);
});

function updateDevConsoleUI() {
    const viewer = document.getElementById('dev-console-viewer');
    const logCountElem = document.getElementById('dev-log-count');
    if (!viewer) return;

    const filtered = devLogs.filter(item => {
        if (currentDevFilter === 'all') return true;
        if (currentDevFilter === 'error') return item.level === 'error' || item.level === 'uncaught';
        if (currentDevFilter === 'warn') return item.level === 'warn';
        if (currentDevFilter === 'info') return item.level === 'info' || item.level === 'log';
        return true;
    });

    if (logCountElem) logCountElem.textContent = devLogs.length;

    if (filtered.length === 0) {
        viewer.innerHTML = `<div class="dev-log-empty">該当するコンソールログはありません</div>`;
        return;
    }

    const html = filtered.map(item => `
        <div class="dev-log-entry ${item.level}">
            <div class="dev-log-header">
                <span class="dev-log-badge ${item.level}">${item.level.toUpperCase()}</span>
                <span class="dev-log-time">[${item.time}]</span>
            </div>
            <div class="dev-log-body">${escapeHTML(item.message)}</div>
        </div>
    `).join('');

    const isScrolledToBottom = viewer.scrollHeight - viewer.clientHeight <= viewer.scrollTop + 40;
    viewer.innerHTML = html;
    if (isScrolledToBottom) {
        viewer.scrollTop = viewer.scrollHeight;
    }
}

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

// モーダル・ユーザー情報・タブ
const tabNotes = document.getElementById('tab-notes');
const tabTrash = document.getElementById('tab-trash');
const btnHeaderTransfer = document.getElementById('btn-header-transfer');
const btnBackToNotes = document.getElementById('btn-back-to-notes');
const transferPanel = document.getElementById('transfer-panel');
const deviceChipList = document.getElementById('device-chip-list');
const dropzoneArea = document.getElementById('dropzone-area');
const fileInput = document.getElementById('file-input');
const btnBrowseFiles = document.getElementById('btn-browse-files');
const transferProgressCard = document.getElementById('transfer-progress-card');
const transferFilename = document.getElementById('transfer-filename');
const transferSpeed = document.getElementById('transfer-speed');
const transferProgressFill = document.getElementById('transfer-progress-fill');
const transferStatusLabel = document.getElementById('transfer-status-label');
const transferPercent = document.getElementById('transfer-percent');
const transferHistoryList = document.getElementById('transfer-history-list');

let transferManager = null;
let selectedTargetDeviceId = null;
let transferStartTime = 0;

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
const btnSettingsSwitchAction = document.getElementById('btn-settings-switch-action');

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
let forceAccountSelect = false;

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

function showToast(msg, duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'm3-toast-container';
        document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    toastEl.className = 'm3-toast-item';
    toastEl.innerHTML = `
        <div class="m3-toast-content">
            <span class="material-symbols-outlined m3-toast-icon">info</span>
            <span class="m3-toast-text">${escapeHTML(msg)}</span>
        </div>
        <button type="button" class="m3-toast-close" title="閉じる">
            <span class="material-symbols-outlined" style="font-size:16px;">close</span>
        </button>
    `;

    const btnClose = toastEl.querySelector('.m3-toast-close');
    const dismiss = () => {
        if (toastEl.classList.contains('dismissing')) return;
        toastEl.classList.add('dismissing');
        setTimeout(() => {
            if (toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
        }, 260);
    };

    btnClose.onclick = dismiss;
    container.appendChild(toastEl);

    // スタック数が3を超えた古い通知はフェードアウト
    const toasts = container.querySelectorAll('.m3-toast-item:not(.dismissing)');
    if (toasts.length > 3) {
        for (let i = 0; i < toasts.length - 3; i++) {
            toasts[i].classList.add('stacked-faded');
        }
    }

    const autoDuration = typeof duration === 'number' ? duration : 4000;
    setTimeout(dismiss, autoDuration);
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
        chrome.action.setBadgeText({ text: "" });
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

function renderDeviceChips(devices) {
    if (!deviceChipList) return;
    deviceChipList.innerHTML = '';
    const keys = Object.keys(devices || {});

    if (keys.length === 0) {
        deviceChipList.innerHTML = '<span class="no-device-text">Googleアカウントの他デバイスを検索中...（他端末でFlickMemoを開くと自動表示）</span>';
        return;
    }

    keys.forEach(devId => {
        const dev = devices[devId];
        const chip = document.createElement('div');
        chip.className = `device-chip ${selectedTargetDeviceId === devId ? 'selected' : ''}`;
        chip.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">smartphone</span> ${escapeHTML(dev.name || '端末')}`;
        chip.onclick = async () => {
            if (selectedTargetDeviceId === devId && transferManager?.dataChannel?.readyState === 'open') {
                // すでに接続中をタップした場合は切断して選択解除
                transferManager.cleanupPeerConnection();
                selectedTargetDeviceId = null;
                renderDeviceChips(devices);
                showToast("接続を切断しました");
                return;
            }
            selectedTargetDeviceId = devId;
            renderDeviceChips(devices);
            showToast(`${dev.name} へP2P接続を試みています...`);
            if (transferManager) {
                try {
                    await transferManager.connectToDevice(devId);
                } catch (e) {
                    selectedTargetDeviceId = null;
                    renderDeviceChips(devices);
                    showToast("接続エラー: " + e.message);
                }
            }
        };
        deviceChipList.appendChild(chip);
    });
}

let autoDismissProgressTimer = null;

function clearTransferHistoryUI() {
    if (!transferHistoryList) return;
    transferHistoryList.innerHTML = '<li class="empty-history">履歴はありません</li>';
}

function scheduleProgressAutoDismiss() {
    if (autoDismissProgressTimer) clearTimeout(autoDismissProgressTimer);
    autoDismissProgressTimer = setTimeout(() => {
        if (transferProgressCard) transferProgressCard.classList.add('hidden');
        // 履歴はセッション中ずっと残す（接続が切れるまで消さない）
    }, 4000);
}

const transferStepConnect = document.getElementById('transfer-step-connect');
const transferStepSession = document.getElementById('transfer-step-session');
const sessionDeviceName = document.getElementById('session-device-name');
const btnDisconnectSession = document.getElementById('btn-disconnect-session');
const transferLockBanner = document.getElementById('transfer-lock-banner');
const guestReceiverBanner = document.getElementById('guest-receiver-banner');
const targetSegmentedTabs = document.querySelector('.target-segmented-tabs');
const roomSectionBoxFirst = document.querySelector('.room-section-box:first-child');
const roomDividerBadge = document.querySelector('.room-divider-badge');
const btnSettingsLoginAction = document.getElementById('btn-settings-login-action');
const e2eeToggleCard = document.querySelector('.e2ee-toggle-card');
const modeDropdownWrap = document.getElementById('custom-mode-dropdown');

function applyGuestUIRestrictions() {
    if (isGuestMode) {
        // 送信関連UI 完全非表示
        if (targetSegmentedTabs) targetSegmentedTabs.classList.add('hidden');
        if (targetPanelDevices) targetPanelDevices.classList.add('hidden');
        if (targetPanelRoom) targetPanelRoom.classList.remove('hidden');
        if (roomSectionBoxFirst) roomSectionBoxFirst.classList.add('hidden');
        if (roomDividerBadge) roomDividerBadge.classList.add('hidden');
        if (e2eeToggleCard) e2eeToggleCard.classList.add('hidden');
        if (modeDropdownWrap) modeDropdownWrap.classList.add('hidden');

        if (dropzoneArea) dropzoneArea.classList.add('hidden');
        if (stagedFilesCard) stagedFilesCard.classList.add('hidden');
        if (guestReceiverBanner) guestReceiverBanner.classList.remove('hidden');
    } else {
        if (targetSegmentedTabs) targetSegmentedTabs.classList.remove('hidden');
        if (roomSectionBoxFirst) roomSectionBoxFirst.classList.remove('hidden');
        if (roomDividerBadge) roomDividerBadge.classList.remove('hidden');
        if (e2eeToggleCard) e2eeToggleCard.classList.remove('hidden');
        if (modeDropdownWrap) modeDropdownWrap.classList.remove('hidden');

        if (dropzoneArea) dropzoneArea.classList.remove('hidden');
        if (guestReceiverBanner) guestReceiverBanner.classList.add('hidden');
    }
}

function updateTransferSteps(isConnected, devName) {
    applyGuestUIRestrictions();
    if (isConnected) {
        transferStepConnect?.classList.add('hidden');
        transferStepSession?.classList.remove('hidden');
        if (sessionDeviceName) {
            sessionDeviceName.textContent = `接続中: ${devName || '相手端末'}`;
        }
    } else {
        transferStepConnect?.classList.remove('hidden');
        transferStepSession?.classList.add('hidden');
        if (transferLockBanner) transferLockBanner.classList.add('hidden');
        if (btnStartSend) btnStartSend.disabled = false;
    }
}

if (btnDisconnectSession) {
    btnDisconnectSession.onclick = () => {
        if (transferManager) transferManager.disconnect();
        updateTransferSteps(false);
        showToast("接続を切断しました");
    };
}

function handleTransferStatus(event, data) {
    if (event === 'devices_updated') {
        renderDeviceChips(data);
    } else if (event === 'room_member_joined') {
        showToast("相手端末を検出しました！接続中...");
        if (transferManager && data.otherDeviceId) {
            transferManager.connectToDevice(data.otherDeviceId, true);
        }
    } else if (event === 'channel_open') {
        showToast("P2P転送チャネルが開きました（接続完了）");
        const devName = selectedTargetDeviceId && transferManager?.activeDevices[selectedTargetDeviceId]?.name;
        settingsModal?.classList.add('hidden'); // 設定モーダルが開いていれば閉じる
        openTransferView(); // 自動的にファイル送信画面に遷移
        updateTransferSteps(true, devName);
    } else if (event === 'channel_close' || event === 'p2p_disconnected') {
        selectedTargetDeviceId = null;
        if (transferManager) renderDeviceChips(transferManager.activeDevices);
        showToast("接続が切断されました");
        updateTransferSteps(false);
        updateRoomUI(null); // 接続待機中カードも消す
        if (autoDismissProgressTimer) clearTimeout(autoDismissProgressTimer);
        if (transferProgressCard) transferProgressCard.classList.add('hidden');
        clearTransferHistoryUI();
    } else if (event === 'p2p_connected') {
        showToast("デバイス間P2P接続が確立しました");
        updateTransferSteps(true);
    } else if (event === 'remote_transfer_lock') {
        const isLocked = !!data;
        if (transferLockBanner) {
            if (isLocked) transferLockBanner.classList.remove('hidden');
            else transferLockBanner.classList.add('hidden');
        }
        if (btnStartSend) btnStartSend.disabled = isLocked;
    }
}

const activeBlobUrls = new Set();

function handleFileReceived(blob, filename, mode) {
    const url = URL.createObjectURL(blob);
    activeBlobUrls.add(url);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
        URL.revokeObjectURL(url);
        activeBlobUrls.delete(url);
    }, 1500);

    showToast(`ファイル「${filename}」を受信・保存しました`);
    addTransferHistory(filename, blob.size, '受信', mode || 'LAN_P2P');
    setTransferUILock(false);
    scheduleProgressAutoDismiss();
}

function handleTransferProgress(bytes, total, name, direction) {
    if (!transferProgressCard) return;
    if (autoDismissProgressTimer) clearTimeout(autoDismissProgressTimer);
    transferProgressCard.classList.remove('hidden');
    transferFilename.textContent = `${direction === 'send' ? '送信:' : '受信:'} ${name}`;

    const percent = Math.min(100, Math.round((bytes / total) * 100));
    transferProgressFill.style.width = `${percent}%`;
    transferPercent.textContent = `${percent}%`;

    const now = Date.now();
    if (!transferStartTime || percent === 0) transferStartTime = now;
    const elapsedSec = (now - transferStartTime) / 1000;
    if (elapsedSec > 0.2) {
        const speedMBs = ((bytes / (1024 * 1024)) / elapsedSec).toFixed(2);
        transferSpeed.textContent = `${speedMBs} MB/s`;
    }

    transferStatusLabel.textContent = percent >= 100 ? "完了" : `${(bytes / (1024 * 1024)).toFixed(1)} / ${(total / (1024 * 1024)).toFixed(1)} MB`;

    if (percent >= 100) {
        scheduleProgressAutoDismiss();
    }
}

function addTransferHistory(name, size, type, mode = 'LAN_P2P') {
    if (!transferHistoryList) return;
    const emptyLi = transferHistoryList.querySelector('.empty-history');
    if (emptyLi) emptyLi.remove();

    let modeText = '同一Wi-Fi (LAN)';
    let modeIcon = 'bolt';
    if (mode === 'WAN_P2P') {
        modeText = 'ネット (P2P)';
        modeIcon = 'public';
    } else if (mode === 'WEB_RELAY') {
        modeText = 'Webリレイ (E2EE)';
        modeIcon = 'hub';
    } else {
        modeText = '同一Wi-Fi (LAN)';
        modeIcon = 'bolt';
    }

    const li = document.createElement('li');
    li.className = 'transfer-history-item';
    const sizeStr = (size / (1024 * 1024)).toFixed(2) + ' MB';
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    li.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
            <div>
                <strong>${type === '送信' ? '[送信]' : '[受信]'} ${escapeHTML(name)}</strong>
                <span style="color:var(--m3-text-muted); font-size:0.75rem; margin-left:0.4rem;">(${sizeStr})</span>
            </div>
            <span class="m3-mode-badge">
                <span class="material-symbols-outlined">${modeIcon}</span> ${modeText}
            </span>
        </div>
        <span style="color:var(--m3-text-muted); font-size:0.75rem;">${timeStr}</span>
    `;
    transferHistoryList.prepend(li);
}

let stagedFilesQueue = [];

const stagedFilesCard = document.getElementById('staged-files-card');
const stagedFileList = document.getElementById('staged-file-list');
const stagedFileCount = document.getElementById('staged-file-count');
const btnClearStaged = document.getElementById('btn-clear-staged');
const btnAddMoreFiles = document.getElementById('btn-add-more-files');
const btnStartSend = document.getElementById('btn-start-send');

function renderStagedFilesUI() {
    if (!stagedFilesCard || !stagedFileList) return;

    if (stagedFilesQueue.length === 0) {
        stagedFilesCard.classList.add('hidden');
        stagedFileList.innerHTML = '';
        if (stagedFileCount) stagedFileCount.textContent = '0';
        return;
    }

    stagedFilesCard.classList.remove('hidden');
    if (stagedFileCount) stagedFileCount.textContent = stagedFilesQueue.length.toString();

    stagedFileList.innerHTML = '';
    stagedFilesQueue.forEach((file, index) => {
        const li = document.createElement('li');
        li.className = 'staged-file-item';
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
        li.innerHTML = `
            <div>
                <span class="file-name">${escapeHTML(file.name)}</span>
                <span class="file-size">(${sizeMB})</span>
            </div>
            <button class="btn-remove-staged" title="削除" type="button">
                <span class="material-symbols-outlined" style="font-size:18px;">close</span>
            </button>
        `;
        li.querySelector('.btn-remove-staged').onclick = () => {
            stagedFilesQueue.splice(index, 1);
            renderStagedFilesUI();
        };
        stagedFileList.appendChild(li);
    });
}

function stageFiles(files) {
    if (!files || files.length === 0) return;
    if (isGuestMode) {
        showToast("ゲストモードではファイル送信はできません（受信専用）");
        return;
    }
    Array.from(files).forEach(f => stagedFilesQueue.push(f));
    renderStagedFilesUI();
    showToast(`${files.length} 件のファイルを送信リストに追加しました`);
}

// ドロップゾーン＆ファイル選択バインド
if (dropzoneArea && fileInput && btnBrowseFiles) {
    btnBrowseFiles.onclick = (e) => {
        e.stopPropagation();
        fileInput.click();
    };

    dropzoneArea.onclick = () => fileInput.click();

    dropzoneArea.ondragover = (e) => {
        e.preventDefault();
        dropzoneArea.classList.add('dragover');
    };

    dropzoneArea.ondragleave = () => dropzoneArea.classList.remove('dragover');

    dropzoneArea.ondrop = (e) => {
        e.preventDefault();
        dropzoneArea.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            stageFiles(e.dataTransfer.files);
        }
    };

    fileInput.onchange = () => {
        if (fileInput.files && fileInput.files.length > 0) {
            stageFiles(fileInput.files);
            fileInput.value = '';
        }
    };
}

if (btnAddMoreFiles) {
    btnAddMoreFiles.onclick = () => fileInput.click();
}

if (btnClearStaged) {
    btnClearStaged.onclick = () => {
        stagedFilesQueue = [];
        renderStagedFilesUI();
        showToast("送信リストをクリアしました");
    };
}

let isTransferring = false;

function setTransferUILock(isLocked) {
    isTransferring = isLocked;
    const elementsToLock = [
        dropzoneArea,
        fileInput,
        btnBrowseFiles,
        btnClearStaged,
        btnAddMoreFiles,
        btnStartSend,
        btnDisconnectSession,
        btnLeaveRoom,
        btnCreateRoom,
        btnJoinRoom
    ];

    elementsToLock.forEach(el => {
        if (el) {
            if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
                el.disabled = isLocked;
            } else {
                el.style.pointerEvents = isLocked ? 'none' : 'auto';
                el.style.opacity = isLocked ? '0.6' : '1';
            }
        }
    });
}

if (btnStartSend) {
    btnStartSend.onclick = async () => {
        if (isGuestMode) {
            showToast("ゲストモードではファイル送信はできません（受信専用）");
            return;
        }
        if (stagedFilesQueue.length === 0) {
            showToast("送信するファイルを選択してください");
            return;
        }

        if (!transferManager) {
            showToast("送信機能が準備できていません");
            return;
        }

        let fileToSend = null;
        setTransferUILock(true); // 送信中の UI 操作をロック

        try {
            if (stagedFilesQueue.length === 1) {
                fileToSend = stagedFilesQueue[0];
            } else {
                showToast("複数ファイルを軽量ZIP圧縮中...");
                const zip = new JSZip();
                const usedNames = new Map();

                for (let i = 0; i < stagedFilesQueue.length; i++) {
                    const file = stagedFilesQueue[i];
                    let name = file.name || `file_${i + 1}`;
                    
                    if (usedNames.has(name)) {
                        const count = usedNames.get(name) + 1;
                        usedNames.set(name, count);
                        const extIdx = name.lastIndexOf('.');
                        if (extIdx > 0) {
                            name = `${name.substring(0, extIdx)}_${count}${name.substring(extIdx)}`;
                        } else {
                            name = `${name}_${count}`;
                        }
                    } else {
                        usedNames.set(name, 1);
                    }

                    // DOM File から生バイトデータ (ArrayBuffer) を読み出して ZIP に追加
                    const arrayBuffer = await file.arrayBuffer();
                    zip.file(name, arrayBuffer);
                }

                const zipBlob = await zip.generateAsync({
                    type: "blob",
                    mimeType: "application/zip",
                    compression: "DEFLATE",
                    compressionOptions: { level: 5 }
                });

                const todayStr = new Date().toISOString().slice(0, 10);
                const zipFileName = `FlickMemo_Files_${todayStr}.zip`;
                fileToSend = new File([zipBlob], zipFileName, { type: "application/zip" });
            }

            showToast(`「${fileToSend.name}」の送信を開始します...`);

            const actualMode = await transferManager.sendFileP2P(fileToSend);

            addTransferHistory(fileToSend.name, fileToSend.size, '送信', actualMode);
            showToast(`✅ 「${fileToSend.name}」の送信が完了しました！`);

            stagedFilesQueue = [];
            renderStagedFilesUI();
        } catch (err) {
            console.error("Send Error:", err);
            showToast("送信失敗: " + (err.message || "接続を確認してください"));
        } finally {
            setTransferUILock(false); // UI ロック解除
        }
    };
}

const btnBackTransfer = document.getElementById('btn-back-transfer');

function openTransferView() {
    currentTab = 'transfer';
    applyGuestUIRestrictions();
    if (mainLayout) mainLayout.classList.add('view-transfer');
    if (transferPanel) transferPanel.classList.remove('hidden');

    // 矢印が二重表示（2つ）にならないよう、一覧に戻る矢印を隠して送信画面用の矢印のみ1つ表示
    if (btnBack) btnBack.classList.add('hidden');
    if (btnBackTransfer) btnBackTransfer.classList.remove('hidden');

    tabNotes?.classList.remove('active');
    tabTrash?.classList.remove('active');
    if (dateDisplay) dateDisplay.classList.add('hidden');
    if (charCount) charCount.classList.add('hidden');
}

function openNotesView() {
    currentTab = 'notes';
    if (mainLayout) mainLayout.classList.remove('view-transfer');

    // ファイル送信用の戻る矢印を非表示
    if (btnBackTransfer) btnBackTransfer.classList.add('hidden');

    // モバイル画面かつエディタ閲覧中の場合のみ「一覧に戻る」矢印を復元
    if (window.innerWidth <= 768 && mainLayout?.classList.contains('view-editor')) {
        if (btnBack) btnBack.classList.remove('hidden');
    } else {
        if (btnBack) btnBack.classList.add('hidden');
    }

    tabNotes?.classList.add('active');
    tabTrash?.classList.remove('active');
    btnNew?.classList.remove('hidden');
    btnEmptyTrash?.classList.add('hidden');
    trashNotice?.classList.add('hidden');
    if (transferPanel) transferPanel.classList.add('hidden');
    noteBody?.classList.remove('hidden');
    if (noteTitleInput) noteTitleInput.classList.remove('hidden');
    renderList(searchInput.value);

    if (activeNoteId && currentNotes[activeNoteId]) {
        if (dateDisplay) dateDisplay.classList.remove('hidden');
        if (charCount) charCount.classList.remove('hidden');
        updateAutoCodeRender(true);
    }
}

if (btnHeaderTransfer) {
    btnHeaderTransfer.onclick = () => {
        openTransferView();
    };
}

if (btnBackTransfer) {
    btnBackTransfer.onclick = () => {
        openNotesView();
    };
}

// 100% 独自デザイン Material 3 カスタムドロップダウンロジック
const customDropdown = document.getElementById('custom-mode-dropdown');
const dropdownTrigger = document.getElementById('dropdown-trigger');
const dropdownMenuList = document.getElementById('dropdown-menu-list');
const selectedModeText = document.getElementById('selected-mode-text');

if (dropdownTrigger && dropdownMenuList) {
    dropdownTrigger.onclick = (e) => {
        e.stopPropagation();
        const isOpen = !dropdownMenuList.classList.contains('hidden');
        if (isOpen) {
            dropdownMenuList.classList.add('hidden');
            customDropdown?.classList.remove('open');
        } else {
            dropdownMenuList.classList.remove('hidden');
            customDropdown?.classList.add('open');
        }
    };

    document.addEventListener('click', () => {
        dropdownMenuList.classList.add('hidden');
        customDropdown?.classList.remove('open');
    });

    dropdownMenuList.querySelectorAll('.dropdown-menu-item').forEach(item => {
        item.onclick = (e) => {
            e.stopPropagation();
            const val = item.getAttribute('data-value');
            const iconElem = item.querySelector('.material-symbols-outlined:not(.check-icon)');
            const iconName = iconElem ? iconElem.textContent.trim() : 'bolt';
            const titleText = item.querySelector('.item-title').textContent.trim();

            dropdownMenuList.querySelectorAll('.dropdown-menu-item').forEach(i => {
                i.classList.remove('selected');
                const chk = i.querySelector('.check-icon');
                if (chk) chk.classList.add('hidden');
            });
            item.classList.add('selected');
            const currentChk = item.querySelector('.check-icon');
            if (currentChk) currentChk.classList.remove('hidden');

            selectedModeText.innerHTML = `<span class="material-symbols-outlined mode-icon">${iconName}</span> ${escapeHTML(titleText)}`;
            dropdownMenuList.classList.add('hidden');
            customDropdown?.classList.remove('open');

            if (transferManager) {
                transferManager.currentMode = val;
                showToast(`送信モードを「${titleText}」に変更しました`);
            }
        };
    });
}

// ★ 送信先セグメントタブ 切り替え
const btnTargetTabDevices = document.getElementById('btn-target-tab-devices');
const btnTargetTabRoom = document.getElementById('btn-target-tab-room');
const targetPanelDevices = document.getElementById('target-panel-devices');
const targetPanelRoom = document.getElementById('target-panel-room');

if (btnTargetTabDevices && btnTargetTabRoom) {
    btnTargetTabDevices.onclick = () => {
        btnTargetTabDevices.classList.add('active');
        btnTargetTabRoom.classList.remove('active');
        targetPanelDevices?.classList.remove('hidden');
        targetPanelRoom?.classList.add('hidden');
    };

    btnTargetTabRoom.onclick = () => {
        btnTargetTabRoom.classList.add('active');
        btnTargetTabDevices.classList.remove('active');
        targetPanelRoom?.classList.remove('hidden');
        targetPanelDevices?.classList.add('hidden');
    };
}

// ★ ワンタイム共有ルーム Event Handlers
const btnCreateRoom = document.getElementById('btn-create-room');
const btnJoinRoom = document.getElementById('btn-join-room');
const btnLeaveRoom = document.getElementById('btn-leave-room');
const roomCodeInput = document.getElementById('room-code-input');
const roomActiveStatus = document.getElementById('room-active-status');
const roomStatusText = document.getElementById('room-status-text');

function updateRoomUI(roomId) {
    if (roomId) {
        roomActiveStatus?.classList.remove('hidden');
        if (roomStatusText) roomStatusText.textContent = `現在の合言葉: ${roomId} (接続待機中...)`;
        if (roomCodeInput) roomCodeInput.value = roomId;
    } else {
        roomActiveStatus?.classList.add('hidden');
        if (roomCodeInput) roomCodeInput.value = '';
    }
}

function ensureTransferManager() {
    if (!transferManager) {
        transferManager = new FileTransferManager(
            auth,
            db,
            (event, data) => handleTransferStatus(event, data),
            (blob, filename, mode) => handleFileReceived(blob, filename, mode),
            (bytes, total, name, direction) => handleTransferProgress(bytes, total, name, direction)
        );
    }
    if (transferManager) {
        transferManager.isGuestMode = isGuestMode;
    }
    return transferManager;
}

if (btnCreateRoom) {
    btnCreateRoom.onclick = () => {
        const tm = ensureTransferManager();
        if (!tm) return;
        const newRoomId = 'rm_' + Math.random().toString(36).substring(2, 8);
        const randomKey = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0')).join('');

        tm.joinRoom(newRoomId);
        updateRoomUI(newRoomId);

        // クライアントローカルで処理される #key (ハッシュ) で E2EE 暗号化鍵を共有
        const shareUrl = `${window.location.origin}${window.location.pathname}?room=${newRoomId}#key=${randomKey}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast(`【E2EE暗号化】共有URL（鍵付き）をコピーしました！`);
        }).catch(() => {
            showToast(`共有URLを作成しました`);
        });
    };
}

if (btnJoinRoom) {
    btnJoinRoom.onclick = () => {
        const val = roomCodeInput?.value.trim();
        if (!val) {
            showToast("合言葉を入力してください");
            return;
        }
        const tm = ensureTransferManager();
        if (!tm) return;
        tm.joinRoom(val);
        if (isGuestMode) {
            // ゲストは「接続待機中」ステータスカードを表示しない (受信専用なので待つだけ)
            showToast(`合言葉「${val}」で受信待機中...`);
        } else {
            updateRoomUI(val);
            showToast(`合言葉「${val}」で接続待機中...`);
        }
    };
}

if (btnLeaveRoom) {
    btnLeaveRoom.onclick = () => {
        if (transferManager) transferManager.disconnect();
        updateRoomUI(null);
        updateTransferSteps(false);
        showToast("切断しました");
    };
}

// URL パラメータ `?room=...` の自動接続チェック
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
        setTimeout(() => {
            openTransferView();
            if (transferManager) {
                transferManager.joinRoom(roomParam);
                updateRoomUI(roomParam);
                showToast(`共有URL経由でルーム ${roomParam} に自動接続しました！`);
            }
        }, 800);
    }
});

tabNotes.onclick = openNotesView;

tabTrash.onclick = () => {
    currentTab = 'trash';
    if (mainLayout) mainLayout.classList.remove('view-transfer');
    tabTrash.classList.add('active');
    tabNotes.classList.remove('active');
    btnNew.classList.add('hidden');
    btnEmptyTrash.classList.remove('hidden');
    trashNotice.classList.remove('hidden');
    if (transferPanel) transferPanel.classList.add('hidden');
    noteBody.classList.remove('hidden');
    if (noteTitleInput) noteTitleInput.classList.remove('hidden');
    renderList(searchInput.value);

    if (activeNoteId && currentNotes[activeNoteId]) {
        if (dateDisplay) dateDisplay.classList.remove('hidden');
        if (charCount) charCount.classList.remove('hidden');
        updateAutoCodeRender(true);
    }
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

    // ゲストモード: 設定モーダル内のUI切り替え
    const settingsNavAccount = document.querySelector('.settings-nav .settings-tab-btn[data-tab="account"]');
    const settingsNavSystem = document.querySelector('.settings-nav .settings-tab-btn[data-tab="system"]');
    const accountLabel = document.getElementById('settings-account-label');
    const accountDesc = document.getElementById('settings-account-desc');
    const btnLogout = document.getElementById('btn-settings-logout-action');
    const btnLogin = document.getElementById('btn-settings-login-action');
    const btnSwitch = document.getElementById('btn-settings-switch-action');

    if (isGuestMode) {
        // ゲスト: アカウントタブのラベルをログインに変更、ログアウト・切り替えボタン非表示
        if (accountLabel) accountLabel.textContent = 'Googleアカウントでログイン';
        if (accountDesc) accountDesc.textContent = 'ログインするとメモの同期やデバイス間転送が利用できます';
        if (btnLogout) btnLogout.classList.add('hidden');
        if (btnSwitch) btnSwitch.classList.add('hidden');
        if (btnLogin) btnLogin.classList.remove('hidden');
        // ゲストは「一般・同期」タブも非表示
        if (settingsNavSystem) settingsNavSystem.classList.add('hidden');
        // アカウントタブをアクティブにリセット
        if (settingsNavAccount) settingsNavAccount.click();
    } else {
        if (accountLabel) accountLabel.textContent = 'アカウント管理';
        if (accountDesc) accountDesc.textContent = '別のアカウントへの切り替えまたはサインアウト';
        if (btnLogout) btnLogout.classList.remove('hidden');
        if (btnSwitch) btnSwitch.classList.remove('hidden');
        if (btnLogin) btnLogin.classList.add('hidden');
        if (settingsNavSystem) settingsNavSystem.classList.remove('hidden');
    }

    settingsModal.classList.remove('hidden');
};
btnSettingsClose.onclick = () => settingsModal.classList.add('hidden');

// 設定内ログイン → Google ログインページへ
if (btnSettingsLoginAction) {
    btnSettingsLoginAction.onclick = () => {
        settingsModal.classList.add('hidden');
        // ゲストモードを解除してログイン画面へ
        isGuestMode = false;
        if (transferManager) transferManager.isGuestMode = false;
        authContainer.classList.remove('hidden');
        appContainer.classList.add('hidden');
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
    };
}

btnSettingsLogoutAction.onclick = () => {
    settingsModal.classList.add('hidden');
    logoutModal.classList.remove('hidden');
};

if (btnSettingsSwitchAction) {
    btnSettingsSwitchAction.onclick = async () => {
        settingsModal.classList.add('hidden');
        try {
            if (typeof chrome !== 'undefined' && chrome?.identity?.removeCachedAuthToken) {
                // キャッシュされているトークンを取得して破棄
                await new Promise((resolve) => {
                    chrome.identity.getAuthToken({ interactive: false }, (token) => {
                        if (token) {
                            chrome.identity.removeCachedAuthToken({ token }, () => {
                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                });
            }
            await signOut(auth);
            showToast("アカウントを切替中... Googleログイン画面を開きます");

            // アプリのログイン画面で止まらず、そのままダイレクトにGoogleログイン（アカウント選択）を自動起動
            setTimeout(() => {
                const googleProvider = new GoogleAuthProvider();
                googleProvider.setCustomParameters({ prompt: 'select_account' });
                loginWithProvider(googleProvider);
            }, 300);
        } catch (err) {
            console.error("Account switch error:", err);
            showToast("切り替え準備に失敗しました: " + (err.message || ""));
        }
    };
}

// 自動更新検出機能 (起動時にバックグラウンドで version.json を無キャッシュチェック)
async function checkForNewVersionAuto() {
    try {
        const vRes = await fetch(`./version.json?nocache=${Date.now()}`, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
        });
        if (vRes.ok) {
            const vData = await vRes.json();
            if (vData.version && vData.version !== APP_VERSION) {
                console.log(`[Version Check] New version detected: v${vData.version} (current: v${APP_VERSION})`);
                showToast(`新しいバージョン (v${vData.version}) が利用可能です！【設定】から【更新を確認】を押してください`);
            }
        }
    } catch (e) {}
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkForNewVersionAuto, 2500);
});

btnUpdateCheck.onclick = async () => {
    setStatus('saving', '最新コード取得＆キャッシュ完全消去中...');
    showToast("最新コードを取得するため全キャッシュを完全破棄中...");
    
    let latestVersionText = "最新";
    try {
        const vRes = await fetch(`./version.json?force_reload=${Date.now()}`, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
        });
        if (vRes.ok) {
            const vData = await vRes.json();
            if (vData.version) latestVersionText = `v${vData.version}`;
        }
    } catch (e) {}

    // ServiceWorker & CacheStorage & Storage 完全解除
    try {
        if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            for (let r of regs) {
                await r.unregister();
            }
        }
        if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
        }
        localStorage.removeItem('flickmemo_version_cache');
        sessionStorage.clear();
    } catch (err) {
        console.error("Cache purge error:", err);
    }

    showToast(`最新コード (${latestVersionText}) を適用して再読み込み中...`);

    setTimeout(() => {
        const targetUrl = new URL(window.location.origin + window.location.pathname);
        targetUrl.searchParams.set('v', Date.now());
        targetUrl.searchParams.set('hard_reload', 'true');
        window.location.href = targetUrl.toString();
    }, 400);
};

// ★ 開発者タブ コンソールログ コピー・クリア・フィルターイベント
const btnDevCopyAll = document.getElementById('btn-dev-copy-all');
const btnDevClearLogs = document.getElementById('btn-dev-clear-logs');

if (btnDevCopyAll) {
    btnDevCopyAll.onclick = () => {
        if (devLogs.length === 0) {
            showToast("コピーするコンソールログがありません");
            return;
        }
        const textToCopy = devLogs.map(item => `[${item.time}] [${item.level.toUpperCase()}] ${item.message}`).join('\n\n');
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`コンソール全体をコピーしました (${devLogs.length}件)`);
            }).catch(() => {
                fallbackCopyText(textToCopy);
            });
        } else {
            fallbackCopyText(textToCopy);
        }
    };
}

function fallbackCopyText(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showToast(`コンソール全体をコピーしました (${devLogs.length}件)`);
    } catch (e) {
        showToast("コピーに失敗しました");
    }
    document.body.removeChild(ta);
}

if (btnDevClearLogs) {
    btnDevClearLogs.onclick = () => {
        devLogs.length = 0;
        updateDevConsoleUI();
        showToast("コンソールログをクリアしました");
    };
}

document.querySelectorAll('.dev-filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.dev-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDevFilter = btn.getAttribute('data-filter') || 'all';
        updateDevConsoleUI();
    };
});

// ★ スマホ等でのステータスドットタップイベント（状況テキストをトースト表示）
if (statusBar) {
    statusBar.onclick = () => {
        const text = statusText?.textContent || '同期完了';
        showToast(`ステータス: ${text}`);
    };
}

// リダイレクト認証結果のチェック（iOS PWA / Safari リダイレクト対応）
getRedirectResult(auth).then(result => {
    if (result && result.user) {
        console.log("Redirect login successful:", result.user.email);
    }
}).catch(err => {
    console.error("Redirect Result Error:", err);
});

// 認証処理（Webアプリ / iOS PWA / Chrome拡張機能 自動対応）
async function loginWithProvider(provider) {
    try {
        authLoading.classList.remove('hidden');
        authButtons.classList.add('hidden');

        if (!provider) {
            provider = new GoogleAuthProvider();
        }
        provider.setCustomParameters({ prompt: 'select_account' });

        const ua = navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

        // ── Chrome 拡張機能（サイドパネル）環境 ──────────────────────────────
        if (typeof chrome !== 'undefined' && chrome?.runtime?.id && chrome?.identity?.getAuthToken) {
            await new Promise((resolve, reject) => {
                // キャッシュトークンがあれば事前にクリアしてアカウント選択画面を確実に発火
                chrome.identity.getAuthToken({ interactive: false }, (existingToken) => {
                    const proceedGetToken = () => {
                        chrome.identity.getAuthToken({ interactive: true }, async (token) => {
                            if (chrome.runtime.lastError || !token) {
                                const errMsg = chrome.runtime.lastError?.message || 'Googleトークンの取得に失敗しました';
                                console.error('chrome.identity.getAuthToken error:', errMsg);
                                reject(new Error(errMsg));
                                return;
                            }

                            try {
                                const credential = GoogleAuthProvider.credential(null, token);
                                await setPersistence(auth, browserLocalPersistence);
                                await signInWithCredential(auth, credential);
                                resolve();
                            } catch (err) {
                                console.error('signInWithCredential error:', err);
                                if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-token-expired') {
                                    chrome.identity.removeCachedAuthToken({ token }, () => {});
                                }
                                reject(err);
                            }
                        });
                    };

                    if (existingToken) {
                        chrome.identity.removeCachedAuthToken({ token: existingToken }, proceedGetToken);
                    } else {
                        proceedGetToken();
                    }
                });
            });

        } else if (isIOS || isStandalone) {
            // iOS Safari / iOS PWA: リダイレクト方式
            await setPersistence(auth, browserLocalPersistence);
            await signInWithRedirect(auth, provider);
        } else {
            // 通常 Web 環境
            try {
                await setPersistence(auth, browserLocalPersistence);
            } catch (pErr) {
                console.warn("Persistence set warning:", pErr);
            }
            try {
                await signInWithPopup(auth, provider);
            } catch (popupErr) {
                if (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/operation-not-supported-in-this-environment') {
                    console.warn("Popup blocked. Falling back to signInWithRedirect...");
                    await signInWithRedirect(auth, provider);
                } else {
                    throw popupErr;
                }
            }
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
        } else if (error.message?.includes('OAuth2 not granted or revoked') || error.message?.includes('Not granted')) {
            msg = "Googleアカウントへのアクセスが拒否されました。Chromeにログイン中のGoogleアカウントを確認してください。";
        }
        alert("ログインに失敗しました: " + msg);
        authLoading.classList.add('hidden');
        authButtons.classList.remove('hidden');
    }
}

let isGuestMode = false;

const btnGuestLogin = document.getElementById('btn-guest-login');
if (btnGuestLogin) {
    btnGuestLogin.onclick = () => {
        isGuestMode = true;
        const tm = ensureTransferManager();
        if (tm) tm.isGuestMode = true;
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');

        userName.textContent = "ゲストユーザー";
        userEmail.textContent = "ログインしていません (ローカル保存のみ)";
        userAvatar.src = getInitialsAvatar("Guest");
        if (userProviderTag) userProviderTag.textContent = "ゲスト";

        showToast("ゲストモード (ローカルメモ / 合言葉受送信対応)");
        loadLocalNotesOnly();

        const urlParams = new URLSearchParams(window.location.search);
        const urlRoom = urlParams.get('room');
        if (urlRoom && tm) {
            openTransferView();
            if (btnTargetTabRoom) btnTargetTabRoom.click();
            tm.joinRoom(urlRoom);
            updateRoomUI(urlRoom);
            showToast(`共有URL「${urlRoom}」に自動接続しました`);
        }
    };
}

const toggleE2ee = document.getElementById('toggle-e2ee');
const toggleSessionE2ee = document.getElementById('toggle-session-e2ee');

function syncE2EEState(enabled, sourceToggle) {
    if (transferManager) {
        transferManager.isE2EEEnabled = enabled;
    }
    if (toggleE2ee && sourceToggle !== toggleE2ee) {
        toggleE2ee.checked = enabled;
    }
    if (toggleSessionE2ee && sourceToggle !== toggleSessionE2ee) {
        toggleSessionE2ee.checked = enabled;
    }
    showToast(enabled ? "AES-256 E2EE暗号化を有効にしました" : "E2EE暗号化をオフにしました");
}

if (toggleE2ee) {
    toggleE2ee.onchange = () => syncE2EEState(toggleE2ee.checked, toggleE2ee);
}
if (toggleSessionE2ee) {
    toggleSessionE2ee.onchange = () => syncE2EEState(toggleSessionE2ee.checked, toggleSessionE2ee);
}

document.getElementById('btn-google').onclick = () => loginWithProvider(new GoogleAuthProvider());

onAuthStateChanged(auth, async user => {
    splashScreen.classList.add('hidden');
    if (user) {
        isGuestMode = false;
        if (transferManager) transferManager.isGuestMode = false;
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
        const tm = ensureTransferManager();
        tm.startDevicePresence();

        const urlParams = new URLSearchParams(window.location.search);
        const urlRoom = urlParams.get('room');
        if (urlRoom && tm) {
            openTransferView();
            if (btnTargetTabRoom) btnTargetTabRoom.click();
            tm.joinRoom(urlRoom);
            updateRoomUI(urlRoom);
            showToast(`共有URL「${urlRoom}」に自動接続しました`);
        }
    } else {
        if (transferManager) {
            transferManager.stopDevicePresence();
        }
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

// ★ メモ保存のみ（ウィンドウ最小化・バックグラウンド移行では P2P 切断しない）
function handleNoteSave() {
    cleanupEmptyNotes();
    if (activeNoteId && syncDebounceTimer) {
        flushPendingSave(activeNoteId);
    }
}

// ★ アプリ完全終了時のみ P2P を切断（タスクキル・タブ閉じ・スマホスワイプ終了・メモリ完全解放）
function handleAppExitCleanup() {
    // アクティブな全 Blob URL を一括破棄（iOS Safari メモリリーク防止）
    activeBlobUrls.forEach(url => {
        try { URL.revokeObjectURL(url); } catch (e) {}
    });
    activeBlobUrls.clear();

    if (transferManager) {
        transferManager.stopDevicePresence();
        transferManager.resetReceiveBuffer();
    }
    stagedFilesQueue = [];
    handleNoteSave();
}

// タブ閉じ / ページ遷移 → P2P も含めて完全クリーンアップ
window.addEventListener('beforeunload', handleAppExitCleanup);

// iOS PWA / モバイルのスワイプ終了・ホームボタン長押し強制終了 → P2P クリーンアップ
// (pagehide の persisted=false =本当のページ破棄のみ対応)
window.addEventListener('pagehide', (e) => {
    if (!e.persisted) {
        handleAppExitCleanup();
    }
});

// ウィンドウ最小化・バックグラウンド移行 → メモ保存のみ、P2P 接続は維持
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        handleNoteSave(); // P2P は切断しない
    } else if (document.visibilityState === 'visible') {
        checkPendingExtensionNotes();
    }
});