import { PageLayout } from "@/components/layout/PageLayout";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Wellness() {
  const treatments = [
    { name: "IV Hydration Therapy", desc: "Direct infusion of essential vitamins, minerals, and hydration to boost immunity, enhance energy, and speed up recovery." },
    { name: "Peptide Therapy", desc: "Targeted amino acid treatments that stimulate cellular repair, promote anti-aging, improve sleep, and build lean muscle." },
    { name: "Nutrient Injections", desc: "Quick intramuscular shots like B12, Vitamin D, and Glutathione for an instant energy and wellness boost." },
    { name: "NAD+ Therapy", desc: "Cellular energy restoration to combat aging, improve brain function, and enhance metabolic health." },
    { name: "Longevity Medicine", desc: "Evidence-based protocols designed to extend healthspan through cellular optimization and metabolic health." },
  ];

  return (
    <PageLayout>
      <SEO title="Wellness & Longevity Kingsport TN | IV Therapy & Peptides | Balanced Wellness Medical Spa" description="IV hydration therapy, peptide therapy, NAD+, nutrient injections, and longevity medicine in Kingsport & Jonesborough TN. Optimize your health from within." keywords="wellness clinic Kingsport TN, IV therapy Kingsport TN, peptide therapy Jonesborough TN, NAD+ therapy, longevity medicine" />
      <div className="relative h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Optimize From Within</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Wellness & Longevity</h1>
          <p className="text-xl text-white/80 font-light">Optimize your internal health to radiate outward vitality.</p>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-5">Holistic Vitality & Anti-Aging</h2>
          <p className="text-foreground/60 leading-relaxed">
            Beauty isn't just skin deep. How you feel internally dramatically affects how you look externally. Our wellness and longevity programs are designed to restore your body's natural balance, giving you the energy and vitality to live your best life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {treatments.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-white p-7 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:glow-primary transition-all duration-500">
              <h3 className="text-xl font-serif font-bold text-primary mb-2">{t.name}</h3>
              <p className="text-sm text-foreground/60">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/iv-lounge-kingsport-tn" className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors">
            See the IV Lounge Menu
          </Link>
          <Link href="/hormone-optimization" className="inline-block px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors">
            Explore Hormone Optimization
          </Link>
        </div>
      </Section>

      <Section className="luxury-gradient">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-10">Why Focus on Internal Wellness?</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {['Customized Bioidentical Solutions', 'Comprehensive Blood Panel Analysis', 'Relief from Fatigue and Brain Fog', 'Improved Sleep and Mood', 'Enhanced Athletic Recovery', 'Protects Long-term Cellular Health'].map((benefit, i) => (
              <div key={i} className="flex items-start bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
                <span className="text-foreground/80 font-medium text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-sm text-foreground/50 italic text-center border-t border-border pt-8">
            *Wellness therapies require medical evaluation. Treatment plans are customized based on individual lab work and health history.
          </div>
        </div>
      </Section>

      <CTA subtitle="Book lab testing and a wellness consultation today." />
    </PageLayout>
  );
}
