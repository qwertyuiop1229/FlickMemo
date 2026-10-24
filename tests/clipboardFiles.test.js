import test from 'node:test';
import assert from 'node:assert/strict';
import { copyClipboardFile, normalizeImageToPng } from '../clipboardFiles.js';

const pngBytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');
const png = () => new Blob([pngBytes], { type: 'image/png' });
function environment({ decodeError = false, nullCanvas = false, permissionError = false } = {}) {
    const events = [], texts = [], revoked = [], writes = [];
    const env = {
        Blob, AbortController, setTimeout, clearTimeout,
        URL: { createObjectURL: () => 'blob:test', revokeObjectURL: url => revoked.push(url) },
        Image: class {
            naturalWidth = 1; naturalHeight = 1;
            set src(value) {
                if (value) queueMicrotask(() => {
                    events.push('decode');
                    if (decodeError) this.onerror?.(); else this.onload?.();
                });
            }
        },
        document: { createElement: () => ({ width: 0, height: 0,
            getContext: () => ({ drawImage() {} }),
            toBlob: callback => queueMicrotask(() => callback(nullCanvas ? null : png())) }) },
        ClipboardItem: class { constructor(data) { this.data = data; } },
        navigator: { clipboard: {
            write: items => {
                events.push('write'); writes.push(items);
                if (permissionError) return Promise.reject(Object.assign(new Error('Permission denied'), { name: 'NotAllowedError' }));
                return Promise.all(items.flatMap(item => Object.values(item.data)));
            },
            writeText: async text => texts.push(text)
        } }
    };
    return { env, events, texts, revoked, writes };
}

test('Safari image copy calls clipboard.write within the gesture, before async image decoding', async () => {
    const state = environment();
    assert.equal(await copyClipboardFile(png(), { name: 'image.png', env: state.env }), 'image');
    assert.equal(state.events[0], 'write');
    assert.equal(state.writes[0][0].data['image/png'] instanceof Promise, true);
    assert.deepEqual(state.revoked, ['blob:test']);
});
test('corrupted PNGs are rejected without retrying as binary, base64 or filename', async () => {
    const state = environment();
    await assert.rejects(copyClipboardFile(new Blob(['not a PNG'], { type: 'image/png' }), { env: state.env }), /壊れ/);
    assert.equal(state.writes.length, 1);
    assert.equal(state.texts.length, 0);
});
test('failed image decoding and a null canvas result release resources and report failure', async () => {
    for (const options of [{ decodeError: true }, { nullCanvas: true }]) {
        const state = environment(options);
        await assert.rejects(copyClipboardFile(png(), { env: state.env }));
        assert.equal(state.revoked.length, 1);
        assert.equal(state.texts.length, 0);
    }
});
test('permission denial does not start an automatic fallback clipboard write', async () => {
    const state = environment({ permissionError: true });
    await assert.rejects(copyClipboardFile(png(), { env: state.env }), { name: 'NotAllowedError' });
    assert.equal(state.writes.length, 1);
    assert.equal(state.texts.length, 0);
});
test('a PNG with huge declared dimensions is rejected before creating an image decoder or canvas', async () => {
    const state = environment();
    const bytes = Buffer.from(pngBytes); bytes.writeUInt32BE(65535, 16);
    await assert.rejects(normalizeImageToPng(new Blob([bytes], { type: 'image/png' }), { env: state.env }), /大きすぎ/);
    assert.equal(state.events.length, 0);
    assert.equal(state.revoked.length, 0);
});
test('text files are copied as plain text, while binary fallback explicitly copies only the name', async () => {
    const state = environment();
    assert.equal(await copyClipboardFile(new Blob(['<script>not executed</script>'], { type: 'text/html' }), { env: state.env }), 'text');
    assert.ok(state.writes[0][0].data['text/plain']);
    assert.equal(await copyClipboardFile(new Blob([new Uint8Array([0, 1])]), { name: 'file.zip', env: state.env }), 'filename');
    assert.deepEqual(state.texts, ['file.zip']);
});
