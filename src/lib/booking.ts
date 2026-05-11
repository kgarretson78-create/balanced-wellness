/**
 * Central booking configuration.
 *
 * Each location resolves its Podium scheduling URL in this order:
 *   1. Per-location Vite build-time env var (highest priority — set in Railway)
 *   2. Hardcoded per-location default below
 *   3. Shared fallback env var (VITE_PODIUM_BOOKING_URL)
 *
 * Configure these in Railway → Variables (build-time) only if you want to
 * override the defaults baked in here:
 *   VITE_PODIUM_BOOKING_URL_KINGSPORT
 *   VITE_PODIUM_BOOKING_URL_JONESBOROUGH
 *   VITE_PODIUM_BOOKING_URL          (optional shared/fallback URL)
 */

export type LocationId = "kingsport" | "jonesborough";

export interface BookingLocation {
  id: LocationId;
  name: string;
  city: string;
  address: string;
  phone: string;
  tel: string;        // tel: link form
  smsTel: string;     // sms: link form
  bookingUrl: string; // resolved scheduling URL
  hasDedicatedUrl: boolean; // true if a real per-location URL resolved (not the shared fallback)
}

const env = (import.meta as any).env ?? {};

// Per-location Podium booking URL defaults. Each location is a distinct
// Podium tenant/calendar, so these are real, dedicated links — not legacy
// fallbacks. Env vars below can still override them.
const KINGSPORT_DEFAULT_URL =
  "https://booking.podium.com/medspa/01930831-564b-7342-98d8-620e43a707e7";
const JONESBOROUGH_DEFAULT_URL =
  "https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505";

const SHARED_FALLBACK = env.VITE_PODIUM_BOOKING_URL as string | undefined;

const KINGSPORT_URL_RAW = env.VITE_PODIUM_BOOKING_URL_KINGSPORT as
  | string
  | undefined;
const JONESBOROUGH_URL_RAW = env.VITE_PODIUM_BOOKING_URL_JONESBOROUGH as
  | string
  | undefined;

const kingsportResolved =
  KINGSPORT_URL_RAW || KINGSPORT_DEFAULT_URL || SHARED_FALLBACK || "";
const jonesboroughResolved =
  JONESBOROUGH_URL_RAW || JONESBOROUGH_DEFAULT_URL || SHARED_FALLBACK || "";

export const LOCATIONS: Record<LocationId, BookingLocation> = {
  kingsport: {
    id: "kingsport",
    name: "Kingsport",
    city: "Kingsport, TN",
    address: "1309 S John B Dennis Hwy, Suite 104, Kingsport, TN 37660",
    phone: "(423) 765-1393",
    tel: "tel:423-765-1393",
    smsTel: "sms:+14237651393",
    bookingUrl: kingsportResolved,
    hasDedicatedUrl: Boolean(KINGSPORT_URL_RAW || KINGSPORT_DEFAULT_URL),
  },
  jonesborough: {
    id: "jonesborough",
    name: "Jonesborough",
    city: "Jonesborough, TN",
    address: "120 S Cherokee St, Jonesborough, TN 37659",
    phone: "(423) 646-2169",
    tel: "tel:423-646-2169",
    smsTel: "sms:+14236462169",
    bookingUrl: jonesboroughResolved,
    hasDedicatedUrl: Boolean(JONESBOROUGH_URL_RAW || JONESBOROUGH_DEFAULT_URL),
  },
};

export const LOCATION_LIST: BookingLocation[] = [
  LOCATIONS.kingsport,
  LOCATIONS.jonesborough,
];

export function getLocation(id: LocationId): BookingLocation {
  return LOCATIONS[id];
}

/**
 * Persist the user's last-chosen location so we can pre-select it next time
 * and so contact / lead forms can default to it.
 */
const PREFERRED_LOCATION_KEY = "bw.preferredLocation";

export function getPreferredLocation(): LocationId | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(PREFERRED_LOCATION_KEY);
    if (v === "kingsport" || v === "jonesborough") return v;
  } catch {
    /* localStorage may be unavailable */
  }
  return null;
}

export function setPreferredLocation(id: LocationId): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFERRED_LOCATION_KEY, id);
  } catch {
    /* ignore */
  }
}

/**
 * True if at least one location resolves to a real, dedicated Podium URL
 * (either a per-location default baked in here or a per-location env var).
 * When false, every "Book" CTA falls back to a shared URL that may not be
 * a real per-location calendar, so we should be extra clear about the
 * call/text fallback.
 */
export const ANY_DEDICATED_BOOKING_URL =
  LOCATIONS.kingsport.hasDedicatedUrl || LOCATIONS.jonesborough.hasDedicatedUrl;
