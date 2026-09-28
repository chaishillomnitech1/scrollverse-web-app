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

  it("adds category filters and clickable milestone detail disclosure", () => {
    const dashboard = read("client/src/pages/Dashboard.tsx");

    expect(dashboard).toContain("timelineCategories");
    expect(dashboard).toContain("sccc-timeline-filter");
    expect(dashboard).toContain("filteredTimelineMilestones");
    expect(dashboard).toContain("aria-expanded={active}");
    expect(dashboard).toContain("sccc-milestone-detail");
  });

  it("exports the current read-only milestone snapshot as a local CSV", () => {
    const dashboard = read("client/src/pages/Dashboard.tsx");

    expect(dashboard).toContain("exportScccSnapshot");
    expect(dashboard).toContain("sccc-export-snapshot");
    expect(dashboard).toContain("text/csv;charset=utf-8");
    expect(dashboard).toContain("URL.createObjectURL");
  });

  it("adds dashboard card transitions with reduced-motion coverage", () => {
    const dashboard = read("client/src/pages/Dashboard.tsx");
    const styles = read("client/src/index.css");

    expect(dashboard).toContain("sccc-dashboard-card");
    expect(styles).toContain(".sccc-dashboard-card");
    expect(styles).toContain("prefers-reduced-motion: reduce");
  });

  it("keeps the authenticated SCCC header readable at mobile widths", () => {
    const dashboard = read("client/src/pages/Dashboard.tsx");

    expect(dashboard).toContain('className="hidden sm:inline"');
    expect(dashboard).toContain('className="hidden sm:block"');
  });
});
