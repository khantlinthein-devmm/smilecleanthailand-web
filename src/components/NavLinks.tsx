"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Header navigation that highlights the current page. */
export default function NavLinks({
  links,
  base,
  variant,
}: {
  links: { href: string; label: string }[];
  base: string;
  variant: "desktop" | "mobile";
}) {
  const pathname = usePathname() ?? base;
  const isActive = (href: string) => (href === base ? pathname === base : pathname.startsWith(href));
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // A single underline that glides to the hovered link and back to the current page.
  const moveBar = (el: HTMLElement | null | undefined) => {
    const bar = barRef.current;
    if (!bar) return;
    if (!el) {
      bar.style.opacity = "0";
      return;
    }
    bar.style.opacity = "1";
    bar.style.width = `${el.offsetWidth - 24}px`;
    bar.style.transform = `translateX(${el.offsetLeft + 12}px)`;
  };
  const activeLink = () => navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
  useEffect(() => {
    if (variant !== "desktop") return;
    moveBar(activeLink());
    const onResize = () => moveBar(activeLink());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, variant]);

  if (variant === "desktop") {
    return (
      <nav
        ref={navRef}
        onMouseLeave={() => moveBar(activeLink())}
        className="relative hidden xl:flex items-center gap-1 text-[0.9375rem] font-medium whitespace-nowrap self-stretch"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onMouseEnter={(e) => moveBar(e.currentTarget)}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`relative px-3 py-2 transition-colors ${isActive(l.href) ? "text-ink" : "text-slate-500 hover:text-ink"}`}
          >
            {l.label}
          </Link>
        ))}
        <span
          ref={barRef}
          aria-hidden
          className="absolute left-0 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-sky-400 to-blue-600 opacity-0 transition-[transform,width,opacity] duration-300 ease-out"
        />
      </nav>
    );
  }
  return (
    <nav className="xl:hidden border-t border-slate-100 overflow-x-auto [scrollbar-width:none]">
      <div className="container-x flex gap-1 py-2 text-sm font-medium whitespace-nowrap">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              isActive(l.href) ? "bg-sky-50 text-sky-700" : "text-slate-500 hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
