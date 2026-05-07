import { boolean, int, json, mysqlEnum, mysqlTable, text, timestamp, tinyint, varchar } from "drizzle-orm/mysql-core";

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
