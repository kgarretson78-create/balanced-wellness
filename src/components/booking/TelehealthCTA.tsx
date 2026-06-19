import { Link } from "wouter";
import { Stethoscope, ArrowRight, ShieldCheck } from "lucide-react";
import { REFILL_PORTAL } from "@/lib/booking";

/**
 * Online telehealth (Refill.co) call-to-action.
 *
 * When the portal is configured (VITE_REFILL_PORTAL_URL), this opens the
 * Refill.co portal in a new tab. When it is not configured, it safely routes
 * to /contact rather than guessing a URL.
 *
 * Medical-safe copy only: no promises of prescriptions, eligibility, or
 * same-day medication. Provider review is always required.
 */

const SAFE_DESCRIPTION =
  "Online telehealth portal for eligible telehealth services and refills. Provider review required.";

function destination() {
  return REFILL_PORTAL.enabled ? REFILL_PORTAL.url : REFILL_PORTAL.fallbackPath;
}

/** Full bordered card — use inside a Section on service pages. */
export function TelehealthCard({ className = "" }: { className?: string }) {
  const enabled = REFILL_PORTAL.enabled;
  const ctaLabel = enabled ? "Open Telehealth Portal" : "Contact Us About Telehealth";

  const inner = (
    <>
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
          <Stethoscope className="w-4 h-4 text-primary" />
        </span>
        <h3 className="text-xl font-serif font-bold text-foreground">
          Online Telehealth Portal
        </h3>
      </div>
      <p className="text-sm text-foreground/60 leading-relaxed mb-4">
        {SAFE_DESCRIPTION}
      </p>
      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full group-hover:bg-primary/90 transition-colors">
        {ctaLabel}
        <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
      </span>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-foreground/45">
        <ShieldCheck className="w-3 h-3 text-primary" />
        Secure portal · Provider review required
      </p>
    </>
  );

  const cardClass = `group block rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow ${className}`;

  if (enabled) {
    return (
      <a
        href={destination()}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={destination()} className={cardClass}>
      {inner}
    </Link>
  );
}

/** Compact inline band — use beneath a service page CTA. */
export function TelehealthBand({ className = "" }: { className?: string }) {
  const enabled = REFILL_PORTAL.enabled;
  const ctaLabel = enabled ? "Open Telehealth Portal" : "Contact Us About Telehealth";

  const button = (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-semibold rounded-full border border-primary/30 hover:bg-primary hover:text-white transition-colors">
      {ctaLabel}
      <ArrowRight className="w-3.5 h-3.5" />
    </span>
  );

  return (
    <div
      className={`max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/40 px-6 py-5 ${className}`}
    >
      <div className="flex items-start gap-3 text-center sm:text-left">
        <Stethoscope className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 hidden sm:block" />
        <div>
          <p className="font-serif font-bold text-foreground">Online Telehealth Portal</p>
          <p className="text-sm text-foreground/60 leading-relaxed">{SAFE_DESCRIPTION}</p>
        </div>
      </div>
      {enabled ? (
        <a href={destination()} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
          {button}
        </a>
      ) : (
        <Link href={destination()} className="flex-shrink-0">
          {button}
        </Link>
      )}
    </div>
  );
}
