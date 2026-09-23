import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICES, POSTS } from "@/data";

export default async function sitemap(): Promise<Metadata["alternates"] extends never ? never : import("next").MetadataRoute.Sitemap> {
  const langs = ["en", "th"];
  const staticPaths = ["", "/about", "/services", "/faq", "/blog", "/testimonials", "/contact"];
  const urls: import("next").MetadataRoute.Sitemap = [];
  for (const l of langs) {
    for (const p of staticPaths) {
      urls.push({ url: `${SITE_URL}/${l}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 });
    }
    for (const s of SERVICES) {
      urls.push({ url: `${SITE_URL}/${l}/services/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 });
    }
    for (const b of POSTS) {
      urls.push({ url: `${SITE_URL}/${l}/blog/${b.slug}`, lastModified: new Date(b.date), changeFrequency: "monthly" as const, priority: 0.6 });
    }
  }
  return urls;
}
