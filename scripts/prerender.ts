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
import { data as dysportData } from "../src/pages/seo/DysportKingsport.tsx";
import { data as daxxifyData } from "../src/pages/seo/DaxxifyKingsport.tsx";
import { data as rfMicroData } from "../src/pages/seo/RFMicroneedlingKingsport.tsx";
import { data as weightLossData } from "../src/pages/seo/MedicalWeightLossKingsport.tsx";
import { data as hormoneData } from "../src/pages/seo/HormoneTherapyKingsport.tsx";
import { data as kingsportSpaData } from "../src/pages/seo/MedicalSpaKingsport.tsx";
import { data as jonesboroughSpaData } from "../src/pages/seo/MedicalSpaJonesborough.tsx";
import { data as ivLoungeData } from "../src/pages/seo/IVLoungeKingsport.tsx";
import { data as peptideData } from "../src/pages/seo/PeptideTherapyKingsport.tsx";
import { data as lipFillerData } from "../src/pages/seo/LipFillerKingsport.tsx";
import { data as laserSkinData } from "../src/pages/seo/LaserSkinRejuvenation.tsx";
import { data as skinTighteningData } from "../src/pages/seo/SkinTighteningKingsport.tsx";
import { data as weightLossClinicData } from "../src/pages/seo/WeightLossClinicKingsport.tsx";
import { data as wellnessClinicData } from "../src/pages/seo/WellnessClinicKingsport.tsx";
import { data as kingsportMedSpaData } from "../src/pages/seo/KingsportMedSpa.tsx";
import { data as jonesboroughMedSpaData } from "../src/pages/seo/JonesboroughMedSpa.tsx";
import { data as onlineWeightLossData } from "../src/pages/seo/OnlineWeightLossKingsport.tsx";
import { data as onlineSkincareData } from "../src/pages/seo/OnlineSkincareKingsport.tsx";
import { data as womensHealthData } from "../src/pages/seo/WomensHealthKingsport.tsx";
import { data as mensHealthData } from "../src/pages/seo/MensHealthKingsport.tsx";
import { data as telehealthData } from "../src/pages/Telehealth.tsx";
import {
  HOME_SEO,
  HOME_H1,
  HOME_SUBHEAD,
  HOME_QUICK_ANSWER,
  homeFaqs,
} from "../src/pages/Home.tsx";
import { SIGNATURE_TREATMENTS, PRIMARY_CONCERNS } from "../src/lib/site.ts";
import { LOCATIONS } from "../src/lib/booking.ts";

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
// Org-level hours mirror the flagship Kingsport location (matches the org
// telephone below). Sourced from the single source of truth in src/lib/booking.
const WEEKDAY_HOURS = LOCATIONS.kingsport.hours.schema.map((s) => ({
  "@type": "OpeningHoursSpecification",
  ...s,
}));

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${ORIGIN}/#organization`,
  name: "Balanced Wellness Medical Spa",
  description:
    "Premier luxury medical spa offering Botox, Dermal Fillers, RF Microneedling, CO2 Laser Resurfacing, Medical Weight Loss, and Hormone Optimization in Kingsport & Jonesborough, TN. Two convenient Tri-Cities locations with licensed medical providers and physician-supervised protocols, 8,000+ patients treated, and 200+ five-star reviews.",
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
  openingHoursSpecification: WEEKDAY_HOURS,
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
  wellnessServices: {
    h2: string;
    intro: string;
    items: { name: string; desc: string; path: string }[];
  };
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
  const wellnessServices = d.wellnessServices.items
    .map(
      (s) =>
        `<li><a href="${escapeAttr(s.path)}"><strong>${escapeHtml(s.name)}</strong></a> — ${escapeHtml(s.desc)}</li>`,
    )
    .join("\n          ");
  const kingsportHours = LOCATIONS.kingsport.hours.display
    .map((r) => `${escapeHtml(r.days)}: ${escapeHtml(r.time)}`)
    .join("<br>");
  const jonesboroughHours = LOCATIONS.jonesborough.hours.display
    .map((r) => `${escapeHtml(r.days)}: ${escapeHtml(r.time)}`)
    .join("<br>");
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
        <h2>${escapeHtml(d.wellnessServices.h2)}</h2>
        <p>${escapeHtml(d.wellnessServices.intro)}</p>
        <ul>
          ${wellnessServices}
        </ul>
        <p><em>* These wellness services may support hydration, energy, recovery, and general wellness goals. They are not treatments for any specific disease and are not appropriate for everyone. A provider health screening is required.</em></p>
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
          <a href="tel:423-765-1393">(423) 765-1393</a><br>
          ${kingsportHours}
        </address>
        <address>
          <strong>Jonesborough</strong><br>
          120 South Cherokee St<br>
          Jonesborough, TN 37659<br>
          <a href="tel:423-646-2169">(423) 646-2169</a><br>
          ${jonesboroughHours}
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

