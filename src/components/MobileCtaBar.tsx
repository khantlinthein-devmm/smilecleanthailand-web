import Link from "next/link";
import { LINE_URL, PHONE_LINK, type Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { IconCalendar, IconChat, IconPhone } from "./icons";

/** Fixed LINE / Call bar shown on phones only. */
export default function MobileCtaBar({ dict, lang }: { dict: Dict; lang: Locale }) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 grid grid-cols-[3.25rem_1fr_3.25rem] gap-2 p-2 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_24px_rgba(11,27,52,0.08)]">
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.mobileBar.line}
        className="btn btn-line btn-sm py-3 px-0"
      >
        <IconChat className="w-5 h-5" />
      </a>
      <Link href={`/${lang}/booking`} className="btn btn-primary btn-sm py-3">
        <IconCalendar className="w-4 h-4" />
        {dict.booking.nav}
      </Link>
      <a href={PHONE_LINK} aria-label={dict.mobileBar.call} className="btn btn-outline btn-sm py-3 px-0">
        <IconPhone className="w-5 h-5" />
      </a>
    </div>
  );
}
