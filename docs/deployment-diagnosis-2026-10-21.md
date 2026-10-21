# Deployment diagnosis — 2026-10-21

## Result

The managed deployment failed before a new service was created. The platform reported:

> `create service ... failed: railway api errors: Deploys have been paused temporarily.`

The domain list was unchanged. This is a managed deployment-provider availability/state failure, not evidence of a local application build or route failure.

## Local production evidence

- `pnpm build` completed with the repository memory guard.
- `dist/index.js` exists and is 678,538 bytes in the checked build.
- `dist/public/index.html` exists, along with the built assets and `_redirects`.
- `NODE_ENV=production PORT=4174 node dist/index.js` started successfully.
- `/source-collections` returned HTTP 200.
- `/investor-relations` returned HTTP 200.
- Server initialization completed for OAuth, broadcast WebSocket, and OmniChess sockets.

## Disposition

No code fix was warranted from this evidence. Retrying repeatedly would not address a provider pause. The next publication attempt should wait until the managed deployment provider resumes, then rerun the supported publish flow. No external account, billing, DNS, repository, wallet, contract, payment, or hosting setting was changed during diagnosis.
