# Phase 433 — Bounded Synchronization Research Discovery Pipeline

**Date:** 2026-08-18 (EDT)  
**State:** Design only. No schedule, web crawl, subscription, notification, public post, provider action, or external account action is enabled by this record.

## Purpose

This design makes the requested “perpetual discovery” goal operationally useful without claiming to track every channel or video in existence. The system begins from the **owner-provided source seed set**, discovers additional **public** candidates through explicit relevance rules, records why each candidate entered the queue, and preserves creator framing, source link, claim status, and a correction path.

## Source seed and queue record

The initial seed set is the public YouTube channels, videos, posts, Spotify path, and other research sources previously provided by the owner. It can be expanded only with a visible source URL, creator/channel identity where available, discovery date, inclusion reason, and operating-state label.

| Queue field | Required content |
| --- | --- |
| Source URL | Canonical public URL or platform identifier |
| Creator context | Channel, creator, account, or publisher label as publicly visible |
| Discovery basis | Owner-provided, direct linked source, or rule-matched public candidate |
| Relevance rule | Named topic, channel relationship, creator-world lane, or source-reference relation |
| Claim status | Source-presented / independently unresolved / supported by direct record / corrected |
| Accessibility | Publicly accessible, unavailable, removed, age-restricted, or unclear |
| Portal lane | Synchronization Research, Source Study Library, Knowledge Library, production research, or excluded |
| Deduplication key | Canonical URL or platform content ID |
| Correction path | Current source URL plus date and action to update or remove a record |

## Inclusion and exclusion rules

An item may enter the research queue when it is owner-provided, directly linked by an existing source, or matched to a documented public topic or creator-world lane. Inclusion does not validate its claims, establish causation, imply endorsement, or authorize distribution.

The pipeline excludes private account content, paywalled or restricted material without lawful access, credentials, minors’ personal information, doxxing material, copied private conversations, and sources whose only function is to create an unsupported conclusion about a person or event.

## Three operation choices

| Option | Trigger and capability | Useful work | Requirements and cost | Safety boundary |
| --- | --- | --- | --- | --- |
| **A. Manual source review** | Owner or portal editor adds a source when needed | Highest editorial control; no background cost | No deployment or schedule; human time | No automatic discovery or provider action |
| **B. Project Heartbeat queue audit** | Periodic HTTP callback to `/api/scheduled/*` | Deduplicates and checks already stored queue records for missing fields, stale links, or correction requests | Requires deployed site, durable business row with `task_uid`, authenticated idempotent handler, 6-field UTC cron, and checkpoint/deploy before scheduling | Read-only audit of stored sources; no web search, posting, subscription, or provider change |
| **C. Agent research intake** | Fresh scheduled agent researches bounded public source rules and posts labeled candidates to a deployed callback | Web browsing, multi-step research, public source collection, and queue candidate drafting | Requires deployed callback, schedule prompt containing the seed/relevance rules, rate limits, an owner-controlled cost boundary, and a review path | No session history, source code, credentials, or direct provider access; no autonomous publishing, subscriptions, or external interaction |

## Why all channels cannot be a meaningful target

No schedule can accurately or responsibly enumerate “all channels in existence.” A usable system needs a public, bounded source universe and relevance rules. The highest-impact version is not the largest unfiltered feed; it is an auditable candidate queue whose source, reason, claim status, and correction history are readable.

## Schedule gate

No schedule may be created until all fields below are named and the site is successfully deployed:

| Required gate | Value needed before creation |
| --- | --- |
| Chosen operation | A, B, or C from the table above |
| Scope | Exact seed sources, public discovery rules, and exclusions |
| Cadence | Six-field UTC cron, at least 60 seconds apart; recommended stated review interval |
| Target | Deployed `/api/scheduled/<name>` callback only |
| Durable row | Queue or settings record with indexed `schedule_cron_task_uid` |
| Handler controls | Authenticated cron caller, lookup by `taskUid`, try/catch response, idempotency, 2-minute limit |
| Outputs | Candidate rows, audit log, or correction request only |
| Prohibited actions | No publication, subscriptions, comments, messages, provider controls, payment actions, trades, transfers, or account changes |
| Stop rule | Owner pause/delete path, error rule, and correction or rollback path |
| Confirmation | Direct owner confirmation of the named option, cadence, scope, outputs, and consequence |

## Deployment boundary

The managed ScrollVerse checkpoint conflict must be resolved before any project-connected schedule is created. A local development URL cannot receive a platform schedule callback. Until a successful managed checkpoint and deploy exist, Manual Source Review remains the only usable option.
