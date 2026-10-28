import test from 'node:test';
import assert from 'node:assert/strict';
import { createNavigation } from '../platform/navigation.js';
const loc = noteId => ({ tab: 'notes', noteId, editor: true });
test('navigation bounds history, truncates forward branch and leaves cursor intact on restore failure', () => {
    let state, fail = false, applied;
    const nav = createNavigation({ initial: loc('0'), limit: 3, changed: value => state = value, apply: value => { if (fail) throw Error('save failed'); applied = value; } });
    for (const id of ['1', '2', '3']) nav.record(loc(id));
    nav.move(-1); assert.equal(applied.noteId, '2'); nav.move(-1); assert.equal(applied.noteId, '1'); assert.equal(state.back, false);
    fail = true; assert.throws(() => nav.move(1)); assert.equal(state.back, false);
    fail = false; nav.record(loc('new')); assert.equal(state.forward, false);
    nav.move(-1); assert.equal(applied.noteId, '1'); nav.move(1); assert.equal(applied.noteId, 'new');
    nav.reset(); assert.deepEqual(state, { back: false, forward: false });
});
