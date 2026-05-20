import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  MapPin,
  Phone,
  Calendar,
  Star,
  Droplet,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { ServiceSchema, LocalBusinessSchema } from "@/components/SchemaMarkup";
import { useBookingChooser } from "@/components/booking/LocationChooser";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const CANONICAL_ORIGIN = "https://www.balancedmedicalspa.com";

// Single source of truth — also consumed by the prerender script.
export const data = {
  seo: {
    title: "IV Lounge Kingsport TN | IV Hydration Drips & Vitamin Therapy | Balanced Wellness",
    description:
      "IV Lounge in Kingsport TN at Balanced Wellness Medical Spa. IV hydration drips, Myers Cocktail, immune, recovery, beauty, and energy infusions. 45-minute sessions in a calm, luxe setting. Two Tri-Cities locations. Call (423) 765-1393.",
    keywords:
      "IV lounge Kingsport TN, IV hydration Kingsport TN, IV therapy Kingsport TN, IV drip near me Kingsport, Myers Cocktail Kingsport, hangover IV Kingsport, NAD IV Kingsport, IV vitamins Tri-Cities TN, IV hydration Johnson City TN, IV drip Jonesborough TN",
    canonicalPath: "/iv-lounge-kingsport-tn",
  },
  hero: {
    badge: "IV Lounge — Kingsport & Jonesborough TN",
    h1: "IV Lounge in Kingsport, TN",
    subheadline:
      "Hydration, energy, recovery, and beauty IV drips in a calm, luxe setting. Vitamin and mineral therapy delivered by medical providers at Balanced Wellness — with two convenient Tri-Cities locations.",
  },
  shortAnswer: {
    q: "Where can I get an IV drip in Kingsport, TN?",
    a: "You can book IV hydration in Kingsport, TN at the Balanced Wellness Medical Spa IV Lounge, located at 1309 South John B Dennis Hwy, Suite 104, Kingsport, TN 37660. Sessions are 45 minutes and start at $100 for basic hydration, with formulas like Myers Cocktail, Brainstorm, Recovery, Get-Up and Go, Reboot, and an Inner Body/Beauty drip from $129–$199. We also serve the Johnson City and Jonesborough area at 120 South Cherokee St, Jonesborough, TN 37659. Call (423) 765-1393 to book or use the booking buttons on this page.",
  },
  intro: {
    h2: "Welcome to the Balanced Wellness IV Lounge",
    body: [
      "The Balanced Wellness IV Lounge is a calm, low-key space inside our medical spa designed for one thing: helping you feel like yourself again. Whether you're recovering from a busy week, training for an event, fighting off something coming on, dehydrated after travel, or just want a noticeable energy and skin glow boost, our IV menu was built around the goals patients in Kingsport and the Johnson City/Jonesborough area ask for most.",
      "Every session is overseen by licensed medical providers. We use sterile, single-use IV supplies, professional-grade IV bags, and proven vitamin and mineral blends. Treatments take about 45 minutes — long enough to relax, short enough to slip into a lunch break or before a Saturday plan.",
      "IV hydration may support energy, hydration, recovery, and general wellness goals. It is not a treatment for any disease, not a substitute for medical care, and is not appropriate for everyone — that's why we screen each guest before placing an IV.",
    ],
  },
  benefits: [
    {
      title: "Direct Delivery",
      desc: "IV fluids and nutrients bypass the digestive tract, so they're available to your body quickly compared with oral options.",
    },
    {
      title: "Targeted Formulas",
      desc: "Choose a drip aligned with a specific goal — energy, recovery, hydration, immune support, focus, beauty, or PMS relief.",
    },
    {
      title: "Hydration That Actually Lands",
      desc: "A full liter of IV fluid plus electrolytes is a much faster way to rehydrate than sipping water all afternoon.",
    },
    {
      title: "Calm, Private Setting",
      desc: "Lounge in a quiet, relaxing space inside Balanced Wellness — no clinical exam-room feel.",
    },
    {
      title: "Medically Supervised",
      desc: "Licensed providers screen each guest, place each IV, and stay close throughout the session.",
    },
    {
      title: "Add-On Boosters",
      desc: "Optional add-ons like a Biotin booster let you tailor your drip without committing to an upgrade.",
    },
  ],
  whatIsIV: {
    h2: "What Is IV Hydration Therapy?",
    body: [
      "IV hydration therapy is the use of an intravenous infusion to deliver fluids, electrolytes, vitamins, and minerals directly into the bloodstream. Because the nutrients don't have to be digested first, they can become available to the body faster than swallowed supplements — which is part of why IV therapy is popular for energy, hydration, recovery, immune support, and beauty goals.",
      "At our Kingsport IV Lounge, every drip is administered by a licensed medical provider after a brief health review. We use professional, single-use IV supplies and standard vitamin and mineral compounds. IV therapy may support hydration, energy, athletic recovery, and general wellness goals — it isn't a treatment for any specific disease, isn't right for everyone, and doesn't replace medical care.",
    ],
  },
  experience: {
    h2: "A Personalized Wellness Experience",
    body: [
      "We don't believe in one-size-fits-all wellness. When you arrive at the IV Lounge, we'll review your goals, current symptoms, hydration status, medications, and any health considerations before recommending a drip — or suggesting you talk to your physician first if it's not a fit.",
      "If you visit us regularly, we can build a rotation across the menu (for example, a Recovery drip after a hard training week, an immune-supportive Myers Cocktail in winter, and a Get-Up and Go boost on a fatigued morning). For ongoing patients, IV Lounge memberships make a regular cadence easier and more affordable.",
    ],
  },
  expectations: [
    {
      phase: "Before" as const,
      icon: "📋",
      items: [
        "Drink some water before your appointment — it makes IV placement easier",
        "Eat a light meal or snack beforehand",
        "Wear something comfortable with sleeves that can be rolled up",
        "Bring a list of any medications, supplements, or known allergies",
        "Plan ~45 minutes total for screening, drip, and a brief debrief",
      ],
    },
    {
      phase: "During" as const,
      icon: "💧",
      items: [
        "A licensed provider reviews your health profile and goals",
        "Sterile, single-use supplies are used for every guest",
        "You'll relax in the IV Lounge while the drip runs — read, scroll, or rest",
        "Most guests feel a cool sensation as the IV starts; that's normal",
        "Add-on boosters (like Biotin) can be added before the drip begins",
      ],
    },
    {
      phase: "After" as const,
      icon: "✨",
      items: [
        "Many guests feel hydrated and refreshed within the same day",
        "Energy, focus, or recovery effects vary person-to-person",
        "Return to normal activities right away — there's no downtime",
        "Continue hydrating with water and a balanced meal afterward",
        "Tell us how you felt; we'll fine-tune your next drip choice",
      ],
    },
  ],
  ivMenu: [
    {
      name: "Hydration (Saline)",
      tagline: "Pure hydration reset",
      price: 100,
      duration: "45 min",
      desc:
        "A straightforward IV fluid hydration session for travel days, summer heat, or anytime you need to top off fast.",
    },
    {
      name: "Reboot (Hangover)",
      tagline: "Bounce back after a long night",
      price: 129,
      duration: "45 min",
      desc:
        "Designed for those rough mornings — IV fluids paired with supportive ingredients to help you reset.",
    },
    {
      name: "Alleviate (PMS Relief)",
      tagline: "Comfort during your cycle",
      price: 149,
      duration: "45 min",
      desc:
        "A drip aimed at supporting comfort, mood, and hydration during PMS.",
    },
    {
      name: "Get-Up and Go",
      tagline: "Energy & focus boost",
      price: 149,
      duration: "45 min",
      desc:
        "Our go-to for tired mornings, jet lag, or a sluggish midday — built around hydration plus energy-supportive nutrients.",
    },
    {
      name: "Quench",
      tagline: "Deep hydration & glow",
      price: 149,
      duration: "45 min",
      desc:
        "A premium hydration drip focused on rehydrating skin and body for a refreshed, dewy look.",
    },
    {
      name: "B-Lean",
      tagline: "Metabolism & weight-loss support",
      price: 159,
      duration: "45 min",
      desc:
        "A B-vitamin–forward drip that pairs well with our medical weight loss programs as a wellness add-on.",
    },
    {
      name: "Myers Cocktail",
      tagline: "The classic wellness blend",
      price: 179,
      duration: "45 min",
      desc:
        "The original wellness IV — a balanced mix that's a favorite for general wellness, immunity, and recovery support.",
    },
    {
      name: "Brainstorm",
      tagline: "Focus, clarity & mental energy",
      price: 179,
      duration: "45 min",
      desc:
        "Created for busy minds — supports mental sharpness, focus, and steady cognitive energy.",
    },
    {
      name: "Recovery & Performance",
      tagline: "Athletic recovery support",
      price: 179,
      duration: "45 min",
      desc:
        "Built around hydration and recovery for hard training weeks, competition recovery, or weekend warriors.",
    },
    {
      name: "Inner Body / Beauty",
      tagline: "Skin, hair & nail glow",
      price: 199,
      duration: "45 min",
      desc:
        "A beauty-focused drip designed to support skin hydration and overall radiance from the inside out.",
    },
  ],
  ivAddOns: [
    {
      name: "Biotin Booster",
      tagline: "Hair, skin & nail add-on",
      price: 10,
      desc: "Add to any drip as a beauty-focused booster.",
    },
  ],
  membership: {
    name: "IV Lounge Membership",
    price: 125,
    duration: "monthly",
    desc:
      "An IV-focused membership that makes regular hydration and wellness drips easier to keep on the calendar. Ask about details when you arrive — current members save on each visit and unlock booster perks.",
  },
  faqs: [
    {
      q: "How much does an IV drip cost in Kingsport TN?",
      a: "At the Balanced Wellness IV Lounge in Kingsport, basic IV hydration starts at $100, and most targeted wellness drips run $129–$199. Examples include Reboot/Hangover at $129; Alleviate (PMS Relief), Get-Up and Go, and Quench at $149; B-Lean at $159; Myers Cocktail, Brainstorm, and Recovery at $179; and our Inner Body/Beauty drip at $199. Most drips take about 45 minutes. Members of our IV Lounge membership program save on every visit — ask at booking.",
    },
    {
      q: "How long does an IV drip take?",
      a: "Most IV Lounge drips run about 45 minutes from the time the IV is placed until the bag is finished. Plan around an hour total when you include intake, IV placement, and a short post-drip debrief. You're free to relax, read, or scroll on your phone while you infuse.",
    },
    {
      q: "Is IV therapy safe?",
      a: "When administered by trained medical providers using sterile, single-use supplies, IV therapy has a strong safety profile. We screen every guest for health considerations, medications, and allergies before placing an IV. Mild bruising or coolness at the IV site is the most common side effect. IV therapy is not appropriate for everyone — for example, certain heart, kidney, or pregnancy considerations may make it a poor fit, and we'll let you know if that's the case.",
    },
    {
      q: "Which IV drip should I choose?",
      a: "We help you pick based on how you feel and what you want out of the visit. If you're dehydrated and tired, Hydration or Get-Up and Go are common picks. For recovery from training or travel, Recovery & Performance is a favorite. Myers Cocktail is a balanced general-wellness option, Brainstorm leans toward focus and clarity, and our Inner Body/Beauty drip is geared toward skin glow. Reboot is built for hangover days, and Alleviate is geared toward PMS relief.",
    },
    {
      q: "Do you offer IV memberships?",
      a: "Yes — our IV Lounge membership is designed for guests who want a regular cadence of drips and prefer to save on each visit. Membership perks include a member rate on drips and access to booster pricing. Ask at the front desk for current details and any seasonal incentives.",
    },
    {
      q: "Do I need a consultation before my first IV drip?",
      a: "No separate consultation is required for most healthy adults, but we do a brief health screening before every IV — including current medications, allergies, recent illness, hydration, and any conditions we should know about. If anything in your screening warrants a chat with your primary care provider first, we'll tell you.",
    },
    {
      q: "Can I add a vitamin or beauty booster to my IV?",
      a: "Yes — boosters like our Biotin add-on can be added before your drip begins. We'll review which boosters pair well with the drip you've selected and your goals for the visit.",
    },
    {
      q: "Do you serve Johnson City TN at the IV Lounge?",
      a: "Yes — many of our IV Lounge guests come from Johnson City, Jonesborough, Bristol, and the broader Tri-Cities. We have a Kingsport location at 1309 S John B Dennis Hwy, Suite 104, and a Jonesborough location at 120 S Cherokee St that's convenient for Johnson City residents. Choose the location that works best when you book.",
    },
    {
      q: "How do I book an IV drip at Balanced Wellness?",
      a: "Use the booking buttons on this page to choose your preferred location, or call our Kingsport IV Lounge at (423) 765-1393 or Jonesborough at (423) 646-2169. Walk-ins are welcome when availability allows, but booking ahead guarantees your time slot.",
    },
  ],
  relatedLinks: [
    { name: "Wellness & IV Therapy Overview", path: "/wellness", desc: "Our full wellness, IV, and longevity menu." },
    { name: "Medical Weight Loss", path: "/medical-weight-loss-kingsport-tn", desc: "Semaglutide and Tirzepatide programs." },
    { name: "Hormone Therapy Kingsport TN", path: "/hormone-therapy-kingsport-tn", desc: "Bioidentical HRT for men and women." },
    { name: "Peptide Therapy Kingsport TN", path: "/peptide-therapy-kingsport-tn", desc: "Targeted peptide protocols for recovery and longevity." },
    { name: "VIP Memberships", path: "/memberships", desc: "Spa and wellness memberships with monthly savings." },
    { name: "Medical Spa Kingsport TN", path: "/medical-spa-kingsport-tn", desc: "Our full Kingsport med spa overview." },
  ],
  schemaDescription:
    "IV hydration and vitamin therapy lounge in Kingsport, TN at Balanced Wellness Medical Spa. Medically supervised 45-minute IV drips including Myers Cocktail, Get-Up and Go, Brainstorm, Recovery, Reboot, Alleviate (PMS Relief), Quench, Hydration (saline), B-Lean, and Inner Body/Beauty.",
};

