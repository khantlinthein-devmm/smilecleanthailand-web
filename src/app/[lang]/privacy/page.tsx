import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { PRIVACY } from "@/legal";
import { pageMeta, toLocale } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import LegalPage from "@/components/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const doc = PRIVACY[locale];
  return pageMeta(locale, "/privacy", doc.title, doc.description);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const dict = await getDictionary(locale);
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(locale, dict.nav.home, [[dict.legal.privacy, "/privacy"]])]} />
      <LegalPage doc={PRIVACY[locale]} dict={dict} lang={locale} />
    </>
  );
}
