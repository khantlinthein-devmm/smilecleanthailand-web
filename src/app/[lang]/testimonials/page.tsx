import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { pageMeta, toLocale } from "@/lib/site";
import { TESTIMONIALS } from "@/data";
import CtaBand from "@/components/CtaBand";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import Reveal from "@/components/Reveal";
import { IconArrow, IconStar } from "@/components/icons";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Smile+Clean+Thailand+Bangkok";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/testimonials", dict.testimonialsPage.title, dict.meta.testimonialsDescription);
}

export default async function Testimonials({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return (
    <>
      <PageHero eyebrow={dict.testimonialsPage.eyebrow} title={dict.testimonialsPage.title} subtitle={dict.testimonialsPage.subtitle}>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-white mt-8">
          <span className="flex text-amber-400">{[0, 1, 2, 3, 4].map((i) => <IconStar key={i} className="w-4 h-4" />)}</span>
          {dict.googleReviews} <IconArrow className="w-4 h-4" />
        </a>
      </PageHero>
      <section className="section bg-slate-50">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={(i % 2) * 90}>
              <figure className="card p-8 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="flex text-amber-400 gap-0.5">
                    {Array.from({ length: t.stars }).map((_, s) => <IconStar key={s} className="w-4 h-4" />)}
                  </span>
                  <span aria-hidden className="text-5xl leading-none font-serif text-sky-100">&rdquo;</span>
                </div>
                <blockquote className="mt-4 text-lg text-ink leading-relaxed flex-1">{t.text[locale]}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-sky-600 text-white font-semibold flex items-center justify-center">{t.name[0]}</span>
                  <span>
                    <span className="block font-semibold text-ink">{t.name}</span>
                    <span className="block text-sm text-slate-500">{t.source}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      <BeforeAfterSection dict={dict} lang={locale} />
      <CtaBand lang={locale} />
    </>
  );
}
