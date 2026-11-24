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

// Add the owner's GA4 tag to every approved public HTML page.
const { readdirSync, writeFileSync } = await import("node:fs");
const analyticsTag = `
<!-- Balanced Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2H829M8HZ9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-2H829M8HZ9', {
    page_location: window.location.origin + window.location.pathname,
    page_referrer: document.referrer.split('?')[0].split('#')[0],
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
</script>
`;
function addAnalytics(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = resolve(directory, entry.name);
    if (entry.isDirectory()) addAnalytics(filename);
    else if (entry.name.endsWith(".html")) {
      const html = readFileSync(filename, "utf8");
      if (!html.includes("G-2H829M8HZ9")) {
        writeFileSync(filename, html.replace(/<head([^>]*)>/i, (head) => head + analyticsTag));
      }
    }
  }
}
cpSync("public/blog", "dist/blog", { recursive: true });
const blogPaths = ["/blog/", ...readdirSync("public/blog", {withFileTypes:true}).filter(e => e.isDirectory()).map(e => "/blog/" + e.name + "/")];
const sitemap = "dist/sitemap.xml";
writeFileSync(sitemap, readFileSync(sitemap, "utf8").replace("</urlset>", blogPaths.map(p => "<url><loc>https://www.balancedmedicalspa.com" + p + "</loc></url>").join("\n") + "\n</urlset>"));
// Add the blog beside the existing service link in the approved footer.
const assets = "dist/assets";
for (const name of readdirSync(assets).filter(n => n.endsWith(".js"))) {
  const file = resolve(assets, name);
  const js = readFileSync(file, "utf8");
  const service = /n\.jsx\("li",\{children:n\.jsx\(Y,\{href:"\/services",className:"[^"]+",children:"All Services"\}\)\}\)/;
  writeFileSync(file, js.replace(service, m => m + ',' + m.replace('jsx(Y,','jsx("a",').replace('/services','/blog/').replace('All Services','Blog')));
}
addAnalytics(resolve("dist"));
