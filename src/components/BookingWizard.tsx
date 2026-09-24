"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Dict } from "@/dictionaries";
import { CHANNELS, channelHref, type ChannelId } from "@/lib/channels";
import { PHONE_DISPLAY } from "@/lib/site";
import { IconArrow, IconChat, IconCheck, IconMail, IconPhone, IconSms, IconWhatsApp } from "./icons";

type ServiceOption = { slug: string; title: string; short: string; image: string };

const FIELD =
  "w-full min-w-0 border border-slate-200 rounded-xl px-4 py-3 bg-white text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition";

const CHANNEL_ICONS: Record<ChannelId, (p: { className?: string }) => React.ReactNode> = {
  line: IconChat,
  whatsapp: IconWhatsApp,
  sms: IconSms,
  email: IconMail,
  call: IconPhone,
};

function Chips({
  options,
  value,
  onChange,
  name,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
            value === o ? "bg-sky-600 border-sky-600 text-white" : "bg-white border-slate-200 text-ink hover:border-sky-300"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Label({ children, optional }: { children: React.ReactNode; optional?: string }) {
  return (
    <span className="block text-sm font-semibold text-ink mb-2">
      {children}
      {optional && <span className="ml-1.5 font-normal text-slate-400">({optional})</span>}
    </span>
  );
}

export default function BookingWizard({
  dict,
  services,
  privacyHref,
  termsHref,
}: {
  dict: Dict;
  services: ServiceOption[];
  privacyHref: string;
  termsHref: string;
}) {
  const b = dict.booking;
  // Links on service pages pass ?service=slug to pre-select it.
  const preset = useSearchParams().get("service") ?? "";
  const presetValid = services.some((s) => s.slug === preset);
  const [step, setStep] = useState(presetValid ? 1 : 0);
  const [service, setService] = useState(presetValid ? preset : "");
  const [propertyType, setPropertyType] = useState(b.propertyTypes[0]);
  const [size, setSize] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(b.times[3]);
  const [frequency, setFrequency] = useState(b.frequencies[0]);
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState<ChannelId>("line");
  const [error, setError] = useState(false);
  // Rendered on the client only (inside Suspense), so "today" is the visitor's date.
  const today = new Date().toISOString().slice(0, 10);

  const selected = services.find((s) => s.slug === service);
  const channelName = (id: ChannelId) =>
    id === "line" ? "LINE" : id === "whatsapp" ? "WhatsApp" : id === "sms" ? "SMS" : id === "email" ? b.emailName : b.callName;

  const rows: [string, string][] = [
    [b.steps[0], selected?.title ?? ""],
    [b.propertyType, propertyType],
    [b.size, size],
    [b.date, date],
    [b.time, time],
    [b.frequency.replace(/[?？]$/, ""), frequency],
    [b.area, area],
    [b.notes, notes],
    [b.name, name],
    [b.phone, phone],
  ];
  const message = useMemo(
    () =>
      [`${b.messageTitle} — Smile Clean Thailand`, ...rows.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim()}`)].join("\n"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [service, propertyType, size, date, time, frequency, area, notes, name, phone],
  );

  function goTo(next: number) {
    if (next === 2 && !area.trim()) return setError(true);
    setError(false);
    setStep(next);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onSend(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!name.trim() || !phone.trim()) {
      e.preventDefault();
      setError(true);
      return;
    }
    setError(false);
    // Backup in case the app ignores the pre-filled text.
    navigator.clipboard?.writeText(message).catch(() => {});
    setTimeout(() => setStep(3), 400);
  }

  function reset() {
    setStep(0);
    setService("");
    setSize("");
    setDate("");
    setArea("");
    setNotes("");
  }

  return (
    <div id="booking" className="card overflow-hidden scroll-mt-36">
      {step < 3 && (
        <ol className="grid grid-cols-3 border-b border-slate-100">
          {b.steps.map((label, i) => (
            <li
              key={label}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold ${
                i === step ? "text-sky-700 bg-sky-50" : i < step ? "text-ink" : "text-slate-400"
              }`}
              aria-current={i === step ? "step" : undefined}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  i < step ? "bg-sky-600 text-white" : i === step ? "bg-white ring-2 ring-sky-600 text-sky-700" : "bg-slate-100"
                }`}
              >
                {i < step ? <IconCheck className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="p-6 md:p-8">
        {/* STEP 1: service */}
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold text-ink">{b.chooseService}</h2>
            <div role="radiogroup" aria-label={b.chooseService} className="mt-6 grid sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  role="radio"
                  aria-checked={service === s.slug}
                  onClick={() => {
                    setService(s.slug);
                    goTo(1);
                  }}
                  className={`group flex items-center gap-4 text-left rounded-2xl border p-3 pr-4 transition ${
                    service === s.slug ? "border-sky-500 ring-2 ring-sky-500/20 bg-sky-50" : "border-slate-200 hover:border-sky-300"
                  }`}
                >
                  <span className="relative w-20 h-16 shrink-0 rounded-xl overflow-hidden bg-sky-50">
                    <Image src={s.image} alt="" fill sizes="80px" unoptimized={s.image.endsWith(".svg")} className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{s.title}</span>
                    <span className="block text-xs text-slate-500 mt-0.5 line-clamp-2">{s.short}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 2: details */}
        {step === 1 && (
          <div className="grid gap-6">
            {selected && (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <span className="font-semibold text-ink">{selected.title}</span>
                <button type="button" onClick={() => goTo(0)} className="text-sm font-semibold text-sky-700 hover:underline">
                  {b.back}
                </button>
              </div>
            )}
            <div>
              <Label>{b.propertyType}</Label>
              <Chips name={b.propertyType} options={b.propertyTypes} value={propertyType} onChange={setPropertyType} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="min-w-0">
                <Label optional={b.optional}>{b.size}</Label>
                <input value={size} onChange={(e) => setSize(e.target.value)} placeholder={b.sizePlaceholder} className={FIELD} />
              </label>
              <label className="min-w-0">
                <Label optional={b.optional}>{b.date}</Label>
                <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={FIELD} />
              </label>
            </div>
            <div>
              <Label>{b.time}</Label>
              <Chips name={b.time} options={b.times} value={time} onChange={setTime} />
            </div>
            <div>
              <Label>{b.frequency}</Label>
              <Chips name={b.frequency} options={b.frequencies} value={frequency} onChange={setFrequency} />
            </div>
            <label>
              <Label>{b.area} *</Label>
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder={b.areaPlaceholder}
                aria-invalid={error && !area.trim()}
                className={`${FIELD} ${error && !area.trim() ? "border-red-400 ring-2 ring-red-400/20" : ""}`}
              />
            </label>
            <label>
              <Label optional={b.optional}>{b.notes}</Label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={b.notesPlaceholder} rows={3} className={FIELD} />
            </label>
            {error && <p className="text-sm font-medium text-red-600">{b.required}</p>}
            <div className="flex justify-between gap-3">
              <button type="button" onClick={() => goTo(0)} className="btn btn-outline">
                <IconArrow className="w-4 h-4 rotate-180" /> {b.back}
              </button>
              <button type="button" onClick={() => goTo(2)} className="btn btn-primary">
                {b.next} <IconArrow className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: contact + channel */}
        {step === 2 && (
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="min-w-0">
                <Label>{b.name} *</Label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  aria-invalid={error && !name.trim()}
                  className={`${FIELD} ${error && !name.trim() ? "border-red-400 ring-2 ring-red-400/20" : ""}`}
                />
              </label>
              <label className="min-w-0">
                <Label>{b.phone} *</Label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={error && !phone.trim()}
                  className={`${FIELD} ${error && !phone.trim() ? "border-red-400 ring-2 ring-red-400/20" : ""}`}
                />
              </label>
            </div>
            <div>
              <Label>{b.channel}</Label>
              <div role="radiogroup" aria-label={b.channel} className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {CHANNELS.map(({ id, color }) => {
                  const Icon = CHANNEL_ICONS[id];
                  const active = channel === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setChannel(id)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-sm font-semibold transition ${
                        active ? "border-transparent text-white shadow-lg" : "border-slate-200 text-ink hover:border-slate-300"
                      }`}
                      style={active ? { backgroundColor: color } : undefined}
                    >
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={active ? { backgroundColor: "rgb(255 255 255 / .2)" } : { backgroundColor: `${color}1a`, color }}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      {channelName(id)}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-slate-500">{b.channelHint}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
              <div className="font-semibold text-ink">{b.summary}</div>
              <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                {rows.slice(0, 8).filter(([, v]) => v.trim()).map(([k, v]) => (
                  <div key={k} className="flex gap-2 min-w-0">
                    <dt className="text-slate-500 shrink-0">{k}:</dt>
                    <dd className="text-ink font-medium truncate">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {error && <p className="text-sm font-medium text-red-600">{b.required}</p>}
            <div className="flex flex-wrap justify-between gap-3">
              <button type="button" onClick={() => goTo(1)} className="btn btn-outline">
                <IconArrow className="w-4 h-4 rotate-180" /> {b.back}
              </button>
              <a
                href={channelHref(channel, message, `${b.messageTitle} — Smile Clean Thailand`)}
                onClick={onSend}
                {...(channel === "line" || channel === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn btn-lg text-white"
                style={{ backgroundColor: CHANNELS.find((c) => c.id === channel)?.color }}
              >
                {(() => {
                  const Icon = CHANNEL_ICONS[channel];
                  return <Icon className="w-5 h-5" />;
                })()}
                {channel === "call" ? b.callNow.replace("{phone}", PHONE_DISPLAY) : b.send.replace("{channel}", channelName(channel))}
              </a>
            </div>
            <p className="text-xs text-slate-500">
              {dict.legal.consent}{" "}
              <Link href={privacyHref} className="underline underline-offset-2 hover:text-sky-700">
                {dict.legal.privacy}
              </Link>{" "}
              ·{" "}
              <Link href={termsHref} className="underline underline-offset-2 hover:text-sky-700">
                {dict.legal.terms}
              </Link>
            </p>
          </div>
        )}

        {/* DONE */}
        {step === 3 && (
          <div className="text-center py-8" role="status">
            <span className="mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IconCheck className="w-8 h-8" />
            </span>
            <h2 className="mt-6 text-2xl font-bold text-ink">{b.doneTitle}</h2>
            <p className="mt-3 text-slate-600 max-w-md mx-auto leading-relaxed">{b.doneBody}</p>
            {channel !== "call" && <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">{b.doneCopied}</p>}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={channelHref(channel, message, `${b.messageTitle} — Smile Clean Thailand`)}
                {...(channel === "line" || channel === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn btn-outline"
              >
                {channel === "call" ? b.callNow.replace("{phone}", PHONE_DISPLAY) : b.send.replace("{channel}", channelName(channel))}
              </a>
              <button type="button" onClick={reset} className="btn btn-primary">
                {b.again}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
