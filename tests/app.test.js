import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import { webcrypto } from 'node:crypto';
import { JSDOM } from 'jsdom';
import { IDBFactory } from 'fake-indexeddb';
import { NoteStore } from '../noteStore.js';
import * as archiveNames from '../archiveNames.js';
import * as clipboardFiles from '../clipboardFiles.js';
import * as noteData from '../noteData.js';
import * as protocol from '../authProtocol.js';
import { WriteBarrier } from '../platform/writeBarrier.js';
import { createNavigation } from '../platform/navigation.js';
import { setupColorPicker } from '../platform/colorPicker.js';

async function setup({ edge = false, extension = false, saveGate } = {}) {
    const extensionId = 'a'.repeat(32);
    const dom = new JSDOM(await fs.readFile(new URL('../index.html', import.meta.url), 'utf8'), {
        url: extension ? `chrome-extension://${extensionId}/index.html` : 'https://flickmemo-qwe.web.app/',
        pretendToBeVisual: true
    });
    const window = dom.window;
    window.matchMedia = () => ({ matches: false });
    window.open = url => { calls.opened.push(url); return calls.popup; };
    Object.defineProperty(window, 'crypto', { value: webcrypto });
    Object.defineProperty(window.navigator, 'userAgent', { value: edge ? 'Windows Edg/130.0' : 'Windows Chrome/130.0' });
    const calls = { opened: [], credentials: [], tokens: 0, popup: { closed: false }, signedOut: 0, writes:[] };
    const session = {};
    let authCallback;
    const auth = { currentUser: null };
    const authApi = {
        getAuth: () => auth, getRedirectResult: async () => null,
        signInWithPopup: async () => ({}), signInWithRedirect: async () => {},
        signInWithCredential: async (_, credential) => calls.credentials.push(credential),
        signOut: async () => { calls.signedOut++; },
        onAuthStateChanged: (_, callback) => { authCallback = callback; },
        setPersistence: async () => {}, browserLocalPersistence: {},
        GoogleAuthProvider: class {
            setCustomParameters(parameters) { this.parameters = parameters; }
            static credential(id, access) { return { id, access }; }
        }
    };
    const dbApi = { getDatabase: () => ({}), ref: (_, path) => path,
        set: async (path,value) => {calls.writes.push({path,value});}, remove: async () => {}, get: async () => ({ val: () => null }),
        update: async () => {}, onValue: () => () => {}, off() {} };
    let messageListener;
    const chrome = {
        runtime: { id: extensionId, getURL: path => `chrome-extension://${extensionId}/${path}`,
            onMessage: { addListener: callback => { messageListener = callback; } } },
        storage: { session: { set: async data => Object.assign(session, data),
            remove: async key => { delete session[key]; } } },
        identity: { getAuthToken: (options, callback) => { calls.tokens++; callback('native-token'); },
            removeCachedAuthToken: (_, callback) => callback() },
        tabs: { create: async ({ url }) => calls.opened.push(url) }
    };
    const factory = new IDBFactory();
    const dependencies = {
        'firebase/app': { initializeApp: () => ({}) }, 'firebase/auth': authApi, 'firebase/database': dbApi,
        './archiveNames.js': archiveNames, './clipboardFiles.js': clipboardFiles, './authProtocol.js': protocol, './noteData.js': noteData,
        './noteStore.js': { NoteStore: class extends NoteStore { constructor() { super(factory); } async put(...args){await super.put(...args);await saveGate?.();} } },
        './platform/writeBarrier.js': { WriteBarrier },
        './platform/colorPicker.js': { setupColorPicker },
        './platform/navigation.js': { createNavigation },
        './fileTransfer.js': { FileTransferManager: class { stopDevicePresence() {} } }
    };
    const sandbox = { window, document: window.document, navigator: window.navigator, location: window.location,
        crypto: webcrypto, performance: window.performance, URL, URLSearchParams, TextEncoder, Uint8Array,
        structuredClone, Blob, File: window.File, console: { log() {}, warn() {}, error() {}, info() {} },
        setTimeout: window.setTimeout.bind(window), clearTimeout: window.clearTimeout.bind(window),
        setInterval: window.setInterval.bind(window), clearInterval: window.clearInterval.bind(window),
        fetch: async () => ({ ok: false }), btoa, atob,
        requestAnimationFrame: window.requestAnimationFrame.bind(window),
        ...(extension ? { chrome } : {}) };
    const context = vm.createContext(sandbox);
    const source = await fs.readFile(new URL('../app.js', import.meta.url), 'utf8');
    const module = new vm.SourceTextModule(source + `
        export { loginWithProvider, handleExternalAuthSuccess, finishAuthAttempt, renderList, buildCodeBlockHTML, resetTextHistory, pushTextHistory, clearLocalData, saveHistoryNote, selectNote, openTransferView };
        export function changeTestOwner(uid){currentUserId=uid;auth.currentUser=uid?{uid}:null;isGuestMode=!uid;++authGeneration;currentNotes={};}
        export function setNotes(notes) { currentNotes = notes; }
        export function historySize() { return textHistory.reduce((sum, text) => sum + text.length, 0); }
    `, { context, importModuleDynamically: async () => { throw new Error('Unexpected eager dynamic import'); } });
    await module.link(specifier => {
        const values = dependencies[specifier];
        if (!values) throw new Error('Unknown dependency: ' + specifier);
        return new vm.SyntheticModule(Object.keys(values), function () {
            for (const [name, value] of Object.entries(values)) this.setExport(name, value);
        }, { context });
    });
    await module.evaluate();
    await authCallback(null);
    return { dom, api: module.namespace, calls, chrome, session, document: window.document,
        message: (...args) => messageListener(...args), close: () => dom.window.close() };
}

