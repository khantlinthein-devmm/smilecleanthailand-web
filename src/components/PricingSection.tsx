"use client";

import { useState } from "react";
import Link from "next/link";
import { LINE_URL, WHATSAPP_NUMBER, type Locale } from "@/lib/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconArrow, IconCheckCircle, IconChat, IconClock, IconSparkle, IconShield } from "./icons";

export interface PricingItem {
  id: string;
  category: "residence" | "deep" | "special";
  slug: string;
  badge?: Record<Locale, string>;
  th: {
    title: string;
    subtitle: string;
    scope: string;
    duration?: string;
    highlight: string;
  };
  en: {
    title: string;
    subtitle: string;
    scope: string;
    duration?: string;
    highlight: string;
  };
  startingPriceThb: number;
}

export const PRICING_ITEMS: PricingItem[] = [
  {
    id: "condo-basic",
    category: "residence",
    slug: "condo-cleaning",
    badge: {
      th: "⭐ ยอดนิยม",
      en: "⭐ Popular",
      zh: "⭐ 最受欢迎",
      my: "⭐ လူကြိုက်များ",
      ru: "⭐ Популярно",
    },
    th: {
      title: "คอนโดทำความสะอาดทั่วไป",
      subtitle: "Condo Basic",
      scope: "พื้นที่ไม่เกิน 30 ตร.ม.",
      duration: "2–4 ชั่วโมง",
      highlight: "กวาด ถู ดูดฝุ่น ทำความสะอาดห้องน้ำ ระเบียง จัดระเบียบห้องพัก",
    },
    en: {
      title: "Condo Basic Cleaning",
      subtitle: "General Clean",
      scope: "Up to 30 sq.m.",
      duration: "2–4 hours",
      highlight: "Dusting, vacuuming, mopping, bathroom & balcony sanitization",
    },
    startingPriceThb: 950,
  },
  {
    id: "condo-deep",
    category: "deep",
    slug: "deep-cleaning",
    badge: {
      th: "✨ ขัดล้ำลึก",
      en: "✨ Deep Scrub",
      zh: "✨ 深度清洁",
      my: "✨ အထူးသန့်ရှင်း",
      ru: "✨ Глубокая",
    },
    th: {
      title: "คอนโดบิ๊กคลีนนิ่ง",
      subtitle: "Condo Deep Cleaning",
      scope: "พื้นที่ไม่เกิน 30 ตร.ม.",
      duration: "3–5 ชั่วโมง",
      highlight: "ขัดล้ำลึกทุกซอกมุม คราบหินปูน กระจก ขอบหน้าต่าง ร่องยาแนว",
    },
    en: {
      title: "Condo Deep Cleaning",
      subtitle: "Thorough Scrub",
      scope: "Up to 30 sq.m.",
      duration: "3–5 hours",
      highlight: "Intensive lime-scale removal, glass, window tracks & tile grouts",
    },
    startingPriceThb: 1300,
  },
  {
    id: "move-in-out",
    category: "deep",
    slug: "move-in-move-out",
    badge: {
      th: "🔑 การันตีตรวจผ่าน",
      en: "🔑 Deposit Refund",
      zh: "🔑 押金全退",
      my: "🔑 အပ်နှံငွေရရှိ",
      ru: "🔑 Для переезда",
    },
    th: {
      title: "คลีนนิ่งย้ายเข้า / ย้ายออก",
      subtitle: "Move-in / Move-out",
      scope: "พื้นที่ไม่เกิน 30 ตร.ม.",
      duration: "3–5 ชั่วโมง",
      highlight: "เช็ดทำความสะอาดตู้ เฟอร์นิเจอร์ ซอกมุม การันตีส่งมอบห้องตรวจผ่าน",
    },
    en: {
      title: "Move-in / Move-out Cleaning",
      subtitle: "Handover Ready",
      scope: "Up to 30 sq.m.",
      duration: "3–5 hours",
      highlight: "Inside cabinets, appliances, full sanitize for landlord inspection",
    },
    startingPriceThb: 1400,
  },
  {
    id: "townhouse-basic",
    category: "residence",
    slug: "house-cleaning",
    th: {
      title: "ทาวน์เฮาส์ทำความสะอาดทั่วไป",
      subtitle: "Townhouse Basic",
      scope: "พื้นที่ไม่เกิน 50 ตร.ม.",
      duration: "3–5 ชั่วโมง",
      highlight: "ทำความสะอาดทุกชั้น พื้นที่ส่วนกลาง ห้องนอน และห้องน้ำครบ",
    },
    en: {
      title: "Townhouse Basic Cleaning",
      subtitle: "General Clean",
      scope: "Up to 50 sq.m.",
      duration: "3–5 hours",
      highlight: "Multi-floor sweeping, mopping, common areas, rooms & bathrooms",
    },
    startingPriceThb: 1100,
  },
  {
    id: "townhouse-deep",
    category: "deep",
    slug: "deep-cleaning",
    th: {
      title: "ทาวน์เฮาส์บิ๊กคลีนนิ่ง",
      subtitle: "Townhouse Deep Cleaning",
      scope: "พื้นที่ไม่เกิน 50 ตร.ม.",
      duration: "4–6 ชั่วโมง",
      highlight: "ขัดละเอียดทุกชั้น เช็ดบานหน้าต่าง ร่องประตู ขจัดคราบฝังลึก",
    },
    en: {
      title: "Townhouse Deep Cleaning",
      subtitle: "Full Restorative",
      scope: "Up to 50 sq.m.",
      duration: "4–6 hours",
      highlight: "Comprehensive detail clean, windows, door tracks, deep grime removal",
    },
    startingPriceThb: 1400,
  },
  {
    id: "mattress-cleaning",
    category: "special",
    slug: "deep-cleaning",
    badge: {
      th: "🛏️ ฆ่าไรฝุ่น",
      en: "🛏️ Anti-Dustmite",
      zh: "🛏️ 除螨杀菌",
      my: "🛏️ ပိုးသတ်",
      ru: "🛏️ Без пыли",
    },
    th: {
      title: "ซักอบฆ่าเชื้อที่นอน",
      subtitle: "Mattress Steam Cleaning",
      scope: "ที่นอน 3.5 ฟุต (Single Bed)",
      duration: "1–2 ชั่วโมง",
      highlight: "สกัดซักไอน้ำล้ำลึก ฆ่าเชื้อโรค กำจัดไรฝุ่น คราบเหงื่อไคลสะสม",
    },
    en: {
      title: "Mattress Sanitization",
      subtitle: "Steam Extraction",
      scope: "3.5 ft Single Bed",
      duration: "1–2 hours",
      highlight: "Hot steam extraction, eliminates dust mites, sweat stains & allergens",
    },
    startingPriceThb: 800,
  },
  {
    id: "sofa-cleaning",
    category: "special",
    slug: "deep-cleaning",
    th: {
      title: "ซักทำความสะอาดโซฟา 2 ที่นั่ง",
      subtitle: "Sofa Upholstery Cleaning",
      scope: "โซฟา 2 ที่นั่ง (2-Seater)",
      duration: "1–2 ชั่วโมง",
      highlight: "ฟื้นฟูเส้นใยผ้า ดูดฝุ่นและสกัดคราบฝังแน่น เชื้อราและกลิ่นอับ",
    },
    en: {
      title: "Sofa Upholstery Cleaning",
      subtitle: "Deep Extraction",
      scope: "2-Seater Sofa",
      duration: "1–2 hours",
      highlight: "Fabric fiber renewal, deep stain extraction, mold & odor neutralizer",
    },
    startingPriceThb: 900,
  },
  {
    id: "bird-netting",
    category: "special",
    slug: "deep-cleaning",
    th: {
      title: "ทำความสะอาดตาข่ายกันนก",
      subtitle: "Bird Netting Cleaning",
      scope: "ระเบียงไม่เกิน 10 ตร.ม.",
      duration: "1–2 ชั่วโมง",
      highlight: "ขจัดมูลนก ฉีดล้างฆ่าเชื้อโรค คราบฝังแน่นบริเวณระเบียงห้อง",
    },
    en: {
      title: "Bird Netting Cleaning",
      subtitle: "Balcony Sanitization",
      scope: "Balcony up to 10 sq.m.",
      duration: "1–2 hours",
      highlight: "Safe bird droppings removal, disinfectant wash, stain eradication",
    },
    startingPriceThb: 800,
  },
];

