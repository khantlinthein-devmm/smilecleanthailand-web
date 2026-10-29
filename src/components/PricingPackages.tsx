import Link from "next/link";
import { type Locale } from "@/lib/site";
import { IconCheck, IconSparkle, IconArrow } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type Package = {
  id: string;
  badge?: string;
  name: string;
  price: string;
  unit: string;
  desc: string;
  features: string[];
  isPopular?: boolean;
};

const PACKAGES: Record<Locale, { eyebrow: string; title: string; subtitle: string; bookBtn: string; popularBadge: string; items: Package[] }> = {
  th: {
    eyebrow: "ราคาโปร่งใส ไม่มีบวกเพิ่ม",
    title: "แพ็กเกจทำความสะอาดยอดนิยม",
    subtitle: "เลือกแพ็กเกจที่ตรงกับพื้นที่ของคุณ พร้อมอุปกรณ์และน้ำยาครบชุด",
    bookBtn: "จองแพ็กเกจนี้",
    popularBadge: "ยอดนิยม",
    items: [
      {
        id: "condo",
        name: "คอนโด / สตูดิโอ (Condo)",
        price: "฿600",
        unit: "/ ครั้ง",
        desc: "เหมาะสำหรับห้องพักขนาด 25 - 45 ตร.ม.",
        features: ["ทำความสะอาดห้องนอน & ห้องนั่งเล่น", "ล้างห้องน้ำและสุขภัณฑ์ฆ่าเชื้อ", "เช็ดทำความสะอาดระเบียงและเคาน์เตอร์ครัว", "แม่บ้านมืออาชีพ 1 ท่าน (2 - 2.5 ชม.)"],
      },
      {
        id: "deep-clean",
        name: "ดีพคลีนนิ่ง (Deep Clean)",
        price: "฿1,500",
        unit: "/ ครั้ง",
        desc: "ทำความสะอาดล้ำลึก ขจัดคราบฝังแน่นทุกซอกมุม",
        isPopular: true,
        features: ["ขัดคราบฝังแน่นห้องน้ำ ยาแนว และกระจก", "ดูดฝุ่นทำความสะอาดซอกมุมใต้เฟอร์นิเจอร์", "เช็ดตู้ ลิ้นชัก และจุดสัมผัสทั้งหมด", "ทีมงาน 2 ท่านพร้อมเครื่องมือเฉพาะทาง"],
      },
      {
        id: "house",
        name: "บ้านเดี่ยว / ทาวน์โฮม (House)",
        price: "฿1,200",
        unit: "/ ครั้ง",
        desc: "เหมาะสำหรับบ้าน 2-3 ชั้น หรือพื้นที่ 100+ ตร.ม.",
        features: ["ทำความสะอาดทุกชั้น ทุกห้องนอน ห้องน้ำ", "กวาด เช็ด ถู บันไดและระเบียง", "ทำความสะอาดคราบครัวและโซนรับแขก", "ทีมแม่บ้านพร้อมอุปกรณ์ครบชุด"],
      },
      {
        id: "move",
        name: "ย้ายเข้า-ออก (Move In / Out)",
        price: "฿2,000",
        unit: "/ ครั้ง",
        desc: "เตรียมบ้านให้พร้อมอยู่ หรือส่งมอบคืนเงินมัดจำ",
        features: ["ทำความสะอาดตู้เสื้อผ้า ลิ้นชัก ทุกชิ้น", "ขัดล้างระเบียง กระจก และพื้นผิวทั้งหมด", "อบโอโซนฆ่าเชื้อและดับกลิ่นอับ", "การันตีตรวจรับมอบห้องผ่าน 100%"],
      },
    ],
  },
  en: {
    eyebrow: "Transparent Pricing",
    title: "Popular Cleaning Packages",
    subtitle: "Choose the right package for your space. All supplies and equipment included.",
    bookBtn: "Book This Package",
    popularBadge: "Most Popular",
    items: [
      {
        id: "condo",
        name: "Condo / Studio",
        price: "฿600",
        unit: "/ clean",
        desc: "Perfect for studios & 1-bedroom units (25 - 45 sqm).",
        features: ["Bedroom & living room general clean", "Sanitised bathroom & shower glass", "Balcony sweep & kitchen counters wipe", "1 Pro cleaner (approx. 2 - 2.5 hrs)"],
      },
      {
        id: "deep-clean",
        name: "Deep Cleaning",
        price: "฿1,500",
        unit: "/ clean",
        desc: "Thorough deep scrub from top to bottom.",
        isPopular: true,
        features: ["Grout scrubbing & limescale removal", "Under furniture, skirting & blinds dusting", "Inside/outside cabinets & contact surfaces", "2-person team with heavy-duty gear"],
      },
      {
        id: "house",
        name: "Townhome / House",
        price: "฿1,200",
        unit: "/ clean",
        desc: "Ideal for 2-3 storey houses (100+ sqm).",
        features: ["All bedrooms, living areas & stairs", "Full kitchen degrease & bathroom scrub", "Window tracks, balconies & entryways", "Equipped pro team"],
      },
      {
        id: "move",
        name: "Move In / Out",
        price: "฿2,000",
        unit: "/ clean",
        desc: "Ensure deposit refund or fresh move-in standard.",
        features: ["Inside all cupboards, drawers & closets", "Full balcony, window glass & appliance deep wash", "Sanitisation & odour neutralisation", "100% handover inspection guarantee"],
      },
    ],
  },
  zh: {
    eyebrow: "价格透明 无隐形费用",
    title: "热门清洁套餐",
    subtitle: "根据您的户型挑选专属套餐，自带全套设备与清洁耗材。",
    bookBtn: "立即预订该套餐",
    popularBadge: "最受欢迎",
    items: [
      {
        id: "condo",
        name: "公寓 / 一居室 (Condo)",
        price: "฿600",
        unit: "/ 次",
        desc: "适合25 - 45平米单身公寓或一居室。",
        features: ["卧室及客厅全面除尘吸尘", "卫生间杀菌消毒及玻璃擦拭", "阳台清扫及厨房台面去污", "1位专业保洁员（约2 - 2.5小时）"],
      },
      {
        id: "deep-clean",
        name: "全屋深度清洁 (Deep Clean)",
        price: "฿1,500",
        unit: "/ 次",
        desc: "全方位深层去污，无死角彻底大扫除。",
        isPopular: true,
        features: ["瓷砖缝隙去垢及水垢清除", "家具底部、踢脚线及百叶窗细致除尘", "柜体内部及高频接触点彻底消毒", "2人双工团队配备重度专业设备"],
      },
      {
        id: "house",
        name: "联排 / 独栋别墅 (House)",
        price: "฿1,200",
        unit: "/ 次",
        desc: "适合100平米以上多层别墅住宅。",
        features: ["所有卧室、客厅、楼梯及过道", "厨房重油污清理及全套卫生间深度洗刷", "窗槽、阳台及入户门清扫", "专业清洁团队自带设备"],
      },
      {
        id: "move",
        name: "退租 / 入住保洁 (Move In/Out)",
        price: "฿2,000",
        unit: "/ 次",
        desc: "确保顺利退还押金或安心入住新房。",
        features: ["所有衣柜、抽屉内外彻底擦净", "全屋门窗玻璃及阳台全方位清洗", "臭氧消毒及除味杀菌", "100% 验收达标承诺"],
      },
    ],
  },
  my: {
    eyebrow: "ပွင့်လင်းမြင်သာသော စျေးနှုန်း",
    title: "လူကြိုက်အများဆုံး သန့်ရှင်းရေး အစီအစဉ်များ",
    subtitle: "သင့်နေရာနှင့် သင့်တော်သော အစီအစဉ်ကို ရွေးချယ်ပါ၊ ပစ္စည်းအစုံအလင် ပါဝင်သည်။",
    bookBtn: "ယခု အစီအစဉ်ကို ရွေးပါ",
    popularBadge: "အထူးလူကြိုက်များ",
    items: [
      {
        id: "condo",
        name: "ကွန်ဒို / စတူဒီယို (Condo)",
        price: "฿600",
        unit: "/ ကြိမ်",
        desc: "၂၅ - ၄၅ စတုရန်းမီတာအတွက် အသင့်တော်ဆုံး။",
        features: ["အိပ်ခန်းနှင့် ဧည့်ခန်း အထွေထွေ သန့်ရှင်းရေး", "ရေချိုးခန်းနှင့် အိမ်သာ ပိုးသတ်သန့်စင်ခြင်း", "ဝရန်တာနှင့် မီးဖိုချောင် သန့်ရှင်းရေး", "ကျွမ်းကျင်ဝန်ထမ်း ၁ ဦး (၂ - ၂.၅ နာရီ)"],
      },
      {
        id: "deep-clean",
        name: "အသေးစိတ် သန့်ရှင်းရေး (Deep Clean)",
        price: "฿1,500",
        unit: "/ ကြိမ်",
        desc: "အညစ်အကြေးများကို အထူးသန့်စင်ပေးသော ဝန်ဆောင်မှု။",
        isPopular: true,
        features: ["ကြွေပြားကြားနှင့် ရေချိုးခန်း ဂျီးချွတ်ခြင်း", "ပရိဘောဂအောက်နှင့် နေရာလပ်များ သန့်ရှင်းခြင်း", "ဗီရိုနှင့် ထိတွေ့မျက်နှာပြင်များ ပိုးသတ်ခြင်း", "ဝန်ထမ်း ၂ ဦးပါ အထူးအဖွဲ့"],
      },
      {
        id: "house",
        name: "လုံးချင်းအိမ် / တိုက်ခန်း (House)",
        price: "฿1,200",
        unit: "/ ကြိမ်",
        desc: "အထပ်စုံအိမ်များ သို့မဟုတ် ၁၀၀+ စတုရန်းမီတာအတွက်။",
        features: ["အိပ်ခန်း၊ ဧည့်ခန်းနှင့် လှေကားအားလုံး", "မီးဖိုချောင်နှင့် ရေချိုးခန်း သန့်ရှင်းရေး", "ပြတင်းပေါက်နှင့် အဝင်ဝ သန့်ရှင်းရေး", "ပစ္စည်းအစုံအလင်ဖြင့် လာရောက်ပါမည်"],
      },
      {
        id: "move",
        name: "အိမ်ပြောင်း ဝင်/ထွက် (Move In/Out)",
        price: "฿2,000",
        unit: "/ ကြိမ်",
        desc: "စပေါ်ငွေ ပြန်ရရှိစေရန် သို့မဟုတ် အသစ်စက်စက် နေထိုင်ရန်။",
        features: ["ဗီရိုများနှင့် အံဆွဲများ အတွင်းအပြင်", "ပြတင်းပေါက် မှန်များနှင့် ဝရန်တာ ဆေးကြောခြင်း", "ပိုးသတ်ခြင်းနှင့် အနံ့ဆိုး ပျောက်စေခြင်း", "၁၀၀% စစ်ဆေးမှု အောင်မြင်စေရန် အာမခံသည်"],
      },
    ],
  },
  ru: {
    eyebrow: "Прозрачные цены без скрытых доплат",
    title: "Популярные тарифы на уборку",
    subtitle: "Выберите подходящий пакет для вашей квартиры или дома. Все средства включены.",
    bookBtn: "Забронировать тариф",
    popularBadge: "Популярный",
    items: [
      {
        id: "condo",
        name: "Кондо / Студия",
        price: "฿600",
        unit: "/ уборка",
        desc: "Для квартир площадью 25 - 45 кв.м.",
        features: ["Сухая и влажная уборка спальни и гостиной", "Дезинфекция санузла и душевой кабины", "Уборка балкона и кухонной зоны", "1 профессиональный клинер (2 - 2.5 ч)"],
      },
      {
        id: "deep-clean",
        name: "Генеральная уборка (Deep Clean)",
        price: "฿1,500",
        unit: "/ уборка",
        desc: "Глубокая очистка каждого сантиметра пространства.",
        isPopular: true,
        features: ["Удаление застарелого налёта и чистка межплиточных швов", "Очистка под мебелью, плинтусов и труднодоступных мест", "Мытьё фасадов шкафов и дезинфекция поверхностей", "Бригада из 2 человек со спецоборудованием"],
      },
      {
        id: "house",
        name: "Таунхаус / Дом",
        price: "฿1,200",
        unit: "/ уборка",
        desc: "Идеально для домов от 100 кв.м.",
        features: ["Все жилые комнаты, спальни и лестничные пролёты", "Обезжиривание кухонных поверхностей и мытьё санузлов", "Оконные рамы, балконы и входная зона", "Экипированная бригада клинеров"],
      },
      {
        id: "move",
        name: "При выезде / въезде (Move In/Out)",
        price: "฿2,000",
        unit: "/ уборка",
        desc: "100% гарантия возврата депозита от арендодателя.",
        features: ["Мытьё внутри всех шкафов и полок", "Мытьё балконов, оконных стёкол и техники", "Озонирование и устранение неприятных запахов", "Гарантия сдачи помещения владельцу"],
      },
    ],
  },
};

export default function PricingPackages({ lang = "en" }: { lang: Locale }) {
  const data = PACKAGES[lang] || PACKAGES.en;

  return (
    <section className="section bg-slate-50 border-b border-slate-200/80">
      <div className="container-x">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((pkg, idx) => (
            <Reveal key={pkg.id} delay={idx * 80}>
              <div
                className={`card relative flex flex-col h-full p-6 transition-all duration-300 hover:shadow-xl ${
                  pkg.isPopular
                    ? "border-2 border-sky-600 shadow-lg shadow-sky-600/10 ring-4 ring-sky-100"
                    : "border border-slate-200"
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md inline-flex items-center gap-1">
                    <IconSparkle className="w-3.5 h-3.5" />
                    {data.popularBadge}
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="font-bold text-lg text-ink">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{pkg.desc}</p>
                </div>

                <div className="my-3 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-sky-600 tracking-tight">{pkg.price}</span>
                    <span className="text-xs text-slate-500 font-medium">{pkg.unit}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 flex-1 my-4">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${lang}/booking?package=${pkg.id}`}
                  className={`mt-4 btn btn-sm w-full justify-center ${
                    pkg.isPopular ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {data.bookBtn} <IconArrow className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

