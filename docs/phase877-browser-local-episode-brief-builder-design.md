# Phase 877 — Browser-Local Episode Brief Builder Design

The **Episode Brief Builder** will provide a private, browser-local workspace for structuring an original ScrollVerse visual episode before production. It will use a stepped, accessible form rather than a generic dashboard. The design separates a creator’s narrative and visual intention from the required sound, rights, access, and release decisions.

| Interaction | Implemented behavior | Boundary |
| --- | --- | --- |
| Brief fields | The creator can add a title, purpose, narrative, duration, frame, style, sources, characters, sound, rights, accessibility, and release destination | Entries remain only in the browser session unless exported by the user |
| Completion signal | A live field-completion count marks which production gates still need information | Completion is preparation progress, not a production or rights approval |
| Release gate lens | The page groups required decisions into narrative, visual, sound, rights, accessibility, and delivery lanes | A completed form does not generate media, clear rights, or publish content |
| JSON export | The creator can download the entered brief as a local JSON file | The file is not uploaded to ScrollVerse, a provider, or a third party |
| Route handoffs | The page links back to the Cinematic Gateway, Sovereign Archive, and written production-intake record | Links provide source and planning context, not a release operation |

The visual language is a dark cinematic workbench with six colored gate columns and one persistent “local-only” status marker. All buttons should be keyboard reachable; form labels remain visible; and motion stays limited to responsive hover and state transitions.
