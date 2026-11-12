import {chromium} from 'playwright-core';import assert from 'node:assert/strict';
for(const channel of ['chrome','msedge']){
 const browser=await chromium.launch({channel,headless:true});
 try{const page=await browser.newPage({viewport:{width:1100,height:850}});await page.goto('http://127.0.0.1:5175');await page.locator('#btn-guest-login').click();
 await page.evaluate(async()=>{const{setupStartup}=await import('/platform/startup.js');let enabled=false;window.startupWrites=[];await setupStartup({api:{startupStatus:async()=>({enabled,asked:false}),startupSet:async value=>{window.startupWrites.push(value);enabled=value;return{enabled,asked:true}}}});});
 assert.deepEqual(await page.evaluate(()=>window.startupWrites),[]);await page.screenshot({path:`desktop-reports/startup-choice-${channel}.png`});await page.locator('#startup-choice-dialog [data-no]').click();assert.deepEqual(await page.evaluate(()=>window.startupWrites),[false]);
 await page.locator('#btn-settings-trigger').click();
 // This isolated Web fixture provides the native API stub above; expose its tab.
 await page.locator('[data-tab=system]').evaluate(e=>e.classList.remove('hidden'));
 await page.locator('[data-tab=system]').click();
 for(const width of [1100,390]){await page.setViewportSize({width,height:850});await page.locator('#startup-toggle').check();assert.match(await page.locator('#startup-status').innerText(),/オン/);
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('.startup-switch-track'),'::before').transform==='matrix(1, 0, 0, 1, 20, 0)');
 assert.equal(await page.locator('#startup-system-settings').evaluate(e=>e.scrollWidth>e.clientWidth),false);await page.screenshot({path:`desktop-reports/startup-settings-${channel}-${width}.png`});await page.locator('#startup-toggle').uncheck();}
 console.log(`${channel}: startup choice defaults off, Material switch toggles, mobile and desktop layout PASS`);
 }finally{await browser.close()}
}
