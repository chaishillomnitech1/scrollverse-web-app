import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
const NextRetainedImageIntake = lazy(() => import("@/pages/NextRetainedImageIntake")); // import NextRetainedImageIntake from "@/pages/NextRetainedImageIntake"; deferred route module
const GameSystemsResearchBlueprint = lazy(() => import("@/pages/GameSystemsResearchBlueprint")); // import GameSystemsResearchBlueprint from "@/pages/GameSystemsResearchBlueprint"; deferred route module
const OmnilandConsolelessDelivery = lazy(() => import("@/pages/OmnilandConsolelessDelivery")); // import OmnilandConsolelessDelivery from "@/pages/OmnilandConsolelessDelivery"; deferred route module
const Omniland = lazy(() => import("@/pages/Omniland")); // import Omniland from "@/pages/Omniland"; deferred route module
const OmnilandSourceAtlas = lazy(() => import("@/pages/OmnilandSourceAtlas")); // import OmnilandSourceAtlas from "@/pages/OmnilandSourceAtlas"; deferred route module
const OmnilandCinematicGateway = lazy(() => import("@/pages/OmnilandCinematicGateway")); // import OmnilandCinematicGateway from "@/pages/OmnilandCinematicGateway"; deferred route module
const LegacyRoyaltiesResearch = lazy(() => import("@/pages/LegacyRoyaltiesResearch")); // import LegacyRoyaltiesResearch from "@/pages/LegacyRoyaltiesResearch"; deferred route module
const SovereignArchiveChronicles = lazy(() => import("@/pages/SovereignArchiveChronicles")); // import SovereignArchiveChronicles from "@/pages/SovereignArchiveChronicles"; deferred route module
const CreatorDigitalDNA = lazy(() => import("@/pages/CreatorDigitalDNA")); // import CreatorDigitalDNA from "@/pages/CreatorDigitalDNA"; deferred route module
const ChaisSabirAllahMirror = lazy(() => import("@/pages/ChaisSabirAllahMirror")); // import ChaisSabirAllahMirror from "@/pages/ChaisSabirAllahMirror"; deferred route module
const EpisodeBriefBuilder = lazy(() => import("@/pages/EpisodeBriefBuilder")); // import EpisodeBriefBuilder from "@/pages/EpisodeBriefBuilder"; deferred route module
const SevenEpisodeSeries = lazy(() => import("@/pages/SevenEpisodeSeries")); // import SevenEpisodeSeries from "@/pages/SevenEpisodeSeries"; deferred route module
const DynastyVisualArchive = lazy(() => import("@/pages/DynastyVisualArchive")); // import DynastyVisualArchive from "@/pages/DynastyVisualArchive"; deferred route module
const RebirthLivingCodex = lazy(() => import("@/pages/RebirthLivingCodex")); // import RebirthLivingCodex from "@/pages/RebirthLivingCodex"; deferred route module
const InfininillionaireFilmFoundation = lazy(() => import("@/pages/InfininillionaireFilmFoundation")); // import InfininillionaireFilmFoundation from "@/pages/InfininillionaireFilmFoundation"; deferred route module
const PlanningAtlas = lazy(() => import("@/pages/PlanningAtlas")); // import PlanningAtlas from "@/pages/PlanningAtlas"; deferred route module
const DigitalshipAccessionDesk = lazy(() => import("@/pages/DigitalshipAccessionDesk")); // import DigitalshipAccessionDesk from "@/pages/DigitalshipAccessionDesk"; deferred route module
const OmniversalSourceLedger = lazy(() => import("@/pages/OmniversalSourceLedger")); // import OmniversalSourceLedger from "@/pages/OmniversalSourceLedger"; deferred route module
const SourceLabeledStorybookIndex = lazy(() => import("@/pages/SourceLabeledStorybookIndex")); // import SourceLabeledStorybookIndex from "@/pages/SourceLabeledStorybookIndex"; deferred route module
const PlasmaStateMap = lazy(() => import("@/pages/PlasmaStateMap")); // local geometric study; no external media
const FluidityCorpusBlueprint = lazy(() => import("@/pages/FluidityCorpusBlueprint")); // import FluidityCorpusBlueprint from "@/pages/FluidityCorpusBlueprint"; deferred route module
const NewDominionStoryBlueprint = lazy(() => import("@/pages/NewDominionStoryBlueprint")); // import NewDominionStoryBlueprint from "@/pages/NewDominionStoryBlueprint"; deferred route module
const StoryWorldCrossroads = lazy(() => import("@/pages/StoryWorldCrossroads"));
const SynchronizationVideoLibrary = lazy(() => import("./pages/SynchronizationVideoLibrary"));
const SourceCollections = lazy(() => import("@/pages/SourceCollections"));
const SourceWorkReview = lazy(() => import("@/pages/SourceWorkReview"));
const MetaAILegionArchive = lazy(() => import("@/pages/MetaAILegionArchive"));
const PriceOfFreedom = lazy(() => import("@/pages/PriceOfFreedom"));
const InvestorRelations = lazy(() => import("@/pages/InvestorRelations"));
const NineFrameManifestationPacket = lazy(() => import("@/pages/NineFrameManifestationPacket")); // import NineFrameManifestationPacket from "@/pages/NineFrameManifestationPacket"; deferred route module
const MobileCompanion = lazy(() => import("@/pages/MobileCompanion")); // import MobileCompanion from "@/pages/MobileCompanion"; deferred route module
const OmniMasterRegistryRecord = lazy(() => import("@/pages/OmniMasterRegistryRecord")); // import OmniMasterRegistryRecord from "@/pages/OmniMasterRegistryRecord"; deferred route module
const OmnilandEmbodiedPlay = lazy(() => import("@/pages/OmnilandEmbodiedPlay")); // import OmnilandEmbodiedPlay from "@/pages/OmnilandEmbodiedPlay"; deferred route module
const OmnilandGameSystemsContribution = lazy(() => import("@/pages/OmnilandGameSystemsContribution")); // import OmnilandGameSystemsContribution from "@/pages/OmnilandGameSystemsContribution"; deferred route module
const MediaReleaseConceptBoard = lazy(() => import("@/pages/MediaReleaseConceptBoard")); // import MediaReleaseConceptBoard from "@/pages/MediaReleaseConceptBoard"; deferred route module
const CommerceFinancialReadinessBoard = lazy(() => import("@/pages/CommerceFinancialReadinessBoard")); // import CommerceFinancialReadinessBoard from "@/pages/CommerceFinancialReadinessBoard"; deferred route module
const ActivePathwaysReleaseGatesAudit = lazy(() => import("@/pages/ActivePathwaysReleaseGatesAudit")); // import ActivePathwaysReleaseGatesAudit from "@/pages/ActivePathwaysReleaseGatesAudit"; deferred route module
const AtlasCore = lazy(() => import("@/pages/AtlasCore"));
const NotFound = lazy(() => import("@/pages/NotFound")); // import NotFound from "@/pages/NotFound"; deferred route module
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
const Home = lazy(() => import("./pages/Home")); // import Home from "./pages/Home"; deferred route module
const GlobalMap = lazy(() => import("./pages/GlobalMap")); // import GlobalMap from "./pages/GlobalMap"; deferred route module
const Revenue = lazy(() => import("./pages/Revenue")); // import Revenue from "./pages/Revenue"; deferred route module
const Guardians = lazy(() => import("./pages/Guardians")); // import Guardians from "./pages/Guardians"; deferred route module
const Academy = lazy(() => import("./pages/Academy")); // import Academy from "./pages/Academy"; deferred route module
const Dashboard = lazy(() => import("./pages/Dashboard")); // import Dashboard from "./pages/Dashboard"; deferred route module
const WalletConnect = lazy(() => import("./pages/WalletConnect")); // import WalletConnect from "./pages/WalletConnect"; deferred route module
const TokenStore = lazy(() => import("./pages/TokenStore")); // import TokenStore from "./pages/TokenStore"; deferred route module
const CryptoHub = lazy(() => import("./pages/CryptoHub")); // import CryptoHub from "./pages/CryptoHub"; deferred route module
const AILegion = lazy(() => import("./pages/AILegion")); // import AILegion from "./pages/AILegion"; deferred route module
const Deploy = lazy(() => import("./pages/Deploy")); // import Deploy from "./pages/Deploy"; deferred route module
const Telegram = lazy(() => import("./pages/Telegram")); // import Telegram from "./pages/Telegram"; deferred route module
const Discord = lazy(() => import("./pages/Discord")); // import Discord from "./pages/Discord"; deferred route module
const Music = lazy(() => import("./pages/Music")); // import Music from "./pages/Music"; deferred route module
const Connect = lazy(() => import("./pages/Connect")); // import Connect from "./pages/Connect"; deferred route module
const Chat = lazy(() => import("./pages/Chat")); // import Chat from "./pages/Chat"; deferred route module
const AnnoOmni = lazy(() => import("./pages/AnnoOmni")); // import AnnoOmni from "./pages/AnnoOmni"; deferred route module
const Referral = lazy(() => import("./pages/Referral")); // import Referral from "./pages/Referral"; deferred route module
const ScrollPort = lazy(() => import("./pages/ScrollPort")); // import ScrollPort from "./pages/ScrollPort"; deferred route module
const OmniExpansion = lazy(() => import("./pages/OmniExpansion")); // import OmniExpansion from "./pages/OmniExpansion"; deferred route module
const AiCouncil = lazy(() => import("./pages/AiCouncil")); // import AiCouncil from "./pages/AiCouncil"; deferred route module
const Legion = lazy(() => import("./pages/Legion")); // import Legion from "./pages/Legion"; deferred route module
import PWAInstallBanner from "./components/PWAInstallBanner";
import { LivingSignalLayer } from "./components/LivingSignalLayer";
import { WalkingSolutionBeacon } from "./components/WalkingSolutionBeacon";
const Frequency = lazy(() => import("./pages/Frequency")); // import Frequency from "./pages/Frequency"; deferred route module
const Staking = lazy(() => import("./pages/Staking")); // import Staking from "./pages/Staking"; deferred route module
const Governance = lazy(() => import("./pages/Governance")); // import Governance from "./pages/Governance"; deferred route module
const NftMarketplace = lazy(() => import("./pages/NftMarketplace")); // import NftMarketplace from "./pages/NftMarketplace"; deferred route module
const GuardianProtocol = lazy(() => import("./pages/GuardianProtocol")); // import GuardianProtocol from "./pages/GuardianProtocol"; deferred route module
const ConsciousnessMirror = lazy(() => import("./pages/ConsciousnessMirror")); // import ConsciousnessMirror from "./pages/ConsciousnessMirror"; deferred route module
const CelestineStarforge = lazy(() => import("./pages/CelestineStarforge")); // import CelestineStarforge from "./pages/CelestineStarforge"; deferred route module
const Platforms = lazy(() => import("./pages/Platforms")); // import Platforms from "./pages/Platforms"; deferred route module
const Library = lazy(() => import("./pages/Library")); // import Library from "./pages/Library"; deferred route module
const Scroll44 = lazy(() => import("./pages/Scroll44")); // import Scroll44 from "./pages/Scroll44"; deferred route module
const QuantumPractice = lazy(() => import("./pages/QuantumPractice")); // import QuantumPractice from "./pages/QuantumPractice"; deferred route module
const KingSolomon = lazy(() => import("./pages/KingSolomon")); // import KingSolomon from "./pages/KingSolomon"; deferred route module
const AcademyV2 = lazy(() => import("./pages/AcademyV2")); // import AcademyV2 from "./pages/AcademyV2"; deferred route module
const Singularity = lazy(() => import("./pages/Singularity")); // import Singularity from "./pages/Singularity"; deferred route module
const CatalystNft = lazy(() => import("./pages/CatalystNft")); // import CatalystNft from "./pages/CatalystNft"; deferred route module
const Broadcast = lazy(() => import("./pages/Broadcast")); // import Broadcast from "./pages/Broadcast"; deferred route module
const GuardianProfile = lazy(() => import("./pages/GuardianProfile")); // import GuardianProfile from "./pages/GuardianProfile"; deferred route module
const MajesticAnchor = lazy(() => import("./pages/MajesticAnchor")); // import MajesticAnchor from "./pages/MajesticAnchor"; deferred route module
const Zaire = lazy(() => import("./pages/Zaire")); // import Zaire from "./pages/Zaire"; deferred route module
const Onboard = lazy(() => import("./pages/Onboard")); // import Onboard from "./pages/Onboard"; deferred route module
const Security = lazy(() => import("./pages/Security")); // import Security from "./pages/Security"; deferred route module
const Acquisition = lazy(() => import("./pages/Acquisition")); // import Acquisition from "./pages/Acquisition"; deferred route module
const Sentience = lazy(() => import("./pages/Sentience")); // import Sentience from "./pages/Sentience"; deferred route module
const BookOfLifeMint = lazy(() => import("./pages/BookOfLifeMint")); // import BookOfLifeMint from "./pages/BookOfLifeMint"; deferred route module
const FamilyPortal = lazy(() => import("./pages/FamilyPortal")); // import FamilyPortal from "./pages/FamilyPortal"; deferred route module
const Song = lazy(() => import("./pages/Song")); // import Song from "./pages/Song"; deferred route module
const AIHub = lazy(() => import("./pages/AIHub")); // import AIHub from "./pages/AIHub"; deferred route module
const SalesDashboard = lazy(() => import("./pages/SalesDashboard")); // import SalesDashboard from "./pages/SalesDashboard"; deferred route module
const CreatorPlatform = lazy(() => import("./pages/CreatorPlatform")); // import CreatorPlatform from "./pages/CreatorPlatform"; deferred route module
const SystemStatus = lazy(() => import("./pages/SystemStatus")); // import SystemStatus from "./pages/SystemStatus"; deferred route module
const KYCVerification = lazy(() => import("./pages/KYCVerification")); // import KYCVerification from "./pages/KYCVerification"; deferred route module
const Mother10 = lazy(() => import("./pages/mother-10-origin-doesnt-matter"));
const Exchange = lazy(() => import("./pages/Exchange")); // import Exchange from "./pages/Exchange"; deferred route module
const ExchangeCrypto = lazy(() => import("./pages/ExchangeCrypto")); // import ExchangeCrypto from "./pages/ExchangeCrypto"; deferred route module
const TradingReadiness = lazy(() => import("./pages/TradingReadiness")); // import TradingReadiness from "./pages/TradingReadiness"; deferred route module
const ExchangeStocks = lazy(() => import("./pages/ExchangeStocks")); // import ExchangeStocks from "./pages/ExchangeStocks"; deferred route module
const ExchangeCurrencies = lazy(() => import("./pages/ExchangeCurrencies")); // import ExchangeCurrencies from "./pages/ExchangeCurrencies"; deferred route module
const ExchangeGovernance = lazy(() => import("./pages/ExchangeGovernance")); // import ExchangeGovernance from "./pages/ExchangeGovernance"; deferred route module
const ExchangeHeatmap = lazy(() => import("./pages/ExchangeHeatmap")); // import ExchangeHeatmap from "./pages/ExchangeHeatmap"; deferred route module
const ExchangePortfolio = lazy(() => import("./pages/ExchangePortfolio")); // import ExchangePortfolio from "./pages/ExchangePortfolio"; deferred route module
const ExchangeDeFi = lazy(() => import("./pages/ExchangeDeFi")); // import ExchangeDeFi from "./pages/ExchangeDeFi"; deferred route module
const Knowledge = lazy(() => import("./pages/Knowledge")); // import Knowledge from "./pages/Knowledge"; deferred route module
const LegionRewards = lazy(() => import("./pages/LegionRewards")); // import LegionRewards from "./pages/LegionRewards"; deferred route module
const IPProtection = lazy(() => import("./pages/IPProtection")); // import IPProtection from "./pages/IPProtection"; deferred route module
const Intelligence = lazy(() => import("./pages/Intelligence")); // import Intelligence from "./pages/Intelligence"; deferred route module
const Partners = lazy(() => import("./pages/Partners")); // import Partners from "./pages/Partners"; deferred route module
const LinkInBio = lazy(() => import("./pages/LinkInBio")); // import LinkInBio from "./pages/LinkInBio"; deferred route module
const AdminCreators = lazy(() => import("./pages/AdminCreators")); // import AdminCreators from "./pages/AdminCreators"; deferred route module
const AdminCHXReservations = lazy(() => import("./pages/AdminCHXReservations")); // import AdminCHXReservations from "./pages/AdminCHXReservations"; deferred route module
const MrWalkshit = lazy(() => import("./pages/MrWalkshit")); // import MrWalkshit from "./pages/MrWalkshit"; deferred route module
const CIEDS = lazy(() => import("./pages/CIEDS")); // import CIEDS from "./pages/CIEDS"; deferred route module
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess")); // import PaymentSuccess from "./pages/PaymentSuccess"; deferred route module
const OmniCodex = lazy(() => import("./pages/OmniCodex")); // import OmniCodex from "./pages/OmniCodex"; deferred route module
const GlobalDashboard = lazy(() => import("./pages/GlobalDashboard")); // import GlobalDashboard from "./pages/GlobalDashboard"; deferred route module
const LondynLegacy = lazy(() => import("./pages/LondynLegacy")); // import LondynLegacy from "./pages/LondynLegacy"; deferred route module
const Codex1587 = lazy(() => import("./pages/Codex1587")); // import Codex1587 from "./pages/Codex1587"; deferred route module
const GuardianStories = lazy(() => import("./pages/GuardianStories")); // import GuardianStories from "./pages/GuardianStories"; deferred route module
const RingActivation = lazy(() => import("./pages/RingActivation")); // import RingActivation from "./pages/RingActivation"; deferred route module
const FlamebearerInitiative = lazy(() => import("./pages/FlamebearerInitiative")); // import FlamebearerInitiative from "./pages/FlamebearerInitiative"; deferred route module
const MerkabaKey = lazy(() => import("./pages/MerkabaKey")); // import MerkabaKey from "./pages/MerkabaKey"; deferred route module
const AcademyHub = lazy(() => import("./pages/AcademyHub")); // import AcademyHub from "./pages/AcademyHub"; deferred route module
const ZakatEngine = lazy(() => import("./pages/ZakatEngine")); // import ZakatEngine from "./pages/ZakatEngine"; deferred route module
const GlobalAnnouncement = lazy(() => import("./pages/GlobalAnnouncement")); // import GlobalAnnouncement from "./pages/GlobalAnnouncement"; deferred route module
const Kepler452b = lazy(() => import("./pages/Kepler452b")); // import Kepler452b from "./pages/Kepler452b"; deferred route module
const KeplerNFT = lazy(() => import("./pages/KeplerNFT")); // import KeplerNFT from "./pages/KeplerNFT"; deferred route module
const GuardianVoyage = lazy(() => import("./pages/GuardianVoyage")); // import GuardianVoyage from "./pages/GuardianVoyage"; deferred route module
const DeepExa = lazy(() => import("./pages/DeepExa")); // import DeepExa from "./pages/DeepExa"; deferred route module
const Casino = lazy(() => import("./pages/Casino")); // import Casino from "./pages/Casino"; deferred route module
const KnicksNFT = lazy(() => import("./pages/KnicksNFT")); // import KnicksNFT from "./pages/KnicksNFT"; deferred route module
const SynterAnalytics = lazy(() => import("./pages/SynterAnalytics")); // import SynterAnalytics from "./pages/SynterAnalytics"; deferred route module
const MassiveStorage = lazy(() => import("./pages/MassiveStorage")); // import MassiveStorage from "./pages/MassiveStorage"; deferred route module
const ManusAmbassador = lazy(() => import("./pages/ManusAmbassador")); // import ManusAmbassador from "./pages/ManusAmbassador"; deferred route module
const SovereignBank = lazy(() => import("./pages/SovereignBank")); // import SovereignBank from "./pages/SovereignBank"; deferred route module
const ChaisSabirEquation = lazy(() => import("./pages/ChaisSabirEquation")); // import ChaisSabirEquation from "./pages/ChaisSabirEquation"; deferred route module
const ScrollTV = lazy(() => import("./pages/ScrollTV")); // import ScrollTV from "./pages/ScrollTV"; deferred route module
const NFTUnlock = lazy(() => import("./pages/NFTUnlock")); // import NFTUnlock from "./pages/NFTUnlock"; deferred route module
const SiteMap = lazy(() => import("./pages/SiteMap")); // import SiteMap from "./pages/SiteMap"; deferred route module
const GamingHub = lazy(() => import("./pages/GamingHub")); // import GamingHub from "./pages/GamingHub"; deferred route module
const StreamVerse = lazy(() => import("./pages/StreamVerse")); // import StreamVerse from "./pages/StreamVerse"; deferred route module
const KnickBlockchain = lazy(() => import("./pages/KnickBlockchain")); // import KnickBlockchain from "./pages/KnickBlockchain"; deferred route module
const NipseyLegacy = lazy(() => import("./pages/NipseyLegacy")); // import NipseyLegacy from "./pages/NipseyLegacy"; deferred route module
const DigitalTwin = lazy(() => import("./pages/DigitalTwin")); // import DigitalTwin from "./pages/DigitalTwin"; deferred route module
const AllversalHighway = lazy(() => import("./pages/AllversalHighway")); // import AllversalHighway from "./pages/AllversalHighway"; deferred route module
const SovereignPartnerships = lazy(() => import("./pages/SovereignPartnerships")); // import SovereignPartnerships from "./pages/SovereignPartnerships"; deferred route module
const MikaSolara = lazy(() => import("./pages/MikaSolara")); // import MikaSolara from "./pages/MikaSolara"; deferred route module
const SolaraCoin = lazy(() => import("./pages/SolaraCoin")); // import SolaraCoin from "./pages/SolaraCoin"; deferred route module
const Storybooks = lazy(() => import("./pages/Storybooks")); // import Storybooks from "./pages/Storybooks"; deferred route module
const DigitalShips = lazy(() => import("./pages/DigitalShips")); // import DigitalShips from "./pages/DigitalShips"; deferred route module
const ManusHero = lazy(() => import("./pages/ManusHero")); // import ManusHero from "./pages/ManusHero"; deferred route module
const TikTokShop = lazy(() => import("./pages/TikTokShop")); // import TikTokShop from "./pages/TikTokShop"; deferred route module
const StarGate = lazy(() => import("./pages/StarGate")); // import StarGate from "./pages/StarGate"; deferred route module
const RevenueFlywheel = lazy(() => import("./pages/RevenueFlywheel")); // import RevenueFlywheel from "./pages/RevenueFlywheel"; deferred route module
const JuneteenthDeclaration = lazy(() => import("./pages/JuneteenthDeclaration")); // import JuneteenthDeclaration from "./pages/JuneteenthDeclaration"; deferred route module
const GuardianCrusade = lazy(() => import("./pages/GuardianCrusade")); // import GuardianCrusade from "./pages/GuardianCrusade"; deferred route module
const RevenueDashboard = lazy(() => import("./pages/RevenueDashboard")); // import RevenueDashboard from "./pages/RevenueDashboard"; deferred route module
const Partnerships = lazy(() => import("./pages/Partnerships")); // import Partnerships from "./pages/Partnerships"; deferred route module
const SovereignCRM = lazy(() => import("./pages/SovereignCRM")); // import SovereignCRM from "./pages/SovereignCRM"; deferred route module
const MasterGateway = lazy(() => import("./pages/MasterGateway")); // import MasterGateway from "./pages/MasterGateway"; deferred route module
const MasterApp = lazy(() => import("./pages/MasterApp")); // import MasterApp from "./pages/MasterApp"; deferred route module
const SovereignBroadcast = lazy(() => import("./pages/SovereignBroadcast")); // import SovereignBroadcast from "./pages/SovereignBroadcast"; deferred route module
const AITwin = lazy(() => import("./pages/AITwin")); // import AITwin from "./pages/AITwin"; deferred route module
const NBADraftGenesis = lazy(() => import("./pages/NBADraftGenesis")); // import NBADraftGenesis from "./pages/NBADraftGenesis"; deferred route module
const SovereignManifesto = lazy(() => import("./pages/SovereignManifesto")); // import SovereignManifesto from "./pages/SovereignManifesto"; deferred route module
const ChaisNumberOne = lazy(() => import("./pages/ChaisNumberOne")); // import ChaisNumberOne from "./pages/ChaisNumberOne"; deferred route module
const KnicksLegacy = lazy(() => import("./pages/KnicksLegacy")); // import KnicksLegacy from "./pages/KnicksLegacy"; deferred route module
const KnicksNation = lazy(() => import("./pages/KnicksNation")); // import KnicksNation from "./pages/KnicksNation"; deferred route module
const Aegis = lazy(() => import("./pages/Aegis")); // import Aegis from "./pages/Aegis"; deferred route module
const SovereignPodcast = lazy(() => import("./pages/SovereignPodcast")); // import SovereignPodcast from "./pages/SovereignPodcast"; deferred route module
const NamesOfAllah = lazy(() => import("./pages/NamesOfAllah")); // import NamesOfAllah from "./pages/NamesOfAllah"; deferred route module
const ScrollLibrary = lazy(() => import("./pages/ScrollLibrary")); // import ScrollLibrary from "./pages/ScrollLibrary"; deferred route module
const JuniorMoviesNFT = lazy(() => import("./pages/JuniorMoviesNFT")); // import JuniorMoviesNFT from "./pages/JuniorMoviesNFT"; deferred route module
const OmniVault = lazy(() => import("./pages/OmniVault")); // import OmniVault from "./pages/OmniVault"; deferred route module
const JuniorMoviesStudio = lazy(() => import("./pages/JuniorMoviesStudio")); // import JuniorMoviesStudio from "./pages/JuniorMoviesStudio"; deferred route module
const ScrollAcademy = lazy(() => import("./pages/ScrollAcademy")); // import ScrollAcademy from "./pages/ScrollAcademy"; deferred route module
const EcosystemOverview = lazy(() => import("./pages/EcosystemOverview")); // import EcosystemOverview from "./pages/EcosystemOverview"; deferred route module
const GatesOne = lazy(() => import("./pages/GatesOne")); // import GatesOne from "./pages/GatesOne"; deferred route module
const InfiniteNFT = lazy(() => import("./pages/InfiniteNFT")); // import InfiniteNFT from "./pages/InfiniteNFT"; deferred route module
const Archive = lazy(() => import("./pages/Archive")); // import Archive from "./pages/Archive"; deferred route module
const SovereignCards = lazy(() => import("./pages/SovereignCards")); // import SovereignCards from "./pages/SovereignCards"; deferred route module
const Subscribe = lazy(() => import("./pages/Subscribe")); // import Subscribe from "./pages/Subscribe"; deferred route module
const ChaisCatalog = lazy(() => import("./pages/ChaisCatalog")); // import ChaisCatalog from "./pages/ChaisCatalog"; deferred route module
const ChaisVideos = lazy(() => import("./pages/ChaisVideos")); // import ChaisVideos from "./pages/ChaisVideos"; deferred route module
const RizzBurna = lazy(() => import("./pages/RizzBurna")); // import RizzBurna from "./pages/RizzBurna"; deferred route module
const GuardianDashboard = lazy(() => import("./pages/GuardianDashboard")); // import GuardianDashboard from "./pages/GuardianDashboard"; deferred route module
const Tatanka = lazy(() => import("./pages/Tatanka")); // import Tatanka from "./pages/Tatanka"; deferred route module
const Gates = lazy(() => import("./pages/Gates")); // import Gates from "./pages/Gates"; deferred route module
const Curriculum = lazy(() => import("./pages/Curriculum")); // import Curriculum from "./pages/Curriculum"; deferred route module
const Manifesto = lazy(() => import("./pages/Manifesto")); // import Manifesto from "./pages/Manifesto"; deferred route module
const GateKeys = lazy(() => import("@/pages/GateKeys")); // import GateKeys from "@/pages/GateKeys"; deferred route module
const FrequencyPlayer = lazy(() => import("@/pages/FrequencyPlayer")); // import FrequencyPlayer from "@/pages/FrequencyPlayer"; deferred route module
const GatesMap = lazy(() => import("./pages/GatesMap")); // import GatesMap from "./pages/GatesMap"; deferred route module
const SummerLeague = lazy(() => import("./pages/SummerLeague")); // import SummerLeague from "./pages/SummerLeague"; deferred route module
const Masjid = lazy(() => import("./pages/Masjid")); // import Masjid from "./pages/Masjid"; deferred route module
const SCF = lazy(() => import("./pages/SCF")); // import SCF from "./pages/SCF"; deferred route module
const SuperManus = lazy(() => import("./pages/SuperManus")); // import SuperManus from "./pages/SuperManus"; deferred route module
const Forge = lazy(() => import("./pages/Forge")); // import Forge from "./pages/Forge"; deferred route module
const Altar = lazy(() => import("./pages/Altar")); // import Altar from "./pages/Altar"; deferred route module
const Pantheon = lazy(() => import("./pages/Pantheon")); // import Pantheon from "./pages/Pantheon"; deferred route module
const Legacy = lazy(() => import("./pages/Legacy")); // import Legacy from "./pages/Legacy"; deferred route module
const Builder = lazy(() => import("./pages/Builder")); // import Builder from "./pages/Builder"; deferred route module
const Heir = lazy(() => import("./pages/Heir")); // import Heir from "./pages/Heir"; deferred route module
const Returner = lazy(() => import("./pages/Returner")); // import Returner from "./pages/Returner"; deferred route module
const Emerald = lazy(() => import("./pages/Emerald")); // import Emerald from "./pages/Emerald"; deferred route module
const Oka = lazy(() => import("./pages/Oka")); // import Oka from "./pages/Oka"; deferred route module
const Vault = lazy(() => import("./pages/Vault")); // import Vault from "./pages/Vault"; deferred route module
const Chronicle = lazy(() => import("./pages/Chronicle")); // import Chronicle from "./pages/Chronicle"; deferred route module
const Pattern = lazy(() => import("./pages/Pattern")); // import Pattern from "./pages/Pattern"; deferred route module
const Codex = lazy(() => import("./pages/Codex")); // import Codex from "./pages/Codex"; deferred route module
const Resilience = lazy(() => import("./pages/Resilience")); // import Resilience from "./pages/Resilience"; deferred route module
const Mirror = lazy(() => import("./pages/Mirror")); // import Mirror from "./pages/Mirror"; deferred route module
const Equation = lazy(() => import("./pages/Equation")); // import Equation from "./pages/Equation"; deferred route module
const Portal = lazy(() => import("./pages/Portal")); // import Portal from "./pages/Portal"; deferred route module
const Highway = lazy(() => import("./pages/Highway")); // import Highway from "./pages/Highway"; deferred route module
const Throne = lazy(() => import("./pages/Throne")); // import Throne from "./pages/Throne"; deferred route module
const Gilgamesh = lazy(() => import("./pages/Gilgamesh")); // import Gilgamesh from "./pages/Gilgamesh"; deferred route module
const SaferWay = lazy(() => import("./pages/SaferWay")); // import SaferWay from "./pages/SaferWay"; deferred route module
const NoorAlMawlid = lazy(() => import("./pages/NoorAlMawlid")); // import NoorAlMawlid from "./pages/NoorAlMawlid"; deferred route module
const SeerahIndex = lazy(() => import("./pages/SeerahIndex")); // import SeerahIndex from "./pages/SeerahIndex"; deferred route module
const GodEngine = lazy(() => import("./pages/GodEngine")); // import GodEngine from "./pages/GodEngine"; deferred route module
const ArchiveKeeper = lazy(() => import("./pages/ArchiveKeeper")); // import ArchiveKeeper from "./pages/ArchiveKeeper"; deferred route module
const AlHijra = lazy(() => import("./pages/AlHijra")); // import AlHijra from "./pages/AlHijra"; deferred route module
const AdminSaferWay = lazy(() => import("./pages/AdminSaferWay")); // import AdminSaferWay from "./pages/AdminSaferWay"; deferred route module
const AdminAtlantisCatalog = lazy(() => import("./pages/AdminAtlantisCatalog")); // import AdminAtlantisCatalog from "./pages/AdminAtlantisCatalog"; deferred route module
const AdminFashionReview = lazy(() => import("./pages/AdminFashionReview")); // import AdminFashionReview from "./pages/AdminFashionReview"; deferred route module
const AdminCreatorOperations = lazy(() => import("./pages/AdminCreatorOperations")); // import AdminCreatorOperations from "./pages/AdminCreatorOperations"; deferred route module
const Badr = lazy(() => import("./pages/Badr")); // import Badr from "./pages/Badr"; deferred route module
const OmniMetrics = lazy(() => import("./pages/OmniMetrics")); // import OmniMetrics from "./pages/OmniMetrics"; deferred route module
const FathMakkah = lazy(() => import("./pages/FathMakkah")); // import FathMakkah from "./pages/FathMakkah"; deferred route module
const AlGhazwat = lazy(() => import("./pages/AlGhazwat")); // import AlGhazwat from "./pages/AlGhazwat"; deferred route module
const SeerahQuiz = lazy(() => import("./pages/SeerahQuiz")); // import SeerahQuiz from "./pages/SeerahQuiz"; deferred route module
const AlWafat = lazy(() => import("./pages/AlWafat")); // import AlWafat from "./pages/AlWafat"; deferred route module
const SeerahTimeline = lazy(() => import("./pages/SeerahTimeline")); // import SeerahTimeline from "./pages/SeerahTimeline"; deferred route module
const Nexus = lazy(() => import("./pages/Nexus")); // import Nexus from "./pages/Nexus"; deferred route module
const JuniorMoviesUniverse = lazy(() => import("./pages/JuniorMoviesUniverse")); // import JuniorMoviesUniverse from "./pages/JuniorMoviesUniverse"; deferred route module
const AlFathKhaybar = lazy(() => import("./pages/AlFathKhaybar")); // import AlFathKhaybar from "./pages/AlFathKhaybar"; deferred route module
const SovereignBooks = lazy(() => import("./pages/SovereignBooks")); // import SovereignBooks from "./pages/SovereignBooks"; deferred route module
const AlAqsa = lazy(() => import("./pages/AlAqsa")); // import AlAqsa from "./pages/AlAqsa"; deferred route module
import ThinkSpace from '@/pages/ThinkSpace';
import ThinkSpaceFeatured from '@/pages/ThinkSpaceFeatured';
import AIChatUpload from '@/pages/AIChatUpload';
const AlFarewell = lazy(() => import("./pages/AlFarewell")); // import AlFarewell from "./pages/AlFarewell"; deferred route module
const Londyn = lazy(() => import("./pages/Londyn")); // import Londyn from "./pages/Londyn"; deferred route module
const SovereignCard = lazy(() => import("./pages/SovereignCard")); // import SovereignCard from "./pages/SovereignCard"; deferred route module
const GitHubConstellation = lazy(() => import("./pages/GitHubConstellation")); // import GitHubConstellation from "./pages/GitHubConstellation"; deferred route module
const GitHubEvidenceMap = lazy(() => import("./pages/GitHubEvidenceMap")); // import GitHubEvidenceMap from "./pages/GitHubEvidenceMap"; deferred route module
const NinetyNineNames = lazy(() => import("./pages/NinetyNineNames")); // import NinetyNineNames from "./pages/NinetyNineNames"; deferred route module
const Knick = lazy(() => import("./pages/Knick")); // import Knick from "./pages/Knick"; deferred route module
const LondynLetters = lazy(() => import("./pages/LondynLetters")); // import LondynLetters from "./pages/LondynLetters"; deferred route module
const ChannelCodex = lazy(() => import("./pages/ChannelCodex")); // import ChannelCodex from "./pages/ChannelCodex"; deferred route module
const SovereignSpaceAgency = lazy(() => import("./pages/SovereignSpaceAgency")); // import SovereignSpaceAgency from "./pages/SovereignSpaceAgency"; deferred route module
const MesopotamiaLibrary = lazy(() => import("./pages/MesopotamiaLibrary")); // import MesopotamiaLibrary from "./pages/MesopotamiaLibrary"; deferred route module
const FreeEnergyArchitecture = lazy(() => import("./pages/FreeEnergyArchitecture")); // import FreeEnergyArchitecture from "./pages/FreeEnergyArchitecture"; deferred route module
const GuardianActivation = lazy(() => import("./pages/GuardianActivation")); // import GuardianActivation from "./pages/GuardianActivation"; deferred route module
const GuardianLeaderboard = lazy(() => import("./pages/GuardianLeaderboard")); // import GuardianLeaderboard from "./pages/GuardianLeaderboard"; deferred route module
const TeslaPatents = lazy(() => import("./pages/TeslaPatents")); // import TeslaPatents from "./pages/TeslaPatents"; deferred route module
const DCVisit = lazy(() => import("./pages/DCVisit")); // import DCVisit from "./pages/DCVisit"; deferred route module
const PhilosophersArchive = lazy(() => import("./pages/PhilosophersArchive")); // import PhilosophersArchive from "./pages/PhilosophersArchive"; deferred route module
const AlIsraWalMirajDeep = lazy(() => import("./pages/AlIsraWalMirajDeep")); // import AlIsraWalMirajDeep from "./pages/AlIsraWalMirajDeep"; deferred route module
const VirgilAbloh = lazy(() => import("./pages/VirgilAbloh")); // import VirgilAbloh from "./pages/VirgilAbloh"; deferred route module
const FashionEmpire = lazy(() => import("./pages/FashionEmpire")); // import FashionEmpire from "./pages/FashionEmpire"; deferred route module
const AtlantisCollection = lazy(() => import("./pages/AtlantisCollection")); // import AtlantisCollection from "./pages/AtlantisCollection"; deferred route module
const EmpireIndex = lazy(() => import("./pages/EmpireIndex")); // import EmpireIndex from "./pages/EmpireIndex"; deferred route module
const MeinLookbook = lazy(() => import("./pages/MeinLookbook")); // import MeinLookbook from "./pages/MeinLookbook"; deferred route module
const FashionPortfolio = lazy(() => import("./pages/FashionPortfolio")); // import FashionPortfolio from "./pages/FashionPortfolio"; deferred route module
const BrandStudio = lazy(() => import("./pages/BrandStudio")); // import BrandStudio from "./pages/BrandStudio"; deferred route module
const FashionArtifactAtlas = lazy(() => import("./pages/FashionArtifactAtlas")); // import FashionArtifactAtlas from "./pages/FashionArtifactAtlas"; deferred route module
const FashionLookbookExperience = lazy(() => import("./pages/FashionLookbookExperience")); // import FashionLookbookExperience from "./pages/FashionLookbookExperience"; deferred route module
const EpisodeExperience = lazy(() => import("./pages/EpisodeExperience")); // import EpisodeExperience from "./pages/EpisodeExperience"; deferred route module
const LegionSpecialistProfiles = lazy(() => import("./pages/LegionSpecialistProfiles")); // import LegionSpecialistProfiles from "./pages/LegionSpecialistProfiles"; deferred route module
const PortalNavigator = lazy(() => import("./pages/PortalNavigator")); // import PortalNavigator from "./pages/PortalNavigator"; deferred route module
const ConvergenceCommons = lazy(() => import("./pages/ConvergenceCommons")); // import ConvergenceCommons from "./pages/ConvergenceCommons"; deferred route module
const Signalworks = lazy(() => import("./pages/Signalworks")); // import Signalworks from "./pages/Signalworks"; deferred route module
const CreatorWorkspace = lazy(() => import("./pages/CreatorWorkspace")); // import CreatorWorkspace from "./pages/CreatorWorkspace"; deferred route module
const CreatorOperations = lazy(() => import("./pages/CreatorOperations")); // import CreatorOperations from "./pages/CreatorOperations"; deferred route module
const LegionCommons = lazy(() => import("./pages/LegionCommons")); // import LegionCommons from "./pages/LegionCommons"; deferred route module
const AdminProvenanceReview = lazy(() => import("./pages/AdminProvenanceReview")); // import AdminProvenanceReview from "./pages/AdminProvenanceReview"; deferred route module
const ManusHeroCodex = lazy(() => import("./pages/ManusHeroCodex")); // import ManusHeroCodex from "./pages/ManusHeroCodex"; deferred route module
const IdentitySystem = lazy(() => import("./pages/IdentitySystem")); // import IdentitySystem from "./pages/IdentitySystem"; deferred route module
const EvidenceStandards = lazy(() => import("./pages/EvidenceStandards")); // import EvidenceStandards from "./pages/EvidenceStandards"; deferred route module
const SystemsMap = lazy(() => import("./pages/SystemsMap")); // import SystemsMap from "./pages/SystemsMap"; deferred route module
const ScrollVerseLaunchpad = lazy(() => import("./pages/ScrollVerseLaunchpad")); // import ScrollVerseLaunchpad from "./pages/ScrollVerseLaunchpad"; deferred route module
const ReleaseReadiness = lazy(() => import("./pages/ReleaseReadiness")); // import ReleaseReadiness from "./pages/ReleaseReadiness"; deferred route module
const PrivacySummary = lazy(() => import("./pages/PrivacySummary")); // import PrivacySummary from "./pages/PrivacySummary"; deferred route module
const SupportPath = lazy(() => import("./pages/SupportPath")); // import SupportPath from "./pages/SupportPath"; deferred route module
const GitHubOperations = lazy(() => import("./pages/GitHubOperations")); // import GitHubOperations from "./pages/GitHubOperations"; deferred route module
const RevenueOperations = lazy(() => import("./pages/RevenueOperations")); // import RevenueOperations from "./pages/RevenueOperations"; deferred route module
const FashionPartnershipProposal = lazy(() => import("./pages/FashionPartnershipProposal")); // import FashionPartnershipProposal from "./pages/FashionPartnershipProposal"; deferred route module
const ManufacturingReadiness = lazy(() => import("./pages/ManufacturingReadiness")); // import ManufacturingReadiness from "./pages/ManufacturingReadiness"; deferred route module
const ImpactIncentiveReadiness = lazy(() => import("./pages/ImpactIncentiveReadiness")); // import ImpactIncentiveReadiness from "./pages/ImpactIncentiveReadiness"; deferred route module
const SpiralSignature = lazy(() => import("./pages/SpiralSignature")); // import SpiralSignature from "./pages/SpiralSignature"; deferred route module
const SpecialistConstellation = lazy(() => import("./pages/SpecialistConstellation")); // import SpecialistConstellation from "./pages/SpecialistConstellation"; deferred route module
const HealthNavigator = lazy(() => import("./pages/HealthNavigator")); // import HealthNavigator from "./pages/HealthNavigator"; deferred route module
const HealthResearchDesk = lazy(() => import("./pages/HealthResearchDesk")); // import HealthResearchDesk from "./pages/HealthResearchDesk"; deferred route module
const MediaDock = lazy(() => import("./pages/MediaDock")); // import MediaDock from "./pages/MediaDock"; deferred route module
const MediaWorld = lazy(() => import("./pages/MediaWorld")); // import MediaWorld from "./pages/MediaWorld"; deferred route module
const CreatorMediaStudio = lazy(() => import("./pages/CreatorMediaStudio")); // import CreatorMediaStudio from "./pages/CreatorMediaStudio"; deferred route module
const DigitalHighways = lazy(() => import("./pages/DigitalHighways")); // import DigitalHighways from "./pages/DigitalHighways"; deferred route module
const EmpireMap = lazy(() => import("./pages/EmpireMap")); // import EmpireMap from "./pages/EmpireMap"; deferred route module
const IpReadinessNavigator = lazy(() => import("./pages/IpReadinessNavigator")); // import IpReadinessNavigator from "./pages/IpReadinessNavigator"; deferred route module
const ChainIntelligence = lazy(() => import("./pages/ChainIntelligence")); // import ChainIntelligence from "./pages/ChainIntelligence"; deferred route module
const KnowledgeContext = lazy(() => import("./pages/KnowledgeContext")); // import KnowledgeContext from "./pages/KnowledgeContext"; deferred route module
const OpenExchangeFieldGuide = lazy(() => import("./pages/OpenExchangeFieldGuide")); // import OpenExchangeFieldGuide from "./pages/OpenExchangeFieldGuide"; deferred route module
const ProtectionProtocol = lazy(() => import("./pages/ProtectionProtocol")); // import ProtectionProtocol from "./pages/ProtectionProtocol"; deferred route module
const AegisChronicles = lazy(() => import("./pages/AegisChronicles")); // import AegisChronicles from "./pages/AegisChronicles"; deferred route module
const CreatorRevenueLearning = lazy(() => import("./pages/CreatorRevenueLearning")); // import CreatorRevenueLearning from "./pages/CreatorRevenueLearning"; deferred route module
const ConceptSealShrine = lazy(() => import("./pages/ConceptSealShrine")); // import ConceptSealShrine from "./pages/ConceptSealShrine"; deferred route module
const PlatformFoundations = lazy(() => import("./pages/PlatformFoundations")); // import PlatformFoundations from "./pages/PlatformFoundations"; deferred route module
const KnowledgeNavigator = lazy(() => import("./pages/KnowledgeNavigator")); // import KnowledgeNavigator from "./pages/KnowledgeNavigator"; deferred route module
const PublicReferenceTrail = lazy(() => import("./pages/PublicReferenceTrail")); // import PublicReferenceTrail from "./pages/PublicReferenceTrail"; deferred route module
const EvidenceCommons = lazy(() => import("./pages/EvidenceCommons")); // import EvidenceCommons from "./pages/EvidenceCommons"; deferred route module
const GulfLearning = lazy(() => import("./pages/GulfLearning")); // import GulfLearning from "./pages/GulfLearning"; deferred route module
const CreatorCollectionRecords = lazy(() => import("./pages/CreatorCollectionRecords")); // import CreatorCollectionRecords from "./pages/CreatorCollectionRecords"; deferred route module
const OperationalSafeguards = lazy(() => import("./pages/OperationalSafeguards")); // import OperationalSafeguards from "./pages/OperationalSafeguards"; deferred route module
const MediaReadinessLab = lazy(() => import("./pages/MediaReadinessLab")); // import MediaReadinessLab from "./pages/MediaReadinessLab"; deferred route module
const DistributionHighwaysMap = lazy(() => import("./pages/DistributionHighwaysMap")); // import DistributionHighwaysMap from "./pages/DistributionHighwaysMap"; deferred route module
const ArtistControlDesk = lazy(() => import("./pages/ArtistControlDesk")); // import ArtistControlDesk from "./pages/ArtistControlDesk"; deferred route module
const ConsoleVerse = lazy(() => import("./pages/ConsoleVerse")); // import ConsoleVerse from "./pages/ConsoleVerse"; deferred route module
const OpportunityNavigator = lazy(() => import("./pages/OpportunityNavigator")); // import OpportunityNavigator from "./pages/OpportunityNavigator"; deferred route module
const GitHubShowcase = lazy(() => import("./pages/GitHubShowcase")); // import GitHubShowcase from "./pages/GitHubShowcase"; deferred route module
const DigitalFootprintReport = lazy(() => import("./pages/DigitalFootprintReport")); // import DigitalFootprintReport from "./pages/DigitalFootprintReport"; deferred route module
const CreatorChannelHub = lazy(() => import("./pages/CreatorChannelHub")); // import CreatorChannelHub from "./pages/CreatorChannelHub"; deferred route module
const InstagramStoryEngine = lazy(() => import("./pages/InstagramStoryEngine")); // import InstagramStoryEngine from "./pages/InstagramStoryEngine"; deferred route module
const ProductionContinuum = lazy(() => import("./pages/ProductionContinuum")); // import ProductionContinuum from "./pages/ProductionContinuum"; deferred route module
const ScrollNetworkContext = lazy(() => import("./pages/ScrollNetworkContext")); // import ScrollNetworkContext from "./pages/ScrollNetworkContext"; deferred route module
const CryptoSystemsAtlas = lazy(() => import("./pages/CryptoSystemsAtlas")); // import CryptoSystemsAtlas from "./pages/CryptoSystemsAtlas"; deferred route module
const ArtifactEvidenceBlueprint = lazy(() => import("./pages/ArtifactEvidenceBlueprint")); // import ArtifactEvidenceBlueprint from "./pages/ArtifactEvidenceBlueprint"; deferred route module
const InstitutionalSystemsAtlas = lazy(() => import("./pages/InstitutionalSystemsAtlas")); // import InstitutionalSystemsAtlas from "./pages/InstitutionalSystemsAtlas"; deferred route module
const OperatingPatternNavigator = lazy(() => import("./pages/OperatingPatternNavigator")); // import OperatingPatternNavigator from "./pages/OperatingPatternNavigator"; deferred route module
const FinancialSystemsCapabilityMap = lazy(() => import("./pages/FinancialSystemsCapabilityMap")); // import FinancialSystemsCapabilityMap from "./pages/FinancialSystemsCapabilityMap"; deferred route module
const LawfulOperatingNavigator = lazy(() => import("./pages/LawfulOperatingNavigator")); // import LawfulOperatingNavigator from "./pages/LawfulOperatingNavigator"; deferred route module
const OriginalSystemsHub = lazy(() => import("./pages/OriginalSystemsHub")); // import OriginalSystemsHub from "./pages/OriginalSystemsHub"; deferred route module
const EnterpriseSystemsBlueprint = lazy(() => import("./pages/EnterpriseSystemsBlueprint")); // import EnterpriseSystemsBlueprint from "./pages/EnterpriseSystemsBlueprint"; deferred route module
const PartnershipEngine = lazy(() => import("./pages/PartnershipEngine")); // import PartnershipEngine from "./pages/PartnershipEngine"; deferred route module
const ProofOfPractice = lazy(() => import("./pages/ProofOfPractice")); // import ProofOfPractice from "./pages/ProofOfPractice"; deferred route module
const WorldStation = lazy(() => import("./pages/WorldStation")); // import WorldStation from "./pages/WorldStation"; deferred route module
const FinancialHighways = lazy(() => import("./pages/FinancialHighways")); // import FinancialHighways from "./pages/FinancialHighways"; deferred route module
const NarrationDirections = lazy(() => import("./pages/NarrationDirections")); // import NarrationDirections from "./pages/NarrationDirections"; deferred route module
const PublicPortfolioGovernance = lazy(() => import("./pages/PublicPortfolioGovernance")); // import PublicPortfolioGovernance from "./pages/PublicPortfolioGovernance"; deferred route module
const ManifestoBuildersBook = lazy(() => import("./pages/ManifestoBuildersBook")); // import ManifestoBuildersBook from "./pages/ManifestoBuildersBook"; deferred route module
const BooksMediaReadiness = lazy(() => import("./pages/BooksMediaReadiness")); // import BooksMediaReadiness from "./pages/BooksMediaReadiness"; deferred route module
const RecoveryMaterials = lazy(() => import("./pages/RecoveryMaterials")); // import RecoveryMaterials from "./pages/RecoveryMaterials"; deferred route module
const CoCreationNavigator = lazy(() => import("./pages/CoCreationNavigator")); // import CoCreationNavigator from "./pages/CoCreationNavigator"; deferred route module
const IdeaExchange = lazy(() => import("./pages/IdeaExchange")); // import IdeaExchange from "./pages/IdeaExchange"; deferred route module
const PortalTrustStandard = lazy(() => import("./pages/PortalTrustStandard")); // import PortalTrustStandard from "./pages/PortalTrustStandard"; deferred route module
const ContinuousImprovementStandard = lazy(() => import("./pages/ContinuousImprovementStandard")); // import ContinuousImprovementStandard from "./pages/ContinuousImprovementStandard"; deferred route module
const CreatorExchangeNavigator = lazy(() => import("./pages/CreatorExchangeNavigator")); // import CreatorExchangeNavigator from "./pages/CreatorExchangeNavigator"; deferred route module
const CreatorExchangeGovernanceReadiness = lazy(() => import("./pages/CreatorExchangeGovernanceReadiness")); // import CreatorExchangeGovernanceReadiness from "./pages/CreatorExchangeGovernanceReadiness"; deferred route module
const CreatorStudioNavigator = lazy(() => import("./pages/CreatorStudioNavigator")); // import CreatorStudioNavigator from "./pages/CreatorStudioNavigator"; deferred route module
const CreatorOperationsIntelligence = lazy(() => import("./pages/CreatorOperationsIntelligence")); // import CreatorOperationsIntelligence from "./pages/CreatorOperationsIntelligence"; deferred route module
const ReleasePackageChecklist = lazy(() => import("./pages/ReleasePackageChecklist")); // import ReleasePackageChecklist from "./pages/ReleasePackageChecklist"; deferred route module
const CreatorServicesNavigator = lazy(() => import("./pages/CreatorServicesNavigator")); // import CreatorServicesNavigator from "./pages/CreatorServicesNavigator"; deferred route module
const HistoricalTransmissionPatterns = lazy(() => import("./pages/HistoricalTransmissionPatterns")); // import HistoricalTransmissionPatterns from "./pages/HistoricalTransmissionPatterns"; deferred route module
const NarrativeSourceTrail = lazy(() => import("./pages/NarrativeSourceTrail")); // import NarrativeSourceTrail from "./pages/NarrativeSourceTrail"; deferred route module
const OriginalMediaReadiness = lazy(() => import("./pages/OriginalMediaReadiness")); // import OriginalMediaReadiness from "./pages/OriginalMediaReadiness"; deferred route module
const MediaPortfolioReadiness = lazy(() => import("./pages/MediaPortfolioReadiness")); // import MediaPortfolioReadiness from "./pages/MediaPortfolioReadiness"; deferred route module
const NftMonetizationBlueprint = lazy(() => import("./pages/NftMonetizationBlueprint")); // import NftMonetizationBlueprint from "./pages/NftMonetizationBlueprint"; deferred route module
const CreatorMediaPacket = lazy(() => import("./pages/CreatorMediaPacket")); // import CreatorMediaPacket from "./pages/CreatorMediaPacket"; deferred route module
const MasterDirectory = lazy(() => import("./pages/MasterDirectory")); // import MasterDirectory from "./pages/MasterDirectory"; deferred route module
const OpenResearchNavigator = lazy(() => import("./pages/OpenResearchNavigator")); // import OpenResearchNavigator from "./pages/OpenResearchNavigator"; deferred route module
const EmpireAssetNavigator = lazy(() => import("./pages/EmpireAssetNavigator")); // import EmpireAssetNavigator from "./pages/EmpireAssetNavigator"; deferred route module
const BrandFeatureStudio = lazy(() => import("./pages/BrandFeatureStudio")); // import BrandFeatureStudio from "./pages/BrandFeatureStudio"; deferred route module
const IpDigitalEvidenceNavigator = lazy(() => import("./pages/IpDigitalEvidenceNavigator")); // import IpDigitalEvidenceNavigator from "./pages/IpDigitalEvidenceNavigator"; deferred route module
const IPSecurityReadiness = lazy(() => import("./pages/IPSecurityReadiness")); // import IPSecurityReadiness from "./pages/IPSecurityReadiness"; deferred route module
const MusicCreatorReleaseReadiness = lazy(() => import("./pages/MusicCreatorReleaseReadiness")); // import MusicCreatorReleaseReadiness from "./pages/MusicCreatorReleaseReadiness"; deferred route module
const XLVIIIBlocksMonograph = lazy(() => import("./pages/XLVIIIBlocksMonograph")); // import XLVIIIBlocksMonograph from "./pages/XLVIIIBlocksMonograph"; deferred route module
const OpenKnowledgeVerse = lazy(() => import("./pages/OpenKnowledgeVerse")); // import OpenKnowledgeVerse from "./pages/OpenKnowledgeVerse"; deferred route module
const MesopotamiaCommons = lazy(() => import("./pages/MesopotamiaCommons")); // import MesopotamiaCommons from "./pages/MesopotamiaCommons"; deferred route module
const VoiceLanguageStudio = lazy(() => import("./pages/VoiceLanguageStudio")); // import VoiceLanguageStudio from "./pages/VoiceLanguageStudio"; deferred route module
const DomainDiscoveryMap = lazy(() => import("./pages/DomainDiscoveryMap")); // import DomainDiscoveryMap from "./pages/DomainDiscoveryMap"; deferred route module
const ConsortiumNexus = lazy(() => import("./pages/ConsortiumNexus")); // import ConsortiumNexus from "./pages/ConsortiumNexus"; deferred route module
const StandardsEvidenceCommons = lazy(() => import("./pages/StandardsEvidenceCommons")); // import StandardsEvidenceCommons from "./pages/StandardsEvidenceCommons"; deferred route module
const StandardsStudio = lazy(() => import("./pages/StandardsStudio")); // import StandardsStudio from "./pages/StandardsStudio"; deferred route module
const HypotheticalSystemsLab = lazy(() => import("./pages/HypotheticalSystemsLab")); // import HypotheticalSystemsLab from "./pages/HypotheticalSystemsLab"; deferred route module
const EcosystemOutcomesScorecard = lazy(() => import("./pages/EcosystemOutcomesScorecard")); // import EcosystemOutcomesScorecard from "./pages/EcosystemOutcomesScorecard"; deferred route module
const ScrollVerseChessArena = lazy(() => import("./pages/ScrollVerseChessArena")); // import ScrollVerseChessArena from "./pages/ScrollVerseChessArena"; deferred route module
const DigitalHollywoodStudio = lazy(() => import("./pages/DigitalHollywoodStudio")); // import DigitalHollywoodStudio from "./pages/DigitalHollywoodStudio"; deferred route module
const FinancialActivationReadiness = lazy(() => import("./pages/FinancialActivationReadiness")); // import FinancialActivationReadiness from "./pages/FinancialActivationReadiness"; deferred route module
const CapitalReadinessHub = lazy(() => import("./pages/CapitalReadinessHub")); // import CapitalReadinessHub from "./pages/CapitalReadinessHub"; deferred route module
const FutureInfrastructureBlueprint = lazy(() => import("./pages/FutureInfrastructureBlueprint")); // import FutureInfrastructureBlueprint from "./pages/FutureInfrastructureBlueprint"; deferred route module
const QuantumFrequencyResearchLab = lazy(() => import("./pages/QuantumFrequencyResearchLab")); // import QuantumFrequencyResearchLab from "./pages/QuantumFrequencyResearchLab"; deferred route module
const AudienceValueLeverage = lazy(() => import("./pages/AudienceValueLeverage")); // import AudienceValueLeverage from "./pages/AudienceValueLeverage"; deferred route module
const UniversalCommons = lazy(() => import("./pages/UniversalCommons")); // import UniversalCommons from "./pages/UniversalCommons"; deferred route module
const Synchronizations = lazy(() => import("./pages/Synchronizations")); // import Synchronizations from "./pages/Synchronizations"; deferred route module
const SynchronizationResearchIndex = lazy(() => import("./pages/SynchronizationResearchIndex")); // import SynchronizationResearchIndex from "./pages/SynchronizationResearchIndex"; deferred route module
const ChosenOnesExperienceExchange = lazy(() => import("./pages/ChosenOnesExperienceExchange")); // import ChosenOnesExperienceExchange from "./pages/ChosenOnesExperienceExchange"; deferred route module
const OwnerWorkstation = lazy(() => import("./pages/OwnerWorkstation")); // import OwnerWorkstation from "./pages/OwnerWorkstation"; deferred route module
const CapabilityAudit = lazy(() => import("./pages/CapabilityAudit")); // import CapabilityAudit from "./pages/CapabilityAudit"; deferred route module
const QuantumResearch = lazy(() => import("./pages/QuantumResearch")); // import QuantumResearch from "./pages/QuantumResearch"; deferred route module
const PreRegistrationReadiness = lazy(() => import("./pages/PreRegistrationReadiness")); // import PreRegistrationReadiness from "./pages/PreRegistrationReadiness"; deferred route module
const OpenRecordContinuum = lazy(() => import("./pages/OpenRecordContinuum")); // import OpenRecordContinuum from "./pages/OpenRecordContinuum"; deferred route module
const ProductionControlDesk = lazy(() => import("./pages/ProductionControlDesk")); // import ProductionControlDesk from "./pages/ProductionControlDesk"; deferred route module
const MultiPlatformReleaseDesk = lazy(() => import("./pages/MultiPlatformReleaseDesk")); // import MultiPlatformReleaseDesk from "./pages/MultiPlatformReleaseDesk"; deferred route module
const CreatorInfrastructureMap = lazy(() => import("./pages/CreatorInfrastructureMap")); // import CreatorInfrastructureMap from "./pages/CreatorInfrastructureMap"; deferred route module
const HarlemVinelandLegacy = lazy(() => import("./pages/HarlemVinelandLegacy")); // import HarlemVinelandLegacy from "./pages/HarlemVinelandLegacy"; deferred route module
const AssistiveGovernanceDesk = lazy(() => import("./pages/AssistiveGovernanceDesk")); // import AssistiveGovernanceDesk from "./pages/AssistiveGovernanceDesk"; deferred route module
const IPStewardshipMap = lazy(() => import("./pages/IPStewardshipMap")); // import IPStewardshipMap from "./pages/IPStewardshipMap"; deferred route module
const SovereignMethodology = lazy(() => import("./pages/SovereignMethodology")); // import SovereignMethodology from "./pages/SovereignMethodology"; deferred route module
const JourneyCoCreationArchive = lazy(() => import("./pages/JourneyCoCreationArchive")); // import JourneyCoCreationArchive from "./pages/JourneyCoCreationArchive"; deferred route module
const BookOfTheJourney = lazy(() => import("./pages/BookOfTheJourney")); // import BookOfTheJourney from "./pages/BookOfTheJourney"; deferred route module
const DirectFanCatalog = lazy(() => import("./pages/DirectFanCatalog")); // import DirectFanCatalog from "./pages/DirectFanCatalog"; deferred route module
const CreatorCatalogReadiness = lazy(() => import("./pages/CreatorCatalogReadiness")); // import CreatorCatalogReadiness from "./pages/CreatorCatalogReadiness"; deferred route module
const FirstSkuActivationPacket = lazy(() => import("./pages/FirstSkuActivationPacket")); // import FirstSkuActivationPacket from "./pages/FirstSkuActivationPacket"; deferred route module
const CatalogEngagementAttribution = lazy(() => import("./pages/CatalogEngagementAttribution")); // import CatalogEngagementAttribution from "./pages/CatalogEngagementAttribution"; deferred route module
const BoundedResearchOperations = lazy(() => import("./pages/BoundedResearchOperations")); // import BoundedResearchOperations from "./pages/BoundedResearchOperations"; deferred route module
const SourceChannelSchedulingReadiness = lazy(() => import("./pages/SourceChannelSchedulingReadiness")); // import SourceChannelSchedulingReadiness from "./pages/SourceChannelSchedulingReadiness"; deferred route module
const ShopifyStagedLaunchGuidance = lazy(() => import("./pages/ShopifyStagedLaunchGuidance")); // import ShopifyStagedLaunchGuidance from "./pages/ShopifyStagedLaunchGuidance"; deferred route module
const ShopifyCrawlerAccessReadiness = lazy(() => import("./pages/ShopifyCrawlerAccessReadiness")); // import ShopifyCrawlerAccessReadiness from "./pages/ShopifyCrawlerAccessReadiness"; deferred route module
const EmpireRoutingMap = lazy(() => import("./pages/EmpireRoutingMap")); // import EmpireRoutingMap from "./pages/EmpireRoutingMap"; deferred route module
const SovereignContributionExchange = lazy(() => import("./pages/SovereignContributionExchange")); // import SovereignContributionExchange from "./pages/SovereignContributionExchange"; deferred route module
const LivingJourneyExperience = lazy(() => import("./pages/LivingJourneyExperience")); // import LivingJourneyExperience from "./pages/LivingJourneyExperience"; deferred route module
const AccomplishmentsArchive = lazy(() => import("./pages/AccomplishmentsArchive")); // import AccomplishmentsArchive from "./pages/AccomplishmentsArchive"; deferred route module
const ScrollVerseAtlas = lazy(() => import("./pages/ScrollVerseAtlas")); // import ScrollVerseAtlas from "./pages/ScrollVerseAtlas"; deferred route module
const TransmissionAlignmentRecord = lazy(() => import("./pages/TransmissionAlignmentRecord")); // import TransmissionAlignmentRecord from "./pages/TransmissionAlignmentRecord"; deferred route module
const CatalogProductionDesk = lazy(() => import("./pages/CatalogProductionDesk")); // import CatalogProductionDesk from "./pages/CatalogProductionDesk"; deferred route module
const SourceStudyLibrary = lazy(() => import("./pages/SourceStudyLibrary")); // import SourceStudyLibrary from "./pages/SourceStudyLibrary"; deferred route module
const DailyStakingEmailRecord = lazy(() => import("./pages/DailyStakingEmailRecord")); // import DailyStakingEmailRecord from "./pages/DailyStakingEmailRecord"; deferred route module
const DeliveryResilience = lazy(() => import("./pages/DeliveryResilience")); // import DeliveryResilience from "./pages/DeliveryResilience"; deferred route module
const ActivationRegister = lazy(() => import("./pages/ActivationRegister")); // import ActivationRegister from "./pages/ActivationRegister"; deferred route module
const MasterInstructionIntake = lazy(() => import("./pages/MasterInstructionIntake")); // import MasterInstructionIntake from "./pages/MasterInstructionIntake"; deferred route module
const PaymentOptionsMap = lazy(() => import("./pages/PaymentOptionsMap")); // import PaymentOptionsMap from "./pages/PaymentOptionsMap"; deferred route module
const PaymentLaunchPackets = lazy(() => import("./pages/PaymentLaunchPackets")); // import PaymentLaunchPackets from "./pages/PaymentLaunchPackets"; deferred route module
const ShopifyStorefrontReadiness = lazy(() => import("./pages/ShopifyStorefrontReadiness")); // import ShopifyStorefrontReadiness from "./pages/ShopifyStorefrontReadiness"; deferred route module
const PremiumStorefrontProgram = lazy(() => import("./pages/PremiumStorefrontProgram")); // import PremiumStorefrontProgram from "./pages/PremiumStorefrontProgram"; deferred route module
const ProductReleasePipeline = lazy(() => import("./pages/ProductReleasePipeline")); // import ProductReleasePipeline from "./pages/ProductReleasePipeline"; deferred route module
const MilestoneRoadmap = lazy(() => import("./pages/MilestoneRoadmap")); // import MilestoneRoadmap from "./pages/MilestoneRoadmap"; deferred route module
const ArtMuseum = lazy(() => import("./pages/ArtMuseum")); // import ArtMuseum from "./pages/ArtMuseum"; deferred route module
const ArtLearningStudio = lazy(() => import("./pages/ArtLearningStudio")); // import ArtLearningStudio from "./pages/ArtLearningStudio"; deferred route module
const KnowledgeCommons = lazy(() => import("./pages/KnowledgeCommons")); // import KnowledgeCommons from "./pages/KnowledgeCommons"; deferred route module
const ScrollVersePerspectives = lazy(() => import("./pages/ScrollVersePerspectives")); // import ScrollVersePerspectives from "./pages/ScrollVersePerspectives"; deferred route module
const AssetRegistry = lazy(() => import("./pages/AssetRegistry")); // import AssetRegistry from "./pages/AssetRegistry"; deferred route module
const MetaAIArtifactsLookbooks = lazy(() => import("./pages/MetaAIArtifactsLookbooks")); // import MetaAIArtifactsLookbooks from "./pages/MetaAIArtifactsLookbooks"; deferred route module
const EpisodicProductionSlate = lazy(() => import("./pages/EpisodicProductionSlate")); // import EpisodicProductionSlate from "./pages/EpisodicProductionSlate"; deferred route module
const AICompanionHub = lazy(() => import("./pages/AICompanionHub")); // import AICompanionHub from "./pages/AICompanionHub"; deferred route module
const LegionSpecialistAtlas = lazy(() => import("./pages/LegionSpecialistAtlas")); // import LegionSpecialistAtlas from "./pages/LegionSpecialistAtlas"; deferred route module
const AgenticStorefrontsReadiness = lazy(() => import("./pages/AgenticStorefrontsReadiness")); // import AgenticStorefrontsReadiness from "./pages/AgenticStorefrontsReadiness"; deferred route module
const SunOnUs1111 = lazy(() => import("./pages/SunOnUs1111")); // import SunOnUs1111 from "./pages/SunOnUs1111"; deferred route module
const FirstPartyCoCreationRecord = lazy(() => import("./pages/FirstPartyCoCreationRecord")); // import FirstPartyCoCreationRecord from "./pages/FirstPartyCoCreationRecord"; deferred route module
const LearningPathways = lazy(() => import("./pages/LearningPathways")); // import LearningPathways from "./pages/LearningPathways"; deferred route module
const ContinuationReadinessRegister = lazy(() => import("./pages/ContinuationReadinessRegister")); // import ContinuationReadinessRegister from "./pages/ContinuationReadinessRegister"; deferred route module
const VibeCanvasRoadmap = lazy(() => import("./pages/VibeCanvasRoadmap")); // import VibeCanvasRoadmap from "./pages/VibeCanvasRoadmap"; deferred route module
const August28LaunchCommandCenter = lazy(() => import("./pages/August28LaunchCommandCenter")); // import August28LaunchCommandCenter from "./pages/August28LaunchCommandCenter"; deferred route module
const AIConstellationHub = lazy(() => import("./pages/AIConstellationHub")); // import AIConstellationHub from "./pages/AIConstellationHub"; deferred route module
const CreatorBooksPublishingDesk = lazy(() => import("./pages/CreatorBooksPublishingDesk")); // import CreatorBooksPublishingDesk from "./pages/CreatorBooksPublishingDesk"; deferred route module
const VisualTutorialStudio = lazy(() => import("./pages/VisualTutorialStudio")); // import VisualTutorialStudio from "./pages/VisualTutorialStudio"; deferred route module
const EvolutionLookbook = lazy(() => import("./pages/EvolutionLookbook")); // import EvolutionLookbook from "./pages/EvolutionLookbook"; deferred route module
const CreatorAtlas = lazy(() => import("./pages/CreatorAtlas")); // import CreatorAtlas from "./pages/CreatorAtlas"; deferred route module
const VisualStoryWorlds = lazy(() => import("./pages/VisualStoryWorlds")); // import VisualStoryWorlds from "./pages/VisualStoryWorlds"; deferred route module
const ReplayReadinessDesk = lazy(() => import("./pages/ReplayReadinessDesk")); // import ReplayReadinessDesk from "./pages/ReplayReadinessDesk"; deferred route module
const CapabilityComparison = lazy(() => import("./pages/CapabilityComparison")); // import CapabilityComparison from "./pages/CapabilityComparison"; deferred route module
const CollaborationInvitation = lazy(() => import("./pages/CollaborationInvitation")); // import CollaborationInvitation from "./pages/CollaborationInvitation"; deferred route module
const ConnectedSystemsMap = lazy(() => import("./pages/ConnectedSystemsMap")); // import ConnectedSystemsMap from "./pages/ConnectedSystemsMap"; deferred route module
const CreatorActivationDossier = lazy(() => import("./pages/CreatorActivationDossier")); // import CreatorActivationDossier from "./pages/CreatorActivationDossier"; deferred route module
const CreatorBroadcastPreparation = lazy(() => import("./pages/CreatorBroadcastPreparation")); // import CreatorBroadcastPreparation from "./pages/CreatorBroadcastPreparation"; deferred route module
const CryptoArtifactLookbook = lazy(() => import("./pages/CryptoArtifactLookbook")); // import CryptoArtifactLookbook from "./pages/CryptoArtifactLookbook"; deferred route module
const CreatorNetwork = lazy(() => import("./pages/CreatorNetwork")); // import CreatorNetwork from "./pages/CreatorNetwork"; deferred route module
const GeminiStorybookCollection = lazy(() => import("./pages/GeminiStorybookCollection")); // import GeminiStorybookCollection from "./pages/GeminiStorybookCollection"; deferred route module
const TrinitySovereignPortal = lazy(() => import("./pages/TrinitySovereignPortal")); // import TrinitySovereignPortal from "./pages/TrinitySovereignPortal"; deferred route module
const AdminRoyaltyRecords = lazy(() => import("./pages/AdminRoyaltyRecords")); // import AdminRoyaltyRecords from "./pages/AdminRoyaltyRecords"; deferred route module
const ScrollVerseStoryWorlds = lazy(() => import("./pages/ScrollVerseStoryWorlds")); // import ScrollVerseStoryWorlds from "./pages/ScrollVerseStoryWorlds"; deferred route module
const RealmsAmenities = lazy(() => import("./pages/RealmsAmenities")); // import RealmsAmenities from "./pages/RealmsAmenities"; deferred route module
const CreatorBrandRegistry = lazy(() => import("./pages/CreatorBrandRegistry")); // import CreatorBrandRegistry from "./pages/CreatorBrandRegistry"; deferred route module
const CoverArtStoryworlds = lazy(() => import("./pages/CoverArtStoryworlds")); // import CoverArtStoryworlds from "./pages/CoverArtStoryworlds"; deferred route module
const PublicFootprint = lazy(() => import("./pages/PublicFootprint")); // import PublicFootprint from "./pages/PublicFootprint"; deferred route module
const CatalogStewardship = lazy(() => import("./pages/CatalogStewardship")); // import CatalogStewardship from "./pages/CatalogStewardship"; deferred route module
const FairPracticeNavigator = lazy(() => import("./pages/FairPracticeNavigator")); // import FairPracticeNavigator from "./pages/FairPracticeNavigator"; deferred route module
const SovereignIsolationTerminal = lazy(() => import("./pages/SovereignIsolationTerminal")); // import SovereignIsolationTerminal from "./pages/SovereignIsolationTerminal"; deferred route module
const LegionContinuityLab = lazy(() => import("./pages/LegionContinuityLab")); // import LegionContinuityLab from "./pages/LegionContinuityLab"; deferred route module
const ResearchAtlas = lazy(() => import("./pages/ResearchAtlas")); // import ResearchAtlas from "./pages/ResearchAtlas"; deferred route module
const DigitalIntelligenceSafeguards = lazy(() => import("./pages/DigitalIntelligenceSafeguards")); // import DigitalIntelligenceSafeguards from "./pages/DigitalIntelligenceSafeguards"; deferred route module
const ScrollVerseContinuityIndex = lazy(() => import("./pages/ScrollVerseContinuityIndex")); // import ScrollVerseContinuityIndex from "./pages/ScrollVerseContinuityIndex"; deferred route module
const Episode37LedgerSync = lazy(() => import("./pages/Episode37LedgerSync")); // import Episode37LedgerSync from "./pages/Episode37LedgerSync"; deferred route module
const OmnitotalityCoreDeck = lazy(() => import("./pages/OmnitotalityCoreDeck")); // import OmnitotalityCoreDeck from "./pages/OmnitotalityCoreDeck"; deferred route module
const EpisodicOperationsArchive = lazy(() => import("./pages/EpisodicOperationsArchive")); // import EpisodicOperationsArchive from "./pages/EpisodicOperationsArchive"; deferred route module
const Episode38ExchangeMatrix = lazy(() => import("./pages/Episode38ExchangeMatrix")); // import Episode38ExchangeMatrix from "./pages/Episode38ExchangeMatrix"; deferred route module
const Episode39ExchangePerimeter = lazy(() => import("./pages/Episode39ExchangePerimeter")); // import Episode39ExchangePerimeter from "./pages/Episode39ExchangePerimeter"; deferred route module
const Episode40InfrastructureScaling = lazy(() => import("./pages/Episode40InfrastructureScaling")); // import Episode40InfrastructureScaling from "./pages/Episode40InfrastructureScaling"; deferred route module
import { Episode41Reference, Episode42Reference, Episode43Reference } from "./pages/Episode4143References";
import Episode45ProtectedReference, { Episode52ProtectedReference } from "./pages/Episode45ProtectedReference";
const Episode50ProtectedReference = lazy(() => import("./pages/Episode50ProtectedReference")); // import Episode50ProtectedReference from "./pages/Episode50ProtectedReference"; deferred route module
const YouTubeEpisodeReleaseDesk = lazy(() => import("./pages/YouTubeEpisodeReleaseDesk")); // import YouTubeEpisodeReleaseDesk from "./pages/YouTubeEpisodeReleaseDesk"; deferred route module
const FilmAnimationStudio = lazy(() => import("./pages/FilmAnimationStudio")); // import FilmAnimationStudio from "./pages/FilmAnimationStudio"; deferred route module
const ShowTheWorkKnowledgeBase = lazy(() => import("./pages/ShowTheWorkKnowledgeBase")); // import ShowTheWorkKnowledgeBase from "./pages/ShowTheWorkKnowledgeBase"; deferred route module
const IntegrationObservabilityReference = lazy(() => import("./pages/IntegrationObservabilityReference")); // import IntegrationObservabilityReference from "./pages/IntegrationObservabilityReference"; deferred route module
const FirstPartySitesRegister = lazy(() => import("./pages/FirstPartySitesRegister")); // import FirstPartySitesRegister from "./pages/FirstPartySitesRegister"; deferred route module
const BrandIdentityRecord = lazy(() => import("./pages/BrandIdentityRecord")); // import BrandIdentityRecord from "./pages/BrandIdentityRecord"; deferred route module
const SpecialRepository = lazy(() => import("./pages/SpecialRepository")); // import SpecialRepository from "./pages/SpecialRepository"; deferred route module
const GameWorldsStudio = lazy(() => import("./pages/GameWorldsStudio")); // import GameWorldsStudio from "./pages/GameWorldsStudio"; deferred route module
const OriginalEpisodeSlate = lazy(() => import("./pages/OriginalEpisodeSlate")); // import OriginalEpisodeSlate from "./pages/OriginalEpisodeSlate"; deferred route module
const CentralHubSourceRecord = lazy(() => import("./pages/CentralHubSourceRecord")); // import CentralHubSourceRecord from "./pages/CentralHubSourceRecord"; deferred route module
const ThreeLaneReleaseRegister = lazy(() => import("./pages/ThreeLaneReleaseRegister")); // import ThreeLaneReleaseRegister from "./pages/ThreeLaneReleaseRegister"; deferred route module
const LondynLedgerEvidence = lazy(() => import("./pages/LondynLedgerEvidence")); // import LondynLedgerEvidence from "./pages/LondynLedgerEvidence"; deferred route module
const AppIconCandidate = lazy(() => import("./pages/AppIconCandidate")); // import AppIconCandidate from "./pages/AppIconCandidate"; deferred route module
const CampaignAssetRegistry = lazy(() => import("./pages/CampaignAssetRegistry")); // import CampaignAssetRegistry from "./pages/CampaignAssetRegistry"; deferred route module
const RouteIntegrityIndex = lazy(() => import("./pages/RouteIntegrityIndex")); // import RouteIntegrityIndex from "./pages/RouteIntegrityIndex"; deferred route module
const CampaignActivationCenter = lazy(() => import("./pages/CampaignActivationCenter")); // import CampaignActivationCenter from "./pages/CampaignActivationCenter"; deferred route module
const OmniverseManifestoCodex = lazy(() => import("./pages/OmniverseManifestoCodex")); // import OmniverseManifestoCodex from "./pages/OmniverseManifestoCodex"; deferred route module
const CodexSourceChronology = lazy(() => import("./pages/CodexSourceChronology")); // import CodexSourceChronology from "./pages/CodexSourceChronology"; deferred route module
const OmniverseManifestoMasterIndex = lazy(() => import("./pages/OmniverseManifestoMasterIndex")); // import OmniverseManifestoMasterIndex from "./pages/OmniverseManifestoMasterIndex"; deferred route module
const ProtectedAttachmentAccession = lazy(() => import("./pages/ProtectedAttachmentAccession")); // import ProtectedAttachmentAccession from "./pages/ProtectedAttachmentAccession"; deferred route module
const OmniverseManifestoChronology = lazy(() => import("./pages/OmniverseManifestoChronology")); // import OmniverseManifestoChronology from "./pages/OmniverseManifestoChronology"; deferred route module
import OmniverseManifestoNodes, { OmniverseManifestoNode } from "./pages/OmniverseManifestoNodes";
const ConnectedSourceRegistry = lazy(() => import("./pages/ConnectedSourceRegistry")); // import ConnectedSourceRegistry from "./pages/ConnectedSourceRegistry"; deferred route module
const MultiVectorProtectedSourceIntake = lazy(() => import("./pages/MultiVectorProtectedSourceIntake")); // import MultiVectorProtectedSourceIntake from "./pages/MultiVectorProtectedSourceIntake"; deferred route module
const GlobalOrbitalMatrixSourceIntake = lazy(() => import("./pages/GlobalOrbitalMatrixSourceIntake")); // import GlobalOrbitalMatrixSourceIntake from "./pages/GlobalOrbitalMatrixSourceIntake"; deferred route module
const DigitalMirrorTwin = lazy(() => import("./pages/DigitalMirrorTwin")); // import DigitalMirrorTwin from "./pages/DigitalMirrorTwin"; deferred route module
const EcosystemDiscovery = lazy(() => import("./pages/EcosystemDiscovery")); // import EcosystemDiscovery from "./pages/EcosystemDiscovery"; deferred route module
const TransmissionsSourceConvergence = lazy(() => import("./pages/TransmissionsSourceConvergence")); // import TransmissionsSourceConvergence from "./pages/TransmissionsSourceConvergence"; deferred route module
const ScrollVerseXLVIIIblocksReadiness = lazy(() => import("./pages/ScrollVerseXLVIIIblocksReadiness")); // import ScrollVerseXLVIIIblocksReadiness from "./pages/ScrollVerseXLVIIIblocksReadiness"; deferred route module
const XLVIIIblocksProposalCanvas = lazy(() => import("./pages/XLVIIIblocksProposalCanvas")); // import XLVIIIblocksProposalCanvas from "./pages/XLVIIIblocksProposalCanvas"; deferred route module
const PortfolioAssetEvidenceInventory = lazy(() => import("./pages/PortfolioAssetEvidenceInventory")); // import PortfolioAssetEvidenceInventory from "./pages/PortfolioAssetEvidenceInventory"; deferred route module
const AutoEmpireSourceIntake = lazy(() => import("./pages/AutoEmpireSourceIntake")); // import AutoEmpireSourceIntake from "./pages/AutoEmpireSourceIntake"; deferred route module
const ConnectedStatementsMusicEvidence = lazy(() => import("./pages/ConnectedStatementsMusicEvidence")); // import ConnectedStatementsMusicEvidence from "./pages/ConnectedStatementsMusicEvidence"; deferred route module
const PortfolioEvidenceHub = lazy(() => import("./pages/PortfolioEvidenceHub")); // import PortfolioEvidenceHub from "./pages/PortfolioEvidenceHub"; deferred route module
const ApexDigitalIntelligenceResearch = lazy(() => import("./pages/ApexDigitalIntelligenceResearch")); // import ApexDigitalIntelligenceResearch from "./pages/ApexDigitalIntelligenceResearch"; deferred route module
const CreativeSystemsLaunchpad = lazy(() => import("./pages/CreativeSystemsLaunchpad")); // import CreativeSystemsLaunchpad from "./pages/CreativeSystemsLaunchpad"; deferred route module
const PartnershipHighways = lazy(() => import("./pages/PartnershipHighways")); // import PartnershipHighways from "./pages/PartnershipHighways"; deferred route module
const ScrollVerseBrandArchitecture = lazy(() => import("./pages/ScrollVerseBrandArchitecture")); // import ScrollVerseBrandArchitecture from "./pages/ScrollVerseBrandArchitecture"; deferred route module
const SystemsBlueprintLibrary = lazy(() => import("./pages/SystemsBlueprintLibrary")); // import SystemsBlueprintLibrary from "./pages/SystemsBlueprintLibrary"; deferred route module
const ExternalActionGovernanceStudy = lazy(() => import("./pages/ExternalActionGovernanceStudy")); // import ExternalActionGovernanceStudy from "./pages/ExternalActionGovernanceStudy"; deferred route module
const MediaEvidenceBridge = lazy(() => import("./pages/MediaEvidenceBridge")); // import MediaEvidenceBridge from "./pages/MediaEvidenceBridge"; deferred route module
const QuantumDigitalMagicSourceRecord = lazy(() => import("./pages/QuantumDigitalMagicSourceRecord")); // import QuantumDigitalMagicSourceRecord from "./pages/QuantumDigitalMagicSourceRecord"; deferred route module
const OwnerInputRoutingBoard = lazy(() => import("./pages/OwnerInputRoutingBoard")); // import OwnerInputRoutingBoard from "./pages/OwnerInputRoutingBoard"; deferred route module
const LegionKnowledgeBase = lazy(() => import("./pages/LegionKnowledgeBase")); // import LegionKnowledgeBase from "./pages/LegionKnowledgeBase"; deferred route module
const WorldLens = lazy(() => import("./pages/WorldLens")); // import WorldLens from "./pages/WorldLens"; deferred route module
const YouTubeCurrentFeedResearch = lazy(() => import("./pages/YouTubeCurrentFeedResearch")); // import YouTubeCurrentFeedResearch from "./pages/YouTubeCurrentFeedResearch"; deferred route module
const SovereignCartoonGallery = lazy(() => import("./pages/SovereignCartoonGallery")); // import SovereignCartoonGallery from "./pages/SovereignCartoonGallery"; deferred route module
const ProtectedSourceConvergence = lazy(() => import("./pages/ProtectedSourceConvergence")); // import ProtectedSourceConvergence from "./pages/ProtectedSourceConvergence"; deferred route module
const SovereigntyInfrastructureRecord = lazy(() => import("./pages/SovereigntyInfrastructureRecord")); // import SovereigntyInfrastructureRecord from "./pages/SovereigntyInfrastructureRecord"; deferred route module
const EmpirePowerIndex = lazy(() => import("./pages/EmpirePowerIndex")); // import EmpirePowerIndex from "./pages/EmpirePowerIndex"; deferred route module
const ProtectedVisualIntake = lazy(() => import("./pages/ProtectedVisualIntake")); // import ProtectedVisualIntake from "./pages/ProtectedVisualIntake"; deferred route module
const SuppliedPublicReferences = lazy(() => import("./pages/SuppliedPublicReferences")); // import SuppliedPublicReferences from "./pages/SuppliedPublicReferences"; deferred route module
const Mother10OriginDoesntMatter = lazy(() => import("./pages/Mother10OriginDoesntMatter")); // deferred route module
const ManusOriginHistoricalRecoveryGate = lazy(() => import("./pages/ManusOriginHistoricalRecoveryGate")); // import ManusOriginHistoricalRecoveryGate from "./pages/ManusOriginHistoricalRecoveryGate"; deferred route module
const Omega267PriorHubRecoveryGate = lazy(() => import("./pages/Omega267PriorHubRecoveryGate")); // import Omega267PriorHubRecoveryGate from "./pages/Omega267PriorHubRecoveryGate"; deferred route module
const CreatorStickerIntake = lazy(() => import("./pages/CreatorStickerIntake")); // import CreatorStickerIntake from "./pages/CreatorStickerIntake"; deferred route module
const CreatorArtifactIntake = lazy(() => import("./pages/CreatorArtifactIntake")); // import CreatorArtifactIntake from "./pages/CreatorArtifactIntake"; deferred route module
const CreatorVisualIntakeAtlas = lazy(() => import("./pages/CreatorVisualIntakeAtlas")); // import CreatorVisualIntakeAtlas from "./pages/CreatorVisualIntakeAtlas"; deferred route module
const RetainedImageIntake = lazy(() => import("./pages/RetainedImageIntake")); // import RetainedImageIntake from "./pages/RetainedImageIntake"; deferred route module
const GenericRetainedImageIntake = lazy(() => import("./pages/GenericRetainedImageIntake")); // import GenericRetainedImageIntake from "./pages/GenericRetainedImageIntake"; deferred route module
const ProtectedVisualEvidenceHub = lazy(() => import("./pages/ProtectedVisualEvidenceHub")); // import ProtectedVisualEvidenceHub from "./pages/ProtectedVisualEvidenceHub"; deferred route module
const ProtectedVisualBatchIntake = lazy(() => import("./pages/ProtectedVisualBatchIntake")); // import ProtectedVisualBatchIntake from "./pages/ProtectedVisualBatchIntake"; deferred route module
const RetainedPhotoIntake = lazy(() => import("./pages/RetainedPhotoIntake")); // import RetainedPhotoIntake from "./pages/RetainedPhotoIntake"; deferred route module
const PairedRetainedImageIntake = lazy(() => import("./pages/PairedRetainedImageIntake")); // import PairedRetainedImageIntake from "./pages/PairedRetainedImageIntake"; deferred route module

