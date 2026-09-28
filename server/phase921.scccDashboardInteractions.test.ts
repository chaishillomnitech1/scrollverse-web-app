import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..");
const read = (file: string) => readFileSync(path.resolve(root, file), "utf8");

describe("Phase 921 — SCCC dashboard interactions", () => {
  it("provides a persistent dark-mode toggle with an accessible state and local preference", () => {
    const dashboard = read("client/src/pages/Dashboard.tsx");

    expect(dashboard).toContain("sccc-dashboard-dark-mode");
    expect(dashboard).toContain("aria-pressed={darkMode}");
    expect(dashboard).toContain("localStorage.getItem(\"scrollverse:sccc-dark-mode\")");
    expect(dashboard).toContain("title={darkMode ? \"Switch to comfort mode\" : \"Switch to deep dark mode\"}");
  });

  it("renders a lightweight, source-labeled milestone timeline", () => {
    const dashboard = read("client/src/pages/Dashboard.tsx");

    expect(dashboard).toContain("SCCC MILESTONE TIMELINE");
    expect(dashboard).toContain("timelineMilestones");
    expect(dashboard).toContain("Source-led portal foundation");
    expect(dashboard).toContain("Corpus and New Dominion planning");
    expect(dashboard).toContain("Current local readiness");
    expect(dashboard).toContain("not a public deployment or billing confirmation");
  });

  it("animates status alerts while preserving clear hover and focus descriptions", () => {
    const dashboard = read("client/src/pages/Dashboard.tsx");
    const styles = read("client/src/index.css");

    expect(dashboard).toContain("sccc-status-alert");
    expect(dashboard).toContain("aria-describedby=\"sccc-status-help\"");
    expect(dashboard).toContain("id=\"sccc-status-help\"");
    expect(dashboard).toContain("title=\"Read-only source status\"");
    expect(styles).toContain(".sccc-status-alert");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
