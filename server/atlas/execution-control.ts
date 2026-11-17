/**
 * Provider-neutral capability and execution-evidence contracts.
 *
 * This module is deliberately pure: it does not authenticate with providers,
 * invoke deployments, mutate GitHub, or write database records.
 */

export type CapabilityProvider =
  | "github" | "vercel" | "digitalocean" | "dropbox" | "files"
  | "figma" | "canva" | "clickup" | "hubspot" | "shopify" | "wix"
  | "stripe" | "quickbooks" | "docusign" | "honeybook" | "sequel";

export type CapabilityDomain =
  | "source_control" | "deployment" | "infrastructure" | "archive"
  | "design" | "creative" | "project_management" | "crm" | "commerce"
  | "payments" | "accounting" | "agreements" | "editorial";

export type CapabilityState =
  | "NOT_CHECKED" | "UNAVAILABLE" | "AVAILABLE"
  | "AUTHENTICATED" | "AUTHORIZED";

export type CapabilitySnapshot = {
  capabilityId: string;
  provider: CapabilityProvider;
  domain: CapabilityDomain;
  action: string;
  state: CapabilityState;
  checkedAt: string | null;
  evidenceRef: string | null;
  limitation: string | null;
};

/**
 * A connected provider is not automatically authorized for every action.
 * AUTHENTICATED and AUTHORIZED snapshots must carry a dated evidence pointer.
 */
export function validateCapabilitySnapshot(snapshot: CapabilitySnapshot): void {
  if (!/^[a-z0-9][a-z0-9._:-]{2,119}$/i.test(snapshot.capabilityId)) {
    throw new Error("Capability IDs must be stable identifiers.");
  }
  if (!snapshot.action.trim()) throw new Error("Capability action is required.");
  if (snapshot.state === "AUTHENTICATED" || snapshot.state === "AUTHORIZED") {
    if (!snapshot.checkedAt || !snapshot.evidenceRef) {
      throw new Error("Authenticated or authorized states require timestamped evidence.");
    }
  }
  if (snapshot.checkedAt && Number.isNaN(Date.parse(snapshot.checkedAt))) {
    throw new Error("Capability checkedAt must be a valid timestamp.");
  }
}

export type SpecialistDomain =
  | "ENGINEERING_QA" | "INFRASTRUCTURE" | "SOURCE_ARCHIVE"
  | "DESIGN_SYSTEMS" | "CREATIVE_PRODUCTION" | "PROJECT_OPERATIONS"
  | "CUSTOMER_RELATIONSHIPS" | "COMMERCE" | "PAYMENTS_ACCOUNTING"
  | "AGREEMENTS" | "EDITORIAL";

export type WorkRequest = {
  task: string;
  requiresProductionWrite?: boolean;
  containsSensitiveData?: boolean;
};

export type SpecialistRoute = {
  specialist: SpecialistDomain;
  primaryProvider: CapabilityProvider;
  fallbackProviders: CapabilityProvider[];
  approvalRequired: boolean;
};

const ROUTES: Array<{ terms: string[]; route: SpecialistRoute }> = [
  { terms: ["code", "repository", "pull request", "test", "ci", "quality"], route: { specialist: "ENGINEERING_QA", primaryProvider: "github", fallbackProviders: ["files"], approvalRequired: false } },
  { terms: ["deploy", "preview", "release"], route: { specialist: "INFRASTRUCTURE", primaryProvider: "vercel", fallbackProviders: ["github", "digitalocean"], approvalRequired: true } },
  { terms: ["droplet", "server", "infrastructure", "network"], route: { specialist: "INFRASTRUCTURE", primaryProvider: "digitalocean", fallbackProviders: ["github"], approvalRequired: true } },
  { terms: ["archive", "conversation", "source", "accession", "export"], route: { specialist: "SOURCE_ARCHIVE", primaryProvider: "dropbox", fallbackProviders: ["files", "github"], approvalRequired: false } },
  { terms: ["figma", "component", "design system"], route: { specialist: "DESIGN_SYSTEMS", primaryProvider: "figma", fallbackProviders: ["canva"], approvalRequired: false } },
  { terms: ["poster", "social", "visual", "creative"], route: { specialist: "CREATIVE_PRODUCTION", primaryProvider: "canva", fallbackProviders: ["figma"], approvalRequired: false } },
  { terms: ["project", "milestone", "workflow"], route: { specialist: "PROJECT_OPERATIONS", primaryProvider: "clickup", fallbackProviders: ["github"], approvalRequired: false } },
  { terms: ["contact", "lead", "customer", "crm"], route: { specialist: "CUSTOMER_RELATIONSHIPS", primaryProvider: "hubspot", fallbackProviders: ["clickup"], approvalRequired: false } },
  { terms: ["store", "product", "catalog", "commerce"], route: { specialist: "COMMERCE", primaryProvider: "shopify", fallbackProviders: ["wix"], approvalRequired: true } },
  { terms: ["payment", "invoice", "accounting", "reconcile"], route: { specialist: "PAYMENTS_ACCOUNTING", primaryProvider: "quickbooks", fallbackProviders: ["stripe"], approvalRequired: true } },
  { terms: ["contract", "signature", "agreement"], route: { specialist: "AGREEMENTS", primaryProvider: "docusign", fallbackProviders: ["honeybook"], approvalRequired: true } },
  { terms: ["webinar", "newsletter", "editorial"], route: { specialist: "EDITORIAL", primaryProvider: "sequel", fallbackProviders: ["canva"], approvalRequired: false } },
];

