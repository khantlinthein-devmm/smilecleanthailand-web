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
  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted[0];
  const rest = sorted.slice(1);
  const featT = featured[locale];

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[dict.nav.blog, "/blog"]])]} />
      <PageHero eyebrow={dict.nav.blog} title={dict.blogSection.pageTitle} subtitle={dict.meta.blogDescription} />
      <section className="section bg-slate-50/60">
        <div className="container-x space-y-10">
          {/* Featured Latest Article (Full-Width 2-Column Hero Card) */}
          <Reveal>
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="group card card-hover overflow-hidden grid lg:grid-cols-12 rounded-3xl border border-slate-200/90 bg-white shadow-md hover:shadow-2xl hover:border-sky-300 transition-all duration-300"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[22rem] overflow-hidden bg-sky-50">
                <Image
                  src={featured.image}
                  alt={featT.title}
                  fill
                  sizes="(min-width: 1024px) 680px, 100vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-600 text-white shadow-lg shadow-sky-600/30">
                  {locale === "th" ? "บทความแนะนำล่าสุด" : "Featured Guide"}
                </span>
              </div>
              <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-sky-600">
                    <time dateTime={featured.date} className="px-2.5 py-1 rounded-md bg-sky-50 border border-sky-100">
                      {featured.date}
                    </time>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{locale === "th" ? "คู่มือทำความสะอาด" : "Cleaning Guide"}</span>
                  </div>
                  <h2 className="mt-4 font-extrabold text-xl sm:text-2xl text-ink leading-snug group-hover:text-sky-600 transition-colors">
                    {featT.title}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {featT.excerpt}
                  </p>
                  {featT.body?.[0] && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 border-l-2 border-sky-200 pl-3">
                      {featT.body[0]}
                    </p>
                  )}
                </div>
                <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
                    {dict.common.readMore} <IconArrow className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Remaining 6 Articles in Symmetrical 3x2 Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((p, i) => {
              const t = p[locale];
              return (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <Link
                    href={`/${locale}/blog/${p.slug}`}
                    className="group card card-hover flex flex-col overflow-hidden h-full rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-sky-50">
                      <Image
                        src={p.image}
                        alt={t.title}
                        fill
                        sizes="(min-width: 768px) 370px, 100vw"
                        unoptimized={p.image.endsWith(".svg")}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <time
                        dateTime={p.date}
                        className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-sm text-slate-700 shadow-sm"
                      >
                        {p.date}
                      </time>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-ink leading-snug group-hover:text-sky-600 transition-colors">
                          {t.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                          {t.excerpt}
                        </p>
                      </div>
                      <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
                        <span>{dict.common.readMore}</span>
                        <IconArrow className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand lang={locale} />
    </>
  );
}
