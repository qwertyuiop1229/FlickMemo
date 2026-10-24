import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const root = new URL('../', import.meta.url);
async function dimensions(path) {
    const bytes = await fs.readFile(new URL('public/' + path.replace(/^\//, ''), root));
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
    return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}
test('every PWA and extension icon matches its declared pixel dimensions', async () => {
    const pwa = JSON.parse(await fs.readFile(new URL('manifest.webmanifest', root), 'utf8'));
    assert.deepEqual(pwa, JSON.parse(await fs.readFile(new URL('public/manifest.webmanifest', root), 'utf8')));
    assert.equal(pwa.icons.some(icon => icon.purpose === 'maskable'), true);
    for (const icon of pwa.icons) assert.deepEqual(await dimensions(icon.src), icon.sizes.split('x').map(Number));
    const extension = JSON.parse(await fs.readFile(new URL('manifest.json', root), 'utf8'));
    for (const [size, path] of Object.entries({ ...extension.icons, ...extension.action.default_icon })) {
        assert.deepEqual(await dimensions(path), [Number(size), Number(size)]);
    }
});
test('all web entry points use the same favicon and Apple touch icon', async () => {
    for (const file of ['index.html', 'auth.html', 'download.html', '404.html']) {
        const dom = new JSDOM(await fs.readFile(new URL(file, root), 'utf8'));
        const links = dom.window.document;
        assert.equal(links.querySelector('link[rel="icon"]').getAttribute('href'), '/icons/favicon.ico');
        assert.equal(links.querySelector('link[rel="apple-touch-icon"]').getAttribute('sizes'), '180x180');
        dom.window.close();
    }
});
