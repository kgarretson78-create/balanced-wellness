import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, MessageSquare, Calendar, X } from "lucide-react";
import {
  BOOKING_LOCATIONS,
  setPreferredLocation,
  type BookingLocation,
  type LocationId,
} from "@/lib/booking";

const OPEN_EVENT = "bw:open-booking-chooser";

interface OpenDetail {
  source?: string;
  intent?: string;
}

export function openBookingChooser(detail: OpenDetail = {}): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenDetail>(OPEN_EVENT, { detail }));
}

export function bookingChooserHandler(
  detail: OpenDetail = {}
): (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    openBookingChooser(detail);
  };
}

export function BookingChooser() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();

  useEffect(() => {
    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<OpenDetail>;
      setSource(ce.detail?.source);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handlePick = useCallback((loc: BookingLocation) => {
    setPreferredLocation(loc.id as LocationId);
    setOpen(false);
    window.open(loc.bookingUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="bw-booking-chooser-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-full text-foreground/50 hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="px-6 pt-7 pb-5 border-b border-border bg-gradient-to-br from-primary/5 to-champagne/5">
              <h2
                id="bw-booking-chooser-title"
                className="text-xl md:text-2xl font-serif font-bold text-foreground mb-1"
              >
                Choose your preferred location
              </h2>
              <p className="text-sm text-foreground/60">
                Pick the clinic you'd like to book at. If no times appear,
                give us a call or text — we'll get you scheduled.
              </p>
            </div>

            <div className="p-5 space-y-3">
              {BOOKING_LOCATIONS.map((loc) => (
                <LocationCard key={loc.id} loc={loc} onPick={handlePick} />
              ))}
            </div>

            <div className="px-6 pb-6 pt-1 text-center">
              <p className="text-xs text-foreground/50">
                Don't see a time that works? Call or text either location and
                we'll book you personally.
              </p>
              {source && (
                <input type="hidden" data-booking-source={source} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LocationCard({
  loc,
  onPick,
}: {
  loc: BookingLocation;
  onPick: (loc: BookingLocation) => void;
}) {
  return (
    <div className="rounded-xl border border-border p-4 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-serif font-bold text-lg text-foreground">
            {loc.name}
          </h3>
          <p className="text-xs text-foreground/60 mt-0.5 flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
            <span>
              {loc.address}, {loc.cityState}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onPick(loc)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book {loc.shortName}
        </button>
        <a
          href={loc.phoneHref}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-foreground text-sm font-medium rounded-full hover:bg-secondary/80 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
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
