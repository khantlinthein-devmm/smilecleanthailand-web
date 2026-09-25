// POST /api/line-webhook — LINE Messaging API webhook, used during setup to
// find the ID of the team's LINE group: add the bot to the group, type "id",
// and the bot replies with the ID to put in LINE_NOTIFY_TO.
// Requires LINE_CHANNEL_SECRET (to verify the signature) and LINE_CHANNEL_ACCESS_TOKEN.
import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LineEvent = {
  type: string;
  replyToken?: string;
  message?: { type: string; text?: string };
  source?: { type: string; userId?: string; groupId?: string; roomId?: string };
};

function validSignature(body: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(body).digest();
  const given = Buffer.from(signature, "base64");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/** Setup check: open this URL in a browser. Shows only whether each setting exists, never its value. */
export async function GET() {
  const has = (k: string) => Boolean(process.env[k]?.trim());
  const status = {
    LINE_CHANNEL_SECRET: has("LINE_CHANNEL_SECRET"),
    LINE_CHANNEL_ACCESS_TOKEN: has("LINE_CHANNEL_ACCESS_TOKEN"),
    LINE_NOTIFY_TO: has("LINE_NOTIFY_TO"),
    GOOGLE_SHEET_WEBHOOK_URL: has("GOOGLE_SHEET_WEBHOOK_URL"),
  };
  const ready = status.LINE_CHANNEL_SECRET && status.LINE_CHANNEL_ACCESS_TOKEN;
  return NextResponse.json(
    { webhook: ready ? "ready" : "missing LINE_CHANNEL_SECRET or LINE_CHANNEL_ACCESS_TOKEN", env: process.env.VERCEL_ENV ?? "local", ...status },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(req: Request) {
  const secret = process.env.LINE_CHANNEL_SECRET?.trim();
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN?.trim();
  const body = await req.text();
  if (!secret || !token) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  if (!validSignature(body, req.headers.get("x-line-signature"), secret)) {
    return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 401 });
  }

  const { events = [] } = JSON.parse(body) as { events?: LineEvent[] };
  for (const e of events) {
    const text = e.message?.type === "text" ? e.message.text?.trim().toLowerCase() : "";
    if (e.type !== "message" || !e.replyToken || !["id", "/id", "groupid"].includes(text ?? "")) continue;
    const src = e.source ?? { type: "unknown" };
    const id = src.groupId ?? src.roomId ?? src.userId ?? "unknown";
    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        replyToken: e.replyToken,
        messages: [{ type: "text", text: `Smile Clean booking bot ✅\n${src.type} ID:\n${id}\n\nPut this in Vercel as LINE_NOTIFY_TO` }],
      }),
      signal: AbortSignal.timeout(8000),
    }).catch((err) => console.error("[line-webhook] reply failed", err));
  }
  // LINE expects 200 for every delivery, including events we ignore.
  return NextResponse.json({ ok: true });
}
