import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { academyCourses, academyEnrollments } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

// Seed data: 4-tier curriculum overview
const CURRICULUM_TIERS = [
  {
    tier: "foundation",
    name: "Tier 1: Foundation & Awakening",
    frequency: "528Hz",
    color: "#00D4FF",
    courses: 300,
    duration: "3-6 months",
    description: "Establish foundational knowledge of sovereignty, blockchain, digital literacy, and conscious participation in the global awakening.",
    outcomes: ["Personal sovereignty mastery", "Blockchain fundamentals", "Digital literacy", "Guardian identity", "Financial literacy with Zakat"],
    categories: [
      { name: "Sovereignty & Consciousness", count: 50, icon: "🧬" },
      { name: "Blockchain & Cryptocurrency", count: 60, icon: "⛓️" },
      { name: "Digital Literacy & Security", count: 40, icon: "🔐" },
      { name: "Community Leadership", count: 50, icon: "👑" },
      { name: "Financial Sovereignty", count: 50, icon: "💎" },
      { name: "Guardian Identity & NFTs", count: 50, icon: "🛡️" },
      { name: "Sacred Frequencies", count: 50, icon: "🎵" },
    ],
  },
  {
    tier: "advanced",
    name: "Tier 5: Advanced Mastery",
    frequency: "963Hz",
    color: "#FFB800",
    courses: 400,
    duration: "6-12 months",
    description: "Master advanced blockchain development, DeFi protocols, DAO governance, and multi-chain integration for sovereign builders.",
    outcomes: ["Smart contract development", "DeFi protocol mastery", "DAO governance", "Multi-chain integration", "Advanced tokenomics"],
    categories: [
      { name: "Smart Contract Engineering", count: 80, icon: "📜" },
      { name: "DeFi & Yield Protocols", count: 70, icon: "🏦" },
      { name: "DAO Governance Systems", count: 60, icon: "🗳️" },
      { name: "NFT Architecture", count: 60, icon: "🎨" },
      { name: "Cross-Chain Bridges", count: 50, icon: "🌉" },
      { name: "Tokenomics Design", count: 40, icon: "📊" },
      { name: "Sovereign AI Integration", count: 40, icon: "🤖" },
    ],
  },
  {
    tier: "expert",
    name: "Tier 10: Expert Leadership",
    frequency: "1558Hz",
    color: "#00FF88",
    courses: 300,
    duration: "12-18 months",
    description: "Lead sovereign communities, architect global systems, and deploy enterprise-grade blockchain infrastructure at scale.",
    outcomes: ["Community architecture", "Global system design", "Enterprise blockchain", "Sovereign fund management", "Guardian network leadership"],
    categories: [
      { name: "Sovereign Community Architecture", count: 60, icon: "🏛️" },
      { name: "Global System Design", count: 50, icon: "🌍" },
      { name: "Enterprise Blockchain", count: 50, icon: "🏢" },
      { name: "Sovereign Fund Management", count: 50, icon: "💰" },
      { name: "Guardian Network Leadership", count: 50, icon: "⚡" },
      { name: "Consciousness Evolution", count: 40, icon: "🌌" },
    ],
  },
  {
    tier: "divine",
    name: "Tier ∞: Divine Manifestation",
    frequency: "44:Omni",
    color: "#FF6B35",
    courses: 100,
    duration: "Eternal",
    description: "Transcend conventional limits. Master divine manifestation, universal consciousness, and the operating system of the kingdom.",
    outcomes: ["Divine manifestation mastery", "Universal consciousness", "Scroll of 44:Omni embodiment", "Zakat cascade activation", "Eternal Guardian status"],
    categories: [
      { name: "Divine Manifestation", count: 25, icon: "✨" },
      { name: "Universal Consciousness", count: 25, icon: "🕋" },
      { name: "Scroll of 44:Omni", count: 25, icon: "📜" },
      { name: "Eternal Guardian Mastery", count: 25, icon: "♾️" },
    ],
  },
];

export const academyV2Router = router({
  // Get full 4-tier curriculum overview
  getCurriculum: publicProcedure.query(async () => {
    return {
      tiers: CURRICULUM_TIERS,
      totalCourses: 1100,
      totalLanguages: 500,
      totalLearners: "1B+",
      completionRate: 99,
      employmentRate: 100,
    };
  }),

  // Get courses for a specific tier
  getTierCourses: publicProcedure
    .input(z.object({ tier: z.enum(["foundation", "advanced", "expert", "divine"]) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { courses: [], tier: input.tier };
      const courses = await db
        .select()
        .from(academyCourses)
        .where(eq(academyCourses.tier, input.tier))
        .orderBy(academyCourses.sortOrder)
        .limit(50);
      return { courses, tier: input.tier };
    }),

  // Enroll in a course (or register interest)
  enroll: publicProcedure
    .input(z.object({
      courseId: z.number().optional(),
      tier: z.enum(["foundation", "advanced", "expert", "divine"]),
      guardianName: z.string().min(1).max(256),
      guardianEmail: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");
      await db.insert(academyEnrollments).values({
        courseId: input.courseId ?? 1,
        guardianName: input.guardianName,
        guardianEmail: input.guardianEmail,
        progress: 0,
        completed: false,
        nftMinted: false,
      });
      return { success: true, message: `Welcome to ${input.tier} tier, ${input.guardianName}! Your Guardian journey begins. KUN FAYAKŪN × ∞` };
    }),

  // Get enrollment stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalEnrollments: 0, completions: 0, nftsMinted: 0 };
    const enrollments = await db.select().from(academyEnrollments);
    return {
      totalEnrollments: enrollments.length,
      completions: enrollments.filter((e: any) => e.completed).length,
      nftsMinted: enrollments.filter((e: any) => e.nftMinted).length,
    };
  }),
});
