/* Small helpers shared by pages and components (server-side). */
import { SITE } from "@/data/content";

/** "assets/x.jpg" → "/assets/x.jpg" (leaves full URLs alone) */
export const asset = p => (!p ? p : /^(https?:)?\//.test(p) ? p : "/" + p);

/** Absolute URL on the live site, for SEO tags and structured data */
export const abs = p => SITE.url.replace(/\/$/, "") + asset(p || "/");

export const promptPath = p => `/prompts/${p.slug}/`;

/** Instagram link on a prompt → { type: "reel" | "post", id } */
export function igKind(url) {
  const m = (url || "").match(/instagram\.com\/(?:[\w.]+\/)?(reel|reels|p)\/([\w-]+)/);
  return m ? { type: m[1] === "p" ? "post" : "reel", id: m[2] } : null;
}

export const ytLink = (path = "") => (SITE.youtube ? SITE.youtube + path : null);
