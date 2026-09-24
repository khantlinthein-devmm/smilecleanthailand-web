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
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{dict.contactPage.title}</h1>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
        <Reveal>
          <div className="border border-slate-200 rounded-3xl p-7 bg-white h-full">
            <div className="font-bold text-lg">{dict.contactPage.info}</div>
            <ul className="mt-4 grid gap-3 text-slate-700">
              <li className="flex gap-2.5"><IconPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />{dict.common.address}</li>
              <li><a href={PHONE_LINK} className="inline-flex items-center gap-2.5 font-bold hover:text-sky-700 transition"><IconPhone className="w-5 h-5 text-sky-500" />{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 hover:text-sky-700 transition"><IconMail className="w-5 h-5 text-sky-500" />{EMAIL}</a></li>
              <li><a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 font-bold text-[#06C755] hover:opacity-80 transition"><IconChat className="w-5 h-5" />LINE: {LINE_ID}</a></li>
              <li className="flex gap-2.5 items-center"><IconClock className="w-5 h-5 text-sky-500" />{dict.common.hours}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full px-6 py-3 shadow-lg shadow-sky-500/25"><IconChat className="w-4 h-4" /> {dict.common.line}</a>
              <a href={PHONE_LINK} className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-full px-6 py-3 transition-all"><IconPhone className="w-4 h-4" /> {dict.common.call}</a>
            </div>
            <LineQr dict={dict} className="hidden md:flex mt-6" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <QuoteForm dict={dict} services={SERVICES.map((s) => s[locale].title)} />
        </Reveal>
      </div>
      <div className="mt-6 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
        <iframe title="map" src="https://www.google.com/maps?q=Onnut+10+Suan+Luang+Bangkok&output=embed" className="w-full h-80" loading="lazy" />
      </div>
    </div>
  );
}
