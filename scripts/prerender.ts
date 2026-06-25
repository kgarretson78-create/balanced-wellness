/**
 * Static HTML prerender for high-value SEO/AEO routes.
 *
 * Reads each target page's exported `data` (single source of truth shared with
 * the React component), then writes a route-specific `dist/<route>/index.html`
 * containing:
 *   - page-specific <title>, <meta description>, canonical, OG/Twitter overrides
 *   - JSON-LD: LocalBusiness, MedicalProcedure (services) or LocalSEO, FAQPage,
 *     BreadcrumbList
 *   - crawler-visible H1, quick-answer copy, intro paragraphs, benefits,
 *     FAQs, and locations
 *
 * The SPA bundle still loads from the rewritten <head> and React mounts into
 * `#root` exactly as before — the prerendered body is just initial markup
 * crawlers see before JS executes.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { data as botoxData } from "../src/pages/seo/BotoxKingsport.tsx";
import { data as rfMicroData } from "../src/pages/seo/RFMicroneedlingKingsport.tsx";
import { data as weightLossData } from "../src/pages/seo/MedicalWeightLossKingsport.tsx";
import { data as hormoneData } from "../src/pages/seo/HormoneTherapyKingsport.tsx";
import { data as kingsportSpaData } from "../src/pages/seo/MedicalSpaKingsport.tsx";
import { data as jonesboroughSpaData } from "../src/pages/seo/MedicalSpaJonesborough.tsx";
import { data as ivLoungeData } from "../src/pages/seo/IVLoungeKingsport.tsx";
import { data as peptideData } from "../src/pages/seo/PeptideTherapyKingsport.tsx";
import { data as onlineWeightLossData } from "../src/pages/seo/OnlineWeightLossKingsport.tsx";
import { data as onlineSkincareData } from "../src/pages/seo/OnlineSkincareKingsport.tsx";
import { data as womensHealthData } from "../src/pages/seo/WomensHealthKingsport.tsx";
import { data as mensHealthData } from "../src/pages/seo/MensHealthKingsport.tsx";
import { data as telehealthData } from "../src/pages/Telehealth.tsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const DIST = path.join(REPO_ROOT, "dist");
const ORIGIN = "https://www.balancedmedicalspa.com";

// ---------------------------------------------------------------------------
// Escaping helpers
// ---------------------------------------------------------------------------
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(s: string): string {
  return escapeHtml(s);
}
function jsonLdSafe(obj: unknown): string {
  // Prevent </script> from breaking out of the script block.
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

// ---------------------------------------------------------------------------
// Shared LocalBusiness JSON-LD (kept aligned with SchemaMarkup.tsx)
// ---------------------------------------------------------------------------
const WEEKDAY_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "09:00",
  closes: "17:00",
} as const;

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${ORIGIN}/#organization`,
  name: "Balanced Wellness Medical Spa",
  description:
    "Premier luxury medical spa offering Botox, Dermal Fillers, RF Microneedling, CO2 Laser Resurfacing, Medical Weight Loss, and Hormone Optimization in Kingsport & Jonesborough, TN. Two convenient Tri-Cities locations, board-certified providers, 8,000+ patients treated, 200+ five-star reviews.",
  url: ORIGIN,
  telephone: "+1-423-765-1393",
  image: `${ORIGIN}/images/logo.jpeg`,
  logo: `${ORIGIN}/images/logo.jpeg`,
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Debit Card, CareCredit, Cherry Financing",
  medicalSpecialty: [
    "Botox",
    "Dermal Fillers",
    "RF Microneedling",
    "CO2 Laser Resurfacing",
    "Medical Weight Loss",
    "Hormone Replacement Therapy",
    "Peptide Therapy",
  ],
  openingHoursSpecification: [WEEKDAY_HOURS],
  sameAs: [
    "https://www.facebook.com/balancedwellnessmedspa",
    "https://www.instagram.com/balancedwellnessmedspa",
  ],
  areaServed: [
    { "@type": "City", name: "Kingsport" },
    { "@type": "City", name: "Jonesborough" },
    { "@type": "City", name: "Johnson City" },
    { "@type": "City", name: "Bristol" },
    { "@type": "City", name: "Greeneville" },
    { "@type": "State", name: "Tennessee" },
  ],
};

// ---------------------------------------------------------------------------
// Types matching the SEO page data shapes (subset we need for prerender)
// ---------------------------------------------------------------------------
interface FAQ {
  q: string;
  a: string;
}
interface ServicePageData {
  seo: { title: string; description: string; keywords: string; canonicalPath?: string };
  hero: { badge: string; h1: string; subheadline: string };
  shortAnswer?: { q: string; a: string };
  intro: { h2: string; body: string[] };
  benefits: { title: string; desc: string }[];
  candidates: { goodFor: string[]; notFor: string[] };
  expectations: { phase: string; icon: string; items: string[] }[];
  comparison?: {
    h2: string;
    columns: string[];
    rows: { label: string; values: string[] }[];
    note?: string;
  };
  faqs: FAQ[];
  relatedLinks: { name: string; path: string; desc: string }[];
  schemaDescription: string;
}
interface IVMenuItem {
  name: string;
  tagline: string;
  price: number;
  duration: string;
  desc: string;
}
interface IVAddOn {
  name: string;
  tagline: string;
  price: number;
  desc: string;
}
interface IVLoungePageData {
  seo: { title: string; description: string; keywords: string; canonicalPath?: string };
  hero: { badge: string; h1: string; subheadline: string };
  shortAnswer: { q: string; a: string };
  intro: { h2: string; body: string[] };
  benefits: { title: string; desc: string }[];
  whatIsIV: { h2: string; body: string[] };
  experience: { h2: string; body: string[] };
  expectations: { phase: string; icon: string; items: string[] }[];
  ivMenu: IVMenuItem[];
  ivAddOns: IVAddOn[];
  membership: { name: string; price: number; duration: string; desc: string };
  faqs: FAQ[];
  relatedLinks: { name: string; path: string; desc: string }[];
  schemaDescription: string;
}
interface LocalPageData {
  seo: { title: string; description: string; keywords: string };
  hero: { badge: string; h1: string; subheadline: string };
  intro: { h2: string; body: string[] };
  services: { name: string; desc: string; link: string }[];
  whyUs: string[];
  nearbyAreas: string[];
  primaryLocation: { city: string; address: string; zip: string; phone: string; tel: string; directions: string };
  secondaryLocation: { city: string; address: string; zip: string; phone: string; tel: string; directions: string; distance: string };
  faqs: FAQ[];
  relatedLinks: { name: string; path: string; desc: string }[];
  trust?: {
    headline: string;
    intro: string;
    proofCards: { title: string; body: string }[];
    googleReviewsUrl?: string;
    ctaText?: string;
  };
  locationDetails?: {
    headline?: string;
    paragraphs?: string[];
    points?: string[];
  };
}

// ---------------------------------------------------------------------------
// Head rendering
// ---------------------------------------------------------------------------
interface HeadInputs {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  jsonLd: unknown[];
}

function applyHeadToTemplate(template: string, h: HeadInputs): string {
  let html = template;

  // Use function replacers everywhere — `$` in our content (prices, JSON
  // payloads) must never be treated as a regex back-reference.
  const newTitle = `<title>${escapeHtml(h.title)}</title>`;
  html = html.replace(/<title>[^<]*<\/title>/, () => newTitle);

  const newDesc = `<meta name="description" content="${escapeAttr(h.description)}" />`;
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, () => newDesc);

  const newKeywords = `<meta name="keywords" content="${escapeAttr(h.keywords)}" />`;
  html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/, () => newKeywords);

  const newOgTitle = `<meta property="og:title" content="${escapeAttr(h.title)}" />`;
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, () => newOgTitle);

  const newOgDesc = `<meta property="og:description" content="${escapeAttr(h.description)}" />`;
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, () => newOgDesc);

  const newTwTitle = `<meta name="twitter:title" content="${escapeAttr(h.title)}" />`;
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, () => newTwTitle);

  const newTwDesc = `<meta name="twitter:description" content="${escapeAttr(h.description)}" />`;
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, () => newTwDesc);

  const newCanonical = `<link rel="canonical" href="${escapeAttr(h.canonicalUrl)}" />`;
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, () => newCanonical);

  const newOgUrl = `<meta property="og:url" content="${escapeAttr(h.canonicalUrl)}" />`;
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, () => newOgUrl);

  // Inject JSON-LD scripts before </head>. Use a function replacer so `$`
  // characters in the JSON payload (e.g. "$$" price range) aren't treated as
  // back-reference syntax by String.prototype.replace.
  const ldScripts = h.jsonLd
    .map((obj) => `    <script type="application/ld+json">${jsonLdSafe(obj)}</script>`)
    .join("\n");
  html = html.replace("</head>", () => `${ldScripts}\n  </head>`);

  return html;
}

// ---------------------------------------------------------------------------
// Body rendering — minimal, crawler-friendly markup placed inside #root.
// ---------------------------------------------------------------------------
function renderServiceBody(d: ServicePageData, canonicalUrl: string): string {
  const benefits = d.benefits
    .map(
      (b) =>
        `<li><strong>${escapeHtml(b.title)}</strong> — ${escapeHtml(b.desc)}</li>`,
    )
    .join("\n        ");
  const goodFor = d.candidates.goodFor.map((x) => `<li>${escapeHtml(x)}</li>`).join("\n          ");
  const notFor = d.candidates.notFor.map((x) => `<li>${escapeHtml(x)}</li>`).join("\n          ");
  const expectations = d.expectations
    .map(
      (e) => `
        <div>
          <h3>${escapeHtml(e.phase)}</h3>
          <ul>
            ${e.items.map((it) => `<li>${escapeHtml(it)}</li>`).join("\n            ")}
          </ul>
        </div>`,
    )
    .join("");
  const comparison = d.comparison
    ? `
      <section>
        <h2>${escapeHtml(d.comparison.h2)}</h2>
        <table>
          <thead>
            <tr><th>Feature</th>${d.comparison.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${d.comparison.rows
              .map(
                (r) =>
                  `<tr><td>${escapeHtml(r.label)}</td>${r.values
                    .map((v) => `<td>${escapeHtml(v)}</td>`)
                    .join("")}</tr>`,
              )
              .join("\n            ")}
          </tbody>
        </table>
        ${d.comparison.note ? `<p>${escapeHtml(d.comparison.note)}</p>` : ""}
      </section>`
    : "";
  const faqs = d.faqs
    .map(
      (f) => `
        <div>
          <h3>${escapeHtml(f.q)}</h3>
          <p>${escapeHtml(f.a)}</p>
        </div>`,
    )
    .join("");
  const related = d.relatedLinks
    .map(
      (l) =>
        `<li><a href="${escapeAttr(l.path)}">${escapeHtml(l.name)}</a> — ${escapeHtml(l.desc)}</li>`,
    )
    .join("\n          ");

  return `
    <div id="prerender-content" data-prerender>
      <nav aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/services">Services</a> / <span>${escapeHtml(d.hero.h1)}</span>
      </nav>
      <header>
        <p>${escapeHtml(d.hero.badge)}</p>
        <h1>${escapeHtml(d.hero.h1)}</h1>
        <p>${escapeHtml(d.hero.subheadline)}</p>
        <p><a href="/book">Book a Consultation</a> · <a href="tel:423-765-1393">Call (423) 765-1393</a></p>
      </header>
      ${
        d.shortAnswer
          ? `
      <section aria-label="Quick Answer">
        <h2>${escapeHtml(d.shortAnswer.q)}</h2>
        <p>${escapeHtml(d.shortAnswer.a)}</p>
      </section>`
          : ""
      }
      <section>
        <h2>${escapeHtml(d.intro.h2)}</h2>
        ${d.intro.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n        ")}
      </section>
      <section>
        <h2>Benefits</h2>
        <ul>
        ${benefits}
        </ul>
      </section>
      <section>
        <h2>Am I a Good Candidate?</h2>
        <h3>Good Candidates Include</h3>
        <ul>
          ${goodFor}
        </ul>
        <h3>May Not Be Suitable If</h3>
        <ul>
          ${notFor}
        </ul>
      </section>
      <section>
        <h2>What to Expect</h2>${expectations}
      </section>
      ${comparison}
      <section>
        <h2>Frequently Asked Questions</h2>${faqs}
      </section>
      <section>
        <h2>Visit Us — Two Tri-Cities Locations</h2>
        <address>
          <strong>Kingsport</strong><br>
          1309 South John B Dennis Hwy, Suite 104<br>
          Kingsport, TN 37660<br>
          <a href="tel:423-765-1393">(423) 765-1393</a>
        </address>
        <address>
          <strong>Jonesborough</strong><br>
          120 South Cherokee St<br>
          Jonesborough, TN 37659<br>
          <a href="tel:423-646-2169">(423) 646-2169</a>
        </address>
      </section>
      <section>
        <h2>Related Treatments</h2>
        <ul>
          ${related}
        </ul>
      </section>
      <p><a href="${escapeAttr(canonicalUrl)}">${escapeHtml(d.hero.h1)} — Balanced Wellness Medical Spa</a></p>
    </div>
  `;
}

function renderLocalBody(d: LocalPageData, canonicalUrl: string): string {
  const services = d.services
    .map(
      (s) =>
        `<li><a href="${escapeAttr(s.link)}"><strong>${escapeHtml(s.name)}</strong></a> — ${escapeHtml(s.desc)}</li>`,
    )
    .join("\n          ");
  const why = d.whyUs.map((w) => `<li>${escapeHtml(w)}</li>`).join("\n          ");
  const nearby = d.nearbyAreas.map((a) => `<li>${escapeHtml(a)}</li>`).join("\n          ");
  const faqs = d.faqs
    .map(
      (f) => `
        <div>
          <h3>${escapeHtml(f.q)}</h3>
          <p>${escapeHtml(f.a)}</p>
        </div>`,
    )
    .join("");
  const related = d.relatedLinks
    .map(
      (l) =>
        `<li><a href="${escapeAttr(l.path)}">${escapeHtml(l.name)}</a> — ${escapeHtml(l.desc)}</li>`,
    )
    .join("\n          ");
  return `
    <div id="prerender-content" data-prerender>
      <nav aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/about">About</a> / <span>${escapeHtml(d.hero.h1)}</span>
      </nav>
      <header>
        <p>${escapeHtml(d.hero.badge)}</p>
        <h1>${escapeHtml(d.hero.h1)}</h1>
        <p>${escapeHtml(d.hero.subheadline)}</p>
        <p><a href="tel:${escapeAttr(d.primaryLocation.tel)}">${escapeHtml(d.primaryLocation.phone)}</a> · <a href="/book">Book a Free Consultation</a></p>
      </header>
      <section>
        <h2>${escapeHtml(d.intro.h2)}</h2>
        ${d.intro.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n        ")}
      </section>
      <section>
        <h2>Our Services in ${escapeHtml(d.primaryLocation.city)}</h2>
        <ul>
          ${services}
        </ul>
      </section>
      <section>
        <h2>Why Patients Choose Balanced Wellness in ${escapeHtml(d.primaryLocation.city)}</h2>
        <ul>
          ${why}
        </ul>
      </section>
      <section>
        <h2>Patients From Nearby Areas</h2>
        <ul>
          ${nearby}
        </ul>
      </section>
      ${
        d.trust
          ? `
      <section aria-label="Patient Experience">
        <h2>${escapeHtml(d.trust.headline)}</h2>
        <p>${escapeHtml(d.trust.intro)}</p>
        <ul>
          ${d.trust.proofCards
            .map(
              (c) =>
                `<li><strong>${escapeHtml(c.title)}</strong> — ${escapeHtml(c.body)}</li>`,
            )
            .join("\n          ")}
        </ul>
        ${
          d.trust.googleReviewsUrl
            ? `<p><a href="${escapeAttr(d.trust.googleReviewsUrl)}" rel="noopener noreferrer">${escapeHtml(d.trust.ctaText ?? "Read Google Reviews")}</a> · <a href="/book">Book a Free Consultation</a></p>`
            : `<p>${escapeHtml(d.trust.ctaText ?? "Search “Balanced Wellness Medical Spa” on Google to read recent reviews.")} · <a href="/book">Book a Free Consultation</a></p>`
        }
      </section>`
          : ""
      }
      ${
        d.locationDetails &&
        ((d.locationDetails.paragraphs && d.locationDetails.paragraphs.length) ||
          (d.locationDetails.points && d.locationDetails.points.length))
          ? `
      <section aria-label="Visiting">
        <h2>${escapeHtml(d.locationDetails.headline ?? `Visiting Our ${d.primaryLocation.city} Clinic`)}</h2>
        ${(d.locationDetails.paragraphs ?? [])
          .map((p) => `<p>${escapeHtml(p)}</p>`)
          .join("\n        ")}
        ${
          d.locationDetails.points && d.locationDetails.points.length
            ? `<ul>
          ${d.locationDetails.points.map((pt) => `<li>${escapeHtml(pt)}</li>`).join("\n          ")}
        </ul>`
            : ""
        }
      </section>`
          : ""
      }
      <section>
        <h2>Frequently Asked Questions</h2>${faqs}
      </section>
      <section>
        <h2>Visit Us</h2>
        <address>
          <strong>${escapeHtml(d.primaryLocation.city)}, TN</strong><br>
          ${escapeHtml(d.primaryLocation.address)}<br>
          ${escapeHtml(d.primaryLocation.zip)}<br>
          <a href="tel:${escapeAttr(d.primaryLocation.tel)}">${escapeHtml(d.primaryLocation.phone)}</a>
          · <a href="${escapeAttr(d.primaryLocation.directions)}">Get Directions</a>
        </address>
        <address>
          <strong>${escapeHtml(d.secondaryLocation.city)}, TN</strong><br>
          ${escapeHtml(d.secondaryLocation.address)}<br>
          ${escapeHtml(d.secondaryLocation.zip)}<br>
          <a href="tel:${escapeAttr(d.secondaryLocation.tel)}">${escapeHtml(d.secondaryLocation.phone)}</a>
        </address>
      </section>
      <section>
        <h2>Explore Our Treatments</h2>
        <ul>
          ${related}
        </ul>
      </section>
      <p><a href="${escapeAttr(canonicalUrl)}">${escapeHtml(d.hero.h1)} — Balanced Wellness Medical Spa</a></p>
    </div>
  `;
}

function renderIVLoungeBody(d: IVLoungePageData, canonicalUrl: string): string {
  const benefits = d.benefits
    .map((b) => `<li><strong>${escapeHtml(b.title)}</strong> — ${escapeHtml(b.desc)}</li>`)
    .join("\n        ");
  const expectations = d.expectations
    .map(
      (e) => `
        <div>
          <h3>${escapeHtml(e.phase)}</h3>
          <ul>
            ${e.items.map((it) => `<li>${escapeHtml(it)}</li>`).join("\n            ")}
          </ul>
        </div>`,
    )
    .join("");
  const menu = d.ivMenu
    .map(
      (m) => `
        <li>
          <strong>${escapeHtml(m.name)}</strong> — ${escapeHtml(m.tagline)}<br>
          <span>$${m.price} · ${escapeHtml(m.duration)}</span>
          <p>${escapeHtml(m.desc)}</p>
        </li>`,
    )
    .join("");
  const addons = d.ivAddOns
    .map(
      (a) =>
        `<li><strong>${escapeHtml(a.name)}</strong> (+$${a.price}) — ${escapeHtml(a.desc)}</li>`,
    )
    .join("\n          ");
  const faqs = d.faqs
    .map(
      (f) => `
        <div>
          <h3>${escapeHtml(f.q)}</h3>
          <p>${escapeHtml(f.a)}</p>
        </div>`,
    )
    .join("");
  const related = d.relatedLinks
    .map(
      (l) =>
        `<li><a href="${escapeAttr(l.path)}">${escapeHtml(l.name)}</a> — ${escapeHtml(l.desc)}</li>`,
    )
    .join("\n          ");

  return `
    <div id="prerender-content" data-prerender>
      <nav aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/wellness">Wellness</a> / <span>${escapeHtml(d.hero.h1)}</span>
      </nav>
      <header>
        <p>${escapeHtml(d.hero.badge)}</p>
        <h1>${escapeHtml(d.hero.h1)}</h1>
        <p>${escapeHtml(d.hero.subheadline)}</p>
        <p><a href="/book">Book Your IV Session</a> · <a href="tel:423-765-1393">Call (423) 765-1393</a></p>
      </header>
      <section aria-label="Quick Answer">
        <h2>${escapeHtml(d.shortAnswer.q)}</h2>
        <p>${escapeHtml(d.shortAnswer.a)}</p>
      </section>
      <section>
        <h2>${escapeHtml(d.intro.h2)}</h2>
        ${d.intro.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n        ")}
      </section>
      <section>
        <h2>Benefits of IV Hydration</h2>
        <ul>
        ${benefits}
        </ul>
      </section>
      <section>
        <h2>${escapeHtml(d.whatIsIV.h2)}</h2>
        ${d.whatIsIV.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n        ")}
      </section>
      <section>
        <h2>${escapeHtml(d.experience.h2)}</h2>
        ${d.experience.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n        ")}
      </section>
      <section>
        <h2>What to Expect</h2>${expectations}
      </section>
      <section>
        <h2>IV Lounge Drip Menu</h2>
        <p>Each drip is about 45 minutes and is recommended after a brief health screening.</p>
        <ul>${menu}
        </ul>
        <h3>Boosters</h3>
        <ul>
          ${addons}
        </ul>
        <h3>${escapeHtml(d.membership.name)}</h3>
        <p>${escapeHtml(d.membership.desc)} — $${d.membership.price}/${escapeHtml(d.membership.duration)}</p>
        <p><em>* IV therapy may support hydration, energy, recovery, and general wellness goals. Not a treatment for any specific disease. Health screening required.</em></p>
      </section>
      <section>
        <h2>Frequently Asked Questions</h2>${faqs}
      </section>
      <section>
        <h2>Visit Our IV Lounge — Kingsport & the Johnson City / Jonesborough Area</h2>
        <address>
          <strong>Kingsport</strong><br>
          1309 South John B Dennis Hwy, Suite 104<br>
          Kingsport, TN 37660<br>
          <a href="tel:423-765-1393">(423) 765-1393</a>
        </address>
        <address>
          <strong>Jonesborough</strong><br>
          120 South Cherokee St<br>
          Jonesborough, TN 37659<br>
          <a href="tel:423-646-2169">(423) 646-2169</a>
        </address>
      </section>
      <section>
        <h2>Related Wellness Services</h2>
        <ul>
          ${related}
        </ul>
      </section>
      <p><a href="${escapeAttr(canonicalUrl)}">${escapeHtml(d.hero.h1)} — Balanced Wellness Medical Spa</a></p>
    </div>
  `;
}

function breadcrumbsForIVLounge(h1: string, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Wellness", item: `${ORIGIN}/wellness` },
      { "@type": "ListItem", position: 3, name: h1, item: canonicalUrl },
    ],
  };
}

function ivOfferCatalogSchema(d: IVLoungePageData, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "IV Lounge Drip Menu",
    url: canonicalUrl,
    itemListElement: d.ivMenu.map((m) => ({
      "@type": "Offer",
      name: m.name,
      description: m.desc,
      price: m.price.toFixed(2),
      priceCurrency: "USD",
      url: `${canonicalUrl}#iv-menu`,
      itemOffered: {
        "@type": "MedicalProcedure",
        name: `IV Hydration — ${m.name}`,
        procedureType: "Noninvasive",
        howPerformed:
          "Administered intravenously by licensed medical providers at Balanced Wellness Medical Spa.",
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// JSON-LD builders
// ---------------------------------------------------------------------------
function faqPageSchema(faqs: FAQ[], canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: canonicalUrl,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
function breadcrumbsForService(h1: string, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${ORIGIN}/services` },
      { "@type": "ListItem", position: 3, name: h1, item: canonicalUrl },
    ],
  };
}
function breadcrumbsForLocal(h1: string, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${ORIGIN}/about` },
      { "@type": "ListItem", position: 3, name: h1, item: canonicalUrl },
    ],
  };
}
function medicalProcedureSchema(
  serviceName: string,
  description: string,
  canonicalUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: serviceName,
    description,
    url: canonicalUrl,
    procedureType: "Noninvasive",
    followup: "Follow-up appointment recommended 2–4 weeks after treatment.",
    preparation: "Consultation required prior to treatment.",
    howPerformed:
      "Performed by board-certified medical professionals at Balanced Wellness Medical Spa.",
    recognizingAuthority: {
      "@type": "Organization",
      name: "American Medical Association",
    },
    provider: { "@id": `${ORIGIN}/#organization` },
  };
}

// ---------------------------------------------------------------------------
// Build per-route prerender
// ---------------------------------------------------------------------------
async function writeRoute(routePath: string, html: string) {
  // routePath like "/botox-kingsport-tn" -> dist/botox-kingsport-tn/index.html
  const out = path.join(DIST, routePath.replace(/^\//, ""), "index.html");
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, html, "utf8");
  console.log(`[prerender] wrote ${path.relative(REPO_ROOT, out)}`);
}

function injectBody(template: string, body: string): string {
  // index.html has <div id="root"></div> — inject crawler content inside #root.
  // Function replacer ensures `$` in the body (prices, etc.) isn't interpreted
  // as a back-reference.
  return template.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
}

async function prerenderServiceRoute(
  routePath: string,
  d: ServicePageData,
  template: string,
) {
  const canonicalUrl = `${ORIGIN}${routePath}`;
  const jsonLd = [
    LOCAL_BUSINESS_SCHEMA,
    medicalProcedureSchema(d.hero.h1, d.schemaDescription, canonicalUrl),
    faqPageSchema(d.faqs, canonicalUrl),
    breadcrumbsForService(d.hero.h1, canonicalUrl),
  ];
  let html = applyHeadToTemplate(template, {
    title: d.seo.title,
    description: d.seo.description,
    keywords: d.seo.keywords,
    canonicalUrl,
    jsonLd,
  });
  html = injectBody(html, renderServiceBody(d, canonicalUrl));
  await writeRoute(routePath, html);
}

function breadcrumbsForTelehealth(h1: string, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Online Care", item: `${ORIGIN}/online-care` },
      { "@type": "ListItem", position: 3, name: h1, item: canonicalUrl },
    ],
  };
}

/**
 * Telehealth landing page + SEO alias. The alias (/virtual-care-kingsport-tn)
 * is prerendered with its canonical pointing back to /telehealth so it stays
 * crawlable without creating duplicate-content competition.
 */
