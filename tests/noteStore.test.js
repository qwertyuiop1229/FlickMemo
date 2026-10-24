import test from 'node:test';
import assert from 'node:assert/strict';
import { IDBFactory } from 'fake-indexeddb';
import { NoteStore } from '../noteStore.js';

test('guest notes survive reopening without leaking across accounts', async () => {
    const factory = new IDBFactory();
    const store = new NoteStore(factory);
    await store.put('guest', { id: 'same', body: 'guest text' });
    await store.put('alice', { id: 'same', body: 'private A' });
    await store.put('bob', { id: 'same', body: 'private B' });
    const reopened = new NoteStore(factory);
    assert.deepEqual(await reopened.all('guest'), [{ id: 'same', body: 'guest text' }]);
    assert.deepEqual(await reopened.all('alice'), [{ id: 'same', body: 'private A' }]);
    await store.delete('alice', 'same');
    assert.deepEqual(await reopened.all('alice'), []);
    assert.deepEqual(await reopened.all('bob'), [{ id: 'same', body: 'private B' }]);
});
test('pending offline edits stay dirty until the matching write is acknowledged', async () => {
    const store = new NoteStore(new IDBFactory());
    const note = { id: 'n', body: 'first', updatedAt: 1 };
    const pending = store.put('alice', note, true);
    note.body = 'second';
    await pending;
    assert.equal((await store.all('alice'))[0].body, 'first');
    await store.put('alice', note, true);
    await store.acknowledge('alice', { id: 'n', body: 'first', updatedAt: 1 });
    assert.equal((await store.entries('alice'))[0].pending, true);
    await store.acknowledge('alice', note);
    assert.equal((await store.entries('alice'))[0].pending, false);
});
test('upgrading retains legacy unscoped records without assigning them to another account', async () => {
    const factory = new IDBFactory();
    const legacy = await new Promise(resolve => {
        const request = factory.open('FlickMemoDB', 1);
        request.onupgradeneeded = () => request.result.createObjectStore('notes', { keyPath: 'id' });
        request.onsuccess = () => resolve(request.result);
    });
    await new Promise(resolve => {
        const tx = legacy.transaction('notes', 'readwrite');
        tx.objectStore('notes').put({ id: 'private', body: 'legacy' });
        tx.oncomplete = resolve;
    });
    legacy.close();
    const store = new NoteStore(factory);
    assert.deepEqual(await store.all('guest'), []);
    const db = await store.ready;
    const legacyRecord = await new Promise(resolve => {
        const request = db.transaction('notes').objectStore('notes').get('private');
        request.onsuccess = () => resolve(request.result);
    });
    assert.equal(legacyRecord.body, 'legacy');
});

test('offline deletions remain durable tombstones without reappearing in the note list', async () => {
    const factory = new IDBFactory();
    const store = new NoteStore(factory);
    await store.put('alice', { id: 'n', body: 'delete me' });
    await store.delete('alice', 'n', true);
    const reopened = new NoteStore(factory);
    assert.deepEqual(await reopened.all('alice'), []);
    assert.equal((await reopened.entries('alice'))[0].pending, true);
    assert.equal((await reopened.entries('alice'))[0].note, null);
    await reopened.delete('alice', 'n');
    assert.deepEqual(await reopened.entries('alice'), []);
});

test('acknowledging a pin update cannot mark an unsent body edit as synced', async () => {
    const store = new NoteStore(new IDBFactory());
    const original = { id: 'n', body: 'original', title: '', pinned: false, updatedAt: 1 };
    await store.put('alice', original);
    const edited = { ...original, body: 'unsent edit', updatedAt: 2 };
    await store.put('alice', edited, true);
    const pinned = { ...edited, pinned: true, updatedAt: 3 };
    await store.put('alice', pinned, true);
    assert.equal(await store.acknowledge('alice', pinned, { pinned: true, updatedAt: 3 }), false);
    assert.equal((await store.entries('alice'))[0].pending, true);
    assert.equal(await store.acknowledge('alice', pinned, { body: pinned.body, title: '', pinned: true, updatedAt: 3 }), true);
    assert.equal((await store.entries('alice'))[0].pending, false);
});
