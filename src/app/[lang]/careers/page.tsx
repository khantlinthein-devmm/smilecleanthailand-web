import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { LINE_URL, PHONE_DISPLAY, PHONE_LINK, pageMeta, toLocale } from "@/lib/site";
import Reveal from "@/components/Reveal";
import { IconChat, IconCheckCircle, IconPhone } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/careers", dict.careers.title, dict.careers.description);
}

export default async function Careers({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const c = (await getDictionary(locale)).careers;
  const lists = [
    { title: c.perksTitle, items: c.perks },
    { title: c.requirementsTitle, items: c.requirements },
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{c.title}</h1>
      </Reveal>
      <p className="mt-5 text-slate-700 text-lg leading-relaxed">{c.intro}</p>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {lists.map((l, i) => (
          <Reveal key={l.title} delay={i * 90}>
            <div className="border border-slate-200 rounded-3xl p-7 bg-white h-full">
              <div className="font-bold text-lg">{l.title}</div>
              <ul className="mt-4 grid gap-2.5">
                {l.items.map((item) => (
                  <li key={item} className="flex gap-2.5 items-start text-slate-700">
                    <IconCheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-8 bg-sky-50/70 border border-sky-200 rounded-3xl p-7">
          <div className="font-bold text-lg">{c.howTitle}</div>
          <p className="mt-2 text-slate-700">{c.how}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 bg-[#06C755] text-white font-bold rounded-full px-7 py-3.5 shadow-lg shadow-green-500/25">
              <IconChat className="w-4 h-4" /> {c.cta}
            </a>
            <a href={PHONE_LINK} className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-full px-7 py-3.5 transition-all">
              <IconPhone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
