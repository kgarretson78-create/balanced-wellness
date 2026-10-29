import { readFileSync, cpSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
const release = resolve("releases/2026-10-26-approved");
const manifest = JSON.parse(readFileSync(`${release}/manifest.json`, "utf8"));
for (const [file, expected] of Object.entries(manifest.files)) {
  const actual = createHash("sha256").update(readFileSync(`${release}/client/${file}`)).digest("hex");
  if (actual !== expected) throw new Error(`Approved release integrity mismatch: ${file}`);
}
rmSync("dist", { recursive: true, force: true });
cpSync(`${release}/client`, "dist", { recursive: true });
console.log(`Prepared ${Object.keys(manifest.files).length} verified approved client files`);
// Guarded, owner-confirmed content corrections; retain the approved visual artifact.
const { applySiteCorrections } = await import("./apply-site-corrections.mjs");
applySiteCorrections("dist");
