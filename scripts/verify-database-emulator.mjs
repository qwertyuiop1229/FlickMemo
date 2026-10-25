import assert from 'node:assert/strict';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, signInAnonymously } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator, ref, set, get, update, query, orderByChild, limitToLast, goOffline } from 'firebase/database';
if (process.env.FIREBASE_DATABASE_EMULATOR_HOST !== '127.0.0.1:9000' || process.env.FIREBASE_AUTH_EMULATOR_HOST !== '127.0.0.1:9099') throw new Error('Only isolated local emulators may be used');
const apps = [];
async function client(name, login = true) {
    const app = initializeApp({ projectId: 'demo-flickmemo', apiKey: 'demo-key', databaseURL: 'https://demo-flickmemo-default-rtdb.firebaseio.com' }, name); apps.push(app);
    const auth = getAuth(app); connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    const db = getDatabase(app); connectDatabaseEmulator(db, '127.0.0.1', 9000);
    const uid = login ? (await signInAnonymously(auth)).user.uid : null;
    return { db, uid };
}
try {
    const a = await client('a'), b = await client('b'), guest = await client('guest', false);
    const base = `users/${a.uid}`;
    await set(ref(a.db, `${base}/notes/sentinel`), { text: 'Synthetic note preserved by history sync' });
    await assert.rejects(set(ref(b.db, `${base}/notes/wrong`), { text: 'denied' }));
    await assert.rejects(get(ref(b.db, `${base}/notes`)));
    await assert.rejects(get(ref(guest.db, `${base}/notes`)));
    const values = {};
    for (let n = 1; n <= 75; n++) values[`clipboardHistory/id${n}`] = { updatedAt: n, deletedAt: 0, text: `synthetic-${n}` };
    await update(ref(a.db, base), values);
    const deletions = {};
    for (let n = 26; n <= 75; n++) { deletions[`clipboardHistory/id${n}`] = null; deletions[`clipboardHistoryTombstones/id${n}`] = { deletedAt: 100 + n, revision: 100 + n }; }
    await update(ref(a.db, base), deletions);
    const remaining = (await get(query(ref(a.db, `${base}/clipboardHistory`), orderByChild('updatedAt'), limitToLast(50)))).val();
    assert.equal(Object.keys(remaining).length, 25);
    assert.equal(remaining.id25.text, 'synthetic-25');
    assert.equal((await get(ref(a.db, `${base}/notes/sentinel`))).val().text, 'Synthetic note preserved by history sync');
    await assert.rejects(get(ref(b.db, `${base}/clipboardHistory`)));
    await assert.rejects(update(ref(b.db, base), { 'clipboardHistory/id1': null, 'clipboardHistoryTombstones/id1': { deletedAt: 1 } }));
    assert.equal((await get(ref(a.db, `${base}/clipboardHistory/id1`))).val().text, 'synthetic-1');
    console.log('Database emulator: own-account CRUD, cross-account/guest rejection, atomic history deletion, newest-50 visibility, note preservation PASS');
} finally { for (const app of apps) { goOffline(getDatabase(app)); await deleteApp(app); } }
