# OMNI / ScrollVerse System Integration & Evolution Plan

**Snapshot date:** 2026-11-10  
**Primary implementation repository:** `chaishillomnitech1/scrollverse-web-app`  
**Primary branch at snapshot:** `main`  
**Purpose:** Advance the existing ecosystem by connecting its established archive, source, evidence, graph, discovery, and world-building components. This is an integration plan for existing work—not a proposal to replace it with another archive or duplicate portal.

## 1. Operating principles

1. **Preserve originals.** Original conversations, files, exports, screenshots, source titles, identifiers, dates, and source URLs remain source records. Derived summaries and AI-generated interpretations are separate artifacts.
2. **Do not equate absence from one index with absence of evidence.** A GitHub search, repository inventory, or Atlas public query is one view, not the complete historical archive.
3. **Keep evidence states explicit.** Distinguish user-supplied, source-linked, locally tested, CI-passed, deployed, externally verified, and not-yet-verified claims.
4. **No silent promotion.** New Atlas imports remain DRAFT + PRIVATE; evidence remains QUEUED until review. Publication is a separate human-approved action.
5. **No false operational status.** A route existing in source code is not proof that its production URL, database, provider integration, wallet, contract, or external service is currently operational.
6. **Portable by design.** Use stable identifiers, source URLs, content fingerprints when original bytes are available, exportable formats, and documented interfaces so that no single app or model becomes the only keeper of the work.
7. **Human control over sensitive actions.** Database migrations, financial transactions, wallet signing, token operations, publishing, and changes to production secrets require explicit owner approval and their own release gates.

## 2. Existing system map

| Layer | Existing component | What it contributes | Current boundary |
|---|---|---|---|
| Origin / historical memory | Original conversations, Story Archive Foundation, user-supplied source records | Preserves the journey and first-party context | A derivative index must never replace the original |
| Source preservation | `SourceCollections`, `sourceCollections.ts`, source batch manifests | Searchable source collections and title index | Some accessions are metadata-only; that is a receipt, not proof that raw bytes are currently present |
| Accession / intake | `DigitalshipAccessionDesk`, `accessionRecords.ts`, accession manifests | Records filenames, source type, access, batch, fingerprint, intended use, and preservation notes | Metadata and hashes must not be invented when original bytes are unavailable |
| Evidence / provenance | `evidence_ledger`, Atlas source adapters and normalizer | Stable source identity, revision fingerprints, links to source material | A metadata record is not an independent verification of the source's claims |
| Knowledge graph | Atlas Core: `atlas_entities`, `atlas_relationships`, `evidence_ledger` | Connects projects, repositories, conversations, artifacts, discoveries, and deployments | Public explorer returns only PUBLISHED + PUBLIC records |
| Discovery / navigation | Creator Atlas, Journey & Co-Creation Archive | Gives visitors a guided path through existing work and its history | Discovery routes do not themselves prove external release or provider activity |
| Immersive worlds | Omniland, Omniland Source Atlas, cinematic/game/story paths | Organizes worlds, media, game concepts, learning paths, and source trails | Consoleless delivery is currently marked DESIGNED; no native platform certification or release is implied |
| AI collaboration concepts | AI Legion and related repositories/pages | Documents the planned multi-agent / specialist ecosystem | A repository or named agent is not proof of a continuously running autonomous service or subjective AI experience |
| Operations / delivery | GitHub Actions, Vercel status checks, protected migration workflows | CI, deployment checks, and controlled operational gates | A successful Vercel commit check does not prove database migration or all live routes are healthy |

## 3. Current verified implementation snapshot

### GitHub inventory

- The connected GitHub listing returned **96 repositories accessible to the authenticated account** on 2026-11-10: **95 public, 1 private, and 0 archived**.
- **94 repositories were code-search indexed; 2 were not indexed** (`chais-hill-portfolio` and `scrollverse-trinity-sovereign`). A missing search index is not evidence that a repository has no content.
- The only repository reported private in this snapshot is `partner`.
- Two repositories have names/README descriptions that imply private continuity or evidence material but are currently reported as **public**: `scrollverse-evidence-archive-private` and `scrollverse-continuity-vault`. This is a visibility-label mismatch requiring owner review; no setting was changed and no claim is made that a secret is present. Review their contents, Git history, forks, and any previously committed sensitive material before deciding whether to change visibility.
- The full dated metadata list is preserved in [GitHub Repository Inventory — 2026-11-10](github-repository-inventory-2026-11-10.md).
- This is an inventory snapshot, not a complete review of every repository's code, deployment, secrets, or external integrations.
- The primary web application repository is public, uses `main` as its default branch, and the connected account has admin permissions.
- Selected ecosystem repositories reviewed by README or source include `OmniBuilderZero`, `omnitech1-portal`, `scrollverse-ai-legion`, `eternal-scrollverse`, `scrollverse-master-ecosystem-hub`, `ScrollVerse_Sovereign_Archive`, `scrollverse-story-studio`, `scrollverse-continuity-vault`, and `scrollverse-evidence-archive-private`. These have different purposes and maturity levels; they should not be merged blindly.

