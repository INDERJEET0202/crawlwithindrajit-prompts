# CrawlWithIndrajit Prompts

AI prompt library and future store for the [@crawlwithindrajit](https://www.instagram.com/crawlwithindrajit/) Instagram page.
Static site — no build step. Every push to `main` deploys on Vercel.

## Run locally

```bash
python3 -m http.server 8080
```

## Pages
- `index.html` — home: hero, prompt library, shop (coming soon), how it works, facts
- `prompt.html?p=<slug>` — one page per prompt: real results, full prompt with copy, share, how-to steps

## Add or edit content
Everything lives in **`prompts.js`**:

- `SITE` — Instagram handle, profile link and DM link (used by every Follow / early-access button)
- `PROMPTS` — the library. Copy a `{ ... }` block to add a prompt; give it a unique `slug`.
  Category filters appear automatically once there are 2+ categories. Put images in `images/`.
- `PRODUCTS` — shop items. Set `status: "live"`, a `price` and a `link` (e.g. a Razorpay / Gumroad
  checkout) to turn "Coming soon" into a "Buy now" button.
- `STEPS`, `FACTS` — home page sections.
