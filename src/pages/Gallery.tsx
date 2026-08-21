import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { SEO } from "@/components/SEO";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingChooser } from "@/components/booking/LocationChooser";

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  beforeImage?: string;
  afterImage?: string;
  combinedImage?: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
    {
      id: "lip-enhancement-1",
      category: "Lip Filler",
      title: "Lip Enhancement",
      combinedImage: "/images/before-afters/01-lip-enhancement.jpg",
      description: "Full lip augmentation creating naturally plump, symmetrical lips with expertly placed dermal filler.",
    },
    {
      id: "facial-balancing-1",
      category: "Lip Filler",
      title: "Facial Balancing Filler",
      combinedImage: "/images/before-afters/02-facial-balancing-filler.jpg",
      description: "Subtle facial balancing with expertly placed filler for beautifully proportioned, natural-looking results.",
    },
    {
      id: "perioral-rejuvenation-1",
      category: "Lip Filler",
      title: "Lip & Perioral Rejuvenation",
      combinedImage: "/images/before-afters/03-lip-perioral-rejuvenation.jpg",
      description: "Refined lip enhancement and perioral rejuvenation for a smoother, more balanced appearance.",
    },
    {
      id: "gummy-smile-1",
      category: "Lip Filler",
      title: "Gummy Smile Correction",
      combinedImage: "/images/before-afters/04-gummy-smile-correction.jpg",
      description: "Precision injectable treatment designed to create a more balanced, confident smile.",
    },
    {
      id: "lower-face-profile-1",
      category: "Lip Filler",
      title: "Lower Face Balancing — Profile",
      combinedImage: "/images/before-afters/05-lower-face-balancing-profile.jpg",
      description: "Strategic lower-face balancing to refine profile proportions while preserving a natural look.",
    },
    {
      id: "lower-face-front-1",
      category: "Lip Filler",
      title: "Lower Face Balancing — Front",
      combinedImage: "/images/before-afters/06-lower-face-balancing-front.jpg",
      description: "Thoughtful filler placement for harmonious lower-face proportions and elegant definition.",
    },
    {
      id: "lip-enhancement-kelli-1",
      category: "Lip Filler",
      title: "Lip Enhancement",
      combinedImage: "/images/before-afters/07-lip-enhancement-kelli.jpg",
      description: "Natural lip volume enhancement with premium hyaluronic acid filler for beautifully balanced results.",
    },
    {
      id: "weightloss-130-1",
      category: "Weight Loss",
      title: "130-Lb Weight Loss Transformation",
      combinedImage: "/images/before-afters/08-130-lb-weight-loss.jpg",
      description: "Incredible body transformation achieved through our medically supervised weight loss program.",
    },
    {
      id: "weightloss-100-1",
      category: "Weight Loss",
      title: "100-Lb Weight Loss Transformation",
      combinedImage: "/images/before-afters/09-100-lb-weight-loss.jpg",
      description: "A significant body transformation supported by an individualized, medically supervised weight loss plan.",
    },
    ];

    const categories = ["All", "CO2 Laser", "RF Microneedling", "Lip Filler", "Botox", "Daxxify", "Dysport", "Weight Loss", "Skin Tightening"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { open: openBookingChooser } = useBookingChooser();

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <PageLayout>
      <SEO
        title="Before & After Gallery | Balanced Wellness Medical Spa Kingsport TN"
        description="See before and after results from Balanced Wellness Medical Spa. CO2 laser, RF microneedling, lip filler, Botox, weight loss, and skin tightening transformations in Kingsport & Jonesborough TN."
        keywords="before after Botox Kingsport TN, med spa results Jonesborough TN, lip filler before after, CO2 laser results, weight loss transformation, RF microneedling results"
      />

      <section className="relative h-[45vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 luxury-gradient-dark" />
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pulse-glow" />
        <div className="absolute bottom-[10%] left-[15%] w-[250px] h-[250px] rounded-full bg-champagne/5 blur-[80px] pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs text-champagne uppercase tracking-[0.2em] font-semibold mb-5">Real Results</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">Before & After Gallery</h1>
            <p className="text-base text-foreground/60 font-light max-w-xl mx-auto leading-relaxed">
              See the transformative results our patients achieve at Balanced Wellness Medical Spa.
            </p>
            <div className="decorative-line mx-auto mt-6" />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      <Section className="bg-white">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">Real Patient Results</h2>
          <p className="text-foreground/40 text-sm">Drag the slider to compare before and after</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/15"
                  : "bg-background text-foreground/50 hover:text-foreground border border-border hover:border-primary/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                  >
                    <div className="luxury-card overflow-hidden">
                      {item.combinedImage ? (
                          <img
                            src={item.combinedImage}
                            alt={item.title + " before and after result"}
                            className="block w-full aspect-square object-cover"
                          />
                        ) : (
                          <BeforeAfterSlider
                            beforeImage={item.beforeImage || ""}
                            afterImage={item.afterImage || ""}
                          />
                        )}
                      <div className="p-5 text-center">
                        <span className="inline-block px-3 py-0.5 bg-primary/[0.06] text-primary rounded-full text-[11px] font-semibold uppercase tracking-wider mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-base font-serif font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-xs text-foreground/45 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 max-w-2xl mx-auto">
                <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-background to-champagne/15 border border-border p-10">
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-3">More results in-clinic</p>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Real outcomes, every day</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                    We have additional patient results in this category available to view privately during your consultation, with patient consent. Book a free consultation and we'll share examples relevant to your skin and goals.
                  </p>
                  <button
                    type="button"
                    onClick={() => openBookingChooser({ service: "Free Consultation" })}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all text-sm shadow-md shadow-primary/15"
                  >
                    Book a Free Consultation
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 max-w-2xl mx-auto text-center p-5 bg-background rounded-xl border border-border">
          <p className="text-xs text-foreground/35 italic leading-relaxed">
            *Individual results may vary. All patient photos are displayed with written consent. Results depend on individual anatomy, treatment plan, and adherence to post-treatment care instructions.
          </p>
        </div>
      </Section>

      <CTA
        title="Ready to See Your Own Transformation?"
        subtitle="Schedule a consultation with our expert team to create your personalized treatment plan."
      />
    </PageLayout>
  );
}
