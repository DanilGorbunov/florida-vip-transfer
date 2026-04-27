import { Resend } from "resend";

// ── Rate limiting ─────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= MAX_REQUESTS) return false;
  record.count++;
  return true;
}

// ── Sanitize ──────────────────────────────────────────────────────────────────
function sanitize(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}

function isValidEmail(e: string) {
  return typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;
}

// ── ICS generator ─────────────────────────────────────────────────────────────
function generateICS(b: {
  name: string; phone: string; email: string;
  pickupLocation: string; destination: string;
  date: string; time: string;
  passengers: string; service: string; message: string;
}): string {
  const [year, month, day] = b.date.split("-").map(Number);
  const [hour, minute]     = b.time.split(":").map(Number);
  const pad = (n: number) => String(n).padStart(2, "0");
  const dtStart = `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;
  const end     = new Date(year, month - 1, day, hour + 2, minute);
  const dtEnd   = `${end.getFullYear()}${pad(end.getMonth()+1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}00`;
  const now     = new Date();
  const dtStamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth()+1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  const desc    = [`Client: ${b.name}`, `Phone: ${b.phone}`, `Email: ${b.email}`,
    `Passengers: ${b.passengers}`, b.message ? `Notes: ${b.message}` : ""].filter(Boolean).join("\\n");

  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TrueRide//EN",
    "CALSCALE:GREGORIAN", "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@trueride.app`, `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`, `DTEND:${dtEnd}`,
    `SUMMARY:TrueRide: ${b.pickupLocation} → ${b.destination}`,
    `DESCRIPTION:${desc}`, `LOCATION:${b.pickupLocation}`,
    "STATUS:CONFIRMED", "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "unknown";
  if (!checkRateLimit(ip)) return res.status(429).json({ error: "Too many requests." });

  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("application/json"))
    return res.status(400).json({ error: "Invalid content type" });

  try {
    const { customerEmail, customerName, bookingData, confirmationEmail } = req.body;

    if (!isValidEmail(customerEmail)) return res.status(400).json({ error: "Invalid email" });
    if (!customerName) return res.status(400).json({ error: "Missing name" });
    if (!bookingData)  return res.status(400).json({ error: "Missing booking data" });

    const name = sanitize(customerName.trim());
    const b = {
      name:           sanitize(bookingData.name?.trim() ?? ""),
      email:          (bookingData.email ?? "").trim().toLowerCase(),
      phone:          sanitize(bookingData.phone?.trim() ?? ""),
      pickupLocation: sanitize(bookingData.pickupLocation?.trim() ?? ""),
      destination:    sanitize(bookingData.destination?.trim() ?? ""),
      date:           bookingData.date ?? "",
      time:           bookingData.time ?? "",
      passengers:     sanitize(bookingData.passengers ?? "1"),
      service:        sanitize(bookingData.service ?? ""),
      message:        sanitize(bookingData.message?.trim() ?? ""),
    };

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set");

    const resend = new Resend(apiKey);

    // ── Admin notification + ICS ─────────────────────────────────────────────
    const hasValidDate = b.date && b.date !== "ASAP" && /^\d{4}-\d{2}-\d{2}$/.test(b.date);
    const hasValidTime = b.time && b.time !== "ASAP" && /^\d{2}:\d{2}$/.test(b.time);
    const icsDate = hasValidDate ? b.date : new Date().toISOString().split("T")[0];
    const icsTime = hasValidTime ? b.time : "09:00";
    const ics     = generateICS({ ...b, date: icsDate, time: icsTime });

    await resend.emails.send({
      from:    "TrueRide <onboarding@resend.dev>",
      to:      "djadavin2@gmail.com",
      subject: `🚗 New booking: ${b.pickupLocation} → ${b.destination} · ${b.date} · ${b.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
          <h2 style="margin:0 0 16px">🚗 New TrueRide Booking</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888;width:120px">Client</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${b.name}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${b.phone}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">From</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${b.pickupLocation}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">To</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${b.destination}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">Date / Time</td><td style="padding:8px 0;border-bottom:1px solid #eee">${b.date} ${b.time}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">Passengers</td><td style="padding:8px 0;border-bottom:1px solid #eee">${b.passengers}</td></tr>
            ${b.message ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top">Notes</td><td style="padding:8px 0">${b.message}</td></tr>` : ""}
          </table>
          <p style="margin:20px 0 0;font-size:12px;color:#aaa">📅 Open the .ics attachment to add to Google Calendar.</p>
        </div>
      `,
      attachments: [{
        filename:    `booking-${icsDate}-${b.name.replace(/\s+/g, "-")}.ics`,
        content:     Buffer.from(ics).toString("base64"),
      }],
    });

    console.log("[API] Admin email sent via Resend");
    return res.status(200).json({ success: true });

  } catch (err: any) {
    console.error("[API] Error:", err);
    return res.status(500).json({ error: err.message ?? "Unknown error" });
  }
}
