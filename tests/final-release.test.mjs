import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {runInNewContext} from 'node:vm';
const files=d=>readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(d,e.name)):[join(d,e.name)]);
const bundle=files('dist/assets').find(p=>/index-anniversary-.*\.js$/.test(p));
const js=readFileSync(bundle,'utf8');
test('final shipped build contains no active retired links, promotions or unsafe tracker',()=>{
 for(const p of files('dist').filter(p=>/\.(html|js|xml)$/.test(p))) assert.doesNotMatch(readFileSync(p,'utf8'),/\/bootox|BOO-TOX|Spooky-chic|Event-only beauty offers|bw_session_id|document\.referrer/,p);
});
test('final shipped build preserves prior hours, payments, founder and house corrections',()=>{
 const kingsport=runInNewContext('('+js.match(/wT=(\{display:.*?\}),jT=/)[1]+')');
 const jonesborough=runInNewContext('('+js.match(/jT=(\{display:.*?\}),Ln=/)[1]+')');
 assert.equal(kingsport.display.find(r=>r.days==='Saturday').time,'Closed');
 assert.equal(kingsport.display[0].time,'10:00 AM - 7:00 PM');
 assert.equal(jonesborough.display[0].time,'10:00 AM - 6:00 PM');
 assert.equal(jonesborough.display[1].time,'9:00 AM - 1:00 PM');
 const payment=JSON.parse(readFileSync('src/lib/payment-options.json','utf8'));
 assert.ok(js.includes(payment.availability));assert.ok(js.includes('jobTitle:"COO"'));
 assert.ok(js.includes('jonesborough-house-owner-photo'));
 for(const p of files('dist').filter(p=>p.endsWith('.html')))assert.doesNotMatch(readFileSync(p,'utf8'),/By Appointment Only|Saturdays? by appointment|CareCredit and Ally financing/i,p);
});
test('event metadata and sitemap are current in the shipped build',()=>{
 const html=readFileSync('dist/anniversary/index.html','utf8');
 assert.ok(html.includes('Saturday, December 5, 2026'));assert.ok(html.includes('2–7 PM Eastern'));assert.ok(html.includes('1309 S John B Dennis Hwy'));
 assert.ok(html.includes('rel="canonical" href="https://www.balancedmedicalspa.com/anniversary"'));
 assert.match(readFileSync('dist/sitemap.xml','utf8'),/\/anniversary<\/loc>\s*<lastmod>2026-11-05<\/lastmod>/);
});
