import Link from "next/link";
import { notFound } from "next/navigation";
import PromptCard from "@/components/PromptCard";
import PromptStudio from "@/components/PromptStudio";
import ResultsGallery from "@/components/ResultsGallery";
import CompareSlider from "@/components/CompareSlider";
import InstagramEmbed from "@/components/InstagramEmbed";
import JsonLd from "@/components/JsonLd";
import { Steps, Faq } from "@/components/Sections";
import { SITE, PROMPTS } from "@/data/content";
import { abs, asset, promptPath, igKind } from "@/lib/site";
import { dims } from "@/lib/images";

// One page per prompt, all built ahead of time. Unknown slugs → 404.
export const dynamicParams = false;
export function generateStaticParams() {
  const seen = new Set();
  for (const p of PROMPTS) {
    if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Bad slug "${p.slug}" — use lowercase letters, numbers and dashes`);
    if (seen.has(p.slug)) throw new Error(`Duplicate slug "${p.slug}"`);
    seen.add(p.slug);
  }
  return PROMPTS.map(p => ({ slug: p.slug }));
}

const find = slug => PROMPTS.find(p => p.slug === slug);

export async function generateMetadata({ params }) {
  const p = find((await params).slug);
  if (!p) return {};
  const title = `${p.seoTitle || p.title} | CrawlWithIndrajit`;
  const description = p.description || p.summary;
  const image = abs(p.ogImage || p.cover);
  return {
    title, description,
    keywords: p.keywords,
    alternates: { canonical: promptPath(p) },
    openGraph: { type: "article", title, description, url: promptPath(p), images: [{ url: image, width: 1200, height: 630, alt: p.images?.[0]?.alt || p.title }] },
    twitter: { title, description, images: [image] },
  };
}

export default async function PromptPage({ params }) {
  const p = find((await params).slug);
  if (!p) notFound();

  const images = (p.images || []).map(img => ({ ...img, src: asset(img.src), ...dims(img.src) }));
  const inputs = (p.inputs || []).map(inp => ({ ...inp, src: asset(inp.src), ...dims(inp.src) }));
  const downloads = inputs.filter(i => i.download);
  const ig = igKind(p.reel);
  const others = PROMPTS.filter(x => x !== p).slice(0, 3);
  // upload strip: same photo height (~420px) whatever the mix of portrait/landscape
  const inputsWidth = Math.round(inputs.reduce((t, i) => t + i.w / i.h, 0) * 420 + (inputs.length - 1) * 16);

  const jsonld = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: "Prompts", item: abs("/#prompts") },
      { "@type": "ListItem", position: 3, name: p.title, item: abs(promptPath(p)) },
    ]},
    { "@context": "https://schema.org", "@type": "CreativeWork", name: p.title, headline: p.seoTitle || p.title,
      description: p.description || p.summary, url: abs(promptPath(p)), image: (p.images || []).map(i => abs(i.src)),
      datePublished: p.published, keywords: (p.keywords || []).join(", "), isAccessibleForFree: true, inLanguage: "en",
      author: { "@type": "Person", name: SITE.owner, url: SITE.instagram },
      publisher: { "@type": "Organization", name: SITE.name, url: abs("/") } },
  ];

  return (
    <>
      <main className="section detail">
        <JsonLd data={jsonld} />
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href="/#prompts">Prompts</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{p.title}</span>
        </nav>

        <header className="detail-head">
          <div className="detail-tags"><span className="badge">{p.category}</span><span className="price">{p.price || "Free"}</span></div>
          <h1>{p.title}</h1>
          <p className="sub">{p.summary}</p>
          <div className="tools">
            {(p.tools || []).map(t => <span key={t}>{t}</span>)}
            {p.output && <span>{p.output}</span>}
          </div>
        </header>

        <div className="feature">
          <ResultsGallery images={images} />
          <PromptStudio template={p.prompt} fields={p.fields || []} downloads={downloads.map(d => ({ src: d.src, download: d.download, label: d.label }))} />
        </div>

        {p.compare && (
          <section className="compare-block" aria-labelledby="compare-title">
            <p className="kicker">Real vs AI</p>
            <h2 id="compare-title">{p.compare.title || "Before and after"}</h2>
            <p className="sub">{p.compare.text || "Drag the slider to compare the original with the AI result."}</p>
            <CompareSlider
              before={asset(p.compare.before)} after={asset(p.compare.after)}
              beforeLabel={p.compare.beforeLabel} afterLabel={p.compare.afterLabel}
              alt={p.compare.alt} ratio={p.compare.ratio}
            />
          </section>
        )}

        {inputs.length > 0 && (
          <section className="inputs-block" aria-labelledby="inputs-title">
            <p className="kicker">What to upload</p>
            <h2 id="inputs-title">{p.inputsTitle || "What to upload"}</h2>
            <p className="sub">{p.inputsText || "The photos that went into the AI with this prompt."}</p>
            <div className="inputs" style={{ maxWidth: inputsWidth }}>
              {inputs.map(inp => (
                <figure className={`input${inp.w > inp.h ? " landscape" : ""}`} style={{ flexGrow: +(inp.w / inp.h).toFixed(3) }} key={inp.src}>
                  <img src={inp.src} alt={inp.alt || `${inp.label} — input photo for this prompt`} width={inp.w} height={inp.h} loading="lazy" />
                  <figcaption>
                    <strong>{inp.label}</strong> {inp.tip}
                    {inp.download && <> <a className="dl-link" href={inp.src} download={inp.download}>⬇ Download</a></>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="reel-block" aria-labelledby="reel-title">
          <div className="reel-text">
            <p className="kicker">{ig?.type === "post" ? "On Instagram" : "Watch it"}</p>
            <h2 id="reel-title">{ig?.type === "post" ? "See the post" : "See the reel"}</h2>
            <p className="sub">{p.reelText || "This is what the prompt turns into once it is edited and set to music."}</p>
            <a className="btn btn-primary" href={SITE.instagram} target="_blank" rel="noopener">Follow @{SITE.handle}</a>
          </div>
          <InstagramEmbed kind={ig} />
        </section>

        {p.steps?.length > 0 && (
          <section className="howto" aria-labelledby="howto-title">
            <p className="kicker">How to use it</p>
            <h2 id="howto-title">{p.stepsTitle || "Make the reel"}</h2>
            <Steps steps={p.steps} />
          </section>
        )}

        {p.faq?.length > 0 && (
          <section className="faq" aria-labelledby="faq-title">
            <p className="kicker">Questions</p>
            <h2 id="faq-title">FAQ</h2>
            <Faq items={p.faq} />
          </section>
        )}
      </main>

      {others.length > 0 && (
        <section className="section section-alt" aria-labelledby="more-title">
          <div className="section-head"><p className="kicker">Keep going</p><h2 id="more-title">More prompts</h2></div>
          <div className="grid">{others.map((x, i) => <PromptCard key={x.slug} prompt={x} index={i} />)}</div>
        </section>
      )}
    </>
  );
}
