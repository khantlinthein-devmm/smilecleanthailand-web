import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { TERMS } from "@/legal";
import { pageMeta, toLocale } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import LegalPage from "@/components/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const doc = TERMS[locale];
  return pageMeta(locale, "/terms", doc.title, doc.description);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[dict.legal.terms, "/terms"]])]} />
      <LegalPage doc={TERMS[locale]} dict={dict} lang={locale} />
    </>
  );
}
