# Atlas Core Source Ingestion — Foundation Batch v1

## Purpose

Create the first repeatable, source-linked Atlas population path. The importer is idempotent by stable source identity, entity slug, and directed relationship key. Re-running a batch updates descriptive metadata but does not publish records or change their visibility.

## Safety and provenance

- New evidence rows are `QUEUED`; they are not sealed or independently verified.
- New entities and relationships are `DRAFT + PRIVATE`.
- A source URL or GitHub commit link establishes traceability, not the truth of every statement in the source.
- The importer never calls publish procedures and never changes publication state on replay.
- It performs database writes only when explicitly invoked by an administrator-controlled process.
- Cross-platform normalization accepts exported/authorized documents. It does not sign in to private accounts, scrape private conversations, or infer missing source URLs.
- Original exports should remain immutable; import normalized copies and retain their original file hashes and source identifiers.

## Foundation collection

`data/atlas/foundation.v1.ts` contains a deliberately small initial set of 139 entities and 141 documented relationships, including 93 eligible public GitHub repository inventory records and 37 explicitly provisional conversation-title candidates from the existing recovery-index CSV, sourced from the ScrollVerse Web App repository, the Master Ecosystem Hub, Atlas architecture record, PR #7, and migration 0049. The connected GitHub inventory returned 96 repositories (95 public, 1 private, 0 archived). The initial catalog includes 93 public repositories; it excludes the one private repository and two public repositories previously flagged for privacy review. This is an inventory snapshot, not a 96-repository code audit or a complete archive import.

## Runbook

1. Review PR #7 and migration `drizzle/0049_atlas_core.sql` against the live database schema and migration journal.
2. Confirm a backup and maintenance window using the database owner's approved process.
3. Apply migration 0049 through the deployment environment's secret-managed database migration runner. Do not paste `DATABASE_URL` into chat, logs, or CI output.
4. Verify the three tables and constraints exist before enabling Atlas write routes.
5. Invoke `ingestAtlasBatch(atlasFoundationBatch)` from an owner/admin-controlled one-time job.
6. Verify counts and lineage by reading persisted rows, not by relying on the importer return value.
7. Review each evidence record and graph record. Publish only after human review.

The current connected Dropbox search returned no matching archive files; the ChatGPT Library search surfaced the Foundation Edition, OmniCodex synthesis, Master Document Collection, and Master Conversation Recovery Index Part I. The repository connector does not expose the application's production database or a database migration execution interface. Therefore this change prepares and validates the migration/import path; it does not claim that migration 0049 has been applied or that rows have been inserted into a live database.

## Cross-platform expansion

`server/atlas/adapters.ts` defines a provider-neutral document boundary for ChatGPT exports, Manus exports, Perplexity exports, Gemini exports, Copilot exports, Grok exports, GitHub sources, and user-supplied files. A provider-specific collector must preserve the original platform ID, title, export timestamp, source URL when available, and content digest. Unsupported or missing source fields must remain explicitly absent rather than fabricated.

## Verification

Unit tests cover stable evidence identity, revision-sensitive fingerprints, HTTPS-only source links, duplicate rejection, self-edge rejection, and normalization of an exported ChatGPT document. Database integration tests and production lineage verification remain gated on migration execution and a connected test database.
