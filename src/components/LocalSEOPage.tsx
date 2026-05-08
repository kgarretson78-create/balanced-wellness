import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, MapPin, Phone, Calendar, Star, Navigation } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export interface LocalSEOPageProps {
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
  services: { name: string; desc: string; link: string }[];
  whyUs: string[];
  nearbyAreas: string[];
  primaryLocation: {
    city: string;
    address: string;
    zip: string;
    phone: string;
    tel: string;
    directions: string;
  };
  secondaryLocation: {
    city: string;
    address: string;
    zip: string;
    phone: string;
    tel: string;
    directions: string;
    distance: string;
  };
  faqs: { q: string; a: string }[];
  relatedLinks: { name: string; path: string; desc: string }[];
}

export function LocalSEOPage(props: LocalSEOPageProps) {
  const { seo, hero, intro, services, whyUs, nearbyAreas, primaryLocation, secondaryLocation, faqs, relatedLinks } = props;

  return (
    <PageLayout>
      <SEO title={seo.title} description={seo.description} keywords={seo.keywords} />
      <LocalBusinessSchema />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 luxury-gradient" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <MapPin className="w-3.5 h-3.5" />
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
                Book a Free Consultation
              </Link>
              <a
                href={`tel:${primaryLocation.tel}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-foreground font-semibold rounded-full border border-border hover:bg-secondary transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                {primaryLocation.phone}
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
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
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

              <div className="mt-8">
                <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Patients From Nearby Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {nearbyAreas.map((area, i) => (
                    <span key={i} className="px-3 py-1.5 bg-secondary text-foreground/70 text-xs rounded-full border border-border">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-foreground rounded-2xl p-6 text-white">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-4 font-medium">Visit Our Clinic</p>
                <div className="mb-4">
                  <p className="font-semibold text-champagne">{primaryLocation.city}, TN</p>
                  <p className="text-xs text-white/60 mt-1">{primaryLocation.address}</p>
                  <p className="text-xs text-white/60">{primaryLocation.zip}</p>
                  <a href={`tel:${primaryLocation.tel}`} className="text-xs text-primary mt-1.5 flex items-center gap-1 hover:underline">
                    <Phone className="w-3 h-3" /> {primaryLocation.phone}
                  </a>
                  <a href={primaryLocation.directions} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 mt-1 flex items-center gap-1 hover:text-white">
                    <Navigation className="w-3 h-3" /> Get Directions
                  </a>
                </div>
                <Link href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                  Book Appointment
                </Link>
              </div>
              <div className="bg-secondary rounded-xl p-5 border border-border">
                <p className="text-xs text-foreground/50 uppercase tracking-widest mb-3 font-medium">Also Serving</p>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{secondaryLocation.city}, TN</p>
                    <p className="text-xs text-foreground/60">{secondaryLocation.address}</p>
                    <p className="text-xs text-foreground/50 mt-0.5">{secondaryLocation.distance} away</p>
                    <a href={`tel:${secondaryLocation.tel}`} className="text-xs text-primary mt-1 flex items-center gap-1 hover:underline">
                      <Phone className="w-3 h-3" /> {secondaryLocation.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 luxury-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Our Services in {primaryLocation.city}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.06 }}>
                <Link href={service.link} className="group block bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:shadow-lg hover:border-primary/30 transition-all h-full">
                  <ChevronRight className="w-5 h-5 text-primary mb-3 group-hover:translate-x-1 transition-transform" />
                  <h3 className="font-bold text-foreground mb-1.5 text-sm">{service.name}</h3>
                  <p className="text-xs text-foreground/60">{service.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
                Why Patients Choose Balanced Wellness in {primaryLocation.city}
              </h2>
              <ul className="space-y-3.5">
                {whyUs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/70 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-3">
                <Link href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors">
                  Book Consultation
                </Link>
                <Link href="/about" className="px-6 py-3 text-primary text-sm font-semibold rounded-full border border-primary hover:bg-primary hover:text-white transition-colors">
                  Learn About Us
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "5-Star Reviews", value: "200+" },
                { label: "Years of Excellence", value: "5+" },
                { label: "Treatments Offered", value: "30+" },
                { label: "Happy Patients", value: "1,000+" },
              ].map((stat, i) => (
                <div key={i} className="bg-secondary rounded-xl p-6 border border-border text-center">
                  <p className="text-3xl font-serif font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-foreground/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-2 text-sm leading-snug">{faq.q}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-foreground text-center mb-10">Explore Our Treatments</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLinks.map((link, i) => (
              <Link key={i} href={link.path} className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all">
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
            Your Nearest Med Spa in {primaryLocation.city}
          </h2>
          <p className="text-foreground/60 mb-8 text-lg">
            Balanced Wellness Medical Spa is {primaryLocation.city}'s premier destination for aesthetic medicine and wellness. Visit us today for a complimentary consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
              <Calendar className="w-4 h-4" />
              Book Your Free Consultation
            </Link>
            <a href={`tel:${primaryLocation.tel}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-semibold rounded-full border border-border hover:bg-secondary transition-all">
              <Phone className="w-4 h-4 text-primary" />
              Call {primaryLocation.phone}
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
