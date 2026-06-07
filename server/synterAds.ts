/**
 * Synter Ads MCP Integration
 * Connects to https://mcp.syntermedia.ai for ad targeting, tracking, and analytics.
 * All calls are server-side — the API key is never exposed to the browser.
 */

const SYNTER_API_KEY = process.env.SYNTER_API_KEY ?? "";
const SYNTER_MCP_URL = "https://mcp.syntermedia.ai";

function synterHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "X-Synter-Key": SYNTER_API_KEY,
    Authorization: `Bearer ${SYNTER_API_KEY}`,
  };
}

export interface SynterEvent {
  event: string;           // e.g. "page_view", "guardian_signup", "token_purchase"
  userId?: string;
  sessionId?: string;
  page?: string;
  value?: number;          // monetary value in USD
  currency?: string;
  metadata?: Record<string, unknown>;
}

export interface SynterCampaignStats {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  roas: number;
}

/**
 * Track a conversion or engagement event via Synter
 */
export async function synterTrackEvent(event: SynterEvent): Promise<boolean> {
  if (!SYNTER_API_KEY) {
    console.warn("[Synter] SYNTER_API_KEY not configured — skipping event tracking");
    return false;
  }
  try {
    const res = await fetch(`${SYNTER_MCP_URL}/track`, {
      method: "POST",
      headers: synterHeaders(),
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        source: "scrollverse.co",
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[Synter] Track event failed:", err);
    return false;
  }
}

/**
 * Get campaign performance stats from Synter
 */
export async function synterGetCampaignStats(
  campaignId?: string
): Promise<SynterCampaignStats | null> {
  if (!SYNTER_API_KEY) return null;
  try {
    const url = campaignId
      ? `${SYNTER_MCP_URL}/campaigns/${campaignId}/stats`
      : `${SYNTER_MCP_URL}/campaigns/stats`;
    const res = await fetch(url, {
      headers: synterHeaders(),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("[Synter] Get campaign stats failed:", err);
    return null;
  }
}

/**
 * Submit a Guardian signup lead to Synter for retargeting
 */
export async function synterSubmitGuardianLead(
  email: string,
  tier: string,
  source = "scrollverse.co"
): Promise<boolean> {
  return synterTrackEvent({
    event: "guardian_signup",
    metadata: { email, tier, source },
    value: tier === "ASCENDANT" ? 1444 : tier === "SOVEREIGN" ? 444 : 144,
    currency: "USD",
  });
}

/**
 * Track a Stripe purchase conversion for Synter ROAS reporting
 */
export async function synterTrackPurchase(
  userId: string,
  amount: number,
  productName: string
): Promise<boolean> {
  return synterTrackEvent({
    event: "purchase",
    userId,
    value: amount / 100, // Stripe amounts are in cents
    currency: "USD",
    metadata: { product: productName },
  });
}
