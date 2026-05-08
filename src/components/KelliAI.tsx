import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles, Calendar, Camera, ArrowRight, User, Mail, Phone, CheckCircle2, RotateCcw, Aperture, Upload, Volume2, Loader2 } from "lucide-react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  buttons?: ActionButton[];
  quickReplies?: string[];
  showLeadForm?: boolean;
  skinResults?: SkinAnalysisResult;
  selfieImage?: string;
  previewImage?: string;
  beforeImage?: string;
  previewTreatment?: string;
  streaming?: boolean;
}

interface ActionButton {
  label: string;
  icon?: "calendar" | "camera" | "arrow";
  action: string;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  smsConsent: boolean;
}

interface SkinConcern {
  label: string;
  score: number;
  severity: "Low" | "Mild" | "Moderate" | "Notable";
  emoji: string;
}

interface TreatmentRec {
  name: string;
  match: number;
}

interface SkinAnalysisResult {
  overallScore: number;
  concerns: SkinConcern[];
  topTreatments: TreatmentRec[];
}

const treatmentKnowledge: Record<string, { info: string; link: string }> = {
  botox: {
    info: "Botox is our most popular injectable treatment for smoothing forehead lines, crow's feet, and frown lines. Results appear within 3-5 days and last 3-4 months. Quick 15-minute treatment with no downtime. We also offer Dysport and Daxxify as alternatives.",
    link: "/injectables",
  },
  dysport: {
    info: "Dysport is a fast-acting neurotoxin similar to Botox, often preferred for larger treatment areas like the forehead. It tends to spread more naturally and results can appear within 2-3 days. Great for patients who want a softer, more natural look.",
    link: "/seo/dysport-kingsport-tn",
  },
  daxxify: {
    info: "Daxxify is the newest FDA-approved neurotoxin that lasts up to 6 months — nearly twice as long as traditional Botox! It uses a unique peptide technology instead of human or animal byproducts. Perfect for patients who want longer-lasting results with fewer visits.",
    link: "/seo/daxxify-kingsport-tn",
  },
  filler: {
    info: "Dermal fillers restore volume, enhance contours, and smooth deep lines using hyaluronic acid. We offer lip enhancement, cheek augmentation, jawline contouring, and nasolabial fold treatment. Results are immediate and last 6-18 months depending on the area.",
    link: "/seo/lip-filler-kingsport-tn",
  },
  lip: {
    info: "Our lip filler treatments use premium hyaluronic acid fillers to add natural-looking volume, define the lip border, and smooth lip lines. Each treatment is customized to your facial proportions for beautifully balanced results. Lasts 6-12 months.",
    link: "/seo/lip-filler-kingsport-tn",
  },
  microneedling: {
    info: "RF Microneedling combines tiny needles with radiofrequency energy to stimulate collagen production deep in your skin. It's excellent for acne scars, large pores, fine lines, and overall skin texture. Most patients see dramatic improvement after 3 sessions.",
    link: "/seo/rf-microneedling-kingsport-tn",
  },
  laser: {
    info: "Our laser skin rejuvenation treatments address sun damage, pigmentation, redness, and uneven skin tone. We use advanced laser technology for photofacials, skin resurfacing, and vascular treatments. Results improve with each session for luminous, even-toned skin.",
    link: "/seo/laser-skin-rejuvenation-kingsport-tn",
  },
  "weight loss": {
    info: "Our medical weight loss programs include Semaglutide (Wegovy/Ozempic) and Tirzepatide (Mounjaro), combined with metabolic testing, nutritional coaching, and ongoing medical supervision. Patients typically lose 15-20% of body weight. Programs are fully personalized.",
    link: "/seo/medical-weight-loss-kingsport-tn",
  },
  semaglutide: {
    info: "Semaglutide (the active ingredient in Wegovy and Ozempic) is a GLP-1 receptor agonist that reduces appetite and helps regulate blood sugar. When combined with our medical supervision and lifestyle coaching, patients see significant, sustainable weight loss results.",
    link: "/seo/medical-weight-loss-kingsport-tn",
  },
  hormone: {
    info: "Our hormone optimization programs use bioidentical hormone replacement therapy (BHRT) to restore balance in testosterone, estrogen, progesterone, and thyroid hormones. We start with comprehensive lab panels and create personalized treatment protocols for optimal vitality.",
    link: "/seo/hormone-therapy-kingsport-tn",
  },
  peptide: {
    info: "Peptide therapy uses specific amino acid chains to support anti-aging, muscle recovery, immune function, sleep quality, and cellular repair. Popular peptides include BPC-157, CJC-1295, and Thymosin Alpha-1. These are part of our longevity and wellness programs.",
    link: "/seo/peptide-therapy-kingsport-tn",
  },
  "skin tightening": {
    info: "Our non-surgical skin tightening treatments use radiofrequency and ultrasound energy to stimulate collagen production and tighten loose skin. Effective for the face, neck, jawline, and body. Results develop gradually over 2-3 months as new collagen forms.",
    link: "/seo/skin-tightening-kingsport-tn",
  },
};

