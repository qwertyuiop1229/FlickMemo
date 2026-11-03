import { reconcileNote } from '../noteSync.js';
import assert from 'node:assert/strict';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, signInAnonymously } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator, ref, set, get, update, query, orderByChild, limitToLast, goOffline, runTransaction, onValue } from 'firebase/database';
if (process.env.FIREBASE_DATABASE_EMULATOR_HOST !== '127.0.0.1:9000' || process.env.FIREBASE_AUTH_EMULATOR_HOST !== '127.0.0.1:9099') throw new Error('Only isolated local emulators may be used');
const apps = [];
let exitCode = 0;
const watchdog = setTimeout(() => { console.error('Database emulator verification timed out'); process.exit(1); }, 90_000);
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
    const notePath = ref(a.db, `${base}/notes/merge-test`);
    const original = { id:'merge-test', body:'base', title:'memo', folderId:'', updatedAt:1 };
    await set(notePath, original);
    await update(notePath,{body:'PWA latest',updatedAt:2});
    const local = {...original,folderId:'folder_work',updatedAt:3};
    let unwatch;
    await new Promise((resolve,reject)=>{unwatch=onValue(notePath,()=>resolve(),reject);});
    const transaction = await runTransaction(notePath, remote => {
        const result = reconcileNote(local,remote,original,['folderId']);
        return result.conflict ? undefined : result.note;
    },{applyLocally:false});
    assert.equal(transaction.committed,true);assert.equal(transaction.snapshot.val().body,'PWA latest');assert.equal(transaction.snapshot.val().folderId,'folder_work');
    const rejected = await runTransaction(notePath, remote => {
        const result = reconcileNote({...original,body:'stale offline Windows'},remote,original,['body']);
        return result.conflict ? undefined : result.note;
    },{applyLocally:false});
    assert.equal(rejected.committed,false);assert.equal((await get(notePath)).val().body,'PWA latest');
    unwatch();
    await set(ref(a.db, `${base}/folders/folder_work`),{id:'folder_work',name:'仕事',updatedAt:1});
    await assert.rejects(get(ref(b.db, `${base}/folders`)));
    console.log('Note transactions: independent folder/body merge, stale body rejection, folder account isolation PASS');
    console.log('Database emulator: own-account CRUD, cross-account/guest rejection, atomic history deletion, newest-50 visibility, note preservation PASS');
} catch (error) {
    exitCode = 1;
    console.error(error);
} finally {
    // Firebase Auth can retain sockets/timers in Node even after app deletion.
    // This is a one-shot CLI: bound cleanup and explicitly return the test result.
    await Promise.race([
        Promise.all(apps.map(async app => { goOffline(getDatabase(app)); await deleteApp(app); })),
        new Promise(resolve => setTimeout(resolve, 3000))
    ]).catch(error => { exitCode = 1; console.error(error); });
    clearTimeout(watchdog);
}
process.exit(exitCode);
