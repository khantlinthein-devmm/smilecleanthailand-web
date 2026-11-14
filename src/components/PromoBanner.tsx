"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LINE_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
  PHONE_2_DISPLAY,
  PHONE_2_LINK,
  type Locale,
} from "@/lib/site";
import {
  IconCalendar,
  IconChat,
  IconCheckCircle,
  IconPhone,
  IconShield,
  IconSparkle,
} from "./icons";

export default function PromoBanner({ locale }: { locale: Locale }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isTh = locale === "th";

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <section id="promotion" className="relative container-x -mt-10 md:-mt-14 z-20">
        <div className="rounded-3xl overflow-hidden bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_50px_rgba(2,132,199,0.18)] p-4 md:p-6 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(2,132,199,0.25)]">
          {/* HEADER ROW */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-amber-500 text-white flex items-center justify-center text-xl shadow-md shadow-red-500/20 shrink-0">
                <IconSparkle className="w-5 h-5" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-black text-slate-900 text-base md:text-lg tracking-tight">
                    {isTh ? "โปรโมชั่นพิเศษประจำเดือนพฤศจิกายน" : "Special November Promotion"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-xs shadow-sm">
                    DISCOUNT 10%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isTh
                    ? "ลดทันที 10% ทุกบริการทำความสะอาด (01 - 30 พ.ย.) • ปรึกษาประเมินราคาฟรี"
                    : "Instant 10% off all 12 cleaning services (Nov 1–30) • Free instant estimate"}
                </p>
              </div>
            </div>

            {/* ACTION PILLS */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm bg-[#06C755] hover:bg-[#05b34c] text-white border-0 font-extrabold shadow-md shadow-[#06C755]/20 flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              >
                <IconChat className="w-4 h-4" />
                <span>{isTh ? "จองคิวรับส่วนลดทาง LINE" : "Claim 10% on LINE"}</span>
              </a>
              <a
                href="#pricing"
                className="btn btn-sm bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 font-bold flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              >
                <span>{isTh ? "ดูตารางราคา 12 บริการ ↓" : "View 12 Service Rates ↓"}</span>
              </a>
              <a
                href={PHONE_LINK}
                className="btn btn-sm btn-outline text-slate-700 hidden sm:inline-flex items-center gap-1.5"
              >
                <IconPhone className="w-3.5 h-3.5 text-sky-600" />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* PROMOTION IMAGE (OPENS IN-PAGE LIGHTBOX MODAL) */}
          <div className="mt-4 relative rounded-2xl overflow-hidden ring-1 ring-slate-200/80 group">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={isTh ? "คลิกเพื่อขยายดูรายละเอียดโปรโมชั่นขนาดเต็ม" : "Click to zoom promotion poster"}
              className="block w-full text-left cursor-zoom-in relative focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <Image
                src="/promotion-horizontal.jpg"
                alt="Smile Clean Thailand 10% Promotion Discount - November 2026"
                width={1024}
                height={571}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="w-full h-auto aspect-[1024/571] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 text-ink font-bold text-xs shadow-lg backdrop-blur-sm">
                  {isTh ? "คลิกเพื่อขยายดูภาพขนาดเต็ม" : "Click to enlarge poster"}
                </span>
              </div>
              <span className="sm:hidden absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/75 text-white font-semibold text-[11px] backdrop-blur-sm">
                {isTh ? "แตะเพื่อขยาย" : "Tap to zoom"}
              </span>
            </button>
          </div>

          {/* BOTTOM MICRO-COPY */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
              <IconCheckCircle className="w-3.5 h-3.5" />
              {isTh ? "ครอบคลุมครบ 12 บริการตามโปสเตอร์ด้านบน" : "Covers all 12 services shown in poster"}
            </span>
            <span className="text-slate-500 hidden md:inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <IconPhone className="w-3.5 h-3.5 text-sky-600" />
                {isTh ? "โทรด่วน:" : "Call:"}
              </span>
              <a href={PHONE_LINK} className="font-semibold text-slate-700 hover:text-sky-600 transition-colors">
                {PHONE_DISPLAY}
              </a>
              <span>,</span>
              <a href={PHONE_2_LINK} className="font-semibold text-slate-700 hover:text-sky-600 transition-colors">
                {PHONE_2_DISPLAY}
              </a>
            </span>
            <span className="inline-flex items-center gap-1 text-sky-600 font-medium ml-auto">
              <IconShield className="w-3.5 h-3.5" />
              {isTh ? "รับประกันความพึงพอใจ 100%" : "100% Satisfaction Guarantee"}
            </span>
          </div>
        </div>
      </section>

      {/* IN-PAGE LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isTh ? "รายละเอียดโปรโมชั่นลด 10%" : "10% Discount Promotion Details"}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-[11px] font-black">
                  -10% PROMO
                </span>
                <span className="text-xs sm:text-sm font-bold truncate">
                  {isTh
                    ? "โปรโมชั่นลด 10% ทุกบริการ (1–30 พ.ย.) — Smile Clean Thailand"
                    : "10% OFF All 12 Services (Nov 1–30) — Smile Clean Thailand"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* High-Res Image Container */}
            <div className="max-h-[72vh] overflow-auto bg-slate-100">
              <Image
                src="/promotion-horizontal.jpg"
                alt="Smile Clean Thailand 10% Promotion Full Size"
                width={1024}
                height={571}
                className="w-full h-auto block"
              />
            </div>

            {/* Modal Sticky Conversion Bar */}
            <div className="p-4 sm:px-6 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm bg-[#06C755] hover:bg-[#05b34c] text-white border-0 font-extrabold shadow-md shadow-[#06C755]/20 inline-flex items-center gap-1.5"
                >
                  <IconChat className="w-4 h-4" />
                  <span>{isTh ? "รับสิทธิ์ลด 10% ทาง LINE" : "Claim 10% on LINE"}</span>
                </a>
                <Link
                  href={`/${locale}/booking`}
                  onClick={() => setLightboxOpen(false)}
                  className="btn btn-sm btn-primary inline-flex items-center gap-1.5"
                >
                  <IconCalendar className="w-4 h-4" />
                  <span>{isTh ? "จองออนไลน์ทันที" : "Book Online Now"}</span>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 transition"
                >
                  <IconPhone className="w-3.5 h-3.5 text-sky-600" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={PHONE_2_LINK}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 transition"
                >
                  <IconPhone className="w-3.5 h-3.5 text-sky-600" />
                  <span>{PHONE_2_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
