import { LINE_URL, PHONE_DISPLAY, PHONE_LINK, type Locale } from "@/lib/site";
import { getDictionary } from "@/dictionaries";
import { IconArrow, IconChat, IconPhone } from "./icons";
import Reveal from "./Reveal";

export default async function CtaBand({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  return (
    <section className="mx-auto max-w-6xl px-4 mt-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky-500 via-sky-500 to-cyan-500 text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between shadow-2xl shadow-sky-500/25">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/15 rounded-full blur-2xl animate-float-slow" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-cyan-300/25 rounded-full blur-2xl animate-float-slower" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{dict.ctaBand.title}</h2>
            <p className="mt-2 text-sky-50/90">{dict.ctaBand.body}</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 bg-white text-sky-700 font-bold rounded-full px-7 py-3.5 shadow-lg"
            >
              <IconChat className="w-4 h-4" />
              {dict.ctaBand.button}
              <IconArrow className="w-4 h-4" />
            </a>
            <a
              href={PHONE_LINK}
              className="inline-flex items-center gap-2 border border-white/50 hover:bg-white/10 font-bold rounded-full px-7 py-3.5 transition-colors duration-200"
            >
              <IconPhone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
