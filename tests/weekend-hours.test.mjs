import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';
import { applySiteCorrections } from '../scripts/apply-site-corrections.mjs';

const release = 'releases/2026-10-26-approved/client';
const repo = resolve('.');
const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap(x => x.isDirectory() ? files(join(dir, x.name)) : [join(dir, x.name)]);
function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'balanced-weekend-hours-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  cpSync(release, join(cwd, 'dist'), { recursive: true });
  mkdirSync(join(cwd, 'public/images/locations'), { recursive: true });
  cpSync('public/images/locations/jonesborough-house-owner-photo.jpg.base64', join(cwd, 'public/images/locations/jonesborough-house-owner-photo.jpg.base64'));
  return cwd;
}
function build(cwd) {
  applySiteCorrections(join(cwd, 'dist'));
  for (const script of ['apply-jonesborough-house-photo.mjs', 'apply-jonesborough-hours.mjs']) {
    const result = spawnSync(process.execPath, [join(repo, 'scripts', script)], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
  return readFileSync(join(cwd, 'dist/assets/index-jonesborough-hours-20261026.js'), 'utf8');
}
const evaluateObject = s => JSON.parse(JSON.stringify(runInNewContext('(' + s + ')')));

test('final approved build corrects Saturday without changing either location weekday or Friday hours', t => {
  const cwd = fixture(t), js = build(cwd);
  const kingsport = evaluateObject(js.match(/wT=(\{display:.*?\}),jT=/)[1]);
  const jonesborough = evaluateObject(js.match(/jT=(\{display:.*?\}),Ln=/)[1]);
  assert.deepEqual(kingsport.display, [
    { days: 'Monday - Thursday', time: '10:00 AM - 7:00 PM' },
    { days: 'Friday', time: '9:00 AM - 5:00 PM' },
    { days: 'Saturday', time: 'Closed' },
    { days: 'Sunday', time: 'Closed' },
  ]);
  assert.deepEqual(jonesborough.display, [
    { days: 'Monday - Thursday', time: '10:00 AM - 6:00 PM' },
    { days: 'Friday', time: '9:00 AM - 1:00 PM' },
  ]);
  for (const [hours, thursday, friday] of [[kingsport, '19:00', '17:00'], [jonesborough, '18:00', '13:00']]) {
    assert.deepEqual(hours.schema, [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '10:00', closes: thursday },
      { dayOfWeek: ['Friday'], opens: '09:00', closes: friday },
    ]);
  }
  assert.ok(js.includes('Friday 9 AM–5 PM (closed Saturday and Sunday)'));
  assert.ok(js.includes('Friday 9 AM–5 PM, and is closed on Saturdays and Sundays.'));
});

test('all initial HTML and final client copies remove the weekend appointment promise; FAQ JSON stays valid', t => {
  const cwd = fixture(t), js = build(cwd);
  const oldHours = /By Appointment Only|Saturdays? by appointment/i;
  assert.doesNotMatch(js, oldHours);
  for (const page of files(join(cwd, 'dist')).filter(p => p.endsWith('.html'))) {
    const html = readFileSync(page, 'utf8');
    assert.doesNotMatch(html, oldHours, page);
    for (const m of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  }
  const iv = readFileSync(join(cwd, 'dist/iv-lounge-kingsport-tn/index.html'), 'utf8');
  assert.equal(iv.split('and is closed on Saturdays and Sundays').length - 1, 2);
  for (const file of ['src/lib/booking.ts', 'src/components/KelliAI.tsx', 'src/pages/seo/IVLoungeKingsport.tsx']) assert.doesNotMatch(readFileSync(file, 'utf8'), oldHours, file);
});

test('changed Saturday bundle or static markers fail before any build file is written', t => {
  for (const target of ['assets/index-B-dTmdU7.js', 'privacy-policy/index.html']) {
    const cwd = fixture(t), root = join(cwd, 'dist'), path = join(root, target);
    writeFileSync(path, readFileSync(path, 'utf8').replace('By Appointment Only', 'Changed schedule'));
    const before = new Map(files(root).map(p => [p, readFileSync(p)]));
    assert.throws(() => applySiteCorrections(root), /Expected 1 matches, found 0/);
    for (const [p, bytes] of before) assert.deepEqual(readFileSync(p), bytes, p);
  }
});
