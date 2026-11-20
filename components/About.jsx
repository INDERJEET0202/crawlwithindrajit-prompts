import Link from "next/link";
import SunsetScene from "./SunsetScene";
import AutoplayVideo from "./AutoplayVideo";
import { YouTubeIcon } from "./Icons";
import { ABOUT, SITE } from "@/data/content";
import { asset } from "@/lib/site";

export function AboutBlock({ as: Heading = "h2" }) {
  return (
    <div className="about">
      <div className="about-photo">
        {ABOUT.photo
          ? <img src={asset(ABOUT.photo)} alt={`${SITE.owner} leaning on his Pulsar N160 at night`} width="960" height="1200" loading="lazy" />
          : <span className="about-badge" aria-hidden="true"><SunsetScene /></span>}
      </div>
      <div className="about-text">
        <Heading id="about-title">{ABOUT.title}</Heading>
        {ABOUT.paragraphs.map(t => <p key={t}>{t}</p>)}
        <ul className="about-facts">
          {ABOUT.facts.map(f => <li key={f.label}><span>{f.label}</span><strong>{f.value}</strong></li>)}
        </ul>
        <div className="about-actions">
          <a className="btn btn-primary" href={SITE.instagram} target="_blank" rel="noopener">Follow @{SITE.handle}</a>
          {SITE.youtube && <a className="btn btn-ghost" href={SITE.youtube} target="_blank" rel="noopener"><YouTubeIcon /> YouTube</a>}
          <Link className="btn btn-ghost" href="/contact/">Contact</Link>
        </div>
      </div>
    </div>
  );
}

export function GarageGallery() {
  const items = ABOUT.gallery || [];
  if (!items.length) return null;
  return (
    <div className="garage">
      <h3 className="label">From the garage</h3>
      <div className="garage-grid">
        {items.map(item => (
          <figure className={`garage-item ${item.shape === "tall" ? "tall" : "wide"}`} key={item.src}>
            {item.type === "video"
              ? <AutoplayVideo src={asset(item.src)} poster={asset(item.poster)} label={item.alt} />
              : <img src={asset(item.src)} alt={item.alt} loading="lazy" />}
          </figure>
        ))}
      </div>
    </div>
  );
}
