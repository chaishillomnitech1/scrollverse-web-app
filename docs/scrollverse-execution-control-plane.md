# ScrollVerse Execution Control Plane
## Additive architecture proposal and implementation charter

**Created:** 2026-11-10  
**Status:** Proposed architecture; not yet implemented as a running service  
**Repository:** `chaishillomnitech1/scrollverse-web-app`  
**Design rule:** Connect and activate the systems already built. Do not replace, flatten, or duplicate them.

---

## 1. What I would build

I would build an **Execution Control Plane**: a coordination layer that makes the existing ScrollVerse ecosystem easier to operate as one connected body of work.

It would not become another portal, another archive, another Atlas, or another dashboard competing with the current ones. It would sit across the existing systems and coordinate them.

Its job would be to answer, with evidence:

1. What are we trying to accomplish?
2. Which existing project, route, repository, source record, or service already owns the work?
3. Which specialist capability is best suited to the next action?
4. What can be executed safely now?
5. What requires the owner's approval?
6. What changed, where is the evidence, and what is the next dependency?

The Control Plane is an orchestration and observability layer—not a claim that every external service is continuously connected or that every AI tool is an autonomous agent.

## 2. Existing foundation it must connect

| Existing foundation | Control Plane responsibility |
| --- | --- |
| Source Collections and Accession Records | Resolve original source identity, version, access scope, and provenance before work begins |
| Atlas Core | Use existing entities, relationships, and evidence lineage as the canonical connection graph |
| Creator Atlas | Keep visitor orientation and creator pathways intact |
| Journey & Co-Creation Archive | Preserve historical context and co-creation records |
| Connected Systems Map | Extend the existing navigation layer; do not create a competing map |
| System Status | Reuse evidence-first health principles and distinguish unknown from failed |
| Omniland and Omniland Source Atlas | Route world, media, learning, and creator experiences back to their source records |
| GitHub repositories and Actions | Track implementation, ownership, review, commits, and automated validation |
| Existing Vercel integration | Report preview and production states separately and only from returned deployment evidence |
| DigitalOcean | Inventory and manage compute only after account state and permissions are reconciled |

The current OMNI integration evolution plan remains the broader ecosystem roadmap. This document defines the execution coordination layer that can make that roadmap operational.

## 3. Core architecture

### A. Work Registry

A work item is a durable reference to a goal, not a copy of the project itself.

Minimum fields:

- `work_id`: stable, immutable identifier.
- `title` and `goal`: human-readable intent and desired outcome.
- `project_id`: existing Atlas project/entity identifier where available.
- `source_refs[]`: exact conversation, file, repository, issue, route, or accession references.
- `owner_role`: accountable human or team role.
- `specialist_capabilities[]`: capabilities required to perform the work.
- `status`: proposed, ready, active, blocked, review, complete, or superseded.
- `created_at`, `updated_at`, and `history[]`: dated, append-only change history.
- `next_action`: one concrete action and its dependency.
- `acceptance_checks[]`: observable completion criteria.

The registry should reference Atlas and GitHub records instead of copying their entire content into a new database.

### B. Capability Registry

A capability is a tool or specialist skill that can perform a bounded class of work.

Each capability entry should declare:

- Capability ID and provider.
- Domain: source control, infrastructure, archive, design, research, commerce, finance, CRM, legal documents, or project operations.
- Supported read/write actions.
- Connection state: available in environment, authenticated, authorized for this action, unavailable, or not checked.
- Evidence timestamp and last successful check.
- Data sensitivity and approval requirements.
- Fallback capability, if one exists.

A listed connector is not automatically a connected account. A connected account is not automatically permission for every operation. A permission error is not proof that the underlying resource does not exist.

### C. Assignment and routing engine

Route work by the actual task, not by brand name or a fixed agent hierarchy.

| Work type | Primary capability | Supporting capability |
| --- | --- | --- |
| Code, tests, pull requests, repository history | GitHub / engineering | QA and documentation |
| Cloud compute, networking, deployment infrastructure | DigitalOcean | Security and operations |
| Original files, source exports, archive intake | Dropbox / Files | Provenance review |
| Knowledge graph, evidence links, entity resolution | Existing Atlas Core | Source/accession layer |
| Visual systems and interface handoff | Figma | Frontend engineering |
| Campaign graphics, publication layouts, creative assets | Canva | Content and brand review |
| Work ownership and execution tracking | ClickUp | Operations |
| Customer, partner, and lead records | HubSpot | CRM operations |
| Commerce catalog and storefront | Shopify / Wix | Product and content |
| Payments and accounting | Stripe / QuickBooks | Finance and reconciliation |
| Agreements and signed documents | Docusign / HoneyBook | Legal/operations review |
| Webinar-derived editorial content | Sequel | Editorial review |

