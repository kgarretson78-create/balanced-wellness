/**
 * Website 3.0 — shared, data-driven content model.
 *
 * Single source of truth for the concern-first browsing experience, signature
 * treatments, providers, and trust signals surfaced on the homepage (and
 * reusable by future pages). Every `href` points at a route that already
 * exists in src/App.tsx so nothing here can create a 404.
 *
 * Icons are stored as lucide component references so consumers can render them
 * directly (`<concern.icon />`) without a lookup table.
 */
import type { LucideIcon } from "lucide-react";
import {
  Scale,
  Sparkles,
  Waves,
  Droplets,
  Dna,
  Activity,
  User,
  Users,
  Syringe,
  Sun,
  Wind,
  Flame,
  Scissors,
  HeartPulse,
  Zap,
  Stethoscope,
} from "lucide-react";

export interface Concern {
  /** Short, patient-facing label (e.g. "Lose Weight"). */
  label: string;
  /** One-line reassurance / positioning copy. */
  blurb: string;
  /** Existing route this concern routes to. */
  href: string;
  icon: LucideIcon;
}

/**
 * Primary "What brings you here today?" entry points — the dominant
 * organizing principle of the homepage. Ten broad goals, each mapped to an
 * existing destination page.
 */
export const PRIMARY_CONCERNS: Concern[] = [
  { label: "Lose Weight", blurb: "Physician-guided GLP-1 & metabolic programs", href: "/medical-weight-loss-kingsport-tn", icon: Scale },
  { label: "Wrinkles", blurb: "Botox, Dysport & Daxxify, refined and natural", href: "/botox-kingsport-tn", icon: Sparkles },
  { label: "Acne", blurb: "Clear, calm skin with medical-grade care", href: "/rf-microneedling-kingsport-tn", icon: Waves },
  { label: "Skin Tightening", blurb: "Lift and firm without surgery", href: "/skin-tightening-kingsport-tn", icon: Activity },
  { label: "Hair Loss", blurb: "Provider-directed regrowth protocols", href: "/online-skincare-kingsport-tn", icon: Wind },
  { label: "Hormones", blurb: "Bioidentical optimization for how you feel", href: "/hormone-therapy-kingsport-tn", icon: Dna },
  { label: "Men's Wellness", blurb: "Energy, vitality & performance, discreetly", href: "/mens-health-kingsport-tn", icon: User },
  { label: "Women's Wellness", blurb: "Balance, longevity & confidence", href: "/womens-health-kingsport-tn", icon: Users },
  { label: "IV Therapy", blurb: "Hydration, recovery & energy on demand", href: "/iv-lounge-kingsport-tn", icon: Droplets },
  { label: "Facial Rejuvenation", blurb: "Laser resurfacing for luminous skin", href: "/laser-skin-rejuvenation-kingsport-tn", icon: Sun },
];

/**
 * "Browse by concern" taxonomy — a broader, more specific set of concerns for
 * visitors who already know what's bothering them. Each maps to the most
 * relevant existing treatment/landing page.
 */
