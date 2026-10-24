import test from 'node:test';
import assert from 'node:assert/strict';
import { validNote } from '../noteData.js';

test('remote notes cannot smuggle prototype keys, wrong IDs or malformed fields into the cache', () => {
    const note = { id: 'safe', body: 'text', title: '', updatedAt: 123 };
    assert.equal(validNote(note, 'safe'), true);
    for (const id of ['__proto__', 'constructor', 'prototype', '../other', 'a/b']) {
        assert.equal(validNote({ ...note, id }), false);
    }
    assert.equal(validNote(note, 'another-key'), false);
    assert.equal(validNote({ ...note, body: {} }), false);
    assert.equal(validNote({ ...note, title: [] }), false);
    assert.equal(validNote({ ...note, updatedAt: Infinity }), false);
});
