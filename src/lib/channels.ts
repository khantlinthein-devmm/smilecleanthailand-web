// Ways a customer can send a booking. Each builds a link that opens the app
// with the booking message already filled in (where the app supports it).
import { EMAIL, LINE_ID, LINE_URL, PHONE_LINK, WHATSAPP_NUMBER } from "@/lib/site";

export type ChannelId = "line" | "whatsapp" | "sms" | "email" | "call";

export const CHANNELS: { id: ChannelId; color: string }[] = [
  { id: "line", color: "#06c755" },
  { id: "whatsapp", color: "#25d366" },
  { id: "sms", color: "#0284c7" },
  { id: "email", color: "#475569" },
  { id: "call", color: "#1e3a5f" },
];

export function channelHref(id: ChannelId, message: string, subject: string): string {
  const text = encodeURIComponent(message);
  switch (id) {
    case "line":
      // Opens a chat with the official account and pre-fills the message.
      return LINE_ID ? `https://line.me/R/oaMessage/${encodeURIComponent(LINE_ID)}/?${text}` : LINE_URL;
    case "whatsapp":
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    case "sms":
      // "?&body=" works on both iOS and Android.
      return `sms:+${WHATSAPP_NUMBER}?&body=${text}`;
    case "email":
      return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${text}`;
    case "call":
      return PHONE_LINK;
  }
}
