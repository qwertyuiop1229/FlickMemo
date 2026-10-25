import { ref, query, orderByChild, limitToLast, onValue, set, remove, onDisconnect } from 'firebase/database';
import { visibleHistory, validSelection, selectionPayload } from './model.js';

// Narrow adapter: UI code never constructs Firebase paths or uploads images.
export function historyAdapter(db, auth, deviceId) {
    let activeUid = null;
    let expiryTimer = null;
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
        async shareSelection(text) {
            clearTimeout(expiryTimer);
            const uid = currentUid();
            const payload = selectionPayload(text, deviceId);
            const target = ref(db, `users/${uid}/liveSelection/${deviceId}`);
            await onDisconnect(target).remove();
            if (auth.currentUser?.uid !== uid) throw new Error('アカウントが変わったため共有を中止しました');
            activeUid = uid;
            await set(target, payload);
            expiryTimer = setTimeout(() => {
                if (activeUid === uid && auth.currentUser?.uid === uid) {
                    activeUid = null;
                    remove(target).catch(() => {});
                }
            }, 30_000);
        },
        async stopSelection() {
            clearTimeout(expiryTimer); expiryTimer = null;
            const uid = activeUid;
            activeUid = null;
            if (uid && auth.currentUser?.uid === uid) await remove(ref(db, `users/${uid}/liveSelection/${deviceId}`));
        }
    };
}
