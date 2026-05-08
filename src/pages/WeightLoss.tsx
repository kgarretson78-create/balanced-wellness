import { PageLayout } from "@/components/layout/PageLayout";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function WeightLoss() {
  const treatments = [
    { name: "Semaglutide / Tirzepatide", desc: "FDA-approved GLP-1 medications that regulate appetite, reduce cravings, and improve metabolic function for significant, sustainable weight loss." },
    { name: "Lipotropic (MIC) Injections", desc: "Fat-burning injections packed with amino acids and vitamins to boost metabolism and energy levels." },
    { name: "Metabolic Reset Program", desc: "Comprehensive lab analysis, nutritional guidance, and targeted interventions to reset metabolic dysfunction." },
    { name: "Medical Nutrition Coaching", desc: "Personalized macronutrient planning and dietary guidance to support sustainable, long-term lifestyle changes." },
    { name: "Body Contouring", desc: "Non-surgical treatments to tighten skin and reduce stubborn fat pockets as you lose weight." },
  ];

  return (
    <PageLayout>
      <SEO title="Medical Weight Loss Kingsport TN | Semaglutide | Balanced Wellness Medical Spa" description="Medically supervised weight loss programs in Kingsport & Jonesborough TN. Semaglutide, Tirzepatide, metabolic reset, and body contouring for lasting results." keywords="weight loss clinic Kingsport TN, Semaglutide Kingsport TN, Tirzepatide Jonesborough TN, medical weight loss, body contouring" />
      <div className="relative h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Transform Your Health</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Medical Weight Loss</h1>
          <p className="text-xl text-white/80 font-light">Science-backed programs to help you achieve your goal weight safely.</p>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-5">Medically Supervised Weight Loss in Kingsport & Jonesborough</h2>
          <p className="text-foreground/60 leading-relaxed">
            Fad diets don't work. True weight loss requires addressing the underlying metabolic and biological factors. Our medical weight loss programs are provider-supervised, utilizing the latest FDA-approved medications and holistic support for safe, sustainable results.
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
      </Section>

      <Section className="luxury-gradient">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-10">Our Comprehensive Approach</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {['Thorough Lab Testing & Analysis', 'Ongoing Medical Supervision', 'Prescription Medication Management', 'B12 & Metabolism Boosters', 'Judgment-Free Environment', 'Maintenance & Transition Planning'].map((benefit, i) => (
              <div key={i} className="flex items-start bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
                <span className="text-foreground/80 font-medium text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-sm text-foreground/50 italic text-center border-t border-border pt-8">
            *Weight loss results vary by individual. Prescription medications are provided only if deemed medically appropriate after thorough evaluation.
          </div>
        </div>
      </Section>

      <CTA subtitle="Schedule a weight loss consultation and take the first step toward a healthier you." />
    </PageLayout>
  );
}
