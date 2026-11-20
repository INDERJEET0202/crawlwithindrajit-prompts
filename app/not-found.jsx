import Link from "next/link";
import { SITE } from "@/data/content";

export const metadata = { title: `Page not found | ${SITE.name}`, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="section detail">
      <div className="not-found">
        <p className="kicker">404</p>
        <h1>Page not found</h1>
        <p className="sub">It may have moved. Browse the full prompt library instead.</p>
        <Link className="btn btn-primary" href="/#prompts">Go to the library →</Link>
      </div>
    </main>
  );
}
