/**
 * SaferWay Router Tests
 * Tests createBooking (public mutation) and listBookings (admin-only query)
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TRPCError } from "@trpc/server";

// ── Mock DB ───────────────────────────────────────────────────────────────────
const mockInsert = vi.fn().mockResolvedValue([{ insertId: 42 }]);
const mockSelect = vi.fn();
const mockFrom = vi.fn();
const mockOrderBy = vi.fn();
const mockLimit = vi.fn().mockResolvedValue([]);

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: () => ({ values: mockInsert }),
    select: () => ({ from: mockFrom }),
  }),
}));

// ── Mock notification ─────────────────────────────────────────────────────────
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// ── Mock fetch (SendGrid) ─────────────────────────────────────────────────────
global.fetch = vi.fn().mockResolvedValue({ ok: true, status: 202 });

// ── Import router after mocks ─────────────────────────────────────────────────
import { appRouter } from "./routers";

function createPublicContext() {
  return {
    user: null,
    req: {} as any,
    res: {} as any,
  };
}

function createAdminContext() {
  return {
    user: { id: 1, role: "admin" as const, openId: "test-admin", name: "Admin" },
    req: {} as any,
    res: {} as any,
  };
}

function createUserContext() {
  return {
    user: { id: 2, role: "user" as const, openId: "test-user", name: "User" },
    req: {} as any,
    res: {} as any,
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe("saferway.createBooking", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInsert.mockResolvedValue([{ insertId: 42 }]);
    (global.fetch as any).mockResolvedValue({ ok: true, status: 202 });
  });

  it("creates a booking and returns ticketRef", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.saferway.createBooking({
      guardianName: "Chais Hill",
      email: "chais@scrollverse.co",
      serviceTier: "detail",
    });
    expect(result.success).toBe(true);
    expect(result.ticketRef).toBe("SFW-000042");
    expect(result.bookingId).toBe(42);
  });

  it("accepts all valid service tiers", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const tiers = ["detail", "express", "signature", "fleet"] as const;
    for (const tier of tiers) {
      mockInsert.mockResolvedValue([{ insertId: 1 }]);
      const result = await caller.saferway.createBooking({
        guardianName: "Test Guardian",
        email: "test@scrollverse.co",
        serviceTier: tier,
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.saferway.createBooking({
        guardianName: "Test",
        email: "not-an-email",
        serviceTier: "express",
      })
    ).rejects.toThrow();
  });

  it("rejects name shorter than 2 characters", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.saferway.createBooking({
        guardianName: "X",
        email: "test@scrollverse.co",
        serviceTier: "express",
      })
    ).rejects.toThrow();
  });

  it("stores optional fields when provided", async () => {
    mockInsert.mockResolvedValue([{ insertId: 99 }]);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.saferway.createBooking({
      guardianName: "Sovereign Guardian",
      email: "guardian@scrollverse.co",
      phone: "609-555-0144",
      serviceTier: "signature",
      vehicleInfo: "2022 Tesla Model S — Midnight Silver",
      notes: "Ceramic coat + paint correction",
    });
    expect(result.success).toBe(true);
    expect(result.ticketRef).toBe("SFW-000099");
  });
});

describe("saferway.listBookings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({ orderBy: mockOrderBy });
    mockOrderBy.mockReturnValue({ limit: mockLimit });
    mockLimit.mockResolvedValue([]);
  });

  it("allows admin to list bookings", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.saferway.listBookings();
    expect(result).toHaveProperty("bookings");
    expect(result).toHaveProperty("total");
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.saferway.listBookings()).rejects.toThrow(TRPCError);
  });

  it("throws UNAUTHORIZED for unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.saferway.listBookings()).rejects.toThrow();
  });
});
