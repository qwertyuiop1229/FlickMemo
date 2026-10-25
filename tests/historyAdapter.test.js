import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import * as model from '../history/model.js';
async function fixture({registration,write}={}){
    const auth={currentUser:{uid:'a'}},values=new Map(),timers=new Map();let next=0;const calls=[];
    const database={ref:(_,p)=>p,query:r=>r,orderByChild:()=>null,limitToLast:()=>null,onValue:()=>()=>{},
        onDisconnect:path=>({remove:async()=>{await registration?.(path);}}),
        set:async(path,value)=>{calls.push(['set',path]);await write?.();values.set(path,value);},
        remove:async path=>{calls.push(['remove',path]);values.delete(path);}};
    const context=vm.createContext({setTimeout:fn=>{timers.set(++next,fn);return next;},clearTimeout:id=>timers.delete(id),Date});
    const module=new vm.SourceTextModule(await fs.readFile(new URL('../history/firebaseAdapter.js',import.meta.url),'utf8'),{context});
    await module.link(name=>{const exports=name==='firebase/database'?database:model;return new vm.SyntheticModule(Object.keys(exports),function(){for(const[k,v]of Object.entries(exports))this.setExport(k,v);},{context});});await module.evaluate();
    return{adapter:module.namespace.historyAdapter({},auth,'b'.repeat(32)),auth,values,timers,calls};
}
test('stop during disconnect registration prevents a late selection upload',async()=>{
    let release,entered;const started=new Promise(r=>entered=r);
    const f=await fixture({registration:async()=>{entered();await new Promise(r=>release=r);}});
    const sharing=f.adapter.shareSelection('old');await started;const stopping=f.adapter.stopSelection();release();await Promise.all([sharing,stopping]);assert.equal(f.values.size,0);assert.equal(f.calls.some(([kind])=>kind==='set'),false);assert.equal(f.timers.size,0);
});
test('stop waits for an in-flight upload and removes its result',async()=>{
    let release,entered;const started=new Promise(r=>entered=r);
    const f=await fixture({write:async()=>{entered();await new Promise(r=>release=r);}});
    const sharing=f.adapter.shareSelection('old');await started;const stopping=f.adapter.stopSelection();release();await Promise.all([sharing,stopping]);assert.equal(f.values.size,0);assert.equal(f.timers.size,0);
});
test('an old selection expiry cannot erase a newer selection',async()=>{
    const f=await fixture();await f.adapter.shareSelection('first');const oldTimer=[...f.timers.values()][0];await f.adapter.shareSelection('second');oldTimer();await new Promise(r=>setImmediate(r));assert.equal([...f.values.values()][0].text,'second');await f.adapter.stopSelection();assert.equal(f.values.size,0);
});
test('account changes cancel queued writes and never transplant text to another UID',async()=>{
    let release,entered;const started=new Promise(r=>entered=r);
    const f=await fixture({registration:async path=>{if(path.includes('/a/')){entered();await new Promise(r=>release=r);}}});
    const old=f.adapter.shareSelection('private A');await started;f.auth.currentUser={uid:'c'};const current=f.adapter.shareSelection('public C');release();await Promise.all([old,current]);assert.equal(f.calls.some(([kind,path])=>kind==='set'&&path.includes('/a/')),false);assert.deepEqual([...f.values.values()].map(v=>v.text),['public C']);await f.adapter.stopSelection();
});
