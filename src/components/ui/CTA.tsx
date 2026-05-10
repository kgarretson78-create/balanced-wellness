import { ArrowRight } from "lucide-react";
import { useBookingChooser } from "@/components/booking/LocationChooser";

interface CTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  /** When set, clicking the button navigates here instead of opening the location chooser. */
  linkTo?: string;
  /** Optional service label surfaced in the chooser (e.g. "Botox"). */
  service?: string;
}

export function CTA({
  title = "Ready to Begin Your Wellness Journey?",
  subtitle = "Schedule a consultation with our expert team to discuss your customized treatment plan.",
  buttonText = "Book Your Appointment",
  linkTo,
  service,
}: CTAProps) {
  const { open } = useBookingChooser();
  const isExternal = linkTo?.startsWith("http") ?? false;

  const sharedClass =
    "group inline-flex items-center px-8 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 shimmer text-sm";

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
        {linkTo ? (
          <a
            href={linkTo}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={sharedClass}
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        ) : (
          <button type="button" onClick={() => open({ service })} className={sharedClass}>
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </section>
  );
}
