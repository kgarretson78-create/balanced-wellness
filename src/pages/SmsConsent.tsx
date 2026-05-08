import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function SmsConsent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "SMS Consent | Balanced Wellness Medical Spa";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Sign up to receive appointment reminders and offers via SMS from Balanced Wellness Medical Spa."
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!smsConsent) {
      setError("Please check the SMS consent box to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const apiBase = (import.meta as any).env?.VITE_API_URL || "/api";
      const resp = await fetch(`${apiBase}/sms-consent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          smsConsent,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Submission failed.");
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setSmsConsent(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f3] flex flex-col">
      {/* Minimal header */}
      <header className="border-b border-[#e8e0d2] bg-white/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logo.jpeg"
              alt="Balanced Wellness Medical Spa"
              className="h-12 w-auto rounded"
            />
            <div className="hidden sm:block">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b8956a] font-semibold">
                Balanced Wellness
              </p>
              <p className="text-xs text-stone-500">Medical Spa</p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-xs tracking-[0.2em] uppercase text-stone-500 hover:text-[#b8956a] transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#b8956a] font-semibold mb-3">
              SMS Consent
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-800 mb-4">
              Text Us
            </h1>
            <p className="text-stone-600 text-base leading-relaxed">
              Stay connected with Balanced Wellness Medical Spa. Get appointment
              reminders, customer care, and exclusive offers — straight to your phone.
            </p>
          </div>

          {success ? (
            <div className="bg-white rounded-2xl border border-[#e8e0d2] shadow-[0_4px_24px_-8px_rgba(184,149,106,0.15)] p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#b8956a]/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#b8956a]" />
              </div>
              <h2 className="font-serif text-2xl text-stone-800 mb-3">
                You're all set!
              </h2>
              <p className="text-stone-600 mb-6">
                Thank you for opting in. You'll start receiving messages from
                Balanced Wellness Medical Spa shortly. Reply STOP at any time to opt out.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-[#b8956a] text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-[#a37e54] transition-colors"
              >
                Return Home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-[#e8e0d2] shadow-[0_4px_24px_-8px_rgba(184,149,106,0.15)] p-8 sm:p-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    className="w-full px-4 py-3 bg-[#fbf8f3] border border-[#e8e0d2] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#b8956a] focus:bg-white transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    className="w-full px-4 py-3 bg-[#fbf8f3] border border-[#e8e0d2] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#b8956a] focus:bg-white transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-semibold mb-2">
                  Phone Number <span className="text-[#b8956a]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="w-full px-4 py-3 bg-[#fbf8f3] border border-[#e8e0d2] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#b8956a] focus:bg-white transition-colors"
                  placeholder="(423) 555-0123"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-[#fbf8f3] border border-[#e8e0d2] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#b8956a] focus:bg-white transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer mb-6 select-none">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#b8956a] flex-shrink-0 cursor-pointer"
                />
                <span className="text-xs text-stone-600 leading-relaxed">
                  By submitting this form, I agree to receive SMS messages from
                  Balanced Wellness Medical Spa for appointment reminders,
                  customer care, and promotional offers. Message frequency
                  varies. Message and data rates may apply. Reply STOP to opt
                  out. Reply HELP for help. Consent is not a condition of
                  purchase.
                </span>
              </label>

              {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#b8956a] hover:bg-[#a37e54] disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs tracking-[0.25em] uppercase font-semibold rounded-full transition-colors"
              >
                {submitting ? "Submitting..." : "Subscribe to Texts"}
              </button>

              <div className="mt-6 pt-6 border-t border-[#e8e0d2] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-500">
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#b8956a] transition-colors underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                <span className="text-stone-300">•</span>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-[#b8956a] transition-colors underline-offset-4 hover:underline"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-[#e8e0d2] bg-white/60 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="font-serif text-base text-stone-800 mb-2">
                Balanced Wellness Medical Spa
              </p>
              <p className="text-xs text-stone-500 leading-relaxed">
                Aesthetics, wellness, and longevity medicine in Kingsport &amp;
                Jonesborough, TN.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b8956a] font-semibold mb-3">
                Contact
              </p>
              <a
                href="tel:423-765-1393"
                className="flex items-center gap-2 text-xs text-stone-600 hover:text-[#b8956a] transition-colors mb-1.5"
              >
                <Phone className="w-3 h-3" /> Kingsport: (423) 765-1393
              </a>
              <a
                href="tel:423-646-2169"
                className="flex items-center gap-2 text-xs text-stone-600 hover:text-[#b8956a] transition-colors"
              >
                <Phone className="w-3 h-3" /> Jonesborough: (423) 646-2169
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b8956a] font-semibold mb-3">
                Locations
              </p>
              <p className="flex items-start gap-2 text-xs text-stone-600 mb-1.5">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                1309 South John B Dennis Hwy, Suite 104, Kingsport, TN 37660
              </p>
              <p className="flex items-start gap-2 text-xs text-stone-600">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                120 South Cherokee St, Jonesborough, TN 37659
              </p>
            </div>
          </div>
          <div className="pt-6 border-t border-[#e8e0d2] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-400">
            <p>
              © {new Date().getFullYear()} Balanced Wellness Medical Spa. All
              rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-[#b8956a] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="hover:text-[#b8956a] transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
