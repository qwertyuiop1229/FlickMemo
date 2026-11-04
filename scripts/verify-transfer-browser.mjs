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
    // A large virtual source may legitimately take over a minute on a slow
    // browser. Poll a few times per second, avoiding a frame-by-frame observer.
    // The production transfer's 30-second no-progress watchdog remains tested.
    try { await page.waitForFunction(() => !!document.body.dataset.result, null, { timeout: 180000, polling: 250 }); }
    catch (error) { console.error('Transfer state at timeout:',await page.evaluate(()=>({status:document.getElementById('status').textContent,checks:document.querySelectorAll('#results li').length})));throw error; }
    const status = await page.locator('#status').textContent();
    const checks = await page.locator('#results li').allTextContents();
    assert.equal(await page.locator('body').getAttribute('data-result'), 'passed', status);
    assert.equal(checks.length, 13);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ browser: channel, version: browser.version(), status, checks }, null, 2));
    await context.close();
} finally { await browser.close(); }
