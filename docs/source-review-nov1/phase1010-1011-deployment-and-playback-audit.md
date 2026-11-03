# ScrollVerse Metadata-Only Shelf
## Deployment, Playback, and Inventory Audit

**Prepared:** 2026-11-02 02:20 EST  
**Project:** `scrollverse-portal`  
**Repository baseline:** `36c9895` — `feat(home): integrate phases 1010-1012 creator references`  
**Scope:** Phase 1010 motion-reference shelf, Phase 1011 creator-reference batch, and repository-wide video/iframe playback configuration  
**Execution boundary:** Local code and metadata review only. No supplied HTML, video, archive, or embedded source body was executed, rendered, extracted, transformed, uploaded, or treated as independently verified.

---

## 1. Executive summary

The homepage now contains a source-labeled Phase 1010 motion-reference shelf with **19 metadata cards** and a Phase 1011 batch with **three HTML source-receipt cards**. The shelf is deliberately metadata-only: cards expose filenames, provenance labels, fallback typography, and accession routing, but do not claim that the corresponding raw MP4 or HTML bytes are hosted or playable.

The dedicated Theater players are separate from the receipt shelf. They use visitor-controlled activation, `preload="none"`, visible controls, `playsInline`, posters, and an unload path. The Phase 1010/1011 shelf itself adds no autoplay behavior.

The repository-wide audit found several unrelated components that do explicitly request autoplay. These are called out below so the team can distinguish the safe metadata shelf from legacy or intentionally ambient media surfaces. This report does **not** change those components; it records the current state for an informed follow-up decision.

---

## 2. Deployment status and production boundary

### Verified local release state

| Item | Status | Evidence |
|---|---:|---|
| Phase 1010 motion shelf | Integrated | `client/src/pages/Home.tsx` |
| Phase 1011 creator-reference cards | Integrated | `client/src/pages/Home.tsx` and source-receipt registry |
| Metadata-only labels | Present | Visible `METADATA-ONLY SOURCE RECEIPT` language and source filenames |
| Direct accession routing | Present | Cards route to the Digitalship Accession Desk |
| Raw Phase 1010/1011 media bytes in current project | Not claimed | Only receipt metadata is present for the named batch |
| HTML source-body execution | Prohibited | Cards preserve source metadata without rendering or executing supplied HTML |
| Production checkpoint | `36c9895` | Managed WebDev checkpoint recorded for the verified metadata shelf |
| Public domain configuration | Present | `scrollverse.co`, `www.scrollverse.co`, and managed project domains are configured in project status |

### What was and was not deployed

The deployed presentation is a **metadata shelf**, not a binary-media publication. The homepage may identify a creator-supplied filename and provide an accession route, but it does not imply that the raw file is available at that route.

The separately hosted Theater records use known `/manus-storage/` MP4 and poster paths. Those are distinct from the Phase 1010/1011 receipt cards and should not be conflated with them.

### Visitor experience

Visitors receive:

1. A visible source filename and neutral reference label.
2. A typographic fallback instead of a broken or blank thumbnail.
3. A direct route to the local accession desk.
4. A clear separation between creator narrative and technical evidence.
5. No automatic media playback from the metadata shelf.

---

## 3. Phase 1010 inventory specification

Phase 1010 contains **19 stable, keyboard-reachable motion-reference cards**. The cards preserve exact filenames and avoid inventing duration, dimensions, codec, hosted URL, or visual-content claims.

### Filename inventory

- `video(29).mp4`
- `video(28).mp4`
- `video(27).mp4`
- `video(26).mp4`
- `video(25).mp4`
- `video(24).mp4`
- `video(23).mp4`
- `video(22).mp4`
- `video(21).mp4`
- `video(19).mp4`
- `video(18).mp4`
- `video(17).mp4`
- `video(16).mp4`
- `video(15).mp4`
- `882624278_1137936855357590_1709471996901120998_n.mp4`
- `873077734_2707400746443699_1752729865478908705_n.mp4`
- `874290506_4968869606732428_6941326134607094375_n.mp4`
- `877259154_1097818406405878_6667997333274932338_n.mp4`
- `media(35).mp4`

### Oct 30 receipt subset

The following five records are represented in the Oct 30 metadata manifest with byte counts, MIME guesses, and SHA-256 values:

