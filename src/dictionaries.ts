import type { Locale } from "@/lib/site";

const en = {
  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    faqs: "FAQs",
    blog: "Blog",
    testimonials: "Testimonials",
    contact: "Contact",
    freeEstimate: "Free Estimate",
  },
  hero: {
    badge: "Professional Cleaning Services in Bangkok",
    titleA: "One Stop Cleaning Services",
    titleB: "So Fresh & So Clean... We Promise!",
    subtitle:
      "House, condo, office, move-in/out, deep cleaning & more. Vetted cleaners, eco-friendly products, 100% satisfaction guarantee.",
    ctaLine: "Book on LINE",
    ctaCall: "Call 063-616-2829",
    trust: "500+ happy customers • 1000+ cleans completed • 30+ cleaners",
  },
  stats: [
    { value: "500+", label: "Happy Customers" },
    { value: "1000+", label: "Cleans Completed" },
    { value: "30+", label: "Cleaners" },
    { value: "100%", label: "Service Guarantee" },
  ],
  aboutTeaser: {
    title: "About Smile Clean Thailand",
    body: "Cleaning can be a chore and we know you have many choices. We constantly raise our high standards so you see us as the absolute best in the industry — trusted crews, first-class results.",
    points: [
      "One-off, weekly or fortnightly visits",
      "Vetted & background-checked cleaners",
      "Online booking and payment",
      "Keep the same cleaner for every visit",
      "All cleaning materials and equipment",
      "100% satisfaction guarantee",
    ],
  },
  servicesSection: {
    title: "Our Cleaning Services",
    subtitle:
      "Let us create a clean and healthy space for you and your loved ones.",
  },
  whyUs: {
    title: "Reasons to Choose Us",
    items: [
      {
        title: "Top-Rated Company",
        body: "Successful track record of satisfying customers and getting bond money back.",
      },
      {
        title: "Superior Quality",
        body: "Excellent tools and equipment to get all dust and dirt out.",
      },
      {
        title: "Eco-Friendly Products",
        body: "Biodegradable products safe for environment, pets and humans.",
      },
    ],
  },
  ctaBand: {
    title: "We Offer Free In-Home Estimates, So Why Wait?",
    body: "Book fast, get special deals. Add us on LINE!",
    button: "Contact Us on LINE",
  },
  footer: {
    tagline:
      "We use natural and eco-friendly cleaning products and have a customer satisfaction guarantee.",
    servicesTitle: "Cleaning Services",
    contactTitle: "Contact Information",
    rights: "Smile Clean Thailand. All rights reserved.",
  },
};

export type Dict = typeof en;

const th: Dict = {
  nav: {
    home: "หน้าแรก",
    about: "เกี่ยวกับเรา",
    services: "บริการ",
    faqs: "คำถามที่พบบ่อย",
    blog: "บทความ",
    testimonials: "รีวิวลูกค้า",
    contact: "ติดต่อเรา",
    freeEstimate: "ประเมินราคาฟรี",
  },
  hero: {
    badge: "บริการทำความสะอาดมืออาชีพในกรุงเทพฯ",
    titleA: "บริการทำความสะอาดครบวงจร",
    titleB: "สะอาดสดชื่น... เราสัญญา!",
    subtitle:
      "ทำความสะอาดบ้าน คอนโด ออฟฟิศ ย้ายเข้า/ออก ดีพคลีน และอื่นๆ แม่บ้านผ่านการตรวจสอบ ผลิตภัณฑ์เป็นมิตรต่อสิ่งแวดล้อม รับประกันความพึงพอใจ 100%",
    ctaLine: "จองผ่าน LINE",
    ctaCall: "โทร 063-616-2829",
    trust: "ลูกค้าพึงพอใจ 500+ • ทำความสะอาดแล้ว 1000+ • แม่บ้าน 30+ คน",
  },
  stats: [
    { value: "500+", label: "ลูกค้าพึงพอใจ" },
    { value: "1000+", label: "งานที่ทำสำเร็จ" },
    { value: "30+", label: "พนักงานทำความสะอาด" },
    { value: "100%", label: "รับประกันบริการ" },
  ],
  aboutTeaser: {
    title: "เกี่ยวกับ Smile Clean Thailand",
    body: "การทำความสะอาดเป็นงานที่น่าเบื่อ และเรารู้ว่าคุณมีตัวเลือกมากมาย เราจึงยกระดับมาตรฐานอย่างต่อเนื่อง เพื่อเป็นที่สุดในอุตสาหกรรม — ทีมงานที่ไว้ใจได้ ผลงานชั้นหนึ่ง",
    points: [
      "บริการครั้งเดียว รายสัปดาห์ หรือทุก 2 สัปดาห์",
      "แม่บ้านผ่านการตรวจสอบประวัติ",
      "จองและชำระเงินออนไลน์",
      "ได้แม่บ้านคนเดิมทุกครั้ง",
      "มีอุปกรณ์และน้ำยาทำความสะอาดครบ",
      "รับประกันความพึงพอใจ 100%",
    ],
  },
  servicesSection: {
    title: "บริการทำความสะอาดของเรา",
    subtitle: "ให้เราสร้างพื้นที่สะอาดและดีต่อสุขภาพสำหรับคุณและคนที่คุณรัก",
  },
  whyUs: {
    title: "ทำไมต้องเลือกเรา",
    items: [
      {
        title: "บริษัทคะแนนสูงสุด",
        body: "ผลงานที่พิสูจน์แล้ว ลูกค้าพึงพอใจและได้เงินมัดจำคืน",
      },
      {
        title: "คุณภาพเหนือกว่า",
        body: "เครื่องมือคุณภาพดีที่สุด ขจัดฝุ่นและสิ่งสกปรกหมดจด",
      },
      {
        title: "ผลิตภัณฑ์รักษ์โลก",
        body: "ใช้น้ำยาย่อยสลายได้ ปลอดภัยต่อสิ่งแวดล้อม สัตว์เลี้ยง และมนุษย์",
      },
    ],
  },
  ctaBand: {
    title: "ประเมินราคาถึงบ้านฟรี รออะไรอยู่?",
    body: "จองเร็ว รับดีลพิเศษ แอด LINE เราเลย!",
    button: "ติดต่อเราผ่าน LINE",
  },
  footer: {
    tagline:
      "เราใช้น้ำยาทำความสะอาดธรรมชาติและเป็นมิตรต่อสิ่งแวดล้อม พร้อมรับประกันความพึงพอใจ",
    servicesTitle: "บริการทำความสะอาด",
    contactTitle: "ข้อมูลติดต่อ",
    rights: "Smile Clean Thailand สงวนลิขสิทธิ์",
  },
};

export async function getDictionary(locale: Locale): Promise<Dict> {
  return locale === "th" ? th : en;
}
