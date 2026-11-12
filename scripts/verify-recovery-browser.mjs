import {chromium} from 'playwright-core';import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5175';
for(const channel of ['chrome','msedge']){
 const browser=await chromium.launch({channel,headless:true});
 try{const page=await browser.newPage({viewport:{width:1100,height:850}}),errors=[];page.on('pageerror',error=>errors.push(error.message));await page.goto(base);
 await page.evaluate(async()=>{const {NoteStore}=await import('/noteStore.js');await new NoteStore().putRecovery('guest',{id:'recovery_browser',title:'復旧テスト（競合の控え）',body:'大切な下書き 日本語😀',conflictOf:'original',updatedAt:1});});
 await page.locator('#btn-guest-login').click();await page.locator('.note-item').filter({hasText:'復旧テスト'}).click();assert.equal(await page.locator('.recovery-tools').isVisible(),true);
 for(const width of [1100,390]){await page.setViewportSize({width,height:850});assert.equal(await page.locator('.recovery-tools').evaluate(e=>e.scrollWidth>e.clientWidth),false);await page.screenshot({path:`desktop-reports/recovery-${channel}-${width}.png`});}
 await page.locator('.recovery-tools button').click();assert.equal(await page.locator('#note-body').inputValue(),'大切な下書き 日本語😀');assert.equal(await page.locator('.recovery-tools').isVisible(),false);assert.equal(await page.locator('#note-title-input').inputValue(),'復旧テスト');
 assert.equal(await page.locator('.m3-toast-item').last().evaluate(e=>getComputedStyle(e).boxShadow),'none');assert.deepEqual(errors,[]);console.log(`${channel}: local recovery reload, mobile/desktop layout, explicit copy, preserved body and shadow-free notification PASS`);
 }finally{await browser.close()}
}
