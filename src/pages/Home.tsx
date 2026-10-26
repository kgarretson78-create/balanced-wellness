import { Link } from "wouter";
import { ArrowUpRight, ArrowRight, Plus, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FeaturedReviews } from "@/components/FeaturedReviews";
import { useBookingChooser } from "@/components/booking/LocationChooser";
import { LOCATIONS, setPreferredLocation, type LocationId } from "@/lib/booking";

export const HOME_SEO = {
  title:
    "Balanced Wellness Medical Spa | Kingsport & Jonesborough TN | Book a Free Consultation",
  description:
    "Medical spa in Kingsport TN and Jonesborough TN offering Botox, dermal fillers, RF microneedling, CO2 laser, medical weight loss, and hormone optimization. Explore services and book a consultation.",
  keywords:
    "Med Spa Kingsport TN, Med Spa Jonesborough TN, Botox Kingsport TN, RF Microneedling Kingsport, CO2 Laser Jonesborough TN, Medical Weight Loss Kingsport TN, dermal fillers Kingsport, Semaglutide Kingsport TN, hormone therapy Jonesborough TN",
};

/** Plain-text hero copy reused by the crawler prerender (no JSX styling). */
export const HOME_H1 = "Beautifully you. Perfectly balanced.";
export const HOME_SUBHEAD =
  "Personalized aesthetic medicine, wellness, weight loss, hormone optimization, and regenerative treatments designed around you — with two convenient Tri-Cities locations.";

/**
 * Concise, natural-language answer to "What is Balanced Wellness Medical Spa?"
 * Written for answer engines (ChatGPT, Perplexity, Gemini, Claude) and Google
 * AI Overviews — factual, local, and free of unverifiable superlatives.
 */
export const HOME_QUICK_ANSWER = {
  q: "What is Balanced Wellness Medical Spa?",
  a: "Balanced Wellness Medical Spa is a provider-led medical spa and wellness clinic serving Kingsport, Jonesborough, and the greater Tri-Cities region of Northeast Tennessee. The practice combines aesthetic medicine — Botox, Dysport, Daxxify, dermal and lip filler, RF microneedling, and CO2 laser resurfacing — with medical wellness, including physician-supervised weight loss (Semaglutide and Tirzepatide), bioidentical hormone optimization for men and women, peptide therapy, and IV therapy, all under one roof at two Tennessee locations.",
};

export const homeFaqs = [
  {
    q: "Where can I visit Balanced Wellness?",
    a: "Visit our Kingsport location at 1309 South John B Dennis Hwy, Suite 104, or our Jonesborough location at 120 South Cherokee St. Choose your location when booking so you see the right schedule.",
  },
  {
    q: "How do I choose a treatment?",
    a: "Start with a consultation. Share your goals and questions with the team, then discuss options, suitability, pricing, and next steps with your provider before deciding.",
  },
  {
    q: "How do I book an appointment?",
    a: "Select Book an Appointment, choose Kingsport or Jonesborough, and continue to that location's booking page. For help, call Kingsport at (423) 765-1393 or Jonesborough at (423) 646-2169.",
  },
];

const treatmentEdit = [
  { number: "01", name: "Injectables", detail: "Botox · Dysport · Daxxify · Dermal filler", href: "/injectables" },
  { number: "02", name: "Skin & laser", detail: "Laser treatments · RF microneedling · Skin care", href: "/laser-treatments" },
  { number: "03", name: "Medical wellness", detail: "Weight management · Hormone consultations · IV therapy", href: "/wellness" },
  { number: "04", name: "Online care", detail: "Explore our virtual consultation options", href: "/online-care" },
];
const spaces: { id: LocationId; label: string; image: string; caption: string; href: string }[] = [
  { id: "kingsport", label: "The Kingsport studio", image: "/images/locations/kingsport-reception.webp", caption: "Modern lines. A warm welcome.", href: "/medical-spa-kingsport-tn" },
  { id: "jonesborough", label: "The Jonesborough house", image: "/images/locations/jonesborough-interior.webp", caption: "Historic character. Thoughtful details.", href: "/medical-spa-jonesborough-tn" },
];

