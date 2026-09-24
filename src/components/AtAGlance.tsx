import { SERVICES } from "@/data";
import type { Dict } from "@/dictionaries";
import { EMAIL, LINE_ID, PHONE_DISPLAY, type Locale } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Plain, quotable facts about the business in a definition list. Answer engines
 * and AI assistants lift short factual statements like these directly.
 */
export default function AtAGlance({ dict, lang }: { dict: Dict; lang: Locale }) {
  const g = dict.glance;
  const facts: [string, string][] = [
    [g.location, dict.common.address],
    [g.hours, dict.common.hours],
    [g.services, SERVICES.map((s) => s[lang].title).join(" · ")],
    [g.booking, `LINE ${LINE_ID} · ${PHONE_DISPLAY} · ${EMAIL}`],
    [g.guarantee, dict.guarantee.subtitle],
    [g.equipment, dict.aboutTeaser.points[4]],
  ];
  return (
    <section className="section" aria-labelledby="at-a-glance">
      <div className="container-x">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50">
              <h2 id="at-a-glance" className="text-2xl md:text-3xl font-bold tracking-tight text-ink">{g.title}</h2>
              <p className="mt-3 text-lg text-slate-600 leading-relaxed max-w-3xl">{g.summary}</p>
            </div>
            <dl className="divide-y divide-slate-100">
              {facts.map(([k, v]) => (
                <div key={k} className="grid sm:grid-cols-[14rem_1fr] gap-1 sm:gap-6 px-8 md:px-10 py-5">
                  <dt className="font-semibold text-ink">{k}</dt>
                  <dd className="text-slate-600">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
