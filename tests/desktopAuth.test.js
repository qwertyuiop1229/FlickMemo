import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import * as protocol from '../authProtocol.js';

test('hosted desktop login posts credentials only to the nonce-bound IPv4 loopback callback', async () => {
    const state = 'e'.repeat(64);
    const url = `${protocol.AUTH_ORIGIN}/auth?desktop_port=49200&state=${state}&created_at=${Date.now()}`;
    const dom = new JSDOM(await fs.readFile(new URL('../auth.html', import.meta.url), 'utf8'), { url });
    const calls = [];
    dom.window.HTMLFormElement.prototype.submit = function () {
        calls.push({ action: this.action, method: this.method,
            fields: Object.fromEntries([...this.elements].map(input => [input.name, input.value])) });
    };
    const authApi = {
        getAuth: () => ({}), setPersistence: async () => {}, inMemoryPersistence: {}, getRedirectResult: async () => null,
        signInWithPopup: async () => ({}), signInWithRedirect: async () => {},
        GoogleAuthProvider: class {
            setCustomParameters() {}
            static credentialFromResult() { return { idToken: 'synthetic-id-token', accessToken: 'synthetic-access-token' }; }
        }
    };
    const dependencies = { 'firebase/app': { initializeApp: () => ({}) }, 'firebase/auth': authApi, './authProtocol.js': protocol };
    const context = vm.createContext({ window: dom.window, document: dom.window.document, location: dom.window.location,
        setTimeout: dom.window.setTimeout.bind(dom.window), URL, URLSearchParams, console });
    const module = new vm.SourceTextModule(await fs.readFile(new URL('../auth.js', import.meta.url), 'utf8'), { context });
    await module.link(specifier => {
        const values = dependencies[specifier];
        return new vm.SyntheticModule(Object.keys(values), function () {
            for (const [name, value] of Object.entries(values)) this.setExport(name, value);
        }, { context });
    });
    try {
        await module.evaluate(); await new Promise(resolve => setImmediate(resolve));
        dom.window.document.getElementById('btn-login-manual').click();
        await new Promise(resolve => setImmediate(resolve));
        assert.deepEqual(calls, [{ action: 'http://127.0.0.1:49200/callback', method: 'post',
            fields: { state, googleIdToken: 'synthetic-id-token', googleAccessToken: 'synthetic-access-token' } }]);
        assert.equal(dom.window.location.href, url);
        assert.ok(!calls[0].action.includes('token'));
        assert.ok(!dom.window.document.getElementById('msg').textContent.includes('synthetic'));
    } finally { dom.window.close(); }
});
