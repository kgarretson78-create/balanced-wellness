import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import {
  Upload,
  Camera,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  Mail,
  User,
  Shield,
  Zap,
  Star,
  RefreshCw,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: "easeOut" },
};

type Step = "hero" | "upload" | "analyzing" | "results" | "lead";

interface SkinConcern {
  label: string;
  score: number;
  severity: "Low" | "Mild" | "Moderate" | "Notable";
  icon: string;
}

interface TreatmentRec {
  name: string;
  desc: string;
  match: number;
  link: string;
}

const CONCERN_POOL: Omit<SkinConcern, "score" | "severity">[] = [
  { label: "Fine Lines & Wrinkles", icon: "🧬" },
  { label: "Skin Texture", icon: "✨" },
  { label: "Pore Size", icon: "🔍" },
  { label: "Redness & Rosacea", icon: "🌹" },
  { label: "Pigmentation & Sun Damage", icon: "☀️" },
  { label: "Skin Firmness & Elasticity", icon: "💎" },
  { label: "Hydration Level", icon: "💧" },
  { label: "Overall Skin Health", icon: "🌟" },
];

const TREATMENT_MAP: Record<string, TreatmentRec[]> = {
  "Fine Lines & Wrinkles": [
    { name: "Botox", desc: "Relaxes dynamic wrinkles for a smoother, refreshed appearance.", match: 95, link: "/botox-kingsport-tn" },
    { name: "Dysport", desc: "Fast-acting neurotoxin ideal for forehead and crow's feet.", match: 90, link: "/dysport-kingsport-tn" },
    { name: "Daxxify", desc: "Next-gen neurotoxin lasting up to 6 months.", match: 85, link: "/daxxify-kingsport-tn" },
  ],
  "Skin Texture": [
    { name: "RF Microneedling", desc: "Deep collagen remodeling for smoother, refined texture.", match: 96, link: "/rf-microneedling-kingsport-tn" },
    { name: "Laser Skin Rejuvenation", desc: "IPL photofacials for tone and texture improvement.", match: 88, link: "/laser-skin-rejuvenation-kingsport-tn" },
  ],
  "Pore Size": [
    { name: "RF Microneedling", desc: "Tightens surrounding tissue to minimize enlarged pores.", match: 94, link: "/rf-microneedling-kingsport-tn" },
    { name: "Laser Skin Rejuvenation", desc: "Resurfaces skin for pore refinement.", match: 82, link: "/laser-skin-rejuvenation-kingsport-tn" },
  ],
  "Redness & Rosacea": [
    { name: "IPL Photofacial", desc: "Targets redness and broken capillaries with light energy.", match: 94, link: "/laser-skin-rejuvenation-kingsport-tn" },
    { name: "Skin Tightening", desc: "Gentle RF energy calms inflammation and builds collagen.", match: 78, link: "/skin-tightening-kingsport-tn" },
  ],
  "Pigmentation & Sun Damage": [
    { name: "Laser Skin Rejuvenation", desc: "Breaks up melanin deposits from sun exposure.", match: 97, link: "/laser-skin-rejuvenation-kingsport-tn" },
    { name: "RF Microneedling", desc: "Stimulates cell turnover for even pigmentation.", match: 83, link: "/rf-microneedling-kingsport-tn" },
  ],
  "Skin Firmness & Elasticity": [
    { name: "Skin Tightening", desc: "Non-surgical RF treatments for visible lifting and firming.", match: 95, link: "/skin-tightening-kingsport-tn" },
    { name: "RF Microneedling", desc: "Deep dermal remodeling for collagen and elastin renewal.", match: 91, link: "/rf-microneedling-kingsport-tn" },
  ],
  "Hydration Level": [
    { name: "IV Therapy", desc: "Direct nutrient and hydration delivery for glowing skin.", match: 90, link: "/wellness" },
    { name: "Lip & Dermal Filler", desc: "HA fillers attract and retain moisture in the skin.", match: 80, link: "/lip-filler-kingsport-tn" },
  ],
  "Overall Skin Health": [
    { name: "Wellness & Peptide Therapy", desc: "Cellular optimization for radiant, healthy skin.", match: 92, link: "/peptide-therapy-kingsport-tn" },
    { name: "VIP Membership", desc: "Ongoing care program for sustained skin health.", match: 88, link: "/memberships" },
  ],
};

function generateResults(): { concerns: SkinConcern[]; treatments: TreatmentRec[] } {
  const severities: SkinConcern["severity"][] = ["Low", "Mild", "Moderate", "Notable"];
  const concerns: SkinConcern[] = CONCERN_POOL.map((c) => {
    const score = Math.floor(Math.random() * 60) + 30;
    const sevIdx = score < 45 ? 0 : score < 60 ? 1 : score < 75 ? 2 : 3;
    return { ...c, score, severity: severities[sevIdx] };
  });
  concerns.sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const treatments: TreatmentRec[] = [];
  for (const c of concerns.slice(0, 4)) {
    const recs = TREATMENT_MAP[c.label] || [];
    for (const r of recs) {
      if (!seen.has(r.name)) {
        seen.add(r.name);
        treatments.push(r);
      }
    }
  }
  treatments.sort((a, b) => b.match - a.match);
  return { concerns, treatments: treatments.slice(0, 6) };
}

