import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { SEO } from "@/components/SEO";
import { Shield, Heart, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function About() {
  const values = [
    { icon: <Shield className="w-8 h-8" />, title: "Safety First", desc: "Medical expertise and rigorous safety protocols form the foundation of every treatment." },
    { icon: <Heart className="w-8 h-8" />, title: "Natural Results", desc: "We enhance your unique features, not change who you are. The best work is undetectable." },
    { icon: <Award className="w-8 h-8" />, title: "Luxury Experience", desc: "An elevated, tranquil environment designed for your comfort from the moment you arrive." },
    { icon: <Users className="w-8 h-8" />, title: "Relationship-Driven", desc: "We build long-term partnerships with our patients, understanding their unique goals over time." },
  ];

  return (
    <PageLayout>
      <SEO title="About Us | Balanced Wellness Medical Spa Kingsport & Jonesborough TN" description="Meet the team at Balanced Wellness Medical Spa. Board-certified providers delivering luxury aesthetics, weight loss, and wellness medicine in Kingsport & Jonesborough TN." keywords="about Balanced Wellness, med spa team Kingsport TN, board certified providers Jonesborough TN, medical spa about, aesthetic medicine team" />
      <div className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">About Balanced Wellness</h1>
          <p className="text-xl text-white/80 font-light">Premier Medical Spa in Kingsport & Jonesborough TN</p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-foreground/60 mb-5 leading-relaxed">
              At Balanced Wellness Medical Spa, our mission is to empower you to look and feel your absolute best through the perfect synergy of aesthetic medicine, wellness, and longevity science.
            </p>
            <p className="text-foreground/60 mb-5 leading-relaxed">
              Founded on the belief that beauty is an expression of internal health, we moved beyond the traditional "quick-fix" med spa model. We focus on building long-term relationships with our patients, understanding their unique goals, and developing comprehensive treatment plans that yield natural, stunning results.
            </p>
            <p className="text-foreground/60 mb-6 leading-relaxed">
              With two convenient locations in Kingsport and Jonesborough, we bring luxury medical aesthetics and evidence-based wellness to the Tri-Cities region.
            </p>
            <div className="p-6 luxury-gradient rounded-2xl border border-primary/15">
              <p className="font-serif text-xl italic text-foreground text-center">
                "Where Beauty Meets Wellness"
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 bg-primary/10 rounded-3xl transform rotate-2" />
            <div className="relative rounded-2xl shadow-xl z-10 w-full aspect-[4/3] bg-gradient-to-br from-secondary via-background to-champagne/20 border border-border p-8 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-4">By the numbers</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { value: "8,000+", label: "Patients Treated" },
                  { value: "200+", label: "5-Star Reviews" },
                  { value: "5+ yrs", label: "Serving Tri-Cities" },
                  { value: "2", label: "Locations" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border text-center">
                    <p className="text-2xl font-serif font-bold text-primary">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-foreground/50 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70 justify-center">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">Medical providers serving Kingsport & Jonesborough, TN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-foreground/60">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <CTA />
    </PageLayout>
  );
}
