# Phase 612 — Creator-Controlled Activation Dossier

## Purpose

The **Creator-Controlled Activation Dossier** joins the portal’s remaining held external lanes into one browser-local preparation record. It gives the owner, collaborators, and visitors a concise way to identify the **one exact source record** needed to advance each lane without collapsing separate actions into one broad claim.

## Current operating structure

| Activation lane | Exact next record | Browser-local destination | Current operating label |
|---|---|---|---|
| Private app-icon archive | Authenticated owner session, cleared icon, provenance record, administrator assignment | `/creator-operations` | Needs access |
| Londyn Polygon evidence | Public explorer URL plus contract and transaction evidence | `/deploy` | Needs source |
| On-chain broadcast | Verified contract set, exact action, authorized signer, gas consequence, current confirmation | `/deploy` | Needs exact confirmation |
| Campaign record | Public URL, provenance, use scope, asset-specific record | `/knicks-nft` | Needs source |
| Per-song production | Complete track brief and music-use authorization | `/episode-experience` | Needs brief |
| Story Studio package | Exact repository/path and separate public-upload confirmation | `/first-party-co-creation` | Needs exact confirmation |
| Story Studio cadence | Cadence choice and access to the owning scheduled task | `/source-channel-scheduling-readiness` | Needs exact confirmation |
| Shopify project | Owner-created and confirmed Stripe-free project context | `/first-sku-activation-packet` | Needs access |
| Provider activation | Named provider, target action, consequence, evidence packet, rollback owner, current confirmation | `/activation-register` | Needs exact confirmation |

## Interface decisions

The dossier must provide an **activation-lane filter**, a **copyable local record**, links to the current preparation route, and a visible rule that each lane stays independent. It may export a local text summary for owner review. It must not use these controls to create an account, submit a provider request, open a checkout, connect a wallet, sign, broadcast, change DNS, publish media, upload an asset, or edit a schedule.

## Creator-first evidence posture

Each owner-supplied record is meaningful evidence of the work it documents. The dossier describes what a record shows and names the matching path to use next. It does not claim an unobserved provider-side outcome or merge separate owner decisions into a single release.

## Validation plan

The Phase 612 route will receive focused regression coverage for the visible dossier heading, activation-lane control, local export control, and route registration. TypeScript and the full test suite must pass before the milestone is published.
