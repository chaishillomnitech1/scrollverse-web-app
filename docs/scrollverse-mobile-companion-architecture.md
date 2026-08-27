# ScrollVerse Mobile Companion — Architecture and Store-Readiness Package

## Product Decision

The current production portal remains the source-led web front door at `scrollverse.co`. The native companion should be a **separate Expo application**, not a direct conversion of the React/Vite portal. This separation preserves the stable public website and gives the mobile app its own tested native navigation, device behavior, application identifiers, privacy declarations, signing, and store-release lifecycle.

The initial native app should launch with five focused, first-party tabs: **Signal**, **Omniland**, **Mirror**, **Create**, and **Sources**. It should share the portal’s creator-owned design language and route visitors to the relevant live source records, while keeping any functionality that requires external accounts, payments, wallets, providers, or media release as an explicit next step rather than an implied native capability.

| Tab | Initial native experience | Existing ScrollVerse source | Scope boundary |
| --- | --- | --- | --- |
| Signal | Homepage-quality entry, Visual Signal selection, and mobile-first discovery cards | Visual Signal, Global Map, World Lens | Local visual response and navigation only; no environmental, technical, or hardware effect claim |
| Omniland | Original film, animation, comic, game, archive, and lookbook discovery | Omniland, Cinematic Gateway, Sovereign Archive | Creative world discovery, not a public media release catalog |
| Mirror | Creator-authored Chais Sabir Allah Mirror profile and first-party collaboration routes | Mirror, Digital DNA, AI Twin, Companion Hub, AI Legion | Creator-controlled guide; no autonomous physical, financial, or external-system authority |
| Create | Native presentation of the original visual-episode brief workflow and local export | Episode Brief Builder, production intake packet | Local preparation only; no media generation, rights clearance, or publication |
| Sources | Searchable source records, Special Repository entries, and direct external-link handoffs | Connected Source Registry, Special Repository, World Lens | Source visibility, not proof of an external source’s live operating state |

## Native Navigation and Data Boundary

The companion app should use Expo Router and native safe-area patterns. The first release can operate with a **source-first, low-data baseline**: it can display curated route metadata bundled with the application, open approved public ScrollVerse links, and keep the episode brief local to the device. Cross-device persistence, upload, account profile, notifications, analytics, chat history, payments, and external integrations should be excluded from version 1 unless their data inventory, consent, security, and store disclosures are explicitly implemented.

| Capability decision | Version 1 companion-app posture | Why |
| --- | --- | --- |
| Creator-world discovery | Include | First-party, public, and already proven in the web portal |
| Local episode brief draft | Include only with device-local storage and a clear export action | Preserves creator control and limits unnecessary collection |
| ScrollVerse account / OAuth | Defer unless a defined mobile account flow is selected | Adds identity, session, privacy, and review scope |
| File upload, camera, microphone, photo library | Exclude from version 1 | Adds permissions and sensitive-user-content disclosures |
| Push notifications | Exclude from version 1 | Avoids premature permission and notification-provider scope |
| Payments, wallets, tokens, contracts | Exclude from version 1 | Requires product-specific design, provider, financial, legal, and store-policy review |
| Live chat or server-side AI | Defer until the data, consent, safety, retention, and provider model is explicitly defined | Prevents unspecified user content from entering a production system |

## App Identity Proposal — Pending Owner Decision

| Store field | Proposed working value | Owner decision needed |
| --- | --- | --- |
| Public name | `ScrollVerse Trinity` | Confirm final customer-facing name and availability in the chosen stores |
| Subtitle / short description | `Creator worlds, source trails, and original visual discovery.` | Confirm final marketing wording |
| Package namespace | No value selected | Choose an available reverse-domain namespace that the owner controls |
| Primary category | Entertainment or Lifestyle | Select the category that best represents the first release’s actual functionality |
| Content rating | Not assessed | Complete each store’s age/content questionnaire from the final implemented features |
| Support URL | `https://scrollverse.co` | Confirm a public support route and contact method |
| Privacy-policy URL | Not yet selected | Publish a policy that exactly matches the native app’s implemented data behavior before submission |

## Exact Submission Packet

The following packet should be filled from the **final built app**, not from this design document. Apple requires product-page metadata and privacy information for the app and its third-party partners; Google Play requires a store listing, data safety declaration, and privacy policy, including applicable third-party SDK behavior.[1] [2] Native app releases also require a signed Android App Bundle (`.aab`) and iOS archive (`.ipa`), which can be uploaded through the store consoles or an approved delivery path such as EAS Submit.[3]

| Packet item | Apple App Store | Google Play | Owner-controlled release input |
| --- | --- | --- | --- |
| Developer account | App Store Connect account with the appropriate submission role | Play Console developer account with release permission | Confirm account/organization and intended submitter |
| App ID | Bundle identifier | Package name | Confirm exact identifiers before native project configuration |
| Signed production binary | `.ipa` | `.aab` | Approve each exact build for the selected testing or production track |
| Store listing | App name, subtitle, description, icon, screenshots, age rating, support URL, privacy policy, accessibility information | App name, short/long description, icon, screenshots, category, contact, privacy policy, content rating | Approve the finalized visual and written asset set |
| Privacy / data declaration | App privacy details, including third-party code practices | Data safety form, including third-party SDK data handling and security practices | Review against the actual version’s traffic, storage, and permissions |
| Testing | TestFlight feedback and review readiness | Internal, closed, or open testing track as appropriate | Confirm selected test group, feedback path, and progression decision |
| Submission / rollout | App Review submission after metadata and build selection | Draft/review/release track and region rollout selection | Confirm immediately before the irreversible submit, publish, or rollout action |

## If/Then Decision Record

| If the requested work is… | Then the approved next action is… |
| --- | --- |
| Native screens, local navigation, source cards, UI testing, browser-local/device-local draft tools, app architecture, metadata drafting, or accessibility planning | Build or document it in the companion project preparation scope |
| New app identifiers, developer account setup, app-store page creation, signed binary upload, TestFlight, Play testing track, listing submission, regional rollout, push provider, payment provider, wallet, or token integration | Pause for exact owner-controlled account, identifier, scope, current status, and release decision |
| A request to submit or publish | Show the owner the final packet and request confirmation immediately before the external action |

## References

[1]: https://developer.apple.com/app-store/submitting/ "Apple — Submit Your Apps and Games Today"
[2]: https://developer.apple.com/app-store/app-privacy-details/ "Apple — App Privacy Details on the App Store"
[3]: https://docs.expo.dev/deploy/submit-to-app-stores/ "Expo — Submit to App Stores"
[4]: https://support.google.com/googleplay/android-developer/answer/9859348?hl=en "Google Play Console Help — Prepare and Roll Out a Release"
[5]: https://support.google.com/googleplay/android-developer/answer/10787469?hl=en "Google Play Console Help — Provide Information for Google Play's Data Safety Section"
