/**
 * iCal Calendar Invite Helper
 * Generates RFC 5545-compliant .ics file content for SaferWay booking confirmations
 * Returned as a base64-encoded string for SendGrid attachment
 */

function formatICalDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeICalText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export interface ICalEventOptions {
  uid: string;
  summary: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  organizerEmail: string;
  organizerName: string;
  attendeeEmail: string;
  attendeeName: string;
}

/**
 * Generates a .ics calendar invite as a base64-encoded string
 * suitable for use as a SendGrid attachment
 */
export function generateICalInvite(opts: ICalEventOptions): string {
  const now = new Date();
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SaferWay Auto Detail//ScrollVerse//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${opts.uid}@saferway.scrollverse.co`,
    `DTSTAMP:${formatICalDate(now)}`,
    `DTSTART:${formatICalDate(opts.startDate)}`,
    `DTEND:${formatICalDate(opts.endDate)}`,
    `SUMMARY:${escapeICalText(opts.summary)}`,
    `DESCRIPTION:${escapeICalText(opts.description)}`,
    `LOCATION:${escapeICalText(opts.location)}`,
    `ORGANIZER;CN=${escapeICalText(opts.organizerName)}:MAILTO:${opts.organizerEmail}`,
    `ATTENDEE;CN=${escapeICalText(opts.attendeeName)};ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:${opts.attendeeEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Your SaferWay appointment is tomorrow",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Your SaferWay appointment is in 1 hour",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return Buffer.from(ics).toString("base64");
}

/**
 * Builds iCal options from a SaferWay booking record
 * Defaults to a 2-hour service window starting at 10:00 AM on the booking date
 */
export function buildBookingICalOptions(booking: {
  id: number;
  clientName: string;
  clientEmail: string;
  serviceDate: string;
  serviceTier: string;
  vehicleType: string;
  vehicleDetails?: string | null;
}): ICalEventOptions {
  // Parse the service date — default to 10:00 AM local time
  const dateParts = booking.serviceDate.split("-").map(Number);
  const startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 10, 0, 0);
  // Duration: Basic = 2h, Standard = 3h, Premium = 4h, Executive = 5h
  const durationHours: Record<string, number> = {
    basic: 2,
    standard: 3,
    premium: 4,
    executive: 5,
  };
  const hours = durationHours[booking.serviceTier.toLowerCase()] ?? 3;
  const endDate = new Date(startDate.getTime() + hours * 60 * 60 * 1000);

  const tierLabel = booking.serviceTier.charAt(0).toUpperCase() + booking.serviceTier.slice(1).toLowerCase();
  const vehicleLabel = booking.vehicleDetails
    ? `${booking.vehicleType} — ${booking.vehicleDetails}`
    : booking.vehicleType;

  return {
    uid: `saferway-booking-${booking.id}-${Date.now()}`,
    summary: `SaferWay Auto Detail — ${tierLabel} Service`,
    description: [
      `Booking Reference: SFW-${String(booking.id).padStart(6, "0")}`,
      `Client: ${booking.clientName}`,
      `Service Tier: ${tierLabel}`,
      `Vehicle: ${vehicleLabel}`,
      `Duration: ~${hours} hours`,
      "",
      "SaferWay Auto Detail — Vineland, NJ",
      "Questions? Reply to this email or call us directly.",
      "",
      "Allāhu Akbar · KUN FAYAKŪN × ∞",
    ].join("\n"),
    location: "SaferWay Auto Detail, Vineland, NJ 08360",
    startDate,
    endDate,
    organizerEmail: "info@saferway.co",
    organizerName: "SaferWay Auto Detail",
    attendeeEmail: booking.clientEmail,
    attendeeName: booking.clientName,
  };
}
