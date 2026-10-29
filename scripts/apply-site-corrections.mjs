import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(fileURLToPath(new URL('..', import.meta.url)));
const payment = JSON.parse(readFileSync(join(repository, 'src/lib/payment-options.json'), 'utf8'));
const origin = 'https://www.balancedmedicalspa.com';
const oldDescription = 'Pay in full or split into monthly payments. Balanced Wellness Medical Spa accepts Podium Payments, Affirm, Klarna, Afterpay, and credit/debit cards for treatments in Kingsport & Jonesborough TN.';
const oldFaq = 'Yes. We offer CareCredit and Ally financing options to make your treatments more accessible. Our membership plans also provide significant savings on ongoing treatments.';
const oldInsurance = 'Most aesthetic treatments are not covered by insurance. However, we offer competitive pricing, CareCredit and Ally financing, and VIP membership plans that provide significant savings on ongoing treatments.';
const insurance = 'Most aesthetic treatments are not covered by insurance. ' + payment.availability;
const escapeHtml = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const safeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

function replaceExactly(text, before, after, expected = 1) {
  const actual = text.split(before).length - 1;
  if (actual !== expected) throw new Error(`Expected ${expected} matches, found ${actual}: ${before.slice(0, 100)}`);
  return text.split(before).join(after);
}
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}
function existingDescription(js, title) {
  const start = js.indexOf(`title:${JSON.stringify(title)},description:`);
  if (start < 0) throw new Error(`Approved route metadata missing: ${title}`);
  const tail = js.slice(start + `title:${JSON.stringify(title)},description:`.length);
  const match = tail.match(/^"(?:[^"\\]|\\.)*"/);
  if (!match) throw new Error(`Cannot read approved description: ${title}`);
  return JSON.parse(match[0]);
}

