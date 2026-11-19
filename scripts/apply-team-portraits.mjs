import { createHash } from "node:crypto";
import { cpSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const portraits = {
  "kelli-white-suit.webp": "Kelli Garretson Griffey",
  "shelly-long-blonde.webp": "Shelly Ketron",
  "meagan-portrait.webp": "Meagan, The Beauty Medic",
  "victoria-portrait.webp": "Victoria Ledford",
};

function applyTeamPortraits(dist) {
  const assets = resolve(dist, "assets");
  const bundle = "index-jonesborough-hours-20261026.js";
  const path = resolve(assets, bundle);
  let source = readFileSync(path, "utf8");

  const replacements = [
    ["/images/kelli-garretson-griffey.webp", "/images/kelli-white-suit.webp"],
    ["/images/kelli-garretson-griffey.jpg", "/images/kelli-white-suit.webp"],
    ["/images/shelly-ketron-updated.jpeg", "/images/shelly-long-blonde.webp"],
    ['className:"bw-team-initial","aria-hidden":"true",children:"M"', "meagan-portrait.webp"],
    ['className:"bw-partner-monogram","aria-hidden":"true",children:"M"', "meagan-portrait.webp"],
    ['className:"bw-team-initial","aria-hidden":"true",children:"V"', "victoria-portrait.webp"],
  ];
  for (const [original, replacement] of replacements) {
    if (!source.includes(original)) throw new Error(`Approved portrait reference missing: ${original}`);
    if (replacement.startsWith("/")) {
      source = source.replaceAll(original, replacement);
    } else {
      const span = `n.jsx("span",{${original}})`;
      if (!source.includes(span)) throw new Error(`Approved profile card missing: ${original}`);
      const alt = JSON.stringify(portraits[replacement]);
      const width = original.includes("bw-partner-monogram") ? 192 : 104;
      source = source.replaceAll(span, `n.jsx("img",{src:"/images/${replacement}",alt:${alt},width:${width},height:${width},loading:"lazy",style:{objectFit:"cover",borderRadius:"50%",display:"block",marginBottom:"1rem"}})`);
    }
  }
  for (const filename of Object.keys(portraits)) {
    cpSync(resolve("public/images", filename), resolve(dist, "images", filename));
  }
  const hash = createHash("sha256").update(source).digest("hex").slice(0, 12);
  const updatedBundle = `index-team-${hash}.js`;
  writeFileSync(resolve(assets, updatedBundle), source);

  function updateHtml(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filename = resolve(directory, entry.name);
      if (entry.isDirectory()) updateHtml(filename);
      else if (entry.name.endsWith(".html")) {
        const html = readFileSync(filename, "utf8");
        const updated = html.replaceAll(`/assets/${bundle}`, `/assets/${updatedBundle}`);
        if (updated !== html) writeFileSync(filename, updated);
      }
    }
  }
  updateHtml(dist);
}

applyTeamPortraits(resolve("dist"));
