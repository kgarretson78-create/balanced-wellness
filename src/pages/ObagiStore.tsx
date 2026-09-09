import { ArrowUpRight, BadgeCheck, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";

const OBAGI_STORE_URL =
  "https://www.obagi.com/?rfsn=8869544.b4960a&utm_source=refersion&utm_medium=affiliate&utm_campaign=8869544.b4960a";

const shopLinks = [
  {
    icon: Sparkles,
    title: "Shop Obagi Medical",
    text: "Explore the complete Obagi collection through our authorized affiliate storefront.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic Obagi Products",
    text: "Your order is placed and fulfilled directly through Obagi's official online store.",
  },
  {
    icon: MessageCircle,
    title: "Need a Recommendation?",
    text: "Ask our Balanced Wellness team which products may best support your skincare plan.",
  },
];

export default function ObagiStore() {
  return (
    <PageLayout>
      <SEO
        title="Shop Obagi Medical Skincare | Balanced Wellness Medical Spa"
        description="Shop authentic Obagi Medical skincare through the Balanced Wellness Medical Spa affiliate storefront."
        keywords="Obagi Medical skincare Kingsport TN, Obagi Jonesborough TN, shop Obagi online"
      />

      <section className="relative overflow-hidden bg-[#f4f5f7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(181,143,71,0.12),transparent_34%),radial-gradient(circle_at_82%_75%,rgba(16,45,85,0.09),transparent_38%)]" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-16 items-center">
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-primary mb-6">
                Balanced Wellness Medical Spa
              </p>
              <img
                src="/images/obagi/obagi-logo.webp"
                alt="Obagi Medical"
                className="w-[220px] sm:w-[270px] h-auto mx-auto lg:mx-0 mb-7 mix-blend-multiply"
              />
              <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] leading-[1.07] font-serif font-bold text-foreground mb-6 text-balance">
                Clinical skincare,
                <span className="block italic text-primary">delivered to your door.</span>
              </h1>
              <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Shop the complete Obagi Medical collection through our official affiliate store. Your purchase is completed securely on Obagi.com and credited to Balanced Wellness.
              </p>
              <a
                href={OBAGI_STORE_URL}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 min-w-[220px] px-8 py-4 rounded-full bg-[#102d55] text-white font-semibold text-sm shadow-xl shadow-[#102d55]/15 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
              >
                Enter Our Obagi Store
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-4 text-xs text-foreground/40">Opens the official Obagi store in a new window.</p>
            </div>

            <a
              href={OBAGI_STORE_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group relative block max-w-[560px] mx-auto w-full"
              aria-label="Shop the Obagi collection"
            >
              <div className="absolute -inset-3 md:-inset-5 rounded-[2rem] border border-primary/10" />
              <div className="relative overflow-hidden rounded-[1.6rem] bg-[#dedede] shadow-[0_28px_70px_rgba(16,45,85,0.16)]">
                <img
                  src="/images/obagi/obagi-products.webp"
                  alt="Obagi Medical skincare"
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 rounded-2xl bg-white/90 backdrop-blur-md px-5 py-4 flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">Official Online Store</p>
                    <p className="text-sm sm:text-base text-foreground font-semibold mt-1">Explore Obagi Medical</p>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-[#102d55] text-white flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {shopLinks.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border/60 bg-background/40 p-6 md:p-7">
                <div className="w-10 h-10 rounded-full bg-primary/[0.08] flex items-center justify-center mb-5">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{title}</h2>
                <p className="text-sm leading-relaxed text-foreground/55">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-14 rounded-2xl bg-[#102d55] text-white px-6 py-7 md:px-9 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-start gap-4">
              <BadgeCheck className="hidden sm:block w-6 h-6 text-champagne flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-2xl font-bold">Ready to build your routine?</h2>
                <p className="text-white/60 text-sm mt-1">Browse cleansers, serums, moisturizers, sun protection, and targeted skincare.</p>
              </div>
            </div>
            <a
              href={OBAGI_STORE_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-3.5 rounded-full bg-white text-[#102d55] font-semibold text-sm hover:bg-champagne transition-colors"
            >
              Shop Obagi <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="max-w-3xl mx-auto mt-8 text-center text-xs leading-relaxed text-foreground/40">
            Balanced Wellness Medical Spa may earn a commission from purchases made through this affiliate link. Product purchases are completed on and fulfilled by Obagi.com. For personalized skincare guidance, consult with a qualified provider.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
