# Online booking setup (Vercel)

When a customer presses **Confirm booking**, the site calls `POST /api/booking`, which:

1. gives the booking a number like `SC-260925-7K2Q`,
2. saves it to a **Google Sheet**, and
3. notifies the team on **LINE** (and optionally Telegram / email), and
4. optionally adds it to **Smile Clean CRM → Leads**.

Each destination turns on when its environment variables exist in
**Vercel → Project → Settings → Environment Variables**. After adding or changing
variables, **redeploy** (Deployments → ⋯ → Redeploy).
Until at least one destination is set up, the site falls back to opening the
customer's chat app with the booking filled in, so no booking is lost.

---

## 1. Google Sheet (booking list) — about 5 minutes

1. Create a new Google Sheet, e.g. "Smile Clean Bookings".
2. **Extensions → Apps Script**. Delete the sample code and paste
   [`docs/booking-sheet.gs`](./booking-sheet.gs).
3. Change `SECRET` at the top to a long random text (keep it private).
4. **Deploy → New deployment → Select type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, then allow the permissions Google asks for.
5. Copy the **Web app URL** (`https://script.google.com/macros/s/…/exec`).
6. In Vercel add:

   | Name | Value |
   |---|---|
   | `GOOGLE_SHEET_WEBHOOK_URL` | the Web app URL |
   | `GOOGLE_SHEET_SECRET` | the same SECRET text |

New bookings appear as rows in the **Bookings** tab with status "New".
You can change the status column (e.g. Confirmed / Done) yourself.

## 2. LINE notifications to the team group — about 10 minutes

> Tip: use a **separate LINE Official Account** just for notifications
> (e.g. "Smile Clean Bookings"), so customer chats on @smileclean are not affected.

1. Create the account at <https://manager.line.biz> (free plan is fine).
2. In **LINE Official Account Manager → Settings**:
   - **Account settings → Chat → Allow the account to join group chats**: ON
   - **Messaging API → Enable Messaging API** (create or choose a provider).
3. Open <https://developers.line.biz/console/> → your provider → the channel:
   - **Basic settings → Channel secret** → copy
   - **Messaging API → Channel access token (long-lived) → Issue** → copy
   - **Messaging API → Webhook URL**: `https://YOUR-DOMAIN/api/line-webhook`
     → **Update**, turn **Use webhook** ON.
4. In Vercel add:

   | Name | Value |
   |---|---|
   | `LINE_CHANNEL_SECRET` | Channel secret |
   | `LINE_CHANNEL_ACCESS_TOKEN` | Channel access token |

   Redeploy, then press **Verify** next to the Webhook URL (should say Success).
5. Add the bot to your team's LINE group and type **`id`** in the group.
   The bot replies with the group ID (starts with `C…`).
6. In Vercel add `LINE_NOTIFY_TO` = that group ID (several IDs can be
   separated by commas) and redeploy.

Push messages count towards the LINE Official Account's monthly message
quota — check your plan in LINE Official Account Manager.

## 3. Optional: Telegram

1. Talk to **@BotFather** in Telegram → `/newbot` → copy the token.
2. Add the bot to your team group, send a message, then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`.
3. Vercel: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

## 4. Optional: email

1. Create a free account at <https://resend.com> and an API key
   (verify your domain there to send from your own address).
2. Vercel: `RESEND_API_KEY`, `BOOKING_EMAIL_TO` (comma-separated),
   optional `BOOKING_EMAIL_FROM` (e.g. `Smile Clean <bookings@smilecleanthailand.com>`).

## 5. Optional: Smile Clean CRM (Leads)

Each booking request also appears in the CRM under **Leads** (source "Website"),
with the service, date, time, area, notes and how the customer wants to be
contacted. The office calls the customer, then turns the lead into a customer
and booking.

1. Make a long random secret, e.g. `openssl rand -hex 32`.
2. On the CRM server add it to `.env` as `WEBSITE_LEADS_SECRET=<secret>` and
   restart the API (`docker compose up -d api`).
3. Vercel:

   | Name | Value |
   | --- | --- |
   | `CRM_LEADS_URL` | `https://admin.smilecleanthailand.com/api/v1/website/leads` |
   | `CRM_LEADS_SECRET` | the same secret |

Sending the same booking twice never creates a second lead.

## Test

Make a test booking on `/en/booking`. You should see "Booking received!"
with a booking number, a new row in the sheet, a LINE message in the group, and
(if set up) a new lead in the CRM.
Problems are logged in **Vercel → Project → Logs** (search for `[booking`).
