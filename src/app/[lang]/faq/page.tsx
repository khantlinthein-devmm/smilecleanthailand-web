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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{dict.faqPage.title}</h1>
      </Reveal>
      <div className="mt-8 grid gap-3">
        {FAQS.map((f, i) => {
          const t = f[locale];
          return (
            <Reveal key={i} delay={i * 60}>
              <details className="group border border-slate-200 rounded-2xl px-6 py-5 bg-white open:border-sky-300 open:shadow-lg open:shadow-sky-500/10 transition-all duration-300" open={i === 0}>
                <summary className="font-bold cursor-pointer list-none flex justify-between items-center gap-4">
                  {t.q}
                  <span className="text-sky-500 group-open:rotate-45 transition-transform duration-300 text-xl leading-none">+</span>
                </summary>
                <p className="text-slate-600 mt-3 leading-relaxed">{t.a}</p>
              </details>
            </Reveal>
          );
        })}
      </div>
      <CtaBand lang={locale} />
    </div>
  );
}
