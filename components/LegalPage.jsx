import Link from "next/link";
import JsonLd from "./JsonLd";
import { SITE } from "@/data/content";
import { legalPages } from "@/data/legal";
import { abs } from "@/lib/site";

export const getLegal = slug => legalPages(SITE).find(p => p.slug === slug);

/** SEO tags for a policy page (used by each page's `metadata`). */
export function legalMetadata(slug) {
  const page = getLegal(slug);
  const title = `${page.title} | ${SITE.name}`;
  const images = [{ url: abs(SITE.ogImage), width: 1200, height: 630 }];
  return {
    title, description: page.description,
    alternates: { canonical: `/${slug}/` },
    openGraph: { title, description: page.description, url: `/${slug}/`, images },
    twitter: { title, description: page.description, images: [abs(SITE.ogImage)] },
  };
}

/** Privacy / Terms / Refunds / Contact — text lives in data/legal.js */
export default function LegalPage({ slug }) {
  const page = getLegal(slug);
  return (
    <main className="section detail legal">
      <JsonLd data={{ "@context": "https://schema.org", "@type": page.contact ? "ContactPage" : "WebPage", name: page.title, url: abs(`/${slug}/`), dateModified: page.updated }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{page.title}</span></nav>
      <header className="detail-head">
        <h1>{page.title}</h1>
        <p className="fine">Last updated {page.updated}</p>
      </header>

      {page.sections.map(sec => (
        <section className="legal-section" key={sec.h}>
          <h2>{sec.h}</h2>
          {sec.p.map(t => <p key={t}>{t}</p>)}
        </section>
      ))}

      {page.contact && (
        <div className="contact-grid">
          <a className="contact-card" href={SITE.instagram} target="_blank" rel="noopener">
            <span className="contact-label">Instagram DM</span><strong>@{SITE.handle}</strong><span className="contact-sub">Fastest way to reach me</span>
          </a>
          {SITE.contactEmail && (
            <a className="contact-card" href={`mailto:${SITE.contactEmail}`}>
              <span className="contact-label">Email</span><strong>{SITE.contactEmail}</strong><span className="contact-sub">Orders, refunds and business</span>
            </a>
          )}
          <div className="contact-card">
            <span className="contact-label">Based in</span><strong>{SITE.location}</strong><span className="contact-sub">Replies within 1–2 business days</span>
          </div>
        </div>
      )}
    </main>
  );
}
