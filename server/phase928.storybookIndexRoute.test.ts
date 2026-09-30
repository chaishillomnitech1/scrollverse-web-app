import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync("client/src/App.tsx", "utf8");
const pagePath = "client/src/pages/SourceLabeledStorybookIndex.tsx";

describe("Phase 928 — Story-book Index Route", () => {
  it("registers a first-party route for the nine-volume source index", () => {
    expect(existsSync(pagePath)).toBe(true);
    expect(app).toContain('const SourceLabeledStorybookIndex = lazy(() => import("@/pages/SourceLabeledStorybookIndex"))');
    expect(app).toContain('<Route path="/source-labeled-storybook-index" component={SourceLabeledStorybookIndex} />');
  });

  it("provides local filtering and JSON export without external operations", () => {
    const page = readFileSync(pagePath, "utf8");

    expect(page).toContain("SOURCE-LABELED STORY-BOOK INDEX");
    expect(page).toContain("Filter volume slots");
    expect(page).toContain("Download local story-book index");
    expect(page).toContain("Volume 01");
    expect(page).toContain("No external artifact was opened");
    expect(page).toContain("No token, wallet, contract, payment, or publication action occurred");
  });
});
