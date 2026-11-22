# ScrollVerse homepage media restoration plan

## Evidence baseline

The current local audit found 597 image/video files in `/home/ubuntu/upload` (474 images, 123 videos) and 76 media files in `/home/ubuntu/webdev-static-assets` (73 images, 3 videos). A bounded comparison of the homepage source references produced 79 records: 60 matching local bytes, 45 named in `Home.tsx`, and 26 records that already have a managed-storage family or existing theater mapping to investigate. The full hashes and paths are recorded in [the local media inventory](./local-media-inventory.md).

The key distinction is technical, not interpretive: a file existing in the workspace is not automatically a browser-playable deployment URL. The current Phase 1013 and “newly supplied motion” cards show filename receipts and “Play when hosted” / play-like glyphs, but their corresponding upload bytes are outside the app bundle and have no browser source mapping. Those records must not present active-looking playback controls.

## Restoration contract

Every homepage media record will use a typed source contract:

- `AVAILABLE MEDIA`: a real image URL or video URL is connected. Images render with a stable frame and `OPEN`/detail action. Videos render as native `<video controls preload="none" playsInline>` with no `autoPlay` and a descriptive poster or resilient fallback.
- `SOURCE NEEDS HOSTED URL`: local bytes or a managed-storage candidate is known, but no safe browser URL is connected in the current project. Render a non-blank thumbnail/fallback, provenance, filename, and `OPEN RECORD` action. Do not render a `PLAY` button.
- `METADATA RECORD`: only the source receipt or filename is available. Render a clear `METADATA RECORD · MEDIA BYTES NOT CONNECTED` label, a typographic source card, and an `OPEN RECORD` action. Do not render an active-looking play glyph.

The homepage will continue to preserve the visual ScrollVerse identity: rose-gold/gold framing, emerald/violet energy, thumbnail-first composition, source labels, direct routes, and the existing payment pathways. This is a media wiring repair, not a redesign or route removal.

## Implementation slices

### Slice 1 — regression contract first

Add focused tests before changing the homepage:

1. A record without `video` has no `PLAY` control.
2. A record with a valid `video` source renders a visitor-controlled native player contract.
3. A missing poster falls back to a stable non-blank thumbnail/title composition.
4. Cards expose stable labels and keyboard-reachable detail actions.
5. The player contract contains `controls`, `preload="none"`, and `playsInline`, and does not contain autoplay.

Watch the tests fail against the current symbolic filename cards, then implement the smallest data-driven card renderer that passes them.

### Slice 2 — data-driven media shelf

Create a bounded homepage record list for the priority families named by the creator:

- hawk and pyramid visual references;
- theater promo and theater archive records;
- sneaker commercial and Café 88 references;
- Agent 25 / Sana clips;
- `video(15)` through `video(33)` where the exact file exists;
- `media(35)`;
- selected Meta Legion / theater thumbnails from the managed static asset family.

Do not copy the full `/home/ubuntu/upload` directory into `client/public` or the deployable bundle. Use existing managed `/manus-storage/...` sources where an exact project-managed URL is already recorded. Keep unresolved local-only bytes in the inventory and receipt shelf until a deployment-safe hosted URL is available.

### Slice 3 — honest card behavior

Replace the current placeholder-only motion cards with one shared card component. Its rendering rules are:

- real image source → image thumbnail, `OPEN` action, descriptive alt text;
- real video source → poster/image fallback plus native visitor-controlled player, `PLAY` is supplied by the browser controls rather than a fake button;
- no source → non-blank source receipt card with `OPEN RECORD`, never `PLAY`;
- all cards reserve their aspect ratio, lazy-load unselected images, preserve focus rings, and support reduced motion.

Keep HTML source receipts metadata-only. Do not execute or render supplied HTML bodies.

### Slice 4 — provenance and routes

Preserve each filename, SHA-256 receipt, collection/title derived only from existing metadata or filename, source label, and existing first-party route. Add a visible “local bytes observed; browser source not connected” note where applicable. Do not convert a hash into a rights, authenticity, publication, billing, or live-hosting claim.

### Slice 5 — verification and checkpoint

After each logical implementation slice:

- run the focused media regression;
- run full Vitest;
- run strict TypeScript;
- run the guarded memory-safe production build;
- run `git diff --check`;
- validate the reusable source-led skill;
- inspect desktop and mobile preview states, including a no-source card and a real theater player;
- update `todo.md` only with evidence;
- save an atomic checkpoint describing exactly what was wired and what remains external.

## External boundary

No external upload, publication, repository write, wallet, payment, contract, account, billing, or hosting mutation is part of this local restoration slice. The inherited read-only checks showed the custom domains and managed preview returning the Manus unpaid-billing holding page. That remains an external account/hosting issue and is routed to [Manus Help](https://help.manus.im); the code workspace cannot truthfully claim that custom-domain availability is restored.
