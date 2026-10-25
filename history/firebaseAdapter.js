import { ref, query, orderByChild, limitToLast, onValue, set, remove, onDisconnect } from 'firebase/database';
import { visibleHistory, validSelection, selectionPayload } from './model.js';

// Narrow adapter: UI code never constructs Firebase paths or uploads images.
export function historyAdapter(db, auth, deviceId) {
    let activeUid = null;
    let expiryTimer = null;
    let generation=0, writes=Promise.resolve();
    const enqueue=fn=>{const task=writes.catch(()=>{}).then(fn);writes=task;return task;};
    const currentUid = () => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('Googleログインが必要です');
        return uid;
    };
    return {
        watchHistory(callback, error) {
            const uid = currentUid();
            return onValue(query(ref(db, `users/${uid}/clipboardHistory`), orderByChild('updatedAt'), limitToLast(50)), snapshot => {
                if (auth.currentUser?.uid === uid) callback(visibleHistory(Object.values(snapshot.val() || {})));
            }, error);
        },
        watchSelection(callback, error) {
            const uid = currentUid();
            return onValue(query(ref(db, `users/${uid}/liveSelection`), orderByChild('updatedAt'), limitToLast(10)), snapshot => {
                if (auth.currentUser?.uid === uid) callback(Object.values(snapshot.val() || {}).filter(value => validSelection(value) && value.deviceId !== deviceId));
            }, error);
        },
        shareSelection(text) {
            const uid = currentUid();
            const payload = selectionPayload(text, deviceId);
            const ticket=++generation;
            clearTimeout(expiryTimer);expiryTimer=null;activeUid=uid;
            const target = ref(db, `users/${uid}/liveSelection/${deviceId}`);
            return enqueue(async()=>{
                if(ticket!==generation || auth.currentUser?.uid!==uid)return;
                await onDisconnect(target).remove();
                if(ticket!==generation || auth.currentUser?.uid!==uid)return;
                if(payload.expiresAt<=Date.now())throw new Error('共有の有効期限が切れました。もう一度選択して共有してください');
                await set(target,payload);
                if(ticket!==generation || auth.currentUser?.uid!==uid){
                    if(auth.currentUser?.uid===uid)await remove(target);
                    return;
                }
                expiryTimer=setTimeout(()=>{if(ticket===generation)this.stopSelection().catch(()=>{});},Math.max(0,payload.expiresAt-Date.now()));
            });
        },
        stopSelection() {
            ++generation;
            clearTimeout(expiryTimer); expiryTimer = null;
            const uid = activeUid;
            activeUid = null;
            return enqueue(async()=>{if(uid && auth.currentUser?.uid===uid)await remove(ref(db,`users/${uid}/liveSelection/${deviceId}`));});
        }
    };
}
