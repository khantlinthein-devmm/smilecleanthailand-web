import type { Metadata } from "next";
import { Poppins, Noto_Sans_Thai, Noto_Sans_Myanmar } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import Analytics from "@/components/Analytics";
import { getDictionary } from "@/dictionaries";
import { EMAIL, LOCALES, LOCALE_META, SITE_NAME, SITE_URL, alternatesFor, toLocale } from "@/lib/site";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const notoThai = Noto_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-thai",
  display: "swap",
});

const notoMyanmar = Noto_Sans_Myanmar({
  weight: ["400", "500", "600", "700"],
  subsets: ["myanmar"],
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
      images: [{ url: "/hero-cleaning.jpg", alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", images: ["/hero-cleaning.jpg"] },
    robots: { index: true, follow: true },
  };
}

function LocalBusinessJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/hero-cleaning.jpg`,
    logo: `${SITE_URL}/logo.png`,
    telephone: "+66922867433",
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "300 Soi On Nut 10, Suan Luang",
      addressLocality: "Bangkok",
      postalCode: "10250",
      addressCountry: "TH",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "฿฿",
    availableLanguage: ["English", "Thai", "Burmese", "Chinese", "Russian"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
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
      className={`h-full ${poppins.variable} ${notoThai.variable} ${notoMyanmar.variable}`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased font-sans pb-16 md:pb-0">
        <LocalBusinessJsonLd />
        <Header lang={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={locale} dict={dict} />
        <MobileCtaBar dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
