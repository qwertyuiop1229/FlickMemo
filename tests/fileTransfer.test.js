import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import { webcrypto } from 'node:crypto';

async function setup() {
    const listeners = new Set();
    const writes = [];
    const api = {
        getDatabase() {}, ref: (_, path) => path,
        set: async (...args) => writes.push(args), push: async () => {},
        remove: async path => writes.push([path, null]), get: async () => {}, off() {},
        onValue: path => { const entry = { path }; listeners.add(entry); return () => listeners.delete(entry); },
        onDisconnect: () => ({ remove: async () => {} })
    };
    const context = vm.createContext({ crypto: webcrypto, window: { crypto: webcrypto },
        localStorage: { getItem: () => 'dev_test', setItem() {} }, navigator: { userAgent: 'Windows Test' },
        Blob, ArrayBuffer, Uint8Array, TextEncoder, console, setTimeout, clearTimeout, setInterval, clearInterval });
    const module = new vm.SourceTextModule(await fs.readFile(new URL('../fileTransfer.js', import.meta.url), 'utf8'), { context });
    await module.link(() => new vm.SyntheticModule(Object.keys(api), function () {
        for (const [key, value] of Object.entries(api)) this.setExport(key, value);
    }, { context }));
    await module.evaluate();
    const files = [], statuses = [];
    const auth = { currentUser: { uid: 'alice' } };
    const manager = new module.namespace.FileTransferManager(auth, {}, (...status) => statuses.push(status), (...file) => files.push(file));
    manager.deviceId = 'dev_test';
    const channel = { readyState: 'open', send() {}, close() { this.closed = true; } };
    manager.dataChannel = channel;
    manager.setupDataChannelHandlers(channel);
    const send = async data => { channel.onmessage?.({ data }); await manager._receiveChain; };
    return { manager, channel, files, statuses, send, auth, writes, listeners, context, limit: module.namespace.MAX_RECEIVE_BYTES };
}

test('receives files and zero-byte files in order, releasing chunk buffers', async () => {
    const { manager, files, send } = await setup();
    await send(JSON.stringify({ type: 'file_header', name: 'test.txt', size: 3, encrypted: false }));
    await send(new Uint8Array([1, 2, 3]).buffer);
    await send(JSON.stringify({ type: 'file_end' }));
    assert.equal(files[0][0].size, 3);
    assert.equal(manager.receiveBuffer.length, 0);
    await send(JSON.stringify({ type: 'file_header', name: 'empty.txt', size: 0, encrypted: false }));
    await send(JSON.stringify({ type: 'file_end' }));
    assert.equal(files[1][0].size, 0);
});
test('rejects oversized files, size mismatches, binary without header and malformed controls', async () => {
    for (const scenario of ['oversized', 'truncated', 'overflow', 'unexpected', 'malformed']) {
        const { manager, channel, files, send, limit } = await setup();
        if (scenario === 'oversized') await send(JSON.stringify({ type: 'file_header', name: 'x', size: limit + 1, encrypted: false }));
        if (scenario === 'malformed') await send('{');
        if (scenario === 'unexpected') await send(new Uint8Array([1]).buffer);
        if (scenario === 'truncated' || scenario === 'overflow') {
            await send(JSON.stringify({ type: 'file_header', name: 'x', size: 2, encrypted: false }));
            await send(scenario === 'truncated' ? JSON.stringify({ type: 'file_end' }) : new Uint8Array(3).buffer);
        }
        assert.equal(channel.closed, true, scenario);
        assert.equal(files.length, 0);
        assert.equal(manager.receiveBuffer.length, 0);
    }
});
test('wrong keys and corrupted ciphertext fail closed without delivering a file', async () => {
    const { manager, files, send } = await setup();
    manager.setCustomEncryptionKey('a'.repeat(64));
    const encrypted = await manager.encryptChunk(new Uint8Array([1, 2, 3]).buffer);
    assert.deepEqual([...new Uint8Array(await manager.decryptChunk(encrypted))], [1, 2, 3]);
    manager.setCustomEncryptionKey('b'.repeat(64));
    await assert.rejects(manager.decryptChunk(encrypted));
    await send(JSON.stringify({ type: 'file_header', name: 'x', size: 3, encrypted: true }));
    await send(encrypted);
    assert.equal(files.length, 0);
    assert.equal(manager.receiveBuffer.length, 0);
});
test('share signaling is authenticated, canonicalized, fresh and rejects forged keys', async () => {
    const { manager } = await setup();
    manager.setCustomEncryptionKey('a'.repeat(64));
    const path = 'public_rooms/rm_' + 'a'.repeat(32);
    const signed = await manager.signRoomData({ timestamp: Date.now(), offer: 'sdp', fromDeviceId: 'dev_test' }, path);
    const reordered = Object.fromEntries(Object.entries(signed).reverse());
    assert.equal(await manager.verifyRoomData(reordered, path), true);
    assert.equal(await manager.verifyRoomData({ ...signed, offer: 'attacker' }, path), false);
    assert.equal(await manager.verifyRoomData({ ...signed, timestamp: Date.now() - 400000 }, path), false);
    manager.setCustomEncryptionKey('b'.repeat(64));
    assert.equal(await manager.verifyRoomData(signed, path), false);
});
test('presence is idempotent and removes old UID listeners and records on account switches', async () => {
    const { manager, listeners, auth, writes } = await setup();
    try {
        manager.startDevicePresence();
        manager.startDevicePresence();
        assert.equal(listeners.size, 2);
        auth.currentUser = { uid: 'bob' };
        manager.startDevicePresence();
        assert.equal(listeners.size, 2);
        assert.equal(writes.some(([path, value]) => path === 'users/alice/devices/dev_test' && value === null), true);
        manager.stopDevicePresence();
        assert.equal(listeners.size, 0);
        assert.equal(manager.heartbeatTimer, null);
    } finally { manager.stopDevicePresence(); }
});
test('receive queue limit aborts a fast sender before memory can grow without bound', async () => {
    const { manager, channel } = await setup();
    for (let i = 0; i < 70 && !channel.closed; i++) channel.onmessage({ data: new ArrayBuffer(65536) });
    await manager._receiveChain;
    assert.equal(channel.closed, true);
    assert.equal(manager._queuedReceiveBytes, 0);
});

