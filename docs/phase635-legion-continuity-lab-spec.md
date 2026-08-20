# Phase 635 — Legion Continuity Lab Specification

## Purpose

The Legion Continuity Lab is a browser-local workspace for preserving a task's portable context. It does not make a claim about digital consciousness or create an always-running agent. Its practical job is to keep source, goal, status, next step, correction context, and owner control together so a later collaborator can resume the work with less drift.

## Local continuity record

| Field | Browser-local purpose | Current behavior |
|---|---|---|
| Continuity ID | Stable label for a work thread | Included in local record and export. |
| Task goal | Human-readable objective | Read-only source context. |
| Source trail | Links or source labels supporting the work | Read-only source context. |
| Memory snapshot | Concise current state, decisions, and next step | Copy or JSON export only. |
| Handoff note | What another collaborator needs to continue safely | Browser-local editable draft. |
| Observation state | Review, ready, paused, or correction-needed label | Browser-local selector only. |
| Correction record | Local note of a needed revision and its source | Browser-local editable draft. |
| Pause/resume intent | Human-controlled expression of whether to continue | Browser-local selector only; it does not start or stop any process. |

## Future operating paths

| Approach | What it would do | Tradeoffs | Cost | Setup complexity |
|---|---|---|---|---|
| Periodic human-reviewed sessions | Run low-frequency, judgment-heavy reviews and preserve the result in the task record. | Flexible and rich judgment, but not continuous. | Varies with each review session. | Low. |
| Deterministic scheduled checks | Run rule-based checks at defined times and write results to an owned record. | Efficient for simple rules, but requires defined inputs and outputs. | Low operating cost after setup. | Moderate. |
| Persistent observation service | Keep a lightweight, always-available observer for timely deterministic events. | Fast response and durable monitoring, but needs an explicit operational design and hosting decision. | Usage-based when held online. | Higher. |

No operating path is enabled by this specification. External observation, account access, provider connections, background execution, and scheduling remain disabled until the owner chooses one path and provides its exact scope, trigger, destination, and activation decision.

## Protected private-archive preparation record

| Field | Browser-local purpose | Current behavior |
|---|---|---|
| Archive label | A proposed, owner-named private repository destination | Local draft only. |
| Intended contents | A concise allow-list of source manifests, release records, scripts, and evidence indexes | Local draft only; excludes credentials, private keys, account exports, and personal identity data. |
| Access boundary | The intended owner and collaborator access policy | Local draft only. |
| Provenance index | A list of source records and their file identifiers | Local draft only. |
| Repository creation gate | Repository name, owner, visibility confirmation, initial content list, and one exact creation decision | Required before any external repository action. |

The supplied activation templates are preserved as owner-provided reference material. Their historic test-count, credential, account-control, payment, wallet, token, and scheduling assertions are not adopted as current project state. The current implementation can carry their reusable browser-local audit, handoff, and activation-record ideas without exposing secrets or enabling external operations.
