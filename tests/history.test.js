import test from 'node:test';
import assert from 'node:assert/strict';
import { AUTH_ORIGIN, desktopAuthRequestFromUrl } from '../authProtocol.js';
import { validHistoryEntry, visibleHistory, selectionPayload, validSelection, IMAGE_PLACEHOLDER } from '../history/model.js';
import { WriteBarrier } from '../platform/writeBarrier.js';

const now = Date.now();
const entry = { id: 'a'.repeat(32), kind: 'text', text: '<script>do not execute</script>日本語',
    createdAt: now - 100, updatedAt: now, expiresAt: now + 1000, pinned: false, count: 1,
    deletedAt: 0, originDeviceId: 'b'.repeat(32) };
test('desktop authentication accepts only bounded fresh loopback ports and unique nonce parameters', () => {
    const url = `${AUTH_ORIGIN}/auth?desktop_port=49152&state=${'c'.repeat(64)}&created_at=${now}`;
    assert.deepEqual(desktopAuthRequestFromUrl(url, now), { port: 49152, state: 'c'.repeat(64), createdAt: now });
    for (const bad of [url.replace('49152', '80'), url.replace('49152', '65536'), url.replace('49152', 'evil.example'),
        url.replace(AUTH_ORIGIN, 'https://evil.example'), url + '&extension_id=' + 'a'.repeat(32), url + '&state=' + 'd'.repeat(64),
        url.replace('/auth?', '/index.html?')]) assert.equal(desktopAuthRequestFromUrl(bad, now), null);
    assert.equal(desktopAuthRequestFromUrl(url, now + 300_000), null);
    assert.equal(desktopAuthRequestFromUrl(url, now - 1), null);
});
test('remote clipboard data is validated, bounded and filtered before display', () => {
    assert.equal(validHistoryEntry(entry, now), true);
    assert.equal(validHistoryEntry({ ...entry, text: '😀'.repeat(16385) }, now), false);
    assert.equal(validHistoryEntry({ ...entry, kind: 'html' }, now), false);
    assert.equal(validHistoryEntry({ ...entry, id: '__proto__' }, now), false);
    assert.equal(validHistoryEntry({ ...entry, updatedAt: now + 60001 }, now), false);
    assert.equal(validHistoryEntry({ ...entry, kind: 'image_placeholder', text: 'data:image/png...' }, now), false);
    assert.match(IMAGE_PLACEHOLDER, /まだ実装されていません/);
    assert.deepEqual(visibleHistory([entry, { ...entry, deletedAt: now }, { ...entry, expiresAt: now - 1 }], now), [entry]);
    assert.equal(visibleHistory(Array.from({ length: 1000 }, () => entry), now).length, 50);
});
test('selection sharing has a strict byte limit and expires after thirty seconds', () => {
    const payload = selectionPayload('日本語😀', 'b'.repeat(32), now);
    assert.equal(validSelection(payload, now), true);
    assert.equal(validSelection(payload, now + 30_000), false);
    assert.equal(validSelection({ ...payload, expiresAt: now + 60_000 }, now), false);
    assert.throws(() => selectionPayload('😀'.repeat(1025), 'b'.repeat(32), now));
    assert.throws(() => selectionPayload(' ', 'b'.repeat(32), now));
});
test('WebView close waits for outstanding local transactions including writes added while waiting', async () => {
    const barrier = new WriteBarrier(); let release, releaseSecond; let drained = false;
    barrier.track('a', new Promise(resolve => { release = resolve; }));
    const draining = barrier.drain().then(() => { drained = true; });
    await Promise.resolve(); assert.equal(drained, false);
    barrier.track('b', new Promise(resolve => { releaseSecond = resolve; })); release();
    await new Promise(resolve => setImmediate(resolve)); assert.equal(drained, false);
    releaseSecond(); await draining; assert.equal(drained, true);
});
test('failed local writes prevent WebView destruction until the same item is successfully saved', async () => {
    const barrier = new WriteBarrier();
    await barrier.track('a', Promise.reject(new Error('disk full'))).catch(() => {});
    await assert.rejects(barrier.drain(), /画面を閉じません/);
    await barrier.track('b', Promise.resolve()); await assert.rejects(barrier.drain());
    await barrier.track('a', Promise.resolve()); await barrier.drain();
});
test('an old failed write cannot override a newer successful write for the same note', async () => {
    const barrier = new WriteBarrier(); let reject;
    const old = barrier.track('a', new Promise((_, fail) => { reject = fail; })).catch(() => {});
    await barrier.track('a', Promise.resolve()); reject(new Error('old failure')); await old;
    await barrier.drain();
});
