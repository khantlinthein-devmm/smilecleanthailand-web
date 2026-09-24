import PageHero from "@/components/PageHero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LINE_URL, LOCALES, PHONE_DISPLAY, PHONE_LINK, pageMeta, toLocale } from "@/lib/site";
import { getDictionary } from "@/dictionaries";
import { SERVICES } from "@/data";
import CtaBand from "@/components/CtaBand";
import HowItWorks from "@/components/HowItWorks";
import GuaranteeSection from "@/components/GuaranteeSection";
import Reveal from "@/components/Reveal";
import ServiceImage from "@/components/ServiceImage";
import { IconArrow, IconChat, IconCheckCircle, IconPhone, IconShield, SERVICE_ICONS } from "@/components/icons";
import type { Metadata } from "next";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const l of LOCALES) for (const s of SERVICES) out.push({ lang: l, slug: s.slug });
  return out;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  const locale = toLocale(lang);
  const t = s[locale];
  return pageMeta(locale, `/services/${slug}`, t.title, t.short);
}

export default async function ServiceDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  const t = s[locale];
  const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.house;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.title,
    provider: { "@type": "LocalBusiness", name: "Smile Clean Thailand", telephone: "+66922867433" },
    areaServed: "Bangkok",
    description: t.short,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        title={t.title}
        subtitle={t.short}
        top={
          <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-white transition">
          <IconArrow className="w-4 h-4 rotate-180" /> {dict.common.allServices}
        </Link>
        }
      />
      <section className="section">
        <div className="container-x grid lg:grid-cols-[1fr_22rem] gap-10 items-start">
          <div>
            <Reveal>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-sky-50">
                <ServiceImage service={s} alt={t.title} sizes="(min-width: 1024px) 740px, 100vw" priority />
              </div>
            </Reveal>
            <div className="mt-8 grid gap-4 text-lg text-slate-600 leading-relaxed">
              {t.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:sticky lg:top-36 grid gap-4">
            <div className="card p-7">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="font-bold text-ink">{dict.common.whatsIncluded}</div>
              </div>
              <ul className="mt-5 grid gap-3 text-ink">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2.5 items-center">
                    <IconCheckCircle className="w-5 h-5 text-sky-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 grid gap-2.5">
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                  <IconChat className="w-4 h-4" /> {dict.hero.ctaLine}
                </a>
                <a href={PHONE_LINK} className="btn btn-outline">
                  <IconPhone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <a href="#guarantee" className="card card-hover p-5 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <IconShield className="w-5 h-5" />
              </span>
              <span className="text-sm font-semibold text-ink">{dict.guarantee.title}</span>
            </a>
          </aside>
        </div>
      </section>
      <HowItWorks dict={dict} className="bg-slate-50 border-t border-slate-100" />
      <GuaranteeSection dict={dict} />
      <CtaBand lang={locale} />
    </>
  );
}
