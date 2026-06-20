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

/**
 * Refill.co online telehealth portal.
 *
 * The exact Balanced-specific portal URL is configured at build time via
 * Railway → Variables:
 *   VITE_REFILL_PORTAL_URL=<exact Refill.co portal URL>
 *   VITE_REFILL_PORTAL_ENABLED=true   (optional; defaults to enabled when a valid URL is set)
 *
 * IMPORTANT: there is intentionally NO hardcoded portal URL. Until the exact
 * URL is set, `REFILL_PORTAL.enabled` is false and telehealth CTAs route users
 * to /contact instead of sending them to a wrong or guessed site.
 */
const REFILL_URL_RAW = (env.VITE_REFILL_PORTAL_URL as string | undefined)?.trim();
const REFILL_ENABLED_RAW = (env.VITE_REFILL_PORTAL_ENABLED as string | undefined)?.trim();

function isValidHttpUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

const refillUrlValid = isValidHttpUrl(REFILL_URL_RAW);
// An explicit "false" disables the portal even when a URL is present; otherwise
// the presence of a valid URL is what turns the portal on.
const refillEnabled =
  refillUrlValid && REFILL_ENABLED_RAW?.toLowerCase() !== "false";

export interface RefillPortal {
  /** True only when a valid portal URL is configured and not explicitly disabled. */
  enabled: boolean;
  /** The portal URL when enabled, otherwise an empty string. */
  url: string;
  /** Where telehealth CTAs send users when the portal is not configured. */
  fallbackPath: string;
}

export const REFILL_PORTAL: RefillPortal = {
  enabled: refillEnabled,
  url: refillEnabled ? (REFILL_URL_RAW as string) : "",
  fallbackPath: "/contact",
};

/**
 * Online care categories (Refill.co assessments).
 *
 * Each category maps to a Refill.co "interest & goal assessment" link. The
 * patient picks a category on /online-care (or from a service page) and is sent
 * to that assessment; a provider then reviews the responses.
 *
 * Adding a new assessment link is intentionally a one-line change here. Each
 * category resolves its link in this order:
 *   1. Per-category build-time env var (highest priority — set in Railway)
 *   2. Hardcoded default below (only where the exact link is already known)
 *   3. No link → the card safely routes to its fallback (/book-now or /contact)
 *
 * Env vars (build-time, optional):
 *   VITE_REFILL_ASSESSMENT_WEIGHT_LOSS
 *   VITE_REFILL_ASSESSMENT_PEPTIDES
 *   VITE_REFILL_ASSESSMENT_SKINCARE
 *   VITE_REFILL_ASSESSMENT_WOMENS_HEALTH
 *   VITE_REFILL_ASSESSMENT_MENS_HEALTH
 *
 * IMPORTANT: do NOT invent assessment links. Leave a category's default empty
 * until the real link is provided; the UI handles the missing case safely.
 */
export type OnlineCareCategoryId =
  | "weight-loss"
  | "peptides"
  | "skincare"
  | "womens-health"
  | "mens-health";

export interface OnlineCareCategory {
  id: OnlineCareCategoryId;
  /** Short card title, e.g. "Online Weight Loss". */
  title: string;
  /** One-line "who it's for" summary shown on the card. */
  who: string;
  /** Resolved assessment URL ("" when not yet configured). */
  assessmentUrl: string;
  /** True when a valid assessment URL is configured. */
  hasAssessment: boolean;
  /** Where the card routes when no assessment link exists yet. */
  fallbackPath: string;
  /** Matching local SEO landing page for this category. */
  learnMorePath: string;
}

// Hardcoded assessment defaults. Only fill in links the practice has actually
// provided — leave the rest empty so the UI falls back safely.
const ASSESSMENT_DEFAULTS: Record<OnlineCareCategoryId, string> = {
  "weight-loss": "",
  // Peptide Wellness Therapy Interest & Goal Assessment (provided by practice):
  peptides:
    "https://balanced-wellness-medical-spa-jonesborough.withrefill.com/assessments/e44c3042-4a1c-4ab1-9dd6-7b1cc72bb8f2",
  skincare: "",
  "womens-health": "",
  "mens-health": "",
};

const ASSESSMENT_ENV: Record<OnlineCareCategoryId, string | undefined> = {
  "weight-loss": env.VITE_REFILL_ASSESSMENT_WEIGHT_LOSS as string | undefined,
  peptides: env.VITE_REFILL_ASSESSMENT_PEPTIDES as string | undefined,
  skincare: env.VITE_REFILL_ASSESSMENT_SKINCARE as string | undefined,
  "womens-health": env.VITE_REFILL_ASSESSMENT_WOMENS_HEALTH as string | undefined,
  "mens-health": env.VITE_REFILL_ASSESSMENT_MENS_HEALTH as string | undefined,
};

function resolveAssessment(id: OnlineCareCategoryId): string {
  const fromEnv = (ASSESSMENT_ENV[id] ?? "").trim();
  if (isValidHttpUrl(fromEnv)) return fromEnv;
  const fromDefault = (ASSESSMENT_DEFAULTS[id] ?? "").trim();
  if (isValidHttpUrl(fromDefault)) return fromDefault;
  return "";
}

const CATEGORY_META: Record<
  OnlineCareCategoryId,
  { title: string; who: string; learnMorePath: string }
> = {
  "weight-loss": {
    title: "Online Weight Loss",
    who: "For adults exploring medically supervised weight loss, including GLP-1 options, from home.",
    learnMorePath: "/online-weight-loss-kingsport-tn",
  },
  peptides: {
    title: "Peptide Therapy",
    who: "For those interested in peptides for recovery, sleep, and healthy aging.",
    learnMorePath: "/peptide-therapy-kingsport-tn",
  },
  skincare: {
    title: "Online Skincare",
    who: "For patients who want a provider-guided medical skincare plan and prescription-grade products.",
    learnMorePath: "/online-skincare-kingsport-tn",
  },
  "womens-health": {
    title: "Women's Health",
    who: "For women exploring hormone balance, wellness, and women's health concerns.",
    learnMorePath: "/womens-health-kingsport-tn",
  },
  "mens-health": {
    title: "Men's Health",
    who: "For men exploring hormone optimization, vitality, and men's health concerns.",
    learnMorePath: "/mens-health-kingsport-tn",
  },
};

const ONLINE_CARE_ORDER: OnlineCareCategoryId[] = [
  "weight-loss",
  "peptides",
  "skincare",
  "womens-health",
  "mens-health",
];

export const ONLINE_CARE_CATEGORIES: OnlineCareCategory[] = ONLINE_CARE_ORDER.map(
  (id) => {
    const assessmentUrl = resolveAssessment(id);
    return {
      id,
      title: CATEGORY_META[id].title,
      who: CATEGORY_META[id].who,
      assessmentUrl,
      hasAssessment: Boolean(assessmentUrl),
      // When there's no assessment yet, send people to the social booking
      // chooser so they can still schedule in-person.
      fallbackPath: "/book-now",
      learnMorePath: CATEGORY_META[id].learnMorePath,
    };
  },
);

export function getOnlineCareCategory(
  id: OnlineCareCategoryId,
): OnlineCareCategory {
  return ONLINE_CARE_CATEGORIES.find((c) => c.id === id) ?? ONLINE_CARE_CATEGORIES[0];
}
