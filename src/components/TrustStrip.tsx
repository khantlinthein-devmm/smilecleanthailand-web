import { IconCheckCircle, IconLeaf, IconShield, IconSparkle } from "./icons";
import type { Locale } from "@/lib/site";

const BADGES: Record<
  Locale,
  { title: string; desc: string; icon: "shield" | "sparkle" | "check" | "leaf" }[]
> = {
  th: [
    { title: "ตรวจประวัติแม่บ้าน 100%", desc: "เช็กประวัติอาชญากรรมทุกคน", icon: "shield" },
    { title: "รับประกันความพึงพอใจ", desc: "แก้งานฟรีใน 24 ชั่วโมง", icon: "sparkle" },
    { title: "อุปกรณ์ & น้ำยาครบ", desc: "พร้อมทำงาน ไม่ต้องเตรียมเอง", icon: "check" },
    { title: "ปลอดภัยต่อเด็กและสัตว์", desc: "น้ำยา Eco-Friendly ไร้สารพิษ", icon: "leaf" },
  ],
  en: [
    { title: "100% Vetted Cleaners", desc: "Full criminal background check", icon: "shield" },
    { title: "Satisfaction Guarantee", desc: "Free re-clean within 24 hours", icon: "sparkle" },
    { title: "All Equipment Included", desc: "Professional gear & products", icon: "check" },
    { title: "Pet & Child Safe", desc: "Non-toxic eco-friendly formulas", icon: "leaf" },
  ],
  zh: [
    { title: "100% 实名背景审核", desc: "通过无犯罪背景调查", icon: "shield" },
    { title: "服务满意保证", desc: "24小时内不满意免费重做", icon: "sparkle" },
    { title: "自带全套专业设备", desc: "自备标准工具及清洁剂", icon: "check" },
    { title: "母婴宠物安全级", desc: "天然环保无害配方", icon: "leaf" },
  ],
  my: [
    { title: "၁၀၀% စိစစ်ပြီး ဝန်ထမ်းများ", desc: "ပြစ်မှုမှတ်တမ်း ကင်းရှင်းပြီး", icon: "shield" },
    { title: "စိတ်တိုင်းကျ အာမခံချက်", desc: "၂၄ နာရီအတွင်း အခမဲ့ပြန်လုပ်ပေး", icon: "sparkle" },
    { title: "ပစ္စည်း အစုံအလင် ပါဝင်သည်", desc: "ပရော်ဖက်ရှင်နယ် ပစ္စည်းများပါဝင်", icon: "check" },
    { title: "ကလေးနှင့် အိမ်မွေးတိရစ္ဆာန် ဘေးကင်း", desc: "အဆိပ်အတောက်ကင်း သဘာဝပစ္စည်း", icon: "leaf" },
  ],
  ru: [
    { title: "100% Проверены", desc: "Проверка благонадёжности", icon: "shield" },
    { title: "Гарантия чистоты", desc: "Бесплатная переделка 24ч", icon: "sparkle" },
    { title: "Всё с собой", desc: "Профессиональный инвентарь", icon: "check" },
    { title: "Безопасно для детей", desc: "Эко-средства без токсинов", icon: "leaf" },
  ],
};

export default function TrustStrip({ lang = "en" }: { lang: Locale }) {
  const list = BADGES[lang] || BADGES.en;

  const renderIcon = (type: string) => {
    switch (type) {
      case "shield":
        return <IconShield className="w-5 h-5 text-sky-600" />;
      case "sparkle":
        return <IconSparkle className="w-5 h-5 text-amber-500" />;
      case "leaf":
        return <IconLeaf className="w-5 h-5 text-emerald-600" />;
      default:
        return <IconCheckCircle className="w-5 h-5 text-sky-600" />;
    }
  };

  const getBgStyle = (type: string) => {
    switch (type) {
      case "sparkle":
        return "bg-amber-50 ring-amber-100/80";
      case "leaf":
        return "bg-emerald-50 ring-emerald-100/80";
      default:
        return "bg-sky-50 ring-sky-100/80";
    }
  };

  return (
    <section className="py-7 bg-gradient-to-b from-slate-50/80 to-white border-b border-slate-200/80">
      <div className="container-x">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex items-center gap-3.5"
            >
              <span
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ring-4 transition-transform group-hover:scale-105 ${getBgStyle(
                  item.icon
                )}`}
              >
                {renderIcon(item.icon)}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-[13px] sm:text-sm text-ink leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
