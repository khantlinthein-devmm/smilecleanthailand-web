import Reveal from "./Reveal";

/** Consistent section heading: eyebrow, title, optional subtitle and right-hand action. */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className={`flex flex-wrap items-end gap-6 ${center ? "justify-center text-center" : "justify-between"}`}>
        <div className={center ? "max-w-2xl mx-auto" : "max-w-2xl"}>
          {eyebrow && <div className={`eyebrow ${dark ? "!text-sky-300" : ""}`}>{eyebrow}</div>}
          <h2 className={`mt-3 text-3xl md:text-[2.5rem] md:leading-[1.15] font-bold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
            {title}
          </h2>
          {subtitle && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-sky-100/75" : "text-slate-600"}`}>{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
