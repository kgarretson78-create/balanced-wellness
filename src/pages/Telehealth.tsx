import { useEffect } from "react";
import { Link } from "wouter";
import { Stethoscope, ShieldCheck, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import { REFILL_PORTAL } from "@/lib/booking";

/**
 * Lightweight Refill.co telehealth landing page.
 *
 * When the portal is configured (VITE_REFILL_PORTAL_URL), this auto-redirects
 * to the Refill.co portal. When it is not configured, it shows a safe
 * "contact us" state instead of guessing a URL.
 */
export default function Telehealth() {
  const enabled = REFILL_PORTAL.enabled;

  useEffect(() => {
    if (enabled && typeof window !== "undefined") {
      window.location.replace(REFILL_PORTAL.url);
    }
  }, [enabled]);

  return (
    <PageLayout>
      <SEO
        title="Online Telehealth Portal | Balanced Wellness Medical Spa"
        description="Access the Balanced Wellness online telehealth portal for eligible telehealth services and refills. Provider review required."
        canonicalPath="/telehealth"
      />
      <Section>
        <div className="max-w-xl mx-auto text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-5">
            <Stethoscope className="w-5 h-5 text-primary" />
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Online Telehealth Portal
          </h1>
          <p className="text-base text-foreground/60 leading-relaxed mb-8">
            Our online telehealth portal supports eligible telehealth services
            and refills. Provider review is required for all requests.
          </p>

          {enabled ? (
            <>
              <a
                href={REFILL_PORTAL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
              >
                Open Telehealth Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="mt-6 text-sm text-foreground/50">
                If the portal didn't open automatically, use the button above.
              </p>
            </>
          ) : (
            <>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
              >
                Contact Us About Telehealth
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="mt-6 text-sm text-foreground/50">
                Our online telehealth portal is being set up. Contact us and our
                team will help you get started.
              </p>
            </>
          )}

          <p className="mt-8 flex items-center justify-center gap-1.5 text-[12px] text-foreground/45">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Secure portal · Provider review required
          </p>
        </div>
      </Section>
    </PageLayout>
  );
}
