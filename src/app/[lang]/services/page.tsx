import Link from "next/link";
import type { Locale } from "@/lib/site";
import { SERVICES } from "@/data";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { IconArrow, SERVICE_ICONS, IconCheckCircle } from "@/components/icons";

export default async function ServicesIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = lang === "th" ? "th" : "en";
  const base = `/${locale}`;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
        <div className="text-xs font-bold tracking-widest text-sky-600 uppercase">Services</div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-1">{locale === "th" ? "บริการของเรา" : "Our Services"}</h1>
      </Reveal>
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {SERVICES.map((s, i) => {
          const t = locale === "th" ? s.th : s.en;
          const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.house;
          return (
            <Reveal key={s.slug} delay={(i % 2) * 90}>
              <Link href={`${base}/services/${s.slug}`} className="group block border border-slate-200 rounded-3xl p-7 bg-white card-lift hover:border-sky-300 h-full">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-xl">{t.title}</div>
                </div>
                <p className="text-slate-600 mt-3">{t.short}</p>
                <ul className="mt-4 grid gap-2 text-sm text-slate-600">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2 items-center"><IconCheckCircle className="w-4 h-4 text-sky-500 shrink-0" />{f}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-sky-700 text-sm font-bold mt-4">Details <IconArrow className="w-4 h-4" /></span>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <CtaBand lang={locale} />
    </div>
  );
}
