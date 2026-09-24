import Image from "next/image";
import Link from "next/link";
import { LINE_URL, PHONE_DISPLAY, PHONE_LINK, type Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { IconChat, IconClock, IconPhone, IconPin } from "./icons";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLinks from "./NavLinks";

export default function Header({ lang, dict }: { lang: Locale; dict: Dict }) {
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80">
      <div className="bg-ink text-sky-100/80 text-xs">
        <div className="container-x py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 min-w-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 truncate">
              <IconPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{dict.common.address}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <IconClock className="w-3.5 h-3.5 text-sky-400" />
              {dict.common.hours}
            </span>
          </div>
          <a href={PHONE_LINK} className="font-semibold text-white whitespace-nowrap inline-flex items-center gap-1.5 hover:text-sky-300 transition">
            <IconPhone className="w-3.5 h-3.5" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
      <div className="container-x h-[4.5rem] flex items-center justify-between gap-4">
        <Link href={base} className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="Smile Clean Thailand logo"
            width={48}
            height={48}
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-200"
            priority
          />
          <span className="leading-none">
            <span className="block font-bold text-[1.05rem] text-ink tracking-tight">Smile Clean</span>
            <span className="block mt-1 text-[10px] font-bold tracking-[0.24em] text-sky-600">THAILAND</span>
          </span>
        </Link>
        <NavLinks links={links} base={base} variant="desktop" />
        <div className="flex items-center gap-2.5">
          <LanguageSwitcher lang={lang} label={dict.nav.language} />
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm hidden sm:inline-flex">
            <IconChat className="w-4 h-4" />
            {dict.nav.freeEstimate}
          </a>
        </div>
      </div>
      <NavLinks links={links} base={base} variant="mobile" />
    </header>
  );
}
