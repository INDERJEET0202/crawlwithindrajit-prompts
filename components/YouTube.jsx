import YouTubePlayer from "./YouTubePlayer";
import { YouTubeIcon } from "./Icons";
import { SectionHead } from "./Sections";
import { SITE } from "@/data/content";

const thumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** "Ride along on YouTube": latest video (plays on click) + latest Shorts. */
export default function YouTubeSection({ data, number }) {
  if (!SITE.youtube || !data) return null;
  const main = data.videos?.[0];
  const shorts = (data.shorts || []).slice(0, 4);

  return (
    <section className="section section-alt" id="youtube" aria-labelledby="youtube-title">
      <SectionHead
        id="youtube-title"
        kicker={`${number} — On YouTube`}
        title="Ride along on YouTube"
        sub={`Moto vlogs, POV rides and N160 tips — the full stories behind the reels, on ${SITE.youtubeName || "my channel"}.`}
      />
      <div className="yt-layout">
        {main && (
          <div className="yt-feature">
            <YouTubePlayer id={main.id} title={main.title} thumb={thumb(main.id)} />
            <p className="yt-meta"><span className="label">Latest video</span><span className="yt-title">{main.title}</span></p>
          </div>
        )}
        <div className="yt-side">
          {shorts.length > 0 && (
            <>
              <p className="label">Latest Shorts</p>
              <div className="yt-shorts">
                {shorts.map(v => (
                  <a className="yt-short" key={v.id} href={`https://www.youtube.com/shorts/${v.id}`} target="_blank" rel="noopener">
                    <img src={thumb(v.id)} alt="" width="480" height="360" loading="lazy" />
                    <span>{v.title}</span>
                  </a>
                ))}
              </div>
            </>
          )}
          <div className="yt-actions">
            <a className="btn btn-primary" href={`${SITE.youtube}?sub_confirmation=1`} target="_blank" rel="noopener"><YouTubeIcon /> Subscribe</a>
            <a className="btn btn-ghost" href={`${SITE.youtube}/videos`} target="_blank" rel="noopener">All videos →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
