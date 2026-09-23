import Link from "next/link";
import type { Locale } from "@/lib/site";
import { POSTS } from "@/data";
import Reveal from "@/components/Reveal";

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = lang === "th" ? "th" : "en";
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{locale === "th" ? "บทความ" : "Blog"}</h1>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {POSTS.map((p, i) => {
          const t = locale === "th" ? p.th : p.en;
          return (
            <Reveal key={p.slug} delay={i * 90}>
              <Link href={`/${locale}/blog/${p.slug}`} className="block border border-slate-200 rounded-3xl p-6 bg-white card-lift hover:border-sky-300 h-full">
                <div className="text-xs font-medium text-slate-400">{p.date}</div>
                <div className="font-bold mt-2 text-lg leading-snug">{t.title}</div>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t.excerpt}</p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
