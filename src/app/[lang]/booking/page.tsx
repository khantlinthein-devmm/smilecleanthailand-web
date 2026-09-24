import type { Metadata } from "next";
import { Suspense } from "react";
import { getDictionary } from "@/dictionaries";
import { SERVICES } from "@/data";
import { PHONE_DISPLAY, PHONE_LINK, pageMeta, toLocale } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import BookingWizard from "@/components/BookingWizard";
import LineQr from "@/components/LineQr";
import { IconCheckCircle, IconClock, IconPhone, IconShield } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return pageMeta(locale, "/booking", dict.booking.title, dict.booking.subtitle);
}

export default async function Booking({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const services = SERVICES.map((s) => ({ slug: s.slug, title: s[locale].title, short: s[locale].short, image: s.image }));
  const perks = [
    { icon: IconShield, text: dict.guarantee.subtitle },
    { icon: IconClock, text: dict.common.hours },
    { icon: IconCheckCircle, text: dict.aboutTeaser.points[4] },
    { icon: IconCheckCircle, text: dict.aboutTeaser.points[1] },
  ];
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[dict.booking.title, "/booking"]])]} />
      <PageHero eyebrow={dict.booking.eyebrow} title={dict.booking.title} subtitle={dict.booking.subtitle} />
      <section className="section bg-slate-50">
        <div className="container-x grid lg:grid-cols-[1fr_20rem] gap-6 items-start">
          <Suspense fallback={<div className="card h-[32rem] animate-pulse bg-white" />}>
            <BookingWizard
              dict={dict}
              services={services}
              privacyHref={`/${locale}/privacy`}
              termsHref={`/${locale}/terms`}
            />
          </Suspense>
          <aside className="grid gap-4 lg:sticky lg:top-36">
            <div className="card p-6">
              <ul className="grid gap-4">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 items-start text-sm text-ink">
                    <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="pt-1.5">{text}</span>
                  </li>
                ))}
              </ul>
              <a href={PHONE_LINK} className="btn btn-outline w-full mt-6">
                <IconPhone className="w-4 h-4" /> {PHONE_DISPLAY}
              </a>
            </div>
            <LineQr dict={dict} className="hidden lg:flex" />
          </aside>
        </div>
      </section>
    </>
  );
}
