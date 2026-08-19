import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 512 source and channel scheduling readiness", () => {
  it("registers the browser-local source and channel scheduling route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import SourceChannelSchedulingReadiness from "./pages/SourceChannelSchedulingReadiness"');
    expect(app).toContain('<Route path={"/source-channel-scheduling-readiness"} component={SourceChannelSchedulingReadiness} />');
  });

  it("requires a complete local job record before future schedule consideration", () => {
    const page = read("client/src/pages/SourceChannelSchedulingReadiness.tsx");
    expect(page).toContain("Source lane");
    expect(page).toContain("Trigger or cadence proposal");
    expect(page).toContain("Permissible scope");
    expect(page).toContain("Stop condition");
    expect(page).toContain("Exact future gate");
  });

  it("keeps schedules, channel actions, and provider actions disabled", () => {
    const page = read("client/src/pages/SourceChannelSchedulingReadiness.tsx");
    const boundedResearch = read("client/src/pages/BoundedResearchOperations.tsx");
    const channels = read("client/src/pages/CreatorChannelHub.tsx");
    expect(page).toContain("No source or channel job is active.");
    expect(page).toContain("no schedule, callback, task, account action, post, message");
    expect(boundedResearch).toContain('href="/source-channel-scheduling-readiness"');
    expect(channels).toContain('href="/source-channel-scheduling-readiness"');
  });
});