// ---------------------------------------------------------------------------
// Homepage prerender — the single most-cited URL for answer engines. Without
// this, JS-less crawlers (GPTBot, ClaudeBot, PerplexityBot, Google AI) see an
// empty #root at "/". We render an H1, a quick answer, the treatment menu,
// concern links, FAQs, and both locations as crawler-visible markup.
// ---------------------------------------------------------------------------
function renderHomeBody(canonicalUrl: string): string {
  const treatments = SIGNATURE_TREATMENTS.map(
    (t) =>
      `<li><a href="${escapeAttr(t.href)}"><strong>${escapeHtml(t.name)}</strong></a> — ${escapeHtml(t.desc)}</li>`,
  ).join("\n          ");
  const concerns = PRIMARY_CONCERNS.map(
    (c) =>
      `<li><a href="${escapeAttr(c.href)}">${escapeHtml(c.label)}</a> — ${escapeHtml(c.blurb)}</li>`,
  ).join("\n          ");
  const faqs = homeFaqs
    .map(
      (f) => `
        <div>
          <h3>${escapeHtml(f.q)}</h3>
          <p>${escapeHtml(f.a)}</p>
        </div>`,
    )
    .join("");

  return `
    <div id="prerender-content" data-prerender>
      <header>
        <h1>${escapeHtml(HOME_H1)}</h1>
        <p>${escapeHtml(HOME_SUBHEAD)}</p>
        <p><a href="/book">Book a Free Consultation</a> · <a href="tel:423-765-1393">Call (423) 765-1393</a></p>
      </header>
      <section aria-label="Quick Answer">
        <h2>${escapeHtml(HOME_QUICK_ANSWER.q)}</h2>
        <p>${escapeHtml(HOME_QUICK_ANSWER.a)}</p>
      </section>
      <section>
        <h2>Signature Treatments in Kingsport &amp; Jonesborough, TN</h2>
        <ul>
          ${treatments}
        </ul>
      </section>
      <section>
        <h2>What Brings You Here Today?</h2>
        <ul>
          ${concerns}
        </ul>
      </section>
      <section>
        <h2>Frequently Asked Questions</h2>${faqs}
      </section>
      <section>
        <h2>Two Convenient Tri-Cities Locations</h2>
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
      <p><a href="${escapeAttr(canonicalUrl)}">Balanced Wellness Medical Spa — Kingsport &amp; Jonesborough, TN</a></p>
    </div>
  `;
}

async function prerenderHomeRoute(template: string) {
  const canonicalUrl = `${ORIGIN}/`;
  const jsonLd = [LOCAL_BUSINESS_SCHEMA, faqPageSchema(homeFaqs, canonicalUrl)];
  let html = applyHeadToTemplate(template, {
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    keywords: HOME_SEO.keywords,
    canonicalUrl,
    jsonLd,
  });
  html = injectBody(html, renderHomeBody(canonicalUrl));
  // Home route "/" writes back to dist/index.html (the crawler entry point).
  await writeRoute("/", html);
}


interface HubPageData {
  route: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  quickAnswer: string;
  intro: string[];
  services: { name: string; href: string; description: string }[];
  faqs: FAQ[];
}

