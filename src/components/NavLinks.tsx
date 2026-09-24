"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  if (variant === "desktop") {
    return (
      <nav className="hidden xl:flex items-center gap-1 text-[0.9375rem] font-medium whitespace-nowrap">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`relative px-3 py-2 transition-colors ${
              isActive(l.href)
                ? "text-ink after:absolute after:left-3 after:right-3 after:-bottom-[1.3rem] after:h-0.5 after:bg-sky-600"
                : "text-slate-500 hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        ))}
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
