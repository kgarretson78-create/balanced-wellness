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
 * Each category groups one or more Refill.co assessment "options". The patient
 * picks a category on /online-care (or a service page), then chooses the
 * specific assessment that matches their goal; a provider reviews the responses.
 *
 * Adding a new assessment option is a one-line change in ASSESSMENT_DEFAULTS
 * below. Each category's "primary" option can also be overridden at build time
 * with a per-category env var (back-compat with the earlier single-link model):
 *   VITE_REFILL_ASSESSMENT_WEIGHT_LOSS
 *   VITE_REFILL_ASSESSMENT_PEPTIDES
 *   VITE_REFILL_ASSESSMENT_SKINCARE
 *   VITE_REFILL_ASSESSMENT_WOMENS_HEALTH
 *   VITE_REFILL_ASSESSMENT_MENS_HEALTH
 * When set, the env URL is prepended as the category's first option.
 *
 * IMPORTANT: do NOT invent assessment links. A category with no valid option
 * URL safely falls back (to /book-now); the UI handles the missing case.
 */
export type OnlineCareCategoryId =
  | "weight-loss"
  | "peptides"
  | "skincare"
  | "womens-health"
  | "mens-health";

export interface AssessmentOption {
  /** Short, patient-facing label for the assessment. */
  label: string;
  /** One-line plain-language description (branded product names are not self-explanatory). */
  description: string;
  /** Resolved assessment URL. Only options with a valid URL are surfaced. */
  url: string;
}

export interface OnlineCareCategory {
  id: OnlineCareCategoryId;
  /** Short card title, e.g. "Online Weight Loss". */
  title: string;
  /** One-line "who it's for" summary shown on the card. */
  who: string;
  /** Available assessment options for this category (only valid URLs included). */
  options: AssessmentOption[];
  /** Convenience: the first option's URL, or "" when none configured. */
  assessmentUrl: string;
  /** True when at least one valid assessment option is configured. */
  hasAssessment: boolean;
  /** Where the card routes when no assessment option exists yet. */
  fallbackPath: string;
  /** Matching local SEO landing page for this category. */
  learnMorePath: string;
}

const REFILL_BASE =
  "https://balanced-wellness-medical-spa-jonesborough.withrefill.com/assessments";

