import Image from "next/image";
import Link from "next/link";
import { LINE_URL, PHONE_DISPLAY, PHONE_LINK, type Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { IconChat, IconPhone } from "./icons";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dict;
}) {
  const base = `/${lang}`;
  const links = [
    { href: base, label: dict.nav.home },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}/faq`, label: dict.nav.faqs },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/testimonials`, label: dict.nav.testimonials },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-sky-100/80">
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white text-xs sm:text-sm">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center justify-between gap-2">
          <span className="truncate opacity-95">
            {dict.common.address} • {dict.common.hours}
          </span>
          <a
            href={PHONE_LINK}
            className="font-semibold whitespace-nowrap inline-flex items-center gap-1.5 hover:opacity-90 transition"
          >
            <IconPhone className="w-3.5 h-3.5" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href={base} className="flex items-center gap-3 shrink-0 group">
          <Image
            src="/logo.png"
            alt="Smile Clean Thailand logo"
            width={64}
            height={64}
            className="h-14 w-14 rounded-2xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span className="leading-tight">
            <span className="block font-extrabold text-lg text-slate-900">Smile Clean</span>
            <span className="block text-[11px] font-bold tracking-[0.2em] text-sky-600">THAILAND</span>
          </span>
        </Link>
        <nav className="hidden xl:flex items-center gap-0.5 text-sm font-medium text-slate-600 whitespace-nowrap">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-full hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} label={dict.nav.language} />
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden sm:inline-flex items-center gap-2 whitespace-nowrap bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold rounded-full px-5 py-2.5 shadow-lg shadow-sky-500/25"
          >
            <IconChat className="w-4 h-4" />
            {dict.nav.freeEstimate}
          </a>
        </div>
      </div>
      <nav className="xl:hidden border-t border-slate-100 overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 text-sm whitespace-nowrap text-slate-600">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-1.5 rounded-full hover:bg-sky-50">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
