import ScrollState from "@/components/ScrollState";
import PageTransition from "@/components/PageTransition";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { getDictionary } from "@/dictionaries";
import { LOCALES, LOCALE_META, OG_IMAGE, SITE_NAME, SITE_URL, alternatesFor, toLocale } from "@/lib/site";

// Fonts are bundled in the repo (variable woff2, SIL OFL) so the build never
// has to download from Google Fonts; some hosts' build servers can't.
const jakarta = localFont({
  src: "../fonts/plus-jakarta-sans.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});

const notoThai = localFont({
  src: "../fonts/noto-sans-thai.woff2",
  weight: "100 900",
  variable: "--font-thai",
  display: "swap",
});

const notoMyanmar = localFont({
  src: "../fonts/noto-sans-myanmar.woff2",
  weight: "100 900",
  variable: "--font-myanmar",
  display: "swap",
  preload: false,
});

// Only the configured locales exist; anything else (e.g. /fr) is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  const title = `${SITE_NAME} | ${dict.meta.siteTitle}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description: dict.meta.siteDescription,
    alternates: alternatesFor(locale, ""),
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title,
      description: dict.meta.siteDescription,
      locale: LOCALE_META[locale].og,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    // Set these in the hosting environment to verify the site in Google Search Console / Bing Webmaster Tools.
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
    },
    formatDetection: { telephone: true },
  };
}


export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      className={`h-full ${jakarta.variable} ${notoThai.variable} ${notoMyanmar.variable}`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-600 antialiased font-sans pb-16 md:pb-0">
        <JsonLd nodes={[websiteSchema(locale), businessSchema(locale, dict)]} />
        <Header lang={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={locale} dict={dict} />
        <MobileCtaBar dict={dict} lang={locale} />
        <Analytics />
        <ScrollState />
        <PageTransition />
      </body>
    </html>
  );
}
