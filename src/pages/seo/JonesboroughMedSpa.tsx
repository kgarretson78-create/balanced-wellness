import { LocalSEOPage } from "@/components/LocalSEOPage";

const data = {
  seo: {
    title: "Jonesborough Med Spa | Balanced Wellness Medical Spa",
    description: "Jonesborough TN med spa — Balanced Wellness offers Botox, dermal fillers, CO2 laser resurfacing, RF microneedling, IV therapy, and medical weight loss programs. 120 Cherokee St. Call (423) 646-2169.",
    keywords: "Jonesborough med spa, med spa Jonesborough TN, medical spa Jonesborough Tennessee, Botox Jonesborough TN, dermal fillers Jonesborough, CO2 laser Jonesborough, weight loss Jonesborough TN, RF microneedling Jonesborough",
  },
  hero: {
    badge: "Jonesborough, Tennessee • Historic Downtown",
    h1: "Jonesborough Med Spa",
    subheadline: "Balanced Wellness Medical Spa in historic downtown Jonesborough — offering Botox, dermal fillers, CO2 resurfacing, RF microneedling, IV therapy, and weight loss programs at 120 Cherokee St.",
  },
  intro: {
    h2: "Your Trusted Med Spa in Historic Jonesborough",
    body: [
      "Balanced Wellness Medical Spa brings luxury aesthetic medicine to the heart of Tennessee's oldest town. Located at 120 South Cherokee Street in downtown Jonesborough, our clinic offers a full suite of med spa services — from Botox and dermal fillers to CO2 laser resurfacing, RF microneedling, IV therapy, and medically supervised weight loss programs.",
      "Our Jonesborough med spa is staffed by the same board-certified providers and licensed medical professionals as our Kingsport flagship location. Every treatment is performed with the highest standards of safety, using FDA-approved technology and pharmaceutical-grade products to deliver natural-looking, lasting results.",
      "Whether you live in Jonesborough, Johnson City, Erwin, or anywhere in Washington County, our Cherokee Street clinic puts premium aesthetic and wellness care right in your neighborhood. We believe everyone in the Tri-Cities region deserves access to world-class med spa services without a long drive.",
    ],
  },
  services: [
    { name: "Botox & Neurotoxins", desc: "Botox, Dysport, and Daxxify for smooth, natural wrinkle relaxation.", link: "/botox-kingsport-tn" },
    { name: "Dermal Fillers", desc: "Lip filler, cheek augmentation, and full-face contouring with premium fillers.", link: "/lip-filler-kingsport-tn" },
    { name: "CO2 Laser Resurfacing", desc: "Advanced CO2 laser for deep wrinkles, scars, sun damage, and skin texture.", link: "/laser-skin-rejuvenation-kingsport-tn" },
    { name: "RF Microneedling", desc: "Scarlet RF for collagen remodeling, skin tightening, and scar reduction.", link: "/rf-microneedling-kingsport-tn" },
    { name: "IV Therapy", desc: "Custom IV infusions for hydration, energy, immunity, and recovery.", link: "/wellness" },
    { name: "Medical Weight Loss", desc: "Semaglutide and Tirzepatide physician-supervised programs for lasting results.", link: "/medical-weight-loss-kingsport-tn" },
    { name: "Skin Rejuvenation", desc: "Chemical peels, skin tightening, and resurfacing for radiant skin.", link: "/skin-tightening-kingsport-tn" },
    { name: "Hormone Optimization", desc: "Bioidentical HRT for men and women — restore energy and vitality.", link: "/hormone-therapy-kingsport-tn" },
    { name: "VIP Memberships", desc: "Gold, Platinum, and Diamond membership tiers with exclusive savings.", link: "/memberships" },
  ],
  whyUs: [
    "Locally owned and operated — we are proud members of the Jonesborough community",
    "Board-certified providers perform every treatment with expert precision",
    "Full-service med spa — aesthetics, weight loss, hormones, and wellness under one roof",
    "Convenient downtown Jonesborough location at 120 S Cherokee St",
    "Same luxury experience and provider team as our Kingsport location",
    "8,000+ patients treated across both locations with outstanding results",
    "Free consultations — no pressure, just honest recommendations tailored to you",
    "Flexible scheduling and easy online booking for busy professionals",
  ],
  nearbyAreas: [
    "Johnson City TN", "Kingsport TN", "Elizabethton TN", "Erwin TN",
    "Greeneville TN", "Gray TN", "Limestone TN", "Telford TN",
    "Fall Branch TN", "Chuckey TN", "Unicoi TN",
  ],
  primaryLocation: {
    city: "Jonesborough",
    address: "120 South Cherokee St",
    zip: "Jonesborough, TN 37659",
    phone: "(423) 646-2169",
    tel: "423-646-2169",
    directions: "https://maps.google.com/?q=120+South+Cherokee+St+Jonesborough+TN",
  },
  secondaryLocation: {
    city: "Kingsport",
    address: "1309 South John B Dennis Hwy, Suite 104",
    zip: "Kingsport, TN 37660",
    phone: "(423) 765-1393",
    tel: "423-765-1393",
    directions: "https://maps.google.com/?q=1309+South+John+B+Dennis+Hwy+Suite+104+Kingsport+TN",
    distance: "~25 minutes",
  },
  faqs: [
    {
      q: "Where is Balanced Wellness Med Spa in Jonesborough?",
      a: "We are located at 120 South Cherokee Street in historic downtown Jonesborough, TN 37659. Convenient parking is available nearby, and we are just minutes from Johnson City.",
    },
    {
      q: "What services does the Jonesborough med spa offer?",
      a: "Our Jonesborough location offers Botox, Dysport, Daxxify, dermal fillers, CO2 laser resurfacing, RF microneedling, IV therapy, medical weight loss (Semaglutide and Tirzepatide), hormone optimization, skin rejuvenation, and VIP memberships.",
    },
    {
      q: "How far is the Jonesborough med spa from Johnson City?",
      a: "Our Jonesborough clinic is approximately 10–15 minutes from downtown Johnson City, making it the most convenient med spa for Johnson City and Washington County residents.",
    },
    {
      q: "Do you offer CO2 laser resurfacing in Jonesborough?",
      a: "Yes, our Jonesborough location offers advanced CO2 laser resurfacing for deep wrinkles, acne scars, sun damage, and overall skin texture improvement. Schedule a free consultation to see if CO2 laser is right for you.",
    },
    {
      q: "What is the phone number for the Jonesborough location?",
      a: "You can reach our Jonesborough med spa at (423) 646-2169. You can also book online anytime through our website.",
    },
    {
      q: "Do you offer IV therapy in Jonesborough?",
      a: "Yes, we offer custom IV therapy infusions at our Jonesborough location including hydration drips, vitamin infusions, NAD+, and immunity boosters. IV therapy sessions typically take 30–60 minutes.",
    },
  ],
  relatedLinks: [
    { name: "Botox in Kingsport TN", path: "/botox-kingsport-tn", desc: "Neurotoxin treatments at both locations." },
    { name: "CO2 Laser Kingsport TN", path: "/laser-skin-rejuvenation-kingsport-tn", desc: "Advanced laser resurfacing." },
    { name: "RF Microneedling", path: "/rf-microneedling-kingsport-tn", desc: "Deep collagen remodeling treatment." },
    { name: "Medical Weight Loss", path: "/medical-weight-loss-kingsport-tn", desc: "Semaglutide weight loss programs." },
    { name: "Kingsport Med Spa", path: "/kingsport-med-spa", desc: "Our Kingsport location." },
    { name: "VIP Memberships", path: "/memberships", desc: "Membership benefits at both locations." },
  ],
};

export default function JonesboroughMedSpa() {
  return <LocalSEOPage {...data} />;
}
