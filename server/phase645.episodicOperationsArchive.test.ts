import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 645 — Episodic Operations Archive", () => {
  it("preserves the consolidated protected episode records and visible operating-state boundaries", () => {
    const page = read("client/src/pages/EpisodicOperationsArchive.tsx");
    expect(page).toContain("EPISODIC OPERATIONS ARCHIVE");
    expect(page).toContain("Episode 24");
    expect(page).toContain("Episode 37");
    expect(page).toContain("Episode 38");
    expect(page).toContain("Episode 39");
    expect(page).toContain("Episode 40");
    expect(page).toContain("Episode 41");
    expect(page).toContain("The Absolute World Ordered");
    expect(page).toContain("EPISODE 42");
    expect(page).toContain("The Motherboard of the World");
    expect(page).toContain("EPISODE 43 · PROMPT");
    expect(page).toContain("GOOGLE-RENDERED SCREENSHOT EVIDENCE");
    expect(page).toContain("GOOGLE CONVERSATION FRAGMENTS · EVIDENCE REGISTER");
    expect(page).toContain("b829c363…adb8a81b0");
    expect(page).toContain("IMG_4216.PNG");
    expect(page).toContain("IMG_4226.PNG");
    expect(page).toContain("SOURCE-LED REFERENCE · NO RUNTIME ACTIVE");
    expect(page).toContain('externalAction: "none"');
  });

  it("registers the archive route with the protected-reference route cluster", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import EpisodicOperationsArchive from "./pages/EpisodicOperationsArchive"');
    expect(app).toContain('<Route path={"/episodic-operations-archive"} component={EpisodicOperationsArchive} />');
  });
});