TEAM 30 or another available role router can recommend primary and supporting specialties. The execution layer must still verify that the relevant connector is available and that its action is within scope.

### D. Evidence Ledger

Every meaningful action should produce a structured evidence record:

- Work ID and action ID.
- Actor/capability that performed it.
- Exact target: repository, branch, file, issue, service, or record.
- Before-state reference where applicable.
- Result and after-state reference.
- Commit SHA, workflow run ID, deployment ID, or provider receipt when returned.
- Timestamp.
- Validation outcome.
- Approval reference, if required.
- Limitations and unresolved observations.

Evidence states should be explicit:

`USER_REPORTED` → `SOURCE_LOCATED` → `INSPECTED` → `IMPLEMENTED` → `TESTED` → `CI_PASSED` → `PREVIEW_READY` → `PRODUCTION_VERIFIED` → `EXTERNALLY_CONFIRMED`

These are not automatic promotions. A state advances only when its own evidence exists. A failed or unavailable check is recorded as such; unknown must never be converted to healthy or zero.

### E. Approval and safety gate

The Control Plane should separate preparation from execution.

**Normally executable within an approved scope:**
- Read repository and file metadata.
- Search and inspect existing records.
- Draft plans, code, tests, and documentation.
- Create additive branches and reviewable pull requests.
- Run non-production checks.
- Produce source maps and evidence reports.

**Require explicit owner approval or the existing protected workflow:**
- Delete, overwrite, rename, or move source records.
- Change repository, file, or service visibility and access.
- Publish private material or send external communications.
- Run production database migrations or seeds.
- Deploy to production or change production secrets.
- Sign wallets, move funds, create financial obligations, or change financial settings.
- Provision paid infrastructure or incur new recurring costs.
- Execute irreversible legal, contractual, or account actions.

A broad instruction to build does not bypass a provider's permission model, platform restrictions, or protected release gates.

## 4. End-to-end execution loop

1. **Intake:** Capture the goal and preserve the user's original wording.
2. **Resolve:** Find existing work items, source records, routes, repositories, and prior decisions.
3. **De-duplicate by reference:** Reuse canonical IDs and link related work; never delete apparent duplicates automatically.
4. **Route:** Select primary and supporting capabilities by task fit and live availability.
5. **Scope:** Define allowed actions, exclusions, approvals, and completion checks.
6. **Prepare:** Create a reversible plan and identify dependencies.
7. **Execute:** Perform the smallest useful additive action; parallelize independent tasks.
8. **Validate:** Run relevant tests and verify provider-side results.
9. **Record:** Append evidence, timestamps, identifiers, and limitations to the existing source/evidence system.
10. **Continue:** Select the next dependency-ready action instead of ending with a generic plan.

Every cycle should produce a tangible artifact or a precise blocker.

## 5. Orchestration event contract

Use a provider-neutral event envelope so integrations can be replaced without losing history.

```json
{
  "event_id": "immutable-unique-id",
  "event_type": "work.action.completed",
  "occurred_at": "ISO-8601 timestamp",
  "work_id": "stable-work-id",
  "project_ref": {
    "system": "atlas",
    "id": "existing-project-id"
  },
  "actor": {
    "kind": "human-or-tool",
    "id": "capability-id"
  },
  "target": {
    "system": "github",
    "id": "owner/repository#pull-request"
  },
  "result": {
    "status": "success",
    "evidence_refs": ["commit-or-run-reference"]
  },
  "approval_ref": null,
  "limitations": []
}
```

This is a proposed contract, not a claim that an event bus or service already exists. Initial implementation can store append-only JSON records through existing source/evidence infrastructure; a separate event service is justified only when measured volume or reliability requires it.

## 6. Operating views

Extend existing pages and data sources rather than creating another portal.

### Connected Systems Map
Add a capability layer showing:
- What the system is responsible for.
- Whether its connector is merely available, authenticated, or verified for a specific action.
- The last evidence timestamp.
- Its owning workstream and fallback.

