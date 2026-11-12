import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import { webcrypto } from 'node:crypto';

async function setup({ ready = true, fastTimeouts = false, roomKey = null } = {}) {
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
        Blob, ArrayBuffer, Uint8Array, TextEncoder, queueMicrotask, console,
        setTimeout: (callback, delay) => setTimeout(callback, fastTimeouts ? Math.min(delay, 100) : delay),
        clearTimeout, setInterval, clearInterval });
    const module = new vm.SourceTextModule(await fs.readFile(new URL('../fileTransfer.js', import.meta.url), 'utf8'), { context });
    await module.link(() => new vm.SyntheticModule(Object.keys(api), function () {
        for (const [key, value] of Object.entries(api)) this.setExport(key, value);
    }, { context }));
    await module.evaluate();
    const files = [], statuses = [];
    const auth = { currentUser: { uid: 'alice' } };
    const manager = new module.namespace.FileTransferManager(auth, {}, (...status) => statuses.push(status), (...file) => files.push(file));
    manager.deviceId = 'dev_test';
    if (roomKey) manager.setCustomEncryptionKey(roomKey);
    const channel = { readyState: 'connecting', send() {}, close() { this.closed = true; } };
    manager.dataChannel = channel;
    manager.setupDataChannelHandlers(channel);
    channel.readyState = 'open';
    if (ready) { manager._protocolReady = true; manager._readyPromise = Promise.resolve(); manager.isE2EEEnabled = false; }
    const send = async data => {
        if (typeof data === 'string') { const meta = JSON.parse(data === '{' ? 'null' : data);
            if (meta && ['file_header','file_end'].includes(meta.type)) data = JSON.stringify({ id: 'a'.repeat(32), chunkSize: 32768, ...meta });
        }
        channel.onmessage?.({ data }); await manager._receiveChain;
    };
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
    const a = await setup({ ready: false }), b = await setup({ ready: false });
    a.manager._isInitiator = true;
    a.channel.send = data => b.channel.onmessage({ data });
    b.channel.send = data => a.channel.onmessage({ data });
    a.channel.onopen(); b.channel.onopen();
    await Promise.all([a.manager._readyPromise, b.manager._readyPromise]);
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

async function pair({ room = false, wrongKey = false, slow = false, fastTimeouts = false, dropComplete = false, smallMessages = false } = {}) {
    const a = await setup({ ready: false, fastTimeouts, roomKey: room ? 'a'.repeat(64) : null });
    const b = await setup({ ready: false, fastTimeouts, roomKey: room ? (wrongKey ? 'b' : 'a').repeat(64) : null });
    if (smallMessages) { a.manager.peerConnection = { sctp: { maxMessageSize: 16384 }, getStats: async () => new Map(), close() {} }; }
    a.manager._isInitiator = true;
    a.channel.send = data => b.channel.onmessage?.({ data });
    b.channel.send = data => {
        if (dropComplete && typeof data === 'string' && JSON.parse(data).type === 'file_received') return;
        a.channel.onmessage?.({ data });
    };
    if (slow) {
        const decrypt = b.manager.decryptChunk.bind(b.manager);
        b.manager.decryptChunk = async (...args) => {
            await new Promise(resolve => setTimeout(resolve, 2));
            return decrypt(...args);
        };
    }
    a.channel.onopen(); b.channel.onopen();
    return { a, b,
        ready: Promise.all([a.manager._readyPromise, b.manager._readyPromise]),
        close() { a.manager.cleanupPeerConnection(); b.manager.cleanupPeerConnection(); } };
}
const asFile = (blob, name = 'test.bin') => ({ name, size: blob.size, type: blob.type, slice: (...args) => blob.slice(...args) });

