import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles, Bot, ChevronRight, Star, Phone, MapPin, ArrowRight,
  HelpCircle, MessageSquare, CalendarCheck, CheckCircle2, Play,
  Gem, ClipboardCheck, ShieldCheck,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CTA } from "@/components/ui/CTA";
import { SEO } from "@/components/SEO";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";
import { FlexiblePaymentsSection } from "@/components/FlexiblePaymentsSection";
import { useBookingChooser } from "@/components/booking/LocationChooser";
import { LOCATIONS, setPreferredLocation, type LocationId } from "@/lib/booking";
import {
  PRIMARY_CONCERNS,
  BROWSE_CONCERNS,
  SIGNATURE_TREATMENTS,
  PROVIDERS,
  TRUST_SIGNALS,
  HEADLINE_STATS,
} from "@/lib/site";
import { useEffect } from "react";

/**
 * Website 3.0 — luxury, concern-first homepage.
 *
 * Cinematic hero (video-ready shell), "What brings you here today?" concern
 * routing, AI concierge entry, signature treatments, browse-by-concern,
 * providers, real results, memberships, telehealth, locations, FAQ + schema.
 *
 * All content is data-driven via src/lib/site.ts; every link points to a route
 * that already exists in src/App.tsx (no 404s).
 */

/**
 * Cinematic hero background video. Left intentionally empty — drop in a real,
 * brand-shot clinic reel here (e.g. "/video/hero.mp4") and it renders
 * automatically behind the charcoal gradient. No generic stock is used.
 */
const HERO_VIDEO_SRC = "";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Fire the AI concierge with an optional seeded prompt. */
function askKelli(prompt?: string) {
  window.dispatchEvent(
    new CustomEvent("askKelliAI", prompt ? { detail: { prompt } } : undefined),
  );
}

const homeFaqs = [
  {
    q: "What is the best med spa in Kingsport TN?",
    a: "Balanced Wellness Medical Spa is one of the most-reviewed and highest-rated med spas in Kingsport, TN, with over 8,000 patients treated, 200+ five-star Google ratings, and a full menu that combines aesthetics with medical wellness — Botox, dermal fillers, RF microneedling, CO2 laser resurfacing, medical weight loss (Semaglutide and Tirzepatide), bioidentical hormone therapy, and peptide therapy. Our Kingsport clinic is at 1309 South John B Dennis Hwy, Suite 104, Kingsport, TN 37660 — and we also have a second location in Jonesborough at 120 South Cherokee St, giving Tri-Cities patients more scheduling flexibility.",
  },
  {
    q: "Where is Balanced Wellness Medical Spa located in Kingsport, TN?",
    a: "Our Kingsport location is at 1309 South John B Dennis Hwy, Suite 104, Kingsport, TN 37660. Call (423) 765-1393 to book. Kingsport hours are Monday through Thursday 10 AM to 7 PM and Friday 9 AM to 5 PM. We also have a Jonesborough location at 120 South Cherokee St, Jonesborough, TN 37659 — (423) 646-2169 — open Monday through Friday 10 AM to 6 PM.",
  },
  {
    q: "How much does Botox cost in Kingsport TN?",
    a: "Botox pricing at Balanced Wellness Medical Spa starts between $200–$600 per session depending on the areas treated. We offer free consultations to provide an exact quote tailored to your goals, and our VIP membership plans include discounts on all injectable treatments. Call (423) 765-1393 for current pricing.",
  },
  {
    q: "How much does CO2 laser resurfacing cost?",
    a: "CO2 laser resurfacing at Balanced Wellness Medical Spa typically ranges from $800–$2,500 depending on the treatment area and depth. Fractional treatments start lower. We offer flexible payment options through CareCredit and Cherry. Book a free consultation to get an exact quote.",
  },
  {
    q: "What does RF Microneedling treat?",
    a: "RF Microneedling treats fine lines, wrinkles, acne scars, enlarged pores, uneven skin texture, stretch marks, and skin laxity. It combines microneedling with radiofrequency energy to stimulate deep collagen production, resulting in firmer, smoother skin. Results improve progressively over 3–6 months.",
  },
  {
    q: "How much does medical weight loss cost?",
    a: "Medical weight loss programs at Balanced Wellness start with a free consultation. Semaglutide and Tirzepatide programs typically range from $250–$500/month depending on the protocol and dosage. Many patients see significant results within 3–6 months. Call either location to learn about current pricing and specials.",
  },
];

