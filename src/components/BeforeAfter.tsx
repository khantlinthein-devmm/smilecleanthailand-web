"use client";
import Image from "next/image";
import { useState } from "react";

/** Drag slider comparing a "before" photo (left) with an "after" photo (right). */
export default function BeforeAfter({
  before,
  after,
  alt,
  labels,
}: {
  before: string;
  after: string;
  alt: string;
  labels: { before: string; after: string; drag: string };
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-lg select-none bg-slate-100">
      <Image src={after} alt={`${alt} — ${labels.after}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt} — ${labels.before}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-sky-600 font-bold">
          ⇆
        </span>
      </div>
      <span className="absolute top-3 left-3 bg-slate-900/70 text-white text-xs font-bold rounded-full px-3 py-1">{labels.before}</span>
      <span className="absolute top-3 right-3 bg-sky-500 text-white text-xs font-bold rounded-full px-3 py-1">{labels.after}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={labels.drag}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
}
