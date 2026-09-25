import SplitWords from "@/components/SplitWords";
import Parallax from "@/components/Parallax";
import Tilt from "@/components/Tilt";
import Bubbles3D from "@/components/Bubbles3D";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { LINE_URL, PHONE_DISPLAY, PHONE_LINK, pageMeta, toLocale } from "@/lib/site";
import { SERVICES, POSTS } from "@/data";
import CtaBand from "@/components/CtaBand";
import HowItWorks from "@/components/HowItWorks";
import AreasSection from "@/components/AreasSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ServiceImage from "@/components/ServiceImage";
import {
  IconArrow,
  IconCalendar,
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

function Stars({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className="flex text-amber-400 gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} className={className} />
      ))}
    </span>
  );
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
  const heroPoints = [dict.aboutTeaser.points[1], dict.aboutTeaser.points[3], dict.aboutTeaser.points[4]];

  return (
    <div className="overflow-hidden">
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
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`${base}/booking`} className="btn btn-white btn-lg">
                <IconCalendar className="w-5 h-5" />
                {dict.booking.cta}
              </Link>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg">
                <IconChat className="w-5 h-5" />
                {dict.hero.ctaLine}
              </a>
              <a href={PHONE_LINK} className="btn btn-ghost btn-lg">
                <IconPhone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
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

      {/* STATS */}
      <section className="relative container-x -mt-16 md:-mt-20 z-10">
        <div className="card overflow-hidden shadow-xl shadow-slate-900/5 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100">
          {dict.stats.map((s) => (
            <div key={s.label} className="bg-white p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-bold text-ink tracking-tight">{s.value}</div>
              <div className="mt-1.5 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks dict={dict} />

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
              return (
                <Reveal key={s.slug} delay={(i % 4) * 70}>
                  <Tilt>
                  <Link href={`${base}/services/${s.slug}`} className="group card card-hover flex flex-col overflow-hidden h-full">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sky-50">
                      <ServiceImage
                        service={s}
                        alt={t.title}
                        sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </span>
                        <div className="font-bold text-ink leading-snug">{t.title}</div>
                      </div>
                      <p className="text-sm text-slate-600 mt-3 leading-relaxed flex-1">{t.short}</p>
                      <span className="link-arrow mt-5">
                        {dict.common.readMore} <IconArrow className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <BeforeAfterSection dict={dict} lang={locale} />

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
                      <Image src={p.image} alt="" fill sizes="(min-width: 768px) 370px, 100vw" unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