| Filename | Bytes | MIME | SHA-256 |
|---|---:|---|---|
| `video(19).mp4` | 4,059,594 | `video/mp4` | `8b0cc4a583b50c34a4d84bcd9238479cd354e285cd1ac31990509a9b4836205f` |
| `video(18).mp4` | 4,058,893 | `video/mp4` | `4fc76fa9971255f8cb5b5e464d8ea262fab0c451913305c0e0c57c0356a9d1c9` |
| `video(17).mp4` | 6,952,751 | `video/mp4` | `e17dfd2779ff7955e8be0889839e38a12c93ae342529bead60251650392e0f71` |
| `video(16).mp4` | 9,054,925 | `video/mp4` | `c0c55f48ed2d225ace967394f7b9640d94d4bb01bb5806186793706bc9acf81c` |
| `video(15).mp4` | 13,993,454 | `video/mp4` | `da23860c6de0af3249b153e3c768ad0ec3b8ec23061371ed57a4f5401a1c27c2` |

These hashes are technical receipt evidence only. They do not independently verify authorship, rights, visual content, or public availability.

---

## 4. Phase 1011 inventory specification

Phase 1011 adds **three Nov 1 creator-supplied HTML reference records**:

1. `Scrollverse-Sovereign-Motion-Scenes.html`
2. `Black-Batman-Chronicles-Ep.html`
3. `Playable-Game-Ui-Sovereign.html`

Each is presented as a source-receipt card. The UI communicates that the HTML body remains outside the presentation layer and is not rendered or executed by the accession card.

### Phase 1011 interaction contract

- Source filename remains visible.
- Creator narrative remains separate from technical receipt data.
- No inline HTML execution occurs.
- No iframe is created for the supplied HTML records.
- No upload, publication, or external hosting is implied.
- The accession desk remains the next review route.

---

## 5. Repository-wide preload and autoplay audit

The following audit covers native `<video>` and `<iframe>` components found under `client/src`.

### A. Phase 1010/1011 and Theater surfaces — compliant

| Component | Media type | Current behavior | Assessment |
|---|---|---|---|
| `Home.tsx` motion-reference shelf | Metadata cards | No media element for receipt cards; click/accession routing only | Compliant with metadata-only boundary |
| `Home.tsx` Theater shelf | Native video | `controls`, `preload="none"`, poster, `playsInline`, no `autoPlay` | Compliant; visitor-controlled |
| `MetaAILegionArchive.tsx` | Native video | `controls`, `preload="none"`, poster, `playsInline`; mounted only after Play | Compliant; deliberate playback |
| `InvestorRelations.tsx` | Native video | `controls`, `preload="none"`, poster, error fallback | Compliant for lazy media loading |
| `SynchronizationVideoLibrary.tsx` | YouTube iframe | Loads only after an explicit “Load selected video” action; URL contains `autoplay=0` | Compliant; explicit activation |

### B. Native video components with explicit autoplay

| Component | Configuration observed | Risk / note |
|---|---|---|
| `AllversalEmpire.tsx` | `autoPlay`, `loop`, `muted`, `playsInline` | Ambient background motion; muted autoplay is still autoplay and should be labeled as such |
| `SovereignCinema.tsx` | Multiple videos with `autoPlay`; background loops are muted, one controlled film also autoplays | Highest review priority because one controlled player autoplays after render |
| `SovereignStoryArchive.tsx` | Native video has `controls autoPlay muted loop` | User-visible playback can begin without a Play action |

### C. Iframes that permit or request autoplay

| Component | Configuration observed | Assessment |
|---|---|---|
| `Home.tsx` YouTube/Facebook/Spotify embeds | `allow` strings include autoplay; YouTube iframe does not visibly request `autoplay=1` in the audited source | Permission is delegated to the embed; behavior depends on provider/player |
| `ChaisVideos.tsx` | `allow` includes autoplay | Provider may autoplay if the embed URL or provider state requests it |
| `Codex.tsx` | `allow` includes autoplay; no explicit `autoplay=1` observed in the URL | Permission-enabled, not necessarily requested |
| `JuniorMovies.tsx` | Two YouTube URLs explicitly contain `autoplay=1`; iframe `allow` also includes autoplay | Non-compliant with a strict no-autoplay standard |
| `RizzBurna.tsx` | YouTube URL explicitly contains `autoplay=1`; iframe `allow` includes autoplay | Non-compliant with a strict no-autoplay standard |
| `SovereignBroadcast.tsx`, `InfiniteNFT.tsx`, `MediaHub.tsx`, `Music.tsx`, `Shifter.tsx` | Spotify embeds use `allow="autoplay; ..."` and lazy loading in several components | Permission-enabled; provider may still require visitor action |
| `SovereignStoryArchive.tsx` | YouTube iframe has no explicit autoplay parameter in the audited tag | No autoplay request observed in source |

