"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const DURATION = 720;

/**
 * "Squeegee wipe" between pages: the new page appears under a fogged glass
 * pane with the logo, and a squeegee sweeps it clean from left to right.
 * The new page is already rendered underneath, so navigation is never
 * delayed; the pane ignores clicks. Skipped on first load and for
 * reduced-motion visitors.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const fog = useRef<HTMLDivElement>(null);
  const blade = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const f = fog.current;
    const b = blade.current;
    if (!f || !b || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // One loop drives both the wipe and the blade so they can never drift apart.
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const paint = (p: number) => {
      f.style.clipPath = `inset(0 0 0 ${p * 100}%)`;
      b.style.transform = `translateX(calc(${p * 100}vw - 3rem)) rotate(${-4 + p * 8}deg)`;
    };
    paint(0);
    f.style.visibility = "visible";
    b.style.visibility = "visible";
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / DURATION, 1);
      paint(ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        f.style.visibility = "hidden";
        b.style.visibility = "hidden";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      f.style.visibility = "hidden";
      b.style.visibility = "hidden";
    };
  }, [pathname]);

  return (
    <div aria-hidden className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Fogged glass with droplets and the logo */}
      <div ref={fog} className="squeegee-fog absolute inset-0 invisible flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 opacity-80">
          <Image src="/logo.png" alt="" width={88} height={88} className="w-20 h-20 rounded-2xl shadow-lg" />
          <span className="text-2xl font-bold tracking-tight text-sky-900/70">Smile Clean</span>
        </div>
      </div>
      {/* Squeegee: rubber blade across the full height with a handle, and a fresh glint behind it */}
      <div ref={blade} className="absolute inset-y-0 left-0 w-12 invisible">
        <div className="absolute inset-y-[-4%] right-[calc(100%-2px)] w-24 bg-gradient-to-l from-white/70 to-transparent" />
        <div className="absolute inset-y-[-4%] left-3 w-3 rounded-full bg-slate-300 shadow-[inset_-2px_0_0_rgba(0,0,0,.08)]" />
        <div className="absolute inset-y-[-4%] left-6 w-1.5 rounded-full bg-slate-800" />
        <div className="absolute top-1/2 right-[calc(100%-0.75rem)] -translate-y-1/2 w-40 h-5 rounded-full bg-sky-600 shadow-lg">
          <div className="absolute inset-y-1 left-3 w-16 rounded-full bg-sky-800/60" />
        </div>
        {[18, 34, 51, 67, 83].map((top) => (
          <span key={top} className="absolute left-8 w-2 h-3 rounded-full bg-white/80" style={{ top: `${top}%` }} />
        ))}
      </div>
    </div>
  );
}
