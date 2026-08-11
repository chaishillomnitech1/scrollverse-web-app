# Phase 104 — Personalized Journey Privacy and Operations

## Scope

The `/journey` experience adds authenticated recommendations and a voluntary Guardian orientation marker. It does not influence payment eligibility, Guardian rank, token distribution, commerce availability, or access to public knowledge.

## Data Boundary

| Capability | Stored data | Not stored |
|---|---|---|
| Orientation progress | Authenticated user ID and three completion timestamps | Free-text profile, finances, IP address, device fingerprint |
| Private journey analytics | Opt-in user ID, journey zone, selected internal route, timestamp | Public browsing events, page content, external URLs, purchase behavior |
| Retention | Events older than 90 days are pruned on the next opted-in journey interaction | Indefinite interaction history |
| Opt-out | Deletes that user’s interaction events and records the opt-out timestamp | Any continued event recording after opt-out |

## Proposal Boundary

>The supplied high-concurrency cron script, mock bearer token, Prisma mutation controller, Qdrant references, wallet labels, and fabricated due-soon records were **not adopted**. The deployed project uses its existing Express, tRPC, Drizzle, MySQL, Manus authentication, and governed scheduling pathways only.

## Operator Notes

Analytics is disabled by default. An authenticated visitor can enable the 90-day journey analytics preference from `/journey`; turning it off removes their recorded journey interactions. The owner-facing Fashion Evidence Digest remains separate from journey analytics.
