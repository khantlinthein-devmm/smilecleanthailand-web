import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, LINE_URL, PHONE_LINK, type Locale } from "@/lib/site";
import { SERVICES } from "@/data";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { IconArrow, IconChat, IconCheckCircle, IconPhone, SERVICE_ICONS } from "@/components/icons";
import type { Metadata } from "next";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const l of ["en", "th"]) for (const s of SERVICES) out.push({ lang: l, slug: s.slug });
  return out;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  const th = lang === "th";
  const t = th ? s.th : s.en;
  return {
    title: `${t.title} Bangkok | Smile Clean Thailand`,
    description: t.short,
    alternates: { canonical: `${SITE_URL}/${th ? "th" : "en"}/services/${slug}` },
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale: Locale = lang === "th" ? "th" : "en";
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  const t = locale === "th" ? s.th : s.en;
  const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.house;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.title,
    provider: { "@type": "LocalBusiness", name: "Smile Clean Thailand" },
    areaServed: "Bangkok",
    description: t.short,
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-sm text-sky-700 font-bold hover:gap-3 transition-all">
        <IconArrow className="w-4 h-4 rotate-180" /> {locale === "th" ? "บริการทั้งหมด" : "All services"}
      </Link>
      <Reveal>
        <div className="mt-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center shadow-xl shadow-sky-500/25">
            <Icon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t.title}</h1>
        </div>
      </Reveal>
      <p className="text-slate-600 mt-4 text-lg leading-relaxed">{t.short}</p>
      <div className="mt-6 grid gap-3">
        {t.body.map((p, i) => <p key={i} className="text-slate-700 leading-relaxed">{p}</p>)}
      </div>
      <Reveal>
        <div className="mt-8 bg-sky-50/70 border border-sky-200 rounded-3xl p-7">
          <div className="font-bold text-lg">{locale === "th" ? "สิ่งที่รวมในบริการ" : "What's included"}</div>
          <ul className="mt-3 grid gap-2.5">
            {t.features.map((f) => <li key={f} className="flex gap-2.5 items-center"><IconCheckCircle className="w-5 h-5 text-sky-500 shrink-0" />{f}</li>)}
          </ul>
        </div>
      </Reveal>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={LINE_URL} target="_blank" className="btn-primary inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full px-7 py-3.5 shadow-lg shadow-sky-500/25"><IconChat className="w-4 h-4" /> LINE</a>
        <a href={PHONE_LINK} className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-full px-7 py-3.5 transition-all"><IconPhone className="w-4 h-4" /> 063-616-2829</a>
      </div>
      <CtaBand lang={locale} />
    </div>
  );
}
