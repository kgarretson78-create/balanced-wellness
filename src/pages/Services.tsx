import { Link } from "wouter";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { CTA } from "@/components/ui/CTA";
import { SEO } from "@/components/SEO";
import { Sparkles, Stethoscope, Droplet, Dna, Scale, Zap, Gem, Sun, Activity, ArrowRight } from "lucide-react";
import { useBookingChooser } from "@/components/booking/LocationChooser";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const monthly = (price: number) => Math.ceil(price / 12);

export default function Services() {
  const { open: openBookingChooser } = useBookingChooser();
  const categories = [
    {
      id: "injectables",
      title: "Injectables & Fillers",
      tagline: "Smooth lines, restore volume",
      bestFor: "Best for: Softening forehead lines, crow's feet, and restoring lip or cheek volume.",
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      shortDesc: "Refresh your look with premium neurotoxins and hyaluronic acid fillers — placed by experienced injectors for results that look like you, only rested.",
      services: ["Botox & Dysport", "Jeuveau", "Daxxify", "Dermal Fillers", "Kybella", "Lip Enhancement"],
      link: "/injectables",
      price: 350,
      img: "service-injectables.png",
      gradient: "from-rose-100/60 via-champagne/30 to-primary/10",
    },
    {
      id: "laser",
      title: "Laser & Skin Treatments",
      tagline: "Clearer, brighter, firmer skin",
      bestFor: "Best for: Sun damage, fine lines, acne scars, large pores, and skin laxity.",
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      shortDesc: "Advanced laser, IPL, and RF microneedling tailored to your skin type — to fade discoloration, smooth texture, and rebuild collagen over time.",
      services: ["Laser Hair Removal", "IPL / Photofacial", "Spectrum Erbium Laser", "RF Microneedling", "Skin Rejuvenation Packages"],
      link: "/laser-treatments",
      price: 1200,
      img: "service-laser.png",
      gradient: "from-amber-100/50 via-background to-primary/10",
    },
    {
      id: "weight-loss",
      title: "Medical Weight Loss",
      tagline: "Lose weight with medical support",
      bestFor: "Best for: Patients who've tried diet and exercise and want medically supervised, sustainable progress.",
      icon: <Scale className="w-8 h-8 text-primary" />,
      shortDesc: "Semaglutide and Tirzepatide programs guided by medical providers, with monthly check-ins, lab review, and a personalized plan — not a one-size shot.",
      services: ["Semaglutide / Tirzepatide", "Lipotropic Injections", "Body Contouring", "Metabolic Reset", "Nutrition Plans"],
      link: "/weight-loss",
      price: 699,
      img: "service-weight.png",
      gradient: "from-emerald-100/50 via-background to-primary/10",
    },
    {
      id: "wellness",
      title: "Wellness & IV Therapy",
      tagline: "Energy, immunity & recovery",
      bestFor: "Best for: Low energy, stress, post-illness recovery, athletes, and busy professionals.",
      icon: <Droplet className="w-8 h-8 text-primary" />,
      shortDesc: "IV hydration, vitamin injections, peptides, and NAD+ — a quick-acting way to support energy, focus, and recovery from the inside out.",
      services: ["IV Hydration", "Peptide Therapy", "B12 & Vitamin D", "Lipotropic / Skinny Shot", "NAD+ Therapy"],
      link: "/wellness",
      price: 250,
      img: "service-wellness.png",
      gradient: "from-sky-100/50 via-background to-champagne/20",
    },
    {
      id: "hormones",
      title: "Hormone Optimization",
      tagline: "Feel like yourself again",
      bestFor: "Best for: Fatigue, low libido, mood changes, sleep issues, and midlife hormonal shifts (men & women).",
      icon: <Dna className="w-8 h-8 text-primary" />,
      shortDesc: "Bioidentical hormone therapy for men and women, guided by lab work and provider oversight — to help restore energy, focus, and balance.",
      services: ["Bioidentical HRT", "Testosterone Optimization", "Thyroid Support", "Adrenal Health", "Longevity Protocols"],
      link: "/hormone-optimization",
      price: 499,
      img: "service-wellness.png",
      gradient: "from-violet-100/50 via-background to-primary/10",
    },
  ];

  const featured = [
    {
      icon: <Scale className="w-5 h-5 text-primary" />,
      title: "Medical Weight Loss Program",
      desc: "Clinically guided support with provider oversight.",
      price: 699,
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: "Neurotoxin Treatment (Botox / Dysport / Jeuveau / Daxxify)",
      desc: "Smooth fine lines and prevent new ones with premium neurotoxins.",
      price: 350,
    },
    {
      icon: <Gem className="w-5 h-5 text-primary" />,
      title: "Dermal Filler",
      desc: "Restore lost volume in lips, cheeks, and jawline for a refreshed look.",
      price: 750,
    },
    {
      icon: <Sun className="w-5 h-5 text-primary" />,
      title: "Laser Hair Removal Package",
      desc: "Six-treatment package for long-lasting smooth skin.",
      price: 900,
    },
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: "IPL / Photofacial",
      desc: "Even skin tone, fade sun damage, and brighten complexion.",
      price: 425,
    },
    {
      icon: <Activity className="w-5 h-5 text-primary" />,
      title: "Spectrum Erbium Laser",
      desc: "Resurface for smoother texture, fewer fine lines, and a luminous glow.",
      price: 1100,
    },
    {
      icon: <Stethoscope className="w-5 h-5 text-primary" />,
      title: "RF Microneedling",
      desc: "Tighten, smooth, and rebuild collagen with radiofrequency microneedling.",
      price: 1200,
    },
    {
      icon: <Droplet className="w-5 h-5 text-primary" />,
      title: "Skin Rejuvenation Package",
      desc: "Multi-treatment plan customized to your skin goals.",
      price: 1500,
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: "Wellness / Vitamin Injection Bundle",
      desc: "B12, lipotropic, and skinny-shot bundle to boost energy and metabolism.",
      price: 240,
    },
  ];

  return (
    <PageLayout>
      <SEO title="Medical Spa Services | Balanced Wellness Kingsport & Jonesborough TN" description="Explore our full range of medical spa services including injectables, laser treatments, weight loss, hormone optimization, and wellness programs in Kingsport & Jonesborough TN." keywords="med spa services Kingsport TN, aesthetic treatments Jonesborough TN, Botox, fillers, laser, weight loss, hormone therapy" />
      <div className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Our Expertise</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Our Services</h1>
          <p className="text-xl text-white/80 font-light">
            Comprehensive medical aesthetics and wellness treatments in Kingsport & Jonesborough TN.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2">
                <div className={`relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gradient-to-br ${cat.gradient} border border-border flex flex-col items-center justify-center p-8`}>
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
                  <div className="relative z-10 text-center max-w-xs">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-5 mx-auto">
                      {cat.icon}
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-2">{cat.tagline}</p>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-3 leading-snug">{cat.title}</h3>
                    <p className="text-sm text-foreground/60 italic">{cat.bestFor}</p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  {cat.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{cat.title}</h2>
                <p className="text-foreground/60">{cat.shortDesc}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-4 border-y border-border">
                  {cat.services.map(item => (
                    <li key={item} className="flex items-center text-sm text-foreground/80 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-serif text-3xl font-bold text-foreground">
                    From ${cat.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-primary font-semibold">
                    As low as ${monthly(cat.price)}/month*
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openBookingChooser({ service: cat.title })}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 shadow-md shadow-primary/15 transition-all text-sm"
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    href={cat.link}
                    className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors duration-300 text-sm"
                  >
                    See if this is right for me
                  </Link>
                </div>

                <p className="text-[11px] text-foreground/40 italic">
                  *Estimated monthly payment example. Actual terms depend on provider approval. Treatment eligibility varies — consultation required.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-xs font-semibold mb-3">Popular Treatments</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Featured Services & Packages
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Reserve now — pay later options available. Book now, choose your payment option at checkout.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group rounded-2xl bg-white border border-border p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-foreground/60 mb-4 flex-1">{s.desc}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-2xl font-bold text-foreground">${s.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-primary font-semibold mb-4">
                  As low as ${monthly(s.price)}/month*
                </p>
                <button
                  type="button"
                  onClick={() => openBookingChooser({ service: s.title })}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all text-sm shadow-sm"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
          <p className="text-[11px] text-foreground/40 italic text-center mt-8 max-w-2xl mx-auto">
            *Estimated monthly payment shown for example purposes. Payment options subject to approval. Final terms may vary by provider. Results vary — provider evaluation required.
          </p>
          <div className="text-center mt-8">
            <Link
              href="/flexible-payments"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
            >
              Learn more about flexible payment options <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </PageLayout>
  );
}
