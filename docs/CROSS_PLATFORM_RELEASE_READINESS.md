# ScrollVerse Cross-Platform Release Readiness

ScrollVerse is currently delivered as a web portal with installable-web foundations. This document is a **release-planning record**, not a claim that the portal is listed, approved, or distributable through any native app store.

| Release requirement | Portal status | Required before native submission |
|---|---|---|
| Web manifest, service worker, and install prompt | Present | Test on target devices and retain evidence for the release bundle. |
| Accurate public routes and feature descriptions | Present in the Launchpad and Evidence & Standards routes | Compare every store listing claim, screenshot, and review note against the exact native build. |
| Support path | Release-planning page exists | Designate and actively monitor a publisher support channel. |
| Privacy materials | Public release-reference page exists | Complete platform-specific privacy disclosures based on the final build and enabled services. |
| Native binary, signing, and developer accounts | Not started | Create the native build pipeline under the authorized developer account; sign and test the build. |
| Store submission | Inactive | Obtain a final owner decision after all review materials, moderation controls, and policy requirements are satisfied. |

The Apple App Review Guidelines organize review concerns around safety, performance, business, design, and legal requirements, and require accurate metadata and accessible review materials. [1] Google Play requires a developer account and uses the Play Console for app details, contact information, policy declarations, signing, testing, and release management. [2] WCAG 2 is designed for web and mobile accessibility and organizes accessibility around perceivable, operable, understandable, and robust principles. [3]

## Submission Boundary

No native-store account, signing key, review credential, store listing, or submission has been created or sent by this repository work. Any such action is an external, owner-controlled operation and must be re-evaluated against the final build.

## Verification

The `/release-readiness` route was browser-verified in the development environment. It visibly renders the installable-web status, owner-action support and privacy gates, non-started signed-build and submission gates, and the release-planning boundary.

## References

[1] [Apple, App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

[2] [Google Play Console Help, Create and set up your app](https://support.google.com/googleplay/android-developer/answer/113469?hl=en)

[3] [W3C WAI, WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
