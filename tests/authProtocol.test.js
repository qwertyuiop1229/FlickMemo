import test from 'node:test';
import assert from 'node:assert/strict';
import { AUTH_ORIGIN, AUTH_TTL_MS, validAuthRequest, validAuthResponse, trustedAuthSender, authRequestFromUrl } from '../authProtocol.js';

const now = 1000000;
const request = { extensionId: 'a'.repeat(32), state: 'b'.repeat(64), createdAt: now };
const response = { type: 'FLICKMEMO_AUTH_SUCCESS', state: request.state, googleIdToken: 'test-token' };
test('auth accepts a fresh response bound to the requesting extension', () => {
    assert.equal(validAuthResponse(response, request, now), true);
    const url = `${AUTH_ORIGIN}/auth.html?${new URLSearchParams({ extension_id: request.extensionId, state: request.state, created_at: String(now) })}`;
    assert.deepEqual(authRequestFromUrl(url, now), request);
});
test('auth rejects unsolicited, expired, future, replayed or mismatched requests', () => {
    assert.equal(validAuthResponse(response, null, now), false);
    assert.equal(validAuthResponse({ ...response, state: 'c'.repeat(64) }, request, now), false);
    assert.equal(validAuthResponse(response, request, now + AUTH_TTL_MS), false);
    assert.equal(validAuthResponse(response, request, now - 1), false);
    assert.equal(validAuthResponse({ ...response, googleIdToken: {} }, request, now), false);
    assert.equal(validAuthResponse({ ...response, googleAccessToken: {} }, request, now), false);
    assert.equal(validAuthResponse({ ...response, googleIdToken: 'x'.repeat(16384) }, request, now), false);
    assert.equal(validAuthRequest({ ...request, extensionId: '../evil' }, now), false);
});
test('only the exact hosted auth origin and paths can relay tokens', () => {
    assert.equal(trustedAuthSender({ url: `${AUTH_ORIGIN}/auth.html?state=test` }), true);
    for (const url of ['https://evil.example/auth.html', `${AUTH_ORIGIN}.evil.example/auth.html`, `${AUTH_ORIGIN}/index.html`, 'null']) {
        assert.equal(trustedAuthSender({ url }), false, url);
    }
});
