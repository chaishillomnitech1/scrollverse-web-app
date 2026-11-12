# Living Relationship Atlas — Doctrine Reconciliation v1

**Status:** Proposed doctrine; additive reconciliation record  
**Source attribution:** User-supplied proposal titled “The Living Relationship Atlas Manifesto — ScrollVerse Atlas Doctrine v1,” identified by the user as originating from Copilot.  
**Reconciliation target:** Existing Atlas Core in `chaishillomnitech1/scrollverse-web-app`  
**Decision:** Preserve the supplied manifesto as a distinct source contribution. Extend the existing Atlas Core conceptually; do not create a competing registry or overwrite prior doctrine.

## 1. North star

> The value is not merely the artifact. The value is the relationship between artifacts over time.

The Living Relationship Atlas preserves the identity and provenance of artifacts while making their documented relationships, influences, and evolution discoverable. It is a continuity layer, not merely a file index or a claim that every relationship is already known.

An Atlas record must help answer:

- Where did this record come from?
- What source or evidence supports it?
- What is it connected to, and why?
- What influenced it, and what did it influence?
- What changed over time?
- Which parts are known, reported, inferred, disputed, or still unknown?

The Atlas must preserve uncertainty. A missing relationship is not proof that no relationship exists; a proposed edge is not proof that the edge is true.

## 2. Five doctrines — retained from the supplied proposal

1. **The Best Structure Wins.** Ideas and structures may be refined. Refinement must preserve attribution and the history of prior versions; improvement is not permission to erase origin.
2. **Every Artifact Deserves Lineage.** Each record should retain its origin, influences, descendants, and transformations when those facts are available and supported.
3. **Nothing Stands Alone.** The Atlas should make meaningful relationships discoverable, while allowing an entity to remain unconnected when no supported relationship has been established.
4. **Relationship Creates Meaning.** Relationships are first-class records with direction, type, explanation, provenance, and evidence—not merely visual lines between nodes.
5. **Continuity Compounds.** The graph should support discovery across time and domains without flattening distinct projects, platforms, contributors, or worlds into one identity.

## 3. Relationship to existing Atlas Core

The existing repository already contains an Atlas Core foundation. This doctrine is therefore a reconciliation and extension, not a greenfield replacement.

| Existing component | Observed capability in source | Relationship to this doctrine |
|---|---|---|
| `drizzle/schema.ts` | Atlas entities, directed relationships, evidence ledger | Existing persistence foundation |
| `server/atlas/ingest.ts` | Source-linked batch intake, stable evidence identity, DRAFT/PRIVATE defaults | Provenance-aware intake |
| `server/atlas/adapters.ts` | Provider-neutral normalization for authorized exports | Cross-platform accession boundary |
| `server/atlas/graph.ts` | Deterministic breadth-first traversal, incoming/outgoing/both, bounded depth | Relationship and lineage traversal |
| `server/routers/atlas.ts` | Read and admin-gated write/publish procedures | Controlled access and publication boundary |
| `data/atlas/foundation.v1.ts` | Curated seed records and source-linked relationships | Initial registry data |
| `client/src/pages/AtlasCore.tsx` | Search and relationship/lineage explorer | Human discovery interface |
| `scripts/atlas-foundation-ingest.ts` | Idempotency and persisted-row verification logic | Seed verification path |

The current graph implementation supports deterministic traversal with a maximum depth of five hops. The public Atlas API is documented as exposing only PUBLISHED + PUBLIC records. Foundation ingestion is designed to leave graph records DRAFT + PRIVATE and evidence QUEUED; ingestion does not itself publish records.

**Operational boundary:** Source code and workflow definitions do not prove that a live database migration, seed, production route, or current service is active. The current repository documentation says the live database state is not confirmed and migration/seed execution remains separately gated. Do not promote these capabilities to ACTIVE without current operational evidence.

## 4. Canonical entity model — additive mapping

The supplied proposal defines useful domain concepts: REPOSITORY, PROJECT, EPISODE, PODCAST, CODEX, CHAPTER, WORLD, DISTRICT, CHARACTER, SYMBOL, FRAMEWORK, PROTOCOL, DISCOVERY, and DOCTRINE.

The existing Atlas persistence enum currently supports: PROJECT, REPOSITORY, CONVERSATION, ARTIFACT, DISCOVERY, PERSON, PLATFORM, CONCEPT, and DEPLOYMENT.