const UI_TEXT = {
  th: {
    eyebrow: "ราคาชัดเจน ไม่มีบวกเพิ่มหน้างาน",
    title: "อัตราค่าบริการมาตรฐาน",
    subtitle: "ราคาเริ่มต้นโปร่งใส บริการนำอุปกรณ์และน้ำยาเกรดพาณิชย์ไปเองครบชุด ลูกค้าไม่ต้องเตรียมอะไรไว้เลย",
    all: "ทั้งหมด (8)",
    residence: "บ้าน & คอนโดทั่วไป",
    deep: "บิ๊กคลีนนิ่ง & ย้ายเข้า-ออก",
    special: "ซักเบาะ/ที่นอน & ตาข่าย",
    from: "เริ่มต้น",
    baht: "บาท",
    bookNow: "จองบริการนี้",
    quickQuote: "ประเมินราคาทาง LINE",
    equipIncluded: "นำอุปกรณ์และน้ำยาเกรดพาณิชย์ไปเองครบชุด",
    noteFooter: "ราคาประเมินจริงขึ้นอยู่กับขนาดพื้นที่ (ตร.ม.), พิกัดสถานที่ และสภาพหน้างานจริง ยินดีประเมินราคาฟรีผ่านรูปถ่าย",
    guaranteeTitle: "มั่นใจกับมาตรฐาน Smile Clean Thailand",
    guaranteeItems: [
      "อุปกรณ์และน้ำยานำเข้าเกรดพาณิชย์ครบชุด ลูกค้าไม่ต้องเตรียมสิ่งใดไว้",
      "แม่บ้านผ่านการตรวจประวัติอาชญากรรมและอบรมมาตรฐานโรงแรม",
      "รับประกันความพึงพอใจ หากไม่เรียบร้อยยินดีแก้งานทันที",
      "ออกใบเสนอราคา ใบเสร็จ และใบกำกับภาษีถูกต้องสำหรับนิติบุคคล",
    ],
  },
  en: {
    eyebrow: "Transparent Pricing · No Hidden Fees",
    title: "Standard Service Rates",
    subtitle: "Clear starting rates. We bring all professional commercial equipment and supplies — you don't need to prepare anything.",
    all: "All Services (8)",
    residence: "Home & Condo Basic",
    deep: "Deep Clean & Move-in/out",
    special: "Mattress, Sofa & Specialty",
    from: "Starting from",
    baht: "THB",
    bookNow: "Book This Service",
    quickQuote: "Quick Quote on LINE",
    equipIncluded: "All commercial equipment & chemicals included",
    noteFooter: "Actual quote depends on exact floor area (sq.m.), location, and on-site condition. Send photos for a free instant estimate.",
    guaranteeTitle: "Why Choose Smile Clean Thailand",
    guaranteeItems: [
      "All commercial-grade machines & eco-friendly detergents included",
      "Criminal-background verified & hotel-trained cleaning crew",
      "Satisfaction guarantee — free re-touch if anything is missed",
      "Official quotations, receipts & tax invoices available for companies",
    ],
  },
};

