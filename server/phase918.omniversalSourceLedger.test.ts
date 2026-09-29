import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync("client/src/App.tsx", "utf8");
const accessionDesk = readFileSync("client/src/pages/DigitalshipAccessionDesk.tsx", "utf8");
const pagePath = "client/src/pages/OmniversalSourceLedger.tsx";

describe("Phase 918 — Omniversal Source Ledger", () => {
  it("adds a registered first-party ledger route and accession handoff", () => {
    expect(existsSync(pagePath)).toBe(true);

    const page = readFileSync(pagePath, "utf8");
    expect(app).toContain('const OmniversalSourceLedger = lazy(() => import("@/pages/OmniversalSourceLedger"))');
    expect(app).toContain('<Route path="/omniversal-source-ledger" component={OmniversalSourceLedger} />');
    expect(accessionDesk).toContain('href="/omniversal-source-ledger"');
    expect(page).toContain("OMNIVERSAL SOURCE LEDGER");
  });

  it("provides browser-local filtering and summary export without external operations", () => {
    const page = readFileSync(pagePath, "utf8");

    expect(page).toContain("Filter source ledger categories");
    expect(page).toContain("LEDGER_ENTRIES");
    expect(page).toContain("Download local ledger JSON");
    expect(page).toContain("No external source is opened, fetched, embedded, or changed here.");
    expect(page).toContain("No connector permission, account, payment, token, contract, or release action occurs here.");
    expect(page).toContain("a0edc63a344f4af980a53cf8104e256a6601bcc51c55714074b07ba1616b1f6d");
  });

  it("surfaces the two Phase 923 source receipts by planning category", () => {
    const page = readFileSync(pagePath, "utf8");

    expect(page).toContain("Phase 923 — New Creator Source Batch Receipt");
    expect(page).toContain("pasted_content_2.txt");
    expect(page).toContain("pasted_content_3.txt");
    expect(page).toContain("3c1d619df1e874d46907e35b6382580e009e6a3fd09b2b7b737fd2d589514d28");
    expect(page).toContain("e7646709af564b0dadb5f6bfea73193f088f9469728e3e9951cd36d201569f70");
    expect(page).toContain("Proposed marketplace and catalog");
    expect(page).toContain("Supplied technical examples");
    expect(page).toContain("Story-book and archive planning");
  });
});
