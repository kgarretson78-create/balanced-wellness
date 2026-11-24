import {cpSync, readdirSync, readFileSync, writeFileSync} from "node:fs";
import {resolve} from "node:path";
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
