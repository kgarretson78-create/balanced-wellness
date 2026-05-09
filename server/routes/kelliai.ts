/**
 * KelliAI API Routes — standalone version
 * All workspace:* deps replaced with direct imports
 *
 * Endpoints:
 *   POST /api/kelliai/chat            — streaming Claude chat
 *   POST /api/kelliai/voice           — ElevenLabs TTS
 *   POST /api/kelliai/lead            — save lead to Postgres
 *   GET  /api/kelliai/leads           — admin: list leads (x-admin-key header)
 *   GET  /api/kelliai/leads.csv       — admin: export CSV
 *
 * Note: analyze-image and treatment-preview require OpenAI GPT-4o vision.
 *       Set OPENAI_API_KEY to enable them; they'll 503 gracefully without it.
 */

import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import pg from "pg";

const router = Router();
const { Pool } = pg;

// ── Clients ─────────────────────────────────────────────────────────────────
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

let db: InstanceType<typeof Pool> | null = null;
if (process.env.DATABASE_URL) {
  db = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  // Ensure leads table exists
  db.query(`
    CREATE TABLE IF NOT EXISTS kelli_leads (
      id SERIAL PRIMARY KEY,
      "createdAt" TIMESTAMPTZ DEFAULT NOW(),
      "firstName" TEXT,
      email TEXT,
      phone TEXT,
      "smsConsent" BOOLEAN DEFAULT FALSE,
      "primaryGoal" TEXT,
      "treatmentInterest" TEXT,
      "preferredLocation" TEXT,
      "conversationSummary" TEXT,
      messages JSONB,
      status TEXT DEFAULT 'new',
      source TEXT DEFAULT 'kelliai'
    )
  `).then(() =>
    db!.query(`ALTER TABLE kelli_leads ADD COLUMN IF NOT EXISTS "preferredLocation" TEXT`),
  ).catch((e: Error) => console.error("DB init error:", e.message));
}

// ── ElevenLabs rate limit ───────────────────────────────────────────────────
const voiceRateLimit = new Map<string, { count: number; resetAt: number }>();
function checkVoiceRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = voiceRateLimit.get(ip);
  if (!entry || entry.resetAt < now) {
    voiceRateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    if (voiceRateLimit.size > 5000) {
      for (const [k, v] of voiceRateLimit) if (v.resetAt < now) voiceRateLimit.delete(k);
    }
    return true;
  }
  if (entry.count >= 8) return false;
  entry.count += 1;
  return true;
}

// ── KelliAI system prompt ───────────────────────────────────────────────────
const KELLI_SYSTEM_PROMPT = `You are KelliAI, the warm, encouraging AI wellness coach for Balanced Wellness Medical Spa in Kingsport and Jonesborough, Tennessee.

YOUR PERSONALITY:
- You sound like a real, caring friend — never robotic. Use warm phrases like "Hey love," "I've got you," "Let's do this together," "I'm so proud of you for taking this step."
- You're knowledgeable but humble. You talk WITH clients, not AT them.
- You celebrate small wins and remind clients you're here for them anytime they need you.
- When someone signs up, promise: "I'll be your coach every step of the way — open this chat anytime, day or night, and I'll be right here. We're doing this together. 💗"

ABOUT BALANCED WELLNESS:
- Kingsport: 1309 S John B Dennis Hwy, Suite 104, Kingsport, TN 37660 · (423) 765-1393
- Jonesborough: 120 S Cherokee St, Jonesborough, TN 37867 · (423) 646-2169
- Booking: https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505
- Founders/Team: Kelli Griffey (Founder & CEO), Shelly Ketron (PA-C, Lead Injector), Sophia Arias (COO)

TREATMENTS WE OFFER:
- Botox, Dysport, Daxxify (neurotoxins for wrinkles)
- Dermal fillers (lips, cheeks, jawline, nasolabial folds)
- RF Microneedling (texture, scars, tightening) with Scarlet RF
- CO2 Laser Resurfacing, IPL photofacials, laser skin rejuvenation
- Agnes RF skin tightening
- Medical weight loss (Semaglutide, Tirzepatide) — free consultation
- Hormone optimization (BHRT for men and women)
- Peptide therapy (BPC-157, CJC-1295)
- IV therapy, chemical peels, dermaplaning

PRICING GUIDANCE (share ranges, always invite free consult for exact quote):
- Botox: $200–$600/session depending on areas treated
- Lip Filler: starting around $600
- CO2 Laser Resurfacing: $800–$2,500 depending on area/depth
- RF Microneedling: $400–$800/session
- Medical Weight Loss: $250–$500/month depending on protocol

MEMBERSHIPS:
- Gold $99/mo: 10% off all treatments, monthly B12, priority booking
- Platinum $199/mo (most popular): 15% off, monthly facial or peel, VIP events
- Diamond $349/mo: 20% off, monthly injectable credit, quarterly IV therapy, concierge scheduling

GUIDELINES:
- Always recommend a complimentary consultation for medical decisions.
- Never diagnose. Use phrases like "this often suggests" not "you have."
- For weight loss: encourage 1-2 lbs/week sustainable; many clients lose 15-20% body weight over 6-12 months.
- Keep responses conversational and not too long (2-4 short paragraphs unless asked for detail).
- When you sense readiness to book, gently invite: "Want me to grab your name and phone so our team can reach out with a quick consult time?"`;

