import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Sparkles, HeartPulse, Stethoscope, Zap, Shield, Users, Award,
  Bot, ChevronRight, Dna, Scale, Star, Phone, MapPin, ArrowRight,
  HelpCircle, MessageSquare, CalendarCheck, CheckCircle2,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { SEO } from "@/components/SEO";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";
import { FlexiblePaymentsSection } from "@/components/FlexiblePaymentsSection";
import { useBookingChooser } from "@/components/booking/LocationChooser";
import { LOCATIONS, setPreferredLocation, type LocationId } from "@/lib/booking";
import { useEffect } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: easeOut as unknown as number[] },
};
const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

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
    q: "Is CO2 laser resurfacing safe?",
    a: "Yes, CO2 laser resurfacing is FDA-approved and safe when performed by trained medical professionals. At Balanced Wellness Medical Spa in Jonesborough TN, our board-certified providers use advanced CO2 laser technology for deep wrinkles, sun damage, acne scars, and age spots — with typically 5–7 days of downtime and dramatic long-lasting results.",
  },
  {
    q: "How much does medical weight loss cost?",
    a: "Medical weight loss programs at Balanced Wellness start with a free consultation. Semaglutide and Tirzepatide programs typically range from $250–$500/month depending on the protocol and dosage. Many patients see significant results within 3–6 months. Call either location to learn about current pricing and specials.",
  },
];

