// Fresh headless profiles, synthetic picker and clipboard. No OS screen/input reads.
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5175';
for(const channel of ['chrome','msedge']){
 const browser=await chromium.launch({channel,headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1100,height:850}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.pickerCopies=[];window.EyeDropper=class{open(){return Promise.resolve({sRGBHex:'#2a79b4'});}};
   Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>window.pickerCopies.push(text)}});
  });
  await page.goto(base);await page.locator('#btn-guest-login').click();await page.locator('#btn-color-picker').click();
  await page.locator('#color-picker-dialog [data-pick]').click();await page.waitForFunction(()=>window.pickerCopies[0]==='#2A79B4');
  await page.locator('[data-format=rgb]').click();await page.locator('#color-picker-dialog [data-copy]').click();
  assert.equal(await page.evaluate(()=>window.pickerCopies.at(-1)),'rgb(42, 121, 180)');
  await page.screenshot({path:`desktop-reports/color-picker-${channel}.png`});
  await page.locator('#color-picker-dialog [data-close]').click();await page.locator('#btn-settings-trigger').click();await page.locator('[data-tab=colors]').click();
  await page.locator('.color-preferences [name=key]').fill('X');await page.locator('.color-preferences [name=remember]').uncheck();await page.locator('.color-preferences [type=submit]').click();
  await page.waitForFunction(()=>document.querySelector('.color-settings-status').textContent==='設定を保存しました');
  await page.screenshot({path:`desktop-reports/color-settings-${channel}.png`});
  await page.locator('#btn-settings-close').click();await page.keyboard.press('Control+Alt+x');
  await page.waitForFunction(()=>document.querySelector('#color-picker-dialog').open&&window.pickerCopies.length===3);
  assert.equal(await page.locator('.color-recent-swatch').count(),0);
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.locator('#color-picker-dialog').evaluate(e=>e.scrollWidth>e.clientWidth),false);
  await page.screenshot({path:`desktop-reports/color-picker-mobile-${channel}.png`});
  await page.locator('#color-picker-dialog [data-close]').click();await page.locator('#btn-settings-trigger').click();await page.locator('[data-tab=colors]').click();
  await page.screenshot({path:`desktop-reports/color-settings-mobile-${channel}.png`});
  assert.equal(await page.locator('#tab-content-colors').evaluate(e=>e.scrollWidth>e.clientWidth),false);
  assert.deepEqual(errors,[]);console.log(`${channel}: real UI, HEX/RGB copy, saved shortcut, no history, mobile dialog/settings and no script errors PASS`);
 }finally{await browser.close();}
}
