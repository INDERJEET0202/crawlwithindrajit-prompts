/* Latest uploads from the YouTube channel's public feed.
   Next.js caches this and refreshes it every hour, so new videos appear on
   the site automatically — no push needed. Falls back to data/content.js. */
import { SITE, YOUTUBE } from "@/data/content";

const clean = t => t
  .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s#\S+/g, "").replace(/\s+/g, " ").trim();

export async function getYouTube() {
  const id = SITE.youtubeChannelId;
  try {
    if (!id) throw new Error("no channel id");
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m => {
      const e = m[1];
      return {
        id: (e.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1],
        title: clean((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ""),
        short: /\/shorts\//.test((e.match(/<link rel="alternate" href="(.*?)"/) || [])[1] || ""),
      };
    }).filter(v => v.id);
    if (!entries.length) throw new Error("empty feed");
    return { videos: entries.filter(v => !v.short), shorts: entries.filter(v => v.short) };
  } catch (err) {
    console.warn(`YouTube feed unavailable (${err.message}) — using fallback list`);
    return YOUTUBE.fallback;
  }
}
