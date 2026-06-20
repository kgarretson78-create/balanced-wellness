import { SEOServicePage } from "@/components/SEOServicePage";

export const data = {
  seo: {
    title: "Online Weight Loss Kingsport TN | Telehealth GLP-1 Programs | Balanced Wellness",
    description:
      "Online medical weight loss in Kingsport & Jonesborough TN. Start a quick telehealth assessment for provider-reviewed weight loss programs, including GLP-1 options. Provider review required.",
    keywords:
      "online weight loss Kingsport TN, telehealth weight loss Jonesborough TN, online GLP-1 Kingsport, semaglutide telehealth Tennessee, online medical weight loss Tri-Cities",
    canonicalPath: "/online-weight-loss-kingsport-tn",
  },
  hero: {
    badge: "Online Care — Kingsport & Jonesborough TN",
    h1: "Online Weight Loss in Kingsport TN",
    subheadline:
      "Start medically supervised weight loss from home with a quick online assessment. A Balanced Wellness provider reviews your goals and history before any plan is offered.",
  },
  shortAnswer: {
    q: "Can I do medical weight loss online in Kingsport or Jonesborough?",
    a: "Yes. Balanced Wellness Medical Spa offers an online weight loss pathway for patients in Kingsport, Jonesborough, and the Tri-Cities. You complete a short online assessment about your goals and health history, and one of our providers reviews it. Treatment, including any GLP-1 medication, is only offered when a provider determines it is medically appropriate — eligibility is never guaranteed and no diagnosis is made online.",
  },
  intro: {
    h2: "What Is Online Medical Weight Loss?",
    body: [
      "Online medical weight loss lets you begin a provider-supervised weight loss journey without an in-person visit to start. At Balanced Wellness Medical Spa, you complete a guided online assessment covering your weight history, health background, and goals. A licensed provider reviews your responses and follows up about next steps — which may include lab work, a virtual or in-person consultation, and a personalized plan.",
      "Our programs are built around the same evidence-based approach we use in-clinic: addressing the underlying metabolic factors behind weight gain rather than relying on fad diets. Depending on what your provider determines is appropriate, a plan may include GLP-1 medications such as semaglutide or tirzepatide, nutrition coaching, and ongoing monitoring.",
      "Serving Kingsport, Jonesborough, and the surrounding Tri-Cities region, the online pathway is designed to remove friction for busy patients while keeping care firmly provider-led. Online intake is a starting point — it is not a prescription, and eligibility is always determined by a provider.",
    ],
  },
  benefits: [
    { title: "Start From Home", desc: "Begin with a short online assessment — no need to take time off for an initial visit." },
    { title: "Provider-Reviewed", desc: "A licensed provider personally reviews your assessment before any plan is discussed." },
    { title: "GLP-1 Options When Appropriate", desc: "Medications like semaglutide or tirzepatide may be part of your plan if your provider determines it's suitable." },
    { title: "Local Follow-Up", desc: "Kingsport and Jonesborough locations are available for labs, check-ins, and in-person support." },
    { title: "Metabolic Focus", desc: "Plans address the biological drivers of weight, not just calories in and out." },
    { title: "Ongoing Monitoring", desc: "Your provider adjusts your plan over time based on your response and progress." },
  ],
  candidates: {
    goodFor: [
      "Adults in the Tri-Cities seeking medically supervised weight loss",
      "Busy patients who want to start the process online",
      "Those who have struggled with diet-and-exercise-only approaches",
      "Patients open to lab work and provider follow-up",
      "People wanting a long-term, monitored plan rather than a quick fix",
    ],
    notFor: [
      "Anyone seeking medication without provider evaluation",
      "Pregnant or breastfeeding individuals",
      "Those with certain medical conditions a provider must assess first",
      "Patients expecting guaranteed eligibility or same-day medication",
    ],
  },
  expectations: [
    {
      phase: "Before" as const,
      icon: "📝",
      items: [
        "Complete the online weight loss assessment",
        "Share your goals, weight history, and health background",
        "A provider reviews your responses",
        "Lab work or a consultation may be requested",
      ],
    },
    {
      phase: "During" as const,
      icon: "⚖️",
      items: [
        "Your provider designs a personalized plan if appropriate",
        "Plan may include GLP-1 medication, nutrition, and coaching",
        "Regular check-ins track your progress",
        "Dose and approach adjusted to your response",
      ],
    },
    {
      phase: "After" as const,
      icon: "✨",
      items: [
        "Ongoing monitoring and support from your provider",
        "Transition and maintenance planning as you reach goals",
        "In-person support available in Kingsport and Jonesborough",
        "Long-term, sustainable results are the focus",
      ],
    },
  ],
  faqs: [
    {
      q: "Is online weight loss available in Kingsport and Jonesborough?",
      a: "Yes. Balanced Wellness Medical Spa serves patients across Kingsport, Jonesborough, and the Tri-Cities. You can start online and use either location for labs and follow-up.",
    },
    {
      q: "Will I automatically get a prescription?",
      a: "No. Completing the online assessment is the first step, not a prescription. A provider reviews your information and determines whether any medication is medically appropriate. Eligibility is never guaranteed.",
    },
    {
      q: "Which medications might be part of my plan?",
      a: "Depending on your provider's evaluation, a plan may include GLP-1 medications such as semaglutide or tirzepatide alongside nutrition and lifestyle support. Your provider decides what is appropriate for you.",
    },
    {
      q: "What if I have an urgent medical concern?",
      a: "Online care is not for emergencies. If you have a medical emergency or urgent symptoms, call 911 or go to the nearest emergency room.",
    },
  ],
  relatedLinks: [
    { name: "Online Care & Telehealth", path: "/online-care", desc: "Start your online assessment." },
    { name: "Medical Weight Loss Kingsport TN", path: "/medical-weight-loss-kingsport-tn", desc: "Our in-clinic weight loss program." },
    { name: "Peptide Therapy Kingsport TN", path: "/peptide-therapy-kingsport-tn", desc: "Peptides for enhanced metabolic support." },
    { name: "Weight Loss Clinic Kingsport TN", path: "/weight-loss-clinic-kingsport-tn", desc: "Kingsport's medical weight loss clinic." },
    { name: "Book an Appointment", path: "/book-now", desc: "Schedule in person at either location." },
    { name: "Wellness & Longevity", path: "/wellness", desc: "Complete wellness program overview." },
  ],
  schemaDescription:
    "Online medical weight loss for Kingsport & Jonesborough TN at Balanced Wellness Medical Spa. Provider-reviewed telehealth assessment for weight loss programs, including GLP-1 options when medically appropriate.",
  assessmentCategory: "weight-loss" as const,
  assessmentIntro: {
    h2: "Start Online Weight Loss Care",
    body: "Begin with the weight-loss goal assessment, or choose a specific medication if your provider has already discussed one with you. A Balanced Wellness provider reviews every submission — eligibility for any medication is determined after evaluation and is never guaranteed.",
  },
};

export default function OnlineWeightLossKingsport() {
  return <SEOServicePage {...data} />;
}