const HUB_PAGES: HubPageData[] = [
  {
    route: "/services",
    title: "Med Spa Services in Kingsport & Jonesborough TN | Balanced Wellness",
    description: "Explore Botox, fillers, laser treatments, medical weight loss, IV therapy, hormone optimization, and wellness services in Kingsport, Jonesborough, and the Tri-Cities.",
    keywords: "med spa services Kingsport TN, medical spa Jonesborough TN, Tri-Cities med spa, Botox Kingsport, laser treatments Jonesborough",
    h1: "Medical Spa Services in Kingsport & Jonesborough, TN",
    quickAnswer: "Balanced Wellness provides medical aesthetics and wellness care at two Tri-Cities locations. Services include neurotoxins, dermal fillers, laser and RF treatments, medical weight loss, IV therapy, peptide therapy, and hormone optimization.",
    intro: [
      "Our licensed medical team builds personalized treatment plans around your goals, health history, skin, and lifestyle.",
      "Patients visit us from Kingsport, Jonesborough, Johnson City, Bristol, Greeneville, and communities throughout Northeast Tennessee."
    ],
    services: [
      { name: "Injectables & Fillers", href: "/injectables", description: "Botox, Dysport, Daxxify, Jeuveau, and dermal filler." },
      { name: "Laser & Skin Treatments", href: "/laser-treatments", description: "Laser resurfacing, IPL, RF microneedling, and skin rejuvenation." },
      { name: "Medical Weight Loss", href: "/weight-loss", description: "Provider-guided metabolic and GLP-1 programs." },
      { name: "Wellness & IV Therapy", href: "/wellness", description: "IV hydration, vitamin injections, NAD+, and peptide support." },
      { name: "Hormone Optimization", href: "/hormone-optimization", description: "Lab-guided hormone and longevity care for women and men." }
    ],
    faqs: [
      { q: "Where is Balanced Wellness Medical Spa located?", a: "Balanced Wellness has locations in Kingsport at 1309 South John B Dennis Hwy, Suite 104, and Jonesborough at 120 South Cherokee Street." },
      { q: "Do you serve the entire Tri-Cities area?", a: "Yes. We welcome patients from Kingsport, Jonesborough, Johnson City, Bristol, Greeneville, and surrounding Northeast Tennessee communities." },
      { q: "How do I choose the right treatment?", a: "Start with a consultation. A provider will review your goals, medical history, and options before recommending a personalized plan." }
    ]
  },
  {
    route: "/injectables",
    title: "Botox, Dysport & Dermal Fillers | Kingsport & Jonesborough TN",
    description: "Natural-looking Botox, Dysport, Daxxify, Jeuveau, lip filler, and dermal filler treatments in Kingsport and Jonesborough, serving the Tri-Cities.",
    keywords: "Botox Kingsport TN, Botox Jonesborough TN, dermal fillers Tri-Cities, lip filler Kingsport, Dysport Jonesborough",
    h1: "Injectables & Dermal Fillers in Kingsport and Jonesborough",
    quickAnswer: "Balanced Wellness offers personalized neurotoxin and filler treatments designed to soften expression lines, restore volume, and preserve natural facial movement.",
    intro: ["Every injectable plan begins with an assessment of facial anatomy, movement, proportions, and your preferred level of correction.", "Treatments are available at our Kingsport and Jonesborough medical spas for patients throughout the Tri-Cities."],
    services: [
      { name: "Botox", href: "/botox-kingsport-tn", description: "Targeted wrinkle-relaxing treatment with natural-looking results." },
      { name: "Dysport", href: "/dysport-kingsport-tn", description: "A fast-acting neurotoxin option for dynamic lines." },
      { name: "Daxxify", href: "/daxxify-kingsport-tn", description: "A peptide-powered, longer-lasting frown-line treatment." },
      { name: "Lip & Dermal Filler", href: "/lip-filler-kingsport-tn", description: "Personalized volume and contour for lips and facial features." }
    ],
    faqs: [
      { q: "How long do injectable appointments take?", a: "Most appointments take about 20 to 45 minutes, depending on the treatment area and plan." },
      { q: "When will I see results?", a: "Neurotoxin results typically develop over several days. Filler results are visible immediately, with refinement as swelling settles." },
      { q: "Can I book injectables in Jonesborough?", a: "Yes. Injectable consultations and treatments are available at both our Kingsport and Jonesborough locations." }
    ]
  },
  {
    route: "/laser-treatments",
    title: "Laser Skin Treatments | Kingsport, Jonesborough & Tri-Cities TN",
    description: "Advanced laser resurfacing, IPL, RF microneedling, skin tightening, and rejuvenation in Kingsport and Jonesborough, Tennessee.",
    keywords: "laser treatments Kingsport TN, skin resurfacing Jonesborough, RF microneedling Tri-Cities, IPL Kingsport, skin tightening Tennessee",
    h1: "Laser & Advanced Skin Treatments in the Tri-Cities",
    quickAnswer: "Balanced Wellness uses advanced laser, light, and radiofrequency technology to improve tone, texture, laxity, unwanted hair, sun damage, and acne scarring.",
    intro: ["Your treatment plan is selected for your skin type, concerns, goals, and appropriate downtime.", "Consultations and treatment options are available in Kingsport and Jonesborough for patients across Northeast Tennessee."],
    services: [
      { name: "Laser Skin Rejuvenation", href: "/laser-skin-rejuvenation-kingsport-tn", description: "Customized resurfacing for tone, texture, and sun damage." },
      { name: "RF Microneedling", href: "/rf-microneedling-kingsport-tn", description: "Collagen remodeling for smoother, firmer skin." },
      { name: "Skin Tightening", href: "/skin-tightening-kingsport-tn", description: "Non-surgical options for laxity and collagen support." }
    ],
    faqs: [
      { q: "Which laser treatment is best for me?", a: "The best option depends on your skin type, concern, medical history, and downtime preference. A consultation is required before treatment." },
      { q: "Do laser treatments require downtime?", a: "Downtime varies from minimal redness to several days of recovery depending on the device and treatment intensity." },
      { q: "Are laser consultations available in both locations?", a: "Yes. Contact the Kingsport or Jonesborough team to confirm the best location for your selected technology." }
    ]
  },
  {
    route: "/weight-loss",
    title: "Medical Weight Loss | Kingsport, Jonesborough & Tri-Cities TN",
    description: "Provider-guided medical weight loss with personalized metabolic care in Kingsport and Jonesborough, serving Johnson City and the Tri-Cities.",
    keywords: "medical weight loss Kingsport TN, weight loss Jonesborough TN, GLP-1 Tri-Cities, semaglutide Kingsport, tirzepatide Tennessee",
    h1: "Medical Weight Loss in Kingsport & Jonesborough",
    quickAnswer: "Balanced Wellness offers medically supervised weight-loss programs that may include lab review, nutrition support, metabolic guidance, and prescription treatment when clinically appropriate.",
    intro: ["Programs are personalized to your health history, goals, labs, and provider assessment.", "Ongoing visits help track progress, manage side effects, and adjust the plan safely."],
    services: [
      { name: "Medical Weight Loss Program", href: "/medical-weight-loss-kingsport-tn", description: "Personalized treatment with provider oversight." },
      { name: "Kingsport Weight Loss Clinic", href: "/weight-loss-clinic-kingsport-tn", description: "Local program information for Kingsport and the Tri-Cities." },
      { name: "Online Weight Loss Care", href: "/online-weight-loss-kingsport-tn", description: "Convenient virtual follow-up options when appropriate." }
    ],
    faqs: [
      { q: "Do I need lab work before starting?", a: "Your provider will determine which evaluation and laboratory testing are appropriate based on your health history." },
      { q: "Are medications guaranteed?", a: "No. Prescription treatment is provided only when medically appropriate after a provider evaluation." },
      { q: "Can patients from Johnson City use the Jonesborough location?", a: "Yes. Our Jonesborough office is convenient for many patients in Johnson City and Washington County." }
    ]
  },
  {
    route: "/wellness",
    title: "IV Therapy & Wellness | Kingsport, Jonesborough & Tri-Cities TN",
    description: "IV hydration, vitamin injections, peptide therapy, NAD+, and personalized wellness services in Kingsport and Jonesborough, Tennessee.",
    keywords: "IV therapy Kingsport TN, wellness clinic Jonesborough TN, peptide therapy Tri-Cities, NAD IV Kingsport, vitamin injections Tennessee",
    h1: "Wellness & IV Therapy in Kingsport and Jonesborough",
    quickAnswer: "Balanced Wellness offers provider-guided IV hydration and wellness services designed to support hydration, energy, recovery, and individualized health goals.",
    intro: ["A health screening helps our team determine which services are appropriate for you.", "Our Kingsport and Jonesborough offices serve patients throughout the Tri-Cities and Northeast Tennessee."],
    services: [
      { name: "IV Lounge", href: "/iv-lounge-kingsport-tn", description: "Hydration and nutrient drips administered by trained medical staff." },
      { name: "Peptide Therapy", href: "/peptide-therapy-kingsport-tn", description: "Personalized peptide protocols when clinically appropriate." },
      { name: "Kingsport Wellness Clinic", href: "/wellness-clinic-kingsport-tn", description: "Local wellness and longevity care in Kingsport." }
    ],
    faqs: [
      { q: "How long does an IV appointment take?", a: "Many IV appointments take about 30 to 60 minutes, depending on the selected drip and your individual needs." },
      { q: "Is IV therapy appropriate for everyone?", a: "No. A medical screening is required, and certain conditions or medications may affect eligibility." },
      { q: "Do you offer wellness care near Johnson City?", a: "Yes. Our Jonesborough location serves many patients from Johnson City and nearby Washington County communities." }
    ]
  },
  {
    route: "/hormone-optimization",
    title: "Hormone Optimization | Kingsport, Jonesborough & Tri-Cities TN",
    description: "Lab-guided hormone optimization and longevity care for women and men in Kingsport and Jonesborough, serving the Tri-Cities.",
    keywords: "hormone therapy Kingsport TN, hormone optimization Jonesborough, HRT Tri-Cities, testosterone therapy Kingsport, women's hormones Tennessee",
    h1: "Hormone Optimization in Kingsport & Jonesborough",
    quickAnswer: "Balanced Wellness provides individualized hormone care based on symptoms, health history, laboratory testing, and ongoing medical monitoring.",
    intro: ["Our approach may include lifestyle guidance, targeted supplementation, or prescription therapy when clinically appropriate.", "Care is available for women and men at our Kingsport and Jonesborough locations and through eligible follow-up visits."],
    services: [
      { name: "Hormone Therapy", href: "/hormone-therapy-kingsport-tn", description: "Detailed program information and candidacy guidance." },
      { name: "Women's Health", href: "/womens-health-kingsport-tn", description: "Personalized support for women's hormonal health." },
      { name: "Men's Health", href: "/mens-health-kingsport-tn", description: "Lab-guided men's health and optimization care." },
      { name: "Telehealth", href: "/telehealth", description: "Virtual follow-up options for eligible patients." }
    ],
    faqs: [
      { q: "Is lab testing required for hormone therapy?", a: "Yes. Appropriate lab work and a medical evaluation are essential before starting or adjusting hormone treatment." },
      { q: "How often is hormone therapy monitored?", a: "Monitoring frequency is personalized, but follow-up visits and repeat labs are used to evaluate safety and response." },
      { q: "Do you treat both women and men?", a: "Yes. Balanced Wellness offers individualized hormone and wellness care for adult women and men." }
    ]
  }
];