### D. Native video components without an autoplay request

| Component | Configuration observed | Assessment |
|---|---|---|
| `MediaReadinessLab.tsx` | `controls`, dynamic `src` | Visitor-controlled, but no explicit `preload="none"` |
| `SoulAltar.tsx` | `controls`, `playsInline` | Visitor-controlled; preload behavior defaults to browser choice |
| `ThinkSpace.tsx` | `controls`, dynamic `src` | Visitor-controlled; no explicit `preload="none"` |

### Findings

1. The Phase 1010/1011 shelf does not introduce autoplay.
2. Theater and receipt viewers use the strongest current pattern: mount on intent, `preload="none"`, controls, poster/fallback, and an unload path where applicable.
3. The repository is **not globally no-autoplay** because legacy/ambient surfaces explicitly use `autoPlay`, `autoplay=1`, or autoplay permissions.
4. If the team adopts a site-wide no-autoplay standard, the next safe change should be a separate phase that removes explicit autoplay requests from `JuniorMovies`, `RizzBurna`, `SovereignCinema`, `SovereignStoryArchive`, and `AllversalEmpire`, while preserving a user-initiated Play control.
5. `allow="autoplay"` is not identical to autoplay, but it grants the embedded provider permission. It should be retained only where the product intentionally supports provider playback and should be paired with explicit load-on-click behavior when strict control is required.

---

## 6. Accessibility and resilience review

The current Phase 1010/1011 pattern is designed for resilient discovery:

- Stable card structure prevents layout collapse.
- Text fallback prevents blank or broken-image states when source media is unavailable.
- Source filenames remain visible and searchable by sighted and keyboard users.
- Accession links are native links with visible focus treatment.
- Theater video elements expose controls and `aria-label` values.
- `playsInline` avoids forced fullscreen behavior on supported mobile browsers.
- `preload="none"` reduces unnecessary network work and preserves visitor choice.
- The metadata shelf does not rely on hover alone for access.

Recommended follow-up for a future global media-hardening phase:

- Add `preload="none"` consistently to `MediaReadinessLab.tsx`, `SoulAltar.tsx`, and `ThinkSpace.tsx`.
- Replace explicit autoplay URLs with `autoplay=0` or omit the parameter in `JuniorMovies.tsx` and `RizzBurna.tsx` when product intent permits.
- Convert background autoplay surfaces into an explicit “Play ambient motion” control for users who prefer reduced network or reduced motion.
- Verify `prefers-reduced-motion` behavior on every ambient video surface.

---

## 7. Verification evidence

The existing Phase 1010–1012 release gate recorded:

- Focused Phase 1010 + 1011 regressions: **4/4 passed**
- Full integration suite: **448 test files / 1,190 tests passed**
- Strict TypeScript: **passed**
- Guarded production build: **exit code 0**
- Build wall time: **19.467 seconds**
- Child user/system CPU time: **30.849s / 3.012s**
- Peak child RSS: **1,243,916 KB**
- Reusable skill validation: **passed**
- `git diff --check`: **passed**

A fresh focused rerun during this report preparation passed the available Phase 1010 and Phase 1011 tests: **2 test files / 4 tests passed**. The requested `phase1012.homepageVideoReceipts.test.ts` file was not present in the current checkout, so it was not counted as a test result.

The build retains the existing non-blocking warning for a React runtime chunk larger than 500 kB.

---

## 8. Team decisions requested

1. Keep the Phase 1010/1011 shelf metadata-only and separate from hosted Theater media.
2. Decide whether the site standard should be “no autoplay everywhere” or “autoplay only for clearly labeled ambient backgrounds.”
3. If adopting the stricter standard, create a new implementation phase for the legacy autoplay findings rather than modifying the verified shelf in place.
4. Do not present a filename receipt as proof that its raw MP4 or HTML body is hosted, playable, or independently verified.
5. Treat SHA-256, byte count, MIME guess, and source filename as technical receipt evidence; retain creator descriptions as narrative/source context.

**Bottom line:** Phase 1010–1011 is correctly integrated as a resilient, keyboard-accessible, metadata-only discovery layer. The remaining autoplay findings belong to separate legacy or provider-embed surfaces and are clearly isolated for future remediation.
