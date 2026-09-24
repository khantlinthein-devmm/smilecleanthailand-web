import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { LINE_URL, PHONE_LINK, pageMeta, toLocale } from "@/lib/site";
import { SERVICES, POSTS } from "@/data";
import CtaBand from "@/components/CtaBand";
import HowItWorks from "@/components/HowItWorks";
import AreasSection from "@/components/AreasSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import Reveal from "@/components/Reveal";
import ServiceImage from "@/components/ServiceImage";
import {
  IconArrow,
  IconChat,
  IconCheckCircle,
  IconLeaf,
  IconPhone,
  IconShield,
  IconStar,
  SERVICE_ICONS,
} from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const meta = pageMeta(locale, "", dict.meta.homeTitle, dict.meta.homeDescription);
  return { ...meta, title: { absolute: `${dict.meta.homeTitle} | Smile Clean Thailand` } };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const base = `/${locale}`;
  const whyIcons = [IconStar, IconShield, IconLeaf];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-sky-50 via-cyan-50/50 to-white">
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute top-10 -right-24 w-[28rem] h-[28rem] bg-cyan-200/40 rounded-full blur-3xl animate-float-slower" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-bold bg-white border border-sky-200 text-sky-700 rounded-full px-4 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              {dict.hero.badge}
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {dict.hero.titleA}
              <span className="block mt-3 text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                {dict.hero.titleB}
              </span>
            </h1>
            <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-lg">{dict.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full px-7 py-3.5 shadow-xl shadow-sky-500/30"
              >
                <IconChat className="w-5 h-5" />
                {dict.hero.ctaLine}
              </a>
              <a
                href={PHONE_LINK}
                className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-full px-7 py-3.5 transition-all duration-300"
              >
                <IconPhone className="w-4 h-4" />
                {dict.hero.ctaCall}
              </a>
            </div>
            <p className="mt-5 text-xs text-slate-500 flex items-center gap-2">
              <span className="flex text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconStar key={i} className="w-3.5 h-3.5" />
                ))}
              </span>
              {dict.hero.trust}
            </p>
          </div>
          <div className="animate-fade-up relative" style={{ animationDelay: "120ms" }}>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-sky-500/20 border-4 border-white">
              <Image
                src="/hero-cleaning.jpg"
                alt="Smile Clean Thailand professional cleaning"
                width={900}
                height={700}
                className="w-full h-[420px] md:h-[480px] object-cover"
                priority
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="bg-white rounded-2xl shadow-lg shadow-sky-500/10 border border-sky-100 px-5 py-4">
                <div className="flex text-amber-400 gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <IconStar key={i} className="w-3.5 h-3.5" />
                  ))}
                </div>
                <div className="font-extrabold text-lg mt-1">500+</div>
                <div className="text-xs text-slate-500">{dict.hero.happyCustomers}</div>
              </div>
              <a href="#guarantee" className="bg-white rounded-2xl shadow-lg shadow-sky-500/10 border border-sky-100 px-5 py-4 flex items-center gap-3 hover:border-sky-300 transition">
                <span className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <IconShield className="w-5 h-5" />
                </span>
                <span>
                  <span className="block font-extrabold">100%</span>
                  <span className="block text-xs text-slate-500">{dict.hero.guarantee}</span>
                </span>
              </a>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
              {dict.aboutTeaser.points.slice(0, 4).map((p) => (
                <div
                  key={p}
                  className="flex gap-2.5 items-start bg-white/90 backdrop-blur border border-sky-100 rounded-2xl px-4 py-3 text-sm text-slate-700 shadow-sm"
                >
                  <IconCheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {dict.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-2xl p-5 text-center card-lift">
                <div className="text-3xl font-extrabold text-sky-600">{s.value}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <HowItWorks dict={dict} />

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-4 mt-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold tracking-widest text-sky-600 uppercase">{dict.servicesSection.eyebrow}</div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">{dict.servicesSection.title}</h2>
              <p className="text-slate-600 mt-2">{dict.servicesSection.subtitle}</p>
            </div>
            <Link href={`${base}/services`} className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:gap-3 transition-all">
              {dict.common.viewAll} <IconArrow className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => {
            const t = s[locale];
            const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.house;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 80}>
                <Link
                  href={`${base}/services/${s.slug}`}
                  className="group flex flex-col border border-slate-200 rounded-3xl overflow-hidden bg-white card-lift hover:border-sky-300 h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ServiceImage
                      service={s}
                      alt={t.title}
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative p-6 pt-8 flex-1 flex flex-col">
                    <div className="absolute -top-6 left-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 ring-4 ring-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-lg">{t.title}</div>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed flex-1">{t.short}</p>
                    <span className="text-sky-700 text-sm font-bold mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      {dict.common.readMore} <IconArrow className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <BeforeAfterSection dict={dict} lang={locale} />

      <GuaranteeSection dict={dict} />

      {/* WHY US */}
      <section className="mt-20 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{dict.whyUs.title}</h2>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {dict.whyUs.items.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <Reveal key={w.title} delay={i * 100}>
                  <div className="bg-white border border-slate-200 rounded-3xl p-7 card-lift h-full">
                    <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-lg mt-4">{w.title}</div>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{w.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <AreasSection dict={dict} />

      {/* BLOG */}
      <section className="mx-auto max-w-6xl px-4 mt-20">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {dict.blogSection.homeTitle}
            </h2>
            <Link href={`${base}/blog`} className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:gap-3 transition-all">
              {dict.common.viewAll} <IconArrow className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {POSTS.map((p, i) => {
            const t = p[locale];
            return (
              <Reveal key={p.slug} delay={i * 90}>
                <Link
                  href={`${base}/blog/${p.slug}`}
                  className="block border border-slate-200 rounded-3xl p-6 bg-white card-lift hover:border-sky-300 h-full"
                >
                  <div className="text-xs font-medium text-slate-400">{p.date}</div>
                  <div className="font-bold mt-2 text-lg leading-snug">{t.title}</div>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t.excerpt}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBand lang={locale} />
    </div>
  );
}
