import Link from "next/link";
import { LINE_URL, PHONE_LINK, WHATSAPP_NUMBER, type Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { IconCalendar, IconChat, IconPhone, IconWhatsApp } from "./icons";

/** Fixed LINE / WhatsApp / Book / Call bar shown on phones only. */
export default function MobileCtaBar({ dict, lang }: { dict: Dict; lang: Locale }) {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 gap-1.5 p-2 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_24px_rgba(2,132,199,0.12)]">
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.mobileBar.line}
        className="btn btn-line btn-sm py-2 px-0 flex flex-col items-center justify-center gap-0.5 text-[10px]"
      >
        <IconChat className="w-4 h-4" />
        <span>LINE</span>
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="btn btn-sm py-2 px-0 bg-[#25d366] hover:bg-[#20bd5a] text-white border-0 flex flex-col items-center justify-center gap-0.5 text-[10px]"
      >
        <IconWhatsApp className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
      <Link href={`/${lang}/booking`} className="btn btn-primary btn-sm py-2 px-0 flex flex-col items-center justify-center gap-0.5 text-[10px]">
        <IconCalendar className="w-4 h-4" />
        <span>{dict.booking.nav}</span>
      </Link>
      <a href={PHONE_LINK} aria-label={dict.mobileBar.call} className="btn btn-outline btn-sm py-2 px-0 flex flex-col items-center justify-center gap-0.5 text-[10px]">
        <IconPhone className="w-4 h-4" />
        <span>{dict.mobileBar.call}</span>
      </a>
    </div>
  );
}
