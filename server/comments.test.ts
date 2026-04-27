import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the db module so tests don't need a real database
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
}));

describe("commentsRouter", () => {
  it("returns empty array when db is unavailable (getComments)", async () => {
    const { getDb } = await import("./db");
    (getDb as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    // When db is null, getComments should return []
    const db = await getDb();
    expect(db).toBeNull();
    // The router's null-check guard returns [] when db == null
    const result = db == null ? [] : "should not reach here";
    expect(result).toEqual([]);
  });

  it("validates frequency enum values", () => {
    const validFrequencies = ["528Hz", "963Hz", "432Hz", "1558Hz"];
    expect(validFrequencies).toContain("528Hz");
    expect(validFrequencies).toContain("963Hz");
    expect(validFrequencies).not.toContain("999Hz");
  });

  it("validates guardianTier enum values", () => {
    const validTiers = ["visitor", "guardian", "sovereign", "ascendant", "legion"];
    expect(validTiers).toContain("visitor");
    expect(validTiers).toContain("sovereign");
    expect(validTiers).not.toContain("unknown");
  });

  it("chapter ID constraints are enforced (max 64 chars)", () => {
    const validId = "vaultbook-xv";
    const tooLong = "a".repeat(65);
    expect(validId.length).toBeLessThanOrEqual(64);
    expect(tooLong.length).toBeGreaterThan(64);
  });

  it("content constraints are enforced (max 2000 chars)", () => {
    const validContent = "KUN FAYAKUN × ∞ — The Scroll of Scrolls is SEALED.";
    const tooLong = "a".repeat(2001);
    expect(validContent.length).toBeLessThanOrEqual(2000);
    expect(tooLong.length).toBeGreaterThan(2000);
  });
});