Until a separately reviewed schema change is justified, map new domain labels onto existing storage kinds without losing the more specific domain type in descriptive metadata or a future typed attribute:

| Proposed domain type | Existing storage kind for initial compatibility |
|---|---|
| REPOSITORY | REPOSITORY |
| PROJECT | PROJECT |
| EPISODE, PODCAST, CODEX, CHAPTER | ARTIFACT |
| WORLD, DISTRICT, FRAMEWORK, PROTOCOL, DOCTRINE, SYMBOL | CONCEPT or ARTIFACT, chosen by record purpose |
| CHARACTER | PERSON when representing a person-like character; otherwise CONCEPT or ARTIFACT |
| DISCOVERY | DISCOVERY |

Do not silently expand the database enum or apply a migration as part of this doctrine-only reconciliation. A future typed `domainType` field or normalized type registry can preserve the exact proposed vocabulary.

## 5. Relationship vocabulary and semantics

The supplied relationship vocabulary includes CREATED, INSPIRED, REFERENCED, CONTAINS, SPAWNED, CONNECTED_TO, EVOLVED_INTO, DESCENDS_FROM, FORKED_FROM, MERGED_WITH, DISCOVERED_DURING, CONVERGED_WITH, DISAGREED_AND_IMPROVED, and STRENGTHENED.

The current relationship table stores a directed `relationType` string, description, provenance, source URL, and evidence reference. It does not currently enforce a closed relationship enum. Use stable uppercase snake-case relation identifiers and preserve direction.

Suggested normalization:
- `CONNECTED_TO` is a broad association; prefer a more specific relation when evidence supports one.
- `SPAWNED` and `EVOLVED_INTO` describe distinct forms of derivation and must not be treated as synonyms.
- `DESCENDS_FROM` is a lineage claim and requires evidence of derivation, not merely similarity.
- `MERGED_WITH` should normally be represented by two directed edges or a dedicated symmetric relation rule, documented consistently.
- `DISAGREED_AND_IMPROVED` preserves intellectual disagreement and subsequent change; it must not imply endorsement by either source.
- `STRENGTHENED` requires a description of what was strengthened and by which evidence.

### Weight is not truth

The supplied schema proposes a numeric `weight`. The current database model does not have this field. Do not add a numeric weight until its semantics are defined.

Keep these concepts separate:
- **Importance:** how prominent an edge should appear in a view.
- **Confidence:** how strongly the evidence supports the relationship.
- **Strength:** a domain-specific measure of influence or dependency, if measurable.
- **Evidence state:** whether the underlying source has been reviewed or verified.

A number must never be presented as confidence or proof unless a defined method, scale, and evidence basis support that interpretation.

## 6. Provenance, evidence, and temporal continuity

Every entity and relationship should preserve, when available:

- Stable internal ID and human-readable title.
- Original platform or repository identity.
- Source URL, repository path, commit SHA, export ID, or Library accession.
- Source label and source type.
- Content digest only when the actual source bytes or normalized content were available to hash.
- Observed/recorded timestamp and, when known, the event or creation timestamp.
- Attribution and transformation history.
- Evidence status and review notes.

A source link establishes traceability; it does not independently prove every claim in the linked material. User-reported, Copilot-proposed, inferred, and repository-verified relationships must remain distinguishable.

The existing evidence ledger retains source revisions through stable fingerprints. However, the current entity/relationship row points to a source evidence record and can be updated during an idempotent import. If full graph-history reconstruction is required, a future append-only relationship-revision or assertion-event model should record supersession rather than relying only on the current edge row's `updated_at`.

Do not fabricate creation dates, original titles, hashes, conversation IDs, or missing source URLs. Preserve unknown values as unknown.

## 7. Lineage is derived, not manufactured

Lineage views may be computed from recorded relationship edges. A traversal result is a view over the currently available graph, not automatic proof of historical ancestry.

- Keep traversal deterministic and bounded.
- Retain edge direction and relation type.
- Show the source and evidence state for each displayed edge.
- Distinguish direct ancestry from general connection.
- Do not infer a parent-child relationship from shared tags, naming similarity, or co-occurrence alone.
- Preserve cycles and convergence as graph structures; do not force every graph into a single tree.
- A lineage generation number is a traversal-derived property unless a separately evidenced generation model exists.

## 8. Federation and sovereignty

The Atlas connects independent worlds; it does not own them.

