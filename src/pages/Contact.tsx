import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Contact() {
  return (
    <PageLayout>
      <SEO title="Contact Us | Balanced Wellness Medical Spa Kingsport & Jonesborough TN" description="Contact Balanced Wellness Medical Spa. Kingsport: (423) 765-1393, 1309 S John B Dennis Hwy. Jonesborough: (423) 646-2169, 120 S Cherokee St. Two convenient Tri-Cities TN locations." keywords="contact medical spa Kingsport TN, med spa phone number Jonesborough TN, Balanced Wellness address, med spa directions Tri-Cities" />
      <div className="relative h-[45vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-primary/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-champagne uppercase tracking-widest text-sm font-semibold mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white/80 font-light">We'd love to hear from you. Reach out or visit one of our clinics.</p>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Our Locations</h2>

              <motion.div {...fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-border mb-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-5">Kingsport Location</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/70">1309 South John B Dennis Hwy, Suite 104<br/>Kingsport, TN 37660</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-5 h-5 mr-4 text-primary flex-shrink-0" />
                    <a href="tel:423-765-1393" className="text-foreground/80 hover:text-primary font-medium">(423) 765-1393</a>
                  </li>
                  <li className="flex items-center">
                    <Mail className="w-5 h-5 mr-4 text-primary flex-shrink-0" />
                    <a href="mailto:info@balancedwellness.com" className="text-foreground/80 hover:text-primary">info@balancedwellness.com</a>
                  </li>
                </ul>
              </motion.div>

              <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-2xl font-serif font-bold text-primary mb-5">Jonesborough Location</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/70">120 South Cherokee St<br/>Jonesborough, TN 37659</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-5 h-5 mr-4 text-primary flex-shrink-0" />
                    <a href="tel:423-646-2169" className="text-foreground/80 hover:text-primary font-medium">(423) 646-2169</a>
                  </li>
                  <li className="flex items-center">
                    <Mail className="w-5 h-5 mr-4 text-primary flex-shrink-0" />
                    <a href="mailto:info@balancedwellness.com" className="text-foreground/80 hover:text-primary">info@balancedwellness.com</a>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-5">Hours of Operation</h3>
              <div className="bg-secondary p-6 rounded-2xl">
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex justify-between border-b border-border pb-3">
                    <span className="font-medium text-foreground">Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-3">
                    <span className="font-medium text-foreground">Saturday</span>
                    <span>By Appointment Only</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-foreground">Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Find Us</h2>

            <div className="h-[280px] bg-secondary rounded-2xl overflow-hidden border border-border relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative text-center">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
                <p className="font-serif font-bold text-lg text-foreground">Kingsport</p>
                <p className="text-sm text-foreground/50">1309 S John B Dennis Hwy</p>
              </div>
            </div>

            <div className="h-[280px] bg-secondary rounded-2xl overflow-hidden border border-border relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative text-center">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
                <p className="font-serif font-bold text-lg text-foreground">Jonesborough</p>
                <p className="text-sm text-foreground/50">120 S Cherokee St</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
