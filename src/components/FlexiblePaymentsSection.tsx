import { motion } from "framer-motion";
import { Link } from "wouter";
import { Wallet, Layers, CalendarRange, ShieldCheck, ArrowRight } from "lucide-react";
import { useBookingChooser } from "@/components/booking/LocationChooser";

const cards = [
  {
    icon: Wallet,
    title: "Pay in Full",
    desc: "Use any major credit or debit card at checkout for the most straightforward path to your treatment.",
  },
  {
    icon: Layers,
    title: "Split Payments",
    desc: "Divide your treatment into smaller, scheduled installments through available providers like Afterpay and Klarna.",
  },
  {
    icon: CalendarRange,
    title: "Monthly Payment Options",
    desc: "Spread the cost over time with monthly plans through providers like Affirm. Approval and terms vary.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout Through Podium",
    desc: "Complete your booking and payment through our trusted Podium portal with encrypted checkout.",
  },
];

export function FlexiblePaymentsSection() {
  const { open: openBookingChooser } = useBookingChooser();
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-champagne blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Flexible Payments
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Glow Now. Pay Over Time.
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/60 text-base sm:text-lg leading-relaxed">
            Balanced Wellness Medical Spa now offers flexible payment options so you can start your
            treatment plan today and choose the payment method that works best for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl bg-white border border-border p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] text-foreground/40 flex-wrap justify-center">
            <span className="font-semibold tracking-wider uppercase">Accepted</span>
            <span className="opacity-60">·</span>
            <span>Podium Payments</span>
            <span className="opacity-60">·</span>
            <span>Affirm</span>
            <span className="opacity-60">·</span>
            <span>Klarna</span>
            <span className="opacity-60">·</span>
            <span>Afterpay</span>
            <span className="opacity-60">·</span>
            <span>Credit / Debit Card</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-[1px] transition-all duration-300 text-sm"
            >
              View Services + Payment Options
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={() => openBookingChooser({ service: "Treatment Plan + Flexible Payments" })}
              className="inline-flex items-center justify-center px-7 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors duration-300 text-sm"
            >
              Book Now + Flexible Payments
            </button>
          </div>

          <p className="text-[11px] text-foreground/40 mt-4 italic text-center max-w-xl">
            Payment options subject to approval. Final terms may vary by provider. Treatment
            eligibility and results vary — consultation required.
          </p>
        </div>
      </div>
    </section>
  );
}
