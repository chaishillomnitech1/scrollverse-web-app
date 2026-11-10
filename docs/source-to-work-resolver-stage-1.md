# Source-to-Work Resolver — Stage 1

**Status:** additive implementation, read-only, not yet wired to a public route or database.  
**Implementation:** `server/atlas/source-work-resolver.ts`  
**Tests:** `server/atlas/source-work-resolver.test.ts`

## What this adds

The resolver connects the existing Source Collections and accession registries to explicitly supplied work references. It produces deterministic candidate links that downstream workflows can review.

It does not create a second archive, replace Source Collections, rewrite accession records, mutate Atlas, or publish anything.

## Resolution rules

1. A source collection receives a stable derived work ID: `source-collection:<normalized-source-id>`.
2. Existing source citations retain their batch IDs and exact line ranges.
3. Repeated identical citation references are de-duplicated within that collection only.
4. Same-name source versions remain separate when their batch IDs differ.
5. An exact normalized route match is preferred; exact normalized title is the only fallback.
6. Fuzzy or semantic matches are deliberately not emitted. Unmatched records remain `UNRESOLVED`.
7. Every result has `reviewRequired: true`; a match is a candidate connection, not approval or proof of equivalence.
8. Accession fingerprints and byte counts are copied as recorded metadata. When `displayScope` is `metadata-only`, the resolver labels the bytes `METADATA_ONLY` and does not claim the raw file is present.
9. Unknown batch references remain visible with null batch metadata; they are not silently dropped.
10. Results and nested candidate lists are deterministically ordered.

## Input boundary

The function accepts the existing registry shapes through small structural types. The caller supplies registered work references; this first stage does not crawl repositories, invent project records, query the database, or assume that every source collection has a matching route.

## Safety and next integration gate

- Pure in-memory transformation; no network or database writes.
- No publication, visibility, permission, or production changes.
- No hashes are computed from metadata. Existing fingerprints are preserved exactly as recorded.
- Before connecting this to a route or background job, add a read-only adapter that loads the actual Source Collections, Source Batches, Accession Records, and a reviewed work-reference registry.
- Human review remains required before any candidate relationship is written to Atlas.
- Keep original records and all alternate source versions intact.

## Validation

The focused test suite covers exact route precedence, exact title fallback, unresolved records, deterministic ordering, same-name version preservation, citation de-duplication, and metadata-only byte labeling. Repository CI remains the authoritative type-check/build gate for the pull request.