const concernMap: Record<string, { treatments: string[]; response: string }> = {
  wrinkle: {
    treatments: ["Botox", "Dysport", "Daxxify"],
    response: "For wrinkles and fine lines, I'd recommend our neurotoxin treatments. Botox is our most popular option, but Dysport offers a softer spread and Daxxify lasts up to 6 months!",
  },
  "fine line": {
    treatments: ["Botox", "RF Microneedling", "Laser Skin Rejuvenation"],
    response: "Fine lines respond beautifully to neurotoxins like Botox for expression lines, or RF Microneedling and laser treatments for overall skin texture improvement.",
  },
  acne: {
    treatments: ["RF Microneedling", "Laser Skin Rejuvenation", "Chemical Peel"],
    response: "For acne scars and texture concerns, RF Microneedling is outstanding — it stimulates deep collagen renewal. Laser treatments can also dramatically improve scarring and uneven texture.",
  },
  scar: {
    treatments: ["RF Microneedling", "Laser Skin Rejuvenation"],
    response: "Scars respond very well to RF Microneedling, which remodels the skin from within. Laser resurfacing is another excellent option for smoothing scar tissue and evening out skin texture.",
  },
  texture: {
    treatments: ["RF Microneedling", "Laser Skin Rejuvenation", "Chemical Peel"],
    response: "For skin texture improvement, RF Microneedling is one of our most effective treatments. It creates micro-channels that trigger your body's natural collagen production for smoother, refined skin.",
  },
  volume: {
    treatments: ["Dermal Fillers", "Lip Filler", "Cheek Filler"],
    response: "For volume restoration, dermal fillers are the gold standard. We can enhance lips, restore cheek volume, define the jawline, and smooth deep folds — all with beautiful, natural-looking results.",
  },
  lip: {
    treatments: ["Lip Filler"],
    response: "Our lip filler treatments use premium hyaluronic acid to create natural-looking volume and definition. Each treatment is fully customized to complement your unique facial features.",
  },
  aging: {
    treatments: ["Botox", "Dermal Fillers", "RF Microneedling", "Hormone Optimization"],
    response: "Anti-aging is our specialty! We take a comprehensive approach combining neurotoxins, fillers, skin treatments, and even hormone optimization for results that go beyond the surface.",
  },
  weight: {
    treatments: ["Medical Weight Loss (Semaglutide/Tirzepatide)"],
    response: "Our medical weight loss programs are medically supervised and include GLP-1 medications like Semaglutide and Tirzepatide. Most patients see significant results within the first month.",
  },
  tired: {
    treatments: ["Hormone Optimization", "Peptide Therapy", "IV Therapy"],
    response: "Fatigue often points to hormonal imbalances. Our hormone optimization programs start with comprehensive lab testing to identify the root cause, then create a personalized protocol to restore your energy and vitality.",
  },
  energy: {
    treatments: ["Hormone Optimization", "Peptide Therapy"],
    response: "Low energy is one of the most common concerns we hear. It often relates to hormone levels, nutritional deficiencies, or metabolic health. Let's explore testing to find the right solution for you.",
  },
  sun: {
    treatments: ["Laser Skin Rejuvenation (IPL)", "Chemical Peel"],
    response: "Sun damage and dark spots respond beautifully to our IPL photofacial treatments. They target pigmentation at the source, leaving you with clearer, more even-toned skin after just a few sessions.",
  },
  spot: {
    treatments: ["Laser Skin Rejuvenation (IPL)", "Chemical Peel"],
    response: "Dark spots and hyperpigmentation can be effectively treated with our laser photofacial and professional chemical peel treatments. We'll customize the approach based on your specific pigmentation concerns.",
  },
  sagging: {
    treatments: ["Skin Tightening", "RF Microneedling", "Dermal Fillers"],
    response: "For sagging or loose skin, we have several non-surgical options including radiofrequency skin tightening, RF microneedling for collagen stimulation, and strategic filler placement for a lifted appearance.",
  },
  loose: {
    treatments: ["Skin Tightening", "RF Microneedling"],
    response: "Loose skin can be effectively tightened without surgery using our radiofrequency treatments. These stimulate your body's own collagen production for gradual, natural-looking firming over 2-3 months.",
  },
  pore: {
    treatments: ["RF Microneedling", "Laser Skin Rejuvenation"],
    response: "Large pores are one of the top concerns RF Microneedling addresses. The combination of micro-needles and radiofrequency energy tightens pore walls and refines skin texture beautifully.",
  },
};

const actionButtons: ActionButton[] = [
  { label: "Book Consultation", icon: "calendar", action: "book" },
  { label: "Take AI Skin Analysis", icon: "camera", action: "skin-analyzer" },
  { label: "View Treatments", icon: "arrow", action: "services" },
];

let messageIdCounter = 1;

