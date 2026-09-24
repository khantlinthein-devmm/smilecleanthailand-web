// Per-service Q&A built from facts already on the site (features, booking,
// areas, guarantee), so every service page answers the questions people ask
// search engines and AI assistants — without inventing new claims.
import { FAQS, type Service } from "@/data";
import type { Dict } from "@/dictionaries";
import { LINE_ID, PHONE_DISPLAY, type Locale } from "@/lib/site";

const LIST_SEP: Record<Locale, string> = { en: ", ", th: " ", my: "၊ ", zh: "、", ru: ", " };
const SENTENCE_END: Record<Locale, string> = { en: ".", th: "", my: "။", zh: "。", ru: "." };

export function serviceFaqs(service: Service, locale: Locale, dict: Dict) {
  const t = service[locale];
  const f = dict.serviceFaq;
  const fill = (s: string) => s.replaceAll("{service}", t.title).replaceAll("{line}", LINE_ID).replaceAll("{phone}", PHONE_DISPLAY);
  const guaranteeFaq = FAQS[1][locale];
  return [
    { q: fill(f.q1), a: `${t.features.join(LIST_SEP[locale])}${SENTENCE_END[locale]} ${t.body.join(" ")}` },
    { q: fill(f.q2), a: fill(f.a2) },
    { q: f.q3, a: `${dict.areas.subtitle} ${dict.areas.list.join(LIST_SEP[locale])}${SENTENCE_END[locale]}` },
    { q: f.q4, a: guaranteeFaq.a },
  ];
}
