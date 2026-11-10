# Source-to-Work Review — Stage 2 Integration

**Status:** review UI implemented on the feature branch; CI validation pending.  
**Route:** `/source-work-review`  
**Page:** `client/src/pages/SourceWorkReview.tsx`

## Existing systems connected

This stage reuses, rather than replaces:
- `SOURCE_COLLECTIONS` and `SOURCE_BATCHES` from `client/src/lib/sourceCollections.ts`.
- `ACCESSION_RECORDS` from `client/src/lib/accessionRecords.ts`.
- The existing Digitalship Accession Desk at `/digitalship-accession`.
- The existing Source Collections page at `/source-collections`.
- Existing first-party planning routes registered in `client/src/App.tsx`.

The Source Collections page and Accession Desk now link to the review surface. The review page links back to both systems and to Atlas Core.

## Review behavior

- Lists source collections and their exact recorded citations.
- Displays candidate links only for explicitly registered routes/titles.
- Prefers exact route matches and uses exact title matching only as fallback.
- Shows unmatched items as unresolved; no fuzzy inference.
- Joins an accession to a batch only when filename, byte count, and SHA-256 all match. Filename-only collisions are not treated as identity.
- Preserves same-filename source versions as distinct batch records.
- Labels metadata-only records without implying the underlying bytes are available.
- Every candidate remains review-required.

## Atlas boundary

This is a read-only review surface. It does not call Atlas ingestion, create graph edges, publish entities, alter visibility, or perform database writes. The next stage is a separate, protected approval workflow that records who approved a relationship, its source evidence, the before/after graph references, and the timestamp. No candidate should be promoted merely because it appears on this page.

## Validation

The added integration tests verify route registration, existing-page handoffs, source/accession inputs, and the absence of Atlas write calls from the review surface. Repository CI must pass before merge.
