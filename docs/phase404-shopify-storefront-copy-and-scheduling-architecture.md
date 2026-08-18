# Phase 404 — Shopify Storefront Copy and Scheduled Release-Readiness Architecture

**Date:** 2026-08-17 (EDT)

## Decision context

Shopify is the owner-designated preferred commerce lane. The current ScrollVerse portal is configured with Stripe, and the two commerce integrations cannot be bound to the same project. The route forward is therefore a **separate Stripe-free portal copy** that uses Shopify as its storefront system, while the current portal remains the free experience, archive, learning, and discovery front door.

This document defines the prepared architecture only. It does not create a store, product, inventory record, checkout, payment, payout, tax setting, shipping rule, fulfillment action, token listing, or automated release. Those actions must remain tied to an approved public storefront destination and an individual release packet.

## Recommended public experience

The two portals should share a clear visitor journey rather than duplicate every responsibility.

| Surface | Visitor role | What can be shown now | What remains gated |
| --- | --- | --- | --- |
| **ScrollVerse.co** | Free experience and discovery map | Atlas, Living Journey, archive, learning, story, media discovery, creator-choice pathways | Any item-level store destination until the storefront copy and item release packet exist |
| **Shopify storefront copy** | Product, collection, cart, checkout, fulfillment, and customer-support surface | Storefront shell, collection architecture, branded lookbook treatment, release-readiness labels | Product publication, inventory, price, checkout, discount, fulfillment, and customer communication until the corresponding record is released |
| **Release registry** | Owner-review and audit surface | Source, rights, contributor, accessibility, inventory, destination, and operating-state records | Any record that is incomplete, disputed, or not explicitly released |

## Per-item release gate

An item may be shown as an **idea, research record, or requires owner release** before it is sellable. A Shopify product or collection may be activated only after the following fields are complete for that specific item.

| Required record | Why it is required | Initial state |
| --- | --- | --- |
| Original asset and source version | Identifies exactly what is being offered | Requires owner release |
| Rights and contributor record | Records authorship, permissions, and any credit or split context | Requires owner release |
| Accessibility package | Supplies alt text, captions, transcript, sizing, material, and fulfillment information as relevant | Requires owner release |
| Inventory or delivery model | Distinguishes physical inventory, made-to-order, digital delivery, or no inventory | Requires owner release |
| Public Shopify destination | Provides the exact collection or product URL to link from ScrollVerse | Requires owner release |
| Owner release decision | Separates preparation from an affirmative release decision | Requires owner release |
| AgapeCycle allocation record | Records the owner-defined 88% treasury / 12% Zakat allocation method for the released item | Requires owner release |

## Automation choices

The storefront supports two complementary patterns. Both are retained in the build record so the owner may enable either or both after the storefront copy is deployed and its catalog records are approved.

| Approach | Best use | Tradeoffs | Cost and setup |
| --- | --- | --- | --- |
| **Store-native event workflows** | Product changes, inventory changes, paid orders, fulfillment state, and staff notifications | Fast and event-driven, but each workflow operates within the storefront and must be configured with accurate conditions | Uses Shopify's workflow and webhook features; requires the live store, approved endpoint, and store-level configuration |
| **Portal release-readiness jobs** | Daily readiness audit, incomplete-record reminders, archive reconciliation, and owner-facing status summaries | Keeps release gates and source records visible in the portal, but should not be used to poll Shopify at high frequency | Requires a deployed portal handler, a durable job configuration, and then an owner-approved schedule |

Shopify documents webhooks for product, inventory, order, payment, fulfillment, and related store events. It also notes that destinations that repeatedly fail may be removed, so any future endpoint must verify authenticity, respond reliably, and be tested before live use.[1] Shopify Flow supports trigger-condition-action workflows and scheduled automations for store operations; availability and feature scope depend on the store plan and app configuration.[2] [3]

## Safe automation catalogue

The following operations are **prepared, not enabled**. Each one must be idempotent, auditable, and scoped to an approved record.

| Trigger | Permitted automated result | Non-negotiable gate |
| --- | --- | --- |
| Item release packet becomes complete | Create an internal readiness reminder for owner review | Never publishes a product or creates a checkout automatically |
| Shopify product or inventory event | Record a timestamped reconciliation entry and alert the owner to review the change | Requires a configured Shopify event and verified endpoint; never overwrites source or rights fields |
| Paid order event | Create a private operational audit record for the released product | No payment, payout, beneficiary, fundraising, or proceeds assertion beyond the actual provider record |
| Fulfillment state changes | Update a private operational status field and send a human-review notification | No automatic fulfillment release for an incomplete, disputed, or inventory-unknown item |
| Daily release-readiness summary | Report incomplete fields, upcoming review dates, and route links | Requires a deployed, authenticated, idempotent handler; does not modify storefront inventory or publish products |

## Launch sequence

1. Create a **copy of the portal without Stripe** and bind the connected Shopify store to that copy.
2. Build the storefront shell and import only owner-approved collections and items.
3. Populate per-item release packets, beginning with merchandise and media items that have a documented source, rights, contributor, accessibility, inventory, and destination record.
4. Validate customer-facing policies, shipping or delivery mode, tax configuration, customer support contact, and test orders in the storefront environment.
5. Configure one event workflow at a time, beginning with a non-financial product or inventory update notice; test failure and retry behavior before enabling additional workflows.
6. Add the approved storefront URL to ScrollVerse Atlas, Direct-to-Fan Catalog, and Support Highways only after the public destination exists.
7. Only after the storefront copy and its callback handlers are published should periodic release-readiness summaries be scheduled.

## Current operating state

| Component | State |
| --- | --- |
| Current ScrollVerse portal | **Available now** as a Stripe-configured portal and local build workspace |
| Shopify connection in this task configuration | **Not enabled**; no configuration changes made in this task |
| Shopify storefront copy | **Requires owner release** and a separate Stripe-free copy |
| Product publication, checkout, payout, fulfillment, and financial reporting | **Requires owner release** per individual item and storefront configuration |
| Scheduled operations | **Research / architecture only** until deployment, authenticated handler, approved schedule, and release records are in place |

## References

[1] [Shopify Help Center — Creating webhooks](https://help.shopify.com/en/manual/fulfillment/setup/notifications/webhooks)

[2] [Shopify Developer — Webhooks](https://shopify.dev/docs/api/webhooks/latest)

[3] [Shopify — Flow](https://www.shopify.com/flow)

[4] [Shopify Developer — About Flow](https://shopify.dev/docs/apps/build/flow)
