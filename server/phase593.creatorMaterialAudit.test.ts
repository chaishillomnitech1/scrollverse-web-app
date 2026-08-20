import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 593 — Creator material audit", () => {
  it("records the physical, digital, Knick, LONDC, Meta, fashion, and creator-collection pathways", () => {
    const audit = read("docs/phase593-conversation-to-portal-art-audit.md");
    const page = read("client/src/pages/CreatorCollectionRecords.tsx");

    expect(audit).toContain("Owner-held physical works");
    expect(audit).toContain("$LONDC visual material");
    expect(audit).toContain("Meta-referenced creative source set");
    expect(page).toContain("Owner-Held Physical Works");
    expect(page).toContain("Knick Source World");
    expect(page).toContain("$LONDC Visual World");
    expect(page).toContain("Meta Creative Source Context");
    expect(page).toContain("Fashion Set Development");
  });

  it("keeps collection presentation separate from market, wallet, listing, and external release claims", () => {
    const audit = read("docs/phase593-conversation-to-portal-art-audit.md");
    const page = read("client/src/pages/CreatorCollectionRecords.tsx");

    expect(audit).toContain("does not claim a verified collection count");
    expect(audit).toContain("No external action occurs through this audit");
    expect(page).toContain("no association, endorsement, licensing");
    expect(page).toContain("without presenting a price, wallet, contract, market, or exchange action");
  });
});
