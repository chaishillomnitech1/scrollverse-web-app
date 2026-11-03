import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("AI Twin communication feedback", () => {
  const source = readFileSync(resolve(process.cwd(), "client/src/pages/AITwin.tsx"), "utf8");

  it("exposes a live status region and an explicit retry path", () => {
    expect(source).toContain('aria-live="polite"');
    expect(source).toContain("Retry response");
    expect(source).toContain("retryLastRequest");
  });

  it("keeps provider failures truthful instead of presenting a false online success", () => {
    expect(source).toContain("The AI channel is temporarily unavailable");
    expect(source).toContain("No message was lost");
  });
});
