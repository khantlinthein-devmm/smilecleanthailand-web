import AtAGlance from "@/components/AtAGlance";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import GuaranteeSection from "@/components/GuaranteeSection";
import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/dictionaries";
import type { Metadata } from "next";
import { pageMeta, toLocale } from "@/lib/site";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { IconCheckCircle } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/about", dict.nav.about, dict.meta.aboutDescription);
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[dict.nav.about, "/about"]])]} />
      <PageHero eyebrow={dict.nav.about} title={dict.aboutTeaser.title} subtitle={dict.aboutTeaser.body} />
      <section className="container-x -mt-10 relative z-10">
        <div className="card overflow-hidden shadow-xl shadow-slate-900/5 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100">
          {dict.stats.map((s) => (
            <div key={s.label} className="bg-white p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-bold text-ink tracking-tight">{s.value}</div>
              <div className="mt-1.5 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <AtAGlance dict={dict} lang={locale} />
      <section className="section pt-0 md:pt-0">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <SectionHeader eyebrow={dict.aboutTeaser.title} title={dict.whyUs.title} />
            <Reveal>
              <ul className="mt-8 grid gap-3">
                {dict.aboutTeaser.points.map((p) => (
                  <li key={p} className="flex gap-3 items-center card px-5 py-4 text-ink">
                    <IconCheckCircle className="w-5 h-5 text-sky-600 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="grid gap-4 lg:pt-24">
            {dict.whyUs.items.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <div className="card card-hover p-7">
                  <div className="text-sm font-semibold text-sky-600">0{i + 1}</div>
                  <div className="mt-1 font-bold text-lg text-ink">{w.title}</div>
                  <p className="text-slate-600 mt-2 leading-relaxed">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <GuaranteeSection dict={dict} />
      <CtaBand lang={locale} />
    </>
  );
}
