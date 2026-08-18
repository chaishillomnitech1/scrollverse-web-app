import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

const systemsCatalog = [
  ["/media-readiness-lab", "MediaReadinessLab", "MediaReadinessLab.tsx"],
  ["/creator-exchange-navigator", "CreatorExchangeNavigator", "CreatorExchangeNavigator.tsx"],
  ["/creator-studio-navigator", "CreatorStudioNavigator", "CreatorStudioNavigator.tsx"],
  ["/creator-operations-intelligence", "CreatorOperationsIntelligence", "CreatorOperationsIntelligence.tsx"],
  ["/creator-services-navigator", "CreatorServicesNavigator", "CreatorServicesNavigator.tsx"],
  ["/media-portfolio-readiness", "MediaPortfolioReadiness", "MediaPortfolioReadiness.tsx"],
  ["/nft-monetization-blueprint", "NftMonetizationBlueprint", "NftMonetizationBlueprint.tsx"],
  ["/empire-asset-navigator", "EmpireAssetNavigator", "EmpireAssetNavigator.tsx"],
  ["/ip-digital-evidence-navigator", "IpDigitalEvidenceNavigator", "IpDigitalEvidenceNavigator.tsx"],
  ["/original-systems-hub", "OriginalSystemsHub", "OriginalSystemsHub.tsx"],
  ["/enterprise-systems-blueprint", "EnterpriseSystemsBlueprint", "EnterpriseSystemsBlueprint.tsx"],
  ["/public-portfolio-governance", "PublicPortfolioGovernance", "PublicPortfolioGovernance.tsx"],
  ["/open-knowledge-verse", "OpenKnowledgeVerse", "OpenKnowledgeVerse.tsx"],
  ["/standards-studio", "StandardsStudio", "StandardsStudio.tsx"],
] as const;

describe("Phase 199 creator-controlled systems integrity", () => {
  it("keeps every readiness-system route paired with its imported page component", () => {
    const app = read("client/src/App.tsx");

    for (const [route, component, pageFile] of systemsCatalog) {
      expect(fs.existsSync(path.join(root, "client/src/pages", pageFile))).toBe(true);
      expect(app).toContain(`import ${component} from "./pages/${pageFile.replace(".tsx", "")}"`);
      expect(app).toContain(`<Route path="${route}" component={${component}} />`);
    }
  });
});
