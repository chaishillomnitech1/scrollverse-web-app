import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const pageSource = readFileSync(resolve(projectRoot, "client/src/pages/DirectFanCatalog.tsx"), "utf8");
const routerSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const musicSource = readFileSync(resolve(projectRoot, "client/src/pages/Music.tsx"), "utf8");
const productionDeskSource = readFileSync(resolve(projectRoot, "client/src/pages/CatalogProductionDesk.tsx"), "utf8");
const atlasSource = readFileSync(resolve(projectRoot, "client/src/pages/ScrollVerseAtlas.tsx"), "utf8");
const paymentOptionsSource = readFileSync(resolve(projectRoot, "client/src/pages/PaymentOptionsMap.tsx"), "utf8");
const shopifyReadinessSource = readFileSync(resolve(projectRoot, "client/src/pages/ShopifyStorefrontReadiness.tsx"), "utf8");
const shopifyScreenshotRecord = readFileSync(resolve(projectRoot, "docs/phase417-visible-shopify-setup-screenshot-record.md"), "utf8");
const storefrontVerification = readFileSync(resolve(projectRoot, "docs/phase418-public-shopify-storefront-destination-verification.md"), "utf8");
const premiumStorefrontSource = readFileSync(resolve(projectRoot, "client/src/pages/PremiumStorefrontProgram.tsx"), "utf8");
const tradingReadinessSource = readFileSync(resolve(projectRoot, "client/src/pages/TradingReadiness.tsx"), "utf8");
const productReleasePipelineSource = readFileSync(resolve(projectRoot, "client/src/pages/ProductReleasePipeline.tsx"), "utf8");
const activationRegisterSource = readFileSync(resolve(projectRoot, "client/src/pages/ActivationRegister.tsx"), "utf8");
const milestoneRoadmapSource = readFileSync(resolve(projectRoot, "client/src/pages/MilestoneRoadmap.tsx"), "utf8");

