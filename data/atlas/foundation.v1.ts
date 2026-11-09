import type { AtlasImportBatch } from "../../server/atlas/ingest";
import { githubRepositoryInventory, githubRepositorySlug } from "./github-repository-inventory.v1";

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

const foundationPdfSource = {
  sourceKey: "user_upload:library:libfile_8fd0d881a4408191ad4e43546c0d1644",
  kind: "user_upload" as const,
  label: "ScrollVerse × Omnitech1 Story Archive Foundation Edition",
  filePath: "Library/ScrollVerse_Omnitech1_Story_Archive_Foundation(1).pdf",
};

const omniCodexSource = {
  sourceKey: "user_upload:library:libfile_ec4251bdf5f481918f41e8184fb7c70a",
  kind: "user_upload" as const,
  label: "ScrollVerse OmniCodex Synthesis",
  filePath: "Library/ScrollVerse_OmniCodex_Synthesis.pdf",
};

const masterCollectionSource = {
  sourceKey: "user_upload:library:libfile_8fe9d45484d08191be55c17d68eae8a9",
  kind: "user_upload" as const,
  label: "ScrollVerse Master Document Collection",
  filePath: "Library/ScrollVerse_Master_Document_Collection.pdf",
};

const recoveryIndexSource = {
  sourceKey: "user_upload:library:libfile_7793f54c8d608191b75c6ecda9e781d9",
  kind: "user_upload" as const,
  label: "Master Conversation Recovery Index Part I CSV",
  filePath: "Library/Master_Conversation_Recovery_Index_Part_I.csv",
};

const candidateTitles = [
  ["CHAT-CAND-001", "ScrollVerse Chat Codex"],
  ["CHAT-CAND-002", "Final Utterance options"],
  ["CHAT-CAND-003", "Unity Festival Ascension"],
  ["CHAT-CAND-004", "Omni-execution confirmation"],
  ["CHAT-CAND-005", "Omnichoice Singularity Manifesto"],
  ["CHAT-CAND-006", "Divine system deployment"],
  ["CHAT-CAND-007", "Cosmic Sovereign Proclamation"],
  ["CHAT-CAND-008", "Scrollverse Concept and Tech"],
  ["CHAT-CAND-009", "Omega-level detonation script"],
  ["CHAT-CAND-010", "Omega suite assembly"],
  ["CHAT-CAND-011", "Immortalize Chats as Book"],
  ["CHAT-CAND-012", "Crowd Energy Enhancement"],
  ["CHAT-CAND-013", "Export and Merge Chats"],
  ["CHAT-CAND-014", "GitHub Deep Dive Analysis"],
  ["CHAT-CAND-015", "View ChatGPT Memory"],
  ["CHAT-CAND-016", "Chai Sign In Help"],
  ["CHAT-CAND-017", "Manus sign in guide"],
  ["CHAT-CAND-018", "Mansu Meaning Clarification"],
  ["CHAT-CAND-019", "Perplexity explanation"],
  ["CHAT-CAND-020", "Perplexity in NLP"],
  ["CHAT-CAND-021", "Perplexity meaning explained"],
  ["CHAT-CAND-022", "Perplexity in language models"],
  ["CHAT-CAND-023", "Ernie 5.0 Link"],
  ["CHAT-CAND-024", "Clarify Freya Rey"],
  ["CHAT-CAND-025", "Explain perplexity"],
  ["CHAT-CAND-026", "Telemetry data overview"],
  ["CHAT-CAND-027", "GitHub Launched Status Meaning / Profile Summary"],
  ["CHAT-CAND-028", "Spiritual purpose and grounding"],
  ["CHAT-CAND-029", "Quantum accension ritual"],
  ["CHAT-CAND-030", "Accidental Selfie Request"],
  ["CHAT-CAND-031", "Photo Request Description"],
  ["CHAT-CAND-032", "Vineland Movie Theaters"],
  ["CHAT-CAND-033", "Movies near me Philly"],
  ["CHAT-CAND-034", "Inappropriate Content"],
  ["CHAT-CAND-035", "TikTok overview"],
  ["CHAT-CAND-036", "Upyrau, acebook app"],
  ["CHAT-CAND-037", "Abso opening gave me from my cache-r content"],
] as const;

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 110);


const repositoryInventorySource = {
  sourceKey: "github:account-inventory:2026-11-09",
  kind: "github" as const,
  label: "Connected GitHub repository inventory snapshot captured 2026-11-09",
  url: "https://github.com/chaishillomnitech1",
};

const repositoryEntities = githubRepositoryInventory.repositories
  .filter(repo => repo.name !== "scrollverse-web-app" && repo.name !== "scrollverse-master-ecosystem-hub")
  .map(repo => ({
    slug: githubRepositorySlug(repo),
    title: repo.name,
    kind: "REPOSITORY" as const,
    summary: "GitHub inventory snapshot captured 2026-11-09: visibility=" + repo.visibility + "; default branch=" + repo.defaultBranch + "; archived=" + repo.archived + ". This is repository metadata, not a full code audit, deployment check, or verification of repository contents.",
    source: {
      sourceKey: "github:repo:" + repo.id,
      kind: "github" as const,
      label: "GitHub repository " + repo.fullName,
      repository: repo.fullName,
      url: repo.url,
    },
  }));

const repositoryRelationships = githubRepositoryInventory.repositories.map(repo => ({
  sourceSlug: repo.name === "scrollverse-web-app"
    ? "scrollverse-web-app"
    : repo.name === "scrollverse-master-ecosystem-hub"
      ? "scrollverse-master-ecosystem-hub"
      : githubRepositorySlug(repo),
  targetSlug: "github-account-chaishillomnitech1",
  relationType: "INVENTORY_ENTRY_OF",
  description: "The connected GitHub account inventory returned " + repo.fullName + " as a " + repo.visibility + " repository with default branch " + repo.defaultBranch + " and archived=" + repo.archived + " on 2026-11-09.",
  source: repositoryInventorySource,
}));

