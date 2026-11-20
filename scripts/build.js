/* Builds the static site into dist/ from data/content.js.
   Run:  node scripts/build.js        (Vercel runs this on every push) */
const fs = require("fs");
const path = require("path");
const { homePage, promptPage, aboutPage, legalPage, notFoundPage, legacyRedirect, promptPath } = require("./templates.js");
const { legalPages } = require("../data/legal.js");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "dist");
const C = require(path.join(ROOT, "data", "content.js"));

// ---- sanity checks: catch mistakes in content.js before they go live
const slugs = new Set();
for (const p of C.PROMPTS) {
  if (!p.slug || !/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Bad slug "${p.slug}" — use lowercase letters, numbers and dashes`);
  if (slugs.has(p.slug)) throw new Error(`Duplicate slug "${p.slug}"`);
  slugs.add(p.slug);
  for (const f of [p.cover, p.ogImage, ...(p.images || []).map(i => i.src)].filter(Boolean)) {
    if (!/^https?:/.test(f) && !fs.existsSync(path.join(ROOT, f))) throw new Error(`Missing image for "${p.slug}": ${f}`);
  }
}

// ---- clean + copy static assets
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(ROOT, "assets"), path.join(OUT, "assets"), { recursive: true });
// public/ → site root as-is (verification files, etc.)
if (fs.existsSync(path.join(ROOT, "public"))) fs.cpSync(path.join(ROOT, "public"), OUT, { recursive: true });

const write = (rel, content) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

// ---- pages
write("index.html", homePage(C));
for (const p of C.PROMPTS) write(path.join("prompts", p.slug, "index.html"), promptPage(p, C));
write("404.html", notFoundPage(C));
write(path.join("about", "index.html"), aboutPage(C));
const LEGAL = legalPages(C.SITE);
for (const page of LEGAL) write(path.join(page.slug, "index.html"), legalPage(page, C));
write("prompt.html", legacyRedirect());

// ---- sitemap + robots
const base = C.SITE.url.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: base + "/", lastmod: today, priority: "1.0" },
  ...C.PROMPTS.map(p => ({ loc: base + promptPath(p), lastmod: p.updated || p.published || today, priority: "0.8" })),
  { loc: base + "/about/", lastmod: today, priority: "0.5" },
  ...LEGAL.map(pg => ({ loc: `${base}/${pg.slug}/`, lastmod: pg.updated, priority: "0.3" })),
];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`);

console.log(`Built ${C.PROMPTS.length} prompt page(s) + home, 404, sitemap → dist/`);
