import { readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

// The current production client is an approved snapshot. Apply narrowly scoped,
// checked refinements until the editable React source is reconciled with it.
const root = 'dist';
const oldAsset = 'index-jonesborough-house-20261026.js';
const newAsset = 'index-balanced-conversion-20261026.js';
let js = readFileSync(join(root, 'assets', oldAsset), 'utf8');
function replaceExactly(old, next, expected = 1) {
  const matches = js.split(old).length - 1;
  if (matches !== expected) throw new Error(`Expected ${expected} matches, found ${matches}: ${old.slice(0, 80)}`);
  js = js.split(old).join(next);
}

replaceExactly('n.jsx(Y,{href:"/about",children:"Our team"})', 'n.jsx("a",{href:"/about#team",children:"Our team"})', 2);
replaceExactly('n.jsxs(Y,{href:"/about",className:"bw-text-link",children:["Meet the people behind Balanced "', 'n.jsxs("a",{href:"/about#team",className:"bw-text-link",children:["Meet the people behind Balanced "');
replaceExactly('n.jsxs(Y,{href:"/about",className:"bw-text-link",children:["Meet the Balanced team "', 'n.jsxs("a",{href:"/about#team",className:"bw-text-link",children:["Meet the Balanced team "');

const treatmentStart = 'mE=[{number:"01",name:"Injectables"';
const start = js.indexOf(treatmentStart);
const end = js.indexOf('],fE=[', start);
if (start < 0 || end < 0 || js.indexOf(treatmentStart, start + 1) >= 0) throw new Error('Treatment list changed; reconcile before updating.');
js = js.slice(0, start) + 'mE=[' + [
  {number:'01',name:'Injectables',detail:'Botox · Dysport · Daxxify',href:'/injectables'},
  {number:'02',name:'Dermal filler',detail:'Lips · facial balancing',href:'/lip-filler-kingsport-tn'},
  {number:'03',name:'Skin & laser',detail:'Laser treatments · skin rejuvenation',href:'/laser-treatments'},
  {number:'04',name:'RF microneedling',detail:'A personalized approach to skin texture',href:'/rf-microneedling-kingsport-tn'},
  {number:'05',name:'Medical weight loss',detail:'Provider-guided weight management',href:'/weight-loss'},
  {number:'06',name:'Wellness & hormones',detail:'Hormone consultations · IV therapy',href:'/wellness'},
].map(x => JSON.stringify(x)).join(',') + js.slice(end);

const bioStart = 'bio:`With a foundation in vascular surgery';
const bioIndex = js.indexOf(bioStart);
const bioEnd = js.indexOf('`,excerpt:', bioIndex);
if (bioIndex < 0 || bioEnd < 0) throw new Error('Shelly biography changed; reconcile before updating.');
js = js.slice(0, bioIndex) + 'bio:`Shelly Ketron, PA-C, combines a background in vascular surgery with a passion for aesthetic medicine. She specializes in full-face rejuvenation and takes time to understand each patient’s goals, discuss options, and create a personalized treatment plan. Her approach is thoughtful, precise, and centered on enhancing each patient’s individual features.' + js.slice(bioEnd);

function shortenNamedBio(name, next) {
  const marker = `name:"${name}"`;
  const i = js.indexOf(marker), bio = js.indexOf('bio:"', i), end = js.indexOf('",photo:', bio);
  if (i < 0 || bio < 0 || end < 0 || end - bio > 3000) throw new Error(`Unable to locate ${name} biography`);
  js = js.slice(0,bio) + 'bio:' + JSON.stringify(next) + js.slice(end + 1);
}
shortenNamedBio('Kelli Garretson Griffey', 'Kelli Garretson Griffey, MBA, serves as COO of Balanced Wellness and founded KelliAI. Drawing on her healthcare, business, and technology background, she supports the team in creating a seamless patient experience and helps lead operations and growth across the practice.');
shortenNamedBio('Sophia Arias', 'Sophia Arias serves as CFO of Balanced Wellness, bringing experience in international business and financial strategy. She supports budgeting, vendor relationships, and long-term growth, helping the practice build the structure and accountability needed to serve its patients and community.');

const hero = 'n.jsx("p",{className:"bw-hero-footnote",children:"Balanced Wellness Medical Spa"})';
const links = 'n.jsxs("div",{className:"bw-quick-locations",children:[n.jsx("span",{children:"Choose your location"}),n.jsx("a",{href:"https://booking.podium.com/medspa/01930831-564b-7342-98d8-620e43a707e7",target:"_blank",rel:"noopener noreferrer",children:"Book Kingsport"}),n.jsx("a",{href:"https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505",target:"_blank",rel:"noopener noreferrer",children:"Book Jonesborough"})]}),';
replaceExactly(hero, links + hero);

writeFileSync(join(root,'assets',newAsset), js);
unlinkSync(join(root,'assets',oldAsset));
const css = `.bw-quick-locations{display:flex;flex-wrap:wrap;align-items:center;gap:.55rem 1rem;margin-top:1.2rem;font-size:.78rem}.bw-quick-locations span{width:100%;font-size:.65rem;text-transform:uppercase;letter-spacing:.13em;color:#756269}.bw-quick-locations a{display:inline-flex;align-items:center;min-height:44px;color:#30252a;text-decoration:underline;text-underline-offset:.25em;font-weight:600}.bw-treatment-list{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.bw-treatment-row{display:flex!important;flex-direction:column;align-items:flex-start!important;justify-content:flex-start!important;gap:12px;padding:24px!important;background:#fff;border:1px solid #e5d8d5;min-height:190px}.bw-treatment-row h3{margin:0}.bw-treatment-row p{margin:0;line-height:1.5}.bw-treatment-arrow{margin-top:auto;align-self:flex-end}@media(max-width:900px){.bw-treatment-list{grid-template-columns:repeat(2,minmax(0,1fr))}.bw-treatment-row{min-height:180px;padding:20px!important}}@media(max-width:520px){.bw-treatment-list{grid-template-columns:1fr}.bw-treatment-row{min-height:140px}.bw-quick-locations{gap:.25rem 1rem}}`;
writeFileSync(join(root,'assets','balanced-conversion-20261026.css'), css);
function htmlFiles(dir) {
  return readdirSync(dir,{withFileTypes:true}).flatMap(entry => {
    const p=join(dir,entry.name);
    return entry.isDirectory()?htmlFiles(p):entry.name.endsWith('.html')?[p]:[];
  });
}
for(const file of htmlFiles(root)) {
  let html=readFileSync(file,'utf8');
  if (!html.includes(oldAsset)) throw new Error(`Expected client asset in ${file}`);
  html=html.split(oldAsset).join(newAsset);
  html=html.replace('</head>', '<link rel="stylesheet" href="/assets/balanced-conversion-20261026.css"></head>');
  writeFileSync(file,html);
}
console.log('Applied location, team and treatment refinements to approved client');
