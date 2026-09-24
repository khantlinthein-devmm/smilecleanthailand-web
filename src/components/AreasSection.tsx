import type { Dict } from "@/dictionaries";
import Reveal from "./Reveal";
import { IconPin } from "./icons";

export default function AreasSection({ dict }: { dict: Dict }) {
  const a = dict.areas;
  return (
    <section className="mx-auto max-w-6xl px-4 mt-20">
      <Reveal>
        <div className="rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50/60 p-8 md:p-12">
          <div className="text-xs font-bold tracking-widest text-sky-600 uppercase">{a.eyebrow}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">{a.title}</h2>
          <p className="text-slate-600 mt-2">{a.subtitle}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {a.list.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1.5 bg-white border border-sky-100 rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <IconPin className="w-3.5 h-3.5 text-sky-500" />
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-slate-500">{a.note}</p>
        </div>
      </Reveal>
    </section>
  );
}
