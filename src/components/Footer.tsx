import Image from "next/image";
import Link from "next/link";
import {
  ADDRESS_EN,
  ADDRESS_TH,
  EMAIL,
  LINE_URL,
  PHONE_LINK,
  type Locale,
} from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { SERVICES } from "@/data";
import { IconChat, IconClock, IconMail, IconPhone, IconPin } from "./icons";

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dict;
}) {
  const base = `/${lang}`;
  return (
    <footer className="bg-gradient-to-b from-sky-950 to-slate-950 text-sky-100/80 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Smile Clean Thailand logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-2xl object-cover shadow-lg"
            />
            <div className="leading-tight">
              <div className="font-extrabold text-white text-lg">Smile Clean</div>
              <div className="text-[11px] font-bold tracking-[0.2em] text-sky-400">THAILAND</div>
            </div>
          </div>
          <p className="text-sm mt-4 leading-relaxed text-sky-100/70">{dict.footer.tagline}</p>
          <a
            href={LINE_URL}
            target="_blank"
            className="btn-primary inline-flex items-center gap-2 mt-5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold rounded-full px-6 py-2.5 shadow-lg shadow-sky-500/25"
          >
            <IconChat className="w-4 h-4" />
            LINE: @smileclean
          </a>
        </div>
        <div>
          <div className="font-bold text-white mb-4">{dict.footer.servicesTitle}</div>
          <ul className="grid gap-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`${base}/services/${s.slug}`}
                  className="hover:text-white hover:pl-1 transition-all duration-200"
                >
                  {lang === "th" ? s.th.title : s.en.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-bold text-white mb-4">{dict.footer.contactTitle}</div>
          <ul className="text-sm grid gap-3">
            <li className="flex gap-2"><IconPin className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />{lang === "th" ? ADDRESS_TH : ADDRESS_EN}</li>
            <li>
              <a href={PHONE_LINK} className="inline-flex items-center gap-2 hover:text-white font-semibold transition">
                <IconPhone className="w-4 h-4 text-sky-400" /> 063-616-2829
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-white transition">
                <IconMail className="w-4 h-4 text-sky-400" /> {EMAIL}
              </a>
            </li>
            <li className="flex gap-2 items-center"><IconClock className="w-4 h-4 text-sky-400" /> 24 Hours</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-sky-100/50 flex flex-wrap gap-2 justify-between">
          <span>© 2025 {dict.footer.rights}</span>
          <span>smilecleanthailand.com</span>
        </div>
      </div>
    </footer>
  );
}
