import { describe, expect, it } from "vitest";
import { SCROLLVERSE_SYSTEMS_MAP, SYSTEMS_MAP_STATUS } from "@shared/scrollverseSystemsMap";

describe("ScrollVerse Systems Map", () => {
  it("provides a declared status and routable first-party destination for every node", () => {
    const nodes = SCROLLVERSE_SYSTEMS_MAP.flatMap(layer => layer.nodes);
    expect(SCROLLVERSE_SYSTEMS_MAP.length).toBeGreaterThanOrEqual(6);
    expect(nodes.length).toBeGreaterThanOrEqual(20);
    for (const node of nodes) {
      expect(SYSTEMS_MAP_STATUS[node.status]).toBeDefined();
      expect(node.href.startsWith("/")).toBe(true);
      expect(node.summary).not.toHaveLength(0);
    }
  });

  it("keeps implemented, developing, external, conceptual, and gated work visibly distinct", () => {
    const statuses = SCROLLVERSE_SYSTEMS_MAP.flatMap(layer => layer.nodes.map(node => node.status));
    expect(statuses).toContain("IMPLEMENTED");
    expect(statuses).toContain("IN_PROGRESS");
    expect(statuses).toContain("EXTERNAL_OPTIONAL");
    expect(statuses).toContain("CONCEPTUAL");
    expect(statuses).toContain("GATED");
  });
});
