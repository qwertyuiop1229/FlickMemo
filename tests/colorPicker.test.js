import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { setupColorPicker, pickerPreferences, validShortcut, formatColor } from '../platform/colorPicker.js';
const tick = () => new Promise(resolve => setImmediate(resolve));
function fixture({ eyedropper, stored, native } = {}) {
    const dom = new JSDOM('<div class="header-right"></div><div id="color-picker-settings"></div>', { url: 'https://flickmemo-qwe.web.app' });
    const win = dom.window, copies = [];
    win.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
    win.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
    if (stored) win.localStorage.setItem('flickmemo-color-picker-v1', JSON.stringify(stored));
    if (eyedropper) win.EyeDropper = class { open() { return eyedropper(); } };
    Object.defineProperty(win.navigator, 'clipboard', { value: { writeText: async text => { copies.push(text); } } });
    const ui = setupColorPicker({ win, doc: win.document, native, isDesktop: !!native });
    return { win, ui, copies, doc: win.document, close: () => win.close() };
}
test('picker validates color values and formats RGB/HSL including achromatic and hue wrapping', () => {
    assert.equal(formatColor('#cb5733'), '#CB5733'); assert.equal(formatColor('#CB5733', 'hex', false), '#cb5733');
    assert.equal(formatColor('#CB5733', 'rgb'), 'rgb(203, 87, 51)');
    for (const [hex, expected] of [['#000000', 'hsl(0, 0%, 0%)'], ['#FFFFFF', 'hsl(0, 0%, 100%)'], ['#FF0000', 'hsl(0, 100%, 50%)'], ['#00FF00', 'hsl(120, 100%, 50%)'], ['#0000FF', 'hsl(240, 100%, 50%)']]) assert.equal(formatColor(hex, 'hsl'), expected);
    for (const value of ['url(x)', '#abc', '#GGGGGG', '<img src=x>']) assert.throws(() => formatColor(value));
    assert.equal(validShortcut('Ctrl+Alt+C'), true); assert.equal(validShortcut('Ctrl+C'), false);
    assert.equal(pickerPreferences({ format: 'html', shortcut: 'Alt+F4' }).shortcut, 'Ctrl+Alt+C');
});
test('web picker starts within activation, copies exactly the chosen color, and cancellation preserves clipboard', async () => {
    let called = 0, cancel = false;
    const f = fixture({ eyedropper: () => { called++; return cancel ? Promise.reject(Object.assign(new Error('cancel'), { name: 'AbortError' })) : Promise.resolve({ sRGBHex: '#12ab34' }); } });
    try {
        f.ui.open(); f.doc.querySelector('[data-pick]').click(); assert.equal(called, 1); await tick(); assert.deepEqual(f.copies, ['#12AB34']);
        cancel = true; await f.ui.pick(); assert.deepEqual(f.copies, ['#12AB34']);
        assert.equal(f.doc.querySelector('[data-value]').value, '#12AB34');
        f.doc.querySelector('[data-clear]').click(); await tick(); assert.equal(f.doc.querySelectorAll('.color-recent-swatch').length, 0);
    } finally { f.close(); }
});
test('picker bounds local history, drops invalid stored values, and never renders stored HTML', async () => {
    const f = fixture({ stored: { recent: ['<img src=x onerror=alert(1)>', ...Array.from({ length: 30 }, (_, i) => `#${i.toString(16).padStart(6, '0')}`)] } });
    try { assert.equal(f.doc.querySelectorAll('.color-recent-swatch').length, 12); assert.equal(f.doc.querySelectorAll('img').length, 0); assert.equal(f.doc.querySelector('[data-pick]').disabled, true); } finally { f.close(); }
});
test('web shortcut respects disabled preference and does not intercept AltGraph input', async () => {
    let starts = 0; const f = fixture({ eyedropper: () => { starts++; return Promise.resolve({ sRGBHex: '#000000' }); } });
    try {
        f.win.dispatchEvent(new f.win.KeyboardEvent('keydown', { key: 'c', ctrlKey: true, altKey: true, modifierAltGraph: true, cancelable: true })); assert.equal(starts, 0);
        f.win.dispatchEvent(new f.win.KeyboardEvent('keydown', { key: 'c', ctrlKey: true, altKey: true, cancelable: true })); await tick(); assert.equal(starts, 1);
        const form = f.doc.querySelector('.color-preferences'); form.elements.enabled.checked = false; form.dispatchEvent(new f.win.Event('submit', { cancelable: true })); await tick();
        f.win.dispatchEvent(new f.win.KeyboardEvent('keydown', { key: 'c', ctrlKey: true, altKey: true, cancelable: true })); assert.equal(starts, 1);
    } finally { f.close(); }
});
test('native preference failures keep the previous working shortcut and do not duplicate native copies', async () => {
    let callback;
    const f = fixture({ native: { colorStatus: async () => ({ preferences: pickerPreferences(), recent: [] }), colorChanged: async cb => { callback = cb; }, colorSettings: async () => { throw new Error('キーが使用中です'); } } });
    try {
        await tick(); const form = f.doc.querySelector('.color-preferences'); form.elements.key.value = 'X'; form.dispatchEvent(new f.win.Event('submit', { cancelable: true })); await tick();
        assert.match(f.doc.querySelector('.color-settings-status').textContent, /キーが使用中/);
        callback({ hex: '#123456', copied: true }); assert.deepEqual(f.copies, []); assert.match(f.doc.querySelector('[data-hint]').textContent, /Ctrl\+Alt\+C/);
    } finally { f.close(); }
});
test('clipboard rejection leaves a selectable value and offers an explicit retry', async () => {
    const f = fixture({ eyedropper: () => Promise.resolve({ sRGBHex: '#abcdef' }) });
    try {
        f.win.navigator.clipboard.writeText = async () => { throw new Error('denied'); }; await f.ui.pick(); assert.match(f.doc.querySelector('.color-message').textContent, /コピーボタン/); assert.equal(f.doc.querySelector('[data-value]').value, '#ABCDEF');
        f.win.navigator.clipboard.writeText = async value => f.copies.push(value); f.doc.querySelector('[data-copy]').click(); await tick(); assert.deepEqual(f.copies, ['#ABCDEF']);
    } finally { f.close(); }
});

test('corrupted saved preference shapes cannot break app initialization', () => {
    for (const preferences of [null, [], 7, { shortcut: { toString: null } }]) {
        const f = fixture({ stored: { preferences, recent: [{ toString: null }, null, '#123456'] } });
        try { assert.equal(f.doc.querySelectorAll('.color-recent-swatch').length, 1); } finally { f.close(); }
    }
});
