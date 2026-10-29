import { IconCheckCircle, IconLeaf, IconShield, IconSparkle } from "./icons";
import type { Locale } from "@/lib/site";

const BADGES: Record<
  Locale,
  { title: string; desc: string; icon: "shield" | "sparkle" | "check" | "leaf" }[]
> = {
  th: [
    { title: "ตรวจประวัติแม่บ้าน 100%", desc: "ผ่านการคัดกรองประวัติอาชญากรรมทุกคน", icon: "shield" },
    { title: "รับประกันความพึงพอใจ", desc: "ไม่พอใจยินดีทำซ้ำฟรีภายใน 24 ชม.", icon: "sparkle" },
    { title: "อุปกรณ์ & น้ำยาครบ", desc: "พกพาอุปกรณ์มาตรฐานสากลพร้อมใช้งาน", icon: "check" },
    { title: "ปลอดภัยต่อเด็กและสัตว์เลี้ยง", desc: "ใช้น้ำยา Eco-Friendly ปลอดสารพิษ", icon: "leaf" },
  ],
  en: [
    { title: "100% Vetted Cleaners", desc: "Full criminal background check on all staff", icon: "shield" },
    { title: "Satisfaction Guarantee", desc: "Free re-clean within 24 hours if unsatisfied", icon: "sparkle" },
    { title: "All Equipment Included", desc: "Professional gear & chemicals provided", icon: "check" },
    { title: "Pet & Child Safe", desc: "Non-toxic, eco-friendly cleaning formulas", icon: "leaf" },
  ],
  zh: [
    { title: "100% 实名背景审核", desc: "全体员工均通过无犯罪记录背景调查", icon: "shield" },
    { title: "服务满意保证", desc: "24小时内若不满意免费安排重新清洁", icon: "sparkle" },
    { title: "自带全套专业设备", desc: "自备标准清洁工具及环保清洁剂", icon: "check" },
    { title: "母婴宠物安全级", desc: "采用天然环保无害清洁配方", icon: "leaf" },
  ],
  my: [
    { title: "၁၀၀% စိစစ်ပြီး ဝန်ထမ်းများ", desc: "ပြစ်မှုမှတ်တမ်း ကင်းရှင်းကြောင်း စစ်ဆေးပြီး", icon: "shield" },
    { title: "စိတ်တိုင်းကျ အာမခံချက်", desc: "မကျေနပ်ပါက ၂၄ နာရီအတွင်း အခမဲ့ ပြန်လည်သန့်ရှင်းပေးခြင်း", icon: "sparkle" },
    { title: "ပစ္စည်း အစုံအလင် ပါဝင်သည်", desc: "ပရော်ဖက်ရှင်နယ် သန့်ရှင်းရေးပစ္စည်းများ ယူဆောင်လာပါမည်", icon: "check" },
    { title: "ကလေးနှင့် အိမ်မွေးတိရစ္ဆာန် ဘေးကင်းသည်", desc: "အဆိပ်အတောက်ကင်းသော သဘာဝ သန့်ရှင်းရေးပစ္စည်းများ", icon: "leaf" },
  ],
  ru: [
    { title: "100% Проверенный персонал", desc: "Полная проверка каждого сотрудника на благонадёжность", icon: "shield" },
    { title: "Гарантия чистоты", desc: "Бесплатная доработка в течение 24 часов", icon: "sparkle" },
    { title: "Всё оборудование с собой", desc: "Профессиональный инвентарь и средства уборки", icon: "check" },
    { title: "Безопасно для детей и питомцев", desc: "Гипоаллергенные эко-средства премиум класса", icon: "leaf" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="group p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex items-center gap-3.5"
            >
              <span
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ring-4 transition-transform group-hover:scale-105 ${getBgStyle(
                  item.icon
                )}`}
              >
                {renderIcon(item.icon)}
              </span>
              <div className="min-w-0">
                <h4 className="font-bold text-[13px] sm:text-sm text-ink leading-tight truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug line-clamp-1">
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
