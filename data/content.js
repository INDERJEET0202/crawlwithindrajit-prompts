/* =====================================================================
   SITE CONTENT — edit this file to update the website.
   No coding needed: change the text between the quotes, then push.
   Next.js turns this into real pages (one per prompt) + sitemap.
   Image paths below live in public/ — write them without "public/".
   ===================================================================== */

export const SITE = {
  name: "CrawlWithIndrajit Prompts",
  url: "https://crawlwithindrajit-prompts.vercel.app", // change when you buy a domain
  title: "AI Prompts for Riders & Creators — Free Prompts, Reel Kits | CrawlWithIndrajit",
  description: "Free, tested AI prompts for ChatGPT and Gemini to create cinematic images and reels of your bike — plus the exact editing workflow. Prompt packs and Claude skills coming soon.",
  ogImage: "assets/images/og/home.jpg", // home page link preview (made from scripts/og-home.html)
  handle: "crawlwithindrajit",
  instagram: "https://www.instagram.com/crawlwithindrajit/",
  dm: "https://ig.me/m/crawlwithindrajit", // opens an Instagram DM
  youtube: "https://www.youtube.com/@indrajitpal02",
  youtubeName: "Indrajit Pal",
  youtubeChannelId: "UCBU4Wvjy9xXRbDBxWWR-I2w", // latest videos are pulled from YouTube on every deploy
  googleVerification: "qk_z3i3lw-ght1tn-V_4z3EIq2v1vC_8qscRFaMpXO4", // Google Search Console (HTML tag method)
  owner: "Indrajit",          // name shown on About + policy pages (use your legal name before selling)
  contactEmail: "",           // public email for customers — shown on Contact + policy pages when filled
  location: "India",
  analytics: true,            // Vercel Web Analytics (page views, no cookies)
};

/* ---------------------------------------------------------------------
   ABOUT (home page). photo: path to a square photo, or "" for the logo badge.
   --------------------------------------------------------------------- */
export const ABOUT = {
  title: "The rider behind the prompts",
  photo: "assets/images/about/indrajit-pulsar-n160.jpg",
  paragraphs: [
    "Hey, I'm Indrajit — a rider who got hooked on turning real bike photos into AI-made worlds. @crawlwithindrajit is where those edits live.",
    "Every prompt on this site is one I've tested on my own bike first and actually used in a reel. If it doesn't hold up — wrong decals, melted wheels, a bike that isn't yours — it doesn't get posted.",
    "Free prompts stay free. Prompt packs, reel kits and Claude skills are next, for creators who want the full workflow done for them.",
  ],
  facts: [
    { label: "Rides", value: "Bajaj Pulsar N160" },
    { label: "Creates with", value: "ChatGPT · Gemini · Edits" },
    { label: "Based in", value: "India" },
  ],
  // "From the garage" gallery. type: "image" or "video" (videos loop silently). shape: "wide" or "tall".
  gallery: [
    { type: "image", src: "assets/images/garage/lakeside-cinematic.jpg", alt: "Indrajit standing beside his black Pulsar N160 by a lake at night with city towers behind", shape: "wide" },
    { type: "video", src: "assets/videos/garage/night-headlight.mp4", poster: "assets/videos/garage/night-headlight.jpg", alt: "Pulsar N160 headlight glowing at night", shape: "tall" },
    { type: "video", src: "assets/videos/garage/night-parked.mp4", poster: "assets/videos/garage/night-parked.jpg", alt: "Pulsar N160 parked on a quiet street at night", shape: "tall" },
    { type: "video", src: "assets/videos/garage/pulsar-badge.mp4", poster: "assets/videos/garage/pulsar-badge.jpg", alt: "Close-up of the Pulsar badge on the fuel tank", shape: "wide" },
    { type: "video", src: "assets/videos/garage/front-field.mp4", poster: "assets/videos/garage/front-field.jpg", alt: "Front view of the Pulsar N160 parked in a green field", shape: "wide" },
  ],
};

/* ---------------------------------------------------------------------
   YOUTUBE — the build pulls your latest videos from YouTube automatically.
   This list is only used if YouTube can't be reached during a deploy.
   --------------------------------------------------------------------- */