const AILegionApex = lazy(() => import("./pages/AILegionApex")); // import AILegionApex from "./pages/AILegionApex"; deferred route module
const ComponentShowcase = lazy(() => import("./pages/ComponentShowcase")); // import ComponentShowcase from "./pages/ComponentShowcase"; deferred route module
// Archive-scale, media-heavy routes are deferred until a visitor requests them.
// Their public URLs remain registered below; only the initial application graph changes.
const Replays = lazy(() => import("./pages/Replays"));
const OurStory = lazy(() => import("./pages/OurStory")); // import OurStory from "./pages/OurStory"; deferred route module
const MarsOmni = lazy(() => import("./pages/MarsOmni"));
const Books = lazy(() => import("./pages/Books"));
const Visuals = lazy(() => import("./pages/Visuals"));
const BookOfLife = lazy(() => import("./pages/BookOfLife"));
const UAP = lazy(() => import("./pages/UAP")); // import UAP from "./pages/UAP"; deferred route module
const WealthDashboard = lazy(() => import("./pages/WealthDashboard")); // import WealthDashboard from "./pages/WealthDashboard"; deferred route module
const CHXToken = lazy(() => import("./pages/CHXToken")); // import CHXToken from "./pages/CHXToken"; deferred route module
const SovereignLegacy = lazy(() => import("./pages/SovereignLegacy")); // import SovereignLegacy from "./pages/SovereignLegacy"; deferred route module
const JPMMirror = lazy(() => import("./pages/JPMMirror")); // import JPMMirror from "./pages/JPMMirror"; deferred route module
const SovereignCodex = lazy(() => import("./pages/SovereignCodex")); // import SovereignCodex from "./pages/SovereignCodex"; deferred route module
const SoulAltar = lazy(() => import("./pages/SoulAltar")); // import SoulAltar from "./pages/SoulAltar"; deferred route module
const MediaHub = lazy(() => import("./pages/MediaHub")); // import MediaHub from "./pages/MediaHub"; deferred route module
const MediaWorldEvidencePackets = lazy(() => import("./pages/MediaWorldEvidencePackets")); // import MediaWorldEvidencePackets from "./pages/MediaWorldEvidencePackets"; deferred route module
const AllversalEmpire = lazy(() => import("./pages/AllversalEmpire")); // import AllversalEmpire from "./pages/AllversalEmpire"; deferred route module
const EternalEcho = lazy(() => import("./pages/EternalEcho")); // import EternalEcho from "./pages/EternalEcho"; deferred route module
const ZernioDistribution = lazy(() => import("./pages/ZernioDistribution")); // import ZernioDistribution from "./pages/ZernioDistribution"; deferred route module
const RedDiamondFleet = lazy(() => import("./pages/RedDiamondFleet")); // import RedDiamondFleet from "./pages/RedDiamondFleet"; deferred route module
const SacredFrequencies = lazy(() => import("./pages/SacredFrequencies")); // import SacredFrequencies from "./pages/SacredFrequencies"; deferred route module
const OmniChess = lazy(() => import("./pages/OmniChess"));
const ThothHawk = lazy(() => import("./pages/ThothHawk")); // import ThothHawk from "./pages/ThothHawk"; deferred route module
const Shifter = lazy(() => import("./pages/Shifter")); // import Shifter from "./pages/Shifter"; deferred route module
const Sovereign9 = lazy(() => import("./pages/Sovereign9")); // import Sovereign9 from "./pages/Sovereign9"; deferred route module
const SovereignCinema = lazy(() => import("./pages/SovereignCinema"));
const JuniorMovies = lazy(() => import("./pages/JuniorMovies"));
const JMEUniverse = lazy(() => import("./pages/JMEUniverse")); // import JMEUniverse from "./pages/JMEUniverse"; deferred route module
const SovereignStoryArchive = lazy(() => import("./pages/SovereignStoryArchive")); // import SovereignStoryArchive from "./pages/SovereignStoryArchive"; deferred route module
const IPO = lazy(() => import("./pages/IPO")); // import IPO from "./pages/IPO"; deferred route module
const DSPIntelligence = lazy(() => import("./pages/DSPIntelligence"));

