import { useEffect, useState } from "react";
import { Calendar, Phone, MessageSquare, MapPin } from "lucide-react";
import {
  BOOKING_LOCATIONS,
  setPreferredLocation,
  type LocationId,
  type BookingLocation,
} from "@/lib/booking";

export default function Book() {
  const [picked, setPicked] = useState<LocationId | null>(null);

  useEffect(() => {
    if (!picked) return;
    const loc = BOOKING_LOCATIONS.find((l) => l.id === picked);
    if (!loc) return;
    setPreferredLocation(picked);
    // Brief delay so users see what they picked before redirecting.
    const t = window.setTimeout(() => {
      window.location.href = loc.bookingUrl;
    }, 250);
    return () => window.clearTimeout(t);
  }, [picked]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <p className="text-champagne uppercase tracking-widest text-xs font-semibold mb-3">
            Book an Appointment
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Choose your preferred location
          </h1>
          <p className="text-sm text-foreground/60">
            Pick the clinic you'd like to book at. If no times appear, give
            us a call or text — we'll get you scheduled.
          </p>
        </div>

        <div className="space-y-3">
          {BOOKING_LOCATIONS.map((loc) => (
            <BookCard
              key={loc.id}
              loc={loc}
              picked={picked === loc.id}
              onPick={() => setPicked(loc.id as LocationId)}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-foreground/50">
          Don't see a time that works? Call or text either location and we'll
          book you personally.
        </p>
      </div>
    </div>
  );
}

function BookCard({
  loc,
  picked,
  onPick,
}: {
  loc: BookingLocation;
  picked: boolean;
  onPick: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:border-primary/40 transition-colors">
      <div className="mb-3">
        <h2 className="font-serif font-bold text-xl text-foreground">
          {loc.name}
        </h2>
        <p className="text-xs text-foreground/60 mt-1 flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
          <span>
            {loc.address}, {loc.cityState}
          </span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onPick}
          disabled={picked}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors disabled:opacity-70"
        >
          <Calendar className="w-3.5 h-3.5" />
          {picked ? "Opening…" : `Book ${loc.shortName}`}
        </button>
        <a
          href={loc.phoneHref}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-foreground text-sm font-medium rounded-full hover:bg-secondary/80 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          {loc.phone}
        </a>
        <a
          href={loc.smsHref}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-foreground text-sm font-medium rounded-full hover:bg-secondary/80 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Text
        </a>
      </div>
    </div>
  );
}
