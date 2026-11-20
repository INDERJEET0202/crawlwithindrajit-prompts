"use client";
import { useEffect, useRef } from "react";

/** Silent looping clip that only plays while on screen (saves data + battery). */
export default function AutoplayVideo({ src, poster, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || !("IntersectionObserver" in window)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduce) { v.preload = "auto"; v.play().catch(() => {}); }
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
