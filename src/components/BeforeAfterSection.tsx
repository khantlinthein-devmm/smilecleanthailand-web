import { BEFORE_AFTER } from "@/data";
import type { Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import BeforeAfter from "./BeforeAfter";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/** Renders nothing until photos are added to BEFORE_AFTER in src/data.ts. */
export default function BeforeAfterSection({ dict, lang }: { dict: Dict; lang: Locale }) {
  if (BEFORE_AFTER.length === 0) return null;
  const b = dict.beforeAfter;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {BEFORE_AFTER.map((item, i) => (
            <Reveal key={item.before} delay={(i % 2) * 90}>
              <figure>
                <BeforeAfter before={item.before} after={item.after} alt={item.caption[lang]} labels={b} />
                <figcaption className="mt-3 text-sm font-medium text-slate-600">{item.caption[lang]}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