// Hardcoded assessment options, grouped by category. Only links the practice
// has actually provided appear here — never invent one. Descriptions are
// intentionally plain-language because the branded product/protocol names are
// not self-explanatory to patients.
const ASSESSMENT_DEFAULTS: Record<OnlineCareCategoryId, AssessmentOption[]> = {
  // No weight-loss (GLP-1) assessment has been provided yet — keep empty so the
  // card falls back to booking rather than mapping a non-weight-loss link here.
  "weight-loss": [],
  peptides: [
    {
      label: "Peptide Wellness Therapy — Interest & Goal Assessment",
      description: "General starting point for peptide therapy goals (recovery, sleep, healthy aging).",
      url: `${REFILL_BASE}/e44c3042-4a1c-4ab1-9dd6-7b1cc72bb8f2`,
    },
    {
      label: "CJC-1295 / Ipamorelin — Patient Safety Questionnaire",
      description: "Growth-hormone-support peptide protocol intake and safety screening.",
      url: `${REFILL_BASE}/e06e2dd4-c873-4f3b-ab31-daec189dea0b`,
    },
    {
      label: "AOD-9604 / MOTS-C / Tesamorelin / Ipamorelin — New Patient Assessment",
      description: "Metabolic and recovery peptide protocols — new patient intake.",
      url: `${REFILL_BASE}/827d4504-b1ce-41b3-a520-49fd30a1525a`,
    },
  ],
  skincare: [
    {
      label: "Skin / Face Treatment Goal Assessment",
      description: "Tell us your skin goals so a provider can recommend a plan.",
      url: `${REFILL_BASE}/ec35e47d-1d32-4ea0-9fdb-591e6da04657`,
    },
    {
      label: "GHK-Cu Copper Peptide Cream (Aquabiome+) — New Patient Assessment",
      description: "Topical copper-peptide cream for skin support — new patient intake.",
      url: `${REFILL_BASE}/4295f17a-1ea4-4dac-b270-d3c7abd79cd3`,
    },
    {
      label: "Stella+ — Topical Cream for Postmenopausal Skin Aging",
      description: "Targeted topical for skin changes associated with menopause.",
      url: `${REFILL_BASE}/ba11af67-71d8-4a1b-80ad-9252a63391da`,
    },
    {
      label: "Brilliance — New Patient Assessment",
      description: "Provider-directed skin treatment intake (Brilliance protocol).",
      url: `${REFILL_BASE}/e9da206f-d4ff-4230-a2f7-7ea37e340b84`,
    },
    {
      label: "Hair Revive — Patient Intake",
      description: "Hair support / regrowth treatment intake.",
      url: `${REFILL_BASE}/31258dbc-b5ba-4863-bc3d-cb4e3324ad17`,
    },
    {
      label: "Lock Lux — Patient Intake",
      description: "Targeted hair & skin treatment intake (Lock Lux protocol).",
      url: `${REFILL_BASE}/3531a393-951d-4d5f-9ebb-24a8fcc369a6`,
    },
    {
      label: "Raven — Patient Intake",
      description: "Targeted skin treatment intake (Raven protocol).",
      url: `${REFILL_BASE}/836ce9ee-1e2c-4e6a-aa46-ad2f598d70a0`,
    },
    {
      label: "Willow — Patient Intake",
      description: "Targeted skin treatment intake (Willow protocol).",
      url: `${REFILL_BASE}/14d5a6d1-7071-42de-a928-01879137a9cf`,
    },
    {
      label: "Ivy — Patient Intake",
      description: "Targeted skin treatment intake (Ivy protocol).",
      url: `${REFILL_BASE}/56fd882e-0fe4-47a7-9aa1-4e31e10885d4`,
    },
  ],
  // No dedicated women's hormone assessment provided. Stella+ (postmenopausal
  // skin aging) is cross-linked here as a relevant option; the category still
  // falls back to booking for hormone concerns rather than inventing a link.
  "womens-health": [
    {
      label: "Stella+ — Topical Cream for Postmenopausal Skin Aging",
      description: "Topical for menopause-related skin aging. Hormone care is provider-led — book a consultation for hormone concerns.",
      url: `${REFILL_BASE}/ba11af67-71d8-4a1b-80ad-9252a63391da`,
    },
  ],
  "mens-health": [
    {
      label: "Enclomiphene — New Patient Assessment",
      description: "Men's hormone support intake; a provider determines suitability after review and labs.",
      url: `${REFILL_BASE}/2b172101-3752-4889-817d-cfe179a25472`,
    },
  ],
};

const ASSESSMENT_ENV: Record<OnlineCareCategoryId, string | undefined> = {
  "weight-loss": env.VITE_REFILL_ASSESSMENT_WEIGHT_LOSS as string | undefined,
  peptides: env.VITE_REFILL_ASSESSMENT_PEPTIDES as string | undefined,
  skincare: env.VITE_REFILL_ASSESSMENT_SKINCARE as string | undefined,
  "womens-health": env.VITE_REFILL_ASSESSMENT_WOMENS_HEALTH as string | undefined,
  "mens-health": env.VITE_REFILL_ASSESSMENT_MENS_HEALTH as string | undefined,
};

/**
 * Resolve a category's assessment options: an optional env-provided "primary"
 * link first, then the hardcoded defaults. Only options with a valid http(s)
 * URL are kept, and duplicate URLs are de-duped.
 */
function resolveOptions(id: OnlineCareCategoryId): AssessmentOption[] {
  const out: AssessmentOption[] = [];
  const seen = new Set<string>();

  const fromEnv = (ASSESSMENT_ENV[id] ?? "").trim();
  if (isValidHttpUrl(fromEnv)) {
    out.push({
      label: "Start Online Assessment",
      description: "Provider-reviewed online assessment for this service.",
      url: fromEnv,
    });
    seen.add(fromEnv);
  }

  for (const opt of ASSESSMENT_DEFAULTS[id]) {
    const url = opt.url.trim();
    if (!isValidHttpUrl(url) || seen.has(url)) continue;
    out.push({ ...opt, url });
    seen.add(url);
  }
  return out;
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
    title: "Online Skincare & Topicals",
    who: "For patients who want a provider-guided medical skincare, hair, or topical-treatment plan.",
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
    const options = resolveOptions(id);
    return {
      id,
      title: CATEGORY_META[id].title,
      who: CATEGORY_META[id].who,
      options,
      assessmentUrl: options[0]?.url ?? "",
      hasAssessment: options.length > 0,
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
