import { directorySink } from '../streamingFiles.js';
import { setupFolders } from '../platform/folders.js';
import { reconcileNote } from '../noteSync.js';
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

async function setup({ edge = false, extension = false, saveGate, transactionGate, transactionEcho = false, directoryPicker, cachedRows = [] } = {}) {
    const extensionId = 'a'.repeat(32);
    const dom = new JSDOM(await fs.readFile(new URL('../index.html', import.meta.url), 'utf8'), {
        url: extension ? `chrome-extension://${extensionId}/index.html` : 'https://flickmemo-qwe.web.app/',
        pretendToBeVisual: true
    });
    const window = dom.window;
    if (directoryPicker) window.showDirectoryPicker = directoryPicker;
    window.matchMedia = () => ({ matches: false });
    window.open = url => { calls.opened.push(url); return calls.popup; };
    Object.defineProperty(window, 'crypto', { value: webcrypto });
    Object.defineProperty(window.navigator, 'userAgent', { value: edge ? 'Windows Edg/130.0' : 'Windows Chrome/130.0' });
    const calls = { opened: [], credentials: [], tokens: 0, popup: { closed: false }, signedOut: 0, writes:[], echoes:[] };
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
    const snapshots = new Map(), remoteValues = new Map();
    const dbApi = { getDatabase: () => ({}), ref: (_, path) => path,
        set: async (path,value) => {calls.writes.push({path,value});}, remove: async () => {}, get: async path => ({ val: () => remoteValues.get(path) ?? null }),
        runTransaction: async (path, callback) => {
            const value = callback(structuredClone(remoteValues.get(path) ?? null));
            if (value !== undefined) {
                remoteValues.set(path,value); calls.writes.push({path,value,transaction:true});
                if (transactionEcho) {
                    const parent = path.slice(0,path.lastIndexOf('/'));
                    const notes = structuredClone(Object.fromEntries([...remoteValues].filter(([key])=>key.startsWith(parent+'/')).map(([key,note])=>[key.slice(parent.length+1),note])));
                    calls.echoes.push(Promise.resolve(snapshots.get(parent)?.({val:()=>notes})));
                }
            }
            const snapshot = structuredClone(remoteValues.get(path) ?? null);
            await transactionGate?.({path,value});
            return {committed:value !== undefined,snapshot:{val:()=>snapshot}};
        },
        update: async (path,value) => calls.writes.push({path,value,partial:true}), onValue: (path,callback) => { snapshots.set(path, callback); if (/\/notes\/[^/]+$/.test(path)) queueMicrotask(() => callback({val:()=>remoteValues.get(path) ?? null})); return () => snapshots.delete(path); }, off(path) { snapshots.delete(path); } };
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
    const seed = new NoteStore(factory);
    for (const row of cachedRows) await seed.write(store => store.put(row));
    const dependencies = { './streamingFiles.js': { directorySink }, './platform/folders.js': { setupFolders: args => setupFolders({ ...args, doc: window.document, win: window }) }, './noteSync.js': { reconcileNote },
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
        export { safeCloudWrite, scheduleSaveNote, flushPendingSave, loginWithProvider, handleExternalAuthSuccess, finishAuthAttempt, renderList, buildCodeBlockHTML, resetTextHistory, pushTextHistory, clearLocalData, saveHistoryNote, selectNote, openTransferView };
        export function changeTestOwner(uid){currentUserId=uid;remoteConnected=true;auth.currentUser=uid?{uid}:null;isGuestMode=!uid;++authGeneration;currentNotes={};}
        export function setNotes(notes) { currentNotes = notes; }
        export function notesForTest() { return currentNotes; }
        export function receiveDirectoryForTest() { return receiveDirectory; }
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
    return { dom, login: async user => { auth.currentUser=user; await authCallback(user); }, remote: (path,value) => remoteValues.set(path,structuredClone(value)), snapshot: async (path,value) => { if (value && typeof value === 'object') for (const [id,note] of Object.entries(value)) remoteValues.set(path + '/' + id,structuredClone(note)); return snapshots.get(path)?.({ val: () => value }); }, api: module.namespace, calls, chrome, session, document: window.document,
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


test('stale cached Windows note never overwrites a newer PWA body on startup, even with an ahead clock',async()=>{
 const old={id:'note_stale',title:'cached',body:'Windows old content',updatedAt:99999999999999};
 const app=await setup({cachedRows:[{owner:'alice',id:old.id,note:old,pending:true}]});
 try{await app.login({uid:'alice',displayName:'Test',email:'test@example.test'});assert.equal(app.calls.writes.some(w=>w.path==='users/alice/notes/note_stale'),false);
 const remote={...old,body:'Latest PWA content',updatedAt:1};await app.snapshot('users/alice/notes',{note_stale:remote});await new Promise(r=>setTimeout(r,20));
 assert.equal(app.api.notesForTest().note_stale.body,remote.body);assert.ok(Object.values(app.api.notesForTest()).some(n=>n.conflictOf===old.id&&n.body===old.body));
 assert.equal(app.calls.writes.some(w=>w.path==='users/alice/notes/note_stale'&&w.value.body===old.body),false);
 }finally{app.close()}
});
test('classifying a note transaction preserves newer remote body content',async()=>{
 const local={id:'memo',body:'preserved',title:'memo',folderId:'',updatedAt:1};
 const app=await setup({cachedRows:[{owner:'alice',id:'memo',note:local,pending:false,base:local}]});
 try{app.api.changeTestOwner('alice');app.api.setNotes({memo:local});app.remote('users/alice/notes/memo',{...local,body:'newer PWA body'});app.api.scheduleSaveNote('memo',{folderId:'folder_work'});app.api.flushPendingSave('memo');await new Promise(r=>setTimeout(r,30));const write=app.calls.writes.find(w=>w.path==='users/alice/notes/memo'&&w.transaction);assert.equal(write.value.folderId,'folder_work');assert.equal(write.value.body,'newer PWA body');assert.equal(app.api.notesForTest().memo.body,'newer PWA body');}finally{app.close()}
});
test('a pending timestamp-only save preserves the remote timestamp and adopts its latest body',async()=>{
 const local={id:'memo',body:'old body',title:'memo',updatedAt:1};
 const remote={...local,body:'new body',updatedAt:200};
 const app=await setup({cachedRows:[{owner:'alice',id:'memo',note:local,pending:true,pendingFields:['updatedAt'],base:local}]});
 try{app.api.changeTestOwner('alice');app.api.setNotes({memo:local});app.remote('users/alice/notes/memo',remote);await app.api.safeCloudWrite('memo');const write=app.calls.writes.find(w=>w.transaction);assert.equal(write.value.updatedAt,200);assert.equal(app.api.notesForTest().memo.body,'new body');}finally{app.close()}
});

test('typing during a cloud save and its early Firebase echo never creates a false conflict or loses text',async()=>{
 const original={id:'memo',body:'original',title:'memo',updatedAt:1};
 let release,started;const began=new Promise(resolve=>started=resolve);let blocked=false;
 const app=await setup({transactionEcho:true,cachedRows:[{owner:'alice',id:'memo',note:original,pending:false,base:original}],transactionGate:()=>{if(!blocked){blocked=true;started();return new Promise(resolve=>release=resolve)}}});
 try{
  await app.login({uid:'alice',displayName:'Test'});await app.snapshot('users/alice/notes',{memo:original});await app.snapshot('.info/connected',true);
  app.api.scheduleSaveNote('memo',{body:'first edit'});const first=app.api.safeCloudWrite('memo',{body:'first edit',updatedAt:2});await began;
  app.api.scheduleSaveNote('memo',{body:'continued typing'});const second=app.api.safeCloudWrite('memo',{body:'continued typing',updatedAt:3});
  release();await Promise.all([first,second]);await Promise.all(app.calls.echoes);
  assert.equal(app.api.notesForTest().memo.body,'continued typing');
  assert.equal(Object.values(app.api.notesForTest()).some(note=>note.conflictOf==='memo'),false);
  assert.equal(app.calls.writes.filter(write=>write.path==='users/alice/notes/memo').at(-1).value.body,'continued typing');
 }finally{release?.();app.close()}
});

test('queued memo saves are discarded after switching accounts and cannot change the new account UI',async()=>{
 const original={id:'memo',body:'alice original',title:'memo',updatedAt:1};let release,started;
 const began=new Promise(resolve=>started=resolve);
 const app=await setup({cachedRows:[{owner:'alice',id:'memo',note:original,pending:false,base:original}],transactionGate:()=>{started();return new Promise(resolve=>release=resolve)}});
 try{app.api.changeTestOwner('alice');app.api.setNotes({memo:original});app.remote('users/alice/notes/memo',original);app.api.scheduleSaveNote('memo',{body:'alice first'});const first=app.api.safeCloudWrite('memo',{body:true,updatedAt:true});await began;
 app.api.scheduleSaveNote('memo',{body:'alice queued'});const second=app.api.safeCloudWrite('memo',{body:true,updatedAt:true});app.api.changeTestOwner('bob');app.api.setNotes({memo:{id:'memo',body:'bob private'}});release();await Promise.all([first,second]);
 assert.equal(app.api.notesForTest().memo.body,'bob private');assert.equal(app.calls.writes.length,1);assert.equal(app.calls.writes[0].path,'users/alice/notes/memo');assert.equal(app.calls.writes[0].value.body,'alice first');
 }finally{release?.();app.close()}
});

test('a directory chooser resolved after account cleanup cannot grant the next session a save destination',async()=>{
 let release;const app=await setup({directoryPicker:()=>new Promise(resolve=>release=resolve)});
 try{const button=app.document.querySelector('[data-directory]');const choosing=button.onclick();assert.equal(button.disabled,true);await app.api.clearLocalData();release({name:'Alice private folder'});await choosing;assert.equal(app.api.receiveDirectoryForTest(),null);assert.equal(app.document.querySelector('[data-release]').hidden,true);assert.equal(button.disabled,false);assert.equal(app.document.querySelector('.transfer-storage-tools [role=status]').textContent.includes('Alice'),false);}finally{release?.({name:'old'});app.close()}
});
