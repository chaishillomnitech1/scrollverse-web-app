export type AtlasGraphNode = {
  id: number;
  slug: string;
  title: string;
  kind: string;
};

export type AtlasGraphEdge = {
  id: number;
  sourceEntityId: number;
  targetEntityId: number;
  relationType: string;
};

export type AtlasTraversalDirection = "outgoing" | "incoming" | "both";

export type AtlasTraversalResult = {
  root: AtlasGraphNode;
  nodes: AtlasGraphNode[];
  relationships: AtlasGraphEdge[];
  depthReached: number;
};

/**
 * Deterministic breadth-first traversal over source-backed Atlas records.
 * The function is deliberately storage-agnostic so its graph rules can be
 * tested without a database or external service.
 */
export function traverseAtlasGraph(
  nodes: AtlasGraphNode[],
  edges: AtlasGraphEdge[],
  startSlug: string,
  options: { direction?: AtlasTraversalDirection; maxDepth?: number } = {},
): AtlasTraversalResult | null {
  const direction = options.direction ?? "both";
  const maxDepth = options.maxDepth ?? 1;
  if (!Number.isInteger(maxDepth) || maxDepth < 0 || maxDepth > 5) {
    throw new RangeError("Atlas traversal depth must be an integer from 0 to 5.");
  }

  const nodeById = new Map(nodes.map(node => [node.id, node]));
  const root = nodes.find(node => node.slug === startSlug);
  if (!root) return null;

  const visited = new Set<number>([root.id]);
  const includedEdges = new Map<number, AtlasGraphEdge>();
  const queue: Array<{ node: AtlasGraphNode; depth: number }> = [{ node: root, depth: 0 }];
  let depthReached = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.depth >= maxDepth) continue;

    const adjacent = edges
      .filter(edge => {
        if (direction === "outgoing") return edge.sourceEntityId === current.node.id;
        if (direction === "incoming") return edge.targetEntityId === current.node.id;
        return edge.sourceEntityId === current.node.id || edge.targetEntityId === current.node.id;
      })
      .sort((a, b) => a.relationType.localeCompare(b.relationType) || a.id - b.id);

    for (const edge of adjacent) {
      includedEdges.set(edge.id, edge);
      const nextId = edge.sourceEntityId === current.node.id
        ? edge.targetEntityId
        : edge.sourceEntityId;
      const nextNode = nodeById.get(nextId);
      if (!nextNode || visited.has(nextId)) continue;
      visited.add(nextId);
      const nextDepth = current.depth + 1;
      depthReached = Math.max(depthReached, nextDepth);
      queue.push({ node: nextNode, depth: nextDepth });
    }
  }

  const orderedNodes = [root, ...queue.map(item => item.node)];
  // Queue contains each newly discovered node exactly once, in BFS order.
  return {
    root,
    nodes: orderedNodes,
    relationships: [...includedEdges.values()].sort((a, b) => a.id - b.id),
    depthReached,
  };
}
