# Phase 432 — Verified Live Visitor-Choice Requirements

**Date:** 2026-08-18 (EDT)  
**Purpose:** Define when a ScrollVerse visitor-facing choice is genuinely usable rather than only visually described.  
**Current state:** Requirements and route preparation only. No provider-side checkout, marketplace, trading venue, payment method, payout, product, or custody function is enabled by this record.

## The five visitor choices

| Visitor choice | Meaning in ScrollVerse | Minimum live-path requirement | Current baseline |
| --- | --- | --- | --- |
| **Buy** | A visitor purchases one specific original creator item | Named item, public provider destination, price/currency, delivery, terms, support, and verified visitor-visible availability | Shopify address is public but password protected; no published item is recorded |
| **Creator sell** | ScrollVerse offers one creator-controlled item directly | Same item record as buy, plus owner release and fulfillment or digital-delivery record | Release records are locally prepared; no provider-side product is recorded |
| **Trade proposal** | A visitor proposes a non-binding exchange or aligned collaboration | Clear proposal scope, contact or submission route, no-custody rule, no asset-transfer claim, and owner review path | Can be a source-bound proposal route; no exchange or marketplace is configured |
| **Contribution** | A visitor chooses an external support route | Exact public destination, purpose label, visitor notice, and correction path | Cash App `$chaisthegreat28` is the only locally verified public handoff |
| **Display / free experience** | A visitor reads, listens, studies, or explores without payment | Public route, source and accessibility context, and clear no-purchase label | Multiple free portal routes are locally prepared |

## Item record that makes a buy or creator-sell choice usable

| Record field | Why it is needed |
| --- | --- |
| Item identity | Prevents a generic collection concept from being mistaken for a purchasable product |
| Source and version | Connects the offered item to a creator-controlled source record |
| Rights and contributors | Captures any collaborator, likeness, or third-party material review before offering an item |
| Visitor promise | States exactly what the visitor receives and when |
| Price and currency | Makes the cost legible before a visitor leaves the portal |
| Delivery or custody | States physical fulfillment, digital delivery, license terms, or—if applicable—custody limitations |
| Customer terms | Provides returns, support, taxes or duties, and market limitations where applicable |
| Public destination | Links to one precise item or collection page, not an unverified provider home page |
| Owner release | Names the item, public label, destination, and consequence before a provider-side change |
| Public verification | Records that the visitor-visible destination is actually reachable in its stated form |

## Trade-proposal boundary

The portal can host a **trade proposal** or **co-creation proposal** route when it is clear that a visitor is proposing, not executing, an exchange. A real asset, currency, token, securities, or crypto trade requires the named venue or provider, both parties’ terms and eligibility, custody and transfer mechanics, applicable legal and tax records, a risk statement, and explicit owner confirmation. Until those conditions exist, the live visitor choice is a proposal route rather than a trade execution claim.

## Non-negotiable visible labels

| State | Visitor label |
| --- | --- |
| Complete public item path | **Available now** |
| Item record exists but provider-side release is incomplete | **Requires owner release** |
| Source or collection study | **Research** |
| Free route | **Free experience** |
| Proposal only | **Proposal route — no exchange executed here** |

## Correction rule

If a public destination stops matching the label, price, delivery, market, access state, or item record, the route must move from **Available now** to **Requires owner release** until the visitor-visible result is corrected and rechecked.
