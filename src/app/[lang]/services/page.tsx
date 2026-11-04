import Tilt from "@/components/Tilt";
import WhatWeClean from "@/components/WhatWeClean";
import PricingSection from "@/components/PricingSection";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { SERVICE_STARTING_PRICES, pageMeta, toLocale } from "@/lib/site";
import { SERVICES } from "@/data";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import ServiceImage from "@/components/ServiceImage";
import { IconArrow, SERVICE_ICONS, IconCheckCircle } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/services", dict.servicesSection.pageTitle, dict.meta.servicesDescription);
}

export default async function ServicesIndex({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const base = `/${locale}`;
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[dict.nav.services, "/services"]])]} />
      <PageHero eyebrow={dict.servicesSection.eyebrow} title={dict.servicesSection.pageTitle} subtitle={dict.servicesSection.subtitle} />
      <section className="section bg-slate-50">
        <div className="container-x grid sm:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => {
            const t = s[locale];
            const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.house;
            const price = SERVICE_STARTING_PRICES[s.slug];
            return (
              <Reveal key={s.slug} delay={(i % 2) * 90}>
                <Tilt max={5}>
                <Link href={`${base}/services/${s.slug}`} className="group card card-hover flex flex-col overflow-hidden h-full">
                  <div className="relative aspect-[16/9] overflow-hidden bg-sky-50">
                    {price && (
                      <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-md">
                        🔥 -10% {locale === "th" ? "โปร พ.ย." : "Nov Promo"}
                      </span>
                    )}
                    <ServiceImage service={s} alt={t.title} sizes="(min-width: 640px) 50vw, 100vw" className="group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center ring-1 ring-sky-100 shrink-0">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div className="font-bold text-xl text-ink group-hover:text-sky-700 transition-colors">{t.title}</div>
                      </div>
                      {price && (
                        <div className="text-right shrink-0">
                          <div className="text-[11px] text-slate-400 line-through">฿{price.normal.toLocaleString()}</div>
                          <div className="text-lg font-black text-red-600 leading-tight">
                            ฿{price.promo.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-600 mt-4 leading-relaxed">{t.short}</p>
                    <ul className="mt-5 grid gap-2.5 text-sm text-ink flex-1">
                      {t.features.map((f) => (
                        <li key={f} className="flex gap-2.5 items-center">
                          <IconCheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="link-arrow mt-6">
                      {dict.common.details} <IconArrow className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </section>
      <PricingSection lang={locale} />
      <WhatWeClean dict={dict} />
      <CtaBand lang={locale} />
    </>
  );
}
