/**
 * Curated public Google reviews, not a live feed or an aggregate rating.
 * Source records were checked in Podium on 2026-10-26 and the Google place
 * below was independently resolved to 120 S Cherokee St, Jonesborough.
 * Never copy a location label from an account selector alone. Preserve the
 * original review wording and date; rating-only submissions have no quote.
 */
export interface FeaturedReview {
  name: string;
  location: "Jonesborough" | "Kingsport";
  date: string;
  stars: 5;
  text: string | null;
  sourceUrl: string;
  reviewUrl?: string;
}

export const GOOGLE_REVIEW_SOURCES = [
  {
    location: "Jonesborough",
    url: "https://search.google.com/local/reviews?placeid=ChIJV6CfqZ9jWogRj-QjFeenjIM",
  },
] as const;

export const FEATURED_REVIEWS: FeaturedReview[] = [
  {
    name: "Wendy Finney",
    location: "Jonesborough",
    date: "2026-10-25",
    stars: 5,
    text: null,
    sourceUrl: GOOGLE_REVIEW_SOURCES[0].url,
  },
  {
    name: "Elizabeth Carver",
    reviewUrl: "https://share.google/VJdLxVrHFlBLKV5Wq",
    location: "Jonesborough",
    date: "2026-08-07",
    stars: 5,
    text: "Excellent customer service and support. Very uplifting and informative. Shelly was kind and honest. Justin was also super approachable and supportive. Thanks again.",
    sourceUrl: GOOGLE_REVIEW_SOURCES[0].url,
  },
  {
    name: "Stephanie Childress",
    reviewUrl: "https://share.google/WyGF532q3XYyu9P04",
    location: "Jonesborough",
    date: "2026-06-05",
    stars: 5,
    text: "Providers are wonderful! fast service for IV therapy, great estheticians. Location/clinic is gorgeous. Highly recommend",
    sourceUrl: GOOGLE_REVIEW_SOURCES[0].url,
  },
];
