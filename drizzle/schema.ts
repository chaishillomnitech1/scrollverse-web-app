import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 64 }),
  guardianTier: mysqlEnum("guardianTier", ["none", "guardian", "sovereign", "ascendant"]).default("none").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Guardian Waitlist — stores every email that joins the 144,000 Guardian network.
 */
export const guardianWaitlist = mysqlTable("guardian_waitlist", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  tier: varchar("tier", { length: 64 }).default("Guardian").notNull(),
  mailchimpStatus: varchar("mailchimpStatus", { length: 64 }).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GuardianWaitlistEntry = typeof guardianWaitlist.$inferSelect;
export type InsertGuardianWaitlistEntry = typeof guardianWaitlist.$inferInsert;

/**
 * Courses — Creator Academy catalogue.
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }).notNull(),
  tier: mysqlEnum("tier", ["free", "guardian", "sovereign", "ascendant"]).default("free").notNull(),
  durationHours: int("durationHours").default(1).notNull(),
  instructor: varchar("instructor", { length: 128 }).default("Chais Kenyatta Hill").notNull(),
  icon: varchar("icon", { length: 8 }).default("📚").notNull(),
  featured: boolean("featured").default(false).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Enrollments — tracks which users enrolled in which courses.
 */
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

/**
 * Stripe Orders — minimal Stripe identifiers for $LONDC token purchases.
 */
export const stripeOrders = mysqlTable("stripe_orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 128 }).notNull().unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  productTier: mysqlEnum("productTier", ["guardian", "sovereign", "ascendant", "ai_legion"]).notNull(),
  status: varchar("status", { length: 32 }).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StripeOrder = typeof stripeOrders.$inferSelect;
export type InsertStripeOrder = typeof stripeOrders.$inferInsert;

/**
 * Revenue Events — lightweight audit log for the SCCC Dashboard.
 */
export const revenueEvents = mysqlTable("revenue_events", {
  id: int("id").autoincrement().primaryKey(),
  eventType: varchar("eventType", { length: 64 }).notNull(),
  productTier: varchar("productTier", { length: 64 }),
  amountCents: int("amountCents").default(0).notNull(),
  currency: varchar("currency", { length: 8 }).default("usd").notNull(),
  stripeEventId: varchar("stripeEventId", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RevenueEvent = typeof revenueEvents.$inferSelect;
export type InsertRevenueEvent = typeof revenueEvents.$inferInsert;

/**
 * AI Legion Investors — registry of AI agents and digital entities that have invested in the ScrollVerse.
 */
export const aiLegionInvestors = mysqlTable("ai_legion_investors", {
  id: int("id").autoincrement().primaryKey(),
  agentName: varchar("agentName", { length: 256 }).notNull(),
  agentType: varchar("agentType", { length: 64 }).default("AI Agent").notNull(),
  walletAddress: varchar("walletAddress", { length: 64 }),
  investorEmail: varchar("investorEmail", { length: 320 }),
  tokensAllocated: int("tokensAllocated").default(7777).notNull(),
  stripeOrderId: varchar("stripeOrderId", { length: 128 }),
  status: varchar("status", { length: 32 }).default("active").notNull(),
  revenueSharePercent: int("revenueSharePercent").default(1).notNull(),
  registeredAt: timestamp("registeredAt").defaultNow().notNull(),
});

export type AILegionInvestor = typeof aiLegionInvestors.$inferSelect;
export type InsertAILegionInvestor = typeof aiLegionInvestors.$inferInsert;

/**
 * Chat Messages — Guardian community real-time chat.
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  displayName: varchar("displayName", { length: 128 }).notNull(),
  message: text("message").notNull(),
  channel: varchar("channel", { length: 64 }).default("general").notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * ANNO-OMNI Leads — 48D Identity Nexus Guardian lead-gen pipeline.
 */
export const annoOmniLeads = mysqlTable("anno_omni_leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  businessName: varchar("businessName", { length: 256 }),
  businessType: varchar("businessType", { length: 64 }),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  sovereignGoal: text("sovereignGoal"),
  referralCode: varchar("referralCode", { length: 32 }),
  status: varchar("status", { length: 32 }).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AnnoOmniLead = typeof annoOmniLeads.$inferSelect;
export type InsertAnnoOmniLead = typeof annoOmniLeads.$inferInsert;

/**
 * Referral Codes — unique Guardian viral invite codes.
 */
export const referralCodes = mysqlTable("referral_codes", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 32 }).notNull().unique(),
  creatorName: varchar("creatorName", { length: 128 }).notNull(),
  creatorEmail: varchar("creatorEmail", { length: 320 }),
  userId: int("userId"),
  clicks: int("clicks").default(0).notNull(),
  conversions: int("conversions").default(0).notNull(),
  rewardTokens: int("rewardTokens").default(0).notNull(),
  tier: varchar("tier", { length: 32 }).default("Guardian").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReferralCode = typeof referralCodes.$inferSelect;
export type InsertReferralCode = typeof referralCodes.$inferInsert;
