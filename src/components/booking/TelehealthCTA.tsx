import { Link } from "wouter";
import { Stethoscope, ArrowRight, ShieldCheck } from "lucide-react";
import {
  getOnlineCareCategory,
  type OnlineCareCategoryId,
} from "@/lib/booking";

/**
 * Online care (Refill.co) call-to-action components.
 *
 * The site's online care model is a guided intake: patients pick a category on
 * /online-care and are routed to the matching Refill.co assessment. A provider
 * then reviews their responses.
 *
 * Medical-safe copy only: no diagnosis, no promise of prescriptions or
 * eligibility, no same-day medication. Provider review is always required.
 */

const HUB_DESCRIPTION =
  "Start a quick online assessment for eligible services and refills. A provider reviews every request — no diagnosis or eligibility is guaranteed.";

/**
 * Compact inline band linking to the /online-care hub.
 * Use beneath a service page CTA. Always an internal, always-safe route.
 */
export function TelehealthBand({ className = "" }: { className?: string }) {
  return (
    <div
      className={`max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/40 px-6 py-5 ${className}`}
    >
      <div className="flex items-start gap-3 text-center sm:text-left">
        <Stethoscope className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 hidden sm:block" />
        <div>
          <p className="font-serif font-bold text-foreground">Online Care &amp; Telehealth</p>
          <p className="text-sm text-foreground/60 leading-relaxed">{HUB_DESCRIPTION}</p>
        </div>
      </div>
      <Link href="/online-care" className="flex-shrink-0">
        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-semibold rounded-full border border-primary/30 hover:bg-primary hover:text-white transition-colors">
          Explore Online Care
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </div>
  );
}

/**
 * Full bordered card linking to the /online-care hub.
 * Use on the social booking page.
 */
export function TelehealthCard({ className = "" }: { className?: string }) {
  const cardClass = `group block rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow ${className}`;
  return (
    <Link href="/online-care" className={cardClass}>
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
          <Stethoscope className="w-4 h-4 text-primary" />
        </span>
        <h3 className="text-xl font-serif font-bold text-foreground">
          Online Care &amp; Telehealth
        </h3>
      </div>
      <p className="text-sm text-foreground/60 leading-relaxed mb-4">{HUB_DESCRIPTION}</p>
      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full group-hover:bg-primary/90 transition-colors">
        Explore Online Care
        <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
      </span>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-foreground/45">
        <ShieldCheck className="w-3 h-3 text-primary" />
        Secure assessment · Provider review required
      </p>
    </Link>
  );
}

/**
 * Category-specific assessment button.
 *
 * When the category has a configured assessment URL, this opens it in a new
 * tab. Otherwise it routes to that category's safe fallback (the /book-now
 * chooser) — it never guesses a URL.
 */
export function AssessmentButton({
  categoryId,
  className = "",
  configuredLabel = "Start Online Assessment",
  fallbackLabel = "Book a Consultation",
}: {
  categoryId: OnlineCareCategoryId;
  className?: string;
  configuredLabel?: string;
  fallbackLabel?: string;
}) {
  const category = getOnlineCareCategory(categoryId);
  const base =
    className ||
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all";

  if (category.hasAssessment) {
    return (
      <a href={category.assessmentUrl} target="_blank" rel="noopener noreferrer" className={base}>
        {configuredLabel}
        <ArrowRight className="w-4 h-4" />
      </a>
    );
  }
  return (
    <Link href={category.fallbackPath} className={base}>
      {fallbackLabel}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
