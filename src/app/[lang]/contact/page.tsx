import { ADDRESS_EN, ADDRESS_TH, EMAIL, LINE_URL, PHONE_LINK, type Locale } from "@/lib/site";
import Reveal from "@/components/Reveal";
import { IconChat, IconClock, IconMail, IconPhone, IconPin } from "@/components/icons";

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = lang === "th" ? "th" : "en";
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{locale === "th" ? "ติดต่อเรา" : "Contact Us"}</h1>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Reveal>
          <div className="border border-slate-200 rounded-3xl p-7 bg-white h-full">
            <div className="font-bold text-lg">{locale === "th" ? "ข้อมูลติดต่อ" : "Contact Information"}</div>
            <ul className="mt-4 grid gap-3 text-slate-700">
              <li className="flex gap-2.5"><IconPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />{locale === "th" ? ADDRESS_TH : ADDRESS_EN}</li>
              <li><a href={PHONE_LINK} className="inline-flex items-center gap-2.5 font-bold hover:text-sky-700 transition"><IconPhone className="w-5 h-5 text-sky-500" />063-616-2829</a></li>
              <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 hover:text-sky-700 transition"><IconMail className="w-5 h-5 text-sky-500" />{EMAIL}</a></li>
              <li className="flex gap-2.5 items-center"><IconClock className="w-5 h-5 text-sky-500" />24 Hours</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={LINE_URL} target="_blank" className="btn-primary inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full px-6 py-3 shadow-lg shadow-sky-500/25"><IconChat className="w-4 h-4" /> LINE</a>
              <a href={PHONE_LINK} className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-full px-6 py-3 transition-all"><IconPhone className="w-4 h-4" /> Call</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <form className="border border-slate-200 rounded-3xl p-7 bg-white grid gap-3" action={LINE_URL}>
            <div className="font-bold text-lg">{locale === "th" ? "ขอใบเสนอราคา" : "Request a quote"}</div>
            <input required placeholder={locale === "th" ? "ชื่อ" : "Name"} className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition" />
            <input required placeholder="Phone / LINE" className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition" />
            <select className="border border-slate-200 rounded-2xl px-4 py-3 bg-white">
              <option>House Cleaning</option>
              <option>Condo Cleaning</option>
              <option>Deep Cleaning</option>
              <option>Move In / Out</option>
              <option>Office Cleaning</option>
            </select>
            <textarea placeholder={locale === "th" ? "รายละเอียด" : "Details"} rows={4} className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition" />
            <button className="btn-primary bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full px-6 py-3.5 shadow-lg shadow-sky-500/25">
              {locale === "th" ? "ส่งผ่าน LINE" : "Send via LINE"}
            </button>
            <p className="text-xs text-slate-500">{locale === "th" ? "กดส่งแล้วจะเปิด LINE เพื่อแชทกับเรา" : "Submit opens LINE chat with us."}</p>
          </form>
        </Reveal>
      </div>
      <div className="mt-6 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
        <iframe title="map" src="https://www.google.com/maps?q=Onnut+10+Suan+Luang+Bangkok&output=embed" className="w-full h-80" loading="lazy" />
      </div>
    </div>
  );
}
