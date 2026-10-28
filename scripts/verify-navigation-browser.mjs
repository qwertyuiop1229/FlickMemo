import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
for (const channel of ['chrome', 'msedge']) {
 const browser = await chromium.launch({ channel, headless: true });
 try {
  const page = await browser.newPage({ viewport: { width: 1100, height: 850 } }); const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:5175'); await page.locator('#btn-guest-login').click();
  await page.locator('#note-body').fill('Navigation A'); await page.locator('#note-title-input').fill('A');
  await page.locator('#btn-new').click(); await page.locator('#note-body').fill('Navigation B'); await page.locator('#note-title-input').fill('B');
  await page.locator('#btn-back').click(); assert.equal(await page.locator('#note-body').inputValue(), 'Navigation A');
  await page.locator('#btn-forward').click(); assert.equal(await page.locator('#note-body').inputValue(), 'Navigation B');
  await page.locator('#btn-header-transfer').click(); await page.locator('#btn-back').click(); assert.equal(await page.locator('#note-body').inputValue(), 'Navigation B');
  for (const width of [1100, 390]) {
   await page.setViewportSize({ width, height: 850 });
   assert.equal(await page.locator('#btn-back').isVisible(), true); assert.equal(await page.locator('#btn-forward').isVisible(), true);
   assert.equal(await page.locator('.header-left .brand-logo').count(), 0);
   assert.equal(await page.locator('.m3-top-app-bar').evaluate(e => e.scrollWidth > e.clientWidth), false);
   await page.screenshot({ path: `desktop-reports/navigation-${channel}-${width}.png` });
  }
  assert.deepEqual(errors, []); console.log(`${channel}: note/transfer back-forward, permanent desktop/mobile buttons and no script errors PASS`);
 } finally { await browser.close(); }
}
