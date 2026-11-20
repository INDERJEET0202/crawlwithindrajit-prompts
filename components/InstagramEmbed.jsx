"use client";
import { useEffect, useRef } from "react";
import { SITE } from "@/data/content";

/** Instagram reel or post. Instagram's embed script is loaded only when this scrolls near the screen. */
export default function InstagramEmbed({ kind }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!kind || !ref.current) return;
    const load = () => {
      if (window.instgrm) return window.instgrm.Embeds.process();
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      s.onload = () => window.instgrm && window.instgrm.Embeds.process();
      document.body.append(s);
    };
    if (!("IntersectionObserver" in window)) return load();
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { io.disconnect(); load(); }
    }, { rootMargin: "600px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [kind]);

  if (!kind) {
    return (
      <div className="phone phone-soon">
        <span className="play" aria-hidden="true">▶</span>
        <p className="soon-title">Reel dropping soon</p>
        <p className="soon-sub">Watch this prompt in action on Instagram.</p>
        <a className="btn btn-ghost btn-sm" href={SITE.instagram} target="_blank" rel="noopener">Open Instagram →</a>
      </div>
    );
  }

  const link = `https://www.instagram.com/${kind.type === "post" ? "p" : "reel"}/${kind.id}/`;
  // Instagram replaces the blockquote with its own iframe, so React must not touch its contents afterwards
  return (
    <div ref={ref} className={`phone phone-embed${kind.type === "post" ? " phone-post" : ""}`}
      dangerouslySetInnerHTML={{ __html:
        `<blockquote class="instagram-media" data-instgrm-permalink="${link}?utm_source=ig_embed" data-instgrm-version="14">` +
        `<a href="${link}" target="_blank" rel="noopener">${kind.type === "post" ? "View this post" : "Watch this reel"} on Instagram →</a></blockquote>` }} />
  );
}
