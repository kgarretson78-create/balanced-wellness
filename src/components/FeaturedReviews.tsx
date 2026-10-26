import { Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { FEATURED_REVIEWS, GOOGLE_REVIEW_SOURCES } from "@/lib/reviews";

/** Selected reviews must never be represented as the business's overall rating. */
export function FeaturedReviews() {
  if (FEATURED_REVIEWS.length === 0) return null;

  return (
    <Section className="luxury-gradient">
      <div className="text-center mb-14">
        <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-4">From Google</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Featured five-star Google reviews</h2>
        <p className="text-foreground/60 text-sm">A selection of five-star reviews. These are not all reviews or an overall rating.</p>
        <div className="decorative-line mx-auto mt-6" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {FEATURED_REVIEWS.map((review) => (
          <article key={`${review.name}-${review.date}`} className="p-6 rounded-2xl bg-white border border-border hover:luxury-shadow transition-all duration-300">
            <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
              {Array.from({ length: review.stars }, (_, index) => <Star key={index} aria-hidden="true" className="w-4 h-4 fill-gold text-gold" />)}
            </div>
            {review.text ? (
              <blockquote className="text-sm text-foreground/65 leading-relaxed mb-4 italic">{review.text}</blockquote>
            ) : (
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">Five-star rating. No written review.</p>
            )}
            <p className="text-sm font-semibold text-foreground">{review.name}</p>
            <p className="text-xs text-foreground/60 mt-1">{review.location} · <time dateTime={review.date}>{new Date(`${review.date}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></p>
            <a href={review.reviewUrl ?? review.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-primary underline underline-offset-4 mt-3">{review.reviewUrl ? "Read this review on Google" : "Google reviews for this location"}</a>
          </article>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {GOOGLE_REVIEW_SOURCES.map((source) => (
          <a key={source.location} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-foreground font-medium rounded-full border border-border hover:luxury-shadow transition-all text-sm">
            Read all {source.location} Google reviews
          </a>
        ))}
      </div>
    </Section>
  );
}
