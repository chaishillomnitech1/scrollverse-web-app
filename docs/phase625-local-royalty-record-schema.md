# Phase 625 — Local Royalty-Record Schema

## Purpose

`local_royalty_records` is an owner-scoped **non-custodial local record** for a submitted royalty reference. It is not an indexer, wallet, blockchain listener, price feed, payment system, or transfer service. The table begins empty and receives no seeded balances, transactions, counterparties, or amounts.

| Field group | Stored fields | Reason |
|---|---|---|
| Identity | `recordReference`, `assetLabel`, `networkLabel` | Provides a stable internal record and its declared context. |
| Submitted reference | `submittedTransactionReference`, `counterpartyReference`, `sourceReference`, `sourceNote` | Preserves the exact owner-provided context without treating it as independently verified. |
| Declared observation | `declaredAmount`, `declaredUnit`, `observedAt` | Captures a stated observation as text and time, without calculating balance, price, value, or entitlement. |
| Review | `reviewStatus`, `reviewedByUserId`, `reviewedAt` | Keeps review state separate from the submitted reference. |
| Audit | `ownerUserId`, `createdAt`, `updatedAt` | Restricts rows to the owner-scoped local desk and preserves record timing. |

## Access boundary

The `royaltyRecords` tRPC router is **admin-only**. Its `list` and `record` operations use the project database only. Neither procedure calls an external provider or accepts a signing, wallet, settlement, transaction-submission, broadcast, or payment instruction.

## Exact current state

The schema and local record interface are preparation assets. No public $LONDC token contract, explorer address, transaction hash, external settlement, or royalty transfer is supplied by this phase. Add those only as exact, owner-submitted source references in a future row.
