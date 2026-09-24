import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { SERVICES } from "@/data";
import { EMAIL, LINE_ID, LINE_URL, PHONE_DISPLAY, PHONE_LINK, pageMeta, toLocale } from "@/lib/site";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import LineQr from "@/components/LineQr";
import { IconChat, IconClock, IconMail, IconPhone, IconPin } from "@/components/icons";

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
            <QuoteForm dict={dict} services={SERVICES.map((s) => s[locale].title)} privacyHref={`/${locale}/privacy`} />
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
