import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
// Validate every version target before writing any of them.
export function nextVersion(version) {
    if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error('version.jsonの版が不正です');
    const [major, minor, patch] = version.split('.').map(Number);
    if (![major, minor, patch].every(Number.isSafeInteger) || patch >= 65534) throw new Error('バージョンの数値が範囲外です');
    return `${major}.${minor}.${patch + 1}`;
}
export function bump(root = '.') {
    const read = name => fs.readFileSync(`${root}/${name}`, 'utf8');
    const version = nextVersion(JSON.parse(read('version.json')).version);
    const files = new Map();
    for (const name of ['version.json', 'package.json', 'package-lock.json', 'manifest.json', 'src-tauri/tauri.conf.json']) {
        const value = JSON.parse(read(name)); value.version = version;
        if (name === 'package-lock.json') value.packages[''].version = version;
        files.set(name, JSON.stringify(value, null, name.startsWith('src-tauri') || name === 'version.json' ? 2 : 4) + '\n');
    }
    const app = read('app.js');
    if (!/const APP_VERSION = "[^"]+";/.test(app)) throw new Error('APP_VERSIONが見つかりません');
    files.set('app.js', app.replace(/const APP_VERSION = "[^"]+";/, `const APP_VERSION = "${version}";`));
    for (const name of ['src-tauri/Cargo.toml', 'src-tauri/Cargo.lock']) {
        const source = read(name);
        const pattern = name.endsWith('.toml') ? /(\[package\][\s\S]*?\nversion = ")[^"]+(")/ : /(name = "flickmemo-desktop"\r?\nversion = ")[^"]+(")/;
        if (!pattern.test(source)) throw new Error(`${name}のWindows版バージョンが見つかりません`);
        files.set(name, source.replace(pattern, `$1${version}$2`));
    }
    for (const [name, contents] of files) fs.writeFileSync(`${root}/${name}`, contents);
    return version;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try { console.log(`Web・拡張・Windowsのバージョンを同期しました: v${bump()}`); }
    catch (error) { console.error(error.message); process.exitCode = 1; }
}
