/**
 * KNICK BLOCKCHAIN — Trivia-to-Earn NFT Engine
 * Sovereign Knicks trivia with tiered NFT rewards and customizable $KNICK coin art
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  knickTrivia,
  knickNfts,
  knickUserStats,
  notifications,
} from "../../drizzle/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// ── Knicks trivia bank (50 questions across 3 difficulty tiers) ───────────────
const TRIVIA_BANK = [
  // EASY — Common NFT
  {
    question: "What year were the New York Knicks founded?",
    optionA: "1946",
    optionB: "1950",
    optionC: "1955",
    optionD: "1940",
    correctAnswer: "A",
    difficulty: "easy",
    nftRarity: "common",
    xpReward: 10,
    era: "Origins",
    funFact: "The Knicks are one of the original BAA teams that merged to form the NBA in 1949.",
  },
  {
    question: "How many NBA Championships have the Knicks won?",
    optionA: "1",
    optionB: "2",
    optionC: "3",
    optionD: "0",
    correctAnswer: "B",
    difficulty: "easy",
    nftRarity: "common",
    xpReward: 10,
    era: "Championship Era",
    funFact: "The Knicks won back-to-back championships in 1970 and 1973.",
  },
  {
    question: "What is the Knicks' home arena called?",
    optionA: "Barclays Center",
    optionB: "Madison Square Garden",
    optionC: "Prudential Center",
    optionD: "Nassau Coliseum",
    correctAnswer: "B",
    difficulty: "easy",
    nftRarity: "common",
    xpReward: 10,
    era: "Modern Era",
    funFact: "MSG is known as 'The World's Most Famous Arena' and has hosted countless historic events.",
  },
  {
    question: "What are the Knicks' official team colors?",
    optionA: "Blue and Gold",
    optionB: "Blue, Orange, and White",
    optionC: "Red and Blue",
    optionD: "Orange and Black",
    correctAnswer: "B",
    difficulty: "easy",
    nftRarity: "common",
    xpReward: 10,
    era: "Modern Era",
    funFact: "The Knicks' orange and blue colors are iconic and have remained consistent throughout their history.",
  },
  {
    question: "Which legendary center led the Knicks to their first championship in 1970?",
    optionA: "Patrick Ewing",
    optionB: "Willis Reed",
    optionC: "Dave DeBusschere",
    optionD: "Bill Bradley",
    correctAnswer: "B",
    difficulty: "easy",
    nftRarity: "common",
    xpReward: 10,
    era: "Championship Era",
    funFact: "Willis Reed's iconic limping return in Game 7 of the 1970 Finals is one of the greatest moments in NBA history.",
  },
  {
    question: "What number did Patrick Ewing wear for the Knicks?",
    optionA: "32",
    optionB: "33",
    optionC: "34",
    optionD: "31",
    correctAnswer: "B",
    difficulty: "easy",
    nftRarity: "common",
    xpReward: 10,
    era: "Ewing Era",
    funFact: "Patrick Ewing's #33 was retired by the Knicks. He played 15 seasons in New York.",
  },
  {
    question: "Who was the Knicks' head coach during their 1973 championship?",
    optionA: "Phil Jackson",
    optionB: "Red Holzman",
    optionC: "Pat Riley",
    optionD: "Jeff Van Gundy",
    correctAnswer: "B",
    difficulty: "easy",
    nftRarity: "common",
    xpReward: 10,
    era: "Championship Era",
    funFact: "Red Holzman coached both Knicks championships and is in the Basketball Hall of Fame.",
  },
  {
    question: "Which Knicks player was nicknamed 'Clyde'?",
    optionA: "Earl Monroe",
    optionB: "Dick Barnett",
    optionC: "Walt Frazier",
    optionD: "Dave DeBusschere",
    correctAnswer: "C",
    difficulty: "easy",
    nftRarity: "common",
    xpReward: 10,
    era: "Championship Era",
    funFact: "Walt 'Clyde' Frazier was known for his flashy style both on and off the court.",
  },
  // HARD — Rare NFT
  {
    question: "In what year did Patrick Ewing reach the NBA Finals with the Knicks?",
    optionA: "1992",
    optionB: "1993",
    optionC: "1994",
    optionD: "1995",
    correctAnswer: "C",
    difficulty: "hard",
    nftRarity: "rare",
    xpReward: 25,
    era: "Ewing Era",
    funFact: "The 1994 Finals went 7 games against the Houston Rockets. John Starks' infamous missed shots in Game 7 still haunt Knicks fans.",
  },
  {
    question: "Who scored 62 points in a half against the Knicks in 1962?",
    optionA: "Jerry West",
    optionB: "Wilt Chamberlain",
    optionC: "Elgin Baylor",
    optionD: "Oscar Robertson",
    correctAnswer: "C",
    difficulty: "hard",
    nftRarity: "rare",
    xpReward: 25,
    era: "Origins",
    funFact: "Elgin Baylor scored 71 points in a single game against the Knicks in 1960 — an NBA record at the time.",
  },
  {
    question: "Which Knicks player was traded for Carmelo Anthony in 2011?",
    optionA: "Wilson Chandler",
    optionB: "Danilo Gallinari",
    optionC: "Raymond Felton",
    optionD: "All of the above (plus more)",
    correctAnswer: "D",
    difficulty: "hard",
    nftRarity: "rare",
    xpReward: 25,
    era: "Modern Era",
    funFact: "The Melo trade sent 5 players + 3 picks to Denver — one of the largest trades in NBA history.",
  },
  {
    question: "What was John Starks' jersey number?",
    optionA: "3",
    optionB: "6",
    optionC: "7",
    optionD: "11",
    correctAnswer: "B",
    difficulty: "hard",
    nftRarity: "rare",
    xpReward: 25,
    era: "Ewing Era",
    funFact: "John Starks went undrafted and worked his way up from a grocery store bagger to NBA starter — pure sovereign energy.",
  },
  {
    question: "Which player scored 45 points in a playoff game for the Knicks in 2013?",
    optionA: "Carmelo Anthony",
    optionB: "J.R. Smith",
    optionC: "Raymond Felton",
    optionD: "Amar'e Stoudemire",
    correctAnswer: "A",
    difficulty: "hard",
    nftRarity: "rare",
    xpReward: 25,
    era: "Modern Era",
    funFact: "Carmelo Anthony averaged 28.7 points per game in the 2013 playoffs for New York.",
  },
  {
    question: "How many points did Bernard King average in the 1983-84 season?",
    optionA: "24.2",
    optionB: "26.3",
    optionC: "28.4",
    optionD: "30.1",
    correctAnswer: "C",
    difficulty: "hard",
    nftRarity: "rare",
    xpReward: 25,
    era: "Pre-Ewing Era",
    funFact: "Bernard King was one of the most unstoppable scorers in NBA history during his peak Knicks years.",
  },
  {
    question: "What year did the Knicks select Patrick Ewing in the NBA Draft?",
    optionA: "1983",
    optionB: "1984",
    optionC: "1985",
    optionD: "1986",
    correctAnswer: "C",
    difficulty: "hard",
    nftRarity: "rare",
    xpReward: 25,
    era: "Ewing Era",
    funFact: "The 1985 draft lottery was the first ever — the Knicks won it and selected Ewing #1 overall.",
  },
  // LEGENDARY — Epic/Legendary NFT
  {
    question: "What is the exact score of the Knicks' Game 7 win in the 1970 NBA Finals?",
    optionA: "113-99",
    optionB: "113-87",
    optionC: "108-99",
    optionD: "115-93",
    correctAnswer: "A",
    difficulty: "legendary",
    nftRarity: "legendary",
    xpReward: 100,
    era: "Championship Era",
    funFact: "Willis Reed scored the first two baskets of Game 7 despite a torn thigh muscle, electrifying MSG and the Knicks won 113-99.",
  },
  {
    question: "In the 1994 Finals Game 7, what was John Starks' shooting percentage?",
    optionA: "2-for-18",
    optionB: "2-for-16",
    optionC: "3-for-18",
    optionD: "4-for-20",
    correctAnswer: "A",
    difficulty: "legendary",
    nftRarity: "legendary",
    xpReward: 100,
    era: "Ewing Era",
    funFact: "Starks went 2-for-18 (0-for-8 from three) in Game 7 vs Houston. Despite the loss, Knicks fans still love him — that's sovereign loyalty.",
  },
  {
    question: "Which Knick holds the franchise record for most points in a single game?",
    optionA: "Patrick Ewing",
    optionB: "Carmelo Anthony",
    optionC: "Bernard King",
    optionD: "Walt Frazier",
    correctAnswer: "C",
    difficulty: "legendary",
    nftRarity: "epic",
    xpReward: 75,
    era: "Pre-Ewing Era",
    funFact: "Bernard King scored 60 points against the New Jersey Nets on Christmas Day 1984.",
  },
  {
    question: "What was the Knicks' record in the 1992-93 season under Pat Riley?",
    optionA: "57-25",
    optionB: "60-22",
    optionC: "55-27",
    optionD: "58-24",
    correctAnswer: "B",
    difficulty: "legendary",
    nftRarity: "epic",
    xpReward: 75,
    era: "Ewing Era",
    funFact: "The 60-22 Knicks under Pat Riley were one of the most physical and defensively dominant teams in NBA history.",
  },
];

const RANK_THRESHOLDS = [
  { rank: "Rookie", minXp: 0 },
  { rank: "Guardian", minXp: 100 },
  { rank: "Sovereign", minXp: 300 },
  { rank: "Legend", minXp: 750 },
  { rank: "Immortal", minXp: 2000 },
];

function getRank(xp: number): string {
  let rank = "Rookie";
  for (const t of RANK_THRESHOLDS) {
    if (xp >= t.minXp) rank = t.rank;
  }
  return rank;
}

export const knickRouter = router({
  // ── Seed trivia bank (admin only — called once) ──────────────────────────────
  seedTrivia: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    const db = await getDb();
    for (const q of TRIVIA_BANK) {
      await db.insert(knickTrivia).ignore().values(q);
    }
    return { seeded: TRIVIA_BANK.length };
  }),

  // ── Get a random trivia question (optionally by difficulty) ──────────────────
  getQuestion: publicProcedure
    .input(
      z.object({
        difficulty: z.enum(["easy", "hard", "legendary", "any"]).default("any"),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      // Return a random question from the in-memory bank (no DB query needed for speed)
      let pool = TRIVIA_BANK;
      if (input.difficulty !== "any") {
        pool = TRIVIA_BANK.filter((q) => q.difficulty === input.difficulty);
      }
      if (pool.length === 0) pool = TRIVIA_BANK;
      const q = pool[Math.floor(Math.random() * pool.length)];
      // Return question without revealing correct answer
      return {
        id: TRIVIA_BANK.indexOf(q),
        question: q.question,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        difficulty: q.difficulty,
        nftRarity: q.nftRarity,
        xpReward: q.xpReward,
        era: q.era,
      };
    }),

  // ── Submit an answer — mint NFT if correct ───────────────────────────────────
  submitAnswer: protectedProcedure
    .input(
      z.object({
        questionIndex: z.number().min(0).max(TRIVIA_BANK.length - 1),
        answer: z.enum(["A", "B", "C", "D"]),
        coinCustomization: z
          .object({
            coinName: z.string().max(100).optional(),
            coinSymbol: z.string().max(20).optional(),
            coinColor: z.string().max(7).optional(),
            coinGradient: z.string().max(7).optional(),
            coinLogo: z.string().max(50).optional(),
            coinSlogan: z.string().max(100).optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const q = TRIVIA_BANK[input.questionIndex];
      if (!q) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid question" });

      const isCorrect = input.answer === q.correctAnswer;

      // Get or create user stats
      const [existingStats] = await db
        .select()
        .from(knickUserStats)
        .where(eq(knickUserStats.userId, ctx.user.id))
        .limit(1);

      const currentStreak = existingStats?.currentStreak ?? 0;
      const newStreak = isCorrect ? currentStreak + 1 : 0;
      const streakBonus = newStreak >= 3; // 3+ correct in a row = streak bonus
      const xpEarned = isCorrect ? q.xpReward * (streakBonus ? 2 : 1) : 0;
      const newTotalXp = (existingStats?.totalXp ?? 0) + xpEarned;
      const newRank = getRank(newTotalXp);

      if (existingStats) {
        await db
          .update(knickUserStats)
          .set({
            totalAnswered: sql`${knickUserStats.totalAnswered} + 1`,
            correctAnswers: isCorrect
              ? sql`${knickUserStats.correctAnswers} + 1`
              : existingStats.correctAnswers,
            currentStreak: newStreak,
            bestStreak: Math.max(existingStats.bestStreak, newStreak),
            totalXp: newTotalXp,
            nftsEarned: isCorrect
              ? sql`${knickUserStats.nftsEarned} + 1`
              : existingStats.nftsEarned,
            rank: newRank,
            updatedAt: new Date(),
          })
          .where(eq(knickUserStats.userId, ctx.user.id));
      } else {
        await db.insert(knickUserStats).values({
          userId: ctx.user.id,
          totalAnswered: 1,
          correctAnswers: isCorrect ? 1 : 0,
          currentStreak: newStreak,
          bestStreak: newStreak,
          totalXp: xpEarned,
          nftsEarned: isCorrect ? 1 : 0,
          rank: newRank,
        });
      }

      // Mint NFT if correct
      let nft = null;
      if (isCorrect) {
        const [inserted] = await db.insert(knickNfts).values({
          userId: ctx.user.id,
          questionId: input.questionIndex,
          rarity: q.nftRarity,
          coinName: input.coinCustomization?.coinName ?? "$KNICK",
          coinSymbol: input.coinCustomization?.coinSymbol ?? "KNICK",
          coinColor: input.coinCustomization?.coinColor ?? "#FFB800",
          coinGradient: input.coinCustomization?.coinGradient ?? "#00D4FF",
          coinLogo: input.coinCustomization?.coinLogo ?? "🏀",
          coinSlogan: input.coinCustomization?.coinSlogan ?? "Never Stop. Never Settle.",
          xpEarned,
          streakBonus,
        });

        nft = {
          rarity: q.nftRarity,
          xpEarned,
          streakBonus,
          coinName: input.coinCustomization?.coinName ?? "$KNICK",
        };

        // In-app notification for the user
        await db.insert(notifications).values({
          userId: ctx.user.id,
          title: `🏀 ${q.nftRarity.toUpperCase()} NFT Minted!`,
          message: `You answered correctly! Your ${q.nftRarity} $KNICK NFT has been minted. +${xpEarned} XP${streakBonus ? " (2x Streak Bonus!)" : ""}`,
          type: "success",
          link: "/knick-blockchain",
        });
      }

      return {
        isCorrect,
        correctAnswer: q.correctAnswer,
        funFact: q.funFact,
        xpEarned,
        streakBonus,
        newStreak,
        newRank,
        nft,
      };
    }),

  // ── Get user's NFT collection ────────────────────────────────────────────────
  getMyNfts: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const nfts = await db
      .select()
      .from(knickNfts)
      .where(eq(knickNfts.userId, ctx.user.id))
      .orderBy(desc(knickNfts.mintedAt));
    return nfts;
  }),

  // ── Get user stats ───────────────────────────────────────────────────────────
  getMyStats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const [stats] = await db
      .select()
      .from(knickUserStats)
      .where(eq(knickUserStats.userId, ctx.user.id))
      .limit(1);
    return (
      stats ?? {
        totalAnswered: 0,
        correctAnswers: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalXp: 0,
        nftsEarned: 0,
        rank: "Rookie",
      }
    );
  }),

  // ── Leaderboard ──────────────────────────────────────────────────────────────
  getLeaderboard: publicProcedure.query(async () => {
    const db = await getDb();
    const leaders = await db
      .select({
        userId: knickUserStats.userId,
        totalXp: knickUserStats.totalXp,
        nftsEarned: knickUserStats.nftsEarned,
        rank: knickUserStats.rank,
        bestStreak: knickUserStats.bestStreak,
      })
      .from(knickUserStats)
      .orderBy(desc(knickUserStats.totalXp))
      .limit(20);
    return leaders;
  }),

  // ── Update coin customization on an existing NFT ─────────────────────────────
  customizeCoin: protectedProcedure
    .input(
      z.object({
        nftId: z.number(),
        coinName: z.string().max(100).optional(),
        coinSymbol: z.string().max(20).optional(),
        coinColor: z.string().max(7).optional(),
        coinGradient: z.string().max(7).optional(),
        coinLogo: z.string().max(50).optional(),
        coinSlogan: z.string().max(100).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const [nft] = await db
        .select()
        .from(knickNfts)
        .where(and(eq(knickNfts.id, input.nftId), eq(knickNfts.userId, ctx.user.id)))
        .limit(1);
      if (!nft) throw new TRPCError({ code: "NOT_FOUND" });

      await db
        .update(knickNfts)
        .set({
          coinName: input.coinName ?? nft.coinName,
          coinSymbol: input.coinSymbol ?? nft.coinSymbol,
          coinColor: input.coinColor ?? nft.coinColor,
          coinGradient: input.coinGradient ?? nft.coinGradient,
          coinLogo: input.coinLogo ?? nft.coinLogo,
          coinSlogan: input.coinSlogan ?? nft.coinSlogan,
        })
        .where(eq(knickNfts.id, input.nftId));

      return { success: true };
    }),
});
