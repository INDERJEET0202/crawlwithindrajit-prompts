import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer, { Cta } from "@/components/Footer";
import Toaster from "@/components/Toaster";
import { SITE } from "@/data/content";
import { abs } from "@/lib/site";
import "./globals.css";

// Fonts are downloaded at build time and served from this site (no Google Fonts requests from visitors)
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const inter = Inter({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Site-wide SEO defaults — each page overrides title, description, canonical and image
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: `@${SITE.handle}`, url: SITE.instagram }],
  robots: { index: true, follow: true, "max-image-preview": "large" },
  verification: SITE.googleVerification ? { google: SITE.googleVerification } : undefined,
  icons: {
    icon: [
      { url: "/assets/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/icons/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/assets/icons/apple-touch-icon.png",
  },
  openGraph: { siteName: SITE.name, locale: "en_IN", type: "website", images: [{ url: abs(SITE.ogImage), width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#0a0a0c" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        <Header />
        {children}
        <Cta />
        <Footer />
        <Toaster />
        {SITE.analytics && <Analytics />}
      </body>
    </html>
  );
}
