// Detailed price tables for the Condo Cleaning and Weekly Cleaning service pages,
// plus the shared transportation-fee table (also used in the pricing section).
import type { Locale } from "@/lib/site";
import {
  CONDO_PROMO,
  CONDO_RATES,
  CONDO_SIZE,
  MAX_DISTANCE_KM,
  RATE_TEXT,
  TRANSPORT_FEES,
  WEEKLY_MIN_HOURS,
  WEEKLY_PAIR_DISCOUNT,
  WEEKLY_RATES,
  WEEKLY_SCOPE,
  condoPromoPrice,
  weeklyOneCleaner,
  weeklyTwoCleaners,
} from "@/lib/rates";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconCheckCircle, IconClock, IconTruck, SERVICE_ICONS } from "./icons";

const baht = (n: number) => `฿${n.toLocaleString("en-US")}`;
const fill = (s: string, n: number | string) => s.replace(/\{\w+\}/, String(n));

function PriceTable({ head, rows, minWidth = "" }: { head: string[]; rows: React.ReactNode[][]; minWidth?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className={`w-full text-sm text-left ${minWidth}`}>
        <thead>
          <tr className="bg-sky-700 text-white">
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-100 even:bg-sky-50/50">
              {r.map((c, j) => (
                <td key={j} className={`px-4 py-3 whitespace-nowrap ${j === 0 ? "font-semibold text-ink" : "text-slate-700"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Notes({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-6">
      <h3 className="font-bold text-ink">{title}</h3>
      <ul className="mt-4 grid gap-2.5 text-sm text-slate-600">
        {items.map((n) => (
          <li key={n} className="flex gap-2.5 items-start">
            <IconCheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubHeading({ icon, title, subtitle }: { icon?: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h3 className="flex items-center gap-2.5 text-xl font-bold text-ink">
        {icon && <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">{icon}</span>}
        {title}
      </h3>
      {subtitle && <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>}
    </div>
  );
}

/** Distance → fee table. `perVisit` adds the weekly-plan notes (once per visit, tolls). */
export function TransportFees({ locale, perVisit = false }: { locale: Locale; perVisit?: boolean }) {
  const t = RATE_TEXT[locale];
  return (
    <div>
      <SubHeading icon={<IconTruck className="w-4 h-4" />} title={t.transportTitle} subtitle={t.transportSubtitle} />
      <PriceTable
        head={[t.distance, t.transportFee]}
        rows={[
          ...TRANSPORT_FEES.map((f) => [
            f.range,
            f.fee === 0 ? <span key="fee" className="font-bold text-emerald-600">{t.free}</span> : <span key="fee" className="font-semibold">+{baht(f.fee)}</span>,
          ]),
          [`${MAX_DISTANCE_KM}+ km`, <span key="out" className="text-slate-500">{t.outsideArea}</span>],
        ]}
      />
      <ul className="mt-3 grid gap-1.5 text-xs text-slate-500">
        {[...t.transportNotes, ...(perVisit ? t.transportPerVisit : [])].map((n) => (
          <li key={n}>• {n}</li>
        ))}
      </ul>
    </div>
  );
}

export function CondoRates({ locale }: { locale: Locale }) {
  const t = RATE_TEXT[locale];
  const pct = `-${Math.round(CONDO_PROMO * 100)}%`;
  return (
    <section id="rates" className="section bg-slate-50 border-y border-slate-100">
      <div className="container-x">
        <SectionHeader eyebrow={t.priceList} title={t.condoTitle} subtitle={t.condoSubtitle} />
        <Reveal>
          <div className="mt-10">
            <PriceTable
              minWidth="min-w-[36rem]"
              head={[t.service, t.size, t.pricePerVisit, t.standardHours]}
              rows={CONDO_RATES.map((r) => [
                r.name[locale],
                `${CONDO_SIZE} ${t.sqm}`,
                <span key="p" className="inline-flex items-baseline gap-2">
                  <span className="text-lg font-black text-red-600">{baht(condoPromoPrice(r.price))}</span>
                  <span className="text-xs text-slate-400 line-through">{baht(r.price)}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-600 border border-red-200">{pct}</span>
                </span>,
                <span key="h" className="inline-flex items-center gap-1.5">
                  <IconClock className="w-3.5 h-3.5 text-slate-400" />
                  {fill(t.upToHours, r.hours)}
                </span>,
              ])}
            />
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <SubHeading icon={<IconClock className="w-4 h-4" />} title={t.overtimeTitle} subtitle={t.overtimeSubtitle} />
            <PriceTable
              head={[t.service, t.extraCharge]}
              rows={CONDO_RATES.map((r) => [r.name[locale], <span key="o" className="font-semibold">+{baht(r.overtime)} {t.perHour}</span>])}
            />
          </Reveal>
          <Reveal delay={80}>
            <TransportFees locale={locale} />
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-10">
            <Notes title={t.notesTitle} items={t.condoNotes} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WeeklyRates({ locale }: { locale: Locale }) {
  const t = RATE_TEXT[locale];
  const types = WEEKLY_RATES.map((r) => r.name[locale]);
  const examples = (price: (hourly: number) => number) =>
    TRANSPORT_FEES.map((f) => [f.range, ...WEEKLY_RATES.map((r) => <span key={r.id} className="font-semibold">{baht(price(r.hourly) + f.fee)}</span>)]);
  return (
    <section id="rates" className="section bg-slate-50 border-y border-slate-100">
      <div className="container-x">
        <SectionHeader eyebrow={t.priceList} title={t.weeklyTitle} subtitle={t.weeklySubtitle} />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <SubHeading title={t.oneCleaner} />
            <PriceTable
              minWidth="min-w-[30rem]"
              head={[t.type, t.ratePerHour, t.minimum, t.pricePerVisit]}
              rows={WEEKLY_RATES.map((r) => [
                r.name[locale],
                `${baht(r.hourly)} ${t.perHour}`,
                fill(t.hours, WEEKLY_MIN_HOURS),
                <span key="p" className="font-black text-sky-700">{baht(weeklyOneCleaner(r.hourly))}</span>,
              ])}
            />
          </Reveal>
          <Reveal delay={80}>
            <SubHeading title={t.twoCleaners} subtitle={fill(t.twoCleanersSubtitle, WEEKLY_PAIR_DISCOUNT)} />
            <PriceTable
              minWidth="min-w-[30rem]"
              head={[t.type, t.standardForTwo, t.specialPrice, t.youSave]}
              rows={WEEKLY_RATES.map((r) => [
                r.name[locale],
                <span key="n" className="text-slate-400 line-through">{baht(weeklyOneCleaner(r.hourly) * 2)}</span>,
                <span key="s" className="font-black text-red-600">{baht(weeklyTwoCleaners(r.hourly))}</span>,
                <span key="v" className="font-semibold text-emerald-600">{baht(WEEKLY_PAIR_DISCOUNT)}</span>,
              ])}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12">
            <SubHeading title={t.examplesTitle} subtitle={t.examplesSubtitle} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-2 text-sm font-semibold text-slate-600">{t.oneCleaner}</div>
                <PriceTable minWidth="min-w-[30rem]" head={[t.distance, ...types]} rows={examples(weeklyOneCleaner)} />
              </div>
              <div>
                <div className="mb-2 text-sm font-semibold text-slate-600">{t.twoCleaners}</div>
                <PriceTable minWidth="min-w-[30rem]" head={[t.distance, ...types]} rows={examples(weeklyTwoCleaners)} />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <TransportFees locale={locale} perVisit />
          </Reveal>
          <Reveal delay={80}>
            <Notes title={t.notesTitle} items={t.weeklyNotes} />
          </Reveal>
        </div>

        <div className="mt-12">
          <SubHeading title={t.scopeTitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WEEKLY_RATES.map((r, i) => {
              const Icon = SERVICE_ICONS[r.id === "condo" ? "condo" : r.id === "office" ? "office" : r.id === "gym" ? "deep" : "house"];
              return (
                <Reveal key={r.id} delay={(i % 4) * 60}>
                  <div className="card p-6 h-full">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="font-bold text-ink">{r.name[locale]}</div>
                    </div>
                    <ul className="mt-4 grid gap-2 text-sm text-slate-600">
                      {WEEKLY_SCOPE[r.id][locale].map((item) => (
                        <li key={item} className="flex gap-2 items-start">
                          <IconCheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {r.id === "restaurant" && <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.restaurantExtra}</p>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal>
          <div className="mt-12">
            <Notes title={t.benefitsTitle} items={t.benefits} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export const RATE_SLUGS = ["condo-cleaning", "weekly-cleaning"];

/** The detailed rate section for a service page, if that service has one. */
export default function RateDetails({ slug, locale }: { slug: string; locale: Locale }) {
  if (slug === "condo-cleaning") return <CondoRates locale={locale} />;
  if (slug === "weekly-cleaning") return <WeeklyRates locale={locale} />;
  return null;
}
