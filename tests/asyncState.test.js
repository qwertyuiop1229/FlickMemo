import test from 'node:test';
import assert from 'node:assert/strict';
import {unchangedFor,waitForAsyncState} from '../scripts/async-state.mjs';

test('a delayed final position update restarts the full quiet interval before measuring idle',()=>{
    let time=0;
    const settled=unchangedFor(state=>state.positionUpdates,300,()=>time);
    assert.equal(settled({positionUpdates:80}),false);
    time=200;
    assert.equal(settled({positionUpdates:81}),false);
    time=300;
    assert.equal(settled({positionUpdates:81}),false);
    time=500;
    assert.equal(settled({positionUpdates:81}),true);
    time=501;
    assert.equal(settled({positionUpdates:82}),false);
});
test('IPC polling awaits each result and retries false asynchronous results until the condition is true',async()=>{
    let reads=0, inFlight=0;
    const state=await waitForAsyncState(async()=>{
        assert.equal(inFlight++,0);await new Promise(resolve=>setImmediate(resolve));--inFlight;
        return {active:++reads>=4};
    },async state=>{await Promise.resolve();return state.active;},{interval:0,timeout:1000});
    assert.equal(reads,4);assert.equal(state.active,true);
});
test('an inactive picker and empty recent list can never satisfy a completed color selection',async()=>{
    let reads=0;
    await assert.rejects(waitForAsyncState(async()=>{reads++;return {active:false,recent:[],error:null};},
        state=>!state.active&&state.recent[0]==='#2A79B4', {interval:2,timeout:15,description:'採色完了'}),/採色完了.*タイムアウト.*"recent":\[\]/);
    assert.ok(reads>=1); // A busy runner may exhaust the deadline after the first awaited read.
});
test('IPC rejection is reported instead of being treated as a truthy Promise',async()=>{
    const failure=new Error('native service unavailable');
    await assert.rejects(waitForAsyncState(async()=>{throw failure;},()=>true),error=>error===failure);
});
