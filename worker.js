import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, remove, get, update, onValue, off } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

let db = null;
let currentUid = null;
let currentDbRef = null; // ★ 通信回線の接続状態を管理

self.onmessage = e => {
    const { type, config, uid, note, id } = e.data;

    if (type === 'INIT_FIREBASE') {
        try {
            const app = initializeApp(config);
            db = getDatabase(app);
        } catch (err) {
            console.error("Worker Firebase Init Error:", err);
        }
    }

    if (type === 'SET_USER') {
        // ★ 以前のアカウントの通信回線が残っていれば強制切断して混線を防ぐ！
        if (currentDbRef) {
            off(currentDbRef);
        }

        currentUid = uid;
        if (!db) return;

        currentDbRef = ref(db, `users/${uid}/notes`);

        // 新しいアカウント専用の通信を開始
        onValue(currentDbRef, snapshot => {
            const notes = snapshot.val();
            self.postMessage({ type: 'SYNC_NOTES', notes });
        }, error => {
            console.error("Sync Error:", error);
        });
    }

    if (type === 'CLEAR_USER') {
        // ★ ログアウト時に通信回線を完全に強制切断！
        if (currentDbRef) {
            off(currentDbRef);
            currentDbRef = null;
        }
        currentUid = null;
    }

    if (type === 'SAVE_NOTE' && currentUid && note) {
        if (!db) return;
        const noteRef = ref(db, `users/${currentUid}/notes/${note.id}`);
        set(noteRef, note);
    }

    if (type === 'PERMANENT_DELETE_NOTE' && currentUid && id) {
        if (!db) return;
        const noteRef = ref(db, `users/${currentUid}/notes/${id}`);
        remove(noteRef);
    }

    if (type === 'CLEAR_ALL_TRASH' && currentUid) {
        if (!db) return;
        const notesRef = ref(db, `users/${currentUid}/notes`);
        get(notesRef).then(snapshot => {
            const data = snapshot.val();
            if (data) {
                const updates = {};
                Object.keys(data).forEach(key => {
                    if (data[key].deletedAt) {
                        updates[key] = null;
                    }
                });
                update(notesRef, updates);
            }
        }).catch(err => console.error("Clear trash error:", err));
    }
};