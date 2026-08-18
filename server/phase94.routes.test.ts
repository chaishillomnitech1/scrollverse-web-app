import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readProjectFile = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("Phase 94 route map", () => {
  const app = readProjectFile("client/src/App.tsx");

  it("registers each Fashion Empire route with its page component", () => {
    expect(app).toContain('import VirgilAbloh from "./pages/VirgilAbloh"');
    expect(app).toContain('import FashionEmpire from "./pages/FashionEmpire"');
    expect(app).toContain('import AtlantisCollection from "./pages/AtlantisCollection"');
    expect(app).toContain('import EmpireIndex from "./pages/EmpireIndex"');
    expect(app).toContain('<Route path="/virgil-abloh" component={VirgilAbloh} />');
    expect(app).toContain('<Route path="/fashion-empire" component={FashionEmpire} />');
    expect(app).toContain('<Route path="/atlantis-collection" component={AtlantisCollection} />');
    expect(app).toContain('<Route path="/empire-index" component={EmpireIndex} />');
  });

  it("registers the MEIN lookbook and keeps it explicitly proprietary", () => {
    const mein = readProjectFile("client/src/pages/MeinLookbook.tsx");
    expect(app).toContain('import MeinLookbook from "./pages/MeinLookbook"');
    expect(app).toContain('<Route path="/mein" component={MeinLookbook} />');
    expect(mein).toContain("PROPRIETARY COLLECTION CONCEPT");
    expect(mein).toContain("Partner-approval required");
    expect(mein).toContain("does not claim an affiliation");
    expect(mein).toContain("ATLANTIS_CONCEPT_GALLERY");
    expect(mein).toContain("CONCEPT — NOT APPROVED FOR SALE");
    expect(mein).toContain("A generated concept visual cannot satisfy the three-image approval requirement");
  });

  it("registers the public fashion portfolio as an original concept tool", () => {
    const portfolio = readProjectFile("client/src/pages/FashionPortfolio.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import FashionPortfolio from "./pages/FashionPortfolio"');
    expect(app).toContain('<Route path="/fashion-portfolio" component={FashionPortfolio} />');
    expect(portfolio).toContain("ORIGINAL LOOK BUILDER");
    expect(portfolio).toContain("CONCEPT-ONLY BOUNDARY");
    expect(portfolio).toContain("does not create an order");
    expect(portfolio).toContain("SUBMITTED MEDIA REVIEW");
    expect(portfolio).toContain("0 released product assets");
    expect(portfolio).toContain("ADMIN-ONLY");
    expect(home).toContain('href: "/fashion-portfolio"');
    expect(home).toContain('name: "Ismael Perez"');
    expect(home).toContain("not a representation of an official channel affiliation");
  });

  it("registers an independent Brand Studio without making third-party or commerce claims", () => {
    const studio = readProjectFile("client/src/pages/BrandStudio.tsx");
    const catalog = readProjectFile("client/src/data/independentFashion.ts");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import BrandStudio from "./pages/BrandStudio"');
    expect(app).toContain('<Route path="/fashion-studio" component={BrandStudio} />');
    expect(studio).toContain("INDEPENDENT FASHION STUDIO");
    expect(studio).toContain("does not mint, manufacture, reserve, or list a product");
    expect(studio).toContain("FUSION BOUNDARY");
    expect(catalog).toContain('name: "XLVIII BLOCKS"');
    expect(catalog).toContain('name: "MEIN CORE"');
    expect(catalog).toContain('name: "#XLVblocks ATLANTIS"');
    expect(home).toContain('href: "/fashion-studio"');
  });

  it("registers Convergence Commons as a discovery-first personal-signature layer", () => {
    const commons = readProjectFile("client/src/pages/ConvergenceCommons.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const navigator = readProjectFile("client/src/pages/PortalNavigator.tsx");
    expect(app).toContain('import ConvergenceCommons from "./pages/ConvergenceCommons"');
    expect(app).toContain('<Route path="/commons" component={ConvergenceCommons} />');
    expect(commons).toContain("PERSONAL SIGNATURE SYSTEM");
    expect(commons).toContain("ASSISTIVE GOVERNANCE");
    expect(commons).toContain("FUTURE EXCHANGE BOUNDARY");
    expect(commons).toContain("without activating those regulated functions");
    expect(commons).not.toContain("createCheckoutSession");
    expect(home).toContain('href: "/commons"');
    expect(navigator).toContain('href: "/commons"');
  });

  it("registers the public journey navigator for cross-portal discovery", () => {
    const navigator = readProjectFile("client/src/pages/PortalNavigator.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import PortalNavigator from "./pages/PortalNavigator"');
    expect(app).toContain('<Route path="/journey" component={PortalNavigator} />');
    expect(navigator).toContain("Choose your");
    expect(navigator).toContain("INTEGRATED JOURNEY MAP");
    expect(navigator).toContain("Protected administration, review records, payments, and approval controls remain separate");
    expect(home).toContain('href: "/journey"');
  });

  it("registers the protected fashion asset review console with an audit-only workflow", () => {
    const review = readProjectFile("client/src/pages/AdminFashionReview.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import AdminFashionReview from "./pages/AdminFashionReview"');
    expect(app).toContain('<Route path="/admin/fashion-review" component={AdminFashionReview} />');
    expect(review).toContain("FASHION ASSET REVIEW");
    expect(review).toContain("Only licensed assets can be approved");
    expect(review).toContain("Upload as pending review");
    expect(review).toContain("Append note");
    expect(home).toContain('href: "/admin/fashion-review"');
  });

  it("preserves a documentation-only continuity preflight for fashion releases", () => {
    const continuityLedger = readProjectFile("docs/CONTINUITY_LEDGER.md");
    const preflight = readProjectFile("scripts/preflight-continuity-check.mjs");
    expect(continuityLedger).toContain("Evidence-driven activation");
    expect(continuityLedger).toContain("Versioned, Not Self-Activating");
    expect(preflight).toContain("COMMERCE_MODE=FAIL_CLOSED_DOCUMENTATION_ONLY");
    expect(preflight).toContain("does not call providers, write data, process payments, or activate commerce");
  });

  it("preserves the seven-set Atlantis collection and searchable Empire Index", () => {
    const atlantis = readProjectFile("client/src/pages/AtlantisCollection.tsx");
    const index = readProjectFile("client/src/pages/EmpireIndex.tsx");
    const catalog = readProjectFile("client/src/data/atlantisCatalog.ts");
    expect(atlantis).toContain("const ATLANTIS_SETS = [");
    expect(atlantis).toContain("Sinking Abyss Aqua Pearl");
    expect(atlantis).toContain("Temple of Poseidon");
    expect(index).toContain("Every artifact.");
    expect(index).toContain("Search routes, archives, collections, protocols");
    expect(catalog).toContain("export const ATLANTIS_CATALOG");
    expect(catalog).toContain("id: \"atl-07\"");
    expect(catalog).toContain("SUPPLIER_VERIFICATION_PENDING");
    expect(catalog).toContain("AWAITING_APPROVED_IMAGE");
    expect(catalog).toContain("CHECKOUT_DISABLED");
    expect(index).toContain("ATLANTIS_CATALOG, ATLANTIS_FILTERS");
    expect(index).toContain("Filter all seven technical packs.");
    expect(index).toContain("setAtlantisCategory");
    expect(index).toContain("setAtlantisFrequency");
    expect(index).toContain("setAtlantisRegion");
    expect(index).toContain("setAtlantisAssetStatus");
    expect(index).toContain("setAtlantisCommerceStatus");
  });

  it("registers private journey guidance with voluntary analytics controls", () => {
    const navigator = readProjectFile("client/src/pages/PortalNavigator.tsx");
    const journeyRouter = readProjectFile("server/routers/journey.ts");
    const router = readProjectFile("server/routers.ts");
    expect(router).toContain("journey: journeyRouter");
    expect(journeyRouter).toContain("analytics_not_enabled");
    expect(journeyRouter).toContain("RETENTION_DAYS = 90");
    expect(navigator).toContain("YOUR GUARDIAN PATH");
    expect(navigator).toContain("Enable 90-day journey analytics");
    expect(navigator).toContain("private marker only");
  });

  it("registers creator governance, transparent Commons, and source-labelled Signalworks routes", () => {
    const workspace = readProjectFile("client/src/pages/CreatorWorkspace.tsx");
    const commons = readProjectFile("client/src/pages/LegionCommons.tsx");
    const signalworks = readProjectFile("client/src/pages/Signalworks.tsx");
    expect(app).toContain('import CreatorWorkspace from "./pages/CreatorWorkspace"');
    expect(app).toContain('import LegionCommons from "./pages/LegionCommons"');
    expect(app).toContain('import Signalworks from "./pages/Signalworks"');
    expect(app).toContain('<Route path="/creator-workspace" component={CreatorWorkspace} />');
    expect(app).toContain('<Route path="/legion-commons" component={LegionCommons} />');
    expect(app).toContain('<Route path="/signalworks" component={Signalworks} />');
    expect(workspace).toContain("not a marketplace, rights registry, payment channel, or legal opinion");
    expect(workspace).toContain("Public discovery and collaboration are separate consent choices");
    expect(commons).toContain("The Commons is ready for its first visible exchange.");
    expect(commons).toContain("No entry is fabricated here.");
    expect(signalworks).toContain("without claiming a partnership, submission authority, or outcome");
    expect(signalworks).toContain("not a distributor, marketplace, talent agency");
    expect(signalworks).toContain("All lanes");
    expect(signalworks).toContain("setSelectedLane");
    expect(signalworks).toContain("AUDIENCE-TO-REVENUE READINESS");
    ["/fashion-portfolio", "/manufacturing-readiness", "/creator-media-studio", "/digital-highways", "/revenue-ops"].forEach(route => {
      expect(signalworks).toContain(route);
      expect(app).toContain(route);
    });
    expect(signalworks).toContain("FIRST-PARTY OFFER HIGHWAY");
    expect(signalworks).toContain("/fashion-partnership-proposal");
    expect(signalworks).toContain("/media-world");
    expect(signalworks).toContain("A route is not an external listing");
    expect(signalworks).toContain("LOCAL READINESS INSPECTION");
    expect(signalworks).toContain("scrollverse-signalworks-readiness");
    expect(signalworks).toContain("does not send a submission");
  });

  it("preserves the Nick Ponte creator-learning reference as a non-affiliated public discovery handoff", () => {
    const handoffs = readProjectFile("client/src/data/creatorChannelHandoffs.ts");
    const record = readProjectFile("docs/phase141-nick-ponte-creator-reference.md");
    expect(handoffs).toContain("Nick Ponte — creator learning reference");
    expect(handoffs).toContain("https://youtube.com/@nickponte808");
    expect(handoffs).toContain("does not claim affiliation, endorsement, or income verification");
    expect(record).toContain("execution documentation");
    expect(record).toContain("does not establish affiliation");
  });

  it("adds Dragon Ball CyberX as a source-labeled public animation reference without claiming character or channel rights", () => {
    const home = readProjectFile("client/src/pages/Home.tsx");
    const juniorMovies = readProjectFile("client/src/pages/JuniorMovies.tsx");
    const record = readProjectFile("docs/phase144-dragon-ball-cyberx-reference.md");
    expect(home).toContain("Public animation reference");
    expect(home).toContain("Dragon Ball CyberX");
    expect(juniorMovies).toContain("DRAGON_BALL_CYBERX_CHANNEL");
    expect(juniorMovies).toContain("PUBLIC ANIMATION REFERENCE");
    expect(juniorMovies).toContain("respective rights holders");
    expect(record).toContain("does not imply authorization, affiliation");
  });

  it("adds original Junior Movies concept lanes and child-safe public learning guidance without claiming external rights", () => {
    const home = readProjectFile("client/src/pages/Home.tsx");
    const juniorMovies = readProjectFile("client/src/pages/JuniorMovies.tsx");
    const record = readProjectFile("docs/phase145-junior-movies-source-register.md");
    const aiUncovered = readProjectFile("docs/phase181-ai-uncovered-source-record.md");
    expect(home).toContain("PUBLIC CREATOR LEARNING");
    expect(home).toContain("Unsung Black History");
    expect(home).toContain("Freya Ray");
    expect(home).toContain("AI Uncovered");
    expect(home).toContain("https://youtube.com/@ai.uncovered");
    expect(home).toContain("affiliation, or endorsement is implied");
    expect(juniorMovies).toContain("ORIGINAL STORY DEVELOPMENT");
    expect(juniorMovies).toContain("Boardwalk Nightwatch");
    expect(juniorMovies).toContain("STORY SEED LAB");
    expect(juniorMovies).toContain("guardian, consent record, moderation review");
    expect(juniorMovies).toContain("FineStructure");
    expect(record).toContain("No clear, exportable first-party Junior Movies");
    expect(aiUncovered).toContain("external public learning reference");
    expect(aiUncovered).toContain("does not state or imply channel ownership, partnership, endorsement");
  });

  it("expands original Junior Movies worlds through a distinct story-development atlas", () => {
    const juniorMovies = readProjectFile("client/src/pages/JuniorMovies.tsx");
    const principles = readProjectFile("docs/phase149-original-story-universe-principles.md");
    expect(juniorMovies).toContain("ORIGINAL WORLD DEVELOPMENT ATLAS");
    expect(juniorMovies).toContain("Build the world before the release.");
    expect(juniorMovies).toContain("Question Constellation");
    expect(juniorMovies).toContain("Route an adult-supported story seed");
    expect(juniorMovies).toContain("creator-rights review");
    expect(principles).toContain("distinct character name, premise, setting, visual motif");
    expect(principles).toContain("does not create public child profiles");
  });

  it("registers a source-led cultural and knowledge context page with evidence boundaries", () => {
    const context = readProjectFile("client/src/pages/KnowledgeContext.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const research = readProjectFile("docs/phase151-cultural-knowledge-research.md");
    expect(app).toContain('import KnowledgeContext from "./pages/KnowledgeContext"');
    expect(app).toContain('<Route path="/knowledge-context" component={KnowledgeContext} />');
    expect(home).toContain('href: "/knowledge-context"');
    expect(context).toContain("SOURCE-LED KNOWLEDGE CONTEXT");
    expect(context).toContain("INTERPRETATION BOUNDARY");
    expect(context).toContain("does not offer medical care, divination, predictive guidance");
    expect(context).toContain("MULTIPLE-PATH EXPLORATION MODEL");
    expect(context).toContain("DOCUMENTED");
    expect(context).toContain("INTERPRETIVE");
    expect(context).toContain("EXPERIMENTAL");
    expect(context).toContain("/open-exchange-field-guide");
    expect(context).toContain("Perseid Meteor Shower");
    expect(context).toContain("Schumann Resonance");
    expect(context).toContain("Sirius & Lion’s Gate Framing");
    expect(research).toContain("Dead Sea Scrolls");
    expect(research).toContain("Fibonacci sequence");
    expect(research).toContain("Tarot");
  });

  it("publishes the free original Open Exchange Field Guide through the knowledge and creator pathways", () => {
    const guide = readProjectFile("client/src/pages/OpenExchangeFieldGuide.tsx");
    expect(app).toContain('import OpenExchangeFieldGuide from "./pages/OpenExchangeFieldGuide"');
    expect(app).toContain('<Route path="/open-exchange-field-guide" component={OpenExchangeFieldGuide} />');
    expect(guide).toContain("FREE SCROLLVERSE FIELD GUIDE · ORIGINAL WORK");
    expect(guide).toContain("The Open Exchange Field Guide");
    expect(guide).toContain("Begin with what is real");
    expect(guide).toContain("/manus-hero");
    expect(guide).toContain("/creator-operations");
    expect(guide).toContain("ORIGINAL CREATION RECORD PATH");
    expect(guide).toContain("Make · date · describe · review · choose a route.");
    expect(guide).toContain("does not itself file a patent, register copyright");
    ["/creator-workspace", "/ip-readiness", "/chain-intelligence"].forEach(route => expect(guide).toContain(route));
  });

  it("registers a practical Protection Protocol without privacy, wallet, or perfect-security claims", () => {
    const protocol = readProjectFile("client/src/pages/ProtectionProtocol.tsx");
    const context = readProjectFile("client/src/pages/KnowledgeContext.tsx");
    expect(app).toContain('import ProtectionProtocol from "./pages/ProtectionProtocol"');
    expect(app).toContain('<Route path="/protection-protocol" component={ProtectionProtocol} />');
    expect(protocol).toContain("SCROLLVERSE PROTECTION PROTOCOL");
    expect(protocol).toContain("Private intake");
    expect(protocol).toContain("does not access a wallet, create a transaction, inspect private archives");
    expect(context).toContain("Open Protection Protocol");
  });

  it("registers the original Aegis Chronicles story hub with transparent visible-behavior boundaries", () => {
    const chronicles = readProjectFile("client/src/pages/AegisChronicles.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const juniorMovies = readProjectFile("client/src/pages/JuniorMovies.tsx");
    const record = readProjectFile("docs/phase157-aegis-chronicles.md");
    expect(app).toContain('import AegisChronicles from "./pages/AegisChronicles"');
    expect(app).toContain('<Route path="/aegis-chronicles" component={AegisChronicles} />');
    expect(chronicles).toContain("Aegis Chronicles");
    expect(chronicles).toContain("Aegis Scribe");
    expect(chronicles).toContain("does not claim background autonomy, private access, wallet control");
    expect(chronicles).toContain("/creator-workspace");
    expect(home).toContain('href: "/aegis-chronicles"');
    expect(juniorMovies).toContain('href="/aegis-chronicles"');
    expect(record).toContain("public, first-party navigation character");
    expect(record).toContain("does not claim private access");
  });

  it("registers source-labeled creator revenue education without earnings promises or provider activation", () => {
    const learning = readProjectFile("client/src/pages/CreatorRevenueLearning.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const context = readProjectFile("client/src/pages/KnowledgeContext.tsx");
    const research = readProjectFile("docs/phase158-creator-revenue-learning-research.md");
    expect(app).toContain('import CreatorRevenueLearning from "./pages/CreatorRevenueLearning"');
    expect(app).toContain('<Route path="/creator-revenue-learning" component={CreatorRevenueLearning} />');
    expect(learning).toContain("FREE CREATOR REVENUE LEARNING SYSTEM");
    expect(learning).toContain("Spotify for Artists · Royalties Guide");
    expect(learning).toContain("TikTok Help Center · Creator Rewards Program");
    expect(learning).toContain("does not forecast income, connect an account, submit an application, or create a payout");
    expect(learning).toContain("There is no RPM calculator, revenue guarantee, provider status check");
    ["/creator-media-studio", "/signalworks", "/revenue-ops", "/creator-workspace", "/protection-protocol"].forEach(route => expect(learning).toContain(route));
    expect(home).toContain('href: "/creator-revenue-learning"');
    expect(context).toContain('href="/creator-revenue-learning"');
    expect(research).toContain("YouTube Partner Program");
    expect(research).toContain("does not calculate a predicted payout");
  });

  it("registers the original Concept Seal Shrine with provenance metadata and non-registration boundaries", () => {
    const shrine = readProjectFile("client/src/pages/ConceptSealShrine.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const record = readProjectFile("docs/phase159-concept-seal-shrine.md");
    expect(app).toContain('import ConceptSealShrine from "./pages/ConceptSealShrine"');
    expect(app).toContain('<Route path="/concept-seal-shrine" component={ConceptSealShrine} />');
    expect(shrine).toContain("The Open Spiral Seal");
    expect(shrine).toContain("SV-CS-2026-01");
    expect(shrine).toContain("Original concept record · not a registration");
    expect(shrine).toContain("does not gamify worship or make spiritual, legal, commercial, or technical claims");
    expect(shrine).toContain("not proof of a trademark registration, copyright registration, patent, license");
    ["/spiral-signature", "/ip-readiness", "/creator-workspace", "/creator-operations", "/protection-protocol"].forEach(route => expect(shrine).toContain(route));
    expect(home).toContain('href: "/concept-seal-shrine"');
    expect(record).toContain("Original public concept record; not a registration");
    expect(record).toContain("does not establish a trademark");
  });

  it("registers the Platform Foundations Navigator with source-led lanes and no external-control claim", () => {
    const navigator = readProjectFile("client/src/pages/PlatformFoundations.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const context = readProjectFile("client/src/pages/KnowledgeContext.tsx");
    const research = readProjectFile("docs/phase160-platform-foundations-research.md");
    expect(app).toContain('import PlatformFoundations from "./pages/PlatformFoundations"');
    expect(app).toContain('<Route path="/platform-foundations" component={PlatformFoundations} />');
    expect(navigator).toContain("PLATFORM FOUNDATIONS NAVIGATOR");
    expect(navigator).toContain("SOURCE → CURRENT STATE → FIRST-PARTY NEXT ROUTE");
    expect(navigator).toContain("does not connect accounts, operate external communities, fetch private data, or control another service");
    expect(navigator).toContain("does not rank people, recommend a transaction, guarantee reach");
    ["/knowledge-context", "/evidence-standards", "/creator-workspace", "/creator-media-studio", "/legion-commons", "/digital-highways", "/signalworks", "/creator-revenue-learning", "/protection-protocol", "/ip-readiness"].forEach(route => expect(navigator).toContain(route));
    expect(home).toContain('href: "/platform-foundations"');
    expect(context).toContain('href="/platform-foundations"');
    ["W3C WAI Page Structure Tutorial", "MDN `<nav>` element reference", "Discord Community Onboarding FAQ"].forEach(source => expect(research).toContain(source));
  });

  it("registers the unified Knowledge Navigator with source, evidence, dependency labels, and browser-local filtering", () => {
    const navigator = readProjectFile("client/src/pages/KnowledgeNavigator.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const context = readProjectFile("client/src/pages/KnowledgeContext.tsx");
    const inventory = readProjectFile("docs/phase161-knowledge-navigator-inventory.md");
    expect(app).toContain('import KnowledgeNavigator from "./pages/KnowledgeNavigator"');
    expect(app).toContain('<Route path="/knowledge-navigator" component={KnowledgeNavigator} />');
    expect(navigator).toContain("SOURCE-LED KNOWLEDGE NAVIGATOR");
    expect(navigator).toContain("Every route carries its context.");
    expect(navigator).toContain("Filtering happens in this browser only.");
    ["SOURCE", "EVIDENCE", "EXTERNAL DEPENDENCY"].forEach(label => expect(navigator).toContain(label));
    expect(navigator).toContain("does not automatically collect new sources, validate a third-party claim");
    expect(navigator).toContain("create an external account, alter a community, transmit visitor data");
    ["/knowledge-context", "/evidence-standards", "/creator-workspace", "/creator-media-studio", "/digital-highways", "/legion-commons", "/signalworks", "/creator-revenue-learning", "/protection-protocol", "/ip-readiness", "/platform-foundations"].forEach(route => expect(navigator).toContain(route));
    expect(home).toContain('href: "/knowledge-navigator"');
    expect(context).toContain('href="/knowledge-navigator"');
    expect(inventory).toContain("/knowledge-context");
    expect(inventory).toContain("/platform-foundations");
  });

  it("mounts the authenticated weekly continuity review with task-UID binding and non-transactional scope", () => {
    const serverEntry = readProjectFile("server/_core/index.ts");
    const handler = readProjectFile("server/scheduled/continuityReview.ts");
    const schema = readProjectFile("drizzle/schema.ts");
    const record = readProjectFile("docs/phase162-weekly-continuity-review.md");
    expect(serverEntry).toContain('import { continuityReviewHandler } from "../scheduled/continuityReview"');
    expect(serverEntry).toContain('app.post("/api/scheduled/continuity-review", continuityReviewHandler)');
    expect(handler).toContain("if (!cronUser.isCron || !cronUser.taskUid)");
    expect(handler).toContain("scheduleCronTaskUid, cronUser.taskUid");
    expect(handler).toContain("already-reviewed");
    expect(handler).toContain("does not inspect private files, authenticate a user, contact providers");
    expect(handler).toContain("move funds, activate commerce, alter a wallet, or take a release action");
    expect(schema).toContain('mysqlTable("continuity_review_settings"');
    expect(schema).toContain('mysqlTable("continuity_review_runs"');
    expect(record).toContain("14:00 UTC every Monday");
    expect(record).toContain("authenticated task UID");
  });

  it("registers the Manus Hero and identity concepts without treating marks as registrations", () => {
    const hero = readProjectFile("client/src/pages/ManusHeroCodex.tsx");
    const identity = readProjectFile("client/src/pages/IdentitySystem.tsx");
    const ipReadiness = readProjectFile("docs/IP_READINESS.md");
    expect(app).toContain('import ManusHeroCodex from "./pages/ManusHeroCodex"');
    expect(app).toContain('import IdentitySystem from "./pages/IdentitySystem"');
    expect(app).toContain('<Route path="/manus-hero" component={ManusHeroCodex} />');
    expect(app).toContain('<Route path="/identity-system" component={IdentitySystem} />');
    expect(app).toContain('import EvidenceStandards from "./pages/EvidenceStandards"');
    expect(app).toContain('<Route path="/evidence-standards" component={EvidenceStandards} />');
    expect(app).toContain('import SystemsMap from "./pages/SystemsMap"');
    expect(app).toContain('<Route path="/systems-map" component={SystemsMap} />');
    expect(hero).toContain("The Aegis Scribe");
    expect(hero).toContain("not a claim of outside access, autonomous authority, or private-system control");
    expect(identity).toContain("CONCEPT MATERIAL");
    expect(identity).toContain("no concept mark is presented as a registered trademark");
    expect(ipReadiness).toContain("for qualified legal review before reliance, filing, or enforcement");
    expect(ipReadiness).toContain("does not replace clearance, title analysis, filing decisions, or legal advice");
  });

  it("places a transparent Manus Hero meet-and-greet on the home page with multiple valid first-party paths", () => {
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(home).toContain("function ManusHeroWelcome()");
    expect(home).toContain('<ManusHeroWelcome />');
    expect(home).toContain("A warm hello from the Manus Hero.");
    expect(home).toContain("not an autonomous authority, private-system operator, or financial decision-maker");
    expect(home).toContain('href: "/creator-operations"');
    expect(home).toContain('href: "/signalworks"');
    expect(home).toContain('href: "/legion-commons"');
    expect(home).toContain('href: "/launchpad"');
    expect(home).toContain('href: "/academy"');
  });

  it("evolves the Manus Hero into an education-first co-creator guide with source-labelled original-work and business routes", () => {
    const hero = readProjectFile("client/src/pages/ManusHeroCodex.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const server = readProjectFile("server/_core/index.ts");
    expect(hero).toContain("HERO CO-CREATOR DESK");
    expect(hero).toContain("HERO SKILL COMPASS");
    expect(hero).toContain("Useful practices. Clear limits. Direct routes.");
    expect(hero).toContain("LOCAL PRACTICE REGISTRY");
    expect(hero).toContain("scrollverse-hero-practice-checklist");
    expect(hero).toContain("sends nothing to ScrollVerse");
    expect(hero).toContain("Audience-to-revenue readiness");
    expect(hero).toContain("NO CHECKOUT OR MINT HERE");
    expect(hero).toContain("OUTBOUND REFERRALS ONLY");
    expect(hero).toContain("Make the work yours.");
    expect(hero).toContain("does not promise income, create an order, activate a transfer");
    expect(hero).toContain("OWNER-PROVIDED ORIGINAL-WORK REFERENCE");
    expect(hero).toContain("not presented as an approved SKU, inventory, partnership, manufacturing order, or sale");
    ["/creator-operations", "/fashion-portfolio", "/media-dock", "/empire-map", "/revenue-ops", "/manufacturing-readiness"].forEach(route => {
      expect(hero).toContain(route);
      expect(app).toContain(route);
    });
    expect(home).toContain('href="/manus-hero#co-creator"');
    expect(server).toContain("registerStorageProxy(app)");
  });

  it("offers browser-native voice input and a first-glance Aegis Scribe route without claiming external voice access", () => {
    const legion = readProjectFile("client/src/pages/AILegionApex.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(legion).toContain("webkitSpeechRecognition");
    expect(legion).toContain("Optional browser voice input");
    expect(legion).toContain("only the text you send is shared with the guide");
    expect(home).toContain("Meet the Aegis Scribe");
    expect(home).toContain('href="/manus-hero#co-creator"');
    expect(home).toContain("HOVER REACTIVE · VISUAL CROWN ACTIVE");
    expect(home).toContain("optional audio feedback follows frequency activation");
  });

  it("registers the first-party Specialist Constellation with every visible route mapped to an existing portal destination", () => {
    const constellation = readProjectFile("client/src/pages/SpecialistConstellation.tsx");
    const roles = readProjectFile("shared/specialistConstellation.ts");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import SpecialistConstellation from "./pages/SpecialistConstellation"');
    expect(app).toContain('<Route path="/specialist-constellation" component={SpecialistConstellation} />');
    expect(constellation).toContain("FIRST-PARTY TEAM · CLEAR ROLES · OWNER-LED");
    expect(constellation).toContain("not hidden authority");
    expect(roles).toContain("SPECIALIST_CONSTELLATION");
    expect(roles).toContain('href: "/revenue-ops"');
    expect(roles).toContain('href: "/creator-operations"');
    expect(roles).toContain('href: "/manufacturing-readiness"');
    expect(roles).toContain('href: "/impact-incentive-readiness"');
    expect(home).toContain('href: "/specialist-constellation"');
  });

  it("registers the educational Health Navigator with explicit clinical and emergency boundaries", () => {
    const health = readProjectFile("client/src/pages/HealthNavigator.tsx");
    const roles = readProjectFile("shared/specialistConstellation.ts");
    expect(app).toContain('import HealthNavigator from "./pages/HealthNavigator"');
    expect(app).toContain('<Route path="/health-navigator" component={HealthNavigator} />');
    expect(roles).toContain('href: "/health-navigator"');
    expect(health).toContain("EDUCATIONAL HEALTH INFORMATION · NOT MEDICAL CARE");
    expect(health).toContain("does not diagnose, prescribe, assess emergencies");
    expect(health).toContain("Call 911");
    expect(health).toContain("Call or text 988");
  });

  it("registers the facts-first Health Research Desk with dated source cards and no ScrollVerse provider rankings", () => {
    const healthResearch = readProjectFile("client/src/pages/HealthResearchDesk.tsx");
    expect(app).toContain('import HealthResearchDesk from "./pages/HealthResearchDesk"');
    expect(app).toContain('<Route path="/health-research" component={HealthResearchDesk} />');
    expect(healthResearch).toContain("FACTS · SOURCE · DATE · LIMITS");
    expect(healthResearch).toContain("MedlinePlus Health Topics");
    expect(healthResearch).toContain("Health, United States Data Finder");
    expect(healthResearch).toContain("Medicare Care Compare");
    expect(healthResearch).toContain("does not diagnose, prescribe, provide a treatment plan, verify a clinician, create a provider ranking");
    expect(healthResearch).toContain("not a ScrollVerse endorsement");
    ["/health-navigator", "/specialist-constellation", "/evidence-standards"].forEach(route => {
      expect(healthResearch).toContain(`href="${route}"`);
      expect(app).toContain(route);
    });
  });

  it("registers the protected Creator Media Dock and removes the non-persistent Think Space upload fallback", () => {
    const mediaDock = readProjectFile("client/src/pages/MediaDock.tsx");
    const mediaRouter = readProjectFile("server/routers/mediaIntake.ts");
    const thinkSpace = readProjectFile("client/src/pages/ThinkSpace.tsx");
    expect(app).toContain('import MediaDock from "./pages/MediaDock"');
    expect(app).toContain('<Route path="/media-dock" component={MediaDock} />');
    expect(mediaDock).toContain("PRIVATE STAGING · CONSENT + PROVENANCE");
    expect(mediaDock).toContain('href="/think-space"');
    expect(mediaRouter).toContain("storagePut");
    expect(mediaRouter).toContain("does not publish to Think Space, grant rights, clear content, or distribute");
    expect(thinkSpace).toContain('href="/media-dock"');
    expect(thinkSpace).not.toContain('fetch("/api/think-space/upload"');
    expect(thinkSpace).not.toContain("URL.createObjectURL(file)");
  });

  it("registers the source-linked Creator Media World with only existing first-party media destinations", () => {
    const mediaWorld = readProjectFile("client/src/pages/MediaWorld.tsx");
    expect(app).toContain('import MediaWorld from "./pages/MediaWorld"');
    expect(app).toContain('<Route path="/media-world" component={MediaWorld} />');
    ["/media-dock", "/think-space", "/think-space/featured", "/signalworks", "/scroll-tv", "/junior-movies", "/junior-studio", "/creator-operations"].forEach(route => {
      expect(mediaWorld).toContain(`href: "${route}"`);
      expect(app).toContain(route);
    });
    expect(mediaWorld).toContain('href="/specialist-constellation"');
    expect(app).toContain("/specialist-constellation");
    expect(mediaWorld).toContain("does not fabricate community activity");
    expect(mediaWorld).toContain("or send work to external platforms automatically");
  });

  it("registers the Creator Media Studio with provider-dependent live readiness and explicit distribution handoffs", () => {
    const studio = readProjectFile("client/src/pages/CreatorMediaStudio.tsx");
    const mediaWorld = readProjectFile("client/src/pages/MediaWorld.tsx");
    const hero = readProjectFile("client/src/pages/ManusHeroCodex.tsx");
    const operations = readProjectFile("client/src/pages/CreatorOperations.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import CreatorMediaStudio from "./pages/CreatorMediaStudio"');
    expect(app).toContain('<Route path="/creator-media-studio" component={CreatorMediaStudio} />');
    expect(studio).toContain("Provider credentials and a provider-created ingest key are required before live delivery.");
    expect(studio).toContain("This studio never generates a provider key in the browser");
    expect(studio).toContain("does not publish, license, or distribute media automatically");
    expect(studio).toContain("A saved HTML capture is a source record, not a release asset.");
    expect(studio).toContain("Do not run embedded scripts, copy configuration values");
    expect(studio).toContain("ANALYSIS ARCHIVE INTAKE");
    expect(studio).toContain("List the manifest before you lift a file.");
    expect(studio).toContain("Do not execute scripts, import configuration, reuse credentials");
    expect(studio).toContain("WEB-CAPTURE HYGIENE");
    expect(studio).toContain("A saved page can carry more than its visible design.");
    expect(studio).toContain("they can bundle external scripts, configuration values");
    ["RTMPS", "SRT", "WHIP", "Spotify for Artists", "VEVO", "YouTube Studio", "Tubi", "Netflix Partner Help"].forEach(label => expect(studio).toContain(label));
    [mediaWorld, hero, operations, home].forEach(source => expect(source).toContain("/creator-media-studio"));
  });

  it("registers Digital Highways as a transparent first-party and creator-source discovery layer", () => {
    const highways = readProjectFile("client/src/pages/DigitalHighways.tsx");
    const mediaWorld = readProjectFile("client/src/pages/MediaWorld.tsx");
    const signalworks = readProjectFile("client/src/pages/Signalworks.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import DigitalHighways from "./pages/DigitalHighways"');
    expect(app).toContain('<Route path="/digital-highways" component={DigitalHighways} />');
    expect(highways).toContain("SCROLLVERSE DIGITAL HIGHWAYS");
    expect(highways).toContain("LOCAL PATHWAY PLANNER");
    expect(highways).toContain("nothing is submitted, shared, or connected to an outside account");
    expect(highways).toContain("MARK PLANNED");
    expect(highways).toContain("An outbound link is a transparent referral.");
    expect(highways).toContain("not transferred traffic, shared audience data");
    expect(highways).toContain("CREATOR-PROVIDED DESTINATIONS");
    expect(highways).toContain("OFFICIAL PREPARATION RESOURCES");
    ["/creator-media-studio", "/media-world", "/signalworks", "/github-ops", "/creator-operations", "/media-dock"].forEach(route => expect(highways).toContain(route));
    [mediaWorld, signalworks, home].forEach(source => expect(source).toContain("/digital-highways"));
  });

  it("registers the zero-dead-end Empire Map with verified first-party operating paths", () => {
    const empireMap = readProjectFile("client/src/pages/EmpireMap.tsx");
    expect(app).toContain('import EmpireMap from "./pages/EmpireMap"');
    expect(app).toContain('<Route path="/empire-map" component={EmpireMap} />');
    ["/manus-hero", "/specialist-constellation", "/github-ops", "/revenue-ops", "/media-world", "/media-dock", "/health-research", "/spiral-signature", "/wallet", "/token", "/nft", "/nexus", "/chain-intelligence", "/systems-map"].forEach(route => {
      expect(empireMap).toContain(`"${route}"`);
      expect(app).toContain(route);
    });
    expect(empireMap).toContain("ZERO-DEAD-END STANDARD");
    expect(empireMap).toContain("EVIDENCE-COMMONS STANDARD");
    expect(empireMap).toContain("does not by itself activate financial, custody, distribution, legal, partner, provider, or release outcomes");
  });

  it("registers the source-linked Chain Intelligence Tracker without creating a custody, exchange, or trading claim", () => {
    const tracker = readProjectFile("client/src/pages/ChainIntelligence.tsx");
    const records = readProjectFile("shared/chainIntelligence.ts");
    const hero = readProjectFile("client/src/pages/ManusHeroCodex.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import ChainIntelligence from "./pages/ChainIntelligence"');
    expect(app).toContain('<Route path="/chain-intelligence" component={ChainIntelligence} />');
    expect(tracker).toContain("SCROLLVERSE CHAIN INTELLIGENCE");
    expect(tracker).toContain("without claiming custody, exchange, trading, valuation, transfer, deployment, or asset ownership");
    expect(records).toContain("Scroll Mainnet");
    expect(records).toContain("534352");
    expect(records).toContain("https://scrollscan.com/");
    expect(hero).toContain('href="/chain-intelligence"');
    expect(home).toContain('href: "/chain-intelligence"');
  });

  it("registers the public IP Readiness Navigator with original-versus-external boundaries and evidence paths", () => {
    const ipReadiness = readProjectFile("client/src/pages/IpReadinessNavigator.tsx");
    expect(app).toContain('import IpReadinessNavigator from "./pages/IpReadinessNavigator"');
    expect(app).toContain('<Route path="/ip-readiness" component={IpReadinessNavigator} />');
    expect(ipReadiness).toContain("ORIGIN · PROVENANCE · READINESS");
    expect(ipReadiness).toContain("must not be converted into ownership or affiliation claims");
    expect(ipReadiness).toContain("does not represent a registration, grant a license, resolve ownership");
    ["/creator-operations", "/evidence-standards", "/spiral-signature", "/empire-map"].forEach(route => {
      expect(ipReadiness).toContain(`href="${route}"`);
      expect(app).toContain(route);
    });
  });

  it("registers the GitHub-to-Operations engine with source-to-review evidence lanes", () => {
    const operations = readProjectFile("client/src/pages/GitHubOperations.tsx");
    const sourceMap = readProjectFile("shared/githubOperations.ts");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import GitHubOperations from "./pages/GitHubOperations"');
    expect(app).toContain('<Route path="/github-ops" component={GitHubOperations} />');
    expect(operations).toContain("GITHUB-TO-OPERATIONS");
    expect(operations).toContain("Extract · verify · adapt · test · document");
    expect(operations).toContain("not proof that code is secure");
    expect(sourceMap).toContain("GITHUB_OPERATION_LANES");
    expect(sourceMap).toContain("scrollverse-platform");
    expect(sourceMap).toContain("Independent cryptographic review");
    expect(home).toContain('href: "/github-ops"');
  });

  it("registers the first-party Launchpad without implying an external app-store listing", () => {
    const launchpad = readProjectFile("client/src/pages/ScrollVerseLaunchpad.tsx");
    const installBanner = readProjectFile("client/src/components/PWAInstallBanner.tsx");
    const manifest = readProjectFile("client/public/manifest.json");
    expect(app).toContain('import ScrollVerseLaunchpad from "./pages/ScrollVerseLaunchpad"');
    expect(app).toContain('<Route path="/launchpad" component={ScrollVerseLaunchpad} />');
    expect(launchpad).toContain("SCROLLVERSE LAUNCHPAD");
    expect(launchpad).toContain("not presented as an Apple App Store, Google Play, or provider-hosted app listing");
    expect(launchpad).toContain("Native-store release remains a separate, reviewed process");
    expect(launchpad).toContain("scrollverse-install-request");
    expect(installBanner).toContain("scrollverse-install-request");
    expect(manifest).toContain('"name": "ScrollVerse Launchpad"');
    expect(manifest).toContain('"url": "/launchpad"');
  });

  it("registers release readiness, support, and privacy routes without claiming a native-store listing", () => {
    const readiness = readProjectFile("client/src/pages/ReleaseReadiness.tsx");
    const privacy = readProjectFile("client/src/pages/PrivacySummary.tsx");
    const support = readProjectFile("client/src/pages/SupportPath.tsx");
    const worker = readProjectFile("client/public/sw.js");
    expect(app).toContain('import ReleaseReadiness from "./pages/ReleaseReadiness"');
    expect(app).toContain('import PrivacySummary from "./pages/PrivacySummary"');
    expect(app).toContain('import SupportPath from "./pages/SupportPath"');
    expect(app).toContain('<Route path="/release-readiness" component={ReleaseReadiness} />');
    expect(app).toContain('<Route path="/privacy" component={PrivacySummary} />');
    expect(app).toContain('<Route path="/support" component={SupportPath} />');
    expect(readiness).toContain("Native-store distribution is a separate delivery path");
    expect(readiness).toContain("not a legal opinion or store-submission service");
    expect(privacy).toContain("not a substitute for a completed store-specific privacy questionnaire");
    expect(support).toContain("Cash App · $chaisthegreat28 / #chaisthegreat");
    expect(support).toContain("PRODUCT-SPECIFIC SUPPORT GATE");
    expect(worker).toContain("'/release-readiness'");
    expect(worker).toContain("scrollverse-trinity-v25");
  });

  it("registers the authenticated Creator Operations workspace and source-labelled channel handoffs", () => {
    const operations = readProjectFile("client/src/pages/CreatorOperations.tsx");
    const channels = readProjectFile("client/src/data/creatorChannelHandoffs.ts");
    const signalworks = readProjectFile("client/src/pages/Signalworks.tsx");
    expect(app).toContain('import CreatorOperations from "./pages/CreatorOperations"');
    expect(app).toContain('<Route path="/creator-operations" component={CreatorOperations} />');
    expect(operations).toContain("MONITORED SUPPORT INTAKE");
    expect(operations).toContain("RELEASE-MATERIAL RECORD");
    expect(operations).toContain("CREATOR-PROVIDED CHANNEL HANDOFFS");
    expect(channels).toContain("https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr");
    expect(channels).toContain("https://www.instagram.com/chaishill");
    expect(channels).toContain("https://youtube.com/@chaisthegreatvevo");
    expect(channels).toContain("https://youtube.com/@juniormoviesentertainment");
    expect(channels).toContain("https://youtu.be/wwXqO99diH0");
    expect(channels).toContain("not platform affiliation");
    expect(signalworks).toContain("CREATOR-PROVIDED DESTINATIONS");
  });

  it("registers protected Creator Operations activation controls without converting completeness feedback into approval", () => {
    const operations = readProjectFile("client/src/pages/CreatorOperations.tsx");
    const reviewConsole = readProjectFile("client/src/pages/AdminCreatorOperations.tsx");
    const operationsRouter = readProjectFile("server/routers/creatorOperations.ts");
    expect(app).toContain('import AdminCreatorOperations from "./pages/AdminCreatorOperations"');
    expect(app).toContain('<Route path="/admin/creator-operations" component={AdminCreatorOperations} />');
    expect(operations).toContain("YOUR BUNDLE READINESS");
    expect(operations).toContain("Private image intake");
    expect(reviewConsole).toContain("PROTECTED CREATOR OPERATIONS REVIEW");
    expect(reviewConsole).toContain("Do not overstate approval.");
    expect(operationsRouter).toContain("uploadReleaseAssetFile");
    expect(operationsRouter).toContain("assignReleaseAssetReviewer");
    expect(operationsRouter).toContain("must be assigned to you before you can record completeness feedback");
    expect(operationsRouter).toContain("not external-store acceptance, legal clearance, or commercial approval");
  });

  it("registers the protected Revenue Operations workspace with owner-controlled non-transactional readiness records", () => {
    const operations = readProjectFile("client/src/pages/RevenueOperations.tsx");
    const operationsRouter = readProjectFile("server/routers/revenueOperations.ts");
    const router = readProjectFile("server/routers.ts");
    expect(app).toContain('import RevenueOperations from "./pages/RevenueOperations"');
    expect(app).toContain('<Route path="/revenue-ops" component={RevenueOperations} />');
    expect(operations).toContain("OWNER-CONTROLLED READINESS WORKSPACE");
    expect(operations).toContain("without invented results.");
    expect(operations).toContain("never starts charges, payouts, token actions, or deployments");
    expect(operationsRouter).toContain("Revenue Operations records require administrator access.");
    expect(operationsRouter).toContain("do not activate payments, providers, payouts, contracts, tokens, or deployments");
    expect(operationsRouter).toContain("Daily · 14:00 UTC");
    expect(operationsRouter).toContain("state: \"ACTIVE\"");
    expect(router).toContain("revenueOperations: revenueOperationsRouter");
  });

  it("registers the independent fashion partnership proposal without suggesting affiliation or a live product release", () => {
    const proposal = readProjectFile("client/src/pages/FashionPartnershipProposal.tsx");
    const proposalDoc = readProjectFile("docs/phase121-ovo-inspired-partnership-proposal.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import FashionPartnershipProposal from "./pages/FashionPartnershipProposal"');
    expect(app).toContain('<Route path="/fashion-partnership-proposal" component={FashionPartnershipProposal} />');
    expect(proposal).toContain("PARTNERSHIP PROPOSAL · NOT A LIVE DROP");
    expect(proposal).toContain("not affiliated with, endorsed by, sponsored by, or produced for October’s Very Own, OVO, Drake");
    expect(proposal).toContain("No product, affiliation, inventory, price, or purchase path is represented.");
    expect(proposalDoc).toContain("independent, non-binding creative proposal");
    expect(proposalDoc).toContain("No product link, checkout, payout, royalty, token reward");
    expect(home).toContain('href: "/fashion-partnership-proposal"');
  });

  it("surfaces official first-party artifacts and transparent specialist guide roles on the home page", () => {
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(home).toContain("function ArtifactAndSpecialistNavigator()");
    expect(home).toContain("<ArtifactAndSpecialistNavigator />");
    expect(home).toContain("Official first-party work, easy to find.");
    expect(home).toContain("Original ScrollVerse, XLVIII BLOCKS, and MEIN concept paths");
    expect(home).toContain("OPEN SUBMITTED META REFERENCE");
    expect(home).toContain("SPECIALIST GUIDE ROLES");
    expect(home).toContain("Aegis Scribe");
    expect(home).toContain("not claims of independent consciousness, private-system access, legal authority, or autonomous control");
  });

  it("registers the manufacturer readiness path without claiming a supplier, inventory, or live commercial authority", () => {
    const readiness = readProjectFile("client/src/pages/ManufacturingReadiness.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import ManufacturingReadiness from "./pages/ManufacturingReadiness"');
    expect(app).toContain('<Route path="/manufacturing-readiness" component={ManufacturingReadiness} />');
    expect(readiness).toContain("READINESS MAP · NO ACTIVE PARTNERS CLAIMED");
    expect(readiness).toContain("does not present an unverified manufacturer, product, order, inventory source, fulfillment partner, or commercial launch as active");
    expect(readiness).toContain("not a supplier directory, manufacturing quote, quality certification, or purchasing service");
    expect(home).toContain('href: "/manufacturing-readiness"');
  });

  it("registers community-impact incentive readiness without claiming an active token, payout, or direct beneficiary workflow", () => {
    const impact = readProjectFile("client/src/pages/ImpactIncentiveReadiness.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import ImpactIncentiveReadiness from "./pages/ImpactIncentiveReadiness"');
    expect(app).toContain('<Route path="/impact-incentive-readiness" component={ImpactIncentiveReadiness} />');
    expect(impact).toContain("IMPACT INCENTIVE READINESS · NO ACTIVE DISTRIBUTION");
    expect(impact).toContain("does not ask minors or survivors to connect wallets");
    expect(impact).toContain("not a financial product, token sale, investment offer, charity registration, direct-aid intake, or guarantee of benefit");
    expect(impact).toContain("does not ask minors or survivors to connect wallets, share sensitive identity data");
    expect(home).toContain('href: "/impact-incentive-readiness"');
  });

  it("registers an authenticated, idempotent Revenue Operations review digest with no transactional action", () => {
    const server = readProjectFile("server/_core/index.ts");
    const digest = readProjectFile("server/scheduled/revenueOperationsDigest.ts");
    expect(server).toContain('app.post("/api/scheduled/revenue-operations-digest", revenueOperationsDigestHandler)');
    expect(digest).toContain("cron-only");
    expect(digest).toContain("scheduleCronTaskUid, cronUser.taskUid");
    expect(digest).toContain("already-delivered");
    expect(digest).toContain("does not initiate charges, payouts, token actions, provider changes, or deployments");
  });

  it("registers the free creator-owned Spiral Signature page with a public QR record and no commercial activation", () => {
    const signature = readProjectFile("client/src/pages/SpiralSignature.tsx");
    const spiral = readProjectFile("shared/spiralSignature.ts");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import SpiralSignature from "./pages/SpiralSignature"');
    expect(app).toContain('<Route path="/spiral-signature" component={SpiralSignature} />');
    expect(signature).toContain("FREE · CREATOR-OWNED · CONCEPT REVIEW");
    expect(signature).toContain("This QR code resolves to the public Manus Hero Codex");
    expect(signature).toContain("contains no credential, private key, session value, personal record, or hidden instruction");
    expect(signature).toContain("Formal clearance, filing, licensing, product use, marketplace listings, token utilities, and enforcement are separate review paths");
    expect(spiral).toContain("creator_owned");
    expect(home).toContain('href: "/spiral-signature"');
  });
  it("replaces legacy deployment placeholders with public evidence controls and no wallet-action claim", () => {
    const deploy = readProjectFile("client/src/pages/Deploy.tsx");
    expect(deploy).toContain("PUBLIC DEPLOYMENT EVIDENCE CONSOLE");
    expect(deploy).toContain("Scroll zkEVM and Polygon are separate network records");
    expect(deploy).toContain("Open ScrollScan");
    expect(deploy).toContain("Open Knicks NFT route");
    expect(deploy).toContain("LONDCToken");
    expect(deploy).toContain("MetatronCodex");
    expect(deploy).toContain("No confirmed Scroll mainnet contract address is in the current evidence bundle");
    expect(deploy).toContain("does not broadcast, mint, transfer, purchase, custody assets, connect a wallet");
    expect(deploy).toContain("toast.success");
    expect(deploy).toContain("SCROLLSCAN PUBLIC TRACTION");
    expect(deploy).toContain("These figures describe public Scroll network activity, not ScrollVerse-specific traffic");
    expect(deploy).toContain("Open live ScrollScan stats");
  });
  it("keeps the local Hardhat preflight free of a source-controlled private-key fallback", () => {
    const hardhat = readProjectFile("blockchain/config/hardhat.config.cjs");
    const workspaceHardhat = readProjectFile("blockchain/hardhat.config.cjs");
    const codex = readProjectFile("blockchain/contracts/MetatronCodex.sol");
    expect(hardhat).toContain("const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY");
    expect(hardhat).toContain("const DEPLOYER_ACCOUNTS = DEPLOYER_KEY ? [DEPLOYER_KEY] : []");
    expect(hardhat).toContain("accounts: DEPLOYER_ACCOUNTS");
    expect(hardhat).toContain('const PROJECT_ROOT = path.resolve(__dirname, "../..")');
    expect(hardhat).toContain('sources: path.join(PROJECT_ROOT, "blockchain/contracts")');
    expect(hardhat).not.toContain("0000000000000000000000000000000000000000000000000000000000000001");
    expect(workspaceHardhat).toContain('version: "0.8.26"');
    expect(workspaceHardhat).toContain('evmVersion: "cancun"');
    expect(workspaceHardhat).toContain('sources: "./contracts"');
    expect(workspaceHardhat).toContain("const DEPLOYER_ACCOUNTS = DEPLOYER_KEY ? [DEPLOYER_KEY] : []");
    expect(codex).toContain('unicode"Solomon Key — Star of David"');
  });
  it("registers the owner-supplied Skool public-reference trail with source links and evidence boundaries", () => {
    const trail = readProjectFile("client/src/pages/PublicReferenceTrail.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const record = readProjectFile("docs/phase163-skool-public-reference-register.md");
    expect(app).toContain('import PublicReferenceTrail from "./pages/PublicReferenceTrail"');
    expect(app).toContain('<Route path="/public-reference-trail" component={PublicReferenceTrail} />');
    expect(trail).toContain("SKOOL PUBLIC REFERENCE TRAIL");
    expect(trail).toContain("https://github.com/chaishillomnitech1");
    expect(trail).toContain("https://github.com/LayerZero-Labs/omnichain-governance-executor");
    expect(trail).toContain("https://cryptoadventure.com/scroll-dao-to-pause-governance-structure-amid-leadership-shake-up-redesign-plans/");
    expect(trail).toContain("do not, by themselves, verify account control, an affiliation, audience influence");
    expect(trail).toContain("Copy all public links");
    expect(home).toContain('href: "/public-reference-trail"');
    expect(record).toContain("all 28 distinct source URLs");
  });
  it("registers the Evidence Commons with synchronized public pathways and causal-evidence boundaries", () => {
    const commons = readProjectFile("client/src/pages/EvidenceCommons.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const method = readProjectFile("docs/phase164-evidence-commons-method.md");
    expect(app).toContain('import EvidenceCommons from "./pages/EvidenceCommons"');
    expect(app).toContain('<Route path="/evidence-commons" component={EvidenceCommons} />');
    expect(commons).toContain("SCROLLVERSE EVIDENCE COMMONS");
    expect(commons).toContain("Temporal overlap");
    expect(commons).toContain("Causal evidence");
    expect(commons).toContain("PROJECT PERSPECTIVE · OPEN INTERPRETATION");
    expect(commons).toContain("independent product roadmaps, broad ecosystem trends, coincident timing, parallel research");
    expect(commons).toContain("https://www.perplexity.ai/changelog");
    expect(commons).toContain("https://docs.github.com/en/copilot/release-notes");
    expect(commons).toContain("Channel synchronization here means a maintained link registry");
    expect(commons).toContain("does not decide truth for a visitor");
    expect(commons).toContain("MOBILE + WEB CONTINUITY");
    expect(commons).toContain("not a claim that a native app store build, push notification system");
    expect(home).toContain('href: "/evidence-commons"');
    expect(method).toContain("Public timing may document that two events occurred near each other");
  });
  it("surfaces the Sovereignty 9 Knicks collection as an evidence-labeled Home highlight without commercial or rights claims", () => {
    const home = readProjectFile("client/src/pages/Home.tsx");
    const inventory = readProjectFile("docs/phase166-knicks-collection-inventory.md");
    expect(home).toContain("SOVEREIGNTY 9 · COLLECTION RECORD");
    expect(home).toContain("SCROLL TESTNET PATH LABELED");
    expect(home).toContain("/knicks-nft");
    expect(home).toContain("/deploy");
    expect(home).toContain("without presenting an unverified production contract, coin, mint, sale, payout, or sports result as live");
    expect(home).toContain("No affiliation with, endorsement by, or rights claim regarding the NBA");
    expect(inventory).toContain("Testnet Ready");
  });
  it("registers the respectful Main Page Action Wheel with devotional, regional, creator, and source-first pathways", () => {
    const home = readProjectFile("client/src/pages/Home.tsx");
    const names = readProjectFile("client/src/pages/NinetyNineNames.tsx");
    const gulf = readProjectFile("client/src/pages/GulfLearning.tsx");
    const collections = readProjectFile("client/src/pages/CreatorCollectionRecords.tsx");
    const record = readProjectFile("docs/phase167-action-wheel-research.md");
    expect(app).toContain('import NinetyNineNames from "./pages/NinetyNineNames"');
    expect(app).toContain('<Route path="/99-names" component={NinetyNineNames} />');
    expect(app).toContain('<Route path="/gulf-learning" component={GulfLearning} />');
    expect(app).toContain('<Route path="/creator-collection-records" component={CreatorCollectionRecords} />');
    expect(home).toContain("MAIN PAGE ACTION WHEEL");
    expect(home).toContain("Devotional material is presented with respect and is never gamified");
    expect(home).toContain("Privacy note: this Action Wheel is a route directory");
    expect(home).toContain("NIPSEY BLUE · CEREAL KILLER");
    expect(names).toContain("99 Names of");
    expect(names).toContain("not a game, scorecard, spiritual ranking, commercial offer");
    expect(gulf).toContain("Dubai & UAE cultural learning");
    expect(gulf).toContain("Saudi cultural learning");
    expect(collections).toContain("Nipsey Blue");
    expect(collections).toContain("Cereal Killer");
    expect(collections).toContain("no association, endorsement, licensing");
    expect(collections).toContain("Data-minimization note: this public collection page does not accept uploads");
    expect(record).toContain("Devotional, voluntary, non-commercial study");
  });
  it("preserves attached archive and royalty-task patterns as source-labeled media stewardship without activation claims", () => {
    const studio = readProjectFile("client/src/pages/CreatorMediaStudio.tsx");
    const register = readProjectFile("docs/phase169-referenced-task-source-register.md");
    expect(studio).toContain("REFERENCED ARCHIVE STEWARDSHIP");
    expect(studio).toContain("owner-attached Diagram and File References task");
    expect(studio).toContain("owner-attached blockchain-royalty task");
    expect(studio).toContain("do not grant private-system access, third-party publishing authority");
    expect(studio).toContain("/public-reference-trail");
    expect(studio).toContain("/evidence-commons");
    expect(register).toContain("ajUx1OrfDpJAs4yffByeSx");
    expect(register).toContain("cyMGdw94X7ekXdmhla8SgL");
    expect(register).toContain("wLBwFQQQ6uqoc2Tn2mAWbR");
    expect(register).toContain("does not prove an active royalty flow, payout, contract deployment");
  });
  it("registers the source-led Operational Safeguards controls without claiming a referenced startup audit activated connectors", () => {
    const safeguards = readProjectFile("client/src/pages/OperationalSafeguards.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const review = readProjectFile("docs/phase170-master-startup-reference-review.md");
    expect(app).toContain('import OperationalSafeguards from "./pages/OperationalSafeguards"');
    expect(app).toContain('<Route path="/operational-safeguards" component={OperationalSafeguards} />');
    expect(safeguards).toContain("OPERATIONAL SAFEGUARDS · SOURCE-LED CONTROLS");
    expect(safeguards).toContain("MANAGED CONNECTORS");
    expect(safeguards).toContain("DRY-RUN");
    expect(safeguards).toContain("IDEMPOTENCY");
    expect(safeguards).toContain("SECRET ISOLATION");
    expect(safeguards).toContain("Platform capabilities stay inside their managed boundary");
    expect(safeguards).toContain("without exposing private configuration or representing a 99-connector activation");
    expect(home).toContain('href: "/operational-safeguards"');
    expect(review).toContain("Managed capability boundary");
  });
  it("registers the first-party Media Readiness Lab with local inspection and provider-preparation boundaries", () => {
    const lab = readProjectFile("client/src/pages/MediaReadinessLab.tsx");
    const studio = readProjectFile("client/src/pages/CreatorMediaStudio.tsx");
    const audit = readProjectFile("docs/phase172-creator-media-readiness-audit.md");
    expect(app).toContain('import MediaReadinessLab from "./pages/MediaReadinessLab"');
    expect(app).toContain('<Route path="/media-readiness-lab" component={MediaReadinessLab} />');
    expect(lab).toContain("FIRST-PARTY PROVIDER-PREPARATION LAB");
    expect(lab).toContain('crypto.subtle.digest("SHA-256"');
    expect(lab).toContain("Selecting a file here does not upload it");
    expect(lab).toContain("does not upload media, grant rights, create a distributor delivery");
    expect(studio).toContain('href="/media-readiness-lab"');
    expect(audit).toContain("Spotify prefers FLAC");
  });
  it("registers the source-labeled Distribution Highways map without claiming provider access or delivery", () => {
    const map = readProjectFile("client/src/pages/DistributionHighwaysMap.tsx");
    const register = readProjectFile("docs/phase173-distribution-highways-source-register.md");
    expect(app).toContain('import DistributionHighwaysMap from "./pages/DistributionHighwaysMap"');
    expect(app).toContain('<Route path="/distribution-highways" component={DistributionHighwaysMap} />');
    expect(map).toContain("DISTRIBUTION HIGHWAYS · PUBLIC SOURCE MAP");
    expect(map).toContain("UnitedMasters");
    expect(map).toContain("Sony Music Entertainment");
    expect(map).toContain("Netflix Partner Help Center");
    expect(map).toContain("does not establish a partnership, account, submission authority, delivery");
    expect(map).toContain("A visible public route does not establish a partnership");
    expect(register).toContain("Hulu Content Portal");
    expect(register).toContain("The Orchard");
  });
  it("registers the Artist Control Desk with first-party assistance and evidence-gated incentive boundaries", () => {
    const desk = readProjectFile("client/src/pages/ArtistControlDesk.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const record = readProjectFile("docs/phase174-artist-control-desk.md");
    expect(app).toContain('import ArtistControlDesk from "./pages/ArtistControlDesk"');
    expect(app).toContain('<Route path="/artist-control-desk" component={ArtistControlDesk} />');
    expect(desk).toContain("ARTIST CONTROL DESK · FIRST-PARTY ASSISTANCE");
    expect(desk).toContain("SPECIALIZED ASSISTANCE");
    expect(desk).toContain("AFFORDABLE BY DESIGN · INCENTIVE READINESS");
    expect(desk).toContain("Tokenized service incentive");
    expect(desk).toContain("Kickback or revenue share");
    expect(desk).toContain("does not upload your work, sign agreements, send media");
    expect(home).toContain('href: "/artist-control-desk"');
    expect(record).toContain("Any tokenized service, creator reward, kickback");
  });

  it("registers ConsoleVerse as a first-party operations layer without claiming third-party CRM access", () => {
    const consoleverse = readProjectFile("client/src/pages/ConsoleVerse.tsx");
    const record = readProjectFile("docs/phase171-consoleverse-patterns.md");
    const expansion = readProjectFile("docs/phase180-consoleverse-workflow-patterns.md");
    expect(app).toContain('import ConsoleVerse from "./pages/ConsoleVerse"');
    expect(app).toContain('<Route path="/consoleverse" component={ConsoleVerse} />');
    expect(consoleverse).toContain("CONSOLEVErSE · CREATOR OPERATIONS LAYER");
    expect(consoleverse).toContain("Relationship record");
    expect(consoleverse).toContain("Visible workflow");
    expect(consoleverse).toContain("does not copy another company’s code");
    expect(consoleverse).toContain("BROWSER-LOCAL OPERATION LENSES");
    expect(consoleverse).toContain("RELATIONSHIP RECORD BLUEPRINT");
    expect(consoleverse).toContain("ILLUSTRATIVE WORKFLOW TEMPLATE · NOT A CURRENT RELEASE RECORD");
    expect(consoleverse).toContain("EXCEPTION REGISTER · VISIBLE BLOCKERS");
    expect(consoleverse).toContain("does not create external CRM records, access another company’s account");
    expect(record).toContain("no proprietary code, account access, or implementation is copied");
    expect(expansion).toContain("Stage-gated review");
    expect(expansion).toContain("No automated escalation, notification, account action");
  });

  it("registers the Inclusive Opportunity Navigator with free preparation and external eligibility boundaries", () => {
    const navigator = readProjectFile("client/src/pages/OpportunityNavigator.tsx");
    const record = readProjectFile("docs/phase175-inclusive-opportunity-navigator.md");
    expect(app).toContain('import OpportunityNavigator from "./pages/OpportunityNavigator"');
    expect(app).toContain('<Route path="/opportunity-navigator" component={OpportunityNavigator} />');
    expect(navigator).toContain("INCLUSIVE OPPORTUNITY NAVIGATOR");
    expect(navigator).toContain("National Endowment for the Arts");
    expect(navigator).toContain("does not bypass a grant, platform, employer, or provider’s eligibility rules");
    expect(navigator).toContain("does not collect applications, decide eligibility");
    expect(record).toContain("does not bypass provider, employer, platform, grant");
  });

  it("registers the GitHub Showcase as a source-labeled public repository directory without account or deployment claims", () => {
    const showcase = readProjectFile("client/src/pages/GitHubShowcase.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const record = readProjectFile("docs/phase177-github-showcase-source-record.md");
    expect(app).toContain('import GitHubShowcase from "./pages/GitHubShowcase"');
    expect(app).toContain('<Route path="/github-showcase" component={GitHubShowcase} />');
    expect(showcase).toContain("GITHUB REPOSITORY SHOWCASE");
    expect(showcase).toContain("repositories.length");
    expect(showcase).toContain("public repositories returned");
    expect(showcase).toContain("Filter GitHub repositories");
    expect(showcase).toContain("Inspect public source");
    expect(showcase).toContain("does not search GitHub live, access private repositories, or collect visitor data");
    expect(showcase).toContain("not an audit, legal title record, account-control verification, deployment ledger");
    expect(showcase).toContain("scrollsoul-music-sync");
    expect(showcase).toContain("vibranium-sovereignty-protocol");
    expect(home).toContain('href: "/github-showcase"');
    expect(record).toContain("51 public repositories");
    expect(record).toContain("public repository does not, by itself, establish deployment");
  });

  it("registers the Digital Footprint Report with dated evidence classes, source routes, and explicit causal limits", () => {
    const report = readProjectFile("client/src/pages/DigitalFootprintReport.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const reconciliation = readProjectFile("docs/phase178-digital-footprint-reconciliation.md");
    expect(app).toContain('import DigitalFootprintReport from "./pages/DigitalFootprintReport"');
    expect(app).toContain('<Route path="/digital-footprint-report" component={DigitalFootprintReport} />');
    expect(report).toContain("DIGITAL FOOTPRINT REPORT");
    expect(report).toContain("Documented record");
    expect(report).toContain("Temporal overlap");
    expect(report).toContain("Causal evidence");
    expect(report).toContain("Coexistence in a timeline is not proof of causation");
    expect(report).toContain("The original August 13 research review reported 50 deduplicated records");
    expect(report).toContain("does not collect visitor data, search private accounts");
    ["/evidence-commons", "/github-showcase", "/signalworks", "/public-reference-trail", "/deploy", "/knowledge-navigator"].forEach(route => expect(report).toContain(route));
    expect(home).toContain('href: "/digital-footprint-report"');
    expect(reconciliation).toContain("50 deduplicated repository records");
    expect(reconciliation).toContain("51 public repositories");
  });

  it("registers the Creator Channel Hub with local organization and no fabricated platform-video metadata", () => {
    const hub = readProjectFile("client/src/pages/CreatorChannelHub.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const record = readProjectFile("docs/phase179-creator-channel-source-record.md");
    expect(app).toContain('import CreatorChannelHub from "./pages/CreatorChannelHub"');
    expect(app).toContain('<Route path="/creator-channel-hub" component={CreatorChannelHub} />');
    expect(hub).toContain("CREATOR CHANNEL HUB");
    expect(hub).toContain("BROWSER-LOCAL ORGANIZER");
    expect(hub).toContain("DIRECT LINK · METADATA UNLISTED");
    expect(hub).toContain("does not invent a top-video chart, view count, upload date, or platform connection");
    expect(hub).toContain("does not retrieve live YouTube or Spotify data, authenticate a channel");
    expect(hub).toContain("Junior Movies is linked as a youth-and-family discovery destination");
    expect(hub).toContain("https://youtu.be/wwXqO99diH0");
    expect(home).toContain('href: "/creator-channel-hub"');
    expect(record).toContain("Google’s automated-traffic verification page");
    expect(record).toContain("must not label that ID as a verified creator channel");
  });
  it("registers Scroll Network Context with source classes and explicit valuation, token, and deployment limits", () => {
    const context = readProjectFile("client/src/pages/ScrollNetworkContext.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const register = readProjectFile("docs/phase183-scroll-ecosystem-source-register.md");
    expect(app).toContain('import ScrollNetworkContext from "./pages/ScrollNetworkContext"');
    expect(app).toContain('<Route path="/scroll-network-context" component={ScrollNetworkContext} />');
    expect(context).toContain("SCROLL NETWORK CONTEXT");
    expect(context).toContain("CHAIN CONTEXT · NOT SCROLLVERSE CLAIMS");
    expect(context).toContain("Scribd presentation with a similar name");
    expect(context).toContain("not a ScrollVerse.co record");
    expect(context).toContain("A listed figure is not a verified value");
    expect(context).toContain("Explorer context is not a deployment record");
    expect(context).toContain("does not provide investment, legal, tax, or financial advice");
    expect(context).toContain("534352");
    expect(home).toContain('href: "/scroll-network-context"');
    expect(register).toContain("separately attributed project with a similar name");
    expect(register).toContain("not incorporate current dashboard figures as permanent status");
  });
  it("registers the Crypto Systems Atlas with evidence gates and no financial, custody, or transaction activation", () => {
    const atlas = readProjectFile("client/src/pages/CryptoSystemsAtlas.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const register = readProjectFile("docs/phase184-crypto-systems-atlas-source-register.md");
    expect(app).toContain('import CryptoSystemsAtlas from "./pages/CryptoSystemsAtlas"');
    expect(app).toContain('<Route path="/crypto-systems-atlas" component={CryptoSystemsAtlas} />');
    expect(atlas).toContain("CRYPTO SYSTEMS ATLAS");
    expect(atlas).toContain("Build capability from evidence, not imitation.");
    expect(atlas).toContain("ERC-2981");
    expect(atlas).toContain("A royalty interface is not a revenue guarantee");
    expect(atlas).toContain("ScrollVerse does not request recovery phrases, private keys");
    expect(atlas).toContain("does not issue, buy, sell, hold, transfer, custody, value, list, stake, bridge, mint");
    expect(home).toContain('href: "/crypto-systems-atlas"');
    expect(register).toContain("Crypto Systems Atlas is a first-party educational map");
    expect(register).toContain("An interface standard does not guarantee value, liquidity");
  });
  it("registers the Artifact Evidence Blueprint with integrity context and no artifact, hash, or transaction claim", () => {
    const blueprint = readProjectFile("client/src/pages/ArtifactEvidenceBlueprint.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const review = readProjectFile("docs/phase185-shared-reference-review.md");
    expect(app).toContain('import ArtifactEvidenceBlueprint from "./pages/ArtifactEvidenceBlueprint"');
    expect(app).toContain('<Route path="/artifact-evidence-blueprint" component={ArtifactEvidenceBlueprint} />');
    expect(blueprint).toContain("ARTIFACT EVIDENCE BLUEPRINT");
    expect(blueprint).toContain("A hash can compare data. It cannot tell the whole story.");
    expect(blueprint).toContain("A blueprint is not a command.");
    expect(blueprint).toContain("does not save, hash, upload, sign, or publish any material");
    expect(blueprint).toContain("does not make an ownership, authenticity, weight, metal-content, custody, valuation");
    expect(blueprint).toContain("https://www.nist.gov/glossary-term/38726");
    expect(home).toContain('href: "/artifact-evidence-blueprint"');
    expect(review).toContain("user-supplied ideas, not as deployed code");
    expect(review).toContain("Hash, Hash Value");
  });
  it("registers the Institutional Systems Atlas with observable practices and no financial or institutional action claim", () => {
    const atlas = readProjectFile("client/src/pages/InstitutionalSystemsAtlas.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const register = readProjectFile("docs/phase188-institutional-systems-source-register.md");
    expect(app).toContain('import InstitutionalSystemsAtlas from "./pages/InstitutionalSystemsAtlas"');
    expect(app).toContain('<Route path="/institutional-systems-atlas" component={InstitutionalSystemsAtlas} />');
    expect(atlas).toContain("INSTITUTIONAL SYSTEMS ATLAS");
    expect(atlas).toContain("Systems improve when their limits are visible.");
    expect(atlas).toContain("A practical first-party sequence.");
    expect(atlas).toContain("Learning is not a transaction.");
    expect(atlas).toContain("does not take deposits, custody assets, extend credit, originate loans");
    expect(atlas).toContain("Historical, religious, philosophical, cultural, and personal narratives");
    expect(home).toContain('href: "/institutional-systems-atlas"');
    expect(register).toContain("The strongest reusable lesson is not “copy an institution.”");
    expect(register).toContain("does not create a legal, financial, investment, lending, payment, custody");
  });
  it("registers the Operating Pattern Navigator as a first-party route map with evidence and no-hidden-action boundaries", () => {
    const navigator = readProjectFile("client/src/pages/OperatingPatternNavigator.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const record = readProjectFile("docs/phase190-operating-pattern-application.md");
    expect(app).toContain('import OperatingPatternNavigator from "./pages/OperatingPatternNavigator"');
    expect(app).toContain('<Route path="/operating-pattern-navigator" component={OperatingPatternNavigator} />');
    expect(navigator).toContain("OPERATING PATTERN NAVIGATOR");
    expect(navigator).toContain("Make the operating pattern visible.");
    expect(navigator).toContain("BROWSER-LOCAL OPERATING LENSES");
    expect(navigator).toContain("does not write a record, send a notification, create an account");
    expect(navigator).toContain("A template is not a legal board, delegated authority, binding approval");
    expect(navigator).toContain("A visitor can inspect the route, read the evidence boundary");
    expect(home).toContain('href: "/operating-pattern-navigator"');
    expect(record).toContain("applies the Institutional Systems Atlas as a route-level practice map");
    expect(record).toContain("no-hidden-action approach");
  });
  it("registers the Financial Systems Capability Map with connected responsibility lanes and no financial-service activation", () => {
    const map = readProjectFile("client/src/pages/FinancialSystemsCapabilityMap.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const register = readProjectFile("docs/phase191-financial-systems-source-register.md");
    const rules = readProjectFile("docs/phase192-responsibility-lane-rules.md");
    expect(app).toContain('import FinancialSystemsCapabilityMap from "./pages/FinancialSystemsCapabilityMap"');
    expect(app).toContain('<Route path="/financial-systems-capability-map" component={FinancialSystemsCapabilityMap} />');
    expect(map).toContain("FINANCIAL SYSTEMS CAPABILITY MAP");
    expect(map).toContain("Connect the learning. Separate the responsibility.");
    expect(map).toContain("BROWSER-LOCAL RESPONSIBILITY LENSES");
    expect(map).toContain("A capability map is not a service launch.");
    expect(map).toContain("does not take deposits, hold funds, hold securities, custody digital assets, lend, borrow");
    expect(map).toContain("does not request data, open an account, connect a wallet");
    expect(home).toContain('href: "/financial-systems-capability-map"');
    expect(register).toContain("connected learning system should display the handoff between responsibilities");
    expect(rules).toContain("May not do without a separate reviewed, authorized action");
  });
  it("registers the Lawful Operating Navigator with transparent boundaries and no evasion strategy", () => {
    const navigator = readProjectFile("client/src/pages/LawfulOperatingNavigator.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const register = readProjectFile("docs/phase194-lawful-operating-source-register.md");
    expect(app).toContain('import LawfulOperatingNavigator from "./pages/LawfulOperatingNavigator"');
    expect(app).toContain('<Route path="/lawful-operating-navigator" component={LawfulOperatingNavigator} />');
    expect(navigator).toContain("LAWFUL AND AUDITABLE OPERATING NAVIGATOR");
    expect(navigator).toContain("Build the advantage that can show its work.");
    expect(navigator).toContain("supports original, lawful systems design");
    expect(navigator).toContain("BROWSER-LOCAL PRACTICE LENSES");
    expect(navigator).toContain("does not submit, file, contact, purchase, connect, sign, transfer");
    expect(navigator).toContain("does not teach a way to evade a rule, exploit a loophole");
    expect(home).toContain('href: "/lawful-operating-navigator"');
    expect(register).toContain("Working analysis, not formal legal advice");
    expect(register).toContain("supports original, lawful systems design");
  });
  it("registers the Original Systems Hub as a connected first-party route map with distinct responsibility lanes", () => {
    const hub = readProjectFile("client/src/pages/OriginalSystemsHub.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const integration = readProjectFile("docs/phase196-original-systems-integration.md");
    expect(app).toContain('import OriginalSystemsHub from "./pages/OriginalSystemsHub"');
    expect(app).toContain('<Route path="/original-systems-hub" component={OriginalSystemsHub} />');
    expect(hub).toContain("ORIGINAL SYSTEMS HUB");
    expect(hub).toContain("One operating language. Distinct responsibilities.");
    expect(hub).toContain("BROWSER-LOCAL SYSTEM LENSES");
    expect(hub).toContain("18");
    expect(hub).toContain("does not modify a record, access an account, connect an external service");
    expect(hub).toContain("does not trigger a provider delivery, financial service, contract transaction");
    expect(home).toContain('href: "/original-systems-hub"');
    expect(integration).toContain("one shared vocabulary");
    expect(integration).toContain("does not access private records, change a workflow");
  });
  it("uses evidence-first Home hero language instead of unsupported live scale, token, and metric claims", () => {
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(home).toContain("creator-owned, source-led digital ecosystem");
    expect(home).toContain("Chais “Sabir Kajir” Hill the Great");
    expect(home).toContain("SOURCE-LED ROUTES · TESTED BUILD · FIRST-PARTY SYSTEMS");
    expect(home).toContain("GUARDIAN PATHWAY · OWNER-CONTROLLED FOLLOW-UP");
    expect(home).toContain("Sound study");
    expect(home).not.toContain("24 TESTS PASSING · 53 REPOSITORIES");
    expect(home).not.toContain("Zakat distribution, and 50M+ user scaling — all unified");
    expect(home).not.toContain('label: "Healing"');
  });

  it("registers the public Manifesto and Builder’s Book with adaptive cover, functional audio, and translation-review boundaries", () => {
    const book = readProjectFile("client/src/pages/ManifestoBuildersBook.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const manuscript = readProjectFile("docs/SCROLLVERSE_MANIFESTO_AND_BUILDERS_BOOK.md");
    expect(app).toContain('import ManifestoBuildersBook from "./pages/ManifestoBuildersBook"');
    expect(app).toContain('<Route path="/manifesto-builders-book" component={ManifestoBuildersBook} />');
    expect(book).toContain("ScrollVerse Manifesto and Builder’s Book");
    expect(book).toContain("Touch-responsive reading cover");
    expect(book).toContain("AUDIO EDITION · ENGLISH OPENING");
    expect(book).toContain("scrollverse-manifesto-opening-en-us_63edd596.wav");
    expect(book).toContain("LANGUAGE ACCESS FOUNDATION");
    expect(book).toContain("Translation review queue");
    expect(book).toContain("does not generate a translation");
    expect(book).toContain("does not activate a provider, create an account, accept payment");
    expect(home).toContain('href: "/manifesto-builders-book"');
    expect(manuscript).toContain("A free book for builders, creators, families");
    expect(manuscript).toContain("Build with imagination. Operate with evidence.");
  });

  it("registers Books and Media Readiness with truthful delivery and distribution states", () => {
    const readiness = readProjectFile("client/src/pages/BooksMediaReadiness.tsx");
    const audit = readProjectFile("docs/phase201-books-media-readiness-audit.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import BooksMediaReadiness from "./pages/BooksMediaReadiness"');
    expect(app).toContain('<Route path="/books-media-readiness" component={BooksMediaReadiness} />');
    expect(readiness).toContain("Books and Media Readiness");
    expect(readiness).toContain("SOURCE-LED RELEASE INVENTORY");
    expect(readiness).toContain("AUDIO AND VISUAL RELEASE");
    expect(readiness).toContain("not proof that a book has been uploaded, accepted, published");
    expect(readiness).toContain("does not itself publish a book, create a translation");
    expect(readiness).toContain("OFFICIAL PREPARATION SOURCES · OUTBOUND");
    expect(readiness).toContain("Amazon KDP metadata guide");
    expect(readiness).toContain("Apple Books publishing guide");
    expect(readiness).toContain("Spotify for Authors guide");
    expect(audit).toContain("local-state mint simulation");
    expect(audit).toContain("No full audiobook, video, or motion edition is claimed");
    expect(home).toContain('href: "/books-media-readiness"');
  });

  it("registers Recovery Materials as a source-labeled concept navigator with private and unverified-material boundaries", () => {
    const recovery = readProjectFile("client/src/pages/RecoveryMaterials.tsx");
    const register = readProjectFile("docs/phase203-recovery-materials-register.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import RecoveryMaterials from "./pages/RecoveryMaterials"');
    expect(app).toContain('<Route path="/recovery-materials" component={RecoveryMaterials} />');
    expect(recovery).toContain("Recovery Materials Navigator");
    expect(recovery).toContain("Owner review required");
    expect(recovery).toContain("Source-labeled concept only");
    expect(recovery).toContain("It does not upload, copy, release, or alter the supplied recovery exports");
    expect(recovery).toContain("not a restored system, a technical audit, a publication record");
    expect(register).toContain("Five user-supplied recovery text exports were classified");
    expect(register).toContain("The public navigator contains classifications and high-level concept lenses");
    expect(home).toContain('href: "/recovery-materials"');
  });

  it("registers public co-creation with browser-local drafting, protected handoff, and explicit review boundaries", () => {
    const coCreation = readProjectFile("client/src/pages/CoCreationNavigator.tsx");
    const protocol = readProjectFile("docs/phase204-public-co-creation-protocol.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import CoCreationNavigator from "./pages/CoCreationNavigator"');
    expect(app).toContain('<Route path="/co-creation-navigator" component={CoCreationNavigator} />');
    expect(coCreation).toContain("Co-Creation Navigator");
    expect(coCreation).toContain("BROWSER-LOCAL PROPOSAL DRAFT");
    expect(coCreation).toContain("Protected Contributor Handoff");
    expect(coCreation).toContain("Copy proposal draft");
    expect(coCreation).toContain("automatic publication, system change, commercial agreement");
    expect(coCreation).toContain("Do not submit secrets, credentials, recovery phrases");
    expect(protocol).toContain("The material remains a local proposal");
    expect(protocol).toContain("Young creators should participate with a parent");
    expect(coCreation).toContain("Recovery Materials Register");
    expect(home).toContain('href: "/co-creation-navigator"');
  });

  it("registers the Idea Exchange and portal-wide trust standard with browser-local social collaboration boundaries", () => {
    const exchange = readProjectFile("client/src/pages/IdeaExchange.tsx");
    const standard = readProjectFile("client/src/pages/PortalTrustStandard.tsx");
    const designRecord = readProjectFile("docs/phase207-social-cocreation-design-record.md");
    const lens = readProjectFile("client/src/components/PortalTrustLens.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import IdeaExchange from "./pages/IdeaExchange"');
    expect(app).toContain('import PortalTrustStandard from "./pages/PortalTrustStandard"');
    expect(app).toContain('<Route path="/idea-exchange" component={IdeaExchange} />');
    expect(app).toContain('<Route path="/portal-trust-standard" component={PortalTrustStandard} />');
    expect(exchange).toContain("Idea Exchange");
    expect(exchange).toContain("BROWSER-LOCAL DRAFT");
    expect(exchange).toContain("COMPLEMENTARY-STRENGTH LENS");
    expect(exchange).toContain("not a live chatroom, public social feed");
    expect(standard).toContain("Portal Trust Standard");
    expect(standard).toContain("every major lane should show what it is");
    expect(lens).toContain("PORTAL PERSPECTIVE LENS");
    expect(designRecord).toContain("does not create public profiles");
    expect(home).toContain('href: "/idea-exchange"');
    expect(home).toContain('href: "/portal-trust-standard"');
  });

  it("registers the Creator Exchange Navigator with local bundle planning and explicit direct-to-fan, platform, fulfillment, and collectible boundaries", () => {
    const exchange = readProjectFile("client/src/pages/CreatorExchangeNavigator.tsx");
    const readiness = readProjectFile("docs/phase209-creator-exchange-readiness.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import CreatorExchangeNavigator from "./pages/CreatorExchangeNavigator"');
    expect(app).toContain('<Route path="/creator-exchange-navigator" component={CreatorExchangeNavigator} />');
    expect(exchange).toContain("Creator Exchange Navigator");
    expect(exchange).toContain("BUILD A BUNDLE PLAN");
    expect(exchange).toContain("LOCAL BUNDLE READINESS BRIEF");
    expect(exchange).toContain("OFFICIAL PREPARATION REFERENCES · OUTBOUND");
    expect(exchange).toContain("does not set a price, create a SKU, publish files");
    expect(exchange).toContain("not a bank, broker, payment processor, exchange");
    expect(readiness).toContain("A release can connect music, a story, comics, artwork, books");
    expect(readiness).toContain("not a mint, listing, wallet connection, offer, custody, trade");
    expect(home).toContain('href: "/creator-exchange-navigator"');
  });

  it("registers the Creator Studio Navigator with local production planning and provider-safe music, video, art, and collaboration boundaries", () => {
    const studio = readProjectFile("client/src/pages/CreatorStudioNavigator.tsx");
    const workflow = readProjectFile("docs/phase210-creator-studio-workflow.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import CreatorStudioNavigator from "./pages/CreatorStudioNavigator"');
    expect(app).toContain('<Route path="/creator-studio-navigator" component={CreatorStudioNavigator} />');
    expect(studio).toContain("Creator Studio Navigator");
    expect(studio).toContain("PROJECT BOARD · LOCAL DRAFT");
    expect(studio).toContain("FIVE-STAGE PRODUCTION MAP");
    expect(studio).toContain("OFFICIAL WORKFLOW REFERENCES · OUTBOUND");
    expect(studio).toContain("does not record audio, generate music, edit video");
    expect(studio).toContain("not a recording application, digital-audio workstation");
    expect(workflow).toContain("A completed local checklist is a planning signal");
    expect(workflow).toContain("not independent proof of ownership");
    expect(home).toContain('href: "/creator-studio-navigator"');
  });

  it("registers Creator Operations Intelligence with browser-local evidence planning, specialist boundaries, and legal-information limits", () => {
    const operations = readProjectFile("client/src/pages/CreatorOperationsIntelligence.tsx");
    const record = readProjectFile("docs/phase211-creator-operations-intelligence.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import CreatorOperationsIntelligence from "./pages/CreatorOperationsIntelligence"');
    expect(app).toContain('<Route path="/creator-operations-intelligence" component={CreatorOperationsIntelligence} />');
    expect(operations).toContain("Creator Operations Intelligence");
    expect(operations).toContain("LOCAL REVENUE-EVIDENCE BRIEF");
    expect(operations).toContain("SPECIALIST CONTROL ROOM");
    expect(operations).toContain("Financial and legal notice");
    expect(operations).toContain("does not access accounts, verify an entitlement");
    expect(operations).toContain("not a music publisher, DSP, collective management organization");
    expect(record).toContain("Streaming analytics and financial statements may differ");
    expect(record).toContain("not financial advice, legal advice, legal representation");
    expect(home).toContain('href: "/creator-operations-intelligence"');
  });

  it("registers the Release Package Checklist with title-level source, rights, accessibility, delivery, and owner-decision boundaries", () => {
    const checklist = readProjectFile("client/src/pages/ReleasePackageChecklist.tsx");
    const record = readProjectFile("docs/phase202-release-package-checklist.md");
    expect(app).toContain('import ReleasePackageChecklist from "./pages/ReleasePackageChecklist"');
    expect(app).toContain('<Route path="/release-package-checklist" component={ReleasePackageChecklist} />');
    expect(checklist).toContain("Release Package Checklist");
    expect(checklist).toContain("LOCAL PREPARATION CHECKS");
    expect(checklist).toContain("All checkboxes remain only in current browser memory");
    expect(checklist).toContain("No file upload, rights assertion, price, checkout");
    expect(record).toContain("A book or media title must have a separate release record");
    expect(record).toContain("does not by itself establish rights, availability");
  });

  it("registers Creator Services with local rights and revenue evidence preparation, free-edition mapping, and financial/legal/provider boundaries", () => {
    const services = readProjectFile("client/src/pages/CreatorServicesNavigator.tsx");
    const research = readProjectFile("docs/phase213-creator-services-research.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import CreatorServicesNavigator from "./pages/CreatorServicesNavigator"');
    expect(app).toContain('<Route path="/creator-services-navigator" component={CreatorServicesNavigator} />');
    expect(services).toContain("Creator Services Navigator");
    expect(services).toContain("BROWSER-LOCAL SERVICE BRIEF");
    expect(services).toContain("FREE KNOWLEDGE EDITIONS AND SEPARATE PLATFORM EDITIONS");
    expect(services).toContain("Does not calculate money owed, collect funds, submit a claim");
    expect(services).toContain("does not recommend a price, promise a recovery result");
    expect(research).toContain("accurate, complete music metadata is essential");
    expect(research).toContain("free first-party route and a paid or external-platform edition");
    expect(home).toContain('href: "/creator-services-navigator"');
  });

  it("registers Historical Transmission Patterns as a source-labeled creative and workflow concept map with raw-material and claim boundaries", () => {
    const patterns = readProjectFile("client/src/pages/HistoricalTransmissionPatterns.tsx");
    const register = readProjectFile("docs/phase214-historical-transmission-register.md");
    const handoff = readProjectFile("docs/phase214-historical-transmission-review-handoff.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import HistoricalTransmissionPatterns from "./pages/HistoricalTransmissionPatterns"');
    expect(app).toContain('<Route path="/historical-transmission-patterns" component={HistoricalTransmissionPatterns} />');
    expect(patterns).toContain("Historical Transmission Patterns");
    expect(patterns).toContain("SOURCE-LABELED CONCEPT ONLY");
    expect(patterns).toContain("does not restore a prior project, execute a command");
    expect(patterns).toContain("No raw transmission, private detail, credential");
    expect(register).toContain("public route publishes only a high-level, source-labeled pattern map");
    expect(register).toContain("They do not establish that an earlier system exists");
    expect(handoff).toContain("Protected Review Handoff");
    expect(handoff).toContain("Do not treat this handoff as permission to publish raw records");
    expect(home).toContain('href: "/historical-transmission-patterns"');
  });

  it("registers narrative, original-media, and NFT monetization routes with source labels and fail-closed launch boundaries", () => {
    const trail = readProjectFile("client/src/pages/NarrativeSourceTrail.tsx");
    const media = readProjectFile("client/src/pages/OriginalMediaReadiness.tsx");
    const blueprint = readProjectFile("client/src/pages/NftMonetizationBlueprint.tsx");
    const research = readProjectFile("docs/phase218-nft-monetization-research.md");
    const architecture = readProjectFile("docs/phase218-nft-tokenization-monetization-blueprint.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import NarrativeSourceTrail from "./pages/NarrativeSourceTrail"');
    expect(app).toContain('import OriginalMediaReadiness from "./pages/OriginalMediaReadiness"');
    expect(app).toContain('import NftMonetizationBlueprint from "./pages/NftMonetizationBlueprint"');
    expect(app).toContain('<Route path="/narrative-source-trail" component={NarrativeSourceTrail} />');
    expect(app).toContain('<Route path="/original-media-readiness" component={OriginalMediaReadiness} />');
    expect(app).toContain('<Route path="/nft-monetization-blueprint" component={NftMonetizationBlueprint} />');
    expect(trail).toContain("Narrative Source Trail");
    expect(trail).toContain("not converted into an independently verified");
    expect(media).toContain("Original Media Readiness");
    expect(media).toContain("No third-party protected character");
    expect(blueprint).toContain("NFT Monetization Blueprint");
    expect(blueprint).toContain("AGAPECYCLE 88/12 ROUTING CONCEPT");
    expect(blueprint).toContain("No live financial or on-chain action from this route");
    expect(blueprint).toContain("previously exposed wallet secret is permanently disqualified");
    expect(research).toContain("ERC-2981 royalty interface");
    expect(architecture).toContain("Staged Utility Rather Than a Profit Promise");
    expect(architecture).toContain("No purchase should imply equity");
    expect(home).toContain('href: "/nft-monetization-blueprint"');
  });

  it("registers the empire-wide asset navigator for company, clothing-line, digital-twin, and tokenization-readiness planning without live asset actions", () => {
    const navigator = readProjectFile("client/src/pages/EmpireAssetNavigator.tsx");
    const architecture = readProjectFile("docs/phase220-empire-asset-provenance-architecture.md");
    const skill = readProjectFile("/home/ubuntu/skills/scrollverse-asset-provenance/SKILL.md");
    const reference = readProjectFile("/home/ubuntu/skills/scrollverse-asset-provenance/references/asset-record.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import EmpireAssetNavigator from "./pages/EmpireAssetNavigator"');
    expect(app).toContain('<Route path="/empire-asset-navigator" component={EmpireAssetNavigator} />');
    expect(navigator).toContain("Empire Asset Navigator");
    expect(navigator).toContain("Clothing Line and Fashion Lane");
    expect(navigator).toContain("ROSE-GOLD VISUAL SIGNATURE");
    expect(navigator).toContain("VISUAL SEAL — NOT CRYPTOGRAPHIC PROOF");
    expect(navigator).toContain("This navigator does not operate as a registry authority");
    expect(architecture).toContain("Clothing and Company Operating Rule");
    expect(architecture).toContain("not encryption or a cryptographic signature");
    expect(skill).toContain("clothing-line, company");
    expect(reference).toContain("product_spec_state");
    expect(home).toContain('href: "/empire-asset-navigator"');
  });

  it("registers Brand Feature Studio for protected feature concepts, original look planning, and no-activation promotion boundaries", () => {
    const studio = readProjectFile("client/src/pages/BrandFeatureStudio.tsx");
    const intake = readProjectFile("docs/phase222-brand-feature-media-intake.md");
    const workflow = readProjectFile("docs/phase222-brand-feature-workflow.md");
    const reference = readProjectFile("/home/ubuntu/skills/scrollverse-asset-provenance/references/brand-feature.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import BrandFeatureStudio from "./pages/BrandFeatureStudio"');
    expect(app).toContain('<Route path="/brand-feature-studio" component={BrandFeatureStudio} />');
    expect(studio).toContain("Brand Feature Studio");
    expect(studio).toContain("ST8 Drop");
    expect(studio).toContain("Owner-supplied upcoming feature idea");
    expect(studio).toContain("NO-ACTIVATION PROMOTION AND INCENTIVE BOUNDARY");
    expect(studio).toContain("does not notify any company");
    expect(intake).toContain("Owner-Supplied Prior Lookbook Build Summary");
    expect(workflow).toContain("A brand reference never advances itself");
    expect(reference).toContain("Keep disabled by default");
    expect(home).toContain('href: "/brand-feature-studio"');
  });

  it("registers the IP and Digital Evidence Navigator with dated evidence classes, official-source handoffs, and sensitive-record boundaries", () => {
    const navigator = readProjectFile("client/src/pages/IpDigitalEvidenceNavigator.tsx");
    const inventory = readProjectFile("docs/phase219-ip-digital-evidence-inventory.md");
    const architecture = readProjectFile("docs/phase219-ip-digital-evidence-architecture.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import IpDigitalEvidenceNavigator from "./pages/IpDigitalEvidenceNavigator"');
    expect(app).toContain('<Route path="/ip-digital-evidence-navigator" component={IpDigitalEvidenceNavigator} />');
    expect(navigator).toContain("IP and Digital Evidence Navigator");
    expect(navigator).toContain("Independently verified official record");
    expect(navigator).toContain("does not accept sensitive records");
    expect(navigator).toContain("SENSITIVE-RECORD AND LEGAL BOUNDARY");
    expect(inventory).toContain("Registration Data Access Protocol");
    expect(architecture).toContain("browser-local record builder deliberately excludes sensitive material");
    expect(home).toContain('href: "/ip-digital-evidence-navigator"');
  });

  it("registers the Institutional Systems Atlas as a source-led, non-transactional payment and creator-commerce learning route", () => {
    const atlas = readProjectFile("client/src/pages/InstitutionalSystemsAtlas.tsx");
    const research = readProjectFile("docs/phase186-transactional-institutional-systems-research.md");
    const architecture = readProjectFile("docs/phase186-transactional-institutional-systems-architecture.md");
    const home = readProjectFile("client/src/pages/Home.tsx");
    expect(app).toContain('import InstitutionalSystemsAtlas from "./pages/InstitutionalSystemsAtlas"');
    expect(app).toContain('<Route path="/institutional-systems-atlas" component={InstitutionalSystemsAtlas} />');
    expect(atlas).toContain("INSTITUTIONAL SYSTEMS ATLAS");
    expect(atlas).toContain("BROWSER-LOCAL PRACTICE LENSES");
    expect(atlas).toContain("NO-HIDDEN-ACTION PROMISE");
    expect(atlas).toContain("does not take deposits");
    expect(research).toContain("Federal Reserve — Payment Systems");
    expect(architecture).toContain("offers no financial functionality");
    expect(home).toContain('href: "/institutional-systems-atlas"');
  });
});
