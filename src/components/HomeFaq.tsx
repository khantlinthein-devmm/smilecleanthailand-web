"use client";

import { useState } from "react";
import { FAQS } from "@/data";
import { LINE_URL, WHATSAPP_NUMBER, type Locale } from "@/lib/site";
import { IconChat, IconArrow, IconWhatsApp } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const LABELS: Record<Locale, { eyebrow: string; title: string; subtitle: string; askMore: string; chatLine: string; hours: string }> = {
  th: {
    eyebrow: "ตอบทุกข้อสงสัย",
    title: "คำถามที่พบบ่อย (FAQ)",
    subtitle: "คลายข้อข้องใจก่อนตัดสินใจจองบริการกับเรา",
    askMore: "ยังมีคำถามเพิ่มเติมหรือต้องการประเมินราคา?",
    chatLine: "แชตสอบถามทาง LINE",
    hours: "ทีมงานพร้อมตอบกลับตลอด 24 ชั่วโมง",
  },
  en: {
    eyebrow: "Clear Answers",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know before booking your cleaning service",
    askMore: "Have questions or need a custom quote?",
    chatLine: "Chat with us on LINE",
    hours: "Our customer team is available 24 hours a day",
  },
  zh: {
    eyebrow: "常见问题解答",
    title: "常见问题 (FAQ)",
    subtitle: "在预订清洁服务前为您解答一切疑虑",
    askMore: "还有其他疑问或需要精准估价？",
    chatLine: "通过 LINE 在线咨询",
    hours: "客服团队24小时在线为您答疑",
  },
  my: {
    eyebrow: "ရှင်းလင်းသော အဖြေများ",
    title: "မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ",
    subtitle: "သန့်ရှင်းရေး ဝန်ဆောင်မှု မရွေးချယ်မီ သိထားသင့်သည်များ",
    askMore: "မေးခွန်းများ ရှိသေးပါသလား သို့မဟုတ် စျေးနှုန်းတွက်ချက်လိုပါသလား။",
    chatLine: "LINE တွင် စကားပြော မေးမြန်းရန်",
    hours: "၂၄ နာရီလုံး အဆင်သင့်ရှိပါသည်",
  },
  ru: {
    eyebrow: "Ответы на вопросы",
    title: "Часто задаваемые вопросы (FAQ)",
    subtitle: "Всё, что вам нужно знать перед оформлением заказа на уборку",
    askMore: "Остались вопросы или нужен индивидуальный расчёт?",
    chatLine: "Задать вопрос в LINE",
    hours: "Консультация и приём заявок 24 часа в сутки",
  },
};

export default function HomeFaq({ lang = "en" }: { lang: Locale }) {
  const t = LABELS[lang] || LABELS.en;
  const list = FAQS.slice(0, 5);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section bg-slate-50/60 border-b border-slate-200/80">
      <div className="container-x max-w-4xl">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-10 space-y-3.5">
          {list.map((item, idx) => {
            const faq = item[lang] || item.en;
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} delay={idx * 60}>
                <div
                  className={`rounded-2xl transition-all duration-300 bg-white border ${
                    isOpen
                      ? "border-sky-300 ring-4 ring-sky-50 shadow-md"
                      : "border-slate-200/90 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-ink hover:text-sky-600 transition"
                  >
                    <span className="text-[15px] sm:text-base leading-snug">{faq.q}</span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-90 bg-sky-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <IconArrow className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-[15px] text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-extrabold text-ink text-base sm:text-lg">{t.askMore}</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.hours}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line btn-sm"
            >
              <IconChat className="w-4 h-4" />
              {t.chatLine}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm bg-[#25d366] hover:bg-[#20bd5a] text-white border-0 gap-1.5"
            >
              <IconWhatsApp className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
