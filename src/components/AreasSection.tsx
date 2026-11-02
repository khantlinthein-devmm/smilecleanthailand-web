import type { Dict } from "@/dictionaries";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconPin } from "./icons";

export default function AreasSection({ dict, className = "" }: { dict: Dict; className?: string }) {
  const a = dict.areas;
  return (
    <section className={`section ${className}`}>
      <div className="container-x grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        <div>
          <SectionHeader eyebrow={a.eyebrow} title={a.title} subtitle={a.subtitle} />
          <p className="mt-6 text-sm text-slate-500">{a.note}</p>
        </div>
        <Reveal>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {a.list.map((area) => (
              <li
                key={area}
                className="group flex items-center gap-2.5 card px-4 py-3.5 text-sm font-semibold text-ink border border-slate-200/90 shadow-xs hover:border-sky-300 hover:bg-sky-50/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <IconPin className="w-3.5 h-3.5" />
                </span>
                <span className="truncate">{area}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
