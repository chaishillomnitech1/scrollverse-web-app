import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("Living Journey Experience", () => {
  it("keeps the Living Journey as a free all-directions route with Islamic, archive, Story Studio, and family pathways", () => {
    const journey = read("client/src/pages/LivingJourneyExperience.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");

    expect(app).toContain('path={"/living-journey-experience"}');
    expect(journey).toContain("FREE · ALL DIRECTIONS · NO GATE");
    expect(journey).toContain("Open the Seerah");
    expect(journey).toContain("Open the 99 Names");
    expect(journey).toContain("Ethiopian Bible & Geʽez Manuscripts");
    expect(journey).toContain("Dead Sea Scrolls");
    expect(journey).toContain("Gilgamesh & Sumerian Records");
    expect(journey).toContain("Vatican Library Records");
    expect(journey).toContain("LIVING JOURNEY STORY STUDIO");
    expect(journey).toContain("FAMILY LEGACY · OWNER-STATED HISTORY");
    expect(home).toContain("https://sovereignhub-mo62pcrx.manus.space/");
    expect(home).toContain("Sovereign Hub");
    expect(home).toContain('target="_blank"');
  });

  it("separates original production, tokenization readiness, and release evidence from active financial or wallet actions", () => {
    const journey = read("client/src/pages/LivingJourneyExperience.tsx");
    const architecture = read("docs/phase382-story-studio-tokenization-readiness-architecture.md");

    expect(journey).toContain("A book, archive, film, or lived experience can spark a new ScrollVerse work.");
    expect(journey).toContain("Free · exchange · trade · later release");
    expect(journey).toContain("IMMUTABLE-STYLE EVIDENCE TRAIL");
    expect(architecture).toContain("Ready for owner tokenization decision");
    expect(architecture).toContain("does not itself publish media");
    expect(architecture).toContain("does not call an asset tokenized merely because it is cataloged");
    expect(journey).not.toMatch(/mint now|buy now|connect wallet/i);
  });

  it("keeps the Ultimate Choice learning pathway free, source-labeled, and cross-linked from the Book and Methodology", () => {
    const book = read("client/src/pages/BookOfTheJourney.tsx");
    const methodology = read("client/src/pages/SovereignMethodology.tsx");
    const openRecord = read("client/src/pages/OpenRecordContinuum.tsx");
    const contribution = read("client/src/pages/SovereignContributionExchange.tsx");
    const pathway = read("client/src/components/UltimateChoicePathway.tsx");

    expect(book).toContain("UltimateChoicePathway");
    expect(methodology).toContain("UltimateChoicePathway");
    expect(openRecord).toContain("UltimateChoicePathway");
    expect(contribution).toContain("UltimateChoicePathway");
    expect(pathway).toContain("Change it");
    expect(pathway).toContain("Accept it");
    expect(pathway).toContain("Remove yourself");
    expect(pathway).toContain("Suffer through");
    expect(pathway).toContain("35,000 decisions a day");
    expect(pathway).toContain("Open Record Continuum");
    expect(pathway).not.toMatch(/mint now|buy now|connect wallet/i);
  });
});

describe("Portal route registry refresh", () => {
  it("uses a cron-authenticated, idempotent internal metadata refresh and never treats it as external publishing", () => {
    const registry = read("server/portalRouteRegistry.ts");
    const handler = read("server/scheduled/portalRouteRefresh.ts");
    const router = read("server/routers/portalRouteRegistry.ts");
    const server = read("server/_core/index.ts");

    expect(registry).toContain("PORTAL_ROUTE_DEFINITIONS");
    expect(registry).toContain("does not publish content");
    expect(handler).toContain('error: "cron-only"');
    expect(handler).toContain('skipped: "already-refreshed"');
    expect(router).toContain("createHeartbeatJob");
    expect(router).toContain("/api/scheduled/portal-route-refresh");
    expect(server).toContain('app.post("/api/scheduled/portal-route-refresh", portalRouteRefreshHandler)');
  });
});

describe("Open record boundary", () => {
  it("keeps the owner-stated platform observation distinct from visible build records and platform credit verification", () => {
    const observation = read("docs/phase384-owner-stated-platform-observation-build-record.md");

    expect(observation).toContain("owner-stated observation");
    expect(observation).toContain("not a measurement, audit, explanation, or verification of platform credit behavior");
    expect(observation).toContain("Concrete build record in the same work period");
    expect(observation).toContain("Interpretation | Left to the reader or visitor");
  });
});

