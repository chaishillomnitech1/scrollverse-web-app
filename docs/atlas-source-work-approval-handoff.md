# Atlas Relationship Handoff — Approval Gate

The Source-to-Work Review page produces candidate connections only. The handoff builder prepares an Atlas import batch only when an individual relationship includes explicit approval metadata.

## Existing Atlas controls

The Atlas router already provides administrator-only relationship creation through `adminProcedure`, draft/private defaults for newly created relationships, a separate publish action, and a guard requiring both endpoint entities to be published and public before a relationship can be published.

The handoff builder does not bypass or weaken those controls.

## Handoff contract

`server/atlas/source-work-atlas-handoff.ts` accepts relationship records carrying:
- `approved: true`;
- approver identity;
- approval timestamp;
- approval reference;
- source-grounded relationship fields and a valid Atlas evidence source.

It validates the batch using the existing Atlas ingestion validator and returns an `AtlasImportBatch` plus a separate approval manifest. The approval manifest retains who approved each edge, when, and under which reference.

The builder is pure. It does not call `ingestAtlasBatch`, access the database, or publish graph records.

## Remaining protected gates

The Atlas database preflight previously found `DATABASE_URL` missing. Until the owner-configured database is available and the reviewed migration is applied, no Atlas persistence action can be validated.

For each real relationship, an item-specific approval reference is required. After database readiness, an administrator can use the existing protected Atlas route to create the relationship as DRAFT + PRIVATE. Publication remains a separate decision.

No candidate relationship has been approved by this code change. No Atlas database record has been written.
