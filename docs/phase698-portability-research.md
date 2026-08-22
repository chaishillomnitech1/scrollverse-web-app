# Phase 698 — Portable Hosting Research

**Research state:** Official documentation reviewed on 2026-08-22.  
**Purpose:** Document portable deployment choices for ScrollVerse without creating an external hosting account, deploying code, changing DNS, or transferring domain control.

| Provider path | Direct official finding | ScrollVerse planning implication | Source |
|---|---|---|---|
| Vercel | Supports deployment by connected Git repository, upload, CLI, deploy hooks, and REST API; its deployment overview also documents local, preview, and production environments. | A future portability branch can use the existing GitHub repository with separate environment and route-parity validation. | [Vercel deployment documentation](https://vercel.com/docs/deployments) |
| Netlify | Documents Vite deployment, suggests a `dist` publish directory for Vite projects, and calls out an SPA rewrite requirement for client-side clean URLs. | A static/public archive must include its route fallback and be validated separately from server-dependent portal experiences. | [Netlify Vite documentation](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/) |
| Railway | Documents static-site GitHub deployment, custom domains, SSL, preview environments, and optional multi-region configuration. | A future managed deployment target can be evaluated after the owner selects a provider and validates project-specific environment, application, and data requirements. | [Railway static-hosting documentation](https://docs.railway.com/guides/static-hosting) |

## Current Project Interpretation

The active ScrollVerse project uses a React client with Express, tRPC, authentication, database, and other dynamic features. A public static archive is therefore a **selected browser-local route set** rather than a drop-in replacement for the whole portal. Any full migration requires a provider-specific deployment plan, secure environment configuration, database and authentication validation, route testing, and an explicit owner-controlled DNS decision.

The active project record is synchronized to the owner-controlled private GitHub repository `chaishillomnitech1/scrollverse-web-app`; `scrollverse.co` and `www.scrollverse.co` are active managed project domains at the Phase 698 research point. These observations describe the current project record only and do not create a new external provider deployment or registrar configuration.
