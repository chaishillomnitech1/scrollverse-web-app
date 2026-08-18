# Phase 477 — Shopify-Admin Launch Guidance Record

**Record date:** 2026-08-18 (EDT)  
**Source:** Owner-supplied text identified as guidance from Shopify AI within the `scrollverse-dev` Shopify admin.  
**Classification:** Provider-admin guidance; source-presented and not an executed provider record.

## Source-presented launch sequence

| Suggested Shopify-admin action | Source-presented description | Portal-aligned action gate | Current state |
| --- | --- | --- | --- |
| Remove storefront password | Disable password protection for visitor access. | Confirm the exact storefront, visitor-access policy, ready public routes, support/return terms, and rollback condition. | Requires owner release. |
| Add first product | Prepare title, description, price, images, and inventory. | Complete one item-level release packet: identifier/version, rights/contributors, accessible media, price/currency/tax basis, inventory or delivery, support/refund, market, and exact owner release. | Requires item record and owner release. |
| Set up payments | Enable Shopify Payments or an alternative; provider indicates banking/identity verification is needed. | Confirm exact provider, account owner, payment method, payout consequence, verification state, customer consequence, and rollback condition. | Requires owner-controlled provider verification. |
| Configure shipping | Set zones and rates or choose an initial model. | Confirm physical versus digital delivery, eligible regions, shipping/duty/tax basis, fulfillment owner, public terms, and customer consequence. | Requires delivery/market record and owner release. |
| Set up custom domain | Connect a custom domain to the Shopify store. | Confirm exact domain, registrar/DNS control, storefront-copy target, visitor consequence, conflict/rollback plan, and public verification. | Requires exact domain-release decision. |

## Operating boundary

The provider guidance is not a command to change the store. It does not establish that password protection was removed, a product exists, a checkout is open, payment verification finished, bank details were accepted, shipping was configured, a domain was connected, or a visitor can purchase. No Shopify setting, payment provider, identity record, banking detail, product, inventory, shipping zone, rate, domain, or customer communication was changed while creating this record.

## Correction path

For any one action, attach a dated provider-visible result, the exact target, the final item or settings record, the visitor or financial consequence, and an owner confirmation in the active conversation. If the result differs from this guidance, preserve both records and label the provider-visible result as current.