test('shared-link key confirmation succeeds and mixed keys fail before any file bytes are sent', async () => {
    const good = await pair({ room: true });
    try { await good.ready; assert.equal(good.a.manager.isReady, true); }
    finally { good.close(); }
    const bad = await pair({ room: true, wrongKey: true });
    try {
        await assert.rejects(bad.ready, /暗号鍵/);
        assert.equal(bad.a.files.length + bad.b.files.length, 0);
    } finally { bad.close(); }
});
test('old clients that ignore the handshake receive no file chunks and get an update error', async () => {
    const { manager, channel } = await setup({ ready: false, fastTimeouts: true });
    const messages = [];
    channel.send = data => messages.push(data);
    channel.onopen();
    try {
        await assert.rejects(manager.sendFileP2P(asFile(new Blob(['secret']))), /最新版|Chrome拡張/);
        assert.equal(messages.some(message => typeof message !== 'string'), false);
        assert.equal(messages.some(message => JSON.parse(message).type === 'file_header'), false);
    } finally { manager.cleanupPeerConnection(); }
});
test('receiver-confirmed completion handles 0, 1, boundary and multi-chunk sizes with exact bytes', async () => {
    const peers = await pair();
    try {
        await peers.ready;
        for (const size of [0, 1, 32767, 32768, 32769, 262145]) {
            const bytes = Uint8Array.from({ length: size }, (_, index) => index % 251);
            await peers.a.manager.sendFileP2P(asFile(new Blob([bytes])));
            const received = peers.b.files.at(-1)[0];
            assert.deepEqual(new Uint8Array(await received.arrayBuffer()), bytes);
        }
        assert.equal(peers.b.manager.receiveBuffer.length, 0);
    } finally { peers.close(); }
});
test('slow iPad-like decryption stays within the receive queue limit using application credits', async () => {
    const peers = await pair({ slow: true });
    try {
        await peers.ready;
        const blob = new Blob([new Uint8Array(2 * 1024 * 1024)]);
        await peers.a.manager.sendFileP2P(asFile(blob));
        assert.equal(peers.b.files[0][0].size, blob.size);
        assert.equal(peers.b.channel.closed, undefined);
    } finally { peers.close(); }
});
test('no receive ACK means send failure, never a false successful result', async () => {
    const peers = await pair({ fastTimeouts: true, dropComplete: true });
    try {
        await peers.ready;
        await assert.rejects(peers.a.manager.sendFileP2P(asFile(new Blob(['data']))), /受信確認/);
    } finally { peers.close(); }
});
test('encryption toggle changes cannot turn a file into a mix of ciphertext and plaintext', async () => {
    const peers = await pair();
    try {
        await peers.ready;
        const encrypt = peers.a.manager.encryptChunk.bind(peers.a.manager);
        peers.a.manager.encryptChunk = (...args) => {
            peers.a.manager.isE2EEEnabled = false;
            return encrypt(...args);
        };
        const blob = new Blob([new Uint8Array(100000)]);
        await peers.a.manager.sendFileP2P(asFile(blob));
        assert.equal(peers.b.files[0][0].size, 100000);
    } finally { peers.close(); }
});
test('ciphertext cannot be replayed under another transfer ID or chunk offset', async () => {
    const { manager } = await setup();
    manager.setCustomEncryptionKey('a'.repeat(64));
    const encrypted = await manager.encryptChunk(new Uint8Array([1, 2, 3]), 'first:0');
    await assert.rejects(manager.decryptChunk(encrypted, 'other:0'));
    await assert.rejects(manager.decryptChunk(encrypted, 'first:32768'));
    manager.cleanupPeerConnection();
});

test('corrupted encrypted bytes fail the sender and never become a received file', async () => {
    const peers = await pair();
    try {
        await peers.ready;
        const send = peers.a.channel.send;
        let changed = false;
        peers.a.channel.send = data => {
            if (data instanceof ArrayBuffer && !changed) {
                changed = true; data = data.slice(0); new Uint8Array(data)[20] ^= 1;
            }
            send(data);
        };
        await assert.rejects(peers.a.manager.sendFileP2P(asFile(new Blob(['image bytes']))), /復号|切断|接続/);
        assert.equal(peers.b.files.length, 0);
        assert.equal(peers.b.manager.receiveBuffer.length, 0);
    } finally { peers.close(); }
});

test('small SCTP limits are negotiated without exceeding the peer message size', async () => {
    const peers = await pair({ smallMessages: true });
    try {
        await peers.ready;
        assert.equal(peers.a.manager._chunkSize, 16384 - 28);
        assert.equal(peers.b.manager._chunkSize, 16384 - 28);
        const send = peers.a.channel.send;
        peers.a.channel.send = data => {
            if (data instanceof ArrayBuffer) assert.ok(data.byteLength <= 16384);
            send(data);
        };
        const bytes = Uint8Array.from({ length: 100000 }, (_, i) => i % 251);
        await peers.a.manager.sendFileP2P(asFile(new Blob([bytes])));
        assert.deepEqual(new Uint8Array(await peers.b.files[0][0].arrayBuffer()), bytes);
    } finally { peers.close(); }
});


