import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/dictionaries";
import { LOCALES, SITE_URL, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang === "th" ? "th" : "en") as Locale;
  return {
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { en: `${SITE_URL}/en`, th: `${SITE_URL}/th` },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = lang === "th" ? "th" : "en";
  const dict = await getDictionary(locale);
  return (
    <>
      <Header lang={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={locale} dict={dict} />
    </>
  );
}
