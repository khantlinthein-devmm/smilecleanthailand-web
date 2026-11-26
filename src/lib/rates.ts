// Detailed price lists shown on the Condo Cleaning and Weekly Cleaning pages
// (from the Smile Clean condo and weekly price proposals). Change prices here.
import type { Locale } from "@/lib/site";

type L10n = Record<Locale, string>;

/** Condo promo shown next to the normal price (same -10% as the rest of the site). */
export const CONDO_PROMO = 0.1;

export const CONDO_RATES: { id: "general" | "deep"; name: L10n; price: number; hours: number; overtime: number }[] = [
  {
    id: "general",
    name: { en: "General Cleaning", th: "ทำความสะอาดทั่วไป", my: "ပုံမှန် သန့်ရှင်းရေး", zh: "日常清洁", ru: "Стандартная уборка" },
    price: 1000,
    hours: 3,
    overtime: 150,
  },
  {
    id: "deep",
    name: { en: "Deep Cleaning", th: "บิ๊กคลีนนิ่ง", my: "အသေးစိတ် သန့်ရှင်းရေး", zh: "深度清洁", ru: "Генеральная уборка" },
    price: 1400,
    hours: 5,
    overtime: 200,
  },
];
export const CONDO_SIZE = "25–50";

export const condoPromoPrice = (price: number) => Math.round(price * (1 - CONDO_PROMO));

export const WEEKLY_MIN_HOURS = 3;
/** Saved when 2 cleaners are booked together for the same 3-hour visit. */
export const WEEKLY_PAIR_DISCOUNT = 30;

export const WEEKLY_RATES: { id: "condo" | "office" | "gym" | "restaurant"; name: L10n; hourly: number }[] = [
  { id: "condo", name: { en: "Condo", th: "คอนโด", my: "ကွန်ဒို", zh: "公寓", ru: "Кондо" }, hourly: 280 },
  { id: "office", name: { en: "Office", th: "ออฟฟิศ", my: "ရုံး", zh: "办公室", ru: "Офис" }, hourly: 300 },
  { id: "gym", name: { en: "Gym", th: "ยิม / ฟิตเนส", my: "အားကစားရုံ (Gym)", zh: "健身房", ru: "Спортзал" }, hourly: 330 },
  { id: "restaurant", name: { en: "Restaurant", th: "ร้านอาหาร", my: "စားသောက်ဆိုင်", zh: "餐厅", ru: "Ресторан" }, hourly: 350 },
];

export const weeklyOneCleaner = (hourly: number) => hourly * WEEKLY_MIN_HOURS;
export const weeklyTwoCleaners = (hourly: number) => hourly * WEEKLY_MIN_HOURS * 2 - WEEKLY_PAIR_DISCOUNT;
/** Visit price for any number of hours (≥ 3): extra hours are at the standard rate per cleaner. */
export const weeklyVisitPrice = (hourly: number, cleaners: 1 | 2, hours: number) =>
  hourly * hours * cleaners - (cleaners === 2 ? WEEKLY_PAIR_DISCOUNT : 0);

/** Choices offered in the booking form. */
export const CONDO_EXTRA_HOURS = [0, 1, 2, 3];
export const WEEKLY_HOUR_CHOICES = [3, 4, 5, 6];

/** Transportation fee by Google Maps driving distance from the Smile Clean base. */
export const TRANSPORT_FEES: { range: string; fee: number }[] = [
  { range: "0–8 km", fee: 0 },
  { range: "8–10 km", fee: 70 },
  { range: "10–12 km", fee: 140 },
  { range: "12–14 km", fee: 210 },
  { range: "14–15 km", fee: 280 },
];
export const MAX_DISTANCE_KM = 15;

