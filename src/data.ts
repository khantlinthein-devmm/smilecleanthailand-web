export type Service = {
  slug: string;
  icon: string;
  en: { title: string; short: string; body: string[]; features: string[] };
  th: { title: string; short: string; body: string[]; features: string[] };
};

export const SERVICES: Service[] = [
  {
    slug: "house-cleaning",
    icon: "house",
    en: {
      title: "House Cleaning",
      short: "Regular and one-off house cleaning with all equipment included.",
      body: [
        "Our house cleaning keeps your whole home spotless — bedrooms, living areas, kitchen and bathrooms.",
        "Choose one-off, weekly or fortnightly visits and keep the same cleaner every time.",
      ],
      features: ["Hard surface cleaning", "Upholstery cleaning", "Carpet cleaning"],
    },
    th: {
      title: "ทำความสะอาดบ้าน",
      short: "ทำความสะอาดบ้านประจำและครั้งเดียว พร้อมอุปกรณ์ครบ",
      body: [
        "บริการทำความสะอาดบ้านทั้งหลัง ทั้งห้องนอน ห้องนั่งเล่น ห้องครัว และห้องน้ำ",
        "เลือกได้ทั้งครั้งเดียว รายสัปดาห์ หรือทุก 2 สัปดาห์ ได้แม่บ้านคนเดิมทุกครั้ง",
      ],
      features: ["ทำความสะอาดพื้นผิวแข็ง", "ทำความสะอาดโซฟา", "ทำความสะอาดพรม"],
    },
  },
  {
    slug: "condo-cleaning",
    icon: "condo",
    en: {
      title: "Condo Cleaning",
      short: "Condo deep and routine cleaning, perfect for Bangkok living.",
      body: [
        "Specialised condo cleaning for busy city life — fast, thorough and careful with your space.",
        "Ideal before moving in, after tenants, or for regular upkeep.",
      ],
      features: ["Carpet cleaning", "Tile and grout cleaning", "Hard surface floor cleaning"],
    },
    th: {
      title: "ทำความสะอาดคอนโด",
      short: "ทำความสะอาดคอนโดประจำและดีพคลีน เหมาะกับชีวิตในกรุงเทพฯ",
      body: [
        "บริการเฉพาะทางสำหรับคอนโด รวดเร็ว ละเอียด และระมัดระวัง",
        "เหมาะทั้งก่อนย้ายเข้า หลังผู้เช่าย้ายออก หรือดูแลประจำ",
      ],
      features: ["ทำความสะอาดพรม", "ขัดกระเบื้องและยาแนว", "ทำความสะอาดพื้นแข็ง"],
    },
  },
  {
    slug: "move-in-move-out",
    icon: "move",
    en: {
      title: "Move In / Move Out",
      short: "Get your deposit back with detailed move cleaning.",
      body: [
        "Detailed top-to-bottom cleaning for moving in or out, trusted to help get bond money back.",
        "We dust, scrub, mop and detail every corner.",
      ],
      features: ["Carpet cleaning", "Dust all furniture", "Hard surface floor cleaning"],
    },
    th: {
      title: "ทำความสะอาดย้ายเข้า / ย้ายออก",
      short: "ทำความสะอาดละเอียด ช่วยได้เงินมัดจำคืน",
      body: [
        "ทำความสะอาดละเอียดทั้งห้องสำหรับย้ายเข้าหรือย้ายออก",
        "ปัดฝุ่น ขัด ถู และเก็บรายละเอียดทุกมุม",
      ],
      features: ["ทำความสะอาดพรม", "ปัดฝุ่นเฟอร์นิเจอร์", "ทำความสะอาดพื้นแข็ง"],
    },
  },
  {
    slug: "after-renovation",
    icon: "renovation",
    en: {
      title: "After Renovation",
      short: "Remove dust, paint and debris after construction.",
      body: [
        "Post-renovation dust gets everywhere. We remove fine dust, paint spots and debris safely.",
        "We bring professional equipment for a healthy move-in ready home.",
      ],
      features: ["Fine dust removal", "Paint spot removal", "Window & track detailing"],
    },
    th: {
      title: "ทำความสะอาดหลังรีโนเวท",
      short: "ขจัดฝุ่น คราบสี และเศษวัสดุก่อสร้าง",
      body: [
        "ฝุ่นหลังรีโนเวทฟุ้งทุกที่ เราขจัดฝุ่นละเอียด คราบสี และเศษวัสดุอย่างปลอดภัย",
        "พร้อมอุปกรณ์มืออาชีพ ให้บ้านพร้อมเข้าอยู่",
      ],
      features: ["กำจัดฝุ่นละเอียด", "ขจัดคราบสี", "เช็ดหน้าต่างและร่องละเอียด"],
    },
  },
  {
    slug: "junk-removal",
    icon: "junk",
    en: {
      title: "Junk Removal",
      short: "Clear unwanted furniture, junk and clutter fast.",
      body: [
        "We help remove junk, old furniture and clutter responsibly.",
        "Great combined with deep cleaning before moving or renovating.",
      ],
      features: ["Furniture removal", "Clutter clearing", "Responsible disposal"],
    },
    th: {
      title: "ขนย้ายขยะ / เคลียร์ของ",
      short: "ขนเฟอร์นิเจอร์เก่าและขยะออกอย่างรวดเร็ว",
      body: [
        "ช่วยขนของไม่ใช้ เฟอร์นิเจอร์เก่า และขยะออกอย่างรับผิดชอบ",
        "เหมาะทำคู่กับดีพคลีนก่อนย้ายหรือรีโนเวท",
      ],
      features: ["ขนเฟอร์นิเจอร์", "เคลียร์ของรกรุงรัง", "กำจัดอย่างถูกวิธี"],
    },
  },
  {
    slug: "deep-cleaning",
    icon: "deep",
    en: {
      title: "Deep Cleaning",
      short: "Intensive top-to-bottom deep clean for bathrooms & kitchens.",
      body: [
        "Our most thorough clean — bathrooms, kitchens, surfaces, grout and hidden dirt.",
        "Recommended for first visits, post-tenant, or seasonal refresh.",
      ],
      features: ["Carpet cleaning", "Hard surface cleaning", "Upholstery cleaning"],
    },
    th: {
      title: "ดีพคลีนนิ่ง",
      short: "ทำความสะอาดใหญ่ละเอียดทั้งห้อง เน้นห้องน้ำและครัว",
      body: [
        "บริการละเอียดที่สุด ทั้งห้องน้ำ ห้องครัว พื้นผิว ยาแนว และคราบฝังลึก",
        "แนะนำสำหรับครั้งแรก หลังผู้เช่า หรือบิ๊กคลีนประจำฤดูกาล",
      ],
      features: ["ทำความสะอาดพรม", "ทำความสะอาดพื้นผิวแข็ง", "ทำความสะอาดโซฟา"],
    },
  },
  {
    slug: "office-cleaning",
    icon: "office",
    en: {
      title: "Office Cleaning",
      short: "Keep your workplace clean, healthy and professional.",
      body: [
        "Regular office cleaning for a cleaner facility and happier team.",
        "Flexible schedules including after-hours, with free in-home estimates.",
      ],
      features: ["Desk & common areas", "Restroom sanitation", "Floor care"],
    },
    th: {
      title: "ทำความสะอาดออฟฟิศ",
      short: "ดูแลที่ทำงานให้สะอาด ดีต่อสุขภาพ และเป็นมืออาชีพ",
      body: [
        "ทำความสะอาดออฟฟิศประจำ เพื่อสถานที่ที่ดีและทีมที่มีความสุข",
        "เลือกเวลานอกเวลาทำการได้ พร้อมประเมินราคาฟรี",
      ],
      features: ["โต๊ะและพื้นที่ส่วนกลาง", "ฆ่าเชื้อห้องน้ำ", "ดูแลพื้น"],
    },
  },
  {
    slug: "air-condition-services",
    icon: "ac",
    en: {
      title: "Air Condition Services",
      short: "AC cleaning, fixing and maintenance.",
      body: [
        "Aircon cleaning and fixing done carefully, keeping furniture and equipment clean.",
        "Clear explanations, fair parts replacement on site.",
      ],
      features: ["AC deep cleaning", "Minor repairs", "On-site part replacement"],
    },
    th: {
      title: "บริการแอร์",
      short: "ล้าง ซ่อม และบำรุงรักษาแอร์",
      body: [
        "ล้างและซ่อมแอร์อย่างระมัดระวัง ดูแลเฟอร์นิเจอร์และอุปกรณ์รอบข้าง",
        "อธิบายชัดเจน เปลี่ยนอะไหล่หน้างานอย่างเป็นธรรม",
      ],
      features: ["ล้างแอร์ละเอียด", "ซ่อมเล็ก", "เปลี่ยนอะไหล่หน้างาน"],
    },
  },
];

