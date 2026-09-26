# Omniversal Source Ledger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a registered first-party read-only source ledger that makes the Phase 917 creator text receipt legible, filterable, and locally exportable without opening external links, exposing media, or performing external actions.

**Architecture:** Create one static React route driven by a small typed in-page ledger array. Each ledger entry records a source category, planning treatment, and explicit boundary; a browser-local filter limits the visible entries. Export uses the existing browser-local narrative export helper and serializes only the ledger summary—not supplied source text, account links, or media.

**Tech Stack:** React 19, TypeScript, Wouter, Tailwind CSS, Vitest.

**Spec:** `docs/phase917-omniversal-synthesis-source-receipt.md`

## Global Constraints

- Use only a source-labeled, read-only planning surface; no external URL opening, embedding, fetching, connector change, upload, file access, media display, or publication.
- Do not reproduce source account URLs, tokens, wallet strings, payment details, or alleged external status as a live claim.
- Limit paths to registered first-party routes and browser-local download behavior.
- Preserve source, financial, account, rights, and release decisions as explicit future owner-controlled gates.
- Use a native text input and buttons with accessible labels, live result count, and visible keyboard focus behavior.

---

### Task 1: Define the source-ledger route contract

**Files:**
- Create: `server/phase918.omniversalSourceLedger.test.ts`
- Modify: `client/src/App.tsx`
- Modify: `client/src/pages/DigitalshipAccessionDesk.tsx`

**Interfaces:**
- Produces route path `/omniversal-source-ledger` registered in `App.tsx`.
- Produces a Digitalship Accession Desk handoff with link text `Open Omniversal Source Ledger →`.

- [ ] **Step 1: Write the failing test**

```ts
expect(app).toContain('const OmniversalSourceLedger = lazy(() => import("@/pages/OmniversalSourceLedger"))');
expect(app).toContain('<Route path="/omniversal-source-ledger" component={OmniversalSourceLedger} />');
expect(accessionDesk).toContain('href="/omniversal-source-ledger"');
expect(page).toContain('OMNIVERSAL SOURCE LEDGER');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run server/phase918.omniversalSourceLedger.test.ts`

Expected: FAIL because the source-ledger route and handoff do not exist.

- [ ] **Step 3: Write minimal implementation**

Create `client/src/pages/OmniversalSourceLedger.tsx`, add the lazy import and Wouter route, and add an internal handoff from the Accession Desk.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run server/phase918.omniversalSourceLedger.test.ts`

Expected: PASS.

### Task 2: Add read-only filters, export, and boundaries

**Files:**
- Modify: `client/src/pages/OmniversalSourceLedger.tsx`
- Modify: `server/phase918.omniversalSourceLedger.test.ts`

**Interfaces:**
- Produces `LEDGER_ENTRIES` with category, planning treatment, and boundary fields.
- Produces `ledgerFilter`, `matchingEntries`, and `aria-live` result count.
- Produces `Download local ledger JSON` through a Blob without network access.

- [ ] **Step 1: Extend the failing test**

```ts
expect(page).toContain('Filter source ledger categories');
expect(page).toContain('LEDGER_ENTRIES');
expect(page).toContain('Download local ledger JSON');
expect(page).toContain('No external source is opened, fetched, embedded, or changed here.');
expect(page).toContain('No connector permission, account, payment, token, contract, or release action occurs here.');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run server/phase918.omniversalSourceLedger.test.ts`

Expected: FAIL because filtering, download, and boundaries do not exist.

- [ ] **Step 3: Write minimal implementation**

Use a controlled native text filter to match category, title, planning treatment, and boundary. Build a JSON Blob from the visible ledger summary and set a local download filename. Include source receipt identifier and hash, but never the original supplied text.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run server/phase918.omniversalSourceLedger.test.ts && npx tsc --noEmit`

Expected: PASS.

### Task 3: Verify rendered behavior and regression safety

**Files:**
- Modify: `todo.md`

- [ ] **Step 1: Capture desktop and mobile screenshots**

Run screenshots for `/omniversal-source-ledger` at 1440×900 and 390×844. Confirm heading, live count, filter, entries, local export, Accession Desk exit, and boundary language are visible.

- [ ] **Step 2: Verify local download**

Use the rendered `Download local ledger JSON` button. Parse the downloaded JSON and confirm it contains a ledger record, source-receipt hash, and no external navigation action.

- [ ] **Step 3: Run full verification**

Run:

```bash
pnpm test
npx tsc --noEmit
pkill -f '/usr/lib/chromium/chromium' || true
NODE_OPTIONS=--max-old-space-size=1536 pnpm build
git diff --check
```

Expected: all tests, TypeScript, production build, and whitespace check pass.

- [ ] **Step 4: Update tracker and save checkpoint**

Mark only the completed Phase 918 items in `todo.md`, inspect the working tree, and save a checkpoint describing the browser-local source-ledger scope and preserved no-external-action boundaries.

## Self-Review

- **Spec coverage:** The plan covers source classification, exact boundaries, a planning relationship, local export, first-party navigation, filter accessibility, tests, visual review, and release verification.
- **Placeholder scan:** No implementation placeholders remain; the contract strings, route path, entry fields, and commands are explicit.
- **Type consistency:** `LEDGER_ENTRIES`, `ledgerFilter`, and `matchingEntries` are defined within the page; the route name is consistently `OmniversalSourceLedger` and the route path is consistently `/omniversal-source-ledger`.
