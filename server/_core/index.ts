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
  // Called by the autonomous viral content scheduled task agent every 8 hours
  // The agent generates content via LLM, then POSTs here to log it
  // The agent also posts directly to Instagram via MCP in its own environment
  app.post("/api/scheduled/viral-post", async (req, res) => {
    try {
      const { caption, imageUrl, hashtags, platform, contentType } = req.body as {
        caption?: string;
        imageUrl?: string;
        hashtags?: string[];
        platform?: string;
        contentType?: string;
      };
      if (!caption) {
        return res.status(400).json({ error: "caption is required" });
      }
      console.log(`[ViralPost] ✨ ${platform ?? "instagram"} | ${contentType ?? "post"} | ${caption.slice(0, 80)}...`);
      return res.json({
        success: true,
        message: "Viral post logged",
        caption,
        imageUrl: imageUrl ?? null,
        hashtags: hashtags ?? [],
        platform: platform ?? "instagram",
        contentType: contentType ?? "post",
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("[ViralPost] Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
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
