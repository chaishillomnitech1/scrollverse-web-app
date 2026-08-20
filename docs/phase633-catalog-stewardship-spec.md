# Phase 633 — Catalog Stewardship Record Specification

## Purpose

The Catalog Stewardship Record is a browser-local workspace for organizing public release evidence, source cover records, distributor references, and creator review fields. It creates a clear reconciliation-ready structure; it does not access accounts, download reports, calculate earnings, collect funds, alter a distributor upload, or initiate a payment.

## Record fields

| Field | Use |
|---|---|
| Release identifier | Stable browser-local record ID. |
| Title and source | Public release title, canonical URL, platform, and retrieval date. |
| Cover record | Managed browser-local exhibit URL, accessibility description, and source image URL where available. |
| Distributor reference | Public distributor or smart-link context, with source URL and classification. |
| Reconciliation fields | Period, statement source, reported gross, reported deductions, reported net, and review note. These fields remain empty until an owner provides a verified statement or export. |
| Review state | `CONFIRMED PUBLIC RECORD`, `OWNER-SUPPLIED DISCOVERY LEAD`, `RESEARCH`, or `REQUIRES OWNER RELEASE`. |
| Storyworld handoff | Direct route to the related Cover Art Storyworlds record. |

## Public distributor-reference rule

Public DistroKid and UnitedMasters pages may support a catalog reference only when a visible title, artist, canonical URL, and direct connection to the release are available. A platform search result, dashboard URL, generic distributor help page, or name-only match does not establish the creator’s account, payout, rights, or distribution status.

## Reconciliation boundary

The terminal can export a blank or partially source-filled reconciliation record for the owner’s review. Earnings, royalties, balances, splits, payout states, and other financial values must originate from owner-provided verified statements or authorized exports and remain local until the owner explicitly decides on any further action.
