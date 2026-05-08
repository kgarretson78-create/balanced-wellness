import { SEOServicePage } from "@/components/SEOServicePage";

const data = {
  seo: {
    title: "Laser Skin Rejuvenation Kingsport TN | Balanced Wellness Medical Spa",
    description: "Laser skin rejuvenation in Kingsport TN at Balanced Wellness. IPL photofacials, laser resurfacing, and skin renewal treatments for sun damage, age spots, and uneven tone. Free consultation.",
    keywords: "laser skin rejuvenation Kingsport TN, IPL photofacial Kingsport, laser resurfacing Kingsport Tennessee, skin rejuvenation Tri-Cities TN, laser treatment for sun damage Kingsport, photofacial Johnson City TN",
  },
  hero: {
    badge: "Laser & Skin Treatments — Kingsport TN",
    h1: "Laser Skin Rejuvenation in Kingsport TN",
    subheadline: "Advanced IPL and laser resurfacing treatments to erase sun damage, even skin tone, and reveal your most radiant complexion. Serving Kingsport and the Tri-Cities area.",
  },
  intro: {
    h2: "What Is Laser Skin Rejuvenation in Kingsport, Tennessee?",
    body: [
      "Laser skin rejuvenation encompasses a range of light-based and energy treatments that dramatically improve the appearance of aging, damaged, and uneven skin. At Balanced Wellness Medical Spa in Kingsport TN, we offer IPL (Intense Pulsed Light) photofacials and laser resurfacing to address sun damage, age spots, rosacea, and uneven skin tone.",
      "IPL photofacials use broad-spectrum light to target melanin and hemoglobin in the skin, breaking up pigmentation from sun exposure and addressing redness from broken capillaries. Patients love IPL because it treats multiple concerns simultaneously — brown spots, redness, and skin texture — with minimal downtime.",
      "Our Kingsport providers customize each laser treatment based on your skin type, Fitzpatrick classification, and specific concerns. Whether you've accumulated sun damage from Tennessee summers or want to reverse years of photo-aging, we'll build a treatment plan that gets you glowing.",
    ],
  },
  benefits: [
    { title: "Erase Sun Damage", desc: "IPL breaks up melanin deposits from years of UV exposure, fading age spots and sun spots." },
    { title: "Even Skin Tone", desc: "Dramatically improve hyperpigmentation, melasma-related discoloration, and uneven complexion." },
    { title: "Reduce Redness & Rosacea", desc: "Target broken capillaries and diffuse facial redness associated with rosacea." },
    { title: "Collagen Stimulation", desc: "Laser energy stimulates new collagen production, improving skin texture and firmness over time." },
    { title: "Minimal Downtime", desc: "Most patients have some redness that fades within 24–48 hours. No significant downtime." },
    { title: "Long-Lasting Improvement", desc: "Results improve over 3–6 weeks as the body processes treated pigmentation and builds collagen." },
    { title: "Multiple Concerns Addressed", desc: "One treatment session can simultaneously address pigmentation, redness, and texture." },
    { title: "Safe & Proven", desc: "IPL and laser treatments have decades of clinical data supporting their safety and efficacy." },
  ],
  candidates: {
    goodFor: [
      "Adults with sun damage, age spots, or freckles",
      "Patients with rosacea or diffuse facial redness",
      "Those with broken capillaries or spider veins on the face",
      "Individuals with uneven skin tone or mild hyperpigmentation",
      "Anyone wanting brighter, more radiant skin",
      "Lighter skin tones (Fitzpatrick I–IV) for IPL treatments",
    ],
    notFor: [
      "Very dark skin tones (Fitzpatrick V–VI) for certain laser types",
      "Active tan or recent sun exposure",
      "Pregnant or breastfeeding individuals",
      "Active skin infections or open wounds",
      "Patients on photosensitizing medications (consult required)",
      "Melasma (IPL can worsen — alternative treatments recommended)",
    ],
  },
  expectations: [
    {
      phase: "Before",
      icon: "🌟",
      items: [
        "Consultation to assess your skin type and determine the right laser protocol",
        "Avoid sun exposure and self-tanner for 2–4 weeks before treatment",
        "Discontinue Retin-A or retinol 5–7 days before",
        "Arrive with a clean, makeup-free face",
        "Sunscreen and sun avoidance are mandatory post-treatment",
      ],
    },
    {
      phase: "During",
      icon: "💡",
      items: [
        "Protective eyewear worn throughout the session",
        "A cool gel applied to the skin to enhance comfort",
        "Light pulses delivered across treatment areas — feels like a warm snap",
        "Treatment takes 20–45 minutes depending on area size",
        "Most patients rate discomfort as mild (2–4/10)",
      ],
    },
    {
      phase: "After",
      icon: "✨",
      items: [
        "Skin appears pink/red for 1–24 hours — like a mild sunburn",
        "Brown spots temporarily darken ('coffee grounds') before shedding in 7–10 days",
        "Strict sun avoidance and SPF 50 required for 2+ weeks",
        "Full results visible in 3–6 weeks",
        "Series of 3–5 treatments recommended for optimal results",
      ],
    },
  ],
  faqs: [
    {
      q: "How many laser skin rejuvenation sessions do I need?",
      a: "Most patients see significant improvement after 3–5 IPL sessions spaced 3–4 weeks apart. Your provider will create a customized treatment series based on your concerns and goals.",
    },
    {
      q: "Is laser skin rejuvenation safe for all skin types?",
      a: "IPL is safest for lighter skin tones (Fitzpatrick I–IV). We always perform a thorough skin assessment and may recommend alternative treatments for darker skin tones to ensure safety.",
    },
    {
      q: "Will my dark spots come back after laser treatment?",
      a: "Treated spots are permanently reduced, but new sun damage can develop over time. Consistent use of SPF 50+ daily and annual maintenance treatments can preserve your results long-term.",
    },
    {
      q: "Can I wear makeup after an IPL photofacial?",
      a: "We recommend waiting 24 hours before applying makeup to allow the skin to recover. After that, gentle mineral makeup is fine.",
    },
  ],
  relatedLinks: [
    { name: "RF Microneedling Kingsport TN", path: "/rf-microneedling-kingsport-tn", desc: "Deep collagen stimulation for texture and laxity." },
    { name: "Skin Tightening Kingsport TN", path: "/skin-tightening-kingsport-tn", desc: "Non-surgical skin firming and tightening." },
    { name: "Laser Treatments", path: "/laser-treatments", desc: "Full laser and skin treatment menu." },
    { name: "Injectables & Fillers", path: "/injectables", desc: "Pair laser with injectables for complete rejuvenation." },
    { name: "Before & After Gallery", path: "/gallery", desc: "See real IPL results from our patients." },
    { name: "VIP Memberships", path: "/memberships", desc: "Save on a laser treatment series." },
  ],
  schemaDescription: "Laser skin rejuvenation treatments in Kingsport TN at Balanced Wellness Medical Spa. IPL photofacials and laser resurfacing for sun damage, age spots, rosacea, and skin tone improvement.",
};

export default function LaserSkinRejuvenation() {
  return <SEOServicePage {...data} />;
}