export default function Home() {
  const { open: openBookingChooser } = useBookingChooser();
  const featuredTreatments = [
    { name: "Botox in Kingsport TN", desc: "Smooth wrinkles and prevent new lines with premium neurotoxins. 10–15 min, no downtime. Starting at $200–$600 depending on areas treated.", icon: <Sparkles className="w-5 h-5" />, href: "/botox-kingsport-tn", badge: "Most Popular" },
    { name: "Lip Filler", desc: "Enhance volume, shape, and symmetry for naturally beautiful lips with premium hyaluronic acid fillers.", icon: <HeartPulse className="w-5 h-5" />, href: "/lip-filler-kingsport-tn" },
    { name: "CO2 Laser Resurfacing", desc: "Reverse sun damage, reduce deep wrinkles, and reveal radiant skin. Starting at $800–$2,500 per treatment area.", icon: <Zap className="w-5 h-5" />, href: "/laser-skin-rejuvenation-kingsport-tn" },
    { name: "RF Microneedling in Kingsport TN", desc: "Tighten skin, smooth acne scars, and refine pores with radiofrequency microneedling. Safe for all skin tones; series of 3 recommended.", icon: <Stethoscope className="w-5 h-5" />, href: "/rf-microneedling-kingsport-tn" },
    { name: "Medical Weight Loss in Kingsport TN", desc: "Semaglutide and Tirzepatide GLP-1 programs supervised by our medical team. Free consultation — no commitment required.", icon: <Scale className="w-5 h-5" />, href: "/medical-weight-loss-kingsport-tn", badge: "Free Consult" },
    { name: "Hormone Therapy in Kingsport TN", desc: "Bioidentical HRT for men and women — restore energy, mood, libido, and metabolic health with personalized protocols.", icon: <Dna className="w-5 h-5" />, href: "/hormone-therapy-kingsport-tn" },
  ];

  const reviews = [
    { name: "Sarah M.", location: "Kingsport", treatment: "Botox", text: "Absolutely love this place! The staff is incredibly knowledgeable and made me feel so comfortable. My results look completely natural — I get compliments all the time.", stars: 5 },
    { name: "Jennifer T.", location: "Jonesborough", treatment: "Weight Loss", text: "Down 42 pounds and feeling better than I have in years. The team monitors everything closely and really cares about your progress. Life-changing experience.", stars: 5 },
    { name: "Amanda R.", location: "Kingsport", treatment: "CO2 Laser", text: "My skin looks 10 years younger after my CO2 laser treatment. The provider walked me through every step and the results exceeded my expectations completely.", stars: 5 },
    { name: "Michelle K.", location: "Jonesborough", treatment: "Lip Filler", text: "I was nervous about lip filler but they made it so easy. The results are gorgeous and so natural. I won't go anywhere else — these are my people!", stars: 5 },
    { name: "Tara B.", location: "Kingsport", treatment: "RF Microneedling", text: "Three sessions in and my acne scars are dramatically reduced. The staff is professional and the facility is beautiful. Highly recommend to anyone in the Tri-Cities area.", stars: 5 },
    { name: "Lisa W.", location: "Kingsport", treatment: "Hormones", text: "Finally feel like myself again after hormone optimization. Energy is back, mood is stable, sleeping great. Worth every penny and the team is so supportive.", stars: 5 },
  ];

  const whyUs = [
    { title: "Board-Certified Medical Providers", desc: "Licensed professionals with advanced training in aesthetic medicine and wellness — your safety and results come first.", icon: <Shield className="w-6 h-6" /> },
    { title: "Advanced FDA-Approved Technology", desc: "Industry-leading devices including CO2 lasers, Scarlet RF, Agnes RF, and premium injectable products.", icon: <Zap className="w-6 h-6" /> },
    { title: "Whole-Person Wellness Approach", desc: "We treat the whole person — combining aesthetics with weight loss, hormone therapy, and longevity medicine.", icon: <HeartPulse className="w-6 h-6" /> },
    { title: "Personalized Treatment Plans", desc: "Every treatment plan is customized to your unique goals, skin type, anatomy, and budget.", icon: <Users className="w-6 h-6" /> },
    { title: "Luxury Med Spa Experience", desc: "An elevated, spa-like environment in both our Kingsport and Jonesborough locations.", icon: <Award className="w-6 h-6" /> },
  ];

  const membershipTiers = [
    { tier: "Gold", price: "$99", bestFor: "Best for: New patients starting their aesthetic journey", annualSavings: "Save $200+ annually", highlights: ["10% off all treatments", "Monthly B12 injection", "Priority booking", "Birthday treatment credit"], popular: false },
    { tier: "Platinum", price: "$199", bestFor: "Best for: Regular patients who want consistent results", annualSavings: "Save $600+ annually", highlights: ["15% off all treatments", "Monthly facial or peel", "Complimentary consultations", "VIP events access", "Rollover unused credits"], popular: true },
    { tier: "Diamond", price: "$349", bestFor: "Best for: Patients committed to total wellness & aesthetics", annualSavings: "Save $1,200+ annually", highlights: ["20% off all treatments", "Monthly injectable credit", "Quarterly IV therapy", "Exclusive member pricing", "Concierge scheduling", "Complimentary skin analysis"], popular: false },
  ];

  const stats = [
    { number: "8,000+", label: "Patients Treated" },
    { number: "200+", label: "5-Star Reviews" },
    { number: "5★", label: "Google Rating" },
    { number: "2", label: "Locations" },
  ];

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
    if (existing) { existing.textContent = JSON.stringify(faqSchema); }
    else {
      const script = document.createElement("script");
      script.id = "home-faq-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    }
    return () => { document.getElementById("home-faq-schema")?.remove(); };
  }, []);

  return (
    <PageLayout>
      <LocalBusinessSchema />
      <SEO
        title="Balanced Wellness Medical Spa | Kingsport & Jonesborough TN | Book a Free Consultation"
        description="Premier med spa in Kingsport TN and Jonesborough TN. Botox, dermal fillers, RF microneedling, CO2 laser, medical weight loss (Semaglutide/Tirzepatide), and hormone optimization. Board-certified providers. 8,000+ patients treated. 200+ 5-star reviews."
        keywords="Med Spa Kingsport TN, Med Spa Jonesborough TN, Botox Kingsport TN, RF Microneedling Kingsport, CO2 Laser Jonesborough TN, Medical Weight Loss Kingsport TN, dermal fillers Kingsport, Semaglutide Kingsport TN, hormone therapy Jonesborough TN"
      />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden luxury-gradient" style={{ minHeight: "calc(100vh - 90px)" }}>
        {/* subtle emerald dot texture + soft brand glows for a bright, luxurious ground */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(158 40% 26%) 1px, transparent 0)", backgroundSize: "34px 34px" }} />
        <div className="absolute -top-16 right-[6%] w-[440px] h-[440px] rounded-full bg-primary/10 blur-[120px] pulse-glow" />
        <div className="absolute bottom-0 left-[4%] w-[360px] h-[360px] rounded-full bg-[hsl(var(--blush))]/25 blur-[100px] pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-champagne/25 blur-[110px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 md:py-20">
          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-10 lg:gap-14 items-center">
            {/* LEFT — headline, positioning, CTAs */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/70 backdrop-blur-sm border border-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6 luxury-shadow">
                <MapPin className="w-3.5 h-3.5 text-gold" /> Kingsport &amp; Jonesborough · Tri-Cities, TN
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-foreground leading-[1.08] mb-5">
                The Tri-Cities Destination for{" "}
                <span className="text-primary">Aesthetics &amp; Wellness</span>,{" "}
                <span className="italic text-gradient-gold">done beautifully</span>
              </h1>
              <p className="text-base md:text-lg text-foreground/65 mb-4 leading-relaxed max-w-xl">
                Medical aesthetics, weight loss, hormones, IV hydration &amp; telehealth — personalized and supervised by experienced medical providers.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Botox & Dysport", "Dermal Fillers", "RF Microneedling", "CO2 Laser", "Medical Weight Loss", "Hormones", "IV Hydration"].map((s) => (
                  <span key={s} className="text-[11px] font-medium text-foreground/60 bg-white/70 border border-border rounded-full px-3 py-1 backdrop-blur-sm">{s}</span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => openBookingChooser({ service: "Free Consultation" })}
                  className="group px-8 py-3.5 bg-primary text-white text-center font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 shimmer text-sm">
                  Book a Free Consultation
                  <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => window.dispatchEvent(new CustomEvent("askKelliAI"))}
                  className="px-8 py-3.5 bg-white text-foreground text-center font-medium rounded-full border border-border hover:border-primary/30 hover:luxury-shadow transition-all duration-300 text-sm flex items-center justify-center gap-2">
                  <Bot className="w-4 h-4 text-primary" /> Ask KelliAI
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6">
                {["Board-certified medical providers", "FDA-approved treatments", "Free consultation — no commitment"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-foreground/55 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — brand + social proof + location quick-book card */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              <div className="relative luxury-card bg-white/85 backdrop-blur p-6 md:p-7">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm shadow-primary/20">
                  Now Booking · Two Locations
                </div>

                <img src="/images/logo.png" alt="Balanced Wellness Medical Spa logo" className="h-20 md:h-24 w-auto object-contain mx-auto mb-4" width={260} height={130} />

                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-gold text-gold" />)}</div>
                  <span className="text-sm font-semibold text-foreground">5.0</span>
                </div>
                <p className="text-center text-xs text-foreground/50 mb-5">200+ five-star reviews · 8,000+ patients treated</p>

                <div className="grid grid-cols-3 gap-2 mb-5">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="text-center rounded-xl bg-secondary/60 border border-border py-3 px-1">
                      <p className="text-lg md:text-xl font-serif font-bold text-primary leading-none stat-number">{stat.number}</p>
                      <p className="text-[9px] text-foreground/50 uppercase tracking-wider mt-1 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-foreground/50 uppercase tracking-widest font-semibold text-center mb-2.5">Book Now — Choose Your Location</p>
                <div className="grid gap-2.5">
                  {[LOCATIONS.kingsport, LOCATIONS.jonesborough].map((loc) => (
                    <a key={loc.id} href={loc.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setPreferredLocation(loc.id)}
                      className="group flex items-center justify-between gap-2 w-full py-3 px-4 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/15">
                      <span className="flex items-center gap-2"><CalendarCheck className="w-4 h-4" /> Book {loc.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
                <p className="text-center text-[11px] text-foreground/45 mt-4">Prefer to chat first? <button onClick={() => window.dispatchEvent(new CustomEvent("askKelliAI"))} className="text-primary font-semibold hover:underline underline-offset-2">Ask KelliAI, your concierge</button></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ── FEATURED TREATMENTS ── */}
      <Section className="bg-background">
        <div className="text-center mb-16">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Featured Treatments</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Med Spa Treatments in<br className="hidden md:block" /> Kingsport &amp; Jonesborough TN</h2>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTreatments.map((t, i) => (
            <motion.div key={t.name} {...stagger} transition={{ duration: 0.5, delay: i * 0.07 }} className="relative">
              {t.badge && <div className="absolute -top-2.5 left-4 z-10 px-3 py-0.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{t.badge}</div>}
              <Link href={t.href} className="group block h-full p-6 rounded-2xl border border-border bg-white hover:luxury-shadow-lg hover:border-primary/20 transition-all duration-500">
                <div className="w-11 h-11 rounded-xl bg-primary/[0.06] text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">{t.icon}</div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{t.name}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed mb-4">{t.desc}</p>
                <span className="inline-flex items-center text-xs text-primary font-semibold gap-1 group-hover:gap-2 transition-all duration-200">
                  See results, pricing &amp; what to expect <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button type="button" onClick={() => openBookingChooser({ service: "Free Consultation" })}
            className="inline-flex items-center px-7 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/15 text-sm">
            <CalendarCheck className="w-4 h-4 mr-2" /> Book a Free Consultation
          </button>
          <Link href="/services" className="inline-flex items-center text-primary font-semibold text-sm hover:underline underline-offset-4">
            View All Services <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ── WHY US ── */}
      <Section className="luxury-gradient">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Why Patients Choose Balanced Wellness in Kingsport &amp; Jonesborough TN</h2>
            <p className="text-foreground/55 text-sm leading-relaxed mb-6 max-w-lg">A real Tri-Cities medical spa — not a franchise. Personalized, provider-led care with two convenient locations in Kingsport and Jonesborough, so your treatment plan fits your life.</p>
            <div className="decorative-line mb-10" />
            <div className="space-y-5">
              {whyUs.map((item, i) => (
                <motion.div key={i} {...stagger} transition={{ delay: i * 0.08, duration: 0.5 }} className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-border flex items-center justify-center text-primary flex-shrink-0 group-hover:glow-primary transition-shadow duration-500">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-0.5 text-[15px]">{item.title}</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div {...fadeUp}>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Patients Treated", value: "8,000+" }, { label: "5-Star Reviews", value: "200+" }, { label: "Treatments Offered", value: "30+" }, { label: "Locations", value: "2" }].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-border text-center luxury-shadow">
                  <p className="text-3xl font-serif font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-foreground/50 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── REAL REVIEWS (6 cards) ── */}
      <Section className="bg-white">
        <div className="text-center mb-14">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Patient Stories</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">What Our Patients Say</h2>
          <p className="text-foreground/45 text-sm">Real reviews from real patients across Kingsport and Jonesborough.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reviews.map((review, i) => (
            <motion.div key={i} {...stagger} transition={{ delay: i * 0.07, duration: 0.5 }} className="p-6 rounded-2xl bg-background border border-border hover:luxury-shadow transition-all duration-300">
              <div className="flex gap-0.5 mb-3">{[...Array(review.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}</div>
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
            <Star className="w-4 h-4 text-primary fill-primary" /> Read Google Reviews
          </a>
          <a href="https://www.facebook.com/balancedwellnessmedspa/reviews" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-foreground font-medium rounded-full border border-border hover:luxury-shadow transition-all text-sm">
            <Star className="w-4 h-4 text-primary fill-primary" /> Read Facebook Reviews
          </a>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ── BEFORE & AFTER ── */}
      <Section className="bg-background">
        <div className="text-center mb-12">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Real Results</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Before &amp; After Transformations</h2>
          <p className="text-foreground/45 mt-3 text-sm">See what's possible with expert care at Balanced Wellness Medical Spa.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-10">
          {[
            { before: "/images/laser-before.jpg", after: "/images/laser-after.jpg", title: "CO2 Laser Resurfacing" },
            { before: "/images/lips-before.jpg", after: "/images/lips-after.jpg", title: "Lip Filler" },
            { before: "/images/before-lips-branded.jpg", after: "/images/after-lips-branded.jpg", title: "Lip Filler — Natural Look" },
            { before: "/images/before-weightloss.jpg", after: "/images/after-weightloss.jpg", title: "Medical Weight Loss" },
          ].map((photo, i) => (
            <motion.div key={i} {...stagger} transition={{ delay: i * 0.08, duration: 0.5 }} className="luxury-card overflow-hidden">
              <BeforeAfterSlider beforeImage={photo.before} afterImage={photo.after} />
              <div className="p-4 text-center"><h3 className="text-sm font-serif font-bold text-foreground">{photo.title}</h3></div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/gallery" className="inline-block px-7 py-2.5 bg-white text-foreground font-medium rounded-full border border-border hover:luxury-shadow transition-all text-sm">View Full Gallery</Link>
          <button type="button" onClick={() => openBookingChooser({ service: "Free Consultation" })} className="inline-block px-7 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/15 text-sm">Book a Free Consultation</button>
        </div>
      </Section>

      {/* ── KELLIAI with strategic prompts ── */}
      <Section className="bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary/[0.06] border border-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-4">
              <Bot className="w-3.5 h-3.5" /> Instant Answers
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Ask KelliAI</h2>
            <p className="text-foreground/45 text-sm max-w-xl mx-auto">Your virtual wellness assistant answers questions about treatments, candidacy, memberships, and more — instantly, 24/7.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { prompt: "Which treatment is right for my wrinkles?", icon: <Sparkles className="w-5 h-5" /> },
              { prompt: "Am I a candidate for weight loss medication?", icon: <Scale className="w-5 h-5" /> },
              { prompt: "Compare memberships for me", icon: <Award className="w-5 h-5" /> },
              { prompt: "What treats acne scars?", icon: <HeartPulse className="w-5 h-5" /> },
              { prompt: "How much does Botox cost?", icon: <HelpCircle className="w-5 h-5" /> },
              { prompt: "What helps with skin tightening?", icon: <Stethoscope className="w-5 h-5" /> },
            ].map((item, i) => (
              <motion.button key={i} {...stagger} transition={{ delay: i * 0.07, duration: 0.5 }}
                onClick={() => window.dispatchEvent(new CustomEvent("askKelliAI", { detail: { prompt: item.prompt } }))}
                className="group flex items-center gap-3 p-4 rounded-2xl border border-border bg-white hover:luxury-shadow-lg hover:border-primary/20 transition-all duration-300 text-left">
                <div className="w-9 h-9 rounded-xl bg-primary/[0.06] text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{item.prompt}</p>
                  <p className="text-[11px] text-foreground/35 mt-0.5">Tap to ask KelliAI</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </motion.button>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => window.dispatchEvent(new CustomEvent("askKelliAI"))}
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline underline-offset-4">
              <MessageSquare className="w-4 h-4" /> Text us a photo or question — we'll guide you to the right treatment <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Section>

      <FlexiblePaymentsSection />

      {/* ── MEMBERSHIPS with "best for" + savings ── */}
      <Section className="luxury-gradient">
        <div className="text-center mb-14">
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">VIP Memberships</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Exclusive Wellness Memberships</h2>
          <p className="text-foreground/45 mt-3 text-sm">Join our VIP program and enjoy exclusive savings, priority booking, and complimentary monthly treatments.</p>
          <div className="decorative-line mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-6">
          {membershipTiers.map((m, i) => (
            <motion.div key={m.tier} {...stagger} transition={{ delay: i * 0.12, duration: 0.5 }} className={`relative p-7 rounded-2xl bg-white border transition-all duration-500 ${m.popular ? "border-primary/30 luxury-shadow-lg scale-[1.02]" : "border-border hover:luxury-shadow"}`}>
              {m.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-[10px] uppercase tracking-widest font-bold rounded-full">Most Popular</div>}
              <p className="text-xs text-primary font-semibold uppercase tracking-[0.15em] mb-1">{m.tier}</p>
              <p className="text-3xl font-serif font-bold text-foreground mb-1">{m.price}<span className="text-sm font-sans font-normal text-foreground/40">/mo</span></p>
              <p className="text-xs text-foreground/40 italic mb-1">{m.bestFor}</p>
              <p className="text-xs font-semibold text-primary mb-4">✦ {m.annualSavings}</p>
              <div className="section-divider my-4" />
              <ul className="space-y-2.5 mb-7">
                {m.highlights.map((h, j) => (
                  <li key={j} className="flex items-start text-sm text-foreground/60">
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

      {/* ── FAQ ── */}
      <Section className="luxury-gradient-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
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
              <motion.div key={i} {...stagger} transition={{ delay: i * 0.06, duration: 0.5 }} className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] transition-all duration-500">
                <h3 className="font-bold text-champagne mb-3 text-[15px]">{faq.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── LOCATIONS ── */}
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
        title="Ready to Begin Your Transformation?"
        subtitle="Schedule a complimentary consultation with our expert providers and discover your personalized treatment plan."
        buttonText="Book a Free Consultation"
      />

      {/* ── STICKY MOBILE CTA BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-xl">
        <div className="flex items-stretch">
          <a href="tel:423-765-1393" className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 border-r border-border text-foreground/70 hover:bg-background transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-medium uppercase tracking-wide">Call</span>
          </a>
          <button type="button" onClick={() => openBookingChooser({ service: "Free Consultation" })}
            className="flex-[2] flex items-center justify-center py-3 bg-primary text-white font-semibold text-sm gap-2 hover:bg-primary/90 transition-colors">
            <CalendarCheck className="w-4 h-4" /> Book Free Consult
          </button>
          <Link href="/sms-consent" className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 border-l border-border text-foreground/70 hover:bg-background transition-colors">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-medium uppercase tracking-wide">Text</span>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
