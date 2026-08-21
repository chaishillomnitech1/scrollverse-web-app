# Phase 674 — Homepage Presence Indicator Accuracy

## Change Record

The homepage header previously displayed an anonymous-window value as “active now.” Although the underlying implementation used a short-lived session mechanism, that wording could be read as a verified current-visitor count.

The header now renders a **browser-local session indicator**. It records only the opening time for the current browser tab/session in `sessionStorage` and shows either `just opened` or elapsed local session minutes.

## Operating Boundary

The indicator does not count visitors, identify a visitor, track an account, create a shared presence record, or claim an audience total. Closing the browser session ends the local indicator state.

## Validation Record

Focused regression coverage confirms that the indicator uses browser session storage, includes the no-visitor-count label, and does not call the former shared active/ping presence procedures.
