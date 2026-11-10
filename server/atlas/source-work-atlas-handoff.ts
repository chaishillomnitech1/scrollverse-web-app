import {
  validateAtlasImportBatch,
  type AtlasEvidenceSource,
  type AtlasImportBatch,
  type AtlasImportRelationship,
} from "./ingest";

export type ApprovedSourceWorkRelationship = {
  sourceSlug: string;
  targetSlug: string;
  relationType: string;
  description: string;
  source: AtlasEvidenceSource;
  approval: {
    approved: true;
    approvedBy: string;
    approvedAt: string;
    approvalRef: string;
  };
};

export type AtlasApprovalManifestEntry = {
  sourceSlug: string;
  targetSlug: string;
  relationType: string;
  approvedBy: string;
  approvedAt: string;
  approvalRef: string;
};

export type ApprovedAtlasHandoff = {
  batch: AtlasImportBatch;
  approvalManifest: AtlasApprovalManifestEntry[];
};

/**
 * Prepare a source-linked Atlas import batch only from explicitly approved
 * relationship records. This is a pure preparation step; it does not access
 * the database or call ingestAtlasBatch.
 */
export function buildApprovedAtlasHandoff(input: {
  batchId: string;
  relationships: readonly ApprovedSourceWorkRelationship[];
}): ApprovedAtlasHandoff {
  if (input.relationships.length === 0) {
    throw new Error("At least one explicitly approved relationship is required.");
  }

  const approvalManifest = input.relationships.map(link => {
    if (link.approval.approved !== true) {
      throw new Error("Atlas handoff requires explicit relationship approval.");
    }
    if (!link.approval.approvedBy.trim() || !link.approval.approvalRef.trim()) {
      throw new Error("Every relationship approval requires an approver and approval reference.");
    }
    if (Number.isNaN(Date.parse(link.approval.approvedAt))) {
      throw new Error("Relationship approval requires a valid timestamp.");
    }
    return {
      sourceSlug: link.sourceSlug,
      targetSlug: link.targetSlug,
      relationType: link.relationType,
      approvedBy: link.approval.approvedBy,
      approvedAt: link.approval.approvedAt,
      approvalRef: link.approval.approvalRef,
    };
  });

  const relationships: AtlasImportRelationship[] = input.relationships.map(link => ({
    sourceSlug: link.sourceSlug,
    targetSlug: link.targetSlug,
    relationType: link.relationType,
    description: link.description,
    source: link.source,
  }));

  const batch: AtlasImportBatch = {
    batchId: input.batchId,
    entities: [],
    relationships,
  };
  validateAtlasImportBatch(batch);

  return { batch, approvalManifest };
}
