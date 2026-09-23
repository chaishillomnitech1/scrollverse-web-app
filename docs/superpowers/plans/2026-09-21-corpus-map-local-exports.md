# Corpus Map Filtering and Local Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible local-only switch between the 12 source-backed planning lenses and the 27-position chapter progression, with hover/focus summaries and formatted PDF/CSV downloads for the narrative-only planning routes.

**Architecture:** Keep all corpus data and exports browser-local. The Fluidity page will render a source-backed 12-lens view or a 27-position progression where unrecovered chapter titles remain explicitly pending rather than inferred. A shared client library will serialize source-labeled route data into CSV and format narrative-only PDF files with jsPDF; the Fluidity and New Dominion routes will call it without uploading, sharing, or publishing anything.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Vitest, jsPDF.

**Spec:** User request dated 2026-09-21: toggle between 12 planning lenses and a 27-chapter progression; add hover/focus summaries; export narrative-only planning routes as formatted PDF or CSV; package the workflow as a reusable skill.

## Global Constraints

- Keep exports browser-local; no request, upload, publication, account, rights, financial, or media-release action.
- Preserve the source review: the record supports a 27-chapter progression but only 12 displayed lenses have recovered prompt/clarification detail; remaining positions must be labeled title/details pending.
- Tooltips must work on hover and keyboard focus, and buttons must retain explicit accessible names and visible focus treatment.
- Produce standard PDF and CSV downloads, not a print dialog; keep both outputs source-labeled and narrative-only.
- Do not add or play creator-supplied media and do not infer unrecovered chapter titles.

---

### Task 1: Define and test the browser-local export contract

**Files:**
- Create: `client/src/lib/narrativeRouteExport.ts`
- Create: `server/phase907.narrativeRouteExport.test.ts`

**Interfaces:**
- Produces: `NarrativeRouteExport`, `createNarrativeRouteCsv(exportRecord)`, `downloadNarrativeRoutePdf(exportRecord, filename)`, and `downloadNarrativeRouteCsv(exportRecord, filename)`.
- Consumes: Plain strings and `{ number, title, status, summary }` items only; no source media URLs or external identifiers.

- [ ] **Step 1: Write the failing CSV contract test**

```ts
import { createNarrativeRouteCsv } from "../client/src/lib/narrativeRouteExport";

it("serializes source-labeled narrative records without external actions", () => {
  const csv = createNarrativeRouteCsv({
    title: "Example blueprint",
    route: "/example",
    scope: "Narrative-only; browser-local export.",
    sections: [{ number: 1, title: "First record", status: "source-backed", summary: "A bounded summary." }],
  });

  expect(csv).toContain("Narrative-only; browser-local export.");
  expect(csv).toContain("First record");
  expect(csv).not.toContain("http");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run server/phase907.narrativeRouteExport.test.ts`

Expected: FAIL because `narrativeRouteExport` does not yet exist.

- [ ] **Step 3: Implement the minimal shared serializer and download helpers**

```ts
export type NarrativeRouteExport = {
  title: string;
  route: string;
  scope: string;
  sections: Array<{ number: number; title: string; status: string; summary: string }>;
};

export function createNarrativeRouteCsv(record: NarrativeRouteExport): string {
  // Escape CSV cells, include the route/scope before rows, and return a browser-safe string.
}
```

Use jsPDF for a title, route, local-only boundary, and a paginated section list. Download from a `Blob` or jsPDF `.save()` call; do not send the record to a server.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run server/phase907.narrativeRouteExport.test.ts`

Expected: PASS.

### Task 2: Add source-aware corpus filter and accessible lens tooltips

**Files:**
- Modify: `client/src/pages/FluidityCorpusBlueprint.tsx:4-106`
- Modify: `server/phase905.fluidityCorpusBlueprint.test.ts:8-30`

**Interfaces:**
- Consumes: `NarrativeRouteExport` and local download helpers.
- Produces: Two native toggle buttons named “12 planning lenses” and “27-chapter progression”; each selected lens button exposes a quick summary by hover and focus.

- [ ] **Step 1: Write failing route contract assertions**

```ts
expect(page).toContain("12 planning lenses");
expect(page).toContain("27-chapter progression");
expect(page).toContain("Source title pending recovery");
expect(page).toContain('role="tooltip"');
expect(page).toContain("Download formatted PDF");
expect(page).toContain("Download CSV");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run server/phase905.fluidityCorpusBlueprint.test.ts`

Expected: FAIL because the filter controls, tooltip role, and download controls do not yet exist.

- [ ] **Step 3: Implement the filter and export controls**

Create `PLANNING_LENSES` with the current twelve fully described records. Construct the 27-position array from those records plus fifteen `Source title pending recovery` positions. Use `viewMode` state, native `button` controls with `aria-pressed`, and an `aria-live` status line. Render each lens as a `group` button with an associated `role="tooltip"` summary that becomes visible on hover or focus. Render the selected view in the PDF/CSV record.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run server/phase905.fluidityCorpusBlueprint.test.ts server/phase907.narrativeRouteExport.test.ts`

