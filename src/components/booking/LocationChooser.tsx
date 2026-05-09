import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Calendar, MapPin, Phone, MessageSquare, ArrowRight, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ANY_DEDICATED_BOOKING_URL,
  LOCATION_LIST,
  type BookingLocation,
  type LocationId,
  getPreferredLocation,
  setPreferredLocation,
} from "@/lib/booking";

interface OpenOptions {
  /** Service or treatment name to surface in the prompt (e.g. "Botox"). */
  service?: string;
  /** When true, save the choice as the user's preferred location. */
  remember?: boolean;
}

interface BookingChooserContextValue {
  open: (opts?: OpenOptions) => void;
}

const BookingChooserContext = createContext<BookingChooserContextValue | null>(null);

export function useBookingChooser(): BookingChooserContextValue {
  const ctx = useContext(BookingChooserContext);
  if (!ctx) {
    // Allow component trees without the provider to no-op rather than throw,
    // so isolated tests / storybook-style rendering doesn't break.
    return {
      open: () => {
        // eslint-disable-next-line no-console
        console.warn("BookingChooserProvider missing — booking chooser unavailable");
      },
    };
  }
  return ctx;
}

export function BookingChooserProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<string | undefined>(undefined);
  const [remember, setRemember] = useState(true);

  const open = useCallback((opts?: OpenOptions) => {
    setService(opts?.service);
    setRemember(opts?.remember ?? true);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  const handleSelect = (loc: BookingLocation) => {
    if (remember) setPreferredLocation(loc.id);
    setIsOpen(false);
    // Open the scheduler in a new tab so users can return to the site.
    window.open(loc.bookingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <BookingChooserContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-primary/8 via-white to-white p-6 sm:p-7">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-[11px] uppercase tracking-widest text-primary font-semibold">
                  {service ? `Book ${service}` : "Book your appointment"}
                </span>
              </div>
              <DialogTitle className="text-2xl font-serif font-bold text-foreground">
                Choose your preferred location
              </DialogTitle>
              <DialogDescription className="text-sm text-foreground/60">
                We'll open the scheduler for the location you pick. If no times
                show, just call or text us — we'll get you on the books today.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 grid gap-3">
              {LOCATION_LIST.map((loc) => (
                <LocationCard key={loc.id} location={loc} onSelect={handleSelect} />
              ))}
            </div>

            {!ANY_DEDICATED_BOOKING_URL && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-[12px] text-amber-900">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>
                  Online scheduling is being updated. If the calendar shows no
                  availability, please <strong>call or text</strong> — we'll
                  schedule you right away.
                </span>
              </div>
            )}

            <p className="mt-4 text-[11px] text-foreground/45 text-center">
              Two convenient locations · Tri-Cities, Tennessee
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </BookingChooserContext.Provider>
  );
}

function LocationCard({
  location,
  onSelect,
}: {
  location: BookingLocation;
  onSelect: (loc: BookingLocation) => void;
}) {
  const isPreferred = getPreferredLocation() === location.id;
  return (
    <div
      className={`group rounded-xl border ${
        isPreferred ? "border-primary/40 bg-primary/[0.03]" : "border-border bg-white"
      } p-4 transition-colors`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <h3 className="font-serif font-bold text-foreground text-base">
              {location.name}
              {isPreferred && (
                <span className="ml-2 align-middle inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-primary/10 text-primary font-semibold">
                  Last chosen
                </span>
              )}
            </h3>
          </div>
          <p className="text-[12px] text-foreground/55 leading-relaxed pl-5">
            {location.address}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => onSelect(location)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-[13px] font-semibold rounded-full hover:bg-primary/90 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book at {location.name}
          <ArrowRight className="w-3.5 h-3.5 opacity-80" />
        </button>
        <a
          href={location.tel}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border border-border text-foreground/80 text-[12px] font-medium rounded-full hover:bg-secondary transition-colors"
          title={`Call ${location.name}`}
        >
          <Phone className="w-3.5 h-3.5 text-primary" />
          Call
        </a>
        <a
          href={location.smsTel}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border border-border text-foreground/80 text-[12px] font-medium rounded-full hover:bg-secondary transition-colors"
          title={`Text ${location.name}`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          Text
        </a>
      </div>
      <p className="mt-2 text-[11px] text-foreground/45 pl-1">
        {location.phone}
      </p>
    </div>
  );
}

/**
 * Drop-in replacement for an `<a href="podium-url">` button.
 * Renders as a styled button that opens the LocationChooser on click.
 */
export function BookButton({
  className,
  children,
  service,
}: {
  className?: string;
  children: React.ReactNode;
  service?: string;
}) {
  const { open } = useBookingChooser();
  return (
    <button
      type="button"
      onClick={() => open({ service })}
      className={className}
    >
      {children}
    </button>
  );
}
