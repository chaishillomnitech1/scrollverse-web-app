import { describe, expect, it } from "vitest";
import { traverseAtlasGraph, type AtlasGraphEdge, type AtlasGraphNode } from "./graph";

const nodes: AtlasGraphNode[] = [
  { id: 1, slug: "scrollverse", title: "ScrollVerse", kind: "PROJECT" },
  { id: 2, slug: "atlas-core", title: "Atlas Core", kind: "CONCEPT" },
  { id: 3, slug: "web-app", title: "ScrollVerse Web App", kind: "REPOSITORY" },
  { id: 4, slug: "evidence-ledger", title: "Evidence Ledger", kind: "ARTIFACT" },
];
const edges: AtlasGraphEdge[] = [
  { id: 10, sourceEntityId: 1, targetEntityId: 2, relationType: "CONTAINS" },
  { id: 11, sourceEntityId: 2, targetEntityId: 3, relationType: "IMPLEMENTED_IN" },
  { id: 12, sourceEntityId: 3, targetEntityId: 4, relationType: "PERSISTS" },
  { id: 13, sourceEntityId: 4, targetEntityId: 1, relationType: "TRACES_TO" },
];

describe("Atlas Core graph traversal", () => {
  it("walks outward in deterministic breadth-first order", () => {
    const result = traverseAtlasGraph(nodes, edges, "scrollverse", { direction: "outgoing", maxDepth: 2 });
    expect(result?.nodes.map(node => node.slug)).toEqual(["scrollverse", "atlas-core", "web-app"]);
    expect(result?.relationships.map(edge => edge.id)).toEqual([10, 11]);
    expect(result?.depthReached).toBe(2);
  });

  it("traces incoming lineage toward source records", () => {
    const result = traverseAtlasGraph(nodes, edges, "evidence-ledger", { direction: "incoming", maxDepth: 2 });
    expect(result?.nodes.map(node => node.slug)).toEqual(["evidence-ledger", "web-app", "atlas-core"]);
    expect(result?.relationships.map(edge => edge.id)).toEqual([11, 12]);
  });

  it("supports cycles without revisiting nodes", () => {
    const result = traverseAtlasGraph(nodes, edges, "scrollverse", { direction: "both", maxDepth: 5 });
    expect(result?.nodes).toHaveLength(4);
    expect(new Set(result?.nodes.map(node => node.id)).size).toBe(4);
  });

  it("returns null when the requested root does not exist", () => {
    expect(traverseAtlasGraph(nodes, edges, "missing")).toBeNull();
  });

  it("rejects unbounded or invalid depth values", () => {
    expect(() => traverseAtlasGraph(nodes, edges, "scrollverse", { maxDepth: 6 })).toThrow(/depth/);
    expect(() => traverseAtlasGraph(nodes, edges, "scrollverse", { maxDepth: 1.5 })).toThrow(/depth/);
  });
});
