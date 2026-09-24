import PageHero from "@/components/PageHero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LINE_URL, LOCALES, LOCALE_META, PHONE_DISPLAY, PHONE_LINK, SITE_URL, pageMeta, toLocale } from "@/lib/site";
import { BUSINESS_ID, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { serviceFaqs } from "@/lib/serviceFaq";
import JsonLd from "@/components/JsonLd";
import SectionHeader from "@/components/SectionHeader";
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
  const dict = await getDictionary(locale);
  const meta = pageMeta(locale, `/services/${slug}`, dict.meta.serviceTitle.replace("{service}", t.title), `${t.short} ${t.body[0]}`);
  return { ...meta, openGraph: { ...meta.openGraph, title: `${t.title} — ${dict.meta.siteTitle}` } };
}

export default async function ServiceDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  const t = s[locale];
  const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.house;
  const faqs = serviceFaqs(s, locale, dict);
  const jsonLd = [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/${locale}/services/${slug}#service`,
      name: t.title,
      serviceType: s.en.title,
      description: `${t.short} ${t.body.join(" ")}`,
      url: `${SITE_URL}/${locale}/services/${slug}`,
      image: `${SITE_URL}${s.image}`,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Bangkok" },
      availableChannel: { "@type": "ServiceChannel", serviceUrl: LINE_URL, servicePhone: PHONE_DISPLAY },
      inLanguage: LOCALE_META[locale].htmlLang,
    },
    breadcrumbSchema(locale, dict.nav.home, [
      [dict.nav.services, "/services"],
      [t.title, `/services/${slug}`],
    ]),
    faqSchema(faqs),
  ];
  const related = SERVICES.filter((x) => x.slug !== slug).slice(0, 4);
  return (
    <>
      <JsonLd nodes={jsonLd} />
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
      <section className="section bg-slate-50 border-y border-slate-100">
        <div className="container-x grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <SectionHeader eyebrow={t.title} title={dict.faqPage.title} />
          <div className="grid gap-3">
            {faqs.map((f, i) => (
              <details key={f.q} className="group card px-6 py-5 open:border-sky-200 transition" open={i === 0}>
                <summary className="font-semibold text-ink cursor-pointer list-none flex justify-between items-center gap-4">
                  <h3>{f.q}</h3>
                  <span className="w-8 h-8 shrink-0 rounded-full bg-slate-100 text-slate-500 group-open:bg-sky-600 group-open:text-white group-open:rotate-45 transition flex items-center justify-center text-lg leading-none">+</span>
                </summary>
                <p className="text-slate-600 mt-3 leading-relaxed pr-10">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <SectionHeader
            title={dict.related}
            action={
              <Link href={`/${locale}/services`} className="btn btn-outline">
                {dict.common.allServices} <IconArrow className="w-4 h-4" />
              </Link>
            }
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/${locale}/services/${r.slug}`} className="group card card-hover overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-sky-50">
                  <ServiceImage service={r} alt={r[locale].title} sizes="(min-width: 1024px) 270px, 50vw" className="group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="font-bold text-ink">{r[locale].title}</div>
                  <p className="text-sm text-slate-600 mt-1.5 line-clamp-2">{r[locale].short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <HowItWorks dict={dict} className="bg-slate-50 border-t border-slate-100" />
      <GuaranteeSection dict={dict} />
      <CtaBand lang={locale} />
    </>
  );
}
