// Structured data (schema.org JSON-LD) shared by every page. Search engines and
// AI answer engines read this to understand who the business is, what it
// offers and where — keep it in sync with what the pages actually say.
import { SERVICES } from "@/data";
import type { Dict } from "@/dictionaries";
import { EMAIL, LINE_URL, LOCALE_META, PHONE, SITE_NAME, SITE_URL, type Locale } from "@/lib/site";

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const TEL = `+66${PHONE.slice(1)}`;

export function businessSchema(locale: Locale, dict: Dict) {
  return {
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    description: dict.glance.summary,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo.png`,
    image: [`${SITE_URL}/og.png`, `${SITE_URL}/hero-cleaning.jpg`],
    telephone: TEL,
    email: EMAIL,
    priceRange: "฿฿",
    address: {
      "@type": "PostalAddress",
      streetAddress: "300 Soi On Nut 10",
      addressLocality: "Suan Luang",
      addressRegion: "Bangkok",
      postalCode: "10250",
      addressCountry: "TH",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      { "@type": "City", name: "Bangkok" },
      ...dict.areas.list.map((name) => ({ "@type": "Place", name })),
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: TEL,
      email: EMAIL,
      url: LINE_URL,
      hoursAvailable: "Mo-Su 00:00-23:59",
    },
    sameAs: [LINE_URL],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.footer.servicesTitle,
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s[locale].title,
          url: `${SITE_URL}/${locale}/services/${s.slug}`,
        },
      })),
    },
    knowsAbout: SERVICES.map((s) => s.en.title),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: LOCALE_META[locale].htmlLang,
    publisher: { "@id": BUSINESS_ID },
  };
}

/** Breadcrumb trail; `items` are [label, path] pairs after the home page. */
export function breadcrumbSchema(locale: Locale, homeLabel: string, items: [string, string][]) {
  const trail: [string, string][] = [[homeLabel, ""], ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}/${locale}${path}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Wraps one or more nodes in a single @graph document. */
export function graph(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
