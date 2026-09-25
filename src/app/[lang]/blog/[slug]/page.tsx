import { IconChat } from "@/components/icons";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LINE_URL, LOCALES, LOCALE_META, SITE_URL, pageMeta, toLocale } from "@/lib/site";
import { BUSINESS_ID, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
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
  const url = `${SITE_URL}/${locale}/blog/${p.slug}`;
  const jsonLd = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: t.title,
      description: t.excerpt,
      articleBody: t.body.join("\n\n"),
      inLanguage: LOCALE_META[locale].htmlLang,
      image: `${SITE_URL}${p.image}`,
      datePublished: p.date,
      dateModified: p.date,
      mainEntityOfPage: url,
      author: { "@id": BUSINESS_ID },
      publisher: { "@id": BUSINESS_ID },
    },
    breadcrumbSchema(locale, dict.nav.home, [
      [dict.nav.blog, "/blog"],
      [t.title, `/blog/${p.slug}`],
    ]),
  ];
  return (
    <>
      <JsonLd nodes={jsonLd} />
      <PageHero
        title={t.title}
        subtitle={t.excerpt}
        top={
          <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 font-semibold text-white/90 hover:text-white transition">
            <IconArrow className="w-4 h-4 rotate-180" /> {dict.common.allPosts}
          </Link>
          <time dateTime={p.date} className="text-white/75">{p.date}</time>
        </div>
        }
      />
      <article className="container-x max-w-3xl section">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-sky-50">
          <Image src={p.image} alt="" fill sizes="(min-width: 768px) 720px, 100vw" unoptimized className="object-cover" />
        </div>
        <div className="mt-10 grid gap-6 text-lg text-slate-700 leading-[1.8]">
          {t.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-sky-50 border border-sky-100 p-7 flex flex-wrap items-center justify-between gap-5">
          <div className="font-semibold text-ink">{dict.ctaBand.title}</div>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
          </a>
        </div>
      </article>
    </>
  );
}
