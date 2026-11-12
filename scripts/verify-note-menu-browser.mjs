import {chromium} from 'playwright-core';import assert from 'node:assert/strict';
for(const channel of ['chrome','msedge']){
 const browser=await chromium.launch({channel,headless:true});
 try{const page=await browser.newPage({viewport:{width:1100,height:850}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.TEST_BASE_URL||'http://127.0.0.1:5175');await page.locator('#btn-guest-login').click();
 await page.locator('#note-body').fill('編集中の本文はそのまま');await page.locator('#note-title-input').fill('編集中');await page.locator('#btn-new').click();await page.locator('#note-body').fill('移動対象の本文');await page.locator('#note-title-input').fill('移動するメモ');
 await page.locator('.folder-browser > summary').click();await page.locator('[data-add]').click();await page.locator('.folder-dialog input').fill('仕事とプロジェクト');await page.locator('.folder-dialog button[type=submit]').click();
 await page.locator('.note-item').filter({hasText:'編集中'}).click();let target=page.locator('.note-item').filter({hasText:'移動するメモ'});
 await target.click({button:'right'});const menu=page.locator('.note-actions-menu');await menu.waitFor({state:'visible'});assert.match(await menu.locator('.note-menu-location').innerText(),/未分類/);await menu.getByRole('button',{name:'フォルダを変更',exact:true}).click();await menu.getByRole('button',{name:'仕事とプロジェクト',exact:true}).click();
 await menu.waitFor({state:'hidden'});assert.equal(await page.locator('#note-body').inputValue(),'編集中の本文はそのまま');assert.equal(await page.locator('#note-title-input').inputValue(),'編集中');assert.match(await target.locator('.note-folder-location').innerText(),/仕事とプロジェクト/);
 assert.equal(await target.locator('.btn-note-more').evaluate(b=>b.nextElementSibling.classList.contains('btn-delete')),true);
 await target.locator('.btn-note-more').click();await menu.getByRole('button',{name:'ピン留め',exact:true}).click();await menu.waitFor({state:'hidden'});assert.equal(await target.locator('.pin-icon').count(),1);
 for(const width of [1100,390]){await page.setViewportSize({width,height:850});if(width===390)await page.locator('#btn-folder-list').click();await target.locator('.btn-note-more').click();await menu.getByRole('button',{name:'フォルダを変更',exact:true}).click();assert.equal(await menu.getByRole('button',{name:'仕事とプロジェクト',exact:true}).getAttribute('aria-pressed'),'true');const box=await menu.boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=width&&box.y+box.height<=850);await page.screenshot({path:`desktop-reports/note-menu-${channel}-${width}.png`});await page.keyboard.press('Escape');await menu.waitFor({state:'hidden'});}
 await page.locator('.folder-browser > summary').click();await page.locator('.folder-filter').filter({hasText:'仕事とプロジェクト'}).click();assert.equal(await page.locator('.note-item').count(),1);assert.equal(await page.locator('.note-item .note-folder-location').count(),0);assert.equal(await page.locator('.folder-current').innerText(),'仕事とプロジェクト');assert.deepEqual(errors,[]);
 console.log(`${channel}: adjacent overflow/right-click, non-active move preserving editor, location labels, pin, selected folder, Escape and mobile bounds PASS`);
 }finally{await browser.close()}
}
