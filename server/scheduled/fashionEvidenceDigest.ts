import type { Request, Response } from "express";
import { eq, inArray } from "drizzle-orm";
import {
  catalogAssetRecords,
  catalogEvidenceDigestSettings,
} from "../../drizzle/schema";
import type { CatalogAssetRecord } from "../../drizzle/schema";
import { getDb } from "../db";
import { notifyOwner } from "../_core/notification";
import { sdk } from "../_core/sdk";

const toDayKey = (value: Date) => value.toISOString().slice(0, 10);

export async function fashionEvidenceDigestHandler(req: Request, res: Response) {
  try {
    const cronUser = await sdk.authenticateRequest(req);
    if (!cronUser.isCron || !cronUser.taskUid) return res.status(403).json({ error: "cron-only" });

    const db = await getDb();
    if (!db) return res.status(500).json({ error: "catalog database unavailable" });
    const [settings] = await db.select().from(catalogEvidenceDigestSettings)
      .where(eq(catalogEvidenceDigestSettings.scheduleCronTaskUid, cronUser.taskUid)).limit(1);
    if (!settings || !settings.enabled) return res.json({ ok: true, skipped: "orphan-or-disabled" });

    const now = new Date();
    const dayKey = toDayKey(now);
    if (settings.lastDigestDay === dayKey) return res.json({ ok: true, skipped: "already-delivered", dayKey });

    const cutoff = new Date(now.getTime() + settings.daysBeforeExpiry * 24 * 60 * 60 * 1000);
    const assets = (await db.select().from(catalogAssetRecords)) as CatalogAssetRecord[];
    const dueAssets = assets.filter((asset: CatalogAssetRecord) => {
      if (asset.reviewStatus === "REJECTED") return false;
      if (!asset.evidenceDocumentUrl || !asset.evidenceExpiresAt) return true;
      return new Date(asset.evidenceExpiresAt) <= cutoff;
    });

    const missingEvidence = dueAssets.filter((asset: CatalogAssetRecord) => !asset.evidenceDocumentUrl).length;
    const missingExpiry = dueAssets.filter((asset: CatalogAssetRecord) => asset.evidenceDocumentUrl && !asset.evidenceExpiresAt).length;
    const expired = dueAssets.filter((asset: CatalogAssetRecord) => asset.evidenceExpiresAt && new Date(asset.evidenceExpiresAt) <= now).length;
    const dueSoon = dueAssets.filter((asset: CatalogAssetRecord) => asset.evidenceExpiresAt && new Date(asset.evidenceExpiresAt) > now && new Date(asset.evidenceExpiresAt) <= cutoff).length;

    if (dueAssets.length) {
      const notified = await notifyOwner({
        title: `Fashion evidence digest: ${dueAssets.length} item${dueAssets.length === 1 ? "" : "s"} need review`,
        content: `Evidence governance digest for ${dayKey}. Missing evidence: ${missingEvidence}; missing expiry: ${missingExpiry}; expired: ${expired}; due within ${settings.daysBeforeExpiry} days: ${dueSoon}. Open /admin/fashion-review to assign reviewers, attach evidence, or update expiry dates. Commerce remains fail-closed.`,
      });
      if (!notified) throw new Error("Owner notification was not accepted");
      await db.update(catalogAssetRecords).set({ lastExpiryReminderAt: now })
        .where(inArray(catalogAssetRecords.id, dueAssets.map((asset: CatalogAssetRecord) => asset.id)));
    }

    await db.update(catalogEvidenceDigestSettings).set({ lastDigestDay: dayKey, lastDigestAt: now })
      .where(eq(catalogEvidenceDigestSettings.id, settings.id));
    return res.json({ ok: true, dayKey, notificationSent: dueAssets.length > 0, dueAssetCount: dueAssets.length, missingEvidence, missingExpiry, expired, dueSoon });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown evidence digest failure";
    console.error("[FashionEvidenceDigest]", error);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString(), context: { path: req.path } });
  }
}
