# Chess Arena Memory

## 2026-08-14 — Initial Build Decisions

- The Chess Arena is an original ScrollVerse game experience, not a clone of a branded chess app or any copyrighted character/franchise interface.
- The playable core must run locally in the browser and remain useful without an external AI, payment, wallet, or account dependency.
- Voice is a readiness layer only: controls use an explicit user gesture, mutable caption state, mute, and browser-support messaging. No cloned voice, identity claim, or unreviewed text-to-speech service is introduced.
- The local opponent is described by its difficulty behavior, not marketed as superintelligent or guaranteed to be strong.
- The generated visual reference uses the project-managed storage URL recorded in `ASSETS.md`; it is not placed in the project tree.
