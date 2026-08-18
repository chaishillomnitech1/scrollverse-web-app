# Phase 428 — Original Brand Product Pipeline and Background Operations

**Date:** 2026-08-18 (EDT)  
**State:** Design and local readiness. No product, listing, price, checkout, payment method, payout, provider control, scheduled job, or recurring external action was created.

## Reusable original-brand product pipeline

This pipeline applies to an original ScrollVerse fashion item, book, music edition, collector artifact, youth story world, service, or other creator-controlled product. It is designed so a polished collection never outruns its item-level record.

| Stage | Required record | Current operating label until complete |
| --- | --- | --- |
| 1. Source intake | Exact source file, version, owner direction, and originating collection world | Research |
| 2. Rights and contributors | Ownership context, contributor role, likeness and third-party material review, and releases where applicable | Requires owner release |
| 3. Visitor story | Product title, accessible description, alt text, age-aware guidance where needed, and what the visitor receives | Requires owner release |
| 4. Offer design | Format, edition boundary, price, currency, tax and market scope, and voluntary visitor-choice path | Requires owner release |
| 5. Delivery | Physical inventory or digital-delivery method, timing, fulfillment, support contact, and customer terms | Requires owner release |
| 6. Provider destination | Specific public Shopify product or collection URL, Stripe item, licensed external destination, or display-only decision | Release-ready |
| 7. Owner release | Exact item, destination, public label, and consequence approved by owner | Release-ready |
| 8. Provider-side action | Product publication, inventory availability, checkout, domain, market, payment, fulfillment, or payout setting | Exact confirmation required |
| 9. Public review | Visitor-visible availability check, source correction path, and rollback rule | Available now only after verification |

> **Rule:** an item returns to `requires owner release` if its source, rights, contributor context, price, delivery, terms, destination, or visitor-visible state changes.

## Deterministic readiness maintenance

The following maintenance work can be deterministic and non-financial when it only reads local records and reports missing fields:

1. Identify release packets missing source/version, accessibility, rights/contributor, customer-term, or public-destination fields.
2. Flag a stored public destination that has no date or failed visitor-visible check record.
3. Produce a list of items whose labels should return from `release-ready` to `requires owner release` because a required field changed.
4. Record a correction request without publishing, messaging, transferring funds, changing a provider, creating inventory, or opening checkout.

## Durable background-operation choices

| Approach | What it can do | Requirements and cost | Safeguard boundary |
| --- | --- | --- | --- |
| **A. Browser-local Release Desk** | Lets the owner complete and copy item readiness briefs within a local UI | No server schedule, no external service cost, no provider connection | No persistence or automation beyond the active browser session |
| **B. Project Heartbeat readiness sweep** | Periodically checks database-held release records and writes a non-financial completeness audit | Requires a deployed site, idempotent `/api/scheduled/*` handler, durable `task_uid`, database record, checkpoint, and deploy before schedule creation | Read-only or audit-only handler; no product publication, provider setting, payment, trade, transfer, or payout action |
| **C. Agent research review** | Periodically researches public sources and sends a source-labeled intake report back to a scheduled route | Requires a deployed site, an explicit prompt, an authenticated scheduled callback, controlled scope, and owner-managed cost/review | No session history, source code, credentials, or direct provider access; cannot publish or transact without a separately designed and confirmed endpoint |

These are distinct options. **No recurring operation is selected or enabled by this record.**

## Recurring-operation approval boundary

Before creating a recurring operation, the launch record must state:

| Field | Required value |
| --- | --- |
| Business record | Exact database or local record the job owns, including durable task identifier once created |
| Trigger | Named cadence in six-field UTC cron or a non-scheduled manual trigger |
| Scope | Read-only audit, source intake, reminder, or other specifically bounded action |
| Endpoint | `/api/scheduled/<name>` for site work, authenticated and idempotent |
| Outputs | Exact fields it may write and exact logs or notifications it may create |
| Prohibited actions | Product publication, price changes, checkout, payment methods, payouts, provider settings, transfers, live trades, or external posting unless separately approved |
| Stop rule | Owner pause/delete path, error behavior, retry rule, and correction or rollback condition |
| Confirmation | Exact owner confirmation after the deployed handler, scope, cadence, and consequence are presented |

## Deployment dependency

The managed ScrollVerse publication conflict remains a prerequisite for any site-connected recurring operation. Scheduled jobs cannot target the local development route; the site must be successfully deployed before a project Heartbeat or Agent cron is created.
