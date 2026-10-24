import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import * as protocol from '../authProtocol.js';

async function setup() {
    const handlers = {}, local = {}, session = {};
    const sent = [], menus = [];
    const chrome = {
        sidePanel: { setPanelBehavior: async () => {} },
        runtime: { onInstalled: { addListener: fn => { handlers.install = fn; } },
            onMessageExternal: { addListener: fn => { handlers.external = fn; } },
            sendMessage: async message => { sent.push(message); return { received: true }; } },
        contextMenus: { removeAll: async () => { menus.length = 0; }, create: item => menus.push(item),
            onClicked: { addListener: fn => { handlers.quick = fn; } } },
        storage: { local: { get: async () => ({ ...local }), set: async values => Object.assign(local, values) },
            session: { get: async () => ({ ...session }) } },
        action: { setBadgeText: async () => {} }
    };
    const context = vm.createContext({ chrome, console });
    const source = await fs.readFile(new URL('../background.js', import.meta.url), 'utf8');
    const module = new vm.SourceTextModule(source + '\nexport function drainQuickNotes() { return quickNoteQueue; }', { context });
    await module.link(() => new vm.SyntheticModule(Object.keys(protocol), function () {
        for (const [key, value] of Object.entries(protocol)) this.setExport(key, value);
    }, { context }));
    await module.evaluate();
    return { handlers, local, session, sent, menus, drain: module.namespace.drainQuickNotes };
}

test('service worker only relays fresh auth messages from the exact hosted helper', async () => {
    const app = await setup();
    app.session.pendingAuth = { extensionId: 'a'.repeat(32), state: 'b'.repeat(64), createdAt: Date.now() };
    const response = { type: protocol.AUTH_SUCCESS, state: 'b'.repeat(64), googleIdToken: 'test-token' };
    assert.equal(app.handlers.external(response, { url: 'https://attacker.example/auth.html' }, () => {}), undefined);
    assert.equal(app.sent.length, 0);
    const rejected = await new Promise(resolve => app.handlers.external({ ...response, state: 'wrong' }, { url: `${protocol.AUTH_ORIGIN}/auth.html` }, resolve));
    assert.equal(rejected.received, false);
    assert.equal(app.sent.length, 0);
    const accepted = await new Promise(resolve => app.handlers.external(response, { url: `${protocol.AUTH_ORIGIN}/auth.html` }, resolve));
    assert.equal(accepted.received, true);
    assert.equal(app.sent.length, 1);
});

test('rapid context-menu saves are serialized instead of overwriting each other', async () => {
    const app = await setup();
    app.handlers.quick({ menuItemId: 'add-selection-to-flickmemo', selectionText: 'first' }, {});
    app.handlers.quick({ menuItemId: 'add-selection-to-flickmemo', selectionText: 'second' }, {});
    await app.drain();
    assert.equal(app.local.pendingQuickNote, 'first\n\n---\n\nsecond');
});

test('extension updates recreate one set of context menus without duplicate IDs', async () => {
    const app = await setup();
    await app.handlers.install();
    await app.handlers.install();
    assert.equal(app.menus.length, 3);
    assert.equal(new Set(app.menus.map(menu => menu.id)).size, 3);
});
