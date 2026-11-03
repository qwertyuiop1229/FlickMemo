// Writes only to a directory explicitly granted in a user gesture. No OPFS/IDB cache.
export async function directorySink(directory, info, env = globalThis) {
    const original = String(info.name || 'file').replace(/[\\/<>:"|?*\x00-\x1f]/g, '_').replace(/[ .]+$/, '').slice(0, 160) || 'file';
    const dot = original.lastIndexOf('.'); const stem = dot > 0 ? original.slice(0, dot) : original, extension = dot > 0 ? original.slice(dot) : '';
    const name = `${stem} (${env.crypto.randomUUID()})${extension}`;
    const handle = await directory.getFileHandle(name, { create: true });
    let writer;
    try { writer = await handle.createWritable({ keepExistingData: false }); }
    catch (error) { await directory.removeEntry(name).catch(() => {}); throw error; }
    let aborted = false, closed = false, bytes = 0;
    return {
        async write(chunk) { if (aborted || closed) throw Error('受信保存は終了しています'); await writer.write(chunk); bytes += chunk.byteLength; },
        async close() {
            if (aborted || bytes !== info.size) throw Error('受信ファイルの長さが一致しません');
            await writer.close(); if (aborted) throw Error('受信を中止しました'); closed = true;
            return { saved: true, savedName: name, size: bytes, type: info.mime || 'application/octet-stream' };
        },
        async abort() { if (closed || aborted) return; aborted = true; try { await writer.abort(); } catch {} await directory.removeEntry(name).catch(() => {}); }
    };
}