- Each world retains its own identity, repository, source records, and operating environment.
- Participation and data sharing are opt-in and scope-aware.
- The Atlas may hold a source-linked reference without taking custody of the source system.
- Agent 25 coordinates evidence and approved learning; it does not become the owner of every world or pipeline.
- OMNITECH1 provides connective infrastructure; it does not erase origin or force relocation.
- Private or restricted source material must not become public merely because an entity or edge exists in the graph.
- Public publication remains a separate, authorized human decision.

## 9. Evidence Constitution mapping

Use the maturity vocabulary consistently:

| Status | Minimum meaning |
|---|---|
| DOCUMENTED | A proposal, specification, or source record exists |
| IMPLEMENTED | The relevant code/configuration exists in an identified repository and commit |
| VERIFIED | The relevant tests or independent checks passed for the identified commit and scope |
| ACTIVE | Current operational health is demonstrated for the relevant service or capability |

Additional rules:
- A proposal supplied by Copilot is DOCUMENTED as a source contribution; it is not thereby implemented.
- A source file in `main` supports an implementation claim for that file; it does not prove live database state.
- CI success verifies only the checks that actually ran, against the commit they tested.
- A published graph edge must have reviewed endpoints and a source/evidence basis appropriate to the claim.
- A current health check is required before calling an operational service ACTIVE.
- PILOT is not PRODUCTION. COORDINATED is not RUNNING. SEALED is not DEPLOYED.

## 10. Seed graph — candidate relationships, not verified facts

The supplied proposal suggests a path connecting Creator Atlas, Pattern Library, Living Relationship Atlas, Podcast Network, Codex Network, Repository Atlas, World Generator, and Future Nodes.

Treat this as a **candidate conceptual map**. Do not insert its edges as verified facts merely because they appear in the diagram. Inspect the relevant repositories, documents, routes, and source records. For every proposed edge, record:
1. source and target entity;
2. relation type and direction;
3. concise explanation;
4. source reference and evidence identity;
5. provenance/review state;
6. reviewer decision.

The existing repository seed batch is an initial source-linked inventory, not a complete archive or proof of all cross-project relationships. Preserve its provisional conversation-title labels as candidates until matched to original exports or screenshots.

## 11. Build sequence

1. **Reconcile:** compare this doctrine with Atlas Core schema, graph engine, ingestion adapters, seed data, UI, existing architecture decisions, and current open/draft PRs.
2. **Specify:** agree the canonical domain-type mapping, relationship vocabulary, evidence semantics, and history model.
3. **Test:** add unit tests for relation validation, direction, cycles, lineage, provenance labels, temporal revisions, and privacy boundaries.
4. **Pilot:** use a small set of repositories and artifacts whose contents have actually been inspected. Keep new records DRAFT + PRIVATE and evidence QUEUED.
5. **Review:** compare graph edges with their original sources; resolve conflicts and uncertain mappings without overwriting source records.
6. **Publish selectively:** require explicit owner/admin approval for each publication scope.
7. **Expand:** add podcasts, codices, episodes, worlds, and additional platform exports only through authorized source adapters and evidence receipts.

## 12. Non-goals and protected boundaries

This doctrine does not authorize:
- a production database migration or seed run;
- automatic publication or public exposure of private records;
- scraping private platform accounts or bypassing access controls;
- replacing original archives with summaries;
- deleting, moving, or merging independent repositories;
- treating every suggested connection as verified;
- activating a new autonomous agent, public API, or deployment;
- changing DNS, secrets, billing, wallets, contracts, or financial operations.

## 13. Acceptance criteria for the first Atlas doctrine pilot

The first pilot is ready for review when:
- The original Copilot-supplied manifesto is preserved with attribution.
- The doctrine-to-implementation mapping is reviewed against the existing code.
- Entity and relationship types are mapped without an unreviewed destructive migration.
- Each pilot relationship has a source and explicit provenance state.
- Proposed, owner-reported, and source-verified relationships are visibly distinct.
- Tests cover direction, cycles, bounded traversal, duplicate edges, and privacy/publishing gates.
- Original source artifacts remain unchanged and independently retrievable.
- No live or production state is claimed without fresh operational evidence.

---

**Preservation statement:** This document records an additive reconciliation of the user-supplied Copilot proposal with the existing Atlas Core implementation. It does not replace the original proposal, the existing Atlas architecture, or any source artifact. Future revisions should retain this file's history and identify the source and rationale for each change.