export const WEEKLY_SCOPE: Record<"condo" | "office" | "gym" | "restaurant", Record<Locale, string[]>> = {
  condo: {
    en: ["Sweeping and mopping floors", "Dusting furniture and accessible surfaces", "Cleaning bathrooms and toilets", "Wiping kitchen counters and exterior surfaces", "Emptying rubbish bins", "General tidying of agreed areas"],
    th: ["กวาดและถูพื้น", "ปัดฝุ่นเฟอร์นิเจอร์และพื้นผิวที่เข้าถึงได้", "ทำความสะอาดห้องน้ำและสุขภัณฑ์", "เช็ดเคาน์เตอร์ครัวและพื้นผิวภายนอก", "เทถังขยะ", "จัดเก็บความเรียบร้อยในพื้นที่ที่ตกลงกัน"],
    my: ["ကြမ်းပြင် တံမြက်လှည်းခြင်းနှင့် ကြမ်းတိုက်ခြင်း", "ပရိဘောဂနှင့် လက်လှမ်းမီသော မျက်နှာပြင်များ ဖုန်သုတ်ခြင်း", "ရေချိုးခန်းနှင့် အိမ်သာ သန့်ရှင်းရေး", "မီးဖိုချောင် ကောင်တာနှင့် အပြင်ဘက် မျက်နှာပြင်များ သုတ်ခြင်း", "အမှိုက်ပုံး သွန်ခြင်း", "သဘောတူထားသော နေရာများ စနစ်တကျ ရှင်းလင်းခြင်း"],
    zh: ["扫地和拖地", "家具及可触及表面除尘", "清洁浴室和马桶", "擦拭厨房台面及外表面", "倾倒垃圾桶", "整理约定区域"],
    ru: ["Подметание и мытьё полов", "Удаление пыли с мебели и доступных поверхностей", "Уборка ванных комнат и туалетов", "Протирка кухонных столешниц и внешних поверхностей", "Вынос мусора", "Общий порядок в согласованных зонах"],
  },
  office: {
    en: ["Cleaning desks and accessible surfaces", "Sweeping and mopping floors", "Cleaning meeting rooms and common areas", "Cleaning pantry and kitchen surfaces", "Cleaning toilets and washrooms", "Emptying rubbish bins"],
    th: ["ทำความสะอาดโต๊ะทำงานและพื้นผิวที่เข้าถึงได้", "กวาดและถูพื้น", "ทำความสะอาดห้องประชุมและพื้นที่ส่วนกลาง", "ทำความสะอาดแพนทรีและพื้นผิวในครัว", "ทำความสะอาดห้องน้ำ", "เทถังขยะ"],
    my: ["စားပွဲနှင့် လက်လှမ်းမီသော မျက်နှာပြင်များ သန့်ရှင်းရေး", "ကြမ်းပြင် တံမြက်လှည်းခြင်းနှင့် ကြမ်းတိုက်ခြင်း", "အစည်းအဝေးခန်းနှင့် ဘုံနေရာများ သန့်ရှင်းရေး", "Pantry နှင့် မီးဖိုချောင် မျက်နှာပြင်များ သန့်ရှင်းရေး", "အိမ်သာနှင့် လက်ဆေးခန်း သန့်ရှင်းရေး", "အမှိုက်ပုံး သွန်ခြင်း"],
    zh: ["清洁办公桌及可触及表面", "扫地和拖地", "清洁会议室和公共区域", "清洁茶水间及厨房表面", "清洁卫生间和洗手间", "倾倒垃圾桶"],
    ru: ["Уборка рабочих столов и доступных поверхностей", "Подметание и мытьё полов", "Уборка переговорных и общих зон", "Уборка кухни и зоны приёма пищи", "Уборка туалетов и санузлов", "Вынос мусора"],
  },
  gym: {
    en: ["Sweeping and mopping floors", "Wiping accessible fitness equipment surfaces", "Cleaning mirrors and glass surfaces", "Cleaning changing rooms and toilets", "Disinfecting agreed high-touch areas", "Emptying rubbish bins"],
    th: ["กวาดและถูพื้น", "เช็ดพื้นผิวอุปกรณ์ออกกำลังกายที่เข้าถึงได้", "ทำความสะอาดกระจกและพื้นผิวกระจก", "ทำความสะอาดห้องเปลี่ยนเสื้อผ้าและห้องน้ำ", "ฆ่าเชื้อจุดสัมผัสบ่อยตามที่ตกลงกัน", "เทถังขยะ"],
    my: ["ကြမ်းပြင် တံမြက်လှည်းခြင်းနှင့် ကြမ်းတိုက်ခြင်း", "လက်လှမ်းမီသော လေ့ကျင့်ခန်းကိရိယာ မျက်နှာပြင်များ သုတ်ခြင်း", "မှန်နှင့် ဖန်မျက်နှာပြင်များ သန့်ရှင်းရေး", "အဝတ်လဲခန်းနှင့် အိမ်သာ သန့်ရှင်းရေး", "သဘောတူထားသော မကြာခဏ ထိတွေ့သည့်နေရာများ ပိုးသတ်ခြင်း", "အမှိုက်ပုံး သွန်ခြင်း"],
    zh: ["扫地和拖地", "擦拭可触及的健身器材表面", "清洁镜子和玻璃表面", "清洁更衣室和卫生间", "对约定的高频接触区域消毒", "倾倒垃圾桶"],
    ru: ["Подметание и мытьё полов", "Протирка доступных поверхностей тренажёров", "Мытьё зеркал и стеклянных поверхностей", "Уборка раздевалок и туалетов", "Дезинфекция согласованных зон частого касания", "Вынос мусора"],
  },
  restaurant: {
    en: ["Sweeping and mopping floors", "Wiping dining tables and chairs", "Cleaning customer areas", "Cleaning accessible kitchen surfaces", "Cleaning toilets and washrooms", "Emptying rubbish bins"],
    th: ["กวาดและถูพื้น", "เช็ดโต๊ะและเก้าอี้รับประทานอาหาร", "ทำความสะอาดพื้นที่ลูกค้า", "ทำความสะอาดพื้นผิวในครัวที่เข้าถึงได้", "ทำความสะอาดห้องน้ำ", "เทถังขยะ"],
    my: ["ကြမ်းပြင် တံမြက်လှည်းခြင်းနှင့် ကြမ်းတိုက်ခြင်း", "စားပွဲနှင့် ထိုင်ခုံများ သုတ်ခြင်း", "ဧည့်သည်ထိုင်သည့်နေရာများ သန့်ရှင်းရေး", "လက်လှမ်းမီသော မီးဖိုချောင် မျက်နှာပြင်များ သန့်ရှင်းရေး", "အိမ်သာနှင့် လက်ဆေးခန်း သန့်ရှင်းရေး", "အမှိုက်ပုံး သွန်ခြင်း"],
    zh: ["扫地和拖地", "擦拭餐桌和椅子", "清洁顾客区域", "清洁可触及的厨房表面", "清洁卫生间和洗手间", "倾倒垃圾桶"],
    ru: ["Подметание и мытьё полов", "Протирка обеденных столов и стульев", "Уборка зала для гостей", "Уборка доступных кухонных поверхностей", "Уборка туалетов и санузлов", "Вынос мусора"],
  },
};

