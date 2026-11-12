import test from 'node:test';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';import {setupShareQr,validShareUrl} from '../platform/shareQr.js';
const link='https://flickmemo-qwe.web.app/?room=rm_'+'a'.repeat(32)+'#key='+'b'.repeat(64);
test('share QR accepts only the official complete encrypted link',()=>{assert.equal(validShareUrl(link),true);for(const value of [link.replace('flickmemo-qwe.web.app','example.com'),link.split('#')[0],link+'&other=value',link.replace('https://','https://user:pass@')])assert.equal(validShareUrl(value),false)});
test('stopped or replaced QR requests cannot display a late secret and closing releases pixels',async()=>{
 const dom=new JSDOM('<button id="btn-room-qr"></button>',{url:'https://flickmemo-qwe.web.app/'}),doc=dom.window.document;
 dom.window.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};dom.window.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new dom.window.Event('close'))};
 let current=link,release;const ui=setupShareQr({doc,getUrl:()=>current,loadEncoder:async()=>({toCanvas:(canvas,value)=>new Promise(resolve=>{canvas.width=canvas.height=280;release=resolve})})});
 try{const pending=ui.open();await new Promise(r=>setImmediate(r));current=null;ui.reset();release();await pending;assert.equal(doc.querySelector('canvas'),null);
 current=link;const next=ui.open();await new Promise(r=>setImmediate(r));release();await next;const canvas=doc.querySelector('canvas');assert.equal(canvas.width,280);ui.dialog.close();assert.equal(canvas.width,0);assert.equal(doc.querySelector('canvas'),null);
 }finally{dom.window.close()}
});
