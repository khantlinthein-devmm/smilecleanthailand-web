import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { IconArrow } from "@/components/icons";
import CtaBand from "@/components/CtaBand";
import Image from "next/image";
import PageHero from "@/components/PageHero";
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
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[dict.nav.blog, "/blog"]])]} />
      <PageHero eyebrow={dict.nav.blog} title={dict.blogSection.pageTitle} subtitle={dict.meta.blogDescription} />
      <section className="section">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {POSTS.map((p, i) => {
            const t = p[locale];
            return (
              <Reveal key={p.slug} delay={i * 90}>
                <Link href={`/${locale}/blog/${p.slug}`} className="group card card-hover flex flex-col overflow-hidden h-full">
                  <div className="relative aspect-[16/9] overflow-hidden bg-sky-50">
                    <Image src={p.image} alt="" fill sizes="(min-width: 768px) 370px, 100vw" unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <time dateTime={p.date} className="text-xs font-medium text-slate-400">{p.date}</time>
                    <div className="font-bold text-lg text-ink mt-2 leading-snug">{t.title}</div>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed flex-1">{t.excerpt}</p>
                    <span className="link-arrow mt-5">
                      {dict.common.readMore} <IconArrow className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      <CtaBand lang={locale} />
    </>
  );
}
