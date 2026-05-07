import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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
import Replays from "./pages/Replays";
import GuardianProfile from "./pages/GuardianProfile";
import MajesticAnchor from "./pages/MajesticAnchor";
import OurStory from "./pages/OurStory";
import Zaire from "./pages/Zaire";
import Onboard from "./pages/Onboard";
import MarsOmni from "./pages/MarsOmni";
import Security from "./pages/Security";
import Acquisition from "./pages/Acquisition";
import Sentience from "./pages/Sentience";
import Books from "./pages/Books";
import Visuals from "./pages/Visuals";
import BookOfLife from "./pages/BookOfLife";
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
import ExchangeStocks from "./pages/ExchangeStocks";
import ExchangeCurrencies from "./pages/ExchangeCurrencies";
import ExchangeGovernance from "./pages/ExchangeGovernance";
import Knowledge from "./pages/Knowledge";
import LegionRewards from "./pages/LegionRewards";
import IPProtection from "./pages/IPProtection";
import Intelligence from "./pages/Intelligence";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
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
      <Route path={"/exchange/stocks"} component={ExchangeStocks} />
      <Route path={"/exchange/currencies"} component={ExchangeCurrencies} />
      <Route path={"/exchange/governance"} component={ExchangeGovernance} />
      <Route path={"/knowledge"} component={Knowledge} />
      <Route path={"/legion/rewards"} component={LegionRewards} />
      <Route path={"/ip-protection"} component={IPProtection} />
      <Route path={"/intelligence"} component={Intelligence} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <PWAInstallBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
