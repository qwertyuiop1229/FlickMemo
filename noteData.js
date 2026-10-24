export function validNote(note, id = note?.id) {
    return !!note && typeof note === 'object' && typeof id === 'string' &&
        /^[A-Za-z0-9_-]{1,128}$/.test(id) && !['__proto__', 'constructor', 'prototype'].includes(id) &&
        note.id === id && typeof note.body === 'string' &&
        (note.title == null || typeof note.title === 'string') &&
        (note.updatedAt == null || Number.isFinite(note.updatedAt)) &&
        (note.deletedAt == null || Number.isFinite(note.deletedAt));
}
