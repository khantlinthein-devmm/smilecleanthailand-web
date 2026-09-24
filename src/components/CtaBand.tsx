import { LINE_URL, PHONE_DISPLAY, PHONE_LINK, type Locale } from "@/lib/site";
import { getDictionary } from "@/dictionaries";
import { IconChat, IconPhone } from "./icons";
import Reveal from "./Reveal";
import LineQr from "./LineQr";

export default async function CtaBand({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  return (
    <section className="container-x py-16 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-sky-600 text-white px-8 py-12 md:p-14">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
          <div aria-hidden className="absolute -right-24 -bottom-32 w-96 h-96 rounded-full bg-sky-400/40 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-xl">{dict.ctaBand.title}</h2>
              <p className="mt-4 text-lg text-sky-50/85">{dict.ctaBand.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg">
                  <IconChat className="w-5 h-5 text-line" />
                  {dict.ctaBand.button}
                </a>
                <a href={PHONE_LINK} className="btn btn-ghost btn-lg">
                  <IconPhone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <LineQr dict={dict} className="hidden lg:flex shadow-2xl shadow-sky-900/30 border-0" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