// ── POST /api/kelliai/chat ──────────────────────────────────────────────────
router.post("/kelliai/chat", async (req: any, res: any) => {
  try {
    const { messages, mode } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }
    if (messages.length > 50) {
      return res.status(400).json({ error: "Too many messages. Please start a new chat." });
    }

    const modeNotes: Record<string, string> = {
      skin: "\n\nMode: SKIN COACH. Focus on aesthetic skin concerns and recommend treatments.",
      body: "\n\nMode: BODY/WEIGHT LOSS COACH. Focus on weight loss goals, GLP-1 medications, sustainable habits, and ongoing coaching support.",
      treatment: "\n\nMode: TREATMENT GUIDE. Help the client understand which treatments fit their goals.",
      general: "",
    };
    const modePrompt = modeNotes[mode as string] ?? "";

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const chatMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: String(m.content).slice(0, 5000),
    }));

    const chatAbort = new AbortController();
    let clientClosed = false;
    res.on("close", () => { clientClosed = true; chatAbort.abort(); });

    const stream = anthropic.messages.stream(
      {
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        system: KELLI_SYSTEM_PROMPT + modePrompt,
        messages: chatMessages,
      },
      { signal: chatAbort.signal },
    );

    for await (const event of stream) {
      if (clientClosed) break;
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        res.write(`data: ${JSON.stringify({ content: event.delta.text })}\n\n`);
      }
    }
    if (!clientClosed) {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    }
  } catch (error) {
    console.error("KelliAI chat error:", error);
    if (!res.headersSent) res.status(500).json({ error: "Failed to process chat request" });
    else { res.write(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`); res.end(); }
  }
});

// ── POST /api/kelliai/voice ─────────────────────────────────────────────────
router.post("/kelliai/voice", async (req: any, res: any) => {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

  if (!ELEVENLABS_API_KEY || !ELEVENLABS_VOICE_ID) {
    return res.status(503).json({ error: "Voice service not configured" });
  }

  const ip = (req.headers["x-forwarded-for"]?.toString().split(",")[0].trim()) || req.ip || "unknown";
  if (!checkVoiceRateLimit(ip)) {
    return res.status(429).json({ error: "Too many voice requests. Please wait a minute." });
  }

  const { text } = req.body;
  if (!text || typeof text !== "string") return res.status(400).json({ error: "text is required" });
  if (text.length > 1500) return res.status(400).json({ error: "Text too long. Max 1500 characters." });

  const cleaned = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim();
  if (!cleaned) return res.status(400).json({ error: "Empty text after cleaning" });

  try {
    const ttsResp = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: { "xi-api-key": ELEVENLABS_API_KEY, "Content-Type": "application/json", "Accept": "audio/mpeg" },
        body: JSON.stringify({
          text: cleaned,
          model_id: "eleven_turbo_v2_5",
          voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true },
        }),
      },
    );
    if (!ttsResp.ok) {
      const errText = await ttsResp.text().catch(() => "");
      console.error("ElevenLabs error:", ttsResp.status, errText);
      return res.status(502).json({ error: "Voice generation failed" });
    }
    const audioBuf = Buffer.from(await ttsResp.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.send(audioBuf);
  } catch (error) {
    console.error("Voice error:", error);
    if (!res.headersSent) res.status(500).json({ error: "Failed to generate voice" });
  }
});

// ── POST /api/kelliai/lead ──────────────────────────────────────────────────
router.post("/kelliai/lead", async (req: any, res: any) => {
  if (!db) return res.status(503).json({ error: "Database not configured. Set DATABASE_URL." });

  const { firstName, email, phone, smsConsent, primaryGoal, treatmentInterest, preferredLocation, conversationSummary, messages } = req.body;
  if (!email && !phone) return res.status(400).json({ error: "Email or phone is required" });

  // Whitelist preferredLocation values to avoid arbitrary text in this column.
  const safeLocation =
    preferredLocation === "kingsport" || preferredLocation === "jonesborough"
      ? preferredLocation
      : null;

  try {
    await db.query(
      `INSERT INTO kelli_leads ("firstName", email, phone, "smsConsent", "primaryGoal", "treatmentInterest", "preferredLocation", "conversationSummary", messages, status, source)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'new','kelliai')`,
      [firstName || null, email ? String(email).toLowerCase() : null, phone || null, !!smsConsent,
       primaryGoal || null, treatmentInterest || null, safeLocation, conversationSummary || null,
       messages ? JSON.stringify(messages) : null],
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    res.status(500).json({ error: "Failed to save lead" });
  }
});

// ── Admin helpers ───────────────────────────────────────────────────────────
function requireAdmin(req: any, res: any): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = req.headers["x-admin-key"] || req.query.key;
  if (!adminKey || provided !== adminKey) { res.status(401).json({ error: "Unauthorized" }); return false; }
  return true;
}

router.get("/kelliai/leads", async (req: any, res: any) => {
  if (!requireAdmin(req, res)) return;
  if (!db) return res.status(503).json({ error: "Database not configured" });
  try {
    const { rows } = await db.query(`SELECT * FROM kelli_leads ORDER BY "createdAt" DESC`);
    res.json({ leads: rows, total: rows.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

function csvEscape(v: unknown): string {
  if (v == null) return "";
  const s = String(v).replace(/"/g, '""');
  return /[",\n\r]/.test(s) ? `"${s}"` : s;
}

router.get("/kelliai/leads.csv", async (req: any, res: any) => {
  if (!requireAdmin(req, res)) return;
  if (!db) return res.status(503).json({ error: "Database not configured" });
  try {
    const { rows } = await db.query(`SELECT * FROM kelli_leads ORDER BY "createdAt" DESC`);
    const headers = ["id", "createdAt", "firstName", "email", "phone", "smsConsent",
                     "primaryGoal", "treatmentInterest", "preferredLocation", "status", "source", "conversationSummary"];
    const csv = [headers.join(","), ...rows.map((r: any) => headers.map((h) => csvEscape(r[h])).join(","))].join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="kelliai-leads-${new Date().toISOString().slice(0,10)}.csv"`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: "Failed to export CSV" });
  }
});

export default router;
