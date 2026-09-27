# Manus Support Case Brief — Annual Renewal and ScrollVerse Hosting Status

**Prepared:** 2026-09-27 06:20–06:25 EDT  
**Project:** `scrollverse-portal`  
**Project ID:** `XkJtdnvin6DhqjiCQ3fUyz`  
**Affected public domains:** `scrollverse.co`, `www.scrollverse.co`, `scrollport-xkjtdnvi.manus.space`

## Executive summary

The owner reports that the Manus annual subscription renewed on **September 25, 2026** and has supplied a Stripe-hosted invoice screenshot as payment evidence. Despite that evidence, all three public hostnames currently return the same Manus holding page stating **“Site unavailable due to unpaid billing.”** The local ScrollVerse portal remains preserved and its development environment is running normally. Please reconcile the payment record with the Manus account/project hosting entitlement, clear any stale unpaid-billing lock, and verify the custom-domain routing and deployment state.

This request is for account and hosting reconciliation by Manus Support. No billing, domain, payment, account-security, or external deployment change was performed by the local project workspace.

## Billing evidence supplied by the owner

The owner supplied `IMG_8946.PNG` on 2026-09-27. The visible Stripe-hosted page shows:

- Header/domain: `invoice.stripe.com`
- Merchant branding: **Manus AI**
- Status: **Invoice paid**
- Displayed amount: **$0.00**
- Invoice number: `DB44YKEC-0004`
- Payment date: **September 25, 2026**
- Available actions shown: **Download invoice** and **Download receipt**

The screenshot supports that the invoice page displayed a paid status on the stated date. The local workspace cannot independently verify the account email, subscription product, annual term, billing customer ID, entitlement propagation, or whether the displayed `$0.00` represents a renewal credit, adjustment, or other billing state. Please verify those details from Manus’s billing system.

## Current public-hosting symptom

Fresh probes were run on 2026-09-27. Each endpoint returned HTTP 200 at the transport level but served the same unavailable page:

| Hostname | Observed response | Interpretation |
|---|---|---|
| `https://scrollverse.co` | HTTP 200; page title `Site Unavailable`; body says `Site unavailable due to unpaid billing` | Hosting-layer holding page, not the ScrollVerse application |
| `https://www.scrollverse.co` | HTTP 200; page title `Site Unavailable`; same unpaid-billing message | Same hosting-layer state on `www` |
| `https://scrollport-xkjtdnvi.manus.space` | HTTP 200; page title `Site Unavailable`; same unpaid-billing message | Project subdomain also held by the same billing state |

The identical response across the apex domain, `www`, and the Manus project subdomain points to a shared hosting/account entitlement issue. It does **not** establish the cause of reports that some visitors may have seen different behavior; Support should inspect edge-cache, origin-routing, account-entitlement, and deployment logs for that question.

## Local deployment and preserved checkpoint status

A fresh local project-status check on 2026-09-27 reported:

- Development server: **running**
- Local port: `3000`
- Managed preview: `https://3000-iwfikni6ktsuy8ldwegn2-bd27f48a.us1.manus.computer`
- Project version/checkpoint: **`b6d5f8ac`**
- Dependencies: **OK**
- Language service: **No errors**
- TypeScript health: **No errors**
- Build-errors health check: **Not checked** in that status response
- Recent server log entries: authentication requests without a session cookie; no local dev-server failure was reported

The preserved `b6d5f8ac` checkpoint contains the source-led ScrollVerse portal and the latest Omniversal Source Ledger update. Earlier checkpoint history remains available in the project, including the Phase 905–906 blueprint checkpoint and subsequent corpus, source-ledger, and browser-local planning updates. The local Git working tree was whitespace-clean before the current SCCC UI refinement began.

## Safe local work completed while waiting

The SCCC and Global Dashboard UI was reviewed and refined locally:

- Replaced unqualified `LIVE` dashboard labels with explicit **authenticated view**, **read-only**, **ready**, **public RPC lookup**, and **source references** language.
- Added visible data-status panels explaining that database/RPC values are snapshots or references, not proof of custody, deployment, transaction, external hosting, or third-party system state.
- Added a clear statement that no wallet, token, payment, contract, or release action occurs through the dashboards.
- Retained the existing visual identity, responsive layout, route structure, and data pathways.
- No billing, wallet, token, contract, domain, repository, provider, or external deployment configuration was changed.

## Requested Support actions

1. **Reconcile payment and entitlement**
   - Locate invoice `DB44YKEC-0004`.
   - Confirm its customer/account association and status.
   - Confirm whether the September 25, 2026 renewal applies to the Manus workspace hosting `scrollverse-portal` / project ID `XkJtdnvin6DhqjiCQ3fUyz`.
   - Explain the displayed `$0.00` amount and confirm whether it represents a renewal credit or billing adjustment.

2. **Clear the stale hosting lock**
   - Refresh or repair the subscription-to-hosting entitlement if payment is valid.
   - Remove the unpaid-billing holding state from the project subdomain and mapped custom domains.
   - Confirm the effective renewal period and next billing date in the owner’s account.

3. **Verify domain and deployment routing**
   - Confirm mappings for `scrollverse.co`, `www.scrollverse.co`, and `scrollport-xkjtdnvi.manus.space`.
   - Confirm DNS, TLS, edge routing, origin selection, and the deployed checkpoint/version.
   - Confirm that the public origin is the preserved ScrollVerse portal rather than the generic holding page.

4. **Investigate inconsistent visitor reports**
   - Review edge-cache and origin logs around September 25–27, 2026.
   - Determine whether visitors could have received different responses because of propagation, cached holding pages, regional routing, authentication state, or account-entitlement timing.
   - Please provide the concrete cause and remediation rather than treating the issue as user error.

5. **Confirm restoration**
   - After remediation, verify all three hostnames from an external network and confirm the returned title, application content, and deploy version.
   - Provide the incident/reference number and the exact time the hosting entitlement was restored.

## Copy/paste message for Manus Support

> Hello Manus Support, I am the owner of the ScrollVerse project `scrollverse-portal` (project ID `XkJtdnvin6DhqjiCQ3fUyz`). My annual renewal is reported as completed on September 25, 2026. I am attaching a Stripe-hosted invoice screenshot showing Manus AI, “Invoice paid,” invoice `DB44YKEC-0004`, displayed amount `$0.00`, and payment date September 25, 2026.
>
> Despite this, `scrollverse.co`, `www.scrollverse.co`, and `scrollport-xkjtdnvi.manus.space` all currently return the same HTTP 200 holding page titled “Site Unavailable” with the message “Site unavailable due to unpaid billing.” Please reconcile the invoice with my Manus account and the hosting entitlement for this project, explain the `$0.00` renewal display, clear any stale unpaid-billing lock, and verify DNS/TLS/edge/origin routing for all three hostnames.
>
> The local project is healthy and preserved at checkpoint `b6d5f8ac`; its managed preview is running. Please also investigate whether edge caching, regional routing, or entitlement propagation could explain reports that some visitors saw different behavior. Please provide an incident number, root cause, remediation time, and confirmation that the custom domains now serve the ScrollVerse application.

## Information intentionally not included

- No account email, payment-card details, secret keys, session tokens, or private credentials.
- No assertion that the screenshot independently proves the annual subscription term; Support should verify that in the billing account.
- No request for the local agent to alter billing, domains, account security, payment methods, or external hosting configuration.