### Atlas Core

- PR #7 (graph, schema, explorer) merged into `main` at `44b271729c235ea6880dcd5042f0872b808fb6af`.
- PR #8 (source-backed idempotent ingestion foundation) merged into the graph feature branch and included in the PR #7 merge. It adds a provider-neutral normalizer, evidence identity/versioning, and a curated foundation batch.
- PR #9 (separate read-only database preflight workflow) merged into `main` at `bab650550a21ae00f39fcf77fe959372347387e1`.
- The curated batch in source contains **139 entities and 141 documented relationships**, including **93 eligible public GitHub repository records** and **37 provisional conversation-title candidates**. The 37 candidates are explicitly unverified candidates—not recovered original titles and not substitutes for original conversation records.
- Ingestion is idempotent. New graph records remain DRAFT + PRIVATE; evidence rows remain QUEUED. Replaying an import does not publish records.
- Graph traversal is deterministic breadth-first search, supports incoming/outgoing/both directions, protects against cycles, and limits depth to five hops.
- The Atlas public API deliberately exposes only PUBLISHED + PUBLIC entities and relationships.

### Validation and deployment boundary

- The earlier Atlas CI run on the graph integration commit recorded `pnpm check` success and 17 passing sovereign/Atlas tests.
- The latest recorded main commit, `bab650550a21ae00f39fcf77fe959372347387e1`, has a successful Vercel commit status.
- That Vercel status does **not** prove the production database migration has run.
- The read-only preflight workflow is committed, but the last user-visible run was reported failed. An earlier log stated that `DATABASE_URL` was required and no database was contacted. The exact current database state is therefore **not confirmed by this snapshot**.
- Migration 0049 and seed/import execution must remain behind the existing protected production environment and its reviewer approval. Do not paste database URLs, passwords, API keys, seed phrases, or private keys into chat or commit them.

## 4. Integration sequence

### Phase A — Establish the canonical inventory

- Snapshot all 96 accessible repository names, default branches, visibility, archived state, last commit, and deployment references.
- Classify each repository into a domain: portal/application, archive/evidence, AI/agent concept, world/media/story, commerce, smart contracts, governance, infrastructure, learning, or legacy/duplicate candidate.
- Identify canonical repositories and cross-repository dependencies.
- Do not delete, archive, rename, or merge repositories during inventory.
- Record uncertainty explicitly where repository metadata or code cannot be inspected.

**Exit gate:** a reviewed repository catalog with canonical project IDs, ownership, status, source links, dependencies, and next action.

### Phase B — Connect source preservation to Atlas

- Preserve original conversations and source files at their original locations.
- For each source, capture the exact original title, stable conversation/file identifier, platform, source date/time and timezone when available, original URL or Library reference, access scope, and whether raw bytes are available.
- Use the existing provider-neutral adapters for authorized exports from ChatGPT, Manus, Perplexity, Gemini, Copilot, Grok, GitHub, and user uploads.
- Generate content SHA-256 only from the actual original bytes. Keep metadata-only accessions labelled metadata-only.
- Create Atlas relationships only when the source supports the connection; preserve the evidence link on every relationship.
- Keep the original supplied conversation record distinct from repository-derived candidate titles.

**Exit gate:** source-to-evidence traceability can navigate from an Atlas entity or relationship back to the exact source record without replacing it.

### Phase C — Complete the protected database release

1. Confirm the production environment's required reviewers and secret configuration without exposing secrets.
2. Run the read-only preflight and capture the full workflow log.
3. If preflight reports no Atlas tables and no migration record, use the existing protected APPLY workflow after backup and approval.
4. If all tables and the migration record exist, verify the schema and proceed only through the documented no-op / verification path.
5. If the state is partial or inconsistent, stop and reconcile manually; do not force a migration.
6. Run the idempotent seed/verification workflow twice in the approved environment and compare stored counts, statuses, and lineage.
7. Keep imported rows DRAFT + PRIVATE and QUEUED pending human review.

**Exit gate:** dated preflight result, migration record, verified table structure, repeatable seed result, and stored-record lineage report. A workflow being merged is not the same as a successful production run.

