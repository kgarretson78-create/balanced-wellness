import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { useBookingChooser } from "@/components/booking/LocationChooser";

export default function SkinAnalyzer() {
  const { open } = useBookingChooser();

  return (
    <PageLayout>
      <SEO
        title="Skin Consultation | Balanced Wellness Medical Spa"
        description="Online skin analysis is not available. Book a consultation with the Balanced Wellness team to discuss your skin concerns."
        canonicalPath="/skin-analyzer"
      />
      <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-28">
        <p className="mb-5 text-xs uppercase tracking-[0.24em] text-foreground/60">Balanced Wellness</p>
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">A conversation, not a skin score.</h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-foreground/75">
          Online skin analysis is not available. This website does not assess or diagnose your skin from a photo.
        </p>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/75">
          For an individual assessment, book a consultation with our team to discuss your concerns and options.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <button type="button" onClick={() => open({ service: "Consultation" })}
            className="bg-foreground px-7 py-4 text-sm font-medium text-background transition-opacity hover:opacity-80">
            Book a consultation
          </button>
          <Link href="/contact" className="text-sm underline underline-offset-4">Contact our team</Link>
        </div>
      </section>
    </PageLayout>
  );
}
