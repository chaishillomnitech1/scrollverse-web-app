/**
 * ScrollVerse SaferWay Router — SOVEREIGN BOOKING ENGINE
 * Stores bookings in DB, sends SendGrid dual dispatch (client + owner).
 */
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db";
import { saferwayBookings } from "../../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { generateICalInvite, buildBookingICalOptions } from "../ical";

// ── SendGrid helper ───────────────────────────────────────────────────────────
async function sendBookingEmail(opts: {
  to: string;
  guardianName: string;
  serviceTier: string;
  bookingId: number;
  vehicleInfo?: string | null;
  notes?: string | null;
}) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) return { success: false, message: "SendGrid not configured" };

  const tierLabels: Record<string, string> = {
    detail: "Full Detail — The Sovereign Treatment",
    express: "Express Wash — The Quick Sovereign",
    signature: "Signature Package — The Empire Standard",
    fleet: "Fleet Service — The Legion Protocol",
  };
  const tierLabel = tierLabels[opts.serviceTier] ?? opts.serviceTier;
  const ticketRef = `SFW-${String(opts.bookingId).padStart(6, "0")}`;

  const clientHtml = `
    <div style="background:#050B1A;color:#E8EDF2;font-family:'Space Grotesk',sans-serif;max-width:600px;margin:0 auto;padding:32px;border-radius:16px;border:1px solid rgba(0,212,255,0.15);">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:32px;margin-bottom:8px;">🚗</div>
        <h1 style="color:#00D4FF;font-size:22px;margin:0;">SaferWay Booking Confirmed</h1>
        <p style="color:#8899AA;font-size:13px;margin:8px 0 0;">Ticket Reference: <strong style="color:#FFB800;">${ticketRef}</strong></p>
      </div>
      <div style="background:rgba(0,212,255,0.04);border:1px solid rgba(0,212,255,0.1);border-radius:12px;padding:20px;margin-bottom:20px;">
        <p style="margin:0 0 8px;color:#8899AA;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Booking Details</p>
        <p style="margin:4px 0;font-size:14px;"><strong style="color:#00D4FF;">Guardian:</strong> ${opts.guardianName}</p>
        <p style="margin:4px 0;font-size:14px;"><strong style="color:#00D4FF;">Service:</strong> ${tierLabel}</p>
        ${opts.vehicleInfo ? `<p style="margin:4px 0;font-size:14px;"><strong style="color:#00D4FF;">Vehicle:</strong> ${opts.vehicleInfo}</p>` : ""}
        ${opts.notes ? `<p style="margin:4px 0;font-size:14px;"><strong style="color:#00D4FF;">Notes:</strong> ${opts.notes}</p>` : ""}
        <p style="margin:4px 0;font-size:14px;"><strong style="color:#00D4FF;">Status:</strong> <span style="color:#FFB800;">PENDING CONFIRMATION</span></p>
      </div>
      <p style="color:#8899AA;font-size:13px;text-align:center;">Our team will contact you within 24 hours to confirm your appointment. The empire is ready to serve. 🕋</p>
      <p style="color:#445566;font-size:11px;text-align:center;margin-top:24px;">SaferWay Auto Detail · Vineland Ave, NJ · scrollverse.co/saferway</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: opts.to }] }],
        from: { email: "saferway@scrollverse.co", name: "SaferWay Auto Detail" },
        subject: `🚗 SaferWay Booking Received — ${ticketRef}`,
        content: [{ type: "text/html", value: clientHtml }],
      }),
    });
    return res.ok || res.status === 202
      ? { success: true, message: `Confirmation sent to ${opts.to}` }
      : { success: false, message: `SendGrid error: ${res.status}` };
  } catch {
    return { success: false, message: "Network error sending email" };
  }
}

// ── Router ────────────────────────────────────────────────────────────────────
export const saferwayRouter = router({
  /**
   * Create a SaferWay booking — public (no login required).
   * Persists to DB + sends SendGrid dual dispatch.
   */
  createBooking: publicProcedure
    .input(
      z.object({
        guardianName: z.string().min(2, "Name must be at least 2 characters").max(200),
        email: z.string().email("Please enter a valid email address"),
        phone: z.string().max(64).optional(),
        serviceTier: z.enum(["detail", "express", "signature", "fleet"]).refine(v => ["detail","express","signature","fleet"].includes(v), { message: "Please select a valid service tier" }),
        vehicleInfo: z.string().max(200).optional(),
        notes: z.string().max(2000).optional(),
        serviceDate: z.string().max(20).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // 1. Persist booking to DB
      const [result] = await db.insert(saferwayBookings).values({
        guardianName: input.guardianName,
        email: input.email,
        phone: input.phone ?? null,
        serviceTier: input.serviceTier,
        vehicleInfo: input.vehicleInfo ?? null,
        notes: input.notes ?? null,
        serviceDate: input.serviceDate ?? null,
        status: "PENDING",
      });

      const bookingId = (result as any).insertId as number;

      // 2. Send client confirmation email (non-blocking)
      const emailResult = await sendBookingEmail({
        to: input.email,
        guardianName: input.guardianName,
        serviceTier: input.serviceTier,
        bookingId,
        vehicleInfo: input.vehicleInfo,
        notes: input.notes,
      }).catch(() => ({ success: false, message: "Email dispatch failed" }));

      // 3. Notify owner (non-blocking)
      await notifyOwner({
        title: `🚗 New SaferWay Booking — SFW-${String(bookingId).padStart(6, "0")}`,
        content: `Guardian: ${input.guardianName}\nEmail: ${input.email}\nPhone: ${input.phone ?? "N/A"}\nService: ${input.serviceTier}\nVehicle: ${input.vehicleInfo ?? "N/A"}\nNotes: ${input.notes ?? "N/A"}`,
      }).catch(() => {});

      return {
        success: true,
        bookingId,
        ticketRef: `SFW-${String(bookingId).padStart(6, "0")}`,
        emailSent: emailResult.success,
        message: "Booking received. The empire will contact you within 24 hours. KUN FAYAKŪN × ∞",
      };
    }),

  /**
   * Update booking status — admin only.
   */
  updateBookingStatus: protectedProcedure
    .input(
      z.object({
        bookingId: z.number().int().positive(),
        status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      await db
        .update(saferwayBookings)
        .set({ status: input.status })
        .where(eq(saferwayBookings.id, input.bookingId));

      // When status is set to CONFIRMED, send a confirmation email with iCal invite
      let calendarEmailSent = false;
      if (input.status === "CONFIRMED") {
        const apiKey = process.env.SENDGRID_API_KEY;
        if (apiKey) {
          // Fetch the booking to get client details
          const [booking] = await db
            .select()
            .from(saferwayBookings)
            .where(eq(saferwayBookings.id, input.bookingId))
            .limit(1);

          if (booking && booking.email) {
            const ticketRef = `SFW-${String(booking.id).padStart(6, "0")}`;
            // Build iCal invite — use serviceDate if present, else default to 7 days from now
            const serviceDate = (booking as any).serviceDate
              ? (booking as any).serviceDate
              : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

            const icalBase64 = generateICalInvite(
              buildBookingICalOptions({
                id: booking.id,
                clientName: booking.guardianName,
                clientEmail: booking.email,
                serviceDate,
                serviceTier: booking.serviceTier,
                vehicleType: booking.vehicleInfo ?? "Vehicle",
                vehicleDetails: null,
              })
            );

            const confirmedHtml = `
              <div style="background:#050B1A;color:#E8EDF2;font-family:'Space Grotesk',sans-serif;max-width:600px;margin:0 auto;padding:32px;border-radius:16px;border:1px solid rgba(0,255,136,0.2);">
                <div style="text-align:center;margin-bottom:24px;">
                  <div style="font-size:32px;margin-bottom:8px;">✅</div>
                  <h1 style="color:#00FF88;font-size:22px;margin:0;">Your Appointment is CONFIRMED</h1>
                  <p style="color:#8899AA;font-size:13px;margin:8px 0 0;">Ticket: <strong style="color:#FFB800;">${ticketRef}</strong></p>
                </div>
                <div style="background:rgba(0,255,136,0.04);border:1px solid rgba(0,255,136,0.15);border-radius:12px;padding:20px;margin-bottom:20px;">
                  <p style="margin:0 0 8px;color:#8899AA;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Confirmed Booking</p>
                  <p style="margin:4px 0;font-size:14px;"><strong style="color:#00FF88;">Guardian:</strong> ${booking.guardianName}</p>
                  <p style="margin:4px 0;font-size:14px;"><strong style="color:#00FF88;">Service:</strong> ${booking.serviceTier}</p>
                  ${booking.vehicleInfo ? `<p style="margin:4px 0;font-size:14px;"><strong style="color:#00FF88;">Vehicle:</strong> ${booking.vehicleInfo}</p>` : ""}
                  <p style="margin:4px 0;font-size:14px;"><strong style="color:#00FF88;">Status:</strong> <span style="color:#00FF88;">CONFIRMED ✓</span></p>
                </div>
                <p style="color:#8899AA;font-size:13px;text-align:center;">A calendar invite is attached. Add it to your calendar to receive reminders. See you soon! 🕋</p>
                <p style="color:#445566;font-size:11px;text-align:center;margin-top:24px;">SaferWay Auto Detail · Vineland Ave, NJ · scrollverse.co/saferway</p>
              </div>
            `;

            try {
              const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
                body: JSON.stringify({
                  personalizations: [{ to: [{ email: booking.email }] }],
                  from: { email: "saferway@scrollverse.co", name: "SaferWay Auto Detail" },
                  subject: `✅ SaferWay Appointment CONFIRMED — ${ticketRef}`,
                  content: [{ type: "text/html", value: confirmedHtml }],
                  attachments: [{
                    content: icalBase64,
                    type: "text/calendar; method=REQUEST",
                    filename: `saferway-${ticketRef}.ics`,
                    disposition: "attachment",
                  }],
                }),
              });
              calendarEmailSent = res.ok || res.status === 202;
            } catch {
              calendarEmailSent = false;
            }
          }
        }
      }

      return { success: true, bookingId: input.bookingId, status: input.status, calendarEmailSent };
    }),

  /**
   * List all SaferWay bookings — admin only.
   */
  listBookings: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    }
    const db = await getDb();
    if (!db) return { bookings: [], total: 0 };
    const bookings = await db
      .select()
      .from(saferwayBookings)
      .orderBy(desc(saferwayBookings.createdAt))
      .limit(100);
    return { bookings, total: bookings.length };
  }),
});
