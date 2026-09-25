import Bubbles3D from "./Bubbles3D";
/** Top banner for inner pages: eyebrow, title and optional intro, on a soft tinted background. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  top,
  children,
}: {
  /** Shown above the title, e.g. a back link. */
  top?: React.ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden className="absolute -top-40 right-0 w-[36rem] h-[36rem] rounded-full bg-white/10 blur-3xl" />
      <Bubbles3D className="absolute inset-y-0 right-0 w-full lg:w-1/2" count={6} />
      <div className="relative container-x py-14 md:py-20 animate-fade-up">
        {top && <div className="mb-6">{top}</div>}
        {eyebrow && <div className="eyebrow !text-white/90">{eyebrow}</div>}
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-white/85 max-w-2xl leading-relaxed">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
