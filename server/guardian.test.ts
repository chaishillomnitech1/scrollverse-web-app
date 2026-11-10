/**
 * Guardian Router Tests — Sovereign Email Engine
 * Updated to match the sovereign DB-only router (no Mailchimp dependency)
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
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
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.GUARDIAN_CONTRACT_ADDRESS;
  });

  it("returns a database-sourced count without calling it on-chain verified", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.getCount();
    expect(result.databaseAvailable).toBe(true);
    expect(result.dbCount).toBe(0);
    expect(result.displayCount).toBe(0);
    expect(result.countSource).toBe("database");
    expect(result.isLive).toBe(false);
    expect(result.onChainCount).toBeNull();
  });

  it("returns unavailable when the database connection is unavailable", async () => {
    vi.mocked(getDb).mockResolvedValueOnce(null);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.getCount();
    expect(result.databaseAvailable).toBe(false);
    expect(result.dbCount).toBeNull();
    expect(result.displayCount).toBeNull();
    expect(result.countSource).toBe("unavailable");
    expect(result.isLive).toBe(false);
    expect(result.onChainCount).toBeNull();
  });

  it("does not invent a count when the database read fails", async () => {
    vi.mocked(getDb).mockResolvedValueOnce({
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockRejectedValue(new Error("database read failed")),
      }),
    } as never);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.getCount();
    expect(result.databaseAvailable).toBe(false);
    expect(result.dbCount).toBeNull();
    expect(result.displayCount).toBeNull();
    expect(result.countSource).toBe("unavailable");
  });
});
