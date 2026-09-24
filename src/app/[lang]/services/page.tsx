import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { pageMeta, toLocale } from "@/lib/site";
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
            return (
              <Reveal key={s.slug} delay={(i % 2) * 90}>
                <Link href={`${base}/services/${s.slug}`} className="group card card-hover flex flex-col overflow-hidden h-full">
                  <div className="relative aspect-[16/9] overflow-hidden bg-sky-50">
                    <ServiceImage service={s} alt={t.title} sizes="(min-width: 640px) 50vw, 100vw" className="group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center ring-1 ring-sky-100 shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div className="font-bold text-xl text-ink">{t.title}</div>
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
              </Reveal>
            );
          })}
        </div>
      </section>
      <CtaBand lang={locale} />
    </>
  );
}
