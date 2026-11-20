/* HTML templates for every page. Called by scripts/build.js — no need to edit for new prompts. */
const { render } = require("../assets/js/prompt-template.js");

const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const asset = p => (/^(https?:)?\//.test(p) ? p : "/" + p);
const json = o => JSON.stringify(o).replace(/</g, "\\u003c");
const pad = n => String(n).padStart(2, "0");
const promptPath = p => `/prompts/${p.slug}/`;

const YT_ICON = `<svg class="yt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8Z"/><path d="M9.8 15.1V8.9l5.4 3.1Z" fill="#fff"/></svg>`;
const IG_ICON = `<svg class="ig-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>`;

function makeHelpers(SITE) {
  const abs = p => SITE.url.replace(/\/$/, "") + asset(p);
  const ig = (cls, inner, label) => `<a href="${esc(SITE.instagram)}" class="${cls}" target="_blank" rel="noopener"${label ? ` aria-label="${esc(label)}"` : ""}>${inner}</a>`;
  const handle = "@" + SITE.handle;
  const yt = (cls, inner, label, path = "") => SITE.youtube
    ? `<a href="${esc(SITE.youtube + path)}" class="${cls}" target="_blank" rel="noopener"${label ? ` aria-label="${esc(label)}"` : ""}>${inner}</a>` : "";
  return { abs, ig, yt, handle };
}

/* ------------------------------------------------------------------ layout */
function layout(SITE, { title, description, path, ogImage, ogImageAlt, ogType = "website", jsonld = [], body, scripts = [], noindex = false, keywords }) {
  const { abs, ig, yt, handle } = makeHelpers(SITE);
  const url = abs(path);
  const img = abs(ogImage || SITE.ogImage);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  ${keywords ? `<meta name="keywords" content="${esc(keywords.join(", "))}" />` : ""}
  <meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />
  <link rel="canonical" href="${esc(url)}" />
  ${SITE.googleVerification ? `<meta name="google-site-verification" content="${esc(SITE.googleVerification)}" />` : ""}
  <meta name="author" content="${esc(handle)}" />

  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="${esc(SITE.name)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:image" content="${esc(img)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${esc(ogImageAlt || title)}" />
  <meta property="og:locale" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(img)}" />

  <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="/assets/icons/favicon-48.png" type="image/png" sizes="48x48" />
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
  <meta name="theme-color" content="#0a0a0c" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
${jsonld.map(j => `  <script type="application/ld+json">${json(j)}</script>`).join("\n")}
</head>
<body>
  <div class="grain" aria-hidden="true"></div>

  <header class="nav">
    <a href="/" class="logo" aria-label="${esc(SITE.name)} home">CRAWLWITH<span>INDRAJIT</span><small>PROMPTS</small></a>
    <nav class="nav-links" id="navLinks" aria-label="Main">
      <a href="/#prompts">Prompts</a>
      <a href="/#shop">Shop</a>
      <a href="/#how">How it works</a>
      <a href="/#about">About</a>
      ${yt("nav-yt", `${YT_ICON}<span class="nav-yt-label">YouTube</span>`, "YouTube channel")}
      ${ig("btn-ig", `${IG_ICON}<span>Follow</span>`, "Follow on Instagram")}
    </nav>
    <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span></button>
  </header>

${body}

  <section class="cta">
    <h2>New prompts drop with every reel.</h2>
    <p>Follow ${ig("link", esc(handle))} so you never miss the next one.</p>
    <div class="cta-actions">
      ${ig("btn btn-primary btn-lg", "Follow on Instagram →")}
      ${yt("btn btn-ghost btn-lg", `${YT_ICON} Subscribe on YouTube`, "", "?sub_confirmation=1")}
    </div>
  </section>

  <footer class="footer">
    <a href="/" class="logo">CRAWLWITH<span>INDRAJIT</span><small>PROMPTS</small></a>
    <p class="fine">Fan-made, game-inspired prompts and art. Not affiliated with or endorsed by any game publisher, including Rockstar Games or Take-Two Interactive.</p>
    <nav class="footer-links" aria-label="Legal">
      ${yt("", "YouTube")}<a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/refunds/">Refunds &amp; delivery</a>
    </nav>
    <p class="fine">© ${new Date().getFullYear()} ${ig("link", esc(handle))}</p>
  </footer>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>
${scripts.map(s => `  <script src="${s}"></script>`).join("\n")}
${SITE.analytics ? `  <script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
  <script defer src="/_vercel/insights/script.js"></script>` : ""}
</body>
</html>
`;
}

/* ------------------------------------------------------------------ pieces */
const card = (p, i = 0) => `
        <a class="card" href="${promptPath(p)}" data-cat="${esc(p.category)}" style="animation-delay:${i * 60}ms">
          <div class="card-media">
            <img src="${asset(p.cover)}" alt="${esc((p.images && p.images[0] && p.images[0].alt) || p.title)}" loading="lazy" width="800" height="500" />
            <span class="badge">${esc(p.category)}</span>
            <span class="price">${esc(p.price || "Free")}</span>
          </div>
          <div class="card-body">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.summary)}</p>
            <div class="card-foot">
              <div class="tools">${(p.tools || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
              <span class="arrow">Open →</span>
            </div>
          </div>
        </a>`;

const toolsRow = p => `<div class="tools">${(p.tools || []).map(t => `<span>${esc(t)}</span>`).join("")}${p.output ? `<span>${esc(p.output)}</span>` : ""}</div>`;

const stepsList = (steps, withTags) => `<ol class="steps">${steps.map((s, i) => `
          <li class="step"><span class="step-num">${pad(i + 1)}</span>
            <h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>${withTags && s.tag ? `<span class="tag">${esc(s.tag)}</span>` : ""}</li>`).join("")}
        </ol>`;

// Placeholder art for the About photo: a small synthwave sunset scene (shown until ABOUT.photo is set)
const SUNSET_SCENE = `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#07060d"/><stop offset=".45" stop-color="#1c0f33"/><stop offset=".62" stop-color="#4a1747"/><stop offset=".68" stop-color="#ff4f7a"/>
    </linearGradient>
    <linearGradient id="sunG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd25a"/><stop offset=".5" stop-color="#ff6a2b"/><stop offset="1" stop-color="#ff2e88"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1a0b22"/><stop offset="1" stop-color="#07060a"/>
    </linearGradient>
    <radialGradient id="glow" cx=".5" cy=".68" r=".5"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".55"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient>
    <clipPath id="sunCut">
      <rect x="0" y="0" width="100" height="49"/><rect x="0" y="50.6" width="100" height="3.6"/><rect x="0" y="55.8" width="100" height="2.8"/>
      <rect x="0" y="60.2" width="100" height="2"/><rect x="0" y="63.6" width="100" height="1.4"/><rect x="0" y="66.2" width="100" height="1.8"/>
    </clipPath>
  </defs>
  <rect width="100" height="100" fill="url(#sky)"/>
  <g fill="#fff" opacity=".7"><circle cx="12" cy="10" r=".35"/><circle cx="27" cy="22" r=".25"/><circle cx="44" cy="7" r=".3"/><circle cx="71" cy="14" r=".35"/><circle cx="86" cy="27" r=".25"/><circle cx="91" cy="6" r=".3"/><circle cx="58" cy="25" r=".2"/><circle cx="6" cy="33" r=".25"/></g>
  <rect width="100" height="100" fill="url(#glow)"/>
  <circle cx="50" cy="50" r="22" fill="url(#sunG)" clip-path="url(#sunCut)"/>
  <path d="M0 64 L10 58 L18 62 L27 55 L36 61 L42 59 L48 63 L58 57 L66 62 L74 56 L83 61 L91 58 L100 62 L100 68 L0 68 Z" fill="#160a24"/>
  <path d="M0 66 L14 62 L24 65 L35 61 L47 66 L60 62 L72 65 L86 61 L100 64 L100 68 L0 68 Z" fill="#0f0718"/>
  <rect y="68" width="100" height="32" fill="url(#ground)"/>
  <rect y="67.6" width="100" height=".8" fill="#ff4f7a" opacity=".9"/>
  <g stroke="#ff3d8b" stroke-width=".35" opacity=".55" fill="none">
    <path d="M0 70.5H100M0 73.5H100M0 77.5H100M0 83H100M0 90.5H100"/>
    <path d="M50 68V100M50 68L35 100M50 68L65 100M50 68L18 100M50 68L82 100M50 68L-2 100M50 68L102 100M50 68L-25 100M50 68L125 100"/>
  </g>
</svg>`;

/* ------------------------------------------------------------------ about */
function aboutBlock(C, headingTag = "h2") {
  const { SITE, ABOUT } = C;
  const { ig, yt } = makeHelpers(SITE);
  const photo = ABOUT.photo
    ? `<img src="${asset(ABOUT.photo)}" alt="${esc(SITE.owner)} leaning on his Pulsar N160 at night" width="960" height="1200" loading="lazy" />`
    : `<span class="about-badge" aria-hidden="true">${SUNSET_SCENE}</span>`;
  return `<div class="about">
        <div class="about-photo">${photo}</div>
        <div class="about-text">
          <${headingTag} id="about-title">${esc(ABOUT.title)}</${headingTag}>
          ${ABOUT.paragraphs.map(t => `<p>${esc(t)}</p>`).join("\n          ")}
          <ul class="about-facts">${ABOUT.facts.map(f => `<li><span>${esc(f.label)}</span><strong>${esc(f.value)}</strong></li>`).join("")}</ul>
          <div class="about-actions">
            ${ig("btn btn-primary", `Follow @${esc(SITE.handle)}`)}
            ${yt("btn btn-ghost", `${YT_ICON} YouTube`)}
            <a class="btn btn-ghost" href="/contact/">Contact</a>
          </div>
        </div>
      </div>`;
}

function garageGallery(C) {
  const g = C.ABOUT.gallery || [];
  if (!g.length) return "";
  return `<div class="garage">
        <h3 class="label">From the garage</h3>
        <div class="garage-grid">${g.map(item => item.type === "video" ? `
          <figure class="garage-item ${item.shape === "tall" ? "tall" : "wide"}">
            <video muted loop playsinline preload="none" poster="${asset(item.poster)}" data-autoplay aria-label="${esc(item.alt)}"><source src="${asset(item.src)}" type="video/mp4" /></video>
          </figure>` : `
          <figure class="garage-item ${item.shape === "tall" ? "tall" : "wide"}">
            <img src="${asset(item.src)}" alt="${esc(item.alt)}" loading="lazy" />
          </figure>`).join("")}
        </div>
      </div>`;
}

function youtubeSection(C, number) {
  const { SITE, YT } = C;
  if (!SITE.youtube || !YT) return "";
  const { yt } = makeHelpers(SITE);
  const main = (YT.videos || [])[0];
  const shorts = (YT.shorts || []).slice(0, 4);
  const thumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return `
    <section class="section section-alt" id="youtube" aria-labelledby="youtube-title">
      <div class="section-head">
        <p class="kicker">${number} — On YouTube</p>
        <h2 id="youtube-title">Ride along on YouTube</h2>
        <p class="sub">Moto vlogs, POV rides and N160 tips — the full stories behind the reels, on ${esc(SITE.youtubeName || "my channel")}.</p>
      </div>
      <div class="yt-layout">
        ${main ? `<div class="yt-feature">
          <button class="yt-facade" type="button" data-yt="${esc(main.id)}" aria-label="Play video: ${esc(main.title)}">
            <img src="${thumb(main.id)}" alt="" width="480" height="360" loading="lazy" />
            <span class="yt-play" aria-hidden="true">${YT_ICON}</span>
          </button>
          <p class="yt-meta"><span class="label">Latest video</span><span class="yt-title">${esc(main.title)}</span></p>
        </div>` : ""}
        <div class="yt-side">
          ${shorts.length ? `<p class="label">Latest Shorts</p>
          <div class="yt-shorts">${shorts.map(v => `
            <a class="yt-short" href="https://www.youtube.com/shorts/${esc(v.id)}" target="_blank" rel="noopener">
              <img src="${thumb(v.id)}" alt="" width="480" height="360" loading="lazy" />
              <span>${esc(v.title)}</span>
            </a>`).join("")}
          </div>` : ""}
          <div class="yt-actions">
            ${yt("btn btn-primary", `${YT_ICON} Subscribe`, "", "?sub_confirmation=1")}
            ${yt("btn btn-ghost", "All videos →", "", "/videos")}
          </div>
        </div>
      </div>
    </section>`;
}

/* ------------------------------------------------------------------ home */
function homePage(C) {
  const { SITE, PROMPTS, PRODUCTS, STEPS, FACTS } = C;
  const { abs, ig, handle } = makeHelpers(SITE);
  const cats = [...new Set(PROMPTS.map(p => p.category))];
  const labels = { ai: "AI fact", bike: "Biker fact", tip: "Pro tip" };

  const body = `  <main id="top">
    <section class="hero">
      <div class="hero-sun" aria-hidden="true"></div>
      <div class="hero-road" aria-hidden="true"></div>
      <div class="hero-inner">
        ${ig("eyebrow", `<span class="dot"></span> ${esc(handle)} · AI prompt studio`)}
        <h1>Ride the machine.<br /><em>Prompt the chaos.</em></h1>
        <p class="lead">
          Free, tested AI prompts for ChatGPT and Gemini — create cinematic images of your bike,
          drop it into game-style worlds and turn the results into reels. Prompt packs,
          reel kits and Claude skills coming soon.
        </p>
        <div class="hero-cta">
          <a href="#prompts" class="btn btn-primary">Browse prompts →</a>
          <a href="#shop" class="btn btn-ghost">What's coming</a>
        </div>
        <ul class="hero-stats">
          <li><strong>${PROMPTS.length}</strong><span>Free prompts</span></li>
          <li><strong>1-click</strong><span>Copy</span></li>
          <li><strong>Soon</strong><span>Packs &amp; skills</span></li>
        </ul>
      </div>
    </section>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        ${"<span>AI PROMPTS</span><span>✦</span><span>REEL KITS</span><span>✦</span><span>CLAUDE SKILLS</span><span>✦</span><span>BIKER CULTURE</span><span>✦</span><span>GAME-STYLE ART</span><span>✦</span>".repeat(2)}
      </div>
    </div>

    <section class="section" id="prompts" aria-labelledby="prompts-title">
      <div class="section-head">
        <p class="kicker">01 — The library</p>
        <h2 id="prompts-title">AI prompt library</h2>
        <p class="sub">Every prompt is tested and comes with real results. Open one, customize it, copy it, create.</p>
      </div>
      ${cats.length > 1 ? `<div class="filters" id="filters" role="tablist" aria-label="Filter prompts">
        ${["all", ...cats].map((c, i) => `<button class="chip${i ? "" : " is-active"}" data-cat="${esc(c)}" role="tab" aria-selected="${!i}">${c === "all" ? "All" : esc(c)}</button>`).join("")}
      </div>` : ""}
      <div class="grid" id="promptGrid">${PROMPTS.map(card).join("")}
        ${ig("card card-soon", `<div class="soon-inner">
            <span class="soon-plus">+</span>
            <h3>More drops coming</h3>
            <p>New prompts land with every reel. Follow to get them first.</p>
            <span class="arrow">Follow ${esc(handle)} →</span>
          </div>`)}
      </div>
    </section>

    <section class="section section-alt" id="shop" aria-labelledby="shop-title">
      <div class="section-head">
        <p class="kicker">02 — The shop</p>
        <h2 id="shop-title">Packs, kits &amp; skills</h2>
        <p class="sub">The next level after free prompts. Drop a DM to get early access when they launch.</p>
      </div>
      <div class="products">${PRODUCTS.map(p => {
        const live = p.status === "live" && p.link;
        return `
        <div class="product">
          <span class="product-icon" aria-hidden="true">${esc(p.icon)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.text)}</p>
          <div class="product-foot">
            <span class="status${live ? " live" : ""}">${live ? esc(p.price) : "Coming soon"}</span>
            ${live
              ? `<a class="btn btn-primary btn-sm" href="${esc(p.link)}" target="_blank" rel="noopener">Buy now</a>`
              : `<a class="btn btn-ghost btn-sm" href="${esc(SITE.dm)}" target="_blank" rel="noopener">Get early access</a>`}
          </div>
        </div>`;
      }).join("")}
      </div>
    </section>

    <section class="section" id="how" aria-labelledby="how-title">
      <div class="section-head">
        <p class="kicker">03 — The workflow</p>
        <h2 id="how-title">How to make AI reels</h2>
        <p class="sub">From prompt to posted reel. No camera, no editing skills needed.</p>
      </div>
      ${stepsList(STEPS, true)}
    </section>
${youtubeSection(C, "04")}

    <section class="section" id="facts" aria-labelledby="facts-title">
      <div class="section-head">
        <p class="kicker">05 — Pit stop</p>
        <h2 id="facts-title">AI facts &amp; pro tips</h2>
        <p class="sub">Things worth knowing before you hit generate.</p>
      </div>
      <div class="facts">${FACTS.map(f => `
        <div class="fact"><span class="fact-type ${f.type}">${labels[f.type] || f.type}</span><p>${esc(f.text)}</p></div>`).join("")}
      </div>
    </section>

    <section class="section section-alt" id="about" aria-labelledby="about-title">
      <p class="kicker">06 — About</p>
      ${aboutBlock(C)}
      ${garageGallery(C)}
    </section>
  </main>`;

  const jsonld = [
    { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: abs("/"), description: SITE.description, inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "Person", name: SITE.owner, alternateName: "@" + SITE.handle, url: abs("/about/"), image: SITE.url + asset(C.ABOUT.photo || SITE.ogImage), sameAs: [SITE.instagram, SITE.youtube].filter(Boolean) },
    { "@context": "https://schema.org", "@type": "ItemList", name: "AI prompt library",
      itemListElement: PROMPTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(promptPath(p)), name: p.title })) },
  ];

  return layout(SITE, { title: SITE.title, description: SITE.description, path: "/", jsonld, body, scripts: ["/assets/js/app.js"] });
}

/* ------------------------------------------------------------------ prompt page */
function reelEmbed(p, SITE, ig) {
  const m = (p.reel || "").match(/instagram\.com\/(?:reel|reels|p)\/([\w-]+)/);
  if (m) {
    const link = `https://www.instagram.com/reel/${m[1]}/`;
    // Instagram's embed script turns this into a sized, playable iframe (loaded lazily by app.js)
    return `<div class="phone phone-embed" data-reel>
            <blockquote class="instagram-media" data-instgrm-permalink="${link}?utm_source=ig_embed" data-instgrm-version="14">
              <a href="${link}" target="_blank" rel="noopener">Watch this reel on Instagram →</a>
            </blockquote>
          </div>`;
  }
  return `<div class="phone phone-soon">
            <span class="play" aria-hidden="true">▶</span>
            <p class="soon-title">Reel dropping soon</p>
            <p class="soon-sub">Watch this prompt in action on Instagram.</p>
            ${ig("btn btn-ghost btn-sm", "Open Instagram →")}
          </div>`;
}