describe("Phase 371 — Direct-to-Fan Catalog", () => {
  it("registers the direct-to-fan catalog route", () => {
    expect(routerSource).toContain('path={"/direct-fan-catalog"}');
    expect(routerSource).toContain("DirectFanCatalog");
  });

  it("keeps music, free books, and master lookbook paths readable", () => {
    expect(pageSource).toContain("MUSIC CATALOG RECORDS");
    expect(pageSource).toContain("CHAIS X");
    expect(pageSource).toContain("FREE BOOKS AND EDITION PATHS");
    expect(pageSource).toContain("MASTER SHOPPABLE LOOKBOOK");
    expect(pageSource).toContain("The Book of the Journey");
  });

  it("fails closed for purchases and token actions while preserving release preparation", () => {
    expect(pageSource).toContain("No price, checkout, payment, token, wallet connection");
    expect(pageSource).toContain("ACTIVATION CHECKLIST");
    expect(pageSource).toContain("Copy browser-local release brief");
    expect(pageSource).toContain("test-mode checkout and delivery review");
  });

  it("adds direct discovery from Home and Music", () => {
    expect(homeSource).toContain('{ label: "Direct Catalog", href: "/direct-fan-catalog" }');
    expect(musicSource).toContain('href="/direct-fan-catalog"');
    expect(pageSource).toContain('href="/fashion-artifact-atlas"');
    expect(pageSource).toContain('href="/music-creator-release-readiness"');
  });

  it("presents creator-directed product, service, and capability lanes without activating commerce", () => {
    expect(pageSource).toContain("CREATOR-DIRECTED OFFERING PATHWAYS");
    expect(pageSource).toContain("PRODUCTS");
    expect(pageSource).toContain("SERVICES");
    expect(pageSource).toContain("CAPABILITIES");
    expect(pageSource).toContain("Open services navigator");
    expect(pageSource).toContain("Open creator studio");
  });

  it("explains smooth exchange and ethical commerce without attaching payment or fulfillment actions", () => {
    expect(pageSource).toContain("SMOOTH EXCHANGE STANDARD");
    expect(pageSource).toContain("Clear offers. Voluntary choice. Safe handling. Honest delivery.");
    expect(pageSource).toContain("Protect private information");
    expect(pageSource).toContain("they do not activate payment or fulfillment from this page");
  });

  it("presents Support Highways as optional public destinations with pending privacy-safe lanes", () => {
    expect(pageSource).toContain("SUPPORT HIGHWAYS");
    expect(pageSource).toContain("$chaisthegreat28");
    expect(pageSource).toContain("Open public Cash App destination");
    expect(pageSource).toContain("REQUIRES OWNER RELEASE");
    expect(pageSource).toContain("No private account data is displayed or collected.");
    expect(pageSource).toContain("trpc.supportHighways.getDestinations.useQuery()");
  });

  it("registers a reader-directed Catalog Production Desk with all locally indexed research records", () => {
    expect(routerSource).toContain('path={"/catalog-production-desk"}');
    expect(routerSource).toContain("CatalogProductionDesk");
    expect(productionDeskSource).toContain('useSovereignHeartbeat({ page: "catalog-production-desk" })');
    expect(productionDeskSource).toContain("TWELVE LOCALLY INDEXED RECORDS");
    expect(productionDeskSource).toContain("SV-CAT-001");
    expect(productionDeskSource).toContain("SV-CAT-012");
    expect(productionDeskSource).toContain("The Goat You Just Met");
    expect(productionDeskSource).toContain("no third-party team marks or likenesses");
  });

  it("connects the Catalog Production Desk from the Atlas and Direct-to-Fan Catalog without activating media or commerce", () => {
    expect(pageSource).toContain('href="/catalog-production-desk"');
    expect(pageSource).toContain("Open Catalog Production Desk");
    expect(atlasSource).toContain('href: "/catalog-production-desk"');
    expect(atlasSource).toContain("Catalog Production Desk");
    expect(productionDeskSource).toContain("does not play, download, publish, sell, distribute, mint");
    expect(productionDeskSource).toContain("This desk does not fetch, embed, or distribute external catalog media");
    expect(productionDeskSource).toContain("Copy browser-local research brief");
    expect(productionDeskSource).not.toMatch(/buy now|mint now|connect wallet/i);
  });

  it("maps visitor-choice payment destinations while preserving release-required provider and checkout lanes", () => {
    expect(routerSource).toContain('path={"/payment-options"}');
    expect(pageSource).toContain('href="/payment-options"');
    expect(pageSource).toContain("Open visitor-choice Payment Options Map");
    expect(paymentOptionsSource).toContain('useSovereignHeartbeat({ page: "payment-options-map" })');
    expect(paymentOptionsSource).toContain("VISITOR CHOICE · PUBLIC DESTINATIONS ONLY");
    expect(paymentOptionsSource).toContain("$chaisthegreat28");
    expect(paymentOptionsSource).toContain("REQUIRES OWNER RELEASE · PUBLIC DESTINATION");
    expect(paymentOptionsSource).toContain("does not process a payment");
    expect(paymentOptionsSource).toContain("does not decide whether a visitor should transact");
    expect(paymentOptionsSource).not.toMatch(/connect wallet|claim rewards|withdraw now/i);
  });

  it("prepares the Shopify storefront copy without claiming an active store, checkout, payout, or fulfillment route", () => {
    expect(routerSource).toContain('path={"/shopify-storefront-readiness"}');
    expect(pageSource).toContain('href="/shopify-storefront-readiness"');
    expect(paymentOptionsSource).toContain('href="/shopify-storefront-readiness"');
    expect(shopifyReadinessSource).toContain('useSovereignHeartbeat({ page: "shopify-storefront-readiness" })');
    expect(shopifyReadinessSource).toContain("SHOPIFY ADDRESS VERIFIED · VISITOR ACCESS PROTECTED");
    expect(shopifyReadinessSource).toContain("SCROLLVERSE SHOPIFY STOREFRONT COPY");
    expect(shopifyReadinessSource).toContain("COLLECTION-TO-RELEASE MAP");
    expect(shopifyReadinessSource).toContain("does not bind Shopify");
    expect(shopifyReadinessSource).toContain("Action-specific owner confirmation");
  });

  it("preserves the owner-supplied visible Shopify setup foundation without inferring a live transaction or payout", () => {
    expect(shopifyReadinessSource).toContain("VISIBLE SHOPIFY SETUP FOUNDATION");
    expect(shopifyReadinessSource).toContain("scrollverse-dev.myshopify.com");
    expect(shopifyReadinessSource).toContain("Shopify Payments and the Tap to Pay on iPhone setup step are visibly marked complete");
    expect(shopifyReadinessSource).toContain("Online store design, customer-domain choice, and shipping-rate or delivery configuration");
    expect(paymentOptionsSource).toContain("Owner-supplied Shopify screenshots show a connected primary");
    expect(paymentOptionsSource).toContain("Customer-facing design, public collection/product URLs, and item releases still need to be completed");
    expect(shopifyScreenshotRecord).toContain("scrollverse-dev.myshopify.com");
    expect(shopifyScreenshotRecord).toContain("does not itself show a completed provider transaction, sale, payout, or settlement");
  });

  it("routes visitors to the verified Shopify storefront address with its password-protected state labeled accurately", () => {
    expect(pageSource).toContain("SHOPIFY STORE FRONT · ADDRESS VERIFIED");
    expect(pageSource).toContain("https://scrollverse-dev.myshopify.com");
    expect(pageSource).toContain("Open Shopify address · password protected");
    expect(shopifyReadinessSource).toContain("SHOPIFY ADDRESS VERIFIED · VISITOR ACCESS PROTECTED");
    expect(shopifyReadinessSource).toContain("The public Shopify address is verified; visitor access is password protected");
    expect(shopifyReadinessSource).toContain("Open Shopify address · password protected");
    expect(storefrontVerification).toContain("Password protected at time of verification");
    expect(storefrontVerification).toContain("not yet an open public shopping destination");
  });

  it("adds the real premium storefront program as an evidence-led collection and release pathway", () => {
    expect(routerSource).toContain('path={"/premium-storefront-program"}');
    expect(premiumStorefrontSource).toContain('useSovereignHeartbeat({ page: "premium-storefront-program" })');
    expect(premiumStorefrontSource).toContain("A product page is a promise with a record behind it.");
    expect(premiumStorefrontSource).toContain("COLLECTION WORLDS");
    expect(premiumStorefrontSource).toContain("LOOKBOOK RELEASE ROOM");
    expect(premiumStorefrontSource).not.toMatch(/publish product now|open checkout now|activate payout now/i);
  });

  it("strengthens the real direct-to-fan release record with accessibility, market, and customer-term fields", () => {
    expect(pageSource).toContain("Research · source-linked");
    expect(pageSource).toContain("Accessible listening or reading description");
    expect(pageSource).toContain("Fulfillment, market scope, and support path");
    expect(pageSource).toContain("Refund or cancellation terms");
    expect(pageSource).toContain("separately released contract record");
  });

  it("registers an auditable paper-trading readiness route without a provider or live-order flow", () => {
    expect(routerSource).toContain('path={"/trading-readiness"}');
    expect(routerSource).toContain("TradingReadiness");
    expect(tradingReadinessSource).toContain('useSovereignHeartbeat({ page: "trading-readiness" })');
    expect(tradingReadinessSource).toContain("PAPER-TRADING READINESS · NO LIVE ORDER");
    expect(tradingReadinessSource).toContain("Build the controls");
    expect(tradingReadinessSource).toContain("A broad instruction never substitutes for an order-specific confirmation.");
    expect(tradingReadinessSource).not.toMatch(/fetch\(|walletconnect|exchange api key|place order/i);
  });

  it("registers a real original-brand Product Release Pipeline without creating provider-side commerce actions", () => {
    expect(routerSource).toContain('path={"/product-release-pipeline"}');
    expect(routerSource).toContain("ProductReleasePipeline");
    expect(premiumStorefrontSource).toContain('href="/product-release-pipeline"');
    expect(productReleasePipelineSource).toContain('useSovereignHeartbeat({ page: "product-release-pipeline" })');
    expect(productReleasePipelineSource).toContain("One source. One complete record. One honest destination.");
    expect(productReleasePipelineSource).toContain("DURABLE READINESS PATHS");
    expect(productReleasePipelineSource).toContain("No recurring job is enabled from this route.");
    expect(productReleasePipelineSource).toContain("Provider-side product, price, inventory, checkout, market, payment, fulfillment, payout, transfer, or schedule actions");
    expect(productReleasePipelineSource).not.toMatch(/publish product now|open checkout now|enable payout now|create inventory now/i);
  });

  it("registers a source-bound Activation Register with correction paths and no provider action", () => {
    expect(routerSource).toContain('path={"/activation-register"}');
    expect(routerSource).toContain("ActivationRegister");
    expect(productReleasePipelineSource).toContain('href="/activation-register"');
    expect(activationRegisterSource).toContain('useSovereignHeartbeat({ page: "activation-register" })');
    expect(activationRegisterSource).toContain("Every live choice needs a");
    expect(activationRegisterSource).toContain("PUBLISH-PORTAL-001");
    expect(activationRegisterSource).toContain("SHOPIFY-PRODUCT-001");
    expect(activationRegisterSource).toContain("TRADE-ORDER-001");
    expect(activationRegisterSource).toContain("A copied status message is a source, not a switch.");
    expect(activationRegisterSource).toContain("DIRECT CONFIRMATION FORMAT");
    expect(activationRegisterSource).not.toMatch(/place order|enable checkout|remove password now/i);
  });

  it("registers the reader-directed Milestone Roadmap across the home, Atlas, and release-control pathways", () => {
    expect(routerSource).toContain('path={"/milestone-roadmap"}');
    expect(routerSource).toContain("MilestoneRoadmap");
    expect(homeSource).toContain('href="/milestone-roadmap"');
    expect(homeSource).toContain("Milestone Roadmap");
    expect(atlasSource).toContain('href: "/milestone-roadmap"');
    expect(atlasSource).toContain("Open Milestone Roadmap");
    expect(milestoneRoadmapSource).toContain('useSovereignHeartbeat({ page: "milestone-roadmap" })');
    expect(milestoneRoadmapSource).toContain("THE CHOICEABLE RELEASE FRONTIER");
    expect(milestoneRoadmapSource).toContain("Delivery spine");
    expect(milestoneRoadmapSource).toContain("Visitor-choice spine");
    expect(milestoneRoadmapSource).toContain("Trading readiness");
    expect(milestoneRoadmapSource).toContain("Choiceable release");
    expect(milestoneRoadmapSource).toContain("Correction-capable interface");
    expect(milestoneRoadmapSource).toContain("I’m a Walking Solution.");
    expect(milestoneRoadmapSource).toContain("Influence is currency. Power without principle is poison.");
    expect(milestoneRoadmapSource).toContain("scrollverse-omni-manifesto");
    expect(milestoneRoadmapSource).not.toMatch(/remove a storefront password now|create a product now|enable checkout now|connect a broker now|place a live order now/i);
  });
});
