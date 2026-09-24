"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/site";

/** Dropdown that switches language while staying on the same page. */
export default function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const ref = useRef<HTMLDetailsElement>(null);
  const rest = pathname.split("/").slice(2).join("/");

  // Close the menu after navigating or when clicking elsewhere.
  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) ref.current.removeAttribute("open");
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <details ref={ref} className="relative">
      <summary
        aria-label={label}
        className="list-none cursor-pointer select-none inline-flex items-center gap-1.5 text-xs font-semibold border border-slate-200 rounded-lg px-3 py-2 text-slate-600 hover:border-slate-400 hover:text-ink transition"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
        {LOCALE_META[lang].short}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <ul className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-900/10 py-1.5 z-50">
        {LOCALES.map((l) => (
          <li key={l}>
            <Link
              href={`/${l}${rest ? `/${rest}` : ""}`}
              hrefLang={LOCALE_META[l].hreflang}
              lang={LOCALE_META[l].htmlLang}
              aria-current={l === lang ? "true" : undefined}
              className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-sky-50 ${
                l === lang ? "font-bold text-sky-700" : "text-slate-700"
              }`}
            >
              {LOCALE_META[l].label}
              {l === lang && <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
