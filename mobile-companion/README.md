# ScrollVerse Mobile Companion — Source Kit

This is a **separate, source-only Expo starter** for the ScrollVerse Mobile Companion. It preserves [scrollverse.co](https://scrollverse.co) as the public source-led front door. The companion provides native Signal, Omniland, Mirror, Create, and Sources tabs that open first-party portal paths.

## Current scope

The source kit has native navigation, mobile-first screens, native press feedback, safe-area layouts, and first-party portal handoffs. It does **not** contain a store-bound iOS bundle identifier, Android package name, signing certificate, Apple App Store Connect record, Google Play Console record, store listing, data-safety declaration, privacy policy, signed binary, upload, or submission.

## Local development

```bash
cd mobile-companion
pnpm install
pnpm start
```

Use `pnpm android`, `pnpm ios`, or `pnpm web` for target development. Before adding features, retain a minimal data model and update the privacy, accessibility, and source-scope record.

## Store-release gate

Before a store-bound binary is configured, the owner must select exact identifiers, store account/organization, final metadata, approved icon/screenshots, support URL, privacy-policy URL, native data inventory, permissions, testing approach, target regions, and final release decision. See `../docs/scrollverse-app-store-owner-packet.md`.
