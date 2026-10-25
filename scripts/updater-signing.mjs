import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { releaseUrl } from './release.mjs';
export const updaterKeyPath = path.join(os.homedir(), '.flickmemo', 'updater-v1.key');
export async function verifySigningKey(root) {
    const config = JSON.parse(await fs.readFile(path.join(root,'src-tauri/tauri.conf.json'),'utf8'));
    const publicKey = (await fs.readFile(`${updaterKeyPath}.pub`,'utf8').catch(()=>{throw new Error('更新用署名鍵がありません。元の配信PCの署名鍵を安全に復元してください（鍵の再生成はしないでください）');})).trim();
    if(config.plugins?.updater?.pubkey !== publicKey) throw new Error('更新用署名鍵とアプリの公開鍵が一致しません');
    await fs.access(updaterKeyPath);
}
export async function signUpdate(root, release, installer) {
    await verifySigningKey(root);
    await new Promise((resolve,reject)=>{
        const child=spawn(process.execPath,[path.join(root,'node_modules/@tauri-apps/cli/tauri.js'),'signer','sign','--private-key-path',updaterKeyPath,'--app-version',release.version,installer],{
            cwd:root,shell:false,env:{...process.env,TAURI_SIGNING_PRIVATE_KEY_PASSWORD:''},stdio:['ignore','pipe','pipe']
        });
        // Signer output is intentionally not logged; only .sig is published.
        child.stdout.resume();child.stderr.resume();child.on('error',reject);
        child.on('exit',code=>code===0?resolve():reject(new Error('更新ファイルの署名に失敗しました')));
    });
    const signature=(await fs.readFile(`${installer}.sig`,'utf8')).trim();
    if(!signature || signature.length>8192) throw new Error('更新署名が不正です');
    return {version:release.version,notes:'FlickMemoの改善と不具合修正',pub_date:new Date().toISOString(),platforms:{'windows-x86_64':{
        url:releaseUrl(release.repository,release.version,'FlickMemo-Setup.exe'),signature
    }}};
}
