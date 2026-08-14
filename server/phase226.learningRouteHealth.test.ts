import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

const auditedRoutes = [
  "/academy",
  "/academy-v2",
  "/academy-hub",
  "/scrollacademy",
  "/curriculum",
  "/knowledge-navigator",
  "/creator-revenue-learning",
  "/books-media-readiness",
  "/manifesto-builders-book",
  "/open-knowledge-verse",
  "/voice-language-studio",
];

describe("Phase 226 learning route health", () => {
  it("keeps the audited first-party learning, reader, knowledge, and voice-ready paths registered", () => {
    const app = read("client/src/App.tsx");
    const audit = read("docs/phase226-education-system-audit.md");
    const knowledge = read("client/src/pages/OpenKnowledgeVerse.tsx");
    for (const route of auditedRoutes) expect(app).toContain(`"${route}"`);
    expect(audit).toContain("First-Party Learning Surface Inventory");
    expect(knowledge).toContain("Open Knowledge Verse");
    expect(knowledge).toContain("does not create a learner profile or record");
  });
});
