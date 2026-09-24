import { LINE_URL } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconChat, IconCheckCircle, IconSparkle } from "./icons";

const STEP_ICONS = [IconChat, IconCheckCircle, IconSparkle];

export default function HowItWorks({ dict, className = "" }: { dict: Dict; className?: string }) {
  const h = dict.howItWorks;
  return (
    <section className={`section ${className}`}>
      <div className="container-x">
        <SectionHeader
          eyebrow={h.eyebrow}
          title={h.title}
          subtitle={h.subtitle}
          action={
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
            </a>
          }
        />
        <ol className="mt-12 grid md:grid-cols-3 gap-5">
          {h.steps.map((step, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            return (
              <Reveal key={step.title} delay={i * 100}>
                <li className="card p-7 h-full relative overflow-hidden">
                  <span aria-hidden className="absolute right-6 top-5 text-6xl font-extrabold leading-none text-slate-100 select-none">
                    {i + 1}
                  </span>
                  <span className="relative w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center ring-1 ring-sky-100">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="relative mt-6 font-bold text-lg text-ink">{step.title}</div>
                  <p className="relative text-slate-600 mt-2 leading-relaxed">{step.body}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
