// Installer and real WebView2 migration check. Disposable GitHub Windows runner ONLY.
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawn,execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {chromium} from 'playwright-core';
import {verifyAsset} from './release.mjs';
import {verifyWindowsColors} from './verify-windows-colors.mjs';
if(process.env.GITHUB_ACTIONS!=='true'||process.platform!=='win32')throw new Error('Disposable GitHub Windows runner required');
const exec=promisify(execFile),delay=ms=>new Promise(r=>setTimeout(r,ms));
const baseline='1.3.91';
const {version}=JSON.parse(await fs.readFile('version.json','utf8'));
const root=await fs.mkdtemp(path.join(os.tmpdir(),'FlickMemo-upgrade-'));
const installRoot=path.join(root,'application');
const executable=path.join(installRoot,'flickmemo-desktop.exe');
const oldInstaller=path.join(root,'previous.exe');
const newInstaller=path.resolve(`src-tauri/target/release/bundle/nsis/FlickMemo_${version}_x64-setup.exe`);
const response=await fetch(`https://github.com/qwertyuiop1229/FlickMemo/releases/download/v${baseline}/FlickMemo-Setup.exe`,{signal:AbortSignal.timeout(60_000)});
assert.equal(response.status,200);const chunks=[];let size=0;
for await(const chunk of response.body){size+=chunk.length;if(size>3182418)throw new Error('Baseline installer exceeds known size');chunks.push(chunk);}
const bytes=Buffer.concat(chunks);
verifyAsset(bytes,{bytes:3182418,sha256:'2981e641b28857b540d11fd01a79ec49ffa3d3a1a648651fa58e7766839586c1'});
await fs.writeFile(oldInstaller,bytes);
function installer(file,args){return new Promise((resolve,reject)=>{
 const child=spawn(file,args,{windowsHide:true,stdio:'ignore'});
 const timer=setTimeout(()=>{child.kill();reject(new Error('Installer timeout'));},120_000);
 child.on('error',error=>{clearTimeout(timer);reject(error);});child.on('exit',code=>{clearTimeout(timer);code===0?resolve():reject(new Error(`Installer failed: ${code}`));});
});}
let application,browser;
// Hosted runners are elevated. WebView2 >=150 intentionally ignores WEBVIEW2_*
// environment overrides in elevated hosts. Scope HKLM test policies to this EXE
// only, and remove the values in finally. Never run this on a user's PC.
const policy='HKLM\\Software\\Policies\\Microsoft\\Edge\\WebView2';
const policyNames=['AdditionalBrowserArguments','UserDataFolder'];
async function configureWebview(){
 for(const [name,value] of [[policyNames[0],'--remote-debugging-port=9222'],[policyNames[1],path.join(root,'webview')]])
  await exec('reg.exe',['add',`${policy}\\${name}`,'/v','flickmemo-desktop.exe','/t','REG_SZ','/d',value,'/f'],{windowsHide:true});
}
async function open(){
 await fs.access(executable);
 application=spawn(executable,[],{windowsHide:true,stdio:'ignore',env:{...process.env,WEBVIEW2_USER_DATA_FOLDER:path.join(root,'webview'),WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS:'--remote-debugging-port=9222'}});
 const deadline=Date.now()+45_000;let connected=false;
 while(Date.now()<deadline){try{const r=await fetch('http://127.0.0.1:9222/json/version',{signal:AbortSignal.timeout(1000)});if(r.ok){connected=true;break;}}catch{}await delay(250);}
 assert.ok(connected,`WebView2 debugger did not start (application exit: ${application.exitCode})`);
 browser=await chromium.connectOverCDP('http://127.0.0.1:9222');
 let page;
 for(let n=0;n<100;n++){page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().includes('tauri.localhost'));if(page)break;await delay(100);}
 assert.ok(page,'Packaged app page missing');
 await page.locator('#btn-guest-login').click({timeout:30_000});
 return page;
}
async function close(page){
 const closed=page.waitForEvent('close',{timeout:25_000});
 await exec('powershell.exe',['-NoProfile','-File','scripts/close-upgrade-window.ps1','-ApplicationProcessId',String(application.pid),'-Executable',executable],{windowsHide:true});
 await closed; // exercises the app's actual save/drain/desktop_close handshake
 await browser.close().catch(()=>{});browser=null;
 application.kill();application=null;
 await delay(1500);
}
const sentinel='Upgrade regression 日本語😀\nPreserve committed notes and active selection.';
try{
 await configureWebview();
 await installer(oldInstaller,['/S',`/D=${installRoot}`]);
 let page=await open();await page.locator('#btn-new').click();await page.locator('#note-title-input').fill('Upgrade regression');await page.locator('#note-body').fill(sentinel);
 await close(page);
 await installer(newInstaller,['/S','/UPDATE',`/D=${installRoot}`]);
 page=await open();await page.waitForFunction(text=>document.getElementById('note-body').value===text,sentinel,{timeout:20_000});
 assert.equal(await page.locator('#note-body').inputValue(),sentinel);
 assert.equal(await page.locator('#note-title-input').inputValue(),'Upgrade regression');
 await page.locator('#btn-settings-trigger').click();await page.locator('[data-tab=about]').click();
 assert.equal((await page.locator('#app-version-display').innerText()).trim(),`v${version}`);
 await page.screenshot({path:'desktop-reports/upgrade-verified.png'});
 await page.locator('#btn-settings-close').click();await verifyWindowsColors(page,application.pid);await close(page);
 page=await open();
 const pickerSettings=await page.evaluate(()=>window.__TAURI_INTERNALS__.invoke('desktop_color_status'));
 assert.equal(pickerSettings.preferences.format,'rgb');assert.equal(pickerSettings.preferences.enabled,false);assert.equal(pickerSettings.preferences.remember,false);assert.deepEqual(pickerSettings.recent,[]);
 await close(page);
 await installer(path.join(installRoot,'uninstall.exe'),['/S',`_?=${installRoot}`]);
 await fs.writeFile('desktop-reports/upgrade.json',JSON.stringify({baseline,version,notePreserved:true,titlePreserved:true,activeNotePreserved:true,actualWindowClose:true,isolatedProfile:true},null,2));
 console.log(`Actual installed WebView2 ${baseline} -> ${version}: Japanese/emoji note, title, active note and save-on-close preserved PASS`);
}catch(error){
 const page=browser?.contexts().flatMap(c=>c.pages())[0];await page?.screenshot({path:'desktop-reports/upgrade-failure.png'}).catch(()=>{});throw error;
}finally{
 await browser?.close().catch(()=>{});application?.kill();
 for(const name of policyNames)await exec('reg.exe',['delete',`${policy}\\${name}`,'/v','flickmemo-desktop.exe','/f'],{windowsHide:true}).catch(()=>{});
}
