/* =====================================================================
   SITE CONTENT — edit this file to update the website.
   No coding needed: change the text between the quotes, then push.
   The build turns this into real pages (one per prompt) + sitemap.
   ===================================================================== */

const SITE = {
  name: "CrawlWithIndrajit Prompts",
  url: "https://crawlwithindrajit-prompts.vercel.app", // change when you buy a domain
  title: "Free AI Prompts for Bike Reels & GTA-Style Images | CrawlWithIndrajit",
  description: "Copy-ready AI prompts for ChatGPT and Gemini — put your bike into GTA San Andreas scenes, create cinematic AI images and reels, and follow the exact workflow. By @crawlwithindrajit.",
  ogImage: "assets/images/prompts/gta-san-andreas-vehicle-story/og.jpg",
  handle: "crawlwithindrajit",
  instagram: "https://www.instagram.com/crawlwithindrajit/",
  dm: "https://ig.me/m/crawlwithindrajit", // opens an Instagram DM
  googleVerification: "", // paste the code from Google Search Console here
};

/* ---------------------------------------------------------------------
   PROMPT LIBRARY — newest first. Copy a whole { ... } block to add one.

   slug:        short unique id → page lives at /prompts/<slug>/
   seoTitle:    title Google shows (keep under ~60 characters)
   description: text Google shows under the title (~150 characters)
   keywords:    words people would search for
   category:    "Image Series", "Reel", "Video", "Image" ... (filters build themselves)
   price:       "Free" for now. Later e.g. "₹199".
   cover:       image on the card;  ogImage: 1200×630 .jpg for link previews
   images:      result images, shown one above another
   reel:        link to the Instagram reel → embedded on the page
   fields:      the "Customize your prompt" boxes (optional)
   prompt:      the prompt text between the backticks ` `
                use {{key}} for a field, {{#key}}…{{/key}} for optional text
   steps, faq:  shown on the prompt page
   --------------------------------------------------------------------- */
