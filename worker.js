import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, remove, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

let db = null;
let currentUid = null;

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
        currentUid = uid;
        if (!db) return;
        const dbRef = ref(db, `users/${uid}/notes`);
        onValue(dbRef, snapshot => {
            const notes = snapshot.val();
            self.postMessage({ type: 'SYNC_NOTES', notes });
        });
    }

    if (type === 'CLEAR_USER') {
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
};