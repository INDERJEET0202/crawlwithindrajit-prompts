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
  const files = [p.cover, p.ogImage, ...(p.images || []).map(i => i.src), ...(p.inputs || []).map(i => i.src),
    p.compare && p.compare.before, p.compare && p.compare.after];
  for (const f of files.filter(Boolean)) {
    if (!/^https?:/.test(f) && !fs.existsSync(path.join(ROOT, f))) throw new Error(`Missing image for "${p.slug}": ${f}`);
  }
}

for (const g of [C.ABOUT.photo, ...(C.ABOUT.gallery || []).flatMap(g => [g.src, g.poster])].filter(Boolean)) {
  if (!fs.existsSync(path.join(ROOT, g))) throw new Error(`Missing About/gallery file: ${g}`);
}

// ---- YouTube: latest uploads from the channel's public feed (falls back to content.js if offline)
async function loadYouTube() {
  const id = C.SITE.youtubeChannelId;
  const clean = t => t.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s#\S+/g, "").replace(/\s+/g, " ").trim();
  try {
    if (!id) throw new Error("no channel id");
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m => {
      const e = m[1];
      return {
        id: (e.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1],
        title: clean((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ""),
        short: /\/shorts\//.test((e.match(/<link rel="alternate" href="(.*?)"/) || [])[1] || ""),
      };
    }).filter(v => v.id);
    if (!entries.length) throw new Error("empty feed");
    console.log(`YouTube: ${entries.length} uploads from the channel feed`);
    return { videos: entries.filter(v => !v.short), shorts: entries.filter(v => v.short) };
  } catch (err) {
    console.warn(`YouTube feed unavailable (${err.message}) — using fallback list from content.js`);
    return C.YOUTUBE.fallback;
  }
}

// ---- image sizes (read from the files, so layouts know portrait vs landscape)
function imageSize(rel) {
  const b = fs.readFileSync(path.join(ROOT, rel));
  if (b[0] === 0x89 && b.toString("ascii", 1, 4) === "PNG") return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (kind === "VP8L") { const n = b.readUInt32LE(21); return { w: 1 + (n & 0x3fff), h: 1 + ((n >> 14) & 0x3fff) }; }
    return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      const m = b[i + 1];
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(m)) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}
const sizeCache = {};
C.dims = rel => (rel in sizeCache ? sizeCache[rel] : (sizeCache[rel] = /^https?:/.test(rel) ? null : imageSize(rel)));

async function main() {
C.YT = await loadYouTube();

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

console.log(`Built ${C.PROMPTS.length} prompt page(s) + home, about, policies, 404, sitemap → dist/`);
}

main().catch(err => { console.error(err); process.exit(1); });
