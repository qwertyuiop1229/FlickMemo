export const MAX_HISTORY_TEXT_BYTES = 64 * 1024;
export const IMAGE_PLACEHOLDER = '画像の保存・同期はまだ実装されていません';
const encoder = new TextEncoder();
export function validHistoryEntry(value, now = Date.now()) {
    return !!value && typeof value === 'object' && /^[a-f0-9]{32}$/.test(value.id || '') &&
        ['text', 'image_placeholder'].includes(value.kind) && typeof value.text === 'string' &&
        encoder.encode(value.text).length <= MAX_HISTORY_TEXT_BYTES &&
        (value.kind !== 'image_placeholder' || value.text === '') &&
        ['createdAt', 'updatedAt', 'expiresAt'].every(key => Number.isSafeInteger(value[key]) && value[key] > 0) &&
        value.updatedAt <= now + 60_000 && value.createdAt <= value.updatedAt &&
        typeof value.pinned === 'boolean' && Number.isSafeInteger(value.count) && value.count > 0 &&
        /^[a-f0-9]{32}$/.test(value.originDeviceId || '') &&
        (!value.deletedAt || Number.isSafeInteger(value.deletedAt) && value.deletedAt > 0);
}
export function visibleHistory(values, now = Date.now()) {
    return values.filter(value => validHistoryEntry(value, now) && !value.deletedAt &&
        (value.pinned || value.expiresAt > now))
        .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt).slice(0, 50);
}
export function selectionPayload(text, deviceId, now = Date.now()) {
    if (typeof text !== 'string' || !text.trim()) throw new Error('先に共有する文字を選択してください');
    if (encoder.encode(text).length > 4096) throw new Error('選択共有は4KiBまでです。短い範囲を選び直してください');
    if (!/^[a-f0-9]{32}$/.test(deviceId)) throw new Error('端末IDが不正です');
    return { text, deviceId, updatedAt: now, expiresAt: now + 30_000 };
}
export function validSelection(value, now = Date.now()) {
    return !!value && typeof value.text === 'string' && encoder.encode(value.text).length <= 4096 &&
        /^[a-f0-9]{32}$/.test(value.deviceId || '') && Number.isSafeInteger(value.updatedAt) &&
        Number.isSafeInteger(value.expiresAt) && value.updatedAt <= now + 1000 &&
        value.expiresAt === value.updatedAt + 30_000 && value.expiresAt > now;
}