export default function PricingSection({ lang = "th" }: { lang: Locale }) {
  const isEn = lang !== "th";
  const t = isEn ? UI_TEXT.en : UI_TEXT.th;
  const [filter, setFilter] = useState<"all" | "residence" | "deep" | "special">("all");

  const filteredItems = filter === "all" ? PRICING_ITEMS : PRICING_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="pricing" className="section bg-slate-50 border-b border-slate-200/80">
      <div className="container-x">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: t.all },
            { id: "residence", label: t.residence },
            { id: "deep", label: t.deep },
            { id: "special", label: t.special },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filter === tab.id
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/25"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => {
            const data = isEn ? item.en : item.th;
            const badge = item.badge?.[lang] || item.badge?.th;
            return (
              <Reveal key={item.id} delay={(idx % 4) * 60}>
                <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 h-full">
                  {badge && (
                    <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm shadow-amber-500/20">
                      {badge}
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-ink group-hover:text-sky-600 transition-colors leading-snug">
                          {data.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          {data.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline gap-1.5">
                      <span className="text-xs text-slate-500 font-medium">{t.from}</span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-sky-600 tracking-tight">
                        ฿{item.startingPriceThb.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{t.baht}</span>
                    </div>

                    {/* Scope & Time Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-0.5 font-medium text-sky-700">
                        <IconSparkle className="w-3 h-3 text-sky-500" />
                        {data.scope}
                      </span>
                      {data.duration && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                          <IconClock className="w-3 h-3 text-slate-400" />
                          {data.duration}
                        </span>
                      )}
                    </div>

                    {/* Highlight Description */}
                    <p className="mt-3.5 text-xs text-slate-600 leading-relaxed">
                      {data.highlight}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                    <Link
                      href={`/${lang}/booking?service=${item.slug}`}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-xs font-bold text-white hover:bg-sky-500 transition-colors shadow-sm shadow-sky-600/20"
                    >
                      <span>{t.bookNow}</span>
                      <IconArrow className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={LINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                    >
                      <IconChat className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t.quickQuote}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-sky-800/40">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 px-3 py-1 text-xs font-semibold text-sky-200">
                <IconShield className="w-4 h-4 text-sky-300" />
                Service Guarantee
              </span>
              <h4 className="mt-2 text-lg sm:text-xl font-bold text-white leading-snug">
                {t.guaranteeTitle}
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {t.noteFooter}
              </p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
              {t.guaranteeItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl bg-white/10 p-3.5 border border-white/15 shadow-sm">
                  <IconCheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-white leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

