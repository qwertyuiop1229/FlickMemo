// One-time setup. Never rotate an installed application's key automatically.
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { updaterKeyPath } from './updater-signing.mjs';
const configPath='src-tauri/tauri.conf.json';
const config=JSON.parse(await fs.readFile(configPath,'utf8'));
if(config.plugins?.updater?.pubkey) throw new Error('公開鍵は設定済みです。鍵を再生成せず、既存の秘密鍵を復元してください');
const directory=path.dirname(updaterKeyPath);
await fs.mkdir(directory,{recursive:true,mode:0o700});
if(process.platform==='win32'){
    const sid=spawnSync('powershell.exe',['-NoProfile','-Command','[System.Security.Principal.WindowsIdentity]::GetCurrent().User.Value'],{encoding:'utf8'});
    if(sid.status!==0||!/^S-1-5-/.test(sid.stdout.trim())) throw new Error('署名鍵フォルダを保護できません');
    const acl=spawnSync('icacls.exe',[directory,'/inheritance:r','/grant:r',`*${sid.stdout.trim()}:(OI)(CI)F`],{encoding:'utf8'});
    if(acl.status!==0) throw new Error('署名鍵フォルダを保護できません');
}
try{await fs.access(updaterKeyPath);throw new Error('秘密鍵は既にあります。上書きしません');}catch(error){if(error.code!=='ENOENT')throw error;}
const generated=spawnSync(process.execPath,['node_modules/@tauri-apps/cli/tauri.js','signer','generate','--ci','--write-keys',updaterKeyPath],{encoding:'utf8'});
if(generated.status!==0) throw new Error('更新用署名鍵を作成できませんでした');
config.plugins={...config.plugins,updater:{pubkey:(await fs.readFile(`${updaterKeyPath}.pub`,'utf8')).trim(),endpoints:['https://flickmemo-qwe.web.app/windows/update.json'],requireSignedVersion:true,windows:{installMode:'passive'}}};
await fs.writeFile(configPath,JSON.stringify(config,null,2)+'\n');
console.log('更新用署名鍵をユーザー専用フォルダに保存し、公開鍵をアプリに設定しました。秘密鍵はGitHub・Webには送信しません。');
