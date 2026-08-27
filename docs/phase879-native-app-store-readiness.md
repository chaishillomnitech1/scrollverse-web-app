# Phase 879 — ScrollVerse Native App and Store Readiness

## Readiness Assessment

The current ScrollVerse project is a **React/Vite web portal** with an Express/tRPC server; it is not an Expo or other native mobile project. It has strong reusable product material—Digital DNA, Chais Sabir Allah Mirror, Omniland, Sovereign Archive, Visual Signal, World Lens, Global Map, source registry, and browser-local episode workbench—but it does not currently include a native-app manifest, package identifier, signing setup, app icon/splash asset set, native build pipeline, store listing, or store-developer account configuration.

The next practical architecture is a **separate Expo companion app** that uses the ScrollVerse web portal as its public source of record and launches a focused native experience for discovery, creator paths, browser-local production preparation, and account-aware first-party features. This preserves the live website while avoiding an untested conversion of the existing web codebase into a native binary.

| Readiness area | Current project state | Required for a store-bound native app |
| --- | --- | --- |
| Native application source | No Expo/React Native project currently present | Separate mobile project with an app configuration, native navigation, safe-area layouts, app icon/splash assets, and tested Android/iOS flows |
| Bundle / package identity | No established app identifier in the web project | Owner-approved iOS bundle identifier and Android package name before a store project is created |
| Privacy | Web portal has a source-aware posture, but no native-app privacy declaration | Data inventory covering the native build, all SDKs, login, analytics, uploads, maps, notification behavior, and browser-local features |
| Store assets | No store listing asset pack | App name, subtitle/short description, long description, categories, icon, screenshots, contact/support URL, privacy-policy URL, age rating, and accessibility statement |
| Testing | Responsive web visual review is available | Native-device testing, crash/console review, and Apple TestFlight / Google Play testing-track review before production |
| Store submission | No Apple or Google release is prepared | Owner-controlled developer accounts, signing, production binaries, listing data, privacy declarations, and final submission confirmation |

## Official Store Requirements Affecting ScrollVerse

Apple states that App Store submissions should use a current SDK and describes product-page inputs including an app name, icon, description, screenshots, previews, keywords, age rating, privacy details, and accessibility information.[1] Apple also requires developers to accurately disclose their own and third-party data practices, and to provide a publicly accessible privacy-policy URL.[2]

Google Play’s current guidance describes releases built from Android App Bundles or applicable APKs, testing tracks, app-signing setup, store listing, review preparation, pricing configuration, release notes, and production rollout controls.[3] Google Play also requires developers to complete a Data safety declaration and provide a privacy policy, with declarations covering their own and third-party SDK data handling.[4]

For a React Native companion, Expo documents a deployment path using a signed Android App Bundle (`.aab`) and signed iOS archive (`.ipa`). Its EAS Submit service can upload a valid signed binary from Windows or Linux, but an iOS upload becomes a TestFlight build rather than a production App Store release, while a new Android upload defaults to an internal testing track. Store listing content, screenshots, and a production release remain distinct decisions in the respective store consoles.[5] Expo also documents EAS Build as a way to manage native signing for a configured React Native project; this is an option to evaluate after the companion app’s identity and store account decisions are made.[6]

| Store | Required release inputs relevant to ScrollVerse | Hold point |
| --- | --- | --- |
| Apple App Store | App Store Connect access, app identifier, signed iOS build, product-page metadata, screenshots, age rating, privacy label, privacy-policy URL, review information, TestFlight evidence, and final review submission | Do not create or submit an App Store record without the owner’s exact developer-account and listing decision |
| Google Play | Play Console access, Android package name, signed Android App Bundle, Play App Signing, store listing, app-content declarations, Data safety form, privacy-policy URL, testing-track evidence, release notes, selected regions, and production rollout decision | Do not upload or start a rollout without the owner’s exact Play Console, package, signing, and release decision |
| Expo / EAS (optional build path) | Expo project ownership, native app configuration, defined package identifiers, signed build profile, and the appropriate Apple/Google account connection | Do not install or use submission automation until the owner has chosen EAS and explicitly approved the build and store-upload scope |

## Source-Led Companion App Screen Map

The mobile app can begin with a carefully scoped, high-value set of native screens rather than trying to reproduce every portal route at once.

| Mobile screen | First-party source relationship | Initial capability boundary |
| --- | --- | --- |
| Home / Signal | ScrollVerse front door and Visual Signal | Native navigation, creator-world discovery, and browser-local visual response; no scientific or external-system effects implied |
| Omniland | Omniland, Cinematic Gateway, and Source Atlas | Original story, film, comic, game, and archive discovery |
| Digital DNA + Mirror | Creator Digital DNA, Mirror, AI Twin, Companion Hub, and AI Legion | Creator-authored context and direct first-party guidance; no autonomous physical, financial, or external-system authority |
| Create | Episode Brief Builder and production-intake packet | Browser-local or device-local draft preparation; no automated media generation, storage, or publication until a future scoped feature is approved |
| Sources | Connected Source Registry, Special Repository, and World Lens | Source-labeled record browsing and direct external links with clear external state labels |

## If/Then Release Rule

| If the work is… | Then the next action is… |
| --- | --- |
| A first-party screen, navigation path, local draft tool, visual system, or source-record presentation | Build and validate it in the companion app project |
| A privacy, store-metadata, accessibility, or test artifact | Draft it from the implemented native behavior and review it against the store requirements |
| An App Store or Play Console creation, signed build, listing submission, payment, external login, analytics provider, notification provider, media publishing, or store rollout | Pause for the exact account, identifier, scope, current status, and final owner confirmation before acting |

## References

[1]: https://developer.apple.com/app-store/submitting/ "Apple — Submit Your Apps and Games Today"
[2]: https://developer.apple.com/app-store/app-privacy-details/ "Apple — App Privacy Details on the App Store"
[3]: https://support.google.com/googleplay/android-developer/answer/9859348?hl=en "Google Play Console Help — Prepare and Roll Out a Release"
[4]: https://support.google.com/googleplay/android-developer/answer/10787469?hl=en "Google Play Console Help — Provide Information for Google Play's Data Safety Section"
[5]: https://docs.expo.dev/deploy/submit-to-app-stores/ "Expo — Submit to App Stores"
[6]: https://docs.expo.dev/distribution/introduction/ "Expo — Distribution Overview"
