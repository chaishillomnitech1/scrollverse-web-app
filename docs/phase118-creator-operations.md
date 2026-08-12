# Phase 118 — Creator Operations Workspace

## Purpose

The Creator Operations Workspace is a protected, authenticated layer for three operational needs that were previously tracked only as release-readiness gates: a creator support intake, a metadata-first release-assets workspace, and a direct path into the existing private provenance workflow.

The workspace does **not** submit applications to external stores, publish assets, determine legal ownership, provide legal advice, process payments, or establish a provider partnership. It keeps the owner and creators aligned on what is present, what needs review, and what action is still required.

## Data boundaries

| Record | Owner | Visibility | Intended use | Explicit boundary |
|---|---|---|---|---|
| Support request | Requesting authenticated user | Private to requester and authorized reviewers | Ask for assistance with access, creator workspace, release planning, or account experience | Do not include credentials, payment data, government IDs, or emergency information. |
| Release asset record | Requesting authenticated user | Private to requester and authorized reviewers | Track a screenshot, app icon, copy block, release note, or other release material by title and source pointer | A record is not a store listing, clearance decision, or evidence that an asset was shipped. |
| Release asset event | Requester or authorized reviewer | Private audit history | Record creation, submission, information requests, bundle acknowledgement, or exclusion | An acknowledgement is a completeness signal only; it does not confer legal, platform, or commercial approval. |
| Provenance record | Existing creator-governance owner | Private owner record with protected review queue | Preserve origin context for an asset or work | Existing provenance boundaries continue unchanged. |

## Support status model

Support requests begin at `OPEN`. An authorized reviewer can move a request to `IN_REVIEW`, `AWAITING_CREATOR`, `RESOLVED`, or `CLOSED`, with a visible status note. The status is a workflow signal, not a guarantee of response timing or outcome. Until a person is explicitly assigned to operate this queue, the release-readiness support gate remains **owner action required**.

## Release asset model

Release assets are intentionally metadata-first. The record stores a title, asset kind, safe source pointer, concise description, and optional related provenance record. Users may submit a record for protected completeness review only after an owner attestation. Authorized review can acknowledge a bundle candidate or request additional information.

The first supported kinds are `APP_ICON`, `SCREENSHOT`, `STORE_COPY`, `PRIVACY_COPY`, `RELEASE_NOTE`, `SUPPORT_POLICY`, and `OTHER`. These labels organize a release bundle; they do not imply a platform has accepted any material.

## Privacy and review rules

The interface warns users not to enter secrets, credentials, personal identification numbers, payment information, private contracts, or sensitive personal information. Content review and external-store compliance must be completed by the responsible publisher against the exact final build.

## Operational handoff

The public `/release-readiness` route continues to show external activation gates. The protected `/creator-operations` workspace lets an authenticated creator prepare the materials that can later satisfy those gates. It links back to the existing Creator Workspace and protected provenance records rather than duplicating ownership data.

## Verification record

On the development preview, `/creator-operations` rendered its sign-in gate with the intended private-workspace copy and the explicit ban on passwords, payment data, and identity documents. Authenticated support threads, release-material records, provenance linking, and review-status actions remain available only after sign-in. Creator-provided public channel destinations are documented separately in `docs/phase118-creator-channel-handoffs.md` so links can remain visible without asserting account-management access or platform affiliation.
