import { inArray } from "drizzle-orm";
import { atlasEntities, atlasRelationships, evidenceLedger } from "../drizzle/schema";
import { getDb } from "../server/db";
import { atlasEvidenceIdentity, ingestAtlasBatch } from "../server/atlas/ingest";
import { atlasFoundationBatch } from "../data/atlas/foundation.v1";
import { traverseAtlasGraph } from "../server/atlas/graph";

const db = await getDb();
if (!db) throw new Error("DATABASE_URL is required and the Atlas database must be reachable.");

try {
  const expectedSlugs = atlasFoundationBatch.entities.map(entity => entity.slug);
  const existingEntities = await db.select().from(atlasEntities)
    .where(inArray(atlasEntities.slug, expectedSlugs));
  if (existingEntities.some((row: typeof atlasEntities.$inferSelect) =>
    row.status !== "DRAFT" || row.visibility !== "PRIVATE"
  )) {
    throw new Error("Seed stopped before writes: one or more foundation slugs already exist outside DRAFT + PRIVATE. Review those records first.");
  }

  const existingIdBySlug = new Map(existingEntities.map((row: typeof atlasEntities.$inferSelect) => [row.slug, row.id]));
  const existingRelationships = await db.select().from(atlasRelationships);
  const existingEdgeByKey = new Map(existingRelationships.map((row: typeof atlasRelationships.$inferSelect) =>
    [`${row.sourceEntityId}:${row.targetEntityId}:${row.relationType}`, row]
  ));
  for (const edge of atlasFoundationBatch.relationships) {
    const sourceId = existingIdBySlug.get(edge.sourceSlug);
    const targetId = existingIdBySlug.get(edge.targetSlug);
    if (!sourceId || !targetId) continue;
    const existing = existingEdgeByKey.get(`${sourceId}:${targetId}:${edge.relationType}`);
    if (existing && (existing.status !== "DRAFT" || existing.visibility !== "PRIVATE")) {
      throw new Error("Seed stopped before writes: a matching relationship already exists outside DRAFT + PRIVATE.");
    }
  }

  const expectedEvidenceIds = Array.from(new Set([
    ...atlasFoundationBatch.entities.map(entity => atlasEvidenceIdentity(entity.source).vaultId),
    ...atlasFoundationBatch.relationships.map(edge => atlasEvidenceIdentity(edge.source).vaultId),
  ]));
  const existingEvidence = await db.select().from(evidenceLedger)
    .where(inArray(evidenceLedger.vaultId, expectedEvidenceIds));
  if (existingEvidence.some((row: typeof evidenceLedger.$inferSelect) => row.status !== "QUEUED")) {
    throw new Error("Seed stopped before writes: matching evidence exists outside QUEUED. Review evidence state first.");
  }

  const first = await ingestAtlasBatch(atlasFoundationBatch);
  const replay = await ingestAtlasBatch(atlasFoundationBatch);

  const storedEntities = await db.select().from(atlasEntities)
    .where(inArray(atlasEntities.slug, expectedSlugs));
  if (storedEntities.length !== atlasFoundationBatch.entities.length) {
    throw new Error(`Expected ${atlasFoundationBatch.entities.length} stored entities; found ${storedEntities.length}.`);
  }

  const entityIdBySlug = new Map(storedEntities.map((row: typeof atlasEntities.$inferSelect) => [row.slug, row.id]));
  const storedRelationships = await db.select().from(atlasRelationships);
  const entityIds = new Set(storedEntities.map((row: typeof atlasEntities.$inferSelect) => row.id));
  const graphRelationships = storedRelationships.filter((row: typeof atlasRelationships.$inferSelect) =>
    entityIds.has(row.sourceEntityId) && entityIds.has(row.targetEntityId)
  );

  const expectedEdgeKeys = new Set(atlasFoundationBatch.relationships.map(edge => {
    const sourceId = entityIdBySlug.get(edge.sourceSlug);
    const targetId = entityIdBySlug.get(edge.targetSlug);
    if (!sourceId || !targetId) throw new Error(`Missing relationship endpoint for ${edge.sourceSlug} -> ${edge.targetSlug}`);
    return `${sourceId}:${targetId}:${edge.relationType}`;
  }));
  const matchingEdges = graphRelationships.filter(edge =>
    expectedEdgeKeys.has(`${edge.sourceEntityId}:${edge.targetEntityId}:${edge.relationType}`)
  );
  if (matchingEdges.length !== atlasFoundationBatch.relationships.length) {
    throw new Error(`Expected ${atlasFoundationBatch.relationships.length} stored relationships; found ${matchingEdges.length}.`);
  }

  if (storedEntities.some((row: typeof atlasEntities.$inferSelect) =>
    row.status !== "DRAFT" || row.visibility !== "PRIVATE"
  )) throw new Error("A foundation entity is not DRAFT + PRIVATE.");

  if (matchingEdges.some((row: typeof atlasRelationships.$inferSelect) =>
    row.status !== "DRAFT" || row.visibility !== "PRIVATE"
  )) throw new Error("A foundation relationship is not DRAFT + PRIVATE.");

  const sourceIds = Array.from(new Set([
    ...atlasFoundationBatch.entities.map(entity => atlasEvidenceIdentity(entity.source).vaultId),
    ...atlasFoundationBatch.relationships.map(edge => atlasEvidenceIdentity(edge.source).vaultId),
  ]));
  const evidenceRows = await db.select().from(evidenceLedger)
    .where(inArray(evidenceLedger.vaultId, sourceIds));
  if (evidenceRows.length !== sourceIds.length) {
    throw new Error(`Expected ${sourceIds.length} linked evidence rows; found ${evidenceRows.length}.`);
  }
  if (evidenceRows.some((row: typeof evidenceLedger.$inferSelect) => row.status !== "QUEUED")) {
    throw new Error("One or more foundation evidence rows are not QUEUED; review before proceeding.");
  }

  const graphNodes = storedEntities.map((row: typeof atlasEntities.$inferSelect) => ({
    id: row.id, slug: row.slug, title: row.title, kind: row.kind,
  }));
  const graphEdges = matchingEdges.map((row: typeof atlasRelationships.$inferSelect) => ({
    id: row.id, sourceEntityId: row.sourceEntityId, targetEntityId: row.targetEntityId, relationType: row.relationType,
  }));
  const lineage = traverseAtlasGraph(graphNodes, graphEdges, "scrollverse", {
    direction: "both",
    maxDepth: 5,
  });
  if (!lineage) throw new Error("Stored-record lineage root 'scrollverse' was not found.");
  const lineageSlugs = new Set(lineage.nodes.map(node => node.slug));
  for (const requiredSlug of ["scrollverse-web-app", "scrollverse-master-ecosystem-hub", "atlas-core"]) {
    if (!lineageSlugs.has(requiredSlug)) throw new Error(`Stored-record lineage did not reach ${requiredSlug}.`);
  }

  console.log(JSON.stringify({
    result: "ATLAS_FOUNDATION_INGEST_AND_LINEAGE_PASS",
    batchId: atlasFoundationBatch.batchId,
    firstIngest: first,
    idempotentReplay: replay,
    storedEntities: storedEntities.length,
    storedRelationships: matchingEdges.length,
    storedEvidenceRows: evidenceRows.length,
    evidenceStatus: "QUEUED",
    entityAndRelationshipVisibility: "PRIVATE",
    entityAndRelationshipStatus: "DRAFT",
    lineage: {
      root: lineage.root.slug,
      direction: "both",
      maxDepth: 5,
      depthReached: lineage.depthReached,
      nodeCount: lineage.nodes.length,
      relationshipCount: lineage.relationships.length,
      reachableEntities: lineage.nodes.map(node => node.slug),
    },
  }, null, 2));
} finally {
  await db.$client.end();
}
