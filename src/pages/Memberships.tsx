import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { SEO } from "@/components/SEO";
import { CheckCircle2, Crown, Gem, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const tiers = [
  {
    name: "Gold",
    price: "$99",
    period: "/month",
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
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-foreground/50">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.benefits.map((b, j) => (
                  <li key={j} className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-foreground/70">{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505" target="_blank" rel="noopener noreferrer"
                className={`block text-center py-3 rounded-full font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                Join {tier.name}
              </Link>
            </motion.div>
          ))}
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