/** UI text for the rate tables. {n}, {fee}, {km} and {save} are filled in by the component. */
export const RATE_TEXT: Record<
  Locale,
  {
    priceList: string;
    condoTitle: string;
    condoSubtitle: string;
    service: string;
    size: string;
    pricePerVisit: string;
    standardHours: string;
    upToHours: string;
    overtimeTitle: string;
    overtimeSubtitle: string;
    extraCharge: string;
    perHour: string;
    sqm: string;
    promo: string;
    notesTitle: string;
    condoNotes: string[];
    weeklyTitle: string;
    weeklySubtitle: string;
    oneCleaner: string;
    twoCleaners: string;
    twoCleanersSubtitle: string;
    type: string;
    ratePerHour: string;
    minimum: string;
    hours: string;
    standardForTwo: string;
    specialPrice: string;
    youSave: string;
    weeklyNotes: string[];
    examplesTitle: string;
    examplesSubtitle: string;
    distance: string;
    benefitsTitle: string;
    benefits: string[];
    scopeTitle: string;
    restaurantExtra: string;
    transportTitle: string;
    transportSubtitle: string;
    transportFee: string;
    free: string;
    outsideArea: string;
    transportNotes: string[];
    transportPerVisit: string[];
    bkPackage: string;
    bkExtraHours: string;
    bkNone: string;
    bkPlaceType: string;
    bkCleaners: string;
    bkCleaner: string;
    bkHoursPerVisit: string;
    bkEstimate: string;
    bkPerVisit: string;
    bkExtraAfter: string;
    bkSpecial: string;
    bkEstimateNote: string;
    bkLargeCondo: string;
  }
