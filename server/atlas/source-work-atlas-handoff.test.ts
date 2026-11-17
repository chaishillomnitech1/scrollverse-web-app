import { describe, expect, it } from "vitest";
import { buildApprovedAtlasHandoff } from "./source-work-atlas-handoff";

const approvedLink = {
  sourceSlug: "source-collection-alpha",
  targetSlug: "new-dominion-story-blueprint",
  relationType: "CONTINUES_IN",
  description: "The reviewed source collection continues in the registered planning route.",
  source: {
    sourceKey: "source:batch-a:alpha",
    kind: "github" as const,
    label: "Reviewed source collection receipt",
    url: "https://github.com/chaishillomnitech1/scrollverse-web-app",
    repository: "chaishillomnitech1/scrollverse-web-app",
    filePath: "client/src/lib/sourceCollections.ts",
    contentSha256: "a".repeat(64),
  },
  approval: {
    approved: true as const,
    approvedBy: "owner",
    approvedAt: "2026-11-10T15:00:00.000Z",
    approvalRef: "approval://review/alpha-to-new-dominion",
  },
};

describe("approval-gated Atlas source-work handoff", () => {
  it("builds a validated relationship batch and preserves approval metadata separately", () => {
    const result = buildApprovedAtlasHandoff({ batchId: "source-work:review:001", relationships: [approvedLink] });
    expect(result.batch.entities).toEqual([]);
    expect(result.batch.relationships).toHaveLength(1);
    expect(result.batch.relationships[0]).toMatchObject({
      sourceSlug: "source-collection-alpha",
      targetSlug: "new-dominion-story-blueprint",
      relationType: "CONTINUES_IN",
    });
    expect(result.approvalManifest[0]).toMatchObject({
      approvedBy: "owner",
      approvalRef: "approval://review/alpha-to-new-dominion",
    });
  });

  it("rejects an empty approval batch", () => {
    expect(() => buildApprovedAtlasHandoff({ batchId: "source-work:empty", relationships: [] })).toThrow(/explicitly approved/);
  });

  it("rejects missing approver or approval reference", () => {
    expect(() => buildApprovedAtlasHandoff({
      batchId: "source-work:missing-approval",
      relationships: [{ ...approvedLink, approval: { ...approvedLink.approval, approvedBy: " ", approvalRef: " " } }],
    })).toThrow(/approver and approval reference/);
  });

  it("rejects invalid approval timestamps", () => {
    expect(() => buildApprovedAtlasHandoff({
      batchId: "source-work:invalid-time",
      relationships: [{ ...approvedLink, approval: { ...approvedLink.approval, approvedAt: "not-a-date" } }],
    })).toThrow(/valid timestamp/);
  });
});
