# Atlas Relationship Handoff — Approval Gate

The Source-to-Work Review page produces candidate connections only. This companion module adds a pure preparation boundary for relationships that have already received explicit owner/admin approval.

## Existing Atlas controls

The existing Atlas router already provides:
- administrator-only relationship creation through `adminProcedure`;
- draft/private defaults for newly created graph relationships;
- a separate publish action;
- a guard requiring both endpoint entities to be published and public before a relationship can be published.

The handoff builder does not bypass or weaken those controls.

## What the new handoff builder does

`server/atlas/source-work-atlas-handoff.ts` accepts only records carrying:
- an explicit `approved: true` value;
- approver identity;
- approval timestamp;
- approval reference;
- source-grounded relationship fields and a valid Atlas evidence source.

It validates the batch using the existing Atlas ingestion validator and returns:
1. an `AtlasImportBatch` containing relationship candidates;
2. a separate approval manifest preserving who approved each edge, when, and under which reference.

The builder is pure and does not call `ingestAtlasBatch`, access the database, or publish graph records.

## Remaining protected gates

The Atlas database preflight previously found `DATABASE_URL` missing. Until the owner-configured database is available and the reviewed migration is applied, no Atlas persistence action can be validated.

For each real relationship, the review surface must supply an item-specific approval reference. After database readiness, an administrator can use the existing protected Atlas route to create the relationship as DRAFT + PRIVATE. Publication remains a separate decision and is never implied by approval to create a draft.

No candidate relationship has been approved by this code change. No Atlas database record has been written.
