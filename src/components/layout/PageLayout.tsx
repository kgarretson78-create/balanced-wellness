import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main
        key={location}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex-grow flex flex-col pt-[102px] min-[901px]:pt-[116px]"
      >
        {(location === "/" || location === "/medical-spa-jonesborough-tn") && (
          <aside aria-label="Coming soon to Jonesborough" style={{ background: "#faeeec", color: "#201b1a", textAlign: "center", padding: "22px 24px", borderBottom: "1px solid #eadbd8" }}>
            <p style={{ margin: "0 0 7px", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase" }}>Jonesborough · Coming soon</p>
            <p style={{ margin: "0 0 5px", fontFamily: "Georgia, serif", fontSize: "30px", lineHeight: 1.2 }}>Head Spa</p>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>Your next moment of calm. Launch details coming soon.</p>
          </aside>
        )}
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
