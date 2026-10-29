import Link from "next/link";
import { TESTIMONIALS } from "@/data";
import { type Locale } from "@/lib/site";
import { IconArrow, IconStar } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const LABELS: Record<Locale, { eyebrow: string; title: string; subtitle: string; viewAll: string; verified: string; badge: string }> = {
  th: {
    eyebrow: "เสียงตอบรับจากลูกค้าจริง",
    title: "คะแนนรีวิว 5 ดาวบน Google Reviews",
    subtitle: "ลูกค้าคอนโดและบ้านพักอาศัยกว่า 500+ แห่งในกรุงเทพฯ ไว้วางใจ",
    viewAll: "ดูรีวิวทั้งหมด",
    verified: "ลูกค้าจริงผ่านการยืนยัน",
    badge: "⭐ 4.9/5 คะแนนความพึงพอใจสูงสุด",
  },
  en: {
    eyebrow: "Real Customer Feedback",
    title: "Rated 5 Stars on Google Reviews",
    subtitle: "Trusted by over 500+ condo and homeowners across Bangkok",
    viewAll: "View All Reviews",
    verified: "Verified Customer",
    badge: "⭐ 4.9/5 Overall Customer Satisfaction",
  },
  zh: {
    eyebrow: "真实客户好评",
    title: "Google Reviews 满分五星好评",
    subtitle: "曼谷 500+ 公寓及别墅业主的信赖之选",
    viewAll: "查看全部评价",
    verified: "真实认证客户",
    badge: "⭐ 4.9/5 综合满意度好评",
  },
  my: {
    eyebrow: "ဖောက်သည်များ၏ သဘောထားမှတ်ချက်",
    title: "Google Reviews တွင် ၅ ကြယ် အဆင့်သတ်မှတ်ချက်",
    subtitle: "ဘန်ကောက်ရှိ ကွန်ဒိုနှင့် နေအိမ် ၅၀၀+ ကျော်၏ ယုံကြည်စိတ်ချရမှု",
    viewAll: "သုံးသပ်ချက် အားလုံးကြည့်ရန်",
    verified: "စစ်ဆေးပြီးသော ဖောက်သည်",
    badge: "⭐ ၄.၉/၅ အမြင့်ဆုံး ကျေနပ်မှုနှုန်း",
  },
  ru: {
    eyebrow: "Отзывы наших клиентов",
    title: "Рейтинг 5 звёзд на Google Reviews",
    subtitle: "Более 500+ довольных владельцев квартир и домов в Бангкоке",
    viewAll: "Смотреть все отзывы",
    verified: "Проверенный отзыв",
    badge: "⭐ 4.9/5 Оценка довольных клиентов",
  },
};

export default function HomeReviews({ lang = "en" }: { lang: Locale }) {
  const t = LABELS[lang] || LABELS.en;
  const list = TESTIMONIALS.slice(0, 3);

  return (
    <section className="section bg-gradient-to-b from-white to-slate-50/50 border-b border-slate-200/80">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200/80 rounded-full px-3 py-1 mb-3">
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              {t.subtitle}
            </p>
          </div>

          <Link
            href={`/${lang}/testimonials`}
            className="btn btn-outline btn-sm self-start sm:self-auto shrink-0"
          >
            {t.viewAll} <IconArrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {list.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="relative card p-8 h-full flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 rounded-2xl group">
                {/* Subtle quotation background accent */}
                <span
                  aria-hidden
                  className="absolute right-6 top-4 text-7xl font-serif text-slate-100 select-none pointer-events-none group-hover:text-sky-50 transition-colors"
                >
                  &ldquo;
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex text-amber-400 gap-1">
                      {Array.from({ length: item.stars }).map((_, s) => (
                        <IconStar key={s} className="w-4 h-4 drop-shadow-sm" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      <svg className="w-3 h-3" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      Google
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed">
                    &ldquo;{item.text[lang] || item.text.en}&rdquo;
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-sky-600/20">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-ink">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">✓ {t.verified}</p>
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