function promptPage(p, C) {
  const { SITE, PROMPTS } = C;
  const { abs, ig, handle } = makeHelpers(SITE);
  const fields = p.fields || [];
  const text = render(p.prompt, fields, {});
  const others = PROMPTS.filter(x => x !== p).slice(0, 3);

  const field = f => {
    if (f.type === "select") return `
              <label class="field"><span>${esc(f.label)}</span>
                <select data-key="${esc(f.key)}">${f.options.map(o => `<option value="${esc(o.value)}"${o.value === f.default ? " selected" : ""}>${esc(o.label)}</option>`).join("")}</select>
              </label>`;
    if (f.type === "text") return `
              <label class="field"><span>${esc(f.label)}</span>
                <input type="text" data-key="${esc(f.key)}" placeholder="${esc(f.placeholder || "")}" value="${esc(f.default || "")}" autocomplete="off" />
              </label>`;
    if (f.type === "list") return `
              <fieldset class="field field-list"><legend>${esc(f.label)}</legend>
                <div class="checks">${f.items.map((it, i) => `<label class="check"><input type="checkbox" data-key="${esc(f.key)}" value="${i}" checked /><span>${esc(it.label)}</span></label>`).join("")}</div>
              </fieldset>`;
    return "";
  };

  const body = `  <main class="section detail">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#prompts">Prompts</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.title)}</span>
    </nav>

    <header class="detail-head">
      <div class="detail-tags"><span class="badge">${esc(p.category)}</span><span class="price">${esc(p.price || "Free")}</span></div>
      <h1>${esc(p.title)}</h1>
      <p class="sub">${esc(p.summary)}</p>
      ${toolsRow(p)}
    </header>

    <div class="feature">
      <div class="feature-media">
        <h2 class="label">Real results</h2>
        ${(p.images || []).map((img, i) => `
        <figure class="shot">
          <button class="shot-btn" data-src="${asset(img.src)}" aria-label="View ${esc(img.caption)} full size">
            <img src="${asset(img.src)}" alt="${esc(img.alt || img.caption)}" width="1600" height="900" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
          </button>
          <figcaption>${esc(img.caption)}</figcaption>
        </figure>`).join("")}
      </div>

      <div class="feature-body">
        ${fields.length ? `
        <div class="builder" id="builder">
          <div class="builder-head">
            <h2 class="label">Customize your prompt</h2>
            <button type="button" class="link-btn js-reset">Reset</button>
          </div>
          <div class="builder-grid">${fields.map(field).join("")}
          </div>
        </div>` : ""}

        <h2 class="label">The prompt</h2>
        <div class="prompt-wrap">
          <div class="prompt-bar"><span>prompt.txt</span><button class="copy-mini js-copy" type="button">Copy</button></div>
          <pre class="prompt" id="promptText">${esc(text)}</pre>
        </div>
        <div class="feature-actions">
          <button class="btn btn-primary js-copy" type="button">Copy full prompt</button>
          <button class="btn btn-ghost js-share" type="button">Share</button>
        </div>
      </div>
    </div>

    ${p.compare ? `
    <section class="compare-block" aria-labelledby="compare-title">
      <p class="kicker">Real vs AI</p>
      <h2 id="compare-title">Same bike, two worlds</h2>
      <p class="sub">Drag the slider: my real Pulsar N160 on the left, the AI result from this prompt on the right.</p>
      <div class="compare" style="--pos:50%">
        <img class="compare-img" src="${asset(p.compare.after)}" alt="${esc(p.compare.afterLabel)}" loading="lazy" width="1600" height="900" />
        <div class="compare-before"><img class="compare-img" src="${asset(p.compare.before)}" alt="${esc(p.compare.beforeLabel)}" loading="lazy" width="1600" height="900" /></div>
        <span class="compare-tag left">${esc(p.compare.beforeLabel)}</span>
        <span class="compare-tag right">${esc(p.compare.afterLabel)}</span>
        <span class="compare-handle" aria-hidden="true"><span>⟷</span></span>
        <input class="compare-range" type="range" min="0" max="100" value="50" aria-label="${esc(p.compare.alt || "Compare real photo and AI result")}" />
      </div>
    </section>` : ""}

    ${p.inputs && p.inputs.length ? `
    <section class="inputs-block" aria-labelledby="inputs-title">
      <p class="kicker">What to upload</p>
      <h2 id="inputs-title">The photos that went in</h2>
      <p class="sub">These are the real photos I uploaded with the prompt. Shoot yours the same way — clear, well-lit, whole bike in frame.</p>
      <div class="inputs">${p.inputs.map(inp => `
        <figure class="input">
          <img src="${asset(inp.src)}" alt="${esc(inp.label)} view of the Pulsar N160 used as input photo" loading="lazy" />
          <figcaption><strong>${esc(inp.label)}</strong> ${esc(inp.tip)}</figcaption>
        </figure>`).join("")}
      </div>
    </section>` : ""}

    <section class="reel-block" aria-labelledby="reel-title">
      <div class="reel-text">
        <p class="kicker">Watch it</p>
        <h2 id="reel-title">See the reel</h2>
        <p class="sub">This is what the prompt turns into once it is edited and set to music.</p>
        ${ig("btn btn-primary", `Follow ${esc(handle)}`)}
      </div>
      ${reelEmbed(p, SITE, ig)}
    </section>

    ${p.steps && p.steps.length ? `
    <section class="howto" aria-labelledby="howto-title">
      <p class="kicker">How to use it</p>
      <h2 id="howto-title">Make the reel</h2>
      ${stepsList(p.steps)}
    </section>` : ""}

    ${p.faq && p.faq.length ? `
    <section class="faq" aria-labelledby="faq-title">
      <p class="kicker">Questions</p>
      <h2 id="faq-title">FAQ</h2>
      <div class="faq-list">${p.faq.map(f => `
        <details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}
      </div>
    </section>` : ""}
  </main>

  ${others.length ? `<section class="section section-alt" aria-labelledby="more-title">
    <div class="section-head"><p class="kicker">Keep going</p><h2 id="more-title">More prompts</h2></div>
    <div class="grid">${others.map(card).join("")}</div>
  </section>` : ""}

  <div class="lightbox" id="lightbox" hidden>
    <button class="lightbox-close" aria-label="Close">×</button>
    <img alt="" />
  </div>
  <script type="application/json" id="promptData">${json({ template: p.prompt, fields })}</script>`;

  const url = abs(promptPath(p));
  const jsonld = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: "Prompts", item: abs("/#prompts") },
      { "@type": "ListItem", position: 3, name: p.title, item: url },
    ]},
    { "@context": "https://schema.org", "@type": "CreativeWork", name: p.title, headline: p.seoTitle || p.title,
      description: p.description || p.summary, url, image: (p.images || []).map(i => abs(i.src)),
      datePublished: p.published, keywords: (p.keywords || []).join(", "), isAccessibleForFree: true, inLanguage: "en",
      author: { "@type": "Person", name: "Indrajit", url: SITE.instagram },
      publisher: { "@type": "Organization", name: SITE.name, url: abs("/") } },
  ];

  return layout(SITE, {
    title: `${p.seoTitle || p.title} | CrawlWithIndrajit`,
    description: p.description || p.summary,
    path: promptPath(p),
    ogImage: p.ogImage || p.cover,
    ogImageAlt: p.images && p.images[0] && p.images[0].alt,
    ogType: "article",
    keywords: p.keywords,
    jsonld,
    body,
    scripts: ["/assets/js/prompt-template.js", "/assets/js/app.js"],
  });
}

/* ------------------------------------------------------------------ about page */
function aboutPage(C) {
  const { SITE } = C;
  const body = `  <main class="section detail">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">About</span></nav>
    <p class="kicker">About</p>
    ${aboutBlock(C, "h1")}
    ${garageGallery(C)}
  </main>`;
  return layout(SITE, {
    title: `About ${SITE.owner} | ${SITE.name}`,
    description: `Meet ${SITE.owner} (@${SITE.handle}) — the rider behind the AI prompts, reels and upcoming prompt packs on ${SITE.name}.`,
    path: "/about/", ogType: "profile", ogImage: C.ABOUT.photo || undefined, body, scripts: ["/assets/js/app.js"],
    jsonld: [{ "@context": "https://schema.org", "@type": "AboutPage", name: `About ${SITE.owner}`, url: makeHelpers(SITE).abs("/about/"),
      mainEntity: { "@type": "Person", name: SITE.owner, alternateName: "@" + SITE.handle, sameAs: [SITE.instagram, SITE.youtube].filter(Boolean) } }],
  });
}

/* ------------------------------------------------------------------ legal pages */
function legalPage(page, C) {
  const { SITE } = C;
  const { abs, ig, handle } = makeHelpers(SITE);
  const contactCard = page.contact ? `
      <div class="contact-grid">
        ${ig("contact-card", `<span class="contact-label">Instagram DM</span><strong>${esc(handle)}</strong><span class="contact-sub">Fastest way to reach me</span>`)}
        ${SITE.contactEmail
          ? `<a class="contact-card" href="mailto:${esc(SITE.contactEmail)}"><span class="contact-label">Email</span><strong>${esc(SITE.contactEmail)}</strong><span class="contact-sub">Orders, refunds and business</span></a>`
          : ""}
        <div class="contact-card"><span class="contact-label">Based in</span><strong>${esc(SITE.location)}</strong><span class="contact-sub">Replies within 1–2 business days</span></div>
      </div>` : "";
  const body = `  <main class="section detail legal">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${esc(page.title)}</span></nav>
    <header class="detail-head">
      <h1>${esc(page.title)}</h1>
      <p class="fine">Last updated ${esc(page.updated)}</p>
    </header>
    ${page.sections.map(sec => `
    <section class="legal-section">
      <h2>${esc(sec.h)}</h2>
      ${sec.p.map(t => `<p>${esc(t)}</p>`).join("\n      ")}
    </section>`).join("")}
    ${contactCard}
  </main>`;
  return layout(SITE, {
    title: `${page.title} | ${SITE.name}`, description: page.description, path: `/${page.slug}/`, body, scripts: ["/assets/js/app.js"],
    jsonld: [{ "@context": "https://schema.org", "@type": page.contact ? "ContactPage" : "WebPage", name: page.title, url: abs(`/${page.slug}/`), dateModified: page.updated }],
  });
}

/* ------------------------------------------------------------------ 404 + legacy redirect */
function notFoundPage(C) {
  const body = `  <main class="section detail">
    <div class="not-found">
      <p class="kicker">404</p>
      <h1>Page not found</h1>
      <p class="sub">It may have moved. Browse the full prompt library instead.</p>
      <a class="btn btn-primary" href="/#prompts">Go to the library →</a>
    </div>
  </main>`;
  return layout(C.SITE, { title: `Page not found | ${C.SITE.name}`, description: C.SITE.description, path: "/404", body, noindex: true, scripts: ["/assets/js/app.js"] });
}

// Old links were prompt.html?p=<slug>. Vercel redirects them; this covers local/other hosts.
const legacyRedirect = () => `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Redirecting…</title>
<script>var s=new URLSearchParams(location.search).get("p");location.replace(s?"/prompts/"+encodeURIComponent(s)+"/":"/#prompts");</script>
<a href="/#prompts">Continue to the prompt library</a>`;

module.exports = { homePage, promptPage, aboutPage, legalPage, notFoundPage, legacyRedirect, promptPath };
