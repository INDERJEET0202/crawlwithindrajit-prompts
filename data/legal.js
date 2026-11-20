/* =====================================================================
   POLICY PAGES — Privacy, Terms, Refunds & Delivery, Contact.
   Plain-language starting point, not legal advice. Review before you
   start selling, and fill SITE.owner (legal name) + SITE.contactEmail
   in content.js — payment providers like Razorpay check these pages.
   ===================================================================== */

const UPDATED = "2026-11-21";

function legalPages(SITE) {
  const ig = "@" + SITE.handle;
  const reach = SITE.contactEmail
    ? `email ${SITE.contactEmail} or send a DM to ${ig} on Instagram`
    : `send a DM to ${ig} on Instagram`;

  return [
    {
      slug: "privacy",
      title: "Privacy Policy",
      description: `How ${SITE.name} handles your data: no accounts, no tracking cookies, cookie-free analytics.`,
      sections: [
        { h: "Who we are", p: [
          `${SITE.name} (${SITE.url}) is run by ${SITE.owner} (${ig}) from ${SITE.location}. This policy explains what happens to your data when you use the site.`,
        ]},
        { h: "The short version", p: [
          "You can use the whole site without an account. We don't set tracking cookies, we don't sell data, and we don't run ads.",
        ]},
        { h: "What we collect", p: [
          "Analytics: we use Vercel Web Analytics to count page views. It does not use cookies. It records the page visited, the referring website, country, browser, operating system and device type. Visitors are not identified across days, and we cannot see who you are.",
          "Server logs: our host, Vercel, keeps short-term technical logs (such as IP address and browser) to deliver the site and protect it from abuse.",
          "Messages: if you contact us by Instagram DM or email, we receive what you send and use it only to reply.",
          "Prompt customizer and copy button: everything you type in “Customize your prompt” stays in your browser. It is never sent to us.",
        ]},
        { h: "Third-party services on this site", p: [
          "Instagram (Meta): prompt pages embed Instagram reels. When a reel loads, Instagram may collect data under Meta's privacy policy.",
          "Google Fonts: fonts load from Google's servers, which receive your IP address.",
          "Vercel: hosts the site and provides the analytics above.",
          "Payments (when paid products launch): purchases will be processed by a payment provider such as Razorpay, Gumroad or Lemon Squeezy. They handle your card or UPI details; we only receive your name, email and order details to deliver what you bought.",
        ]},
        { h: "How long we keep it", p: [
          "Analytics are kept as totals. Messages and order details are kept as long as needed to support you and to meet tax and legal record-keeping rules.",
        ]},
        { h: "Your choices", p: [
          `You can ask what we hold about you, or ask us to delete it: ${reach}. You can also block third-party content (like Instagram embeds) in your browser.`,
        ]},
        { h: "Children", p: [
          "This site is not directed at children under 13, and we don't knowingly collect their data.",
        ]},
        { h: "Changes", p: [
          "If this policy changes, we'll update this page and the date at the top.",
        ]},
      ],
    },
    {
      slug: "terms",
      title: "Terms of Use",
      description: `The rules for using ${SITE.name}, its free prompts and future paid products.`,
      sections: [
        { h: "Using this site", p: [
          `By using ${SITE.url} you agree to these terms. If you don't agree, please don't use the site.`,
        ]},
        { h: "Free prompts", p: [
          "You may copy, edit and use the free prompts to create images, videos and posts, including for your own commercial channels.",
          `Please don't republish or sell our prompts — on their own or as collections — as your own. A credit to ${ig} when you share results is appreciated.`,
        ]},
        { h: "What you make with AI", p: [
          "You are responsible for what you create and post, and for following the terms of the AI tool you use (ChatGPT, Gemini and others). Results vary between tools and attempts; we don't guarantee any particular output.",
          "Only upload photos you own or have permission to use.",
        ]},
        { h: "Fan-made and trademarks", p: [
          "Some prompts are inspired by games, films or brands. They are fan-made and not affiliated with or endorsed by those owners — for example Rockstar Games or Take-Two Interactive. All trademarks belong to their respective owners.",
        ]},
        { h: "Paid products", p: [
          "When paid products (prompt packs, reel kits, Claude skills, custom prompts) launch, each purchase gives you a personal, non-transferable licence to use them for your own work. Sharing or reselling the files is not allowed. Prices and what's included are shown before you pay. See the Refund & Delivery Policy for refunds.",
        ]},
        { h: "No warranty", p: [
          "The site and prompts are provided “as is”. To the extent the law allows, we aren't liable for indirect losses arising from using them. Nothing here limits rights you have under consumer law.",
        ]},
        { h: "Governing law", p: [
          "These terms are governed by the laws of India.",
        ]},
        { h: "Contact", p: [ `Questions about these terms: ${reach}.` ] },
      ],
    },
    {
      slug: "refunds",
      title: "Refund, Cancellation & Delivery Policy",
      description: `How delivery, cancellations and refunds work for ${SITE.name} digital products.`,
      sections: [
        { h: "Right now", p: [
          "Everything on the site is currently free, so there is nothing to refund. This policy applies to paid products once they launch.",
        ]},
        { h: "Delivery", p: [
          "All products are digital. Right after payment you get access by download link and/or email — usually instantly, and always within 24 hours. Nothing is shipped physically.",
          `If you haven't received your product within 24 hours, check your spam folder, then ${reach} with your order ID.`,
        ]},
        { h: "Cancellations", p: [
          "Because products are delivered instantly, an order can't be cancelled after payment. Custom prompt orders can be cancelled for a full refund before work starts.",
        ]},
        { h: "Refunds", p: [
          "Digital products are generally non-refundable once delivered. We will refund in full if: you were charged twice for the same order; the product was never delivered; or the files are broken and we can't fix or replace them within 3 business days.",
          `Request a refund within 7 days of purchase: ${reach} with your order ID and the reason.`,
          "Approved refunds go back to your original payment method within 5–7 business days. Your bank may take a little longer to show it.",
        ]},
      ],
    },
    {
      slug: "contact",
      title: "Contact",
      description: `How to reach ${SITE.name} — questions, collaborations, orders and support.`,
      contact: true,
      sections: [
        { h: "Get in touch", p: [
          "Questions about a prompt, a collaboration, a custom prompt, or an order — we usually reply within 1–2 business days.",
        ]},
      ],
    },
  ].map(page => ({ ...page, updated: UPDATED }));
}

if (typeof module === "object" && module.exports) module.exports = { legalPages };
