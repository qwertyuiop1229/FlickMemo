import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import {JSDOM} from 'jsdom';
async function fixture(overrides={}){
    const dom=new JSDOM('<body><p class="settings-desc"></p><button id="btn-update-check"></button></body>');
    dom.window.document.body.inert=false;
    const notices=[],calls=[];
    const api={updateCheck:async()=>({version:'2.0.0'}),updateDownload:async()=>{calls.push('download');},updateInstall:async()=>{calls.push('install');assert.equal(dom.window.document.body.inert,true);},...overrides.api};
    const context=vm.createContext({document:dom.window.document});
    const module=new vm.SourceTextModule(await fs.readFile(new URL('../platform/desktopUpdates.js',import.meta.url),'utf8'),{context});
    await module.link(()=>{throw new Error('unexpected import');});await module.evaluate();
    const controller=module.namespace.createDesktopUpdates({api,prepareClose:async()=>{calls.push('save');await overrides.save?.();},notify:text=>notices.push(text)});
    return {dom,api,controller,calls,notices,close:()=>dom.window.close()};
}
test('desktop updates save after download and before applying, including edits during download',async()=>{
    let text='before',saved='';const f=await fixture({save:async()=>{saved=text;}});
    try{await f.controller.check();f.api.updateDownload=async()=>{f.calls.push('download');text='edited during download';};await f.controller.install();assert.deepEqual(f.calls,['download','save','install']);assert.equal(saved,'edited during download');assert.equal(f.dom.window.document.body.inert,false);}finally{f.close();}
});
test('download or signature failure never saves, installs, or locks the editor and can be retried',async()=>{
    const f=await fixture({api:{updateDownload:async()=>{throw new Error('signature rejected');}}});
    try{await f.controller.check();await f.controller.install();assert.deepEqual(f.calls,[]);assert.equal(f.dom.window.document.body.inert,false);assert.equal(f.notices.length,1);f.api.updateDownload=async()=>{f.calls.push('download');};await f.controller.install();assert.deepEqual(f.calls,['download','save','install']);}finally{f.close();}
});
test('a failed local save or declined transfer confirmation prevents installation',async()=>{
    const f=await fixture({save:async()=>{throw new Error('local save failed');}});
    try{await f.controller.check();await f.controller.install();assert.deepEqual(f.calls,['download','save']);assert.equal(f.dom.window.document.body.inert,false);assert.equal(f.dom.window.document.querySelector('button').disabled,false);}finally{f.close();}
});
test('automatic offline checks stay quiet and manual checks give a retryable explanation',async()=>{
    const f=await fixture({api:{updateCheck:async()=>{throw new Error('offline');}}});
    try{await f.controller.check();assert.equal(f.notices.length,0);await f.controller.check(true);assert.equal(f.notices[0],'offline');assert.equal(f.dom.window.document.body.inert,false);}finally{f.close();}
});
test('concurrent checks and duplicate install clicks start only one operation',async()=>{
    let checks=0,release;const waiting=new Promise(resolve=>release=resolve);
    const f=await fixture({api:{updateCheck:async()=>{checks++;await waiting;return{version:'2.0.0'};}}});
    try{const first=f.controller.check();await f.controller.check();assert.equal(checks,1);release();await first;
        let done;f.api.updateDownload=async()=>{f.calls.push('download');await new Promise(resolve=>done=resolve);};
        const applying=f.controller.install();await f.controller.install();await f.controller.check();assert.equal(checks,1);done();await applying;assert.deepEqual(f.calls,['download','save','install']);
    }finally{f.close();}
});
test('no update leaves the editor usable and version labels are rendered as text',async()=>{
    const f=await fixture({api:{updateCheck:async()=>null}});
    try{await f.controller.check(true);assert.equal(f.notices[0],'Windows版は最新です');await f.controller.install();assert.deepEqual(f.calls,[]);f.api.updateCheck=async()=>({version:'<img src=x onerror=alert(1)>'});await f.controller.check();assert.equal(f.dom.window.document.querySelector('img'),null);assert.match(f.dom.window.document.querySelector('aside').textContent,/<img/);}finally{f.close();}
});
