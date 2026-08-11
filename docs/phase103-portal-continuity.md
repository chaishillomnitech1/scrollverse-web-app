# Phase 103 — Portal Continuity Map

## Purpose

Phase 103 reduces navigation friction across the public ScrollVerse by adding the `/journey` discovery map. It is intentionally a **public orientation layer**: it links to existing public routes while keeping reviewer records, asset evidence, payments, approvals, and scheduled governance controls outside the public navigator.

## Audit Snapshot

| Measure | Recorded result | Interpretation |
|---|---:|---|
| Registered routes | 254 | The router exposes a broad, multi-domain portal surface. |
| Page components | 252 | Page inventory is aligned with the route-first architecture, with shared or fallback routes accounting for the difference. |
| Vitest tests after Phase 103 | 44 | The navigator route and Home discovery shortcut are regression covered. |
| Public journey zones | 7 | Orientation is grouped by visitor intent rather than by implementation detail. |

## Journey Zones

| Zone | Visitor purpose | Public entry points |
|---|---|---|
| Begin the Journey | Orientation and Guardian entry | `/`, `/empire-index`, `/guardian-activation` |
| Learn Freely | Sacred history and research | `/seerah`, `/philosophers-archive`, `/mesopotamia-library` |
| Create & Share | Community publishing and media | `/think-space`, `/think-space/featured`, `/music` |
| Meet the Intelligence | AI guidance and collaboration | `/ai-legion-apex`, `/ai-council`, `/knick` |
| Fashion & Design | Original concept exploration | `/fashion-portfolio`, `/atlantis-collection`, `/fashion-empire` |
| Gather & Activate | Guardian and DC event pathway | `/dc-visit`, `/guardian-leaderboard`, `/guardian-dashboard` |
| Preserve the Record | Books, archive, and codex discovery | `/archive`, `/sovereign-books`, `/codex` |

## Governance Boundary

The journey map must never link directly to privileged management actions. Protected review data remains available only through administrator-gated routes, including `/admin/fashion-review`. Commerce activation remains independently controlled by the existing evidence, rights, approval, and provider-readiness gates.

## Maintenance Rule

When a major public experience is added, it should be evaluated for inclusion in `/journey` and the Home quick-access list. New protected operations should be documented in the relevant admin console but must not be added to the public journey map.
