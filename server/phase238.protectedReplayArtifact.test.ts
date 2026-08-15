import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const review = fs.readFileSync(path.join(root, "docs/phase238-protected-replay-artifact-review.md"), "utf8");

describe("Phase 238 — protected replay-artifact review", () => {
  it("preserves consent-first outreach and read-only profile-review boundaries", () => {
    expect(review).toContain("empty, consent/source-tracked contact template");
    expect(review).toContain("not imported, verified, contacted, or used for outreach");
    expect(review).toContain("No GitHub Action, token, scheduled job, profile mutation, repository write, or automated README update is configured");
  });

  it("preserves non-execution limits for protected technical and financial material", () => {
    expect(review).toContain("No secret injection, compiler, contract, gas/fuzz test, circuit, testnet, deployment, wallet, payment, payout, or transaction action occurs");
    expect(review).toContain("No code, scripts, actions, webhooks, secrets, contact rows, pitch copy, contract files, compiler configuration, provider account, wallet, payout, payment, token, distribution, or transaction was imported or executed");
  });
});