export const BROWSE_CONCERNS: Concern[] = [
  { label: "Wrinkles", blurb: "Neuromodulators", href: "/botox-kingsport-tn", icon: Sparkles },
  { label: "Acne", blurb: "Skin renewal", href: "/rf-microneedling-kingsport-tn", icon: Waves },
  { label: "Acne Scars", blurb: "RF microneedling", href: "/rf-microneedling-kingsport-tn", icon: Waves },
  { label: "Rosacea", blurb: "Laser therapy", href: "/laser-skin-rejuvenation-kingsport-tn", icon: Flame },
  { label: "Pigmentation", blurb: "Laser & IPL", href: "/laser-skin-rejuvenation-kingsport-tn", icon: Sun },
  { label: "Loose Skin", blurb: "Skin tightening", href: "/skin-tightening-kingsport-tn", icon: Activity },
  { label: "Double Chin", blurb: "Contouring", href: "/skin-tightening-kingsport-tn", icon: Scissors },
  { label: "Weight Loss", blurb: "Medical programs", href: "/medical-weight-loss-kingsport-tn", icon: Scale },
  { label: "Hormone Imbalance", blurb: "BHRT", href: "/hormone-therapy-kingsport-tn", icon: Dna },
  { label: "Hair Loss", blurb: "Regrowth Rx", href: "/online-skincare-kingsport-tn", icon: Wind },
  { label: "Sexual Wellness", blurb: "Men's & women's", href: "/mens-health-kingsport-tn", icon: HeartPulse },
  { label: "Hyperhidrosis", blurb: "Sweat reduction", href: "/botox-kingsport-tn", icon: Droplets },
  { label: "Sun Damage", blurb: "Resurfacing", href: "/laser-skin-rejuvenation-kingsport-tn", icon: Sun },
  { label: "Cellulite", blurb: "Body smoothing", href: "/skin-tightening-kingsport-tn", icon: Activity },
];

