import { LocalSEOPage } from "@/components/LocalSEOPage";

const data = {
  seo: {
    title: "Medical Spa Jonesborough TN | Balanced Wellness Medical Spa",
    description: "Medical spa in Jonesborough TN — Balanced Wellness offers Botox, fillers, laser treatments, medical weight loss, and hormone therapy. Located at 120 S Cherokee St. Free consultations.",
    keywords: "medical spa Jonesborough TN, med spa Jonesborough Tennessee, aesthetic clinic Jonesborough TN, Botox Jonesborough TN, cosmetic treatments Jonesborough, wellness clinic Jonesborough Tennessee",
  },
  hero: {
    badge: "Jonesborough, Tennessee • Historic Downtown",
    h1: "Medical Spa in Jonesborough TN",
    subheadline: "Balanced Wellness Medical Spa in the heart of historic downtown Jonesborough — full-service aesthetics and wellness medicine serving Washington County and the Tri-Cities area.",
  },
  intro: {
    h2: "Jonesborough's Trusted Medical Spa & Wellness Clinic",
    body: [
      "Balanced Wellness Medical Spa is proud to serve the Jonesborough community from our clinic at 120 South Cherokee Street — right in the heart of Tennessee's oldest town. Our Jonesborough location brings the same luxury aesthetic experience and expert medical care as our Kingsport clinic, conveniently serving patients in Washington County and the southern Tri-Cities region.",
      "Whether you're a Jonesborough local or driving in from Johnson City, Erwin, or Greeneville, our clinic offers a full range of medical spa services including injectable neurotoxins, dermal fillers, laser skin treatments, medical weight loss, hormone replacement therapy, and wellness programs — all administered by licensed medical professionals.",
      "Jonesborough is Tennessee's oldest incorporated town, and we're honored to be part of its growing community. We believe everyone in Northeast Tennessee deserves access to high-quality, medically supervised aesthetic and wellness care — and that's exactly what we deliver at our South Cherokee Street clinic.",
    ],
  },
  services: [
    { name: "Botox & Neurotoxins", desc: "Botox, Dysport, and Daxxify for natural wrinkle relaxation.", link: "/botox-kingsport-tn" },
    { name: "Lip & Dermal Fillers", desc: "Lip augmentation, cheek filler, and facial contouring.", link: "/lip-filler-kingsport-tn" },
    { name: "IPL Photofacial & Laser", desc: "Sun damage, age spots, and skin tone correction.", link: "/laser-skin-rejuvenation-kingsport-tn" },
    { name: "RF Microneedling", desc: "Collagen remodeling for scars, texture, and tightening.", link: "/rf-microneedling-kingsport-tn" },
    { name: "Skin Tightening", desc: "Non-surgical firming for face and body.", link: "/skin-tightening-kingsport-tn" },
    { name: "Semaglutide Weight Loss", desc: "Physician-supervised GLP-1 weight loss programs.", link: "/medical-weight-loss-kingsport-tn" },
    { name: "Hormone Optimization", desc: "Bioidentical HRT for energy, mood, and vitality.", link: "/hormone-therapy-kingsport-tn" },
    { name: "Wellness & Peptides", desc: "IV therapy, peptide protocols, and longevity programs.", link: "/wellness" },
    { name: "VIP Memberships", desc: "Monthly membership plans for ongoing care.", link: "/memberships" },
  ],
  whyUs: [
    "Locally owned and operated — we're invested in the Jonesborough and Washington County community",
    "Licensed medical providers for all treatments — safety and expertise you can trust",
    "Same luxury experience as our Kingsport flagship — in your neighborhood",
    "Full-service clinic: aesthetics, weight loss, hormones, and wellness under one roof",
    "Convenient location at 120 S Cherokee St in historic downtown Jonesborough",
    "Flexible scheduling including some extended hours for busy professionals",
    "Free consultations — no pressure, just honest recommendations",
    "Serving Jonesborough, Johnson City, Erwin, Greeneville, and Washington County",
  ],
  nearbyAreas: [
    "Johnson City TN", "Kingsport TN", "Elizabethton TN", "Erwin TN",
    "Greeneville TN", "Bristol TN", "Gray TN", "Limestone TN",
    "Fall Branch TN", "Telford TN",
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
      q: "Where is the Jonesborough medical spa located?",
      a: "We are located at 120 South Cherokee Street in historic downtown Jonesborough, TN 37659. Easy to find, with parking available nearby.",
    },
    {
      q: "What treatments are available at the Jonesborough location?",
      a: "Our Jonesborough clinic offers the full range of Balanced Wellness services including Botox, fillers, laser treatments, RF microneedling, medical weight loss, hormone therapy, and wellness programs.",
    },
    {
      q: "How far is the Jonesborough med spa from Johnson City?",
      a: "Our Jonesborough location is approximately 10–15 minutes from downtown Johnson City, making it convenient for Johnson City residents seeking a local medical spa.",
    },
    {
      q: "Do I need an appointment for the Jonesborough clinic?",
      a: "Yes, we require appointments to ensure proper consultation time and provider availability. Call (423) 646-2169 or book online for your complimentary consultation.",
    },
  ],
  relatedLinks: [
    { name: "Botox in Kingsport TN", path: "/botox-kingsport-tn", desc: "Neurotoxin treatments at both locations." },
    { name: "Medical Spa Kingsport TN", path: "/medical-spa-kingsport-tn", desc: "Our Kingsport flagship location." },
    { name: "Weight Loss Clinic Kingsport", path: "/weight-loss-clinic-kingsport-tn", desc: "Semaglutide weight loss programs." },
    { name: "Hormone Therapy Kingsport", path: "/hormone-therapy-kingsport-tn", desc: "Bioidentical HRT programs." },
    { name: "VIP Memberships", path: "/memberships", desc: "Membership benefits at both locations." },
    { name: "Book Consultation", path: "https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505", desc: "Schedule at either location." },
  ],
};

export default function MedicalSpaJonesborough() {
  return <LocalSEOPage {...data} />;
}
