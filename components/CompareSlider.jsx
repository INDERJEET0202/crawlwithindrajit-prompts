"use client";
import { useState } from "react";

/** Drag to compare the real photo with the AI result. */
export default function CompareSlider({ before, after, beforeLabel, afterLabel, alt, ratio }) {
  const [pos, setPos] = useState(50);
  const m = /^\s*(\d+)\s*\/\s*(\d+)/.exec(ratio || "");
  const portrait = m && +m[1] < +m[2];

  return (
    <div className={`compare${portrait ? " portrait" : ""}`} style={{ "--pos": `${pos}%`, ...(ratio ? { aspectRatio: ratio } : {}) }}>
      <img className="compare-img" src={after} alt={afterLabel} loading="lazy" />
      <div className="compare-before"><img className="compare-img" src={before} alt={beforeLabel} loading="lazy" /></div>
      <span className="compare-tag left">{beforeLabel}</span>
      <span className="compare-tag right">{afterLabel}</span>
      <span className="compare-handle" aria-hidden="true"><span>⟷</span></span>
      <input
        className="compare-range" type="range" min="0" max="100" value={pos}
        aria-label={alt || "Compare real photo and AI result"}
        onChange={e => setPos(+e.target.value)}
      />
    </div>
  );
}
