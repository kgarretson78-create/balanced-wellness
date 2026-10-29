# Confirmed financing and schema corrections — October 29, 2026

## Scope

The owner confirmed CareCredit, Cherry, Ally, Affirm, Klarna and Afterpay are available at both Kingsport and Jonesborough. `src/lib/payment-options.json` is the common wording source. It states provider eligibility and terms vary, without promising approval, APRs or a particular installment schedule. Existing Podium/card checkout remains unchanged.

The production build still verifies and copies the immutable approved October 26 release. `prepare-approved-release.mjs` then runs guarded corrections before the existing photo/hours patches. It does not rebuild the older React design. The small equivalent source changes prevent known content drift during future source reconciliation.

The corrections:

- Harmonize payment-page cards/copy, two Kingsport FAQs and JSON-LD.
- Give the shared organization schema a stable ID so the client updates it, rather than appending a duplicate. Keep that global node during navigation to routes without a schema component.
- Correct the existing organization founder object's job title to COO; do not add or alter ownership claims.
- Set server-delivered title, description, canonical and social metadata on About, Contact, booking aliases, payment options and Gallery, matching existing client metadata. Booking aliases retain `/book-now` as canonical. Remove copied homepage FAQ schema from these routes. Broader static body/source reconciliation remains separate.
- Give the corrected JS URL a content-derived query cache key, because Express serves assets with an immutable one-year cache. This preserves filename markers required by later guarded patches.

No changes to pricing, services, phone numbers, booking URLs, imagery, styles, analytics accounts or form submissions. No merge or deployment is included.

## Compatibility and checks

- `node --test tests/site-corrections.test.mjs`: eight tests cover copy/schema, compiled schema lifecycle, metadata, cache key, immutable release checksums, unchanged links/styles/images and fail-closed guards.
- `npm run build`: approved snapshot preparation and Express server TypeScript build.
- `node --check dist/assets/index-jonesborough-hours-20261026.js`: final client syntax.
- PR #44's `refine-approved-client.mjs` can run after the same build; it is not changed or merged by this work.
- Full `npm run typecheck` remains blocked by 11 diagnostics already present at base `c043610`: duplicate `useState` imports in Gallery and pre-existing SEO expectation-card type errors. Baseline and modified diagnostics were compared and are identical. An expanded check including the prerender script also exposes its pre-existing Router children typing error.
- Browser layout, real booking completion, contact delivery and analytics receipt are not established by these checks. Keep the pull request draft pending visual QA and publication approval.
