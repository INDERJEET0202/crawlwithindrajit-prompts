# CrawlWithIndrajit Prompts — MVP

A static website for sharing AI prompts (GTA-style biker images & reels) from the @crawlwithindrajit Instagram page.

## Open it
Double-click `index.html`, or run a local server:

```bash
python3 -m http.server 8080
```

## Add or edit content
Everything lives in **`prompts.js`**:

- `SITE` — Instagram handle and profile link (used by every Follow button)
- `PROMPTS` — each prompt block: title, images (stacked, put files in `images/`), full prompt text between backticks, optional `reel` link
- `STEPS` — the "How to make the reel" process
- `FACTS` — the facts & tips section

## Files
- `index.html` — page structure
- `styles.css` — design
- `app.js` — renders cards, copy button, filters, mobile menu
- `prompts.js` — content
