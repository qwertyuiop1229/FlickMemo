import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import JSZip from 'jszip';

const root = new URL('../', import.meta.url);
const zip = await JSZip.loadAsync(await fs.readFile(new URL('dist/flickmemo-extension.zip', root)));
const manifest = JSON.parse(await zip.file('manifest.json').async('string'));
assert.equal(manifest.background.type, 'module');
for (const path of ['background.js', 'authProtocol.js', 'index.html', ...Object.values(manifest.icons), ...Object.values(manifest.action.default_icon)]) {
    assert.ok(zip.file(path), `Extension ZIP is missing ${path}`);
}
const pwa = JSON.parse(await zip.file('manifest.webmanifest').async('string'));
for (const icon of pwa.icons) {
    const bytes = await zip.file(icon.src).async('nodebuffer');
    assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], icon.sizes.split('x').map(Number));
}
const background = await zip.file('background.js').async('string');
assert.ok(background.includes("'./authProtocol.js'"));
for (const entry of ['index.html', 'auth.html', 'download.html']) {
    const html = await zip.file(entry).async('string');
    for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) {
        assert.ok(zip.file(match[1].slice(1)), `${entry} references missing ${match[1]}`);
    }
    assert.ok(html.includes('/icons/favicon.ico'));
}
assert.ok(!Object.keys(zip.files).some(path => /(^|\/)(node_modules|tests|\.env|\.git)(\/|$)/.test(path)));
assert.ok(!Object.keys(zip.files).some(path => path.startsWith('windows/') || path.endsWith('.exe')), 'Windows installers must never be embedded in the extension ZIP');
console.log(`Build verified: ${manifest.version}, ${Object.keys(zip.files).length} ZIP entries; PWA icons, extension icons and module references present.`);
