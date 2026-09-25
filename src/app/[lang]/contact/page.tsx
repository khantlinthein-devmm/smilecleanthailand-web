import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { EMAIL, LINE_ID, LINE_URL, PHONE_DISPLAY, PHONE_LINK, pageMeta, toLocale } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import LineQr from "@/components/LineQr";
import { IconArrow, IconCalendar, IconChat, IconCheckCircle, IconClock, IconMail, IconPhone, IconPin } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/contact", dict.contactPage.title, dict.meta.contactDescription);
}

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const rows = [
    { icon: IconPhone, label: PHONE_DISPLAY, href: PHONE_LINK, strong: true },
    { icon: IconChat, label: `LINE: ${LINE_ID}`, href: LINE_URL, strong: true, external: true },
    { icon: IconMail, label: EMAIL, href: `mailto:${EMAIL}` },
    { icon: IconClock, label: dict.common.hours },
    { icon: IconPin, label: dict.common.address },
  ];
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[dict.nav.contact, "/contact"]])]} />
      <PageHero eyebrow={dict.nav.contact} title={dict.contactPage.title} subtitle={dict.meta.contactDescription} />
      <section className="section bg-slate-50">
        <div className="container-x grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-start">
          <Reveal>
            <div className="card p-8">
              <div className="font-bold text-xl text-ink">{dict.contactPage.info}</div>
              <ul className="mt-6 grid gap-4">
                {rows.map(({ icon: Icon, label, href, strong, external }) => {
                  const content = (
                    <>
                      <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className={strong ? "font-semibold text-ink" : "text-slate-600"}>{label}</span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex items-center gap-4 hover:text-sky-700 transition"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 grid sm:grid-cols-2 gap-2.5">
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                  <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
                </a>
                <a href={PHONE_LINK} className="btn btn-outline">
                  <IconPhone className="w-4 h-4" /> {dict.common.call}
                </a>
              </div>
              <LineQr dict={dict} className="hidden md:flex mt-6 bg-slate-50" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card p-8 md:p-10">
              <span className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/25">
                <IconCalendar className="w-7 h-7" />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-ink">{dict.booking.title}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{dict.booking.subtitle}</p>
              <ol className="mt-6 grid gap-2.5">
                {dict.booking.steps.map((st, i) => (
                  <li key={st} className="flex items-center gap-3 text-ink font-medium">
                    <span className="w-7 h-7 rounded-full bg-sky-50 text-sky-700 text-sm font-bold flex items-center justify-center">{i + 1}</span>
                    {st}
                  </li>
                ))}
              </ol>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="font-semibold text-ink">{dict.contactPerks.title}</div>
                <ul className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
                  {dict.contactPerks.items.map((it) => (
                    <li key={it} className="flex gap-2 items-start">
                      <IconCheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={`/${locale}/booking`} className="btn btn-primary btn-lg mt-8">
                {dict.booking.cta} <IconArrow className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="container-x mt-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200">
            <iframe title="map" src="https://www.google.com/maps?q=Onnut+10+Suan+Luang+Bangkok&output=embed" className="w-full h-80 block" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
