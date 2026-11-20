import Link from "next/link";
import { SITE } from "@/data/content";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${SITE.name} home`}>
      CRAWLWITH<span>INDRAJIT</span><small>PROMPTS</small>
    </Link>
  );
}
