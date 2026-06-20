# Balanced Wellness Medical Spa — Railway Deployment Guide

## Architecture
One Railway service handles everything:
- `npm run build` → Vite builds React to /dist/ + TSC compiles Express to /dist-server/
- `npm start` → Serves React frontend + KelliAI API on same port

---

## Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Balanced Wellness + KelliAI initial deploy"
# Create repo at github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/balanced-wellness.git
git push -u origin main
```

---

## Step 2 — Create Railway project

1. Go to railway.app → Sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your balanced-wellness repo
4. Railway auto-detects Node.js and reads railway.json

---

## Step 3 — Add environment variables

In Railway dashboard → your service → Variables tab:

| Variable | Notes |
|----------|-------|
| `ANTHROPIC_API_KEY` | From console.anthropic.com — REQUIRED for KelliAI chat |
| `ELEVENLABS_API_KEY` | From elevenlabs.io — for KelliAI voice |
| `ELEVENLABS_VOICE_ID` | From your ElevenLabs voice library |
| `DATABASE_URL` | Added automatically when you add Postgres (Step 4) |
| `ADMIN_API_KEY` | Any secret string — protects /api/kelliai/leads |
| `ALLOWED_ORIGIN` | CORS allowlist. Set to `https://www.balancedmedicalspa.com` in prod (default `*`) |
| `CANONICAL_HOST` | Canonical host. Default `www.balancedmedicalspa.com`. The server 301s the non-canonical variant (apex or `www.*`) to this host |
| `VITE_API_URL` | **Build-time only.** Leave unset to use the same-origin `/api` routes. Set to an absolute URL (no trailing slash) if KelliAI is hosted separately, e.g. `https://kelliai.balancedmedicalspa.com/api` |
| `VITE_PODIUM_BOOKING_URL_KINGSPORT` | **Build-time only.** Optional override for the Kingsport Podium scheduling URL. Defaults to `https://booking.podium.com/medspa/01930831-564b-7342-98d8-620e43a707e7` (hardcoded in `src/lib/booking.ts`). |
| `VITE_PODIUM_BOOKING_URL_JONESBOROUGH` | **Build-time only.** Optional override for the Jonesborough Podium scheduling URL. Defaults to `https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505` (hardcoded in `src/lib/booking.ts`). |
| `VITE_PODIUM_BOOKING_URL` | **Build-time only.** Optional shared/fallback scheduling URL. Used only if a location has no per-location default and no per-location env var. |
| `VITE_REFILL_PORTAL_URL` | **Build-time only.** Exact Balanced Wellness Refill.co telehealth portal URL. **No hardcoded default** — until this is set, generic telehealth CTAs route to `/online-care`. |
| `VITE_REFILL_PORTAL_ENABLED` | **Build-time only.** Optional. Defaults to enabled when a valid `VITE_REFILL_PORTAL_URL` is set. Set to `false` to disable the portal CTAs without removing the URL. |
| `VITE_PODIUM_TELEMED_URL` | **Build-time only.** Optional override for the telemedicine consultation Podium calendar used by online-care consult/fallback CTAs. Real default hardcoded in `src/lib/booking.ts` (`01930831-…`); patients pick "Telemedicine Consultation" in Podium. |
| `VITE_REFILL_ASSESSMENT_WEIGHT_LOSS` | **Build-time only.** Optional. Refill.co assessment URL for the Online Weight Loss card on `/online-care`. Empty → card falls back to `/book-now`. |
| `VITE_REFILL_ASSESSMENT_PEPTIDES` | **Build-time only.** Optional override for the Peptide Therapy assessment URL. Ships with a real hardcoded default in `src/lib/booking.ts`. |
| `VITE_REFILL_ASSESSMENT_SKINCARE` | **Build-time only.** Optional. Refill.co assessment URL for the Online Skincare card. Empty → card falls back to `/book-now`. |
| `VITE_REFILL_ASSESSMENT_WOMENS_HEALTH` | **Build-time only.** Optional. Refill.co assessment URL for the Women's Health card. Empty → card falls back to `/book-now`. |
| `VITE_REFILL_ASSESSMENT_MENS_HEALTH` | **Build-time only.** Optional. Refill.co assessment URL for the Men's Health card. Empty → card falls back to `/book-now`. |

Railway sets PORT automatically — do not set it manually.

### Booking / location chooser

