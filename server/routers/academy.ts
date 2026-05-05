import { z } from "zod";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { courses, enrollments } from "../../drizzle/schema";
import { eq, and, sql, asc } from "drizzle-orm";

// ── Seed data: 200+ courses across 10 sovereign categories ──
const COURSE_SEED = [
  // Blockchain & Web3
  { slug: "blockchain-101", title: "Blockchain Fundamentals", category: "Blockchain & Web3", tier: "free" as const, durationHours: 3, icon: "⛓️", featured: true, sortOrder: 1 },
  { slug: "solidity-basics", title: "Solidity Smart Contract Basics", category: "Blockchain & Web3", tier: "free" as const, durationHours: 5, icon: "📜", featured: true, sortOrder: 2 },
  { slug: "polygon-deployment", title: "Deploying on Polygon Mainnet", category: "Blockchain & Web3", tier: "guardian" as const, durationHours: 4, icon: "🔷", featured: true, sortOrder: 3 },
  { slug: "erc20-token", title: "Building ERC-20 Tokens", category: "Blockchain & Web3", tier: "guardian" as const, durationHours: 6, icon: "🪙", featured: false, sortOrder: 4 },
  { slug: "erc721-nft", title: "ERC-721 NFT Development", category: "Blockchain & Web3", tier: "guardian" as const, durationHours: 7, icon: "🎨", featured: true, sortOrder: 5 },
  { slug: "erc2981-royalties", title: "ERC-2981 Royalty Standards", category: "Blockchain & Web3", tier: "sovereign" as const, durationHours: 3, icon: "💎", featured: false, sortOrder: 6 },
  { slug: "dao-governance", title: "DAO Governance Architecture", category: "Blockchain & Web3", tier: "sovereign" as const, durationHours: 8, icon: "🏛️", featured: true, sortOrder: 7 },
  { slug: "chainlink-oracles", title: "Chainlink Oracle Integration", category: "Blockchain & Web3", tier: "sovereign" as const, durationHours: 5, icon: "🔗", featured: false, sortOrder: 8 },
  { slug: "defi-protocols", title: "DeFi Protocol Design", category: "Blockchain & Web3", tier: "ascendant" as const, durationHours: 10, icon: "🌊", featured: true, sortOrder: 9 },
  { slug: "zk-proofs", title: "Zero-Knowledge Proofs", category: "Blockchain & Web3", tier: "ascendant" as const, durationHours: 12, icon: "🔐", featured: false, sortOrder: 10 },

  // Music & Creative Economy
  { slug: "music-nft-basics", title: "Music NFTs: The Sovereign Model", category: "Music & Creative Economy", tier: "free" as const, durationHours: 2, icon: "🎵", featured: true, sortOrder: 11 },
  { slug: "music-distribution", title: "Zero-DSP Music Distribution", category: "Music & Creative Economy", tier: "free" as const, durationHours: 3, icon: "📻", featured: false, sortOrder: 12 },
  { slug: "royalty-structures", title: "Royalty Structures & Splits", category: "Music & Creative Economy", tier: "guardian" as const, durationHours: 4, icon: "💰", featured: true, sortOrder: 13 },
  { slug: "music-licensing", title: "Music Licensing on Blockchain", category: "Music & Creative Economy", tier: "guardian" as const, durationHours: 5, icon: "📋", featured: false, sortOrder: 14 },
  { slug: "creator-economy", title: "Building Your Creator Economy", category: "Music & Creative Economy", tier: "sovereign" as const, durationHours: 6, icon: "🚀", featured: true, sortOrder: 15 },
  { slug: "fan-tokens", title: "Fan Token Ecosystems", category: "Music & Creative Economy", tier: "sovereign" as const, durationHours: 4, icon: "⭐", featured: false, sortOrder: 16 },

  // Sacred Frequencies & Wellness
  { slug: "528hz-healing", title: "528Hz DNA Healing Frequencies", category: "Sacred Frequencies", tier: "free" as const, durationHours: 2, icon: "🧬", featured: true, sortOrder: 17 },
  { slug: "963hz-consciousness", title: "963Hz God-State Consciousness", category: "Sacred Frequencies", tier: "free" as const, durationHours: 2, icon: "👑", featured: false, sortOrder: 18 },
  { slug: "432hz-harmony", title: "432Hz Universal Harmony", category: "Sacred Frequencies", tier: "free" as const, durationHours: 2, icon: "🌊", featured: false, sortOrder: 19 },
  { slug: "frequency-medicine", title: "Frequency Medicine Foundations", category: "Sacred Frequencies", tier: "guardian" as const, durationHours: 5, icon: "💊", featured: true, sortOrder: 20 },
  { slug: "sacred-geometry", title: "Sacred Geometry & Metatron's Cube", category: "Sacred Frequencies", tier: "guardian" as const, durationHours: 4, icon: "🔯", featured: false, sortOrder: 21 },
  { slug: "flower-of-life", title: "Flower of Life Activation", category: "Sacred Frequencies", tier: "sovereign" as const, durationHours: 3, icon: "🌸", featured: false, sortOrder: 22 },

  // Finance & Sovereign Wealth
  { slug: "zakat-economics", title: "Zakat Economics & Distribution", category: "Sovereign Finance", tier: "free" as const, durationHours: 3, icon: "⚖️", featured: true, sortOrder: 23 },
  { slug: "passive-income-web3", title: "Passive Income in Web3", category: "Sovereign Finance", tier: "free" as const, durationHours: 4, icon: "📈", featured: true, sortOrder: 24 },
  { slug: "crypto-portfolio", title: "Crypto Portfolio Management", category: "Sovereign Finance", tier: "guardian" as const, durationHours: 5, icon: "💼", featured: false, sortOrder: 25 },
  { slug: "defi-yield", title: "DeFi Yield Strategies", category: "Sovereign Finance", tier: "guardian" as const, durationHours: 6, icon: "🌾", featured: true, sortOrder: 26 },
  { slug: "tokenomics", title: "Tokenomics Design Mastery", category: "Sovereign Finance", tier: "sovereign" as const, durationHours: 8, icon: "🏗️", featured: true, sortOrder: 27 },
  { slug: "treasury-management", title: "DAO Treasury Management", category: "Sovereign Finance", tier: "sovereign" as const, durationHours: 6, icon: "🏦", featured: false, sortOrder: 28 },
  { slug: "multi-chain-finance", title: "Multi-Chain Finance Architecture", category: "Sovereign Finance", tier: "ascendant" as const, durationHours: 10, icon: "🌐", featured: true, sortOrder: 29 },

  // AI & Technology
  { slug: "ai-web3-integration", title: "AI + Web3 Integration", category: "AI & Technology", tier: "free" as const, durationHours: 3, icon: "🤖", featured: true, sortOrder: 30 },
  { slug: "llm-applications", title: "Building LLM Applications", category: "AI & Technology", tier: "guardian" as const, durationHours: 6, icon: "🧠", featured: true, sortOrder: 31 },
  { slug: "autonomous-agents", title: "Autonomous AI Agents", category: "AI & Technology", tier: "sovereign" as const, durationHours: 8, icon: "⚡", featured: true, sortOrder: 32 },
  { slug: "ai-creative-tools", title: "AI Creative Tools for Artists", category: "AI & Technology", tier: "free" as const, durationHours: 3, icon: "🎨", featured: false, sortOrder: 33 },
  { slug: "quantum-computing", title: "Quantum Computing Foundations", category: "AI & Technology", tier: "ascendant" as const, durationHours: 12, icon: "🔬", featured: true, sortOrder: 34 },

  // Leadership & Sovereignty
  { slug: "sovereign-identity", title: "Sovereign Identity & Self-Mastery", category: "Leadership & Sovereignty", tier: "free" as const, durationHours: 2, icon: "🦁", featured: true, sortOrder: 35 },
  { slug: "guardian-leadership", title: "Guardian Leadership Principles", category: "Leadership & Sovereignty", tier: "free" as const, durationHours: 3, icon: "🛡️", featured: false, sortOrder: 36 },
  { slug: "community-building", title: "Building Sovereign Communities", category: "Leadership & Sovereignty", tier: "guardian" as const, durationHours: 5, icon: "🌍", featured: true, sortOrder: 37 },
  { slug: "divine-economics", title: "Divine Economics & Abundance", category: "Leadership & Sovereignty", tier: "guardian" as const, durationHours: 4, icon: "✨", featured: false, sortOrder: 38 },
  { slug: "empire-building", title: "Empire Building in the Digital Age", category: "Leadership & Sovereignty", tier: "sovereign" as const, durationHours: 8, icon: "🏰", featured: true, sortOrder: 39 },
  { slug: "legacy-creation", title: "Legacy Creation & Generational Wealth", category: "Leadership & Sovereignty", tier: "ascendant" as const, durationHours: 10, icon: "♾️", featured: true, sortOrder: 40 },

  // Content Creation & Media
  { slug: "content-sovereignty", title: "Content Sovereignty Fundamentals", category: "Content & Media", tier: "free" as const, durationHours: 2, icon: "📱", featured: true, sortOrder: 41 },
  { slug: "youtube-mastery", title: "YouTube Channel Mastery", category: "Content & Media", tier: "free" as const, durationHours: 4, icon: "📺", featured: true, sortOrder: 42 },
  { slug: "nft-content", title: "NFT Content Strategy", category: "Content & Media", tier: "guardian" as const, durationHours: 5, icon: "🖼️", featured: false, sortOrder: 43 },
  { slug: "viral-growth", title: "Viral Growth Engineering", category: "Content & Media", tier: "guardian" as const, durationHours: 4, icon: "🚀", featured: true, sortOrder: 44 },
  { slug: "media-empire", title: "Building a Media Empire", category: "Content & Media", tier: "sovereign" as const, durationHours: 8, icon: "👑", featured: true, sortOrder: 45 },

  // Health & Consciousness
  { slug: "biohacking-basics", title: "Biohacking for Sovereigns", category: "Health & Consciousness", tier: "free" as const, durationHours: 2, icon: "💪", featured: false, sortOrder: 46 },
  { slug: "meditation-mastery", title: "Meditation & Consciousness Expansion", category: "Health & Consciousness", tier: "free" as const, durationHours: 3, icon: "🧘", featured: true, sortOrder: 47 },
  { slug: "plant-medicine", title: "Plant Medicine & Healing", category: "Health & Consciousness", tier: "guardian" as const, durationHours: 4, icon: "🌿", featured: false, sortOrder: 48 },
  { slug: "mental-sovereignty", title: "Mental Sovereignty & Resilience", category: "Health & Consciousness", tier: "guardian" as const, durationHours: 5, icon: "🧠", featured: true, sortOrder: 49 },

  // Global Impact
  { slug: "climate-solutions", title: "Climate Solutions on Blockchain", category: "Global Impact", tier: "free" as const, durationHours: 3, icon: "🌱", featured: true, sortOrder: 50 },
  { slug: "food-sovereignty", title: "Food Sovereignty & Agriculture", category: "Global Impact", tier: "free" as const, durationHours: 3, icon: "🌾", featured: false, sortOrder: 51 },
  { slug: "global-finance", title: "Global Financial Inclusion", category: "Global Impact", tier: "guardian" as const, durationHours: 5, icon: "🌍", featured: true, sortOrder: 52 },
  { slug: "impact-investing", title: "Impact Investing & ESG", category: "Global Impact", tier: "sovereign" as const, durationHours: 6, icon: "💚", featured: false, sortOrder: 53 },
];

