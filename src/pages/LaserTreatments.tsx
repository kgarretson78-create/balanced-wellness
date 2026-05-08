import { PageLayout } from "@/components/layout/PageLayout";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function LaserTreatments() {
  const treatments = [
    { name: "Laser Hair Removal", desc: "Achieve smooth, hair-free skin permanently. Our advanced lasers safely target hair follicles across various skin types." },
    { name: "IPL Photofacials", desc: "Erase sun damage, age spots, and rosacea. Intense Pulsed Light evens out skin tone for a flawless complexion." },
    { name: "RF Microneedling", desc: "Combines microneedling with radiofrequency energy to stimulate deep collagen production, tighten skin, and improve texture." },
    { name: "Skin Resurfacing", desc: "Stimulate collagen production and improve skin texture, reducing acne scars, large pores, and deep wrinkles." },
    { name: "Vein Reduction", desc: "Safely collapse and fade unwanted spider veins and broken capillaries on the face and legs." },
  ];

  return (
    <PageLayout>
      <SEO title="Laser Treatments Kingsport TN | RF Microneedling | Balanced Wellness Medical Spa" description="Advanced laser hair removal, IPL photofacials, RF microneedling, and skin resurfacing in Kingsport & Jonesborough TN. State-of-the-art technology for radiant skin." keywords="laser hair removal Kingsport TN, IPL photofacial Jonesborough TN, RF microneedling Kingsport, skin resurfacing, laser treatments" />
      <div className="relative h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Advanced Technology</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Laser & Skin Treatments</h1>
          <p className="text-xl text-white/80 font-light">Advanced technology for radiant, flawless skin.</p>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-5">Cutting-Edge Laser & Skin Dermatology</h2>
          <p className="text-foreground/60 leading-relaxed">
            Harness the power of light and energy. Balanced Wellness Medical Spa utilizes industry-leading aesthetic devices to address your most stubborn skin concerns safely and effectively, with transformative results and minimal downtime.
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
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-10">The Balanced Wellness Difference</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {['State-of-the-Art Laser Devices', 'Safe for Multiple Skin Types', 'Customized Treatment Protocols', 'Minimal Downtime Options', 'Focus on Comfort and Safety', 'Comprehensive Skincare Planning'].map((benefit, i) => (
              <div key={i} className="flex items-start bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
                <span className="text-foreground/80 font-medium text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-sm text-foreground/50 italic text-center border-t border-border pt-8">
            *Multiple sessions are typically required for optimal results. Sun avoidance is mandatory before and after certain laser procedures.
          </div>
        </div>
      </Section>

      <CTA subtitle="Discover which laser or skin treatment is right for your goals." />
    </PageLayout>
  );
}
