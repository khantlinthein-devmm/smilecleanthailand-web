import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { pageMeta, toLocale } from "@/lib/site";
import { POSTS } from "@/data";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/blog", dict.blogSection.pageTitle, dict.meta.blogDescription);
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{dict.blogSection.pageTitle}</h1>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {POSTS.map((p, i) => {
          const t = p[locale];
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
