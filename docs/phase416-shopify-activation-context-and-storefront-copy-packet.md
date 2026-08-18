# Phase 416 — Shopify Activation Context and Storefront-Copy Packet

**Record date:** 2026-08-18 (EDT)  
**Handling:** Owner-provided activation context; protected configuration values are not copied into this document, source code, public routes, or messages.

## Current context

The owner reports that Shopify has been activated and proof has already been supplied. The project configuration indicates that the current ScrollVerse portal is Stripe-configured. Shopify and Stripe cannot be bound to this same project, so the implementation path is a **separate Stripe-free ScrollVerse storefront copy** connected to the owner’s existing Shopify context.

This is not a denial of the owner’s activation context. It is the project-boundary map needed to route public visitors correctly: the current portal continues as the free archive, discovery, learning, catalog, and payment-options front door; the separate storefront copy becomes the product, cart, checkout, fulfillment, and customer-support surface after it exists.

## Protected configuration rule

| Allowed in a public or source-controlled record | Never placed in a public or source-controlled record |
| --- | --- |
| Public storefront, collection, or product URL; public policy URL; public support contact; public shipping/delivery description; source and release records | Shopify access token, secret, recovery code, API credential, private admin URL, payout information, bank/card details, customer data, or private configuration value |

## Storefront-copy packet

| Packet layer | Required implementation record | Current state |
| --- | --- | --- |
| Storefront copy | Create a new ScrollVerse project copy that is not Stripe-configured, then bind the owner’s Shopify context through the managed integration | Requires separate project copy |
| Brand and navigation | Carry the ScrollVerse visual system, Atlas return path, free learning, catalog discovery, and clear store/support navigation | Prepared architecture |
| Collections | Music and digital editions; books and print/digital editions; fashion and artifacts; collector editions; creator services where approved | Requires collection-level owner release |
| Item packet | Exact asset/version, source, rights, contributors, accessibility, inventory or delivery model, price, tax/refund, support, public URL, AgapeCycle record if used, owner release | Required per item |
| Customer policy | Delivery/fulfillment, returns/refunds, privacy, customer-support contact, and any applicable terms | Requires storefront policy record |
| Test review | Provider-hosted test order or non-financial storefront review; confirm customer confirmation and support behavior | Requires separate storefront environment |
| Public route-back | Add only approved public collection/product URLs to the current Payment Options Map and Direct-to-Fan Catalog | Requires public URLs |

## Collection-to-release map

| Future collection | Local preparation record | What opens the public collection |
| --- | --- | --- |
| Music and digital editions | Twelve catalog production packets and Direct-to-Fan Catalog records | Released item packet, delivery method, price, policy/support record, and public Shopify URL |
| Books and readers | Book of the Journey and book/media readiness routes | Distinct commercial edition, format, source/rights record, fulfillment or download terms, and public Shopify URL |
| Fashion and artifacts | Fashion Artifact Atlas, collection records, and lookbook pathways | Approved look/item identity, rights, material/sizing/accessibility, inventory or made-to-order model, price, and public Shopify URL |
| Collector editions | Catalog Production Desk and optional collectible metadata fields | Exact edition scope, rights/contributor record, delivery terms, optional token metadata only where separately released, and public Shopify URL |
| Creator services | Creator Services Navigator and release briefs | Defined scope, customer promise, price, delivery timeline, support contact, policy record, and public service destination |

## Exact activation gate

Before any product publication, checkout, payment acceptance, payout configuration, shipping/fulfillment action, discount, or customer communication is enabled, the action record must identify the **specific storefront copy, collection or item, public destination, price or payment mechanism, delivery/support terms, and the consequence**. The owner must confirm that exact irreversible action in the current conversation before it is performed.
