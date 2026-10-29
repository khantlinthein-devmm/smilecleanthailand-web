import Link from "next/link";
import { TESTIMONIALS } from "@/data";
import { type Locale } from "@/lib/site";
import { IconArrow, IconStar } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const LABELS: Record<Locale, { eyebrow: string; title: string; subtitle: string; viewAll: string; verified: string }> = {
  th: {
    eyebrow: "เสียงตอบรับจากลูกค้าจริง",
    title: "คะแนนรีวิว 5 ดาวบน Google Reviews",
    subtitle: "ลูกค้าคอนโดและบ้านพักอาศัยกว่า 500+ แห่งในกรุงเทพฯ ไว้วางใจ",
    viewAll: "ดูรีวิวทั้งหมด",
    verified: "ลูกค้าจริงผ่านการยืนยัน",
  },
  en: {
    eyebrow: "Real Customer Feedback",
    title: "Rated 5 Stars on Google Reviews",
    subtitle: "Trusted by over 500+ condo and homeowners across Bangkok",
    viewAll: "View All Reviews",
    verified: "Verified Customer",
  },
  zh: {
    eyebrow: "真实客户好评",
    title: "Google Reviews 满分五星好评",
    subtitle: "曼谷 500+ 公寓及别墅业主的信赖之选",
    viewAll: "查看全部评价",
    verified: "真实认证客户",
  },
  my: {
    eyebrow: "ဖောက်သည်များ၏ သဘောထားမှတ်ချက်",
    title: "Google Reviews တွင် ၅ ကြယ် အဆင့်သတ်မှတ်ချက်",
    subtitle: "ဘန်ကောက်ရှိ ကွန်ဒိုနှင့် နေအိမ် ၅၀၀+ ကျော်၏ ယုံကြည်စိတ်ချရမှု",
    viewAll: "သုံးသပ်ချက် အားလုံးကြည့်ရန်",
    verified: "စစ်ဆေးပြီးသော ဖောက်သည်",
  },
  ru: {
    eyebrow: "Отзывы наших клиентов",
    title: "Рейтинг 5 звёзд на Google Reviews",
    subtitle: "Более 500+ довольных владельцев квартир и домов в Бангкоке",
    viewAll: "Смотреть все отзывы",
    verified: "Проверенный отзыв",
  },
};

export default function HomeReviews({ lang = "en" }: { lang: Locale }) {
  const t = LABELS[lang] || LABELS.en;
  const list = TESTIMONIALS.slice(0, 3);

  return (
    <section className="section bg-white border-b border-slate-100">
      <div className="container-x">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
          action={
            <Link href={`/${lang}/testimonials`} className="btn btn-outline">
              {t.viewAll} <IconArrow className="w-4 h-4" />
            </Link>
          }
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {list.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="card p-7 h-full flex flex-col justify-between border border-slate-200/90 hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 gap-0.5">
                      {Array.from({ length: item.stars }).map((_, s) => (
                        <IconStar key={s} className="w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      Google Review
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    &ldquo;{item.text[lang] || item.text.en}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-ink">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">{t.verified}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