export const YOUTUBE = {
  fallback: {
    videos: [
      { id: "1KJ5soGAiKI", title: "Kolkata During Diwali Hits Different 🪔✨" },
      { id: "owfes3Jtgvs", title: "My First Ever Moto Vlog! 🏍️ Let's Go" },
    ],
    shorts: [
      { id: "mqpsCilBYdk", title: "3 Petrol Pump Myths" },
      { id: "Xwsfm1cT8Bw", title: "N160 Owners, You NEED This! 👀" },
      { id: "a_g0rOw_GP8", title: "Mileage Gir Gaya? 👀" },
      { id: "9-ydS7asH18", title: "Our Machines Deserve A Day Too 🛠️🏍️" },
    ],
  },
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
export const PROMPTS = [
  {
    slug: "sheru-bhai-photo",
    title: "Create Your Own Picture with Sheru Bhai",
    seoTitle: "Sheru Bhai AI Prompt: Your Photo with the White Lion (Free)",
    description: "Free ChatGPT & Gemini prompt to put yourself in a photo with Sheru Bhai — the white lion in a luxury suit and gold chains. Reference image included.",
    keywords: ["Sheru Bhai AI prompt", "Sheru Bhai photo", "white lion AI photo", "lion in suit AI image", "ChatGPT photo with lion", "AI photo editing prompt"],
    published: "2026-11-21",
    category: "Image",
    price: "Free",
    summary: "Upload your photo and the Sheru Bhai reference — get a real-looking photo of you with the stylish white lion in an ivory suit and heavy gold chains.",
    tools: ["ChatGPT", "Gemini"],
    output: "1 photo · photorealistic",
    stepsTitle: "Make yours",
    reelText: "The full Sheru Bhai photo set on Instagram — swipe through the carousel.",
    cover: "assets/images/prompts/sheru-bhai-photo/result-street-night.jpg",
    ogImage: "assets/images/prompts/sheru-bhai-photo/og.jpg",
    reel: "https://www.instagram.com/p/Dfpw74AktqR/", // Instagram post (carousel)
    images: [
      { src: "assets/images/prompts/sheru-bhai-photo/result-street-night.jpg", caption: "Festive street at night", alt: "AI photo of Indrajit on a festive Indian street at night with Sheru Bhai, a white lion in an ivory suit and gold chains, resting an arm on his shoulder" },
      { src: "assets/images/prompts/sheru-bhai-photo/result-gh-sign.jpg", caption: "With the N160", alt: "AI photo of Indrajit leaning on his Pulsar N160 beside Sheru Bhai the white lion in a white suit" },
      { src: "assets/images/prompts/sheru-bhai-photo/result-royal-sofa.jpg", caption: "Royal lounge", alt: "AI photo of Indrajit giving a thumbs up on a golden sofa next to Sheru Bhai the white lion" },
    ],
    compare: {
      title: "From my photo to Sheru Bhai",
      text: "Drag the slider: the original photo on the left, the same shot after this prompt on the right.",
      ratio: "3 / 4",
      before: "assets/images/prompts/sheru-bhai-photo/before-real.jpg", beforeLabel: "Original",
      after: "assets/images/prompts/sheru-bhai-photo/result-gh-sign.jpg", afterLabel: "With Sheru Bhai",
      alt: "Slider comparing the original photo of Indrajit with his bike and the AI version with Sheru Bhai",
    },
    inputsTitle: "What to upload",
    inputsText: "Two images go into the AI: a clear photo of you, and the Sheru Bhai reference so the lion looks the same every time. Download the reference below.",
    inputs: [
      { src: "assets/images/prompts/sheru-bhai-photo/before-real.jpg", label: "Your photo", tip: "Face clearly visible, good light. Half or full body works best." },
      { src: "assets/images/prompts/sheru-bhai-photo/sheru-bhai-reference.jpg", label: "Sheru Bhai reference", tip: "Keeps his mane, sunglasses, suit and gold chains consistent.", download: "sheru-bhai-reference.jpg" },
    ],
    fields: [
      { key: "side", label: "Sheru Bhai stands on", type: "select", default: "Allow me to choose whether Sheru Bhai appears on my left or right.", options: [
        { value: "Allow me to choose whether Sheru Bhai appears on my left or right.", label: "Whichever looks natural" },
        { value: "Place Sheru Bhai on my right side.", label: "My right" },
        { value: "Place Sheru Bhai on my left side.", label: "My left" },
      ]},
      { key: "pose", label: "Sheru Bhai's pose", type: "select", default: "He can stand or sit depending on the original photograph.", options: [
        { value: "He can stand or sit depending on the original photograph.", label: "Match my photo" },
        { value: "He should be standing.", label: "Standing" },
        { value: "He should be sitting beside me.", label: "Sitting" },
      ]},
      { key: "background", label: "Background", type: "select", default: "Maintain the original photograph's background wherever possible.", options: [
        { value: "Maintain the original photograph's background wherever possible.", label: "Keep my photo's background" },
        { value: "Replace the background with a busy Indian street at night with festive string lights.", label: "Festive street at night" },
        { value: "Replace the background with a royal lounge with a golden sofa and warm lamp light.", label: "Royal golden lounge" },
        { value: "Replace the background with a luxury car showroom with dramatic lighting.", label: "Luxury showroom" },
      ]},
    ],
    prompt: `Create an ultra-realistic, professional, cinematic photograph featuring me and Sheru Bhai together.

1. Preserve My Identity
* Use my uploaded photograph as the exact identity reference.
* Keep my face, facial structure, hairstyle, hair colour, skin tone and facial hair unchanged.
* Preserve my original clothing, colours, accessories and body proportions.
* Do not beautify, redesign or replace my appearance.
* Make me look natural and realistic.

2. Sheru Bhai – Character Identity (VERY IMPORTANT)
Recreate Sheru Bhai with these consistent characteristics:
* A majestic, realistic anthropomorphic white lion.
* Thick, fluffy, voluminous white/cream-coloured mane.
* Realistic lion face, expressive eyes and detailed white fur.
* Stylish black sunglasses.
* Premium ivory-white three-piece luxury suit with matching waistcoat and trousers.
* Multiple heavy, shiny gold chains around his neck.
* A large, luxurious gold medallion pendant.
* Premium gold wristwatch.
* Confident, powerful and friendly personality.

Keep Sheru Bhai's appearance consistent with the uploaded reference image. Do not change his fur colour, face, mane, outfit or signature gold jewellery.

3. Composition and Position
* Place Sheru Bhai naturally beside me.
* {{pose}}
* His arm can rest casually over my shoulder.
* Maintain realistic human-to-lion proportions.
* {{side}}
* Make both subjects look naturally present in the same photograph.

4. Professional Photography
* Photorealistic Photoshop-quality compositing.
* Perfectly matched lighting and shadows.
* Realistic skin, fur, fabric and jewellery textures.
* Natural perspective and proportions.
* Cinematic colour grading.
* Professional DSLR photography quality.
* Detailed background integration.
* No artificial-looking edges or pasted-on appearance.

5. Final Output
* Ultra HD / 4K quality.
* Sharp facial details.
* Professional cinematic finish.
* {{background}}
* No unnecessary text, logos or watermarks.
* Exactly two main subjects: me and Sheru Bhai.

Final instruction: Make this look like a real photograph taken together, not an AI-generated collage. Prioritise identity preservation and Sheru Bhai's consistent character appearance.`,
    steps: [
      { title: "Get the two images", text: "Download the Sheru Bhai reference from this page and pick a clear photo of yourself." },
      { title: "Upload both", text: "Open ChatGPT, or another AI image tool that accepts reference images, and upload your photo and the reference together." },
      { title: "Customize & paste", text: "Choose side, pose and background above, copy the prompt and send it. Ask for a redo if the lion doesn't match the reference." },
      { title: "Post & tag", text: "Share it with #SheruBhai and tag @crawlwithindrajit. Your photo. Your style. Sheru Bhai's swag." },
    ],
    faq: [
      { q: "Is the Sheru Bhai prompt free?", a: "Yes. Copy it, customize it and use it as often as you like." },
      { q: "Why do I need the reference image?", a: "Without it, every AI draws a different-looking lion. The reference keeps Sheru Bhai's face, mane, sunglasses, suit and gold chains the same in every photo." },
      { q: "Which photo of me works best?", a: "A clear, well-lit photo where your face is fully visible, ideally half or full body. Group photos don't work well — the prompt expects exactly you and Sheru Bhai." },
      { q: "Can I choose which side Sheru Bhai stands on?", a: "Yes. Use \"Sheru Bhai stands on\" in Customize your prompt before copying." },
      { q: "Is my photo uploaded to this website?", a: "No. You upload your photo directly to the AI tool you use, under that tool's own privacy terms. Nothing you upload passes through this site." },
    ],
  },
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
    // Before/after slider: same bike, real photo vs AI result
    compare: {
      title: "Same bike, two worlds",
      text: "Drag the slider: my real Pulsar N160 on the left, the AI result from this prompt on the right.",
      before: "assets/images/prompts/gta-san-andreas-vehicle-story/real-side.jpg", beforeLabel: "Real photo",
      after: "assets/images/prompts/gta-san-andreas-vehicle-story/scene-1-petrol-pump.webp", afterLabel: "AI result",
      alt: "Slider comparing a real photo of a black Pulsar N160 with the GTA San Andreas style AI image",
    },
    // "What to upload" — the real photos that went into the AI
    inputsTitle: "The photos that went in",
    inputsText: "These are the real photos I uploaded with the prompt. Shoot yours the same way — clear, well-lit, whole bike in frame.",
    inputs: [
      { src: "assets/images/prompts/gta-san-andreas-vehicle-story/input-side.jpg", label: "Side", tip: "Full side profile in daylight — shows decals, wheels and shape." },
      { src: "assets/images/prompts/gta-san-andreas-vehicle-story/input-front.jpg", label: "Front", tip: "Headlight, mirrors and number plate." },
      { src: "assets/images/prompts/gta-san-andreas-vehicle-story/input-rear.jpg", label: "Rear", tip: "Tail light and rear design." },
    ],
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
export const PRODUCTS = [
  { icon: "▦", title: "Prompt Packs",   text: "Curated bundles of tested prompts by theme — game worlds, cinematic rides, poster art.", status: "soon", price: "", link: "" },
  { icon: "▶", title: "Reel Kits",      text: "Prompts + scene order + music cues + edit guide. Everything to ship a reel in one sitting.", status: "soon", price: "", link: "" },
  { icon: "✳", title: "Claude Skills",  text: "Ready-to-install Claude skills that write your hooks, captions and content plans for you.", status: "soon", price: "", link: "" },
  { icon: "✦", title: "Custom Prompts", text: "A prompt built around your bike, brand or idea — tested before it reaches you.", status: "soon", price: "", link: "" },
];

/* ---------------------------------------------------------------------
   HOW IT WORKS (home page) — general flow for any prompt
   --------------------------------------------------------------------- */
export const STEPS = [
  { title: "Pick a prompt", text: "Browse the library and open the one that fits your idea. Every prompt comes with real results.", tag: "Library" },
  { title: "Customize & generate", text: "Fill in your details, copy the prompt into ChatGPT, Gemini or the tool listed, and upload your photos if it asks.", tag: "AI tool" },
  { title: "Edit", text: "Drop the results into Instagram Edits, arrange them, and sync to music.", tag: "Edits app" },
  { title: "Post & tag", text: "Share it and tag @crawlwithindrajit — the best ones get featured.", tag: "Publish" },
];

/* ---------------------------------------------------------------------
   FACTS & TIPS — type: "ai", "bike" or "tip"
   --------------------------------------------------------------------- */
export const FACTS = [
  { type: "tip",  text: "Upload photos from different angles — side, front three-quarter and rear. The more the AI sees, the more accurately it keeps your vehicle's details." },
  { type: "tip",  text: "Generate one image at a time instead of everything at once. Quality goes up, and you can redo any single scene that misses." },
  { type: "ai",   text: "AI image tools can drift on small details like logos and number plates. If something changes, ask it to \"keep the vehicle exactly like my photos\" and regenerate." },
  { type: "ai",   text: "Most AI video models generate short clips of around 5–10 seconds. Full reels are several clips or images stitched together in an editor." },
  { type: "bike", text: "The first petrol-powered motorcycle, the Daimler Reitwagen, was built in Germany in 1885 — with a wooden frame." },
  { type: "tip",  text: "Sync image changes to the beat drops of your song. Beat-matched cuts make a simple slideshow feel like a proper edit." },
];