describe("Reader-directed accomplishments archive", () => {
  it("presents the owner-authored record, local operating states, and connected directions without forcing a visitor conclusion", () => {
    const archive = read("client/src/pages/AccomplishmentsArchive.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");

    expect(app).toContain('path={"/accomplishments-archive"}');
    expect(home).toContain('href="/accomplishments-archive"');
    expect(home).toContain("Accomplishments Archive");
    expect(archive).toContain("THE SCROLLVERSE ACCOMPLISHMENTS ARCHIVE");
    expect(archive).toContain("OWNER-AUTHORED RECORD · READER-DIRECTED");
    expect(archive).toContain("THE CORRELATION MAP");
    expect(archive).toContain("Reader-Directed Accomplishments Archive");
    expect(archive).toContain("The journey is written into the work");
    expect(archive).toContain("Faith, learning, and study stay in the center");
    expect(archive).toContain("The sound, the image, and the story move together");
    expect(archive).toContain("The record leaves room for choice");
    expect(archive).toContain("External or future state");
    expect(archive).not.toMatch(/mint now|buy now|connect wallet/i);
  });
});

describe("ScrollVerse Atlas and Shopify readiness", () => {
  it("registers the Atlas as a free, reader-directed central discovery route from the front page", () => {
    const atlas = read("client/src/pages/ScrollVerseAtlas.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");

    expect(app).toContain('path={"/scrollverse-atlas"}');
    expect(home).toContain('href="/scrollverse-atlas"');
    expect(home).toContain("Open the ScrollVerse Atlas");
    expect(atlas).toContain('useSovereignHeartbeat({ page: "scrollverse-atlas" })');
    expect(atlas).toContain("PortalTrustLens");
    expect(atlas).toContain("FREE · READER-DIRECTED · ALL DIRECTIONS");
    expect(atlas).toContain("I’m a Walking Solution.");
    expect(atlas).toContain("Influence is currency. Power without principle is poison.");
    expect(atlas).toContain("Faith & free learning");
    expect(atlas).toContain("Music, media & Story Studio");
    expect(atlas).toContain("Family, research & methodology");
    expect(atlas).toContain("Community & creator choice");
    expect(atlas).toContain("https://sovereignhub-mo62pcrx.manus.space/");
    expect(atlas).toContain("https://github.com/chaishillomnitech1/scrollverse-omni-manifesto");
    expect(atlas).toContain('href: "/product-release-pipeline"');
    expect(atlas).toContain("Product Release Pipeline");
    expect(atlas).not.toMatch(/mint now|buy now|connect wallet/i);
  });

  it("keeps the Shopify path source-labeled and release-gated instead of representing a password-protected store or financial action as active", () => {
    const catalog = read("client/src/pages/DirectFanCatalog.tsx");
    const architecture = read("docs/phase404-shopify-storefront-copy-and-scheduling-architecture.md");
    const intake = read("docs/phase405-protected-cross-link-intake-pasted-content-100.md");

    expect(catalog).toContain("SHOPIFY STORE FRONT · ADDRESS VERIFIED");
    expect(catalog).toContain("The verified public `scrollverse-dev.myshopify.com` address reaches a Shopify password screen.");
    expect(catalog).toContain("Open Shopify address · password protected");
    expect(catalog).toContain("requires owner release");
    expect(architecture).toContain("separate Stripe-free portal copy");
    expect(architecture).toContain("does not create a store, product, inventory record, checkout, payment, payout");
    expect(architecture).toContain("prepared, not enabled");
    expect(intake).toContain("protected, non-executable reference input");
    expect(intake).toContain("not adopted as current ScrollVerse project facts");
  });

  it("keeps one original, release-gated production packet per locally indexed catalog title", () => {
    const slate = read("docs/phase405-spotify-catalog-production-slate.md");
    const packet = read("docs/catalog-release-packets/SV-CAT-010-the-goat-you-just-met.md");

    expect(slate).toContain("twelve locally indexed titles");
    expect(slate).toContain("SV-CAT-001");
    expect(slate).toContain("SV-CAT-012");
    expect(slate).toContain("does not fetch, copy, embed, download, distribute, sell, synchronize, or confirm");
    expect(packet).toContain("no third-party sports marks, teams, player likenesses, or celebrity references");
    expect(packet).toContain("require owner release");
  });
});

