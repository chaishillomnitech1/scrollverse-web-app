# Phase 446 — ScrollVerse Perspectives Recurring Operations Design

**Status:** Design only. No recurring task, automation, external publishing connection, storefront listing, email, payment, or promotion has been created.

## Operating principle

The recurring system should create **reviewable preparation**, not autonomous public claims or transactions. It can surface source candidates, draft original outlines, identify missing release records, and assemble a readiness brief. A person must still approve the finished manuscript, rights record, public destination, price if any, and exact release action.

> **Draft automatically only when it creates reviewable work. Publish only when a named work has a complete release record and an owner confirms the destination.**

## Viable operating options

| Approach | Tradeoffs | Cost | Setup complexity |
| --- | --- | --- | --- |
| **Owner-initiated Editorial Desk** | The owner opens the Perspectives route, selects a source lane, and generates or saves a browser-local draft brief. It gives the highest control and no background activity, but requires an intentional session for each brief. | No recurring-run cost. | Low; a local route and release packet. |
| **Scheduled Editorial Brief** | At a low, fixed frequency, a fresh research-and-writing session assembles one source-labeled draft proposal, source check, and missing-record list. It supports ongoing momentum but consumes task capacity/credits and must never publish automatically. | Varies with the selected run frequency and research depth. | Moderate; one schedule, self-contained prompt, and a defined review destination. |
| **Site-level Readiness Audit** | A deployed portal checks its own records on a fixed cadence and flags missing sources, broken links, or incomplete release packets. It is scalable and deterministic, but it needs a deployed route, durable data model, secure handler, and a management interface. | Low per run after setup; implementation effort required. | Higher; only after the managed publisher conflict is resolved and the route is deployed. |

## Recommended work boundaries for every run

| Stage | What can happen automatically | What cannot happen automatically |
| --- | --- | --- |
| Source discovery | Collect public candidate sources and produce links, organization, access label, date/context, and limitations | Claim rights, reproduce protected text, or decide the final interpretation |
| Original drafting | Produce a proposed outline, original commentary prompts, vocabulary notes, and source cards | Represent a proposal as a finished book, deliver a final authorial position without review, or copy restricted text |
| Readiness review | Identify missing rights, source, accessibility, delivery, price, support, or terms records | Publish, list, price, sell, invoice, send marketing, or change provider settings |
| Public release | Prepare the exact release packet and confirmation message | Push a manuscript, send an email, create a product, post to a social channel, or charge a visitor without a named owner release |

## Draft package produced by a controlled editorial run

Each run should produce one small, reviewable package rather than an unbounded manuscript:

1. **One source lane and question.** For example: a manuscript archive, an inventor record, an economic-history institution, or a comparative reading question.
2. **Three to six source cards.** Each card names its source organization, public URL, access state, and limitation.
3. **An original chapter or lesson proposal.** This includes a working title, reader question, outline, original commentary direction, and accessibility notes.
4. **A release-readiness checklist.** This shows what remains before free reading, a paid edition, a print edition, or an institutional license can be considered.
5. **A correction and review field.** The package remains `research` until a designated owner review changes its state.

## Schedule gate

A schedule is not appropriate until the following are true:

- The managed publisher conflict has been resolved and the relevant route is publicly deployed.
- The exact run purpose is selected: source research, original outline drafting, or deterministic readiness review.
- The delivery location is selected: browser-local record, project database, or owner review channel.
- The owner chooses the frequency, the source lanes included, the permissible writing depth, and the stop/pause condition.
- The workflow is explicitly limited to drafting and readiness; public release remains a separate named action.

## Publication gate

The exact public-release record must state: the book or lesson ID, final title, final manuscript version, source/rights record, accessibility assets, free or paid reading state, public destination, price and delivery terms if paid, support path, and an owner release. Without those fields, the item remains **requires owner release**.

## Current decision

The system is prepared to build the local Editorial Desk and a release-control route. No automatic schedule is selected or created in this record.

## Related records

- `docs/phase445-scrollverse-perspectives-imprint-standard.md`
- `docs/phase443-knowledge-commons-source-standard.md`
- `docs/phase444-knowledge-commons-initial-source-index.md`
- `docs/phase430-scrollverse-activation-register.md`
- `docs/phase412-delivery-resilience-managed-publication-recovery.md`
