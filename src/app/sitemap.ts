import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL, alternatesFor } from "@/lib/site";
import { SERVICES, POSTS } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastModified: Date; changeFrequency: "weekly" | "monthly"; priority: number; images?: string[] }[] = [
    ...["", "/about", "/services", "/faq", "/blog", "/testimonials", "/contact", "/careers", "/privacy", "/terms"].map((path) => ({
      path,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.8,
    })),
    ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7, images: [`${SITE_URL}${s.image}`] })),
    ...POSTS.map((b) => ({ path: `/blog/${b.slug}`, lastModified: new Date(b.date), changeFrequency: "monthly" as const, priority: 0.6, images: [`${SITE_URL}${b.image}`] })),
  ];
  return LOCALES.flatMap((l) =>
    pages.map(({ path, ...rest }) => {
      const { canonical, languages } = alternatesFor(l, path);
      return { url: canonical, alternates: { languages }, ...rest };
    }),
  );
}
