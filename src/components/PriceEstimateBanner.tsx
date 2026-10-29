import Link from "next/link";
import { LINE_URL, WHATSAPP_NUMBER, type Locale } from "@/lib/site";
import { IconChat, IconCalendar, IconWhatsApp, IconSparkle } from "./icons";
import Reveal from "./Reveal";

const TEXTS: Record<
  Locale,
  {
    badge: string;
    title: string;
    subtitle: string;
    lineBtn: string;
    waBtn: string;
    onlineBtn: string;
    formula: string;
  }
> = {
  th: {
    badge: "ราคาโปร่งใส · คิดตามพื้นที่จริง",
    title: "ประเมินราคาตามขนาดพื้นที่จริง (คิดตาม ตร.ม.)",
    subtitle: "หมดกังวลเรื่องราคาบวกเพิ่ม ถ่ายรูปห้องหรือแจ้งขนาด ตร.ม. เพื่อรับราคาประเมินชัดเจนได้ทันที ไม่มีค่าใช้จ่าย",
    lineBtn: "ส่งขนาดห้องประเมินราคาทาง LINE",
    waBtn: "WhatsApp",
    onlineBtn: "จองออนไลน์",
    formula: "ประเมินราคาตามขนาดตารางเมตรและประเภทที่พัก ไม่มีบวกเพิ่มหน้างาน",
  },
  en: {
    badge: "Transparent Pricing · Based on Actual Space",
    title: "Transparent Pricing Based on Your Space (Priced by Sqm)",
    subtitle: "No hidden fees. Simply send us room photos or your sqm size for an instant, transparent quote. Free of charge.",
    lineBtn: "Get Instant Quote on LINE",
    waBtn: "WhatsApp",
    onlineBtn: "Book Online",
    formula: "Tailored to your square metres and property type with no hidden fees.",
  },
  zh: {
    badge: "价格透明 · 按实际面积计费",
    title: "根据实际房屋面积估价（按平米计费）",
    subtitle: "拒绝隐形收费。发送房间照片或平米面积，即可免费获取精准透明报价，即时确认排期。",
    lineBtn: "通过 LINE 发送面积获取报价",
    waBtn: "WhatsApp 咨询",
    onlineBtn: "在线预订",
    formula: "根据实际平米面积及户型估价，绝无临时加价。",
  },
  my: {
    badge: "ပွင့်လင်းမြင်သာသော စျေးနှုန်း · အမှန်တကယ် အကျယ်အဝန်းအလိုက်",
    title: "အမှန်တကယ် အကျယ်အဝန်းအလိုက် စျေးနှုန်းတွက်ချက်ခြင်း",
    subtitle: "မလိုလားအပ်သော အပိုကုန်ကျစရိတ်မရှိပါ။ အခန်းဓာတ်ပုံ သို့မဟုတ် အကျယ်အဝန်း စတုရန်းမီတာကို ပို့ပေးရုံဖြင့် အခမဲ့ စျေးနှုန်းတွက်ချက်ပေးပါသည်။",
    lineBtn: "LINE ဖြင့် စျေးနှုန်းမေးမြန်းရန်",
    waBtn: "WhatsApp",
    onlineBtn: "အွန်လိုင်းမှ ဘိုကင်တင်ရန်",
    formula: "စတုရန်းမီတာနှင့် နေရာအလိုက် စျေးနှုန်းတွက်ချက်ပေးပါသည်။",
  },
  ru: {
    badge: "Прозрачные расценки · По реальной площади",
    title: "Прозрачный расчёт по реальной площади (кв.м)",
    subtitle: "Никаких скрытых платежей. Отправьте фото или укажите площадь в кв.м для быстрого и бесплатного расчёта стоимости.",
    lineBtn: "Узнать точную цену в LINE",
    waBtn: "WhatsApp",
    onlineBtn: "Онлайн-бронирование",
    formula: "Расчёт стоимости зависит от площади помещения и типа недвижимости.",
  },
};

export default function PriceEstimateBanner({ lang = "en" }: { lang: Locale }) {
  const t = TEXTS[lang] || TEXTS.en;

  return (
    <section className="py-8 bg-gradient-to-b from-white to-sky-50/50 border-b border-slate-200/70">
      <div className="container-x">
        <Reveal>
          <div className="rounded-3xl bg-white border-2 border-sky-600/30 shadow-xl shadow-sky-900/5 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Background accent */}
            <div
              aria-hidden
              className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-sky-100/60 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200/80 rounded-full px-3 py-1">
                  <IconSparkle className="w-3.5 h-3.5 text-sky-600" />
                  {t.badge}
                </span>

                <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  {t.title}
                </h3>

                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {t.subtitle}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  ℹ️ {t.formula}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line btn-md shadow-md shadow-emerald-600/15 justify-center"
                >
                  <IconChat className="w-5 h-5" />
                  {t.lineBtn}
                </a>

                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm flex-1 bg-[#25d366] hover:bg-[#20bd5a] text-white border-0 justify-center gap-1.5"
                  >
                    <IconWhatsApp className="w-4 h-4" />
                    {t.waBtn}
                  </a>

                  <Link
                    href={`/${lang}/booking`}
                    className="btn btn-primary btn-sm flex-1 justify-center gap-1.5"
                  >
                    <IconCalendar className="w-4 h-4" />
                    {t.onlineBtn}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
