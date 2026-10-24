import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import { uniqueArchiveName } from '../archiveNames.js';

test('duplicate names cannot overwrite a real suffixed file when creating a ZIP', async () => {
    const zip = new JSZip(), used = new Set();
    for (const [name, content] of [['a.txt', 'first'], ['a.txt', 'second'], ['a_2.txt', 'third']]) {
        zip.file(uniqueArchiveName(name, used), content);
    }
    const reopened = await JSZip.loadAsync(await zip.generateAsync({ type: 'nodebuffer' }));
    const contents = await Promise.all(Object.values(reopened.files).map(file => file.async('string')));
    assert.deepEqual(contents.sort(), ['first', 'second', 'third']);
});
test('archive entries cannot escape the extraction directory through path names', () => {
    const used = new Set();
    for (const input of ['../../evil.txt', '..\\..\\evil.txt', '.hidden', '\x00bad.txt']) {
        const name = uniqueArchiveName(input, used);
        assert.ok(!/[\\/\x00]/.test(name));
        assert.ok(!name.startsWith('.'));
    }
});
