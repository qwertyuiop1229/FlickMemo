import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import {createReceivedArchive,writeReceivedZip} from '../platform/receivedArchive.js';

const id = crypto.randomUUID();
const file = (text) => new Blob([text]);

test('only a complete receive batch exposes ZIP and the aggregate memory limit is enforced', () => {
    const archive = createReceivedArchive(3);
    archive.add(file('ab'),'a',{id,index:0,total:2});
    assert.equal(archive.ready(),null);
    archive.add(file('b'),'b',{id:crypto.randomUUID(),index:1,total:2});
    assert.equal(archive.ready(),null);
    archive.add(file('cd'),'c',{id,index:1,total:2});
    assert.equal(archive.ready(),null);
    archive.add(file('a'),'a',{id,index:0,total:2});
    archive.add(file('b'),'b',{id,index:1,total:2});
    assert.equal(archive.ready().length,2);
    archive.clear();
    assert.equal(archive.ready(),null);
});

test('ZIP streams saved files to a writable output and preserves duplicate names and content', async () => {
    let reads = 0;
    const chunks = [];
    const directory = {};
    const saved = {saved:true,directory,handle:{async getFile(){reads++;return file('second');}}};
    const output = new WritableStream({write(chunk){chunks.push(chunk.slice());}});
    await writeReceivedZip([{name:'../same.txt',data:file('first')},{name:'same.txt',data:saved}],output);
    const zip = await JSZip.loadAsync(await new Blob(chunks).arrayBuffer());
    assert.equal(await zip.file('same.txt').async('string'),'first');
    assert.equal(await zip.file('same_2.txt').async('string'),'second');
    assert.equal(reads,1);
    const download = await writeReceivedZip([{name:'a.txt',data:file('download')}]);
    assert.equal(await (await JSZip.loadAsync(await download.arrayBuffer())).file('a.txt').async('string'),'download');
});
