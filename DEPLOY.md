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
| `ALLOWED_ORIGIN` | CORS allowlist. Set to `https://balancedmedicalspa.com` in prod (default `*`) |
| `CANONICAL_HOST` | Apex host. Default `balancedmedicalspa.com`. The server 301s `www.*` to this host |
| `VITE_API_URL` | **Build-time only.** Leave unset to use the same-origin `/api` routes. Set to an absolute URL (no trailing slash) if KelliAI is hosted separately, e.g. `https://kelliai.balancedmedicalspa.com/api` |
| `VITE_PODIUM_BOOKING_URL_KINGSPORT` | **Build-time only.** Per-location Podium scheduling URL for the Kingsport clinic. When set, "Book at Kingsport" deep-links here. |
| `VITE_PODIUM_BOOKING_URL_JONESBOROUGH` | **Build-time only.** Per-location Podium scheduling URL for the Jonesborough clinic. |
| `VITE_PODIUM_BOOKING_URL` | **Build-time only.** Optional shared/fallback scheduling URL used for any location whose dedicated URL isn't set. If neither this nor the per-location vars are configured, links fall back to the legacy single-tenant URL so nothing 404s, and the chooser dialog plus contact form surface a "call or text us" banner. |

Railway sets PORT automatically — do not set it manually.

### Booking / location chooser

Every "Book Now" / "Book Consultation" CTA on the site opens a **location chooser** dialog
that asks the user to pick **Kingsport** or **Jonesborough**, then opens that location's
scheduling URL in a new tab. The user's choice is also stored in `localStorage` and
attached to KelliAI / contact-form lead submissions as `preferredLocation` so the team
knows which clinic to route follow-up to.

URLs are resolved at build time from the env vars above. The legacy single-tenant URL
(`https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505`) is only used
as a last-resort fallback so the page never 404s. While the calendar shows no
availability, the chooser displays a banner telling visitors to call or text instead —
this is what to fix on the Podium side:

1. **In Podium**, create (or finish) one bookable provider/calendar **per location**.
   The current single-tenant link routes everyone to the same calendar; if business
   hours, providers, or services aren't published for that calendar, every slot reads
   "no availability."
2. Verify each location has: business hours, at least one bookable resource (provider
   or chair), the services that are bookable online, and a buffer/lead time that
   isn't set so far in the future that no slot is offerable today.
3. Copy the per-location booking link from Podium and paste it into Railway as
   `VITE_PODIUM_BOOKING_URL_KINGSPORT` / `VITE_PODIUM_BOOKING_URL_JONESBOROUGH`,
   then redeploy. (These are build-time vars, so a rebuild is required.)
4. Until that's done, the call/text banner stays visible. Leads still flow through the
   Contact form, KelliAI, and the per-location phone numbers.

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

SSL is automatic. The Express server 301-redirects `www.*` → apex via `CANONICAL_HOST`, so Google sees a single canonical origin. The `<link rel="canonical">` tag in `index.html` and the dynamic SEO component reinforce this.

---

## Verify after deploy

- your-url.railway.app/ → Website loads
- your-url.railway.app/health → {"status":"ok"}
- your-url.railway.app/robots.txt → plain text with sitemap reference
- your-url.railway.app/sitemap.xml → valid XML sitemap
- https://www.balancedmedicalspa.com → 301 → https://balancedmedicalspa.com

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
