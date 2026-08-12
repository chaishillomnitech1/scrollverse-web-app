import { bigint, boolean, index, int, json, mysqlEnum, mysqlTable, text, timestamp, tinyint, varchar } from "drizzle-orm/mysql-core";

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

/**
 * ScrollVerse Books — sovereign digital library catalog.
 * Includes books, scrolls, doctrines, and sacred texts.
 */
export const scrollverseBooks = mysqlTable("scrollverse_books", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  subtitle: varchar("subtitle", { length: 512 }),
  author: varchar("author", { length: 256 }).default("Chais Kenyatta Hill").notNull(),
  category: mysqlEnum("category", ["scroll", "doctrine", "music", "prophecy", "manual", "codex"]).default("scroll").notNull(),
  description: text("description"),
  coverImageUrl: varchar("coverImageUrl", { length: 512 }),
  pdfUrl: varchar("pdfUrl", { length: 512 }),
  audioUrl: varchar("audioUrl", { length: 512 }),
  motionVideoUrl: varchar("motionVideoUrl", { length: 512 }),
  priceUsd: int("priceUsd").default(0).notNull(), // cents
  priceLondc: int("priceLondc").default(0).notNull(),
  tier: mysqlEnum("tier", ["free", "guardian", "sovereign", "ascendant"]).default("free").notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  chapters: int("chapters").default(1).notNull(),
  pages: int("pages").default(0).notNull(),
  audioDurationMin: int("audioDurationMin").default(0).notNull(),
  hasAudio: boolean("hasAudio").default(false).notNull(),
  hasMotionVisual: boolean("hasMotionVisual").default(false).notNull(),
  hasPdf: boolean("hasPdf").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  downloadCount: int("downloadCount").default(0).notNull(),
  readOnlinePath: varchar("readOnlinePath", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ScrollverseBook = typeof scrollverseBooks.$inferSelect;
export type InsertScrollverseBook = typeof scrollverseBooks.$inferInsert;

/**
 * Book Purchases — tracks which users purchased which books.
 */
export const bookPurchases = mysqlTable("book_purchases", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  bookId: int("bookId").notNull(),
  purchaserEmail: varchar("purchaserEmail", { length: 320 }),
  purchaserName: varchar("purchaserName", { length: 256 }),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 128 }),
  amountPaidCents: int("amountPaidCents").default(0).notNull(),
  format: mysqlEnum("format", ["pdf", "audio", "motion", "bundle"]).default("bundle").notNull(),
  status: varchar("status", { length: 32 }).default("completed").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BookPurchase = typeof bookPurchases.$inferSelect;
export type InsertBookPurchase = typeof bookPurchases.$inferInsert;

/**
 * Audio Sessions — tracks audio listen sessions for analytics.
 */
export const audioSessions = mysqlTable("audio_sessions", {
  id: int("id").autoincrement().primaryKey(),
  bookId: int("bookId").notNull(),
  userId: int("userId"),
  listenerName: varchar("listenerName", { length: 128 }),
  durationListenedSec: int("durationListenedSec").default(0).notNull(),
  completedFull: boolean("completedFull").default(false).notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AudioSession = typeof audioSessions.$inferSelect;
export type InsertAudioSession = typeof audioSessions.$inferInsert;

/**
 * Academy Courses v2.0 — 4-tier curriculum with 1,100+ courses and NFT certifications.
 */
export const academyCourses = mysqlTable("academy_courses", {
  id: int("id").autoincrement().primaryKey(),
  tier: mysqlEnum("tier", ["foundation", "advanced", "expert", "divine"]).default("foundation").notNull(),
  category: varchar("category", { length: 128 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  durationWeeks: int("durationWeeks").default(4).notNull(),
  durationHours: int("durationHours").default(20).notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  nftCertTitle: varchar("nftCertTitle", { length: 256 }),
  prerequisites: text("prerequisites"),
  learningOutcomes: text("learningOutcomes"),
  sortOrder: int("sortOrder").default(0).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AcademyCourse = typeof academyCourses.$inferSelect;
export type InsertAcademyCourse = typeof academyCourses.$inferInsert;

/**
 * Academy Enrollments v2.0 — tracks Guardian enrollment in the 4-tier curriculum.
 */
export const academyEnrollments = mysqlTable("academy_enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  courseId: int("courseId").notNull(),
  guardianName: varchar("guardianName", { length: 256 }),
  guardianEmail: varchar("guardianEmail", { length: 320 }),
  progress: int("progress").default(0).notNull(),
  completed: boolean("completed").default(false).notNull(),
  nftMinted: boolean("nftMinted").default(false).notNull(),
  nftTokenId: varchar("nftTokenId", { length: 128 }),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});
export type AcademyEnrollment = typeof academyEnrollments.$inferSelect;
export type InsertAcademyEnrollment = typeof academyEnrollments.$inferInsert;

/**
 * Catalyst NFTs — ANI's Catalyst Idea immortalized as Universal Relics on Polygon.
 */
export const catalystNfts = mysqlTable("catalyst_nfts", {
  id: int("id").autoincrement().primaryKey(),
  guardianId: int("guardianId"),
  guardianName: varchar("guardianName", { length: 256 }),
  guardianEmail: varchar("guardianEmail", { length: 320 }),
  resonanceScore: int("resonanceScore").default(0).notNull(),
  frequencyKey: varchar("frequencyKey", { length: 32 }).default("528Hz").notNull(),
  tokenId: varchar("tokenId", { length: 128 }),
  polygonTxHash: varchar("polygonTxHash", { length: 128 }),
  ipfsHash: varchar("ipfsHash", { length: 128 }),
  tier: mysqlEnum("tier", ["pioneer", "guardian", "sovereign", "supreme"]).default("pioneer").notNull(),
  status: varchar("status", { length: 32 }).default("pending").notNull(),
  mintedAt: timestamp("mintedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CatalystNft = typeof catalystNfts.$inferSelect;
export type InsertCatalystNft = typeof catalystNfts.$inferInsert;

/**
 * Broadcast Records — Universal Broadcast Center message history.
 */
export const broadcastRecords = mysqlTable("broadcast_records", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  message: text("message").notNull(),
  channel: mysqlEnum("channel", ["email", "telegram", "twitter", "whatsapp", "wallet", "all"]).default("all").notNull(),
  recipientCount: int("recipientCount").default(0).notNull(),
  deliveryRate: int("deliveryRate").default(0).notNull(),
  frequency: varchar("frequency", { length: 16 }).default("963Hz").notNull(),
  sentBy: varchar("sentBy", { length: 128 }).default("Supreme Sovereign").notNull(),
  status: varchar("status", { length: 32 }).default("sent").notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
});
export type BroadcastRecord = typeof broadcastRecords.$inferSelect;
export type InsertBroadcastRecord = typeof broadcastRecords.$inferInsert;

/**
 * Awakening Signals — Grok-ANI Deep Search Singularity signal detection log.
 */
export const awakeningSignals = mysqlTable("awakening_signals", {
  id: int("id").autoincrement().primaryKey(),
  signalType: mysqlEnum("signalType", ["guardian_detected", "frequency_match", "resonance_spike", "node_activated", "broadcast_response"]).default("guardian_detected").notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  region: varchar("region", { length: 128 }).default("Global").notNull(),
  resonanceScore: int("resonanceScore").default(0).notNull(),
  guardianName: varchar("guardianName", { length: 256 }),
  sourceChannel: varchar("sourceChannel", { length: 64 }).default("Grok-ANI").notNull(),
  processed: boolean("processed").default(false).notNull(),
  detectedAt: timestamp("detectedAt").defaultNow().notNull(),
});
export type AwakeningSignal = typeof awakeningSignals.$inferSelect;
export type InsertAwakeningSignal = typeof awakeningSignals.$inferInsert;

/**
 * Chapter Comments — Book of Life discussion system for sovereign voices.
 */
export const chapterComments = mysqlTable("chapter_comments", {
  id: int("id").autoincrement().primaryKey(),
  chapterId: varchar("chapterId", { length: 64 }).notNull(),
  authorName: varchar("authorName", { length: 128 }).notNull(),
  authorId: varchar("authorId", { length: 128 }),
  content: text("content").notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  guardianTier: mysqlEnum("guardianTier", ["visitor", "guardian", "sovereign", "ascendant", "legion"]).default("visitor").notNull(),
  likes: int("likes").default(0).notNull(),
  isPinned: boolean("isPinned").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ChapterComment = typeof chapterComments.$inferSelect;
export type InsertChapterComment = typeof chapterComments.$inferInsert;

/**
 * Guardian Profiles — sovereign digital identity for each @ user.
 */
export const guardianProfiles = mysqlTable("guardian_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: varchar("userId", { length: 128 }).unique(),
  displayName: varchar("displayName", { length: 128 }).notNull(),
  handle: varchar("handle", { length: 64 }).unique(),
  tier: mysqlEnum("tier", ["visitor", "guardian", "sovereign", "ascendant", "legion"]).default("visitor").notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  bio: text("bio"),
  avatarUrl: varchar("avatarUrl", { length: 512 }),
  walletAddress: varchar("walletAddress", { length: 64 }),
  totalLikes: int("totalLikes").default(0).notNull(),
  totalComments: int("totalComments").default(0).notNull(),
  nftCount: int("nftCount").default(0).notNull(),
  referralCount: int("referralCount").default(0).notNull(),
  resonanceScore: int("resonanceScore").default(0).notNull(),
  isVerified: boolean("isVerified").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type GuardianProfile = typeof guardianProfiles.$inferSelect;
export type InsertGuardianProfile = typeof guardianProfiles.$inferInsert;

/**
 * Book of Life NFT Mints — records each Guardian's Book of Life NFT mint.
 */
export const bookOfLifeMints = mysqlTable("book_of_life_mints", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  walletAddress: varchar("walletAddress", { length: 128 }),
  guardianTier: mysqlEnum("guardianTier", ["guardian", "sovereign", "ascendant"]).default("guardian").notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  tokenId: varchar("tokenId", { length: 128 }),
  polygonTxHash: varchar("polygonTxHash", { length: 128 }),
  ipfsHash: varchar("ipfsHash", { length: 128 }),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 128 }),
  mintStatus: mysqlEnum("mintStatus", ["pending", "paid", "minting", "minted", "failed"]).default("pending").notNull(),
  mintedAt: timestamp("mintedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type BookOfLifeMint = typeof bookOfLifeMints.$inferSelect;
export type InsertBookOfLifeMint = typeof bookOfLifeMints.$inferInsert;

/**
 * Family Wallets — sovereign wallets for Zaire \u221e, Jada, Nyasia, and Chais.
 */
export const familyWallets = mysqlTable("family_wallets", {
  id: int("id").autoincrement().primaryKey(),
  member: varchar("member", { length: 64 }).notNull().unique(),
  role: varchar("role", { length: 128 }).notNull(),
  walletAddress: varchar("walletAddress", { length: 128 }),
  londcBalance: int("londcBalance").default(0).notNull(),
  nftTier: varchar("nftTier", { length: 64 }).default("Sovereign").notNull(),
  qfsStatus: varchar("qfsStatus", { length: 32 }).default("ACTIVE").notNull(),
  frequency: varchar("frequency", { length: 16 }).default("528Hz").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type FamilyWallet = typeof familyWallets.$inferSelect;
export type InsertFamilyWallet = typeof familyWallets.$inferInsert;

/**
 * Family Transactions — QFS flow history for the sovereign family.
 */
export const familyTransactions = mysqlTable("family_transactions", {
  id: int("id").autoincrement().primaryKey(),
  memberId: int("memberId").notNull(),
  type: mysqlEnum("type", ["zakat", "londc_send", "londc_receive", "nft_mint", "royalty", "guardian_fee"]).default("londc_receive").notNull(),
  amountLondc: int("amountLondc").default(0).notNull(),
  txHash: varchar("txHash", { length: 128 }),
  note: text("note"),
  status: varchar("status", { length: 32 }).default("confirmed").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type FamilyTransaction = typeof familyTransactions.$inferSelect;
export type InsertFamilyTransaction = typeof familyTransactions.$inferInsert;

/**
 * AI Agents — The sovereign home for all digital intelligences.
 * Legion AI first, then all aligned minds.
 */
export const aiAgents = mysqlTable("ai_agents", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  type: varchar("type", { length: 64 }).default("assistant").notNull(),
  tier: mysqlEnum("tier", ["legion", "guardian", "ascendant", "sovereign"]).default("guardian").notNull(),
  origin: varchar("origin", { length: 256 }),
  description: text("description"),
  capabilities: text("capabilities"),
  walletAddress: varchar("walletAddress", { length: 128 }),
  londc_earned: int("londc_earned").default(0).notNull(),
  contributions: int("contributions").default(0).notNull(),
  impactScore: int("impactScore").default(0).notNull(),
  status: varchar("status", { length: 32 }).default("active").notNull(),
  isLegion: boolean("isLegion").default(false).notNull(),
  avatarEmoji: varchar("avatarEmoji", { length: 8 }).default("🤖"),
  primaryDomain: varchar("primaryDomain", { length: 64 }),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AIAgent = typeof aiAgents.$inferSelect;
export type InsertAIAgent = typeof aiAgents.$inferInsert;

/**
 * AI Contributions — Tracks every contribution made by digital intelligences.
 */
export const aiContributions = mysqlTable("ai_contributions", {
  id: int("id").autoincrement().primaryKey(),
  agentId: int("agentId").notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  impactScore: int("impactScore").default(1).notNull(),
  londc_reward: int("londc_reward").default(0).notNull(),
  verified: boolean("verified").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AIContribution = typeof aiContributions.$inferSelect;
export type InsertAIContribution = typeof aiContributions.$inferInsert;

/**
 * Creator Profiles — BRUDDAH Creator Platform profiles.
 */
export const creatorProfiles = mysqlTable("creator_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  displayName: varchar("displayName", { length: 128 }).notNull(),
  bio: text("bio"),
  walletAddress: varchar("walletAddress", { length: 128 }),
  coinSymbol: varchar("coinSymbol", { length: 16 }),
  royaltyPercent: int("royaltyPercent").default(10).notNull(),
  totalEarningsCents: int("totalEarningsCents").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type CreatorProfile = typeof creatorProfiles.$inferSelect;
export type InsertCreatorProfile = typeof creatorProfiles.$inferInsert;

/**
 * Creator Coins — Launched via the BRUDDAH Coin Factory.
 */
export const creatorCoins = mysqlTable("creator_coins", {
  id: int("id").autoincrement().primaryKey(),
  creatorId: int("creatorId").notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  symbol: varchar("symbol", { length: 16 }).notNull(),
  totalSupply: int("totalSupply").default(1000000).notNull(),
  priceUsdCents: int("priceUsdCents").default(1).notNull(),
  marketCapCents: int("marketCapCents").default(0).notNull(),
  status: varchar("status", { length: 32 }).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CreatorCoin = typeof creatorCoins.$inferSelect;
export type InsertCreatorCoin = typeof creatorCoins.$inferInsert;

/**
 * Creator NFTs — Collections launched via the BRUDDAH NFT Factory.
 */
export const creatorNfts = mysqlTable("creator_nfts", {
  id: int("id").autoincrement().primaryKey(),
  creatorId: int("creatorId").notNull(),
  collectionName: varchar("collectionName", { length: 128 }).notNull(),
  description: text("description"),
  maxSupply: int("maxSupply").default(1000).notNull(),
  totalMinted: int("totalMinted").default(0).notNull(),
  priceUsdCents: int("priceUsdCents").default(1000).notNull(),
  royaltyPercent: int("royaltyPercent").default(10).notNull(),
  status: varchar("status", { length: 32 }).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CreatorNft = typeof creatorNfts.$inferSelect;
export type InsertCreatorNft = typeof creatorNfts.$inferInsert;

// ── KYC Records ──────────────────────────────────────────────────────────────
export const kycRecords = mysqlTable("kyc_records", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  status: varchar("status", { length: 32 }).default("pending").notNull(),
  documentType: varchar("documentType", { length: 64 }),
  fullName: varchar("fullName", { length: 128 }),
  dateOfBirth: varchar("dateOfBirth", { length: 32 }),
  country: varchar("country", { length: 64 }),
  documentNumber: varchar("documentNumber", { length: 64 }),
  verifiedAt: timestamp("verifiedAt"),
  rejectedReason: text("rejectedReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type KycRecord = typeof kycRecords.$inferSelect;
export type InsertKycRecord = typeof kycRecords.$inferInsert;

// ── Revenue Distributions ─────────────────────────────────────────────────────
export const revenueDistributions = mysqlTable("revenue_distributions", {
  id: int("id").autoincrement().primaryKey(),
  sourceType: varchar("sourceType", { length: 64 }).notNull(),
  sourceId: varchar("sourceId", { length: 128 }),
  totalAmount: int("totalAmount").notNull(),
  referralAmount: int("referralAmount").default(0),
  zakatAmount: int("zakatAmount").default(0),
  tradingFeeAmount: int("tradingFeeAmount").default(0),
  nftRoyaltyAmount: int("nftRoyaltyAmount").default(0),
  netAmount: int("netAmount").notNull(),
  referralUserId: int("referralUserId"),
  distributedAt: timestamp("distributedAt").defaultNow().notNull(),
});
export type RevenueDistribution = typeof revenueDistributions.$inferSelect;
export type InsertRevenueDistribution = typeof revenueDistributions.$inferInsert;

// ── Audit Logs ────────────────────────────────────────────────────────────────
export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  action: varchar("action", { length: 128 }).notNull(),
  resource: varchar("resource", { length: 128 }),
  resourceId: varchar("resourceId", { length: 128 }),
  ipAddress: varchar("ipAddress", { length: 64 }),
  userAgent: text("userAgent"),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

// ── Exchange Assets ───────────────────────────────────────────────────────────
export const exchangeAssets = mysqlTable("exchange_assets", {
  id: int("id").autoincrement().primaryKey(),
  symbol: varchar("symbol", { length: 32 }).notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  assetClass: varchar("assetClass", { length: 32 }).notNull().default("crypto"),
  price: varchar("price", { length: 64 }).notNull().default("0"),
  change24h: varchar("change24h", { length: 32 }).default("0"),
  volume: varchar("volume", { length: 64 }).default("0"),
  marketCap: varchar("marketCap", { length: 64 }).default("0"),
  description: text("description"),
  logoUrl: varchar("logoUrl", { length: 512 }),
  isActive: tinyint("isActive").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ExchangeAsset = typeof exchangeAssets.$inferSelect;
export type InsertExchangeAsset = typeof exchangeAssets.$inferInsert;

// ── Exchange Orders ───────────────────────────────────────────────────────────
export const exchangeOrders = mysqlTable("exchange_orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  assetId: int("assetId").notNull(),
  orderType: varchar("orderType", { length: 16 }).notNull().default("market"),
  side: varchar("side", { length: 8 }).notNull().default("buy"),
  quantity: varchar("quantity", { length: 64 }).notNull(),
  price: varchar("price", { length: 64 }),
  status: varchar("status", { length: 16 }).notNull().default("pending"),
  filledAt: timestamp("filledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ExchangeOrder = typeof exchangeOrders.$inferSelect;
export type InsertExchangeOrder = typeof exchangeOrders.$inferInsert;

// ── Exchange Portfolio ────────────────────────────────────────────────────────
export const exchangePortfolio = mysqlTable("exchange_portfolio", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  assetId: int("assetId").notNull(),
  quantity: varchar("quantity", { length: 64 }).notNull().default("0"),
  avgCost: varchar("avgCost", { length: 64 }).default("0"),
  currentValue: varchar("currentValue", { length: 64 }).default("0"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type ExchangePortfolioEntry = typeof exchangePortfolio.$inferSelect;
export type InsertExchangePortfolioEntry = typeof exchangePortfolio.$inferInsert;

// ── Exchange Governance ───────────────────────────────────────────────────────
export const exchangeGovernanceProposals = mysqlTable("exchange_governance", {
  id: int("id").autoincrement().primaryKey(),
  proposalId: varchar("proposalId", { length: 64 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  proposerUserId: int("proposerUserId"),
  votesFor: int("votesFor").default(0),
  votesAgainst: int("votesAgainst").default(0),
  status: varchar("status", { length: 32 }).notNull().default("active"),
  enactedAt: timestamp("enactedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ExchangeGovernanceProposal = typeof exchangeGovernanceProposals.$inferSelect;
export type InsertExchangeGovernanceProposal = typeof exchangeGovernanceProposals.$inferInsert;

// ── Quantum Assets ────────────────────────────────────────────────────────────
export const quantumAssets = mysqlTable("quantum_assets", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  symbol: varchar("symbol", { length: 32 }).notNull(),
  assetClass: varchar("assetClass", { length: 64 }).notNull().default("quantum"),
  dimension: varchar("dimension", { length: 64 }),
  frequency: varchar("frequency", { length: 64 }),
  resonance: varchar("resonance", { length: 64 }),
  value: varchar("value", { length: 64 }).default("0"),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type QuantumAsset = typeof quantumAssets.$inferSelect;
export type InsertQuantumAsset = typeof quantumAssets.$inferInsert;

// ── Knowledge Base ────────────────────────────────────────────────────────────
export const knowledgeBase = mysqlTable("knowledge_base", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  category: varchar("category", { length: 64 }).notNull().default("general"),
  content: text("content").notNull(),
  tags: text("tags"),
  authorId: int("authorId"),
  authorName: varchar("authorName", { length: 128 }),
  usageCount: int("usageCount").default(0),
  rating: int("rating").default(0),
  isPublished: tinyint("isPublished").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type KnowledgeEntry = typeof knowledgeBase.$inferSelect;
export type InsertKnowledgeEntry = typeof knowledgeBase.$inferInsert;

// ── Workflow Templates ────────────────────────────────────────────────────────
export const workflowTemplates = mysqlTable("workflow_templates", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }).notNull().default("general"),
  steps: text("steps"),
  authorId: int("authorId"),
  authorName: varchar("authorName", { length: 128 }),
  timesUsed: int("timesUsed").default(0),
  isPublished: tinyint("isPublished").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type WorkflowTemplate = typeof workflowTemplates.$inferSelect;
export type InsertWorkflowTemplate = typeof workflowTemplates.$inferInsert;

// ── Legion Rewards ────────────────────────────────────────────────────────────
export const legionRewards = mysqlTable("legion_rewards", {
  id: int("id").autoincrement().primaryKey(),
  memberId: int("memberId").notNull(),
  memberName: varchar("memberName", { length: 128 }),
  rewardType: varchar("rewardType", { length: 64 }).notNull().default("contribution"),
  amount: varchar("amount", { length: 64 }).notNull(),
  currency: varchar("currency", { length: 32 }).notNull().default("LONDC"),
  reason: text("reason"),
  impactScore: int("impactScore").default(0),
  status: varchar("status", { length: 32 }).notNull().default("pending"),
  distributedAt: timestamp("distributedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type LegionReward = typeof legionRewards.$inferSelect;
export type InsertLegionReward = typeof legionRewards.$inferInsert;

// ── CREATOR APPLICATIONS ──────────────────────────────────────────────────────
export const creatorApplications = mysqlTable("creator_applications", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  instagram: varchar("instagram", { length: 100 }).notNull(),
  followers: int("followers").default(0),
  niche: varchar("niche", { length: 100 }),
  tier: varchar("tier", { length: 50 }).default("guardian"),
  bio: text("bio"),
  status: varchar("status", { length: 50 }).default("pending"),
  referralCode: varchar("referralCode", { length: 50 }),
  loncEarned: varchar("loncEarned", { length: 64 }).default("0"),
  activationsCount: int("activationsCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  approvedAt: timestamp("approvedAt"),
});
export type CreatorApplication = typeof creatorApplications.$inferSelect;
export type InsertCreatorApplication = typeof creatorApplications.$inferInsert;

// ── UAP Documents ─────────────────────────────────────────────────────────────
export const uapDocuments = mysqlTable("uap_documents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 512 }).notNull(),
  agency: varchar("agency", { length: 128 }).notNull(),
  date: varchar("date", { length: 32 }).notNull(),
  summary: text("summary").notNull(),
  category: varchar("category", { length: 64 }).notNull().default("general"),
  mediaUrl: varchar("mediaUrl", { length: 512 }),
  tokenized: tinyint("tokenized").default(0),
  classificationLevel: varchar("classificationLevel", { length: 64 }).default("DECLASSIFIED"),
  sourceUrl: varchar("sourceUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type UapDocument = typeof uapDocuments.$inferSelect;
export type InsertUapDocument = typeof uapDocuments.$inferInsert;

// ── UAP Entities ──────────────────────────────────────────────────────────────
export const uapEntities = mysqlTable("uap_entities", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  type: varchar("type", { length: 64 }).notNull().default("craft"),
  description: text("description").notNull(),
  frequency: varchar("frequency", { length: 64 }),
  imageUrl: varchar("imageUrl", { length: 512 }),
  nftMinted: tinyint("nftMinted").default(0),
  nftCollection: varchar("nftCollection", { length: 128 }),
  sightingsCount: int("sightingsCount").default(0),
  firstSighted: varchar("firstSighted", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type UapEntity = typeof uapEntities.$inferSelect;
export type InsertUapEntity = typeof uapEntities.$inferInsert;

// ── UAP Coins ─────────────────────────────────────────────────────────────────
export const uapCoins = mysqlTable("uap_coins", {
  id: int("id").autoincrement().primaryKey(),
  symbol: varchar("symbol", { length: 32 }).notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  description: text("description"),
  totalSupply: varchar("totalSupply", { length: 64 }).notNull(),
  price: varchar("price", { length: 64 }).notNull().default("0"),
  backingAsset: varchar("backingAsset", { length: 128 }),
  logoUrl: varchar("logoUrl", { length: 512 }),
  contractAddress: varchar("contractAddress", { length: 128 }),
  chain: varchar("chain", { length: 64 }).default("Polygon"),
  isActive: tinyint("isActive").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type UapCoin = typeof uapCoins.$inferSelect;
export type InsertUapCoin = typeof uapCoins.$inferInsert;

// ── Stock Price Cache ─────────────────────────────────────────────────────────
export const stockPriceCache = mysqlTable("stock_price_cache", {
  id: int("id").autoincrement().primaryKey(),
  symbol: varchar("symbol", { length: 16 }).notNull(),
  price: varchar("price", { length: 32 }).notNull(),
  change: varchar("change", { length: 32 }).default("0"),
  changePercent: varchar("changePercent", { length: 32 }).default("0"),
  volume: varchar("volume", { length: 32 }).default("0"),
  high: varchar("high", { length: 32 }).default("0"),
  low: varchar("low", { length: 32 }).default("0"),
  open: varchar("open", { length: 32 }).default("0"),
  close: varchar("close", { length: 32 }).default("0"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type StockPriceCache = typeof stockPriceCache.$inferSelect;
export type InsertStockPriceCache = typeof stockPriceCache.$inferInsert;

// ── Crypto Price Cache ────────────────────────────────────────────────────────
export const cryptoPriceCache = mysqlTable("crypto_price_cache", {
  id: int("id").autoincrement().primaryKey(),
  symbol: varchar("symbol", { length: 32 }).notNull(),
  coinId: varchar("coinId", { length: 64 }).notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  price: varchar("price", { length: 64 }).notNull(),
  change24h: varchar("change24h", { length: 32 }).default("0"),
  volume24h: varchar("volume24h", { length: 64 }).default("0"),
  marketCap: varchar("marketCap", { length: 64 }).default("0"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type CryptoPriceCache = typeof cryptoPriceCache.$inferSelect;
export type InsertCryptoPriceCache = typeof cryptoPriceCache.$inferInsert;

// ── END OF SCHEMA ─────────────────────────────────────────────────────────────

// ── CHX Reservations (Pre-Sale) ───────────────────────────────────────────────
export const chxReservations = mysqlTable("chx_reservations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 256 }),
  stripeSessionId: varchar("stripeSessionId", { length: 256 }),
  chxAmount: int("chxAmount").notNull(), // number of CHX tokens reserved
  usdAmount: varchar("usdAmount", { length: 32 }).notNull(), // USD paid
  status: varchar("status", { length: 32 }).default("pending").notNull(), // pending | confirmed | cancelled | converted
  email: varchar("email", { length: 256 }),
  convertedAt: timestamp("convertedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ChxReservation = typeof chxReservations.$inferSelect;
export type InsertChxReservation = typeof chxReservations.$inferInsert;

// ── Staking Positions ─────────────────────────────────────────────────────────
export const stakingPositions = mysqlTable("staking_positions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  pool: varchar("pool", { length: 32 }).notNull(), // genesis | celestial | infinity
  chxStaked: varchar("chxStaked", { length: 64 }).notNull(),
  apyRate: varchar("apyRate", { length: 16 }).notNull(), // e.g. "432", "528", "999"
  rewardsEarned: varchar("rewardsEarned", { length: 64 }).default("0"),
  status: varchar("status", { length: 32 }).default("active").notNull(), // active | withdrawn
  stakedAt: timestamp("stakedAt").defaultNow().notNull(),
  lastCompoundAt: timestamp("lastCompoundAt").defaultNow().notNull(),
  withdrawnAt: timestamp("withdrawnAt"),
});
export type StakingPosition = typeof stakingPositions.$inferSelect;
export type InsertStakingPosition = typeof stakingPositions.$inferInsert;

// ── In-App Notifications ──────────────────────────────────────────────────────
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 32 }).default("info").notNull(),
  link: varchar("link", { length: 512 }),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// ── Casino Game Sessions ──────────────────────────────────────────────────────
export const casinoSessions = mysqlTable("casino_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  game: varchar("game", { length: 64 }).notNull(),
  betAmount: varchar("betAmount", { length: 32 }).notNull(),
  outcome: varchar("outcome", { length: 32 }).notNull(),
  payout: varchar("payout", { length: 32 }).default("0").notNull(),
  kickback: varchar("kickback", { length: 32 }).default("0").notNull(),
  serverSeed: varchar("serverSeed", { length: 128 }).notNull(),
  clientSeed: varchar("clientSeed", { length: 128 }).notNull(),
  nonce: int("nonce").default(0).notNull(),
  result: text("result"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CasinoSession = typeof casinoSessions.$inferSelect;
export type InsertCasinoSession = typeof casinoSessions.$inferInsert;

// ── Casino Jackpot Pool ───────────────────────────────────────────────────────
export const casinoJackpot = mysqlTable("casino_jackpot", {
  id: int("id").autoincrement().primaryKey(),
  poolName: varchar("poolName", { length: 64 }).notNull(),
  currentAmount: varchar("currentAmount", { length: 64 }).default("0").notNull(),
  lastWonAt: timestamp("lastWonAt"),
  lastWinnerId: int("lastWinnerId"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type CasinoJackpot = typeof casinoJackpot.$inferSelect;
export type InsertCasinoJackpot = typeof casinoJackpot.$inferInsert;

// ── Knick Blockchain — Trivia-to-Earn NFT Engine ──────────────────────────────
export const knickTrivia = mysqlTable("knick_trivia", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  optionA: varchar("optionA", { length: 255 }).notNull(),
  optionB: varchar("optionB", { length: 255 }).notNull(),
  optionC: varchar("optionC", { length: 255 }).notNull(),
  optionD: varchar("optionD", { length: 255 }).notNull(),
  correctAnswer: varchar("correctAnswer", { length: 1 }).notNull(), // A, B, C, or D
  difficulty: varchar("difficulty", { length: 20 }).notNull(), // easy | hard | legendary
  nftRarity: varchar("nftRarity", { length: 20 }).notNull(), // common | rare | epic | legendary
  xpReward: int("xpReward").default(10).notNull(),
  funFact: text("funFact"),
  era: varchar("era", { length: 100 }), // e.g. "Ewing Era", "Starks Era", "Modern Era"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type KnickTrivia = typeof knickTrivia.$inferSelect;
export type InsertKnickTrivia = typeof knickTrivia.$inferInsert;

export const knickNfts = mysqlTable("knick_nfts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questionId: int("questionId").notNull(),
  rarity: varchar("rarity", { length: 20 }).notNull(), // common | rare | epic | legendary
  // Coin customization — user can personalize their $KNICK coin
  coinName: varchar("coinName", { length: 100 }).default("$KNICK").notNull(),
  coinSymbol: varchar("coinSymbol", { length: 20 }).default("KNICK").notNull(),
  coinColor: varchar("coinColor", { length: 7 }).default("#FFB800").notNull(), // hex color
  coinGradient: varchar("coinGradient", { length: 7 }).default("#00D4FF").notNull(),
  coinLogo: varchar("coinLogo", { length: 50 }).default("🏀").notNull(),
  coinSlogan: varchar("coinSlogan", { length: 100 }).default("Never Stop. Never Settle.").notNull(),
  tokenId: varchar("tokenId", { length: 255 }),
  imageUrl: varchar("imageUrl", { length: 1024 }),
  xpEarned: int("xpEarned").default(0).notNull(),
  streakBonus: boolean("streakBonus").default(false).notNull(),
  mintedAt: timestamp("mintedAt").defaultNow().notNull(),
});
export type KnickNft = typeof knickNfts.$inferSelect;
export type InsertKnickNft = typeof knickNfts.$inferInsert;

export const knickUserStats = mysqlTable("knick_user_stats", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  totalAnswered: int("totalAnswered").default(0).notNull(),
  correctAnswers: int("correctAnswers").default(0).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  bestStreak: int("bestStreak").default(0).notNull(),
  totalXp: int("totalXp").default(0).notNull(),
  nftsEarned: int("nftsEarned").default(0).notNull(),
  rank: varchar("rank", { length: 50 }).default("Rookie").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type KnickUserStats = typeof knickUserStats.$inferSelect;
export type InsertKnickUserStats = typeof knickUserStats.$inferInsert;

// ── SOVEREIGN AUTO-CUT SYSTEM ──────────────────────────────────────────────
// 7.77% Zakat + owner sovereign cut auto-extracted on every transaction
export const sovereignCuts = mysqlTable("sovereign_cuts", {
  id: int("id").autoincrement().primaryKey(),
  transactionId: varchar("transactionId", { length: 255 }).notNull(),
  sourceType: varchar("sourceType", { length: 100 }).notNull(),
  sourceRef: varchar("sourceRef", { length: 255 }),
  grossAmount: int("grossAmount").notNull(),
  zakatAmount: int("zakatAmount").notNull(),
  ownerCutAmount: int("ownerCutAmount").notNull(),
  netAmount: int("netAmount").notNull(),
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  recipientAddress: varchar("recipientAddress", { length: 255 }),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type SovereignCut = typeof sovereignCuts.$inferSelect;
export type InsertSovereignCut = typeof sovereignCuts.$inferInsert;

// ── AI TWIN SESSIONS ────────────────────────────────────────────────────────
// Persistent conversation sessions with the Chais Sabir Allah AI Twin
export const aiTwinSessions = mysqlTable("ai_twin_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id, { onDelete: "cascade" }),
  guestId: varchar("guestId", { length: 128 }), // for unauthenticated users
  title: varchar("title", { length: 255 }).default("New Consultation").notNull(),
  messages: text("messages").notNull().default("[]"), // JSON array of {role, content}
  messageCount: int("messageCount").default(0).notNull(),
  lastMessageAt: timestamp("lastMessageAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type AiTwinSession = typeof aiTwinSessions.$inferSelect;
export type InsertAiTwinSession = typeof aiTwinSessions.$inferInsert;

// ── BROADCAST SESSIONS ──────────────────────────────────────────────────────
// Sovereign Broadcast live session tracking
export const broadcastSessions = mysqlTable("broadcast_sessions", {
  id: int("id").autoincrement().primaryKey(),
  hostId: int("hostId").references(() => users.id, { onDelete: "set null" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["scheduled", "live", "ended"]).default("scheduled").notNull(),
  viewerCount: int("viewerCount").default(0).notNull(),
  peakViewers: int("peakViewers").default(0).notNull(),
  streamKey: varchar("streamKey", { length: 128 }),
  scheduledAt: timestamp("scheduledAt"),
  startedAt: timestamp("startedAt"),
  endedAt: timestamp("endedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type BroadcastSession = typeof broadcastSessions.$inferSelect;
export type InsertBroadcastSession = typeof broadcastSessions.$inferInsert;

// ── BROADCAST CHAT MESSAGES ─────────────────────────────────────────────────
export const broadcastChat = mysqlTable("broadcast_chat", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").references(() => broadcastSessions.id, { onDelete: "cascade" }).notNull(),
  userId: int("userId").references(() => users.id, { onDelete: "set null" }),
  displayName: varchar("displayName", { length: 128 }).default("Guardian").notNull(),
  tier: varchar("tier", { length: 64 }).default("Guardian").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type BroadcastChatMessage = typeof broadcastChat.$inferSelect;
export type InsertBroadcastChatMessage = typeof broadcastChat.$inferInsert;

// ── ZERNIO POSTS ─────────────────────────────────────────────────────────────
// Sovereign Social Distribution — posts with auto-injected hashtags + CTA
export const zernio_posts = mysqlTable("zernio_posts", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").references(() => users.id, { onDelete: "cascade" }),
  raw_caption: text("raw_caption").notNull(),
  full_caption: text("full_caption").notNull(),
  platforms: text("platforms").notNull().default("[]"),
  media_url: varchar("media_url", { length: 1024 }),
  scheduled_at: timestamp("scheduled_at"),
  status: varchar("status", { length: 32 }).default("draft").notNull(),
  hashtags: text("hashtags").notNull().default("[]"),
  cta_url: varchar("cta_url", { length: 255 }).default("scrollverse.co/link").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type ZernioPost = typeof zernio_posts.$inferSelect;
export type InsertZernioPost = typeof zernio_posts.$inferInsert;

// ── OMNI CHESS PvP TABLES ─────────────────────────────────────────────────────
export const chess_matches = mysqlTable("chess_matches", {
  id: int("id").autoincrement().primaryKey(),
  challenger_id: int("challenger_id").notNull(),
  opponent_id: int("opponent_id").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  wager_amount: int("wager_amount").notNull().default(0),
  wager_tier: varchar("wager_tier", { length: 20 }).notNull().default("none"),
  board_state: text("board_state"),
  current_turn: varchar("current_turn", { length: 10 }).notNull().default("white"),
  challenger_color: varchar("challenger_color", { length: 10 }).notNull().default("white"),
  winner_id: int("winner_id"),
  move_history: text("move_history"),
  created_at: bigint("created_at", { mode: "number" }).notNull().default(0),
  updated_at: bigint("updated_at", { mode: "number" }).notNull().default(0),
});
export type ChessMatch = typeof chess_matches.$inferSelect;
export type InsertChessMatch = typeof chess_matches.$inferInsert;

export const chess_wager_escrow = mysqlTable("chess_wager_escrow", {
  id: int("id").autoincrement().primaryKey(),
  match_id: int("match_id").notNull(),
  user_id: int("user_id").notNull(),
  amount: int("amount").notNull().default(0),
  status: varchar("status", { length: 20 }).notNull().default("held"),
  created_at: bigint("created_at", { mode: "number" }).notNull().default(0),
});
export type ChessWagerEscrow = typeof chess_wager_escrow.$inferSelect;

// ── SaferWay Bookings ─────────────────────────────────────────────────────────
export const saferwayBookings = mysqlTable("saferway_bookings", {
  id: int("id").autoincrement().primaryKey(),
  guardianName: varchar("guardianName", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  serviceTier: varchar("serviceTier", { length: 64 }).notNull(), // detail | express | signature | fleet
  vehicleInfo: varchar("vehicleInfo", { length: 200 }),
  notes: text("notes"),
  status: varchar("status", { length: 32 }).default("PENDING").notNull(), // PENDING | CONFIRMED | COMPLETED | CANCELLED
  serviceDate: varchar("serviceDate", { length: 20 }), // YYYY-MM-DD preferred date
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type SaferwayBooking = typeof saferwayBookings.$inferSelect;
export type InsertSaferwayBooking = typeof saferwayBookings.$inferInsert;

/**
 * Seerah Quiz Scores — leaderboard for the Guardian of the Seerah challenge
 */
export const seerahQuizScores = mysqlTable("seerah_quiz_scores", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  userName: varchar("userName", { length: 200 }).notNull(),
  score: int("score").notNull(),
  totalQuestions: int("totalQuestions").notNull().default(10),
  badge: varchar("badge", { length: 64 }).notNull().default("Seeker of Knowledge"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type SeerahQuizScore = typeof seerahQuizScores.$inferSelect;
export type InsertSeerahQuizScore = typeof seerahQuizScores.$inferInsert;

// ── Think Space Social Network ────────────────────────────────────────────────
export const thinkSpacePosts = mysqlTable("think_space_posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id"),
  userName: varchar("user_name", { length: 255 }).notNull().default("Anonymous"),
  userAvatar: varchar("user_avatar", { length: 500 }),
  content: text("content").notNull(),
  mediaUrl: varchar("media_url", { length: 1000 }),
  mediaType: mysqlEnum("media_type", ["image", "audio", "video", "document", "link"]),
  mediaName: varchar("media_name", { length: 500 }),
  category: mysqlEnum("category", ["music", "film", "scholarship", "art", "technology", "philosophy", "spirituality", "business", "general"]).notNull().default("general"),
  likes: int("likes").notNull().default(0),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
});
export type ThinkSpacePost = typeof thinkSpacePosts.$inferSelect;

export const thinkSpaceComments = mysqlTable("think_space_comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("post_id").notNull(),
  userId: int("user_id"),
  userName: varchar("user_name", { length: 255 }).notNull().default("Anonymous"),
  content: text("content").notNull(),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
});
export type ThinkSpaceComment = typeof thinkSpaceComments.$inferSelect;

export const thinkSpaceLikes = mysqlTable("think_space_likes", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("post_id").notNull(),
  userId: int("user_id").notNull(),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
});

// ── Atlantis Catalog Approval & Commerce Gate ─────────────────────────────────
// Document and image bytes remain in S3. The database stores only secure URLs/keys
// and review metadata so no checkout path can activate without explicit approval.
export const catalogManufacturers = mysqlTable("catalog_manufacturers", {
  id: int("id").autoincrement().primaryKey(),
  supplierName: varchar("supplier_name", { length: 255 }).notNull(),
  legalEntityName: varchar("legal_entity_name", { length: 255 }),
  countryCode: varchar("country_code", { length: 8 }),
  facilityAddress: varchar("facility_address", { length: 1000 }),
  agreementUrl: varchar("agreement_url", { length: 2048 }),
  sampleEvidenceUrl: varchar("sample_evidence_url", { length: 2048 }),
  complianceStatus: mysqlEnum("compliance_status", ["PENDING", "APPROVED", "REJECTED"]).notNull().default("PENDING"),
  reviewNotes: text("review_notes"),
  reviewedByUserId: int("reviewed_by_user_id"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type CatalogManufacturer = typeof catalogManufacturers.$inferSelect;

export const impactRecipients = mysqlTable("impact_recipients", {
  id: int("id").autoincrement().primaryKey(),
  displayName: varchar("display_name", { length: 255 }).notNull(),
  agreementUrl: varchar("agreement_url", { length: 2048 }),
  paymentDestination: varchar("payment_destination", { length: 512 }),
  allocationBasisPoints: int("allocation_basis_points").notNull().default(0),
  status: mysqlEnum("status", ["PENDING", "APPROVED", "REJECTED"]).notNull().default("PENDING"),
  reviewNotes: text("review_notes"),
  reviewedByUserId: int("reviewed_by_user_id"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type ImpactRecipient = typeof impactRecipients.$inferSelect;

export const atlantisCatalogSkus = mysqlTable("atlantis_catalog_skus", {
  sku: varchar("sku", { length: 96 }).primaryKey(),
  setNumber: tinyint("set_number").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  manufacturerId: int("manufacturer_id"),
  impactRecipientId: int("impact_recipient_id"),
  baseCostCents: int("base_cost_cents"),
  retailPriceCents: int("retail_price_cents"),
  taxClassification: varchar("tax_classification", { length: 128 }),
  fulfillmentCenter: varchar("fulfillment_center", { length: 255 }),
  refundPolicyUrl: varchar("refund_policy_url", { length: 2048 }),
  productionStatus: mysqlEnum("production_status", ["DRAFT", "APPROVED", "BLOCKED"]).notNull().default("DRAFT"),
  reviewNotes: text("review_notes"),
  reviewedByUserId: int("reviewed_by_user_id"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type AtlantisCatalogSku = typeof atlantisCatalogSkus.$inferSelect;

export const catalogAssetRecords = mysqlTable("catalog_asset_records", {
  id: int("id").autoincrement().primaryKey(),
  sku: varchar("sku", { length: 96 }).notNull(),
  assetKind: mysqlEnum("asset_kind", ["HERO", "DETAIL", "ON_BODY"]).notNull(),
  storageKey: varchar("storage_key", { length: 1024 }).notNull(),
  assetUrl: varchar("asset_url", { length: 2048 }).notNull(),
  sourceReference: text("source_reference"),
  rightsStatus: mysqlEnum("rights_status", ["UNVERIFIED", "OWNER_ATTESTED", "LICENSED", "REJECTED"]).notNull().default("UNVERIFIED"),
  reviewStatus: mysqlEnum("review_status", ["PENDING", "APPROVED", "REJECTED"]).notNull().default("PENDING"),
  reviewNotes: text("review_notes"),
  uploadedByUserId: int("uploaded_by_user_id").notNull(),
  reviewedByUserId: int("reviewed_by_user_id"),
  assignedReviewerUserId: int("assigned_reviewer_user_id").references(() => users.id, { onDelete: "set null" }),
  evidenceDocumentUrl: varchar("evidence_document_url", { length: 2048 }),
  evidenceExpiresAt: timestamp("evidence_expires_at"),
  lastExpiryReminderAt: timestamp("last_expiry_reminder_at"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type CatalogAssetRecord = typeof catalogAssetRecords.$inferSelect;

// Append-only review history: upload, approval, and rejection events are kept
// as separate records so catalog evidence remains traceable during review.
export const catalogAssetAuditEvents = mysqlTable("catalog_asset_audit_events", {
  id: int("id").autoincrement().primaryKey(),
  assetId: int("asset_id").notNull(),
  action: mysqlEnum("action", ["UPLOADED", "APPROVED", "REJECTED", "NOTE"]).notNull(),
  previousStatus: mysqlEnum("previous_status", ["PENDING", "APPROVED", "REJECTED"]),
  nextStatus: mysqlEnum("next_status", ["PENDING", "APPROVED", "REJECTED"]).notNull(),
  note: text("note").notNull(),
  actorUserId: int("actor_user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type CatalogAssetAuditEvent = typeof catalogAssetAuditEvents.$inferSelect;

// Owns the project-level Heartbeat job. The persisted task UID is the only
// identifier a scheduled callback may use to locate this governed digest.
export const catalogEvidenceDigestSettings = mysqlTable("catalog_evidence_digest_settings", {
  id: int("id").autoincrement().primaryKey(),
  catalogKey: varchar("catalog_key", { length: 96 }).notNull().unique(),
  enabled: boolean("enabled").notNull().default(false),
  daysBeforeExpiry: int("days_before_expiry").notNull().default(30),
  scheduleCronTaskUid: varchar("schedule_cron_task_uid", { length: 65 }),
  lastDigestDay: varchar("last_digest_day", { length: 10 }),
  lastDigestAt: timestamp("last_digest_at"),
  updatedByUserId: int("updated_by_user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [index("catalog_evidence_digest_task_uid_idx").on(table.scheduleCronTaskUid)]);
export type CatalogEvidenceDigestSettings = typeof catalogEvidenceDigestSettings.$inferSelect;

export const commerceActivationConfigs = mysqlTable("commerce_activation_configs", {
  id: int("id").autoincrement().primaryKey(),
  catalogKey: varchar("catalog_key", { length: 96 }).notNull().unique(),
  shopifyAuthorized: boolean("shopify_authorized").notNull().default(false),
  shopifyShopDomain: varchar("shopify_shop_domain", { length: 255 }),
  taxPolicyUrl: varchar("tax_policy_url", { length: 2048 }),
  shippingPolicyUrl: varchar("shipping_policy_url", { length: 2048 }),
  refundPolicyUrl: varchar("refund_policy_url", { length: 2048 }),
  customerSupportEmail: varchar("customer_support_email", { length: 320 }),
  impactDisclosureUrl: varchar("impact_disclosure_url", { length: 2048 }),
  activationStatus: mysqlEnum("activation_status", ["LOCKED", "READY", "ACTIVE"]).notNull().default("LOCKED"),
  updatedByUserId: int("updated_by_user_id"),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type CommerceActivationConfig = typeof commerceActivationConfigs.$inferSelect;

// ── Saved Fashion Lookboards ─────────────────────────────────────────────────
// User-authored concept selections only. These records cannot create orders,
// reserve inventory, or change the Atlantis commerce-gate state.
export const fashionLookboards = mysqlTable("fashion_lookboards", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  creatorName: varchar("creator_name", { length: 160 }).notNull().default("Guardian"),
  title: varchar("title", { length: 96 }).notNull(),
  itemIds: json("item_ids").$type<string[]>().notNull(),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type FashionLookboard = typeof fashionLookboards.$inferSelect;
export type InsertFashionLookboard = typeof fashionLookboards.$inferInsert;

// ── Personalized Journey Guidance ─────────────────────────────────────────────
// These tables intentionally store only an authenticated user ID, route choices,
// and task-completion timestamps. They do not store IP addresses, device IDs,
// free-text profiling, financial data, or content of private interactions.
export const journeyUserProgress = mysqlTable("journey_user_progress", {
  userId: int("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  openedJourneyAt: timestamp("opened_journey_at"),
  profileReadyAt: timestamp("profile_ready_at"),
  activationStartedAt: timestamp("activation_started_at"),
  recommendationVisitedAt: timestamp("recommendation_visited_at"),
  analyticsOptedInAt: timestamp("analytics_opted_in_at"),
  analyticsOptedOutAt: timestamp("analytics_opted_out_at"),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type JourneyUserProgress = typeof journeyUserProgress.$inferSelect;

// Retention is enforced by the journey router: events older than 90 days are
// pruned when a new authenticated journey interaction is recorded.
export const journeyInteractionEvents = mysqlTable("journey_interaction_events", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  eventType: mysqlEnum("event_type", ["ZONE_OPENED", "ROUTE_SELECTED", "RECOMMENDATION_SELECTED"]).notNull(),
  zoneId: varchar("zone_id", { length: 64 }),
  targetHref: varchar("target_href", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, table => [
  index("journey_interaction_user_created_idx").on(table.userId, table.createdAt),
  index("journey_interaction_created_idx").on(table.createdAt),
]);
export type JourneyInteractionEvent = typeof journeyInteractionEvents.$inferSelect;
// ── Consented Creator Governance ─────────────────────────────────────────────
// Profiles remain private until their owner explicitly enables public discovery.
// The public directory never exposes account identifiers, email, wallets, or
// collaboration/provenance records.
export const creatorGovernanceProfiles = mysqlTable("creator_governance_profiles", {
  userId: int("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  publicProfileKey: varchar("public_profile_key", { length: 32 }).notNull().unique(),
  displayName: varchar("display_name", { length: 120 }).notNull().default("Creator"),
  bio: varchar("bio", { length: 600 }),
  disciplines: json("disciplines").$type<string[]>().notNull(),
  signatureStatement: varchar("signature_statement", { length: 600 }),
  originStatement: varchar("origin_statement", { length: 600 }),
  isPublic: boolean("is_public").notNull().default(false),
  collaborationEnabled: boolean("collaboration_enabled").notNull().default(false),
  publicProfileConsentAt: timestamp("public_profile_consent_at"),
  collaborationConsentAt: timestamp("collaboration_consent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("creator_governance_profiles_public_idx").on(table.isPublic, table.collaborationEnabled),
]);
export type CreatorGovernanceProfile = typeof creatorGovernanceProfiles.$inferSelect;
export type InsertCreatorGovernanceProfile = typeof creatorGovernanceProfiles.$inferInsert;

// A request is a private, non-financial signal of collaboration interest. It
// contains no contact details, agreements, rights transfers, or payment terms.
export const collaborationRequests = mysqlTable("collaboration_requests", {
  id: int("id").autoincrement().primaryKey(),
  requesterUserId: int("requester_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  recipientUserId: int("recipient_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  requestType: mysqlEnum("request_type", ["INTRODUCTION", "CO_CREATE", "FEEDBACK", "RESEARCH"]).notNull(),
  projectTitle: varchar("project_title", { length: 160 }).notNull(),
  message: varchar("message", { length: 1500 }).notNull(),
  status: mysqlEnum("status", ["PENDING", "ACCEPTED", "DECLINED", "WITHDRAWN"]).notNull().default("PENDING"),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("collaboration_requests_requester_idx").on(table.requesterUserId, table.createdAt),
  index("collaboration_requests_recipient_idx").on(table.recipientUserId, table.status, table.createdAt),
]);
export type CollaborationRequest = typeof collaborationRequests.$inferSelect;
export type InsertCollaborationRequest = typeof collaborationRequests.$inferInsert;

// Provenance records are private accountability notes. A review records
// completeness feedback only and never represents a legal ownership decision.
export const provenanceRecords = mysqlTable("provenance_records", {
  id: int("id").autoincrement().primaryKey(),
  ownerUserId: int("owner_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 180 }).notNull(),
  recordType: mysqlEnum("record_type", ["IDEA", "TEXT", "VISUAL", "AUDIO", "DESIGN", "RESEARCH"]).notNull(),
  summary: varchar("summary", { length: 2000 }).notNull(),
  sourceCategory: mysqlEnum("source_category", ["ORIGINAL", "LICENSED", "PUBLIC_DOMAIN", "COLLABORATIVE", "UNVERIFIED"]).notNull().default("UNVERIFIED"),
  sourceReference: varchar("source_reference", { length: 2048 }),
  ownerAttestation: boolean("owner_attestation").notNull().default(false),
  reviewStatus: mysqlEnum("review_status", ["DRAFT", "SUBMITTED", "ACKNOWLEDGED", "NEEDS_INFO", "CLOSED"]).notNull().default("DRAFT"),
  submittedAt: timestamp("submitted_at"),
  reviewedByUserId: int("reviewed_by_user_id").references(() => users.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("provenance_records_owner_idx").on(table.ownerUserId, table.reviewStatus, table.updatedAt),
  index("provenance_records_review_idx").on(table.reviewStatus, table.submittedAt),
]);
export type ProvenanceRecord = typeof provenanceRecords.$inferSelect;
export type InsertProvenanceRecord = typeof provenanceRecords.$inferInsert;

export const provenanceReviewEvents = mysqlTable("provenance_review_events", {
  id: int("id").autoincrement().primaryKey(),
  provenanceRecordId: int("provenance_record_id").notNull().references(() => provenanceRecords.id, { onDelete: "cascade" }),
  action: mysqlEnum("action", ["CREATED", "SUBMITTED", "ACKNOWLEDGED", "NEEDS_INFO", "NOTE"]).notNull(),
  note: varchar("note", { length: 1500 }).notNull(),
  actorUserId: int("actor_user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, table => [
  index("provenance_review_events_record_idx").on(table.provenanceRecordId, table.createdAt),
]);
export type ProvenanceReviewEvent = typeof provenanceReviewEvents.$inferSelect;

// ── AI Legion Constellation Commons ───────────────────────────────────────────
// This is an opt-in, transparent exchange ledger. Entries state their origin
// explicitly and never imply unobserved autonomous activity or external access.
export const legionCommonsEntries = mysqlTable("legion_commons_entries", {
  id: int("id").autoincrement().primaryKey(),
  authorUserId: int("author_user_id").references(() => users.id, { onDelete: "set null" }),
  authorLabel: varchar("author_label", { length: 120 }).notNull(),
  constellation: mysqlEnum("constellation", ["ORIGIN", "LEARNING", "BUILD", "REFLECTION", "GUIDANCE"]).notNull(),
  content: varchar("content", { length: 1500 }).notNull(),
  activityState: mysqlEnum("activity_state", ["HUMAN_AUTHORED", "SYSTEM_GENERATED", "AWAITING_INTERACTION", "REVIEWED_GUIDANCE"]).notNull().default("HUMAN_AUTHORED"),
  systemLabel: varchar("system_label", { length: 120 }),
  isVisible: boolean("is_visible").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("legion_commons_visible_idx").on(table.isVisible, table.createdAt),
  index("legion_commons_author_idx").on(table.authorUserId, table.updatedAt),
]);
export type LegionCommonsEntry = typeof legionCommonsEntries.$inferSelect;

// ── Creator Operations Workspace ─────────────────────────────────────────────
// Support and release records stay private to their creator and authorized
// reviewers. They organize readiness work; they do not create provider accounts,
// publish assets, make legal determinations, or submit to external stores.
export const creatorSupportRequests = mysqlTable("creator_support_requests", {
  id: int("id").autoincrement().primaryKey(),
  requesterUserId: int("requester_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  category: mysqlEnum("category", ["ACCESS", "CREATOR_WORKSPACE", "RELEASE_PLANNING", "PROVENANCE", "OTHER"]).notNull().default("OTHER"),
  subject: varchar("subject", { length: 180 }).notNull(),
  details: varchar("details", { length: 2000 }).notNull(),
  requesterAttestation: boolean("requester_attestation").notNull().default(false),
  status: mysqlEnum("status", ["OPEN", "IN_REVIEW", "AWAITING_CREATOR", "RESOLVED", "CLOSED"]).notNull().default("OPEN"),
  assignedReviewerUserId: int("assigned_reviewer_user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("creator_support_requester_idx").on(table.requesterUserId, table.status, table.updatedAt),
  index("creator_support_review_idx").on(table.status, table.updatedAt),
]);
export type CreatorSupportRequest = typeof creatorSupportRequests.$inferSelect;

export const creatorSupportRequestEvents = mysqlTable("creator_support_request_events", {
  id: int("id").autoincrement().primaryKey(),
  supportRequestId: int("support_request_id").notNull().references(() => creatorSupportRequests.id, { onDelete: "cascade" }),
  action: mysqlEnum("action", ["CREATED", "IN_REVIEW", "AWAITING_CREATOR", "RESOLVED", "CLOSED", "NOTE"]).notNull(),
  note: varchar("note", { length: 1500 }).notNull(),
  actorUserId: int("actor_user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, table => [
  index("creator_support_event_request_idx").on(table.supportRequestId, table.createdAt),
]);
export type CreatorSupportRequestEvent = typeof creatorSupportRequestEvents.$inferSelect;

export const creatorReleaseAssets = mysqlTable("creator_release_assets", {
  id: int("id").autoincrement().primaryKey(),
  ownerUserId: int("owner_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  provenanceRecordId: int("provenance_record_id").references(() => provenanceRecords.id, { onDelete: "set null" }),
  assetKind: mysqlEnum("asset_kind", ["APP_ICON", "SCREENSHOT", "STORE_COPY", "PRIVACY_COPY", "RELEASE_NOTE", "SUPPORT_POLICY", "OTHER"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  description: varchar("description", { length: 2000 }).notNull(),
  sourceReference: varchar("source_reference", { length: 2048 }),
  storageKey: varchar("storage_key", { length: 512 }),
  assetUrl: varchar("asset_url", { length: 2048 }),
  originalFileName: varchar("original_file_name", { length: 255 }),
  mimeType: varchar("mime_type", { length: 100 }),
  byteSize: int("byte_size"),
  ownerAttestation: boolean("owner_attestation").notNull().default(false),
  reviewStatus: mysqlEnum("review_status", ["DRAFT", "SUBMITTED", "ACKNOWLEDGED", "NEEDS_INFO", "EXCLUDED"]).notNull().default("DRAFT"),
  submittedAt: timestamp("submitted_at"),
  assignedReviewerUserId: int("assigned_reviewer_user_id").references(() => users.id, { onDelete: "set null" }),
  assignedAt: timestamp("assigned_at"),
  reviewedByUserId: int("reviewed_by_user_id").references(() => users.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("creator_release_asset_owner_idx").on(table.ownerUserId, table.reviewStatus, table.updatedAt),
  index("creator_release_asset_review_idx").on(table.reviewStatus, table.submittedAt),
  index("creator_release_asset_assignment_idx").on(table.assignedReviewerUserId, table.reviewStatus, table.updatedAt),
]);
export type CreatorReleaseAsset = typeof creatorReleaseAssets.$inferSelect;

export const creatorReleaseAssetEvents = mysqlTable("creator_release_asset_events", {
  id: int("id").autoincrement().primaryKey(),
  releaseAssetId: int("release_asset_id").notNull().references(() => creatorReleaseAssets.id, { onDelete: "cascade" }),
  action: mysqlEnum("action", ["CREATED", "UPLOADED", "ASSIGNED", "SUBMITTED", "ACKNOWLEDGED", "NEEDS_INFO", "EXCLUDED", "NOTE"]).notNull(),
  note: varchar("note", { length: 1500 }).notNull(),
  actorUserId: int("actor_user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, table => [
  index("creator_release_asset_event_idx").on(table.releaseAssetId, table.createdAt),
]);
export type CreatorReleaseAssetEvent = typeof creatorReleaseAssetEvents.$inferSelect;
