import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const catalog = readFileSync("client/src/lib/connectorSurface.ts", "utf8");
const board = readFileSync("client/src/components/MonetizationPlanningBoard.tsx", "utf8");
const registry = readFileSync("client/src/components/SharedToolRegistry.tsx", "utf8");

describe("Phase 1045 — Higgsfield production capability", () => {
  it("records Higgsfield’s verified directory capability without claiming first-use activation", () => {
    expect(catalog).toContain('"higgsfield"');
    expect(catalog).toContain("Higgsfield");
    expect(catalog).toContain("Higgsfield Inc.");
    expect(catalog).toContain("Generate cinematic images, videos, character-consistent assets, and campaign-ready visuals");
    expect(catalog).toContain("AVAILABLE");
  });

  it("records the owner’s all-connectors enhancement authority and cinematic production bar", () => {
    expect(board).toContain("ALL CONNECTORS AND ADDITIONS");
    expect(board).toContain("Coogler / Lucas / Spielberg");
    expect(board).toContain("Higgsfield");
    expect(board).toContain("whole productions");
  });

  it("stages channel distribution without autonomous publishing", () => {
    expect(board).toContain("YouTube @chaishill-u1z");
    expect(board).toContain("CHANNEL PROGRAM");
    expect(board).toContain("PRIVATE DRAFT");
    expect(board).toContain("NO PUBLIC PUBLISHING WITHOUT OWNER WORD");
    expect(registry).toContain("Higgsfield");
  });

  it("records episode monetization as a joint production and revenue-planning lane", () => {
    expect(board).toContain("EPISODE MONETIZATION");
    expect(board).toContain("Manus + Muse + sub-agent program");
    expect(board).toContain("Premieres, product tags, clip engine, cross-surface links");
    expect(board).toContain("Nothing publishes without the owner’s word");
  });
});