export default function Home() {
  const { open: openBookingChooser } = useBookingChooser();
  const book = () => openBookingChooser({ service: "Consultation" });
  return (
    <PageLayout>
      <SEO title={HOME_SEO.title} description={HOME_SEO.description} keywords={HOME_SEO.keywords} />
      <div className="bw-editorial">
        <section className="bw-hero" aria-labelledby="bw-hero-title">
          <div className="bw-hero-copy">
            <p className="bw-eyebrow">Kingsport &amp; Jonesborough, Tennessee</p>
            <h1 id="bw-hero-title">Beautifully you.<br /><em>Perfectly</em><br />balanced.</h1>
            <div className="bw-hero-rule" />
            <p className="bw-hero-intro">A personal approach to medical aesthetics and wellness. Considered care, in a space that feels like you.</p>
            <div className="bw-actions">
              <button type="button" onClick={book} className="bw-button">Book an appointment <ArrowUpRight aria-hidden="true" size={17} /></button>
              <a href="#the-treatment-edit" className="bw-text-link">Explore treatments <ArrowRight aria-hidden="true" size={15} /></a>
            </div>
            <p className="bw-hero-footnote">Balanced Wellness Medical Spa</p>
          </div>
          <figure className="bw-hero-image">
            <img src="/images/editorial/beauty-pink-gloves.jpeg" alt="Editorial beauty portrait with pink gloves" width="1120" height="1950" fetchPriority="high" />
            <figcaption><span>The art of being you.</span><span>Balanced <ArrowUpRight aria-hidden="true" size={16} /></span></figcaption>
          </figure>
        </section>

        <div className="bw-brand-line" aria-label="Medical aesthetics, skin and wellness"><span>Medical aesthetics</span><span aria-hidden="true">✦</span><span>Skin</span><span aria-hidden="true">✦</span><span>Wellness</span><span aria-hidden="true">✦</span><span>Balanced</span></div>

        <section className="bw-intro bw-wrap" aria-labelledby="bw-approach-title">
          <figure className="bw-provider-photo">
            <img src="/images/shelly-ketron.webp" alt="Shelly Ketron, PA-C, at Balanced Wellness Medical Spa" width="900" height="900" loading="lazy" />
            <figcaption>Shelly Ketron <span>PA-C</span></figcaption>
          </figure>
          <div className="bw-intro-copy">
            <p className="bw-eyebrow">The Balanced approach</p>
            <h2 id="bw-approach-title">Your goals.<br /><em>A considered approach.</em></h2>
            <p>There is no one-size-fits-all version of you. Start with a conversation about what matters to you, then explore your options with our team.</p>
            <p>From aesthetic treatments to wellness consultations, we make room for questions and an individual plan.</p>
            <Link href="/about" className="bw-text-link">Meet the people behind Balanced <ArrowUpRight aria-hidden="true" size={17} /></Link>
          </div>
        </section>

        <section className="bw-visual-edit" aria-label="The Balanced aesthetic">
          <figure className="bw-silk-frame"><img src="/images/editorial/blush-silk.jpeg" alt="Editorial beauty portrait framed in blush silk" loading="lazy" width="710" height="1536" /></figure>
          <div className="bw-visual-caption"><p className="bw-eyebrow">Beauty, on your terms</p><p>A little intention.<br /><em>A lot of you.</em></p><span>Medical aesthetics · Personal attention</span></div>
          <figure><img src="/images/editorial/pink-treatment-detail.jpeg" alt="Aesthetic treatment detail with pink gloves" loading="lazy" width="1078" height="1661" /></figure>
        </section>

        <section className="bw-treatment-section" id="the-treatment-edit" aria-labelledby="bw-treatment-title">
          <div className="bw-wrap">
            <div className="bw-section-heading">
              <div><p className="bw-eyebrow">A thoughtful collection</p><h2 id="bw-treatment-title">The treatment <em>edit.</em></h2></div>
              <Link href="/services" className="bw-text-link">View all services <ArrowUpRight aria-hidden="true" size={17} /></Link>
            </div>
            <div className="bw-treatment-list">
              {treatmentEdit.map(treatment => (
                <Link key={treatment.number} href={treatment.href} className="bw-treatment-row">
                  <span className="bw-treatment-number">{treatment.number}</span>
                  <h3>{treatment.name}</h3><p>{treatment.detail}</p><ArrowUpRight aria-hidden="true" className="bw-treatment-arrow" />
                </Link>
              ))}
            </div>
            <p className="bw-treatment-note">Your provider will discuss suitability and options with you. Individual experiences and results vary.</p>
          </div>
        </section>

        <section className="bw-spaces bw-wrap" id="locations" aria-labelledby="bw-spaces-title">
          <div className="bw-section-heading">
            <div><p className="bw-eyebrow">Two places. One Balanced welcome.</p><h2 id="bw-spaces-title">Find your <em>space.</em></h2></div>
            <p>Choose the location that fits your day.<br />We'll help you with the next step.</p>
          </div>
          <div className="bw-location-grid">
            {spaces.map(space => {
              const location = LOCATIONS[space.id];
              return <article className="bw-location-card" key={space.id}>
                <Link href={space.href} className="bw-location-image"><img src={space.image} alt={`Inside Balanced Wellness Medical Spa in ${location.city}`} width={space.id === "kingsport" ? 1152 : 1536} height={space.id === "kingsport" ? 1536 : 1152} loading="lazy" /><span>{location.city}</span></Link>
                <div className="bw-location-details">
                  <p className="bw-eyebrow">{space.caption}</p><h3>{space.label}</h3>
                  <p>{space.id === "kingsport" ? "1309 S John B Dennis Hwy, Suite 104" : "120 South Cherokee St"}<br />{space.id === "kingsport" ? "Kingsport, TN 37660" : "Jonesborough, TN 37659"}</p>
                  <div className="bw-location-actions"><a className="bw-text-link" href={location.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setPreferredLocation(space.id)}>{`Book ${location.name}`} <ArrowUpRight aria-hidden="true" size={16} /></a><a href={space.id === "kingsport" ? "tel:4237651393" : "tel:4236462169"} aria-label={`Call ${location.city}`}><Phone aria-hidden="true" size={16} />{space.id === "kingsport" ? "(423) 765-1393" : "(423) 646-2169"}</a></div>
                </div>
              </article>;
            })}
          </div>
        </section>

        <div className="bw-reviews"><FeaturedReviews /></div>

        <section className="bw-faq bw-wrap" aria-labelledby="bw-faq-title">
          <div><p className="bw-eyebrow">Before your visit</p><h2 id="bw-faq-title">A few things<br /><em>to know.</em></h2><Link href="/contact" className="bw-text-link">Ask us a question <ArrowUpRight aria-hidden="true" size={17} /></Link></div>
          <div className="bw-faq-list">{homeFaqs.map(faq => <details key={faq.q}><summary>{faq.q}<Plus aria-hidden="true" size={18} /></summary><p>{faq.a}</p></details>)}</div>
        </section>

        <section className="bw-final-cta">
          <p className="bw-eyebrow">Your next chapter starts with a conversation</p>
          <h2>Make time<br />for <em>you.</em></h2>
          <button type="button" onClick={book} className="bw-button">Find your appointment <ArrowUpRight aria-hidden="true" size={18} /></button>
          <p>Kingsport &amp; Jonesborough, Tennessee</p>
        </section>
      </div>
    </PageLayout>
  );
}
