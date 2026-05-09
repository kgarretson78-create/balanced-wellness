/**
 * Balanced Wellness Medical Spa — Production Server
 * Serves the React frontend + all KelliAI API routes
 */
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import kelliaiRouter from "./routes/kelliai.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "15mb" }));

// API routes
app.use("/api", kelliaiRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "Balanced Wellness Medical Spa", ts: new Date().toISOString() });
});

// Serve React build (Vite outputs to /dist)
const distPath = path.resolve(__dirname, "../../dist");
app.use(express.static(distPath));

// React Router catch-all — serve index.html for all non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n✅ Balanced Wellness server running on port ${PORT}`);
  console.log(`   KelliAI: http://localhost:${PORT}/api/kelliai/chat`);
  console.log(`   Site:    http://localhost:${PORT}/\n`);
});
