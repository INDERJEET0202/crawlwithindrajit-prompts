import PromptCard, { MoreDropsCard } from "@/components/PromptCard";
import Library from "@/components/Library";
import YouTubeSection from "@/components/YouTube";
import { AboutBlock, GarageGallery } from "@/components/About";
import { SectionHead, Steps, Facts, Products } from "@/components/Sections";
import JsonLd from "@/components/JsonLd";
import { SITE, ABOUT, PROMPTS, PRODUCTS, STEPS, FACTS } from "@/data/content";
import { abs, asset, promptPath } from "@/lib/site";
import { getYouTube } from "@/lib/youtube";

// Rebuild this page at most once an hour so new YouTube uploads show up automatically
export const revalidate = 3600;

export const metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { title: SITE.title, description: SITE.description, url: "/", images: [{ url: abs(SITE.ogImage), width: 1200, height: 630 }] },
  twitter: { title: SITE.title, description: SITE.description, images: [abs(SITE.ogImage)] },
};

const MARQUEE = ["AI PROMPTS", "REEL KITS", "CLAUDE SKILLS", "BIKER CULTURE", "GAME-STYLE ART"];

export default async function HomePage() {
  const youtube = await getYouTube();
  const categories = [...new Set(PROMPTS.map(p => p.category))];

  const jsonld = [
    { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: abs("/"), description: SITE.description, inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "Person", name: SITE.owner, alternateName: "@" + SITE.handle, url: abs("/about/"),
      image: abs(ABOUT.photo || SITE.ogImage), sameAs: [SITE.instagram, SITE.youtube].filter(Boolean) },
    { "@context": "https://schema.org", "@type": "ItemList", name: "AI prompt library",
      itemListElement: PROMPTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(promptPath(p)), name: p.title })) },
  ];

  return (
    <main id="top">
      <JsonLd data={jsonld} />

      <section className="hero">
        <div className="hero-sun" aria-hidden="true" />
        <div className="hero-road" aria-hidden="true" />
        <div className="hero-inner">
          <a href={SITE.instagram} className="eyebrow" target="_blank" rel="noopener">
            <span className="dot" /> @{SITE.handle} · AI prompt studio
          </a>
          <h1>Ride the machine.<br /><em>Prompt the chaos.</em></h1>
          <p className="lead">
            Free, tested AI prompts for ChatGPT and Gemini — create cinematic images of your bike,
            drop it into game-style worlds and turn the results into reels. Prompt packs,
            reel kits and Claude skills coming soon.
          </p>
          <div className="hero-cta">
            <a href="#prompts" className="btn btn-primary">Browse prompts →</a>
            <a href="#shop" className="btn btn-ghost">What&apos;s coming</a>
          </div>
          <ul className="hero-stats">
            <li><strong>{PROMPTS.length}</strong><span>Free prompts</span></li>
            <li><strong>1-click</strong><span>Copy</span></li>
            <li><strong>Soon</strong><span>Packs &amp; skills</span></li>
          </ul>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].flatMap((t, i) => [<span key={`t${i}`}>{t}</span>, <span key={`s${i}`}>✦</span>])}
        </div>
      </div>

      <section className="section" id="prompts" aria-labelledby="prompts-title">
        <SectionHead id="prompts-title" kicker="01 — The library" title="AI prompt library"
          sub="Every prompt is tested and comes with real results. Open one, customize it, copy it, create." />
        <Library categories={categories}>
          {PROMPTS.map((p, i) => <PromptCard key={p.slug} prompt={p} index={i} />)}
          <MoreDropsCard />
        </Library>
      </section>

      <section className="section section-alt" id="shop" aria-labelledby="shop-title">
        <SectionHead id="shop-title" kicker="02 — The shop" title="Packs, kits & skills"
          sub="The next level after free prompts. Drop a DM to get early access when they launch." />
        <Products products={PRODUCTS} />
      </section>

      <section className="section" id="how" aria-labelledby="how-title">
        <SectionHead id="how-title" kicker="03 — The workflow" title="How to make AI reels"
          sub="From prompt to posted reel. No camera, no editing skills needed." />
        <Steps steps={STEPS} withTags />
      </section>

      <YouTubeSection data={youtube} number="04" />

      <section className="section" id="facts" aria-labelledby="facts-title">
        <SectionHead id="facts-title" kicker="05 — Pit stop" title="AI facts & pro tips" sub="Things worth knowing before you hit generate." />
        <Facts facts={FACTS} />
      </section>

      <section className="section section-alt" id="about" aria-labelledby="about-title">
        <p className="kicker">06 — About</p>
        <AboutBlock />
        <GarageGallery />
      </section>
    </main>
  );
}
