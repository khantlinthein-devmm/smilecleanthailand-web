// Shared booking types, validation and message formatting (server + client).
import { HANDLE_REQUIRED, type ChannelId } from "@/lib/channels";

export type BookingInput = {
  locale: string;
  serviceSlug: string;
  service: string;
  propertyType: string;
  size: string;
  date: string;
  time: string;
  frequency: string;
  area: string;
  notes: string;
  name: string;
  phone: string;
  contact: ChannelId;
  /** The customer's LINE ID, WhatsApp/Telegram number or email for the chosen channel. */
  handle: string;
  /** Honeypot: real visitors never fill this in. */
  website?: string;
};

export type Booking = BookingInput & { id: string; createdAt: string };

const CONTACTS: ChannelId[] = ["line", "whatsapp", "telegram", "sms", "email", "call"];
const LIMITS: Partial<Record<keyof BookingInput, number>> = {
  locale: 5, serviceSlug: 60, service: 120, propertyType: 60, size: 120, date: 10, time: 60,
  frequency: 60, area: 200, notes: 1000, name: 100, phone: 40, handle: 100,
};

/** Turns Thai, Burmese and other native digits (๐๙๒, ၀၉၂…) into 0-9. */
export function asciiDigits(text: string) {
  return text.replace(/\p{Nd}/gu, (d) => {
    const code = d.codePointAt(0)!;
    // Unicode decimal digits come in runs of ten starting at a code point ending in 0.
    for (let zero = code; zero > code - 10; zero--) {
      if (!/\p{Nd}/u.test(String.fromCodePoint(zero - 1))) return String(code - zero);
    }
    return d;
  });
}

/** Phone numbers need at least 6 digits (in any script). */
export function validPhone(phone: string) {
  return (asciiDigits(phone).match(/[0-9]/g) ?? []).length >= 6;
}

/** Returns a cleaned booking, or an error code. */
export function validateBooking(raw: unknown): { ok: true; data: BookingInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "invalid" };
  const r = raw as Record<string, unknown>;
  const str = (k: keyof BookingInput) => (typeof r[k] === "string" ? (r[k] as string).trim().slice(0, LIMITS[k] ?? 200) : "");
  const data: BookingInput = {
    locale: str("locale"),
    serviceSlug: str("serviceSlug"),
    service: str("service"),
    propertyType: str("propertyType"),
    size: str("size"),
    date: str("date"),
    time: str("time"),
    frequency: str("frequency"),
    area: str("area"),
    notes: str("notes"),
    name: str("name"),
    phone: asciiDigits(str("phone")),
    contact: CONTACTS.includes(r.contact as ChannelId) ? (r.contact as ChannelId) : "line",
    handle: asciiDigits(str("handle")),
    website: typeof r.website === "string" ? r.website : "",
  };
  if (data.website) return { ok: false, error: "spam" };
  if (!data.service || !data.area || !data.name) return { ok: false, error: "missing" };
  if (!validPhone(data.phone)) return { ok: false, error: "phone" };
  if (HANDLE_REQUIRED.includes(data.contact) && !data.handle) return { ok: false, error: "handle" };
  if (data.contact === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.handle)) return { ok: false, error: "handle" };
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) return { ok: false, error: "date" };
  return { ok: true, data };
}

/** Booking number like SC-250925-7K2Q (Bangkok date + random). */
export function newBookingId(now = new Date()) {
  const bkk = new Date(now.getTime() + 7 * 3600 * 1000).toISOString();
  const ymd = bkk.slice(2, 4) + bkk.slice(5, 7) + bkk.slice(8, 10);
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return `SC-${ymd}-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

const CONTACT_LABEL: Record<ChannelId, string> = { line: "LINE", whatsapp: "WhatsApp", telegram: "Telegram", sms: "SMS", email: "Email", call: "Phone call" };
const HANDLE_LABEL: Partial<Record<ChannelId, string>> = { line: "LINE ID", whatsapp: "WhatsApp", telegram: "Telegram", email: "Email" };

/** Plain-text notification for the team (LINE / Telegram / email). */
export function teamMessage(b: Booking, siteUrl: string) {
  const sent = new Date(b.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Bangkok" });
  const job = [
    `Service: ${b.service}`,
    `Property: ${b.propertyType}${b.size ? ` · ${b.size}` : ""}`,
    `Date: ${b.date || "not set"} · ${b.time}`,
    `Frequency: ${b.frequency}`,
    `Area: ${b.area}`,
    ...(b.notes ? [`Notes: ${b.notes}`] : []),
  ];
  const customer = [
    `Customer: ${b.name}`,
    `Phone: ${b.phone}`,
    `Contact by: ${CONTACT_LABEL[b.contact]}`,
    ...(HANDLE_LABEL[b.contact] ? [`${HANDLE_LABEL[b.contact]}: ${b.handle || `${b.phone} (same as phone)`}`] : []),
    `Language: ${b.locale.toUpperCase()}`,
  ];
  return [`🧽 New booking ${b.id}`, "", ...job, "", ...customer, "", `Sent: ${sent} (Bangkok) · ${siteUrl}`].join("\n");
}
