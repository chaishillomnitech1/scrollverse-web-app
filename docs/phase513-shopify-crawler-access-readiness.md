# Phase 513 — Protected Shopify Crawler-Access Readiness

**Record date:** 2026-08-19 EDT  
**Source class:** owner-validated account-interface observation  
**Operating state:** browser-local scoped-request readiness available now; no crawler request or provider action active

## Capability record

Owner-provided Shopify account captures show active, time-bounded crawler-access entries for `scrollverse-dev.myshopify.com`. The screenshot context describes crawler authorization via Signature, Signature-Input, and Signature-Agent fields. Those values are deliberately excluded from the portal, documentation, codebase, logs, tests, and this record.

The portal now provides `/shopify-crawler-access-readiness`, a local planning surface linked from Shopify Staged Launch Guidance. It requires an exact public target, one purpose, selected public fields, retention rule, rate limit, review rule, stop condition, privacy boundary, and local acknowledgement before a copyable readiness record can be generated.

## Scope and release boundary

A future real request is limited to verification of an already released public surface. It cannot use this route to copy a signature, bypass a password, scan a private surface, collect customer/account/order/payment data, create a product, modify Shopify, or activate checkout. A named external request still requires the public target, scope, rights and release state, allowed fields, privacy rule, rate, stop condition, current owner approval, and a provider-specific execution record.

## Local validation

On 2026-08-19, TypeScript completed without errors and focused Phase 513 regression coverage passed with **1 test file / 3 tests**. Local visual inspection confirmed the route, source labels, scope fields, zero-requests-issued display, no-signature-use boundary, Shopify Staged Launch handoff, and direct activation-register path. No credential was used and no crawler request, store access, password bypass, customer-data access, catalog change, checkout, payment, or provider action occurred.
