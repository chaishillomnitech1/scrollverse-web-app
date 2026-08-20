import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/CreatorBroadcastPreparation.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const record = fs.readFileSync(path.join(root, "docs/phase613-multi-vector-replay-consolidation.md"), "utf8");

describe("Phase 613 multi-vector replay consolidation", () => {
  it("preserves six distinct source records and their browser-local lesson", () => {
    expect(record).toContain("six distinct replay records");
    expect(record).toContain("Persistent catalog reference intake");
    expect(record).toContain("Creator royalty-readiness research");
  });

  it("offers local catalog, treatment, channel, and royalty preparation tracks", () => {
    expect(page).toContain("CREATOR BROADCAST PREPARATION");
    expect(page).toContain("Track visual treatments");
    expect(page).toContain("Channel reference review");
    expect(page).toContain("Creator royalty readiness");
    expect(page).toContain("does not connect a channel");
  });

  it("registers the creator broadcast preparation route", () => {
    expect(app).toContain('import CreatorBroadcastPreparation from "./pages/CreatorBroadcastPreparation"');
    expect(app).toContain('<Route path={"/creator-broadcast-preparation"} component={CreatorBroadcastPreparation} />');
  });
});
