import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { FEATURED_REVIEWS, GOOGLE_REVIEW_SOURCES } from "../src/lib/reviews.ts";

test("featured reviews keep source, location, date and five-star provenance", () => {
  assert.equal(FEATURED_REVIEWS.length, 3);
  for (const review of FEATURED_REVIEWS) {
    assert.equal(review.stars, 5);
    assert.match(review.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(GOOGLE_REVIEW_SOURCES.some(source => source.location === review.location && source.url === review.sourceUrl));
  }
  assert.equal(FEATURED_REVIEWS.find(review => review.name === "Wendy Finney")?.text, null);
});

test("curation and rating-only wording are explicit, with an all-reviews link", () => {
  const source = readFileSync("src/components/FeaturedReviews.tsx", "utf8");
  for (const text of ["Featured five-star Google reviews", "not all reviews or an overall rating", "No written review", "Read all"]) assert.ok(source.includes(text));
  assert.ok(!source.includes("aggregateRating"));
});

test("unsupported aggregate and placeholder claims do not remain in affected content", () => {
  const paths = ["src/pages/Home.tsx", "src/lib/site.ts", "src/pages/About.tsx", "src/components/SchemaMarkup.tsx", "scripts/prerender.ts", "src/components/SEOServicePage.tsx", "src/components/LocalSEOPage.tsx", "src/pages/seo/MedicalSpaKingsport.tsx", "src/pages/seo/MedicalSpaJonesborough.tsx", "src/pages/seo/KingsportMedSpa.tsx", "src/pages/seo/JonesboroughMedSpa.tsx"];
  for (const path of paths) {
    const source = readFileSync(path, "utf8");
    assert.doesNotMatch(source, /8,000\+|8,000 patients|200\+ (five-star|5-star)|number: "5\.0"|most-reviewed and highest-rated|name: "Sarah M\."|name: "Jennifer T\."/i, path);
  }
});

test("featured quotes retain their exact public wording and direct review links", () => {
  assert.equal(FEATURED_REVIEWS.find(review => review.name === "Elizabeth Carver")?.text, "Excellent customer service and support. Very uplifting and informative. Shelly was kind and honest. Justin was also super approachable and supportive. Thanks again.");
  assert.equal(FEATURED_REVIEWS.find(review => review.name === "Stephanie Childress")?.text, "Providers are wonderful! fast service for IV therapy, great estheticians. Location/clinic is gorgeous. Highly recommend");
  assert.equal(FEATURED_REVIEWS.find(review => review.name === "Elizabeth Carver")?.reviewUrl, "https://share.google/VJdLxVrHFlBLKV5Wq");
  assert.equal(FEATURED_REVIEWS.find(review => review.name === "Stephanie Childress")?.reviewUrl, "https://share.google/WyGF532q3XYyu9P04");
});
