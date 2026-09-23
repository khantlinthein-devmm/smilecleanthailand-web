import type { Metadata } from "next";
import { Poppins, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Cleaning Services in Bangkok`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "One-stop cleaning services in Bangkok: house, condo, deep cleaning, move in/out, office, after renovation. Eco-friendly, 100% guarantee. Book on LINE.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Cleaning Services in Bangkok`,
    description:
      "House, condo, deep, move in/out & office cleaning in Bangkok. Free estimate on LINE.",
  },
  robots: { index: true, follow: true },
};

function LocalBusinessJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: "+66636162829",
    email: "smileclean.th@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "300 Soi Onnuch 10, Suan Luang",
      addressLocality: "Bangkok",
      postalCode: "10250",
      addressCountry: "TH",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "฿฿",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${poppins.variable} ${notoThai.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased font-sans">
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