async function prerenderTelehealthRoute(
  routePath: string,
  d: ServicePageData,
  template: string,
  canonicalOverride?: string,
) {
  const canonicalUrl = canonicalOverride ?? `${ORIGIN}${routePath}`;
  const jsonLd = [
    LOCAL_BUSINESS_SCHEMA,
    medicalProcedureSchema(d.hero.h1, d.schemaDescription, canonicalUrl),
    faqPageSchema(d.faqs, canonicalUrl),
    breadcrumbsForTelehealth(d.hero.h1, canonicalUrl),
  ];
  let html = applyHeadToTemplate(template, {
    title: d.seo.title,
    description: d.seo.description,
    keywords: d.seo.keywords,
    canonicalUrl,
    jsonLd,
  });
  html = injectBody(html, renderServiceBody(d, canonicalUrl));
  await writeRoute(routePath, html);
}

async function prerenderLocalRoute(
  routePath: string,
  d: LocalPageData,
  template: string,
) {
  const canonicalUrl = `${ORIGIN}${routePath}`;
  const jsonLd = [
    LOCAL_BUSINESS_SCHEMA,
    faqPageSchema(d.faqs, canonicalUrl),
    breadcrumbsForLocal(d.hero.h1, canonicalUrl),
  ];
  let html = applyHeadToTemplate(template, {
    title: d.seo.title,
    description: d.seo.description,
    keywords: d.seo.keywords,
    canonicalUrl,
    jsonLd,
  });
  html = injectBody(html, renderLocalBody(d, canonicalUrl));
  await writeRoute(routePath, html);
}

