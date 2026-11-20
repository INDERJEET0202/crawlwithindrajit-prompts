/* =====================================================================
   SITE CONTENT — edit this file to update the website.
   No coding needed: just change the text between the quotes.
   ===================================================================== */

const SITE = {
  handle: "crawlwithindrajit",
  instagram: "https://www.instagram.com/crawlwithindrajit/",
  dm: "https://ig.me/m/crawlwithindrajit", // opens an Instagram DM
};

/* ---------------------------------------------------------------------
   PROMPT LIBRARY — newest first. Copy a whole { ... } block to add one.

   slug:      short unique id, used in the page link (prompt.html?p=slug)
   category:  "Image Series", "Reel", "Video", "Image" ... (filters build themselves)
   price:     "Free" for now. Later e.g. "₹199" with a buy link.
   cover:     image shown on the card
   images:    shown one above another on the prompt page
   steps:     how to use this prompt (shown on the prompt page)
   prompt:    full prompt text between the backticks ` `
   reel:      optional link to the Instagram reel
   --------------------------------------------------------------------- */
const PROMPTS = [
  {
    slug: "gta-san-andreas-vehicle-story",
    title: "Turn Your Vehicle Into a GTA San Andreas Story",
    category: "Image Series",
    price: "Free",
    summary: "Upload 2–3 photos of your bike or car. The AI keeps your exact vehicle and drops it into Los Santos with CJ — 9 cinematic scenes.",
    tools: ["ChatGPT", "Gemini"],
    output: "9 images · 16:9",
    cover: "assets/images/prompts/gta-san-andreas-vehicle-story/scene-1-petrol-pump.webp",
    reel: "",
    images: [
      { src: "assets/images/prompts/gta-san-andreas-vehicle-story/scene-1-petrol-pump.webp", caption: "Scene 1 · Petrol Pump" },
      { src: "assets/images/prompts/gta-san-andreas-vehicle-story/scene-7-romantic.webp",    caption: "Scene 7 · Romantic Scene" },
    ],
    steps: [
      { title: "Generate the images", text: "Open ChatGPT or Gemini, upload 2–3 clear photos of your vehicle and paste the prompt. Say \"next\" after each scene until you have all 9." },
      { title: "Open Instagram Edits", text: "Start a new project in the Edits app by Instagram and import all 9 images." },
      { title: "Place them one by one", text: "Arrange the scenes in story order — petrol pump first, hero shot last. About 1–2 seconds per image." },
      { title: "Add music & post", text: "Pick a trending track, sync the cuts to the beat, export and post. Done bro — that simple." },
    ],
    prompt: `PROMPT: Turn My Vehicle Into a GTA San Andreas Story!
I am uploading 2–3 real photographs of my vehicle. Use these photographs as the primary visual reference and create a series of 9 separate cinematic images featuring my exact vehicle inside the world of Grand Theft Auto: San Andreas.

1. Vehicle accuracy – MOST IMPORTANT
* Keep my vehicle exactly like the uploaded photographs.
* Do not redesign, modify, customise or replace any part.
* Preserve the original colour, body shape, decals, graphics, wheels, tyres, headlights, mirrors, registration plate, accessories and proportions.
* Do not invent additional modifications.
* The vehicle must remain recognisable and consistent across all 9 images.
* Only change the surroundings, characters, environment, camera angle and lighting.

2. Visual style
* Recreate the classic GTA San Andreas gameplay aesthetic.
* Use CJ and other GTA-style characters.
* Include the original Los Santos atmosphere, palm trees, roads, houses, garages and city environments.
* Add the classic GTA HUD elements: game logo, mini-map, time, health bar and money display.
* Use cinematic lighting, realistic shadows and nostalgic early-2000s video-game graphics.
* Make every image look like an actual GTA San Andreas gameplay screenshot.

3. Create these 9 individual scenes:
1. Petrol Pump: CJ refuelling my vehicle. If it is a motorcycle, place the fuel nozzle correctly at the tank filler cap.
2. Police Encounter: CJ standing beside my vehicle while an Indian traffic police officer checks documents or issues a fine.
3. Vehicle Photoshoot: CJ taking a photograph of my vehicle during a beautiful sunset.
4. Group Ride: CJ and two GTA-style characters travelling together on my motorcycle, if suitable for the vehicle.
5. Vehicle Washing: CJ washing my vehicle outside his garage with a bucket, water and soap.
6. Garage Scene: CJ servicing or covering my vehicle inside a GTA-style garage.
7. Romantic Scene: CJ gifting flowers to a woman while my vehicle is parked prominently nearby.
8. Sunset Moment: CJ sitting beside my vehicle, enjoying the Los Santos sunset.
9. Final Hero Shot: A beautiful cinematic final shot of my vehicle parked in a scenic Los Santos location.

4. Image output requirements
* Generate 9 SEPARATE images, not a collage or grid.
* Aspect ratio: 16:9 landscape.
* High resolution and cinematic composition.
* Keep my vehicle clearly visible in every scene.
* Maintain consistent vehicle identity throughout the series.
* Use different camera angles and environments for each scene.
* Do not add captions, promotional text or watermarks.

IMPORTANT WORKFLOW:
Generate only ONE image at a time. After completing each scene, wait for my instruction to generate the next one.
The final result should look like my actual vehicle has entered the GTA San Andreas universe!`,
  },
];

/* ---------------------------------------------------------------------
   SHOP — future products. status: "soon" shows "Coming soon".
   When a product is ready: set status: "live", price: "₹499", link: "https://..."
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
  { title: "Generate", text: "Copy it into ChatGPT, Gemini or the tool listed. Upload your own photos when the prompt asks.", tag: "AI tool" },
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
