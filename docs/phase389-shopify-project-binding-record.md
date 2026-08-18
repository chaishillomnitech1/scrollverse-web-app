# Phase 389 — Shopify Project Binding Record

**Record date:** August 16, 2026

## Owner statement

The owner states that Shopify is connected to Manus at the account level. This record preserves that statement without altering the store, payout configuration, account settings, or provider credentials.

## Current project binding

The active ScrollVerse portal project has Stripe configured in test mode. The project-level integration state does not have Shopify bound to this portal. In this environment, Shopify and Stripe are mutually exclusive at the project level.

| Layer | Current state | Action taken in this task |
| --- | --- | --- |
| Shopify account | Owner states that the account is connected to Manus | No store, payout, or account setting changed |
| ScrollVerse portal project | Stripe configured in test mode | Stripe configuration retained; no live activation attempted |
| Shopify project binding | Not bound to the Stripe-configured portal | No connection attempt made |
| Sensitive provider data | Not retained in project files, source, secrets, or database | No credentials, recovery material, banking, payout, or card details stored |

## Correct non-destructive path

To bind Shopify without replacing the current Stripe configuration, the owner must create a separate Stripe-free project copy and confirm that new project context. The storefront copy can then request only the minimum Shopify API credentials necessary for the approved integration through its secure secrets panel. Banking, payout, card, and account-recovery information remain exclusively in Shopify and the owner’s password manager.

## Correction path

If the project-level payment configuration changes in the future, this record should be updated with the actual project integration state and its date. It does not infer a store connection, product release, checkout activation, payment activation, or payout authorization.
