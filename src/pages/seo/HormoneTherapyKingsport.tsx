import { SEOServicePage } from "@/components/SEOServicePage";

const data = {
  seo: {
    title: "Hormone Therapy Kingsport TN | Bioidentical HRT | Balanced Wellness",
    description: "Hormone therapy in Kingsport TN at Balanced Wellness Medical Spa. Bioidentical hormone replacement for men and women. Restore energy, libido, mood, and vitality. Free hormone consultation.",
    keywords: "hormone therapy Kingsport TN, bioidentical HRT Kingsport Tennessee, hormone replacement Kingsport, testosterone therapy Kingsport TN, menopause treatment Kingsport, BHRT Tri-Cities TN",
  },
  hero: {
    badge: "Hormone Optimization — Kingsport TN",
    h1: "Hormone Therapy in Kingsport TN",
    subheadline: "Comprehensive bioidentical hormone replacement therapy for men and women at Balanced Wellness. Restore your energy, mood, libido, and quality of life.",
  },
  intro: {
    h2: "Hormone Replacement Therapy in Kingsport, Tennessee",
    body: [
      "Hormones are the master regulators of virtually every body system — energy, metabolism, mood, libido, sleep, cognitive function, and physical composition. When hormones decline with age (or due to stress, chronic illness, or other factors), the effects can be profound and wide-reaching. At Balanced Wellness Medical Spa in Kingsport TN, we offer comprehensive bioidentical hormone therapy programs for both men and women.",
      "Bioidentical hormones are chemically identical to the hormones your body naturally produces. Unlike synthetic hormones, they interact with your hormone receptors in the same way your natural hormones do, often producing superior results with fewer side effects. Our providers use comprehensive lab panels to identify your specific hormonal imbalances and design a precise, individualized protocol.",
      "Whether you're experiencing symptoms of menopause, andropause (male hormone decline), thyroid dysfunction, or adrenal fatigue, our Kingsport clinic offers evidence-based hormone therapy to help you reclaim your vitality and quality of life. We serve patients from across the Tri-Cities region including Johnson City, Bristol, and Jonesborough.",
    ],
  },
  benefits: [
    { title: "Restored Energy Levels", desc: "Optimal hormones eliminate the chronic fatigue that leaves you exhausted despite adequate rest." },
    { title: "Improved Mood & Mental Clarity", desc: "Balanced hormones reduce anxiety, depression, and the dreaded 'brain fog'." },
    { title: "Enhanced Libido & Sexual Health", desc: "Testosterone and estrogen optimization restore healthy sexual function and desire." },
    { title: "Better Sleep Quality", desc: "Hormonal balance is essential for deep, restorative sleep cycles." },
    { title: "Lean Body Composition", desc: "Optimal testosterone preserves muscle mass and facilitates fat loss." },
    { title: "Bone Density Protection", desc: "Estrogen and testosterone protect against osteoporosis and bone loss with age." },
    { title: "Cardiovascular Protection", desc: "Balanced hormones support heart health and healthy cholesterol profiles." },
    { title: "Skin & Hair Benefits", desc: "Estrogen and DHEA support skin thickness, elasticity, and hair growth." },
  ],
  candidates: {
    goodFor: [
      "Women experiencing perimenopause or menopause symptoms",
      "Men with low testosterone (andropause) symptoms",
      "Adults with unexplained fatigue, weight gain, or mood changes",
      "Patients with diagnosed hormonal imbalances via lab testing",
      "Those seeking preventive anti-aging hormone optimization",
      "Individuals with thyroid disorders or adrenal dysfunction",
    ],
    notFor: [
      "Active hormone-sensitive cancers (breast, prostate, uterine)",
      "Uncontrolled blood clots or thromboembolic conditions",
      "Pregnancy (natural hormone changes are expected)",
      "Patients not willing to commit to ongoing lab monitoring",
    ],
  },
  expectations: [
    {
      phase: "Before",
      icon: "🩺",
      items: [
        "Comprehensive hormone panel including sex hormones, thyroid, cortisol, and metabolic markers",
        "Detailed health history and symptom review",
        "Discussion of treatment goals and lifestyle factors",
        "Establish baseline measurements and biomarkers",
        "Provider designs your individualized bioidentical protocol",
      ],
    },
    {
      phase: "During",
      icon: "💊",
      items: [
        "Treatment delivered via cream, pellet, injection, or oral depending on your protocol",
        "Gradual dose optimization over the first 6–8 weeks",
        "Regular follow-up appointments to monitor response",
        "Lab panels every 3–6 months for ongoing optimization",
        "Protocol adjustments made based on symptoms and lab results",
      ],
    },
    {
      phase: "After",
      icon: "✨",
      items: [
        "Most patients notice improvements in energy within 2–4 weeks",
        "Sleep and mood improvements typically within 4–8 weeks",
        "Full benefit at 3–6 months of consistent treatment",
        "Ongoing monitoring ensures your levels stay in the optimal therapeutic range",
        "Preventive health benefits compound over years of consistent therapy",
      ],
    },
  ],
  faqs: [
    {
      q: "Are bioidentical hormones safer than synthetic hormones?",
      a: "Bioidentical hormones are chemically identical to your body's own hormones and are generally associated with a more favorable side effect profile. However, all hormone therapy requires proper medical evaluation, dosing, and monitoring. Our providers ensure your safety throughout.",
    },
    {
      q: "How do I know if I need hormone therapy?",
      a: "Symptoms like persistent fatigue, weight gain, low libido, mood changes, hot flashes, night sweats, or brain fog may indicate hormonal imbalance. The only way to confirm is through comprehensive lab testing, which we offer at our Kingsport clinic.",
    },
    {
      q: "How long do I need to be on hormone therapy?",
      a: "This is highly individual. Some patients find short-term therapy alleviates their symptoms; others choose to continue long-term for sustained health and quality of life benefits. We review your goals and adjust recommendations over time.",
    },
    {
      q: "What hormones do you test for?",
      a: "Our comprehensive panel includes estradiol, progesterone, testosterone (total and free), DHEA-S, cortisol, thyroid (TSH, T3, T4), IGF-1, and metabolic markers including fasting insulin and blood sugar.",
    },
  ],
  relatedLinks: [
    { name: "Peptide Therapy Kingsport TN", path: "/peptide-therapy-kingsport-tn", desc: "Cellular optimization to complement HRT." },
    { name: "Medical Weight Loss Kingsport TN", path: "/medical-weight-loss-kingsport-tn", desc: "Weight loss programs for hormonal weight gain." },
    { name: "Hormone Optimization", path: "/hormone-optimization", desc: "Full hormone optimization overview." },
    { name: "Wellness & Longevity", path: "/wellness", desc: "Complete wellness and longevity programs." },
    { name: "Wellness Clinic Kingsport TN", path: "/wellness-clinic-kingsport-tn", desc: "Comprehensive wellness medicine in Kingsport." },
    { name: "VIP Memberships", path: "/memberships", desc: "Membership savings on wellness programs." },
  ],
  schemaDescription: "Hormone therapy in Kingsport TN at Balanced Wellness Medical Spa. Bioidentical hormone replacement therapy for men and women including testosterone, estrogen, and thyroid optimization.",
};

export default function HormoneTherapyKingsport() {
  return <SEOServicePage {...data} />;
}
