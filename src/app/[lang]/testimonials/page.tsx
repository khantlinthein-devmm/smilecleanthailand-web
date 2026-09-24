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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
        <div className="text-xs font-bold tracking-widest text-sky-600 uppercase">{dict.testimonialsPage.eyebrow}</div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-1">{dict.testimonialsPage.title}</h1>
        <p className="text-slate-600 mt-2">{dict.testimonialsPage.subtitle}</p>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={(i % 2) * 90}>
            <div className="border border-slate-200 rounded-3xl p-6 bg-white card-lift h-full">
              <div className="flex text-amber-400 gap-0.5">
                {Array.from({ length: t.stars }).map((_, s) => <IconStar key={s} className="w-4 h-4" />)}
              </div>
              <p className="mt-3 text-slate-700 leading-relaxed">{t.text[locale]}</p>
              <div className="mt-4 text-sm font-bold">{t.name} <span className="font-normal text-slate-400">• {t.source}</span></div>
            </div>
          </Reveal>
        ))}
      </div>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 hover:text-sky-700 font-bold rounded-full px-6 py-3 transition"
      >
        <span className="flex text-amber-400">{[0, 1, 2, 3, 4].map((i) => <IconStar key={i} className="w-4 h-4" />)}</span>
        {dict.googleReviews} <IconArrow className="w-4 h-4" />
      </a>
      <div className="-mx-4">
        <BeforeAfterSection dict={dict} lang={locale} />
      </div>
      <CtaBand lang={locale} />
    </div>
  );
}
