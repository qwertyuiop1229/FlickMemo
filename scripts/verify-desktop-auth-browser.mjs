// Real Chromium navigation with synthetic credentials only; no Google login or account data.
import http from 'node:http';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
const origin='https://flickmemo-qwe.web.app';
for(const channel of ['chrome','msedge']){
    const state='a'.repeat(64);let received;
    const server=http.createServer((req,res)=>{let body='';req.on('data',data=>body+=data);req.on('end',()=>{
        received={method:req.method,path:req.url,origin:req.headers.origin,body:Object.fromEntries(new URLSearchParams(body))};
        res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Content-Security-Policy',"default-src 'none'");res.end('<p>synthetic callback received</p>');
    });});
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    const port=server.address().port;const browser=await chromium.launch({channel,headless:true});
    try{
        const page=await browser.newPage();
        await page.route(`${origin}/auth?**`,async route=>route.fulfill({body:await fs.readFile('auth.html','utf8'),headers:{'Content-Type':'text/html','Referrer-Policy':'no-referrer'}}));
        await page.route(`${origin}/auth.js`,async route=>route.fulfill({contentType:'application/javascript',body:(await fs.readFile('auth.js','utf8')).replaceAll("'firebase/app'","'/fake-app.js'").replaceAll("'firebase/auth'","'/fake-auth.js'")}));
        await page.route(`${origin}/authProtocol.js`,async route=>route.fulfill({contentType:'application/javascript',body:await fs.readFile('authProtocol.js','utf8')}));
        await page.route(`${origin}/fake-app.js`,route=>route.fulfill({contentType:'application/javascript',body:'export const initializeApp=()=>({});'}));
        await page.route(`${origin}/fake-auth.js`,route=>route.fulfill({contentType:'application/javascript',body:`export const getAuth=()=>({}),setPersistence=async()=>{},inMemoryPersistence={},getRedirectResult=async()=>null,signInWithPopup=async()=>({}),signInWithRedirect=async()=>{};export class GoogleAuthProvider{setCustomParameters(){}static credentialFromResult(){return{idToken:'synthetic-id',accessToken:'synthetic-access'};}}`}));
        await page.goto(`${origin}/auth?desktop_port=${port}&state=${state}&created_at=${Date.now()}`);
        await page.locator('#btn-login-manual').click();await page.waitForURL(`http://127.0.0.1:${port}/callback`);
        assert.deepEqual(received,{method:'POST',path:'/callback',origin,body:{state,googleIdToken:'synthetic-id',googleAccessToken:'synthetic-access'}});
        assert.ok(!page.url().includes('synthetic-id'));
        console.log(`${channel}: real HTTPS -> loopback POST preserves strict Origin with no-referrer Hosting policy PASS`);
    }finally{await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
}
