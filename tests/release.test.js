import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { bump, nextVersion } from '../bump.js';
import { repositoryFromRemote, validateRelease, verifyAsset, releaseUrl } from '../scripts/release.mjs';

test('one bump synchronizes web, extension, native Cargo and installer versions', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'flickmemo-version-'));
    try {
        for (const file of ['version.json','package.json','package-lock.json','manifest.json','app.js','src-tauri/tauri.conf.json','src-tauri/Cargo.toml','src-tauri/Cargo.lock']) {
            fs.mkdirSync(path.dirname(path.join(root,file)), {recursive:true}); fs.copyFileSync(file,path.join(root,file));
        }
        const expected = nextVersion(JSON.parse(fs.readFileSync(path.join(root,'version.json'))).version);
        assert.equal(bump(root), expected);
        assert.equal(JSON.parse(fs.readFileSync(path.join(root,'src-tauri/tauri.conf.json'))).version, expected);
        assert.match(fs.readFileSync(path.join(root,'src-tauri/Cargo.toml'),'utf8'), new RegExp(`version = "${expected.replaceAll('.','\\.')}"`));
        assert.match(fs.readFileSync(path.join(root,'src-tauri/Cargo.lock'),'utf8'), new RegExp(`name = "flickmemo-desktop"\\r?\\nversion = "${expected.replaceAll('.','\\.')}"`));
        const before = fs.readFileSync(path.join(root,'version.json'),'utf8');
        fs.writeFileSync(path.join(root,'app.js'), '// missing version');
        assert.throws(()=>bump(root));assert.equal(fs.readFileSync(path.join(root,'version.json'),'utf8'),before);
    } finally {fs.rmSync(root,{recursive:true,force:true});}
});
test('release downloads must match the exact requested commit, version, sizes and SHA256', () => {
    const bytes=Buffer.from('MZ synthetic fixture, never executed');
    const file={bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
    const expected={version:'1.3.83',commit:'a'.repeat(40),repository:'owner/repo'};
    const release={schemaVersion:1,...expected,files:{'FlickMemo-Setup.exe':file,'FlickMemo-Portable.exe':file}};
    assert.equal(validateRelease(release,expected),release);verifyAsset(bytes,file);
    assert.throws(()=>validateRelease({...release,commit:'b'.repeat(40)},expected));
    assert.throws(()=>verifyAsset(Buffer.from('corrupt'),file));
    assert.throws(()=>validateRelease({...release,files:{...release.files,'../evil.exe':file}},expected));
    assert.equal(repositoryFromRemote('https://github.com/owner/repo.git'),'owner/repo');
    assert.equal(repositoryFromRemote('git@github.com:owner/repo.git'),'owner/repo');
    assert.throws(()=>repositoryFromRemote('https://evil.example/owner/repo.git'));
    assert.throws(()=>releaseUrl('owner/repo','1.3.83','../secret'));
});