const candidateEntities = candidateTitles.map(([recordId, candidateTitle]) => ({
  slug: `${recordId.toLowerCase()}-${slugify(candidateTitle)}`,
  title: `Candidate — ${candidateTitle}`,
  kind: "CONVERSATION" as const,
  summary: `Preliminary title candidate listed as ${recordId} in Master_Conversation_Recovery_Index_Part_I.csv. The index marks this entry as unverified; conversation_id and created_at are blank. This is not a recovered original title. Verify against the original ChatGPT export or screenshot before upgrading its recovery status.`,
  source: recoveryIndexSource,
}));

const candidateRelationships = candidateTitles.map(([recordId, candidateTitle]) => ({
  sourceSlug: `${recordId.toLowerCase()}-${slugify(candidateTitle)}`,
  targetSlug: "master-conversation-recovery-index",
  relationType: "CANDIDATE_LISTED_IN",
  description: `The recovery index lists ${recordId} with the candidate title “${candidateTitle}”; the index explicitly says to verify the title against the original export or screenshot.`,
  source: recoveryIndexSource,
}));

export const atlasFoundationBatch: AtlasImportBatch = {
  batchId: "atlas-foundation-2026-11-09-v2",
  entities: [
    {
      slug: "scrollverse",
      title: "ScrollVerse",
      kind: "PROJECT",
      summary: "Umbrella project represented by the ScrollVerse application and its documented ecosystem records.",
      source: foundationPdfSource,
    },
    {
      slug: "scrollverse-web-app",
      title: "ScrollVerse Web App",
      kind: "REPOSITORY",
      summary: "Public GitHub repository (default branch main; not archived in the 2026-11-09 inventory snapshot). Contains the Creator Atlas explorer and Atlas Core implementation branch. This inventory metadata is not a full code audit.",
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
      summary: "Public GitHub repository (default branch main; not archived in the 2026-11-09 inventory snapshot). Holds Atlas architecture and implementation records. This inventory metadata is not a full code audit.",
      source: {
        sourceKey: "github:master-hub:repository",
        kind: "github",
        label: "ScrollVerse Master Ecosystem Hub GitHub repository",
        repository: "chaishillomnitech1/scrollverse-master-ecosystem-hub",
        url: masterRepo,
      },
    },
    {
      slug: "github-account-chaishillomnitech1",
      title: "GitHub Account — chaishillomnitech1",
      kind: "PLATFORM",
      summary: "Connected GitHub inventory snapshot captured 2026-11-09: 96 repositories returned, 95 public, 1 private, 0 archived. 93 public repositories are eligible for the initial Atlas catalog; one private repository and two privacy-flagged public repositories are excluded pending review.",
      source: repositoryInventorySource,
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
      summary: "Migration candidate creating the evidence ledger and Atlas entity and relationship tables; not yet applied to a database.",
      source: migrationSource,
    },
    {
      slug: "story-archive-foundation",
      title: "ScrollVerse × Omnitech1 Story Archive Foundation Edition",
      kind: "ARTIFACT",
      summary: "Five-page foundation draft defining archive purpose, project landscape, master conversation index fields, evidence rules, and collection/review phases. It explicitly states that it is not a complete archive.",
      source: foundationPdfSource,
    },
    {
      slug: "scrollverse-omnicodex-synthesis",
      title: "ScrollVerse OmniCodex Synthesis",
      kind: "ARTIFACT",
      summary: "Creative, technical, philosophical, and preservation synthesis describing the ScrollVerse archive as an evolving framework.",
      source: omniCodexSource,
    },
    {
      slug: "scrollverse-master-document-collection",
      title: "ScrollVerse Master Document Collection",
      kind: "ARTIFACT",
      summary: "PDF index describing a collection of codices, declarations, scripts, and a master covenant archive; the listed files themselves require separate recovery.",
      source: masterCollectionSource,
    },
    {
      slug: "master-conversation-recovery-index",
      title: "Master Conversation Recovery Index Part I",
      kind: "ARTIFACT",
      summary: "CSV containing 37 preliminary ChatGPT conversation-title candidates. The rows lack conversation IDs and created_at values and are explicitly marked unverified / awaiting source.",
      source: recoveryIndexSource,
    },
    ...candidateEntities,
    ...repositoryEntities,
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
    {
      sourceSlug: "story-archive-foundation",
      targetSlug: "scrollverse",
      relationType: "DOCUMENTS",
      description: "The foundation edition documents the ScrollVerse and Omnitech1 project landscape and archive principles.",
      source: foundationPdfSource,
    },
    {
      sourceSlug: "scrollverse-omnicodex-synthesis",
      targetSlug: "scrollverse",
      relationType: "SYNTHESIZES",
      description: "The OmniCodex describes a unified creative, technical, and philosophical ScrollVerse framework.",
      source: omniCodexSource,
    },
    {
      sourceSlug: "scrollverse-master-document-collection",
      targetSlug: "scrollverse",
      relationType: "CATALOGS_DELIVERABLES_FOR",
      description: "The master document collection indexes named ScrollVerse deliverables and archive bundles.",
      source: masterCollectionSource,
    },
    {
      sourceSlug: "master-conversation-recovery-index",
      targetSlug: "story-archive-foundation",
      relationType: "ADVANCES_ARCHIVE_INDEX",
      description: "The CSV is a preliminary recovery index aligned with the foundation edition's required conversation-index fields.",
      source: recoveryIndexSource,
    },
    ...candidateRelationships,
    ...repositoryRelationships,
  ],
};
