import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FlexiblePaymentsBand } from "@/components/FlexiblePaymentsBand";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  const serviceLinks = [
    { name: "All Services", path: "/services" },
    { name: "Injectables & Fillers", path: "/injectables" },
    { name: "Laser & Skin Treatments", path: "/laser-treatments" },
    { name: "Weight Loss & Metabolic", path: "/weight-loss" },
    { name: "Wellness & Longevity", path: "/wellness" },
    { name: "Hormone Optimization", path: "/hormone-optimization" },
    { name: "Memberships", path: "/memberships" },
    { name: "Flexible Payments", path: "/flexible-payments" },
    { name: "Before & After Gallery", path: "/gallery" },
    { name: "AI Skin Analyzer", path: "/skin-analyzer" },
  ];

  const isServicePage = ["/services", "/injectables", "/laser-treatments", "/weight-loss", "/wellness", "/hormone-optimization", "/memberships", "/gallery", "/skin-analyzer", "/flexible-payments"].includes(location);

  const navLinkClass = (path: string, isActive?: boolean) =>
    `text-[13px] font-medium tracking-wide transition-colors duration-300 ${
      (isActive || location === path) ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <FlexiblePaymentsBand />
      <div className={`hidden lg:flex justify-end items-center px-8 text-[11px] border-b border-border/30 bg-background/40 transition-all duration-500 ${isScrolled ? "h-0 py-0 overflow-hidden opacity-0" : "py-1.5 opacity-100"}`}>
        <a href="tel:423-765-1393" className="flex items-center text-foreground/50 hover:text-primary transition-colors mr-6">
          <Phone className="w-3 h-3 mr-1.5" /> Kingsport: (423) 765-1393
        </a>
        <a href="tel:423-646-2169" className="flex items-center text-foreground/50 hover:text-primary transition-colors">
          <Phone className="w-3 h-3 mr-1.5" /> Jonesborough: (423) 646-2169
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[60px]">
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <img
              src="/images/logo.png"
              alt="Balanced Wellness Medical Spa"
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-7">
            <Link href="/" className={navLinkClass("/")}>Home</Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center ${navLinkClass("/services", isServicePage)}`}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
                aria-controls="services-menu"
              >
                Services <ChevronDown className={`ml-1 w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    id="services-menu"
                    role="menu"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl bg-white/95 backdrop-blur-xl shadow-xl shadow-black/[0.06] border border-border/50 py-1.5"
                  >
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={`block px-4 py-2 text-[13px] transition-all duration-200 ${location === link.path ? 'text-primary bg-primary/[0.04]' : 'text-foreground/60 hover:bg-background hover:text-foreground'}`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/memberships" className={navLinkClass("/memberships")}>Memberships</Link>
            <Link href="/gallery" className={navLinkClass("/gallery")}>Gallery</Link>
            <Link href="/about" className={navLinkClass("/about")}>About</Link>
            <Link href="/contact" className={navLinkClass("/contact")}>Contact</Link>
            <Link href="/sms-consent" className={navLinkClass("/sms-consent")}>Text Us</Link>

            <a
              href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center px-5 py-2 bg-primary text-white text-[13px] font-semibold rounded-full hover:bg-primary/90 shadow-sm shadow-primary/15 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-[1px] transition-all duration-300"
            >
              Book Now
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </nav>

          <button
            className="lg:hidden p-2 text-foreground/70"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-border/30 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-0.5 max-h-[80vh] overflow-y-auto">
              <Link href="/" className="block px-3 py-3 text-sm font-medium text-foreground/70 hover:bg-background hover:text-primary rounded-lg transition-colors">Home</Link>

              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-menu"
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground/70 hover:bg-background rounded-lg transition-colors"
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div id="mobile-services-menu" className="pl-3">
                  {serviceLinks.map(link => (
                    <Link key={link.path} href={link.path} className="block px-4 py-2 text-sm text-foreground/50 hover:bg-background hover:text-primary rounded-lg transition-colors">
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/memberships" className="block px-3 py-3 text-sm font-medium text-foreground/70 hover:bg-background hover:text-primary rounded-lg transition-colors">Memberships</Link>
              <Link href="/gallery" className="block px-3 py-3 text-sm font-medium text-foreground/70 hover:bg-background hover:text-primary rounded-lg transition-colors">Gallery</Link>
              <Link href="/about" className="block px-3 py-3 text-sm font-medium text-foreground/70 hover:bg-background hover:text-primary rounded-lg transition-colors">About</Link>
              <Link href="/contact" className="block px-3 py-3 text-sm font-medium text-foreground/70 hover:bg-background hover:text-primary rounded-lg transition-colors">Contact</Link>

              <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                <a href="tel:423-765-1393" className="flex items-center px-3 text-sm text-foreground/50">
                  <Phone className="w-4 h-4 mr-3 text-primary" /> Kingsport: (423) 765-1393
                </a>
                <a href="tel:423-646-2169" className="flex items-center px-3 text-sm text-foreground/50">
                  <Phone className="w-4 h-4 mr-3 text-primary" /> Jonesborough: (423) 646-2169
                </a>
                <a
                  href="https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center mt-4 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/15"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
