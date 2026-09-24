import { LINE_URL } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import Reveal from "./Reveal";
import { IconChat, IconShield } from "./icons";

export default function GuaranteeSection({ dict }: { dict: Dict }) {
  const g = dict.guarantee;
  return (
    <section id="guarantee" className="mx-auto max-w-6xl px-4 mt-20 scroll-mt-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 text-white p-8 md:p-12">
          <div aria-hidden className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/30 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-5">
            <span className="w-16 h-16 rounded-3xl bg-gradient-to-br from-sky-400 to-cyan-400 text-slate-900 flex items-center justify-center shrink-0 shadow-xl shadow-sky-500/30">
              <IconShield className="w-8 h-8" />
            </span>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{g.title}</h2>
              <p className="mt-2 text-sky-100/80 text-lg">{g.subtitle}</p>
            </div>
          </div>
          <ol className="relative mt-8 grid md:grid-cols-3 gap-4">
            {g.steps.map((step, i) => (
              <li key={step.title} className="rounded-3xl bg-white/5 border border-white/10 p-6">
                <div className="text-sm font-extrabold text-sky-300">0{i + 1}</div>
                <div className="font-bold text-lg mt-1">{step.title}</div>
                <p className="text-sm text-sky-100/75 mt-2 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-flex items-center gap-2 bg-[#06C755] text-white font-bold rounded-full px-6 py-3"
          >
            <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
