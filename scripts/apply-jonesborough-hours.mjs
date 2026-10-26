import { readFileSync, writeFileSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

// Apply the owner's confirmed hours to the approved frontend without rebuilding it.
const root = 'dist';
const oldAsset = 'index-jonesborough-house-20261026.js';
const newAsset = 'index-jonesborough-hours-20261026.js';
let js = readFileSync(join(root, 'assets', oldAsset), 'utf8');
function replaceOnce(before, after) {
  if (js.split(before).length !== 2) throw new Error(`Expected one match: ${before.slice(0, 100)}`);
  js = js.replace(before, after);
}
replaceOnce('jT={display:[{days:"Appointments",time:"Confirm availability when booking"}],schema:[]}', 'jT={display:[{days:"Monday - Thursday",time:"10:00 AM - 6:00 PM"},{days:"Friday",time:"9:00 AM - 1:00 PM"}],schema:[{dayOfWeek:["Monday","Tuesday","Wednesday","Thursday"],opens:"10:00",closes:"18:00"},{dayOfWeek:["Friday"],opens:"09:00",closes:"13:00"}]}');
replaceOnce('Jonesborough: Confirm current availability when booking or call (423) 646-2169', 'Jonesborough: Monday–Thursday 10 AM–6 PM, Friday 9 AM–1 PM — (423) 646-2169');
writeFileSync(join(root, 'assets', oldAsset), js);
renameSync(join(root, 'assets', oldAsset), join(root, 'assets', newAsset));
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}
for (const file of htmlFiles(root)) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes(oldAsset)) throw new Error(`Expected client asset in ${file}`);
  writeFileSync(file, html.replaceAll(oldAsset, newAsset));
}
console.log('Applied confirmed Jonesborough weekday hours');
