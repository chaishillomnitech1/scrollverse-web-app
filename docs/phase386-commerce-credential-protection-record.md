# Phase 386 — Commerce Credential Protection Record

**Record date:** August 16, 2026

## Event classification

The owner supplied screenshots related to a Shopify store, payout configuration, and two-step authentication. The attachments included sensitive authentication recovery material and financial account context. No credential, recovery code, card number, bank-account number, payout destination, API secret, or identifying financial value is reproduced in this record.

## Protection response

| Area | Required response | Project handling |
| --- | --- | --- |
| Two-step recovery material | Treat any recovery material visible outside the owner’s password manager as exposed; regenerate it in the provider’s security settings | Not stored, copied, logged, or placed in project secrets |
| Banking, payout, and card data | Keep exclusively in the provider’s payout settings | Not collected through chat, code, environment variables, database rows, or documentation |
| Shopify API credentials | Request only after the owner creates a Stripe-free storefront project and confirms the new project context | Not requested in the current Stripe-configured project |
| Current portal commerce | Keep Stripe test configuration and verified public support routes fail-closed | No live charge, payout, store, or financial-destination activation executed |

## Platform boundary

The active ScrollVerse portal has Stripe configured. Shopify and Stripe are mutually exclusive in this project environment. A Shopify storefront requires a separate project copy without Stripe, followed by a secure request for the minimum Shopify API credentials necessary for the explicitly approved integration.

## Owner no-change instruction

The owner has instructed that the existing Shopify account and payout configuration is not to be changed. This project will not alter that provider configuration, copy it into the portal, or infer an authorization to activate a new payment route. The project boundary remains: no payout, bank, card, recovery, or account-security value is retained here.

## Correction and next action

The owner should regenerate any recovery material that appeared in the attachments and retain replacement codes solely in a dedicated password manager. No replacement recovery material should be sent through chat or entered into the project’s secrets panel. Once a Stripe-free copy is created, a separate Shopify integration plan can request only the Shopify API credentials required for that new storefront.
