"use client";
import { useState } from "react";
import { EMAIL, LINE_URL } from "@/lib/site";
import type { Dict } from "@/dictionaries";

const FIELD =
  "w-full min-w-0 border border-slate-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition";

/**
 * LINE official-account links can't carry pre-filled text, so the request is
 * copied to the clipboard before LINE opens. Email is offered as a fallback.
 */
export default function QuoteForm({ dict, services }: { dict: Dict; services: string[] }) {
  const f = dict.quoteForm;
  const [copied, setCopied] = useState(false);

  function buildMessage(form: HTMLFormElement) {
    const data = new FormData(form);
    const line = (label: string, key: string) => {
      const v = String(data.get(key) ?? "").trim();
      return v ? `${label}: ${v}` : null;
    };
    return [
      `${f.messageHeader} — Smile Clean Thailand`,
      line(f.name, "name"),
      line(f.phone, "phone"),
      line(f.service, "service"),
      line(f.date, "date"),
      line(f.area, "area"),
      line(f.details, "details"),
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function sendLine(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Open the window synchronously so popup blockers allow it.
    // ("noopener" would make window.open return null, hiding whether it was blocked.)
    const win = window.open(LINE_URL, "_blank");
    if (win) win.opener = null;
    try {
      await navigator.clipboard.writeText(buildMessage(e.currentTarget));
      setCopied(true);
    } catch {
      setCopied(false);
    }
    if (!win) window.location.href = LINE_URL;
  }

  function sendEmail(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const subject = encodeURIComponent(`${f.messageHeader} — Smile Clean Thailand`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(buildMessage(form))}`;
  }

  return (
    <form onSubmit={sendLine} className="min-w-0 border border-slate-200 rounded-3xl p-7 bg-white grid gap-3">
      <div className="font-bold text-lg">{f.title}</div>
      <input name="name" required autoComplete="name" placeholder={f.name} aria-label={f.name} className={FIELD} />
      <input name="phone" required autoComplete="tel" placeholder={f.phone} aria-label={f.phone} className={FIELD} />
      <select name="service" aria-label={f.service} className={FIELD} defaultValue={services[0]}>
        {services.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <div className="grid lg:grid-cols-2 gap-3">
        <label className="grid gap-1 min-w-0 text-xs text-slate-500">
          {f.date}
          <input name="date" type="date" className={`${FIELD} text-sm text-slate-900`} />
        </label>
        <label className="grid gap-1 min-w-0 text-xs text-slate-500">
          {f.area}
          <input name="area" className={`${FIELD} text-sm text-slate-900`} />
        </label>
      </div>
      <textarea name="details" placeholder={f.details} aria-label={f.details} rows={4} className={FIELD} />
      <button className="btn-primary inline-flex justify-center bg-[#06C755] hover:brightness-95 text-white font-bold rounded-full px-6 py-3.5 shadow-lg shadow-green-500/25">
        {f.submitLine}
      </button>
      <button
        type="button"
        onClick={sendEmail}
        className="border-2 border-slate-200 hover:border-sky-300 hover:text-sky-700 font-bold rounded-full px-6 py-3 transition"
      >
        {f.submitEmail}
      </button>
      <p className={`text-xs ${copied ? "text-green-600 font-semibold" : "text-slate-500"}`} aria-live="polite">
        {copied ? f.copied : f.note}
      </p>
    </form>
  );
}
