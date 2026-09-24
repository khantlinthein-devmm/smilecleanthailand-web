import { LINE_URL, PHONE_LINK } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { IconChat, IconPhone } from "./icons";

/** Fixed LINE / Call bar shown on phones only. */
export default function MobileCtaBar({ dict }: { dict: Dict }) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 p-2 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_24px_rgba(11,27,52,0.08)]">
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-line btn-sm py-3"
      >
        <IconChat className="w-4 h-4" />
        {dict.mobileBar.line}
      </a>
      <a
        href={PHONE_LINK}
        className="btn btn-primary btn-sm py-3"
      >
        <IconPhone className="w-4 h-4" />
        {dict.mobileBar.call}
      </a>
    </div>
  );
}
