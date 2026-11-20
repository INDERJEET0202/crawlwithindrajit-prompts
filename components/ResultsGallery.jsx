"use client";
import { useEffect, useState } from "react";

/** "Real results" images; click one to see it full screen. */
export default function ResultsGallery({ images }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = e => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="feature-media">
      <h2 className="label">Real results</h2>
      {images.map((img, i) => (
        <figure className={`shot${img.h > img.w ? " portrait" : ""}`} key={img.src}>
          <button className="shot-btn" type="button" aria-label={`View ${img.caption} full size`} onClick={() => setOpen(img)}>
            <img src={img.src} alt={img.alt || img.caption} width={img.w} height={img.h}
              {...(i === 0 ? { fetchPriority: "high" } : { loading: "lazy" })} />
          </button>
          <figcaption>{img.caption}</figcaption>
        </figure>
      ))}

      {open && (
        <div className="lightbox" onClick={e => e.target.tagName !== "IMG" && setOpen(null)}>
          <button className="lightbox-close" aria-label="Close">×</button>
          <img src={open.src} alt={open.alt || open.caption} />
        </div>
      )}
    </div>
  );
}
