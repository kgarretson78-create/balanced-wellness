/**
 * Balanced Wellness Medical Spa — Production Server
 * Serves the React frontend + all KelliAI API routes
 */
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import kelliaiRouter from "./routes/kelliai.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Resolve the Vite build output. Try a few likely locations so the server
// keeps working regardless of cwd Railway runs from.
function resolveDistPath(): { distPath: string; tried: string[]; found: boolean } {
  const candidates = [
    process.env.DIST_PATH,
    path.resolve(process.cwd(), "dist"),
    path.resolve(__dirname, "../dist"),
    path.resolve(__dirname, "../../dist"),
    path.resolve(__dirname, "..", "..", "dist"),
    "/app/dist",
  ].filter(Boolean) as string[];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, "index.html"))) {
      return { distPath: c, tried: candidates, found: true };
    }
  }
  return { distPath: candidates[0], tried: candidates, found: false };
}
const { distPath, tried: distTried, found: distFound } = resolveDistPath();
if (!distFound) {
  console.error("[server] CRITICAL: dist/index.html not found. Tried:");
  for (const c of distTried) console.error(`  - ${c}`);
  console.error("[server] cwd:", process.cwd());
  console.error("[server] __dirname:", __dirname);
}

const CANONICAL_HOST = (process.env.CANONICAL_HOST || "www.balancedmedicalspa.com").toLowerCase();
// Registrable domain behind the canonical host, e.g. "balancedmedicalspa.com".
const APEX_DOMAIN = CANONICAL_HOST.replace(/^www\./, "");

// Trust Railway's proxy so req.protocol/req.hostname are correct
app.set("trust proxy", true);

// Canonical host redirect.
//
// Redirect the apex (balancedmedicalspa.com) and any other non-canonical
// subdomain of the registrable domain up to CANONICAL_HOST, preserving the
// full pathname + query string (`req.originalUrl`). This fixes deep-path
// requests like `/telehealth` on the bare apex, which must land on the www
// host rather than 404.
//
// Only hosts within our own domain family are touched. Foreign hosts — the
// Railway-provided `*.up.railway.app` domain, preview URLs, and `localhost`
// in dev — never match, so they are left to resolve normally.
app.use((req, res, next) => {
  // Never bounce the health check; Railway probes it on internal hosts.
  if (req.path === "/health") return next();

  // req.hostname already excludes the port, but normalise defensively so a
  // stray port or upper-case Host header can't slip past the comparison.
  const host = (req.hostname || "").replace(/:\d+$/, "").toLowerCase();
  if (!host) return next();

  const isOurDomain = host === APEX_DOMAIN || host.endsWith(`.${APEX_DOMAIN}`);
  if (isOurDomain && host !== CANONICAL_HOST) {
    return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
  }
  next();
});

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "15mb" }));

// API routes
app.use("/api", kelliaiRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Balanced Wellness Medical Spa",
    ts: new Date().toISOString(),
    distFound,
    distPath,
    cwd: process.cwd(),
  });
});

// Explicit static SEO files — guarantees correct Content-Type and avoids
// any chance of the SPA fallback swallowing them.
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").sendFile(path.join(distPath, "robots.txt"));
});
app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml").sendFile(path.join(distPath, "sitemap.xml"));
});

// Prerendered route handler — registered BEFORE express.static so the static
// middleware never sees these paths and never auto-redirects them to a
// trailing-slash URL. For each request, if a file at dist/<slug>/index.html
// exists and the slug is a safe ASCII path, we serve that page-specific HTML.
// Otherwise the request continues to express.static (for assets) and finally
// to the SPA fallback below.
app.get("*", (req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  if (req.path.startsWith("/api/")) return next();
  if (!distFound) return next();
  // Skip if the request already has a file extension — those are real assets
  // served by express.static.
  if (/\.[a-z0-9]+$/i.test(req.path)) return next();

  const slug = req.path.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!slug || !/^[a-z0-9][a-z0-9-/]*$/i.test(slug)) return next();

  const candidate = path.join(distPath, slug, "index.html");
  if (!candidate.startsWith(distPath + path.sep)) return next();
  if (!fs.existsSync(candidate)) return next();

  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(candidate);
});

// Serve React build (Vite outputs to /dist). `redirect: false` prevents
// express.static from issuing a trailing-slash redirect when a request maps
// to one of our prerendered route directories.
app.use(express.static(distPath, {
  index: false,
  redirect: false,
  setHeaders: (res, filePath) => {
    // Long cache for hashed Vite assets
    if (filePath.includes(`${path.sep}assets${path.sep}`)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  },
}));

// SPA fallback — serve the bundled index.html for any non-API, non-asset
// route that didn't match a prerendered file above. React Router takes over
// from there on the client.
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (!distFound) {
    res.status(503).type("text/plain").send(
      `Service starting: frontend build artifacts not found.\n\n` +
      `Tried:\n${distTried.map((p) => "  - " + p).join("\n")}\n\n` +
      `cwd: ${process.cwd()}\n__dirname: ${__dirname}\n` +
      `Check the Railway build logs — \`npm run build\` should produce dist/index.html.\n`
    );
    return;
  }
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n✅ Balanced Wellness server running on port ${PORT}`);
  console.log(`   Dist:    ${distPath}`);
  console.log(`   KelliAI: http://localhost:${PORT}/api/kelliai/chat`);
  console.log(`   Site:    http://localhost:${PORT}/\n`);
});
