import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { LOCATIONS } from "@/lib/booking";

const highlights = [
  "Special event pricing",
  "Spooky-chic raffle prizes",
  "Festive sips and snacks",
  "Event-only beauty offers",
];

export default function BootoxEvent() {
  const location = LOCATIONS.jonesborough;

  const openBooking = () => {
    window.open(location.bookingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <PageLayout>
      <SEO
        title="BOO-TOX Party | Balanced Wellness Medical Spa Jonesborough"
        description="Save the date for Balanced Wellness Medical Spa's BOO-TOX Party in Jonesborough, Tennessee on Sunday, October 25 from 1:00-4:00 PM."
        canonicalPath="/bootox"
      />

      <section className="relative overflow-hidden bg-[#fbf8f1] py-12 md:py-20">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#d7a29b]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-[#ead0cb]/40 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-none md:rounded-lg border border-[#d7a29b]/45 bg-white/90 shadow-[0_24px_70px_rgba(87,63,57,0.10)] backdrop-blur-sm">
            <div className="px-6 py-10 text-center sm:px-10 md:px-16 md:py-14">
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#d7a29b]/50 bg-[#f8ece9] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#955a55]">
                <Sparkles className="h-3.5 w-3.5" />
                Save the date
              </div>

              <p className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-foreground/65">
                Join us for a
              </p>
              <h1 className="font-serif text-5xl font-medium tracking-[-0.035em] text-foreground sm:text-6xl md:text-8xl">
                BOO-TOX
              </h1>
              <p className="mt-1 font-serif text-3xl tracking-[0.18em] text-foreground sm:text-4xl">
                PARTY
              </p>

              <div className="mx-auto my-8 h-px max-w-md bg-[#d7a29b]" />

              <div className="mx-auto grid max-w-2xl gap-4 text-left sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-lg bg-[#fbf8f1] p-4">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#ad6b65]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
                      Date
                    </p>
                    <p className="mt-1 font-medium text-foreground">Sunday, October 25</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-[#fbf8f1] p-4">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#ad6b65]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
                      Time
                    </p>
                    <p className="mt-1 font-medium text-foreground">1:00-4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-[#fbf8f1] p-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#ad6b65]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
                      Location
                    </p>
                    <p className="mt-1 font-medium text-foreground">Jonesborough</p>
                  </div>
                </div>
              </div>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-foreground/60">
                Balanced Wellness Medical Spa<br />
                120 S. Cherokee Street, Jonesborough, TN 37659
              </p>
            </div>

            <div className="border-y border-[#d7a29b]/35 bg-[#fdfaf5] px-6 py-10 sm:px-10 md:px-16">
              <div className="mx-auto max-w-2xl">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#955a55]">
                  What to expect
                </p>
                <h2 className="mt-3 text-center font-serif text-3xl text-foreground sm:text-4xl">
                  Beauty, wellness and a little Halloween magic
                </h2>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-md border border-[#d7a29b]/30 bg-white px-4 py-3.5"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#ad6b65]" />
                      <span className="text-sm font-semibold text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-10 sm:px-10 md:px-16">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#955a55]">
                  More details coming soon
                </p>
                <h2 className="mt-3 font-serif text-3xl text-foreground">
                  We are finalizing the special offers
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/60">
                  Treatment pricing, raffle details and any reservation information will be
                  added here as they are confirmed. Save this page and check back for updates.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={openBooking}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1b1816] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#312b28]"
                  >
                    Book Jonesborough
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={location.smsTel}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d7a29b] bg-white px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-[#fcf1ee]"
                  >
                    <MessageSquare className="h-4 w-4 text-[#ad6b65]" />
                    Text us
                  </a>
                  <a
                    href={location.tel}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d7a29b] bg-white px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-[#fcf1ee]"
                  >
                    <Phone className="h-4 w-4 text-[#ad6b65]" />
                    Call us
                  </a>
                </div>

                <p className="mt-4 text-xs text-foreground/45">{location.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
