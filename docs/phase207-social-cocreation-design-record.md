# Research-Led Social Co-Creation Design Record

> **Design decision.** The ScrollVerse social co-creation prototype keeps drafts in the current browser session, exposes the difference between a proposal and an accepted update, and routes voluntary submissions to a separately protected workflow. It does not create public profiles, search people, rank visitors, infer compatibility, retain drafts, send messages, or automate moderation.

| Research pattern | Applied ScrollVerse pattern | Prototype limit |
| --- | --- | --- |
| Data minimization and transparency | A visitor drafts a proposal locally and is told what does and does not happen on the page. [1] | No browser-local draft is sent, retained, profiled, or exposed by the prototype. |
| Structured social contribution | An Idea Exchange brief captures what a person offers, seeks, values, and proposes. [2] | The fields organize the visitor’s own draft; they do not discover, score, rank, or match other people. |
| Published contribution norms | The Co-Creation Navigator describes contribution types, review states, prohibited material, and the protected handoff. [3] | A proposal does not become public content or a commitment without human review. |
| Respectful participation | The interface treats diverse contribution types as valid and requires respectful, rights-aware participation. [4] | No autonomous moderation, behavioral scoring, or surveillance is used. |
| Secure-by-design responsibility | The public prototype avoids collecting secrets and directs higher-risk activity to a separate protected flow. [5] | Protected flow capabilities still require owner-approved moderation, retention, permission, and incident-response design. |

## Implementation Boundaries

The first production-safe social layer is intentionally modest: browser-local drafting, copyable collaboration briefs, explicit source and readiness labels, and navigation to protected review. User accounts, profiles, direct messages, social feeds, notifications, searchable proposals, public contribution history, automated matching, and rankings are **not** implemented in this release.

## References

[1] [NIST Privacy Framework](https://www.nist.gov/privacy-framework)

[2] [W3C ActivityPub Recommendation](https://www.w3.org/TR/activitypub/)

[3] [GitHub Docs: Setting guidelines for repository contributors](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors)

[4] [Mozilla Community Participation Guidelines](https://www.mozilla.org/en-US/about/governance/policies/participation/)

[5] [CISA Secure by Design](https://www.cisa.gov/securebydesign)