const reviews = [
  { name: "Sarah M.", location: "Kingsport", treatment: "Botox", text: "Absolutely love this place! The staff is incredibly knowledgeable and made me feel so comfortable. My results look completely natural — I get compliments all the time.", stars: 5 },
  { name: "Jennifer T.", location: "Jonesborough", treatment: "Weight Loss", text: "Down 42 pounds and feeling better than I have in years. The team monitors everything closely and really cares about your progress. Life-changing experience.", stars: 5 },
  { name: "Amanda R.", location: "Kingsport", treatment: "CO2 Laser", text: "My skin looks 10 years younger after my CO2 laser treatment. The provider walked me through every step and the results exceeded my expectations completely.", stars: 5 },
  { name: "Michelle K.", location: "Jonesborough", treatment: "Lip Filler", text: "I was nervous about lip filler but they made it so easy. The results are gorgeous and so natural. I won't go anywhere else — these are my people!", stars: 5 },
  { name: "Tara B.", location: "Kingsport", treatment: "RF Microneedling", text: "Three sessions in and my acne scars are dramatically reduced. The staff is professional and the facility is beautiful. Highly recommend to anyone in the Tri-Cities area.", stars: 5 },
  { name: "Lisa W.", location: "Kingsport", treatment: "Hormones", text: "Finally feel like myself again after hormone optimization. Energy is back, mood is stable, sleeping great. Worth every penny and the team is so supportive.", stars: 5 },
];

const membershipTiers = [
  { tier: "Gold", price: "$99", bestFor: "Best for: New patients starting their aesthetic journey", annualSavings: "Save $200+ annually", highlights: ["10% off all treatments", "Monthly B12 injection", "Priority booking", "Birthday treatment credit"], popular: false },
  { tier: "Platinum", price: "$199", bestFor: "Best for: Regular patients who want consistent results", annualSavings: "Save $600+ annually", highlights: ["15% off all treatments", "Monthly facial or peel", "Complimentary consultations", "VIP events access", "Rollover unused credits"], popular: true },
  { tier: "Diamond", price: "$349", bestFor: "Best for: Patients committed to total wellness & aesthetics", annualSavings: "Save $1,200+ annually", highlights: ["20% off all treatments", "Monthly injectable credit", "Quarterly IV therapy", "Exclusive member pricing", "Concierge scheduling", "Complimentary skin analysis"], popular: false },
];

