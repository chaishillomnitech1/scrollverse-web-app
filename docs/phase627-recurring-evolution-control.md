# Phase 627 — Story Worlds Recurring-Evolution Control

## Prepared control record

| Control | Prepared value | Current state |
|---|---|---|
| Proposed callback | `POST /api/scheduled/story-worlds-refresh` | **Not implemented or enabled.** |
| Intended scope | Read a source-approved Story Worlds update record and append an idempotent local refresh event. | Preparation only. |
| Prohibited scope | No web research, media generation, publication, social posting, provider connection, wallet, token, marketplace, payment, contract, or funds action. | Fixed boundary. |
| Identifier rule | A future callback must locate its business row using the authenticated scheduled task UID, never its request body. | Required for future implementation. |
| Deployment gate | The site must be published with the callback handler first. | Pending a new checkpoint. |
| Activation gate | An exact owner decision must identify the one source-approved recurring scope, cadence, and desired first run. | Awaiting owner record. |

## Future safe pattern

The correct future route is a platform-managed Heartbeat task with a six-field UTC cron expression and an idempotent `/api/scheduled/story-worlds-refresh` handler. It should record a local refresh event only after authenticating the cron caller and looking up a durable task UID. No in-process timer, browser timer, or autonomous background loop is used.

This is a **control record**, not a running schedule. It gives the project a safe design for a future owner-approved cadence after the published callback handler exists.
