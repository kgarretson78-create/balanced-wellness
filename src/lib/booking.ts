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
 *
 * Each option is tagged primary | secondary. The /online-care hub shows only
 * "primary" (broad goal) assessments to stay simple; category pages also show
 * the "secondary" medication/product-specific drill-downs.
 */
export type OnlineCareCategoryId =
  | "weight-loss"
  | "peptides"
  | "skincare"
  | "womens-health"
  | "mens-health";

/**
 * "primary"   = broad goal/intake assessment shown as the headline CTA(s).
 *               The /online-care hub surfaces only these so the hub stays simple.
 * "secondary" = medication- or product-specific drill-down, shown on the
 *               category page under "Already know what you need?".
 */
export type AssessmentTier = "primary" | "secondary";

export interface AssessmentOption {
  /** Short, patient-facing label for the assessment. */
  label: string;
  /** One-line plain-language description (branded product names are not self-explanatory). */
  description: string;
  /** Resolved assessment URL. Only options with a valid URL are surfaced. */
  url: string;
  /** Display priority. Defaults to "secondary" when omitted. */
  tier?: AssessmentTier;
}

export interface OnlineCareCategory {
  id: OnlineCareCategoryId;
  /** Short card title, e.g. "Online Weight Loss". */
  title: string;
  /** One-line "who it's for" summary shown on the card. */
  who: string;
  /** Available assessment options for this category (only valid URLs included), primary first. */
  options: AssessmentOption[];
  /** Broad "start here" goal/intake assessments — surfaced on the hub. */
  primaryOptions: AssessmentOption[];
  /** Medication/product-specific drill-down options — shown on the category page. */
  secondaryOptions: AssessmentOption[];
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
// Hardcoded assessment catalog, grouped by category and tagged primary vs
// secondary. "primary" = broad goal/intake assessments shown on the hub;
// "secondary" = medication/product-specific drill-downs shown on the category
// page. Deduped by normalized label and URL — where the practice provided two
// links for the same thing, the newest/clearest one is kept. Descriptions are
// plain-language because branded product/protocol names are not self-explanatory.
const ASSESSMENT_DEFAULTS: Record<OnlineCareCategoryId, AssessmentOption[]> = {
  "weight-loss": [
    {
      label: "Weight Loss — Goal Assessment",
      description: "Start here: tell us your weight-loss goals and history so a provider can recommend a plan.",
      url: `${REFILL_BASE}/b9276e52-efbb-40fa-b1f9-d8a5f724bc07`,
      tier: "primary",
    },
    {
      label: "Comprehensive GLP-1 Weight Loss Assessment",
      description: "In-depth intake for GLP-1-based weight loss; a provider determines if it's appropriate.",
      url: `${REFILL_BASE}/0021425e-ba45-4674-8ee9-f4a7b73d724e`,
      tier: "primary",
    },
    {
      label: "Semaglutide Injection — New Patient Assessment",
      description: "For patients specifically interested in semaglutide. Eligibility is determined after provider review.",
      url: `${REFILL_BASE}/66b24407-cfd2-4fe6-85f8-95e10e6006a7`,
      tier: "secondary",
    },
    {
      label: "Tirzepatide Injection — New Patient Assessment",
      description: "For patients specifically interested in tirzepatide. Eligibility is determined after provider review.",
      url: `${REFILL_BASE}/fbaacc91-239f-4301-8819-9005423e8222`,
      tier: "secondary",
    },
    {
      label: "Retatrutide Injection — New Patient Assessment",
      description: "For patients asking about retatrutide; a provider determines suitability after review.",
      url: `${REFILL_BASE}/86bb771b-b4a3-4f5e-bd4b-0d3bdb19fda6`,
      tier: "secondary",
    },
    {
      label: "Lipotropic Injection — New Patient Assessment",
      description: "Lipotropic (fat-metabolism support) injection intake.",
      url: `${REFILL_BASE}/d4f0e01a-a22d-4b58-b86e-a6a4f729e47d`,
      tier: "secondary",
    },
  ],
  peptides: [
    {
      label: "Peptide Interest & Goal Assessment",
      description: "Start here: a general intake for peptide therapy goals (recovery, sleep, healthy aging).",
      url: `${REFILL_BASE}/a60731eb-995c-4a1c-b1f0-097abb299079`,
      tier: "primary",
    },
    {
      label: "CJC-1295 / Ipamorelin — Patient Safety Questionnaire",
      description: "Growth-hormone-support peptide protocol intake and safety screening.",
      url: `${REFILL_BASE}/79fe2e67-16f1-443d-b676-b56342fe8998`,
      tier: "secondary",
    },
    {
      label: "AOD-9604 / MOTS-C / Tesamorelin / Ipamorelin — New Patient Assessment",
      description: "Metabolic and recovery peptide protocols — new patient intake.",
      url: `${REFILL_BASE}/5df30846-35f7-4450-bfe7-b7f3887b82dc`,
      tier: "secondary",
    },
    {
      label: "MOTS-c — New Patient Assessment",
      description: "Mitochondrial-support peptide intake.",
      url: `${REFILL_BASE}/e90a9f4c-9ff0-44f6-a7c6-55ce2153eb6d`,
      tier: "secondary",
    },
    {
      label: "Tesamorelin — New Patient Assessment",
      description: "Growth-hormone-releasing peptide intake.",
      url: `${REFILL_BASE}/dddc7898-e731-4213-8ccc-abc0b111e83d`,
      tier: "secondary",
    },
    {
      label: "Sermorelin Injection Therapy — Patient Safety Assessment",
      description: "Growth-hormone-support peptide intake and safety screening.",
      url: `${REFILL_BASE}/72047794-fba0-436f-bfae-a969dc0b3eee`,
      tier: "secondary",
    },
    {
      label: "BPC-157 Injection — Patient Safety Assessment",
      description: "Recovery-support peptide (injection) intake and safety screening.",
      url: `${REFILL_BASE}/4ef08856-8a03-4733-a8dd-3a1395da67ae`,
      tier: "secondary",
    },
    {
      label: "BPC-157 Oral — Patient Safety Questionnaire",
      description: "Recovery-support peptide (oral) intake and safety screening.",
      url: `${REFILL_BASE}/4ed089c9-617d-4616-8037-db261cca741b`,
      tier: "secondary",
    },
    {
      label: "TB-500 — New Patient Assessment",
      description: "Recovery / tissue-repair peptide intake.",
      url: `${REFILL_BASE}/3d05ee27-1454-486a-ad54-dc1b1f3e8dea`,
      tier: "secondary",
    },
    {
      label: "Wolverine Blend (BPC-157 / TB-500) — New Patient Assessment",
      description: "Combined recovery peptide blend intake.",
      url: `${REFILL_BASE}/319ebc37-4c5a-4c4d-b8e5-75694ef676a2`,
      tier: "secondary",
    },
    {
      label: "NAD+ Injections — New Patient Assessment",
      description: "Cellular-energy / NAD+ injection intake.",
      url: `${REFILL_BASE}/23c7dfcc-0b96-4f6b-b0c1-3c5b34e81913`,
      tier: "secondary",
    },
    {
      label: "Glutathione — New Patient Assessment",
      description: "Antioxidant-support (glutathione) intake.",
      url: `${REFILL_BASE}/4861281b-9c2f-4c07-87be-01791f1a6654`,
      tier: "secondary",
    },
    {
      label: "Semax & Selank — New Patient Assessment",
      description: "Cognitive- and mood-support peptide intake.",
      url: `${REFILL_BASE}/b79b37fc-7677-469c-94d2-cf29474247ba`,
      tier: "secondary",
    },
    {
      label: "Kisspeptin — New Patient Assessment",
      description: "Hormone-axis-support peptide intake; a provider determines suitability.",
      url: `${REFILL_BASE}/e608bf63-22ef-417e-a64a-feb943508c29`,
      tier: "secondary",
    },
    {
      label: "Epithalon — New Patient Assessment",
      description: "Healthy-aging peptide intake.",
      url: `${REFILL_BASE}/5ba47bf9-2a4e-42fd-bd1b-b5649af96fb3`,
      tier: "secondary",
    },
    {
      label: "Dihexa — New Patient Assessment",
      description: "Cognitive-support peptide intake.",
      url: `${REFILL_BASE}/82202e5e-dd0d-472c-9ed7-fef7b584af28`,
      tier: "secondary",
    },
    {
      label: "SLU-PP-332 — New Patient Assessment",
      description: "Metabolic-support compound intake.",
      url: `${REFILL_BASE}/947425bf-7fcb-4db1-8c23-5893f9b154f3`,
      tier: "secondary",
    },
    {
      label: "Elamipretide (SS-31) — New Patient Assessment",
      description: "Mitochondrial-support peptide intake.",
      url: `${REFILL_BASE}/dfbbff5e-0adf-4311-a2b1-9da92b60b0af`,
      tier: "secondary",
    },
    {
      label: "KLOW Blend — Patient Safety Questionnaire",
      description: "Combined skin & recovery peptide blend intake and safety screening.",
      url: `${REFILL_BASE}/6130f263-a036-4db7-9f2a-c1be124cb916`,
      tier: "secondary",
    },
    {
      label: "Glow Blend Injection (GHK-Cu / BPC-157 / TB-500) — New Patient Assessment",
      description: "Combined skin & recovery injectable blend intake.",
      url: `${REFILL_BASE}/3bc17099-da30-4deb-a052-a8cc579266c8`,
      tier: "secondary",
    },
    {
      label: "GHK-Cu Copper Peptide Injection — New Patient Assessment",
      description: "Injectable copper-peptide intake for skin and recovery support.",
      url: `${REFILL_BASE}/1c892cb1-4036-4240-a555-00b2bb0e5c6e`,
      tier: "secondary",
    },
    {
      label: "Peptide Life (Benjamin Button Stack — GLOW + Reta)",
      description: "A combined longevity-focused peptide stack; a provider reviews suitability.",
      url: `${REFILL_BASE}/5e8dc2ab-5ca9-4982-a87d-cfaa86e25d9b`,
      tier: "secondary",
    },
  ],
  skincare: [
    {
      label: "Hair & Skin Treatment Goal Assessment",
      description: "Start here: share your hair and skin goals so a provider can recommend a plan.",
      url: `${REFILL_BASE}/456cfb1e-940b-4b87-8ab4-b47b6d648e99`,
      tier: "primary",
    },
    {
      label: "Skin / Face Treatment Goal Assessment",
      description: "Start here for skin and facial concerns; a provider recommends a tailored plan.",
      url: `${REFILL_BASE}/ec35e47d-1d32-4ea0-9fdb-591e6da04657`,
      tier: "primary",
    },
    {
      label: "GHK-Cu Copper Peptide Cream (Aquabiome+) — New Patient Assessment",
      description: "Topical copper-peptide cream for skin support — new patient intake.",
      url: `${REFILL_BASE}/c53f45d9-4ebe-450d-b511-d155f818cd88`,
      tier: "secondary",
    },
    {
      label: "Glow Blend / Stella+ / Vitality (Topical) — New Patient Assessment",
      description: "Topical skin-rejuvenation blend intake.",
      url: `${REFILL_BASE}/864e3542-17bb-478f-8b3e-a73ad7cc94c0`,
      tier: "secondary",
    },
    {
      label: "Stella+ — Topical Cream for Postmenopausal Skin Aging",
      description: "Targeted topical for skin changes associated with menopause.",
      url: `${REFILL_BASE}/ba11af67-71d8-4a1b-80ad-9252a63391da`,
      tier: "secondary",
    },
    {
      label: "Oral GHK-Cu (Copper Peptide) — Patient Assessment",
      description: "Oral copper-peptide intake for skin and hair support.",
      url: `${REFILL_BASE}/7029cd63-e215-4b4f-838f-4632858ac147`,
      tier: "secondary",
    },
    {
      label: "GHK-Cu (Copper Peptide) — Safety & Intake Assessment",
      description: "Copper-peptide intake and safety screening.",
      url: `${REFILL_BASE}/870e5fae-f3fb-412f-b60e-6fefffa5215d`,
      tier: "secondary",
    },
    {
      label: "Brilliance — New Patient Assessment",
      description: "Provider-directed skin treatment intake (Brilliance protocol).",
      url: `${REFILL_BASE}/e9da206f-d4ff-4230-a2f7-7ea37e340b84`,
      tier: "secondary",
    },
    {
      label: "Cedar Oral Hair Tablet — New Patient Assessment",
      description: "Oral hair-support tablet intake.",
      url: `${REFILL_BASE}/49cceafc-bb29-413e-a5da-921fa8b1bdb6`,
      tier: "secondary",
    },
    {
      label: "Hair Force One (Oral Vitamin) — New Patient Assessment",
      description: "Oral hair-support vitamin intake.",
      url: `${REFILL_BASE}/33a295fd-3b40-41b3-aaea-ad6c6fdeeadf`,
      tier: "secondary",
    },
    {
      label: "Cashmere — New Patient Assessment",
      description: "Targeted skin treatment intake (Cashmere protocol).",
      url: `${REFILL_BASE}/55306613-7153-4b56-b27c-3948fa73b00e`,
      tier: "secondary",
    },
    {
      label: "Hair Revive — Patient Intake",
      description: "Hair support / regrowth treatment intake.",
      url: `${REFILL_BASE}/31258dbc-b5ba-4863-bc3d-cb4e3324ad17`,
      tier: "secondary",
    },
    {
      label: "Lock Lux — Patient Intake",
      description: "Targeted hair & skin treatment intake (Lock Lux protocol).",
      url: `${REFILL_BASE}/3531a393-951d-4d5f-9ebb-24a8fcc369a6`,
      tier: "secondary",
    },
    {
      label: "Raven — Patient Intake",
      description: "Targeted skin treatment intake (Raven protocol).",
      url: `${REFILL_BASE}/836ce9ee-1e2c-4e6a-aa46-ad2f598d70a0`,
      tier: "secondary",
    },
    {
      label: "Willow — Patient Intake",
      description: "Targeted skin treatment intake (Willow protocol).",
      url: `${REFILL_BASE}/14d5a6d1-7071-42de-a928-01879137a9cf`,
      tier: "secondary",
    },
    {
      label: "Ivy — Patient Intake",
      description: "Targeted skin treatment intake (Ivy protocol).",
      url: `${REFILL_BASE}/56fd882e-0fe4-47a7-9aa1-4e31e10885d4`,
      tier: "secondary",
    },
  ],
  // No dedicated women's hormone assessment provided. Vitality Plus is offered
  // as a general wellness intake (not hormone therapy), and Stella+ is the
  // relevant topical. Hormone concerns still route to a provider consultation.
  "womens-health": [
    {
      label: "Vitality Plus — Patient Intake Assessment",
      description: "General wellness and vitality intake. Not a hormone-therapy assessment — a provider guides hormone care after review.",
      url: `${REFILL_BASE}/e24b289d-8916-4457-bfd2-a415065ef764`,
      tier: "primary",
    },
    {
      label: "Stella+ — Topical Cream for Postmenopausal Skin Aging",
      description: "Topical for menopause-related skin aging. Hormone care is provider-led — book a consultation for hormone concerns.",
      url: `${REFILL_BASE}/ba11af67-71d8-4a1b-80ad-9252a63391da`,
      tier: "secondary",
    },
  ],
  "mens-health": [
    {
      label: "Enclomiphene — New Patient Assessment",
      description: "Men's hormone support intake; a provider determines suitability after review and labs.",
      url: `${REFILL_BASE}/2b172101-3752-4889-817d-cfe179a25472`,
      tier: "primary",
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
      tier: "primary",
    });
    seen.add(fromEnv);
  }

  for (const opt of ASSESSMENT_DEFAULTS[id]) {
    const url = opt.url.trim();
    if (!isValidHttpUrl(url) || seen.has(url)) continue;
    out.push({ ...opt, url, tier: opt.tier ?? "secondary" });
    seen.add(url);
  }

  // Primary options first (stable within their group) so the UI can show the
  // "start here" assessments before medication/product-specific drill-downs.
  return out
    .map((opt, i) => ({ opt, i }))
    .sort((a, b) => {
      const at = a.opt.tier === "primary" ? 0 : 1;
      const bt = b.opt.tier === "primary" ? 0 : 1;
      return at - bt || a.i - b.i;
    })
    .map(({ opt }) => opt);
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
    const primaryOptions = options.filter((o) => o.tier === "primary");
    const secondaryOptions = options.filter((o) => o.tier !== "primary");
    return {
      id,
      title: CATEGORY_META[id].title,
      who: CATEGORY_META[id].who,
      options,
      primaryOptions,
      secondaryOptions,
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
