import type { ReactNode } from "react";

type Tone = "gold" | "sage" | "blush";

const TONES: Record<Tone, string> = {
  gold: "bg-gold/10 border-gold/25 text-gold-ink",
  sage: "bg-sage/10 border-sage/25 text-sage-ink",
  blush: "bg-blush/20 border-blush/45 text-blush-ink",
};

const DOT: Record<Tone, string> = {
  gold: "bg-gold",
  sage: "bg-sage",
  blush: "bg-blush",
};

interface EyebrowProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

/**
 * Small pill-shaped section label. A tinted background + colored dot adds a
 * tasteful accent and lets color code categories (gold = brand, sage = clinical
 * providers, blush = leadership) while keeping text at accessible contrast.
 */
export function Eyebrow({ children, tone = "gold", className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${TONES[tone]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[tone]}`} aria-hidden="true" />
      {children}
    </span>
  );
}