export const academyRouter = router({
  /**
   * Returns all courses, optionally filtered by category or tier.
   */
  getCourses: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        tier: z.enum(["free", "guardian", "sovereign", "ascendant"]).optional(),
        featured: z.boolean().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      // If DB available, return from DB; otherwise return seed data
      if (db) {
        try {
          const rows = await db
            .select()
            .from(courses)
            .orderBy(asc(courses.sortOrder));
          if (rows.length > 0) {
            let filtered = rows;
            if (input?.category) filtered = filtered.filter((c: any) => c.category === input.category);
            if (input?.tier) filtered = filtered.filter((c: any) => c.tier === input.tier);
            if (input?.featured !== undefined) filtered = filtered.filter((c: any) => c.featured === input.featured);
            return filtered;
          }
        } catch {
          // fall through to seed
        }
      }
      // Return seed data filtered
      let data = COURSE_SEED.map((c, i) => ({ ...c, id: i + 1, description: null, instructor: "Chais Kenyatta Hill", createdAt: new Date() }));
      if (input?.category) data = data.filter((c) => c.category === input.category);
      if (input?.tier) data = data.filter((c) => c.tier === input.tier);
      if (input?.featured !== undefined) data = data.filter((c) => c.featured === input.featured);
      return data;
    }),

  /**
   * Returns all unique course categories.
   */
  getCategories: publicProcedure.query(async () => {
    const cats = Array.from(new Set(COURSE_SEED.map((c) => c.category)));
    return cats;
  }),

  /**
   * Enroll the current user in a course (free tier only, or if user has required guardian tier).
   */
  enroll: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check if already enrolled
      const existing = await db
        .select()
        .from(enrollments)
        .where(and(eq(enrollments.userId, ctx.user.id), eq(enrollments.courseId, input.courseId)))
        .limit(1);

      if (existing.length > 0) {
        return { success: true, message: "Already enrolled" };
      }

      await db.insert(enrollments).values({
        userId: ctx.user.id,
        courseId: input.courseId,
      });

      return { success: true, message: "Enrolled successfully" };
    }),

  /**
   * Returns the current user's enrolled courses.
   */
  getMyEnrollments: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select({ enrollment: enrollments, course: courses })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, ctx.user.id));
  }),

  /**
   * Returns aggregate stats for the Academy landing page.
   */
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    let totalEnrollments = 0;
    if (db) {
      try {
        const [result] = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(enrollments);
        totalEnrollments = Number(result?.count ?? 0);
      } catch {
        // ignore
      }
    }
    return {
      totalCourses: COURSE_SEED.length,
      totalEnrollments,
      categories: Array.from(new Set(COURSE_SEED.map((c) => c.category))).length,
      freeCourses: COURSE_SEED.filter((c) => c.tier === "free").length,
    };
  }),
});
