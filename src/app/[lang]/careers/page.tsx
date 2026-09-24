import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
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
  const dict = await getDictionary(locale);
  const c = dict.careers;
  const lists = [
    { title: c.perksTitle, items: c.perks },
    { title: c.requirementsTitle, items: c.requirements },
  ];
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[c.nav, "/careers"]])]} />
      <PageHero eyebrow={c.nav} title={c.title} subtitle={c.intro}>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg mt-8">
          <IconChat className="w-4 h-4" /> {c.cta}
        </a>
      </PageHero>
      <section className="section">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {lists.map((l, i) => (
            <Reveal key={l.title} delay={i * 90}>
              <div className="card p-8 h-full">
                <div className="font-bold text-xl text-ink">{l.title}</div>
                <ul className="mt-5 grid gap-3">
                  {l.items.map((item) => (
                    <li key={item} className="flex gap-3 items-start text-ink">
                      <IconCheckCircle className="w-5 h-5 text-sky-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container-x mt-6">
          <Reveal>
            <div className="rounded-2xl bg-sky-50 border border-sky-100 p-8 md:flex items-center justify-between gap-8">
              <div>
                <div className="font-bold text-xl text-ink">{c.howTitle}</div>
                <p className="mt-2 text-slate-600">{c.how}</p>
              </div>
              <div className="mt-6 md:mt-0 flex flex-wrap gap-3 shrink-0">
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                  <IconChat className="w-4 h-4" /> {c.cta}
                </a>
                <a href={PHONE_LINK} className="btn btn-outline">
                  <IconPhone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
