/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the same URLs as the old site: /prompts/<slug>/, /about/, /privacy/ ...
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Old links were prompt.html?p=<slug>
      {
        source: "/prompt.html",
        has: [{ type: "query", key: "p", value: "(?<slug>[a-z0-9-]+)" }],
        destination: "/prompts/:slug/",
        permanent: true,
      },
      { source: "/prompt.html", destination: "/#prompts", permanent: true },
    ];
  },
};

export default nextConfig;