const PROMPTS = [
  {
    slug: "gta-san-andreas-vehicle-story",
    title: "Turn Your Vehicle Into a GTA San Andreas Story",
    seoTitle: "GTA San Andreas AI Prompt: Put Your Bike in GTA (Free)",
    description: "Free ChatGPT & Gemini prompt that puts your real bike or car into GTA San Andreas — 9 cinematic scenes with CJ. Customize it, copy it, make the reel.",
    keywords: ["GTA San Andreas AI prompt", "GTA style bike image", "ChatGPT GTA prompt", "Gemini GTA prompt", "AI bike reel", "CJ AI image"],
    published: "2026-11-21",
    category: "Image Series",
    price: "Free",
    summary: "Upload 2–3 photos of your bike or car. The AI keeps your exact vehicle and drops it into Los Santos with CJ — 9 cinematic scenes.",
    tools: ["ChatGPT", "Gemini"],
    output: "9 images · 16:9",
    cover: "assets/images/prompts/gta-san-andreas-vehicle-story/scene-1-petrol-pump.webp",
    ogImage: "assets/images/prompts/gta-san-andreas-vehicle-story/og.jpg",
    reel: "https://www.instagram.com/reel/Df70GgeAJz1/",
    images: [
      { src: "assets/images/prompts/gta-san-andreas-vehicle-story/scene-1-petrol-pump.webp", caption: "Scene 1 · Petrol Pump", alt: "AI image of CJ from GTA San Andreas refuelling a black sports motorcycle at a Los Santos petrol pump" },
      { src: "assets/images/prompts/gta-san-andreas-vehicle-story/scene-7-romantic.webp",    caption: "Scene 7 · Romantic Scene", alt: "AI image of CJ gifting red roses to a woman at sunset with a motorcycle parked in GTA San Andreas style" },
    ],
    fields: [
      { key: "vehicle", label: "Your vehicle", type: "select", default: "vehicle", options: [
        { value: "vehicle", label: "Any (auto-detect)" },
        { value: "motorcycle", label: "Motorcycle" },
        { value: "scooter", label: "Scooter" },
        { value: "car", label: "Car" },
        { value: "SUV", label: "SUV" },
      ]},
      { key: "model", label: "Make & model (optional)", type: "text", default: "", placeholder: "e.g. Royal Enfield Classic 350" },
      { key: "ratio", label: "Image shape", type: "select", default: "16:9 landscape", options: [
        { value: "16:9 landscape", label: "16:9 landscape (posts, YouTube)" },
        { value: "9:16 vertical portrait", label: "9:16 vertical (Reels, Stories)" },
      ]},
      { key: "police", label: "Police in the police scene", type: "select", default: "an Indian", options: [
        { value: "an Indian", label: "Indian" },
        { value: "an American", label: "American" },
        { value: "a British", label: "British" },
        { value: "a local", label: "Local / generic" },
      ]},
      { key: "partner", label: "Person in the romantic scene", type: "select", default: "a woman", options: [
        { value: "a woman", label: "A woman" },
        { value: "a man", label: "A man" },
        { value: "my partner", label: "My partner" },
      ]},
      { key: "scenes", label: "Scenes to include", type: "list", items: [
        { label: "Petrol Pump",        text: "CJ refuelling my {{vehicle}}. If it is a motorcycle, place the fuel nozzle correctly at the tank filler cap." },
        { label: "Police Encounter",   text: "CJ standing beside my {{vehicle}} while {{police}} traffic police officer checks documents or issues a fine." },
        { label: "Vehicle Photoshoot", text: "CJ taking a photograph of my {{vehicle}} during a beautiful sunset." },
        { label: "Group Ride",         text: "CJ and two GTA-style characters travelling together on my motorcycle, if suitable for the vehicle." },
        { label: "Vehicle Washing",    text: "CJ washing my {{vehicle}} outside his garage with a bucket, water and soap." },
        { label: "Garage Scene",       text: "CJ servicing or covering my {{vehicle}} inside a GTA-style garage." },
        { label: "Romantic Scene",     text: "CJ gifting flowers to {{partner}} while my {{vehicle}} is parked prominently nearby." },
        { label: "Sunset Moment",      text: "CJ sitting beside my {{vehicle}}, enjoying the Los Santos sunset." },
        { label: "Final Hero Shot",    text: "A beautiful cinematic final shot of my {{vehicle}} parked in a scenic Los Santos location." },
      ]},
    ],
    prompt: `PROMPT: Turn My Vehicle Into a GTA San Andreas Story!
I am uploading 2–3 real photographs of my {{vehicle}}.{{#model}} It is a {{model}}.{{/model}} Use these photographs as the primary visual reference and create a series of {{scenes.count}} separate cinematic images featuring my exact {{vehicle}} inside the world of Grand Theft Auto: San Andreas.

1. Vehicle accuracy – MOST IMPORTANT
* Keep my {{vehicle}} exactly like the uploaded photographs.
* Do not redesign, modify, customise or replace any part.
* Preserve the original colour, body shape, decals, graphics, wheels, tyres, headlights, mirrors, registration plate, accessories and proportions.
* Do not invent additional modifications.
* The {{vehicle}} must remain recognisable and consistent across all {{scenes.count}} images.
* Only change the surroundings, characters, environment, camera angle and lighting.

2. Visual style
* Recreate the classic GTA San Andreas gameplay aesthetic.
* Use CJ and other GTA-style characters.
* Include the original Los Santos atmosphere, palm trees, roads, houses, garages and city environments.
* Add the classic GTA HUD elements: game logo, mini-map, time, health bar and money display.
* Use cinematic lighting, realistic shadows and nostalgic early-2000s video-game graphics.
* Make every image look like an actual GTA San Andreas gameplay screenshot.

3. Create these {{scenes.count}} individual scenes:
{{scenes}}

4. Image output requirements
* Generate {{scenes.count}} SEPARATE images, not a collage or grid.
* Aspect ratio: {{ratio}}.
* High resolution and cinematic composition.
* Keep my {{vehicle}} clearly visible in every scene.
* Maintain consistent vehicle identity throughout the series.
* Use different camera angles and environments for each scene.
* Do not add captions, promotional text or watermarks.

IMPORTANT WORKFLOW:
Generate only ONE image at a time. After completing each scene, wait for my instruction to generate the next one.
The final result should look like my actual vehicle has entered the GTA San Andreas universe!`,
    steps: [
      { title: "Generate the images", text: "Open ChatGPT or Gemini, upload 2–3 clear photos of your vehicle and paste the prompt. Say \"next\" after each scene until you have them all." },
      { title: "Open Instagram Edits", text: "Start a new project in the Edits app by Instagram and import all the images." },
      { title: "Place them one by one", text: "Arrange the scenes in story order — petrol pump first, hero shot last. About 1–2 seconds per image." },
      { title: "Add music & post", text: "Pick a trending track, sync the cuts to the beat, export and post. Done bro — that simple." },
    ],
    faq: [
      { q: "Is this GTA San Andreas prompt free?", a: "Yes. Copy it, customize it and use it as many times as you like." },
      { q: "Which AI tool should I use?", a: "Any AI tool that accepts photo uploads and generates images. ChatGPT and Gemini are the easiest. Results vary between tools, so if one misses details of your vehicle, try the other." },
      { q: "Does it work for cars and scooters?", a: "Yes. Pick your vehicle type in \"Customize your prompt\" and the whole prompt updates." },
      { q: "Can I make vertical images for Instagram Reels?", a: "Yes. Set Image shape to 9:16 vertical before copying." },
      { q: "Why generate one image at a time?", a: "Quality is noticeably better, and you can ask the AI to redo any single scene that misses without starting over." },
      { q: "Is this affiliated with Rockstar Games?", a: "No. It is a fan-made, game-inspired prompt and is not affiliated with or endorsed by Rockstar Games or Take-Two Interactive." },
    ],
  },
];

