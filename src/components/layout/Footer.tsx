import { Link } from "wouter";
import { Facebook, Instagram, MapPin, Phone, Clock } from "lucide-react";
import { LOCATIONS } from "@/lib/booking";

export function Footer() {
  return (
    <footer className="luxury-gradient-dark text-white/90 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="absolute top-[20%] right-0 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[8%] w-[260px] h-[260px] rounded-full bg-champagne/[0.04] blur-[110px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div>
            <img
              src="/images/logo.png"
              alt="Balanced Wellness Medical Spa"
              className="h-14 w-auto object-contain mb-5"
            />
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              A modern medical spa blending aesthetics, wellness, and longevity medicine in Kingsport & Jonesborough TN.
            </p>
            <div className="flex space-x-2.5">
              <a href="https://www.instagram.com/balancedwellnessmedspa" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <Instagram className="w-4 h-4 text-white/60" />
              </a>
              <a href="https://www.facebook.com/balancedwellnessmedspa" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <Facebook className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-champagne font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-white/40 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="/about" className="text-white/40 hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link href="/services" className="text-white/40 hover:text-white transition-colors duration-300">All Services</Link></li>
              <li><Link href="/memberships" className="text-white/40 hover:text-white transition-colors duration-300">Memberships</Link></li>
              <li><Link href="/gallery" className="text-white/40 hover:text-white transition-colors duration-300">Before & After</Link></li>
              <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors duration-300">Contact</Link></li>
              <li><Link href="/sms-consent" className="text-white/40 hover:text-white transition-colors duration-300">Text Us</Link></li>
              <li><Link href="/book" className="text-primary font-medium hover:text-champagne transition-colors duration-300">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-champagne font-semibold mb-6">Treatments</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/injectables" className="text-white/40 hover:text-white transition-colors duration-300">Injectables & Fillers</Link></li>
              <li><Link href="/laser-treatments" className="text-white/40 hover:text-white transition-colors duration-300">Laser & Skin Treatments</Link></li>
              <li><Link href="/weight-loss" className="text-white/40 hover:text-white transition-colors duration-300">Weight Loss & Metabolic</Link></li>
              <li><Link href="/wellness" className="text-white/40 hover:text-white transition-colors duration-300">Wellness & Longevity</Link></li>
              <li><Link href="/iv-lounge-kingsport-tn" className="text-white/40 hover:text-white transition-colors duration-300">IV Hydration Lounge</Link></li>
              <li><Link href="/hormone-optimization" className="text-white/40 hover:text-white transition-colors duration-300">Hormone Optimization</Link></li>
              <li><Link href="/telehealth" className="text-white/40 hover:text-white transition-colors duration-300">Telehealth & Virtual Care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-champagne font-semibold mb-6">Visit Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-primary/70 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white/80 text-[13px]">Kingsport</p>
                  <p className="text-white/35 text-[13px]">1309 South John B Dennis Hwy, Suite 104<br/>Kingsport, TN 37660</p>
                  <a href="tel:423-765-1393" className="text-primary text-xs hover:text-champagne transition-colors">(423) 765-1393</a>
                  <div className="mt-2 flex items-start text-white/35 text-[13px]">
                    <Clock className="w-3.5 h-3.5 mr-2 text-primary/70 flex-shrink-0 mt-0.5" />
                    <div>
                      {LOCATIONS.kingsport.hours.display.map((row) => (
                        <p key={row.days}>{row.days}: {row.time}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-primary/70 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white/80 text-[13px]">Jonesborough</p>
                  <p className="text-white/35 text-[13px]">120 South Cherokee St<br/>Jonesborough, TN 37659</p>
                  <a href="tel:423-646-2169" className="text-primary text-xs hover:text-champagne transition-colors">(423) 646-2169</a>
                  <div className="mt-2 flex items-start text-white/35 text-[13px]">
                    <Clock className="w-3.5 h-3.5 mr-2 text-primary/70 flex-shrink-0 mt-0.5" />
                    <div>
                      {LOCATIONS.jonesborough.hours.display.map((row) => (
                        <p key={row.days}>{row.days}: {row.time}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/[0.06] text-center text-white/25 text-[11px] flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Balanced Wellness Medical Spa. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white/50 transition-colors">Terms &amp; Conditions</Link>
            <Link href="/sms-consent" className="hover:text-white/50 transition-colors">SMS Consent</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
