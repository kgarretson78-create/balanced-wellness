import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Scale,
  FlaskConical,
  HeartPulse,
  Calendar,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { ServiceSchema, LocalBusinessSchema } from "@/components/SchemaMarkup";
import { AssessmentButton } from "@/components/booking/TelehealthCTA";
import { TELEMEDICINE_CONSULT, type OnlineCareCategoryId } from "@/lib/booking";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const CANONICAL_ORIGIN = "https://www.balancedmedicalspa.com";

/**
 * Standalone telehealth / virtual care landing page.
 *
 * Distinct from the /online-care assessment hub: this page is the SEO/AEO
 * "what is virtual care at Balanced" destination for Kingsport, Jonesborough,
 * and the Tri-Cities. It explains what can be handled online, routes each goal
 * (weight loss, peptides, wellness) to the right next step, and surfaces the
 * Podium telemedicine consultation CTA.
 *
 * The exported `data` is the single source of truth shared with the static
 * prerender (scripts/prerender.ts). Fields beyond the ServicePageData shape
 * (virtualServices, serviceArea, cannotTreat) drive the richer live layout and
 * are ignored by the crawler-body renderer.
 */

export const data = {
  seo: {
    title:
      "Telehealth & Virtual Care Kingsport TN | Online Medical Weight Loss, Peptides & Wellness | Balanced Wellness",
    description:
      "Telehealth and virtual care from Balanced Wellness Medical Spa in Kingsport & Jonesborough TN. Provider-reviewed online medical weight loss (GLP-1), peptide therapy, and wellness consults for the Tri-Cities. Book a telemedicine consultation. Eligibility varies; provider review required.",
    keywords:
      "telehealth Kingsport TN, virtual care Jonesborough TN, online doctor Tri-Cities, telemedicine consultation Tennessee, online weight loss Kingsport, GLP-1 telehealth, peptide therapy online, virtual wellness consult Kingsport Jonesborough",
    canonicalPath: "/telehealth",
  },
  hero: {
    badge: "Telehealth & Virtual Care — Kingsport & Jonesborough TN",
    h1: "Telehealth & Virtual Care in Kingsport & Jonesborough, TN",
    subheadline:
      "See a Balanced Wellness provider from home. Start online for medical weight loss, peptide therapy, skincare, and wellness — or book a telemedicine consultation and we'll guide you. Provider review is always required.",
  },
  shortAnswer: {
    q: "Does Balanced Wellness offer telehealth in Kingsport and Jonesborough?",
    a: "Yes. Balanced Wellness Medical Spa offers telehealth (virtual care) for patients in Kingsport, Jonesborough, and across the Tri-Cities, TN. You can start online for medical weight loss (including GLP-1 options), peptide therapy, medical skincare and hair support, women's and men's health, and general wellness. You complete a short online assessment or book a telemedicine consultation, and a licensed provider reviews your information. Telehealth is not a prescription and not for emergencies — eligibility is always determined by a provider, and lab work or an in-person visit may be required.",
  },
  intro: {
    h2: "What Is Telehealth at Balanced Wellness?",
    body: [
      "Telehealth — also called virtual care — lets you connect with a Balanced Wellness provider without driving to the clinic to get started. You complete a secure online assessment about your goals and health history, or book a telemedicine consultation, and a licensed provider personally reviews your information before any plan is offered.",
      "Virtual care is ideal for the parts of medical wellness that don't require hands-on treatment: medical weight loss intake and follow-up, peptide therapy questions, medical skincare and hair support, women's and men's health concerns, and general wellness consults. Hands-on aesthetic services like injectables, lasers, and IV therapy are still performed in person at our Kingsport or Jonesborough locations.",
      "Serving Kingsport, Jonesborough, Johnson City, Bristol, and the wider Tri-Cities region, our telehealth pathway is designed to remove friction for busy patients while keeping care firmly provider-led. Online intake is a starting point — it is not a diagnosis or a prescription, and eligibility is always determined by a provider after review. Depending on your situation, your provider may request lab work or an in-person visit.",
    ],
  },
  benefits: [
    { title: "Start From Home", desc: "Begin with a short online assessment or virtual consult — no need to take time off for a first visit." },
    { title: "Provider-Reviewed", desc: "A licensed Balanced Wellness provider personally reviews every request before any plan or medication is discussed." },
    { title: "Local Follow-Up", desc: "Kingsport and Jonesborough locations are available for labs, check-ins, and in-person care when needed." },
    { title: "GLP-1 Options When Appropriate", desc: "Medical weight loss plans may include GLP-1 medications such as semaglutide or tirzepatide if your provider determines it's suitable." },
    { title: "Whole-Person Wellness", desc: "Weight, peptides, skin and hair, hormones, and general wellness — guided by the same team, not scattered across apps." },
    { title: "Secure & Convenient", desc: "Private online assessments and virtual visits that fit around your schedule across the Tri-Cities." },
  ],
  candidates: {
    goodFor: [
      "Adults in Kingsport, Jonesborough, or the Tri-Cities who want to start care online",
      "Patients exploring medically supervised weight loss, including GLP-1 options",
      "Those interested in peptide therapy for recovery, sleep, or healthy aging",
      "Patients who want provider-guided medical skincare, hair, or topical plans",
      "Anyone open to lab work and provider follow-up as part of their plan",
    ],
    notFor: [
      "Anyone experiencing a medical emergency or urgent symptoms — call 911",
      "Patients seeking medication without a provider evaluation",
      "Those expecting guaranteed eligibility or same-day prescriptions",
      "Conditions that require an in-person exam or hands-on treatment to assess",
    ],
  },
  expectations: [
    {
      phase: "Before" as const,
      icon: "📝",
      items: [
        "Pick your goal (weight loss, peptides, wellness, and more)",
        "Complete a secure online assessment or book a telemedicine consultation",
        "Share your goals and health history",
        "A licensed provider reviews your information",
      ],
    },
    {
      phase: "During" as const,
      icon: "💻",
      items: [
        "Connect with a provider virtually to discuss your goals",
        "Your provider may request lab work or an in-person visit",
        "A personalized plan is offered only when medically appropriate",
        "Ask questions about options, safety, and next steps",
      ],
    },
    {
      phase: "After" as const,
      icon: "✨",
      items: [
        "Ongoing virtual or in-person follow-up and monitoring",
        "Adjustments to your plan based on your response",
        "In-person support available in Kingsport and Jonesborough",
        "Long-term, provider-led care — not a one-time transaction",
      ],
    },
  ],
  faqs: [
    {
      q: "What is telehealth and how does it work at Balanced Wellness?",
      a: "Telehealth is virtual medical care. At Balanced Wellness Medical Spa, you complete a secure online assessment or book a telemedicine consultation, then a licensed provider reviews your goals and health history before offering any plan. It's a convenient way to start care from home in Kingsport, Jonesborough, and across the Tri-Cities — but it is not a diagnosis or an automatic prescription.",
    },
    {
      q: "Who is telehealth for?",
      a: "Telehealth is for adults in Kingsport, Jonesborough, and the Tri-Cities who want to begin care online — especially for medical weight loss, peptide therapy, medical skincare and hair support, women's and men's health, and general wellness. It's a good fit if you're comfortable with provider follow-up and possible lab work. It is not appropriate for medical emergencies.",
    },
    {
      q: "What can be handled virtually, and what still requires an in-person visit?",
      a: "Many services can start virtually: weight loss intake and follow-up, peptide therapy questions, medical skincare and hair plans, and wellness consults. Hands-on treatments — injectables, laser treatments, RF microneedling, and IV therapy — are performed in person at our Kingsport or Jonesborough locations. Your provider may also request an in-person visit or lab work when it's needed for safe care.",
    },
    {
      q: "Will I need lab work or an in-person visit?",
      a: "Sometimes. Depending on your goals and history, your provider may request lab work or an in-person visit before starting or continuing a plan. This helps keep your care safe and effective. Lab work and in-person follow-up are available at both our Kingsport and Jonesborough locations.",
    },
    {
      q: "How do I book a telehealth or telemedicine consultation?",
      a: 'You can start an online assessment for your goal, or book a telemedicine consultation directly. When scheduling, choose "Telemedicine Consultation" so we know it\'s a virtual visit. A provider will review your information and follow up about next steps.',
    },
    {
      q: "What areas does Balanced Wellness telehealth serve?",
      a: "We serve patients across Kingsport, Jonesborough, Johnson City, Bristol, Greeneville, and the wider Tri-Cities region of Northeast Tennessee. Care is provided by licensed Balanced Wellness providers.",
    },
    {
      q: "What can telehealth not treat?",
      a: "Telehealth is not for medical emergencies, urgent or severe symptoms, or conditions that require an in-person exam or hands-on procedure to evaluate. If you have a medical emergency, call 911 or go to the nearest emergency room. Online care never guarantees eligibility, a prescription, or a specific outcome — all care is determined by a provider.",
    },
  ],
  relatedLinks: [
    { name: "Online Care & Telehealth Hub", path: "/online-care", desc: "Pick a category and start a provider-reviewed assessment." },
    { name: "Online Weight Loss Kingsport TN", path: "/online-weight-loss-kingsport-tn", desc: "Provider-reviewed online weight loss, including GLP-1 options." },
    { name: "Peptide Therapy Kingsport TN", path: "/peptide-therapy-kingsport-tn", desc: "Peptides for recovery, sleep, and healthy aging." },
    { name: "Online Skincare Kingsport TN", path: "/online-skincare-kingsport-tn", desc: "Provider-guided medical skincare, hair, and topicals." },
    { name: "Women's Health Kingsport TN", path: "/womens-health-kingsport-tn", desc: "Wellness and women's health, provider-led." },
    { name: "Men's Health Kingsport TN", path: "/mens-health-kingsport-tn", desc: "Hormone support and men's health, provider-led." },
  ],
  schemaDescription:
    "Telehealth and virtual care for Kingsport & Jonesborough TN at Balanced Wellness Medical Spa. Provider-reviewed online medical weight loss (GLP-1), peptide therapy, medical skincare, and wellness consults across the Tri-Cities. Eligibility varies; provider review required; not for emergencies.",
  /** Live-page virtual service sections (weight loss, peptides, wellness). */
  virtualServices: [
    {
      id: "weight-loss" as OnlineCareCategoryId,
      iconKey: "weight-loss",
      title: "Medical Weight Loss & GLP-1",
      body: "Start medically supervised weight loss from home. Share your goals and history in a quick assessment, and a provider reviews whether a plan — which may include GLP-1 medications like semaglutide or tirzepatide — is appropriate for you.",
      points: [
        "GLP-1 assessment (semaglutide, tirzepatide) when medically appropriate",
        "Provider-reviewed intake and ongoing monitoring",
        "Labs and in-person follow-up available locally",
      ],
      assessmentCategory: "weight-loss" as OnlineCareCategoryId,
      assessmentLabel: "Start Weight Loss Assessment",
      learnMorePath: "/online-weight-loss-kingsport-tn",
      learnMoreLabel: "Learn about online weight loss",
    },
    {
      id: "peptides" as OnlineCareCategoryId,
      iconKey: "peptides",
      title: "Peptide Therapy & Wellness",
      body: "Explore peptides for recovery, sleep, and healthy aging. Begin with a general peptide goal assessment, and a provider determines what — if anything — is suitable after review.",
      points: [
        "Recovery, sleep, and healthy-aging peptide options",
        "Provider safety screening before any protocol",
        "Drill-down assessments for specific peptides",
      ],
      assessmentCategory: "peptides" as OnlineCareCategoryId,
      assessmentLabel: "Start Peptide Assessment",
      learnMorePath: "/peptide-therapy-kingsport-tn",
      learnMoreLabel: "Learn about peptide therapy",
    },
    {
      id: "wellness" as OnlineCareCategoryId,
      iconKey: "wellness",
      title: "Wellness, Hormones & Longevity",
      body: "Have a wellness goal but not sure where to start — hormones, vitality, women's or men's health, skincare, or hair? Book a telemedicine consultation and a provider will help you build the right plan.",
      points: [
        "General wellness and longevity consults",
        "Women's & men's health, hormone questions, skincare & hair",
        "Provider guides next steps, labs, or in-person care",
      ],
      assessmentCategory: undefined,
      assessmentLabel: TELEMEDICINE_CONSULT.label,
      learnMorePath: "/wellness",
      learnMoreLabel: "Explore wellness & longevity",
    },
  ],
  serviceArea: ["Kingsport", "Jonesborough", "Johnson City", "Bristol", "Greeneville", "the Tri-Cities, TN"],
  cannotTreat:
    "Telehealth is not for medical emergencies or urgent symptoms. If you have an emergency, call 911 or go to the nearest emergency room. Online care is not a substitute for emergency treatment, does not provide a diagnosis, and never guarantees eligibility, a prescription, or a specific result.",
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

function TelemedConsultButton({
  className,
  label = TELEMEDICINE_CONSULT.label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={TELEMEDICINE_CONSULT.url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ||
        "inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
      }
    >
      <Calendar className="w-4 h-4" />
      {label}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

export default function Telehealth() {
  const CATEGORY_ICONS: Record<string, JSX.Element> = {
    "weight-loss": <Scale className="w-5 h-5 text-primary" />,
    peptides: <FlaskConical className="w-5 h-5 text-primary" />,
    wellness: <HeartPulse className="w-5 h-5 text-primary" />,
  };
  const canonicalUrl = `${CANONICAL_ORIGIN}${data.seo.canonicalPath}`;
  const breadcrumbs = [
    { name: "Home", url: `${CANONICAL_ORIGIN}/` },
    { name: "Online Care", url: `${CANONICAL_ORIGIN}/online-care` },
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
            style={{ backgroundImage: "radial-gradient(circle at 70% 40%, hsl(0 33% 65%), transparent 60%)" }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Stethoscope className="w-3.5 h-3.5" />
              {data.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-5">
              {data.hero.h1}
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 mb-8 max-w-2xl leading-relaxed">
              {data.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <TelemedConsultButton />
              <a
                href="tel:423-765-1393"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-foreground font-semibold rounded-full border border-border hover:bg-secondary transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                Call (423) 765-1393
              </a>
            </div>
            <p className="mt-3 text-xs text-foreground/45">{TELEMEDICINE_CONSULT.note}</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/online-care" className="hover:text-primary transition-colors">Online Care</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Telehealth</span>
          </nav>
        </div>
      </div>

      {/* Short Answer (AEO lead) */}
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

      {/* Intro */}
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
                {[
                  "Provider review always required",
                  "Eligibility varies by patient",
                  "Labs or in-person visit may be needed",
                  "Not for emergencies — call 911",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3 mb-3 last:mb-0">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-foreground/70">{f}</span>
                  </div>
                ))}
                <TelemedConsultButton
                  className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                  label="Book Telemedicine Consult"
                />
              </div>
              <div className="bg-foreground rounded-2xl p-5 text-white">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Both Locations</p>
                {LOCATIONS.map((loc) => (
                  <div key={loc.city} className="mb-3 last:mb-0">
                    <p className="font-semibold text-sm text-champagne">{loc.city}</p>
                    <a href={`tel:${loc.tel}`} className="text-xs text-white/70 hover:text-white transition-colors">{loc.phone}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual service sections: weight loss, peptides, wellness */}
      <section className="py-16 md:py-20 luxury-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-2">What You Can Do Virtually</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Online Care for Weight Loss, Peptides &amp; Wellness
            </h2>
            <p className="text-foreground/55 text-sm mt-3 max-w-2xl mx-auto">
              Choose your goal and take the next step. Every online assessment and consultation is reviewed by a licensed provider — eligibility is never guaranteed.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.virtualServices.map((svc, i) => (
              <motion.div
                key={svc.title}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                    {CATEGORY_ICONS[svc.iconKey]}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-foreground leading-snug">{svc.title}</h3>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">{svc.body}</p>
                <ul className="space-y-2 mb-5">
                  {svc.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-foreground/70">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto space-y-3">
                  {svc.assessmentCategory ? (
                    <AssessmentButton
                      categoryId={svc.assessmentCategory}
                      configuredLabel={svc.assessmentLabel}
                      className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
                    />
                  ) : (
                    <TelemedConsultButton
                      className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
                      label={svc.assessmentLabel}
                    />
                  )}
                  <Link
                    href={svc.learnMorePath}
                    className="flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {svc.learnMoreLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-foreground/50 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Secure assessments · Provider review required · No diagnosis or eligibility guaranteed
          </p>
        </div>
      </section>

      {/* Prominent telemedicine consultation CTA */}
      <section className="py-14 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-primary/20 bg-primary/5 px-7 py-6">
            <div className="text-center sm:text-left">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-1.5">
                Not sure where to start? Talk to a provider.
              </h2>
              <p className="text-sm text-foreground/65 leading-relaxed">
                Book a virtual visit and a Balanced Wellness provider will guide your next step.{" "}
                <strong>{TELEMEDICINE_CONSULT.note}</strong>
              </p>
            </div>
            <TelemedConsultButton />
          </div>
        </div>
      </section>

      {/* Candidacy */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Is Telehealth Right for Me?</h2>
            <p className="text-foreground/60 mt-3 max-w-2xl mx-auto">
              A provider review helps determine the safest next step for your goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-secondary rounded-2xl p-7 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h3 className="font-bold text-foreground">Good Candidates Include</h3>
              </div>
              <ul className="space-y-3">
                {data.candidates.goodFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary rounded-2xl p-7 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-foreground">Not a Fit For</h3>
              </div>
              <ul className="space-y-3">
                {data.candidates.notFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 md:py-20 bg-foreground text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-champagne uppercase tracking-widest font-semibold mb-2">Your Virtual Visit</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">What to Expect</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.expectations.map((card, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-7">
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

      {/* Service area */}
      <section className="py-12 bg-secondary border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-2">Service Area</p>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3">
            Telehealth for Kingsport, Jonesborough &amp; the Tri-Cities
          </h2>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Balanced Wellness providers serve {data.serviceArea.join(", ")} and the surrounding Northeast Tennessee region.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-foreground/60 mt-3">Telehealth and virtual care at Balanced Wellness, answered.</p>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }} className="bg-secondary rounded-xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-2 text-sm leading-snug">{faq.q}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-serif font-bold text-foreground text-center mb-8">
            Local Follow-Up — Two Convenient Tri-Cities Locations
          </h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {LOCATIONS.map((loc) => (
              <div key={loc.city} className="bg-white rounded-xl p-5 border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{loc.city}, TN</p>
                  <p className="text-sm text-foreground/60 mt-0.5">{loc.address}</p>
                  <p className="text-sm text-foreground/60">{loc.zip}</p>
                  <a href={`tel:${loc.tel}`} className="text-sm text-primary font-semibold mt-1.5 flex items-center gap-1 hover:underline">
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
          <h2 className="text-2xl font-serif font-bold text-foreground text-center mb-10">Explore Online Care</h2>
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

      {/* Final CTA + safety */}
      <section className="py-16 md:py-20 bg-primary/5 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Book a Telemedicine Consultation
          </h2>
          <p className="text-foreground/60 mb-8 text-lg max-w-2xl mx-auto">
            Start your virtual visit with a Balanced Wellness provider serving Kingsport, Jonesborough, and the Tri-Cities. {TELEMEDICINE_CONSULT.note}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TelemedConsultButton className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all" />
            <Link
              href="/online-care"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-semibold rounded-full border border-border hover:bg-secondary transition-all"
            >
              Browse Online Assessments
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900 text-left">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{data.cannotTreat}</span>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
