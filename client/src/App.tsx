import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GlobalMap from "./pages/GlobalMap";
import Revenue from "./pages/Revenue";
import Guardians from "./pages/Guardians";
import Academy from "./pages/Academy";
import Dashboard from "./pages/Dashboard";
import WalletConnect from "./pages/WalletConnect";
import TokenStore from "./pages/TokenStore";
import CryptoHub from "./pages/CryptoHub";
import AILegion from "./pages/AILegion";
import Deploy from "./pages/Deploy";
import Telegram from "./pages/Telegram";
import Discord from "./pages/Discord";
import Music from "./pages/Music";
import Connect from "./pages/Connect";
import Chat from "./pages/Chat";
import AnnoOmni from "./pages/AnnoOmni";
import Referral from "./pages/Referral";
import ScrollPort from "./pages/ScrollPort";
import OmniExpansion from "./pages/OmniExpansion";
import AiCouncil from "./pages/AiCouncil";
import Legion from "./pages/Legion";
import PWAInstallBanner from "./components/PWAInstallBanner";
import { LivingSignalLayer } from "./components/LivingSignalLayer";
import { WalkingSolutionBeacon } from "./components/WalkingSolutionBeacon";
import Frequency from "./pages/Frequency";
import Staking from "./pages/Staking";
import Governance from "./pages/Governance";
import NftMarketplace from "./pages/NftMarketplace";
import GuardianProtocol from "./pages/GuardianProtocol";
import ConsciousnessMirror from "./pages/ConsciousnessMirror";
import CelestineStarforge from "./pages/CelestineStarforge";
import Platforms from "./pages/Platforms";
import Library from "./pages/Library";
import Scroll44 from "./pages/Scroll44";
import QuantumPractice from "./pages/QuantumPractice";
import KingSolomon from "./pages/KingSolomon";
import AcademyV2 from "./pages/AcademyV2";
import Singularity from "./pages/Singularity";
import CatalystNft from "./pages/CatalystNft";
import Broadcast from "./pages/Broadcast";
import GuardianProfile from "./pages/GuardianProfile";
import MajesticAnchor from "./pages/MajesticAnchor";
import Zaire from "./pages/Zaire";
import Onboard from "./pages/Onboard";
import Security from "./pages/Security";
import Acquisition from "./pages/Acquisition";
import Sentience from "./pages/Sentience";
import BookOfLifeMint from "./pages/BookOfLifeMint";
import FamilyPortal from "./pages/FamilyPortal";
import Song from "./pages/Song";
import AIHub from "./pages/AIHub";
import SalesDashboard from "./pages/SalesDashboard";
import CreatorPlatform from "./pages/CreatorPlatform";
import SystemStatus from "./pages/SystemStatus";
import KYCVerification from "./pages/KYCVerification";
import Exchange from "./pages/Exchange";
import ExchangeCrypto from "./pages/ExchangeCrypto";
import TradingReadiness from "./pages/TradingReadiness";
import ExchangeStocks from "./pages/ExchangeStocks";
import ExchangeCurrencies from "./pages/ExchangeCurrencies";
import ExchangeGovernance from "./pages/ExchangeGovernance";
import ExchangeHeatmap from "./pages/ExchangeHeatmap";
import ExchangePortfolio from "./pages/ExchangePortfolio";
import ExchangeDeFi from "./pages/ExchangeDeFi";
import Knowledge from "./pages/Knowledge";
import LegionRewards from "./pages/LegionRewards";
import IPProtection from "./pages/IPProtection";
import Intelligence from "./pages/Intelligence";
import Partners from "./pages/Partners";
import LinkInBio from "./pages/LinkInBio";
import AdminCreators from "./pages/AdminCreators";
import AdminCHXReservations from "./pages/AdminCHXReservations";
import MrWalkshit from "./pages/MrWalkshit";
import CIEDS from "./pages/CIEDS";
import PaymentSuccess from "./pages/PaymentSuccess";
import OmniCodex from "./pages/OmniCodex";
import GlobalDashboard from "./pages/GlobalDashboard";
import LondynLegacy from "./pages/LondynLegacy";
import Codex1587 from "./pages/Codex1587";
import GuardianStories from "./pages/GuardianStories";
import RingActivation from "./pages/RingActivation";
import FlamebearerInitiative from "./pages/FlamebearerInitiative";
import MerkabaKey from "./pages/MerkabaKey";
import AcademyHub from "./pages/AcademyHub";
import ZakatEngine from "./pages/ZakatEngine";
import GlobalAnnouncement from "./pages/GlobalAnnouncement";
import Kepler452b from "./pages/Kepler452b";
import KeplerNFT from "./pages/KeplerNFT";
import GuardianVoyage from "./pages/GuardianVoyage";
import DeepExa from "./pages/DeepExa";
import Casino from "./pages/Casino";
import KnicksNFT from "./pages/KnicksNFT";
import SynterAnalytics from "./pages/SynterAnalytics";
import MassiveStorage from "./pages/MassiveStorage";
import ManusAmbassador from "./pages/ManusAmbassador";
import SovereignBank from "./pages/SovereignBank";
import ChaisSabirEquation from "./pages/ChaisSabirEquation";
import ScrollTV from "./pages/ScrollTV";
import NFTUnlock from "./pages/NFTUnlock";
import SiteMap from "./pages/SiteMap";
import GamingHub from "./pages/GamingHub";
import StreamVerse from "./pages/StreamVerse";
import KnickBlockchain from "./pages/KnickBlockchain";
import NipseyLegacy from "./pages/NipseyLegacy";
import DigitalTwin from "./pages/DigitalTwin";
import AllversalHighway from "./pages/AllversalHighway";
import SovereignPartnerships from "./pages/SovereignPartnerships";
import MikaSolara from "./pages/MikaSolara";
import SolaraCoin from "./pages/SolaraCoin";
import Storybooks from "./pages/Storybooks";
import DigitalShips from "./pages/DigitalShips";
import ManusHero from "./pages/ManusHero";
import TikTokShop from "./pages/TikTokShop";
import StarGate from "./pages/StarGate";
import RevenueFlywheel from "./pages/RevenueFlywheel";
import JuneteenthDeclaration from "./pages/JuneteenthDeclaration";
import GuardianCrusade from "./pages/GuardianCrusade";
import RevenueDashboard from "./pages/RevenueDashboard";
import Partnerships from "./pages/Partnerships";
import SovereignCRM from "./pages/SovereignCRM";
import MasterGateway from "./pages/MasterGateway";
import MasterApp from "./pages/MasterApp";
import SovereignBroadcast from "./pages/SovereignBroadcast";
import AITwin from "./pages/AITwin";
import NBADraftGenesis from "./pages/NBADraftGenesis";
import SovereignManifesto from "./pages/SovereignManifesto";
import ChaisNumberOne from "./pages/ChaisNumberOne";
import KnicksLegacy from "./pages/KnicksLegacy";
import KnicksNation from "./pages/KnicksNation";
import Aegis from "./pages/Aegis";
import SovereignPodcast from "./pages/SovereignPodcast";
import NamesOfAllah from "./pages/NamesOfAllah";
import ScrollLibrary from "./pages/ScrollLibrary";
import JuniorMoviesNFT from "./pages/JuniorMoviesNFT";
import OmniVault from "./pages/OmniVault";
import JuniorMoviesStudio from "./pages/JuniorMoviesStudio";
import ScrollAcademy from "./pages/ScrollAcademy";
import EcosystemOverview from "./pages/EcosystemOverview";
import GatesOne from "./pages/GatesOne";
import InfiniteNFT from "./pages/InfiniteNFT";
import Archive from "./pages/Archive";
import SovereignCards from "./pages/SovereignCards";
import Subscribe from "./pages/Subscribe";
import ChaisCatalog from "./pages/ChaisCatalog";
import ChaisVideos from "./pages/ChaisVideos";
import RizzBurna from "./pages/RizzBurna";
import GuardianDashboard from "./pages/GuardianDashboard";
import Tatanka from "./pages/Tatanka";
import Gates from "./pages/Gates";
import Curriculum from "./pages/Curriculum";
import Manifesto from "./pages/Manifesto";
import GateKeys from "@/pages/GateKeys";
import FrequencyPlayer from "@/pages/FrequencyPlayer";
import GatesMap from "./pages/GatesMap";
import SummerLeague from "./pages/SummerLeague";
import Masjid from "./pages/Masjid";
import SCF from "./pages/SCF";
import SuperManus from "./pages/SuperManus";
import Forge from "./pages/Forge";
import Altar from "./pages/Altar";
import Pantheon from "./pages/Pantheon";
import Legacy from "./pages/Legacy";
import Builder from "./pages/Builder";
import Heir from "./pages/Heir";
import Returner from "./pages/Returner";
import Emerald from "./pages/Emerald";
import Oka from "./pages/Oka";
import Vault from "./pages/Vault";
import Chronicle from "./pages/Chronicle";
import Pattern from "./pages/Pattern";
import Codex from "./pages/Codex";
import Resilience from "./pages/Resilience";
import Mirror from "./pages/Mirror";
import Equation from "./pages/Equation";
import Portal from "./pages/Portal";
import Highway from "./pages/Highway";
import Throne from "./pages/Throne";
import Gilgamesh from "./pages/Gilgamesh";
import SaferWay from "./pages/SaferWay";
import NoorAlMawlid from "./pages/NoorAlMawlid";
import SeerahIndex from "./pages/SeerahIndex";
import GodEngine from "./pages/GodEngine";
import ArchiveKeeper from "./pages/ArchiveKeeper";
import AlHijra from "./pages/AlHijra";
import AdminSaferWay from "./pages/AdminSaferWay";
import AdminAtlantisCatalog from "./pages/AdminAtlantisCatalog";
import AdminFashionReview from "./pages/AdminFashionReview";
import AdminCreatorOperations from "./pages/AdminCreatorOperations";
import Badr from "./pages/Badr";
import OmniMetrics from "./pages/OmniMetrics";
import FathMakkah from "./pages/FathMakkah";
import AlGhazwat from "./pages/AlGhazwat";
import SeerahQuiz from "./pages/SeerahQuiz";
import AlWafat from "./pages/AlWafat";
import SeerahTimeline from "./pages/SeerahTimeline";
import Nexus from "./pages/Nexus";
import JuniorMoviesUniverse from "./pages/JuniorMoviesUniverse";
import AlFathKhaybar from "./pages/AlFathKhaybar";
import SovereignBooks from "./pages/SovereignBooks";
import AlAqsa from "./pages/AlAqsa";
import ThinkSpace from '@/pages/ThinkSpace';
import ThinkSpaceFeatured from '@/pages/ThinkSpaceFeatured';
import AIChatUpload from '@/pages/AIChatUpload';
import AlFarewell from "./pages/AlFarewell";
import Londyn from "./pages/Londyn";
import SovereignCard from "./pages/SovereignCard";
import GitHubConstellation from "./pages/GitHubConstellation";
import GitHubEvidenceMap from "./pages/GitHubEvidenceMap";
import NinetyNineNames from "./pages/NinetyNineNames";
import Knick from "./pages/Knick";
import LondynLetters from "./pages/LondynLetters";
import ChannelCodex from "./pages/ChannelCodex";
import SovereignSpaceAgency from "./pages/SovereignSpaceAgency";
import MesopotamiaLibrary from "./pages/MesopotamiaLibrary";
import FreeEnergyArchitecture from "./pages/FreeEnergyArchitecture";
import GuardianActivation from "./pages/GuardianActivation";
import GuardianLeaderboard from "./pages/GuardianLeaderboard";
import TeslaPatents from "./pages/TeslaPatents";
import DCVisit from "./pages/DCVisit";
import PhilosophersArchive from "./pages/PhilosophersArchive";
import AlIsraWalMirajDeep from "./pages/AlIsraWalMirajDeep";
import VirgilAbloh from "./pages/VirgilAbloh";
import FashionEmpire from "./pages/FashionEmpire";
import AtlantisCollection from "./pages/AtlantisCollection";
import EmpireIndex from "./pages/EmpireIndex";
import MeinLookbook from "./pages/MeinLookbook";
import FashionPortfolio from "./pages/FashionPortfolio";
import BrandStudio from "./pages/BrandStudio";
import FashionArtifactAtlas from "./pages/FashionArtifactAtlas";
import FashionLookbookExperience from "./pages/FashionLookbookExperience";
import EpisodeExperience from "./pages/EpisodeExperience";
import LegionSpecialistProfiles from "./pages/LegionSpecialistProfiles";
import PortalNavigator from "./pages/PortalNavigator";
import ConvergenceCommons from "./pages/ConvergenceCommons";
import Signalworks from "./pages/Signalworks";
import CreatorWorkspace from "./pages/CreatorWorkspace";
import CreatorOperations from "./pages/CreatorOperations";
import LegionCommons from "./pages/LegionCommons";
import AdminProvenanceReview from "./pages/AdminProvenanceReview";
import ManusHeroCodex from "./pages/ManusHeroCodex";
import IdentitySystem from "./pages/IdentitySystem";
import EvidenceStandards from "./pages/EvidenceStandards";
import SystemsMap from "./pages/SystemsMap";
import ScrollVerseLaunchpad from "./pages/ScrollVerseLaunchpad";
import ReleaseReadiness from "./pages/ReleaseReadiness";
import PrivacySummary from "./pages/PrivacySummary";
import SupportPath from "./pages/SupportPath";
import GitHubOperations from "./pages/GitHubOperations";
import RevenueOperations from "./pages/RevenueOperations";
import FashionPartnershipProposal from "./pages/FashionPartnershipProposal";
import ManufacturingReadiness from "./pages/ManufacturingReadiness";
import ImpactIncentiveReadiness from "./pages/ImpactIncentiveReadiness";
import SpiralSignature from "./pages/SpiralSignature";
import SpecialistConstellation from "./pages/SpecialistConstellation";
import HealthNavigator from "./pages/HealthNavigator";
import HealthResearchDesk from "./pages/HealthResearchDesk";
import MediaDock from "./pages/MediaDock";
import MediaWorld from "./pages/MediaWorld";
import CreatorMediaStudio from "./pages/CreatorMediaStudio";
import DigitalHighways from "./pages/DigitalHighways";
import EmpireMap from "./pages/EmpireMap";
import IpReadinessNavigator from "./pages/IpReadinessNavigator";
import ChainIntelligence from "./pages/ChainIntelligence";
import KnowledgeContext from "./pages/KnowledgeContext";
import OpenExchangeFieldGuide from "./pages/OpenExchangeFieldGuide";
import ProtectionProtocol from "./pages/ProtectionProtocol";
import AegisChronicles from "./pages/AegisChronicles";
import CreatorRevenueLearning from "./pages/CreatorRevenueLearning";
import ConceptSealShrine from "./pages/ConceptSealShrine";
import PlatformFoundations from "./pages/PlatformFoundations";
import KnowledgeNavigator from "./pages/KnowledgeNavigator";
import PublicReferenceTrail from "./pages/PublicReferenceTrail";
import EvidenceCommons from "./pages/EvidenceCommons";
import GulfLearning from "./pages/GulfLearning";
import CreatorCollectionRecords from "./pages/CreatorCollectionRecords";
import OperationalSafeguards from "./pages/OperationalSafeguards";
import MediaReadinessLab from "./pages/MediaReadinessLab";
import DistributionHighwaysMap from "./pages/DistributionHighwaysMap";
import ArtistControlDesk from "./pages/ArtistControlDesk";
import ConsoleVerse from "./pages/ConsoleVerse";
import OpportunityNavigator from "./pages/OpportunityNavigator";
import GitHubShowcase from "./pages/GitHubShowcase";
import DigitalFootprintReport from "./pages/DigitalFootprintReport";
import CreatorChannelHub from "./pages/CreatorChannelHub";
import InstagramStoryEngine from "./pages/InstagramStoryEngine";
import ProductionContinuum from "./pages/ProductionContinuum";
import ScrollNetworkContext from "./pages/ScrollNetworkContext";
import CryptoSystemsAtlas from "./pages/CryptoSystemsAtlas";
import ArtifactEvidenceBlueprint from "./pages/ArtifactEvidenceBlueprint";
import InstitutionalSystemsAtlas from "./pages/InstitutionalSystemsAtlas";
import OperatingPatternNavigator from "./pages/OperatingPatternNavigator";
import FinancialSystemsCapabilityMap from "./pages/FinancialSystemsCapabilityMap";
import LawfulOperatingNavigator from "./pages/LawfulOperatingNavigator";
import OriginalSystemsHub from "./pages/OriginalSystemsHub";
import EnterpriseSystemsBlueprint from "./pages/EnterpriseSystemsBlueprint";
import PartnershipEngine from "./pages/PartnershipEngine";
import ProofOfPractice from "./pages/ProofOfPractice";
import WorldStation from "./pages/WorldStation";
import FinancialHighways from "./pages/FinancialHighways";
import NarrationDirections from "./pages/NarrationDirections";
import PublicPortfolioGovernance from "./pages/PublicPortfolioGovernance";
import ManifestoBuildersBook from "./pages/ManifestoBuildersBook";
import BooksMediaReadiness from "./pages/BooksMediaReadiness";
import RecoveryMaterials from "./pages/RecoveryMaterials";
import CoCreationNavigator from "./pages/CoCreationNavigator";
import IdeaExchange from "./pages/IdeaExchange";
import PortalTrustStandard from "./pages/PortalTrustStandard";
import ContinuousImprovementStandard from "./pages/ContinuousImprovementStandard";
import CreatorExchangeNavigator from "./pages/CreatorExchangeNavigator";
import CreatorExchangeGovernanceReadiness from "./pages/CreatorExchangeGovernanceReadiness";
import CreatorStudioNavigator from "./pages/CreatorStudioNavigator";
import CreatorOperationsIntelligence from "./pages/CreatorOperationsIntelligence";
import ReleasePackageChecklist from "./pages/ReleasePackageChecklist";
import CreatorServicesNavigator from "./pages/CreatorServicesNavigator";
import HistoricalTransmissionPatterns from "./pages/HistoricalTransmissionPatterns";
import NarrativeSourceTrail from "./pages/NarrativeSourceTrail";
import OriginalMediaReadiness from "./pages/OriginalMediaReadiness";
import MediaPortfolioReadiness from "./pages/MediaPortfolioReadiness";
import NftMonetizationBlueprint from "./pages/NftMonetizationBlueprint";
import CreatorMediaPacket from "./pages/CreatorMediaPacket";
import MasterDirectory from "./pages/MasterDirectory";
import OpenResearchNavigator from "./pages/OpenResearchNavigator";
import EmpireAssetNavigator from "./pages/EmpireAssetNavigator";
import BrandFeatureStudio from "./pages/BrandFeatureStudio";
import IpDigitalEvidenceNavigator from "./pages/IpDigitalEvidenceNavigator";
import IPSecurityReadiness from "./pages/IPSecurityReadiness";
import MusicCreatorReleaseReadiness from "./pages/MusicCreatorReleaseReadiness";
import XLVIIIBlocksMonograph from "./pages/XLVIIIBlocksMonograph";
import OpenKnowledgeVerse from "./pages/OpenKnowledgeVerse";
import MesopotamiaCommons from "./pages/MesopotamiaCommons";
import VoiceLanguageStudio from "./pages/VoiceLanguageStudio";
import DomainDiscoveryMap from "./pages/DomainDiscoveryMap";
import ConsortiumNexus from "./pages/ConsortiumNexus";
import StandardsEvidenceCommons from "./pages/StandardsEvidenceCommons";
import StandardsStudio from "./pages/StandardsStudio";
import HypotheticalSystemsLab from "./pages/HypotheticalSystemsLab";
import EcosystemOutcomesScorecard from "./pages/EcosystemOutcomesScorecard";
import ScrollVerseChessArena from "./pages/ScrollVerseChessArena";
import DigitalHollywoodStudio from "./pages/DigitalHollywoodStudio";
import FinancialActivationReadiness from "./pages/FinancialActivationReadiness";
import FutureInfrastructureBlueprint from "./pages/FutureInfrastructureBlueprint";
import QuantumFrequencyResearchLab from "./pages/QuantumFrequencyResearchLab";
import AudienceValueLeverage from "./pages/AudienceValueLeverage";
import UniversalCommons from "./pages/UniversalCommons";
import Synchronizations from "./pages/Synchronizations";
import SynchronizationResearchIndex from "./pages/SynchronizationResearchIndex";
import ChosenOnesExperienceExchange from "./pages/ChosenOnesExperienceExchange";
import OwnerWorkstation from "./pages/OwnerWorkstation";
import CapabilityAudit from "./pages/CapabilityAudit";
import QuantumResearch from "./pages/QuantumResearch";
import PreRegistrationReadiness from "./pages/PreRegistrationReadiness";
import OpenRecordContinuum from "./pages/OpenRecordContinuum";
import ProductionControlDesk from "./pages/ProductionControlDesk";
import MultiPlatformReleaseDesk from "./pages/MultiPlatformReleaseDesk";
import CreatorInfrastructureMap from "./pages/CreatorInfrastructureMap";
import HarlemVinelandLegacy from "./pages/HarlemVinelandLegacy";
import AssistiveGovernanceDesk from "./pages/AssistiveGovernanceDesk";
import IPStewardshipMap from "./pages/IPStewardshipMap";
import SovereignMethodology from "./pages/SovereignMethodology";
import JourneyCoCreationArchive from "./pages/JourneyCoCreationArchive";
import BookOfTheJourney from "./pages/BookOfTheJourney";
import DirectFanCatalog from "./pages/DirectFanCatalog";
import CreatorCatalogReadiness from "./pages/CreatorCatalogReadiness";
import FirstSkuActivationPacket from "./pages/FirstSkuActivationPacket";
import CatalogEngagementAttribution from "./pages/CatalogEngagementAttribution";
import BoundedResearchOperations from "./pages/BoundedResearchOperations";
import SourceChannelSchedulingReadiness from "./pages/SourceChannelSchedulingReadiness";
import ShopifyStagedLaunchGuidance from "./pages/ShopifyStagedLaunchGuidance";
import ShopifyCrawlerAccessReadiness from "./pages/ShopifyCrawlerAccessReadiness";
import EmpireRoutingMap from "./pages/EmpireRoutingMap";
import SovereignContributionExchange from "./pages/SovereignContributionExchange";
import LivingJourneyExperience from "./pages/LivingJourneyExperience";
import AccomplishmentsArchive from "./pages/AccomplishmentsArchive";
import ScrollVerseAtlas from "./pages/ScrollVerseAtlas";
import TransmissionAlignmentRecord from "./pages/TransmissionAlignmentRecord";
import CatalogProductionDesk from "./pages/CatalogProductionDesk";
import SourceStudyLibrary from "./pages/SourceStudyLibrary";
import DailyStakingEmailRecord from "./pages/DailyStakingEmailRecord";
import DeliveryResilience from "./pages/DeliveryResilience";
import ActivationRegister from "./pages/ActivationRegister";
import MasterInstructionIntake from "./pages/MasterInstructionIntake";
import PaymentOptionsMap from "./pages/PaymentOptionsMap";
import PaymentLaunchPackets from "./pages/PaymentLaunchPackets";
import ShopifyStorefrontReadiness from "./pages/ShopifyStorefrontReadiness";
import PremiumStorefrontProgram from "./pages/PremiumStorefrontProgram";
import ProductReleasePipeline from "./pages/ProductReleasePipeline";
import MilestoneRoadmap from "./pages/MilestoneRoadmap";
import ArtMuseum from "./pages/ArtMuseum";
import ArtLearningStudio from "./pages/ArtLearningStudio";
import KnowledgeCommons from "./pages/KnowledgeCommons";
import ScrollVersePerspectives from "./pages/ScrollVersePerspectives";
import AssetRegistry from "./pages/AssetRegistry";
import MetaAIArtifactsLookbooks from "./pages/MetaAIArtifactsLookbooks";
import EpisodicProductionSlate from "./pages/EpisodicProductionSlate";
import AICompanionHub from "./pages/AICompanionHub";
import LegionSpecialistAtlas from "./pages/LegionSpecialistAtlas";
import AgenticStorefrontsReadiness from "./pages/AgenticStorefrontsReadiness";
import SunOnUs1111 from "./pages/SunOnUs1111";
import FirstPartyCoCreationRecord from "./pages/FirstPartyCoCreationRecord";
import LearningPathways from "./pages/LearningPathways";
import ContinuationReadinessRegister from "./pages/ContinuationReadinessRegister";
import VibeCanvasRoadmap from "./pages/VibeCanvasRoadmap";
import August28LaunchCommandCenter from "./pages/August28LaunchCommandCenter";
import AIConstellationHub from "./pages/AIConstellationHub";
import CreatorBooksPublishingDesk from "./pages/CreatorBooksPublishingDesk";
import VisualTutorialStudio from "./pages/VisualTutorialStudio";
import EvolutionLookbook from "./pages/EvolutionLookbook";
import CreatorAtlas from "./pages/CreatorAtlas";
import VisualStoryWorlds from "./pages/VisualStoryWorlds";
import ReplayReadinessDesk from "./pages/ReplayReadinessDesk";
import CapabilityComparison from "./pages/CapabilityComparison";
import CollaborationInvitation from "./pages/CollaborationInvitation";
import ConnectedSystemsMap from "./pages/ConnectedSystemsMap";
import CreatorActivationDossier from "./pages/CreatorActivationDossier";
import CreatorBroadcastPreparation from "./pages/CreatorBroadcastPreparation";
import CryptoArtifactLookbook from "./pages/CryptoArtifactLookbook";

