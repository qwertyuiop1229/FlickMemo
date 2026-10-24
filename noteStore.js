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
    async put(owner, note, pending = false) {
        // Snapshot now, before an account switch or subsequent edit can mutate it.
        const row = { owner, id: note.id, note: structuredClone(note), pending };
        return this.write(store => {
            const request = store.get([owner, note.id]);
            request.onsuccess = () => {
                const previous = request.result;
                const dirtyFields = new Set(previous?.pending
                    ? (previous.pendingFields || Object.keys(previous.note || {})) : []);
                if (pending) {
                    for (const key of new Set([...Object.keys(previous?.note || {}), ...Object.keys(row.note)])) {
                        if (JSON.stringify(previous?.note?.[key]) !== JSON.stringify(row.note[key])) dirtyFields.add(key);
                    }
                }
                store.put({ ...row, pendingFields: pending ? [...dirtyFields] : [] });
            };
        });
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
                if (!row?.note) return;
                if (!fields) {
                    if (JSON.stringify(row.note) === JSON.stringify(note)) {
                        acknowledged = true;
                        store.put({ ...row, pending: false, pendingFields: [] });
                    }
                    return;
                }
                const dirtyFields = new Set(row.pendingFields || Object.keys(row.note));
                for (const key of Object.keys(fields)) {
                    if (JSON.stringify(row.note[key]) === JSON.stringify(note[key])) dirtyFields.delete(key);
                }
                acknowledged = dirtyFields.size === 0;
                store.put({ ...row, pending: !acknowledged, pendingFields: [...dirtyFields] });
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