function renderHubBody(d: HubPageData, canonicalUrl: string): string {
  const services = d.services.map((s) => `<li><a href="${escapeAttr(s.href)}"><strong>${escapeHtml(s.name)}</strong></a> — ${escapeHtml(s.description)}</li>`).join("\n");
  const faqs = d.faqs.map((f) => `<div><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`).join("\n");
  return `
    <div id="prerender-content" data-prerender>
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>${escapeHtml(d.h1)}</span></nav>
      <header>
        <h1>${escapeHtml(d.h1)}</h1>
        <p>${escapeHtml(d.description)}</p>
        <p><a href="/book">Book a Consultation</a> · <a href="tel:423-765-1393">Kingsport (423) 765-1393</a> · <a href="tel:423-646-2169">Jonesborough (423) 646-2169</a></p>
      </header>
      <section aria-label="Quick Answer"><h2>Quick Answer</h2><p>${escapeHtml(d.quickAnswer)}</p></section>
      <section><h2>Local, Personalized Care</h2>${d.intro.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n")}</section>
      <section><h2>Popular Services</h2><ul>${services}</ul></section>
      <section><h2>Frequently Asked Questions</h2>${faqs}</section>
      <section>
        <h2>Two Tri-Cities Locations</h2>
        <address><strong>Kingsport</strong><br>1309 South John B Dennis Hwy, Suite 104<br>Kingsport, TN 37660<br><a href="tel:423-765-1393">(423) 765-1393</a></address>
        <address><strong>Jonesborough</strong><br>120 South Cherokee Street<br>Jonesborough, TN 37659<br><a href="tel:423-646-2169">(423) 646-2169</a></address>
      </section>
      <p><a href="${escapeAttr(canonicalUrl)}">${escapeHtml(d.h1)} — Balanced Wellness Medical Spa</a></p>
    </div>`;
}

