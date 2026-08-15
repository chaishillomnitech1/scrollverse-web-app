# Phase 203 — Campaign and Architecture Master Directory

The Master Directory connects the consent-first campaign kit, Consortium gateway, Creator Media Packet, profile-parser planning model, and first-party evidence record. It makes readiness states visible without creating a hidden integration layer.

| Lane | Current state | Explicit boundary |
|---|---|---|
| Campaign kit | Empty contact template and review-ready drafts | No import, send, post, or CRM synchronization |
| Portal gateway | First-party routes live | No account, inbox, provider, repository, or wallet connection |
| Creator media | Browser-local planning live | No upload, delivery, sale, license, token, or public release |
| Profile parser | Planning only | No Action, token, webhook, API call, repository write, or automatic update |
| Evidence ledger | Versioned documentation and checkpoints | Not a blockchain, registration, ownership proof, or smart contract |

A future public-source parser must use named, bounded inputs, rate-aware review, and no-write defaults. GitHub documents resource-specific fine-grained permission scopes and REST rate limits; webhook processing requires separately secured signature validation.[1] [2] [3]

## References

[1] [GitHub Docs, *Permissions required for fine-grained personal access tokens*](https://docs.github.com/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens)

[2] [GitHub Docs, *Rate limits for the REST API*](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)

[3] [GitHub Docs, *Validating webhook deliveries*](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
