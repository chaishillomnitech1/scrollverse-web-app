# Phase 630 — Sovereign Isolation Terminal Control Specification

## Purpose

The Sovereign Isolation Terminal is a browser-local audit surface. It consolidates evidence already represented by current ScrollVerse routes and lets a visitor filter, inspect, copy, and export a local record. It does not transmit audit content, create provider access, change a branch, or activate a registrar, wallet, chain, media vault, payment flow, publication, or schedule.

## Audit record schema

| Field | Use |
|---|---|
| `id` | Stable local audit identifier. |
| `domain` | Evidence, build, accessibility, release, or external gate vector. |
| `title` | Human-readable control subject. |
| `state` | `AVAILABLE NOW`, `RESEARCH`, or `REQUIRES OWNER RELEASE`. |
| `source` | Current local route, document, or owner-supplied record that supports the entry. |
| `verified` | What is directly available in the browser-local portal. |
| `nextGate` | The exact missing condition before an external step can be considered. |
| `route` | A connected ScrollVerse route for deeper review. |

## Staged release checklist

| Gate | Browser-local meaning | External boundary |
|---|---|---|
| Source record | A source or local evidence route is identified. | Does not verify outside providers or files. |
| Build record | TypeScript and regression status are recorded for the milestone. | Does not alter a branch or deployment. |
| Accessibility record | An accessible description or interface path is present. | Does not certify every external format. |
| Owner release record | The matching lane has an exact source, destination, and owner-decision field. | Does not activate the destination. |
| Deployment state | Browser-local availability is distinguished from external release state. | Does not publish, upload, list, mint, or transfer. |

## Connected local records

The terminal connects to **Replay Readiness** for source filtering and local audits, **Creator Activation Dossier** for exact held-lane records, **Creator Source + Brand Registry** for public-source claim-candidate evidence, and **ScrollVerse Story Worlds** for the connected story-and-media system. These routes remain independent; a selection or export in the terminal cannot authorize a different route or external service.
