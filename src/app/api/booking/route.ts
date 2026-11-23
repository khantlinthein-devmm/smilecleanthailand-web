// POST /api/booking — saves a booking and notifies the team.
// Destinations configured via Vercel environment variables:
//   LINE: LINE_CHANNEL_ACCESS_TOKEN + LINE_NOTIFY_TO (group/user IDs, comma-separated)
//   CRM:  CRM_LEADS_URL + CRM_LEADS_SECRET (adds request to Smile Clean CRM → Leads)
// With nothing configured it answers 503 and the website falls back to opening
// the customer's chat app, so no booking is lost.
import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { newBookingId, teamMessage, validateBooking, type Booking } from "@/lib/booking";
import { SITE_URL } from "@/lib/site";
import { errorText } from "@/lib/errorText";

export const runtime = "nodejs";

const TIMEOUT = 8000;
const env = (k: string) => process.env[k]?.trim() || "";

// Light abuse protection: max 5 bookings per IP per 10 minutes (per server instance).
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`${new URL(url).host} ${res.status} ${(await res.text()).slice(0, 200)}`);
}

function destinations(b: Booking) {
  const text = teamMessage(b, SITE_URL);
  const jobs: { name: string; run: () => Promise<void> }[] = [];

  const lineToken = env("LINE_CHANNEL_ACCESS_TOKEN");
  const lineTo = env("LINE_NOTIFY_TO").split(",").map((s) => s.trim()).filter(Boolean);
  for (const to of lineToken ? lineTo : []) {
    jobs.push({
      name: "line",
      run: () =>
        post(
          "https://api.line.me/v2/bot/message/push",
          { to, messages: [{ type: "text", text: text.slice(0, 5000) }] },
          { Authorization: `Bearer ${lineToken}`, "X-Line-Retry-Key": crypto.randomUUID() },
        ),
    });
  }

  // The CRM checks an HMAC of the exact body, so sign the string that is sent.
  // Re-sending the same booking number never creates a second lead.
  if (env("CRM_LEADS_URL") && env("CRM_LEADS_SECRET")) {
    jobs.push({
      name: "crm",
      run: () => {
        const body = JSON.stringify(b);
        const signature = createHmac("sha256", env("CRM_LEADS_SECRET")).update(body).digest("hex");
        return post(env("CRM_LEADS_URL"), body, { "X-Website-Signature": signature });
      },
    });
  }

  return jobs;
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const v = validateBooking(raw);
  if (!v.ok) {
    // Pretend success to bots so they don't retry.
    if (v.error === "spam") return NextResponse.json({ ok: true, id: newBookingId() });
    return NextResponse.json({ ok: false, error: v.error }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const booking: Booking = { ...v.data, website: undefined, id: newBookingId(), createdAt: new Date().toISOString() };
  const jobs = destinations(booking);
  if (jobs.length === 0) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const results = await Promise.allSettled(jobs.map((j) => j.run()));
  const delivered = jobs.filter((_, i) => results[i].status === "fulfilled").map((j) => j.name);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[booking ${booking.id}] ${jobs[i].name} failed:`, r.reason);
  });
  if (delivered.length === 0) {
    // Short reasons (e.g. "api.line.me 401", "fetch failed: ETIMEDOUT") to help set-up; never includes tokens.
    const failed = jobs.map((j, i) => {
      const r = results[i];
      return { name: j.name, reason: r.status === "rejected" ? errorText(r.reason) : "" };
    });
    return NextResponse.json({ ok: false, error: "delivery_failed", failed }, { status: 502 });
  }
  return NextResponse.json({ ok: true, id: booking.id, delivered });
}