function generateSkinAnalysis(): SkinAnalysisResult {
  const concernPool = [
    { label: "Fine Lines & Wrinkles", emoji: "\ud83e\uddec" },
    { label: "Skin Texture", emoji: "\u2728" },
    { label: "Pore Size", emoji: "\ud83d\udd0d" },
    { label: "Redness & Rosacea", emoji: "\ud83c\udf39" },
    { label: "Pigmentation & Sun Damage", emoji: "\u2600\ufe0f" },
    { label: "Skin Firmness", emoji: "\ud83d\udc8e" },
    { label: "Hydration Level", emoji: "\ud83d\udca7" },
    { label: "Overall Skin Health", emoji: "\ud83c\udf1f" },
  ];

  const severities: SkinConcern["severity"][] = ["Low", "Mild", "Moderate", "Notable"];
  const concerns: SkinConcern[] = concernPool.map((c) => {
    const score = Math.floor(Math.random() * 55) + 35;
    const sevIdx = score < 45 ? 0 : score < 60 ? 1 : score < 75 ? 2 : 3;
    return { ...c, score, severity: severities[sevIdx] };
  });
  concerns.sort((a, b) => b.score - a.score);

  const treatmentPool = [
    { name: "Botox / Dysport", match: 0 },
    { name: "RF Microneedling", match: 0 },
    { name: "Laser Rejuvenation", match: 0 },
    { name: "Dermal Fillers", match: 0 },
    { name: "Skin Tightening", match: 0 },
    { name: "IV Therapy", match: 0 },
  ];
  const topTreatments = treatmentPool
    .map((t) => ({ ...t, match: Math.floor(Math.random() * 25) + 75 }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  const overallScore = Math.floor(concerns.reduce((sum, c) => sum + c.score, 0) / concerns.length);

  return { overallScore, concerns: concerns.slice(0, 5), topTreatments };
}

const voiceUrlCache = new Map<number, string>();
let activeAudio: HTMLAudioElement | null = null;
let activeAudioCleanup: (() => void) | null = null;
const VOICE_CACHE_MAX = 30;
function setVoiceCache(id: number, url: string) {
  if (voiceUrlCache.size >= VOICE_CACHE_MAX) {
    const oldest = voiceUrlCache.keys().next().value;
    if (oldest !== undefined) {
      const oldUrl = voiceUrlCache.get(oldest);
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      voiceUrlCache.delete(oldest);
    }
  }
  voiceUrlCache.set(id, url);
}
export function clearKelliVoiceCache() {
  if (activeAudioCleanup) activeAudioCleanup();
  for (const url of voiceUrlCache.values()) URL.revokeObjectURL(url);
  voiceUrlCache.clear();
}

function VoicePlayButton({ text, messageId }: { text: string; messageId: number }) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const localAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (localAudioRef.current && activeAudio === localAudioRef.current) {
        if (activeAudioCleanup) activeAudioCleanup();
      }
    };
  }, []);

  const stopActive = () => {
    if (activeAudioCleanup) activeAudioCleanup();
    activeAudioCleanup = null;
    activeAudio = null;
  };

  const handleClick = async () => {
    if (state === "playing" && localAudioRef.current) {
      stopActive();
      setState("idle");
      return;
    }
    if (state === "loading") return;

    try {
      let url = voiceUrlCache.get(messageId);
      if (!url) {
        setState("loading");
        const apiBase = (import.meta as any).env?.VITE_API_URL || "/api";
        const resp = await fetch(`${apiBase}/kelliai/voice`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (!resp.ok) throw new Error("Voice failed");
        const blob = await resp.blob();
        url = URL.createObjectURL(blob);
        setVoiceCache(messageId, url);
      }
      stopActive();
      const audio = new Audio(url);
      localAudioRef.current = audio;
      activeAudio = audio;
      const onDone = () => {
        setState("idle");
        activeAudio = null;
        activeAudioCleanup = null;
      };
      audio.onended = onDone;
      audio.onerror = onDone;
      activeAudioCleanup = () => {
        audio.onended = null;
        audio.onerror = null;
        audio.pause();
        audio.currentTime = 0;
        setState("idle");
      };
      setState("playing");
      await audio.play();
    } catch (err) {
      console.error("Voice playback error:", err);
      setState("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={state === "playing" ? "Stop voice" : "Play voice"}
      className="shrink-0 w-7 h-7 rounded-full bg-white border border-primary/30 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors shadow-sm"
    >
      {state === "loading" ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Volume2 className={`w-3.5 h-3.5 ${state === "playing" ? "animate-pulse" : ""}`} />
      )}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary/50 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function ActionButtonsRow({ buttons, onAction }: { buttons: ActionButton[]; onAction: (action: string) => void }) {
  const iconMap = {
    calendar: <Calendar className="w-3.5 h-3.5" />,
    camera: <Camera className="w-3.5 h-3.5" />,
    arrow: <ArrowRight className="w-3.5 h-3.5" />,
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      {buttons.map((btn) => (
        <button
          key={btn.action}
          onClick={() => onAction(btn.action)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-primary/20 rounded-xl text-sm font-medium text-foreground transition-all hover:shadow-sm text-left"
        >
          {btn.icon && <span className="text-primary">{iconMap[btn.icon]}</span>}
          {btn.label}
        </button>
      ))}
    </div>
  );
}

function SkinResultsCard({ results }: { results: SkinAnalysisResult }) {
  const scoreColor = results.overallScore >= 70 ? "text-green-600" : results.overallScore >= 50 ? "text-primary" : "text-accent";

  return (
    <div className="bg-gradient-to-br from-secondary/80 to-white border border-border rounded-xl p-3 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <span className={`text-xl font-bold ${scoreColor}`}>{results.overallScore}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground/80">Overall Skin Score</p>
          <p className="text-[11px] text-foreground/50">AI-powered analysis</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wider">Top Concerns</p>
        {results.concerns.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="text-xs">{c.emoji}</span>
            <span className="text-xs text-foreground/70 flex-1">{c.label}</span>
            <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${c.score}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <span className="text-[10px] font-medium text-foreground/50 w-8 text-right">{c.score}%</span>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wider">Recommended Treatments</p>
        {results.topTreatments.map((t) => (
          <div key={t.name} className="flex items-center justify-between bg-primary/5 rounded-lg px-2.5 py-1.5">
            <span className="text-xs font-medium text-foreground/80">{t.name}</span>
            <span className="text-[10px] font-semibold text-primary">{t.match}% match</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelfieCameraView({ onCapture, onCancel }: { onCapture: (imageData: string) => void; onCancel: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        });
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch {
        if (mounted) setCameraError(true);
      }
    };
    startCamera();
    return () => {
      mounted = false;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capturePhoto = useCallback(() => {
    setCountdown(3);
    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(interval);
        setCountdown(null);
        if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          const MAX = 1024;
          const scale = Math.min(1, MAX / Math.max(video.videoWidth, video.videoHeight));
          canvas.width = Math.round(video.videoWidth * scale);
          canvas.height = Math.round(video.videoHeight * scale);
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/jpeg", 0.85);
            stream?.getTracks().forEach((t) => t.stop());
            onCapture(imageData);
          }
        }
      } else {
        setCountdown(count);
      }
    }, 700);
  }, [stream, onCapture]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      stream?.getTracks().forEach((t) => t.stop());
      onCapture(imageData);
    };
    reader.readAsDataURL(file);
  }, [stream, onCapture]);

  if (cameraError) {
    return (
      <div className="bg-secondary/80 border border-border rounded-xl p-4 space-y-3">
        <div className="text-center">
          <Camera className="w-8 h-8 text-primary/40 mx-auto mb-2" />
          <p className="text-xs font-semibold text-foreground/70">Camera not available</p>
          <p className="text-[11px] text-foreground/50 mt-1">You can upload a selfie instead!</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Selfie
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2.5 bg-border/50 text-foreground/60 text-xs font-medium rounded-lg hover:bg-border transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary/80 border border-border rounded-xl overflow-hidden">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full aspect-[4/3] object-cover rounded-t-xl"
          style={{ transform: "scaleX(-1)" }}
        />
        <canvas ref={canvasRef} className="hidden" />

        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30"
            >
              <span className="text-5xl font-bold text-white drop-shadow-lg">{countdown}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-white font-medium">Live</span>
        </div>
      </div>

      <div className="p-2.5 flex gap-2">
        <button
          onClick={capturePhoto}
          disabled={countdown !== null}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Aperture className="w-4 h-4" />
          {countdown !== null ? "Get ready..." : "Take Selfie"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2.5 bg-border/50 text-foreground/60 text-xs font-medium rounded-lg hover:bg-border transition-colors"
          title="Upload photo instead"
        >
          <Upload className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            stream?.getTracks().forEach((t) => t.stop());
            onCancel();
          }}
          className="px-3 py-2.5 bg-border/50 text-foreground/60 text-xs font-medium rounded-lg hover:bg-border transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function AnalyzingAnimation() {
  const steps = ["Mapping facial zones...", "Analyzing skin texture...", "Detecting concerns...", "Generating treatment plan..."];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary/80 border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent"
        />
        <div>
          <p className="text-xs font-semibold text-foreground/80">Analyzing your skin...</p>
          <p className="text-[11px] text-foreground/50">AI-powered assessment</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= step ? 1 : 0.3, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center gap-2"
          >
            {i <= step ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            ) : (
              <div className="w-3.5 h-3.5 rounded-full border border-border" />
            )}
            <span className="text-[11px] text-foreground/60">{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  treatment,
}: {
  beforeSrc?: string;
  afterSrc: string;
  treatment?: string;
}) {
  const [view, setView] = useState<"side" | "before" | "after">("side");
  const label = treatment ? treatment.charAt(0).toUpperCase() + treatment.slice(1) : "Treatment";

  return (
    <div className="space-y-2">
      {beforeSrc && (
        <div className="inline-flex bg-secondary/60 rounded-full p-0.5 gap-0.5">
          {(["side", "before", "after"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-full transition-all ${
                view === v ? "bg-primary text-white shadow-sm" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {v === "side" ? "Side by Side" : v === "before" ? "Before" : "After"}
            </button>
          ))}
        </div>
      )}

      {view === "side" && beforeSrc ? (
        <div className="flex gap-1.5 max-w-[300px]">
          <div className="relative flex-1 rounded-xl overflow-hidden border-2 border-foreground/10 bg-secondary/40">
            <img src={beforeSrc} alt="Before" className="w-full aspect-square object-cover" />
            <div className="absolute top-1.5 left-1.5 bg-foreground/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
              Before
            </div>
          </div>
          <div className="relative flex-1 rounded-xl overflow-hidden border-2 border-primary/40 bg-secondary/40">
            <img src={afterSrc} alt={`${label} after`} className="w-full aspect-square object-cover" />
            <div className="absolute top-1.5 left-1.5 bg-primary text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
              ✨ After
            </div>
          </div>
        </div>
      ) : view === "before" && beforeSrc ? (
        <div className="relative rounded-xl overflow-hidden border-2 border-foreground/10 bg-secondary/40 max-w-[280px]">
          <img src={beforeSrc} alt="Before" className="w-full object-cover" />
          <div className="absolute top-1.5 left-1.5 bg-foreground/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
            Before
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border-2 border-primary/40 bg-secondary/40 max-w-[280px]">
          <img src={afterSrc} alt={`${label} simulation`} className="w-full object-cover" />
          <div className="absolute top-1.5 left-1.5 bg-primary text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
            ✨ AI Simulation
          </div>
        </div>
      )}
    </div>
  );
}

function GeneratingPreviewAnimation() {
  const steps = [
    "Reading your selfie...",
    "Mapping facial features...",
    "Applying treatment simulation...",
    "Rendering before & after...",
    "Almost there — this can take up to a minute ✨",
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary/80 border border-primary/30 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent"
        />
        <div>
          <p className="text-xs font-semibold text-foreground/80">Generating your before & after...</p>
          <p className="text-[11px] text-foreground/50">AI image preview · ~30–90 seconds</p>
        </div>
      </div>
      <p className="text-[11px] text-foreground/60 italic">{steps[step]}</p>
    </div>
  );
}

function LeadCaptureForm({ onSubmit }: { onSubmit: (data: LeadData) => void }) {
  const [formData, setFormData] = useState<LeadData>({ name: "", email: "", phone: "", smsConsent: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    onSubmit(formData);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
      >
        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-green-800">Thank you!</p>
        <p className="text-xs text-green-600 mt-1">We'll be in touch soon to help you on your wellness journey.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-secondary/80 border border-border rounded-xl p-4 space-y-3"
    >
      <p className="text-xs font-semibold text-foreground/80 mb-0.5">💗 Want me as your personal coach?</p>
      <p className="text-[11px] text-foreground/60 mb-1">Drop your info and I'll be here anytime — day or night — to guide you. Our team will also reach out with a free consult time.</p>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/40" />
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/40" />
        <input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/40" />
        <input
          type="tel"
          placeholder="Phone number"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.smsConsent}
          onChange={(e) => setFormData(prev => ({ ...prev, smsConsent: e.target.checked }))}
          className="mt-0.5 accent-primary"
        />
        <span className="text-[11px] text-foreground/50 leading-tight">
          I consent to receive SMS messages from Balanced Wellness Medical Spa. Message & data rates may apply. Reply STOP to opt out.
        </span>
      </label>
      <button
        type="submit"
        className="w-full py-2.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Get Connected
      </button>
    </motion.form>
  );
}

export function KelliAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [generatingPreview, setGeneratingPreview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const pendingPromptRef = useRef<string | null>(null);

  useEffect(() => {
    const handleAskKelli = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.prompt) {
        pendingPromptRef.current = detail.prompt;
      }
      setIsOpen(true);
    };
    window.addEventListener('askKelliAI', handleAskKelli);
    return () => window.removeEventListener('askKelliAI', handleAskKelli);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const openingMsg: Message = {
        id: messageIdCounter++,
        from: "bot",
        text: "Hey love! 💗 I'm KelliAI, your personal wellness coach at Balanced Wellness.\n\nI'm here to listen, answer your questions, analyze your skin, and even show you a glimpse of how treatments could look on YOU. Tell me — what's on your heart today?",
        quickReplies: [
          "Analyze my skin (selfie)",
          "Show me what filler would look like",
          "Help me lose weight",
          "What treatments do you offer?",
          "Book a consultation",
        ],
      };
      setMessages([openingMsg]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showCamera, analyzing, scrollToBottom]);

  const addBotMessage = useCallback((text: string, extras?: Partial<Message>) => {
    setIsTyping(true);
    const typingDelay = Math.min(800 + text.length * 8, 2000);
    setTimeout(() => {
      setIsTyping(false);
      const msg: Message = {
        id: messageIdCounter++,
        from: "bot",
        text,
        ...extras,
      };
      setMessages(prev => [...prev, msg]);
    }, typingDelay);
  }, []);

  const conversationRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  const streamAIResponse = useCallback(async (userText: string) => {
    conversationRef.current.push({ role: "user", content: userText });
    const msgId = messageIdCounter++;
    setIsTyping(true);
    setMessages(prev => [...prev, { id: msgId, from: "bot", text: "", streaming: true }]);

    try {
      const apiBase = (import.meta as any).env?.VITE_API_URL || "/api";
      const resp = await fetch(`${apiBase}/kelliai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationRef.current.slice(-20), mode: "general" }),
      });
      if (!resp.ok || !resp.body) throw new Error("AI failed");
      setIsTyping(false);
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              acc += data.content;
              setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: acc } : m));
            }
          } catch {}
        }
      }
      conversationRef.current.push({ role: "assistant", content: acc });
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, streaming: false, buttons: actionButtons } : m));
    } catch {
      setIsTyping(false);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, streaming: false, text: "Sorry love, I had a hiccup connecting. Try asking again, or tap below to book a free consult and I'll have our team reach out personally. 💗", buttons: actionButtons } : m));
    }
  }, []);

  const processUserMessage = useCallback((userText: string) => {
    const lower = userText.toLowerCase();

    setInteractionCount(prev => prev + 1);
    if (!hasInteracted) setHasInteracted(true);

    if (lower.includes("preview") || lower.includes("what would i look") || lower.includes("show me what") || lower.includes("see myself") || (lower.includes("look like") && (lower.includes("filler") || lower.includes("botox") || lower.includes("laser") || lower.includes("weight")))) {
      addBotMessage("Yes! Let's do it 💗 I can show you a simulated preview of how a treatment could look on YOU. Pick what you want to try, then take a selfie:", {
        buttons: [
          { label: "💋 Lip Filler Preview", icon: "camera", action: "preview-lipfiller" },
          { label: "✨ Cheek Filler Preview", icon: "camera", action: "preview-cheekfiller" },
          { label: "💉 Botox Preview", icon: "camera", action: "preview-botox" },
          { label: "🌟 Laser Glow Preview", icon: "camera", action: "preview-laser" },
          { label: "⚖️ Weight Loss Preview", icon: "camera", action: "preview-weightloss" },
        ],
      });
      return;
    }

    if (lower.includes("selfie") || lower.includes("skin anal") || lower.includes("analyze my") || lower.includes("skin scan") || lower.includes("photo") || lower.includes("take a pic")) {
      addBotMessage("Yes! Let's do a quick AI skin analysis together 💗 I'll open the camera, you take a selfie, and I'll walk you through what I see and which treatments would help most.", {
        buttons: [{ label: "Open Camera for Skin Analysis", icon: "camera", action: "start-selfie" }],
      });
      return;
    }

    const treatmentKey = Object.keys(treatmentKnowledge).find(key => lower.includes(key));
    if (treatmentKey) {
      const treatment = treatmentKnowledge[treatmentKey];
      addBotMessage(treatment.info, {
        buttons: actionButtons,
        quickReplies: ["Tell me about another treatment", "What about pricing?", "Where are you located?"],
      });
      return;
    }

    const concernKey = Object.keys(concernMap).find(key => lower.includes(key));
    if (concernKey) {
      const concern = concernMap[concernKey];
      const recList = concern.treatments.join(", ");
      addBotMessage(`${concern.response}\n\nRecommended treatments: ${recList}`, {
        buttons: actionButtons,
        quickReplies: ["Tell me more about these", "How much does it cost?", "Book a consultation"],
      });
      return;
    }

    if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
      addBotMessage("Pricing varies based on your individual treatment plan and goals. We offer complimentary consultations where we can discuss your concerns, create a customized plan, and review all pricing in detail. We also have VIP memberships that offer significant savings!", {
        buttons: [
          { label: "Book Free Consultation", icon: "calendar", action: "book" },
          { label: "View VIP Memberships", icon: "arrow", action: "memberships" },
        ],
      });
      return;
    }

    if (lower.includes("location") || lower.includes("where") || lower.includes("address") || lower.includes("directions")) {
      addBotMessage("We have two convenient locations:\n\n\ud83d\udccd Kingsport: 1309 S John B Dennis Hwy, Suite 104, TN 37660\nPhone: (423) 765-1393\n\n\ud83d\udccd Jonesborough: 120 S Cherokee St, TN 37659\nPhone: (423) 646-2169\n\nBoth locations offer our full range of services!", {
        buttons: [{ label: "Book at Either Location", icon: "calendar", action: "book" }],
      });
      return;
    }

    if (lower.includes("hour") || lower.includes("open") || lower.includes("schedule")) {
      addBotMessage("We're open Monday through Friday and select Saturdays by appointment. For the most up-to-date availability, I recommend booking online or calling your preferred location:\n\nKingsport: (423) 765-1393\nJonesborough: (423) 646-2169", {
        buttons: [{ label: "Book Appointment", icon: "calendar", action: "book" }],
      });
      return;
    }

    if (lower.includes("membership") || lower.includes("vip") || lower.includes("member")) {
      addBotMessage("Our VIP memberships offer incredible value! We have three tiers:\n\n\u2b50 Gold ($149/mo) - Monthly Botox credits, 10% off all services\n\ud83c\udf1f Platinum ($249/mo) - Enhanced credits, 15% off, priority booking\n\ud83d\udc8e Diamond ($399/mo) - Premium credits, 20% off, exclusive perks\n\nAll memberships include complimentary monthly treatments and priority scheduling.", {
        buttons: [{ label: "View Full Membership Details", icon: "arrow", action: "memberships" }],
      });
      return;
    }

    if (lower.includes("book") || lower.includes("appointment") || lower.includes("consult") || lower.includes("schedule")) {
      addBotMessage("I'd love to help you book! You can schedule online or contact us directly:\n\n\ud83d\udcde Kingsport: (423) 765-1393\n\ud83d\udcde Jonesborough: (423) 646-2169\n\nAll new patients receive a complimentary consultation.", {
        buttons: [
          { label: "Book Online Now", icon: "calendar", action: "book" },
          { label: "Take AI Skin Analysis First", icon: "camera", action: "start-selfie" },
        ],
      });
      return;
    }

    if (lower.includes("treatment") || lower.includes("service") || lower.includes("offer") || lower.includes("what do you")) {
      addBotMessage("We offer a comprehensive menu of aesthetic and wellness services:\n\n\ud83d\udc89 Injectables: Botox, Dysport, Daxxify, Lip Filler, Dermal Fillers\n\u2728 Skin: RF Microneedling, Laser Rejuvenation, Chemical Peels\n\u2696\ufe0f Weight Loss: Semaglutide, Tirzepatide, Metabolic Programs\n\ud83e\uddec Wellness: Hormone Optimization, Peptide Therapy, IV Therapy\n\nWhat interests you most? I can share details on any treatment!", {
        quickReplies: ["Botox", "Lip Filler", "Laser treatments", "Weight loss", "Hormone therapy", "Analyze my skin"],
      });
      return;
    }

    if (lower.includes("concern") || lower.includes("help me") || lower.includes("choose") || lower.includes("recommend") || lower.includes("not sure") || lower.includes("what should")) {
      addBotMessage("I'd love to help you find the perfect treatment! You can tell me your concerns, or try our AI Skin Analysis for a quick selfie-based assessment.\n\nCommon concerns:\n\u2022 Wrinkles or fine lines\n\u2022 Acne scars or skin texture\n\u2022 Volume loss or thin lips\n\u2022 Sun damage or dark spots\n\u2022 Sagging or loose skin\n\u2022 Weight management\n\u2022 Low energy or fatigue", {
        quickReplies: ["Analyze my skin", "Wrinkles", "Skin texture", "Lip volume", "Sun damage", "Weight loss"],
      });
      return;
    }

    if (lower.includes("thank") || lower.includes("thanks")) {
      addBotMessage("You're so welcome! I'm here anytime you have questions. When you're ready to take the next step, we'd love to see you at Balanced Wellness. \u2764\ufe0f", {
        buttons: actionButtons,
      });
      return;
    }

    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      addBotMessage("Hello! \ud83d\udc4b Welcome to Balanced Wellness Medical Spa. I'm here to help you discover the perfect treatments for your goals. What brings you in today?", {
        quickReplies: [
          "What treatments do you offer?",
          "I have a specific concern",
          "Analyze my skin",
          "Tell me about pricing",
        ],
      });
      return;
    }

    streamAIResponse(userText);
  }, [addBotMessage, hasInteracted, streamAIResponse]);

  const handleSend = useCallback(() => {
    const val = inputRef.current?.value.trim();
    if (!val || isTyping) return;
    const userMsg: Message = { id: messageIdCounter++, from: "user", text: val };
    setMessages(prev => [...prev, userMsg]);
    if (inputRef.current) inputRef.current.value = "";
    processUserMessage(val);
  }, [isTyping, processUserMessage]);

  const handleQuickReply = useCallback((reply: string) => {
    if (isTyping) return;
    const userMsg: Message = { id: messageIdCounter++, from: "user", text: reply };
    setMessages(prev => [...prev, userMsg]);
    processUserMessage(reply);
  }, [isTyping, processUserMessage]);

  useEffect(() => {
    if (isOpen && messages.length > 0 && pendingPromptRef.current) {
      const prompt = pendingPromptRef.current;
      pendingPromptRef.current = null;
      setTimeout(() => {
        const userMsg: Message = { id: messageIdCounter++, from: "user", text: prompt };
        setMessages(prev => [...prev, userMsg]);
        processUserMessage(prompt);
      }, 600);
    }
  }, [isOpen, messages.length, processUserMessage]);

  const [previewMode, setPreviewMode] = useState<string | null>(null);

  const generatePreviewRef = useRef<((imageData: string, treatment: string) => void) | null>(null);

  const handleSelfieCapture = useCallback((imageData: string) => {
    setShowCamera(false);

    if (previewMode) {
      const treatment = previewMode;
      setPreviewMode(null);
      generatePreviewRef.current?.(imageData, treatment);
      return;
    }

    setAnalyzing(true);
    const userMsg: Message = {
      id: messageIdCounter++,
      from: "user",
      text: "Selfie captured for analysis",
      selfieImage: imageData,
    };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      setAnalyzing(false);
      const results = generateSkinAnalysis();
      const resultMsg: Message = {
        id: messageIdCounter++,
        from: "bot",
        text: "Your AI Skin Analysis is ready! Want to see how a treatment would actually look on you? Pick one below 💗",
        skinResults: results,
        buttons: [
          { label: "💋 Preview Lip Filler", icon: "camera", action: "preview-lipfiller" },
          { label: "✨ Preview Cheek Filler", icon: "camera", action: "preview-cheekfiller" },
          { label: "💉 Preview Botox", icon: "camera", action: "preview-botox" },
          { label: "🌟 Preview Laser Glow", icon: "camera", action: "preview-laser" },
          { label: "Book Consultation", icon: "calendar", action: "book" },
        ],
      };
      setMessages(prev => [...prev, resultMsg]);
    }, 3500);
  }, [previewMode]);

  const generatePreview = useCallback(async (imageData: string, treatment: string) => {
    setGeneratingPreview(true);
    const userMsg: Message = {
      id: messageIdCounter++,
      from: "user",
      text: `Selfie for ${treatment} preview`,
      selfieImage: imageData,
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const apiBase = (import.meta as any).env?.VITE_API_URL || "/api";
      const resp = await fetch(`${apiBase}/kelliai/treatment-preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData, treatment }),
      });
      const data = await resp.json();
      setGeneratingPreview(false);
      if (!resp.ok || !data.previewImage) {
        if (data?.error === "moderation_blocked" && data?.message) {
          setMessages(prev => [...prev, {
            id: messageIdCounter++,
            from: "bot",
            text: data.message,
            buttons: [
              { label: "Try Another Selfie", icon: "camera", action: `preview-${treatment}` },
              { label: "Book Free Consultation", icon: "calendar", action: "book" },
            ],
          }]);
          return;
        }
        throw new Error(data.error || "Failed");
      }

      setMessages(prev => [...prev, {
        id: messageIdCounter++,
        from: "bot",
        text: `Here's your simulated ${treatment} before & after, love! 💗 Swipe through to see the difference ✨\n\n${data.disclaimer}`,
        previewImage: data.previewImage,
        beforeImage: imageData,
        previewTreatment: treatment,
        buttons: [
          { label: "Book My Free Consultation", icon: "calendar", action: "book" },
          { label: "Try Another Treatment", icon: "camera", action: "more-previews" },
        ],
      }]);
    } catch (err) {
      setGeneratingPreview(false);
      setMessages(prev => [...prev, {
        id: messageIdCounter++,
        from: "bot",
        text: "Aw shoot — I had trouble generating that preview. Try a clearer selfie with good lighting, or book a free consult and I'll have Shelly walk you through it in person. 💗",
        buttons: [{ label: "Book Free Consultation", icon: "calendar", action: "book" }],
      }]);
    }
  }, []);

  useEffect(() => {
    generatePreviewRef.current = generatePreview;
  }, [generatePreview]);

  const handleAction = useCallback((action: string) => {
    if (action === "book") {
      window.open("https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505", "_blank");
    } else if (action === "skin-analyzer" || action === "start-selfie") {
      setPreviewMode(null);
      setShowCamera(true);
    } else if (action === "services") {
      window.location.href = "/services";
    } else if (action === "memberships") {
      window.location.href = "/memberships";
    } else if (action.startsWith("preview-")) {
      const treatment = action.replace("preview-", "");
      setPreviewMode(treatment);
      setShowCamera(true);
    } else if (action === "more-previews") {
      processUserMessage("show me another treatment preview");
    }
  }, []);

  const handleLeadSubmit = useCallback(async (data: LeadData) => {
    setLeadCaptured(true);
    try {
      const apiBase = (import.meta as any).env?.VITE_API_URL || "/api";
      const summary = conversationRef.current.slice(-6).map(m => `${m.role}: ${m.content.slice(0, 200)}`).join("\n");
      await fetch(`${apiBase}/kelliai/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.name,
          email: data.email,
          phone: data.phone,
          smsConsent: data.smsConsent,
          conversationSummary: summary,
          messages: conversationRef.current.slice(-20),
        }),
      });
    } catch (err) {
      console.error("Lead submit failed", err);
    }
    addBotMessage(`Yes ${data.name.split(" ")[0]}! 💗 You're officially on my list. Here's my promise: open this chat anytime — morning, midnight, on a tough day or a great one — and I'll be right here to coach you through. Our team will also reach out personally with a free consult time.\n\nWe're doing this together. ✨`, {
      buttons: [{ label: "Book Your Consultation Now", icon: "calendar", action: "book" }],
    });
  }, [addBotMessage]);

  const showLeadCapture = hasInteracted && interactionCount >= 2 && !leadCaptured;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[390px] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ maxHeight: "min(80vh, 650px)" }}
          >
            <div className="bg-gradient-to-r from-primary via-primary to-accent p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">KelliAI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-white/80">Virtual Aesthetic Consultant</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.selfieImage && (
                    <div className="flex justify-end mb-2">
                      <img
                        src={msg.selfieImage}
                        alt="Your selfie"
                        className="w-32 h-32 object-cover rounded-xl border-2 border-primary/20"
                      />
                    </div>
                  )}

                  <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} items-end gap-1.5`}>
                    <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.from === "bot" && msg.text && !msg.streaming && (
                      <VoicePlayButton text={msg.text} messageId={msg.id} />
                    )}
                  </div>

                  {msg.previewImage && (
                    <div className="mt-2 ml-1">
                      <BeforeAfterCompare
                        beforeSrc={msg.beforeImage}
                        afterSrc={msg.previewImage}
                        treatment={msg.previewTreatment}
                      />
                    </div>
                  )}

                  {msg.skinResults && (
                    <div className="mt-2 ml-1">
                      <SkinResultsCard results={msg.skinResults} />
                    </div>
                  )}

                  {msg.buttons && (
                    <div className="mt-2 ml-1">
                      <ActionButtonsRow buttons={msg.buttons} onAction={handleAction} />
                    </div>
                  )}

                  {msg.quickReplies && (
                    <div className="mt-2 ml-1 flex flex-wrap gap-1.5">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 text-xs bg-white hover:bg-primary hover:text-white text-foreground/70 rounded-full transition-all border border-primary/20 hover:border-primary shadow-sm"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {showCamera && !analyzing && !generatingPreview && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <SelfieCameraView
                    onCapture={handleSelfieCapture}
                    onCancel={() => setShowCamera(false)}
                  />
                </motion.div>
              )}

              {analyzing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <AnalyzingAnimation />
                </motion.div>
              )}

              {generatingPreview && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <GeneratingPreviewAnimation />
                </motion.div>
              )}

              {isTyping && <TypingIndicator />}

              {showLeadCapture && !isTyping && !showCamera && !analyzing && !generatingPreview && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <LeadCaptureForm onSubmit={handleLeadSubmit} />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-3 flex gap-2 shrink-0 bg-white">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything about our treatments..."
                className="flex-1 px-3.5 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-foreground/40"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                disabled={isTyping || showCamera || analyzing || generatingPreview}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || showCamera || analyzing || generatingPreview}
                className="w-10 h-10 bg-gradient-to-r from-primary to-accent text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:shadow-xl transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-champagne rounded-full flex items-center justify-center ring-2 ring-white">
                <Sparkles className="w-2.5 h-2.5 text-foreground" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
