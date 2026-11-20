import { SITE, PROMPTS } from "@/data/content";
import { legalPages } from "@/data/legal";
import { abs, promptPath } from "@/lib/site";

/** /sitemap.xml — new prompts are added automatically. */
export default function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  return [
    { url: abs("/"), lastModified: today, priority: 1 },
    ...PROMPTS.map(p => ({ url: abs(promptPath(p)), lastModified: p.updated || p.published || today, priority: 0.8 })),
    { url: abs("/about/"), lastModified: today, priority: 0.5 },
    ...legalPages(SITE).map(pg => ({ url: abs(`/${pg.slug}/`), lastModified: pg.updated, priority: 0.3 })),
  ];
}
