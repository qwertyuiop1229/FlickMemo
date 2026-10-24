export function uniqueArchiveName(original, used) {
    const base = String(original || 'file').split(/[\\/]/).pop()
        .replace(/[\x00-\x1f\x7f]/g, '_').replace(/^\.+/, '_') || 'file';
    const dot = base.lastIndexOf('.');
    const stem = dot > 0 ? base.slice(0, dot) : base;
    const extension = dot > 0 ? base.slice(dot) : '';
    let candidate = base, index = 2;
    while (used.has(candidate)) candidate = `${stem}_${index++}${extension}`;
    used.add(candidate);
    return candidate;
}
