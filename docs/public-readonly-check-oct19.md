# Read-only public reachability check — 2026-10-19

Checked without logging in, modifying, deploying, or publishing:

- `https://scrollverse.co/` — HTTP 200 from Cloudflare, but the response body contains `Site Unavailable` and `unpaid billing`.
- `https://www.scrollverse.co/` — HTTP 200 from Cloudflare, but the response body contains `Site Unavailable` and `unpaid billing`.
- `https://scrollport-xkjtdnvi.manus.space/` — HTTP 200 from Cloudflare, but the response body contains `Site Unavailable` and `unpaid billing`.

These observations establish the content returned by the public endpoints at check time. They do not establish account ownership, billing entitlement, visitor analytics, historical duration, selective access, or the reason for any account-level state beyond the response text itself. No external action was taken.
