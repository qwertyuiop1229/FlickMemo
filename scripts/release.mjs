import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
export const RELEASE_FILES = ['FlickMemo-Setup.exe', 'FlickMemo-Portable.exe'];
export function repositoryFromRemote(remote) {
    const match = /^(?:https:\/\/github\.com\/|git@github\.com:)([\w.-]+\/[\w.-]+?)(?:\.git)?$/.exec(remote.trim());
    if (!match) throw new Error('originはGitHubのリポジトリに設定してください');
    return match[1];
}
export function validateRelease(release, { version, commit, repository }) {
    assert.equal(release.schemaVersion, 1);
    assert.equal(release.version, version);
    assert.equal(release.commit, commit);
    assert.equal(release.repository, repository);
    assert.match(version, /^\d+\.\d+\.\d+$/);
    assert.match(commit, /^[a-f0-9]{40}$/);
    assert.deepEqual(Object.keys(release.files).sort(), [...RELEASE_FILES].sort());
    for (const name of RELEASE_FILES) {
        assert.match(release.files[name].sha256, /^[a-f0-9]{64}$/);
        assert.ok(Number.isSafeInteger(release.files[name].bytes) && release.files[name].bytes > 0 && release.files[name].bytes <= 64 * 1024 * 1024);
    }
    return release;
}
export function verifyAsset(bytes, expected) {
    assert.equal(bytes.length, expected.bytes, 'Windows配布ファイルのサイズが一致しません');
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256, 'Windows配布ファイルのSHA-256が一致しません');
}
export function releaseUrl(repository, version, name = 'windows-release.json') {
    assert.match(repository, /^[\w.-]+\/[\w.-]+$/);
    assert.match(version, /^\d+\.\d+\.\d+$/);
    assert.ok([...RELEASE_FILES, 'windows-release.json'].includes(name));
    return `https://github.com/${repository}/releases/download/v${version}/${name}`;
}
