export const SITE_URL = "https://smilecleanthailand.com";
export const SITE_NAME = "Smile Clean Thailand";
export const PHONE = "0636162829";
export const PHONE_DISPLAY = "063-616-2829";
export const PHONE_LINK = "tel:+66636162829";
export const LINE_URL = "https://lin.ee/xHXjraz";
export const LINE_ID = "@smileclean";
export const EMAIL = "smileclean.th@gmail.com";

export const LOCALES = ["en", "th", "my", "zh", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Per-locale settings: switcher label, <html lang>, hreflang and Open Graph locale. */
export const LOCALE_META: Record<Locale, { label: string; short: string; htmlLang: string; hreflang: string; og: string }> = {
  en: { label: "English", short: "EN", htmlLang: "en", hreflang: "en", og: "en_US" },
  th: { label: "ไทย", short: "TH", htmlLang: "th", hreflang: "th", og: "th_TH" },
  my: { label: "မြန်မာ", short: "MY", htmlLang: "my", hreflang: "my", og: "my_MM" },
  zh: { label: "中文", short: "中文", htmlLang: "zh-Hans", hreflang: "zh-Hans", og: "zh_CN" },
  ru: { label: "Русский", short: "RU", htmlLang: "ru", hreflang: "ru", og: "ru_RU" },
};

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export function toLocale(v: string): Locale {
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

/** Canonical + hreflang alternates for a path ("" for the home page, "/about", ...). */
export function alternatesFor(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[LOCALE_META[l].hreflang] = `${SITE_URL}/${l}${path}`;
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`;
  return { canonical: `${SITE_URL}/${locale}${path}`, languages };
}

/** Per-page metadata: title, description, canonical/hreflang and a matching Open Graph card. */
export function pageMeta(locale: Locale, path: string, title: string, description: string) {
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website" as const,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      locale: LOCALE_META[locale].og,
      images: [{ url: "/hero-cleaning.jpg", alt: SITE_NAME }],
    },
  };
}
