import {chromium} from 'playwright-core';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const {app:{security:{csp}}}=JSON.parse(await fs.readFile('src-tauri/tauri.conf.json','utf8'));
for(const channel of ['chrome','msedge']){
 const browser=await chromium.launch({channel,headless:true});
 try{
  for(const fixed of [false,true]){
   const context=await browser.newContext(),page=await context.newPage(),sockets=[],polls=[];
   // Apply the same CSP used in the packaged desktop application.
   await page.route('**/tests/fixtures/database-transport.html*',async route=>{
    const response=await route.fetch();await route.fulfill({response,headers:{...response.headers(),'content-security-policy':csp}});
   });
   page.on('websocket',socket=>{if(socket.url().includes('firebasedatabase.app'))sockets.push(socket.url())});
   page.on('request',request=>{if(request.url().includes('/.lp?'))polls.push(request.url())});
   await page.goto(`http://127.0.0.1:5175/tests/fixtures/database-transport.html?fixed=${fixed}`);
   if(fixed){await page.waitForFunction(()=>document.getElementById('result').textContent==='connected',null,{timeout:30000});assert.ok(sockets.length);assert.equal(polls.length,0);}
   else{await page.waitForFunction(()=>document.querySelector('iframe')!==null,null,{timeout:10000});assert.equal(await page.locator('#result').innerText(),'disconnected');assert.equal(sockets.length,0);}
   await page.evaluate(()=>window.stopProbe());await context.close();
  }
  console.log(`${channel}: stored WebSocket failure reproduces polling/CSP deadlock; fixed transport establishes real Firebase connection with unchanged CSP PASS`);
 }finally{await browser.close()}
}
