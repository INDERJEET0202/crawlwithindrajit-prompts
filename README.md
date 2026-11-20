# CrawlWithIndrajit Prompts

AI prompt library and future store for the [@crawlwithindrajit](https://www.instagram.com/crawlwithindrajit/) Instagram page.
Live at **https://crawlwithindrajit-prompts.vercel.app** — static site, no build step.
Every push to `main` deploys automatically on Vercel.

## Folder layout

```
crawlwithindrajit-prompts/
├── index.html                 Home: hero, prompt library, shop, how it works, facts
├── prompt.html                One page per prompt  →  prompt.html?p=<slug>
│
├── data/
│   └── content.js             ALL site content — prompts, shop, steps, facts, Instagram links
│
└── assets/
    ├── css/styles.css         Design (colours, layout, mobile)
    ├── js/app.js              Renders pages from data/content.js, copy/share, menu
    ├── icons/                 Browser tab + iPhone home-screen icons
    └── images/
        └── prompts/
            └── <slug>/        Result images for each prompt, one folder per prompt
```

## Day-to-day: add a new prompt

1. Make a folder `assets/images/prompts/<your-slug>/` and drop the result images in.
2. Open `data/content.js`, copy an existing `{ ... }` block in `PROMPTS`, and fill in
   the `slug`, text, image paths and the prompt (between the backticks).
3. Push:

```bash
git add -A && git commit -m "Add <name> prompt" && git push
```

Category filters appear on their own once there are 2+ categories.

## Selling later

In `data/content.js` → `PRODUCTS`, set `status: "live"`, a `price` and a `link`
(Razorpay / Gumroad / Lemon Squeezy checkout) to turn "Coming soon" into a "Buy now" button.

## Run locally

```bash
python3 -m http.server 8080
```