const LOCATIONS = [
  {
    city: "Kingsport",
    address: "1309 South John B Dennis Hwy, Suite 104",
    zip: "Kingsport, TN 37660",
    phone: "(423) 765-1393",
    tel: "423-765-1393",
  },
  {
    city: "Jonesborough",
    address: "120 South Cherokee St",
    zip: "Jonesborough, TN 37659",
    phone: "(423) 646-2169",
    tel: "423-646-2169",
  },
];

export default function IVLoungeKingsport() {
  const { open: openBookingChooser } = useBookingChooser();
  const canonicalPath = data.seo.canonicalPath;
  const canonicalUrl = `${CANONICAL_ORIGIN}${canonicalPath}`;

  const breadcrumbs = [
    { name: "Home", url: `${CANONICAL_ORIGIN}/` },
    { name: "Wellness", url: `${CANONICAL_ORIGIN}/wellness` },
    { name: data.hero.h1, url: canonicalUrl },
  ];

  return (
    <PageLayout>
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
        canonicalPath={data.seo.canonicalPath}
      />
      <LocalBusinessSchema />
      <ServiceSchema
        serviceName={data.hero.h1}
        description={data.schemaDescription}
        canonicalUrl={canonicalUrl}
        faqs={data.faqs}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 luxury-gradient" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 40%, hsl(0 33% 65%), transparent 60%)",
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Droplet className="w-3.5 h-3.5" />
              {data.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-5">
              {data.hero.h1}
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 mb-8 max-w-2xl leading-relaxed">
              {data.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => openBookingChooser({ service: "IV Lounge" })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Your IV Session
              </button>
              <a
                href="tel:423-765-1393"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-foreground font-semibold rounded-full border border-border hover:bg-secondary transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                Call (423) 765-1393
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/wellness" className="hover:text-primary transition-colors">Wellness</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{data.hero.h1}</span>
          </nav>
        </div>
      </div>

      {/* Short Answer */}
      <section className="bg-primary/5 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="bg-white rounded-2xl border border-primary/15 p-6 md:p-7 luxury-shadow">
            <p className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-2">Quick Answer</p>
            <h2 className="text-lg md:text-xl font-serif font-bold text-foreground mb-3 leading-snug">
              {data.shortAnswer.q}
            </h2>
            <p className="text-sm md:text-base text-foreground/75 leading-relaxed">{data.shortAnswer.a}</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">{data.intro.h2}</h2>
              <div className="space-y-4">
                {data.intro.body.map((para, i) => (
                  <p key={i} className="text-foreground/65 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-secondary rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-foreground mb-4">Quick Facts</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">~45 minute sessions</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Medically supervised</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Sterile, single-use IV supplies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Two Tri-Cities locations</span>
                </div>
                <button
                  type="button"
                  onClick={() => openBookingChooser({ service: "IV Lounge" })}
                  className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Book Your IV Session <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="bg-foreground rounded-2xl p-5 text-white">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Both Locations</p>
                {LOCATIONS.map((loc) => (
                  <div key={loc.city} className="mb-3 last:mb-0">
                    <p className="font-semibold text-sm text-champagne">{loc.city}</p>
                    <a href={`tel:${loc.tel}`} className="text-xs text-white/70 hover:text-white transition-colors">
                      {loc.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 luxury-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-2">Why Patients Love It</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Benefits of IV Hydration</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.06 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:shadow-lg transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-1.5 text-sm">{benefit.title}</h3>
                <p className="text-xs text-foreground/60 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What IV Is */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">{data.whatIsIV.h2}</h2>
          <div className="space-y-4">
            {data.whatIsIV.body.map((p, i) => (
              <p key={i} className="text-foreground/65 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Experience */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">{data.experience.h2}</h2>
          <div className="space-y-4">
            {data.experience.body.map((p, i) => (
              <p key={i} className="text-foreground/65 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 md:py-20 bg-foreground text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-champagne uppercase tracking-widest font-semibold mb-2">Your Visit</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">What to Expect</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.expectations.map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7"
              >
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-champagne mb-4">{card.phase}</h3>
                <ul className="space-y-2.5">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/65">
                      <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IV Menu */}
      <section className="py-16 md:py-20 bg-white" id="iv-menu">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-2">The Menu</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">IV Lounge Drip Menu</h2>
            <p className="text-foreground/60 text-sm mt-3 max-w-2xl mx-auto">
              Each drip is about 45 minutes and is recommended after a brief health screening. Prices below are starting rates — members of our IV Lounge membership pay less per visit.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.ivMenu.map((drip, i) => (
              <motion.article
                key={drip.name}
                {...fadeUp}
                transition={{ delay: i * 0.04 }}
                className="bg-secondary/50 rounded-2xl border border-border p-6 flex flex-col hover:luxury-shadow hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground leading-snug">{drip.name}</h3>
                    <p className="text-[11px] text-primary uppercase tracking-wider font-semibold mt-1">
                      {drip.tagline}
                    </p>
                  </div>
                  <Droplet className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-foreground/65 leading-relaxed mb-5 flex-1">{drip.desc}</p>
                <div className="flex items-baseline justify-between border-t border-border pt-4">
                  <span className="font-serif text-2xl font-bold text-foreground">${drip.price}</span>
                  <span className="text-xs text-foreground/55">{drip.duration}</span>
                </div>
                <button
                  type="button"
                  onClick={() => openBookingChooser({ service: `IV Lounge — ${drip.name}` })}
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
                >
                  Book {drip.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.article>
            ))}
          </div>

          {/* Add-ons & Membership */}
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {data.ivAddOns.map((addon) => (
              <div key={addon.name} className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-[11px] uppercase tracking-widest text-primary font-semibold">Booster Add-On</p>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">{addon.name}</h3>
                <p className="text-xs text-foreground/55 mb-2">{addon.tagline}</p>
                <p className="text-sm text-foreground/65 mb-4">{addon.desc}</p>
                <p className="font-serif text-xl font-bold text-foreground">+${addon.price}</p>
              </div>
            ))}
            <div className="bg-foreground rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-champagne" />
                <p className="text-[11px] uppercase tracking-widest text-champagne font-semibold">Membership</p>
              </div>
              <h3 className="font-serif text-lg font-bold text-white">{data.membership.name}</h3>
              <p className="text-sm text-white/70 mb-4 leading-relaxed">{data.membership.desc}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif text-2xl font-bold text-champagne">${data.membership.price}</span>
                <span className="text-xs text-white/60">/{data.membership.duration}</span>
              </div>
              <Link
                href="/memberships"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-white transition-colors"
              >
                See Membership Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <p className="text-[11px] text-foreground/45 italic text-center mt-8 max-w-2xl mx-auto">
            * IV therapy may support hydration, energy, recovery, and general wellness goals. It is not a treatment for any specific disease, is not appropriate for everyone, and does not replace medical care. A brief health screening is required prior to every IV session.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-border p-5"
              >
                <h3 className="font-bold text-foreground mb-2 text-sm leading-snug">{faq.q}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-serif font-bold text-foreground text-center mb-8">
            Visit Our IV Lounge — Kingsport & the Johnson City / Jonesborough Area
          </h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {LOCATIONS.map((loc) => (
              <div key={loc.city} className="bg-secondary rounded-xl p-5 border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{loc.city}, TN</p>
                  <p className="text-sm text-foreground/60 mt-0.5">{loc.address}</p>
                  <p className="text-sm text-foreground/60">{loc.zip}</p>
                  <a
                    href={`tel:${loc.tel}`}
                    className="text-sm text-primary font-semibold mt-1.5 flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" /> {loc.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-foreground text-center mb-10">Related Wellness Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.relatedLinks.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{link.name}</p>
                  <p className="text-xs text-foreground/55 mt-0.5">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-primary/5 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Book Your IV Lounge Visit</h2>
          <p className="text-foreground/60 mb-8 text-lg max-w-2xl mx-auto">
            Reserve your 45-minute IV session at our Kingsport or Jonesborough location. We'll match you with the drip that best fits how you're feeling and what you want from your visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => openBookingChooser({ service: "IV Lounge" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Your IV Session
            </button>
            <a
              href="tel:423-765-1393"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-semibold rounded-full border border-border hover:bg-secondary transition-all"
            >
              <Phone className="w-4 h-4 text-primary" />
              Call Now
            </a>
          </div>
          <p className="text-xs text-foreground/40 mt-6">
            * IV therapy may support hydration, energy, recovery, and general wellness goals. Not a treatment for any specific disease. Health screening required.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
