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
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
