import { motion } from "framer-motion";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import {
  Wallet,
  Layers,
  CalendarRange,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { openBookingChooser } from "@/components/BookingChooser";

const providers = [
  {
    name: "Podium Payments",
    desc: "Secure checkout link through our patient portal.",
  },
  { name: "Affirm", desc: "Monthly payment plans with quick eligibility check." },
  { name: "Klarna", desc: "Pay in 4 interest-free installments on eligible treatments." },
  { name: "Afterpay", desc: "Split your purchase into smaller payments over time." },
  { name: "Credit / Debit Card", desc: "Visa, Mastercard, Discover, American Express." },
];

const optionCards = [
  {
    icon: Wallet,
    title: "Pay in Full",
    desc: "Use any major credit or debit card at checkout for the most straightforward option.",
  },
  {
    icon: Layers,
    title: "Split Payments",
    desc: "Divide your treatment into smaller, scheduled installments through providers such as Afterpay and Klarna.",
  },
  {
    icon: CalendarRange,
    title: "Monthly Payment Options",
    desc: "Spread the cost over time with monthly plans through providers such as Affirm. Approval and terms vary.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout Through Podium",
    desc: "Reserve your appointment and complete payment through our trusted Podium portal with encrypted checkout.",
  },
];

const faqs = [
  {
    q: "Can I pay monthly for treatments?",
    a: "Yes. Select services and packages may qualify for monthly payment options through available providers. Approval and terms vary.",
  },
  {
    q: "Do I have to pay before my appointment?",
    a: "Some services may require a deposit or checkout link to reserve. Our team will guide you through the easiest option for your appointment.",
  },
  {
    q: "Can I use flexible payments for injectables, laser, or weight loss?",
    a: "Many treatments and packages may be eligible. Final availability depends on the payment provider and treatment selected. Provider evaluation required.",
  },
  {
    q: "Is this financing?",
    a: "Some options may be installment or monthly payment plans offered by third-party providers. Terms are subject to approval. We do not extend credit directly.",
  },
];

export default function FlexiblePayments() {
  return (
    <PageLayout>
      <SEO
        title="Flexible Payment Options | Balanced Wellness Medical Spa"
        description="Pay in full or split into monthly payments. Balanced Wellness Medical Spa accepts Podium Payments, Affirm, Klarna, Afterpay, and credit/debit cards for treatments in Kingsport & Jonesborough TN."
        keywords="flexible payments med spa, monthly payment Botox, Affirm med spa, Klarna med spa, Afterpay med spa, weight loss financing Kingsport TN"
      />

      <div className="relative h-[44vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/30" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-champagne blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <p className="text-champagne uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Pay Your Way
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            Flexible Payment Options at Balanced Wellness
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light max-w-2xl mx-auto">
            Confidence should feel accessible. Pay in full or choose a flexible payment option that
            fits your life.
          </p>
        </motion.div>
      </div>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground/70 text-base sm:text-lg leading-relaxed">
            At Balanced Wellness Medical Spa, we believe confidence should feel accessible. Patients
            may choose to pay in full or explore flexible payment options through available providers
            including <strong>Podium Payments</strong>, <strong>Affirm</strong>,{" "}
            <strong>Klarna</strong>, <strong>Afterpay</strong>, and card checkout.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => openBookingChooser({ source: "flex-payments-page-top" })}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 shadow-md shadow-primary/15 transition-all text-sm"
            >
              Book Now + Flexible Payments
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-7 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors text-sm"
            >
              View Services
            </Link>
          </div>
          <p className="text-[11px] text-foreground/40 mt-5 italic">
            Payment options subject to approval. Final terms may vary by provider.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Payment Options
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Choose the path that fits your treatment plan and your monthly budget.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {optionCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group rounded-2xl bg-white border border-border p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{c.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Accepted Providers
            </h2>
            <p className="text-foreground/60">
              We work with trusted providers to make beautiful skin and a healthier you within reach.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((p) => (
              <div
                key={p.name}
                className="flex items-start gap-3 rounded-xl bg-secondary/40 border border-border p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="text-sm text-foreground/60 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-foreground/40 mt-6 italic text-center">
            Third-party providers determine eligibility, terms, and approval. Balanced Wellness
            Medical Spa is not a lender.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary uppercase tracking-[0.2em] text-xs font-semibold mb-3">
              FAQ
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl bg-white border border-border p-5"
              >
                <p className="font-semibold text-foreground flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>{f.q}</span>
                </p>
                <p className="text-sm text-foreground/65 mt-2 leading-relaxed pl-6">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-primary to-accent text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Ready to start your treatment plan?
          </h2>
          <p className="text-white/85 text-base sm:text-lg mb-8">
            Book your complimentary consultation. We'll walk you through the easiest payment option
            for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => openBookingChooser({ source: "flex-payments-page-final" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary font-semibold rounded-full hover:bg-champagne transition-colors text-sm shadow-lg"
            >
              Book Now + Flexible Payments
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/70 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              Talk to Our Team
            </Link>
          </div>
          <p className="text-[11px] text-white/60 mt-6 italic">
            Payment options subject to approval. Final terms may vary by provider. Results vary —
            provider evaluation required.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
