import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (relative: string) => readFileSync(join(root, relative), "utf8");

describe("Phase 1017 receipt and retry polish", () => {
  it("provides lightweight receipt search, sorting, and a dynamic source counter", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain("receiptQuery");
    expect(home).toContain("receiptSort");
    expect(home).toContain("Sort receipts");
    expect(home).toContain("Attached context sources");
    expect(home).toContain("filteredPhase1016Receipts");
  });

  it("provides accessible retry hover feedback and a tooltip", () => {
    const twin = read("client/src/pages/AITwin.tsx");
    expect(twin).toContain("Retry the last AI Twin request");
    expect(twin).toContain("title=\"Retry the last AI Twin request\"");
    expect(twin).toContain("hover:-translate-y-0.5");
    expect(twin).toContain("Retry response");
  });
});