export const POSTS = [
  {
    slug: "deep-cleaning-checklist-bangkok-condo",
    en: {
      title: "Deep Cleaning Checklist for Bangkok Condos",
      excerpt: "What a real deep clean covers — bathroom, kitchen, grout, AC and more.",
      body: [
        "A true deep clean goes beyond surface wiping. Bathrooms get descaling, kitchens get degreasing, grout gets scrubbed, and hidden dust is removed.",
        "For Bangkok condos, pay extra attention to balcony dust, AC filters and mould in humid corners.",
        "Smile Clean brings all equipment and eco-friendly products — book via LINE for a free estimate.",
      ],
    },
    th: {
      title: "เช็กลิสต์ดีพคลีนสำหรับคอนโดในกรุงเทพฯ",
      excerpt: "ดีพคลีนจริงต้องทำอะไรบ้าง — ห้องน้ำ ครัว ยาแนว แอร์ และอื่นๆ",
      body: [
        "ดีพคลีนจริงไม่ใช่แค่เช็ดผิว ต้องขจัดคราบหินปูนในห้องน้ำ คราบมันในครัว ขัดยาแนว และกำจัดฝุ่นซ่อน",
        "สำหรับคอนโดในกรุงเทพฯ ต้องใส่ใจฝุ่นระเบียง ฟิลเตอร์แอร์ และเชื้อราในมุมอับชื้น",
        "Smile Clean มีอุปกรณ์และน้ำยารักษ์โลกครบ — แอด LINE เพื่อประเมินราคาฟรี",
      ],
    },
    date: "2025-11-10",
  },
  {
    slug: "move-out-cleaning-get-deposit-back",
    en: {
      title: "Move-Out Cleaning: How to Get Your Deposit Back",
      excerpt: "Landlord-approved checklist for move-in / move-out cleaning in Thailand.",
      body: [
        "Landlords check ovens, bathrooms, grout, windows and floors. Missing these is the top reason deposits are cut.",
        "Our move in/out clean covers carpet, furniture dusting and hard floors top-to-bottom.",
        "Keep photos before/after and keep the same cleaner for touch-ups if needed.",
      ],
    },
    th: {
      title: "ทำความสะอาดย้ายออก: ทำอย่างไรให้ได้มัดจำคืน",
      excerpt: "เช็กลิสต์ที่เจ้าของห้องตรวจ — ย้ายเข้า/ย้ายออกในไทย",
      body: [
        "เจ้าของห้องตรวจเตาอบ ห้องน้ำ ยาแนว หน้าต่าง และพื้น จุดเหล่านี้คือสาเหตุหลักที่โดนหักมัดจำ",
        "บริการย้ายเข้าออกของเราครอบคลุมพรม ปัดฝุ่นเฟอร์นิเจอร์ และพื้นแข็งทั้งห้อง",
        "ถ่ายรูปก่อน/หลังไว้ และใช้แม่บ้านคนเดิมสำหรับเก็บงานถ้าต้องการ",
      ],
    },
    date: "2025-10-02",
  },
  {
    slug: "eco-friendly-cleaning-safe-pets-kids",
    en: {
      title: "Eco-Friendly Cleaning Safe for Pets and Kids",
      excerpt: "Why we use biodegradable products — and what to ask any cleaner.",
      body: [
        "Biodegradable products clean well without harsh residues — safer for pets, kids and allergies.",
        "Ask any cleaning company: what chemicals, what dilution, and ventilation after service?",
        "Smile Clean uses eco products as standard with 100% satisfaction guarantee.",
      ],
    },
    th: {
      title: "ทำความสะอาดรักษ์โลก ปลอดภัยต่อสัตว์เลี้ยงและเด็ก",
      excerpt: "ทำไมเราใช้น้ำยาย่อยสลายได้ — และควรถามอะไรกับบริษัททำความสะอาด",
      body: [
        "น้ำยาย่อยสลายได้ทำความสะอาดดีโดยไม่มีสารตกค้างแรง ปลอดภัยต่อสัตว์เลี้ยง เด็ก และภูมิแพ้",
        "ควรถามทุกเจ้าว่า: ใช้น้ำยาอะไร ผสมอย่างไร และต้องระบายอากาศหลังทำหรือไม่",
        "Smile Clean ใช้น้ำยารักษ์โลกเป็นมาตรฐาน พร้อมรับประกันความพึงพอใจ 100%",
      ],
    },
    date: "2025-08-18",
  },
];

