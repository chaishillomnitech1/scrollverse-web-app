import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 602 replay-readiness console", () => {
  it("registers the browser-local replay readiness route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import ReplayReadinessDesk from "./pages/ReplayReadinessDesk"');
    expect(app).toContain('<Route path={"/replay-readiness"} component={ReplayReadinessDesk} />');
  });

  it("provides multi-vector filtering, local export, and staged release preparation", () => {
    const page = read("client/src/pages/ReplayReadinessDesk.tsx");
    expect(page).toContain("REPLAY TRANSMISSION CONSOLE");
    expect(page).toContain("MULTI-VECTOR FILTER");
    expect(page).toContain("EXPORT CURRENT LOCAL AUDIT");
    expect(page).toContain("STAGED RELEASE-CHECKLIST VERIFICATION");
    expect(page).toContain("REQUIRES OWNER RELEASE");
    expect(page).toContain("scrollverse-replay-readiness-audit.txt");
  });

  it("preserves the replay source and external-operation boundaries", () => {
    const record = read("docs/phase602-replay-readiness-source-record.md");
    expect(record).toContain("JQyCbdE152xEIkgUplmagw");
    expect(record).toContain("R9nltFBNT18A2y7HI2bVKN");
    expect(record).toContain("rYgivi2PYdfiXJD4WwgCHr");
    expect(record).toContain("does not represent a DNS change");
  });
});
