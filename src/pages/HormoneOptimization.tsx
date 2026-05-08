import { PageLayout } from "@/components/layout/PageLayout";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import { CheckCircle2, Dna, Droplet, HeartPulse, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function HormoneOptimization() {
  const treatments = [
    { name: "Bioidentical Hormone Replacement", desc: "Custom-compounded bioidentical hormones for men and women to restore optimal estrogen, progesterone, and testosterone levels.", icon: <Dna className="w-6 h-6" /> },
    { name: "Testosterone Optimization", desc: "Comprehensive male hormone therapy addressing low T symptoms: fatigue, weight gain, low libido, and muscle loss.", icon: <Zap className="w-6 h-6" /> },
    { name: "Thyroid Optimization", desc: "Advanced thyroid panel analysis and targeted treatment for hypothyroidism, Hashimoto's, and metabolic dysfunction.", icon: <HeartPulse className="w-6 h-6" /> },
    { name: "Peptide Therapy", desc: "BPC-157, CJC/Ipamorelin, and other therapeutic peptides for tissue repair, anti-aging, improved sleep, and cellular regeneration.", icon: <Droplet className="w-6 h-6" /> },
    { name: "Adrenal & Cortisol Management", desc: "Targeted support for adrenal fatigue, chronic stress, and cortisol imbalance affecting energy and weight.", icon: <Shield className="w-6 h-6" /> },
    { name: "Longevity Medicine", desc: "Evidence-based protocols designed to extend healthspan through hormone balance, cellular optimization, and metabolic health.", icon: <Dna className="w-6 h-6" /> },
  ];

  return (
    <PageLayout>
      <SEO title="Hormone Optimization Kingsport TN | Bioidentical HRT | Balanced Wellness Medical Spa" description="Bioidentical hormone replacement therapy, testosterone optimization, thyroid support, and peptide therapy in Kingsport & Jonesborough TN. Restore your vitality." keywords="hormone therapy Kingsport TN, bioidentical HRT Jonesborough TN, testosterone therapy Kingsport, thyroid optimization, peptide therapy" />
      <div className="relative h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Restore &middot; Optimize &middot; Thrive</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Hormone Optimization</h1>
          <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
            Advanced hormone therapy and longevity medicine in Kingsport & Jonesborough TN.
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Reclaim Your Vitality</h2>
          <p className="text-lg text-foreground/60 leading-relaxed">
            Hormones are the master regulators of energy, mood, metabolism, and aging. When they're out of balance, everything suffers. Our hormone optimization programs use comprehensive lab analysis and bioidentical therapies to restore your body's natural equilibrium.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {treatments.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:glow-primary transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                {t.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">{t.name}</h3>
              <p className="text-sm text-foreground/60">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="luxury-gradient">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Signs You May Benefit From Hormone Optimization</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {["Persistent fatigue or brain fog", "Unexplained weight gain", "Low libido or sexual dysfunction", "Mood swings, anxiety, or depression", "Poor sleep quality", "Thinning hair or skin changes", "Loss of muscle mass", "Hot flashes or night sweats", "Difficulty concentrating"].map((symptom, i) => (
            <div key={i} className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-border">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mr-3" />
              <span className="text-sm text-foreground/80">{symptom}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-10">Our Approach</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {["Comprehensive hormone panel & lab analysis", "Personalized bioidentical protocols", "Ongoing monitoring & dose adjustments", "Integrative approach with nutrition & lifestyle", "Male and female hormone programs", "Peptide therapy & longevity protocols"].map((b, i) => (
              <div key={i} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
                <span className="text-foreground/80 font-medium">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-sm text-foreground/50 italic text-center border-t border-border pt-8">
            *Hormone therapy requires thorough medical evaluation, lab testing, and ongoing monitoring. Treatment is prescribed only when medically appropriate.
          </div>
        </div>
      </Section>

      <CTA subtitle="Book a comprehensive hormone panel and consultation to discover your optimization path." />
    </PageLayout>
  );
}
