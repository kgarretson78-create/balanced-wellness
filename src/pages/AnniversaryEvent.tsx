import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { LOCATIONS } from "@/lib/booking";

export default function AnniversaryEvent() {
  const location = LOCATIONS.kingsport;
  return <PageLayout>
    <SEO title="Five-Year Anniversary | Balanced Wellness Medical Spa Kingsport"
      description="Celebrate five years of Balanced in Kingsport on Saturday, December 5, 2026, from 2–7 PM Eastern. Save the date."
      canonicalPath="/anniversary" />
    <section className="relative overflow-hidden bg-[#fbf8f1] py-12 md:py-20">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-lg border border-[#d7a29b]/45 bg-white/90 px-6 py-10 text-center sm:px-10 md:px-16 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#955a55]">Save the date · Kingsport</p>
          <h1 className="mt-7 font-serif text-5xl font-medium text-foreground sm:text-6xl">Celebrating five years of Balanced</h1>
          <div className="mx-auto my-8 h-px max-w-md bg-[#d7a29b]" />
          <p className="font-serif text-3xl text-foreground">Saturday, December 5, 2026</p>
          <p className="mt-3 text-xl text-foreground">2–7 PM Eastern</p>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-foreground/70">Join us at our Kingsport location on Saturday, December 5, from 2–7 PM as we celebrate five years with our community.</p>
          <p className="mt-7 font-semibold">Balanced Wellness Medical Spa · Kingsport</p>
          <p className="mt-2 text-sm leading-relaxed">{location.address}</p>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-foreground/60">More celebration details will be shared here as they are confirmed.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <a href={location.bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#1b1816] px-5 py-3.5 text-sm font-semibold text-white">Book an appointment</a>
            <a href={location.smsTel} className="rounded-lg border border-[#d7a29b] px-5 py-3.5 text-sm font-semibold">Text Kingsport</a>
            <a href={location.tel} className="rounded-lg border border-[#d7a29b] px-5 py-3.5 text-sm font-semibold">Call Kingsport</a>
          </div>
          <p className="mt-4 text-xs text-foreground/60">{location.phone} · Appointment booking is separate from the celebration.</p>
        </div>
      </div>
    </section>
  </PageLayout>;
}
