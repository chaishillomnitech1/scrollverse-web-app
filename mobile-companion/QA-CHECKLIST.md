# ScrollVerse Mobile Companion — Owner-Local QA Checklist

This checklist supports a **local device review** of the source-only Expo companion. It is intentionally separate from Apple App Store and Google Play publication. Completing this sheet does not select a store identity, create an account, sign a binary, upload a build, or submit a listing.

## Test environment record

| Field | Owner record |
| --- | --- |
| Reviewer | `____________________________` |
| Test date and local time | `____________________________` |
| Device and operating-system version | `____________________________` |
| Test method | `Expo Go / local simulator / other approved local method` |
| Source-kit commit or checkpoint | `26457cfa or later reviewed version` |
| Portal origin used for handoffs | `https://scrollverse.co` |

## Start the local review

From the repository root, run the commands below on the owner-controlled development machine. Use an approved local device or simulator only. Do not treat a local review as an app-store build, and do not share access credentials in this source kit.

```bash
cd mobile-companion
pnpm install
pnpm start
```

Open the development session using the locally available Expo workflow. The expected starting screen is the **Signal** tab. The app contains no checkout, wallet, account administration, background service, satellite/device command, store submission, or external release control.

## Functional route review

| Check | Expected result | Pass / notes |
| --- | --- | --- |
| Signal tab opens | A concise source-led entry to ScrollVerse signal and world pathways is readable. | `____________________________` |
| Omniland tab opens | Omniland and Cinematic Gateway choices are visible. | `____________________________` |
| Mirror tab opens | The creator-directed Mirror context and first-party handoff options are visible. | `____________________________` |
| Create tab opens | The browser-local episode-brief workbench handoff is visible. | `____________________________` |
| Sources tab opens | Connected Source Registry and Special Repository routes are visible. | `____________________________` |
| Every portal card activates | A tap gives a light native response and opens only the expected `scrollverse.co` path. | `____________________________` |
| Return path works | The device back action or browser return returns the reviewer to the companion as expected. | `____________________________` |
| Offline behavior is understood | Network-dependent portal destinations may not load; no fabricated status or cached release result is shown. | `____________________________` |

## Accessibility and content review

| Check | Expected result | Pass / notes |
| --- | --- | --- |
| Screen-reader labels | Each portal card announces its title and summary as a link. | `____________________________` |
| Touch targets | Each card is easy to activate without relying on a small icon target. | `____________________________` |
| Text readability | Titles, body copy, and accent labels remain legible at the device’s default text size. | `____________________________` |
| Orientation and safe areas | Content remains clear around notches, system bars, and the tab bar. | `____________________________` |
| Source labeling | Creator perspective, original work, public sources, and operational release status remain distinguishable. | `____________________________` |
| Respectful collaboration | The app’s language remains equal-footing, de-escalatory, and free of harassing or retaliatory prompts. | `____________________________` |

## Outcome and next decision

| Outcome | Next step |
| --- | --- |
| All checks pass | Preserve the completed owner-local review record. A separate explicit decision is still required before configuring store identity or signing. |
| A visual, navigation, or accessibility issue appears | Record the device, route, expected behavior, observed behavior, and a screenshot if approved; repair the source kit before repeating the affected check. |
| The app needs a new permission, SDK, account, payment flow, background behavior, or data collection | Stop and update the final privacy/data inventory before adding that capability. |
| The owner elects to begin store work | Provide the exact bundle/package identity, account/organization, final approved metadata/assets, privacy contact/policy, signing/testing approach, regions, and contemporaneous upload approval. |

> **Release boundary:** Local QA verifies the source kit’s user experience. It does not establish that an App Store or Google Play listing has been created, approved, or submitted.
