import { chromium } from 'playwright-core';import assert from 'node:assert/strict';
for(const channel of ['chrome','msedge']){
 const browser=await chromium.launch({channel,headless:true});
 try{const page=await browser.newPage({viewport:{width:1100,height:850}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 await page.goto(process.env.TEST_BASE_URL||'http://127.0.0.1:5175');await page.locator('#btn-guest-login').click();await page.locator('#note-body').fill('分類しても本文を保持します');await page.locator('#note-title-input').fill('仕事のメモ');
 async function folder(name){await page.locator('[data-add]').click();await page.locator('.folder-dialog input[name=name]').fill(name);await page.locator('.folder-dialog button[type=submit]').click();}
 await folder('仕事');await page.locator('.note-folder-picker select').selectOption({label:'仕事'});await page.locator('.folder-filter').filter({hasText:'仕事'}).click();assert.equal(await page.locator('#note-body').inputValue(),'分類しても本文を保持します');
 await folder('個人');await page.locator('.folder-filter').filter({hasText:'個人'}).click();assert.equal(await page.locator('#note-body').inputValue(),'');assert.equal(await page.locator('#note-body').isDisabled(),true);
 await page.locator('#btn-new').click();await page.locator('#note-body').fill('個人用メモ');await page.locator('#note-title-input').fill('個人用');assert.equal(await page.locator('.note-folder-picker select').inputValue(),await page.locator('.folder-filter').filter({hasText:'個人'}).getAttribute('data-folder-id'));
 await page.locator('.note-folder-picker select').selectOption({label:'仕事'});assert.equal(await page.locator('.folder-filter[aria-pressed=true] .folder-name').innerText(),'仕事');
 await page.locator('.folder-row').filter({hasText:'個人'}).locator('[aria-label$="フォルダを削除"]').click();assert.equal(await page.locator('#note-body').inputValue(),'個人用メモ');
 assert.equal(await page.locator('.m3-toast-item').last().evaluate(e=>getComputedStyle(e).boxShadow),'none');
 for(const width of [1100,390]){await page.setViewportSize({width,height:850});if(width===390){await page.locator('#btn-folder-list').click();assert.equal(await page.locator('.folder-list').isVisible(),true);}assert.equal(await page.locator('.m3-top-app-bar').evaluate(e=>e.scrollWidth>e.clientWidth),false);await page.screenshot({path:`desktop-reports/folders-${channel}-${width}.png`});}
 await page.reload();await page.locator('#btn-guest-login').click();assert.equal(await page.locator('.folder-filter').filter({hasText:'仕事'}).count(),1);assert.deepEqual(errors,[]);console.log(`${channel}: create/filter/move/delete, reload persistence, mobile width and shadow-free theme PASS`);
 }finally{await browser.close()}
}
