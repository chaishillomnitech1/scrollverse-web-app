import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 198 media and portfolio readiness audit", () => {
  it("registers a source-labeled readiness navigator with visible activation boundaries", () => {
    const page = read("client/src/pages/MediaPortfolioReadiness.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");

    expect(page).toContain("Media, portfolio, and on-chain learning");
    expect(page).toContain("PortalTrustLens");
    expect(page).toContain("This filter is browser-local and does not create a visitor record.");
    expect(page).toContain("Fail-closed: no wallet, mint, token issue, sale, custody, exchange, or transaction.");
    expect(page).toContain("Provider accounts, contracts, wallets, payments, publishing, and customer delivery require their own verified evidence and confirmation.");
    expect(app).toContain('import MediaPortfolioReadiness from "./pages/MediaPortfolioReadiness"');
    expect(app).toContain('<Route path="/media-portfolio-readiness" component={MediaPortfolioReadiness} />');
    expect(home).toContain('href: "/media-portfolio-readiness"');
  });
});
