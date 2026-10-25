import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: process.env.TEST_BROWSER_CHANNEL || 'chrome', headless: true });
try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${process.env.TEST_BASE_URL || 'http://127.0.0.1:5175'}/tests/fixtures/history-browser.html`);
    await page.locator('#run').click();
    await page.waitForFunction(() => !!document.body.dataset.result, null, { timeout: 30_000 });
    const result = await page.locator('#result').textContent();
    assert.equal(await page.locator('body').getAttribute('data-result'), 'passed', result);
    assert.deepEqual(errors, []);
    assert.equal(JSON.parse(result).length, 12);
    console.log(`${await browser.version()}: ${result}`);
} finally { await browser.close(); }
