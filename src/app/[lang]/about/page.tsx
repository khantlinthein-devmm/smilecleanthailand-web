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
import { IconCheckCircle, IconLeaf, IconShield, IconStar } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/about", dict.nav.about, dict.meta.aboutDescription);
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const a = dict.aboutPage;
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
      {/* STORY */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          <div>
            <SectionHeader eyebrow={a.storyEyebrow} title={a.storyTitle} />
            <Reveal>
              <div className="mt-6 grid gap-4 text-lg text-slate-600 leading-relaxed">
                {a.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="grid gap-4">
              <div className="card p-7 flex items-center gap-5 bg-slate-50">
                <span className="w-16 h-16 rounded-2xl bg-ink text-white text-2xl font-bold flex items-center justify-center shrink-0">P</span>
                <span>
                  <span className="block text-xl font-bold text-ink">{a.founder}</span>
                  <span className="block text-sm text-slate-500 mt-0.5">{a.founderRole}</span>
                </span>
              </div>
              {[
                [a.missionTitle, a.mission],
                [a.visionTitle, a.vision],
              ].map(([t, b]) => (
                <div key={t} className="card p-7">
                  <div className="eyebrow">{t}</div>
                  <p className="mt-3 text-ink leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-slate-50 border-y border-slate-100">
        <div className="container-x">
          <SectionHeader title={a.valuesTitle} subtitle={a.valuesSubtitle} />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {a.values.map((v, i) => {
              const Icon = [IconStar, IconLeaf, IconShield][i % 3];
              return (
                <Reveal key={v.title} delay={i * 90}>
                  <div className="card card-hover p-7 h-full">
                    <span className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/25">
                      <Icon className="w-6 h-6" />
                    </span>
                    <div className="mt-5 font-bold text-lg text-ink">{v.title}</div>
                    <p className="mt-2 text-slate-600 leading-relaxed">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY HIRE US */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <SectionHeader title={a.whyTitle} subtitle={a.whySubtitle} />
          <Reveal>
            <ul className="grid sm:grid-cols-2 gap-3">
              {a.why.map((w) => (
                <li key={w} className="flex gap-3 items-start card px-5 py-4 text-ink">
                  <IconCheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <AtAGlance dict={dict} lang={locale} />
      <GuaranteeSection dict={dict} />
      <CtaBand lang={locale} />
    </>
  );
}
