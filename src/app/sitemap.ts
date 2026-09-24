import type { MetadataRoute } from "next";
import { LOCALES, alternatesFor } from "@/lib/site";
import { SERVICES, POSTS } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastModified: Date; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
    ...["", "/about", "/services", "/faq", "/blog", "/testimonials", "/contact", "/careers"].map((path) => ({
      path,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...POSTS.map((b) => ({ path: `/blog/${b.slug}`, lastModified: new Date(b.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
  return LOCALES.flatMap((l) =>
    pages.map(({ path, ...rest }) => {
      const { canonical, languages } = alternatesFor(l, path);
      return { url: canonical, alternates: { languages }, ...rest };
    }),
  );
}