Expected: PASS.

### Task 3: Add matching narrative-only PDF/CSV export to New Dominion

**Files:**
- Modify: `client/src/pages/NewDominionStoryBlueprint.tsx:1-120`
- Modify: `server/phase906.newDominionStoryBlueprint.test.ts:8-31`

**Interfaces:**
- Consumes: `downloadNarrativeRoutePdf()` and `downloadNarrativeRouteCsv()` from the shared export library.
- Produces: Prominent “Download formatted PDF” and “Download CSV” buttons exporting only the four narrative acts and the existing local-only boundary.

- [ ] **Step 1: Write failing New Dominion export assertions**

```ts
expect(page).toContain("Download formatted PDF");
expect(page).toContain("Download CSV");
expect(page).toContain("Narrative-only route export");
expect(page).toContain("downloadNarrativeRoutePdf");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run server/phase906.newDominionStoryBlueprint.test.ts`

Expected: FAIL because the route currently has JSON-only local record export.

- [ ] **Step 3: Implement matching PDF/CSV controls and status announcement**

Build a four-act `NarrativeRouteExport` record directly from `ACTS`. Place the controls in the hero as an obvious narrative-only export panel. Preserve the existing JSON selection record only when it still captures user-entered notes; label it separately as a local working-record export.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run server/phase906.newDominionStoryBlueprint.test.ts server/phase907.narrativeRouteExport.test.ts`

Expected: PASS.

### Task 4: Package the repeatable workflow as a skill

**Files:**
- Create: `/home/ubuntu/skills/scrollverse-narrative-route-exports/SKILL.md`
- Create: `/home/ubuntu/skills/scrollverse-narrative-route-exports/references/export-contract.md`

**Interfaces:**
- Produces: A compact skill that triggers for source-labeled narrative route filters, tooltips, and browser-local PDF/CSV exports.
- Consumes: Existing source reviews and the shared `NarrativeRouteExport` schema.

- [ ] **Step 1: Initialize the skill**

Run: `python /home/ubuntu/skills/skill-creator/scripts/init_skill.py scrollverse-narrative-route-exports`

Expected: A generated skill directory under `/home/ubuntu/skills/`.

- [ ] **Step 2: Replace template content with a progressive-disclosure workflow**

Include: source-review first, filter definitions, tooltip accessibility rules, local-only PDF/CSV contract, test/visual checks, and boundaries against upload or publication. Put the exact record schema and CSV columns into the reference file.

- [ ] **Step 3: Validate the skill**

Run: `python /home/ubuntu/skills/skill-creator/scripts/quick_validate.py scrollverse-narrative-route-exports`

Expected: PASS.

### Task 5: Validate the feature and save the checkpoint

**Files:**
- Modify: `todo.md` only after all listed validations pass.

- [ ] **Step 1: Run focused tests and type-check**

Run: `pnpm vitest run server/phase905.fluidityCorpusBlueprint.test.ts server/phase906.newDominionStoryBlueprint.test.ts server/phase907.narrativeRouteExport.test.ts && npx tsc --noEmit`

Expected: PASS.

- [ ] **Step 2: Run complete validation**

Run: `pnpm test && pkill -f '/usr/lib/chromium/chromium' || true; NODE_OPTIONS=--max-old-space-size=1536 pnpm build && git diff --check`

Expected: PASS, no whitespace errors.

- [ ] **Step 3: Complete visual and interaction review**

Capture desktop and mobile screenshots of `/fluidity-corpus-blueprint` and `/new-dominion-story-blueprint`. Verify that both filter states render, hover/focus tooltip text appears, and PDF/CSV controls are visible. Use the browser download UI only to confirm a local download initiation; do not upload or share any file.

- [ ] **Step 4: Mark the tracker and save a checkpoint**

Add a completed Phase 907 tracker entry after verification. Save a descriptive WebDev checkpoint that describes the new browser-local filter/export capability and reiterates that no external publication occurred.

## Self-Review

- **Spec coverage:** Task 2 delivers both corpus views and tooltips. Tasks 1 and 3 deliver formatted PDF/CSV for both narrative-only routes. Task 4 packages the repeatable pattern as a validated skill. Task 5 covers focused/full tests, type-check, build, visual checks, tracker, and checkpoint.
- **Placeholder scan:** The implementation steps name exact files, interfaces, test strings, commands, and no deferred implementation markers.
- **Type consistency:** Both routes consume the single `NarrativeRouteExport` record shape from Task 1; the export helper is the only PDF/CSV implementation.