export function routeWorkToSpecialist(request: WorkRequest): SpecialistRoute | null {
  const task = request.task.normalize("NFKC").toLocaleLowerCase("en-US");
  const match = ROUTES.find(entry => entry.terms.some(term => task.includes(term)));
  if (!match) return null;
  return {
    ...match.route,
    fallbackProviders: [...match.route.fallbackProviders],
    approvalRequired: match.route.approvalRequired || Boolean(request.requiresProductionWrite) || Boolean(request.containsSensitiveData),
  };
}

export type CapabilityAwareSpecialistRoute = SpecialistRoute & {
  selectedProvider: CapabilityProvider | null;
  selectedCapabilityId: string | null;
  selectedCapabilityState: CapabilityState;
  fallbackProvidersAuthorized: CapabilityProvider[];
  blockedReason: string | null;
};

const REQUIRED_READ_CAPABILITY: Record<CapabilityProvider, string> = {
  github: "github.repository.commit-checks.read",
  vercel: "vercel.project.deployments.read",
  digitalocean: "digitalocean.droplets.read",
  dropbox: "dropbox.files.metadata.read",
  files: "files.library.search.read",
  figma: "figma.files.read",
  canva: "canva.designs.read",
  clickup: "clickup.tasks.read",
  hubspot: "hubspot.crm.read",
  shopify: "shopify.store.read",
  wix: "wix.site.read",
  stripe: "stripe.balance.read",
  quickbooks: "quickbooks.accounting.read",
  docusign: "docusign.envelopes.read",
  honeybook: "honeybook.projects.read",
  sequel: "sequel.webinars.read",
};

/**
 * Selects a provider only when the exact read capability has a current
 * AUTHORIZED snapshot. AUTHENTICATED alone is deliberately insufficient.
 * The result is routing metadata, not an instruction to execute a write.
 */
export const CAPABILITY_SNAPSHOT_MAX_AGE_MS = 15 * 60 * 1000;

export function routeWorkWithCapabilities(
  request: WorkRequest,
  snapshots: readonly CapabilitySnapshot[],
  now: Date = new Date(),
): CapabilityAwareSpecialistRoute | null {
  const base = routeWorkToSpecialist(request);
  if (!base) return null;

  const isAuthorized = (provider: CapabilityProvider) => {
    const requiredId = REQUIRED_READ_CAPABILITY[provider];
    return snapshots.find(snapshot => {
      if (
        snapshot.provider !== provider ||
        snapshot.capabilityId !== requiredId ||
        snapshot.state !== "AUTHORIZED" ||
        !snapshot.checkedAt ||
        !snapshot.evidenceRef
      ) return false;
      const ageMs = now.getTime() - Date.parse(snapshot.checkedAt);
      return Number.isFinite(ageMs) && ageMs >= 0 && ageMs <= CAPABILITY_SNAPSHOT_MAX_AGE_MS;
    });
  };

  const primary = isAuthorized(base.primaryProvider);
  const authorizedFallbacks = base.fallbackProviders.filter(provider => Boolean(isAuthorized(provider)));
  const selectedProvider = primary ? base.primaryProvider : authorizedFallbacks[0] ?? null;
  const selectedSnapshot = selectedProvider
    ? isAuthorized(selectedProvider)
    : undefined;

  return {
    ...base,
    selectedProvider,
    selectedCapabilityId: selectedSnapshot?.capabilityId ?? null,
    selectedCapabilityState: selectedSnapshot?.state ?? "NOT_CHECKED",
    fallbackProvidersAuthorized: authorizedFallbacks,
    blockedReason: selectedProvider
      ? null
      : "No provider has a fresh (15-minute), timestamped AUTHORIZED snapshot for the required read action. Refresh provider evidence or connect the exact capability.",
  };
}

