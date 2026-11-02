import Link from "next/link";
import { LINE_URL, PHONE_LINK, WHATSAPP_NUMBER, type Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { IconCalendar, IconChat, IconPhone, IconWhatsApp } from "./icons";

/** Smart adaptive LINE / WhatsApp / Call sticky bar shown on phones only. */
export default function MobileCtaBar({ dict, lang }: { dict: Dict; lang: Locale }) {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  const isThai = lang === "th";

  return (
    <nav
      aria-label="Quick contact"
      className="md:hidden fixed inset-x-0 bottom-0 z-50 px-3 py-2 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_24px_rgba(2,132,199,0.14)] flex items-center gap-2"
    >
      {isThai ? (
        <>
          {/* Primary Action for Thai customers: LINE */}
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl font-bold text-xs shadow-md shadow-[#06C755]/20 active:scale-[0.98] transition-transform"
          >
            <IconChat className="w-4 h-4 shrink-0" />
            <span className="truncate">แชท LINE ประเมินราคาฟรี</span>
          </a>

          {/* Quick Call */}
          <a
            href={PHONE_LINK}
            aria-label="โทรด่วน"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shrink-0 active:scale-[0.98] transition-transform"
          >
            <IconPhone className="w-3.5 h-3.5" />
            <span>โทรด่วน</span>
          </a>

          {/* WhatsApp icon */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shrink-0 shadow-sm active:scale-[0.98] transition-transform"
          >
            <IconWhatsApp className="w-5 h-5" />
          </a>
        </>
      ) : (
        <>
          {/* Primary Action for Expat/International customers: WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-xs shadow-md shadow-[#25D366]/20 active:scale-[0.98] transition-transform"
          >
            <IconWhatsApp className="w-4 h-4 shrink-0" />
            <span className="truncate">WhatsApp Instant Quote</span>
          </a>

          {/* Quick Call */}
          <a
            href={PHONE_LINK}
            aria-label={dict.mobileBar.call}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shrink-0 active:scale-[0.98] transition-transform"
          >
            <IconPhone className="w-3.5 h-3.5" />
            <span>{dict.mobileBar.call}</span>
          </a>

          {/* LINE icon */}
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.mobileBar.line}
            className="w-10 h-10 flex items-center justify-center bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl shrink-0 shadow-sm active:scale-[0.98] transition-transform"
          >
            <IconChat className="w-5 h-5" />
          </a>
        </>
      )}
    </nav>
  );
}
