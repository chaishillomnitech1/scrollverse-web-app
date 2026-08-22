import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 763 — ScrollVerse × XLVIIIblocks local proposal canvas", () => {
  it("registers the browser-local proposal canvas route", () => {
    expect(read("client/src/App.tsx")).toContain('path="/xlviiiblocks-proposal-canvas" component={XLVIIIblocksProposalCanvas}');
    expect(read("client/src/pages/ScrollVerseXLVIIIblocksReadiness.tsx")).toContain('href="/xlviiiblocks-proposal-canvas"');
  });

  it("includes structured local proposal fields and browser-only export affordances", () => {
    const page = read("client/src/pages/XLVIIIblocksProposalCanvas.tsx");
    for (const label of ["Counterparty or operating name", "Project scope and milestones", "Proposed amount", "Governance and reporting", "White-label responsibilities", "Proposal destination"]) expect(page).toContain(label);
    expect(page).toContain("Copy local summary");
    expect(page).toContain("Download local JSON");
    expect(page).toContain("BROWSER SESSION ONLY");
  });

  it("keeps the canvas local and outside external financial or partnership execution", () => {
    const page = read("client/src/pages/XLVIIIblocksProposalCanvas.tsx");
    expect(page).toContain("No saving. No submission. No hidden transmission.");
    expect(page).toContain("The canvas does not save to a server, submit an application, send email, contact a counterparty, establish credit, bind a party, request funding, receive funds, authorize a transaction, or transmit entered data");
    expect(read("docs/phase763-local-proposal-canvas.md")).toContain("does not save records to a server, send an email, submit an application, contact a counterparty, or transmit user-entered data");
  });
});
