// Administrative maintenance only. Never imported by the app or shipped in dist.
// Preserve the currently deployed authorization rules; change only two indexes.
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const require = createRequire(import.meta.url);
const cli = path.join(process.env.APPDATA || '', 'npm/node_modules/firebase-tools/lib/auth.js');
const auth = require(cli);
const account = auth.getGlobalDefaultAccount();
if (!account?.tokens?.refresh_token) throw new Error('Firebase CLIにログインしてください');
const tokens = account.tokens.expires_at > Date.now() ? account.tokens : await auth.getAccessToken(account.tokens.refresh_token, []);
const endpoint = new URL('https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app/.settings/rules.json');
endpoint.searchParams.set('access_token', tokens.access_token);
const headers = { Authorization: `Bearer ${tokens.access_token}` };
const response = await fetch(endpoint, { headers });
if (!response.ok) throw new Error(`Cannot retrieve deployed rules (${response.status})`);
const original = await response.json();
const changed = structuredClone(original);
const users = changed.rules?.users?.$uid;
if (!users || users['.read'] !== 'auth != null && auth.uid === $uid' || users['.write'] !== 'auth != null && auth.uid === $uid') {
    throw new Error('既存のアカウント認可ルールが想定と異なるため変更を中止しました');
}
for (const name of ['clipboardHistory', 'liveSelection']) {
    users[name] ||= {};
    const indexes = users[name]['.indexOn'] || [];
    users[name]['.indexOn'] = [...new Set([...(Array.isArray(indexes) ? indexes : [indexes]), 'updatedAt'])];
}
// The only permitted diff is .indexOn in those exact paths.
const compare = structuredClone(changed);
for (const name of ['clipboardHistory', 'liveSelection']) {
    if (original.rules.users.$uid[name]) compare.rules.users.$uid[name] = original.rules.users.$uid[name];
    else delete compare.rules.users.$uid[name];
}
assert.deepEqual(compare, original);
await fs.mkdir(new URL('../desktop-reports/', import.meta.url), { recursive: true });
await fs.writeFile(new URL('../desktop-reports/deployed-rules-backup.json', import.meta.url), JSON.stringify(original, null, 2));
await fs.writeFile(new URL('../desktop-reports/history-indexes-review.json', import.meta.url), JSON.stringify(changed, null, 2));
if (process.argv.includes('--apply')) {
    const put = await fetch(endpoint, { method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(changed) });
    if (!put.ok) throw new Error(`Index update rejected (${put.status})`);
    const verify = await fetch(endpoint, { headers });
    if (!verify.ok) throw new Error('Index update could not be verified');
    assert.deepEqual(await verify.json(), changed);
    console.log('Verified: only clipboardHistory/liveSelection indexes changed; all deployed authorization rules preserved.');
} else console.log('Review prepared: desktop-reports/history-indexes-review.json; no deployed rules changed.');
