import type { NextConfig } from "next";

// Pages of the old WordPress site (smilecleanthailand.com) and where they live
// now, so Google rankings and old links carry over (permanent redirects).
const OLD_PAGES: [string, string][] = [
  ["/about-us", "/en/about"],
  ["/our-services", "/en/services"],
  ["/contact-us", "/en/contact"],
  ["/faqs", "/en/faq"],
  ["/testimonial", "/en/testimonials"],
  ["/blog", "/en/blog"],
  ["/feed", "/en/blog"],
  ["/comments/feed", "/en/blog"],
  ["/category/:slug*", "/en/blog"],
  // Dated blog archives and posts, e.g. /2017/06/21/some-post/
  ["/:year(\\d{4})/:rest*", "/en/blog"],
  // Old theme shop / quote pages
  ["/calculate", "/en/booking"],
  ["/order-form", "/en/booking"],
  ["/shop", "/en/services"],
  ["/shop-2", "/en/services"],
  ["/cart", "/en/booking"],
  ["/cart-2", "/en/booking"],
  ["/checkout", "/en/booking"],
  ["/checkout-2", "/en/booking"],
  ["/my-account", "/en"],
  ["/my-account-2", "/en"],
  ["/sample-page", "/en"],
];

// The real domain. Any other host (vercel.app, hostingersite.com, previews)
// gets "noindex" so search engines don't list duplicate copies of the site.
const MAIN_HOST = "smilecleanthailand\\.com";

const nextConfig: NextConfig = {
  experimental: {
    // Shared hosting (e.g. Hostinger) doesn't let Turbopack's PostCSS helper
    // processes connect back, so the build uses webpack (see package.json) and
    // compiles in the main process; dev keeps Turbopack but in worker threads.
    webpackBuildWorker: false,
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
  async redirects() {
    return [
      // www → main domain
      {
        source: "/:path*",
        has: [{ type: "host", value: `www\\.${MAIN_HOST}` }],
        destination: "https://smilecleanthailand.com/:path*",
        permanent: true,
      },
      ...OLD_PAGES.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        missing: [{ type: "host", value: MAIN_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
