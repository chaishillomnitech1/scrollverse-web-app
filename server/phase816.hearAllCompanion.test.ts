import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 816 — Hear All companion standard", () => {
  it("gives every reusable companion chat a context-aware and respectful engagement standard", () => {
    const chatBox = readFileSync(resolve(import.meta.dirname, "../client/src/components/AIChatBox.tsx"), "utf8");
    expect(chatBox).toContain("HEAR ALL · CONTEXT BEFORE RESPONSE");
    expect(chatBox).toContain("Speak freely.");
    expect(chatBox).toContain("Clear boundaries, teachable moments, and de-escalation");
    expect(chatBox).toContain("growth and creation");
  });
});
