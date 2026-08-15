import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
describe("Phase 264 — Audience Value & Leverage", () => {
  it("registers the measured audience-value route and exposes it from Home", () => { expect(read("client/src/App.tsx")).toContain('path="/audience-value-leverage"'); expect(read("client/src/pages/Home.tsx")).toContain('href: "/audience-value-leverage"'); });
  it("keeps preparation browser-local and rejects invented commercial state", () => { const page = read("client/src/pages/AudienceValueLeverage.tsx"); expect(page).toContain("browser-local preparation coverage"); expect(page).toContain("not invented reach, revenue, valuation, or guarantees"); expect(page).toContain("Advertising, data sales, sponsor deals, payments"); });
});
