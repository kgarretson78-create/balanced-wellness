import { SEOServicePage } from "@/components/SEOServicePage";

const data = {
  seo: {
    title: "Medical Weight Loss Kingsport TN | Semaglutide | Balanced Wellness",
    description: "Medical weight loss in Kingsport TN at Balanced Wellness. Semaglutide, Tirzepatide, and medically supervised weight loss programs. Lose weight safely and keep it off. Free consultation.",
    keywords: "medical weight loss Kingsport TN, Semaglutide Kingsport Tennessee, weight loss clinic Kingsport TN, Tirzepatide Kingsport, GLP-1 weight loss Tri-Cities TN, doctor supervised weight loss Kingsport",
  },
  hero: {
    badge: "Medical Weight Loss — Kingsport TN",
    h1: "Medical Weight Loss in Kingsport TN",
    subheadline: "Semaglutide, Tirzepatide, and physician-supervised metabolic programs at Balanced Wellness Medical Spa. Science-backed weight loss that lasts.",
  },
  intro: {
    h2: "Why Medical Weight Loss in Kingsport TN Works When Diets Don't",
    body: [
      "Fad diets, extreme caloric restriction, and intense exercise programs fail the majority of people who try them — not because of lack of willpower, but because they don't address the underlying metabolic and hormonal factors driving weight gain. At Balanced Wellness Medical Spa in Kingsport TN, our medical weight loss programs treat obesity as the complex medical condition it is.",
      "We offer Semaglutide and Tirzepatide — the revolutionary GLP-1 and GIP/GLP-1 receptor agonist medications that have transformed the weight loss landscape. These FDA-approved medications work by regulating appetite hormones, slowing gastric emptying, improving insulin sensitivity, and reducing food cravings at the neurological level.",
      "Every patient receives comprehensive lab testing, a personalized medical evaluation, and an individualized protocol that includes medication management, nutritional guidance, and ongoing support. We serve patients from Kingsport, Johnson City, Bristol, Greeneville, and the entire Tri-Cities region of East Tennessee.",
    ],
  },
  benefits: [
    { title: "Significant Weight Loss", desc: "Clinical trials show 15–20%+ total body weight loss with Semaglutide and Tirzepatide." },
    { title: "Appetite Regulation", desc: "GLP-1 medications reduce hunger hormones and decrease food cravings at the neurological level." },
    { title: "Metabolic Improvement", desc: "Improves blood sugar regulation, insulin sensitivity, and metabolic markers." },
    { title: "Cardiovascular Benefits", desc: "Semaglutide has shown cardiovascular protective benefits in clinical trials." },
    { title: "Medically Supervised", desc: "All programs are supervised by our medical providers with regular check-ins and lab monitoring." },
    { title: "Sustainable Results", desc: "Unlike crash diets, our programs address the metabolic root causes of weight gain." },
    { title: "Lipotropic Support", desc: "Lipotropic MIC injections boost fat metabolism and energy to complement your program." },
    { title: "Body Composition Focus", desc: "We monitor and preserve lean muscle mass while targeting fat loss." },
  ],
  candidates: {
    goodFor: [
      "Adults with BMI 27+ (overweight) or 30+ (obese)",
      "Patients who have struggled with traditional diet and exercise",
      "Those with weight-related health conditions (diabetes, hypertension, sleep apnea)",
      "Individuals wanting medically supervised, evidence-based weight loss",
      "Patients interested in Semaglutide or Tirzepatide therapy",
    ],
    notFor: [
      "Pregnant or breastfeeding individuals",
      "Personal or family history of medullary thyroid cancer",
      "History of pancreatitis (requires consultation)",
      "Type 1 diabetes (separate protocol needed)",
      "Those not committed to a comprehensive lifestyle program",
    ],
  },
  expectations: [
    {
      phase: "Before",
      icon: "🩺",
      items: [
        "Comprehensive health history review and lab panel",
        "Medical evaluation to confirm candidacy",
        "Discuss goals, timeline, and what to expect from medication",
        "Establish baseline weight, metabolic markers, and body composition",
        "Receive your personalized program and prescription",
      ],
    },
    {
      phase: "During",
      icon: "📈",
      items: [
        "Weekly self-administered injections at home (syringes provided)",
        "Dose titration over weeks 1–4 to minimize side effects",
        "Regular check-in appointments with our medical team",
        "Lab monitoring every 3 months",
        "Nutritional coaching and lifestyle support throughout",
      ],
    },
    {
      phase: "After",
      icon: "🏆",
      items: [
        "Most patients lose 1–2 lbs per week on average",
        "Transition planning at goal weight to maintain results",
        "Ongoing support for long-term weight maintenance",
        "Metabolic reset protocol available for continued optimization",
        "Body contouring treatments available to address skin laxity",
      ],
    },
  ],
  faqs: [
    {
      q: "How much weight can I lose with Semaglutide in Kingsport TN?",
      a: "In clinical trials, patients lost an average of 15% of their body weight with Semaglutide over 68 weeks. Tirzepatide showed even higher results — up to 20% body weight loss. Individual results vary based on adherence and metabolic factors.",
    },
    {
      q: "What is the difference between Semaglutide and Tirzepatide?",
      a: "Semaglutide is a GLP-1 receptor agonist (Ozempic/Wegovy). Tirzepatide (Mounjaro/Zepbound) works on both GLP-1 and GIP receptors, showing superior weight loss in studies. Our providers will recommend the right medication for you.",
    },
    {
      q: "Will I gain the weight back after stopping medication?",
      a: "Some weight regain can occur after discontinuing GLP-1 medications. That's why our program includes transition planning and lifestyle protocols to help you maintain your results long-term.",
    },
    {
      q: "Is medical weight loss covered by insurance?",
      a: "Some insurance plans cover GLP-1 medications for diabetes or obesity. We can help you understand your benefits. Our cash-pay programs are transparently priced and include all medical oversight.",
    },
    {
      q: "How is medical weight loss different from just dieting?",
      a: "Medical weight loss addresses the hormonal and metabolic root causes of weight gain — not just calorie balance. Medications like Semaglutide reset your hunger hormones and metabolic rate in ways that willpower alone cannot.",
    },
  ],
  relatedLinks: [
    { name: "Hormone Therapy Kingsport TN", path: "/hormone-therapy-kingsport-tn", desc: "Hormonal optimization for metabolic health." },
    { name: "Peptide Therapy Kingsport TN", path: "/peptide-therapy-kingsport-tn", desc: "Cellular support for weight loss and recovery." },
    { name: "Weight Loss & Metabolic", path: "/weight-loss", desc: "Full weight loss program overview." },
    { name: "Wellness Clinic Kingsport TN", path: "/wellness-clinic-kingsport-tn", desc: "Comprehensive wellness programs." },
    { name: "VIP Memberships", path: "/memberships", desc: "Membership discounts on weight loss programs." },
    { name: "Book Consultation", path: "/book", desc: "Schedule your weight loss consultation." },
  ],
  schemaDescription: "Medical weight loss programs in Kingsport TN at Balanced Wellness Medical Spa. Semaglutide, Tirzepatide, and physician-supervised metabolic programs for lasting weight loss.",
};

export default function MedicalWeightLossKingsport() {
  return <SEOServicePage {...data} />;
}
