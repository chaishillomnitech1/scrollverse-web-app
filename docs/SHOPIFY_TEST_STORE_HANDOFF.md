# Shopify Test-Store Handoff

## Scope

This is a preparation checklist for a **separate copy** of ScrollVerse. The current project keeps Stripe configured; do not enable Shopify here because the providers are mutually exclusive in this project.

## Create the Separate Test-Store Project

Create a copy of the existing project, then enable the Shopify integration in that copy. Connect only a Shopify development or test store. Keep the copied project in a non-public testing state until catalog, policies, and webhook verification are complete.

| Required input | Store it in | Do not store it in |
|---|---|---|
| Store domain | Managed integration settings | Public source code or public lookbook records |
| Storefront and Admin access tokens | Managed secrets in the copied project | Browser forms, client bundles, Git, or docs |
| Webhook signing secret | Managed secrets in the copied project | Client-side code or request query strings |
| Product images and agreement PDFs | Secure storage references plus review records | Local public asset folders or placeholder paths |

## Preflight Sequence

1. Record executed supplier evidence, SKU economics, policy URLs, fulfillment terms, and impact-recipient agreements in the protected catalog workflow.
2. Upload and approve three real images per SKU: **HERO**, **DETAIL**, and **ON_BODY**. Generated concepts, `s3://` strings, and staging references do not qualify.
3. Configure Shopify credentials through managed integration settings in the copied project.
4. Verify webhook signatures server-side before any order, customer, or inventory write.
5. Run the catalog gate and only then test catalog synchronization with test products. Do not route real payments or publish claims before the review is complete.

## Current Boundary

The parent ScrollVerse project remains a Stripe-enabled portal with a fail-closed Atlantis catalog. Its public lookboards are creative records only and cannot activate Shopify, create a product, reserve inventory, or submit an order.
