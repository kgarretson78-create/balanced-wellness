import { spawn } from 'node:child_process';
const server=spawn(process.execPath,['dist-server/index.js'],{env:{...process.env,PORT:'3109'},stdio:'ignore'});
process.on('exit',()=>server.kill());
await new Promise(resolve=>setTimeout(resolve,1500));
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
for(const viewport of [{width:1440,height:1100},{width:390,height:844}]){
 const page=await browser.newPage({viewport}); const errors=[],tracking=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().includes('/api/track'))tracking.push(r.url());});
 await page.goto('http://127.0.0.1:3109/anniversary');await page.getByRole('heading',{name:'Celebrating five years of Balanced'}).waitFor();
 await page.waitForTimeout(500);
 assert.equal(await page.getByRole('link',{name:'Book an appointment',exact:true}).getAttribute('href'),'https://booking.podium.com/medspa/01930831-564b-7342-98d8-620e43a707e7');
 assert.ok((await page.locator('body').innerText()).includes('1309 S John B Dennis Hwy, Suite 104'));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.balancedmedicalspa.com/anniversary');
 await page.screenshot({path:`qa/anniversary-${viewport.width}.png`,fullPage:true});
 await page.goto('http://127.0.0.1:3109/bootox?private=do-not-forward');assert.equal(new URL(page.url()).pathname,'/anniversary');assert.equal(new URL(page.url()).search,'');
 await page.goto('http://127.0.0.1:3109/');await page.getByRole('link',{name:/Celebrating five years/}).click();await page.getByRole('heading',{name:'Celebrating five years of Balanced'}).waitFor();
 // Normal SPA navigation via the existing navbar, then back to event.
 await page.locator('a[href="/about"]:visible').last().click({force:true});
 await page.getByRole('link',{name:/Celebrating five years/}).click();
 assert.equal(tracking.length,0);assert.deepEqual(errors,[]);await page.close();
}
const response=await fetch('http://127.0.0.1:3109/bootox',{redirect:'manual'});assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/anniversary');
const sitemap=await (await fetch('http://127.0.0.1:3109/sitemap.xml')).text();assert.ok(sitemap.includes('/anniversary'));assert.ok(!sitemap.includes('/bootox'));
await browser.close();server.kill();console.log('PASS desktop/mobile, navigation, metadata, booking links, redirect, sitemap, no tracking requests or runtime errors');
