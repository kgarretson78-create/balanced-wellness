import { createHash } from "node:crypto";
import { cpSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const portraits = {
  "justin-studio.webp": "Justin Jennings",
  "maddie-studio-wide.webp": "Maddie Horn, RMA",
  "sophia-suit.webp": "Sophia Arias",
  "kelli-white-suit.webp": "Kelli Garretson Griffey",
  "shelly-studio.webp": "Shelly Ketron",
  "meagan-studio.webp": "Meagan, The Beauty Medic",
  "victoria-studio.webp": "Victoria Ledford",
};

function applyTeamPortraits(dist) {
  const assets = resolve(dist, "assets");
  const bundle = "index-jonesborough-hours-20261026.js";
  const path = resolve(assets, bundle);
  let source = readFileSync(path, "utf8");

  const replacements = [
    ["/images/sophia-arias.webp", "/images/sophia-suit.webp"],
    ["/images/sophia-arias.jpg", "/images/sophia-suit.webp"],
    ["/images/kelli-garretson-griffey.webp", "/images/kelli-white-suit.webp"],
    ["/images/kelli-garretson-griffey.jpg", "/images/kelli-white-suit.webp"],
    ["/images/shelly-ketron-updated.jpeg", "/images/shelly-studio.webp"],
    ['className:"bw-team-initial","aria-hidden":"true",children:"M"', "meagan-studio.webp"],
    ['className:"bw-partner-monogram","aria-hidden":"true",children:"M"', "meagan-studio.webp"],
    ['className:"bw-team-initial","aria-hidden":"true",children:"V"', "victoria-studio.webp"],
    ['className:"bw-team-initial","aria-hidden":"true",children:"J"', "justin-studio.webp"],
    ['className:"bw-partner-monogram","aria-hidden":"true",children:"J"', "justin-studio.webp"],
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
      const position = ["meagan-studio.webp", "justin-studio.webp"].includes(replacement) ? "center 20%" : "center top";
      source = source.replaceAll(span, `n.jsx("img",{src:"/images/${replacement}",alt:${alt},width:${width},height:${width},loading:"lazy",style:{height:${width},objectPosition:"${position}",objectFit:"cover",borderRadius:"50%",display:"block",marginBottom:"1rem"}})`);
    }
  }
  const staffSectionEnd = 'n.jsxs("div",{className:"bw-independent-heading"';
  if (source.split(staffSectionEnd).length !== 2) {
    throw new Error("Balanced staff section could not be identified");
  }
  const maddieProfile = [
    'n.jsxs("article",{className:"bw-victoria-feature mt-6",children:[',
    'n.jsx("img",{src:"/images/maddie-studio-wide.webp",alt:"Maddie Horn, RMA",width:104,height:104,loading:"lazy",style:{height:104,objectPosition:"center 20%",objectFit:"cover",borderRadius:"50%"}}),',
    'n.jsxs("div",{children:[',
    'n.jsx("p",{className:"bw-eyebrow",children:"Front Office & Patient Experience Lead"}),',
    'n.jsx("h3",{children:"Maddie Horn, RMA"}),',
    'n.jsx("p",{children:"Maddie is a Registered Medical Assistant who helps patients schedule visits, answers front-office questions, and welcomes them to Balanced Wellness Medical Spa."})',
    ']})]}),',
  ].join("");
  source = source.replace(staffSectionEnd, () => maddieProfile + staffSectionEnd);
  const teamHeading = 'id:"beauty-team-title",children:["Meet",n.jsx("br",{}),n.jsx("em",{children:"Victoria."})]';
  if (!source.includes(teamHeading)) throw new Error("Balanced staff heading missing");
  source = source.replace(
    teamHeading,
    'id:"beauty-team-title",children:["Meet",n.jsx("br",{}),n.jsx("em",{children:"the Balanced team."})]',
  );
  source = source.replace('children:"Your Balanced skin care team"', 'children:"Balanced Wellness Medical Spa"');
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
