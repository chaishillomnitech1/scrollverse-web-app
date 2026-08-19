# Phase 527 — Privacy-Aware Live Activity Indicator

**Route:** homepage `/`  
**Operating state:** aggregate live activity display available now; no personal visitor identity, account, IP address, device identifier, revenue, conversion, or external analytics claim is displayed.

The homepage now shows an **“active now”** indicator backed by a lightweight server-side presence map. The browser creates a random session token stored in `sessionStorage`, sends a presence signal only while the page is visible, and refreshes it periodically. The server retains only the anonymous token and its most recent timestamp for a **75-second** activity window, pruning expired entries before it returns the aggregate count.

| Control | Implementation |
|---|---|
| Browser identifier | Random per-browser-session token; no name, account, IP address, or device data is used |
| Retention | Short-lived in-memory timestamp; stale tokens are pruned after 75 seconds |
| Display | Aggregate `N active now` plus an explicit anonymous 75-second-window label |
| Scope | Activity signal only; no unique-user, revenue, conversion, influence valuation, or external analytics verification claim |

On 2026-08-19, TypeScript completed without errors and the full regression suite completed with **157 test files / 524 tests passing**. Homepage browser inspection confirmed the indicator rendered with **“1 active now · anonymous 75s window.”**
