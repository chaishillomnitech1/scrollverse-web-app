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
    expect(home).toContain("PUBLIC CREATOR LEARNING");
    expect(home).toContain("Unsung Black History");
    expect(home).toContain("Freya Ray");
    expect(juniorMovies).toContain("ORIGINAL STORY DEVELOPMENT");
    expect(juniorMovies).toContain("Boardwalk Nightwatch");
    expect(juniorMovies).toContain("STORY SEED LAB");
    expect(juniorMovies).toContain("guardian, consent record, moderation review");
    expect(juniorMovies).toContain("FineStructure");
    expect(record).toContain("No clear, exportable first-party Junior Movies");
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
    expect(support).toContain("Publisher contact designation pending");
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
});
