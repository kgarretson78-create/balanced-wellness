import { Link } from "wouter";
import {
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Scale,
  FlaskConical,
  Sparkles,
  HeartPulse,
  User,
  AlertTriangle,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import {
  ONLINE_CARE_CATEGORIES,
  type OnlineCareCategoryId,
} from "@/lib/booking";

/**
 * Guided online care hub (Refill.co assessments).
 *
 * Lists the categories a patient may want, routes each to its Refill.co
 * assessment when configured, or to a safe /book-now fallback when not.
 * Also reachable via /telehealth and /online-telehealth aliases.
 */

const CATEGORY_ICONS: Record<OnlineCareCategoryId, JSX.Element> = {
  "weight-loss": <Scale className="w-5 h-5 text-primary" />,
  peptides: <FlaskConical className="w-5 h-5 text-primary" />,
  skincare: <Sparkles className="w-5 h-5 text-primary" />,
  "womens-health": <HeartPulse className="w-5 h-5 text-primary" />,
  "mens-health": <User className="w-5 h-5 text-primary" />,
};

export default function OnlineCare() {
  return (
    <PageLayout>
      <SEO
        title="Online Care & Telehealth | Balanced Wellness Medical Spa Kingsport & Jonesborough TN"
        description="Start online care with Balanced Wellness in Kingsport & Jonesborough TN. Choose weight loss, peptides, skincare, women's health, or men's health and complete a quick assessment. Provider review required."
        canonicalPath="/online-care"
      />
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-5 mx-auto">
              <Stethoscope className="w-5 h-5 text-primary" />
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-3 text-balance">
              Online Care &amp; Telehealth
            </h1>
            <p className="text-base text-foreground/60 leading-relaxed">
              Pick what you're interested in and complete a quick online
              assessment. One of our providers reviews every request — there's no
              diagnosis or guarantee of eligibility, and care is always provider-led.
              Trusted by patients in Kingsport and Jonesborough.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ONLINE_CARE_CATEGORIES.map((cat) => {
              const cardInner = (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                      {CATEGORY_ICONS[cat.id]}
                    </span>
                    <h2 className="text-lg font-serif font-bold text-foreground">{cat.title}</h2>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4">{cat.who}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {cat.hasAssessment ? "Start online assessment" : "Book a consultation"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <Link
                    href={cat.learnMorePath}
                    onClick={(e) => e.stopPropagation()}
                    className="block mt-2 text-[12px] text-foreground/45 hover:text-primary transition-colors"
                  >
                    Learn about {cat.title} in Kingsport &amp; Jonesborough →
                  </Link>
                </>
              );

              const cardClass =
                "group block rounded-2xl border border-border bg-white p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all";

              return cat.hasAssessment ? (
                <a
                  key={cat.id}
                  href={cat.assessmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {cardInner}
                </a>
              ) : (
                <Link key={cat.id} href={cat.fallbackPath} className={cardClass}>
                  {cardInner}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Not for emergencies.</strong> If you have a medical
              emergency or urgent symptoms, call 911 or go to the nearest
              emergency room. Online care is not a substitute for emergency
              treatment.
            </span>
          </div>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-[12px] text-foreground/45 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Secure assessments · Provider review required · No prescription guaranteed
          </p>

          <p className="mt-4 text-center text-sm text-foreground/55">
            Prefer to come in?{" "}
            <Link href="/book-now" className="text-primary font-semibold hover:underline">
              Book in person at Kingsport or Jonesborough
            </Link>
            .
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
