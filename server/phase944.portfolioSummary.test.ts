import { describe, expect, it, vi } from "vitest";
import { createArtifactSummaryService } from "./routers/portfolioSummary";

const preview = "A creator-led visual gateway connects original story worlds and game concepts.";

describe("artifact summary service", () => {
  it("accepts only registered IDs and does not send arbitrary client text to the model", async () => {
    const generate = vi.fn(async (item: { id: string; title: string }) => `${item.title}: ${preview}`);
    const service = createArtifactSummaryService(generate);
    await expect(service("unlisted-private-asset")).rejects.toThrow(/unknown artifact/i);
    expect(generate).not.toHaveBeenCalled();
    expect(await service("omniland")).toContain("Omniland Cinematic Gateway");
    expect(generate).toHaveBeenCalledOnce();
    expect(generate.mock.calls[0][0]).toMatchObject({ id: "omniland", title: "Omniland Cinematic Gateway" });
  });

  it("deduplicates in-flight and repeated requests for the same item", async () => {
    const generate = vi.fn(async () => preview);
    const service = createArtifactSummaryService(generate);
    expect(await Promise.all([service("dynasty"), service("dynasty")])).toEqual([preview, preview]);
    expect(await service("dynasty")).toBe(preview);
    expect(generate).toHaveBeenCalledOnce();
  });

  it("returns a bounded plain-text summary and retries a failed generation", async () => {
    let attempts = 0;
    const service = createArtifactSummaryService(async () => {
      attempts++;
      if (attempts === 1) throw new Error("provider unavailable");
      return "**" + "Story world ".repeat(50) + "**";
    });
    await expect(service("fashion")).rejects.toThrow("provider unavailable");
    const result = await service("fashion");
    expect(result.length).toBeLessThanOrEqual(240);
    expect(result).not.toContain("**");
    expect(attempts).toBe(2);
  });
});
