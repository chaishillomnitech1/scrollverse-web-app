# Phase 162 — Weekly Continuity Review

## Scope

The weekly continuity review is a project-level, authenticated scheduled check. It records a limited, non-transactional summary of the registered first-party route inventory and existing Revenue Operations readiness records. It does not inspect private files, log into user accounts, access a wallet, contact a provider, publish material, create external accounts, move funds, or initiate a release.

| Review element | Source | Recorded output | Boundary |
|---|---|---|---|
| First-party route inventory | Versioned handler route list | Route count and names | A listed route is not a browser availability guarantee or external-service status. |
| Tracker state | Existing Revenue Operations readiness records | Total, ready, awaiting-owner, blocked, and in-progress counts | The review does not change any readiness state. |
| Dependency summary | Versioned handler text | Explicit list of owner, source, provider, and external-action dependencies | The review does not resolve, bypass, or infer a dependency. |
| Owner notice | Existing owner-notification channel | Internal continuity notification | No third-party message or external call is created. |

## Idempotency and schedule

The handler uses the Monday date of the current UTC week as an idempotency key. A repeated delivery in the same week returns an `already-reviewed` response without producing another record or notice. The schedule is intended to run at **14:00 UTC every Monday** with the callback path `/api/scheduled/continuity-review`.

> The registered scheduled task is authenticated by the platform. The handler resolves its settings by the authenticated task UID, never by request-body input.

## Operational dependency

The scheduled task must be registered only after the deployed handler and settings record exist. Its task UID is stored in `continuity_review_settings.schedule_cron_task_uid`; this creates the binding used to reject unrelated or orphaned scheduled requests.