> = {
  en: {
    priceList: "Price list",
    condoTitle: "Condo cleaning rates",
    condoSubtitle: "One-time cleaning for condos of 25–50 sq.m. All equipment and cleaning supplies included.",
    service: "Service",
    size: "Condo size",
    pricePerVisit: "Price / visit",
    standardHours: "Standard hours",
    upToHours: "Up to {n} hours",
    overtimeTitle: "Additional working hours",
    overtimeSubtitle: "If the cleaning takes longer than the standard hours, extra time is charged per hour.",
    extraCharge: "Additional charge",
    perHour: "/ hour",
    sqm: "sq.m.",
    promo: "Promo",
    notesTitle: "Notes and conditions",
    condoNotes: [
      "Prices are for one-time cleaning services.",
      "Additional working hours are charged at the hourly rate above.",
      "Transportation fees apply according to the distance table.",
      "Condos larger than 50 sq.m. need a separate quotation.",
      "Additional services or special cleaning requests may cost extra.",
    ],
    weeklyTitle: "Weekly cleaning rates",
    weeklySubtitle: "Charged per cleaner per hour, with a 3-hour minimum per visit. Equipment and supplies included.",
    oneCleaner: "Standard rate – 1 cleaner",
    twoCleaners: "Special rate – 2 cleaners",
    twoCleanersSubtitle: "Book 2 cleaners together for the same 3-hour visit and save ฿{save}.",
    type: "Type",
    ratePerHour: "Rate / cleaner / hour",
    minimum: "Minimum",
    hours: "{n} hours",
    standardForTwo: "Standard price for 2",
    specialPrice: "Special price / visit",
    youSave: "You save",
    weeklyNotes: [
      "Prices are calculated per cleaner per hour.",
      "Minimum booking is 3 hours per cleaner per visit.",
      "The 2-cleaner special rate applies when both cleaners work the same 3-hour visit.",
      "Additional hours are charged at the standard hourly rate per cleaner.",
      "Additional cleaners are charged at the standard rate unless another package is agreed.",
      "Cleaning equipment and supplies are included, according to the agreed scope.",
      "Deep cleaning and specialised cleaning are quoted separately.",
      "The 2-cleaner rate is a promotional package and may change.",
    ],
    examplesTitle: "Total price per visit (3 hours, including transport)",
    examplesSubtitle: "The transportation fee is added once per visit, whatever the number of cleaners.",
    distance: "Distance",
    benefitsTitle: "Weekly booking benefits",
    benefits: [
      "Special rate when you book 2 cleaners together",
      "A consistent weekly cleaning schedule",
      "The same cleaning team whenever scheduling allows",
      "Equipment and supplies included in the agreed scope",
      "Priority scheduling for regular customers",
      "A clear scope and cleaning checklist for each location",
    ],
    scopeTitle: "What's included",
    restaurantExtra: "Heavy grease removal, hood cleaning, machine scrubbing, deep cleaning and other specialised work are quoted separately.",
    transportTitle: "Transportation fee",
    transportSubtitle: "Based on Google Maps driving distance from the Smile Clean base.",
    transportFee: "Transportation fee",
    free: "Free",
    outsideArea: "Outside service area",
    transportNotes: ["Free transportation within 8 km.", "Maximum service distance is 15 km."],
    transportPerVisit: [
      "Charged once per visit, not per cleaner.",
      "Parking fees and expressway tolls are charged separately at actual cost.",
    ],
    bkPackage: "Cleaning type",
    bkExtraHours: "Extra hours",
    bkNone: "None",
    bkPlaceType: "Type of place",
    bkCleaners: "Number of cleaners",
    bkCleaner: "{n} cleaner(s)",
    bkHoursPerVisit: "Hours per visit",
    bkEstimate: "Estimated price",
    bkPerVisit: "/ visit",
    bkExtraAfter: "then +฿{n} / hour",
    bkSpecial: "Special −฿{n}",
    bkEstimateNote: "Plus transportation fee by distance (free within 8 km). Our team confirms the final price before the visit.",
    bkLargeCondo: "Condo larger than 50 sq.m.? Tell us the size and we'll send a separate quote.",
  },
  th: {
    priceList: "ตารางราคา",
    condoTitle: "อัตราค่าบริการทำความสะอาดคอนโด",
    condoSubtitle: "บริการทำความสะอาดครั้งเดียว สำหรับคอนโดขนาด 25–50 ตร.ม. พร้อมอุปกรณ์และน้ำยาครบชุด",
    service: "บริการ",
    size: "ขนาดห้อง",
    pricePerVisit: "ราคา / ครั้ง",
    standardHours: "ชั่วโมงมาตรฐาน",
    upToHours: "ไม่เกิน {n} ชั่วโมง",
    overtimeTitle: "ชั่วโมงทำงานเพิ่มเติม",
    overtimeSubtitle: "หากใช้เวลาเกินชั่วโมงมาตรฐาน จะคิดค่าบริการเพิ่มเป็นรายชั่วโมง",
    extraCharge: "ค่าบริการเพิ่ม",
    perHour: "/ ชั่วโมง",
    sqm: "ตร.ม.",
    promo: "โปร",
    notesTitle: "หมายเหตุและเงื่อนไข",
    condoNotes: [
      "ราคานี้สำหรับบริการทำความสะอาดครั้งเดียว",
      "ชั่วโมงที่เกินคิดตามอัตรารายชั่วโมงด้านบน",
      "ค่าเดินทางคิดตามตารางระยะทาง",
      "คอนโดที่ใหญ่กว่า 50 ตร.ม. ต้องประเมินราคาแยก",
      "บริการเสริมหรือความต้องการพิเศษอาจมีค่าใช้จ่ายเพิ่ม",
    ],
    weeklyTitle: "อัตราค่าบริการแม่บ้านรายสัปดาห์",
    weeklySubtitle: "คิดต่อแม่บ้านต่อชั่วโมง ขั้นต่ำ 3 ชั่วโมงต่อครั้ง พร้อมอุปกรณ์และน้ำยาครบชุด",
    oneCleaner: "ราคามาตรฐาน – แม่บ้าน 1 คน",
    twoCleaners: "ราคาพิเศษ – แม่บ้าน 2 คน",
    twoCleanersSubtitle: "จองแม่บ้าน 2 คนพร้อมกันในรอบ 3 ชั่วโมงเดียวกัน ประหยัด ฿{save}",
    type: "ประเภท",
    ratePerHour: "ราคา / คน / ชั่วโมง",
    minimum: "ขั้นต่ำ",
    hours: "{n} ชั่วโมง",
    standardForTwo: "ราคาปกติ 2 คน",
    specialPrice: "ราคาพิเศษ / ครั้ง",
    youSave: "ประหยัด",
    weeklyNotes: [
      "คิดราคาต่อแม่บ้านต่อชั่วโมง",
      "จองขั้นต่ำ 3 ชั่วโมงต่อแม่บ้านต่อครั้ง",
      "ราคาพิเศษ 2 คน ใช้เมื่อแม่บ้านทั้งสองทำงานในรอบ 3 ชั่วโมงเดียวกัน",
      "ชั่วโมงที่เพิ่มคิดตามอัตรามาตรฐานต่อแม่บ้านต่อชั่วโมง",
      "แม่บ้านเพิ่มเติมคิดตามอัตรามาตรฐาน เว้นแต่ตกลงแพ็กเกจอื่น",
      "รวมอุปกรณ์และน้ำยาทำความสะอาดตามขอบเขตงานที่ตกลง",
      "บิ๊กคลีนนิ่งและงานทำความสะอาดเฉพาะทางประเมินราคาแยก",
      "ราคาพิเศษ 2 คนเป็นราคาโปรโมชั่น อาจมีการเปลี่ยนแปลง",
    ],
    examplesTitle: "ราคารวมต่อครั้ง (3 ชั่วโมง รวมค่าเดินทาง)",
    examplesSubtitle: "ค่าเดินทางคิดครั้งเดียวต่อการเข้าบริการ ไม่ว่าจะมีแม่บ้านกี่คน",
    distance: "ระยะทาง",
    benefitsTitle: "สิทธิประโยชน์การจองรายสัปดาห์",
    benefits: [
      "ราคาพิเศษเมื่อจองแม่บ้าน 2 คนพร้อมกัน",
      "ตารางทำความสะอาดรายสัปดาห์ที่สม่ำเสมอ",
      "ทีมแม่บ้านชุดเดิมเมื่อตารางเอื้ออำนวย",
      "รวมอุปกรณ์และน้ำยาตามขอบเขตงานที่ตกลง",
      "ลูกค้าประจำได้สิทธิ์จัดคิวก่อน",
      "ขอบเขตงานและเช็กลิสต์ชัดเจนสำหรับแต่ละสถานที่",
    ],
    scopeTitle: "ขอบเขตงาน",
    restaurantExtra: "งานขจัดคราบไขมันหนัก ล้างฮูดดูดควัน ขัดพื้นด้วยเครื่อง บิ๊กคลีนนิ่ง และงานเฉพาะทางอื่นๆ ประเมินราคาแยก",
    transportTitle: "ค่าเดินทาง",
    transportSubtitle: "คิดตามระยะทางขับรถใน Google Maps จากจุดตั้งต้นของ Smile Clean",
    transportFee: "ค่าเดินทาง",
    free: "ฟรี",
    outsideArea: "นอกพื้นที่ให้บริการ",
    transportNotes: ["ฟรีค่าเดินทางภายใน 8 กม.", "ระยะให้บริการสูงสุด 15 กม."],
    transportPerVisit: ["คิดครั้งเดียวต่อการเข้าบริการ ไม่ใช่ต่อแม่บ้าน", "ค่าจอดรถและค่าทางด่วนคิดตามจริงแยกต่างหาก"],
    bkPackage: "ประเภทการทำความสะอาด",
    bkExtraHours: "ชั่วโมงเพิ่มเติม",
    bkNone: "ไม่เพิ่ม",
    bkPlaceType: "ประเภทสถานที่",
    bkCleaners: "จำนวนแม่บ้าน",
    bkCleaner: "แม่บ้าน {n} คน",
    bkHoursPerVisit: "จำนวนชั่วโมงต่อครั้ง",
    bkEstimate: "ราคาประเมิน",
    bkPerVisit: "/ ครั้ง",
    bkExtraAfter: "เกินคิด +฿{n} / ชั่วโมง",
    bkSpecial: "ราคาพิเศษ −฿{n}",
    bkEstimateNote: "ยังไม่รวมค่าเดินทางตามระยะทาง (ฟรีภายใน 8 กม.) ทีมงานจะยืนยันราคาสุดท้ายก่อนเข้าบริการ",
    bkLargeCondo: "คอนโดใหญ่กว่า 50 ตร.ม.? แจ้งขนาดห้อง เราจะประเมินราคาแยกให้",
  },
  my: {
    priceList: "ဈေးနှုန်းဇယား",
    condoTitle: "ကွန်ဒို သန့်ရှင်းရေး ဈေးနှုန်းများ",
    condoSubtitle: "၂၅–၅၀ စတုရန်းမီတာ ကွန်ဒိုများအတွက် တစ်ကြိမ်တည်း သန့်ရှင်းရေး။ ကိရိယာနှင့် သန့်ရှင်းရေးပစ္စည်း အားလုံး ပါဝင်ပါသည်။",
    service: "ဝန်ဆောင်မှု",
    size: "အခန်းအရွယ်",
    pricePerVisit: "ဈေး / တစ်ကြိမ်",
    standardHours: "စံ အချိန်",
    upToHours: "{n} နာရီအထိ",
    overtimeTitle: "အပို လုပ်ချိန်",
    overtimeSubtitle: "စံအချိန်ထက် ကျော်လွန်ပါက တစ်နာရီလျှင် အပိုကြေး ကောက်ခံပါသည်။",
    extraCharge: "အပိုကြေး",
    perHour: "/ နာရီ",
    sqm: "စတုရန်းမီတာ",
    promo: "Promo",
    notesTitle: "မှတ်ချက်နှင့် စည်းကမ်းချက်များ",
    condoNotes: [
      "ဤဈေးနှုန်းများသည် တစ်ကြိမ်တည်း သန့်ရှင်းရေး ဝန်ဆောင်မှုအတွက် ဖြစ်ပါသည်။",
      "အပိုနာရီများကို အထက်ပါ တစ်နာရီဈေးဖြင့် တွက်ပါသည်။",
      "ခရီးစရိတ်ကို အကွာအဝေးဇယားအတိုင်း ကောက်ခံပါသည်။",
      "၅၀ စတုရန်းမီတာထက် ကြီးသော ကွန်ဒိုများအတွက် သီးခြား ဈေးနှုန်းတွက်ပေးပါမည်။",
      "အပိုဝန်ဆောင်မှု သို့မဟုတ် အထူးလိုအပ်ချက်များအတွက် အပိုကုန်ကျနိုင်ပါသည်။",
    ],
    weeklyTitle: "အပတ်စဉ် သန့်ရှင်းရေး ဈေးနှုန်းများ",
    weeklySubtitle: "ဝန်ထမ်းတစ်ဦး တစ်နာရီနှုန်းဖြင့် တွက်ပြီး တစ်ကြိမ်လျှင် အနည်းဆုံး ၃ နာရီ။ ကိရိယာနှင့် ပစ္စည်းများ ပါဝင်ပါသည်။",
    oneCleaner: "စံဈေး – ဝန်ထမ်း ၁ ဦး",
    twoCleaners: "အထူးဈေး – ဝန်ထမ်း ၂ ဦး",
    twoCleanersSubtitle: "တူညီသော ၃ နာရီ အလုပ်အတွက် ဝန်ထမ်း ၂ ဦး တစ်ပြိုင်နက် မှာယူပါက ฿{save} သက်သာပါသည်။",
    type: "အမျိုးအစား",
    ratePerHour: "ဈေး / ဝန်ထမ်း / နာရီ",
    minimum: "အနည်းဆုံး",
    hours: "{n} နာရီ",
    standardForTwo: "၂ ဦး ပုံမှန်ဈေး",
    specialPrice: "အထူးဈေး / တစ်ကြိမ်",
    youSave: "သက်သာငွေ",
    weeklyNotes: [
      "ဈေးနှုန်းကို ဝန်ထမ်းတစ်ဦး တစ်နာရီနှုန်းဖြင့် တွက်ပါသည်။",
      "တစ်ကြိမ်လျှင် ဝန်ထမ်းတစ်ဦးကို အနည်းဆုံး ၃ နာရီ မှာယူရပါမည်။",
      "ဝန်ထမ်း ၂ ဦး အထူးဈေးသည် နှစ်ဦးစလုံး တူညီသော ၃ နာရီ အချိန်တွင် အလုပ်လုပ်မှသာ သက်ဆိုင်ပါသည်။",
      "အပိုနာရီများကို ဝန်ထမ်းတစ်ဦးချင်း စံ တစ်နာရီဈေးဖြင့် တွက်ပါသည်။",
      "အခြား package သဘောမတူထားပါက ထပ်တိုး ဝန်ထမ်းများကို စံဈေးဖြင့် တွက်ပါသည်။",
      "သဘောတူထားသော အလုပ်နယ်ပယ်အတိုင်း သန့်ရှင်းရေး ကိရိယာနှင့် ပစ္စည်းများ ပါဝင်ပါသည်။",
      "အသေးစိတ် သန့်ရှင်းရေးနှင့် အထူး သန့်ရှင်းရေး လုပ်ငန်းများကို သီးခြား ဈေးတွက်ပါသည်။",
      "ဝန်ထမ်း ၂ ဦး ဈေးသည် promotion ဈေးဖြစ်ပြီး ပြောင်းလဲနိုင်ပါသည်။",
    ],
    examplesTitle: "တစ်ကြိမ် စုစုပေါင်းဈေး (၃ နာရီ၊ ခရီးစရိတ်အပါ)",
    examplesSubtitle: "ဝန်ထမ်း ဘယ်နှဦးဖြစ်ဖြစ် ခရီးစရိတ်ကို တစ်ကြိမ်လျှင် တစ်ခါသာ ပေါင်းပါသည်။",
    distance: "အကွာအဝေး",
    benefitsTitle: "အပတ်စဉ် မှာယူခြင်း၏ အကျိုးကျေးဇူးများ",
    benefits: [
      "ဝန်ထမ်း ၂ ဦး တစ်ပြိုင်နက် မှာယူပါက အထူးဈေး",
      "ပုံမှန် အပတ်စဉ် သန့်ရှင်းရေး အချိန်ဇယား",
      "အချိန်ဇယား အဆင်ပြေသရွေ့ ဝန်ထမ်းအဖွဲ့ တစ်ဖွဲ့တည်း",
      "သဘောတူထားသော နယ်ပယ်အတွက် ကိရိယာနှင့် ပစ္စည်းများ ပါဝင်",
      "ပုံမှန်ဖောက်သည်များအတွက် ဦးစားပေး အချိန်ဇယား",
      "နေရာတစ်ခုချင်းစီအတွက် ရှင်းလင်းသော အလုပ်နယ်ပယ်နှင့် checklist",
    ],
    scopeTitle: "ပါဝင်သည့် အလုပ်များ",
    restaurantExtra: "အဆီကြီး ဖယ်ရှားခြင်း၊ hood သန့်ရှင်းရေး၊ စက်ဖြင့် ကြမ်းပွတ်ခြင်း၊ အသေးစိတ် သန့်ရှင်းရေးနှင့် အခြား အထူးလုပ်ငန်းများကို သီးခြား ဈေးတွက်ပါသည်။",
    transportTitle: "ခရီးစရိတ်",
    transportSubtitle: "Smile Clean ရုံးမှ Google Maps ကားမောင်း အကွာအဝေးဖြင့် တွက်ပါသည်။",
    transportFee: "ခရီးစရိတ်",
    free: "အခမဲ့",
    outsideArea: "ဝန်ဆောင်မှု နယ်ပယ်ပြင်ပ",
    transportNotes: ["၈ ကီလိုမီတာ အတွင်း ခရီးစရိတ် အခမဲ့။", "အများဆုံး ဝန်ဆောင်မှု အကွာအဝေး ၁၅ ကီလိုမီတာ။"],
    transportPerVisit: [
      "ဝန်ထမ်းတစ်ဦးချင်းမဟုတ်ဘဲ တစ်ကြိမ်လျှင် တစ်ခါသာ ကောက်ခံပါသည်။",
      "ကားပါကင်ခနှင့် အမြန်လမ်းခကို အမှန်တကယ်ကုန်ကျသလောက် သီးခြား ကောက်ခံပါသည်။",
    ],
    bkPackage: "သန့်ရှင်းရေး အမျိုးအစား",
    bkExtraHours: "အပို နာရီ",
    bkNone: "မထည့်ပါ",
    bkPlaceType: "နေရာ အမျိုးအစား",
    bkCleaners: "ဝန်ထမ်း အရေအတွက်",
    bkCleaner: "ဝန်ထမ်း {n} ဦး",
    bkHoursPerVisit: "တစ်ကြိမ်လျှင် နာရီ",
    bkEstimate: "ခန့်မှန်းဈေး",
    bkPerVisit: "/ တစ်ကြိမ်",
    bkExtraAfter: "ကျော်ပါက +฿{n} / နာရီ",
    bkSpecial: "အထူးဈေး −฿{n}",
    bkEstimateNote: "အကွာအဝေးအလိုက် ခရီးစရိတ် မပါသေးပါ (၈ ကီလိုမီတာအတွင်း အခမဲ့)။ နောက်ဆုံးဈေးကို ကျွန်ုပ်တို့အဖွဲ့က မလာမီ အတည်ပြုပေးပါမည်။",
    bkLargeCondo: "ကွန်ဒို ၅၀ စတုရန်းမီတာထက် ကြီးပါသလား? အရွယ်အစား ပြောပြပါ၊ သီးခြား ဈေးတွက်ပေးပါမည်။",
  },
  zh: {
    priceList: "价目表",
    condoTitle: "公寓清洁价格",
    condoSubtitle: "适用于 25–50 平米公寓的单次清洁服务，含全部工具和清洁用品。",
    service: "服务",
    size: "面积",
    pricePerVisit: "单次价格",
    standardHours: "标准时长",
    upToHours: "最长 {n} 小时",
    overtimeTitle: "超时费用",
    overtimeSubtitle: "如清洁时间超出标准时长，超出部分按小时收费。",
    extraCharge: "加收费用",
    perHour: "/ 小时",
    sqm: "平米",
    promo: "优惠",
    notesTitle: "备注与条款",
    condoNotes: [
      "以上价格适用于单次清洁服务。",
      "超出时长按上表小时费率收费。",
      "交通费按距离表收取。",
      "面积超过 50 平米的公寓需另行报价。",
      "附加服务或特殊清洁要求可能产生额外费用。",
    ],
    weeklyTitle: "每周保洁价格",
    weeklySubtitle: "按每位保洁员每小时计费，每次最少 3 小时，含工具和清洁用品。",
    oneCleaner: "标准价 – 1 位保洁员",
    twoCleaners: "优惠价 – 2 位保洁员",
    twoCleanersSubtitle: "同一次 3 小时服务同时预约 2 位保洁员，可省 ฿{save}。",
    type: "类型",
    ratePerHour: "每人每小时",
    minimum: "最少时长",
    hours: "{n} 小时",
    standardForTwo: "2 人标准价",
    specialPrice: "优惠价 / 次",
    youSave: "节省",
    weeklyNotes: [
      "价格按每位保洁员每小时计算。",
      "每位保洁员每次最少预约 3 小时。",
      "2 人优惠价适用于两位保洁员在同一次 3 小时内同时工作。",
      "超出时长按每位保洁员的标准小时费率收费。",
      "除另行约定套餐外，增加的保洁员按标准价收费。",
      "按约定的服务范围提供清洁工具和用品。",
      "深度清洁及专项清洁另行报价。",
      "2 人优惠价为促销套餐价，可能调整。",
    ],
    examplesTitle: "每次总价（3 小时，含交通费）",
    examplesSubtitle: "交通费每次只收一次，与保洁员人数无关。",
    distance: "距离",
    benefitsTitle: "每周预约的优势",
    benefits: [
      "同时预约 2 位保洁员享优惠价",
      "固定的每周清洁时间",
      "尽量安排同一清洁团队",
      "按约定范围含工具和清洁用品",
      "老客户优先排期",
      "每个地点都有清晰的服务范围和清洁清单",
    ],
    scopeTitle: "服务内容",
    restaurantExtra: "重油污清除、油烟罩清洗、机器洗地、深度清洁及其他专项工作另行报价。",
    transportTitle: "交通费",
    transportSubtitle: "按 Google 地图从 Smile Clean 出发点的驾车距离计算。",
    transportFee: "交通费",
    free: "免费",
    outsideArea: "超出服务范围",
    transportNotes: ["8 公里内免交通费。", "最远服务距离 15 公里。"],
    transportPerVisit: ["每次服务只收一次，不按人数计。", "停车费和高速公路费按实际费用另计。"],
    bkPackage: "清洁类型",
    bkExtraHours: "加时",
    bkNone: "不加时",
    bkPlaceType: "场所类型",
    bkCleaners: "保洁员人数",
    bkCleaner: "{n} 位保洁员",
    bkHoursPerVisit: "每次时长",
    bkEstimate: "预估价格",
    bkPerVisit: "/ 次",
    bkExtraAfter: "超时 +฿{n} / 小时",
    bkSpecial: "优惠 −฿{n}",
    bkEstimateNote: "另加按距离计算的交通费（8 公里内免费）。最终价格由我们的团队在上门前确认。",
    bkLargeCondo: "公寓超过 50 平米？告诉我们面积，我们另行报价。",
  },
  ru: {
    priceList: "Прайс-лист",
    condoTitle: "Цены на уборку кондо",
    condoSubtitle: "Разовая уборка кондо площадью 25–50 кв.м. Всё оборудование и средства включены.",
    service: "Услуга",
    size: "Площадь",
    pricePerVisit: "Цена / визит",
    standardHours: "Стандартное время",
    upToHours: "До {n} ч",
    overtimeTitle: "Дополнительные часы",
    overtimeSubtitle: "Если уборка занимает больше стандартного времени, дополнительные часы оплачиваются отдельно.",
    extraCharge: "Доплата",
    perHour: "/ час",
    sqm: "кв.м",
    promo: "Акция",
    notesTitle: "Примечания и условия",
    condoNotes: [
      "Цены указаны за разовую уборку.",
      "Дополнительные часы оплачиваются по почасовой ставке выше.",
      "Транспортный сбор — по таблице расстояний.",
      "Для кондо больше 50 кв.м расчёт делается отдельно.",
      "Дополнительные услуги и особые пожелания могут стоить дополнительно.",
    ],
    weeklyTitle: "Цены на еженедельную уборку",
    weeklySubtitle: "Оплата за клинера в час, минимум 3 часа за визит. Оборудование и средства включены.",
    oneCleaner: "Стандартная ставка – 1 клинер",
    twoCleaners: "Специальная цена – 2 клинера",
    twoCleanersSubtitle: "Закажите 2 клинеров на один 3-часовой визит и сэкономьте ฿{save}.",
    type: "Тип",
    ratePerHour: "Ставка / клинер / час",
    minimum: "Минимум",
    hours: "{n} ч",
    standardForTwo: "Обычная цена за 2",
    specialPrice: "Спеццена / визит",
    youSave: "Экономия",
    weeklyNotes: [
      "Цена рассчитывается за клинера в час.",
      "Минимальный заказ — 3 часа на клинера за визит.",
      "Спеццена за 2 клинеров действует, если оба работают в один и тот же 3-часовой визит.",
      "Дополнительные часы — по стандартной ставке за клинера.",
      "Дополнительные клинеры — по стандартной ставке, если не согласован другой пакет.",
      "Оборудование и средства включены в рамках согласованного объёма работ.",
      "Генеральная и специализированная уборка рассчитываются отдельно.",
      "Цена за 2 клинеров — акционная и может измениться.",
    ],
    examplesTitle: "Итоговая цена за визит (3 часа, с транспортом)",
    examplesSubtitle: "Транспортный сбор добавляется один раз за визит, независимо от числа клинеров.",
    distance: "Расстояние",
    benefitsTitle: "Преимущества еженедельной уборки",
    benefits: [
      "Спеццена при заказе 2 клинеров",
      "Стабильный еженедельный график",
      "Одна и та же команда, когда позволяет расписание",
      "Оборудование и средства в рамках согласованного объёма",
      "Приоритетная запись для постоянных клиентов",
      "Понятный объём работ и чек-лист для каждого объекта",
    ],
    scopeTitle: "Что входит",
    restaurantExtra: "Удаление сильных жировых загрязнений, чистка вытяжек, машинная мойка полов, генеральная и другая специализированная уборка рассчитываются отдельно.",
    transportTitle: "Транспортный сбор",
    transportSubtitle: "По расстоянию на машине в Google Maps от базы Smile Clean.",
    transportFee: "Транспортный сбор",
    free: "Бесплатно",
    outsideArea: "Вне зоны обслуживания",
    transportNotes: ["Бесплатно в пределах 8 км.", "Максимальное расстояние — 15 км."],
    transportPerVisit: [
      "Взимается один раз за визит, а не за каждого клинера.",
      "Парковка и платные дороги оплачиваются отдельно по факту.",
    ],
    bkPackage: "Тип уборки",
    bkExtraHours: "Дополнительные часы",
    bkNone: "Без доп. часов",
    bkPlaceType: "Тип объекта",
    bkCleaners: "Количество клинеров",
    bkCleaner: "{n} клинер(а)",
    bkHoursPerVisit: "Часов за визит",
    bkEstimate: "Ориентировочная цена",
    bkPerVisit: "/ визит",
    bkExtraAfter: "далее +฿{n} / час",
    bkSpecial: "Спеццена −฿{n}",
    bkEstimateNote: "Плюс транспортный сбор по расстоянию (бесплатно до 8 км). Итоговую цену команда подтвердит до визита.",
    bkLargeCondo: "Кондо больше 50 кв.м? Укажите площадь — мы рассчитаем цену отдельно.",
  },
};
