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
  await page.locator('.folder-browser > summary').click();
  await page.getByRole('button',{name:'フォルダを管理'}).click();
  const travel=manager.locator('article').filter({has:page.getByRole('button',{name:'旅行を開く',exact:true})});
  await travel.getByRole('button',{name:'新しいメモ',exact:true}).click();
  await page.locator('#note-title-input').fill('持ち物');
  await page.locator('#note-body').fill('充電ケーブルと地図');
  await page.locator('#btn-folder-list').click();
  await page.locator('.folder-browser > summary').click();
  await page.getByRole('button',{name:'フォルダを管理'}).click();
  assert.match(await travel.innerText(),/充電ケーブルと地図/);
  await page.screenshot({path:`desktop-reports/folder-gallery-${channel}-390.png`});
  await page.setViewportSize({width:1100,height:800});
  assert.ok((await manager.boundingBox()).width>800);
  await page.screenshot({path:`desktop-reports/folder-gallery-${channel}-1100.png`});
  await page.setViewportSize({width:390,height:760});
  await travel.locator('.folder-card-previews button').click();
  assert.equal(await page.locator('#note-body').inputValue(),'充電ケーブルと地図');
  await page.locator('#btn-header-transfer').click();
  // Use a synthetic link to exercise the real waiting card without creating a room.
  await page.evaluate(()=>{
     document.getElementById('room-create-section').classList.add('hidden');
     document.getElementById('room-active-status').classList.remove('hidden');
     document.getElementById('room-status-url').textContent='https://flickmemo-qwe.web.app/?room=rm_'+'a'.repeat(32)+'#key='+'b'.repeat(64);
  });
  for(const width of [320,390,768,1100]) {
     await page.setViewportSize({width,height:760});
     const overflow=await page.locator('#transfer-panel').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,
       children:[...el.querySelectorAll('*')].filter(node=>node.getBoundingClientRect().right>el.getBoundingClientRect().right+1).slice(0,10).map(node=>node.id||node.className)}));
     assert.equal(overflow.scroll,overflow.width,JSON.stringify({width,overflow}));
     const card=await page.locator('#room-active-status').boundingBox();
     const buttons=await page.locator('.room-status-actions').boundingBox();
     assert.ok(buttons.x>=card.x && buttons.x+buttons.width<=card.x+card.width+1);
  }
  await page.setViewportSize({width:390,height:760});
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
  const inspectStorage = () => page.evaluate(async()=>({
     caches: await caches.keys(), databases: await indexedDB.databases(),
     usage: (await navigator.storage.estimate()).usage,
  }));
  const before=await inspectStorage();
  const payload=Buffer.alloc(16*1024*1024,0x7b);
  await page.locator('#file-input').setInputFiles({name:'large.bin',mimeType:'application/octet-stream',buffer:payload});
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));
  assert.equal(await page.locator('#staged-file-count').textContent(),'0');
  assert.equal(await page.locator('#file-input').evaluate(input=>input.files.length),0);
  const after=await inspectStorage();
  assert.deepEqual(after.caches,before.caches);
  assert.deepEqual(after.databases,before.databases);
  assert.ok(after.usage-before.usage < payload.length / 4,'Transfer must not enlarge persistent storage by the payload size');
  assert.deepEqual(errors,[]);
  console.log(`${channel}: folder management, restored folder, staged transfer, mobile layout and no payload-sized storage growth PASS`);
 } finally {await browser.close();}
}