test('tiny and zero-byte chunks cannot exhaust memory with millions of buffer objects', async () => {
    for (const size of [0, 1]) {
        const { send, channel, manager } = await setup();
        await send(JSON.stringify({ type: 'file_header', name: 'x', size: 100, encrypted: false }));
        await send(new ArrayBuffer(size));
        assert.equal(channel.closed, true);
        assert.equal(manager.receiveBuffer.length, 0);
    }
});

test('separate tabs never share a signaling or presence identity', async () => {
    const { manager } = await setup();
    const a = new manager.constructor({}, {}, () => {});
    const b = new manager.constructor({}, {}, () => {});
    assert.notEqual(a.deviceId, b.deviceId);
    assert.match(a.deviceId, /^dev_[a-f0-9]{32}$/);
});

test('an old connection attempt cannot resume against a newly selected peer', async () => {
    const { manager, writes } = await setup();
    let resolveFirst;
    const peers = [];
    manager.createPeerConnection = () => {
        manager.cleanupPeerConnection();
        const index = peers.length;
        const pc = {
            local: [], close() {},
            createDataChannel: () => ({ close() {} }),
            createOffer: () => index === 0 ? new Promise(resolve => { resolveFirst = resolve; }) : Promise.resolve({ type: 'offer', sdp: 'new' }),
            setLocalDescription: async offer => pc.local.push(offer)
        };
        peers.push(pc);
        return pc;
    };
    const first = manager.connectToDevice('dev_first');
    await manager.connectToDevice('dev_second');
    resolveFirst({ type: 'offer', sdp: 'old' });
    await first;
    assert.equal(peers[0].local.length, 0);
    assert.equal(peers[1].local.length, 1);
    assert.equal(writes.some(([path]) => path.endsWith('/signaling/dev_first')), false);
    manager.cleanupPeerConnection();
});

test('switching the destination mid-send cannot send a file chunk to the new peer', async () => {
    const { manager, channel } = await setup();
    manager.isE2EEEnabled = false;
    const leaked = [];
    const nextChannel = { readyState: 'open', send: data => leaked.push(data) };
    await assert.rejects(manager.sendFileP2P({ name: 'private.txt', size: 3, type: 'text/plain',
        slice: () => ({ arrayBuffer: async () => { manager.dataChannel = nextChannel; return new Uint8Array([1, 2, 3]).buffer; } })
    }));
    assert.equal(leaked.length, 0);
    manager.dataChannel = channel;
    manager.cleanupPeerConnection();
});

test('default encrypted sessions negotiate a fresh key and transfer real encrypted bytes', async () => {
    const a = await setup(), b = await setup();
    a.manager._isInitiator = true;
    a.channel.send = data => b.channel.onmessage({ data });
    b.channel.send = data => a.channel.onmessage({ data });
    a.channel.onopen();
    await b.manager._receiveChain;
    await a.manager._receiveChain;
    assert.equal(a.manager._sessionKey, b.manager._sessionKey);
    assert.equal(a.statuses.some(([status]) => status === 'channel_open'), true);
    assert.equal(b.statuses.some(([status]) => status === 'channel_open'), true);
    const blob = new Blob([new Uint8Array([1, 2, 3])], { type: 'application/octet-stream' });
    await a.manager.sendFileP2P({ name: 'bytes.bin', size: blob.size, type: blob.type, slice: (...args) => blob.slice(...args) });
    await b.manager._receiveChain;
    assert.equal(b.files.length, 1);
    assert.deepEqual([...new Uint8Array(await b.files[0][0].arrayBuffer())], [1, 2, 3]);
    a.manager.cleanupPeerConnection(); b.manager.cleanupPeerConnection();
});
