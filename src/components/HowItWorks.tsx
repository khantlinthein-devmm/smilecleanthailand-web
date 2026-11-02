import { LINE_URL, WHATSAPP_NUMBER, type Locale } from "@/lib/site";
import type { Dict } from "@/dictionaries";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconChat, IconCheckCircle, IconSparkle, IconWhatsApp, IconArrow } from "./icons";

const STEP_ICONS = [IconChat, IconCheckCircle, IconSparkle];

const STEP_FOOTERS: Record<Locale, [string, string, string]> = {
  th: ["แชตส่งรูปได้ 24 ชม.", "ราคาชัดเจน ไม่มีแอบแฝง", "รับประกันความสะอาด 100%"],
  en: ["Send photos 24/7 on LINE", "Transparent quote, no hidden fees", "100% Satisfaction Guarantee"],
  zh: ["24小时在线发送照片估价", "报价公开透明，无隐形消费", "100% 服务满意售后保障"],
  my: ["၂၄ နာရီ ဓာတ်ပုံပို့ မေးမြန်းနိုင်သည်", "ရှင်းလင်းသော ဈေးနှုန်း၊ အပိုကြေးမရှိ", "၁၀၀% စိတ်တိုင်းကျ အာမခံချက်"],
  ru: ["Отправка фото 24/7 в LINE", "Честная цена без доплат", "100% Гарантия чистоты"],
};

export default function HowItWorks({
  dict,
  lang,
  className = "",
}: {
  dict: Dict;
  lang?: Locale;
  className?: string;
}) {
  const h = dict.howItWorks;
  const resolvedLang: Locale =
    lang ||
    (h.eyebrow.includes("ขั้นตอน")
      ? "th"
      : h.eyebrow.includes("流程") || h.title.includes("三步")
        ? "zh"
        : h.eyebrow.includes("အဆင့်")
          ? "my"
          : h.eyebrow.includes("шаг") || h.title.includes("шага")
            ? "ru"
            : "en");
  const footers = STEP_FOOTERS[resolvedLang] || STEP_FOOTERS.en;

  return (
    <section className={`section bg-slate-50/70 border-b border-slate-200/80 ${className}`}>
      <div className="container-x">
        <SectionHeader
          eyebrow={h.eyebrow}
          title={h.title}
          subtitle={h.subtitle}
          action={
            <div className="flex items-center gap-2">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm">
                <IconChat className="w-4 h-4" /> {dict.mobileBar.line}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm bg-[#25d366] hover:bg-[#20bd5a] text-white border-0"
              >
                <IconWhatsApp className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          }
        />

        <div className="relative mt-12">
          {/* Subtle connecting line for desktop */}
          <div
            aria-hidden
            className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 border-t-2 border-dashed border-sky-200 -translate-y-8 z-0 pointer-events-none"
          />

          <ol className="relative z-10 grid md:grid-cols-3 gap-6">
            {h.steps.map((step, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <Reveal key={step.title} delay={i * 120}>
                  <li className="card p-7 h-full flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 rounded-2xl group">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center ring-4 ring-sky-50/60 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-500 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                          0{i + 1}
                        </span>
                      </div>

                      <div className="mt-6 font-bold text-lg text-ink group-hover:text-sky-700 transition-colors">
                        {step.title}
                      </div>
                      <p className="text-slate-600 mt-2.5 text-sm leading-relaxed">
                        {step.body}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-sky-600 group-hover:translate-x-1 transition-transform">
                      <span>{footers[i] || footers[0]}</span>
                      <IconArrow className="w-3.5 h-3.5" />
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
