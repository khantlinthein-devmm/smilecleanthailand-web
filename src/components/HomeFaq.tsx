"use client";

import { useState } from "react";
import { FAQS } from "@/data";
import { LINE_URL, type Locale } from "@/lib/site";
import { IconChat, IconArrow } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const LABELS: Record<Locale, { eyebrow: string; title: string; subtitle: string; askMore: string; chatLine: string }> = {
  th: {
    eyebrow: "ตอบทุกข้อสงสัย",
    title: "คำถามที่พบบ่อย (FAQ)",
    subtitle: "คลายข้อข้องใจก่อนตัดสินใจจองบริการกับเรา",
    askMore: "ยังมีคำถามเพิ่มเติม?",
    chatLine: "แชตสอบถามทาง LINE",
  },
  en: {
    eyebrow: "Clear Answers",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know before booking your cleaning service",
    askMore: "Still have questions?",
    chatLine: "Chat with us on LINE",
  },
  zh: {
    eyebrow: "常见问题解答",
    title: "常见问题 (FAQ)",
    subtitle: "在预订清洁服务前为您解答一切疑虑",
    askMore: "还有其他疑问？",
    chatLine: "通过 LINE 在线咨询",
  },
  my: {
    eyebrow: "ရှင်းလင်းသော အဖြေများ",
    title: "မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ",
    subtitle: "သန့်ရှင်းရေး ဝန်ဆောင်မှု မရွေးချယ်မီ သိထားသင့်သည်များ",
    askMore: "မေးခွန်းများ ရှိသေးပါသလား။",
    chatLine: "LINE တွင် စကားပြော မေးမြန်းရန်",
  },
  ru: {
    eyebrow: "Ответы на вопросы",
    title: "Часто задаваемые вопросы (FAQ)",
    subtitle: "Всё, что вам нужно знать перед оформлением заказа на уборку",
    askMore: "Остались вопросы?",
    chatLine: "Задать вопрос в LINE",
  },
};

export default function HomeFaq({ lang = "en" }: { lang: Locale }) {
  const t = LABELS[lang] || LABELS.en;
  const list = FAQS.slice(0, 5);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section bg-slate-50 border-b border-slate-200/80">
      <div className="container-x max-w-4xl">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-10 space-y-3.5">
          {list.map((item, idx) => {
            const faq = item[lang] || item.en;
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} delay={idx * 60}>
                <div className="card overflow-hidden border border-slate-200/90 transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-ink hover:text-sky-600 transition"
                  >
                    <span className="text-[15px] sm:text-base leading-snug">{faq.q}</span>
                    <span
                      className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-90 bg-sky-50 text-sky-600" : ""
                      }`}
                    >
                      <IconArrow className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-ink text-sm">{t.askMore}</h4>
            <p className="text-xs text-slate-500 mt-0.5">เปิดให้บริการสอบถามและจองคิวได้ 24 ชั่วโมง</p>
          </div>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line btn-sm shrink-0"
          >
            <IconChat className="w-4 h-4" />
            {t.chatLine}
          </a>
        </div>
      </div>
    </section>
  );
}

