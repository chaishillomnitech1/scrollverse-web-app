# Phase 742 — Omniland Embodied Play & Accessibility Research Sources

The following public sources inform the browser-local Omniland Embodied Play & Accessibility Blueprint. They describe documented technical foundations and user-needs guidance; they do not verify any Omniland hardware, platform adapter, console certification, proprietary suit, licensing, safety program, performance level, or commercial release.

| Topic | Documented finding | Omniland research treatment |
|---|---|---|
| Hand-tracking data | Unity’s XR Hands documentation describes an API for hand-tracking data on supported devices, requiring a supporting provider plug-in; it describes joint and gesture-related data models. | Research input for optional hands-first interactions, not a promise of hardware support or implementation. [1] |
| Cross-runtime hand interaction | Magic Leap’s developer documentation explains OpenXR-based hand tracking, including aim, grip, pinch, and poke concepts on supported hardware. | Interaction vocabulary only; no Magic Leap, OpenXR, or third-party platform integration is active. [2] |
| Accessibility and control choice | W3C’s XR Accessibility User Requirements identifies multi-modal input/output, alternate mapping, motion-agnostic interaction, and the need not to force standing, motion-only, or manufacturer-locked controls. | Baseline design research for controllerless **and** controller-adaptive options, including keyboard, switch, voice, gesture, eye-tracking, visual, auditory, and tactile pathways. [3] |

> “A user should not have to be in a particular physical position such as standing or sitting to play a game or perform some action.” — W3C XR Accessibility User Requirements [3]

## Operating boundary

This research does not establish medical, accessibility, safety, certification, military, security, consumer-protection, licensing, performance, or partner-support claims. Every optional accessory, wearable, motion-capture flow, and platform edition remains a designed or owner-release-gated research path pending direct evidence, specialist review, and implementation validation.

## References

[1]: https://docs.unity3d.com/Packages/com.unity.xr.hands@1.1/manual/index.html "Unity XR Hands documentation"
[2]: https://developer-docs.magicleap.cloud/docs/guides/features/hand-tracking/hand-tracking-developer/ "Magic Leap Hand Tracking Developer Guide"
[3]: https://www.w3.org/TR/xaur/ "W3C XR Accessibility User Requirements"
