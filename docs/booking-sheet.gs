/**
 * Google Apps Script for the Smile Clean booking sheet.
 * Setup: see docs/booking-setup.md. Paste this into Extensions → Apps Script
 * of a new Google Sheet, set SECRET, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Put the web app URL in Vercel as
 * GOOGLE_SHEET_WEBHOOK_URL and the same SECRET as GOOGLE_SHEET_SECRET.
 */
const SECRET = "change-me-to-a-long-random-text";
const HEADERS = [
  "Booking ID", "Received (Bangkok)", "Status", "Service", "Property", "Size", "Date", "Time",
  "Frequency", "Area / address", "Notes", "Name", "Phone", "Contact by", "LINE ID / WhatsApp / Telegram / email", "Language",
];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (SECRET && data.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "forbidden" })).setMimeType(ContentService.MimeType.JSON);
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bookings") ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet("Bookings");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#e0f2fe");
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([
    data.id, data.createdAtBangkok, "New", data.service, data.propertyType, data.size, data.date, data.time,
    data.frequency, data.area, data.notes, data.name, "'" + data.phone, data.contact, "'" + (data.handle || ""), data.locale,
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