async function prerenderIVLoungeRoute(
  routePath: string,
  d: IVLoungePageData,
  template: string,
) {
  const canonicalUrl = `${ORIGIN}${routePath}`;
  const jsonLd = [
    LOCAL_BUSINESS_SCHEMA,
    medicalProcedureSchema(d.hero.h1, d.schemaDescription, canonicalUrl),
    ivOfferCatalogSchema(d, canonicalUrl),
    faqPageSchema(d.faqs, canonicalUrl),
    breadcrumbsForIVLounge(d.hero.h1, canonicalUrl),
  ];
  let html = applyHeadToTemplate(template, {
    title: d.seo.title,
    description: d.seo.description,
    keywords: d.seo.keywords,
    canonicalUrl,
    jsonLd,
  });
  html = injectBody(html, renderIVLoungeBody(d, canonicalUrl));
  await writeRoute(routePath, html);
}

async function main() {
  const templatePath = path.join(DIST, "index.html");
  const template = await fs.readFile(templatePath, "utf8");

  // Sanity check — the things our regexes target must exist.
  if (!template.includes('<div id="root">')) {
    throw new Error("[prerender] dist/index.html missing <div id=\"root\"> — build first.");
  }

  await prerenderServiceRoute("/botox-kingsport-tn", botoxData as ServicePageData, template);
  await prerenderServiceRoute(
    "/rf-microneedling-kingsport-tn",
    rfMicroData as ServicePageData,
    template,
  );
  await prerenderServiceRoute(
    "/medical-weight-loss-kingsport-tn",
    weightLossData as ServicePageData,
    template,
  );
  await prerenderServiceRoute(
    "/hormone-therapy-kingsport-tn",
    hormoneData as ServicePageData,
    template,
  );
  await prerenderLocalRoute(
    "/medical-spa-kingsport-tn",
    kingsportSpaData as LocalPageData,
    template,
  );
  await prerenderLocalRoute(
    "/medical-spa-jonesborough-tn",
    jonesboroughSpaData as LocalPageData,
    template,
  );
  await prerenderIVLoungeRoute(
    "/iv-lounge-kingsport-tn",
    ivLoungeData as IVLoungePageData,
    template,
  );
  await prerenderServiceRoute(
    "/peptide-therapy-kingsport-tn",
    peptideData as ServicePageData,
    template,
  );
  await prerenderServiceRoute(
    "/online-weight-loss-kingsport-tn",
    onlineWeightLossData as ServicePageData,
    template,
  );
  await prerenderServiceRoute(
    "/online-skincare-kingsport-tn",
    onlineSkincareData as ServicePageData,
    template,
  );
  await prerenderServiceRoute(
    "/womens-health-kingsport-tn",
    womensHealthData as ServicePageData,
    template,
  );
  await prerenderServiceRoute(
    "/mens-health-kingsport-tn",
    mensHealthData as ServicePageData,
    template,
  );

  await prerenderTelehealthRoute(
    "/telehealth",
    telehealthData as unknown as ServicePageData,
    template,
  );
  await prerenderTelehealthRoute(
    "/virtual-care-kingsport-tn",
    telehealthData as unknown as ServicePageData,
    template,
    `${ORIGIN}/telehealth`,
  );

  console.log("[prerender] done");
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