export type EvidenceStage =
  | "USER_REPORTED" | "SOURCE_LOCATED" | "INSPECTED" | "IMPLEMENTED"
  | "TESTED" | "CI_PASSED" | "PREVIEW_READY"
  | "PRODUCTION_VERIFIED" | "EXTERNALLY_CONFIRMED";

export const EVIDENCE_STAGE_ORDER: readonly EvidenceStage[] = [
  "USER_REPORTED", "SOURCE_LOCATED", "INSPECTED", "IMPLEMENTED",
  "TESTED", "CI_PASSED", "PREVIEW_READY",
  "PRODUCTION_VERIFIED", "EXTERNALLY_CONFIRMED",
];

export type ExecutionEvidenceEvent = {
  eventId: string;
  workId: string;
  stage: EvidenceStage;
  actor: string;
  capabilityId: string | null;
  targetRef: string;
  evidenceRefs: readonly string[];
  approvalRef: string | null;
  observedAt: string;
  previousEventId: string | null;
  note: string;
};

/**
 * Append-only in-memory ledger helper. It returns a new array and never edits
 * an earlier event. Persistence belongs to a separately authorized adapter.
 */
export function appendExecutionEvidence(
  existing: readonly ExecutionEvidenceEvent[],
  next: ExecutionEvidenceEvent,
): ExecutionEvidenceEvent[] {
  if (existing.some(event => event.eventId === next.eventId)) {
    throw new Error("Evidence event IDs must be unique; append a new event instead.");
  }
  if (!next.workId.trim() || !next.actor.trim() || !next.targetRef.trim()) {
    throw new Error("Evidence events require work, actor, and target references.");
  }
  if (Number.isNaN(Date.parse(next.observedAt))) {
    throw new Error("Evidence event observedAt must be a valid timestamp.");
  }
  const previous = [...existing].reverse().find(event => event.workId === next.workId) ?? null;
  if ((next.previousEventId ?? null) !== (previous?.eventId ?? null)) {
    throw new Error("Evidence event must link to the latest event for this work item.");
  }
  if (previous && EVIDENCE_STAGE_ORDER.indexOf(next.stage) < EVIDENCE_STAGE_ORDER.indexOf(previous.stage)) {
    throw new Error("Evidence stages cannot silently regress; append a correction or new work item.");
  }
  if (next.stage !== "USER_REPORTED" && next.evidenceRefs.length === 0) {
    throw new Error("Evidence beyond user-reported state requires at least one evidence reference.");
  }
  if ((next.stage === "PRODUCTION_VERIFIED" || next.stage === "EXTERNALLY_CONFIRMED") && !next.approvalRef) {
    throw new Error("Production or external confirmation requires an approval or verification reference.");
  }
  return [...existing, { ...next, evidenceRefs: [...next.evidenceRefs] }];
}

export type DeploymentObservation = {
  provider: "vercel" | "github" | "digitalocean";
  environment: "preview" | "staging" | "production" | "unknown";
  state: "queued" | "building" | "ready" | "success" | "failure" | "canceled" | "unknown";
  url: string | null;
  commitSha: string | null;
  observedAt: string;
  sourceRef: string;
};

export function validateDeploymentObservation(observation: DeploymentObservation): void {
  if (Number.isNaN(Date.parse(observation.observedAt))) {
    throw new Error("Deployment observations require a valid observation timestamp.");
  }
  if (!observation.sourceRef.trim()) {
    throw new Error("Deployment observations require a provider evidence reference.");
  }
  if (observation.url) {
    const parsed = new URL(observation.url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
      throw new Error("Deployment URLs must be credential-free HTTPS URLs.");
    }
  }
  if (observation.commitSha && !/^[a-f0-9]{7,40}$/i.test(observation.commitSha)) {
    throw new Error("Deployment commit references must be hexadecimal SHAs.");
  }
}
