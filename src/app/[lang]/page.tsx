import SplitWords from "@/components/SplitWords";
import Parallax from "@/components/Parallax";
import Tilt from "@/components/Tilt";
import Bubbles3D from "@/components/Bubbles3D";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { LINE_URL, PHONE_DISPLAY, PHONE_LINK, WHATSAPP_NUMBER, pageMeta, toLocale, type Locale } from "@/lib/site";
import { SERVICES, POSTS, FAQS } from "@/data";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import CtaBand from "@/components/CtaBand";
import HowItWorks from "@/components/HowItWorks";
import AreasSection from "@/components/AreasSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ServiceImage from "@/components/ServiceImage";
import TrustStrip from "@/components/TrustStrip";
import HomeReviews from "@/components/HomeReviews";
import HomeFaq from "@/components/HomeFaq";
import {
  IconArrow,
  IconCalendar,
  IconChat,
  IconCheckCircle,
  IconLeaf,
  IconPhone,
  IconShield,
  IconStar,
  IconWhatsApp,
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
  return { ...meta, title: { absolute: `Smile Clean Thailand — ${dict.meta.homeTitle}` } };
}

function Stars({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className="flex text-amber-400 gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} className={className} />
      ))}
    </span>
  );
}


const SERVICE_BADGES: Record<string, Record<Locale, { label: string; style: string }>> = {
  "condo-cleaning": {
    th: { label: "⭐ บริการยอดนิยม", style: "bg-amber-500 text-white shadow-amber-500/30" },
    en: { label: "⭐ Most Popular", style: "bg-amber-500 text-white shadow-amber-500/30" },
    zh: { label: "⭐ 最受欢迎", style: "bg-amber-500 text-white shadow-amber-500/30" },
    my: { label: "⭐ လူကြိုက်အများဆုံး", style: "bg-amber-500 text-white shadow-amber-500/30" },
    ru: { label: "⭐ Хит продаж", style: "bg-amber-500 text-white shadow-amber-500/30" },
  },
  "deep-cleaning": {
    th: { label: "✨ ขจัดคราบฝังลึก", style: "bg-sky-600 text-white shadow-sky-600/30" },
    en: { label: "✨ Deep Sanitized", style: "bg-sky-600 text-white shadow-sky-600/30" },
    zh: { label: "✨ 强力去污", style: "bg-sky-600 text-white shadow-sky-600/30" },
    my: { label: "✨ အထူးသန့်ရှင်းရေး", style: "bg-sky-600 text-white shadow-sky-600/30" },
    ru: { label: "✨ Глубокая очистка", style: "bg-sky-600 text-white shadow-sky-600/30" },
  },
  "move-in-move-out": {
    th: { label: "🔑 การันตีเงินมัดจำคืน", style: "bg-emerald-600 text-white shadow-emerald-600/30" },
    en: { label: "🔑 Deposit Refund Guarantee", style: "bg-emerald-600 text-white shadow-emerald-600/30" },
    zh: { label: "🔑 押金全退保障", style: "bg-emerald-600 text-white shadow-emerald-600/30" },
    my: { label: "🔑 စပေါ်ငွေ အာမခံ", style: "bg-emerald-600 text-white shadow-emerald-600/30" },
    ru: { label: "🔑 Возврат залога 100%", style: "bg-emerald-600 text-white shadow-emerald-600/30" },
  },
  "after-renovation": {
    th: { label: "🛠️ เก็บงานละเอียด", style: "bg-indigo-600 text-white shadow-indigo-600/30" },
    en: { label: "🛠️ Post-Renovation Pro", style: "bg-indigo-600 text-white shadow-indigo-600/30" },
    zh: { label: "🛠️ 装修后精保洁", style: "bg-indigo-600 text-white shadow-indigo-600/30" },
    my: { label: "🛠️ ပြုပြင်ပြီးသန့်ရှင်းရေး", style: "bg-indigo-600 text-white shadow-indigo-600/30" },
    ru: { label: "🛠️ После ремонта", style: "bg-indigo-600 text-white shadow-indigo-600/30" },
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const base = `/${locale}`;
  const whyIcons = [IconStar, IconShield, IconLeaf];
  const heroPoints = [dict.aboutTeaser.points[1], dict.aboutTeaser.points[3], dict.aboutTeaser.points[4]];

  const faqs = FAQS.map((f) => f[locale]);

  return (
    <div className="overflow-hidden">
      <JsonLd nodes={[faqSchema(faqs)]} />
      {/* HERO */}
      <Parallax className="relative bg-brand text-white">
        <div aria-hidden className="depth-back absolute -inset-4 bg-grid [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
        <Bubbles3D className="depth-mid absolute inset-0" count={14} />
        <div aria-hidden className="absolute -top-48 -left-40 w-[40rem] h-[40rem] rounded-full bg-white/10 blur-3xl" />
        <div className="relative container-x pt-14 pb-28 md:pt-20 md:pb-36 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {dict.hero.badge}
            </span>
            <h1 className="mt-6 text-[2.5rem] leading-[1.1] md:text-6xl md:leading-[1.05] font-bold tracking-tight [perspective:900px]">
              <SplitWords text={dict.hero.titleA} delay={150} />
              <span className="block mt-4 text-2xl md:text-3xl font-semibold tracking-normal text-sky-100">
                <SplitWords text={dict.hero.titleB} delay={450} />
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/85 leading-relaxed max-w-xl">{dict.hero.subtitle}</p>
            {/* CTA ACTION CONTAINER - BALANCED 2-TIER DESIGN */}
            <div className="mt-8 max-w-lg space-y-3">
              {/* PRIMARY LINE BUTTON */}
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden w-full h-14 bg-gradient-to-r from-[#06C755] to-[#05b34c] hover:from-[#05b34c] hover:to-[#049b42] text-white rounded-2xl shadow-xl shadow-[#06C755]/25 hover:shadow-[#06C755]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 font-extrabold flex items-center justify-center gap-3 text-base sm:text-lg border border-white/20"
              >
                <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <IconChat className="w-5 h-5 text-white" />
                </span>
                <span>{locale === "th" ? "ส่งรูปประเมินราคาฟรีทาง LINE" : dict.hero.ctaLine}</span>
              </a>

              {/* SECONDARY ROW (PERFECTLY EQUAL DUAL BUTTONS) */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 font-bold text-sm"
                >
                  <IconWhatsApp className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={PHONE_LINK}
                  className="h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 font-bold text-sm"
                >
                  <IconPhone className="w-4 h-4" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>

              {/* RESPONSE GUARANTEE & TRUST MICRO-COPY */}
              <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-sky-100/90 font-medium">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {locale === "th" ? "แอดมินตอบไวใน 5-10 นาที" : "Fast reply within 5-10 mins"}
                </span>
                <span className="text-white/80 hidden sm:inline">
                  {locale === "th" ? "• ประเมินราคาฟรี ไม่มีข้อผูกมัด" : "• Free instant estimate"}
                </span>
                <Link
                  href={`${base}/booking`}
                  className="text-sky-200 hover:text-white underline underline-offset-4 ml-auto inline-flex items-center gap-1 font-semibold"
                >
                  <IconCalendar className="w-3.5 h-3.5" />
                  <span>{dict.booking.cta}</span>
                </Link>
              </div>
            </div>
            <ul className="mt-10 grid sm:grid-cols-3 gap-3 text-sm text-white/90">
              {heroPoints.map((p) => (
                <li key={p} className="flex gap-2 items-start">
                  <IconCheckCircle className="w-5 h-5 text-white shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="depth-mid"><div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="relative rounded-3xl overflow-hidden ring-4 ring-white/25 shadow-2xl shadow-sky-900/30">
              <Image
                src="/hero-cleaning.jpg"
                alt="Smile Clean Thailand professional cleaning"
                width={570}
                height={532}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="w-full aspect-[1/1] object-cover"
                priority
              />
            </div>
            <div className="absolute -left-4 sm:-left-8 top-8 bg-white text-ink rounded-2xl shadow-2xl shadow-black/25 px-5 py-4">
              <Stars className="w-3.5 h-3.5" />
              <div className="mt-1.5 text-2xl font-bold">500+</div>
              <div className="text-xs text-slate-500">{dict.hero.happyCustomers}</div>
            </div>
            <a
              href="#guarantee"
              className="absolute -right-2 sm:-right-6 bottom-8 flex items-center gap-3 bg-white text-ink rounded-2xl shadow-2xl shadow-black/25 pl-3 pr-5 py-3 hover:ring-2 hover:ring-sky-300 transition"
            >
              <span className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                <IconShield className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-lg font-bold leading-tight">100%</span>
                <span className="block text-xs text-slate-500">{dict.hero.guarantee}</span>
              </span>
            </a>
          </div></div>
        </div>
      </Parallax>

      {/* 1. STATS */}
      <section className="relative container-x -mt-14 md:-mt-16 z-10">
        <div className="rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_20px_50px_rgba(2,132,199,0.12)] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {dict.stats.map((s) => (
            <div
              key={s.label}
              className="p-6 md:py-8 md:px-6 text-center hover:bg-sky-50/40 transition-colors duration-200 group"
            >
              <div className="text-3xl md:text-4xl font-black tracking-tight text-ink group-hover:text-sky-600 transition-colors">
                {s.value}
              </div>
              <div className="mt-1.5 text-xs md:text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TRUST & SAFETY BADGES */}
      <TrustStrip lang={locale} />

      {/* SERVICES */}
      <section className="section bg-slate-50 border-y border-slate-100">
        <div className="container-x">
          <SectionHeader
            eyebrow={dict.servicesSection.eyebrow}
            title={dict.servicesSection.title}
            subtitle={dict.servicesSection.subtitle}
            action={
              <Link href={`${base}/services`} className="btn btn-outline">
                {dict.common.viewAll} <IconArrow className="w-4 h-4" />
              </Link>
            }
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => {
              const t = s[locale];
              const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.house;
              const badge = SERVICE_BADGES[s.slug]?.[locale];
              return (
                <Reveal key={s.slug} delay={(i % 4) * 70}>
                  <Tilt>
                  <Link href={`${base}/services/${s.slug}`} className="group card card-hover flex flex-col overflow-hidden h-full rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 bg-white">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sky-50">
                      {badge && (
                        <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-md tracking-tight ${badge.style}`}>
                          {badge.label}
                        </span>
                      )}
                      <ServiceImage
                        service={s}
                        alt={t.title}
                        sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 ring-2 ring-sky-100/60 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                            <Icon className="w-4 h-4" />
                          </span>
                          <div className="font-bold text-ink leading-snug group-hover:text-sky-700 transition-colors">{t.title}</div>
                        </div>
                        <p className="text-sm text-slate-600 mt-3 leading-relaxed">{t.short}</p>
                      </div>
                      <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600 group-hover:translate-x-1 transition-transform">
                        <span>{dict.common.readMore}</span>
                        <IconArrow className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 3 EASY STEPS TO A CLEAN HOME */}
      <HowItWorks dict={dict} />

      {/* 6. REAL BEFORE & AFTER RESULTS */}
      <BeforeAfterSection dict={dict} lang={locale} />

      {/* 7. 5-STAR GOOGLE REVIEWS (SOCIAL PROOF) */}
      <HomeReviews lang={locale} />

      {/* WHY US */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeader eyebrow={dict.nav.about} title={dict.whyUs.title} subtitle={dict.aboutTeaser.body} />
            <Reveal>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                {dict.aboutTeaser.points.map((p) => (
                  <li key={p} className="flex gap-2.5 items-start text-ink">
                    <IconCheckCircle className="w-5 h-5 text-sky-600 shrink-0" />
                    <span className="text-[0.9375rem]">{p}</span>
                  </li>
                ))}
              </ul>
              <Link href={`${base}/about`} className="btn btn-outline mt-9">
                {dict.common.readMore} <IconArrow className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-4">
            {dict.whyUs.items.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <Reveal key={w.title} delay={i * 90}>
                  <div className="card card-hover p-6 flex gap-5">
                    <span className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-sky-600/25">
                      <Icon className="w-6 h-6" />
                    </span>
                    <div>
                      <div className="font-bold text-lg text-ink">{w.title}</div>
                      <p className="text-slate-600 mt-1.5 leading-relaxed">{w.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>



      {/* FAQ SECTION */}
      <HomeFaq lang={locale} />

      <GuaranteeSection dict={dict} />

      <AreasSection dict={dict} className="bg-slate-50 border-b border-slate-100" />

      {/* BLOG */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow={dict.nav.blog}
            title={dict.blogSection.homeTitle}
            action={
              <Link href={`${base}/blog`} className="btn btn-outline">
                {dict.common.viewAll} <IconArrow className="w-4 h-4" />
              </Link>
            }
          />
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {POSTS.map((p, i) => {
              const t = p[locale];
              return (
                <Reveal key={p.slug} delay={i * 90}>
                  <Link href={`${base}/blog/${p.slug}`} className="group card card-hover flex flex-col overflow-hidden h-full">
                    <div className="relative aspect-[16/9] overflow-hidden bg-sky-50">
                      <Image src={p.image} alt="" fill sizes="(min-width: 768px) 370px, 100vw" unoptimized={p.image.endsWith(".svg")} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <time dateTime={p.date} className="text-xs font-medium text-slate-400">{p.date}</time>
                      <div className="font-bold text-lg text-ink mt-2 leading-snug">{t.title}</div>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed flex-1">{t.excerpt}</p>
                      <span className="link-arrow mt-5">
                        {dict.common.readMore} <IconArrow className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand lang={locale} />
    </div>
  );
}
