/**
 * GLOBAL DASHBOARD ROUTER — ScrollVerse Trinity
 * Aggregates live stats from all major DB tables for the sovereign command center
 */
import { sql } from "drizzle-orm";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  users,
  guardianWaitlist,
  stakingRecords,
  stakingPositions,
  stripeOrders,
  revenueEvents,
  aiLegionInvestors,
  nftMarketplace,
  chxReservations,
  governanceProposals,
  legionPosts,
  broadcastRecords,
  bookOfLifeMints,
  creatorProfiles,
  knowledgeBase,
  exchangeOrders,
  uapDocuments,
  uapEntities,
  uapCoins,
} from "../../drizzle/schema";

export const globalDashboardRouter = router({
  getStats: publicProcedure.query(async () => {
    const db = await getDb();

    const [
      userCount,
      guardianCount,
      stakingCount,
      stakingPositionCount,
      orderCount,
      revenueCount,
      legionCount,
      nftCount,
      chxReservationCount,
      proposalCount,
      postCount,
      broadcastCount,
      bookMintCount,
      creatorCount,
      knowledgeCount,
      exchangeOrderCount,
      uapDocCount,
      uapEntityCount,
      uapCoinCount,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(guardianWaitlist),
      db.select({ count: sql<number>`count(*)` }).from(stakingRecords),
      db.select({ count: sql<number>`count(*)` }).from(stakingPositions),
      db.select({ count: sql<number>`count(*)` }).from(stripeOrders),
      db.select({ count: sql<number>`count(*)` }).from(revenueEvents),
      db.select({ count: sql<number>`count(*)` }).from(aiLegionInvestors),
      db.select({ count: sql<number>`count(*)` }).from(nftMarketplace),
      db.select({ count: sql<number>`count(*)` }).from(chxReservations),
      db.select({ count: sql<number>`count(*)` }).from(governanceProposals),
      db.select({ count: sql<number>`count(*)` }).from(legionPosts),
      db.select({ count: sql<number>`count(*)` }).from(broadcastRecords),
      db.select({ count: sql<number>`count(*)` }).from(bookOfLifeMints),
      db.select({ count: sql<number>`count(*)` }).from(creatorProfiles),
      db.select({ count: sql<number>`count(*)` }).from(knowledgeBase),
      db.select({ count: sql<number>`count(*)` }).from(exchangeOrders),
      db.select({ count: sql<number>`count(*)` }).from(uapDocuments),
      db.select({ count: sql<number>`count(*)` }).from(uapEntities),
      db.select({ count: sql<number>`count(*)` }).from(uapCoins),
    ]);

    // Revenue totals from stripe_orders
    const revenueRows = await db
      .select({ total: sql<number>`COALESCE(SUM(amount_cents), 0)` })
      .from(stripeOrders)
      .where(sql`status = 'completed'`);

    const totalRevenueCents = Number(revenueRows[0]?.total ?? 0);

    // CHX reservation totals
    const chxRows = await db
      .select({ total: sql<number>`COALESCE(SUM(amount_usd_cents), 0)`, tokens: sql<number>`COALESCE(SUM(chx_tokens_reserved), 0)` })
      .from(chxReservations)
      .where(sql`status = 'confirmed'`);

    const totalChxReservedUsdCents = Number(chxRows[0]?.total ?? 0);
    const totalChxTokensReserved = Number(chxRows[0]?.tokens ?? 0);

    return {
      users: Number(userCount[0]?.count ?? 0),
      guardians: Number(guardianCount[0]?.count ?? 0),
      stakingPositions: Number(stakingPositionCount[0]?.count ?? 0),
      stakingRecords: Number(stakingCount[0]?.count ?? 0),
      stripeOrders: Number(orderCount[0]?.count ?? 0),
      revenueEvents: Number(revenueCount[0]?.count ?? 0),
      legionInvestors: Number(legionCount[0]?.count ?? 0),
      nftListings: Number(nftCount[0]?.count ?? 0),
      chxReservations: Number(chxReservationCount[0]?.count ?? 0),
      governanceProposals: Number(proposalCount[0]?.count ?? 0),
      legionPosts: Number(postCount[0]?.count ?? 0),
      broadcasts: Number(broadcastCount[0]?.count ?? 0),
      bookMints: Number(bookMintCount[0]?.count ?? 0),
      creators: Number(creatorCount[0]?.count ?? 0),
      knowledgeEntries: Number(knowledgeCount[0]?.count ?? 0),
      exchangeOrders: Number(exchangeOrderCount[0]?.count ?? 0),
      uapDocuments: Number(uapDocCount[0]?.count ?? 0),
      uapEntities: Number(uapEntityCount[0]?.count ?? 0),
      uapCoins: Number(uapCoinCount[0]?.count ?? 0),
      totalRevenueCents,
      totalRevenueDollars: totalRevenueCents / 100,
      totalChxReservedUsdCents,
      totalChxReservedUsdDollars: totalChxReservedUsdCents / 100,
      totalChxTokensReserved,
      timestamp: new Date().toISOString(),
    };
  }),

  getRoutes: publicProcedure.query(() => {
    return [
      { path: "/", label: "Home", category: "Core", icon: "🏠" },
      { path: "/guardians", label: "Guardians", category: "Core", icon: "🛡️" },
      { path: "/staking", label: "Staking", category: "DeFi", icon: "⚡" },
      { path: "/chx-token", label: "CHX Token", category: "DeFi", icon: "💎" },
      { path: "/exchange", label: "Exchange", category: "DeFi", icon: "📈" },
      { path: "/uap", label: "UAP NFTs", category: "NFT", icon: "🛸" },
      { path: "/book-of-life", label: "Book of Life", category: "NFT", icon: "📖" },
      { path: "/catalyst-nft", label: "Catalyst NFT", category: "NFT", icon: "🔥" },
      { path: "/academy", label: "Academy", category: "Education", icon: "🎓" },
      { path: "/library", label: "Library", category: "Education", icon: "📚" },
      { path: "/knowledge", label: "Knowledge Base", category: "Education", icon: "🧠" },
      { path: "/ai-hub", label: "AI Hub", category: "AI", icon: "🤖" },
      { path: "/ai-council", label: "AI Council", category: "AI", icon: "⚙️" },
      { path: "/chat", label: "Chat", category: "Community", icon: "💬" },
      { path: "/legion", label: "Legion", category: "Community", icon: "⚔️" },
      { path: "/broadcast", label: "Broadcast", category: "Community", icon: "📡" },
      { path: "/governance", label: "Governance", category: "DAO", icon: "🗳️" },
      { path: "/revenue", label: "Revenue", category: "Finance", icon: "💰" },
      { path: "/crm", label: "CRM", category: "Finance", icon: "📊" },
      { path: "/merchant", label: "Merchant", category: "Finance", icon: "🏪" },
      { path: "/global-map", label: "Global Map", category: "Expansion", icon: "🌍" },
      { path: "/mars-omni", label: "MarsOmni", category: "Expansion", icon: "🪐" },
      { path: "/anno-omni", label: "AnnoOmni", category: "Expansion", icon: "🌌" },
      { path: "/omni-codex", label: "OmniCodex", category: "Archive", icon: "📜" },
      { path: "/frequency", label: "Frequency", category: "Spiritual", icon: "🎵" },
      { path: "/awakening", label: "Awakening", category: "Spiritual", icon: "✨" },
      { path: "/book-of-life", label: "Book of Life", category: "Spiritual", icon: "🕋" },
      { path: "/family", label: "Family Wallet", category: "Wallet", icon: "👨‍👩‍👧‍👦" },
      { path: "/bridge", label: "Bridge", category: "Wallet", icon: "🌉" },
      { path: "/kyc", label: "KYC", category: "Compliance", icon: "🔐" },
      { path: "/referral", label: "Referral", category: "Growth", icon: "🔗" },
      { path: "/partners", label: "Partners", category: "Growth", icon: "🤝" },
    ];
  }),
});
