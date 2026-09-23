import type { Locale } from "@/lib/site";
import { FAQS } from "@/data";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

export default async function Faq({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = lang === "th" ? "th" : "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => {
      const t = locale === "th" ? f.th : f.en;
      return { "@type": "Question", name: t.q, acceptedAnswer: { "@type": "Answer", text: t.a } };
    }),
  };
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{locale === "th" ? "คำถามที่พบบ่อย" : "FAQs"}</h1>
      </Reveal>
      <div className="mt-8 grid gap-3">
        {FAQS.map((f, i) => {
          const t = locale === "th" ? f.th : f.en;
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
