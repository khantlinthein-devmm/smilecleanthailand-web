import type { Dict } from "@/dictionaries";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconCheck } from "./icons";

/** Checklist of the small details the team takes care of (from the original site's "Additional Services"). */
export default function WhatWeClean({ dict, className = "" }: { dict: Dict; className?: string }) {
  const w = dict.whatWeClean;
  return (
    <section className={`section ${className}`}>
      <div className="container-x">
        <SectionHeader title={w.title} subtitle={w.subtitle} />
        <Reveal>
          <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
            {w.items.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-ink">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <IconCheck className="w-3 h-3" />
                </span>
                <span className="text-[0.9375rem]">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
