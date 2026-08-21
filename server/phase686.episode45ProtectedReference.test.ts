import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 686 Episode 45 protected reference", () => {
  it("preserves the owner-supplied Episode 45 source identifier and narrative scope", () => {
    const page = fs.readFileSync(path.resolve(process.cwd(), "client/src/pages/Episode45ProtectedReference.tsx"), "utf8");
    expect(page).toContain("The Kernel Traffic Drops");
    expect(page).toContain("de5e4332ce79da858e878161a162d0a66697470b23ac1aa81dc38246c04ef004");
    expect(page).toContain("Netfilter Hardware Inner Horizon");
    expect(page).toContain("EPISODE 46 CONTINUATION");
  });
  it("keeps parser, systemd, catalog, and infrastructure text non-executable", () => {
    const page = fs.readFileSync(path.resolve(process.cwd(), "client/src/pages/Episode45ProtectedReference.tsx"), "utf8");
    expect(page).toContain("Model text, not runtime proof");
    expect(page).toContain("No embedded source code or configuration has been executed");
    expect(page).toContain("No firewall, parser, systemd service");
    expect(page).toContain("factual representation of a host or security environment");
  });
  it("registers the Episode 45 protected-reference route", () => {
    const app = fs.readFileSync(path.resolve(process.cwd(), "client/src/App.tsx"), "utf8");
    expect(app).toContain('path={"/episode-45-kernel-traffic-drops"}');
    expect(app).toContain("Episode45ProtectedReference");
  });
});