Every "Book Now" / "Book Consultation" CTA on the site opens a **location chooser** dialog
that asks the user to pick **Kingsport** or **Jonesborough**, then opens that location's
scheduling URL in a new tab. The user's choice is also stored in `localStorage` and
attached to KelliAI / contact-form lead submissions as `preferredLocation` so the team
knows which clinic to route follow-up to.

URLs are resolved at build time. Each location has a real, dedicated Podium calendar
hardcoded as a default in `src/lib/booking.ts`:

- **Kingsport** → `https://booking.podium.com/medspa/01930831-564b-7342-98d8-620e43a707e7`
- **Jonesborough** → `https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505`

Resolution order per location:

1. `VITE_PODIUM_BOOKING_URL_<LOCATION>` env var (per-location override in Railway)
2. The hardcoded default above
3. `VITE_PODIUM_BOOKING_URL` (shared fallback)

To swap a location's URL without a code change, set the corresponding per-location
env var in Railway → Variables and redeploy (these are build-time, so a rebuild is
required).

#### Social booking link

`/book-now` (alias `/social-booking`) is a mobile-first landing page that shows the
Kingsport / Jonesborough chooser and routes each card straight to that location's
Podium scheduler. It also forwards any UTM/query params from the social link through
to Podium so attribution is preserved. Use this as the Instagram / Facebook / TikTok
bio link:

```
https://www.balancedmedicalspa.com/book-now
```

### Online Care & Telehealth (Refill.co)

`/online-care` (aliases `/telehealth`, `/online-telehealth`) is a guided hub that shows
one card per service category — **Online Weight Loss, Peptide Therapy, Online Skincare,
Women's Health, Men's Health**. Every generic telehealth CTA across the site routes to
`/online-care`, which is always a safe internal destination.

**Telemedicine consultation booking.** Online-care consult and fallback CTAs (a hub
"Not sure where to start?" banner, the per-card consult link when a category has no
assessment, and a "Prefer to talk to a provider first?" link on category pages) open a
dedicated **Podium telemedicine calendar** where patients pick "Telemedicine
Consultation". The URL (`TELEMEDICINE_CONSULT` in `src/lib/booking.ts`, overridable via
`VITE_PODIUM_TELEMED_URL`) is a single virtual-visit calendar and is intentionally
separate from the Kingsport/Jonesborough in-person chooser, which stays unchanged for
normal "Book Now" / social booking. The Refill.co assessment links remain the path for
assessments — the Podium consult is for scheduling a provider visit.

Each card can list **multiple** Refill.co assessment options, grouped in
`src/lib/booking.ts` (`ASSESSMENT_DEFAULTS`). Every option is tagged
`primary` or `secondary`:

- **primary** = a broad goal/intake assessment ("start here"). The `/online-care`
  hub shows **only** the primary options (max 3 per card) plus a "See all …
  assessments" link to the category page, so the hub stays simple.
- **secondary** = a medication- or product-specific drill-down. These appear on
  the category page under an "Already know what you need?" heading.

Assessment options are resolved at build time per category:

1. `VITE_REFILL_ASSESSMENT_<CATEGORY>` env var (prepended as a primary option)
2. The hardcoded options in `src/lib/booking.ts` (`ASSESSMENT_DEFAULTS`)
3. No valid option → the card falls back to `/book-now`

Duplicate links (same URL, or the same product provided twice) are de-duped; where
the practice provided two links for the same product, the newest/clearest one is kept.

Currently configured (hardcoded, practice-provided). **Primary** in bold:

- **Online Weight Loss** — **Weight Loss goal assessment**, **Comprehensive GLP-1**;
  then Semaglutide, Tirzepatide, Retatrutide, Lipotropic (medication-specific)
- **Peptide Therapy** — **Peptide Interest & Goal**; then CJC-1295/Ipamorelin,
  AOD-9604/MOTS-C/Tesamorelin/Ipamorelin, MOTS-c, Tesamorelin, Sermorelin, BPC-157
  (injection & oral), TB-500, Wolverine Blend, NAD+, Glutathione, Semax & Selank,
  Kisspeptin, Epithalon, Dihexa, SLU-PP-332, Elamipretide, KLOW, Glow Blend injection,
  GHK-Cu injection, Peptide Life stack
