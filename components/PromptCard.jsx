import Link from "next/link";
import { asset, promptPath } from "@/lib/site";
import { SITE } from "@/data/content";

export default function PromptCard({ prompt: p, index = 0 }) {
  return (
    <Link className="card" href={promptPath(p)} data-cat={p.category} style={{ animationDelay: `${index * 60}ms` }}>
      <div className="card-media">
        <img src={asset(p.cover)} alt={p.images?.[0]?.alt || p.title} loading="lazy" width="800" height="500" />
        <span className="badge">{p.category}</span>
        <span className="price">{p.price || "Free"}</span>
      </div>
      <div className="card-body">
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <div className="card-foot">
          <div className="tools">{(p.tools || []).map(t => <span key={t}>{t}</span>)}</div>
          <span className="arrow">Open →</span>
        </div>
      </div>
    </Link>
  );
}

export function MoreDropsCard() {
  return (
    <a className="card card-soon" href={SITE.instagram} target="_blank" rel="noopener">
      <div className="soon-inner">
        <span className="soon-plus">+</span>
        <h3>More drops coming</h3>
        <p>New prompts land with every reel. Follow to get them first.</p>
        <span className="arrow">Follow @{SITE.handle} →</span>
      </div>
    </a>
  );
}
