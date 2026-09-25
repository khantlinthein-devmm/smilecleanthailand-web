// Ways a customer can send a booking. Each builds a link that opens the app
// with the booking message already filled in (where the app supports it).
import { EMAIL, LINE_ID, LINE_URL, PHONE_LINK, WHATSAPP_NUMBER } from "@/lib/site";

export type ChannelId = "line" | "whatsapp" | "telegram" | "sms" | "email" | "call";

export const CHANNELS: { id: ChannelId; color: string }[] = [
  { id: "line", color: "#06c755" },
  { id: "whatsapp", color: "#25d366" },
  { id: "telegram", color: "#229ed9" },
  { id: "sms", color: "#0284c7" },
  { id: "email", color: "#475569" },
  { id: "call", color: "#0369a1" },
];

/** Channels where we need the customer's account (LINE ID, @username…) to reach them. */
export const HANDLE_CHANNELS: ChannelId[] = ["line", "whatsapp", "telegram", "email"];
/** Of those, the ones where the phone number alone isn't enough. WhatsApp falls back to the phone. */
export const HANDLE_REQUIRED: ChannelId[] = ["line", "telegram", "email"];

export function channelHref(id: ChannelId, message: string, subject: string): string {
  const text = encodeURIComponent(message);
  switch (id) {
    case "line":
      // Opens a chat with the official account and pre-fills the message.
      return LINE_ID ? `https://line.me/R/oaMessage/${encodeURIComponent(LINE_ID)}/?${text}` : LINE_URL;
    case "whatsapp":
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    case "telegram":
      // Telegram can't pre-fill a message by phone link; the text is copied to the clipboard instead.
      return `https://t.me/+${WHATSAPP_NUMBER}`;
    case "sms":
      // "?&body=" works on both iOS and Android.
      return `sms:+${WHATSAPP_NUMBER}?&body=${text}`;
    case "email":
      return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${text}`;
    case "call":
      return PHONE_LINK;
  }
}
