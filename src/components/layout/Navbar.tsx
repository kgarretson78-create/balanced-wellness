import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useBookingChooser } from "@/components/booking/LocationChooser";

const serviceLinks = [
  { name: "All treatments", path: "/services" },
  { name: "Injectables & fillers", path: "/injectables" },
  { name: "Laser & skin", path: "/laser-treatments" },
  { name: "Weight management", path: "/weight-loss" },
  { name: "Wellness & IV therapy", path: "/wellness" },
  { name: "Hormone consultations", path: "/hormone-optimization" },
  { name: "Online care", path: "/online-care" },
  { name: "Memberships", path: "/memberships" },
  { name: "Payment options", path: "/flexible-payments" },
  { name: "Shop Obagi", path: "/shop-obagi" },
];
export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { open } = useBookingChooser();
  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [location]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setMobileOpen(false); setServicesOpen(false); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const book = () => { setMobileOpen(false); setServicesOpen(false); open(); };
  return (
    <header className="bw-site-header">
      <div className="bw-header-note"><span>Medical aesthetics &amp; wellness</span><Link href="/contact">Kingsport &amp; Jonesborough, TN <ArrowUpRight size={11} aria-hidden="true" /></Link></div>
      <div className="bw-header-inner">
        <Link href="/" className="bw-header-logo" aria-label="Balanced Wellness Medical Spa home"><span className="bw-header-wordmark">Balanced<span>Wellness Medical Spa</span></span></Link>
        <nav className="bw-desktop-nav" aria-label="Main navigation">
          <div className="bw-nav-dropdown" onMouseLeave={() => setServicesOpen(false)}>
            <button type="button" onClick={() => setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen} aria-controls="bw-services-menu">Treatments <ChevronDown size={12} aria-hidden="true" /></button>
            {servicesOpen && <div id="bw-services-menu" className="bw-nav-menu">{serviceLinks.map(link => <Link key={link.path} href={link.path} onClick={() => setServicesOpen(false)}>{link.name}</Link>)}</div>}
          </div>
          <Link href="/about">Our approach</Link>
          <a href="/#locations">Locations</a>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="bw-header-actions"><button type="button" onClick={book} className="bw-header-book">Book a visit <ArrowUpRight size={15} aria-hidden="true" /></button><button type="button" className="bw-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="bw-mobile-menu" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      {mobileOpen && <nav id="bw-mobile-menu" className="bw-mobile-nav" aria-label="Mobile navigation">
        <Link href="/about">Our approach</Link><a href="/#locations" onClick={() => setMobileOpen(false)}>Our locations</a><Link href="/gallery">Gallery</Link><Link href="/contact">Contact</Link>
        <p>Treatments &amp; more</p>{serviceLinks.map(link => <Link key={link.path} href={link.path}>{link.name}</Link>)}
        <a href="tel:4237651393">Call Kingsport · (423) 765-1393</a><a href="tel:4236462169">Call Jonesborough · (423) 646-2169</a><Link href="/sms-consent">Text us</Link>
      </nav>}
    </header>
  );
}
