# GitHub + Vercel Provider Evidence Adapters

**Implementation:** `server/integrations/provider-evidence.ts`  
**Read-only endpoint:** `executionEvidence.providerSnapshot`  
**Authorization:** administrator-only  
**Persistence:** none; evidence is returned as a live observation and is not written to Atlas automatically.

## GitHub adapter

The adapter performs GET requests only:
1. Repository metadata.
2. Commit metadata for the configured ref (default branch when omitted).
3. Check runs for the resolved commit SHA.

It returns repository visibility/default branch, commit SHA/URL/subject/date, and check-run totals (completed, successful, failed, pending). It never reads file contents, comments on pull requests, changes branches, merges, dispatches workflows, or changes repository settings.

Configure a dedicated, least-privilege read token as `GITHUB_READ_TOKEN`. The token must be stored in the deployment secret manager, never in source, client code, or chat. The optional `GITHUB_EVIDENCE_REPOSITORY` selects the repository; the default is `chaishillomnitech1/scrollverse-web-app`.

## Vercel adapter

The adapter performs a GET against the Vercel deployments API for one explicitly configured project and returns up to ten normalized deployment observations. It does not trigger builds, promote aliases, cancel deployments, edit environment variables, or change project settings.

Configure:
- `VERCEL_READ_TOKEN`: least-privilege token with read access to the selected project/deployments.
- `VERCEL_EVIDENCE_PROJECT_ID`: exact project ID.
- `VERCEL_TEAM_ID`: optional team scope.

The adapter preserves preview versus production target, provider ready state, deployment URL, commit SHA when present, observation timestamp, and a stable provider reference.

## Capability state rules

- Missing credentials/configuration → `NOT_CHECKED`; no provider request is made.
- Provider 401/403/404 or other non-success response → `UNAVAILABLE`.
- Successful read of the exact requested resource → `AUTHORIZED` for that read action only, with timestamp and evidence reference.

A read token does not imply write permission. A preview deployment never proves production verification. The API returns only normalized metadata and does not return credentials or raw provider response bodies.

## Runtime surface

`executionEvidence.providerSnapshot` is protected by the existing authenticated administrator role. It returns both providers in a `READ_ONLY` envelope. No public endpoint is added.

## Tests

`server/integrations/provider-evidence.test.ts` covers missing configuration, successful GitHub repository/commit/check reads, GitHub permission failure, missing Vercel project configuration, deployment normalization, and Vercel authorization failure. All tests use injected mock fetch implementations; no real provider credentials are needed.

## Database and Atlas boundary

These adapters do not depend on Atlas database readiness. They do not persist snapshots or create graph relationships. After the existing read-only database preflight confirms migration 0049, a separate reviewed writer can append normalized observations to the existing `evidence_ledger` and create DRAFT + PRIVATE Atlas records. The protected migration workflow remains separate and requires its explicit APPLY input plus the `atlas-production` environment protections.
