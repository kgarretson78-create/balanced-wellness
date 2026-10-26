import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
const read=(p:string)=>readFileSync(p,'utf8');
test('homepage editorial images are available and not labeled as treatment results',()=>{
 const home=read('src/pages/Home.tsx');
 for(const path of [...home.matchAll(/src="(\/images\/editorial\/[^"]+)"/g)].map(m=>m[1])) assert.ok(existsSync('public'+path),path);
 assert.match(home,/Editorial beauty portrait/);
 assert.doesNotMatch(home,/before.and.after|guaranteed result/i);
});
test('booking remains location specific with a general chooser',()=>{
 const home=read('src/pages/Home.tsx');
 assert.match(home,/href=\{location.bookingUrl\}/);
 assert.match(home,/setPreferredLocation\(space.id\)/);
 assert.match(home,/openBookingChooser/);
 const booking=read('src/lib/booking.ts');
 assert.match(booking,/01930831-564b-7342-98d8-620e43a707e7/);
 assert.match(booking,/019c25c3-bfb8-7652-9b53-3b7f41adc505/);
});
test('offers are visitor opened and competing floating widgets are removed',()=>{
 const popup=read('src/components/EmailSignupPopup.tsx');
 assert.match(popup,/balanced:open-offers/);
 assert.doesNotMatch(popup,/8000|8_000|setTimeout\([^]*setIsOpen\(true\)/);
 const app=read('src/App.tsx');
 assert.doesNotMatch(app,/<FloatingBookButton|<CherryFinancingWidget/);
 assert.match(read('src/components/layout/Footer.tsx'),/balanced:open-offers/);
});
test('editorial navigation destinations resolve to existing app routes',()=>{
 const routes=read('src/App.tsx');
 const nav=read('src/components/layout/Navbar.tsx');
 for(const m of nav.matchAll(/(?:path: |href=)"(\/[^"#]+)"/g)) assert.ok(routes.includes(`path="${m[1]}"`),m[1]);
 assert.match(nav,/aria-expanded/);
 assert.doesNotMatch(nav,/skin-analyzer/);
});
