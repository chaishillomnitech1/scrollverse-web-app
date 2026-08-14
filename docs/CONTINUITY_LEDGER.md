# ScrollVerse Durable Continuity Ledger

## Active Scope

This document is the durable entry point for the ScrollVerse fashion continuity controls. The detailed Phase 98 record is maintained in [`phase98-fashion-continuity-ledger.md`](./phase98-fashion-continuity-ledger.md).

## Protected Operating Rules

| Rule | Required behavior |
|---|---|
| Original concept separation | Keep public fashion discovery and look-building distinct from orders, stock reservations, pricing, fulfillment, and checkout. |
| Evidence-driven activation | Keep the catalog gate locked until supplier evidence, approved assets, SKU data, impact terms, customer policies, and provider authorization are approved. |
| Provider safety | Keep Stripe as the current provider in this project. Use a separate project copy for a future Shopify test store because the providers are mutually exclusive here. |
| Secret safety | Store credentials and legal documents in managed secret or secure-document systems. Never commit them to source control or collect them in browser forms. |
| Reference discipline | Treat shared links, social posts, screenshots, and pasted code as planning inputs, not proof of production status or third-party authorization. |

## Versioned, Not Self-Activating

This ledger is versioned with the repository and checked by a local documentation preflight. It cannot change checkout status, provider authorization, inventory, merchant writes, smart contracts, or payment rails.

## Phase 234 — Source-Led Continuity Review

The Phase 234 record extends the ledger from fashion continuity into source-led project continuity. The review uses a four-field record—**source**, **classification**, **decision**, and **activation boundary**—for owner-supplied information, public sites, first-party documents, and protected evidence. The related source register and public-site review scope are maintained in [`phase234-manus-site-review.md`](./phase234-manus-site-review.md).

Protected records are not copied into public routes, credentials are not committed, and project documentation does not imply access to historical private chats, remote site administration, or third-party accounts that have not been explicitly provided to this workspace.
