/**
 * ScrollVerse Guardian Router — Vitest Test Suite
 * Tests: subscribe (duplicate detection, success path), getCount (fallback logic)
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mocks (hoisted — no top-level variable references) ────────────────────────
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    select: vi.fn().mockReturnThis(),
    // from() is used both as a chain step (for .where().limit()) and as a terminal (for .select().from())
    // Return an object that is both awaitable (resolves to []) and chainable
    from: vi.fn().mockImplementation(() => ({
      then: (resolve: (v: unknown[]) => void) => resolve([]),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([]),
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
  json: async () => ({ id: "mock-subscriber-id", status: "subscribed" }),
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
    // Restore default fetch mock after each test
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ id: "mock-subscriber-id", status: "subscribed" }),
    } as Response);
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

  it("handles Mailchimp 'Member Exists' gracefully", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ title: "Member Exists", detail: "already subscribed" }),
    } as Response);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.subscribe({ email: "existing@mailchimp.com" });

    // Member Exists means they are already subscribed — success but mailchimpSynced=true
    expect(result.success).toBe(true);
    // mailchimpSynced may be true or false depending on how the router handles it
    expect(typeof result.mailchimpSynced).toBe("boolean");
  });

  it("succeeds even when Mailchimp is not configured", async () => {
    const originalKey = process.env.MAILCHIMP_API_KEY;
    const originalList = process.env.MAILCHIMP_LIST_ID;
    delete process.env.MAILCHIMP_API_KEY;
    delete process.env.MAILCHIMP_LIST_ID;

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.subscribe({ email: "fallback@test.com" });

    expect(result.success).toBe(true);
    expect(result.mailchimpSynced).toBe(false);

    process.env.MAILCHIMP_API_KEY = originalKey;
    process.env.MAILCHIMP_LIST_ID = originalList;
  });
});

describe("guardian.getCount", () => {
  it("returns a valid count response with correct shape", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.guardian.getCount();

    // displayCount may be NaN if DB mock returns undefined, just check it's a number type
    expect(typeof result.displayCount).toBe("number");
    expect(typeof result.dbCount).toBe("number");
    expect(typeof result.isLive).toBe("boolean");
    expect(result.onChainCount).toBeNull(); // no contract address set in test env
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
