import { describe, expect, it } from "vitest";
import {
  appendExecutionEvidence,
  routeWorkToSpecialist,
  validateCapabilitySnapshot,
  validateDeploymentObservation,
  type ExecutionEvidenceEvent,
} from "./execution-control";

const baseEvent: ExecutionEvidenceEvent = {
  eventId: "event-001",
  workId: "work-scrollverse",
  stage: "SOURCE_LOCATED",
  actor: "owner",
  capabilityId: "github-read",
  targetRef: "repo:chaishillomnitech1/scrollverse-web-app",
  evidenceRefs: ["https://github.com/chaishillomnitech1/scrollverse-web-app"],
  approvalRef: null,
  observedAt: "2026-11-10T13:00:00.000Z",
  previousEventId: null,
  note: "Repository source located.",
};

describe("execution control capability and evidence contracts", () => {
  it("requires timestamped evidence before authenticated or authorized claims", () => {
    expect(() => validateCapabilitySnapshot({
      capabilityId: "github-write", provider: "github", domain: "source_control",
      action: "merge pull request", state: "AUTHORIZED", checkedAt: null,
      evidenceRef: null, limitation: null,
    })).toThrow(/timestamped evidence/);
    expect(() => validateCapabilitySnapshot({
      capabilityId: "github-read", provider: "github", domain: "source_control",
      action: "read repository", state: "AVAILABLE", checkedAt: null,
      evidenceRef: null, limitation: null,
    })).not.toThrow();
  });

  it("routes engineering and deployment work to domain specialists", () => {
    expect(routeWorkToSpecialist({ task: "review GitHub pull request and tests" })?.specialist).toBe("ENGINEERING_QA");
    expect(routeWorkToSpecialist({ task: "check Vercel preview deployment" })?.specialist).toBe("INFRASTRUCTURE");
    expect(routeWorkToSpecialist({ task: "inspect conversation archive accession" })?.specialist).toBe("SOURCE_ARCHIVE");
    expect(routeWorkToSpecialist({ task: "unclassified task" })).toBeNull();
  });

  it("raises approval gates for sensitive and production work", () => {
    expect(routeWorkToSpecialist({ task: "deploy preview" })?.approvalRequired).toBe(true);
    expect(routeWorkToSpecialist({ task: "read GitHub source", containsSensitiveData: true })?.approvalRequired).toBe(true);
    expect(routeWorkToSpecialist({ task: "read GitHub source" })?.approvalRequired).toBe(false);
  });

  it("appends evidence events without mutating prior records", () => {
    const original = [baseEvent];
    const next: ExecutionEvidenceEvent = {
      ...baseEvent, eventId: "event-002", stage: "TESTED",
      observedAt: "2026-11-10T14:00:00.000Z",
      previousEventId: "event-001",
      evidenceRefs: ["ci://run/123"],
      note: "Focused test suite completed.",
    };
    const appended = appendExecutionEvidence(original, next);
    expect(appended).toHaveLength(2);
    expect(original).toHaveLength(1);
    expect(original[0].eventId).toBe("event-001");
    expect(appended[1].previousEventId).toBe("event-001");
  });

  it("rejects duplicate IDs, broken event links, and silent evidence-stage regression", () => {
    expect(() => appendExecutionEvidence([baseEvent], baseEvent)).toThrow(/unique/);
    expect(() => appendExecutionEvidence([baseEvent], {
      ...baseEvent, eventId: "event-002", stage: "TESTED", previousEventId: null,
      evidenceRefs: ["ci://run/123"],
    })).toThrow(/latest event/);
    expect(() => appendExecutionEvidence([baseEvent], {
      ...baseEvent, eventId: "event-003", stage: "USER_REPORTED", previousEventId: "event-001",
    })).toThrow(/regress/);
  });

  it("requires evidence references for verified stages and an approval reference for production", () => {
    expect(() => appendExecutionEvidence([], {
      ...baseEvent, stage: "CI_PASSED", evidenceRefs: [],
    })).toThrow(/evidence reference/);
    expect(() => appendExecutionEvidence([], {
      ...baseEvent, stage: "PRODUCTION_VERIFIED", evidenceRefs: ["deployment://prod"],
      approvalRef: null,
    })).toThrow(/approval or verification reference/);
  });

  it("validates deployment observations as sourced, timestamped records", () => {
    expect(() => validateDeploymentObservation({
      provider: "vercel", environment: "preview", state: "ready",
      url: "https://preview.example.test", commitSha: "a".repeat(40),
      observedAt: "2026-11-10T14:00:00.000Z", sourceRef: "github-check:vercel",
    })).not.toThrow();
    expect(() => validateDeploymentObservation({
      provider: "vercel", environment: "production", state: "ready",
      url: "http://unsafe.example.test", commitSha: null,
      observedAt: "2026-11-10T14:00:00.000Z", sourceRef: "check",
    })).toThrow(/HTTPS/);
  });
});
