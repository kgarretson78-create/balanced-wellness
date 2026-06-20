import { SEOServicePage } from "@/components/SEOServicePage";

export const data = {
  seo: {
    title: "Women's Health Kingsport TN | Online Hormone & Wellness Care | Balanced Wellness",
    description:
      "Women's health and hormone care in Kingsport & Jonesborough TN. Start an online assessment for provider-reviewed women's wellness, hormone balance, and longevity support. Provider review required.",
    keywords:
      "women's health Kingsport TN, women's hormone therapy Jonesborough TN, online women's health Tri-Cities, BHRT for women Kingsport, menopause care Tennessee",
    canonicalPath: "/womens-health-kingsport-tn",
  },
  hero: {
    badge: "Online Care — Kingsport & Jonesborough TN",
    h1: "Women's Health in Kingsport TN",
    subheadline:
      "Provider-led women's wellness and hormone care for the Tri-Cities. Start with a quick online assessment and a Balanced Wellness provider reviews your goals, symptoms, and history.",
  },
  shortAnswer: {
    q: "Can I start women's hormone and wellness care online in Kingsport or Jonesborough?",
    a: "Yes. Balanced Wellness Medical Spa offers a women's health pathway for patients in Kingsport, Jonesborough, and the Tri-Cities. You complete a short online assessment about your symptoms and goals, and a provider reviews it to recommend next steps — which may include lab work and a personalized plan. Care is always provider-led, and eligibility for any treatment is determined after evaluation.",
  },
  intro: {
    h2: "What Does Women's Health Care Include?",
    body: [
      "Women's health at Balanced Wellness Medical Spa focuses on hormone balance, energy, mood, sleep, and overall wellness through every stage of life. Many women experience fatigue, brain fog, mood changes, low libido, or sleep issues tied to shifting hormones — and a provider-led plan can help address the root causes.",
      "You can begin online: complete a guided assessment describing your symptoms, history, and goals, and a licensed provider reviews it. Depending on your evaluation, a plan may include comprehensive lab testing, bioidentical hormone therapy (BHRT), peptide therapy, nutrition guidance, or other wellness support — always individualized and monitored.",
      "Serving Kingsport, Jonesborough, and the surrounding Tri-Cities, our women's health pathway pairs accessible online intake with local, in-person support. Online intake is a starting point and not a prescription or diagnosis; your provider determines what is appropriate for you.",
    ],
  },
  benefits: [
    { title: "Hormone Balance", desc: "Provider-guided evaluation of symptoms tied to estrogen, progesterone, and thyroid health." },
    { title: "Comprehensive Labs", desc: "Plans may include detailed bloodwork to understand what's driving your symptoms." },
    { title: "Bioidentical Options", desc: "BHRT may be recommended when a provider determines it's appropriate." },
    { title: "Whole-Person Wellness", desc: "Energy, sleep, mood, and libido addressed together, not in isolation." },
    { title: "Start Online", desc: "Begin with an online assessment from home — no initial in-person visit required." },
    { title: "Local Care", desc: "Kingsport and Jonesborough locations for labs and follow-up." },
  ],
  candidates: {
    goodFor: [
      "Women in the Tri-Cities experiencing hormone-related symptoms",
      "Those with fatigue, brain fog, mood, sleep, or libido concerns",
      "Patients navigating perimenopause or menopause",
      "Women seeking a monitored, long-term wellness plan",
      "Those open to lab work and provider follow-up",
    ],
    notFor: [
      "Anyone seeking treatment without provider evaluation",
      "Pregnant or breastfeeding individuals (unless cleared by a provider)",
      "Acute or emergency symptoms (seek urgent care)",
      "Patients expecting guaranteed eligibility from online intake alone",
    ],
  },
  expectations: [
    {
      phase: "Before" as const,
      icon: "📝",
      items: [
        "Complete the women's health online assessment",
        "Share your symptoms, history, and goals",
        "A provider reviews your responses",
        "Lab work or a consultation may be requested",
      ],
    },
    {
      phase: "During" as const,
      icon: "🩺",
      items: [
        "Provider designs a personalized plan if appropriate",
        "Plan may include BHRT, peptides, or wellness support",
        "Check-ins to monitor your response",
        "Adjustments based on labs and how you feel",
      ],
    },
    {
      phase: "After" as const,
      icon: "🌿",
      items: [
        "Ongoing monitoring and dose adjustments",
        "Support for energy, sleep, mood, and vitality",
        "In-person care available in Kingsport and Jonesborough",
        "Long-term wellness and longevity focus",
      ],
    },
  ],
  faqs: [
    {
      q: "Is women's health care available in Kingsport and Jonesborough?",
      a: "Yes. Balanced Wellness Medical Spa serves Kingsport, Jonesborough, and the Tri-Cities. You can start online and use either location for labs and in-person follow-up.",
    },
    {
      q: "Will I be prescribed hormones automatically?",
      a: "No. The online assessment is reviewed by a provider who determines whether hormone therapy or any treatment is appropriate, usually after lab work. Nothing is guaranteed and no diagnosis is made online.",
    },
    {
      q: "What symptoms does women's health care address?",
      a: "Common concerns include fatigue, brain fog, mood changes, poor sleep, low libido, and other symptoms linked to hormone shifts. Your provider will evaluate your individual situation.",
    },
    {
      q: "What if my symptoms are urgent?",
      a: "Online care is not for emergencies. If you have urgent or severe symptoms, call 911 or go to the nearest emergency room.",
    },
  ],
  relatedLinks: [
    { name: "Online Care & Telehealth", path: "/online-care", desc: "Start your online assessment." },
    { name: "Hormone Therapy Kingsport TN", path: "/hormone-therapy-kingsport-tn", desc: "In-clinic hormone optimization." },
    { name: "Hormone Optimization", path: "/hormone-optimization", desc: "Our hormone and wellness program." },
    { name: "Peptide Therapy Kingsport TN", path: "/peptide-therapy-kingsport-tn", desc: "Peptides for recovery and longevity." },
    { name: "Wellness & Longevity", path: "/wellness", desc: "Complete wellness program overview." },
    { name: "Book an Appointment", path: "/book-now", desc: "Schedule in person at either location." },
  ],
  schemaDescription:
    "Women's health and hormone care for Kingsport & Jonesborough TN at Balanced Wellness Medical Spa. Provider-reviewed online assessment for hormone balance, wellness, and longevity support.",
  assessmentCategory: "womens-health" as const,
  assessmentIntro: {
    h2: "Start Women's Health Care Online",
    body: "Start with a general wellness intake, or choose the topical option below. These are not hormone-therapy assessments — for hormone concerns, book a consultation and a provider will guide you. A provider reviews every submission, and nothing is diagnosed or guaranteed online.",
  },
};

export default function WomensHealthKingsport() {
  return <SEOServicePage {...data} />;
}
