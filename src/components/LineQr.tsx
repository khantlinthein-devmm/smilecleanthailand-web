import Image from "next/image";
import { LINE_ID } from "@/lib/site";
import type { Dict } from "@/dictionaries";

/** LINE QR code for desktop visitors, who can't tap the LINE link on a computer. */
export default function LineQr({ dict, className = "" }: { dict: Dict; className?: string }) {
  return (
    <div className={`items-center gap-4 bg-white rounded-2xl border border-slate-200 p-3 pr-6 text-slate-600 ${className}`}>
      <Image src="/line-qr.svg" alt={`LINE ${LINE_ID}`} width={96} height={96} className="w-24 h-24 shrink-0" unoptimized />
      <div className="text-sm leading-snug">
        <div className="font-semibold text-ink max-w-[13rem]">{dict.lineExtra.scan}</div>
        <div className="mt-1.5 text-slate-500">{dict.lineExtra.addId}</div>
        <div className="font-extrabold text-[#06C755] text-base">{LINE_ID}</div>
      </div>
    </div>
  );
}
