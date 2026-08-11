# Phase 99 External Dependency Record

## Status

The supplied dependency material is retained as a **planning input** only. It does not establish a merchant account, Shopify test store, licensing relationship, approved supplier, customer-policy record, impact-recipient agreement, wallet, payment destination, or inventory source.

| Proposed dependency category | Current status | Release treatment |
|---|---|---|
| Separate Shopify headless project | Proposed project name and API-version planning only. | Use the handoff checklist in `SHOPIFY_TEST_STORE_HANDOFF.md`; no connector or credential is active here. |
| Third-party brand or material references | No executed license, technical certificate, or corporate authorization provided. | Do not use marks, trade dress, partnership wording, or product claims in public surfaces. |
| Impact allocation references | No executed recipient agreement or verified destination supplied. | Do not create allocations, payment routing, or on-chain records. |
| Lookboard save endpoint proposal | Current project uses authenticated tRPC records tied to the signed-in user rather than supplied wallet identifiers. | Saved lookboards remain creative selections only and never write to merchant, wallet, or inventory systems. |
| GraphQL query template | A structural planning example only. | Run only in a separately connected Shopify test-store project after managed credentials and server-side signature validation are configured. |

## Adoption Rule

Any future production integration must begin with source verification, written authority, managed secret configuration, and the protected catalog gate. Planning text and placeholder values cannot satisfy those requirements.
