import Link from "next/link";
import { AboutBlock, GarageGallery } from "@/components/About";
import JsonLd from "@/components/JsonLd";
import { SITE, ABOUT } from "@/data/content";
import { abs } from "@/lib/site";

const title = `About ${SITE.owner} | ${SITE.name}`;
const description = `Meet ${SITE.owner} (@${SITE.handle}) — the rider behind the AI prompts, reels and upcoming prompt packs on ${SITE.name}.`;

export const metadata = {
  title, description,
  alternates: { canonical: "/about/" },
  openGraph: { type: "profile", title, description, url: "/about/", images: [{ url: abs(ABOUT.photo || SITE.ogImage) }] },
  twitter: { title, description, images: [abs(ABOUT.photo || SITE.ogImage)] },
};

export default function AboutPage() {
  return (
    <main className="section detail">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", name: `About ${SITE.owner}`, url: abs("/about/"),
        mainEntity: { "@type": "Person", name: SITE.owner, alternateName: "@" + SITE.handle, sameAs: [SITE.instagram, SITE.youtube].filter(Boolean) } }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About</span></nav>
      <p className="kicker">About</p>
      <AboutBlock as="h1" />
      <GarageGallery />
    </main>
  );
}
