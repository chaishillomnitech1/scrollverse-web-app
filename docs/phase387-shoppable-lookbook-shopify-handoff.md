# Phase 387 — Shoppable Lookbook and Shopify Storefront Handoff

**Prepared:** August 16, 2026

## Current ScrollVerse lookbook state

The portal already has a dedicated, source-aware fashion experience at `/mein-lookbook`. It contains original MEIN look directions, the Atlantis technical-pack selector, concept galleries, readiness indicators, and non-operative commerce-unlock checklists. All current visual concepts remain correctly separated from approved merchandise and checkout.

| Surface | Current role | Customer checkout state |
| --- | --- | --- |
| `/mein-lookbook` | Original MEIN fashion direction, technical packs, concept gallery, and release-interest pathway | Concept and approval preparation only |
| `/direct-fan-catalog` | Creator-directed service, capability, and support discovery | Public-safe support routes only; no unapproved SKU checkout |
| `/fashion-empire` and related fashion routes | Brand-world and future concept exploration | Research / requires owner release |
| Current portal payments | Stripe environment configured at the project level | Test environment; no approved live SKU activation |

## Stripe-compatible shoppable lookbook handoff

The current portal can remain on Stripe. A look becomes eligible for a Stripe product only after its own release record contains the following items.

| Release record | Required before a customer-facing Stripe product is created |
| --- | --- |
| Product identity | Approved product name, SKU, variants, sizes, colorways, material and care details |
| Visual record | Approved hero, detail, and on-body images with accurate alt text |
| Production record | Signed manufacturer or vendor agreement, sample/inspection evidence, capacity and lead-time confirmation |
| Customer record | Price, taxes, shipping regions, fulfillment time, returns, refunds, customer-support route, and product-specific terms |
| Rights record | Creator ownership, contributor approvals, marks, imagery, music, and likeness permissions as applicable |
| Owner release | Dated owner decision naming the exact item, sales route, and effective release date |

The portal’s stripe path must keep all products unavailable until the applicable record is complete. Payout, card, bank, and recovery information must not be stored in code, database fields, project secrets, chat, or documents.

## Separate Shopify storefront path

The current project cannot add Shopify because it has Stripe configured. Shopify and Stripe are mutually exclusive in this project environment. The Shopify path begins only after the owner creates a separate Stripe-free project copy and confirms its project context.

| Step | New Shopify storefront project action |
| --- | --- |
| 1 | Create a copy of the portal without Stripe enabled |
| 2 | Add Shopify through the project integration flow |
| 3 | Request only the minimum Shopify API credentials through the secure secrets panel—never banking, payout, card, or recovery data |
| 4 | Connect only owner-approved, release-ready products with complete individual records |
| 5 | Verify storefront product, policy, shipping, and fulfillment states before public publication |

## Public language and operating state

The lookbook should use direct operating-state labels: **available now**, **research**, and **requires owner release**. A concept gallery may be public as an original creative record; it does not become a product listing, price promise, store inventory, checkout offer, token, or fulfillment claim without its own release record.

## Sensitive-information rule

Use platform payout settings and an external password manager for banking information, payment cards, two-step recovery material, and account-recovery codes. Never enter these items into ScrollVerse project secrets. Project secrets are reserved for integration credentials that are necessary to run an approved service and are safe to scope to the application.
