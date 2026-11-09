import type { AtlasImportBatch } from "../../server/atlas/ingest";

const appRepo = "https://github.com/chaishillomnitech1/scrollverse-web-app";
const masterRepo = "https://github.com/chaishillomnitech1/scrollverse-master-ecosystem-hub";
const prUrl = `${appRepo}/pull/7`;
const head = "bbe267cd2a3d738f9a868b7116c352f955bc9c76";

const architectureSource = {
  sourceKey: "github:master-hub:atlas-architecture-v2",
  kind: "github" as const,
  label: "Atlas Core Architecture Decision Record V2",
  repository: "chaishillomnitech1/scrollverse-master-ecosystem-hub",
  filePath: "docs/atlas/ATLAS-ARCHITECTURE-DECISION-RECORD-V2.md",
  url: `${masterRepo}/blob/main/docs/atlas/ATLAS-ARCHITECTURE-DECISION-RECORD-V2.md`,
};

const implementationSource = {
  sourceKey: "github:scrollverse-web-app:pr-7",
  kind: "github" as const,
  label: "Atlas Core Graph and Lineage pull request #7",
  repository: "chaishillomnitech1/scrollverse-web-app",
  filePath: "server/atlas/graph.ts",
  commitSha: head,
  url: prUrl,
};

const migrationSource = {
  sourceKey: "github:scrollverse-web-app:atlas-migration-0049",
  kind: "github" as const,
  label: "Atlas Core migration 0049",
  repository: "chaishillomnitech1/scrollverse-web-app",
  filePath: "drizzle/0049_atlas_core.sql",
  commitSha: head,
  url: `${appRepo}/blob/${head}/drizzle/0049_atlas_core.sql`,
};

export const atlasFoundationBatch: AtlasImportBatch = {
  batchId: "atlas-foundation-2026-11-09-v1",
  entities: [
    {
      slug: "scrollverse",
      title: "ScrollVerse",
      kind: "PROJECT",
      summary: "Umbrella project represented by the ScrollVerse application and its documented ecosystem records.",
      source: architectureSource,
    },
    {
      slug: "scrollverse-web-app",
      title: "ScrollVerse Web App",
      kind: "REPOSITORY",
      summary: "Application repository containing the Creator Atlas explorer and Atlas Core implementation branch.",
      source: {
        sourceKey: "github:scrollverse-web-app:repository",
        kind: "github",
        label: "ScrollVerse Web App GitHub repository",
        repository: "chaishillomnitech1/scrollverse-web-app",
        url: appRepo,
      },
    },
    {
      slug: "scrollverse-master-ecosystem-hub",
      title: "ScrollVerse Master Ecosystem Hub",
      kind: "REPOSITORY",
      summary: "Master documentation repository holding Atlas architecture and implementation records.",
      source: {
        sourceKey: "github:master-hub:repository",
        kind: "github",
        label: "ScrollVerse Master Ecosystem Hub GitHub repository",
        repository: "chaishillomnitech1/scrollverse-master-ecosystem-hub",
        url: masterRepo,
      },
    },
    {
      slug: "atlas-core",
      title: "Atlas Core",
      kind: "CONCEPT",
      summary: "Source-aware entity registry, relationship graph, lineage traversal, and unified discovery layer.",
      source: architectureSource,
    },
    {
      slug: "atlas-core-pr-7",
      title: "Atlas Core Graph and Lineage Implementation PR",
      kind: "ARTIFACT",
      summary: "Draft pull request implementing Atlas entities, relationships, bounded graph traversal, tRPC endpoints, and explorer UI.",
      source: implementationSource,
    },
    {
      slug: "atlas-core-migration-0049",
      title: "Atlas Core Database Migration 0049",
      kind: "ARTIFACT",
      summary: "Reviewed migration candidate creating the evidence ledger and Atlas entity and relationship tables; not yet applied to a database.",
      source: migrationSource,
    },
  ],
  relationships: [
    {
      sourceSlug: "scrollverse",
      targetSlug: "scrollverse-web-app",
      relationType: "IMPLEMENTED_IN",
      description: "The ScrollVerse application is represented by this repository; the repository URL is the source of record.",
      source: { sourceKey: "github:scrollverse-web-app:repository", kind: "github", label: "ScrollVerse Web App repository", repository: "chaishillomnitech1/scrollverse-web-app", url: appRepo },
    },
    {
      sourceSlug: "scrollverse",
      targetSlug: "scrollverse-master-ecosystem-hub",
      relationType: "DOCUMENTED_IN",
      description: "The master ecosystem repository contains the documented Atlas architecture and implementation record.",
      source: { sourceKey: "github:master-hub:repository", kind: "github", label: "ScrollVerse Master Ecosystem Hub repository", repository: "chaishillomnitech1/scrollverse-master-ecosystem-hub", url: masterRepo },
    },
    {
      sourceSlug: "atlas-core",
      targetSlug: "scrollverse-web-app",
      relationType: "IMPLEMENTED_IN",
      description: "The Atlas Core implementation is being developed in the ScrollVerse Web App repository.",
      source: implementationSource,
    },
    {
      sourceSlug: "atlas-core",
      targetSlug: "atlas-core-pr-7",
      relationType: "TRACKED_BY",
      description: "Pull request #7 tracks the Atlas Core graph and lineage implementation.",
      source: implementationSource,
    },
    {
      sourceSlug: "atlas-core",
      targetSlug: "atlas-core-migration-0049",
      relationType: "REQUIRES_MIGRATION",
      description: "Atlas Core storage depends on migration 0049; the migration remains unapplied pending database-owner approval and execution.",
      source: migrationSource,
    },
    {
      sourceSlug: "atlas-core-pr-7",
      targetSlug: "scrollverse-web-app",
      relationType: "PROPOSED_FOR",
      description: "Pull request #7 targets the ScrollVerse Web App repository and is currently a draft.",
      source: implementationSource,
    },
    {
      sourceSlug: "atlas-core",
      targetSlug: "scrollverse-master-ecosystem-hub",
      relationType: "ARCHITECTURE_DOCUMENTED_IN",
      description: "The Atlas architecture decision record is maintained in the master ecosystem hub.",
      source: architectureSource,
    },
  ],
};