### System Status
Show:
- Current checks with evidence.
- Unknown or unprobed services as UNKNOWN / NOT CHECKED.
- Failed checks with their exact scope and timestamp.
- Preview deployment separately from production verification.
- No invented uptime, latency, balances, user counts, or operational percentages.

### Creator Atlas / Journey Archive
Expose the relevant project, source, and evidence paths without copying the underlying archive.

### Internal execution view
A future internal view should show:
- Ready / active / blocked work.
- Assigned specialist capabilities.
- Approval queue.
- CI and preview states.
- Evidence timeline.
- Next dependency-ready actions.

The internal view must not expose private records through public routes.

## 7. Delivery sequence

### Stage 1 — Make the existing foundation routable
- Map existing Atlas project IDs, source/accession references, GitHub repositories, issues, and routes.
- Define the Work Registry and Capability Registry schemas.
- Record live connector state with timestamps and permission boundaries.
- Deliver a read-only orchestration report.

**Done when:** a work item can be traced to its existing project and source records, and the recommended capability is justified by live availability.

### Stage 2 — Add the append-only execution ledger
- Define event validation and stable IDs.
- Record branch, commit, test, CI, preview, and approval evidence.
- Make retries idempotent.
- Preserve corrections as new events.

**Done when:** an action can be reconstructed from its source, actor, target, result, and evidence references.

### Stage 3 — Activate safe specialist workflows
- Automate read-only inventory and status checks.
- Create reviewable branches and pull requests for additive changes.
- Route design, archive, infrastructure, commerce, and operations work to their matching tools.
- Use bounded retries and clear failure states.

**Done when:** independent workstreams can progress without duplicated work or false success states.

### Stage 4 — Add owner-controlled approvals
- Present exact target, action, impact, cost, and rollback/recovery information.
- Require approval for protected operations.
- Record the approval and resulting provider evidence.

**Done when:** no protected action can be mistaken for ordinary preparation or silently executed.

### Stage 5 — Optimize the full ecosystem
- Measure cycle time, repeated work, blocked dependencies, validation failures, and evidence completeness.
- Improve routing using observed results, not marketing claims.
- Add connectors only when they remove a demonstrated bottleneck.
- Preserve portability and provider-independent records.

**Done when:** work moves from intent to verified result with fewer handoffs, less repeated effort, and a complete audit trail.

## 8. Success measures

Use measurable operational outcomes, not symbolic activity counts:

- Percentage of work items linked to original sources.
- Percentage of completed actions with provider-side evidence.
- Time from ready to first useful artifact.
- Time spent blocked by missing permissions or dependencies.
- Duplicate work detected before implementation.
- CI pass/fail rate by workflow and change type.
- Preview-to-production verification gap.
- Number of unknown integrations accurately labeled rather than assumed healthy.
- Percentage of protected actions with a recorded approval.
- Exportability of work, source, and evidence records without dependence on one provider.

Do not treat repository count, file count, token balances, estimated valuations, or automation count as proof of product maturity or external impact.

## 9. Immediate next build priorities

1. **Source-to-work resolver:** connect existing accession/source references to Atlas projects, GitHub issues, and relevant routes.
2. **Capability state adapter:** record connector availability and action-level access without exposing credentials.
3. **Execution evidence writer:** append commit, CI, preview, and approval references to the existing evidence layer.
4. **Internal work queue:** surface dependency-ready work and exact blockers, reusing current project navigation.
5. **Archive recovery workflow:** match provisional conversation-title candidates only against original exports, screenshots, or source records; retain every candidate and its resolution history.

These priorities are ordered by leverage: they make the existing ecosystem easier to operate before adding more standalone features.

## 10. Preservation and change policy

- This document adds a proposed coordination layer; it does not claim the layer is implemented.
- Existing repositories, routes, schemas, original conversation records, source files, and project language remain intact.
- Existing Atlas Core, Creator Atlas, Journey Archive, Connected Systems Map, System Status, Omniland, and source/accession components remain the owners of their established responsibilities.
- New records link to existing identifiers; they do not silently replace them.
- Every snapshot is dated. Every correction is appended with its reason.
- No publication, production migration, infrastructure spend, financial action, visibility change, or destructive operation is authorized by this architecture document.

---

## Append-only design record

- **2026-11-10 — Initial proposal:** Defined a provider-neutral Execution Control Plane to coordinate existing ScrollVerse systems, specialist connectors, evidence states, approval gates, and the end-to-end build loop. No application code, production service, database, external account, or infrastructure was changed by this proposal.