/* ---------------------------------------------------------------------
   SHOP — future products. status: "soon" shows "Coming soon".
   When a product is ready: status: "live", price: "₹499", link: "https://..."
   --------------------------------------------------------------------- */
const PRODUCTS = [
  { icon: "▦", title: "Prompt Packs",   text: "Curated bundles of tested prompts by theme — game worlds, cinematic rides, poster art.", status: "soon", price: "", link: "" },
  { icon: "▶", title: "Reel Kits",      text: "Prompts + scene order + music cues + edit guide. Everything to ship a reel in one sitting.", status: "soon", price: "", link: "" },
  { icon: "✳", title: "Claude Skills",  text: "Ready-to-install Claude skills that write your hooks, captions and content plans for you.", status: "soon", price: "", link: "" },
  { icon: "✦", title: "Custom Prompts", text: "A prompt built around your bike, brand or idea — tested before it reaches you.", status: "soon", price: "", link: "" },
];

/* ---------------------------------------------------------------------
   HOW IT WORKS (home page) — general flow for any prompt
   --------------------------------------------------------------------- */
const STEPS = [
  { title: "Pick a prompt", text: "Browse the library and open the one that fits your idea. Every prompt comes with real results.", tag: "Library" },
  { title: "Customize & generate", text: "Fill in your details, copy the prompt into ChatGPT, Gemini or the tool listed, and upload your photos if it asks.", tag: "AI tool" },
  { title: "Edit", text: "Drop the results into Instagram Edits, arrange them, and sync to music.", tag: "Edits app" },
  { title: "Post & tag", text: "Share it and tag @crawlwithindrajit — the best ones get featured.", tag: "Publish" },
];

/* ---------------------------------------------------------------------
   FACTS & TIPS — type: "ai", "bike" or "tip"
   --------------------------------------------------------------------- */
const FACTS = [
  { type: "tip",  text: "Upload photos from different angles — side, front three-quarter and rear. The more the AI sees, the more accurately it keeps your vehicle's details." },
  { type: "tip",  text: "Generate one image at a time instead of everything at once. Quality goes up, and you can redo any single scene that misses." },
  { type: "ai",   text: "AI image tools can drift on small details like logos and number plates. If something changes, ask it to \"keep the vehicle exactly like my photos\" and regenerate." },
  { type: "ai",   text: "Most AI video models generate short clips of around 5–10 seconds. Full reels are several clips or images stitched together in an editor." },
  { type: "bike", text: "The first petrol-powered motorcycle, the Daimler Reitwagen, was built in Germany in 1885 — with a wooden frame." },
  { type: "tip",  text: "Sync image changes to the beat drops of your song. Beat-matched cuts make a simple slideshow feel like a proper edit." },
];

/* Used by the build (Node). Harmless in the browser. */
if (typeof module === "object" && module.exports) module.exports = { SITE, PROMPTS, PRODUCTS, STEPS, FACTS };
