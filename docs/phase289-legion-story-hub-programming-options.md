# Phase 289 — Legion Story Hub Programming Options

## Purpose

Digital Ships now offers browser-local story exploration and original guide roles. Any future recurring program or public-participation room must preserve creator control, age-aware participation, consent, moderation, accessibility, source records, and a clear correction route. No schedule, automated post, external AI connection, public reaction feed, voice provider, wallet, payment, contract, or distribution service is enabled by this document.

## Two Viable Programming Paths

| Visitor experience | How it runs | Advantages | Tradeoffs and gates |
|---|---|---|---|
| **Curated Story Sessions** | A creator-selected session prompt appears on a defined rhythm; contributors draft ideas locally and an owner reviews any item before it is published | Clear creative cadence, low moderation exposure, simple editorial control, and no need to keep a live room open | Before enabling: choose frequency, session owner, adult-support rules, prompt archive, moderation queue, access rules, and correction/contact path. A recurring run needs an explicit owner-selected schedule. |
| **Moderated Community Story Room** | Visitors can submit ideas to a review queue and later see approved, credited contributions in a shared room | Richer collaboration and a visible path from idea to approved contribution | Before enabling: authenticated roles, consent and terms, youth protection, review staff, response-time expectation, report/block controls, accessible submission format, retention rules, data handling, and an owner-controlled publishing workflow. A continuously available room needs persistent operations and a clear escalation path. |

> **Current state:** Neither option is active. Digital Ships remains a browser-local creative room that does not create accounts, accept submissions, store reactions, send messages, or publish visitor material.

## Shared Moderation and Consent Gates

| Gate | What must be defined before activation | Owner-control check |
|---|---|---|
| Participation | Whether users may only draft locally or may submit an item for review | The owner selects the participation model per program |
| Identity and age | Sign-in rule, adult-supported pathway for younger contributors, and any age-sensitive restrictions | No youth contribution is publicly surfaced without the selected safety process |
| Rights and credit | Submitter declaration, permitted-use scope, source/third-party-material review, attribution, and withdrawal path | The owner controls whether an accepted contribution is published, credited, or declined |
| Moderation | Review standards, prohibited content handling, reporting, appeals/corrections, and escalation contact | No automatic publishing from a prompt or queue |
| Accessibility | Text alternatives, captions/transcripts for media, keyboard interaction, contrast, reduced motion, and plain-language explanations | Each public contribution receives the access record appropriate to its format |
| Data and retention | What is stored, why, who can view it, how deletion/correction works, and how long it is retained | No public-facing collection begins without a documented data decision |
| Release | Approved title, source, credit, intended placement, publish date, and correction route | Every public item remains individually owner-controlled |

## Story Program Record

```text
Program title:
Session format: curated prompt / moderated community room
Frequency or availability window:
Editorial owner:
Audience and age guidance:
Participation choice: local draft / submit for review
Moderation reviewer(s):
Accessibility format:
Source and credit requirements:
Correction and withdrawal contact:
Publication rule: no automatic release
Owner activation decision:
```

## Future Technical Decision

The browser-local Digital Ships experience is already sufficient for private exploration. A recurring session or live community room needs a separate operational decision after the fields above are chosen. The first route is lighter and editorially controlled; the second offers deeper participation but requires durable moderation and availability commitments. The owner should select the intended cadence, audience, and participation model before any background or persistent operation is configured.

## Reference

[1]: `/home/ubuntu/skills/automation-and-scheduling/SKILL.md` — scheduling and automation assessment guidance, reviewed August 15, 2026.

[2]: `/home/ubuntu/skills/persistent-computing/SKILL.md` — persistent hosting and service-operation guidance, reviewed August 15, 2026.
