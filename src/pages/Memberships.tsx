import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { SEO } from "@/components/SEO";
import { CheckCircle2, Crown, Gem, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { openBookingChooser } from "@/components/BookingChooser";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const tiers = [
  {
    name: "Gold",
    price: "$99",
    period: "/month",
    bestFor: "New patients starting their aesthetic journey",
    idealIf: "You're booking 1–2 wellness or skincare visits a month and want member pricing.",
    icon: <Star className="w-8 h-8" />,
    color: "from-primary/15 to-primary/5",
    iconColor: "text-primary",
    benefits: [
      "10% off all treatments",
      "Monthly B12 or Lipo injection",
      "Priority booking access",
      "Exclusive member pricing on retail",
      "Birthday treatment bonus",
    ],
  },
  {
    name: "Platinum",
    price: "$199",
    period: "/month",
    popular: true,
    bestFor: "Regular patients who want consistent results",
    idealIf: "You come in monthly for facials, peels, or injectables and want bigger savings plus VIP perks.",
    icon: <Crown className="w-8 h-8" />,
    color: "from-primary/15 to-accent/5",
    iconColor: "text-primary",
    benefits: [
      "15% off all treatments",
      "Monthly facial, peel, or dermaplaning",
      "Complimentary consultations",
      "VIP event invitations",
      "Exclusive member pricing on retail",
      "Birthday treatment bonus",
      "Guest pass (1x per quarter)",
    ],
  },
  {
    name: "Diamond",
    price: "$349",
    period: "/month",
    bestFor: "Patients committed to total wellness & aesthetics",
    idealIf: "You invest in injectables, IV therapy, and skin care regularly and want concierge-level access.",
    icon: <Gem className="w-8 h-8" />,
    color: "from-purple-500/10 to-primary/5",
    iconColor: "text-purple-600",
    benefits: [
      "20% off all treatments",
      "Monthly injectable credit ($150 value)",
      "Quarterly IV hydration therapy",
      "Exclusive member-only pricing",
      "Concierge scheduling",
      "Complimentary skin analysis (2x/year)",
      "Priority access to new treatments",
      "VIP lounge access",
    ],
  },
];

const compareRows: { label: string; gold: string; platinum: string; diamond: string }[] = [
  { label: "Discount on treatments", gold: "10%", platinum: "15%", diamond: "20%" },
  { label: "Monthly included treatment", gold: "B12 or Lipo injection", platinum: "Facial, peel, or dermaplaning", diamond: "$150 injectable credit" },
  { label: "Quarterly IV hydration", gold: "—", platinum: "—", diamond: "Included" },
  { label: "Complimentary consultations", gold: "—", platinum: "Included", diamond: "Included" },
  { label: "Priority / concierge booking", gold: "Priority", platinum: "Priority + VIP events", diamond: "Concierge scheduling" },
  { label: "Birthday treatment bonus", gold: "Yes", platinum: "Yes", diamond: "Yes" },
  { label: "Guest pass", gold: "—", platinum: "1x / quarter", diamond: "1x / quarter" },
  { label: "Skin analysis", gold: "—", platinum: "—", diamond: "2x / year" },
];

export default function Memberships() {
  return (
    <PageLayout>
      <SEO title="VIP Memberships | Balanced Wellness Medical Spa Kingsport TN" description="Exclusive VIP membership plans at Balanced Wellness Medical Spa. Gold, Platinum, and Diamond tiers with savings on Botox, fillers, laser treatments, and wellness services in Kingsport & Jonesborough TN." keywords="med spa membership Kingsport TN, VIP membership Jonesborough TN, Botox membership, monthly aesthetic plan, medical spa savings" />
      <div className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-accent/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Exclusive Access</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">VIP Memberships</h1>
          <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
            Join our exclusive wellness membership and enjoy premium savings, priority booking, and complimentary treatments every month.
          </p>
        </div>
      </div>

      <Section className="bg-white">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Choose Your Membership Tier</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">All memberships include a 6-month minimum commitment. Cancel anytime after with 30-day notice.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${tier.color} border border-border hover:shadow-2xl transition-all duration-500 ${tier.popular ? 'ring-2 ring-primary' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 ${tier.iconColor}`}>
                {tier.icon}
              </div>

              <h3 className="text-2xl font-serif font-bold text-foreground mb-1">{tier.name}</h3>
              <div className="mb-3">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-foreground/50">{tier.period}</span>
              </div>

              <div className="mb-5 pb-5 border-b border-border/60">
                <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary mb-1">Best for</p>
                <p className="text-sm font-semibold text-foreground mb-2">{tier.bestFor}</p>
                <p className="text-xs text-foreground/55 italic leading-relaxed">{tier.idealIf}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.benefits.map((b, j) => (
                  <li key={j} className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-foreground/70">{b}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => openBookingChooser({ source: "memberships-tier", intent: tier.name })}
                className={`block w-full text-center py-3 rounded-full font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                Find My Best Membership Tier
              </button>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-3">Compare Tiers</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Side-by-Side Comparison</h2>
            <p className="text-sm text-foreground/60 max-w-2xl mx-auto">Not sure which tier fits? Here's what's included at each level. Or ask us — we'll recommend based on the treatments you actually use.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/40 border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground/70 text-xs uppercase tracking-wider">Feature</th>
                  <th className="text-center p-4 font-serif font-bold text-foreground">Gold</th>
                  <th className="text-center p-4 font-serif font-bold text-foreground bg-primary/5">
                    Platinum
                    <span className="block text-[10px] font-sans font-semibold text-primary uppercase tracking-wider mt-0.5">Most Popular</span>
                  </th>
                  <th className="text-center p-4 font-serif font-bold text-foreground">Diamond</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-background/40" : ""}>
                    <td className="p-4 font-medium text-foreground/80">{row.label}</td>
                    <td className="p-4 text-center text-foreground/70">{row.gold}</td>
                    <td className="p-4 text-center text-foreground/80 bg-primary/5">{row.platinum}</td>
                    <td className="p-4 text-center text-foreground/70">{row.diamond}</td>
                  </tr>
                ))}
                <tr className="border-t border-border">
                  <td className="p-4 font-medium text-foreground/80">Monthly price</td>
                  <td className="p-4 text-center font-serif font-bold text-foreground">$99</td>
                  <td className="p-4 text-center font-serif font-bold text-foreground bg-primary/5">$199</td>
                  <td className="p-4 text-center font-serif font-bold text-foreground">$349</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-foreground/50 mt-4 italic">All memberships include a 6-month minimum commitment. Cancel anytime after with 30-day notice.</p>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => openBookingChooser({ source: "memberships-ask", intent: "membership" })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all text-sm shadow-md shadow-primary/15"
            >
              Ask About Memberships
            </button>
          </div>
        </div>
      </Section>

      <Section className="luxury-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Membership Perks</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left mt-10">
            {[
              { title: "Savings That Add Up", desc: "Members save hundreds per year on their favorite treatments with exclusive discounted pricing." },
              { title: "Priority Scheduling", desc: "Book appointments before non-members and skip the waitlist for popular treatment slots." },
              { title: "Complimentary Treatments", desc: "Enjoy monthly included treatments — from facials and peels to injections and IV therapy." },
              { title: "VIP Events & Previews", desc: "Be the first to experience new treatments, attend exclusive member-only events, and more." },
            ].map((perk, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-border">
                <h3 className="font-bold text-foreground mb-2">{perk.title}</h3>
                <p className="text-sm text-foreground/60">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <CTA
        title="Ready to Join Our VIP Family?"
        subtitle="Contact us to enroll in a membership or schedule a consultation to learn which tier is right for you."
        buttonText="Get Started"
      />
    </PageLayout>
  );
}
