import {chromium} from 'playwright-core';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
    await fs.mkdir('desktop-reports',{recursive:true});
    for(const [name,width,height] of [['desktop',1100,900],['mobile',390,844]]){
        const page=await browser.newPage({viewport:{width,height}});
        await page.goto('http://127.0.0.1:5175/tests/fixtures/history-design.html');
        await page.waitForFunction(()=>document.body.dataset.ready==='true');
        await page.screenshot({path:`desktop-reports/history-${name}.png`});
        assert.equal(await page.locator('dialog').evaluate(d=>d.scrollWidth>d.clientWidth),false,`${name} horizontal overflow`);
        assert.ok(await page.getByRole('button',{name:'閉じる',exact:true}).isVisible());
        await page.getByText('記録と同期の設定',{exact:true}).click();
        const visible=await page.getByRole('checkbox',{name:'今後コピーした文字を記録',exact:true}).boundingBox();
        assert.ok(visible&&visible.y>=0&&visible.y+visible.height<=height,`${name} controls clipped`);
        await page.screenshot({path:`desktop-reports/history-${name}-settings.png`});
        await page.close();
    }
    console.log('Desktop/mobile modal layout and expanded controls PASS; synthetic screenshots in desktop-reports/.');
}finally{await browser.close();}
