# Phase 879 — Mobile Companion Validation

## Verified Today

The new **ScrollVerse Mobile Companion** route at `/mobile-companion` is live in the web portal and was verified at both desktop and phone-sized viewports. It presents the source-led companion-app blueprint, working first-party handoffs to Signal, Omniland, Mirror, Create, and Sources, plus an accurate three-stage native-release gate.

| Validation item | Result | Scope |
| --- | --- | --- |
| Route registration | Passed | `/mobile-companion` is registered as a lazy-loaded public route |
| Homepage discovery | Passed | The production workbench beacon links to the Mobile Companion blueprint |
| Focused regression coverage | Passed | Phase 879 and Episode Brief Builder handoff assertions passed |
| Full regression suite | Passed | 352 test files and 960 tests passed |
| Production build | Passed | Memory-safe production build completed successfully |
| Desktop visual review | Passed | Companion screen layout, five path cards, and store-readiness sections rendered correctly |
| Phone visual review | Passed | Companion blueprint and discovery cards remained readable and usable at 375 × 812 |
| Expo source-kit typecheck | Passed | `pnpm check` completed with no TypeScript errors in `mobile-companion` |
| Android runtime bundle | Passed | Expo exported an Android Hermes bundle from the native source kit; this is a code-bundle validation, not a signed Android App Bundle or Google Play upload |
| Web runtime bundle | Passed | Expo exported a web bundle from the same source kit after adding the required `react-dom` and `react-native-web` runtime dependencies; this validates the source package, not a public web release |

## Native App and Store Submission Status

A separate source-only Expo companion kit is now present under `mobile-companion`, but no signed iOS archive, signed Android App Bundle, Apple App Store Connect record, Google Play Console record, store listing, privacy declaration, or store submission has been created. The current validation confirms the **web-facing companion blueprint and source-level native navigation**, not a released native binary.

| Native release gate | Current state | Exact next input |
| --- | --- | --- |
| Companion native workspace | Source-only Expo kit created and type-checked | Owner decision on the intended external repository or dedicated mobile-project location before store-bound work |
| iOS identity | Not selected | Owner-controlled bundle identifier and App Store Connect account/organization |
| Android identity | Not selected | Owner-controlled package name and Play Console account/organization |
| Store assets and metadata | Not finalized | Final app name, descriptions, screenshots, icon, support contact, and privacy-policy URL that match the native build |
| Privacy and data safety | Not assessable until native code and SDK decisions exist | Final data inventory for the actual app behavior and included SDKs |
| Signed build and testing | Android and web runtime bundles exported; no signed mobile binary or testing-track build | Exact Expo/EAS or alternative build decision, credentials/signing approach, testing group, and release target |
| Store submission | Not initiated | Final review of the complete owner submission packet and explicit confirmation at the time of upload/submission |

The owner packet now includes current official privacy, test-distribution, accessibility, final-binary, and store-decision fields. The next safe build step is to move the source-only kit into an owner-selected companion-app repository or dedicated project location, then define the package identities and signed-build approach. The live website remains independent and available throughout that work.
