/**
 * Guardian Router Tests — Sovereign Email Engine
 * Updated to match the sovereign DB-only router (no Mailchimp dependency)
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mocks ─────────────────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockImplementation(() => ({
      then: (resolve: (v: unknown[]) => void) => resolve([]),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([]),
      orderBy: vi.fn().mockResolvedValue([]),
    })),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({}),
}));

// ── Test context ──────────────────────────────────────────────────────────────
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe("guardian.subscribe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully subscribes a new email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.subscribe({ email: "guardian@scrollverse.app" });
    expect(result.success).toBe(true);
    expect(result.alreadyRegistered).toBe(false);
    expect(result.message).toContain("Guardian");
  });

  it("rejects invalid email addresses", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.guardian.subscribe({ email: "not-an-email" })
    ).rejects.toThrow();
  });

  it("stores to sovereign DB — no Mailchimp dependency", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.subscribe({ email: "sovereign@scrollverse.co" });
    expect(result.success).toBe(true);
    // sovereignStored confirms DB-only storage
    expect(result.sovereignStored).toBe(true);
  });

  it("succeeds without any external API keys configured", async () => {
    const originalKey = process.env.MAILCHIMP_API_KEY;
    const originalList = process.env.MAILCHIMP_LIST_ID;
    delete process.env.MAILCHIMP_API_KEY;
    delete process.env.MAILCHIMP_LIST_ID;
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.subscribe({ email: "fallback@test.com" });
    expect(result.success).toBe(true);
    // No mailchimpSynced field in sovereign router — just success
    expect(result.alreadyRegistered).toBe(false);
    process.env.MAILCHIMP_API_KEY = originalKey;
    process.env.MAILCHIMP_LIST_ID = originalList;
  });
});

describe("guardian.getCount", () => {
  it("returns a valid count response with correct shape", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.getCount();
    expect(typeof result.displayCount).toBe("number");
    expect(typeof result.dbCount).toBe("number");
    expect(typeof result.isLive).toBe("boolean");
    expect(result.onChainCount).toBeNull();
  });

  it("returns isLive=false when contract address is not set", async () => {
    const original = process.env.GUARDIAN_CONTRACT_ADDRESS;
    delete process.env.GUARDIAN_CONTRACT_ADDRESS;
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.getCount();
    expect(result.isLive).toBe(false);
    expect(result.onChainCount).toBeNull();
    process.env.GUARDIAN_CONTRACT_ADDRESS = original;
  });
});