export const FAQS = [
  {
    en: {
      q: "How do I book?",
      a: "Fastest is LINE (lin.ee/xHXjraz) or call 063-616-2829. We are open 24 hours. Tell us your condo/house size, location and preferred date.",
    },
    th: {
      q: "จองอย่างไร?",
      a: "เร็วที่สุดคือ LINE (lin.ee/xHXjraz) หรือโทร 063-616-2829 เปิด 24 ชม. แจ้งขนาดห้อง/บ้าน ที่อยู่ และวันที่ต้องการ",
    },
  },
  {
    en: {
      q: "Do you bring equipment and products?",
      a: "Yes — all cleaning materials and equipment included, with eco-friendly biodegradable products.",
    },
    th: { q: "มีอุปกรณ์และน้ำยามาเองไหม?", a: "มีครบ — รวมอุปกรณ์และน้ำยาทั้งหมด ใช้น้ำยาย่อยสลายได้เป็นมิตรต่อสิ่งแวดล้อม" },
  },
  {
    en: {
      q: "Can I get the same cleaner every visit?",
      a: "Yes, we try to keep the same cleaner for every visit for weekly/fortnightly plans.",
    },
    th: {
      q: "ขอแม่บ้านคนเดิมทุกครั้งได้ไหม?",
      a: "ได้ เราพยายามจัดแม่บ้านคนเดิมสำหรับแพ็กเกจรายสัปดาห์/ทุก 2 สัปดาห์",
    },
  },
  {
    en: {
      q: "Do you offer free estimates?",
      a: "Yes — free in-home estimates. Add LINE for special deals and fast booking.",
    },
    th: { q: "ประเมินราคาฟรีไหม?", a: "ฟรี — ประเมินถึงบ้านฟรี แอด LINE รับดีลพิเศษและจองเร็ว" },
  },
  {
    en: {
      q: "What areas do you serve?",
      a: "Bangkok and surrounding areas, based at Onnuch 10, Suan Luang. Contact us for your area.",
    },
    th: {
      q: "ให้บริการพื้นที่ไหนบ้าง?",
      a: "กรุงเทพฯ และปริมณฑล สำนักงานอยู่อ่อนนุช 10 สวนหลวง สอบถามพื้นที่ของคุณได้เลย",
    },
  },
];

