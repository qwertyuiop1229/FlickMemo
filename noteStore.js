import { sameValue } from './noteSync.js';
// Each account and guest mode has an independent cache. Legacy unscoped data is
// kept intact rather than guessing which signed-in account owns it.
export class NoteStore {
    constructor(factory = indexedDB) {
        this.ready = new Promise((resolve, reject) => {
            const request = factory.open('FlickMemoDB', 2);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains('notes')) db.createObjectStore('notes', { keyPath: 'id' });
                if (!db.objectStoreNames.contains('accountNotes')) {
                    const store = db.createObjectStore('accountNotes', { keyPath: ['owner', 'id'] });
                    store.createIndex('owner', 'owner');
                }
            };
            request.onsuccess = () => {
                request.result.onversionchange = () => request.result.close();
                resolve(request.result);
            };
            request.onerror = () => reject(request.error);
            request.onblocked = () => reject(new Error('別のFlickMemoタブを閉じて再読み込みしてください'));
        });
    }
    async all(owner) {
        return (await this.entries(owner)).filter(row => row.note).map(row => row.note);
    }
    async entries(owner) {
        const db = await this.ready;
        return new Promise((resolve, reject) => {
            const request = db.transaction('accountNotes').objectStore('accountNotes').index('owner').getAll(owner);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    async put(owner, note, pending = false, expectedPending = undefined) {
        // Snapshot now, before an account switch or subsequent edit can mutate it.
        const row = { owner, id: note.id, note: structuredClone(note), pending };
        let effectivePending = false;
        return this.write(store => {
            const request = store.get([owner, note.id]);
            request.onsuccess = () => {
                const previous = request.result;
                if (!pending && previous?.pending && !sameValue(previous.note,row.note) && (expectedPending === undefined || !sameValue(previous.note,expectedPending))) {
                    effectivePending = true;
                    return;
                }
                const dirtyFields = new Set(previous?.pending
                    ? (previous.pendingFields || Object.keys(previous.note || {})) : []);
                if (pending) {
                    for (const key of new Set([...Object.keys(previous?.note || {}), ...Object.keys(row.note)])) {
                        if (!sameValue(previous?.note?.[key], row.note[key])) dirtyFields.add(key);
                    }
                }
                effectivePending = pending && !previous?.localRecovery && dirtyFields.size > 0;
                const base = previous?.pending ? previous.base : (previous?.note || null);
                store.put({ ...row, localRecovery: !!previous?.localRecovery, pending: effectivePending, base: effectivePending ? base : row.note, pendingFields: effectivePending ? [...dirtyFields] : [] });
            };
        }).then(() => effectivePending);
    }
    async get(owner, id) {
        const db = await this.ready;
        return new Promise((resolve, reject) => { const request = db.transaction('accountNotes').objectStore('accountNotes').get([owner, id]); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
    }
    async putRecovery(owner, note) {
        const snapshot = structuredClone(note);
        let stored = snapshot;
        await this.write(store => {
            const request=store.get([owner,snapshot.id]);
            request.onsuccess=()=>{
                if(request.result?.pending && request.result.note && !sameValue(request.result.note,snapshot)) stored={...request.result.note,conflictOf:snapshot.conflictOf};
                delete stored.deletedAt;
                store.put({owner,id:stored.id,note:stored,localRecovery:true,pending:false,pendingFields:[],base:null});
            };
        });
        return stored;
    }
    async delete(owner, id, pending = false) {
        return this.write(store => pending ? store.put({ owner, id, note: null, pending: true }) : store.delete([owner, id]));
    }
    async acknowledge(owner, note, fields = null) {
        let acknowledged = false;
        await this.write(store => {
            const request = store.get([owner, note.id]);
            request.onsuccess = () => {
                const row = request.result;
                if (!row?.note || row.localRecovery) return;
                const dirtyFields = new Set(row.pendingFields || Object.keys(row.note));
                const base = { ...(row.base || {}) };
                for (const key of Object.keys(fields || note)) {
                    // The server accepted this value even if typing has continued.
                    // Advance only sent fields, leaving unsent fields' bases intact.
                    if (note[key] === undefined) delete base[key]; else base[key] = structuredClone(note[key]);
                    if (sameValue(row.note[key], note[key])) dirtyFields.delete(key);
                }
                acknowledged = dirtyFields.size === 0;
                store.put({ ...row, pending: !acknowledged, pendingFields: [...dirtyFields], base });
            };
        });
        return acknowledged;
    }
    async write(operation) {
        const db = await this.ready;
        return new Promise((resolve, reject) => {
            const tx = db.transaction('accountNotes', 'readwrite');
            operation(tx.objectStore('accountNotes'));
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error || new Error('ローカル保存が中断されました'));
        });
    }
}
