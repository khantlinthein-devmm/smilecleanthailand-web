"use client";
import { useRef } from "react";

/**
 * 3D tilt toward the mouse with a soft moving shine. Mouse only — touch
 * devices and reduced-motion visitors get the plain card.
 */
export default function Tilt({ children, className = "", max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLSpanElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
    if (shine.current) {
      shine.current.style.opacity = "1";
      shine.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(255 255 255 / .35), transparent 55%)`;
    }
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
    if (shine.current) shine.current.style.opacity = "0";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative h-full transition-transform duration-300 ease-out [transform-style:preserve-3d] will-change-transform ${className}`}
    >
      {children}
      <span ref={shine} aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 transition-opacity duration-300 mix-blend-overlay" />
    </div>
  );
}
