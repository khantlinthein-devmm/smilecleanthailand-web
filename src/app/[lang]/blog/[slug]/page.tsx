import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCALES, pageMeta, toLocale } from "@/lib/site";
import { getDictionary } from "@/dictionaries";
import { POSTS } from "@/data";
import { IconArrow } from "@/components/icons";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const l of LOCALES) for (const p of POSTS) out.push({ lang: l, slug: p.slug });
  return out;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  const locale = toLocale(lang);
  const t = p[locale];
  const meta = pageMeta(locale, `/blog/${slug}`, t.title, t.excerpt);
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: p.date } };
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const t = p[locale];
  const jsonLd = { "@context": "https://schema.org", "@type": "BlogPosting", headline: t.title, inLanguage: locale, image: "https://smilecleanthailand.com/hero-cleaning.jpg", description: t.excerpt, datePublished: p.date, author: { "@type": "Organization", name: "Smile Clean Thailand" } };
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 animate-fade-up">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:gap-3 transition-all">
        <IconArrow className="w-4 h-4 rotate-180" /> {dict.common.allPosts}
      </Link>
      <div className="text-sm text-slate-400 mt-5">{p.date}</div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2 leading-tight">{t.title}</h1>
      <p className="text-slate-600 mt-4 text-lg leading-relaxed">{t.excerpt}</p>
      <div className="mt-8 grid gap-5 text-slate-700 leading-relaxed text-lg">
        {t.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}
