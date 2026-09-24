import type { Dict } from "@/dictionaries";
import { LEGAL_UPDATED, type LegalDoc } from "@/legal";
import { EMAIL, LINE_ID, LINE_URL, LOCALE_META, PHONE_DISPLAY, PHONE_LINK, type Locale } from "@/lib/site";
import PageHero from "./PageHero";
import { IconChat, IconMail, IconPhone } from "./icons";

/** Shared layout for the Privacy Policy and Terms of Service pages. */
export default function LegalPage({ doc, dict, lang }: { doc: LegalDoc; dict: Dict; lang: Locale }) {
  const fill = (s: string) =>
    s
      .replaceAll("{email}", EMAIL)
      .replaceAll("{phone}", PHONE_DISPLAY)
      .replaceAll("{line}", LINE_ID)
      .replaceAll("{address}", dict.common.address);
  let updated = LEGAL_UPDATED;
  try {
    updated = new Intl.DateTimeFormat(LOCALE_META[lang].htmlLang, { dateStyle: "long" }).format(new Date(LEGAL_UPDATED));
  } catch {
    // keep ISO date if the locale is not supported
  }
  return (
    <>
      <PageHero eyebrow={dict.legal.updated + ": " + updated} title={doc.title} subtitle={doc.description} />
      <section className="section">
        <div className="container-x grid lg:grid-cols-[16rem_1fr] gap-12 items-start">
          <aside className="lg:sticky lg:top-36 hidden lg:block">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{dict.legal.contents}</div>
            <ol className="mt-4 grid gap-2 text-sm">
              {doc.sections.map((sec, i) => (
                <li key={sec.heading}>
                  <a href={`#s${i + 1}`} className="text-slate-500 hover:text-sky-700 transition">
                    {i + 1}. {sec.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <article className="max-w-3xl">
            <p className="text-lg text-slate-700 leading-relaxed">{fill(doc.intro)}</p>
            {doc.sections.map((sec, i) => (
              <section key={sec.heading} id={`s${i + 1}`} className="mt-10 scroll-mt-36">
                <h2 className="text-xl md:text-2xl font-bold text-ink tracking-tight">
                  {i + 1}. {sec.heading}
                </h2>
                {sec.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 text-slate-600 leading-relaxed">{fill(p)}</p>
                ))}
                {sec.items && (
                  <ul className="mt-3 grid gap-2 list-disc pl-5 marker:text-sky-500 text-slate-600 leading-relaxed">
                    {sec.items.map((it) => (
                      <li key={it}>{fill(it)}</li>
                    ))}
                  </ul>
                )}
                {sec.after?.map((p) => (
                  <p key={p} className="mt-3 text-slate-600 leading-relaxed">{fill(p)}</p>
                ))}
              </section>
            ))}
            <div className="mt-12 card p-7 bg-slate-50">
              <div className="font-bold text-ink">{dict.legal.questions}</div>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm">
                  <IconChat className="w-4 h-4" /> LINE {LINE_ID}
                </a>
                <a href={`mailto:${EMAIL}`} className="btn btn-outline btn-sm">
                  <IconMail className="w-4 h-4" /> {EMAIL}
                </a>
                <a href={PHONE_LINK} className="btn btn-outline btn-sm">
                  <IconPhone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
