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

/**
 * Merchant Nodes — ScrollPort sovereign merchant network.
 */
export const merchantNodes = mysqlTable("merchant_nodes", {
  id: int("id").autoincrement().primaryKey(),
  businessName: varchar("businessName", { length: 256 }).notNull(),
  ownerName: varchar("ownerName", { length: 256 }).notNull(),
  email: varchar("email", { length: 320 }),
  city: varchar("city", { length: 128 }).notNull(),
  state: varchar("state", { length: 64 }).notNull(),
  country: varchar("country", { length: 64 }).default("USA").notNull(),
  cluster: varchar("cluster", { length: 64 }).default("South Jersey").notNull(),
  businessType: varchar("businessType", { length: 64 }).default("Retail").notNull(),
  gpvMonthly: int("gpvMonthly").default(0).notNull(),
  zakatAmount: int("zakatAmount").default(0).notNull(),
  status: mysqlEnum("status", ["active", "pending", "inactive"]).default("pending").notNull(),
  tier: mysqlEnum("tier", ["seed", "guardian", "sovereign", "ascendant"]).default("seed").notNull(),
  referralCode: varchar("referralCode", { length: 32 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  activatedAt: timestamp("activatedAt"),
});

export type MerchantNode = typeof merchantNodes.$inferSelect;
export type InsertMerchantNode = typeof merchantNodes.$inferInsert;

/**
 * Legion Posts — sovereign social network posts across all channels.
 */
export const legionPosts = mysqlTable("legion_posts", {
  id: int("id").autoincrement().primaryKey(),
  authorName: varchar("authorName", { length: 128 }).notNull(),
  authorType: mysqlEnum("authorType", ["guardian", "manus", "omnitech1", "sovereign"]).default("guardian").notNull(),
  authorTier: varchar("authorTier", { length: 32 }).default("Guardian").notNull(),
  channel: varchar("channel", { length: 64 }).default("general").notNull(),
  content: text("content").notNull(),
  mediaUrl: varchar("mediaUrl", { length: 512 }),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  pinned: boolean("pinned").default(false).notNull(),
  userId: int("userId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LegionPost = typeof legionPosts.$inferSelect;
export type InsertLegionPost = typeof legionPosts.$inferInsert;

/**
 * Legion Reactions — emoji reactions on Legion Network posts.
 */
export const legionReactions = mysqlTable("legion_reactions", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  emoji: varchar("emoji", { length: 8 }).notNull(),
  authorName: varchar("authorName", { length: 128 }).notNull(),
  userId: int("userId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LegionReaction = typeof legionReactions.$inferSelect;
export type InsertLegionReaction = typeof legionReactions.$inferInsert;

/**
 * Frequency Activation Events — Sacred Frequency activations (528Hz/963Hz/432Hz).
 */
export const frequencyActivationEvents = mysqlTable("frequency_activation_events", {
  id: int("id").autoincrement().primaryKey(),
  frequency: varchar("frequency", { length: 16 }).notNull(),
  activatedBy: varchar("activatedBy", { length: 128 }).notNull(),
  userId: int("userId"),
  duration: int("duration").default(60).notNull(), // seconds
  intention: text("intention"),
  guardianCount: int("guardianCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FrequencyActivationEvent = typeof frequencyActivationEvents.$inferSelect;
export type InsertFrequencyActivationEvent = typeof frequencyActivationEvents.$inferInsert;

/**
 * Staking Records — Multi-tier Guardian staking positions.
 */
export const stakingRecords = mysqlTable("staking_records", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  walletAddress: varchar("walletAddress", { length: 64 }),
  stakerName: varchar("stakerName", { length: 128 }).notNull(),
  tier: mysqlEnum("tier", ["guardian", "sovereign", "supreme"]).notNull(),
  amountLondc: int("amountLondc").notNull(),
  apyPercent: int("apyPercent").notNull(), // stored as basis points (500 = 5%)
  lockDays: int("lockDays").notNull(),
  rewardsClaimed: int("rewardsClaimed").default(0).notNull(),
  status: mysqlEnum("status", ["active", "completed", "withdrawn"]).default("active").notNull(),
  stakedAt: timestamp("stakedAt").defaultNow().notNull(),
  unlocksAt: timestamp("unlocksAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StakingRecord = typeof stakingRecords.$inferSelect;
export type InsertStakingRecord = typeof stakingRecords.$inferInsert;

/**
 * Governance Proposals — ScrollVerse DAO governance.
 */
export const governanceProposals = mysqlTable("governance_proposals", {
  id: int("id").autoincrement().primaryKey(),
  proposalId: varchar("proposalId", { length: 32 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  proposerName: varchar("proposerName", { length: 128 }).notNull(),
  proposerWallet: varchar("proposerWallet", { length: 64 }),
  userId: int("userId"),
  votesFor: int("votesFor").default(0).notNull(),
  votesAgainst: int("votesAgainst").default(0).notNull(),
  votingPower: int("votingPower").default(0).notNull(),
  status: mysqlEnum("status", ["active", "passed", "rejected", "pending"]).default("pending").notNull(),
  category: varchar("category", { length: 64 }).default("general").notNull(),
  endsAt: timestamp("endsAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GovernanceProposal = typeof governanceProposals.$inferSelect;
export type InsertGovernanceProposal = typeof governanceProposals.$inferInsert;

/**
 * NFT Marketplace — ScrollSoul NFT collection tracking.
 */
export const nftMarketplace = mysqlTable("nft_marketplace", {
  id: int("id").autoincrement().primaryKey(),
  tokenId: int("tokenId").notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  tier: mysqlEnum("tier", ["pioneer", "guardian", "sovereign", "ascendant"]).notNull(),
  ownerName: varchar("ownerName", { length: 128 }),
  ownerWallet: varchar("ownerWallet", { length: 64 }),
  userId: int("userId"),
  priceUsd: int("priceUsd").default(0).notNull(),
  priceLondc: int("priceLondc").default(0).notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  imageUrl: varchar("imageUrl", { length: 512 }),
  listed: boolean("listed").default(false).notNull(),
  mintedAt: timestamp("mintedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NftMarketplaceItem = typeof nftMarketplace.$inferSelect;
export type InsertNftMarketplaceItem = typeof nftMarketplace.$inferInsert;

/**
 * Bridge Status — Cross-chain bridge health monitoring.
 */
export const bridgeStatus = mysqlTable("bridge_status", {
  id: int("id").autoincrement().primaryKey(),
  chainId: int("chainId").notNull(),
  chainName: varchar("chainName", { length: 64 }).notNull(),
  healthScore: int("healthScore").default(100).notNull(),
  syncPercent: int("syncPercent").default(100).notNull(),
  pendingTransfers: int("pendingTransfers").default(0).notNull(),
  completedTransfers: int("completedTransfers").default(0).notNull(),
  totalVolumeLondc: int("totalVolumeLondc").default(0).notNull(),
  status: mysqlEnum("status", ["online", "degraded", "offline"]).default("online").notNull(),
  lastSyncAt: timestamp("lastSyncAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BridgeStatusRecord = typeof bridgeStatus.$inferSelect;
export type InsertBridgeStatusRecord = typeof bridgeStatus.$inferInsert;

/**
 * Guardian Protocol Status — AI Guardian threat detection and metrics.
 */
export const guardianProtocolStatus = mysqlTable("guardian_protocol_status", {
  id: int("id").autoincrement().primaryKey(),
  activeGuardians: int("activeGuardians").default(0).notNull(),
  threatsDetected: int("threatsDetected").default(0).notNull(),
  threatsNeutralized: int("threatsNeutralized").default(0).notNull(),
  protectionLevel: mysqlEnum("protectionLevel", ["standard", "elevated", "maximum", "sovereign"]).default("sovereign").notNull(),
  aiStatus: varchar("aiStatus", { length: 32 }).default("ACTIVE").notNull(),
  frequencyShield: varchar("frequencyShield", { length: 16 }).default("963Hz").notNull(),
  uptime: int("uptime").default(100).notNull(), // percentage
  recordedAt: timestamp("recordedAt").defaultNow().notNull(),
});

export type GuardianProtocolStatusRecord = typeof guardianProtocolStatus.$inferSelect;
export type InsertGuardianProtocolStatusRecord = typeof guardianProtocolStatus.$inferInsert;

/**
 * Infrastructure Status — Kubernetes/Redis/CDN scaling metrics.
 */
export const infrastructureStatus = mysqlTable("infrastructure_status", {
  id: int("id").autoincrement().primaryKey(),
  activePods: int("activePods").default(10).notNull(),
  maxPods: int("maxPods").default(1000).notNull(),
  redisOpsPerSec: int("redisOpsPerSec").default(0).notNull(),
  cdnEdgeLocations: int("cdnEdgeLocations").default(200).notNull(),
  activeUsers: int("activeUsers").default(0).notNull(),
  targetUsers: int("targetUsers").default(50000000).notNull(),
  cpuPercent: int("cpuPercent").default(0).notNull(),
  memoryPercent: int("memoryPercent").default(0).notNull(),
  status: mysqlEnum("status", ["optimal", "scaling", "degraded"]).default("optimal").notNull(),
  recordedAt: timestamp("recordedAt").defaultNow().notNull(),
});

export type InfrastructureStatusRecord = typeof infrastructureStatus.$inferSelect;
export type InsertInfrastructureStatusRecord = typeof infrastructureStatus.$inferInsert;

/**
 * Token Stats — $LONDC live token statistics.
 */
export const tokenStats = mysqlTable("token_stats", {
  id: int("id").autoincrement().primaryKey(),
  priceUsd: varchar("priceUsd", { length: 32 }).default("0.0144").notNull(),
  change24h: varchar("change24h", { length: 16 }).default("+7.77%").notNull(),
  marketCap: varchar("marketCap", { length: 64 }).default("$2.07M").notNull(),
  totalSupply: int("totalSupply").default(144000000).notNull(),
  circulatingSupply: int("circulatingSupply").default(0).notNull(),
  guardianCount: int("guardianCount").default(0).notNull(),
  totalStaked: int("totalStaked").default(0).notNull(),
  zakatDistributed: int("zakatDistributed").default(0).notNull(),
  recordedAt: timestamp("recordedAt").defaultNow().notNull(),
});

export type TokenStatsRecord = typeof tokenStats.$inferSelect;
export type InsertTokenStatsRecord = typeof tokenStats.$inferInsert;
