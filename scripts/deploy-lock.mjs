import fs from 'node:fs/promises';
export async function acquireDeployLock(file) {
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            const handle = await fs.open(file, 'wx');
            await handle.writeFile(JSON.stringify({ pid: process.pid }));
            return async () => { await handle.close(); await fs.rm(file, { force: true }); };
        } catch (error) {
            if (error.code !== 'EEXIST') throw error;
            const previous = JSON.parse(await fs.readFile(file, 'utf8'));
            if (!Number.isSafeInteger(previous.pid) || previous.pid <= 0) throw new Error('配信ロックを確認できません');
            try { process.kill(previous.pid, 0); }
            catch (problem) { if (problem.code === 'ESRCH') { await fs.rm(file); continue; } throw problem; }
            throw new Error('別のnpm run deployが実行中です。完了してから再試行してください');
        }
    }
    throw new Error('配信ロックを取得できません');
}
