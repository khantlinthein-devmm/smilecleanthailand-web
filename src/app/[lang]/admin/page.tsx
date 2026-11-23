import type { Metadata } from "next";
import { toLocale } from "@/lib/site";
import AdminDispatchPortal from "@/components/AdminDispatchPortal";

export const metadata: Metadata = {
  title: "Admin Dispatch & QC Portal — Smile Clean Thailand",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = toLocale(lang);

  return <AdminDispatchPortal locale={locale} />;
}
