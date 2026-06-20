import { SEOServicePage } from "@/components/SEOServicePage";

export const data = {
  seo: {
    title: "Online Skincare Kingsport TN | Telehealth Medical Skincare | Balanced Wellness",
    description:
      "Online medical skincare in Kingsport & Jonesborough TN. Start a telehealth assessment for a provider-guided skincare plan and prescription-grade products. Provider review required.",
    keywords:
      "online skincare Kingsport TN, telehealth dermatology Jonesborough TN, medical skincare online Tri-Cities, prescription skincare Kingsport, online acne care Tennessee",
    canonicalPath: "/online-skincare-kingsport-tn",
  },
  hero: {
    badge: "Online Care — Kingsport & Jonesborough TN",
    h1: "Online Skincare in Kingsport TN",
    subheadline:
      "Get a provider-guided medical skincare plan without an in-person visit to start. Complete a quick online assessment and a Balanced Wellness provider reviews your concerns and goals.",
  },
  shortAnswer: {
    q: "Can I get a medical skincare plan online in Kingsport or Jonesborough?",
    a: "Yes. Balanced Wellness Medical Spa offers online medical skincare for patients in Kingsport, Jonesborough, and the Tri-Cities. You complete a short online assessment about your skin concerns and goals, and a provider reviews it to recommend a plan — which may include prescription-grade products. Provider review is required and no diagnosis or specific result is guaranteed.",
  },
  intro: {
    h2: "What Is Online Medical Skincare?",
    body: [
      "Online medical skincare connects you with a licensed provider to build a personalized regimen for concerns like acne, aging, pigmentation, or texture — without needing an in-person visit to begin. At Balanced Wellness Medical Spa, you complete a guided online assessment describing your skin, history, and goals, and a provider reviews it before recommending products or next steps.",
      "Unlike over-the-counter routines, a medical skincare plan may include prescription-grade ingredients and professional guidance tailored to your skin type. Your provider can also recommend in-clinic treatments — such as RF microneedling or laser rejuvenation — when they would help you reach your goals.",
      "Serving Kingsport, Jonesborough, and the wider Tri-Cities, the online skincare pathway keeps expert guidance accessible while ensuring every plan is reviewed by a provider. The online assessment is a starting point, not a prescription, and recommendations are individualized.",
    ],
  },
  benefits: [
    { title: "Provider-Guided Plan", desc: "A licensed provider reviews your concerns and recommends a tailored regimen." },
    { title: "Prescription-Grade Options", desc: "Plans may include medical-grade products not available over the counter, when appropriate." },
    { title: "Start Online", desc: "Begin with a short assessment from home — no initial in-person visit required." },
    { title: "Targeted To Your Concerns", desc: "Acne, aging, pigmentation, texture, and more — addressed individually." },
    { title: "In-Clinic Add-Ons", desc: "Treatments like RF microneedling or laser available locally when recommended." },
    { title: "Local Support", desc: "Kingsport and Jonesborough locations for follow-up and in-person care." },
  ],
  candidates: {
    goodFor: [
      "Adults in the Tri-Cities wanting a medical-grade skincare routine",
      "Those frustrated by over-the-counter products",
      "Patients with acne, aging, pigmentation, or texture concerns",
      "People who prefer to start the process online",
      "Anyone open to provider recommendations and follow-up",
    ],
    notFor: [
      "Anyone seeking prescriptions without provider evaluation",
      "Suspected skin cancer or urgent lesions (see a dermatologist or physician promptly)",
      "Those expecting guaranteed results from online intake alone",
      "Patients unwilling to follow a provider-directed regimen",
    ],
  },
  expectations: [
    {
      phase: "Before" as const,
      icon: "📝",
      items: [
        "Complete the online skincare assessment",
        "Describe your skin concerns, history, and goals",
        "Add photos if requested",
        "A provider reviews your responses",
      ],
    },
    {
      phase: "During" as const,
      icon: "🧴",
      items: [
        "Provider recommends a personalized regimen if appropriate",
        "Plan may include prescription-grade products",
        "In-clinic treatments suggested when helpful",
        "Guidance on how and when to use each product",
      ],
    },
    {
      phase: "After" as const,
      icon: "✨",
      items: [
        "Follow your plan and track changes over weeks",
        "Adjustments based on how your skin responds",
        "Optional in-person treatments in Kingsport or Jonesborough",
        "Ongoing support for long-term skin health",
      ],
    },
  ],
  faqs: [
    {
      q: "Is online skincare available in Kingsport and Jonesborough?",
      a: "Yes. Balanced Wellness Medical Spa serves Kingsport, Jonesborough, and the Tri-Cities. You can start online and visit either location for in-person treatments or follow-up.",
    },
    {
      q: "Will I get prescription products automatically?",
      a: "No. The online assessment is reviewed by a provider who decides whether prescription-grade products are appropriate for you. Nothing is guaranteed, and no diagnosis is made online.",
    },
    {
      q: "Can online skincare treat acne?",
      a: "A provider can review your acne concerns through the online assessment and recommend a plan, which may include medical-grade or prescription products. Some cases may be referred for in-person evaluation.",
    },
    {
      q: "What if I notice a concerning mole or lesion?",
      a: "Online skincare is not a substitute for evaluation of suspicious lesions. If you have a concerning mole or skin change, see a dermatologist or physician promptly, and seek urgent care for any emergency.",
    },
  ],
  relatedLinks: [
    { name: "Online Care & Telehealth", path: "/online-care", desc: "Start your online assessment." },
    { name: "RF Microneedling Kingsport TN", path: "/rf-microneedling-kingsport-tn", desc: "In-clinic skin rejuvenation." },
    { name: "Laser Skin Rejuvenation", path: "/laser-skin-rejuvenation-kingsport-tn", desc: "Laser treatments for tone and texture." },
    { name: "Laser Treatments", path: "/laser-treatments", desc: "Our full laser treatment menu." },
    { name: "Book an Appointment", path: "/book-now", desc: "Schedule in person at either location." },
    { name: "Gallery", path: "/gallery", desc: "Before-and-after results." },
  ],
  schemaDescription:
    "Online medical skincare for Kingsport & Jonesborough TN at Balanced Wellness Medical Spa. Provider-reviewed telehealth assessment for personalized skincare plans and prescription-grade products when appropriate.",
};

export default function OnlineSkincareKingsport() {
  return <SEOServicePage {...data} />;
}
