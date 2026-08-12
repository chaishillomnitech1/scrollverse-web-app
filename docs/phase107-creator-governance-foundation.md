# Phase 107 — Consented Creator Governance Foundation

## Purpose

Phase 107 turns Convergence Commons from a discovery page into a **consented creator-governance foundation**. It gives authenticated people a way to publish an intentional creator profile, receive and respond to structured collaboration requests, and preserve a private provenance record for original work. It does not create a marketplace, ownership registry, legal opinion, payment obligation, token entitlement, or commercial listing.

## Consent and Visibility Rules

| Record | Default visibility | Public condition | Sensitive data excluded |
|---|---|---|---|
| Creator profile | Private | Creator explicitly selects public visibility and confirms publishing consent. | Email, wallet, legal name, login identity, payment data, and private requests. |
| Collaboration request | Private to requester and recipient | Never public in this phase. | Financial terms, files, contact information, and automatically inferred attributes. |
| Provenance record | Private to owner and authorised reviewers | Never public in this phase. | Asset bytes, payment records, legal conclusions, and private identity data. |
| Review event | Private to owner and authorised reviewers | Never public in this phase. | Legal determinations or ownership guarantees. |

## Records

| Record | Minimum fields | Ownership and status |
|---|---|---|
| **Creator profile** | User ID, display name, short bio, disciplines, signature statement, visibility, collaboration opt-in, consent timestamps. | A creator can edit only their profile. Public queries expose only selected presentation fields. |
| **Collaboration request** | Requester ID, recipient ID, request type, project title, message, status, timestamps. | Requester can withdraw; recipient can accept or decline. Neither party can alter the other party’s message. |
| **Provenance record** | Owner ID, title, record type, summary, source category, source reference, attestation state, private review status. | Owner can draft or submit; only an administrator can acknowledge or request more information. |
| **Provenance review event** | Record ID, action, note, actor ID, timestamp. | Append-only accountability log. “Acknowledged” means reviewed for record completeness, not legal clearance. |

## Minimum Product Flows

An authenticated visitor creates or edits their own profile, chooses whether it is public, and separately turns collaboration requests on or off. A public creator directory shows only profiles that chose public visibility and request availability. A requester selects a public, collaboration-enabled profile and sends a structured, non-financial request. Both people can see the request only in their own private workspace.

Creators may preserve a provenance entry as a private draft. Submitted entries appear in the protected administrative review queue. Administrators may append a note, acknowledge the record, or request more information; the interface must not present these actions as proof of legal ownership, license, valuation, or commercial readiness.

## Explicitly Deferred

The following capabilities remain intentionally absent: direct messaging, payments, escrow, contracts, licensing automation, rights adjudication, NFT minting, token rewards, marketplace listings, inventory, checkout, external contact disclosure, file-byte storage, identity verification, ranking, and autonomous governance decisions.
