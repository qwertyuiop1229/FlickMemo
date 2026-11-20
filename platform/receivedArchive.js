import { uniqueArchiveName } from '../archiveNames.js';

// Keep one batch, with the same memory budget as the existing receive history.
export function createReceivedArchive(maxBytes = 64 * 1024 * 1024) {
    let batch = null;
    return {
        clear() { batch = null; },
        add(data, name, meta) {
            if (!meta || !/^[a-f0-9-]{36}$/.test(meta.id) ||
                !Number.isSafeInteger(meta.total) || meta.total < 2 || meta.total > 1000 ||
                !Number.isSafeInteger(meta.index) || meta.index < 0 || meta.index >= meta.total) return;
            const source = data.archiveId ? 'native' : data.directory || 'memory';
            if (meta.index === 0) batch = { id: meta.id, total: meta.total, bytes: 0, source, entries: [] };
            if (!batch || batch.id !== meta.id || batch.total !== meta.total || batch.entries.length !== meta.index) return;
            if (batch.source !== source) { batch = null; return; }
            if (!data.saved) batch.bytes += data.size;
            if (batch.bytes > maxBytes) { batch = null; return; }
            batch.entries.push({data, name});
        },
        ready() { return batch && batch.entries.length === batch.total ? batch.entries : null; }
    };
}

export async function writeReceivedZip(entries, output, signal) {
    const {ZipWriter,BlobReader,BlobWriter} = await import('@zip.js/zip.js/index-native.js');
    const zip = new ZipWriter(output || new BlobWriter('application/zip'), { useWebWorkers: false });
    const used = new Set();
    for (const {data,name} of entries) {
        signal?.throwIfAborted();
        const file = data.handle ? await data.handle.getFile() : data;
        await zip.add(uniqueArchiveName(name,used),new BlobReader(file),{level:3,signal});
    }
    signal?.throwIfAborted();
    return zip.close();
}
