import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

const trustLensPages = [
  "BrandFeatureStudio.tsx",
  "ConsortiumNexus.tsx",
  "OpenKnowledgeVerse.tsx",
  "OriginalMediaReadiness.tsx",
  "CreatorExchangeNavigator.tsx",
  "CreatorOperationsIntelligence.tsx",
  "CreatorServicesNavigator.tsx",
  "CreatorStudioNavigator.tsx",
  "DomainDiscoveryMap.tsx",
  "EcosystemOutcomesScorecard.tsx",
  "EmpireAssetNavigator.tsx",
  "HistoricalTransmissionPatterns.tsx",
  "HypotheticalSystemsLab.tsx",
  "IdeaExchange.tsx",
  "IpDigitalEvidenceNavigator.tsx",
  "MusicCreatorReleaseReadiness.tsx",
  "NarrativeSourceTrail.tsx",
  "BrandFeatureStudio.tsx",
  "NftMonetizationBlueprint.tsx",
  "PortalTrustStandard.tsx",
  "ReleasePackageChecklist.tsx",
  "ScrollVerseChessArena.tsx",
  "StandardsEvidenceCommons.tsx",
  "StandardsStudio.tsx",
  "VoiceLanguageStudio.tsx",
  "XLVIIIBlocksMonograph.tsx",
] as const;

describe("Phase 208 portal-wide Trust Lens standard", () => {
  it("keeps the shared lens visible across the six primary ecosystem lanes", () => {
    const component = read("client/src/components/PortalTrustLens.tsx");
    const audit = read("docs/phase208-portal-wide-trust-audit.md");

    expect(component).toContain("PERSPECTIVE & SOURCE TRAIL");
    expect(component).toContain("CURRENT EXPERIENCE STATE");
    expect(component).toContain("SCOPE & CONTROL");
    expect(component).toContain("Add a source or correction");
    expect(component).toContain("presents the creator’s first-party ScrollVerse materials directly");
    expect(component).toContain("do not redefine the creator’s direction");

    expect(new Set(trustLensPages).size).toBe(25);
    for (const page of trustLensPages) {
      expect(read(`client/src/pages/${page}`)).toContain("PortalTrustLens");
    }

    expect(audit).toContain("no wallet, mint, sale, custody, exchange, or transfer");
    expect(audit).toContain("no public profile, automatic matching, or external community action");
  });
});