export const TESTIMONIALS = [
  {
    name: "Sanindra S.",
    source: "Google",
    stars: 5,
    en: "Responsive and accommodating. Maid was punctual, thorough, left everything spotless. Highly recommend!",
    th: "ตอบไว นัดเร็ว แม่บ้านตรงเวลา ทำงานละเอียด ห้องสะอาดมาก แนะนำเลย!",
  },
  {
    name: "Ian D.",
    source: "Google",
    stars: 5,
    en: "Very reasonable price for deep clean. Cleaners arrived early, apartment absolutely spotless.",
    th: "ราคาดีมากสำหรับดีพคลีน แม่บ้านมาก่อนเวลา ห้องสะอาดหมดจด",
  },
  {
    name: "John",
    source: "Google",
    stars: 5,
    en: "Clear communication, excellent time keeping. AC cleaning done well, will use again.",
    th: "สื่อสารชัดเจน ตรงเวลา ล้างแอร์เรียบร้อย จะใช้บริการอีกแน่นอน",
  },
  {
    name: "Gasira K.",
    source: "Google",
    stars: 5,
    en: "ดูแลดีมาก ทำงานแบบมืออาชีพ อุปกรณ์ครบ",
    th: "ดูแลดีมาก ทำงานแบบมืออาชีพ อุปกรณ์ทำความสะอาดครบ",
  },
];
