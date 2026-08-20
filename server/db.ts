import { drizzle } from "drizzle-orm/mysql2";
import mysql2 from "mysql2/promise";
import { desc, eq } from "drizzle-orm";
import { InsertLocalRoyaltyRecord, InsertUser, localRoyaltyRecords, users } from "../drizzle/schema";
import { ENV } from './_core/env';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
// Uses a connection pool to prevent stale single-connection failures.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const pool = mysql2.createPool(process.env.DATABASE_URL);
      _db = drizzle(pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listLocalRoyaltyRecords(ownerUserId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(localRoyaltyRecords)
    .where(eq(localRoyaltyRecords.ownerUserId, ownerUserId))
    .orderBy(desc(localRoyaltyRecords.updatedAt));
}

export async function createLocalRoyaltyRecord(record: InsertLocalRoyaltyRecord) {
  const db = await getDb();
  if (!db) return undefined;
  await db.insert(localRoyaltyRecords).values(record);
  const rows = await db.select().from(localRoyaltyRecords)
    .where(eq(localRoyaltyRecords.recordReference, record.recordReference))
    .limit(1);
  return rows[0];
}

// TODO: add feature queries here as your schema grows.
