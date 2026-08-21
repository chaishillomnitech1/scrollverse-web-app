import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 659 — ScrollVerse Central Hub Source Record", () => {
  it("preserves local catalog and fiction preview records without treating them as public releases", () => {
    const page = read("client/src/pages/CentralHubSourceRecord.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "central-hub-source-record" })');
    expect(page).toContain("The Primordial Ignition Node");
    expect(page).toContain("Neural Lightning");
    expect(page).toContain("Crowned Victory");
    expect(page).toContain("The Sovereign Archive");
    expect(page).toContain("The Closed Loop");
    expect(page).toContain("The Invariant Gate");
    expect(page).toContain('externalAction: "none"');
    expect(page).toContain("No master audio or video");
  });

  it("registers the source route, connects episode planning, and retains release-governance evidence", () => {
    const app = read("client/src/App.tsx");
    const slate = read("client/src/pages/OriginalEpisodeSlate.tsx");
    const sourceLog = read("docs/phase659-scrollverse-central-hub-source-log.md");
    expect(app).toContain('import CentralHubSourceRecord from "./pages/CentralHubSourceRecord"');
    expect(app).toContain('<Route path={"/central-hub-source-record"} component={CentralHubSourceRecord} />');
    expect(slate).toContain('href: "/central-hub-source-record"');
    expect(sourceLog).toContain("contributor rights");
    expect(sourceLog).toContain("owner release");
  });
});
