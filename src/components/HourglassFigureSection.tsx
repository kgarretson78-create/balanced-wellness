import { ArrowUpRight, Dumbbell, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

const HOURGLASS_URL = "https://kelliai.ai/hourglassfigure";

export function HourglassFigureSection({ item }: { item: (index: number) => Record<string, unknown> }) {
  return (
    <Section className="luxury-gradient border-y border-primary/10 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
        <motion.div {...item(0)}>
          <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">Your next step, at home</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight mb-5">
            Meet the <span className="italic text-gradient-gold">Hourglass Figure</span> program.
          </h2>
          <p className="text-foreground/60 leading-relaxed max-w-xl mb-7">
            A guided wellness companion from KelliAI, pairing practical workouts with the encouragement and accountability to help you stay consistent between appointments.
          </p>
          <a href={HOURGLASS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
            Explore Hourglass Figure <ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-foreground/40 mt-4">Opens the program at kelliai.ai/hourglassfigure.</p>
        </motion.div>
        <motion.div {...item(1)} className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,hsl(var(--blush)/.5),transparent_58%)] blur-2xl" />
          <div className="relative rounded-[2rem] bg-white/75 backdrop-blur-sm border border-white/80 shadow-[0_20px_70px_rgba(100,70,60,.12)] p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-6 border-b border-primary/10">
              <div className="w-11 h-11 rounded-2xl bg-primary/[0.08] text-primary flex items-center justify-center"><Dumbbell className="w-5 h-5" /></div>
              <div><p className="text-[11px] uppercase tracking-[0.18em] text-champagne font-semibold">KelliAI wellness program</p><h3 className="text-xl font-serif font-bold text-foreground">Move with intention.</h3></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 pt-6">
              <div className="rounded-2xl bg-background/80 p-4"><Sparkles className="w-4 h-4 text-champagne mb-3" /><p className="text-sm font-semibold text-foreground">Guided movement</p><p className="text-xs text-foreground/50 mt-1">Workouts designed to fit into real life.</p></div>
              <div className="rounded-2xl bg-background/80 p-4"><Sparkles className="w-4 h-4 text-champagne mb-3" /><p className="text-sm font-semibold text-foreground">Daily momentum</p><p className="text-xs text-foreground/50 mt-1">A simple companion for consistency.</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
