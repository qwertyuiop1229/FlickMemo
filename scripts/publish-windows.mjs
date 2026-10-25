import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { validateRelease, RELEASE_FILES } from './release.mjs';
const { GITHUB_TOKEN: token, GITHUB_REPOSITORY: repository, GITHUB_SHA: commit, GITHUB_REF_NAME: tag } = process.env;
if (!token || !repository || !/^v\d+\.\d+\.\d+$/.test(tag || '') || !/^[a-f0-9]{40}$/.test(commit || '')) throw new Error('タグのリリースジョブでのみ実行できます');
const { version } = JSON.parse(await fs.readFile('package.json', 'utf8'));
if (tag !== `v${version}`) throw new Error('タグとアプリのバージョンが一致しません');
const files = new Map();
const installers = (await fs.readdir('src-tauri/target/release/bundle/nsis')).filter(name => name.endsWith('-setup.exe'));
if (installers.length !== 1) throw new Error('Windowsインストーラーを一意に選べません');
files.set(RELEASE_FILES[0], await fs.readFile(path.join('src-tauri/target/release/bundle/nsis', installers[0])));
files.set(RELEASE_FILES[1], await fs.readFile('src-tauri/target/release/flickmemo-desktop.exe'));
const manifest = validateRelease({ schemaVersion: 1, version, commit, repository, unsigned: true,
    files: Object.fromEntries([...files].map(([name, bytes]) => [name, { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') }])) }, { version, commit, repository });
files.set('windows-release.json', Buffer.from(JSON.stringify(manifest, null, 2)));
async function api(url, method = 'GET', data, type = 'application/json') {
    const response = await fetch(url, { method, headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': type },
        body: data == null ? undefined : Buffer.isBuffer(data) ? data : JSON.stringify(data), signal: AbortSignal.timeout(120_000) });
    if (!response.ok) throw new Error(`GitHub release ${method} failed (${response.status})`);
    return response.status === 204 ? null : response.json();
}
const base = `https://api.github.com/repos/${repository}/releases`;
const existing = await fetch(`${base}/tags/${tag}`, { headers: { Authorization: `Bearer ${token}` } });
if (!existing.ok && existing.status !== 404) throw new Error(`GitHub release lookup failed (${existing.status})`);
let release = existing.status === 404 ? await api(base, 'POST', { tag_name: tag, target_commitish: commit, name: `FlickMemo ${version} — Web / Windows`,
    draft: true, make_latest: 'false', body: 'Windows x64の試用版です。未署名のインストーラーと単体実行ファイルを配布します。メモの20回復元とクリップボード通知をWindows CIで検証しています。記録・クラウド送信は初期OFFです。' }) : await existing.json();
if (release.target_commitish !== commit) throw new Error('既存リリースのコミットが異なります');
if (!release.draft) { console.log(`リリースは公開済みです: ${release.html_url}`); process.exit(0); }
for (const [name, bytes] of files) {
    const old = release.assets.find(asset => asset.name === name);
    if (old) await api(`${base}/assets/${old.id}`, 'DELETE').catch(error => { if (!error.message.includes('(204)')) throw error; });
    await api(`https://uploads.github.com/repos/${repository}/releases/${release.id}/assets?name=${encodeURIComponent(name)}`, 'POST', bytes, 'application/octet-stream');
}
release = await api(`${base}/${release.id}`, 'PATCH', { draft: false, make_latest: 'false' });
console.log(`Windowsを公開しました: ${release.html_url}`);
