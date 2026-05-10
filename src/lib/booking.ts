// Booking configuration for Balanced Wellness Medical Spa.
//
// Each location has its own scheduling URL, phone number, and SMS endpoint.
// Per-location URLs are read from build-time env vars (Vite). If a location
// URL is missing/blank, the chooser falls back to a shared default URL and
// surfaces call/text contact options so users are never stranded if a
// scheduling page has no availability.
//
// Configurable env vars (all optional):
//   VITE_PODIUM_BOOKING_URL_KINGSPORT      — Kingsport scheduling URL
//   VITE_PODIUM_BOOKING_URL_JONESBOROUGH   — Jonesborough scheduling URL
//   VITE_PODIUM_BOOKING_URL                — shared/default scheduling URL
//
// Set these in Railway (or your local .env) when distinct per-location
// Podium calendars are provisioned. Until then, both locations use the
// shared URL but the user's chosen location is captured for follow-up.

const env = (import.meta as any).env || {};

const SHARED_FALLBACK_URL =
  "https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505";

const SHARED_BOOKING_URL: string =
  (env.VITE_PODIUM_BOOKING_URL && String(env.VITE_PODIUM_BOOKING_URL)) ||
  SHARED_FALLBACK_URL;

export type LocationId = "kingsport" | "jonesborough";

export interface BookingLocation {
  id: LocationId;
  name: string;
  shortName: string;
  address: string;
  cityState: string;
  phone: string;
  phoneHref: string;
  smsHref: string;
  bookingUrl: string;
  hasDedicatedBookingUrl: boolean;
}

function pickUrl(perLocation: string | undefined): {
  url: string;
  dedicated: boolean;
} {
  const trimmed = perLocation?.trim();
  if (trimmed) return { url: trimmed, dedicated: true };
  return { url: SHARED_BOOKING_URL, dedicated: false };
}

const kingsport = pickUrl(env.VITE_PODIUM_BOOKING_URL_KINGSPORT);
const jonesborough = pickUrl(env.VITE_PODIUM_BOOKING_URL_JONESBOROUGH);

export const BOOKING_LOCATIONS: BookingLocation[] = [
  {
    id: "kingsport",
    name: "Kingsport",
    shortName: "Kingsport",
    address: "1309 South John B Dennis Hwy, Suite 104",
    cityState: "Kingsport, TN 37660",
    phone: "(423) 765-1393",
    phoneHref: "tel:+14237651393",
    smsHref: "sms:+14237651393",
    bookingUrl: kingsport.url,
    hasDedicatedBookingUrl: kingsport.dedicated,
  },
  {
    id: "jonesborough",
    name: "Jonesborough",
    shortName: "Jonesborough",
    address: "120 South Cherokee St",
    cityState: "Jonesborough, TN 37659",
    phone: "(423) 646-2169",
    phoneHref: "tel:+14236462169",
    smsHref: "sms:+14236462169",
    bookingUrl: jonesborough.url,
    hasDedicatedBookingUrl: jonesborough.dedicated,
  },
];

export function getLocation(id: LocationId): BookingLocation {
  return BOOKING_LOCATIONS.find((l) => l.id === id) ?? BOOKING_LOCATIONS[0];
}

// Stash the user's chosen location so KelliAI / lead forms can include it.
const PREFERRED_LOCATION_KEY = "bw_preferred_location";

export function setPreferredLocation(id: LocationId): void {
  try {
    window.sessionStorage.setItem(PREFERRED_LOCATION_KEY, id);
    window.localStorage.setItem(PREFERRED_LOCATION_KEY, id);
  } catch {
    // storage may be unavailable (private mode); chooser still works
  }
}

export function getPreferredLocation(): LocationId | null {
  try {
    const v =
      window.sessionStorage.getItem(PREFERRED_LOCATION_KEY) ||
      window.localStorage.getItem(PREFERRED_LOCATION_KEY);
    if (v === "kingsport" || v === "jonesborough") return v;
  } catch {
    // ignore
  }
  return null;
}
