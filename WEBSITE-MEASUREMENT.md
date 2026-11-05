# Website measurement contract

Status: collection disabled. The old VisitorTracker sent session IDs, raw paths and referrers to a nonexistent POST /api/track route. The source and approved production bundle now disable it. No new collector, dashboard, credentials, analytics recipient or storage was created.

The pure `websiteEvent` validator is preparation for a future verified first-party adapter; it is not wired to clicks and is not live reporting. It accepts only schemaVersion 1 with an event (`booking_click`, `phone_click`, `sms_click`) and location (`kingsport`, `jonesborough`). Extra fields are rejected. Consent must explicitly be granted for each event; default, decline and withdrawal yield no event. Do not queue or replay events.

No page URL, referrer, UTM/free-text values, scheduling URLs, contact data, treatment details, patient identifiers or persistent/session identifiers may enter this contract. A click is not an inquiry, lead, completed booking, attended visit or collected revenue. Those outcomes require separately verified server-side evidence. Demo bookings must never count as real outcomes. KelliAI's existing Marketing Command Center should consume the eventual aggregate location/event counts without collapsing events into leads; this change does not modify KelliAI.

Activation dependency: verify a Balanced-owned reporting destination, retention/access model and consent/withdrawal integration, then explicitly implement and test that adapter. No Balanced GA4 property/GTM container or durable first-party reporting store is currently verified. Google Ads customer 568-639-3497 is not a measurement ID; Skindulgence's property must not be reused.

# Release

`npm run build` preserves the approved client, existing house-photo/payment/hours corrections, then runs `apply-anniversary-release.mjs`. The guarded patch compiles the event from source against the existing React/layout/location constants, removes the old event and unsafe tracker, adds a discoverable event banner, gives the bundle a new content hash, and renders event metadata/static HTML and sitemap. `/bootox` returns HTTP 301 without forwarding query strings. Regular Saturday Closed hours are unchanged.

Validation: `npm run build`; `node --import tsx scripts/test-website-events.ts`. Optional browser QA requires Playwright installed without changing the lockfile and local Chrome: `node scripts/test-anniversary-browser.mjs`. It starts a temporary local server on port 3109 and checks desktop/mobile, links, redirects, sitemap, metadata, navigation and absence of tracking requests.
