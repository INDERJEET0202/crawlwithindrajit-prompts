# CrawlWithIndrajit Prompts

AI prompt library and future store for the [@crawlwithindrajit](https://www.instagram.com/crawlwithindrajit/) Instagram page.
Built with **Next.js** (React). Live at **https://crawlwithindrajit-prompts.vercel.app** — every push to `main` deploys on Vercel.

## Run it on your computer

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:8080 — the page reloads by itself when you save a file.

## Where things are

```
crawlwithindrajit-prompts/
│
├── data/                        ← CONTENT — what you edit day to day
│   ├── content.js               prompts, shop, About, YouTube, facts, links, SEO text
│   └── legal.js                 privacy / terms / refunds / contact text
│
├── app/                         ← PAGES — one folder = one URL
│   ├── layout.jsx               wraps every page: header, footer, fonts, site-wide SEO
│   ├── page.jsx                 home page  (/)
│   ├── prompts/[slug]/page.jsx  every prompt page  (/prompts/gta-san-andreas-vehicle-story/ …)
│   ├── about/page.jsx           /about/
│   ├── privacy/ terms/ refunds/ contact/   policy pages
│   ├── not-found.jsx            404 page
│   ├── sitemap.js, robots.js    /sitemap.xml and /robots.txt (automatic)
│   └── globals.css              all styling
│
├── components/                  ← BUILDING BLOCKS used by the pages
│   ├── Header.jsx               top bar + mobile menu
│   ├── Footer.jsx               footer + "New prompts drop…" banner
│   ├── PromptCard.jsx           card in the library
│   ├── Library.jsx              library grid + category filters
│   ├── PromptStudio.jsx         "Customize your prompt" + prompt box + Copy/Share/Download
│   ├── ResultsGallery.jsx       result images + full-screen view
│   ├── CompareSlider.jsx        before/after slider
│   ├── InstagramEmbed.jsx       Instagram reel or post
│   ├── YouTube.jsx              "Ride along on YouTube" section (+ YouTubePlayer.jsx)
│   ├── About.jsx                About block + "From the garage" gallery
│   ├── LegalPage.jsx            layout for the policy pages
│   ├── Sections.jsx             steps, facts, shop products, FAQ, section headings
│   └── Icons.jsx, Logo.jsx, Toaster.jsx, JsonLd.jsx, SunsetScene.jsx, AutoplayVideo.jsx
│
├── lib/                         ← HELPERS (no visuals)
│   ├── prompt-template.js       the customizer engine ({{placeholders}})
│   ├── youtube.js               latest videos from your channel (refreshes every hour)
│   ├── images.js                reads photo sizes (portrait vs landscape)
│   ├── site.js                  URL helpers
│   └── clipboard.js             copy button + toast
│
├── public/                      ← FILES SERVED AS-IS
│   ├── assets/images/  assets/videos/  assets/icons/
│   └── google2041cfb2365305ed.html   Google Search Console verification (keep!)
│
├── scripts/strip_metadata.py    removes GPS location from photos before upload
├── next.config.mjs              URL settings + redirect for old prompt.html?p= links
└── _originals/                  your raw photos/videos (on your Mac only, not uploaded)
```

Files with `"use client"` at the top run in the visitor's browser (buttons, sliders, menus).
Everything else is turned into plain HTML ahead of time — that's what Google reads.

## Add a new prompt

1. Put the images in `public/assets/images/prompts/<your-slug>/`.
   Clean them first: `python3 scripts/strip_metadata.py public/assets/images/prompts/<your-slug>/*.jpg`
2. Optional: a 1200×630 `og.jpg` for link previews:
   ```bash
   sips -s format jpeg --resampleWidth 1200 first-image.jpg --out og.jpg && sips --cropToHeightWidth 630 1200 og.jpg
   ```
3. In `data/content.js`, copy an existing `{ ... }` block in `PROMPTS` and fill it in.
   Image paths are written without `public/`, e.g. `assets/images/prompts/<your-slug>/result-1.jpg`.
4. Paste the Instagram reel **or** post link into `reel:`.
5. Push:
   ```bash
   git add -A && git commit -m "Add <name> prompt" && git push
   ```
   If something is wrong (duplicate slug, missing image), the build stops and the live site stays as it was.

## Selling later

In `PRODUCTS`, set `status: "live"`, a `price` and a `link` (Razorpay / Gumroad / Lemon Squeezy checkout).
Next.js can also run server code (`app/api/…`) on the same Vercel project for payment confirmation and gated downloads.
