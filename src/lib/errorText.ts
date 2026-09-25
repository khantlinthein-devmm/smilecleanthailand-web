// Short, secret-free error descriptions for set-up checks (server only).
const SECRETS = ["LINE_CHANNEL_ACCESS_TOKEN", "LINE_CHANNEL_SECRET", "TELEGRAM_BOT_TOKEN", "RESEND_API_KEY", "GOOGLE_SHEET_SECRET"];

/** e.g. "api.line.me 401 …" or "fetch failed: ETIMEDOUT", with any configured secret replaced by ***. */
export function errorText(e: unknown) {
  const err = e as { message?: string; cause?: { code?: string; message?: string } };
  let text = `${err?.message ?? String(e)}${err?.cause ? `: ${err.cause.code ?? err.cause.message ?? ""}` : ""}`.slice(0, 200);
  for (const k of SECRETS) {
    const v = process.env[k]?.trim();
    if (v) text = text.split(v).join("***");
  }
  return text;
}
