import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { pageMeta, toLocale } from "@/lib/site";
import { TESTIMONIALS } from "@/data";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { IconStar } from "@/components/icons";

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
      <CtaBand lang={locale} />
    </div>
  );
}
