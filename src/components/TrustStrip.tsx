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
    { title: "100% Vetted Cleaners", desc: "Full background check on all staff", icon: "shield" },
    { title: "Satisfaction Guarantee", desc: "Free re-clean within 24 hours", icon: "sparkle" },
    { title: "All Equipment Included", desc: "Professional gear & chemicals ready", icon: "check" },
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

const STYLES = {
  shield: {
    card: "border-sky-200/80 bg-gradient-to-br from-sky-50/70 via-white to-white hover:border-sky-400 hover:shadow-sky-500/10",
    iconBox: "bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/25 ring-4 ring-sky-100/60",
    icon: <IconShield className="w-5 h-5" />,
    titleHover: "group-hover:text-sky-700",
    indicator: "bg-sky-500",
  },
  sparkle: {
    card: "border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-white to-white hover:border-amber-400 hover:shadow-amber-500/10",
    iconBox: "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md shadow-amber-500/25 ring-4 ring-amber-100/60",
    icon: <IconSparkle className="w-5 h-5" />,
    titleHover: "group-hover:text-amber-700",
    indicator: "bg-amber-500",
  },
  check: {
    card: "border-cyan-200/80 bg-gradient-to-br from-cyan-50/70 via-white to-white hover:border-cyan-400 hover:shadow-cyan-500/10",
    iconBox: "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-md shadow-cyan-500/25 ring-4 ring-cyan-100/60",
    icon: <IconCheckCircle className="w-5 h-5" />,
    titleHover: "group-hover:text-cyan-700",
    indicator: "bg-cyan-500",
  },
  leaf: {
    card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-white hover:border-emerald-400 hover:shadow-emerald-500/10",
    iconBox: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/25 ring-4 ring-emerald-100/60",
    icon: <IconLeaf className="w-5 h-5" />,
    titleHover: "group-hover:text-emerald-700",
    indicator: "bg-emerald-500",
  },
};

export default function TrustStrip({ lang = "en" }: { lang: Locale }) {
  const list = BADGES[lang] || BADGES.en;

  return (
    <section className="py-8 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 border-b border-slate-200/80">
      <div className="container-x">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {list.map((item, idx) => {
            const s = STYLES[item.icon] || STYLES.shield;
            return (
              <div
                key={idx}
                className={`group relative overflow-hidden p-4 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3.5 ${s.card}`}
              >
                {/* Subtle top light sheen */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
                />

                {/* Elevated Glowing Icon */}
                <span
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 ${s.iconBox}`}
                >
                  {s.icon}
                </span>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.indicator} opacity-70 group-hover:opacity-100 transition-opacity`} />
                    <h4
                      className={`font-bold text-[13px] sm:text-sm text-ink leading-tight transition-colors duration-200 ${s.titleHover}`}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug pl-3">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
