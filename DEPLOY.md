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
