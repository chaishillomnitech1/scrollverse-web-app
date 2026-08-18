# Phase 430 — ScrollVerse Activation Register

**Record date:** 2026-08-18 (EDT)  
**Purpose:** One owner-controlled register for the actual external actions that remain after local portal, public-source, Shopify-readiness, product-pipeline, and trading-readiness work.  
**Current rule:** This register does not perform any action. It names the exact operation, public consequence, and record needed before an owner confirms it.

## Current operating-state map

| Surface | Current recorded state | Visitor-facing state |
| --- | --- | --- |
| ScrollVerse local portal | Local routes, source records, product release pipeline, premium storefront, and trading-readiness controls validated | Local preview available; later changes not publicly delivered because managed checkpoint remains conflicted at `2ba0cc6a` |
| `scrollverse.co` | Existing managed published baseline only | Later local routes and links not yet public |
| Public Omni Manifesto | `chaishillomnitech1/scrollverse-omni-manifesto` published with non-sensitive source package | Public source available now |
| Shopify address | `scrollverse-dev.myshopify.com` visitor-tested | Public address is password protected; not a visitor-open store or verified checkout surface |
| Cash App | Owner-provided public `$chaisthegreat28` handoff | Available as an external visitor choice |
| Other named payment lanes | Chime, Go2Bank/GoCard, SoFi, PayPal, Ouro | No public destination URL stored in local portal record |
| Catalog and lookbooks | Source inventory, release packets, premium collection architecture, Product Release Pipeline | Research / requires owner release; no provider-side product record or checkout created |
| Trading readiness | Paper-trading control route and exact live-action register | No broker, exchange, account, custody, API, order, or funds connection |
| Background operation | Browser-local release control and documented scheduled-operation options | No recurring job enabled |

## Exact external-action register

| ID | Exact operation | What changes for visitors or funds | Required record before confirmation | Current state |
| --- | --- | --- | --- | --- |
| `PUBLISH-PORTAL-001` | Resolve managed publisher history and save a checkpoint | Later local routes become eligible for public delivery to ScrollVerse domains | Publisher-visible history must stop resolving to `2ba0cc6a`; successful managed checkpoint | Blocked by managed conflict |
| `SHOPIFY-ACCESS-001` | Remove Shopify storefront password | Any visitor can browse the store address publicly | Confirm visitor-open store intent, customer policies, contact details, shipping/delivery stance, and rollback owner | Not requested as a named setting action |
| `SHOPIFY-PRODUCT-001` | Create and publish one named Shopify product | Product can be discovered and potentially purchased if checkout is available | Source/version, rights/contributors, accessible copy, price/currency, inventory or digital delivery, support, terms, collection, public destination, owner release | No item record complete |
| `SHOPIFY-CHECKOUT-001` | Enable a named checkout/payment method for the store | Visitors may pay through the provider; fees, refunds, disputes, compliance, and payout effects may apply | Provider dashboard status, named method, market eligibility, payment terms, payout recipient, owner confirmation | Screenshot shows notification text only; direct provider verification not recorded |
| `SHOPIFY-MARKET-001` | Save or activate an international market | Products and prices may become visible or purchasable in included countries; currency, duties, tax, fulfillment, and merchant-of-record effects may apply | Countries, product eligibility, currency, duty/tax approach, shipping rates, returns, merchant-of-record terms, owner confirmation | Screenshot shows an unsaved `International` market screen; no saved state inferred |
| `SHOPIFY-TAP-001` | Complete a named Tap to Pay setup or accept a payment | A payment is accepted in person and records to provider account | Device, account, amount, customer consent, terms, and owner confirmation | Setup evidence supplied; no transaction action taken |
| `PAYMENT-LINK-001` | Add a named public payment destination to portal | Visitors can leave portal for that external destination | Exact public URL or unambiguous public handle, destination owner, purpose label, correction path | Cash App only verified in local record |
| `TRADE-CONNECT-001` | Connect a named broker or exchange account | External provider obtains an integration scope; account data may be read depending on scope | Provider, account, jurisdiction, permissions, custody model, key storage, and owner confirmation | Not configured |
| `TRADE-ORDER-001` | Send one named live trade order | Funds may be committed or lost; order can fill, partially fill, or fail | Provider, account scope, symbol, side, order type, maximum notional, risk limits, stop/cancel, funding, owner confirmation | No live order capability |
| `SCHEDULE-READINESS-001` | Create a named recurring readiness audit | Background job reads/writes only the documented readiness record on a cadence | Deployed site, idempotent authenticated endpoint, durable job record, scope, stop rule, and owner confirmation | Not configured |

## Action discipline

An owner confirmation for a future action must quote its **ID**, name the target, and confirm the visitor or financial consequence. Example: `Confirm SHOPIFY-PRODUCT-001 for [exact item] at [price/currency] with [delivery method].`

This format preserves visitor choice without making a broad instruction act as an unspecified product, payment, payout, market, trade, or provider change.
