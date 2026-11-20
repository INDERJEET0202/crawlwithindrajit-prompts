# CrawlWithIndrajit Prompts

AI prompt library and future store for the [@crawlwithindrajit](https://www.instagram.com/crawlwithindrajit/) Instagram page.
Live at **https://crawlwithindrajit-prompts.vercel.app**. Every push to `main` deploys on Vercel.

## How it works

`data/content.js` holds all the content. `scripts/build.js` turns it into real HTML pages in `dist/`
(one page per prompt, plus sitemap and robots.txt) so Google and link previews (WhatsApp, Instagram DMs)
see the full content. Vercel runs the build automatically on every push — you never commit `dist/`.

## Folder layout

```
crawlwithindrajit-prompts/
├── data/
│   └── content.js             ALL content: prompts, shop, steps, facts, SEO, Instagram links
├── assets/
│   ├── css/styles.css         Design
│   ├── js/app.js              Interactivity: customizer, copy, share, filters, menu
│   ├── js/prompt-template.js  Prompt customizer engine (shared by build + browser)
│   ├── icons/                 Browser tab + iPhone icons
│   └── images/prompts/<slug>/ Result images + og.jpg (link preview) for each prompt
├── scripts/
│   ├── build.js               Builds dist/ — run by Vercel
│   └── templates.js           Page HTML (home, prompt page, 404)
├── vercel.json                Build settings + redirect for old prompt.html?p= links
└── dist/                      Generated site (git-ignored)
```

## Add a new prompt

1. Create `assets/images/prompts/<your-slug>/` with the result images.
2. Optional but recommended: a 1200×630 `og.jpg` for link previews:
   ```bash
   sips -s format jpeg --resampleWidth 1200 first-image.webp --out og.jpg && sips --cropToHeightWidth 630 1200 og.jpg
   ```
3. In `data/content.js`, copy an existing `{ ... }` block in `PROMPTS` and fill it in
   (slug, seoTitle, description, keywords, images, prompt text, steps, faq).
   Add `fields` and `{{placeholders}}` if you want a customizer; leave them out for a plain prompt.
4. Paste the Instagram reel link into `reel:` once it is posted — it embeds on the page.
5. Push:
   ```bash
   git add -A && git commit -m "Add <name> prompt" && git push
   ```
   The build checks for typos (duplicate slugs, missing images) and stops the deploy if something is wrong,
   so a mistake never takes the live site down.

## Run locally

```bash
npm run dev
```
(builds, then serves `dist/` at http://localhost:8080)

## Selling later

In `PRODUCTS`, set `status: "live"`, a `price` and a `link` (Razorpay / Gumroad / Lemon Squeezy checkout)
to turn "Coming soon" into a "Buy now" button.
