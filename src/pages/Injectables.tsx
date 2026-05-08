import { PageLayout } from "@/components/layout/PageLayout";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Injectables() {
  const treatments = [
    { name: "Neurotoxins (Botox, Dysport, Daxxify)", desc: "Relaxes facial muscles to smooth fine lines and wrinkles — forehead, crow's feet, and between the brows. Daxxify offers longer-lasting results." },
    { name: "Dermal Fillers", desc: "Restores lost volume, smooths deeper wrinkles, and enhances facial contours such as lips, cheeks, and jawline using premium hyaluronic acid fillers." },
    { name: "Kybella", desc: "The only FDA-approved injectable treatment that permanently destroys fat cells under the chin for a refined, sculpted profile." },
    { name: "Lip Enhancement", desc: "Customized filler injections designed to add natural-looking volume, symmetry, hydration, and definition to your lips." },
  ];

  return (
    <PageLayout>
      <SEO title="Botox & Fillers Kingsport TN | Injectables | Balanced Wellness Medical Spa" description="Expert Botox, Dysport, Daxxify, dermal fillers, lip filler, and Kybella injections in Kingsport & Jonesborough TN. Natural-looking results by board-certified providers." keywords="Botox Kingsport TN, lip filler Kingsport TN, dermal fillers Jonesborough TN, Kybella Kingsport, Dysport, Daxxify" />
      <div className="relative h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Artful Enhancements</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Injectables & Fillers</h1>
          <p className="text-xl text-white/80 font-light">Naturally refreshed beauty with expert precision.</p>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-5">Expert Aesthetic Injectables in Kingsport & Jonesborough</h2>
          <p className="text-foreground/60 leading-relaxed">
            Our highly trained providers view injectables as an art form. We specialize in creating subtle, natural-looking results that enhance your unique features without looking "done." The best work is the work no one can tell you've had.
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
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-10">Why Choose Us for Your Injectables?</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {['Experienced, Board-Certified Injectors', 'Premium FDA-Approved Products', 'Comprehensive Facial Analysis', 'Focus on Natural, Subtle Results', 'Comfortable, Pain-Managed Experience', 'Detailed Aftercare Support'].map((benefit, i) => (
              <div key={i} className="flex items-start bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
                <span className="text-foreground/80 font-medium text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-sm text-foreground/50 italic text-center border-t border-border pt-8">
            *Results may vary. All patients require a medical consultation prior to treatment to determine candidacy.
          </div>
        </div>
      </Section>

      <CTA subtitle="Schedule a personalized assessment with our expert injectors today." />
    </PageLayout>
  );
}