- **Online Skincare & Topicals** — **Hair & Skin Treatment Goal**, **Skin/Face Goal**;
  then GHK-Cu (Aquabiome+), Glow Blend/Stella+/Vitality topical, Stella+, Oral GHK-Cu,
  GHK-Cu safety/intake, Brilliance, Cedar Oral Hair Tablet, Hair Force One, Cashmere,
  Hair Revive, Lock Lux, Raven, Willow, Ivy
- **Men's Health** — **Enclomiphene new patient assessment**
- **Women's Health** — **Vitality Plus** (general wellness intake, not hormone therapy);
  then Stella+ topical. Hormone concerns are provider-led → book a consultation.

Branded product/protocol names (Lock Lux, Raven, Willow, Ivy, Brilliance, Cashmere,
etc.) are shown with plain-language descriptions because the names are not
self-explanatory to patients. To add a future link, append an entry (with a `tier`)
to the relevant category in `ASSESSMENT_DEFAULTS` **or** set the matching env var.

> Note: the "Check-in" assessment is for existing patients and is not surfaced as a
> public new-patient CTA.

The legacy `VITE_REFILL_PORTAL_URL` still drives any generic single-portal redirect, but
the primary entry point is now the `/online-care` hub.

All online-care copy is intentionally conservative: a provider reviews every request, no
diagnosis is made online, eligibility is never guaranteed, and emergencies are directed to
call 911 or visit urgent care.

Matching local SEO/AEO pages are prerendered for each category:
`/online-weight-loss-kingsport-tn`, `/peptide-therapy-kingsport-tn`,
`/online-skincare-kingsport-tn`, `/womens-health-kingsport-tn`,
`/mens-health-kingsport-tn`.

### KelliAI integration

The KelliAI chat widget posts to `${VITE_API_URL || "/api"}/kelliai/chat`. By default it calls the routes
served by this same Express process (see `server/routes/kelliai.ts`), so no extra wiring is needed.

If you ever split KelliAI into its own service (e.g. the standalone repo at
`https://github.com/kgarretson78-create/KelliAI`), set `VITE_API_URL` at **build time** in Railway and
point it at that service's `/api` base. No secrets are baked into the bundle — only the URL.

---

## Step 4 — Add Postgres (for lead capture)

1. In your Railway project → "+ New" → "Database" → "PostgreSQL"
2. Railway creates DB and auto-injects DATABASE_URL into your service
3. The server creates the kelli_leads table automatically on first boot

KelliAI chat and voice work without Postgres — only lead saving requires it.

---

## Step 5 — Custom domain

Railway dashboard → Settings → Domains → Add Custom Domain. Add **both**:

- `balancedmedicalspa.com` (apex)
- `www.balancedmedicalspa.com`

Point your DNS:
- Apex `balancedmedicalspa.com` → Railway-provided CNAME/ALIAS (use ALIAS/ANAME if your DNS supports it; Cloudflare flattens CNAME at apex automatically)
- `www` → CNAME to the same Railway target

SSL is automatic. The Express server 301-redirects the non-canonical variant to `CANONICAL_HOST` (default `www.balancedmedicalspa.com`), so Google sees a single canonical origin. The `<link rel="canonical">` tag in `index.html` and the dynamic SEO component reinforce this.

---

## Verify after deploy

- your-url.railway.app/ → Website loads
- your-url.railway.app/health → {"status":"ok"}
- your-url.railway.app/robots.txt → plain text with sitemap reference
- your-url.railway.app/sitemap.xml → valid XML sitemap
- https://balancedmedicalspa.com → 301 → https://www.balancedmedicalspa.com

---

## View leads

```bash
# JSON
curl https://your-url.railway.app/api/kelliai/leads -H "x-admin-key: YOUR_ADMIN_API_KEY"

# CSV (open in Excel)
curl https://your-url.railway.app/api/kelliai/leads.csv -H "x-admin-key: YOUR_ADMIN_API_KEY" -o leads.csv
```

---

## Local development

```bash
# Terminal 1 — Express API (port 3000)
npm run dev:server

# Terminal 2 — Vite frontend (port 5173, proxies /api to 3000)
npm run dev
# Open http://localhost:5173
```

---

## Railway pricing

- Hobby: $5/month — perfect for a medspa site
- Pro: $20/month — for high traffic or SLA guarantee
- Postgres: free up to 1GB, then $5/mo

## Locations

- Kingsport: 1309 S John B Dennis Hwy, Ste 104, Kingsport TN 37660 — (423) 765-1393
- Jonesborough: 120 S Cherokee St, Jonesborough TN 37867 — (423) 646-2169
