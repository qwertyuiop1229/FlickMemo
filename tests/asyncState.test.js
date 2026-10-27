import test from 'node:test';
import assert from 'node:assert/strict';
import {waitForAsyncState} from '../scripts/async-state.mjs';
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
    assert.ok(reads>=2);
});
test('IPC rejection is reported instead of being treated as a truthy Promise',async()=>{
    const failure=new Error('native service unavailable');
    await assert.rejects(waitForAsyncState(async()=>{throw failure;},()=>true),error=>error===failure);
});