export function applySiteCorrections(root = 'dist') {
  // Run before the existing house/hours patches and PR #44, preserving their guarded markers.
  const assetPath = join(root, 'assets/index-B-dTmdU7.js');
  let js = readFileSync(assetPath, 'utf8');
  const providersBefore = 'XE=[{name:"Podium Payments",desc:"Secure checkout link through our patient portal."},{name:"Affirm",desc:"Monthly payment plans with quick eligibility check."},{name:"Klarna",desc:"Pay in 4 interest-free installments on eligible treatments."},{name:"Afterpay",desc:"Split your purchase into smaller payments over time."},{name:"Credit / Debit Card",desc:"Visa, Mastercard, Discover, American Express."}]';
  const providers = [
    { name: 'Podium Payments', desc: 'Secure checkout link through our patient portal.' },
    ...payment.providers.map((name) => ({ name, desc: payment.providerDescription })),
    { name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Discover, American Express.' },
  ];
  js = replaceExactly(js, providersBefore, `XE=${JSON.stringify(providers)}`);
  js = replaceExactly(js, oldDescription, payment.description);
  js = replaceExactly(js, oldFaq, payment.availability);
  js = replaceExactly(js, oldInsurance, insurance);
  js = replaceExactly(js, 'paymentAccepted:"Cash, Credit Card, Debit Card, CareCredit, Cherry Financing"', `paymentAccepted:${JSON.stringify(payment.paymentAccepted)}`);
  js = replaceExactly(js, 'founder:{"@type":"Person",name:"Kelli Griffey",jobTitle:"Founder & CEO"}', 'founder:{"@type":"Person",name:"Kelli Griffey",jobTitle:"COO"}');
  const introBefore = '["At Balanced Wellness Medical Spa, we believe confidence should feel accessible. Patients may choose to pay in full or explore flexible payment options through available providers including ",n.jsx("strong",{children:"Podium Payments"}),", ",n.jsx("strong",{children:"Affirm"}),","," ",n.jsx("strong",{children:"Klarna"}),", ",n.jsx("strong",{children:"Afterpay"}),", and card checkout."]';
  js = replaceExactly(js, introBefore, JSON.stringify(payment.availability + ' Card checkout and Podium Payments are also available.'));

  // Organization data is shared across all routes. Do not remove the reused static
  // node when navigating to a page that does not mount LocalBusinessSchema.
  js = replaceExactly(js, 'return()=>{const s=document.getElementById("local-business-schema");s&&s.remove()}', '');
  // The shared SEO effect also runs on Home -> payments/client-side navigation.
  // Remove only the anonymous homepage FAQ; preserve organization and route FAQs.
  js = replaceExactly(js, 'return d4("canonical",m),Pt(\'meta[property="og:url"]\',m,{property:"og:url"}),', 'if(m!==F0+"/")for(const f of document.querySelectorAll(\'script[type="application/ld+json"]:not([id])\'))try{const a=JSON.parse(f.textContent||"null");a&&a["@type"]==="FAQPage"&&a.url===F0+"/"&&f.remove()}catch{}return d4("canonical",m),Pt(\'meta[property="og:url"]\',m,{property:"og:url"}),');
  // Podium business hours, confirmed by the owner on 2026-10-29: both
  // locations are closed on weekends. Preserve every weekday/Friday hour.
  js = replaceExactly(js, '{days:"Saturday",time:"By Appointment Only"}', '{days:"Saturday",time:"Closed"}');
  js = replaceExactly(js, '(Saturday by appointment)', '(closed Saturday and Sunday)');
  js = replaceExactly(js, 'with Saturdays by appointment', 'and is closed on Saturdays and Sundays');
  const cacheKey = createHash('sha256').update(js).digest('hex').slice(0, 16);

  const routes = {
    '/about': 'About Us | Balanced Wellness Medical Spa Kingsport & Jonesborough TN',
    '/contact': 'Contact Us | Balanced Wellness Medical Spa Kingsport & Jonesborough TN',
    '/book': 'Book Now | Balanced Wellness Medical Spa Kingsport & Jonesborough TN',
    '/book-now': 'Book Now | Balanced Wellness Medical Spa Kingsport & Jonesborough TN',
    '/social-booking': 'Book Now | Balanced Wellness Medical Spa Kingsport & Jonesborough TN',
    '/flexible-payments': 'Flexible Payment Options | Balanced Wellness Medical Spa',
    '/gallery': 'Before & After Gallery | Balanced Wellness Medical Spa Kingsport TN',
  };
  const writes = [[assetPath, js]];
  for (const path of htmlFiles(root)) {
    let html = readFileSync(path, 'utf8');
    // The Express server caches assets as immutable. Change the URL cache key while
    // retaining the filename markers used by the house/hours patches and PR #44.
    html = replaceExactly(html, 'src="/assets/index-B-dTmdU7.js"', `src="/assets/index-B-dTmdU7.js?v=${cacheKey}"`);
    html = html.replaceAll(oldFaq, payment.availability).replaceAll(oldInsurance, insurance);
    const route = '/' + relative(root, path).replaceAll('\\', '/').replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
    // These existing static footers/IV FAQ copies are also served before JS.
    // Guard their exact counts so a changed snapshot cannot be partly patched.
    const saturdayCopies = {
      '/privacy-policy': [1, 0],
      '/terms-and-conditions': [1, 0],
      '/iv-lounge-kingsport-tn': [1, 2],
    }[route] || [0, 0];
    html = replaceExactly(html, 'Saturday: By Appointment Only', 'Saturday: Closed', saturdayCopies[0]);
    html = replaceExactly(html, 'with Saturdays by appointment', 'and is closed on Saturdays and Sundays', saturdayCopies[1]);
    let businessCount = 0;
    html = html.replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g, (script, body) => {
      const schema = JSON.parse(body);
      if (schema['@type'] === 'MedicalBusiness' && schema['@id'] === `${origin}/#organization`) {
        businessCount++;
        schema.paymentAccepted = payment.paymentAccepted;
        // The client already looks up this ID and will update it instead of adding a duplicate.
        return `<script id="local-business-schema" type="application/ld+json">${safeJson(schema)}</script>`;
      }
      // Copied homepage FAQ is not a FAQ about this destination page.
      if (routes[route] && schema['@type'] === 'FAQPage' && schema.url === `${origin}/`) return '';
      return script;
    });
    if (businessCount > 1) throw new Error(`Duplicate prerendered organization: ${path}`);
    if (routes[route]) {
      if (businessCount !== 1) throw new Error(`Missing organization schema: ${path}`);
      const title = routes[route];
      const description = existingDescription(js, title);
      const canonical = `${origin}${['/book', '/social-booking'].includes(route) ? '/book-now' : route}`;
      html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`);
      for (const [kind, name, content] of [
        ['name', 'description', description], ['property', 'og:title', title],
        ['property', 'og:description', description], ['property', 'og:url', canonical],
        ['name', 'twitter:title', title], ['name', 'twitter:description', description],
      ]) {
        const regex = new RegExp(`<meta ${kind}="${name}" content="[^"]*"\\s*/>`);
        if (!regex.test(html)) throw new Error(`Missing ${name}: ${path}`);
        html = html.replace(regex, () => `<meta ${kind}="${name}" content="${escapeHtml(content)}" />`);
      }
      html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, () => `<link rel="canonical" href="${canonical}" />`);
    }
    writes.push([path, html]);
  }
  // Validate every guard before changing any build output. Never edit the immutable release.
  for (const [path, content] of writes) writeFileSync(path, content);
  console.log(`Applied confirmed payment options and schema/metadata corrections to ${writes.length - 1} pages`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  applySiteCorrections(process.argv[2] || 'dist');
}
