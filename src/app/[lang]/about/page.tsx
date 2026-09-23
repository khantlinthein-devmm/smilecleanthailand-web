import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/site";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { IconCheckCircle } from "@/components/icons";

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = lang === "th" ? "th" : "en";
  const dict = await getDictionary(locale);
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{dict.aboutTeaser.title}</h1>
      </Reveal>
      <p className="mt-5 text-slate-700 text-lg leading-relaxed">{dict.aboutTeaser.body}</p>
      <div className="mt-8 grid gap-3">
        {dict.aboutTeaser.points.map((p, i) => (
          <Reveal key={p} delay={i * 60}>
            <div className="flex gap-3 items-center bg-sky-50/60 border border-sky-100 rounded-2xl px-5 py-4">
              <IconCheckCircle className="w-5 h-5 text-sky-500 shrink-0" />{p}
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {dict.whyUs.items.map((w, i) => (
          <Reveal key={w.title} delay={i * 90}>
            <div className="border border-slate-200 rounded-3xl p-6 bg-white card-lift h-full">
              <div className="font-bold text-lg">{w.title}</div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{w.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <CtaBand lang={locale} />
    </div>
  );
}
