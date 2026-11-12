import {chromium} from 'playwright-core';import jsQR from 'jsqr';import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5175';
for(const channel of ['chrome','msedge']){
 const browser=await chromium.launch({channel,headless:true});
 try{const page=await browser.newPage({viewport:{width:390,height:844}}),requests=[],errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 await page.goto(base+'/tests/fixtures/share-qr-browser.html');await page.locator('#btn-room-qr').click();await page.locator('.share-qr-canvas canvas').waitFor();
 const pixels=await page.locator('canvas').evaluate(canvas=>({width:canvas.width,height:canvas.height,data:Array.from(canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data)}));
 const decoded=jsQR(new Uint8ClampedArray(pixels.data),pixels.width,pixels.height);assert.equal(decoded?.data,'https://flickmemo-qwe.web.app/?room=rm_'+'a'.repeat(32)+'#key='+'b'.repeat(64));
 assert.equal(await page.locator('dialog').evaluate(e=>e.scrollWidth>e.clientWidth),false);
 await page.screenshot({path:`desktop-reports/share-qr-${channel}.png`});await page.evaluate(()=>window.stopSharing());assert.equal(await page.locator('canvas').count(),0);assert.equal(await page.locator('dialog').evaluate(e=>e.open),false);assert.deepEqual(errors,[]);
 assert.equal(requests.some(url=>url.includes('#key=')||url.includes('api.qrserver')||url.includes('chart.googleapis')),false);console.log(`${channel}: actual QR decoded including encryption fragment, mobile layout, local generation and stop cleanup PASS`);
 }finally{await browser.close()}
}