const AILegionApex = lazy(() => import("./pages/AILegionApex"));
const ComponentShowcase = lazy(() => import("./pages/ComponentShowcase"));
// Archive-scale, media-heavy routes are deferred until a visitor requests them.
// Their public URLs remain registered below; only the initial application graph changes.
const Replays = lazy(() => import("./pages/Replays"));
const OurStory = lazy(() => import("./pages/OurStory"));
const MarsOmni = lazy(() => import("./pages/MarsOmni"));
const Books = lazy(() => import("./pages/Books"));
const Visuals = lazy(() => import("./pages/Visuals"));
const BookOfLife = lazy(() => import("./pages/BookOfLife"));
const UAP = lazy(() => import("./pages/UAP"));
const WealthDashboard = lazy(() => import("./pages/WealthDashboard"));
const CHXToken = lazy(() => import("./pages/CHXToken"));
const SovereignLegacy = lazy(() => import("./pages/SovereignLegacy"));
const JPMMirror = lazy(() => import("./pages/JPMMirror"));
const SovereignCodex = lazy(() => import("./pages/SovereignCodex"));
const SoulAltar = lazy(() => import("./pages/SoulAltar"));
const MediaHub = lazy(() => import("./pages/MediaHub"));
const MediaWorldEvidencePackets = lazy(() => import("./pages/MediaWorldEvidencePackets"));
const AllversalEmpire = lazy(() => import("./pages/AllversalEmpire"));
const EternalEcho = lazy(() => import("./pages/EternalEcho"));
const ZernioDistribution = lazy(() => import("./pages/ZernioDistribution"));
const RedDiamondFleet = lazy(() => import("./pages/RedDiamondFleet"));
const SacredFrequencies = lazy(() => import("./pages/SacredFrequencies"));
const OmniChess = lazy(() => import("./pages/OmniChess"));
const ThothHawk = lazy(() => import("./pages/ThothHawk"));
const Shifter = lazy(() => import("./pages/Shifter"));
const Sovereign9 = lazy(() => import("./pages/Sovereign9"));
const SovereignCinema = lazy(() => import("./pages/SovereignCinema"));
const JuniorMovies = lazy(() => import("./pages/JuniorMovies"));
const JMEUniverse = lazy(() => import("./pages/JMEUniverse"));
const SovereignStoryArchive = lazy(() => import("./pages/SovereignStoryArchive"));
const IPO = lazy(() => import("./pages/IPO"));
const DSPIntelligence = lazy(() => import("./pages/DSPIntelligence"));

