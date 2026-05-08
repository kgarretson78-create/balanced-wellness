import { Link, useLocation } from "wouter";
import { Sparkles, ArrowRight } from "lucide-react";

export function FlexiblePaymentsBand() {
  const [location] = useLocation();
  const hide =
    location === "/sms-consent" ||
    location === "/privacy-policy" ||
    location === "/terms-and-conditions" ||
    location.startsWith("/admin");
  if (hide) return null;
  return (
    <div className="bg-gradient-to-r from-primary via-primary to-accent text-white text-[12px] sm:text-[13px] py-2 px-4 text-center font-medium shadow-sm">
      <Link href="/flexible-payments" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
        <Sparkles className="w-3.5 h-3.5 text-champagne" />
        <span className="hidden sm:inline">Flexible payment options available — Pay in full or split into monthly payments.</span>
        <span className="sm:hidden">Flexible payments available</span>
        <span className="font-semibold underline-offset-2 hover:underline inline-flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </Link>
    </div>
  );
}
