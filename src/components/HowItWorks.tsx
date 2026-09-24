import { LINE_URL } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import Reveal from "./Reveal";
import { IconChat, IconCheckCircle, IconSparkle } from "./icons";

const STEP_ICONS = [IconChat, IconCheckCircle, IconSparkle];

export default function HowItWorks({ dict }: { dict: Dict }) {
  const h = dict.howItWorks;
  return (
    <section className="mx-auto max-w-6xl px-4 mt-20">
      <Reveal>
        <div className="text-xs font-bold tracking-widest text-sky-600 uppercase">{h.eyebrow}</div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">{h.title}</h2>
        <p className="text-slate-600 mt-2">{h.subtitle}</p>
      </Reveal>
      <ol className="mt-8 grid md:grid-cols-3 gap-4 relative">
        {/* Connecting line behind the step numbers on desktop */}
        <div aria-hidden className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-sky-200 via-cyan-300 to-sky-200" />
        {h.steps.map((step, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length];
          return (
            <Reveal key={step.title} delay={i * 100}>
              <li className="relative bg-white border border-slate-200 rounded-3xl p-7 h-full card-lift">
                <div className="flex items-center gap-3">
                  <span className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/25">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="text-4xl font-extrabold text-sky-100">0{i + 1}</span>
                </div>
                <div className="font-bold text-lg mt-4">{step.title}</div>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{step.body}</p>
                {i === 0 && (
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-[#06C755] text-white text-sm font-bold rounded-full px-5 py-2.5"
                  >
                    <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
                  </a>
                )}
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
