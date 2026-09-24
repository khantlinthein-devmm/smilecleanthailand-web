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
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {a.list.map((area) => (
              <li key={area} className="flex items-center gap-2.5 card px-4 py-3 text-sm font-medium text-ink">
                <IconPin className="w-4 h-4 text-sky-500 shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