export interface Treatment {
  name: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

/** Signature treatments — the editorial "what we're known for" set. */
export const SIGNATURE_TREATMENTS: Treatment[] = [
  { name: "Botox & Neuromodulators", desc: "Botox, Dysport, and long-lasting Daxxify — softened lines with results that still look like you.", href: "/botox-kingsport-tn", icon: Sparkles, badge: "Most Popular" },
  { name: "Dermal & Lip Filler", desc: "Restore volume, define contours, and refine lips with premium hyaluronic acid.", href: "/lip-filler-kingsport-tn", icon: HeartPulse },
  { name: "CO2 Laser Resurfacing", desc: "Reverse sun damage and deep texture for genuinely radiant, renewed skin.", href: "/laser-skin-rejuvenation-kingsport-tn", icon: Zap },
  { name: "RF Microneedling", desc: "Tighten skin, soften scars, and refine pores with collagen-stimulating radiofrequency.", href: "/rf-microneedling-kingsport-tn", icon: Stethoscope },
  { name: "Medical Weight Loss", desc: "Semaglutide & Tirzepatide programs, fully supervised by our medical team.", href: "/medical-weight-loss-kingsport-tn", icon: Scale, badge: "Free Consult" },
  { name: "Hormone Optimization", desc: "Bioidentical HRT for energy, mood, libido, and metabolic health — built around your labs.", href: "/hormone-therapy-kingsport-tn", icon: Dna },
];

export interface Provider {
  name: string;
  credential: string;
  title: string;
  /** May contain multiple paragraphs separated by a blank line ("\n\n"). */
  bio: string;
  /** Monogram initials used for the refined placeholder avatar (fallback). */
  initials: string;
  /** Optional real headshot served from /public — renders instead of the monogram. */
  photo?: string;
  /** Descriptive alt text for the headshot; required whenever `photo` is set. */
  photoAlt?: string;
}

export interface LeadershipMember {
  name: string;
  /** Optional post-nominal (e.g. "MBA"). Omitted when the member has none. */
  credential?: string;
  title: string;
  bio: string;
  /** WebP portrait (primary) served from /images. */
  photo: string;
  /** JPG fallback portrait for browsers without WebP support. */
  photoFallback: string;
  /** Descriptive alt text for the portrait. */
  alt: string;
}

/**
 * Care team. Providers with a real headshot render the photo; the rest fall
 * back to a refined monogram avatar (never generic stock).
 */
export const PROVIDERS: Provider[] = [
  {
    name: "Shelly Ketron",
    credential: "PA-C",
    title: "Certified Physician Assistant",
    bio: "Advanced aesthetic injector and medical lead, blending clinical precision with a natural, balanced aesthetic across both Tri-Cities locations.",
    initials: "SK",
  },
  {
    name: "Stephanie Childress",
    credential: "FNP-C",
    title: "Family Nurse Practitioner",
    bio: "Stephanie Childress, FNP-C, brings over 15 years of nursing experience to Balanced Wellness, including the last eight years as a Family Nurse Practitioner. Her transition into aesthetic medicine was a natural extension of her clinical expertise and passion for helping others look and feel their most confident. By combining a deep understanding of anatomy and physiology, Stephanie delivers results that are both natural and refined. She approaches each patient with intention and precision, while maintaining a strong focus on individualized care.\n\nOutside of her professional life, she is a devoted wife and proud mother of two boys. She enjoys cooking, gardening, and spending time outdoors with her family.",
    initials: "SC",
    photo: "/images/stephanie-childress.webp",
    photoAlt: "Stephanie Childress, FNP-C at Balanced Wellness Medical Spa",
  },
];

/**
 * Practice leadership — operations, growth, and technology support for the
 * clinical team. Kept distinct from PROVIDERS so nobody here is presented as a
 * licensed medical provider.
 */
export const LEADERSHIP: LeadershipMember[] = [
  {
    name: "Kelli Garretson Griffey",
    credential: "MBA",
    title: "COO · Founder of KelliAI · Healthcare Consultant",
    bio: "Kelli Garretson Griffey serves as COO of Balanced Wellness Medical Spa and is the founder of KelliAI, an AI-powered platform built to support medical spa operations, patient communication, and lead conversion. With an MBA and more than 15 years of healthcare experience, including a background in ophthalmology and healthcare consulting, Kelli brings together clinical insight, business strategy, and technology innovation to help create a more seamless patient experience. She helps lead operations, growth, technology, and patient experience across the practice while supporting the team's mission to deliver personalized, high-quality aesthetic and wellness care. Outside of work, Kelli is a wife to Major Griffey, Jr., and proud mother to her daughter, Amelia. Her work is driven by a deep commitment to family, entrepreneurship, innovation, and helping people look, feel, and live more balanced.",
    photo: "/images/kelli-garretson-griffey.webp",
    photoFallback: "/images/kelli-garretson-griffey.jpg",
    alt: "Kelli Garretson Griffey, MBA, COO and Founder of KelliAI at Balanced Wellness Medical Spa.",
  },
  {
    name: "Sophia Arias",
    title: "CFO · International Business Strategist",
    bio: "Sophia Arias serves as CFO of Balanced Wellness Medical Spa, bringing a strong background in international business, financial strategy, and operational leadership. She oversees the financial side of the practice, helping guide budgeting, growth planning, vendor relationships, and long-term business development. With a global business perspective and a detail-oriented approach, Sophia helps ensure Balanced Wellness operates with structure, accountability, and a strong foundation for continued expansion. Her leadership supports the practice's mission to deliver elevated aesthetic and wellness care while building a sustainable, forward-thinking business.",
    photo: "/images/sophia-arias.webp",
    photoFallback: "/images/sophia-arias.jpg",
    alt: "Sophia Arias, CFO and International Business Strategist at Balanced Wellness Medical Spa.",
  },
];

export interface TrustSignal {
  label: string;
  detail: string;
  icon: LucideIcon;
}

/**
 * Trust signals kept deliberately claim-safe: no invented statistics beyond
 * the review/patient figures already used elsewhere on the site.
 */
export const TRUST_SIGNALS: TrustSignal[] = [
  { label: "Licensed Providers", detail: "Care led by PA-C and FNP clinicians", icon: Stethoscope },
  { label: "Medical Oversight", detail: "Physician-supervised protocols", icon: Syringe },
  { label: "Verified 5-Star Reviews", detail: "200+ five-star patient reviews", icon: Sparkles },
  { label: "Flexible Financing", detail: "CareCredit & Cherry available", icon: Scale },
];

/** Headline stats reused across hero and trust sections. */
export const HEADLINE_STATS: { number: string; label: string }[] = [
  { number: "8,000+", label: "Patients Treated" },
  { number: "200+", label: "5-Star Reviews" },
  { number: "5.0", label: "Google Rating" },
  { number: "2", label: "Tri-Cities Locations" },
];
