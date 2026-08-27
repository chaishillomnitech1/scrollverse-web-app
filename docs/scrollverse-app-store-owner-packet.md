# ScrollVerse Native App — Owner Submission Packet

This packet is a **pre-submission decision record** for the separate, source-only ScrollVerse Expo companion. It prepares the factual inputs required before any Apple App Store Connect or Google Play Console action, signing, binary upload, test-track release, listing submission, or production rollout. Completing or storing this packet does **not** create an account, select an identifier, generate credentials, sign a binary, upload a build, or submit a listing.

## Current source-kit baseline

The current companion source kit has native Signal, Omniland, Mirror, Create, and Sources tabs, and opens labelled first-party `scrollverse.co` routes using the device browser. It has exported Android Hermes and web runtime bundles, but it intentionally has **no** store-bound iOS bundle identifier, Android package name, signed `.ipa`, signed `.aab`, EAS configuration, store account record, submission workflow, or release target. Accordingly, no privacy, accessibility, age, territory, or testing answer below is preselected.

> **Source-kit rule:** Treat every declaration as pending until it is checked against the exact final binary, its configuration, every included SDK, and the actual public support and privacy destinations.

## Owner and application identity

| Required decision | Apple App Store record | Google Play record | Owner value / approval |
| --- | --- | --- | --- |
| Account holder and organization | Exact App Store Connect team and authorized release role | Exact Play Console developer account and authorized release role | `________________________` |
| Application identity | Exact iOS bundle identifier | Exact Android package name | `________________________` |
| Public app identity | App name, subtitle, category, age rating, support contact | App name, category, contact email, content rating | `________________________` |
| Ownership and public links | Developer name, support URL, privacy-policy URL | Developer name, support URL, privacy-policy URL | `________________________` |
| Target regions and availability | Intended countries/regions and release timing | Intended countries/regions and release timing | `________________________` |

## Final-binary and configuration record

| Required decision | Owner record |
| --- | --- |
| Reviewed source commit or project version | `________________________` |
| Final iOS version and build number | `________________________` |
| Final Android version and version code | `________________________` |
| Chosen build path | `EAS Build / locally controlled native build / other approved path` |
| Signing decision and authorized holder | `________________________` |
| Final native permissions actually requested | `________________________` |
| Final SDK and dependency inventory, including version and provider disclosure links | `________________________` |
| Exact browser, portal, authentication, analytics, payment, media, notification, storage, or account behavior included in the final binary | `________________________` |

The current source kit should not be represented as a signed store binary. Expo describes a store upload as a signed Android `.aab` or iOS `.ipa`; an EAS submission is an upload route, not a substitute for this review record or store metadata completion. [4]

## Privacy, data safety, and browser handoff review

Apple requires privacy information for the app and any third-party partners whose code is integrated, and its product-page privacy policy link must be publicly accessible. [1] Google Play requires a Data safety declaration for published apps, including relevant third-party libraries or SDKs; even an app that collects no user data must still complete the form and provide a privacy-policy link when published outside an internal-only test. [3]

| Review question | Apple decision record | Google Play decision record | Owner value / approval |
| --- | --- | --- | --- |
| What data, if any, is transmitted off device by the final native binary? | Identify type, use, linkage, and tracking state | Identify collection/sharing and purpose | `________________________` |
| What data is transmitted or retained by included SDKs or third-party services? | Include each partner in the privacy inventory | Include each library/SDK in Data safety review | `________________________` |
| Does browser handoff open the general web or a controlled portal route? | Record the precise destination and any app-side data transmission | Record the precise destination and any app-side data transmission | `________________________` |
| Is data encrypted in transit where applicable? | Record factual implementation evidence | Record factual implementation evidence | `________________________` |
| Can a person request deletion, access, or support where data is retained? | Record a publicly usable process and URL | Record the actual available process and URL | `________________________` |
| Privacy-policy and privacy-choice URLs | Publicly accessible, final URLs | Publicly accessible, final URLs | `________________________` |

> **Do not prefill “no data collected.”** The current starter’s limited handoff code is not a final-binary privacy audit. The final answer must reflect actual app behavior, configuration, and every integrated SDK. [1] [3]

## Accessibility and content review

| Review area | Required owner evidence |
| --- | --- |
| Assistive technology | Device review notes for VoiceOver and TalkBack, including each tab and each portal-card label/hint |
| Text and contrast | Review at default and enlarged text settings; record clipping, reflow, contrast, and non-color cues |
| Motion, sound, captions, and audio description | Record what exists in the final app, what can be reduced or paused, and accessibility support for any future media |
| Safe areas and orientation | Record tested devices, OS versions, cutouts/system bars, and portrait/landscape behavior actually supported |
| Content and age rating | Complete the official rating/content answers against final media, interactions, account behavior, and links |
| Review instructions | Explain any review-only steps, test credentials, paywalls, browser handoffs, or unavailable features truthfully; leave blank when none apply |

Apple’s TestFlight guidance expects a beta description, specific features to test, and feedback contact before tester distribution. Its current App Store Connect materials also include accessibility evaluation and Accessibility Nutrition Labels among app-management areas. [2]

## Test distribution decision

| Test decision | Apple record | Google Play record | Owner value / approval |
| --- | --- | --- | --- |
| Pre-release test method | Local device/simulator record or TestFlight group | Local device/simulator record or internal/closed testing track | `________________________` |
| Test scope | Devices, OS versions, routes, accessibility checks, and known limitations | Devices, OS versions, routes, accessibility checks, and known limitations | `________________________` |
| Tester group and feedback contact | Exact authorized testers and feedback email | Exact authorized testers and feedback channel | `________________________` |
| Testing outcome | Pass, issue list, remediation owner, and repeat-test result | Pass, issue list, remediation owner, and repeat-test result | `________________________` |
| Go/no-go decision | `Do not upload / submit to TestFlight / other approved action` | `Do not upload / draft / internal test / other approved action` | `________________________` |

## Store page and release decision

| Required decision | Apple App Store | Google Play | Owner value / approval |
| --- | --- | --- | --- |
| Final icon, screenshots, and previews | Approved asset set and localizations | Approved asset set and localizations | `________________________` |
| Store copy | Subtitle, promotional text, full description, keywords, release notes | Short description, full description, release notes | `________________________` |
| Price, ads, purchases, subscriptions, and payments | Exact live behavior with no implied features | Exact live behavior with no implied features | `________________________` |
| Submission target | Draft, TestFlight, or App Review | Draft, internal test, closed/open test, or production | `________________________` |
| Specific action to authorize | Exact account, binary, version, destination, and intended consequence | Exact account, binary, version, track, and intended consequence | `________________________` |

> **Final-release rule:** A store action may occur only when every field matches the final built native app, all required privacy and content declarations are complete, the owner identifies the exact account and binary, and the owner explicitly confirms the specific upload, test, review, or rollout action at that time. A local source export and this packet are preparation records only.

## References

[1] [Apple, “App privacy details on the App Store.”](https://developer.apple.com/app-store/app-privacy-details/)

[2] [Apple, “TestFlight Overview.”](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)

[3] [Google Play Console Help, “Provide information for Google Play’s Data safety section.”](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)

[4] [Expo, “Submit to app stores.”](https://docs.expo.dev/deploy/submit-to-app-stores/)