async function prerenderHubRoute(d: HubPageData, template: string) {
  const canonicalUrl = `${ORIGIN}${d.route}`;
  const jsonLd = [
    LOCAL_BUSINESS_SCHEMA,
    medicalProcedureSchema(d.h1, d.description, canonicalUrl),
    faqPageSchema(d.faqs, canonicalUrl),
    breadcrumbsForService(d.h1, canonicalUrl),
  ];
  let html = applyHeadToTemplate(template, {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    canonicalUrl,
    jsonLd,
  });
  html = injectBody(html, renderHubBody(d, canonicalUrl));
  await writeRoute(d.route, html);
}

async function main() {
  const templatePath = path.join(DIST, "index.html");
  const template = await fs.readFile(templatePath, "utf8");

  // Sanity check — the things our regexes target must exist.
  if (!template.includes('<div id="root">')) {
    throw new Error("[prerender] dist/index.html missing <div id=\"root\"> — build first.");
  }

  await prerenderHomeRoute(template);
  for (const hub of HUB_PAGES) await prerenderHubRoute(hub, template);
  await prerenderServiceRoute("/botox-kingsport-tn", botoxData as ServicePageData, template);
  await prerenderServiceRoute("/dysport-kingsport-tn", dysportData as ServicePageData, template);
  await prerenderServiceRoute("/daxxify-kingsport-tn", daxxifyData as ServicePageData, template);
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
    "/lip-filler-kingsport-tn",
    lipFillerData as ServicePageData,
    template,
  );
  await prerenderServiceRoute(
    "/laser-skin-rejuvenation-kingsport-tn",
    laserSkinData as ServicePageData,
    template,
  );
  await prerenderServiceRoute(
    "/skin-tightening-kingsport-tn",
    skinTighteningData as ServicePageData,
    template,
  );
  await prerenderLocalRoute(
    "/weight-loss-clinic-kingsport-tn",
    weightLossClinicData as LocalPageData,
    template,
  );
  await prerenderLocalRoute(
    "/wellness-clinic-kingsport-tn",
    wellnessClinicData as LocalPageData,
    template,
  );
  await prerenderLocalRoute(
    "/kingsport-med-spa",
    kingsportMedSpaData as LocalPageData,
    template,
  );
  await prerenderLocalRoute(
    "/jonesborough-med-spa",
    jonesboroughMedSpaData as LocalPageData,
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