### Phase D — Human review and publication

- Review source identity, title, date, content availability, rights, privacy, and relationship evidence.
- Resolve provisional conversation candidates only against actual original source records.
- Publish only the records explicitly approved for public visibility.
- Keep private family, personal, financial, wallet, and account records out of public Atlas queries.
- Preserve correction history and the previous source version when a source changes.

**Exit gate:** a reviewed publication manifest showing exactly which records are public and why.

### Phase E — Join the existing visitor pathways

- Creator Atlas remains the primary visitor orientation layer.
- Journey & Co-Creation Archive remains the historical and co-creation pathway.
- Source Collections and the Accession Desk remain the source-discovery and intake layer.
- Atlas Core becomes the relationship and lineage layer.
- Omniland and its Source Atlas become the immersive discovery layer, with links back to the source and lineage records.
- Use stable project/entity IDs and registered internal routes; avoid duplicating the same content into disconnected pages.

**Exit gate:** a visitor can move from a world or project page to its source record, accession, Atlas entity, related work, and original conversation when access permits.

### Phase F — Operational quality and resilience

- Audit the existing System Status page to ensure every uptime, latency, count, and service state comes from a real check or is clearly labelled illustrative.
- Add route smoke tests for core visitor journeys and API health checks that do not expose secrets.
- Keep CI, type checks, unit tests, dependency lockfiles, and build checks on pull requests.
- Add accessibility checks, responsive/mobile checks, and bundle/performance budgets.
- Add backups, restore tests, retention rules, and export verification for critical archive data.
- Document service ownership, failure modes, recovery steps, and external provider dependencies.
- Prefer low-cost and already-installed dependencies before adding new paid services.

**Exit gate:** a dated, reproducible health report with real sources for each metric, tested restore steps, and no invented uptime claims.

## 5. Resource and upgrade strategy

| Resource | Use it for | Guardrail |
|---|---|---|
| GitHub repositories, Actions, PRs, commits | Source control, CI, release gates, catalog | Never commit secrets; review diffs before merge |
| ChatGPT Work / Codex (where available) | Multi-file research, code review, implementation, tests, browser workflows | Use the connected repo and explicit branch; review changes before production |
| Dropbox / Library / conversation exports | Source preservation and recovery | Preserve originals; do not infer file bytes from a filename or card |
| Figma | Shared design tokens, system maps, and editable UI specifications | Design artifacts do not imply deployed code |
| Atlas adapters and graph | Cross-platform source normalization and relationship navigation | Only authorized exports; preserve platform identity and source evidence |
| Vercel | Preview and production delivery | A deployment success is not a database or business-operation verification |
| Existing Stripe / commerce integrations | Checkout readiness and receipts | Use test mode first; placeholders stay disabled; no transaction without owner approval |
| Existing wallet / smart-contract tooling | Contract source review, testnet simulation, independent chain verification | No signing, mainnet deployment, treasury movement, or private-key handling without explicit approval |

## 6. Immediate next actions

1. Correct the Atlas Core page's stale message that says its schema is still in a feature branch; the implementation is merged into `main`, while database connectivity/migration remains a separate gate.
2. Make the public explorer explain that DRAFT + PRIVATE foundation records are intentionally not visible, rather than implying they are missing.
3. Complete the 96-repository inventory before making broad cross-repository edits.
4. Resolve the read-only preflight using the protected environment; do not bypass it or expose `DATABASE_URL`.
5. After the database gate passes, run and verify the curated import, then review and publish only selected records.
6. Connect the existing Source Collections, Accession Desk, Atlas Core, Creator Atlas, Journey Archive, and Omniland routes using stable IDs and evidence-backed relationships.
7. Audit System Status and other operational dashboards for hardcoded or stale metrics before presenting them as live telemetry.

## 7. Definition of done

The integrated system is ready for its next release when:

- Every canonical project has a stable ID and a repository/source record.
- Original source material remains intact and recoverable.
- Every public Atlas relationship links to source evidence.
- Provisional candidates are never represented as recovered originals.
- Database migration and ingestion have dated, repeatable proof.
- Public/private visibility is reviewed and enforced.
- Creator Atlas, Journey Archive, Atlas Core, and Omniland connect without duplicating the source of truth.
- Operational dashboards distinguish live checks from historical or illustrative measurements.
- A restore/export test proves the archive can move beyond a single platform.
- Every production, financial, wallet, publishing, or irreversible action retains a human approval gate.

**Core rule:** Preserve the original. Connect the evidence. Keep the boundaries visible. Evolve the existing system without erasing its history.
