import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 625 — Omnithrone continuum package", () => {
  it("preserves the original Episode 36 package and static Trinity route as browser-local records", () => {
    const app = read("client/src/App.tsx");
    const episode = read("docs/production/episode36-autonomous-broadcast.md");
    const staticLayout = read("client/public/trinity-sovereign-portal.html");
    const sourceRecord = read("docs/phase625-omnithrone-source-record.md");

    expect(app).toContain('path={"/trinity-sovereign-portal"}');
    expect(episode).toContain("Episode 36 — The Autonomous Broadcast");
    expect(episode).toContain("Broadcast state: narrative preparation");
    expect(staticLayout).toContain("STATIC TRINITY LAYOUT");
    expect(staticLayout).toContain("BROWSER-LOCAL DISCOVERY");
    expect(sourceRecord).toContain("Google Docs sign-in screen");
  });

  it("provides an owner-scoped local royalty record structure without an external transfer integration", () => {
    const schema = read("drizzle/schema.ts");
    const router = read("server/routers/royaltyRecords.ts");
    const desk = read("client/src/pages/AdminRoyaltyRecords.tsx");
    const notes = read("docs/phase625-local-royalty-record-schema.md");

    expect(schema).toContain('mysqlTable("local_royalty_records"');
    expect(schema).toContain("submittedTransactionReference");
    expect(schema).toContain("reviewStatus");
    expect(router).toContain("adminProcedure");
    expect(router).toContain("non-custodial");
    expect(router).not.toContain("fetch(");
    expect(desk).toContain("Save local source record");
    expect(desk).toContain("0</p>");
    expect(notes).toContain("table begins empty");
  });
});
