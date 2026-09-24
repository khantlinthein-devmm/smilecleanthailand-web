import { LINE_URL, PHONE_LINK } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import { IconChat, IconPhone } from "./icons";

/** Fixed LINE / Call bar shown on phones only. */
export default function MobileCtaBar({ dict }: { dict: Dict }) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 p-2 bg-white/95 backdrop-blur-xl border-t border-sky-100 shadow-[0_-8px_24px_rgba(14,165,233,0.12)]">
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white font-bold rounded-full py-3 text-sm"
      >
        <IconChat className="w-4 h-4" />
        {dict.mobileBar.line}
      </a>
      <a
        href={PHONE_LINK}
        className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white font-bold rounded-full py-3 text-sm"
      >
        <IconPhone className="w-4 h-4" />
        {dict.mobileBar.call}
      </a>
    </div>
  );
}
