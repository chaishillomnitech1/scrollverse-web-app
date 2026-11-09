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

## Migration 0049 review notes

Static review against the Drizzle schema and migration journal confirms that migration 0049 creates `evidence_ledger` before the two Atlas tables that reference it, then adds the expected foreign keys, lookup indexes, and directed-edge uniqueness constraint. The journal and snapshot are present in the branch. This is a code review only; no live database state was inspected.

**Important preflight:** the TypeScript schema already declares `evidence_ledger`, while the prior migration sequence inspected in this branch did not show an earlier migration creating it. The live database may nevertheless contain a manually created or separately provisioned table. Before running 0049, inspect `information_schema.tables`, `information_schema.columns`, and `information_schema.statistics` for `evidence_ledger`, `atlas_entities`, and `atlas_relationships`. If `evidence_ledger` already exists, compare every column, enum, index, and constraint with the migration and reconcile the migration plan rather than blindly rerunning the CREATE TABLE statement.

Also inspect the Drizzle migration journal table and any partially applied DDL. MySQL DDL may commit independently of the surrounding migration transaction; a failed partial run must be reconciled before retrying. Take a restorable backup and verify rollback/recovery procedures before production execution.


## Protected database execution

A manual GitHub Actions workflow is provided at `.github/workflows/atlas-protected-migration.yml`.

Before using it:
1. In repository Settings → Environments, create `atlas-production`.
2. Require at least one designated owner/reviewer approval for that environment.
3. Add `DATABASE_URL` as an environment secret for `atlas-production`; never place it in repository files, workflow inputs, logs, or chat.
4. Confirm the environment points to the intended database and that a restorable backup exists.
5. Dispatch **Atlas Core Protected Migration and Foundation Ingestion** with input `APPLY`. The default `NO` path performs no database work.

The workflow runs a fail-closed live preflight. It stops if any of `evidence_ledger`, `atlas_entities`, or `atlas_relationships` already exists, requiring manual schema and migration-journal reconciliation. If all are absent, it applies only committed Drizzle migrations, then runs the foundation importer twice and verifies persisted entity/relationship/evidence counts, DRAFT + PRIVATE visibility, QUEUED evidence state, and lineage from stored database rows.

The seed verification does not publish records. A successful workflow run is the evidence required before calling migration, ingestion, or stored-record lineage complete. The workflow cannot run until this branch is merged into the repository's default branch and the protected environment and secret are configured.
