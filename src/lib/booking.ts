/**
 * Central booking configuration.
 *
 * Each location has its own optional Podium scheduling URL, sourced from
 * Vite build-time env vars. If a location's URL is missing, the fallback
 * URL is used. If the fallback is also missing, the legacy single-tenant
 * Podium URL (which today shows "no availability") is used so links don't
 * 404.
 *
 * Configure these in Railway → Variables (build-time):
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
  bookingUrl: string; // resolved scheduling URL (may be the legacy fallback)
  hasDedicatedUrl: boolean; // true if a per-location env URL is configured
}

const env = (import.meta as any).env ?? {};

// Legacy single-tenant Podium URL (kept as last-resort fallback so links never 404).
const LEGACY_PODIUM_URL =
  "https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505";

const SHARED_FALLBACK: string =
  (env.VITE_PODIUM_BOOKING_URL as string | undefined) || LEGACY_PODIUM_URL;

const KINGSPORT_URL_RAW = env.VITE_PODIUM_BOOKING_URL_KINGSPORT as
  | string
  | undefined;
const JONESBOROUGH_URL_RAW = env.VITE_PODIUM_BOOKING_URL_JONESBOROUGH as
  | string
  | undefined;

export const LOCATIONS: Record<LocationId, BookingLocation> = {
  kingsport: {
    id: "kingsport",
    name: "Kingsport",
    city: "Kingsport, TN",
    address: "1309 S John B Dennis Hwy, Suite 104, Kingsport, TN 37660",
    phone: "(423) 765-1393",
    tel: "tel:423-765-1393",
    smsTel: "sms:+14237651393",
    bookingUrl: KINGSPORT_URL_RAW || SHARED_FALLBACK,
    hasDedicatedUrl: Boolean(KINGSPORT_URL_RAW),
  },
  jonesborough: {
    id: "jonesborough",
    name: "Jonesborough",
    city: "Jonesborough, TN",
    address: "120 S Cherokee St, Jonesborough, TN 37659",
    phone: "(423) 646-2169",
    tel: "tel:423-646-2169",
    smsTel: "sms:+14236462169",
    bookingUrl: JONESBOROUGH_URL_RAW || SHARED_FALLBACK,
    hasDedicatedUrl: Boolean(JONESBOROUGH_URL_RAW),
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
 * True if at least one location has a real, dedicated Podium URL configured.
 * When false, every "Book" CTA sends the user to the same legacy URL that
 * currently has no availability, so we should be extra clear about the
 * call/text fallback.
 */
export const ANY_DEDICATED_BOOKING_URL =
  LOCATIONS.kingsport.hasDedicatedUrl || LOCATIONS.jonesborough.hasDedicatedUrl;
