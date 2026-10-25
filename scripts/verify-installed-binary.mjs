import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export function verifyInstalledBinary(original, installed) {
    // Tauri temporarily patches this exact marker for NSIS, then restores target/release.
    // Apply ONLY the same first-marker substitution to the expected bytes. Every other
    // byte must match; do not normalize arbitrary differences in an installed binary.
    const marker=Buffer.from('__TAURI_BUNDLE_TYPE_VAR_UNK');
    const offset=original.indexOf(marker);
    assert.ok(offset>=0,'Tauri bundle marker is missing from the original build');
    const expected=Buffer.from(original);Buffer.from('__TAURI_BUNDLE_TYPE_VAR_NSS').copy(expected,offset);
    assert.equal(hash(installed),hash(expected),'Installed binary differs beyond the expected NSIS bundle marker');
    return hash(installed);
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
    const digest=verifyInstalledBinary(await fs.readFile(process.argv[2]),await fs.readFile(process.argv[3]));
    console.log(JSON.stringify({sha256:digest}));
}
