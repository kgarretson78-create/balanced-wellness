import { useEffect } from "react";
import { Calendar, MapPin, Phone, MessageSquare, ArrowRight, AlertCircle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import {
  ANY_DEDICATED_BOOKING_URL,
  LOCATION_LIST,
  setPreferredLocation,
  type BookingLocation,
} from "@/lib/booking";
import { useBookingChooser } from "@/components/booking/LocationChooser";

export default function Book() {
  const { open } = useBookingChooser();

  // Surface the chooser dialog automatically on this page so clicking
  // "Book Now" anywhere always lands on a location choice — including direct
  // /book visits from old links.
  useEffect(() => {
    open({ service: "your appointment" });
  }, [open]);

  const handleSelect = (loc: BookingLocation) => {
    setPreferredLocation(loc.id);
    window.open(loc.bookingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <PageLayout>
      <SEO
        title="Book an Appointment | Balanced Wellness Medical Spa Kingsport & Jonesborough TN"
        description="Book your appointment at Balanced Wellness Medical Spa. Choose Kingsport or Jonesborough — or call/text us and we'll schedule you the same day."
      />
      <Section>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] uppercase tracking-widest font-semibold mb-4">
            <Calendar className="w-3 h-3" />
            Schedule
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Choose your preferred location
          </h1>
          <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
            We have two convenient locations in Tennessee. Pick the one closest
            to you and we'll open the scheduler. <strong>If no times show, just call or
            text — we'll get you on the books today.</strong>
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-5">
          {LOCATION_LIST.map((loc) => (
            <div
              key={loc.id}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h2 className="text-xl font-serif font-bold text-foreground">{loc.name}</h2>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4 pl-6">
                {loc.address}
              </p>

              <button
                type="button"
                onClick={() => handleSelect(loc)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors mb-2"
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
                  {loc.phone}
                </a>
                <a
                  href={loc.smsTel}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border border-border text-foreground/80 text-[12px] font-medium rounded-full hover:bg-secondary transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-primary" />
                  Text us
                </a>
              </div>
            </div>
          ))}
        </div>

        {!ANY_DEDICATED_BOOKING_URL && (
          <div className="max-w-3xl mx-auto mt-6 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Online scheduling is being updated. If the calendar shows no
              availability, please <strong>call or text</strong> the location
              you'd like to visit and we'll schedule you right away.
            </span>
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
