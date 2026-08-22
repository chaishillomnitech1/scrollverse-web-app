import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 755 — unified capital and asset readiness network", () => {
  it("registers the Capital Readiness Center and connects its core financial pathways", () => {
    const app = read("client/src/App.tsx");
    const hub = read("client/src/pages/CapitalReadinessHub.tsx");
    expect(app).toContain('path="/capital-readiness" component={CapitalReadinessHub}');
    for (const route of ["/sovereign-bank", "/financial-activation-readiness", "/commerce-financial-readiness-board", "/exchange", "/exchange/stocks"]) expect(hub).toContain(route);
    expect(hub).toContain("CAPABILITY ACTIVATION FRAMEWORK");
    expect(hub).toContain("No ambiguity about what is working, what is prepared, and what needs verification.");
  });

  it("keeps the Wall Street desk educational and separate from trading or investment execution", () => {
    const page = read("client/src/pages/ExchangeStocks.tsx");
    expect(page).toContain("WALL STREET RESEARCH · NO EXECUTION");
    expect(page).toContain("It is designed for analytical clarity—not stock recommendations, live prices, signals, orders, or brokerage activity.");
    expect(page).toContain("not a broker, trading platform, price feed, investment adviser");
    expect(page).not.toContain("BUY NVDA");
    expect(page).not.toContain("STRONG BUY");
  });

  it("keeps the market exploration route connected to the capital-readiness framework", () => {
    const market = read("client/src/pages/Exchange.tsx");
    expect(market).toContain("/capital-readiness");
    expect(market).toContain("MARKET INTELLIGENCE & EXCHANGE READINESS");
  });

  it("replaces simulated revenue performance with source-led revenue operations readiness", () => {
    const revenue = read("client/src/pages/Revenue.tsx");
    const dashboard = read("client/src/pages/RevenueDashboard.tsx");
    expect(revenue).toContain("REVENUE MODEL & FUNDING READINESS");
    expect(revenue).toContain("does not display simulated revenue, performance projections, treasury balances");
    expect(dashboard).toContain("REVENUE OPERATIONS READINESS");
    expect(dashboard).toContain("It contains no simulated balances, transactions, transfers, or automated distributions.");
    expect(dashboard).toContain("AgapeCycle 88% treasury / 12% Zakat concept");
  });
});