function ProgressBar({ step }: { step: Step }) {
  const steps = ["upload", "analyzing", "results", "lead"];
  const labels = ["Upload", "Analysis", "Results", "Connect"];
  const current = steps.indexOf(step);
  return (
    <div className="flex items-center gap-1 max-w-md mx-auto mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full flex items-center">
            <div
              className={`w-full h-1 rounded-full transition-all duration-500 ${
                i <= current ? "bg-primary" : "bg-border"
              }`}
            />
          </div>
          <span
            className={`text-[10px] font-medium transition-colors ${
              i <= current ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size - 6) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 75 ? "hsl(0 33% 65%)" : score >= 60 ? "hsl(0 28% 55%)" : score >= 45 ? "hsl(0 25% 75%)" : "hsl(120 30% 55%)";
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={3} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
      />
      <motion.text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="transform rotate-90 origin-center"
        fill="hsl(var(--foreground))"
        fontSize={size * 0.24}
        fontWeight={700}
        fontFamily="var(--app-font-serif)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {score}
      </motion.text>
    </svg>
  );
}

export default function SkinAnalyzer() {
  const [step, setStep] = useState<Step>("hero");
  const [preview, setPreview] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisLabel, setAnalysisLabel] = useState("");
  const [results, setResults] = useState<ReturnType<typeof generateResults> | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const startAnalysis = useCallback(() => {
    setStep("analyzing");
    setAnalysisProgress(0);
    const labels = [
      "Scanning facial structure...",
      "Analyzing wrinkles & fine lines...",
      "Evaluating skin texture...",
      "Measuring pore density...",
      "Detecting redness patterns...",
      "Assessing pigmentation...",
      "Evaluating skin firmness...",
      "Checking hydration markers...",
      "Generating treatment recommendations...",
      "Finalizing your personalized report...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      const pct = Math.min(Math.round((i / labels.length) * 100), 100);
      setAnalysisProgress(pct);
      setAnalysisLabel(labels[Math.min(i - 1, labels.length - 1)]);
      if (i >= labels.length) {
        clearInterval(interval);
        setTimeout(() => {
          setResults(generateResults());
          setStep("results");
        }, 600);
      }
    }, 650);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAnalyzer = () => {
    setStep("hero");
    setPreview(null);
    setResults(null);
    setAnalysisProgress(0);
    setFormData({ name: "", email: "", phone: "", consent: false });
    setSubmitted(false);
  };

  return (
    <PageLayout>
      <SEO
        title="AI Skin Analyzer | KelliAI | Balanced Wellness Medical Spa"
        description="Upload a selfie and receive AI-powered personalized skincare and treatment recommendations from KelliAI at Balanced Wellness Medical Spa in Kingsport TN."
        keywords="AI skin analysis Kingsport TN, skin analyzer medical spa, KelliAI skin tool, personalized skincare recommendations, skin assessment Tri-Cities TN"
      />

      {/* Hero */}
      <AnimatePresence mode="wait">
        {step === "hero" && (
          <motion.section
            key="hero"
            {...fadeUp}
            className="relative pt-28 pb-20 overflow-hidden"
          >
            <div className="absolute inset-0 luxury-gradient" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-champagne/30 blur-3xl" />
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4" />
                Powered by KelliAI
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-5">
                AI Skin Analysis
                <span className="block text-gradient-gold mt-1">by KelliAI</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
                Upload a selfie and receive personalized skincare and treatment recommendations from our AI aesthetic assistant.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep("upload")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors text-lg"
              >
                <Camera className="w-5 h-5" />
                Start Skin Analysis
              </motion.button>
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                  { icon: <Camera className="w-5 h-5" />, label: "Upload Selfie" },
                  { icon: <Zap className="w-5 h-5" />, label: "AI Analysis" },
                  { icon: <Star className="w-5 h-5" />, label: "Get Results" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/80 border border-border flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <span className="text-xs text-foreground/50 font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Upload Step */}
        {step === "upload" && (
          <motion.section key="upload" {...fadeUp} className="pt-28 pb-20 bg-background">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProgressBar step="upload" />
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">Upload Your Selfie</h2>
                <p className="text-foreground/60 text-sm max-w-md mx-auto">
                  Upload a clear photo of your face in natural lighting without makeup for the most accurate analysis.
                </p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              {!preview ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/[0.02] transition-all"
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const f = e.dataTransfer.files[0];
                    if (f) handleFile(f);
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Upload className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground mb-1">Tap to upload or drag & drop</p>
                  <p className="text-xs text-foreground/50">JPG, PNG up to 10MB</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
                    <img src={preview} alt="Your selfie" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/20 ring-inset" />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => { setPreview(null); fileRef.current?.click(); }}
                      className="px-5 py-2.5 text-sm font-medium text-foreground border border-border rounded-full hover:bg-secondary transition-colors"
                    >
                      Choose Different
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={startAnalysis}
                      className="px-7 py-2.5 text-sm font-semibold text-white bg-primary rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      Analyze My Skin <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
              <div className="mt-8 flex items-start gap-2 bg-secondary rounded-xl p-4 border border-border">
                <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/55 leading-relaxed">
                  Your photo is processed locally and is not stored on our servers. We respect your privacy — your image is used solely for this analysis session and is discarded immediately.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Analyzing Step */}
        {step === "analyzing" && (
          <motion.section key="analyzing" {...fadeUp} className="pt-28 pb-20 bg-background">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProgressBar step="analyzing" />
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-8">
                  {preview && (
                    <img src={preview} alt="Analyzing" className="w-full h-full object-cover rounded-full border-2 border-primary/20" />
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/40"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-champagne/40"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                      <Sparkles className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-3">KelliAI is Analyzing Your Skin</h2>
                <p className="text-sm text-foreground/50 mb-8 h-5">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={analysisLabel}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {analysisLabel}
                    </motion.span>
                  </AnimatePresence>
                </p>
                <div className="max-w-sm mx-auto mb-3">
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-champagne"
                      animate={{ width: `${analysisProgress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <p className="text-xs text-primary font-semibold">{analysisProgress}%</p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Results Step */}
        {step === "results" && results && (
          <motion.section key="results" {...fadeUp} className="pt-28 pb-16 bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProgressBar step="results" />
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">Your Skin Analysis Results</h2>
                <p className="text-foreground/55 text-sm">Personalized assessment powered by KelliAI</p>
              </div>

              {/* Skin Concern Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {results.concerns.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="bg-white rounded-xl border border-border p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                  >
                    <ScoreRing score={c.score} size={52} />
                    <p className="text-xs font-bold text-foreground mt-2.5 leading-tight">{c.label}</p>
                    <span
                      className={`mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        c.severity === "Notable"
                          ? "bg-primary/10 text-primary"
                          : c.severity === "Moderate"
                          ? "bg-accent/10 text-accent"
                          : c.severity === "Mild"
                          ? "bg-champagne/30 text-foreground/70"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {c.severity}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Treatment Recommendations */}
              <div className="mb-10">
                <div className="text-center mb-6">
                  <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-1">Recommended For You</p>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                    Personalized Treatment Recommendations
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.treatments.map((t, i) => (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                    >
                      <Link
                        href={t.link}
                        className="group block bg-white rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all h-full"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                            {t.match}% Match
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <h4 className="font-bold text-foreground text-sm mb-1">{t.name}</h4>
                        <p className="text-xs text-foreground/55 leading-relaxed">{t.desc}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA to Lead */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep("lead")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                >
                  Get Your Full Report & Consultation
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <p className="text-xs text-foreground/40 mt-3">Share your info so our team can prepare your personalized plan</p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Lead Capture Step */}
        {step === "lead" && (
          <motion.section key="lead" {...fadeUp} className="pt-28 pb-20 bg-background">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProgressBar step="lead" />

              {!submitted ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
                      Receive Your Personalized Plan
                    </h2>
                    <p className="text-foreground/60 text-sm">
                      Share your details and our team will prepare a customized consultation based on your AI skin analysis.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-7 shadow-sm space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                        <User className="w-3.5 h-3.5 text-primary" /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                        <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                        <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                        placeholder="(423) 555-0100"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData((d) => ({ ...d, consent: e.target.checked }))}
                        className="mt-0.5 accent-primary"
                      />
                      <span className="text-xs text-foreground/55 leading-relaxed">
                        I consent to receive SMS/text messages from Balanced Wellness Medical Spa regarding my consultation and appointment. Message & data rates may apply. Reply STOP to opt out.
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Submit & Book My Consultation <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center bg-white rounded-2xl border border-border p-10 shadow-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-3">You're All Set, {formData.name.split(" ")[0]}!</h2>
                  <p className="text-foreground/60 text-sm mb-8 max-w-sm mx-auto">
                    Our team will review your AI skin analysis and reach out within 24 hours to schedule your personalized consultation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Book Your Personalized Consultation
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3 text-foreground font-semibold rounded-full border border-border hover:bg-secondary transition-colors"
                    >
                      Explore Recommended Treatments
                    </Link>
                  </div>
                  <button
                    onClick={resetAnalyzer}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" /> Start a New Analysis
                  </button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Disclaimer */}
      <div className="bg-secondary border-t border-border py-6">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Disclaimer</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This AI skin analysis is informational only and does not replace a professional in-person consultation. Results are generated by an algorithm and should not be considered a medical diagnosis. For a comprehensive evaluation, please schedule an appointment with our board-certified providers at Balanced Wellness Medical Spa.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
