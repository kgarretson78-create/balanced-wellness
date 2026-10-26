import { readFileSync, writeFileSync, readdirSync, copyFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

// The live frontend is an approved build snapshot; patch only its homepage
// Jonesborough card until the editable React source is reconciled.
const root = 'dist';
const oldAsset = 'index-B-dTmdU7.js';
const newAsset = 'index-jonesborough-house-20261026.js';
let js = readFileSync(join(root, 'assets', oldAsset), 'utf8');
function replaceOnce(old, next) {
  if (js.split(old).length !== 2) throw new Error(`Expected one match: ${old.slice(0,100)}`);
  js = js.replace(old, next);
}
replaceOnce('id:"jonesborough",label:"The Jonesborough house",image:"/images/locations/jonesborough-interior.webp"', 'id:"jonesborough",label:"The Jonesborough house",image:"/images/locations/jonesborough-house-20261026.jpg"');
replaceOnce('alt:`Inside Balanced Wellness Medical Spa in ${o.city}`', 'alt:s.id==="jonesborough"?"Exterior of Balanced Wellness Medical Spa in Jonesborough":`Inside Balanced Wellness Medical Spa in ${o.city}`');
writeFileSync(join(root, 'assets', newAsset), js);
unlinkSync(join(root, 'assets', oldAsset));
copyFileSync('public/images/locations/jonesborough-house-20261026.jpg', join(root, 'images/locations/jonesborough-house-20261026.jpg'));
function htmlFiles(dir) {
  return readdirSync(dir,{withFileTypes:true}).flatMap(entry => {
    const p=join(dir,entry.name);
    return entry.isDirectory()?htmlFiles(p):entry.name.endsWith('.html')?[p]:[];
  });
}
for(const file of htmlFiles(root)) {
  const html=readFileSync(file,'utf8');
  if (!html.includes(oldAsset)) throw new Error(`Expected client asset in ${file}`);
  writeFileSync(file,html.split(oldAsset).join(newAsset));
}
console.log('Applied Jonesborough exterior photo to the homepage card');
