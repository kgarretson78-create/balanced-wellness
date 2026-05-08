import { useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Balanced Wellness Medical Spa";
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
            Privacy Policy
          </h1>
          <p className="text-sm text-foreground/60 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="prose prose-stone max-w-none space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">1. Introduction</h2>
              <p>
                Balanced Wellness Medical Spa ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and safeguard information when you visit our website, contact us, or opt in to receive communications from us.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Contact information</strong> — name, email address, phone number, and mailing address.</li>
                <li><strong>Appointment and treatment information</strong> — services you inquire about or book.</li>
                <li><strong>Communication preferences</strong> — including SMS opt-in status.</li>
                <li><strong>Website usage data</strong> — pages visited, device type, browser, and approximate location.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Schedule and confirm appointments and respond to inquiries.</li>
                <li>Send appointment reminders, customer care updates, and (with your consent) promotional messages.</li>
                <li>Improve our services, website, and customer experience.</li>
                <li>Comply with legal and regulatory obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">4. SMS Messaging Program</h2>
              <p>
                When you opt in to receive SMS messages from Balanced Wellness Medical Spa, you may receive appointment reminders, customer care messages, and promotional offers. Message frequency varies. Message and data rates may apply. You may reply <strong>STOP</strong> at any time to opt out, or <strong>HELP</strong> for assistance.
              </p>
              <p>
                <strong>We do not share, sell, or rent SMS opt-in information or mobile phone numbers with third parties for marketing purposes.</strong> Phone numbers collected for SMS messaging are used solely by Balanced Wellness Medical Spa and our SMS service provider to deliver the messages you have consented to receive.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">5. Cookies &amp; Tracking Technologies</h2>
              <p>
                We use cookies, web beacons, pixels, local storage, and similar tracking technologies on our website to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Operate the site</strong> — essential cookies that enable core features such as page navigation, form submission, and security.</li>
                <li><strong>Remember your preferences</strong> — such as form inputs and consent choices.</li>
                <li><strong>Measure performance</strong> — analytics cookies (e.g., page views, traffic sources, session duration) that help us understand how visitors use the site so we can improve it.</li>
                <li><strong>Marketing &amp; advertising</strong> — when applicable, cookies and pixels from advertising partners (such as Meta/Facebook or Google) to measure ad effectiveness and show relevant content.</li>
              </ul>
              <p>
                You can control cookies through your browser settings — most browsers allow you to block, delete, or be notified about cookies. You can also opt out of many third-party advertising cookies through industry tools such as the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DAA WebChoices</a> or <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NAI Opt Out</a> tools. Blocking essential cookies may affect site functionality.
              </p>
              <p>
                We do not use cookies or tracking technologies to collect SMS opt-in information, and we do not sell tracking data to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">6. How We Share Information</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Service providers</strong> who help us operate our business (e.g., scheduling, SMS delivery, email, analytics) under appropriate confidentiality obligations.</li>
                <li><strong>Healthcare providers</strong> as needed to deliver the services you request.</li>
                <li><strong>Authorities</strong> when required by law or to protect our rights, safety, or property.</li>
              </ul>
              <p>We never sell your personal information.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">6. Data Security</h2>
              <p>
                We use reasonable administrative, technical, and physical safeguards to protect your information. However, no system is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">7. Your Choices</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>You may unsubscribe from email marketing at any time using the unsubscribe link in any email.</li>
                <li>You may opt out of SMS messages by replying STOP.</li>
                <li>You may request access, correction, or deletion of your personal information by contacting us.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">8. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page indicates when it was last revised.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or your information, please contact us:
              </p>
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
