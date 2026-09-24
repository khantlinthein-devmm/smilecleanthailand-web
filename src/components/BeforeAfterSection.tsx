import { BEFORE_AFTER } from "@/data";
import type { Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import BeforeAfter from "./BeforeAfter";
import Reveal from "./Reveal";

/** Renders nothing until photos are added to BEFORE_AFTER in src/data.ts. */
export default function BeforeAfterSection({ dict, lang }: { dict: Dict; lang: Locale }) {
  if (BEFORE_AFTER.length === 0) return null;
  const b = dict.beforeAfter;
  return (
    <section className="mx-auto max-w-6xl px-4 mt-20">
      <Reveal>
        <div className="text-xs font-bold tracking-widest text-sky-600 uppercase">{b.eyebrow}</div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">{b.title}</h2>
        <p className="text-slate-600 mt-2">{b.subtitle}</p>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {BEFORE_AFTER.map((item, i) => (
          <Reveal key={item.before} delay={(i % 2) * 90}>
            <figure>
              <BeforeAfter before={item.before} after={item.after} alt={item.caption[lang]} labels={b} />
              <figcaption className="mt-3 text-sm font-medium text-slate-600">{item.caption[lang]}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
