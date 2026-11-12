import test from 'node:test';
import assert from 'node:assert/strict';
import { IDBFactory } from 'fake-indexeddb';
import { NoteStore } from '../noteStore.js';
import { reconcileNote } from '../noteSync.js';

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

test('a saved draft advances the base without clearing newer typing or unrelated dirty fields', async () => {
    for (const full of [false, true]) {
        const store = new NoteStore(new IDBFactory());
        const original = {id:'n',body:'original',title:'original title',updatedAt:1};
        const sent = {...original,body:'first edit',updatedAt:2};
        const later = {...sent,body:'continued typing',title:'unsent title',updatedAt:3};
        await store.put('alice',original); await store.put('alice',sent,true); await store.put('alice',later,true);
        assert.equal(await store.acknowledge('alice',sent,full ? null : {body:sent.body,updatedAt:2}),false);
        const row=await store.get('alice','n');
        assert.equal(row.note.body,later.body); assert.equal(row.base.body,sent.body);
        assert.equal(row.base.title,original.title); assert.equal(row.pending,true);
        const merged=reconcileNote(row.note,sent,row.base,row.pendingFields);
        assert.equal(merged.conflict,null); assert.equal(merged.note.body,later.body);
    }
});

test('local recoveries remain account-scoped and never become pending after edits or stale acknowledgements',async()=>{
 const factory=new IDBFactory(),store=new NoteStore(factory),note={id:'recovery',body:'valuable draft',conflictOf:'original'};
 await store.putRecovery('alice',note);await store.put('alice',{...note,body:'edited draft'},true);
 assert.equal((await store.get('alice',note.id)).pending,false);
 assert.equal(await store.acknowledge('alice',note),false);
 const reopened=new NoteStore(factory);assert.equal((await reopened.get('alice',note.id)).localRecovery,true);
 assert.equal((await reopened.get('alice',note.id)).note.body,'edited draft');assert.equal(await reopened.get('bob',note.id),undefined);
});

test('a remote cache refresh cannot discard an unobserved pending draft and recovery preserves its newest contents',async()=>{
 const factory=new IDBFactory(),first=new NoteStore(factory),other=new NoteStore(factory);
 const original={id:'memo',body:'base'},newer={...original,body:'newer unsent text'};
 await first.put('alice',original,false);await other.put('alice',newer,true);
 assert.equal(await first.put('alice',{...original,body:'remote text'},false,original),true);
 assert.equal((await other.get('alice','memo')).note.body,newer.body);
 const stored=await first.putRecovery('alice',{...original,conflictOf:'original'});
 assert.equal(stored.body,newer.body);assert.equal((await other.get('alice','memo')).localRecovery,true);
});

test('another tab cannot replace or delete a protected recovery through a stale remote cache',async()=>{
 const factory=new IDBFactory(),first=new NoteStore(factory),other=new NoteStore(factory);
 const original={id:'memo',body:'base'},recovery={...original,body:'protected draft',conflictOf:'memo'};
 await first.put('alice',original);await other.putRecovery('alice',recovery);
 await first.put('alice',{...original,body:'remote text'},false,original);
 await first.delete('alice',original.id);await first.delete('alice',original.id,true);
 assert.equal((await other.get('alice',original.id)).note.body,recovery.body);
 await other.put('alice',{...recovery,body:'explicit recovery edit'},false,undefined,true);
 assert.equal((await first.get('alice',original.id)).note.body,'explicit recovery edit');
 await other.delete('alice',original.id,false,true);
 assert.equal(await first.get('alice',original.id),undefined);
});
