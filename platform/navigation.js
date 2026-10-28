// Bounded in-app locations only: no memo contents, browser URLs or cross-account state.
export function createNavigation({ initial, valid = () => true, apply, changed = () => {}, limit = 100 }) {
    let entries = [initial], cursor = 0, restoring = false;
    const same = (a, b) => a.tab === b.tab && a.noteId === b.noteId && a.editor === b.editor;
    function target(direction) { for (let i = cursor + direction; i >= 0 && i < entries.length; i += direction) if (valid(entries[i])) return i; return -1; }
    function refresh() { changed({ back: target(-1) >= 0, forward: target(1) >= 0 }); }
    return {
        record(location) {
            if (restoring || same(entries[cursor], location)) { refresh(); return; }
            entries = entries.slice(0, cursor + 1); entries.push(location);
            if (entries.length > limit) entries.shift(); cursor = entries.length - 1; refresh();
        },
        move(direction) {
            if (direction !== -1 && direction !== 1) return;
            const next = target(direction); if (next < 0) return;
            restoring = true;
            try { apply(entries[next]); cursor = next; } finally { restoring = false; refresh(); }
        },
        reset(location = initial) { entries = [location]; cursor = 0; refresh(); },
        refresh
    };
}
