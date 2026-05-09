#!/usr/bin/env node
/**
 * Ensure both the client (dist/index.html) and server (dist-server/index.js)
 * builds exist. If either is missing — e.g. Railway started the container
 * without running the build phase — try `npm run build` to produce them.
 *
 * Idempotent: a no-op when both artifacts are already present, so it adds
 * essentially zero startup time on healthy deploys.
 *
 * Failure-tolerant: if the build can't run at start time (e.g. devDeps were
 * pruned), we still let the server boot so /health and a diagnostic 503 are
 * available — easier to debug than a crash loop.
 */
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const clientEntry = resolve(repoRoot, "dist", "index.html");
const serverEntry = resolve(repoRoot, "dist-server", "index.js");

const missing = [];
if (!existsSync(clientEntry)) missing.push(`dist/index.html (${clientEntry})`);
if (!existsSync(serverEntry)) missing.push(`dist-server/index.js (${serverEntry})`);

if (missing.length === 0) {
  console.log("[ensure-build] artifacts present, skipping build");
  process.exit(0);
}

console.log("[ensure-build] missing artifacts:");
for (const m of missing) console.log(`  - ${m}`);
console.log("[ensure-build] running `npm run build`");

const result = spawnSync("npm", ["run", "build"], {
  cwd: repoRoot,
  stdio: "inherit",
  env: process.env,
});

if (result.status !== 0) {
  console.error(`[ensure-build] build exited with code ${result.status}; continuing so server can boot with a diagnostic`);
  process.exit(0);
}

console.log("[ensure-build] build complete");
process.exit(0);
