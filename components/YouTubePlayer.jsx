"use client";
import { useState } from "react";
import { YouTubeIcon } from "./Icons";

/** Shows the thumbnail; loads YouTube's player (privacy-enhanced mode) only when clicked. */
export default function YouTubePlayer({ id, title, thumb }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="yt-frame"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }
  return (
    <button className="yt-facade" type="button" aria-label={`Play video: ${title}`} onClick={() => setPlaying(true)}>
      <img src={thumb} alt="" width="480" height="360" loading="lazy" />
      <span className="yt-play" aria-hidden="true"><YouTubeIcon /></span>
    </button>
  );
}
