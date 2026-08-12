import { describe, expect, it } from "vitest";
import { RELEASE_GATES, RELEASE_STATE_META } from "@shared/releaseReadiness";

describe("ScrollVerse cross-platform release readiness", () => {
  it("keeps first-party web readiness distinct from owner-controlled native submission gates", () => {
    expect(RELEASE_GATES.find(gate => gate.id === "installable-web")?.state).toBe("READY_IN_PORTAL");
    expect(RELEASE_GATES.find(gate => gate.id === "support-contact")?.state).toBe("OWNER_ACTION_REQUIRED");
    expect(RELEASE_GATES.find(gate => gate.id === "signed-build")?.state).toBe("NOT_STARTED");
    expect(RELEASE_GATES.find(gate => gate.id === "submission")?.detail).toContain("owner explicitly approves");
  });

  it("publishes a visible status label for every release gate state", () => {
    expect(RELEASE_STATE_META.READY_IN_PORTAL.label).toBe("Ready in portal");
    expect(RELEASE_STATE_META.OWNER_ACTION_REQUIRED.label).toBe("Owner action required");
    expect(RELEASE_STATE_META.NOT_STARTED.label).toBe("Not started");
  });
});
