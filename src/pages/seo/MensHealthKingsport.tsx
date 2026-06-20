import { SEOServicePage } from "@/components/SEOServicePage";

export const data = {
  seo: {
    title: "Men's Health Kingsport TN | Online Hormone & Vitality Care | Balanced Wellness",
    description:
      "Men's health and hormone optimization in Kingsport & Jonesborough TN. Start an online assessment for provider-reviewed testosterone, vitality, and wellness care. Provider review required.",
    keywords:
      "men's health Kingsport TN, testosterone therapy Jonesborough TN, online men's health Tri-Cities, TRT Kingsport, men's hormone optimization Tennessee",
    canonicalPath: "/mens-health-kingsport-tn",
  },
  hero: {
    badge: "Online Care — Kingsport & Jonesborough TN",
    h1: "Men's Health in Kingsport TN",
    subheadline:
      "Provider-led men's hormone optimization and vitality care for the Tri-Cities. Start with a quick online assessment and a Balanced Wellness provider reviews your goals, symptoms, and history.",
  },
  shortAnswer: {
    q: "Can I start men's hormone and vitality care online in Kingsport or Jonesborough?",
    a: "Yes. Balanced Wellness Medical Spa offers a men's health pathway for patients in Kingsport, Jonesborough, and the Tri-Cities. You complete a short online assessment about your symptoms and goals, and a provider reviews it to recommend next steps — typically including lab work before any plan. Care is always provider-led, and eligibility for treatment such as testosterone therapy is determined after evaluation.",
  },
  intro: {
    h2: "What Does Men's Health Care Include?",
    body: [
      "Men's health at Balanced Wellness Medical Spa focuses on energy, strength, libido, mood, and healthy aging — often tied to testosterone and other hormone levels that decline with age. Symptoms like persistent fatigue, low motivation, reduced libido, difficulty building muscle, or poor sleep can have a hormonal component worth evaluating.",
      "You can begin online: complete a guided assessment describing your symptoms, history, and goals, and a licensed provider reviews it. Depending on your evaluation, a plan may include comprehensive lab testing, testosterone optimization (TRT) when appropriate, peptide therapy, and lifestyle support — always individualized and monitored over time.",
      "Serving Kingsport, Jonesborough, and the surrounding Tri-Cities, our men's health pathway pairs accessible online intake with local, in-person support. Online intake is a starting point and not a prescription or diagnosis; your provider determines what is appropriate based on your labs and evaluation.",
    ],
  },
  benefits: [
    { title: "Hormone Optimization", desc: "Provider-guided evaluation of testosterone and related markers behind your symptoms." },
    { title: "Comprehensive Labs", desc: "Plans typically include detailed bloodwork before any treatment decision." },
    { title: "TRT When Appropriate", desc: "Testosterone therapy may be recommended when a provider determines it's suitable." },
    { title: "Energy & Vitality", desc: "Focus on energy, strength, libido, mood, and recovery together." },
    { title: "Start Online", desc: "Begin with an online assessment from home — no initial in-person visit required." },
    { title: "Local Care", desc: "Kingsport and Jonesborough locations for labs and follow-up." },
  ],
  candidates: {
    goodFor: [
      "Men in the Tri-Cities with fatigue, low libido, or low motivation",
      "Those struggling to build or maintain muscle",
      "Patients interested in monitored hormone optimization",
      "Men seeking a long-term vitality and longevity plan",
      "Those open to lab work and provider follow-up",
    ],
    notFor: [
      "Anyone seeking testosterone without provider evaluation and labs",
      "Men trying to conceive (some therapies affect fertility — discuss first)",
      "Acute or emergency symptoms (seek urgent care)",
      "Patients expecting guaranteed eligibility from online intake alone",
    ],
  },
  expectations: [
    {
      phase: "Before" as const,
      icon: "📝",
      items: [
        "Complete the men's health online assessment",
        "Share your symptoms, history, and goals",
        "A provider reviews your responses",
        "Lab work is typically requested before any plan",
      ],
    },
    {
      phase: "During" as const,
      icon: "💪",
      items: [
        "Provider designs a personalized plan if appropriate",
        "Plan may include TRT, peptides, or wellness support",
        "Check-ins and lab monitoring to track your response",
        "Adjustments based on labs and how you feel",
      ],
    },
    {
      phase: "After" as const,
      icon: "⚡",
      items: [
        "Ongoing monitoring and dose adjustments",
        "Support for energy, strength, libido, and recovery",
        "In-person care available in Kingsport and Jonesborough",
        "Long-term vitality and longevity focus",
      ],
    },
  ],
  faqs: [
    {
      q: "Is men's health care available in Kingsport and Jonesborough?",
      a: "Yes. Balanced Wellness Medical Spa serves Kingsport, Jonesborough, and the Tri-Cities. You can start online and use either location for labs and in-person follow-up.",
    },
    {
      q: "Will I be prescribed testosterone automatically?",
      a: "No. The online assessment is reviewed by a provider who determines whether testosterone therapy or any treatment is appropriate, almost always after lab work. Nothing is guaranteed and no diagnosis is made online.",
    },
    {
      q: "What symptoms does men's health care address?",
      a: "Common concerns include fatigue, low libido, low motivation, difficulty building muscle, poor sleep, and mood changes that can be linked to hormone levels. Your provider evaluates your individual situation.",
    },
    {
      q: "What if my symptoms are urgent?",
      a: "Online care is not for emergencies. If you have urgent or severe symptoms, such as chest pain, call 911 or go to the nearest emergency room.",
    },
  ],
  relatedLinks: [
    { name: "Online Care & Telehealth", path: "/online-care", desc: "Start your online assessment." },
    { name: "Hormone Therapy Kingsport TN", path: "/hormone-therapy-kingsport-tn", desc: "In-clinic hormone optimization." },
    { name: "Hormone Optimization", path: "/hormone-optimization", desc: "Our hormone and wellness program." },
    { name: "Peptide Therapy Kingsport TN", path: "/peptide-therapy-kingsport-tn", desc: "Peptides for recovery and longevity." },
    { name: "Medical Weight Loss Kingsport TN", path: "/medical-weight-loss-kingsport-tn", desc: "Medically supervised weight loss." },
    { name: "Book an Appointment", path: "/book-now", desc: "Schedule in person at either location." },
  ],
  schemaDescription:
    "Men's health and hormone optimization for Kingsport & Jonesborough TN at Balanced Wellness Medical Spa. Provider-reviewed online assessment for testosterone, vitality, and wellness care.",
  assessmentCategory: "mens-health" as const,
  assessmentIntro: {
    h2: "Start a Men's Health Assessment Online",
    body: "Begin with the assessment below. A Balanced Wellness provider reviews your responses and almost always requests lab work before any plan — eligibility for therapy is determined after evaluation and is never guaranteed.",
  },
};

export default function MensHealthKingsport() {
  return <SEOServicePage {...data} />;
}
