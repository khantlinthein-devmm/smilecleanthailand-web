import Image from "next/image";
import Link from "next/link";
import { EMAIL, LINE_ID, LINE_URL, PHONE_DISPLAY, PHONE_LINK, type Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { SERVICES } from "@/data";
import { IconChat, IconClock, IconMail, IconPhone, IconPin } from "./icons";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const base = `/${lang}`;
  const company = [
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/testimonials`, label: dict.nav.testimonials },
    { href: `${base}/faq`, label: dict.nav.faqs },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/careers`, label: dict.careers.nav },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];
  const heading = "text-sm font-semibold text-white mb-5";
  const link = "text-sm text-sky-50/85 hover:text-white transition-colors";
  return (
    <footer className="bg-brand-deep text-sky-50/90">
      <div className="container-x py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href={base} className="inline-flex items-center gap-3">
            <Image src="/logo.png" alt="Smile Clean Thailand logo" width={48} height={48} className="h-11 w-11 rounded-xl object-cover" />
            <span className="leading-none">
              <span className="block font-bold text-white tracking-tight">Smile Clean</span>
              <span className="block mt-1 text-[10px] font-bold tracking-[0.24em] text-sky-200">THAILAND</span>
            </span>
          </Link>
          <p className="text-sm mt-5 leading-relaxed max-w-xs">{dict.footer.tagline}</p>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm mt-6">
            <IconChat className="w-4 h-4" />
            LINE: {LINE_ID}
          </a>
        </div>
        <div>
          <div className={heading}>{dict.footer.servicesTitle}</div>
          <ul className="grid gap-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`${base}/services/${s.slug}`} className={link}>
                  {s[lang].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={heading}>{dict.footer.companyTitle}</div>
          <ul className="grid gap-3">
            {company.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className={link}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={heading}>{dict.footer.contactTitle}</div>
          <ul className="grid gap-4 text-sm">
            <li className="flex gap-3">
              <IconPin className="w-4 h-4 mt-0.5 shrink-0 text-sky-200" />
              {dict.common.address}
            </li>
            <li>
              <a href={PHONE_LINK} className="inline-flex items-center gap-3 font-semibold text-white hover:text-sky-100 transition">
                <IconPhone className="w-4 h-4 text-sky-200" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 hover:text-white transition">
                <IconMail className="w-4 h-4 text-sky-200" /> {EMAIL}
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <IconClock className="w-4 h-4 text-sky-200" /> {dict.common.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="container-x py-6 text-xs flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} {dict.footer.rights}</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href={`${base}/privacy`} className="hover:text-white transition-colors">
              {dict.legal.privacy}
            </Link>
            <Link href={`${base}/terms`} className="hover:text-white transition-colors">
              {dict.legal.terms}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
