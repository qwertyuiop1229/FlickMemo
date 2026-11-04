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
const baseline='1.3.111';
const {version}=JSON.parse(await fs.readFile('version.json','utf8'));
const root=await fs.mkdtemp(path.join(os.tmpdir(),'FlickMemo-upgrade-'));
const installRoot=path.join(root,'application');
const executable=path.join(installRoot,'flickmemo-desktop.exe');
const oldInstaller=path.join(root,'previous.exe');
const newInstaller=path.resolve(`src-tauri/target/release/bundle/nsis/FlickMemo_${version}_x64-setup.exe`);
const response=await fetch(`https://github.com/qwertyuiop1229/FlickMemo/releases/download/v${baseline}/FlickMemo-Setup.exe`,{signal:AbortSignal.timeout(60_000)});
assert.equal(response.status,200);const chunks=[];let size=0;
for await(const chunk of response.body){size+=chunk.length;if(size>3282263)throw new Error('Baseline installer exceeds known size');chunks.push(chunk);}
const bytes=Buffer.concat(chunks);
verifyAsset(bytes,{bytes:3282263,sha256:'4ab065c42230376f0a526f81b99f475e2d25e1c7bb85c804e84477f6169d55d6'});
await fs.writeFile(oldInstaller,bytes);
function installer(file,args){return new Promise((resolve,reject)=>{
 const child=spawn(file,args,{windowsHide:true,stdio:'ignore'});
 const timer=setTimeout(()=>{child.kill();reject(new Error('Installer timeout'));},120_000);
 child.on('error',error=>{clearTimeout(timer);reject(error);});child.on('exit',code=>{clearTimeout(timer);code===0?resolve():reject(new Error(`Installer failed: ${code}`));});
});}
let application,browser,currentTarget;
const retiredTargets=new Set();
async function stage(name,work,timeout=15000){
 console.log('Upgrade stage:',name);
 await fs.writeFile('desktop-reports/upgrade-stage.json',JSON.stringify({name,at:new Date().toISOString(),pid:application?.pid,target:currentTarget},null,2));
 let timer;
 try{return await Promise.race([work(),new Promise((_,reject)=>timer=setTimeout(()=>reject(new Error(`Upgrade stage timed out: ${name}`)),timeout))]);}
 finally{clearTimeout(timer);}
}
async function nativeWindow(){return JSON.parse((await exec('powershell.exe',['-STA','-NoProfile','-File','scripts/color-picker-ci-input.ps1','-Action','window','-ApplicationProcessId',String(application.pid)],{windowsHide:true,timeout:10000})).stdout);}
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
 while(Date.now()<deadline){try{const r=await fetch('http://127.0.0.1:9222/json/list',{signal:AbortSignal.timeout(1000)});if(r.ok){const target=(await r.json()).find(t=>t.type==='page'&&t.url.includes('tauri.localhost')&&!retiredTargets.has(t.id));if(target){currentTarget=target.id;connected=true;break;}}}catch{}await delay(250);}
 assert.ok(connected,`WebView2 debugger did not start (application exit: ${application.exitCode})`);
 browser=await chromium.connectOverCDP('http://127.0.0.1:9222',{timeout:15000});
 let page;
 for(let n=0;n<100;n++){for(const candidate of browser.contexts().flatMap(c=>c.pages()).filter(p=>p.url().includes('tauri.localhost'))){const session=await candidate.context().newCDPSession(candidate);try{const {targetInfo}=await session.send('Target.getTargetInfo');if(targetInfo.targetId===currentTarget){page=candidate;break;}}finally{await session.detach();}}if(page)break;await delay(100);}
 assert.ok(page,'Packaged app page missing');
 page.setDefaultTimeout(15000);
 console.log('Opened app target:',currentTarget,'PID:',application.pid);
 if(await page.locator('#startup-system-settings').count()){
  const status=await page.evaluate(()=>window.__TAURI_INTERNALS__.invoke('desktop_startup_status'));
  if(!status.asked)await page.locator('#startup-choice-dialog [data-no]').click({timeout:15_000});
 }
 await stage('guest login',()=>page.locator('#btn-guest-login').click({timeout:15000}),17000);
 return page;
}
async function close(page){
 const old=await stage('read close mode',async()=>await page.locator('#btn-forward').count()===0);
 const requestClose=()=>exec('powershell.exe',['-NoProfile','-File','scripts/close-upgrade-window.ps1','-ApplicationProcessId',String(application.pid),'-Executable',executable],{windowsHide:true,timeout:25000});
 if(old){const closed=page.waitForEvent('close',{timeout:25_000});await requestClose();await closed;}
 else {
  const marker=await stage('create retained marker',()=>page.evaluate(()=>{window.__retainedMarker=crypto.randomUUID();return window.__retainedMarker;}));
  const memo=await stage('read retained memo',()=>page.locator('#note-body').inputValue());
  await stage('save and hide native window',requestClose,27000);
  console.log('Native hidden state:',await nativeWindow());
  assert.equal(page.isClosed(),false,'Close must retain the WebView');
  // A second instance must reopen the existing window without document navigation.
  await stage('reopen by second instance',()=>exec(executable,[],{windowsHide:true,timeout:15000}),17000);
  const native=await nativeWindow();console.log('Native reopened state:',native);assert.equal(native.visible,true);
  await stage('resume retained renderer',()=>page.waitForFunction(()=>document.visibilityState==='visible',null,{timeout:15000,polling:100}),17000);
  assert.equal(await stage('read retained marker',()=>page.evaluate(()=>window.__retainedMarker)),marker,'Reopen must keep the same JavaScript document');
  assert.equal(await stage('read reopened memo',()=>page.locator('#note-body').inputValue()),memo);
  await stage('hide reopened native window',requestClose,27000);
 }
 retiredTargets.add(currentTarget);
 await stage('disconnect CDP',()=>browser.close(),5000);browser=null;
 const endingApplication=application;application=null;
 if(endingApplication.exitCode===null){const exited=new Promise(resolve=>endingApplication.once('exit',resolve));endingApplication.kill();await stage('terminate test app',()=>exited,5000);}
 await delay(1500);
}
const sentinel='Upgrade regression 日本語😀\nPreserve committed notes and active selection.';
try{
 await configureWebview();
 await installer(oldInstaller,['/S',`/D=${installRoot}`]);
 let page=await open();await page.locator('#btn-new').click();await page.locator('#note-title-input').fill('Upgrade regression');await page.locator('#note-body').fill(sentinel);
 await verifyWindowsColors(page,application.pid,{baseline:true});
 await close(page);
 await installer(newInstaller,['/S','/UPDATE',`/D=${installRoot}`]);
 page=await open();await page.waitForFunction(text=>document.getElementById('note-body').value===text,sentinel,{timeout:20_000});
 assert.equal(await page.locator('#note-body').inputValue(),sentinel);
 assert.equal(await page.locator('#note-title-input').inputValue(),'Upgrade regression');
 await page.locator('#btn-settings-trigger').click();await page.locator('[data-tab=about]').click();
 assert.equal((await page.locator('#app-version-display').innerText()).trim(),`v${version}`);
 await page.screenshot({path:'desktop-reports/upgrade-verified.png'});
 await page.locator('#btn-settings-close').click();await verifyWindowsColors(page,application.pid);await close(page);
 page=await stage('relaunch after picker tests',open,60000);
 const pickerSettings=await stage('read persisted color settings',()=>page.evaluate(()=>window.__TAURI_INTERNALS__.invoke('desktop_color_status')));
 assert.equal(pickerSettings.preferences.format,'rgb');assert.equal(pickerSettings.preferences.enabled,false);assert.equal(pickerSettings.preferences.remember,false);assert.deepEqual(pickerSettings.recent,[]);
 await stage('enable Windows startup',()=>page.evaluate(()=>window.__TAURI_INTERNALS__.invoke('desktop_startup_set',{enable:true})));
 const startup = await page.evaluate(()=>window.__TAURI_INTERNALS__.invoke('desktop_startup_status'));
 assert.equal(startup.enabled,true);assert.equal(startup.asked,true);
 await page.evaluate(()=>window.__TAURI_INTERNALS__.invoke('desktop_startup_set',{enable:false}));
 assert.equal((await page.evaluate(()=>window.__TAURI_INTERNALS__.invoke('desktop_startup_status'))).enabled,false);
 await page.evaluate(()=>window.__TAURI_INTERNALS__.invoke('desktop_startup_set',{enable:true}));
 await close(page);
 await installer(path.join(installRoot,'uninstall.exe'),['/S',`_?=${installRoot}`]);
 await assert.rejects(exec('reg.exe',['query','HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run','/v','FlickMemo'],{windowsHide:true}));
 await fs.writeFile('desktop-reports/upgrade.json',JSON.stringify({baseline,version,notePreserved:true,titlePreserved:true,activeNotePreserved:true,actualWindowClose:true,retainedWebView:true,isolatedProfile:true},null,2));
 console.log(`Actual installed WebView2 ${baseline} -> ${version}: Japanese/emoji note, title, active note and save-on-close preserved PASS`);
}catch(error){
 console.error(error);if(application){console.error('Native failure state:',await nativeWindow().catch(e=>String(e)));}
 const page=browser?.contexts().flatMap(c=>c.pages())[0];if(page)await Promise.race([page.screenshot({path:'desktop-reports/upgrade-failure.png',timeout:5000}).catch(()=>{}),delay(5500)]);throw error;
}finally{
 application?.kill();await Promise.race([browser?.close().catch(()=>{}),delay(5000)]);
 for(const name of policyNames)await exec('reg.exe',['delete',`${policy}\\${name}`,'/v','flickmemo-desktop.exe','/f'],{windowsHide:true}).catch(()=>{});
}
