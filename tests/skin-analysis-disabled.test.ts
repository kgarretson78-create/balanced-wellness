import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const chat = readFileSync(new URL("../src/components/KelliAI.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../src/pages/SkinAnalyzer.tsx", import.meta.url), "utf8");

test("neither public surface fabricates skin scores or treatment matches", () => {
  for (const source of [chat, page]) {
    assert.doesNotMatch(source, /Math\.random|generateSkinAnalysis|generateResults|SkinResultsCard|overallScore|skinResults|AnalyzingAnimation/);
  }
});

test("the former analyzer route is honest and cannot collect or scan a photo", () => {
  assert.match(page, /Online skin analysis is not available/);
  assert.match(page, /does not assess or diagnose your skin from a photo/);
  assert.doesNotMatch(page, /getUserMedia|FileReader|type=["']file|onCapture|canvas|setTimeout/);
  assert.match(page, /open\(\{ service: "Consultation" \}\)/);
  assert.match(page, /href="\/contact"/);
});

test("legacy chat analysis actions lead to consultation, not camera access", () => {
  const legacyBranch = chat.split('action === "skin-analyzer" || action === "start-selfie"')[1]?.split('} else if')[0];
  assert.ok(legacyBranch);
  assert.match(legacyBranch, /Online skin analysis is not available/);
  assert.doesNotMatch(legacyBranch, /setShowCamera|fetch|generatePreview/);
  assert.doesNotMatch(chat, /label: "(?:Take AI Skin Analysis|Open Camera for Skin Analysis)|action: "(?:start-selfie|skin-analyzer)"/);
});

test("legitimate chat, contact and booking are preserved", () => {
  assert.match(chat, /kelliai\/chat/);
  assert.match(chat, /kelliai\/lead/);
  assert.match(chat, /openBookingChooser/);
  assert.match(chat, /askKelliAI/);
});
