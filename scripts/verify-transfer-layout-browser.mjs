import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
for (const channel of ['chrome','msedge']) {
 const browser=await chromium.launch({channel,headless:true});
 try {
  const page=await browser.newPage({viewport:{width:390,height:760},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5175');
  await page.locator('#btn-guest-login').click();
  await page.locator('.folder-browser > summary').click();
  await page.getByRole('button',{name:'フォルダを管理'}).click();
  const manager=page.locator('.folder-manager');
  await manager.getByRole('button',{name:'作成'}).click();
  await page.locator('.folder-dialog form input').fill('遠足');
  await page.locator('.folder-dialog form button[type=submit]').click();
  await manager.getByRole('button',{name:'名前変更'}).click();
  await page.locator('.folder-dialog form input').fill('旅行');
  await page.locator('.folder-dialog form button[type=submit]').click();
  await manager.getByRole('searchbox').fill('存在しない');
  assert.match(await manager.innerText(),/一致するフォルダがありません/);
  await manager.getByRole('button',{name:'閉じる'}).click();
  await page.locator('.folder-browser > summary').click();
  await page.locator('.folder-filter').filter({hasText:'旅行'}).click();
  await page.reload();await page.locator('#btn-guest-login').click();
  assert.equal(await page.locator('.folder-current').innerText(),'旅行');
  await page.locator('#btn-header-transfer').click();
  assert.equal(await page.locator('.transfer-options').getAttribute('open'),null);
  assert.equal(await page.locator('.transfer-storage-tools [data-cancel]').isVisible(),false);
  // Preview the connected layout without opening a public sharing room.
  await page.evaluate(()=>{document.getElementById('transfer-step-connect').classList.add('hidden');document.getElementById('transfer-step-session').classList.remove('hidden');});
  await page.locator('#file-input').setInputFiles({name:'test.txt',mimeType:'text/plain',buffer:Buffer.from('sample')});
  assert.equal(await page.locator('#dropzone-area').isVisible(),false);
  assert.equal(await page.locator('#btn-start-send').isVisible(),true);
  assert.equal(await page.locator('#transfer-panel').evaluate(el=>el.scrollHeight>el.clientHeight),false);
  await page.screenshot({path:`desktop-reports/transfer-${channel}-390.png`});
  await page.setViewportSize({width:1100,height:800});
  await page.screenshot({path:`desktop-reports/transfer-${channel}-1100.png`});
  assert.deepEqual(errors,[]);
  console.log(`${channel}: folder management, restored folder, staged transfer and mobile layout PASS`);
 } finally {await browser.close();}
}
