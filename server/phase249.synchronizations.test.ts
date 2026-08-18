import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 249 — Synchronization Collection", () => {
  const page = read("client/src/pages/Synchronizations.tsx");
  const dcVisit = read("client/src/pages/DCVisit.tsx");
  const app = read("client/src/App.tsx");

  it("registers the synchronization story and connects it to the August 28 route", () => {
    expect(app).toContain('Route path="/synchronizations" component={Synchronizations}');
    expect(dcVisit).toContain('href="/synchronizations"');
    expect(page).toContain('href="/dc-visit"');
  });

  it("presents a first-party account with a source trail and correction path", () => {
    expect(page).toContain("First-party personal account");
    expect(page).toContain("make their own conclusion");
    expect(page).toContain("correction idea");
    expect(page).toContain("August 28 · 1978 · 7 o’clock");
  });

  it("keeps the collection in readiness and fails closed on market or chain actions", () => {
    expect(page).toContain("SYNCHRONIZATION COLLECTION · READINESS RECORD");
    expect(page).toContain("Fail-closed");
    expect(page).toContain("No mint, sale, price, wallet connection, transfer, or marketplace action is enabled.");
    expect(page).toContain("does not create an NFT, blockchain asset, wallet relationship, purchase opportunity, ownership assertion, valuation, or investment claim");
  });
});
