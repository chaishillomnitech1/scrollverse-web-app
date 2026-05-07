/**
 * KYC / AML Compliance Router — Phase 38
 * Identity verification for Sovereign and Ascendant tier purchases.
 */
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { kycRecords, auditLogs } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const kycRouter = router({
  // Submit KYC verification
  submitVerification: protectedProcedure
    .input(z.object({
      documentType: z.enum(["passport", "drivers_license", "national_id", "residence_permit"]),
      fullName: z.string().min(2).max(128),
      dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      country: z.string().min(2).max(64),
      documentNumber: z.string().min(3).max(64),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();

      // Check if already submitted
      const [existing] = await db
        .select()
        .from(kycRecords)
        .where(eq(kycRecords.userId, ctx.user.id))
        .limit(1);

      if (existing) {
        if (existing.status === "approved") {
          return { success: true, status: "approved", message: "KYC already approved." };
        }
        if (existing.status === "pending") {
          return { success: true, status: "pending", message: "KYC verification already submitted and under review." };
        }
        // If rejected, allow resubmission
        await db
          .update(kycRecords)
          .set({
            status: "pending",
            documentType: input.documentType,
            fullName: input.fullName,
            dateOfBirth: input.dateOfBirth,
            country: input.country,
            documentNumber: input.documentNumber,
            verifiedAt: null,
            rejectedReason: null,
          })
          .where(eq(kycRecords.userId, ctx.user.id));
      } else {
        await db.insert(kycRecords).values({
          userId: ctx.user.id,
          status: "pending",
          documentType: input.documentType,
          fullName: input.fullName,
          dateOfBirth: input.dateOfBirth,
          country: input.country,
          documentNumber: input.documentNumber,
        });
      }

      // Audit log
      await db.insert(auditLogs).values({
        userId: ctx.user.id,
        action: "kyc_submitted",
        resource: "kyc_records",
        resourceId: String(ctx.user.id),
        metadata: JSON.stringify({ documentType: input.documentType, country: input.country }),
      });

      return { success: true, status: "pending", message: "KYC verification submitted. You will be notified within 24-48 hours." };
    }),

  // Get KYC status for current user
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const [record] = await db
      .select()
      .from(kycRecords)
      .where(eq(kycRecords.userId, ctx.user.id))
      .limit(1);
    return record ?? null;
  }),

  // Admin: get all pending KYC records
  getPendingRecords: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      return [];
    }
    const db = await getDb();
    return db
      .select()
      .from(kycRecords)
      .where(eq(kycRecords.status, "pending"))
      .orderBy(desc(kycRecords.createdAt))
      .limit(50);
  }),

  // Admin: approve or reject KYC
  reviewRecord: protectedProcedure
    .input(z.object({
      recordId: z.number().int(),
      action: z.enum(["approve", "reject"]),
      rejectedReason: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Admin access required");
      }
      const db = await getDb();
      await db
        .update(kycRecords)
        .set({
          status: input.action === "approve" ? "approved" : "rejected",
          verifiedAt: input.action === "approve" ? new Date() : null,
          rejectedReason: input.rejectedReason ?? null,
        })
        .where(eq(kycRecords.id, input.recordId));

      await db.insert(auditLogs).values({
        userId: ctx.user.id,
        action: `kyc_${input.action}d`,
        resource: "kyc_records",
        resourceId: String(input.recordId),
        metadata: JSON.stringify({ action: input.action, reason: input.rejectedReason }),
      });

      return { success: true };
    }),
});
