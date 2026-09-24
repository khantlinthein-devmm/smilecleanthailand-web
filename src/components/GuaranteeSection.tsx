import { LINE_URL } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import Reveal from "./Reveal";
import { IconChat, IconShield } from "./icons";

export default function GuaranteeSection({ dict }: { dict: Dict }) {
  const g = dict.guarantee;
  return (
    <section id="guarantee" className="relative overflow-hidden bg-ink text-white section scroll-mt-32">
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div aria-hidden className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-sky-500/25 blur-3xl" />
      <div className="relative container-x grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <Reveal>
          <span className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xl shadow-sky-500/30">
            <IconShield className="w-7 h-7" />
          </span>
          <h2 className="mt-6 text-3xl md:text-[2.5rem] md:leading-[1.15] font-bold tracking-tight">{g.title}</h2>
          <p className="mt-4 text-lg text-sky-100/75">{g.subtitle}</p>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg mt-8">
            <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
          </a>
        </Reveal>
        <ol className="grid gap-4">
          {g.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <li className="flex gap-5 rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                <span className="w-10 h-10 shrink-0 rounded-full border border-sky-400/40 text-sky-300 font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-lg">{step.title}</div>
                  <p className="text-sky-100/70 mt-1 leading-relaxed">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
