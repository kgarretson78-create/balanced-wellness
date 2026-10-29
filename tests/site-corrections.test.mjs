import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { createHash } from 'node:crypto';
import { applySiteCorrections } from '../scripts/apply-site-corrections.mjs';

const release = 'releases/2026-10-26-approved/client';
const payment = JSON.parse(readFileSync('src/lib/payment-options.json', 'utf8'));
const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((x) => x.isDirectory() ? files(join(dir, x.name)) : [join(dir, x.name)]);
const hash = (b) => createHash('sha256').update(b).digest('hex');
const fixture = (t) => {
  const root = mkdtempSync(join(tmpdir(), 'balanced-corrections-'));
  cpSync(release, root, { recursive: true });
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
};
const jsonLd = (html) => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => ({ tag: m[0], data: JSON.parse(m[1]) }));

test('owner-confirmed financing reaches all rendered FAQs, schema and provider cards', (t) => {
  const root = fixture(t); applySiteCorrections(root);
  const js = readFileSync(join(root, 'assets/index-B-dTmdU7.js'), 'utf8');
  const cards = JSON.parse(js.match(/const XE=(\[.*?\]),ZE=/)[1]);
  assert.deepEqual(cards.slice(1, 7).map((x) => x.name), payment.providers);
  assert.ok(cards.slice(1, 7).every((x) => x.desc === payment.providerDescription));
  assert.ok(js.includes(payment.availability));
  assert.ok(!js.includes('interest-free installments'));
  assert.ok(!js.includes('CareCredit and Ally financing'));
  for (const page of files(root).filter((x) => x.endsWith('.html'))) {
    const html = readFileSync(page, 'utf8');
    assert.ok(!html.includes('CareCredit and Ally financing'), page);
    for (const { data } of jsonLd(html).filter(({data}) => data['@type'] === 'MedicalBusiness')) {
      assert.equal(data.paymentAccepted, payment.paymentAccepted, page);
    }
  }
});

test('one stable organization ID in every page that originally had business schema', (t) => {
  const root = fixture(t); applySiteCorrections(root);
  for (const path of files(root).filter((x) => x.endsWith('.html'))) {
    const html = readFileSync(path, 'utf8');
    const business = jsonLd(html).filter(({data}) => data['@type'] === 'MedicalBusiness');
    assert.ok(business.length <= 1, path);
    if (business.length) assert.ok(business[0].tag.includes('id="local-business-schema"'), path);
  }
});

test('actual compiled schema effect reuses static script and remains single across remount', (t) => {
  const root = fixture(t); applySiteCorrections(root);
  const js = readFileSync(join(root, 'assets/index-B-dTmdU7.js'), 'utf8');
  const marker = js.indexOf('local-business-schema');
  const start = js.lastIndexOf('function ', marker), end = js.indexOf('function ', marker);
  const fn = js.slice(start, end), name = fn.match(/^function (\w+)/)[1];
  const nodes = [{ id: 'local-business-schema', textContent: '{}' }];
  let cleanup;
  const document = {
    getElementById: (id) => nodes.find((x) => x.id === id),
    createElement: () => ({}),
    head: { appendChild: (el) => { el.remove = () => nodes.splice(nodes.indexOf(el), 1); nodes.push(el); } },
  };
  nodes[0].remove = () => nodes.splice(0, 1);
  const context = { document, kv: [], HE: [], v: { useEffect: (effect) => { cleanup = effect(); } } };
  runInNewContext(`${fn}; ${name}();`, context);
  assert.equal(nodes.length, 1);
  const data = JSON.parse(nodes[0].textContent);
  assert.equal(data.founder.jobTitle, 'COO');
  assert.equal(data.paymentAccepted, payment.paymentAccepted);
  // A non-schema route does not mount another effect. Unmount must retain the node.
  if (cleanup) cleanup();
  assert.equal(nodes.length, 1);
  runInNewContext(`${name}();`, context); assert.equal(nodes.length, 1);
});

test('route titles/canonicals match existing client metadata, booking aliases stay canonical', (t) => {
  const root = fixture(t); applySiteCorrections(root);
  for (const route of ['about', 'contact', 'book', 'book-now', 'social-booking', 'flexible-payments', 'gallery']) {
    const html = readFileSync(join(root, route, 'index.html'), 'utf8');
    const canonical = ['book', 'social-booking'].includes(route) ? 'book-now' : route;
    assert.ok(html.includes(`rel="canonical" href="https://www.balancedmedicalspa.com/${canonical}"`), route);
    assert.ok(!html.includes('<title>Balanced Wellness Medical Spa |'), route);
    assert.ok(!jsonLd(html).some(({data}) => data['@type'] === 'FAQPage' && data.url === 'https://www.balancedmedicalspa.com/'), route);
  }
});

