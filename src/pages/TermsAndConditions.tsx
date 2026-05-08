import { useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | Balanced Wellness Medical Spa";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-3">
            Legal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-foreground/60 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="prose prose-stone max-w-none space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Balanced Wellness Medical Spa website or services, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">2. Age Restriction (18+)</h2>
              <p>
                You must be at least <strong>eighteen (18) years of age</strong> to use this website, submit any form, opt in to our SMS messaging program, or receive treatments at Balanced Wellness Medical Spa. By using our website or services, you represent and warrant that you are 18 years of age or older.
              </p>
              <p>
                We do not knowingly collect personal information, phone numbers, or SMS opt-ins from anyone under the age of 18. If we become aware that we have collected information from someone under 18, we will promptly delete it. If you believe a minor has provided us with personal information, please contact us at (423) 765-1393 so we can remove it.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">3. Use of Our Website</h2>
              <p>
                The content on this website is provided for informational purposes only and does not constitute medical advice. Always consult a qualified provider before beginning any treatment.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">4. SMS Messaging Terms</h2>
              <p>
                By opting in to our SMS program, you agree to receive recurring text messages from Balanced Wellness Medical Spa, including appointment reminders, customer care messages, and promotional offers.
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Message frequency varies.</li>
                <li>Message and data rates may apply.</li>
                <li>Reply <strong>STOP</strong> to opt out at any time.</li>
                <li>Reply <strong>HELP</strong> for help, or contact us at (423) 765-1393.</li>
                <li>Consent to receive messages is not a condition of purchase.</li>
                <li>Supported carriers include AT&amp;T, Verizon, T-Mobile, and others. Carriers are not liable for delayed or undelivered messages.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">5. Appointments &amp; Cancellations</h2>
              <p>
                Appointments are subject to availability. We may require advance notice for cancellations and may charge a fee for late cancellations or no-shows. Specific cancellation terms will be communicated at booking.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">6. Medical Disclaimer</h2>
              <p>
                Treatment results vary and are not guaranteed. Information about procedures, before-and-after images, and AI-generated previews are illustrative only and do not constitute a promise of specific outcomes. A formal consultation is required before any treatment.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">7. Intellectual Property</h2>
              <p>
                All content on this website — including text, graphics, logos, and images — is the property of Balanced Wellness Medical Spa or its licensors and is protected by copyright and trademark laws. You may not reproduce or distribute it without written permission.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Balanced Wellness Medical Spa is not liable for any indirect, incidental, or consequential damages arising from your use of this website or our services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">9. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Tennessee, without regard to conflict of laws principles.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">10. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. The "Last updated" date at the top of this page indicates when they were last revised. Continued use of our website after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">11. Contact Us</h2>
              <p>
                <strong>Balanced Wellness Medical Spa</strong><br />
                1309 South John B Dennis Hwy, Suite 104, Kingsport, TN 37660<br />
                Phone: <a href="tel:423-765-1393" className="text-primary hover:underline">(423) 765-1393</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
