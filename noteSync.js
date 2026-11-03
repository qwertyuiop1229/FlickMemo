// Three-way field merge. A stale device must never replace an unseen remote edit.
export function reconcileNote(local, remote, base, fields = Object.keys(local || {})) {
    if (!remote || typeof remote !== 'object') return { note: remote, patch: null, conflict: local || null };
    const patch = {}, conflicts = [];
    for (const key of fields) {
        if (['id', 'updatedAt', 'conflictOf'].includes(key)) continue;
        const value = local[key] ?? null;
        if (JSON.stringify(value) === JSON.stringify(remote[key] ?? null)) continue;
        if (base && JSON.stringify(remote[key] ?? null) === JSON.stringify(base[key] ?? null)) patch[key] = value;
        else conflicts.push(key);
    }
    if (conflicts.length) return { note: remote, patch: null, conflict: local };
    return { note: { ...remote, ...patch }, patch: Object.keys(patch).length ? patch : null, conflict: null };
}