test('keeps all link destinations, styling and image bytes unchanged', (t) => {
  const root = fixture(t); applySiteCorrections(root);
  for (const beforePath of files(release)) {
    const path = join(root, beforePath.slice(release.length + 1));
    const before = readFileSync(beforePath), after = readFileSync(path);
    if (path.endsWith('.html')) {
      const anchors = (s) => [...s.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((m) => m[1]);
      assert.deepEqual(anchors(after.toString()), anchors(before.toString()), path);
    } else if (!path.endsWith('/assets/index-B-dTmdU7.js')) assert.equal(hash(after), hash(before), path);
  }
});

test('fails closed before writing when the approved bundle no longer matches', (t) => {
  const root = fixture(t), path = join(root, 'assets/index-B-dTmdU7.js');
  const changed = readFileSync(path, 'utf8').replace('XE=[{name:"Podium Payments"', 'XE=[{name:"Changed provider"');
  writeFileSync(path, changed);
  const htmlBefore = readFileSync(join(root, 'index.html'), 'utf8');
  assert.throws(() => applySiteCorrections(root), /Expected 1 matches, found 0/);
  assert.equal(readFileSync(path, 'utf8'), changed);
  assert.equal(readFileSync(join(root, 'index.html'), 'utf8'), htmlBefore);
});


test('corrected bundle gets a content-derived cache key on every HTML entry', (t) => {
  const root = fixture(t); applySiteCorrections(root);
  const js = readFileSync(join(root, 'assets/index-B-dTmdU7.js'), 'utf8');
  const key = hash(js).slice(0, 16);
  for (const path of files(root).filter((x) => x.endsWith('.html'))) {
    assert.ok(readFileSync(path, 'utf8').includes(`src="/assets/index-B-dTmdU7.js?v=${key}"`), path);
  }
});

test('immutable approved release still passes every recorded SHA-256', () => {
  const manifest = JSON.parse(readFileSync('releases/2026-10-26-approved/manifest.json', 'utf8'));
  for (const [path, expected] of Object.entries(manifest.files)) assert.equal(hash(readFileSync(join(release, path))), expected, path);
});

test('actual shared SEO effect removes only stale anonymous homepage FAQ after navigation', (t) => {
  const root = fixture(t); applySiteCorrections(root);
  const js = readFileSync(join(root, 'assets/index-B-dTmdU7.js'), 'utf8');
  const start = js.indexOf('function Je('), end = js.indexOf('const u4=', start);
  const fn = js.slice(start, end);
  const home = 'https://www.balancedmedicalspa.com/';
  const makeNode = (data, id = '') => ({id, textContent: typeof data === 'string' ? data : JSON.stringify(data), removed:false, remove() {this.removed=true;}});
  const nodes = [makeNode({'@type':'FAQPage',url:home}), makeNode({'@type':'FAQPage',url:home},'route-schema'), makeNode({'@type':'FAQPage',url:home+'services'}), makeNode({'@type':'MedicalBusiness',url:home}), makeNode('{invalid')];
  const document = {title:'', querySelectorAll: (selector) => {assert.equal(selector, 'script[type="application/ld+json"]:not([id])'); return nodes.filter(x=>!x.id&&!x.removed);} };
  const context = {document, l4:'', F0:home.slice(0,-1), Pt:()=>{}, d4:()=>{}, v:{useEffect:(fn)=>fn()}};
  runInNewContext(fn+'; Je({title:"Home",description:"Home",canonicalPath:"/"});',context);
  assert.ok(nodes.every(x=>!x.removed));
  runInNewContext('Je({title:"Payments",description:"Payments",canonicalPath:"/flexible-payments"});',context);
  assert.deepEqual(nodes.map(x=>x.removed),[true,false,false,false,false]);
  runInNewContext('Je({title:"Home",description:"Home",canonicalPath:"/"}); Je({title:"Payments",description:"Payments",canonicalPath:"/flexible-payments"});',context);
  assert.deepEqual(nodes.map(x=>x.removed),[true,false,false,false,false]);
});
