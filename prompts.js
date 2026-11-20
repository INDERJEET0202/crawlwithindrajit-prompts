/* =====================================================================
   SITE CONTENT — edit this file to update the website.
   No coding needed: just change the text between the quotes.
   ===================================================================== */

const SITE = {
  handle: "crawlwithindrajit",
  instagram: "https://www.instagram.com/crawlwithindrajit/",
};

/* ---------------------------------------------------------------------
   PROMPTS — newest first. Copy a whole { ... } block to add a new one.
   images:  shown one above another, with a caption each
   prompt:  the full prompt text, between the backticks ` `
   reel:    optional link to the Instagram reel
   --------------------------------------------------------------------- */
const PROMPTS = [
  {
    title: "Turn My Vehicle Into a GTA San Andreas Story",
    tag: "GTA San Andreas · 9 scenes",
    description: "Upload 2–3 real photos of your bike or car. The AI keeps your exact vehicle and drops it into Los Santos with CJ — petrol pump, police check, photoshoot, sunset and more.",
    tools: ["ChatGPT", "Gemini", "Upload 2–3 photos"],
    reel: "",
    images: [
      { src: "images/gta-petrol-pump.webp", caption: "Scene 1 · Petrol Pump" },
      { src: "images/gta-romantic.webp",    caption: "Scene 7 · Romantic Scene" },
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
   HOW TO MAKE THE REEL
   --------------------------------------------------------------------- */
const STEPS = [
  { title: "Generate the images", text: "Open ChatGPT or Gemini, upload 2–3 clear photos of your bike and paste the prompt. Say \"next\" after each scene until you have all 9.", tag: "AI image" },
  { title: "Open Instagram Edits", text: "Open the Edits app by Instagram, start a new project and import all 9 images.", tag: "Edits app" },
  { title: "Place them one by one", text: "Arrange the scenes in story order — petrol pump first, hero shot last. Keep each image on screen for about 1–2 seconds.", tag: "Timeline" },
  { title: "Add music & post", text: "Pick a trending track, sync the cuts to the beat, export and post. Done bro — that simple.", tag: "Publish" },
];

/* ---------------------------------------------------------------------
   FACTS & TIPS — type: "ai", "bike" or "tip"
   --------------------------------------------------------------------- */
const FACTS = [
  { type: "tip",  text: "Upload photos from different angles — side, front three-quarter and rear. The more the AI sees, the more accurately it keeps your bike's decals and shape." },
  { type: "tip",  text: "Generating one image at a time gives far better results than asking for all 9 at once — and you can ask for a redo on any scene that misses." },
  { type: "ai",   text: "AI image tools can drift on small details like logos and number plates. If something changes, reply \"keep the vehicle exactly like my photos\" and regenerate." },
  { type: "ai",   text: "Instagram Reels are vertical 9:16. These scenes are 16:9, so in Edits you can zoom to fill the frame or keep a blurred background behind them." },
  { type: "bike", text: "The first petrol-powered motorcycle, the Daimler Reitwagen, was built in Germany in 1885 — with a wooden frame." },
  { type: "tip",  text: "Sync your image changes to the beat drops of the song. Beat-matched cuts make a simple slideshow feel like a proper edit." },
];
