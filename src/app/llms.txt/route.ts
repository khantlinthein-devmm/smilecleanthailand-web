// /llms.txt — a plain-Markdown summary of the business for AI assistants
// (https://llmstxt.org). Built from the same data as the pages so it stays in sync.
import { FAQS, POSTS, SERVICES } from "@/data";
import { getDictionary } from "@/dictionaries";
import { EMAIL, LINE_ID, LINE_URL, LOCALES, LOCALE_META, PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const en = await getDictionary("en");
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${en.glance.summary}`,
    "",
    "## Key facts",
    `- Address: ${en.common.address}, Thailand`,
    `- Opening hours: ${en.common.hours}, 7 days a week`,
    `- Phone: ${PHONE_DISPLAY} (+66 92 286 7433)`,
    `- LINE: ${LINE_ID} (${LINE_URL})`,
    `- Email: ${EMAIL}`,
    `- Service area: Bangkok and nearby provinces, including ${en.areas.list.join(", ")}`,
    `- Guarantee: ${en.guarantee.subtitle} ${en.guarantee.steps.map((s) => s.body).join(" ")}`,
    `- Equipment: all cleaning materials and equipment included; eco-friendly, biodegradable products`,
    `- Website languages: ${LOCALES.map((l) => LOCALE_META[l].label).join(", ")}`,
    "",
    "## How to book",
    ...en.howItWorks.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`),
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${s.en.title}](${SITE_URL}/en/services/${s.slug}): ${s.en.short} Includes: ${s.en.features.join(", ")}.`),
    "",
    "## Frequently asked questions",
    ...FAQS.flatMap((f) => [`### ${f.en.q}`, f.en.a, ""]),
    "## Articles",
    ...POSTS.map((p) => `- [${p.en.title}](${SITE_URL}/en/blog/${p.slug}): ${p.en.excerpt}`),
    "",
    "## Pages",
    `- [About](${SITE_URL}/en/about)`,
    `- [Services](${SITE_URL}/en/services)`,
    `- [FAQ](${SITE_URL}/en/faq)`,
    `- [Reviews](${SITE_URL}/en/testimonials)`,
    `- [Contact](${SITE_URL}/en/contact)`,
    `- [Privacy Policy](${SITE_URL}/en/privacy)`,
    `- [Terms of Service](${SITE_URL}/en/terms)`,
    `- Other languages: ${LOCALES.filter((l) => l !== "en").map((l) => `[${LOCALE_META[l].label}](${SITE_URL}/${l})`).join(", ")}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
