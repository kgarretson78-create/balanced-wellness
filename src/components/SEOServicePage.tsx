import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, MapPin, Phone, Calendar, Star, AlertCircle, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { ServiceSchema, LocalBusinessSchema } from "@/components/SchemaMarkup";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export interface RelatedLink {
  name: string;
  path: string;
  desc: string;
}

export interface ExpectationCard {
  phase: "Before" | "During" | "After";
  icon: string;
  items: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface SEOServicePageProps {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    badge: string;
    h1: string;
    subheadline: string;
  };
  intro: {
    h2: string;
    body: string[];
  };
  benefits: { title: string; desc: string }[];
  candidates: {
    goodFor: string[];
    notFor: string[];
  };
  expectations: ExpectationCard[];
  faqs: FAQItem[];
  relatedLinks: RelatedLink[];
  schemaDescription: string;
}

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

export function SEOServicePage(props: SEOServicePageProps) {
  const { seo, hero, intro, benefits, candidates, expectations, faqs, relatedLinks, schemaDescription } = props;

  return (
    <PageLayout>
      <SEO title={seo.title} description={seo.description} keywords={seo.keywords} />
      <LocalBusinessSchema />
      <ServiceSchema
        serviceName={hero.h1}
        description={schemaDescription}
        faqs={faqs}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 luxury-gradient" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, hsl(0 33% 65%), transparent 60%)' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5" />
              {hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-5">
              {hero.h1}
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 mb-8 max-w-2xl leading-relaxed">
              {hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book a Consultation
              </Link>
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
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{hero.h1}</span>
          </nav>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">{intro.h2}</h2>
              <div className="space-y-4">
                {intro.body.map((para, i) => (
                  <p key={i} className="text-foreground/65 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-secondary rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-foreground mb-4">Quick Facts</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Board-certified providers</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">FDA-approved treatments</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Two convenient TN locations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Free consultations available</span>
                </div>
                <Link href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505" target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                  Book Free Consult <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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

      {/* Benefits */}
      <section className="py-16 md:py-20 luxury-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-2">Why Patients Love It</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Benefits of {hero.h1.replace(/ in Kingsport.*/, "").replace(/ Kingsport.*/, "")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, i) => (
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

      {/* Candidacy */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Am I a Good Candidate?</h2>
            <p className="text-foreground/60 mt-3 max-w-2xl mx-auto">
              A personalized consultation helps determine the best treatment plan for your goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-secondary rounded-2xl p-7 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h3 className="font-bold text-foreground">Good Candidates Include</h3>
              </div>
              <ul className="space-y-3">
                {candidates.goodFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary rounded-2xl p-7 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-foreground">May Not Be Suitable If</h3>
              </div>
              <ul className="space-y-3">
                {candidates.notFor.map((item, i) => (
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
            <p className="text-xs text-champagne uppercase tracking-widest font-semibold mb-2">Your Journey</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">What to Expect</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {expectations.map((card, i) => (
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

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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
            Visit Us for {hero.h1.replace(/ in Kingsport.*/, "").replace(/ Kingsport.*/, "")} — Two Convenient Locations
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

      {/* Related Treatments */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-foreground text-center mb-10">Related Treatments</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLinks.map((link, i) => (
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-foreground/60 mb-8 text-lg max-w-2xl mx-auto">
            Schedule your complimentary consultation at our Kingsport or Jonesborough clinic today. Our expert providers will design a personalized treatment plan just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Your Free Consultation
            </Link>
            <a
              href="tel:423-765-1393"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-semibold rounded-full border border-border hover:bg-secondary transition-all"
            >
              <Phone className="w-4 h-4 text-primary" />
              Call Now
            </a>
          </div>
          <p className="text-xs text-foreground/40 mt-6">
            * Consultations are complimentary and non-obligatory. Results may vary by individual.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
