import { directorySink } from '../streamingFiles.js';

const directoryName = 'flickmemo-temporary-receive-v1';
const lockName = `${directoryName}:exclusive`;

async function remove(directory, name, options) {
    try { await directory.removeEntry(name, options); }
    catch (error) { if (error.name !== 'NotFoundError') throw error; }
}

export function clearAbandonedReceives({storage, locks}) {
    return locks.request(lockName, {ifAvailable:true}, async lock => {
        if (!lock) return;
        await remove(await storage.getDirectory(),directoryName,{recursive:true});
    });
}

export function openTemporaryReceive(env) {
    const {storage, locks} = env;
    return new Promise((resolve,reject) => {
        locks.request(lockName,{ifAvailable:true},async lock => {
            if (!lock) throw new Error('別のFlickMemo画面が大容量受信を使用しています');
            const root = await storage.getDirectory();
            await remove(root,directoryName,{recursive:true});
            const directory = await root.getDirectoryHandle(directoryName,{create:true});
            let release;
            const lifetime = new Promise(done=>{ release=done; });
            const active = new Set();
            let closed = false, closing;
            resolve({
                async createSink(info) {
                    if (closed) throw new Error('大容量受信は終了しています');
                    const estimate = await storage.estimate?.();
                    if (Number.isFinite(estimate?.quota) && Number.isFinite(estimate?.usage) && info.size > estimate.quota-estimate.usage) {
                        throw new Error('一時保存の空き容量が不足しています。保存済みの一時ファイルを削除してください');
                    }
                    if (closed) throw new Error('大容量受信は終了しています');
                    const opening = directorySink(directory,info,env);
                    active.add(opening);
                    try {
                        const sink = await opening;
                        if (closed) { await sink.abort(); throw new Error('大容量受信は終了しています'); }
                        return {
                            write: chunk => sink.write(chunk),
                            async close() {
                                const saved = await sink.close();
                                try {
                                    const file = await saved.handle.getFile();
                                    if (closed || file.size !== info.size) throw new Error('一時ファイルの保存を確認できませんでした');
                                    return {temporaryFile:file, remove:()=>remove(directory,saved.savedName)};
                                } catch (error) { await remove(directory,saved.savedName); throw error; }
                                finally { active.delete(opening); }
                            },
                            async abort() { try { await sink.abort(); } finally { active.delete(opening); } }
                        };
                    } catch (error) { active.delete(opening); throw error; }
                },
                close() {
                    closed = true;
                    return closing ??= (async () => {
                        try {
                            await Promise.allSettled([...active].map(async opening=>(await opening).abort()));
                            await remove(root,directoryName,{recursive:true});
                        } finally { release(); }
                    })();
                }
            });
            await lifetime;
        }).catch(reject);
    });
}
