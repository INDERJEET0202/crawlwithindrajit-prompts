import { abs } from "@/lib/site";

/** /robots.txt */
export default function robots() {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: abs("/sitemap.xml") };
}
