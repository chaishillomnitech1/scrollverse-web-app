import { describe, expect, it } from "vitest";
import { buildJourneyRecommendations } from "./routers/journey";

describe("private journey recommendations", () => {
  it("prioritizes Guardian profile setup before activation", () => {
    const recommendations = buildJourneyRecommendations(false, false);
    expect(recommendations[0]?.href).toBe("/guardian-dashboard");
    expect(recommendations).toHaveLength(3);
  });

  it("prioritizes activation after a Guardian profile exists", () => {
    const recommendations = buildJourneyRecommendations(true, false);
    expect(recommendations[0]?.href).toBe("/guardian-activation");
  });

  it("moves to original concept and knowledge pathways after activation begins", () => {
    const recommendations = buildJourneyRecommendations(true, true);
    expect(recommendations.map(item => item.href)).toContain("/fashion-portfolio");
    expect(recommendations.map(item => item.href)).toContain("/mesopotamia-library");
  });
});