describe("Owner-stated transmission alignment record", () => {
  it("links the record from the Atlas while preserving its first-party interpretation and source-state boundaries", () => {
    const record = read("client/src/pages/TransmissionAlignmentRecord.tsx");
    const atlas = read("client/src/pages/ScrollVerseAtlas.tsx");
    const app = read("client/src/App.tsx");
    const intake = read("docs/phase406-owner-stated-transmission-alignment-record.md");

    expect(app).toContain('path={"/transmission-alignment-record"}');
    expect(atlas).toContain('href: "/transmission-alignment-record"');
    expect(atlas).toContain("Transmission Alignment Record");
    expect(record).toContain('useSovereignHeartbeat({ page: "transmission-alignment-record" })');
    expect(record).toContain("OWNER-STATED RECORD · READER-DIRECTED");
    expect(record).toContain("The responses and transmissions are aligning with the work.");
    expect(record).toContain("PortalTrustLens");
    expect(record).toContain("does not convert copied assistant responses");
    expect(intake).toContain("owner-stated interpretation");
    expect(intake).toContain("protected input as claims or copied descriptions");
    expect(record).not.toMatch(/mint now|buy now|connect wallet/i);
  });
});

describe("Source Study Library", () => {
  it("registers a source-labeled learning route and connects it from the Atlas", () => {
    const library = read("client/src/pages/SourceStudyLibrary.tsx");
    const atlas = read("client/src/pages/ScrollVerseAtlas.tsx");
    const app = read("client/src/App.tsx");

    expect(app).toContain('path={"/source-study-library"}');
    expect(atlas).toContain('href: "/source-study-library"');
    expect(atlas).toContain("Source Study Library");
    expect(library).toContain('useSovereignHeartbeat({ page: "source-study-library" })');
    expect(library).toContain("SOURCE-LABELED · READER-DIRECTED");
    expect(library).toContain("PortalTrustLens");
    expect(library).toContain("Open the source.");
    expect(library).toContain("Keep the question alive.");
  });

  it("keeps the supplied investment promotion educational and non-actionable", () => {
    const library = read("client/src/pages/SourceStudyLibrary.tsx");
    const entity = read("docs/phase408-lifestyle-investor-mastermind-entity-card.md");
    const review = read("docs/phase408-source-labeled-investment-promotion-review.md");

    expect(library).toContain("RESEARCH · NO ENROLLMENT OR PROVIDER STATUS ESTABLISHED");
    expect(library).toContain("No booking, payment, referral, or financial action is available here.");
    expect(library).toContain("GENERAL DILIGENCE QUESTIONS");
    expect(library).toContain("OFFICIAL INVESTOR-EDUCATION CONTEXT");
    expect(entity).toContain("not a provider endorsement, offer, solicitation, or investment action");
    expect(review).toContain("does not create a recommendation");
    expect(review).toContain("This record is research and analysis only, not personalized financial advice.");
    expect(library).not.toMatch(/enroll now|book your private strategy call|invest now/i);
  });

  it("keeps alternative-perspective videos attributed to their sources and independently unresolved", () => {
    const library = read("client/src/pages/SourceStudyLibrary.tsx");
    const intake = read("docs/phase409-alternative-perspective-video-channel-intake.md");
    const standard = read("docs/phase409-reader-directed-source-label-standard.md");

    expect(library).toContain("CHOSEN ONE, YOU RECREATED YOURSELF INTO A GOD");
    expect(library).toContain("CHOSEN ONE, NASA Found Traces of Your ANCESTORS");
    expect(library).toContain("10 Scariest Paradoxes in Physics That Prove Time Is an Illusion");
    expect(library).toContain("INDEPENDENTLY UNRESOLVED");
    expect(library).toContain("The video’s claims are not established as facts by this record.");
    expect(intake).toContain("Source-stated; independently unresolved");
    expect(standard).toContain("A linked channel is an access path, not a partnership, endorsement");
    expect(library).not.toMatch(/subscribe now|share now|comment now/i);
  });
});