test('website initializes and pinned titles and code attributes cannot inject HTML', async () => {
    const app = await setup();
    try {
        const title = '<img src=x onerror="alert(1)">';
        app.api.setNotes({ n: { id: 'n', title, body: '', pinned: true, updatedAt: Date.now() } });
        app.api.renderList();
        assert.equal(app.document.querySelectorAll('#note-list img').length, 0);
        assert.equal(app.document.querySelector('#note-list .title').textContent.includes(title), true);
        const block = app.api.buildCodeBlockHTML('javascript', "const x = ' onclick='alert(1)", 0, false);
        const parsed = new JSDOM(block);
        assert.equal(parsed.window.document.querySelectorAll('[onclick]').length, 0);
        parsed.window.close();
    } finally { app.close(); }
});
test('history memo completion cannot upload the previous account text to a new account',async()=>{
    let release,started;const waiting=new Promise(resolve=>{started=resolve;});
    const app=await setup({saveGate:()=>{started();return new Promise(resolve=>release=resolve);}});
    try{app.api.changeTestOwner('owner-a');const saving=app.api.saveHistoryNote('Private A history');await waiting;app.api.changeTestOwner('owner-b');release();await saving;assert.deepEqual(app.calls.writes,[]);}finally{app.close();}
});
test('large note lists are paginated while search still finds notes outside the first page', async () => {
    const app = await setup();
    try {
        app.api.setNotes(Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [String(i), {
            id: String(i), title: i === 999 ? 'needle' : 'note', body: '', updatedAt: 1000 - i
        }])));
        app.api.renderList();
        assert.equal(app.document.querySelectorAll('.note-item').length, 150);
        app.api.renderList('needle');
        assert.equal(app.document.querySelectorAll('.note-item').length, 1);
    } finally { app.close(); }
});
test('Chrome account selection bypasses native profile tokens and keeps the current account until success', async () => {
    const app = await setup({ extension: true });
    try {
        await app.api.loginWithProvider(null, { selectAccount: true });
        assert.equal(app.calls.tokens, 0);
        assert.equal(app.calls.signedOut, 0);
        assert.equal(app.calls.opened.length, 1);
        const url = new URL(app.calls.opened[0]);
        assert.equal(url.searchParams.get('extension_id'), app.chrome.runtime.id);
        assert.equal(url.searchParams.get('state'), app.session.pendingAuth.state);
        assert.equal(await app.api.handleExternalAuthSuccess({ type: 'FLICKMEMO_AUTH_SUCCESS', state: 'wrong', googleIdToken: 'token' }), false);
        const response = { type: 'FLICKMEMO_AUTH_SUCCESS', state: app.session.pendingAuth.state, googleIdToken: 'token' };
        assert.equal(await app.api.handleExternalAuthSuccess(response), true);
        assert.equal(await app.api.handleExternalAuthSuccess(response), false);
        assert.equal(app.calls.credentials.length, 1);
        assert.equal(app.session.pendingAuth, undefined);
    } finally { app.api.finishAuthAttempt(); app.close(); }
});
test('Edge routes login through the hosted helper without calling unsupported getAuthToken', async () => {
    const app = await setup({ edge: true, extension: true });
    try {
        await app.api.loginWithProvider(null);
        assert.equal(app.calls.tokens, 0);
        assert.equal(app.calls.opened.length, 1);
        assert.equal(new URL(app.calls.opened[0]).origin, protocol.AUTH_ORIGIN);
    } finally { app.api.finishAuthAttempt(); app.close(); }
});
test('Chrome normal login still uses native identity credentials', async () => {
    const app = await setup({ extension: true });
    try {
        await app.api.loginWithProvider(null);
        assert.equal(app.calls.tokens, 2);
        assert.equal(app.calls.opened.length, 0);
        assert.equal(app.calls.credentials.length, 1);
    } finally { app.close(); }
});


test('permanent navigation buttons restore note and transfer locations, skip deleted notes and reset on account cleanup', async () => {
    const app = await setup();
    try {
        const doc = app.document, back = doc.getElementById('btn-back'), forward = doc.getElementById('btn-forward');
        assert.equal(doc.querySelector('.header-left .brand-logo'), null);
        assert.equal(back.disabled, true); assert.equal(forward.disabled, true);
        const notes = { a: { id: 'a', body: 'First memo', title: 'A' }, b: { id: 'b', body: 'Second memo', title: 'B' } };
        app.api.setNotes(notes); app.api.selectNote('a', false); app.api.selectNote('b', false); app.api.openTransferView();
        back.click(); assert.equal(doc.getElementById('note-body').value, 'Second memo');
        assert.equal(doc.getElementById('main-layout').classList.contains('view-transfer'), false);
        back.click(); assert.equal(doc.getElementById('note-body').value, 'First memo');
        forward.click(); assert.equal(doc.getElementById('note-body').value, 'Second memo');
        delete notes.a; back.click(); assert.equal(doc.getElementById('note-body').value, ''); assert.equal(back.disabled, true);
        forward.click(); assert.equal(doc.getElementById('note-body').value, 'Second memo');
        await app.api.clearLocalData(); assert.equal(back.disabled, true); assert.equal(forward.disabled, true);
    } finally { app.close(); }
});
