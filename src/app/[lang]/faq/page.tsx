import { IconChat, IconPhone } from "@/components/icons";
import { LINE_URL, PHONE_DISPLAY, PHONE_LINK } from "@/lib/site";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { pageMeta, toLocale } from "@/lib/site";
import { FAQS } from "@/data";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/faq", dict.faqPage.title, dict.meta.faqDescription);
}

export default async function Faq({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => {
      const t = f[locale];
      return { "@type": "Question", name: t.q, acceptedAnswer: { "@type": "Answer", text: t.a } };
    }),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={dict.nav.faqs} title={dict.faqPage.title} subtitle={dict.meta.faqDescription} />
      <section className="section">
        <div className="container-x grid lg:grid-cols-[1fr_20rem] gap-10 items-start">
          <div className="grid gap-3">
            {FAQS.map((f, i) => {
              const t = f[locale];
              return (
                <Reveal key={i} delay={i * 50}>
                  <details className="group card px-6 py-5 open:border-sky-200 open:shadow-lg open:shadow-slate-900/5 transition" open={i === 0}>
                    <summary className="font-semibold text-ink cursor-pointer list-none flex justify-between items-center gap-4">
                      {t.q}
                      <span className="w-8 h-8 shrink-0 rounded-full bg-slate-100 text-slate-500 group-open:bg-sky-600 group-open:text-white group-open:rotate-45 transition flex items-center justify-center text-lg leading-none">+</span>
                    </summary>
                    <p className="text-slate-600 mt-3 leading-relaxed pr-10">{t.a}</p>
                  </details>
                </Reveal>
              );
            })}
          </div>
          <aside className="card p-7 lg:sticky lg:top-36 bg-slate-50">
            <div className="font-bold text-lg text-ink">{dict.contactPage.title}</div>
            <p className="mt-2 text-slate-600 leading-relaxed">{dict.ctaBand.body}</p>
            <div className="mt-6 grid gap-2.5">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
              </a>
              <a href={PHONE_LINK} className="btn btn-outline">
                <IconPhone className="w-4 h-4" /> {PHONE_DISPLAY}
              </a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand lang={locale} />
    </>
  );
}
