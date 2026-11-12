// RTDB removes null/empty children and returns object keys in its own order.
// Compare those values without serializing (and duplicating) large memo bodies.
function absent(value) {
    return value == null || (typeof value === 'object' && Object.keys(value).every(key => absent(value[key])));
}
export function sameValue(a, b) {
    if (a === b) return true;
    const emptyA = absent(a), emptyB = absent(b);
    if (emptyA || emptyB) return emptyA === emptyB;
    if (typeof a !== 'object' || typeof b !== 'object') return false;
    const keysA = Object.keys(a).filter(key => !absent(a[key]));
    const keysB = Object.keys(b).filter(key => !absent(b[key]));
    return keysA.length === keysB.length && keysA.every(key => Object.hasOwn(b, key) && sameValue(a[key], b[key]));
}
// Three-way field merge. A stale device must never replace an unseen remote edit.
export function reconcileNote(local, remote, base, fields = Object.keys(local || {})) {
    if (!remote || typeof remote !== 'object') return { note: remote, patch: null, conflict: local || null };
    const patch = {}, conflicts = [];
    for (const key of fields) {
        if (['id', 'updatedAt', 'conflictOf', '__proto__', 'constructor', 'prototype'].includes(key)) continue;
        const value = local[key] ?? null;
        if (sameValue(value, remote[key] ?? null)) continue;
        if (base && sameValue(remote[key] ?? null, base[key] ?? null)) patch[key] = value;
        else conflicts.push(key);
    }
    if (conflicts.length) return { note: remote, patch: null, conflict: local };
    return { note: { ...remote, ...patch }, patch: Object.keys(patch).length ? patch : null, conflict: null };
}