export default function Home() {
  const { open: openBookingChooser } = useBookingChooser();
  const prefersReducedMotion = useReducedMotion();

  // Motion presets respect the user's reduced-motion preference.
  const fadeUp = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.7, ease: easeOut as unknown as number[] },
      };
  const item = (i: number) =>
    prefersReducedMotion
      ? { initial: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.5, delay: i * 0.06, ease: easeOut as unknown as number[] },
        };

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    };
    const existing = document.getElementById("home-faq-schema");
    if (existing) {
      existing.textContent = JSON.stringify(faqSchema);
    } else {
      const script = document.createElement("script");
      script.id = "home-faq-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    }
    return () => {
      document.getElementById("home-faq-schema")?.remove();
    };
  }, []);

  return (
    <PageLayout>
      <LocalBusinessSchema />
      <SEO
        title="Balanced Wellness Medical Spa | Kingsport & Jonesborough TN | Book a Free Consultation"
        description="Premier med spa in Kingsport TN and Jonesborough TN. Botox, dermal fillers, RF microneedling, CO2 laser, medical weight loss (Semaglutide/Tirzepatide), and hormone optimization. Board-certified providers. 8,000+ patients treated. 200+ 5-star reviews."
        keywords="Med Spa Kingsport TN, Med Spa Jonesborough TN, Botox Kingsport TN, RF Microneedling Kingsport, CO2 Laser Jonesborough TN, Medical Weight Loss Kingsport TN, dermal fillers Kingsport, Semaglutide Kingsport TN, hormone therapy Jonesborough TN"
      />

      {/* ─────────────────────────  HERO  ───────────────────────── */}
      <section className="relative overflow-hidden luxury-gradient-dark min-h-[92vh] flex items-center">
        {/* Cinematic, video-ready backdrop. Real clinic reel drops into HERO_VIDEO_SRC. */}
        {HERO_VIDEO_SRC ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src={HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            poster="/images/logo.png"
          />
        ) : null}

        {/* Layered charcoal wash + soft brand glows (no generic stock imagery). */}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)", backgroundSize: "38px 38px" }} />
        <div className="absolute -top-24 right-[-6%] w-[26rem] h-[26rem] rounded-full bg-champagne/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-6rem] left-[-6%] w-[22rem] h-[22rem] rounded-full bg-[hsl(var(--blush)/0.10)] blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full py-24 md:py-28 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut as unknown as number[] }}
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white/80 text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase mb-8">
              <MapPin className="w-3.5 h-3.5 text-champagne" /> Kingsport &amp; Jonesborough · Tri-Cities, TN
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-serif font-bold text-white leading-[1.06] mb-6 text-balance">
              Look Better. Feel Better.{" "}
              <span className="italic text-gradient-gold">Live Balanced.</span>
            </h1>

            <p className="text-base md:text-lg text-white/60 mb-10 leading-relaxed max-w-2xl mx-auto">
              Personalized aesthetic medicine, wellness, weight loss, hormone
              optimization, and regenerative treatments designed around you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <button
                type="button"
                onClick={() => openBookingChooser({ service: "Consultation" })}
                className="group px-8 py-4 bg-white text-foreground text-center font-semibold rounded-full shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm"
              >
                Book Your Consultation
                <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => askKelli("What brings you here today?")}
                className="px-8 py-4 bg-white/[0.06] text-white text-center font-medium rounded-full border border-white/15 backdrop-blur-sm hover:bg-white/[0.12] transition-all duration-300 text-sm flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-champagne" /> Take the AI Beauty Assessment
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
              <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-champagne text-champagne" />)}</div>
              <span className="text-sm font-medium text-white/70">5.0</span>
              <span className="text-white/25">·</span>
              <span className="text-sm text-white/50">200+ five-star reviews · 8,000+ patients treated</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll affordance */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.2em]">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ───────────  WHAT BRINGS YOU HERE TODAY? (concern-first)  ─────────── */}
      <Section className="bg-background">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Start Here</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">What brings you here today?</h2>
          <p className="text-foreground/50 text-sm md:text-base max-w-xl mx-auto">Choose a goal and we'll guide you to the right care — no guesswork.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {PRIMARY_CONCERNS.map((c, i) => (
            <motion.div key={c.label} {...item(i)}>
              <Link
                href={c.href}
                className="group flex flex-col items-center text-center h-full p-5 rounded-2xl border border-border bg-white hover:luxury-shadow-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/[0.06] text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <c.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-serif font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{c.label}</h3>
                <p className="text-[11px] text-foreground/45 leading-snug">{c.blurb}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={() => askKelli("What brings you here today?")}
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/15 text-sm"
          >
            <Bot className="w-4 h-4" /> Not sure? Ask KelliAI
          </button>
          <Link href="/services" className="inline-flex items-center text-primary font-semibold text-sm hover:underline underline-offset-4">
            Browse all treatments <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </Section>

      {/* ───────────────────────  TRUST BAR  ─────────────────────── */}
      <section className="luxury-gradient border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {TRUST_SIGNALS.map((t, i) => (
              <motion.div key={t.label} {...item(i)} className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-border luxury-shadow">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.06] text-primary flex items-center justify-center flex-shrink-0">
                  <t.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">{t.label}</p>
                  <p className="text-xs text-foreground/50 mt-0.5 leading-snug">{t.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HEADLINE_STATS.map((s, i) => (
              <motion.div key={s.label} {...item(i)} className="text-center">
                <p className="text-3xl md:text-4xl font-serif font-bold text-primary stat-number">{s.number}</p>
                <p className="text-[11px] text-foreground/50 mt-1 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────  THE BALANCED DIFFERENCE (premium positioning)  ────────────── */}
      <Section className="bg-background">
        <div className="text-center mb-12 md:mb-16">
          <Eyebrow tone="gold" className="mb-4">The Balanced Difference</Eyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Full-face balancing for women 40+
          </h2>
          <p className="text-foreground/55 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We're the trusted choice for natural-looking refinement — never the
            fast, one-size-fits-all option. Every treatment is guided by a plan
            built entirely around your goals.
          </p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            {
              icon: Sparkles,
              title: "Full-Face Balancing for Women 40+",
              desc: "Aging shows across the whole face — not one line. Our providers assess your full facial harmony, restoring natural-looking refinement that still looks like you, only more rested and radiant.",
            },
            {
              icon: ClipboardCheck,
              title: "A Plan Built Around Your Goals",
              desc: "No cookie-cutter menus. We map a personalized, long-term strategy to your goals, your timeline, and your comfort — so each visit builds intentionally toward the results you want.",
            },
            {
              icon: ShieldCheck,
              title: "The Trusted Choice, Not a Shortcut",
              desc: "Advanced provider training, medical oversight, and premium products are the standard here. It's refined, confidence-building care you can trust for years — not a quick fix.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              {...item(i)}
              className="luxury-card p-7 flex flex-col h-full"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/[0.08] text-gold-ink flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-foreground/55 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={() => openBookingChooser({ service: "Full-Face Balancing Consultation" })}
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/15 text-sm"
          >
            <Gem className="w-4 h-4" /> Book Your Full-Face Consultation
          </button>
          <button
            type="button"
            onClick={() => askKelli("I'm over 40 — what does full-face balancing involve?")}
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-foreground font-medium rounded-full border border-border hover:luxury-shadow transition-all text-sm"
          >
            <Bot className="w-4 h-4 text-primary" /> Ask about full-face balancing
          </button>
        </div>
      </Section>

      {/* ───────────────────  SIGNATURE TREATMENTS  ─────────────────── */}
      <Section className="bg-background">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">What We're Known For</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">Signature Treatments</h2>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SIGNATURE_TREATMENTS.map((t, i) => (
            <motion.div key={t.name} {...item(i)} className="relative">
              {t.badge && <div className="absolute -top-2.5 left-4 z-10 px-3 py-0.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{t.badge}</div>}
              <Link href={t.href} className="group block h-full p-6 rounded-2xl border border-border bg-white hover:luxury-shadow-lg hover:border-primary/20 transition-all duration-500">
                <div className="w-11 h-11 rounded-xl bg-primary/[0.06] text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <t.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{t.name}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed mb-4">{t.desc}</p>
                <span className="inline-flex items-center text-xs text-primary font-semibold gap-1 group-hover:gap-2 transition-all duration-200">
                  See results, pricing &amp; what to expect <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ────────────────────  BROWSE BY CONCERN  ──────────────────── */}
      <Section className="luxury-gradient">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Know what's bothering you?</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Browse by Concern</h2>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 max-w-4xl mx-auto">
          {BROWSE_CONCERNS.map((c, i) => (
            <motion.div key={`${c.label}-${i}`} {...item(i)}>
              <Link
                href={c.href}
                className="group flex items-center gap-2.5 py-2.5 pl-3 pr-4 rounded-full bg-white border border-border hover:border-primary/30 hover:luxury-shadow transition-all duration-300"
              >
                <span className="w-8 h-8 rounded-full bg-primary/[0.06] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <c.icon className="w-4 h-4" />
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{c.label}</span>
                <span className="text-[11px] text-foreground/40 hidden sm:inline">{c.blurb}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ──────────────────  KELLIAI CONCIERGE  ────────────────── */}
      <Section className="bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary/[0.06] border border-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-4">
              <Bot className="w-3.5 h-3.5" /> Your Personal Concierge
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Meet KelliAI</h2>
            <p className="text-foreground/50 text-sm max-w-xl mx-auto">Your virtual wellness concierge answers questions about treatments, candidacy, memberships, and pricing — instantly, 24/7. Then hands you off to book in seconds.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { prompt: "Which treatment is right for my wrinkles?" },
              { prompt: "Am I a candidate for weight loss medication?" },
              { prompt: "Compare memberships for me" },
              { prompt: "What treats acne scars?" },
              { prompt: "How much does Botox cost?" },
              { prompt: "What helps with skin tightening?" },
            ].map((q, i) => (
              <motion.button
                key={q.prompt}
                {...item(i)}
                onClick={() => askKelli(q.prompt)}
                className="group flex items-center gap-3 p-4 rounded-2xl border border-border bg-white hover:luxury-shadow-lg hover:border-primary/20 transition-all duration-300 text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{q.prompt}</p>
                  <p className="text-[11px] text-foreground/35 mt-0.5">Tap to ask KelliAI</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </motion.button>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => askKelli("What brings you here today?")}
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/15 text-sm"
            >
              <MessageSquare className="w-4 h-4" /> Start the AI Beauty Assessment
            </button>
          </div>
        </div>
      </Section>

      {/* ──────────────────────  PROVIDERS  ────────────────────── */}
      <Section className="luxury-gradient">
        <div className="text-center mb-12">
          <Eyebrow tone="sage" className="mb-4">Your Care Team</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Led by Licensed Medical Providers</h2>
          <p className="text-foreground/65 text-base max-w-xl mx-auto leading-relaxed">Every plan is created and supervised by experienced clinicians — never a one-size-fits-all menu.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PROVIDERS.map((p, i) => (
            <motion.div key={p.name} {...item(i)} className="luxury-card p-7 flex gap-5 items-start">
              {p.photo ? (
                <img
                  src={p.photo}
                  alt={p.photoAlt ?? `${p.name}, ${p.credential} at Balanced Wellness Medical Spa`}
                  width={112}
                  height={140}
                  loading="lazy"
                  decoding="async"
                  className="flex-shrink-0 w-24 h-32 md:w-28 md:h-36 rounded-2xl object-cover object-top border border-primary/10 luxury-shadow"
                />
              ) : (
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/[0.06] border border-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-serif font-bold text-gradient-gold">{p.initials}</span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground">{p.name}<span className="text-sm font-sans font-semibold text-gold-ink">, {p.credential}</span></h3>
                <p className="flex items-center gap-1.5 text-[11px] text-foreground/60 uppercase tracking-wider mb-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />{p.title}
                </p>
                <div className="space-y-2">
                  {(p.excerpt ?? p.bio).split("\n\n").map((para, j) => (
                    <p key={j} className="text-sm text-foreground/70 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/about#team" className="group inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-gold/60 hover:bg-gold/10">
            Meet the full team, including our practice leadership
            <ChevronRight className="w-4 h-4 text-gold-ink transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Section>

      {/* ────────────────────  REAL RESULTS  ──────────────────── */}
      <Section className="bg-background">
        <div className="text-center mb-12">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Real Results</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Before &amp; After Transformations</h2>
          <p className="text-foreground/45 mt-3 text-sm">Drag to reveal actual patient results at Balanced Wellness Medical Spa.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-10">
          {[
            { before: "/images/laser-before.jpg", after: "/images/laser-after.jpg", title: "CO2 Laser Resurfacing" },
            { before: "/images/lips-before.jpg", after: "/images/lips-after.jpg", title: "Lip Filler" },
            { before: "/images/before-lips-branded.jpg", after: "/images/after-lips-branded.jpg", title: "Lip Filler — Natural Look" },
            { before: "/images/before-weightloss.jpg", after: "/images/after-weightloss.jpg", title: "Medical Weight Loss" },
          ].map((photo, i) => (
            <motion.div key={photo.title} {...item(i)} className="luxury-card overflow-hidden">
              <BeforeAfterSlider beforeImage={photo.before} afterImage={photo.after} />
              <div className="p-4 text-center"><h3 className="text-sm font-serif font-bold text-foreground">{photo.title}</h3></div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/gallery" className="inline-flex items-center gap-2 px-7 py-2.5 bg-white text-foreground font-medium rounded-full border border-border hover:luxury-shadow transition-all text-sm">
            <Play className="w-4 h-4 text-primary" /> View Full Gallery
          </Link>
          <button type="button" onClick={() => openBookingChooser({ service: "Consultation" })} className="inline-block px-7 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/15 text-sm">Book Your Consultation</button>
        </div>
      </Section>

      {/* ────────────────  REVIEWS / TESTIMONIALS  ──────────────── */}
      <Section className="luxury-gradient">
        <div className="text-center mb-14">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Patient Stories</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">What Our Patients Say</h2>
          <p className="text-foreground/45 text-sm">Real reviews from real patients across Kingsport and Jonesborough.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reviews.map((review, i) => (
            <motion.div key={review.name} {...item(i)} className="p-6 rounded-2xl bg-white border border-border hover:luxury-shadow transition-all duration-300">
              <div className="flex gap-0.5 mb-3">{[...Array(review.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-gold text-gold" />)}</div>
              <p className="text-sm text-foreground/65 leading-relaxed mb-4 italic">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-[11px] text-foreground/40 uppercase tracking-wider mt-0.5">{review.location}</p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-primary/[0.06] border border-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wide">{review.treatment}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://www.google.com/maps/place/Balanced+Wellness+Medical+Spa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-foreground font-medium rounded-full border border-border hover:luxury-shadow transition-all text-sm">
            <Star className="w-4 h-4 text-gold fill-gold" /> Read Google Reviews
          </a>
          <a href="https://www.facebook.com/balancedwellnessmedspa/reviews" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-foreground font-medium rounded-full border border-border hover:luxury-shadow transition-all text-sm">
            <Star className="w-4 h-4 text-gold fill-gold" /> Read Facebook Reviews
          </a>
        </div>
      </Section>

      {/* ─────────────  TELEHEALTH + ONLINE CARE GATEWAY  ───────────── */}
      <Section className="bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="luxury-card p-8 flex flex-col">
            <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-3">Telehealth</p>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Care from anywhere in Tennessee</h3>
            <p className="text-sm text-foreground/55 leading-relaxed mb-6 flex-1">Start weight loss, hormone, and skincare programs with a virtual consultation — no drive required. Prescriptions and refills handled through our secure online portal.</p>
            <Link href="/online-care" className="inline-flex items-center gap-2 self-start px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/15 text-sm">
              Explore Online Care <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div {...fadeUp} className="luxury-card p-8 flex flex-col">
            <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-3">Shop &amp; Refills</p>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Medical-grade products &amp; Rx refills</h3>
            <p className="text-sm text-foreground/55 leading-relaxed mb-6 flex-1">Reorder medical-grade skincare and prescription refills online, and take a personalized assessment to build your at-home regimen — reviewed by our providers.</p>
            <Link href="/online-care" className="inline-flex items-center gap-2 self-start px-6 py-2.5 bg-white text-foreground font-medium rounded-full border border-border hover:luxury-shadow transition-all text-sm">
              Shop &amp; Refill Online <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </motion.div>
        </div>
      </Section>

      <FlexiblePaymentsSection />

      {/* ──────────────────────  MEMBERSHIPS  ────────────────────── */}
      <Section className="luxury-gradient">
        <div className="text-center mb-14">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">VIP Memberships</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Exclusive Wellness Memberships</h2>
          <p className="text-foreground/45 mt-3 text-sm">Join our VIP program for exclusive savings, priority booking, and complimentary monthly treatments.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-6">
          {membershipTiers.map((m, i) => (
            <motion.div key={m.tier} {...item(i)} className={`relative p-7 rounded-2xl bg-white border transition-all duration-500 ${m.popular ? "border-primary/30 luxury-shadow-lg md:scale-[1.03]" : "border-border hover:luxury-shadow"}`}>
              {m.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-[10px] uppercase tracking-widest font-bold rounded-full">Most Popular</div>}
              <p className="text-xs text-primary font-semibold uppercase tracking-[0.15em] mb-1">{m.tier}</p>
              <p className="text-3xl font-serif font-bold text-foreground mb-1">{m.price}<span className="text-sm font-sans font-normal text-foreground/40">/mo</span></p>
              <p className="text-xs text-foreground/40 italic mb-1">{m.bestFor}</p>
              <p className="text-xs font-semibold text-primary mb-4">✦ {m.annualSavings}</p>
              <div className="section-divider my-4" />
              <ul className="space-y-2.5 mb-7">
                {m.highlights.map((h) => (
                  <li key={h} className="flex items-start text-sm text-foreground/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-2 mt-0.5 flex-shrink-0" /> {h}
                  </li>
                ))}
              </ul>
              <Link href="/memberships" className={`block text-center py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${m.popular ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20" : "border border-primary/30 text-primary hover:bg-primary hover:text-white"}`}>
                Find My Best Membership Tier
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-foreground/40">6-month minimum commitment. Cancel anytime after initial term.</p>
      </Section>

      {/* ────────────────────────  FAQ  ──────────────────────── */}
      <Section className="luxury-gradient-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-[10%] w-[300px] h-[300px] rounded-full bg-champagne/5 blur-[100px]" />
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/[0.06] border border-white/[0.08] text-champagne text-xs font-medium uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Med Spa FAQ — Kingsport &amp; Jonesborough TN</h2>
            <p className="text-white/40 text-sm max-w-2xl mx-auto">Common questions about treatments, pricing, and what to expect at Balanced Wellness.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {homeFaqs.map((faq, i) => (
              <motion.div key={faq.q} {...item(i)} className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] transition-all duration-500">
                <h3 className="font-bold text-champagne mb-3 text-[15px]">{faq.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ──────────────────────  LOCATIONS  ────────────────────── */}
      <Section className="luxury-gradient border-t border-border/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Two Convenient Locations</h2>
          <p className="text-foreground/45 mt-3 text-sm">Visit us in Kingsport or Jonesborough for a complimentary consultation.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { id: "kingsport" as LocationId, city: "Kingsport", address: "1309 South John B Dennis Hwy, Suite 104", zip: "Kingsport, TN 37660", phone: "(423) 765-1393", tel: "423-765-1393", mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5!2d-82.5494!3d36.5149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1309+S+John+B+Dennis+Hwy+%23104%2C+Kingsport%2C+TN+37660!5e0!3m2!1sen!2sus!4v1" },
            { id: "jonesborough" as LocationId, city: "Jonesborough", address: "120 South Cherokee St", zip: "Jonesborough, TN 37659", phone: "(423) 646-2169", tel: "423-646-2169", mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5!2d-82.473!3d36.294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s120+S+Cherokee+St%2C+Jonesborough%2C+TN+37659!5e0!3m2!1sen!2sus!4v1" },
          ].map((loc) => (
            <motion.div key={loc.city} {...fadeUp} className="luxury-card p-7">
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">{loc.city} Location</h3>
              <div className="space-y-3 mb-5">
                <div className="flex items-start text-sm text-foreground/60">
                  <MapPin className="w-4 h-4 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>{loc.address}<br />{loc.zip}</span>
                </div>
                <a href={`tel:${loc.tel}`} className="flex items-center text-primary font-semibold text-sm hover:underline underline-offset-2">
                  <Phone className="w-4 h-4 mr-3" /> {loc.phone}
                </a>
              </div>
              <div className="h-36 bg-muted rounded-xl overflow-hidden border border-border mb-4">
                <iframe src={loc.mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${loc.city} Location Map`} />
              </div>
              <a
                href={LOCATIONS[loc.id].bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPreferredLocation(loc.id)}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/15"
              >
                <CalendarCheck className="w-4 h-4" /> Book at {loc.city}
              </a>
            </motion.div>
          ))}
        </div>
      </Section>

      <CTA
        title="Ready to Look Better, Feel Better, and Live Balanced?"
        subtitle="Schedule a complimentary consultation with our expert providers and discover a treatment plan built entirely around you."
        buttonText="Book Your Consultation"
      />

      {/* ─────────────────  STICKY MOBILE CTA BAR  ───────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-xl">
        <div className="flex items-stretch">
          <a href="tel:423-765-1393" className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 border-r border-border text-foreground/70 hover:bg-background transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-medium uppercase tracking-wide">Call</span>
          </a>
          <button type="button" onClick={() => openBookingChooser({ service: "Consultation" })}
            className="flex-[2] flex items-center justify-center py-3 bg-primary text-white font-semibold text-sm gap-2 hover:bg-primary/90 transition-colors">
            <CalendarCheck className="w-4 h-4" /> Book Consultation
          </button>
          <button type="button" onClick={() => askKelli("What brings you here today?")} className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 border-l border-border text-foreground/70 hover:bg-background transition-colors">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-medium uppercase tracking-wide">KelliAI</span>
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