test('80MiB virtual source streams with bounded reads and no aggregate receive buffer',async()=>{const peers=await pair({});let bytes=0,maxRead=0,closed=false;try{await peers.ready;peers.b.manager.setReceiveSinkFactory(async()=>({write:async chunk=>{assert.ok(chunk.byteLength<=32768);assert.equal(peers.b.manager.receiveBuffer.length,0);bytes+=chunk.byteLength;if(bytes%1048576===0)await new Promise(r=>setImmediate(r))},close:async()=>{closed=true;return{saved:true,size:bytes}},abort:async()=>{}}));await peers.a.manager._receiveChain;const file={name:'virtual-80MiB.bin',size:80*1024*1024,type:'application/octet-stream',slice(start,end){const length=Math.min(end,this.size)-start;maxRead=Math.max(maxRead,length);return{arrayBuffer:async()=>new Uint8Array(length).buffer}}};await peers.a.manager.sendFileP2P(file);assert.equal(bytes,file.size);assert.equal(closed,true);assert.ok(maxRead<=32768);assert.equal(peers.b.files[0][0].saved,true)}finally{peers.close()}});
test('disk failure aborts partial output and never acknowledges completed receipt',async()=>{const peers=await pair({});let aborted=0;try{await peers.ready;peers.b.manager.setReceiveSinkFactory(async()=>({write:async()=>{throw Error('disk full')},close:async()=>{throw Error('must not close')},abort:async()=>{aborted++}}));await peers.a.manager._receiveChain;await assert.rejects(peers.a.manager.sendFileP2P(asFile(new Blob(['bytes']))));await new Promise(r=>setImmediate(r));assert.equal(aborted,1);assert.equal(peers.b.files.length,0)}finally{peers.close()}});
test('disconnect during async destination creation aborts the late sink',async()=>{const f=await setup();let release,aborted=0;f.manager.receiveSinkFactory=()=>new Promise(r=>release=r);f.channel.onmessage({data:JSON.stringify({type:'file_header',id:'a'.repeat(32),name:'late.bin',size:1,encrypted:false,chunkSize:32768})});await new Promise(r=>setImmediate(r));f.manager.cleanupPeerConnection();release({abort:async()=>{aborted++}});await f.manager._receiveChain;assert.equal(aborted,1);assert.equal(f.files.length,0)});

test('native DataChannel buffering also gates source reads independently of receiver credits',async()=>{
 const peers=await pair({});let reads=0;
 try{await peers.ready;peers.a.channel.bufferedAmount=1048576;
 const file={name:'bounded.bin',size:3,type:'application/octet-stream',slice(){reads++;return{arrayBuffer:async()=>new Uint8Array([1,2,3]).buffer}}};
 const sending=peers.a.manager.sendFileP2P(file);await new Promise(r=>setTimeout(r,20));assert.equal(reads,0);
 peers.a.channel.bufferedAmount=0;peers.a.channel.onbufferedamountlow({});await sending;assert.equal(reads,1);assert.equal(peers.b.files[0][0].size,3);
 }finally{peers.close()}
});

test('cancelling a stalled file read promptly rejects and never sends its late result',async()=>{
 const peers=await pair({});let release,started;const began=new Promise(resolve=>started=resolve);
 try{await peers.ready;const file={name:'slow.bin',size:3,type:'application/octet-stream',slice(){started();return{arrayBuffer:()=>new Promise(resolve=>release=resolve)}}};
 const sending=peers.a.manager.sendFileP2P(file);await began;peers.a.manager.cleanupPeerConnection(new Error('cancelled'));
 await assert.rejects(sending,/cancelled|切断|接続/);release(new Uint8Array([1,2,3]).buffer);await new Promise(r=>setImmediate(r));assert.equal(peers.b.files.length,0);assert.equal(peers.a.manager.isSending,false);
 }finally{release?.(new ArrayBuffer(3));peers.close()}
});

test('a 40GiB advertised source starts and cancels with 32KiB reads without allocating the file size',async()=>{
 const peers=await pair({});let reads=0,maxRead=0,release,started,aborted=0;const began=new Promise(resolve=>started=resolve);
 try{await peers.ready;peers.b.manager.setReceiveSinkFactory(async()=>({write:async()=>{},close:async()=>{},abort:async()=>{aborted++}}));await peers.a.manager._receiveChain;
 const file={name:'40GiB.bin',size:40*1024**3,type:'application/octet-stream',slice(start,end){reads++;maxRead=Math.max(maxRead,end-start);return{arrayBuffer:()=>{if(reads===1)return Promise.resolve(new ArrayBuffer(end-start));started();return new Promise(resolve=>release=resolve)}}}};
 const sending=peers.a.manager.sendFileP2P(file);await began;peers.a.manager.cleanupPeerConnection(new Error('cancelled'));await assert.rejects(sending);release(new ArrayBuffer(maxRead));await new Promise(r=>setImmediate(r));assert.ok(maxRead<=32768);assert.equal(peers.b.files.length,0);assert.ok(aborted<=1);
 }finally{release?.(new ArrayBuffer(maxRead));peers.close()}
});
