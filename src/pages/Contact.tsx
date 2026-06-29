import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { SEO } from "@/components/SEO";
import { MapPin, Phone, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  ANY_DEDICATED_BOOKING_URL,
  LOCATION_LIST,
  getPreferredLocation,
  setPreferredLocation,
  type LocationId,
} from "@/lib/booking";
import { useBookingChooser } from "@/components/booking/LocationChooser";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { open: openBookingChooser } = useBookingChooser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [preferredLocation, setPreferredLocationState] = useState<LocationId | "">(
    getPreferredLocation() ?? "",
  );
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email && !phone) {
      setErrorMsg("Please add an email or phone number so we can reach you.");
      return;
    }
    if (preferredLocation) setPreferredLocation(preferredLocation);
    setSubmitState("submitting");
    try {
      const apiBase = (import.meta as any).env?.VITE_API_URL || "/api";
      const resp = await fetch(`${apiBase}/kelliai/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          email,
          phone,
          smsConsent,
          preferredLocation: preferredLocation || null,
          conversationSummary: message
            ? `Contact form message: ${message}`
            : "Contact form submission",
        }),
      });
      if (!resp.ok) throw new Error(`Server returned ${resp.status}`);
      setSubmitState("success");
    } catch (err) {
      console.error("Contact form submit failed", err);
      setSubmitState("error");
      setErrorMsg("We couldn't send that just now. Please call or text us — we'd love to hear from you.");
    }
  };

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

              {LOCATION_LIST.map((loc, i) => (
                <motion.div
                  key={loc.id}
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-border mb-6 last:mb-0"
                >
                  <h3 className="text-2xl font-serif font-bold text-primary mb-5">{loc.name} Location</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <MapPin className="w-5 h-5 mr-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{loc.address}</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="w-5 h-5 mr-4 text-primary flex-shrink-0" />
                      <a href={loc.tel} className="text-foreground/80 hover:text-primary font-medium">
                        {loc.phone}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-4 text-primary flex-shrink-0" />
                      <a href={loc.smsTel} className="text-foreground/80 hover:text-primary font-medium">
                        Text {loc.name}
                      </a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      setPreferredLocation(loc.id);
                      window.open(loc.bookingUrl, "_blank", "noopener,noreferrer");
                    }}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Book at {loc.name}
                  </button>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-5">Hours of Operation</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {LOCATION_LIST.map((loc) => (
                  <div key={loc.id} className="bg-secondary p-6 rounded-2xl">
                    <p className="font-serif font-bold text-primary mb-4">{loc.name}</p>
                    <ul className="space-y-3 text-foreground/70">
                      {loc.hours.display.map((row, idx) => (
                        <li
                          key={row.days}
                          className={`flex justify-between ${idx < loc.hours.display.length - 1 ? "border-b border-border pb-3" : ""}`}
                        >
                          <span className="font-medium text-foreground">{row.days}</span>
                          <span>{row.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Send us a message</h2>
              <p className="text-sm text-foreground/60 mb-6">
                Tell us which location works best for you and our team will reach out to schedule.
                Prefer to talk now? <button type="button" onClick={() => openBookingChooser()} className="text-primary font-medium underline-offset-2 hover:underline">Open the scheduler</button>.
              </p>

              {submitState === "success" ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-900 mb-1">Thanks — we got your message.</p>
                    <p className="text-sm text-emerald-900/80">
                      Our team will reach out shortly. If you'd like to book right now, you can also{" "}
                      <button type="button" onClick={() => openBookingChooser()} className="underline font-medium">open the scheduler</button>.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        placeholder="(423) 555-0123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Preferred location</label>
                    <div className="grid grid-cols-2 gap-2">
                      {LOCATION_LIST.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => setPreferredLocationState(loc.id)}
                          className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                            preferredLocation === loc.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-white text-foreground/70 hover:bg-secondary"
                          }`}
                        >
                          <MapPin className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                          {loc.name}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-foreground/45 mt-1.5">
                      Optional — helps us route you to the right team.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      placeholder="What treatments are you interested in?"
                    />
                  </div>
                  <label className="flex items-start gap-2 text-xs text-foreground/60">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span>
                      I agree to receive SMS messages from Balanced Wellness Medical Spa. Msg & data rates may apply. Reply STOP to opt out.
                    </span>
                  </label>

                  {errorMsg && (
                    <div className="flex items-start gap-2 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>

                  {!ANY_DEDICATED_BOOKING_URL && (
                    <p className="text-[11px] text-foreground/50 text-center pt-1">
                      Online scheduling is being updated. The fastest way to book is to call or text the location above.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
