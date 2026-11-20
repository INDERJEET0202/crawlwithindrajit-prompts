import Link from "next/link";
import Logo from "./Logo";
import { YouTubeIcon } from "./Icons";
import { SITE } from "@/data/content";

export function Cta() {
  return (
    <section className="cta">
      <h2>New prompts drop with every reel.</h2>
      <p>
        Follow <a href={SITE.instagram} className="link" target="_blank" rel="noopener">@{SITE.handle}</a> so you never miss the next one.
      </p>
      <div className="cta-actions">
        <a href={SITE.instagram} className="btn btn-primary btn-lg" target="_blank" rel="noopener">Follow on Instagram →</a>
        {SITE.youtube && (
          <a href={`${SITE.youtube}?sub_confirmation=1`} className="btn btn-ghost btn-lg" target="_blank" rel="noopener"><YouTubeIcon /> Subscribe on YouTube</a>
        )}
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <p className="fine">
        Fan-made, game-inspired prompts and art. Not affiliated with or endorsed by any game publisher, including Rockstar Games or Take-Two Interactive.
      </p>
      <nav className="footer-links" aria-label="Legal">
        {SITE.youtube && <a href={SITE.youtube} target="_blank" rel="noopener">YouTube</a>}
        <Link href="/about/">About</Link>
        <Link href="/contact/">Contact</Link>
        <Link href="/privacy/">Privacy</Link>
        <Link href="/terms/">Terms</Link>
        <Link href="/refunds/">Refunds &amp; delivery</Link>
      </nav>
      <p className="fine">
        © {new Date().getFullYear()} <a href={SITE.instagram} className="link" target="_blank" rel="noopener">@{SITE.handle}</a>
      </p>
    </footer>
  );
}
