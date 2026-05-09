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

const CANONICAL_HOST = process.env.CANONICAL_HOST || "balancedmedicalspa.com";

// Trust Railway's proxy so req.protocol/req.hostname are correct
app.set("trust proxy", true);

// Canonical host redirect: www.* -> apex
app.use((req, res, next) => {
  const host = req.hostname;
  if (host && host.startsWith("www.") && host.replace(/^www\./, "") === CANONICAL_HOST) {
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

// Serve React build (Vite outputs to /dist)
app.use(express.static(distPath, {
  index: false,
  setHeaders: (res, filePath) => {
    // Long cache for hashed Vite assets
    if (filePath.includes(`${path.sep}assets${path.sep}`)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  },
}));

// React Router catch-all — serve index.html for all non-API routes
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