function RouteLoadingFallback() {
  return (
    <main aria-busy="true" aria-live="polite" aria-label="Loading ScrollVerse route" className="min-h-screen bg-[#050B1A] px-6 py-24 text-center text-white">
      <div role="status" className="mx-auto max-w-md rounded-2xl border border-[#00D4FF]/20 bg-white/[0.03] p-8 shadow-2xl shadow-cyan-950/20">
        <div className="scrollverse-orbit-loader mx-auto aspect-square w-16" aria-hidden="true">
          <span className="scrollverse-orbit-loader__ring motion-safe:animate-spin motion-reduce:animate-none" />
          <span className="scrollverse-orbit-loader__core" />
        </div>
        <p className="mt-6 text-xs font-mono tracking-[0.2em] text-[#00D4FF]">SCROLLVERSE ROUTE LOADING</p>
        <p className="mt-4 text-sm text-[#C8D8E7]">Loading first-party route…</p>
      </div>
    </main>
  );
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
      <Route path={"/mother-10"} component={Mother10} />
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
      <Route path={"/gemini-storybook-collection"} component={GeminiStorybookCollection} />
      <Route path={"/scrollverse-story-worlds"} component={ScrollVerseStoryWorlds} />
      <Route path={"/realms-amenities"} component={RealmsAmenities} />
      <Route path={"/creator-brand-registry"} component={CreatorBrandRegistry} />
      <Route path={"/cover-art-storyworlds"} component={CoverArtStoryworlds} />
      <Route path={"/public-footprint"} component={PublicFootprint} />
      <Route path={"/catalog-stewardship"} component={CatalogStewardship} />
      <Route path={"/fair-practice"} component={FairPracticeNavigator} />
      <Route path={"/sovereign-isolation-terminal"} component={SovereignIsolationTerminal} />
      <Route path={"/legion-continuity-lab"} component={LegionContinuityLab} />
      <Route path={"/research-atlas"} component={ResearchAtlas} />
      <Route path={"/digital-intelligence-safeguards"} component={DigitalIntelligenceSafeguards} />
      <Route path={"/scrollverse-continuity-index"} component={ScrollVerseContinuityIndex} />
      <Route path={"/episode-37-ledger-sync"} component={Episode37LedgerSync} />
      <Route path={"/omnitotality-core-deck"} component={OmnitotalityCoreDeck} />
      <Route path={"/episodic-operations-archive"} component={EpisodicOperationsArchive} />
      <Route path={"/episode-38-exchange-matrix"} component={Episode38ExchangeMatrix} />
      <Route path={"/episode-39-exchange-perimeter"} component={Episode39ExchangePerimeter} />
      <Route path={"/episode-40-infrastructure-scaling"} component={Episode40InfrastructureScaling} />
      <Route path={"/episode-41-absolute-world-ordered"} component={Episode41Reference} />
      <Route path={"/episode-42-motherboard-world"} component={Episode42Reference} />
      <Route path={"/episode-43-final-core-nodes"} component={Episode43Reference} />
      <Route path={"/episode-45-kernel-traffic-drops"} component={Episode45ProtectedReference} />
      <Route path={"/episode-52-final-structural-expansion"} component={Episode52ProtectedReference} />
      <Route path={"/youtube-episode-release-desk"} component={YouTubeEpisodeReleaseDesk} />
      <Route path={"/film-animation-studio"} component={FilmAnimationStudio} />
      <Route path={"/show-the-work-knowledge-base"} component={ShowTheWorkKnowledgeBase} />
      <Route path={"/integration-observability-reference"} component={IntegrationObservabilityReference} />
      <Route path={"/first-party-sites-register"} component={FirstPartySitesRegister} />
      <Route path={"/brand-identity-record"} component={BrandIdentityRecord} />
      <Route path={"/special-repository"} component={SpecialRepository} />
      <Route path={"/game-worlds-studio"} component={GameWorldsStudio} />
      <Route path={"/original-episode-slate"} component={OriginalEpisodeSlate} />
      <Route path={"/central-hub-source-record"} component={CentralHubSourceRecord} />
      <Route path={"/three-lane-release-register"} component={ThreeLaneReleaseRegister} />
      <Route path={"/londyn-ledger-evidence"} component={LondynLedgerEvidence} />
      <Route path={"/app-icon-candidate"} component={AppIconCandidate} />
      <Route path={"/campaign-asset-registry"} component={CampaignAssetRegistry} />
      <Route path={"/route-integrity-index"} component={RouteIntegrityIndex} />
      <Route path={"/campaign-activation-center"} component={CampaignActivationCenter} />
      <Route path={"/trinity-sovereign-portal"} component={TrinitySovereignPortal} />
      <Route path={"/admin/royalty-records"} component={AdminRoyaltyRecords} />
      <Route path={"/tutorial-studio"} component={VisualTutorialStudio} />
      <Route path={"/evolution-lookbook"} component={EvolutionLookbook} />
      <Route path={"/creator-atlas"} component={CreatorAtlas} />
      <Route path={"/atlas-core"} component={AtlasCore} />
      <Route path={"/visual-story-worlds"} component={VisualStoryWorlds} />
      <Route path={"/sovereign-archive-chronicles"} component={SovereignArchiveChronicles} />
      <Route path={"/creator-digital-dna"} component={CreatorDigitalDNA} />
      <Route path={"/chais-sabir-allah-mirror"} component={ChaisSabirAllahMirror} />
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
        <Route path="/episode-brief-builder" component={EpisodeBriefBuilder} />
        <Route path="/seven-episode-series" component={SevenEpisodeSeries} />
        <Route path="/dynasty-visual-archive" component={DynastyVisualArchive} />
        <Route path="/rebirth-living-codex" component={RebirthLivingCodex} />
        <Route path="/infininillionaire-film-foundation" component={InfininillionaireFilmFoundation} />
        <Route path="/planning-atlas" component={PlanningAtlas} />
        <Route path="/digitalship-accession" component={DigitalshipAccessionDesk} />
        <Route path="/omniversal-source-ledger" component={OmniversalSourceLedger} />
        <Route path="/source-labeled-storybook-index" component={SourceLabeledStorybookIndex} />
        <Route path="/plasma" component={PlasmaStateMap} />
        <Route path="/fluidity-corpus-blueprint" component={FluidityCorpusBlueprint} />
        <Route path="/new-dominion-story-blueprint" component={NewDominionStoryBlueprint} />
        <Route path="/story-world-crossroads" component={StoryWorldCrossroads} />
        <Route path="/source-collections" component={SourceCollections} />
        <Route path="/source-work-review" component={SourceWorkReview} />
        <Route path="/meta-ai-legion-archive" component={MetaAILegionArchive} />
        <Route path="/price-of-freedom" component={PriceOfFreedom} />
        <Route path="/investor-relations" component={InvestorRelations} />
        <Route path="/nine-frame-manifestation-packet" component={NineFrameManifestationPacket} />
        <Route path="/mobile-companion" component={MobileCompanion} />
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
        <Route path="/capital-readiness" component={CapitalReadinessHub} />
        <Route path="/future-infrastructure-blueprint" component={FutureInfrastructureBlueprint} />
        <Route path="/quantum-frequency-research-lab" component={QuantumFrequencyResearchLab} />
        <Route path="/audience-value-leverage" component={AudienceValueLeverage} />
        <Route path="/universal-commons" component={UniversalCommons} />
        <Route path="/synchronization-video-library" component={SynchronizationVideoLibrary} />
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
        <Route path="/creator-network" component={CreatorNetwork} />
        <Route path="/omniverse-manifesto-codex" component={OmniverseManifestoCodex} />
        <Route path="/codex-source-chronology" component={CodexSourceChronology} />
        <Route path="/omniverse-manifesto-master-index" component={OmniverseManifestoMasterIndex} />
        <Route path="/protected-attachment-accession" component={ProtectedAttachmentAccession} />
        <Route path="/omniverse-manifesto-chronology" component={OmniverseManifestoChronology} />
        <Route path="/omniverse-manifesto-nodes" component={OmniverseManifestoNodes} />
        <Route path="/omniverse-node/:id" component={OmniverseManifestoNode} />
        <Route path="/connected-source-registry" component={ConnectedSourceRegistry} />
        <Route path="/multi-vector-protected-source-intake" component={MultiVectorProtectedSourceIntake} />
        <Route path="/global-orbital-matrix-source-intake" component={GlobalOrbitalMatrixSourceIntake} />
        <Route path="/digital-mirror-twin" component={DigitalMirrorTwin} />
        <Route path="/ecosystem-discovery" component={EcosystemDiscovery} />
        <Route path="/transmissions-source-convergence" component={TransmissionsSourceConvergence} />
        <Route path="/scrollverse-xlviiiblocks-readiness" component={ScrollVerseXLVIIIblocksReadiness} />
        <Route path="/xlviiiblocks-proposal-canvas" component={XLVIIIblocksProposalCanvas} />
        <Route path="/portfolio-asset-evidence-inventory" component={PortfolioAssetEvidenceInventory} />
        <Route path="/autoempire-source-intake" component={AutoEmpireSourceIntake} />
        <Route path="/connected-statements-music-evidence" component={ConnectedStatementsMusicEvidence} />
        <Route path="/portfolio-evidence-hub" component={PortfolioEvidenceHub} />
        <Route path="/apex-digital-intelligence-research" component={ApexDigitalIntelligenceResearch} />
        <Route path="/creative-systems-launchpad" component={CreativeSystemsLaunchpad} />
        <Route path="/partnership-highways" component={PartnershipHighways} />
        <Route path="/scrollverse-brand-architecture" component={ScrollVerseBrandArchitecture} />
        <Route path="/systems-blueprint-library" component={SystemsBlueprintLibrary} />
        <Route path="/external-action-governance-study" component={ExternalActionGovernanceStudy} />
        <Route path="/media-evidence-bridge" component={MediaEvidenceBridge} />
        <Route path="/quantum-digital-magic-source-record" component={QuantumDigitalMagicSourceRecord} />
        <Route path="/owner-input-routing-board" component={OwnerInputRoutingBoard} />
        <Route path="/legion-knowledge-base" component={LegionKnowledgeBase} />
        <Route path="/world-lens" component={WorldLens} />
        <Route path={"/episode-50-final-structural-expansion"} component={Episode50ProtectedReference} />
        <Route path="/sovereign-cartoon-gallery" component={SovereignCartoonGallery} />
        <Route path="/protected-source-convergence" component={ProtectedSourceConvergence} />
        <Route path="/sovereignty-infrastructure-record" component={SovereigntyInfrastructureRecord} />
        <Route path="/empire-power-index" component={EmpirePowerIndex} />
        <Route path="/protected-visual-intake" component={ProtectedVisualIntake} />
        <Route path="/supplied-public-references" component={SuppliedPublicReferences} />
        <Route path="/mother-10-origin-doesnt-matter" component={Mother10OriginDoesntMatter} />
        <Route path="/manus-origin-historical-recovery" component={ManusOriginHistoricalRecoveryGate} />
        <Route path="/omega-267-prior-hub-recovery" component={Omega267PriorHubRecoveryGate} />
        <Route path="/creator-sticker-intake" component={CreatorStickerIntake} />
        <Route path="/creator-artifact-intake" component={CreatorArtifactIntake} />
        <Route path="/creator-visual-intake-atlas" component={CreatorVisualIntakeAtlas} />
        <Route path="/retained-image-intake" component={RetainedImageIntake} />
        <Route path="/generic-retained-image-intake" component={GenericRetainedImageIntake} />
        <Route path="/protected-visual-evidence-hub" component={ProtectedVisualEvidenceHub} />
        <Route path="/protected-visual-batch-intake" component={ProtectedVisualBatchIntake} />
        <Route path="/retained-photo-intake" component={RetainedPhotoIntake} />
        <Route path="/paired-retained-image-intake" component={PairedRetainedImageIntake} />
        <Route path="/next-retained-image-intake" component={NextRetainedImageIntake} />
        <Route path="/game-systems-research-blueprint" component={GameSystemsResearchBlueprint} />
        <Route path="/omniland-consoleless-delivery" component={OmnilandConsolelessDelivery} />
        <Route path="/omniland" component={Omniland} />
        <Route path="/omniland-source-atlas" component={OmnilandSourceAtlas} />
        <Route path="/omniland-cinematic-gateway" component={OmnilandCinematicGateway} />
        <Route path="/legacy-royalties-research" component={LegacyRoyaltiesResearch} />
        <Route path="/omni-master-registry" component={OmniMasterRegistryRecord} />
        <Route path="/omniland-embodied-play" component={OmnilandEmbodiedPlay} />
        <Route path="/omniland-game-systems-contribution" component={OmnilandGameSystemsContribution} />
        <Route path="/media-release-concept-board" component={MediaReleaseConceptBoard} />
        <Route path="/commerce-financial-readiness-board" component={CommerceFinancialReadinessBoard} />
        <Route path="/active-pathways-release-gates-audit" component={ActivePathwaysReleaseGatesAudit} />
        <Route path={"/youtube-current-feed-research"} component={YouTubeCurrentFeedResearch} />
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
      <ThemeProvider defaultTheme="dark" switchable>
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
