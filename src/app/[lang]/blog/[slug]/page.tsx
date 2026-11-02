import { IconArrow, IconCalendar, IconChat, IconCheckCircle, IconPhone, IconSparkle } from "@/components/icons";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LINE_URL, LOCALES, LOCALE_META, PHONE_DISPLAY, PHONE_LINK, SITE_URL, pageMeta, toLocale } from "@/lib/site";
import { BUSINESS_ID, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/dictionaries";
import { POSTS } from "@/data";
import CtaBand from "@/components/CtaBand";

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
  const relatedPosts = [...POSTS]
    .filter((x) => x.slug !== slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

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
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-full px-3.5 py-1 transition"
            >
              <IconArrow className="w-4 h-4 rotate-180" /> {dict.common.allPosts}
            </Link>
            <time dateTime={p.date} className="text-white/85 font-medium px-3 py-1 rounded-full bg-black/15">
              {p.date}
            </time>
          </div>
        }
      />
      <section className="section bg-slate-50/50">
        <div className="container-x grid lg:grid-cols-[1fr_22rem] gap-10 items-start">
          {/* Main Article Column */}
          <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-sky-50 shadow-sm">
              <Image
                src={p.image}
                alt={t.title}
                fill
                sizes="(min-width: 1024px) 760px, 100vw"
                priority
                unoptimized={p.image.endsWith(".svg")}
                className="object-cover"
              />
            </div>

            {/* Key Summary Box */}
            <div className="mt-8 rounded-2xl bg-sky-50/80 border border-sky-200/80 p-5 flex items-start gap-3.5">
              <span className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-sky-600/20">
                <IconSparkle className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-sky-700">
                  {locale === "th" ? "สรุปสาระสำคัญ" : "Key Takeaway"}
                </div>
                <p className="text-sm sm:text-base font-semibold text-ink mt-1 leading-relaxed">
                  {t.excerpt}
                </p>
              </div>
            </div>

            {/* Body Paragraphs */}
            <div className="mt-8 space-y-6 text-base sm:text-lg text-slate-700 leading-[1.85]">
              {t.body.map((para, i) => (
                <p key={i} className={i === 0 ? "text-ink font-medium text-lg sm:text-[1.15rem]" : ""}>
                  {para}
                </p>
              ))}
            </div>

            {/* Bottom Article Conversion Banner */}
            <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {locale === "th" ? "ประเมินราคาฟรี ไม่มีค่าใช้จ่ายแอบแฝง" : "Free Instant Quote · No Hidden Fees"}
                </span>
                <div className="font-extrabold text-lg sm:text-xl text-white">{dict.ctaBand.title}</div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{dict.ctaBand.body}</p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                  <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
                </a>
                <Link href={`/${locale}/booking`} className="btn btn-white">
                  <IconCalendar className="w-4 h-4" /> {dict.booking.nav}
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            {/* Quick Quote Card */}
            <div className="card p-6 sm:p-7 border border-slate-200/90 shadow-sm bg-white">
              <div className="font-extrabold text-lg text-ink">
                {locale === "th" ? "สนใจจองบริการทำความสะอาด?" : "Need Professional Cleaning?"}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                {locale === "th"
                  ? "ส่งรูปห้องหรือแจ้งขนาดพื้นที่ทาง LINE เพื่อรับราคาประเมินฟรีทันที"
                  : "Send photos or room size via LINE for an instant free estimate."}
              </p>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700">
                {dict.aboutTeaser.points.slice(0, 3).map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <IconCheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2.5">
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line w-full">
                  <IconChat className="w-4 h-4" /> {dict.hero.ctaLine}
                </a>
                <Link href={`/${locale}/booking`} className="btn btn-primary w-full">
                  <IconCalendar className="w-4 h-4" /> {dict.booking.cta}
                </Link>
                <a href={PHONE_LINK} className="btn btn-outline w-full">
                  <IconPhone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Related Posts Sidebar */}
            <div className="card p-6 border border-slate-200/90 shadow-sm bg-white">
              <div className="font-bold text-base text-ink pb-3 border-b border-slate-100">
                {locale === "th" ? "บทความที่น่าสนใจ" : "Related Articles"}
              </div>
              <div className="mt-4 space-y-4">
                {relatedPosts.map((rp) => {
                  const rt = rp[locale];
                  return (
                    <Link
                      key={rp.slug}
                      href={`/${locale}/blog/${rp.slug}`}
                      className="group flex gap-3.5 items-start"
                    >
                      <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-sky-50 shrink-0 border border-slate-200/80">
                        <Image
                          src={rp.image}
                          alt={rt.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <time className="text-[11px] font-semibold text-slate-400 block">{rp.date}</time>
                        <div className="font-bold text-xs sm:text-sm text-ink group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                          {rt.title}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand lang={locale} />
    </>
  );
}
