export const SITE_URL = "https://smilecleanthailand.com";
export const SITE_NAME = "Smile Clean Thailand";
export const PHONE = "0636162829";
export const PHONE_LINK = "tel:+66636162829";
export const LINE_URL = "https://lin.ee/xHXjraz";
export const EMAIL = "smileclean.th@gmail.com";
export const ADDRESS_EN = "300 On Nut 10 Alley, Suan Luang, Bangkok 10250";
export const ADDRESS_TH = "300 ซอยอ่อนนุช 10 แขวงสวนหลวง กรุงเทพฯ 10250";
export const HOURS = "24 Hours";

export const LOCALES = ["en", "th"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}
