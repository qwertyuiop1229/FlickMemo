// Repository integration test: fresh, isolated headless browser profiles only.
// Requires a local Vite server, e.g. port 5174. Never uses a personal profile.
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5174';
const channel = process.env.TEST_BROWSER_CHANNEL || 'chrome';
const browser = await chromium.launch({ channel, headless: true });
try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/tests/fixtures/transfer-browser.html`, { waitUntil: 'networkidle' });
    await page.locator('#run').click();
    await page.waitForFunction(() => !!document.body.dataset.result, null, { timeout: 60000 });
    const status = await page.locator('#status').textContent();
    const checks = await page.locator('#results li').allTextContents();
    assert.equal(await page.locator('body').getAttribute('data-result'), 'passed', status);
    assert.equal(checks.length, 12);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ browser: channel, version: browser.version(), status, checks }, null, 2));
    await context.close();
} finally { await browser.close(); }
