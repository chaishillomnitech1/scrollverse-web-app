# Execution Control Plane — Capability & Evidence Registry

**Status:** pure TypeScript contracts and tests added; provider adapters and persistence remain separate integration gates.

## Specialist capability routing

The registry assigns work by domain rather than forcing every task through one provider:

| Work domain | Primary specialist/provider | Fallbacks |
|---|---|---|
| Engineering, repository, CI and QA | GitHub / engineering QA | Files |
| Preview/release/deployment | Vercel / infrastructure | GitHub, DigitalOcean |
| Server and infrastructure | DigitalOcean / infrastructure | GitHub |
| Source recovery and archive | Dropbox / Files | GitHub |
| Design systems | Figma | Canva |
| Creative production | Canva | Figma |
| Project operations | ClickUp | GitHub |
| CRM and relationships | HubSpot | ClickUp |
| Storefront and commerce | Shopify | Wix |
| Payments and accounting | QuickBooks | Stripe |
| Agreements and signatures | Docusign | HoneyBook |
| Webinar-derived editorial | Sequel | Canva |

A route is a recommendation, not an assertion that a provider is connected or authorized. The caller must resolve the capability snapshot before attempting an action.

## Capability state vocabulary

- `NOT_CHECKED`: no current provider check.
- `UNAVAILABLE`: provider capability cannot currently be reached.
- `AVAILABLE`: capability is exposed, but authentication is not established.
- `AUTHENTICATED`: provider identity/session is verified; this does not imply permission for every action.
- `AUTHORIZED`: the exact action scope is verified with a timestamped evidence reference.

Authenticated and authorized claims require both `checkedAt` and `evidenceRef`. Unknown state must never be rendered as healthy, zero, or authorized.

## GitHub and deployment evidence

The typed `DeploymentObservation` contract records provider, environment, state, URL, commit SHA, observation time, and source reference. It distinguishes preview, staging, production, and unknown environments. A successful preview check is not production verification.

The evidence ladder remains explicit:
`USER_REPORTED → SOURCE_LOCATED → INSPECTED → IMPLEMENTED → TESTED → CI_PASSED → PREVIEW_READY → PRODUCTION_VERIFIED → EXTERNALLY_CONFIRMED`.

The code does not promote a deployment to production-verified from a preview URL or CI pass. Production and external-confirmation events require a separate approval/verification reference.

## Append-only evidence events

Each event has a stable event ID, work ID, stage, actor, capability, target, evidence references, approval reference, timestamp, and previous-event pointer. The pure append helper:
- returns a new list without mutating old events;
- rejects duplicate event IDs;
- requires a valid chain to the latest event for that work item;
- prevents silent stage regression;
- requires evidence references after the user-reported stage;
- requires approval/verification references for production and external confirmation.

This module does not persist events. The existing Atlas `evidence_ledger` is the intended integration target after database readiness, schema reconciliation, and a reviewed migration/adapter. No new parallel archive table is proposed here.

## Protected action boundary

The routing layer marks deployments, infrastructure, commerce, payments, agreements, sensitive-data work, and production writes as approval-required. It never performs provider actions itself. Merges, publishing, secret changes, database migrations, financial transactions, access/visibility changes, legal actions, and production deployments remain protected operations.

## Validation

`server/atlas/execution-control.test.ts` covers state evidence requirements, specialist routing, approval gates, append-only event behavior, chain integrity, stage monotonicity, and sourced deployment observations.
