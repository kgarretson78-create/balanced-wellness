import { ArrowRight } from "lucide-react";
import { openBookingChooser } from "@/components/BookingChooser";

interface CTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  linkTo?: string;
  source?: string;
}

export function CTA({
  title = "Ready to Begin Your Wellness Journey?",
  subtitle = "Schedule a consultation with our expert team to discuss your customized treatment plan.",
  buttonText = "Book Your Appointment",
  linkTo,
  source = "cta-section",
}: CTAProps) {
  // If a custom internal link is provided, render a regular anchor.
  // Otherwise the button opens the location chooser.
  const isCustomLink = !!linkTo;
  const isExternal = !!linkTo && linkTo.startsWith("http");

  return (
    <section className="relative py-24 overflow-hidden luxury-gradient-dark">
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-[-20%] left-[20%] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px] pulse-glow" />
      <div className="absolute bottom-[-20%] right-[15%] w-[350px] h-[350px] bg-champagne/8 rounded-full blur-[100px] pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
        <div className="decorative-line mx-auto mb-8" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-5 text-balance leading-tight">
          {title}
        </h2>
        <p className="text-sm md:text-base text-white/40 mb-10 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        {isCustomLink ? (
          <a
            href={linkTo}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center px-8 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 shimmer text-sm"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => openBookingChooser({ source })}
            className="group inline-flex items-center px-8 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 shimmer text-sm"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </section>
  );
}
