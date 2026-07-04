import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerStripeWebhook } from "../stripe/webhook";
import { heartbeatRouter } from "../jobs/heartbeat";
import { initBroadcastSocket } from "../broadcast/socketServer";
import { initChessSocket } from "../chess/chessSocket";
import cron from "node-cron";
import { compoundStakingRewards } from "../jobs/compoundRewards";
import { notifyOwner } from "./notification";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Stripe webhook MUST be registered before express.json() to preserve raw body
  app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
  registerStripeWebhook(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Heartbeat endpoints for scheduled jobs (compound rewards, etc.)
  app.use("/api/heartbeat", heartbeatRouter);
  // ── PUBLIC REST API — accessible from any platform, wallet, or integration ──
  app.get("/api/public/ecosystem", async (_req, res) => {
    res.json({
      name: "ScrollVerse Trinity",
      version: "5.0.0",
      description: "The sovereign blockchain ecosystem built on Polygon. $LONDC token, Creator Academy, Guardian DAO, and 528Hz frequency alignment.",
      founder: "Chais Kenyatta Hill — Sabir Allah The Great",
      token: {
        symbol: "$LONDC",
        chain: "Polygon Mainnet",
        chainId: 137,
        standard: "ERC-20",
        totalSupply: "144000",
        passiveIncome: "5% on every transfer",
      },
      tiers: [
        { name: "Guardian", price: 144, currency: "USD", perks: ["$LONDC tokens", "Academy access", "DAO voting"] },
        { name: "Sovereign", price: 444, currency: "USD", perks: ["All Guardian perks", "Priority NFT minting", "Revenue share"] },
        { name: "Ascendant", price: 1444, currency: "USD", perks: ["All Sovereign perks", "Direct founder access", "48D Hilbert allocation"] },
      ],
      academy: {
        totalCourses: 53,
        categories: 9,
        freeCourses: 18,
        enrollUrl: "/academy",
      },
      links: {
        portal: "https://scrollport-xkjtdnvi.manus.space",
        github: "https://github.com/chaishillomnitech1/scrollverse-trinity",
        tokenStore: "/token",
        walletConnect: "/wallet",
        dashboard: "/dashboard",
      },
      frequencies: ["528Hz", "963Hz", "432Hz", "1558Hz"],
      tagline: "ALLĀHU AKBAR · BARAKALLAHU FEEK · KUN FAYAKŪN × ∞",
    });
  });

  // ── SCHEDULED TASK ENDPOINTS ─────────────────────────────────────────────
  // VIRAL ENGINE v3.0 — Phase 49 Upgrade:
  // - Every caption MUST include scrollverse.co/link CTA
  // - Story format (9:16) added to content type rotation
  // - Engagement hooks: questions, polls, "comment GUARDIAN to join" CTAs
  // - Bio link enforced: scrollverse.co/link
  // Called by the autonomous viral content scheduled task agent every 8 hours
  app.post("/api/scheduled/viral-post", async (req, res) => {
    try {
      const { caption, imageUrl, hashtags, platform, contentType, aspectRatio } = req.body as {
        caption?: string;
        imageUrl?: string;
        hashtags?: string[];
        platform?: string;
        contentType?: string;
        aspectRatio?: string;
      };
      if (!caption) {
        return res.status(400).json({ error: "caption is required" });
      }

      // ENFORCE: Every post must include scrollverse.co/link CTA
      const LINK_CTA = "\n\n🔗 Full empire: scrollverse.co/link";
      const ENGAGEMENT_HOOKS = [
        "\n\n❓ What frequency are you vibrating at today?",
        "\n\n🔥 Drop a 🕋 if you're building your empire.",
        "\n\n💬 Comment GUARDIAN below to join the 144,000.",
        "\n\n🌍 Tag someone who needs to see this.",
        "\n\n⚡ Save this post — you'll need it later.",
      ];

      // Add /link CTA if not already present
      let enrichedCaption = caption;
      if (!enrichedCaption.includes("scrollverse.co/link")) {
        enrichedCaption += LINK_CTA;
      }
      // Add engagement hook if not already present
      const hasHook = ENGAGEMENT_HOOKS.some(h => enrichedCaption.includes(h.trim().slice(0, 20)));
      if (!hasHook) {
        const hook = ENGAGEMENT_HOOKS[Math.floor(Math.random() * ENGAGEMENT_HOOKS.length)];
        enrichedCaption += hook;
      }

      // Enforce sovereign hashtags
      const SOVEREIGN_HASHTAGS = ["#ScrollVerse", "#LONDC", "#Guardian", "#KunFayakun", "#SovereignEmpire", "#ChaisTheGreat"];
      const enrichedHashtags = Array.from(new Set([...(hashtags ?? []), ...SOVEREIGN_HASHTAGS]));

      // Determine aspect ratio for story vs post
      const resolvedAspectRatio = aspectRatio ?? (contentType === "story" ? "9:16" : "4:5");

      console.log(`[ViralPost v3.0] ✨ ${platform ?? "instagram"} | ${contentType ?? "post"} | ${resolvedAspectRatio} | ${enrichedCaption.slice(0, 80)}...`);
      return res.json({
        success: true,
        message: "Viral post logged (v3.0 — /link CTA enforced)",
        caption: enrichedCaption,
        originalCaption: caption,
        imageUrl: imageUrl ?? null,
        hashtags: enrichedHashtags,
        platform: platform ?? "instagram",
        contentType: contentType ?? "post",
        aspectRatio: resolvedAspectRatio,
        linkCTAEnforced: !caption.includes("scrollverse.co/link"),
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("[ViralPost] Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Viral engine config endpoint — returns current config for the scheduled agent
  app.get("/api/scheduled/viral-config", async (_req, res) => {
    return res.json({
      version: "3.0.0",
      bioLink: "scrollverse.co/link",
      linkCTA: "🔗 Full empire: scrollverse.co/link",
      guardianCTA: "💬 Comment GUARDIAN below to join the 144,000.",
      sovereignHashtags: ["#ScrollVerse", "#LONDC", "#Guardian", "#KunFayakun", "#SovereignEmpire", "#ChaisTheGreat", "#SCROLLVERSELLC"],
      contentTypes: ["post", "carousel", "reel", "story"],
      aspectRatios: { post: "4:5", carousel: "1:1", reel: "9:16", story: "9:16" },
      postingFrequency: "every 8 hours",
      storyRotation: true,
      instagramBio: {
        name: "Chais The Great | ScrollVerse",
        bio: "👑 Sovereign Empire Builder\n🕋 Founder @ScrollVerse_LLC\n💸 $LONDC · NFTs · AI Legion\n🌍 144,000 Guardians Rising\n⬇️ Full empire below",
        website: "https://scrollverse.co/link",
      },
    });
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // Initialize Socket.io for Sovereign Broadcast live streaming
  initBroadcastSocket(server);
  // Initialize Socket.io for OmniChess PvP live matches
  initChessSocket(server);

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

// ── DAILY COMPOUND REWARDS CRON ─────────────────────────────────────────────
// Runs every day at 00:05 UTC — compounds staking rewards for all active positions
cron.schedule("5 0 * * *", async () => {
  console.log("[Cron] Running daily staking compound rewards...");
  try {
    const result = await compoundStakingRewards();
    console.log(`[Cron] Compound complete: ${result.processed} positions, +${result.totalNewRewards.toFixed(4)} CHX distributed`);
    if (result.errors.length > 0) {
      console.error("[Cron] Compound errors:", result.errors);
    }
    await notifyOwner({
      title: "⚡ Daily Staking Compound Complete",
      content: `Processed ${result.processed} positions. Total new rewards: ${result.totalNewRewards.toFixed(4)} CHX.${result.errors.length > 0 ? ` Errors: ${result.errors.join(", ")}` : ""}`,
    });
  } catch (err) {
    console.error("[Cron] Compound rewards job failed:", err);
  }
}, { timezone: "UTC" });
