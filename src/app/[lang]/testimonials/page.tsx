import type { Locale } from "@/lib/site";
import { TESTIMONIALS } from "@/data";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { IconStar } from "@/components/icons";

export default async function Testimonials({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = lang === "th" ? "th" : "en";
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
        <div className="text-xs font-bold tracking-widest text-sky-600 uppercase">Reviews</div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-1">{locale === "th" ? "รีวิวลูกค้า" : "Testimonials"}</h1>
        <p className="text-slate-600 mt-2">Happy Customer, Happy Home</p>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={(i % 2) * 90}>
            <div className="border border-slate-200 rounded-3xl p-6 bg-white card-lift h-full">
              <div className="flex text-amber-400 gap-0.5">
                {Array.from({ length: t.stars }).map((_, s) => <IconStar key={s} className="w-4 h-4" />)}
              </div>
              <p className="mt-3 text-slate-700 leading-relaxed">{locale === "th" ? t.th : t.en}</p>
              <div className="mt-4 text-sm font-bold">{t.name} <span className="font-normal text-slate-400">• {t.source}</span></div>
            </div>
          </Reveal>
        ))}
      </div>
      <CtaBand lang={locale} />
    </div>
  );
}
