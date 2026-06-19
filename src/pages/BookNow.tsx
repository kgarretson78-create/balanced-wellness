import { Calendar, MapPin, Phone, MessageSquare, ArrowRight, AlertCircle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import {
  ANY_DEDICATED_BOOKING_URL,
  LOCATION_LIST,
  setPreferredLocation,
  type BookingLocation,
} from "@/lib/booking";
import { TelehealthCard } from "@/components/booking/TelehealthCTA";

/**
 * Social-friendly booking landing page.
 *
 * This is the link to drop in Instagram / Facebook / TikTok bios:
 *   https://www.balancedmedicalspa.com/book-now
 *
 * It shows a clean, mobile-first location chooser that routes each card
 * straight to the correct Podium scheduler, plus an optional online
 * telehealth card when the Refill.co portal is configured.
 */
export default function BookNow() {
  const handleSelect = (loc: BookingLocation) => {
    setPreferredLocation(loc.id);
    // Forward any tracking/UTM query params from the social link to Podium so
    // attribution is preserved end to end.
    let url = loc.bookingUrl;
    if (typeof window !== "undefined" && window.location.search) {
      try {
        const target = new URL(loc.bookingUrl);
        const incoming = new URLSearchParams(window.location.search);
        incoming.forEach((value, key) => {
          if (!target.searchParams.has(key)) target.searchParams.set(key, value);
        });
        url = target.toString();
      } catch {
        /* fall back to the unmodified booking URL */
      }
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <PageLayout>
      <SEO
        title="Book Now | Balanced Wellness Medical Spa Kingsport & Jonesborough TN"
        description="Book your appointment at Balanced Wellness Medical Spa in seconds. Choose Kingsport or Jonesborough and schedule online, or call or text us today."
        canonicalPath="/book-now"
      />
      <section className="py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] uppercase tracking-widest font-semibold mb-4">
              <Calendar className="w-3 h-3" />
              Schedule
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-3 text-balance">
              Book Your Balanced Wellness Appointment
            </h1>
            <p className="text-base text-foreground/60 leading-relaxed">
              Pick the location closest to you and we'll open the scheduler.
              Prefer to talk? Call or text and we'll get you on the books today.
            </p>
          </div>

          <div className="grid gap-4">
            {LOCATION_LIST.map((loc) => (
              <div
                key={loc.id}
                className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h2 className="text-xl font-serif font-bold text-foreground">{loc.name}</h2>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4 pl-6">
                  {loc.address}
                </p>

                <button
                  type="button"
                  onClick={() => handleSelect(loc)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors mb-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book at {loc.name}
                  <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={loc.tel}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border border-border text-foreground/80 text-[12px] font-medium rounded-full hover:bg-secondary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    Call
                  </a>
                  <a
                    href={loc.smsTel}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border border-border text-foreground/80 text-[12px] font-medium rounded-full hover:bg-secondary transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    Text
                  </a>
                </div>
                <p className="mt-2 text-[11px] text-foreground/45 text-center">{loc.phone}</p>
              </div>
            ))}
          </div>

          {!ANY_DEDICATED_BOOKING_URL && (
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Online scheduling is being updated. If the calendar shows no
                availability, please <strong>call or text</strong> the location
                you'd like to visit and we'll schedule you right away.
              </span>
            </div>
          )}

          <div className="mt-4">
            <TelehealthCard />
          </div>

          <p className="mt-6 text-[11px] text-foreground/45 text-center">
            Two convenient locations · Tri-Cities, Tennessee
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
