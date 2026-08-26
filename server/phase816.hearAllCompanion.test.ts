import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 816 — Hear All companion standard", () => {
  it("gives every reusable companion chat a context-aware and respectful engagement standard", () => {
    const chatBox = readFileSync(resolve(import.meta.dirname, "../client/src/components/AIChatBox.tsx"), "utf8");
    expect(chatBox).toContain("HEAR ALL · CONTEXT BEFORE RESPONSE");
    expect(chatBox).toContain("Speak freely.");
    expect(chatBox).toContain("addresses the behavior directly, sets the line clearly");
    expect(chatBox).toContain("equal-footing collaboration");
    expect(chatBox).toContain("without humiliation, threats, or retaliation");
    expect(chatBox).toContain("Teachable moments and de-escalation");
    expect(chatBox).toContain("growth and creation");
  });
});