function RouteLoadingFallback() {
  return <main className="min-h-screen bg-[#050B1A] px-6 py-24 text-center text-white"><p className="text-xs font-mono tracking-[0.2em] text-[#00D4FF]">SCROLLVERSE ROUTE LOADING</p><p className="mt-4 text-sm text-[#C8D8E7]">Preparing this first-party experience…</p></main>;
}

// ── Mobile Bottom Navigation ──────────────────────────────────────────────────
function MobileBottomNav() {
  const [loc] = useLocation();
  const items = [
    { href: "/", icon: "🏠", label: "Home" },
    { href: "/think-space", icon: "🌌", label: "Think" },
    { href: "/seerah", icon: "📜", label: "Seerah" },
    { href: "/ai-legion-apex", icon: "🤖", label: "Legion" },
    { href: "/guardian-activation", icon: "🛡️", label: "Activate" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
      <div className="flex">
        {items.map(item => {
          const active = loc === item.href || (item.href !== "/" && loc.startsWith(item.href));
          return (
            <a key={item.href} href={item.href} className="flex-1 flex flex-col items-center py-2 gap-0.5 transition-all" style={{ color: active ? "#D4AF37" : "#8899AA" }}>
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[9px] font-bold leading-none">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
    <Suspense fallback={<RouteLoadingFallback />}>
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/global-map"} component={GlobalMap} />
      <Route path={"/revenue"} component={Revenue} />
      <Route path={"/guardians"} component={Guardians} />
      <Route path={"/academy"} component={Academy} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/wallet"} component={WalletConnect} />
      <Route path={"/token"} component={TokenStore} />
      <Route path={"/crypto"} component={CryptoHub} />
      <Route path={"/ai-legion"} component={AILegion} />
      <Route path={"/deploy"} component={Deploy} />
      <Route path={"/telegram"} component={Telegram} />
      <Route path={"/discord"} component={Discord} />
      <Route path={"/music"} component={Music} />
      <Route path={"/connect"} component={Connect} />
      <Route path={"/chat"} component={Chat} />
      <Route path={"/anno-omni"} component={AnnoOmni} />
      <Route path={"/referral"} component={Referral} />
      <Route path={"/scrollport"} component={ScrollPort} />
      <Route path={"/omni"} component={OmniExpansion} />
      <Route path={"/ai-council"} component={AiCouncil} />
      <Route path={"/legion"} component={Legion} />
      <Route path={"/frequency"} component={Frequency} />
      <Route path={"/staking"} component={Staking} />
      <Route path={"/governance"} component={Governance} />
      <Route path={"/nft"} component={NftMarketplace} />
      <Route path={"/nft-marketplace"} component={NftMarketplace} />
      <Route path={"/guardian-protocol"} component={GuardianProtocol} />
      <Route path={"/consciousness-mirror"} component={ConsciousnessMirror} />
      <Route path={"/celestine-starforge"} component={CelestineStarforge} />
      <Route path={"/platforms"} component={Platforms} />
      <Route path={"/library"} component={Library} />
      <Route path={"/scroll-44"} component={Scroll44} />
      <Route path={"/quantum-practice"} component={QuantumPractice} />
      <Route path={"/king-solomon"} component={KingSolomon} />
      <Route path={"/academy-v2"} component={AcademyV2} />
      <Route path={"/singularity"} component={Singularity} />
      <Route path={"/catalyst-nft"} component={CatalystNft} />
      <Route path={"/broadcast"} component={Broadcast} />
      <Route path={"/replays"} component={Replays} />
      <Route path={"/guardian/:handle"} component={GuardianProfile} />
      <Route path={"/manifest"} component={MajesticAnchor} />
      <Route path={"/our-story"} component={OurStory} />
      <Route path={"/zaire"} component={Zaire} />
      <Route path={"/onboard"} component={Onboard} />
      <Route path={"/marsomni"} component={MarsOmni} />
      <Route path={"/security"} component={Security} />
      <Route path={"/acquisition"} component={Acquisition} />
      <Route path={"/sentience"} component={Sentience} />
      <Route path={"/books"} component={Books} />
      <Route path={"/visuals"} component={Visuals} />
      <Route path={"/book-of-life"} component={BookOfLife} />
      <Route path={"/mint"} component={BookOfLifeMint} />
      <Route path={"/family"} component={FamilyPortal} />
      <Route path={"/song"} component={Song} />
      <Route path={"/ai-hub"} component={AIHub} />
      <Route path={"/sales"} component={SalesDashboard} />
      <Route path={"/creator"} component={CreatorPlatform} />
      <Route path={"/status"} component={SystemStatus} />
      <Route path={"/kyc"} component={KYCVerification} />
      <Route path={"/exchange"} component={Exchange} />
      <Route path={"/exchange/crypto"} component={ExchangeCrypto} />
      <Route path={"/trading-readiness"} component={TradingReadiness} />
      <Route path={"/exchange/stocks"} component={ExchangeStocks} />
      <Route path={"/exchange/currencies"} component={ExchangeCurrencies} />
      <Route path={"/exchange/governance"} component={ExchangeGovernance} />
      <Route path={"/exchange/heatmap"} component={ExchangeHeatmap} />
      <Route path={"/exchange/portfolio"} component={ExchangePortfolio} />
      <Route path={"/exchange/defi"} component={ExchangeDeFi} />
      <Route path={"/knowledge"} component={Knowledge} />
      <Route path={"/legion/rewards"} component={LegionRewards} />
      <Route path={"/ip-protection"} component={IPProtection} />
      <Route path={"/intelligence"} component={Intelligence} />
      <Route path={"/partners"} component={Partners} />
      <Route path={"/link"} component={LinkInBio} />
      <Route path={"/admin/creators"} component={AdminCreators} />
      <Route path={"/admin/chx-reservations"} component={AdminCHXReservations} />
      <Route path={"/uap"} component={UAP} />
      <Route path={"/mr-walkshit"} component={MrWalkshit} />
      <Route path={"/cieds"} component={CIEDS} />
      <Route path={"/wealth"} component={WealthDashboard} />
      <Route path={"/chxtoken"} component={CHXToken} />
      <Route path={"/payment-success"} component={PaymentSuccess} />
      <Route path={"/omnicodex"} component={OmniCodex} />
      <Route path={"/global-dashboard"} component={GlobalDashboard} />
      <Route path={"/londyn-legacy"} component={LondynLegacy} />
      <Route path={"/codex-1587"} component={Codex1587} />
      <Route path={"/guardian-stories"} component={GuardianStories} />
      <Route path={"/ring-activation"} component={RingActivation} />
      <Route path={"/flamebearer"} component={FlamebearerInitiative} />
      <Route path={"/merkaba-key"} component={MerkabaKey} />
      <Route path={"/academy-hub"} component={AcademyHub} />
      <Route path={"/zakat"} component={ZakatEngine} />
      <Route path={"/announcements"} component={GlobalAnnouncement} />
      <Route path={"/kepler"} component={Kepler452b} />
      <Route path={"/kepler-nft"} component={KeplerNFT} />
      <Route path={"/voyage"} component={GuardianVoyage} />
      <Route path={"/deepexa"} component={DeepExa} />
      <Route path={"/casino"} component={Casino} />
      <Route path={"/knicks-nft"} component={KnicksNFT} />
      <Route path={"/synter"} component={SynterAnalytics} />
      <Route path={"/storage"} component={MassiveStorage} />
      <Route path={"/manus"} component={ManusAmbassador} />
      <Route path={"/sovereign-legacy"} component={SovereignLegacy} />
      <Route path={"/jpm-mirror"} component={JPMMirror} />
      <Route path={"/ai-legion-apex"} component={AILegionApex} />
      <Route path={"/sovereign-bank"} component={SovereignBank} />
      <Route path={"/sovereign-codex"} component={SovereignCodex} />
      <Route path={"/soul-altar"} component={SoulAltar} />
      <Route path={"/chais-sabir-equation"} component={ChaisSabirEquation} />
      <Route path={"/sovereign-methodology"} component={SovereignMethodology} />
      <Route path={"/journey-co-creation-archive"} component={JourneyCoCreationArchive} />
      <Route path={"/book-of-the-journey"} component={BookOfTheJourney} />
      <Route path={"/direct-fan-catalog"} component={DirectFanCatalog} />
      <Route path={"/creator-catalog-readiness"} component={CreatorCatalogReadiness} />
      <Route path={"/first-sku-activation-packet"} component={FirstSkuActivationPacket} />
      <Route path={"/catalog-engagement"} component={CatalogEngagementAttribution} />
      <Route path={"/bounded-research-operations"} component={BoundedResearchOperations} />
      <Route path={"/source-channel-scheduling-readiness"} component={SourceChannelSchedulingReadiness} />
      <Route path={"/shopify-staged-launch-guidance"} component={ShopifyStagedLaunchGuidance} />
      <Route path={"/shopify-crawler-access-readiness"} component={ShopifyCrawlerAccessReadiness} />
      <Route path={"/empire-routing-map"} component={EmpireRoutingMap} />
      <Route path={"/sovereign-contribution-exchange"} component={SovereignContributionExchange} />
      <Route path={"/living-journey-experience"} component={LivingJourneyExperience} />
      <Route path={"/accomplishments-archive"} component={AccomplishmentsArchive} />
      <Route path={"/scrollverse-atlas"} component={ScrollVerseAtlas} />
      <Route path={"/transmission-alignment-record"} component={TransmissionAlignmentRecord} />
      <Route path={"/catalog-production-desk"} component={CatalogProductionDesk} />
      <Route path={"/source-study-library"} component={SourceStudyLibrary} />
      <Route path={"/daily-staking-email-record"} component={DailyStakingEmailRecord} />
      <Route path={"/delivery-resilience"} component={DeliveryResilience} />
      <Route path={"/activation-register"} component={ActivationRegister} />
      <Route path={"/master-instruction-intake"} component={MasterInstructionIntake} />
      <Route path={"/payment-options"} component={PaymentOptionsMap} />
      <Route path={"/payment-launch-packets"} component={PaymentLaunchPackets} />
      <Route path={"/shopify-storefront-readiness"} component={ShopifyStorefrontReadiness} />
      <Route path={"/premium-storefront-program"} component={PremiumStorefrontProgram} />
      <Route path={"/product-release-pipeline"} component={ProductReleasePipeline} />
      <Route path={"/milestone-roadmap"} component={MilestoneRoadmap} />
      <Route path={"/art-museum"} component={ArtMuseum} />
      <Route path={"/art-learning-studio"} component={ArtLearningStudio} />
	      <Route path={"/knowledge-commons"} component={KnowledgeCommons} />
	      <Route path={"/scrollverse-perspectives"} component={ScrollVersePerspectives} />
	      <Route path={"/asset-registry"} component={AssetRegistry} />
	      <Route path={"/meta-ai-artifacts-lookbooks"} component={MetaAIArtifactsLookbooks} />
	      <Route path={"/episodic-production-slate"} component={EpisodicProductionSlate} />
	      <Route path={"/ai-companion-hub"} component={AICompanionHub} />
	      <Route path={"/legion-specialist-atlas"} component={LegionSpecialistAtlas} />
	      <Route path={"/agentic-storefronts-readiness"} component={AgenticStorefrontsReadiness} />
      <Route path={"/sun-on-us-1111"} component={SunOnUs1111} />
      <Route path={"/first-party-co-creation"} component={FirstPartyCoCreationRecord} />
      <Route path={"/learning-pathways"} component={LearningPathways} />
      <Route path={"/continuation-readiness-register"} component={ContinuationReadinessRegister} />
      <Route path={"/vibe-canvas"} component={VibeCanvasRoadmap} />
      <Route path={"/august-28-launch"} component={August28LaunchCommandCenter} />
      <Route path={"/ai-constellation"} component={AIConstellationHub} />
      <Route path={"/creator-books"} component={CreatorBooksPublishingDesk} />
      <Route path={"/tutorial-studio"} component={VisualTutorialStudio} />
      <Route path={"/evolution-lookbook"} component={EvolutionLookbook} />
      <Route path={"/creator-atlas"} component={CreatorAtlas} />
      <Route path={"/visual-story-worlds"} component={VisualStoryWorlds} />
      <Route path={"/replay-readiness"} component={ReplayReadinessDesk} />
      <Route path={"/capability-comparison"} component={CapabilityComparison} />
      <Route path={"/collaborate"} component={CollaborationInvitation} />
      <Route path={"/connected-systems"} component={ConnectedSystemsMap} />
      <Route path={"/activation-dossier"} component={CreatorActivationDossier} />
      <Route path={"/creator-broadcast-preparation"} component={CreatorBroadcastPreparation} />
      <Route path={"/crypto-artifact-lookbook"} component={CryptoArtifactLookbook} />
	      <Route path={"/scroll-tv"} component={ScrollTV} />
      <Route path={"/nft-unlock"} component={NFTUnlock} />
      <Route path={"/media-hub"} component={MediaHub} />
      <Route path={"/media-world-evidence-packets"} component={MediaWorldEvidencePackets} />
      <Route path={"/site-map"} component={SiteMap} />
      <Route path={"/gaming-hub"} component={GamingHub} />
      <Route path={"/stream-verse"} component={StreamVerse} />
      <Route path={"/knick-blockchain"} component={KnickBlockchain} />
      <Route path={"/nipsey-legacy"} component={NipseyLegacy} />
      <Route path={"/digital-twin"} component={DigitalTwin} />
      <Route path={"/allversal-highway"} component={AllversalHighway} />
      <Route path={"/sovereign-partnerships"} component={SovereignPartnerships} />
      <Route path={"/allversal-empire"} component={AllversalEmpire} />
      <Route path={"/eternal-echo"} component={EternalEcho} />
      <Route path={"/mika-solara"} component={MikaSolara} />
      <Route path={"/solara-coin"} component={SolaraCoin} />
      <Route path={"/storybooks"} component={Storybooks} />
      <Route path={"/digital-ships"} component={DigitalShips} />
      <Route path={"/manus-hero"} component={ManusHero} />
      <Route path={"/tiktok-shop"} component={TikTokShop} />
      <Route path={"/star-gate"} component={StarGate} />
      <Route path={"/revenue-flywheel"} component={RevenueFlywheel} />
      <Route path={"/juneteenth-declaration"} component={JuneteenthDeclaration} />
      <Route path={"/guardian-crusade"} component={GuardianCrusade} />
      <Route path={"/revenue-dashboard"} component={RevenueDashboard} />
      <Route path={"/components"} component={ComponentShowcase} />
      <Route path={"/partnerships"} component={Partnerships} />
      <Route path={"/sovereign-crm"} component={SovereignCRM} />
      <Route path={"/master-gateway"} component={MasterGateway} />
      <Route path={"/master-app"} component={MasterApp} />
      <Route path={"/sovereign-broadcast"} component={SovereignBroadcast} />
      <Route path={"/zernio-distribution"} component={ZernioDistribution} />
      <Route path={"/red-diamond-fleet"} component={RedDiamondFleet} />
      <Route path={"/sacred-frequencies"} component={SacredFrequencies} />
      <Route path={"/ai-twin"} component={AITwin} />
      <Route path={"/nba-draft-genesis"} component={NBADraftGenesis} />
      <Route path={"/sovereign-manifesto"} component={SovereignManifesto} />
      <Route path={"/chais-number-one"} component={ChaisNumberOne} />
      <Route path={"/omni-chess"} component={OmniChess} />
      <Route path={"/knicks-legacy"} component={KnicksLegacy} />
      <Route path={"/thoth-hawk"} component={ThothHawk} />
      <Route path={"/shifter"} component={Shifter} />
      <Route path={"/knicks-nation"} component={KnicksNation} />
      <Route path={"/sovereign-9"} component={Sovereign9} />
      <Route path={"/ipo"} component={IPO} />
      <Route path={"/aegis"} component={Aegis} />
      <Route path={"/sovereign-cinema"} component={SovereignCinema} />
      <Route path={"/podcast"} component={SovereignPodcast} />
      <Route path={"/junior-movies"} component={JuniorMovies} />
      <Route path={"/99-names"} component={NamesOfAllah} />
      <Route path={"/scroll-library"} component={ScrollLibrary} />
      <Route path={"/junior-movies-nft"} component={JuniorMoviesNFT} />
      <Route path={"/omni-vault"} component={OmniVault} />
      <Route path={"/jme-universe"} component={JMEUniverse} />
      <Route path={"/junior-studio"} component={JuniorMoviesStudio} />
      <Route path={"/scrollacademy"} component={ScrollAcademy} />
      <Route path={"/ecosystem"} component={EcosystemOverview} />
      <Route path={"/gates-one"} component={GatesOne} />
      <Route path={"/story-archive"} component={SovereignStoryArchive} />
      <Route path={"/sovereign-cards"} component={SovereignCards} />
      <Route path={"/subscribe"} component={Subscribe} />
      <Route path={"/chais-catalog"} component={ChaisCatalog} />
      <Route path={"/chais-videos"} component={ChaisVideos} />
      <Route path={"/rizz-burna"} component={RizzBurna} />
      <Route path={"/dsp-intelligence"} component={DSPIntelligence} />
      <Route path={"/guardian-dashboard"} component={GuardianDashboard} />
      <Route path={"/infinite-nft"} component={InfiniteNFT} />
      <Route path={"/archive"} component={Archive} />
      <Route path={"/tatanka"} component={Tatanka} />
      <Route path={"/gates"} component={Gates} />
      <Route path={"/curriculum"} component={Curriculum} />
      <Route path={"/manifesto"} component={Manifesto} />
        <Route path="/gates/map" component={GatesMap} />
        <Route path="/summerleague" component={SummerLeague} />
        <Route path="/masjid" component={Masjid} />
        <Route path="/scf" component={SCF} />
        <Route path="/super-manus" component={SuperManus} />
        <Route path="/forge" component={Forge} />
        <Route path="/altar" component={Altar} />
        <Route path="/pantheon" component={Pantheon} />
        <Route path="/legacy" component={Legacy} />
        <Route path="/builder" component={Builder} />
        <Route path="/heir" component={Heir} />
        <Route path="/returner" component={Returner} />
        <Route path="/emerald" component={Emerald} />
        <Route path="/oka" component={Oka} />
        <Route path="/vault" component={Vault} />
        <Route path="/chronicle" component={Chronicle} />
        <Route path="/pattern" component={Pattern} />
        <Route path="/codex" component={Codex} />
        <Route path="/resilience" component={Resilience} />
        <Route path="/mirror" component={Mirror} />
        <Route path="/equation" component={Equation} />
        <Route path="/portal" component={Portal} />
        <Route path="/highway" component={Highway} />
        <Route path="/throne" component={Throne} />
        <Route path="/gilgamesh" component={Gilgamesh} />
      <Route path={"/404"} component={NotFound} />
        <Route path="/gate-keys" component={GateKeys} />
        <Route path="/frequency-player" component={FrequencyPlayer} />
        <Route path="/saferway" component={SaferWay} />
        <Route path="/seerah" component={SeerahIndex} />
        <Route path="/seerah/noor-al-mawlid" component={NoorAlMawlid} />
        <Route path="/godengine" component={GodEngine} />
        <Route path="/archivekeeper" component={ArchiveKeeper} />
        <Route path="/seerah/al-hijra" component={AlHijra} />
        <Route path="/seerah/badr" component={Badr} />
        <Route path="/admin/saferway" component={AdminSaferWay} />
        <Route path="/admin/atlantis-catalog" component={AdminAtlantisCatalog} />
        <Route path="/admin/fashion-review" component={AdminFashionReview} />
        <Route path="/metrics" component={OmniMetrics} />
        <Route path="/seerah/fath-makkah" component={FathMakkah} />
        <Route path="/seerah/al-ghazwat" component={AlGhazwat} />
        <Route path="/seerah/quiz" component={SeerahQuiz} />
        <Route path="/seerah/al-wafat" component={AlWafat} />
        <Route path="/seerah/timeline" component={SeerahTimeline} />
        <Route path="/nexus" component={Nexus} />
        <Route path="/junior-movies/universe" component={JuniorMoviesUniverse} />
        <Route path="/seerah/al-fath-khaybar" component={AlFathKhaybar} />
        <Route path="/sovereign-books" component={SovereignBooks} />
        <Route path="/seerah/al-aqsa" component={AlAqsa} />
        <Route path="/seerah/al-farewell" component={AlFarewell} />
	        <Route path="/github-constellation" component={GitHubConstellation} />
	        <Route path="/github-evidence-map" component={GitHubEvidenceMap} />
        <Route path="/99-names" component={NinetyNineNames} />
        <Route path="/knick" component={Knick} />
      <Route path="/londyn" component={Londyn} />
        <Route path="/sovereign-card" component={SovereignCard} />
        <Route path="/londyn/letters" component={LondynLetters} />
        <Route path="/channel-codex" component={ChannelCodex} />
        <Route path="/sovereign-space-agency" component={SovereignSpaceAgency} />
        <Route path="/mesopotamia-library" component={MesopotamiaLibrary} />
        <Route path="/free-energy-architecture" component={FreeEnergyArchitecture} />
        <Route path="/guardian-activation" component={GuardianActivation} />
        <Route path="/guardian-leaderboard" component={GuardianLeaderboard} />
        <Route path="/tesla-patents" component={TeslaPatents} />
        <Route path="/dc-visit" component={DCVisit} />
        <Route path="/philosophers-archive" component={PhilosophersArchive} />
        <Route path="/seerah/al-isra-wal-miraj-deep" component={AlIsraWalMirajDeep} />
        <Route path="/think-space" component={ThinkSpace} />
        <Route path="/think-space/featured" component={ThinkSpaceFeatured} />
        <Route path="/ai-chat-upload" component={AIChatUpload} />
        <Route path="/virgil-abloh" component={VirgilAbloh} />
        <Route path="/fashion-empire" component={FashionEmpire} />
        <Route path="/fashion" component={FashionEmpire} />
        <Route path="/atlantis-collection" component={AtlantisCollection} />
        <Route path="/empire-index" component={EmpireIndex} />
        <Route path="/journey" component={PortalNavigator} />
        <Route path="/mein" component={MeinLookbook} />
        <Route path="/fashion-portfolio" component={FashionPortfolio} />
        <Route path="/fashion-studio" component={BrandStudio} />
        <Route path="/fashion-artifact-atlas" component={FashionArtifactAtlas} />
        <Route path="/fashion-lookbook-experience" component={FashionLookbookExperience} />
        <Route path="/episode-experience" component={EpisodeExperience} />
        <Route path="/legion-specialist-profiles" component={LegionSpecialistProfiles} />
        <Route path="/commons" component={ConvergenceCommons} />
        <Route path="/signalworks" component={Signalworks} />
        <Route path="/creator-workspace" component={CreatorWorkspace} />
        <Route path="/creator-operations" component={CreatorOperations} />
        <Route path="/admin/creator-operations" component={AdminCreatorOperations} />
        <Route path="/legion-commons" component={LegionCommons} />
        <Route path="/manus-hero" component={ManusHeroCodex} />
        <Route path="/identity-system" component={IdentitySystem} />
        <Route path="/evidence-standards" component={EvidenceStandards} />
        <Route path="/systems-map" component={SystemsMap} />
        <Route path="/launchpad" component={ScrollVerseLaunchpad} />
        <Route path="/release-readiness" component={ReleaseReadiness} />
        <Route path="/privacy" component={PrivacySummary} />
        <Route path="/support" component={SupportPath} />
        <Route path="/github-ops" component={GitHubOperations} />
        <Route path="/revenue-ops" component={RevenueOperations} />
        <Route path="/revenue-operations" component={RevenueOperations} />
        <Route path="/fashion-partnership-proposal" component={FashionPartnershipProposal} />
        <Route path="/manufacturing-readiness" component={ManufacturingReadiness} />
        <Route path="/impact-incentive-readiness" component={ImpactIncentiveReadiness} />
        <Route path="/spiral-signature" component={SpiralSignature} />
        <Route path="/specialist-constellation" component={SpecialistConstellation} />
        <Route path="/health-navigator" component={HealthNavigator} />
        <Route path="/health-research" component={HealthResearchDesk} />
        <Route path="/media-dock" component={MediaDock} />
        <Route path="/media-world" component={MediaWorld} />
        <Route path="/creator-media-studio" component={CreatorMediaStudio} />
        <Route path="/digital-highways" component={DigitalHighways} />
        <Route path="/empire-map" component={EmpireMap} />
        <Route path="/ip-readiness" component={IpReadinessNavigator} />
        <Route path="/ip-stewardship" component={IPStewardshipMap} />
        <Route path="/chain-intelligence" component={ChainIntelligence} />
        <Route path="/knowledge-context" component={KnowledgeContext} />
        <Route path="/open-exchange-field-guide" component={OpenExchangeFieldGuide} />
        <Route path="/protection-protocol" component={ProtectionProtocol} />
        <Route path="/aegis-chronicles" component={AegisChronicles} />
        <Route path="/creator-revenue-learning" component={CreatorRevenueLearning} />
        <Route path="/concept-seal-shrine" component={ConceptSealShrine} />
        <Route path="/platform-foundations" component={PlatformFoundations} />
        <Route path="/knowledge-navigator" component={KnowledgeNavigator} />
        <Route path="/public-reference-trail" component={PublicReferenceTrail} />
        <Route path="/evidence-commons" component={EvidenceCommons} />
        <Route path="/gulf-learning" component={GulfLearning} />
        <Route path="/creator-collection-records" component={CreatorCollectionRecords} />
        <Route path="/operational-safeguards" component={OperationalSafeguards} />
        <Route path="/media-readiness-lab" component={MediaReadinessLab} />
        <Route path="/distribution-highways" component={DistributionHighwaysMap} />
        <Route path="/artist-control-desk" component={ArtistControlDesk} />
        <Route path="/consoleverse" component={ConsoleVerse} />
        <Route path="/opportunity-navigator" component={OpportunityNavigator} />
        <Route path="/github-showcase" component={GitHubShowcase} />
        <Route path="/digital-footprint-report" component={DigitalFootprintReport} />
        <Route path="/creator-channel-hub" component={CreatorChannelHub} />
        <Route path="/instagram-story-engine" component={InstagramStoryEngine} />
        <Route path="/production-continuum" component={ProductionContinuum} />
        <Route path="/capability-audit" component={CapabilityAudit} />
        <Route path="/quantum-research" component={QuantumResearch} />
        <Route path="/pre-registration-readiness" component={PreRegistrationReadiness} />
        <Route path="/open-record-continuum" component={OpenRecordContinuum} />
        <Route path="/production-control" component={ProductionControlDesk} />
        <Route path="/production-control-desk" component={ProductionControlDesk} />
        <Route path="/release-destinations" component={MultiPlatformReleaseDesk} />
        <Route path="/harlem-vineland-legacy" component={HarlemVinelandLegacy} />
        <Route path="/assistive-governance" component={AssistiveGovernanceDesk} />
        <Route path="/scroll-network-context" component={ScrollNetworkContext} />
        <Route path="/crypto-systems-atlas" component={CryptoSystemsAtlas} />
        <Route path="/artifact-evidence-blueprint" component={ArtifactEvidenceBlueprint} />
        <Route path="/institutional-systems-atlas" component={InstitutionalSystemsAtlas} />
        <Route path="/operating-pattern-navigator" component={OperatingPatternNavigator} />
        <Route path="/financial-systems-capability-map" component={FinancialSystemsCapabilityMap} />
        <Route path="/lawful-operating-navigator" component={LawfulOperatingNavigator} />
        <Route path="/original-systems-hub" component={OriginalSystemsHub} />
        <Route path="/enterprise-systems-blueprint" component={EnterpriseSystemsBlueprint} />
        <Route path="/proof-of-practice" component={ProofOfPractice} />
        <Route path="/world-station" component={WorldStation} />
        <Route path="/financial-highways" component={FinancialHighways} />
        <Route path="/narration-directions" component={NarrationDirections} />
        <Route path="/partnership-engine" component={PartnershipEngine} />
        <Route path="/public-portfolio-governance" component={PublicPortfolioGovernance} />
        <Route path="/manifesto-builders-book" component={ManifestoBuildersBook} />
        <Route path="/books-media-readiness" component={BooksMediaReadiness} />
        <Route path="/recovery-materials" component={RecoveryMaterials} />
        <Route path="/co-creation-navigator" component={CoCreationNavigator} />
        <Route path="/idea-exchange" component={IdeaExchange} />
        <Route path="/portal-trust-standard" component={PortalTrustStandard} />
        <Route path="/continuous-improvement-standard" component={ContinuousImprovementStandard} />
      <Route path="/creator-exchange-navigator" component={CreatorExchangeNavigator} />
      <Route path="/creator-exchange-governance-readiness" component={CreatorExchangeGovernanceReadiness} />
      <Route path="/creator-studio-navigator" component={CreatorStudioNavigator} />
        <Route path="/creator-operations-intelligence" component={CreatorOperationsIntelligence} />
        <Route path="/release-package-checklist" component={ReleasePackageChecklist} />
        <Route path="/creator-services-navigator" component={CreatorServicesNavigator} />
        <Route path="/historical-transmission-patterns" component={HistoricalTransmissionPatterns} />
        <Route path="/narrative-source-trail" component={NarrativeSourceTrail} />
        <Route path="/original-media-readiness" component={OriginalMediaReadiness} />
        <Route path="/media-portfolio-readiness" component={MediaPortfolioReadiness} />
        <Route path="/digital-hollywood-studio" component={DigitalHollywoodStudio} />
        <Route path="/financial-activation-readiness" component={FinancialActivationReadiness} />
        <Route path="/future-infrastructure-blueprint" component={FutureInfrastructureBlueprint} />
        <Route path="/quantum-frequency-research-lab" component={QuantumFrequencyResearchLab} />
        <Route path="/audience-value-leverage" component={AudienceValueLeverage} />
        <Route path="/universal-commons" component={UniversalCommons} />
        <Route path="/synchronizations" component={Synchronizations} />
        <Route path="/synchronization-research" component={SynchronizationResearchIndex} />
        <Route path="/chosen-ones-exchange" component={ChosenOnesExperienceExchange} />
        <Route path="/chosen-ones-experience-exchange" component={ChosenOnesExperienceExchange} />
        <Route path="/owner-workstation" component={OwnerWorkstation} />
        <Route path="/creator-media-packet" component={CreatorMediaPacket} />
        <Route path="/master-directory" component={MasterDirectory} />
        <Route path="/nft-monetization-blueprint" component={NftMonetizationBlueprint} />
        <Route path="/empire-asset-navigator" component={EmpireAssetNavigator} />
        <Route path="/brand-feature-studio" component={BrandFeatureStudio} />
        <Route path="/ip-digital-evidence-navigator" component={IpDigitalEvidenceNavigator} />
        <Route path="/ip-digital-evidence" component={IpDigitalEvidenceNavigator} />
        <Route path="/ip-security-readiness" component={IPSecurityReadiness} />
        <Route path="/music-creator-release-readiness" component={MusicCreatorReleaseReadiness} />
        <Route path="/xlviii-blocks-monograph" component={XLVIIIBlocksMonograph} />
        <Route path="/open-knowledge-verse" component={OpenKnowledgeVerse} />
        <Route path="/mesopotamia-commons" component={MesopotamiaCommons} />
        <Route path="/open-research-navigator" component={OpenResearchNavigator} />
        <Route path="/voice-language-studio" component={VoiceLanguageStudio} />
        <Route path="/creator-infrastructure" component={CreatorInfrastructureMap} />
        <Route path="/domain-discovery-map" component={DomainDiscoveryMap} />
        <Route path="/consortium-nexus" component={ConsortiumNexus} />
        <Route path="/standards-evidence-commons" component={StandardsEvidenceCommons} />
        <Route path="/standards-studio" component={StandardsStudio} />
        <Route path="/hypothetical-systems-lab" component={HypotheticalSystemsLab} />
        <Route path="/ecosystem-outcomes-scorecard" component={EcosystemOutcomesScorecard} />
        <Route path="/scrollverse-chess-arena" component={ScrollVerseChessArena} />
        <Route path="/admin/provenance-review" component={AdminProvenanceReview} />
        <Route component={NotFound} />
    </Switch>
    </Suspense>
    <MobileBottomNav />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <LivingSignalLayer />
          <WalkingSolutionBeacon />
          <Router />
          <PWAInstallBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
