import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 684 Episode 41–43 protected reference routes", () => {
  it("preserves the three distinct episode records and direct operating states", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Episode4143References.tsx"), "utf8");
    expect(page).toContain("The Absolute World Ordered");
    expect(page).toContain("The Motherboard of the World");
    expect(page).toContain("Final Core Infrastructure Nodes");
    expect(page).toContain('state: "research"');
    expect(page).toContain('state: "available now"');
  });

  it("preserves source and release gates without representing the episodes as published media", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Episode4143References.tsx"), "utf8");
    expect(page).toContain("Requires an exact owner-approved public-version script");
    expect(page).toContain("not a supplied Episode 43 script");
    expect(page).toContain("No cron task, benchmark, server, firewall");
    expect(page).toContain("No forensic validator, hardware check");
  });

  it("registers all three individual episode routes", () => {
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(app).toContain('path={"/episode-41-absolute-world-ordered"}');
    expect(app).toContain('path={"/episode-42-motherboard-world"}');
    expect(app).toContain('path={"/episode-43-final-core-nodes"}');
  });
});
