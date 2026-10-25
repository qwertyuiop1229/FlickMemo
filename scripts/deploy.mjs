import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { repositoryFromRemote, releaseUrl, validateRelease, verifyAsset, RELEASE_FILES } from './release.mjs';
import { acquireDeployLock } from './deploy-lock.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const statePath = path.join(root, '.deploy-state.json');
const npmCli = process.env.npm_execpath;
const firebaseCli = process.env.APPDATA && path.join(process.env.APPDATA, 'npm/node_modules/firebase-tools/lib/bin/firebase.js');
async function run(command, args, capture = false) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { cwd: root, shell: false, stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit' });
        let output = ''; let error = '';
        child.stdout?.on('data', value => { output += value; });
        child.stderr?.on('data', value => { error += value; });
        child.on('error', reject);
        child.on('exit', code => code === 0 ? resolve(output.trim()) : reject(new Error(`${path.basename(command)} が終了コード ${code} で失敗しました${capture ? ': ' + error.slice(0, 500) : ''}`)));
    });
}
const git = (...args) => run('git', args, true);
const npm = name => run(process.execPath, [npmCli, 'run', name]);
const save = state => fs.writeFile(statePath, JSON.stringify(state, null, 2));
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function download(url, maximum, optional = false) {
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    if (optional && response.status === 404) return null;
    if (!response.ok) throw new Error(`配布ファイルを取得できません (${response.status})`);
    const parts = []; let size = 0;
    for await (const part of response.body) {
        size += part.length;
        if (size > maximum) throw new Error('配布ファイルがサイズ上限を超えています');
        parts.push(part);
    }
    return Buffer.concat(parts);
}

async function waitForWindows(state) {
    const deadline = Date.now() + 50 * 60_000;
    let lastStatus = ''; let nextStatus = 0;
    console.log(`Windowsのビルド・検証・公開を待ちます: https://github.com/${state.repository}/actions`);
    while (Date.now() < deadline) {
        try {
            const manifest = await download(releaseUrl(state.repository, state.version), 65536, true);
            if (manifest) return validateRelease(JSON.parse(manifest), state);
        } catch (error) {
            // A transient network error must not bump the version or create a second release.
            if (error.name === 'AssertionError' || error instanceof SyntaxError) throw error;
            console.log(`配布ファイルの確認を再試行します: ${error.message}`);
        }
        if (Date.now() >= nextStatus) {
            nextStatus = Date.now() + 90_000;
            const response = await fetch(`https://api.github.com/repos/${state.repository}/actions/runs?head_sha=${state.commit}&event=push&per_page=20`, { signal: AbortSignal.timeout(15_000) }).catch(() => null);
            if (response?.ok) {
                const { workflow_runs: runs } = await response.json();
                const job = runs.find(value => value.name === 'Windows desktop checks' && value.head_sha === state.commit);
                if (job) {
                    const status = `${job.status}/${job.conclusion || ''}`;
                    if (status !== lastStatus) { console.log(`Windows: ${status} ${job.html_url}`); lastStatus = status; }
                    if (job.status === 'completed' && job.conclusion !== 'success') throw new Error(`Windowsの検証に失敗しました。修正後に再実行してください: ${job.html_url}`);
                }
            }
        }
        await sleep(30_000);
    }
    throw new Error('Windowsの公開待ちがタイムアウトしました。npm run deploy で同じ版から再開できます');
}

async function main() {
    if (!npmCli || !existsSync(npmCli)) throw new Error('npm run deploy から実行してください');
    if (!firebaseCli || !existsSync(firebaseCli)) throw new Error('Firebase CLIが見つかりません。npm install -g firebase-tools で導入してください');
    const repository = repositoryFromRemote(await git('remote', 'get-url', 'origin'));
    await run(process.execPath, [firebaseCli, '--version'], true);
    let state = await fs.readFile(statePath, 'utf8').then(JSON.parse).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
    if (state && (state.repository !== repository || state.commit !== await git('rev-parse', 'HEAD') || await git('status', '--porcelain', '--', '.', ':(exclude)dist'))) {
        console.log('前回の配信後にコードが変わったため、修正版を新しいバージョンとして配信します');
        state = null; await fs.rm(statePath, { force: true });
    }
    if (!state) {
        if (!await git('branch', '--show-current')) throw new Error('ブランチに切り替えてから実行してください');
        await run(process.execPath, ['bump.js']);
        await npm('check');
        await npm('build:desktop');
        await npm('verify:versions');
        const { version } = JSON.parse(await fs.readFile(path.join(root, 'version.json'), 'utf8'));
        await git('add', '.');
        await git('commit', '-m', `release: Web and Windows v${version}`);
        state = { version, repository, commit: await git('rev-parse', 'HEAD'), phase: 'push' };
        await save(state);
    }
    if (state.phase === 'push') {
        const tag = `v${state.version}`;
        const existing = await git('tag', '--list', tag);
        if (!existing) await git('tag', tag, state.commit);
        if (await git('rev-list', '-n', '1', tag) !== state.commit) throw new Error('同じバージョンのタグが別コミットを指しています');
        await run('git', ['push', '--atomic', '--set-upstream', 'origin', 'HEAD', `refs/tags/${tag}`]);
        state.phase = 'windows'; await save(state);
    }
    const release = await waitForWindows(state);
    // Resume from a fresh build, so dist from another version can never be uploaded.
    await npm('build'); await npm('verify-build');
    const directory = path.join(root, 'dist/windows');
    await fs.mkdir(directory, { recursive: true });
    for (const name of RELEASE_FILES) {
        const bytes = await download(releaseUrl(repository, state.version, name), release.files[name].bytes);
        verifyAsset(bytes, release.files[name]);
        await fs.writeFile(path.join(directory, name), bytes);
    }
    await fs.writeFile(path.join(directory, 'release.json'), JSON.stringify(release, null, 2));
    // The installed app/website now has one atomically published Hosting version.
    await run(process.execPath, [firebaseCli, 'deploy', '--only', 'hosting']);
    await fs.rm(statePath);
    console.log(`公開完了: Web / PWA / 拡張 / Windows v${state.version}\nhttps://flickmemo-qwe.web.app/download#http-windows`);
}

let unlock;
try {
    unlock = await acquireDeployLock(path.join(root, '.deploy.lock'));
    if (process.argv.includes('--new')) await fs.rm(statePath, { force: true });
    await main();
} catch (error) { console.error(`配信を完了できませんでした: ${error.message}`); process.exitCode = 1; }
finally { await unlock?.(); }
