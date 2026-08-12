export type GitHubOperationState = "ready_now" | "next" | "review_required" | "later";

export type GitHubOperationLane = {
  id: string;
  title: string;
  icon: string;
  color: string;
  state: GitHubOperationState;
  repository: string;
  repositoryUrl: string;
  observedPattern: string;
  operationalUse: string;
  evidence: string[];
  portalRoute: string;
  portalLabel: string;
};

export const GITHUB_OPERATION_STATES: Record<GitHubOperationState, { label: string; color: string; description: string }> = {
  ready_now: {
    label: "READY TO ADAPT",
    color: "#00FF88",
    description: "The portal can adapt a documented first-party pattern without granting provider access or triggering external actions.",
  },
  next: {
    label: "NEXT REVIEW",
    color: "#00D4FF",
    description: "The pattern is useful, but requires a project-level implementation decision and test evidence first.",
  },
  review_required: {
    label: "REVIEW REQUIRED",
    color: "#FFB800",
    description: "The pattern may inform the system, but provenance, rights, reliability, and security review remain required.",
  },
  later: {
    label: "LATER / ARCHIVE",
    color: "#B98CFF",
    description: "The material is retained as a first-party lineage reference and is not in the current operating path.",
  },
};

export const GITHUB_OPERATION_LANES: GitHubOperationLane[] = [
  {
    id: "review-loop",
    title: "Reliable review loops",
    icon: "⏱️",
    color: "#00FF88",
    state: "ready_now",
    repository: "scrollverse-platform",
    repositoryUrl: "https://github.com/chaishillomnitech1/scrollverse-platform",
    observedPattern: "Separates HTTP heartbeat work from agentic cron work rather than relying on in-process timers.",
    operationalUse: "Supports idempotent, non-transactional revenue and evidence review snapshots.",
    evidence: ["Route and owner control", "Idempotency behavior", "Failure notification path"],
    portalRoute: "/systems-map",
    portalLabel: "Open systems map",
  },
  {
    id: "release-reliability",
    title: "Release reliability",
    icon: "🧪",
    color: "#00D4FF",
    state: "next",
    repository: "Unified-ScrollVerse-Eternal",
    repositoryUrl: "https://github.com/chaishillomnitech1/Unified-ScrollVerse-Eternal",
    observedPattern: "Heartbeat, retry, caching, and failure-alert concepts.",
    operationalUse: "Informs test-evidence records and controlled retry design for future internal reviews.",
    evidence: ["Unit and regression tests", "Failure handling", "Observable review logs"],
    portalRoute: "/evidence-standards",
    portalLabel: "See evidence standards",
  },
  {
    id: "creator-signal",
    title: "Creator signal paths",
    icon: "📡",
    color: "#FF8DB5",
    state: "review_required",
    repository: "scrollsoul-music-sync",
    repositoryUrl: "https://github.com/chaishillomnitech1/scrollsoul-music-sync",
    observedPattern: "Music rights, placement, and delivery-record vocabulary.",
    operationalUse: "Informs creator-prepared credits, territories, source references, and delivery readiness without representing distribution outcomes.",
    evidence: ["Creator-provided source record", "Rights and territory fields", "Human review note"],
    portalRoute: "/signalworks",
    portalLabel: "Open Signalworks",
  },
  {
    id: "commerce-readiness",
    title: "Commerce readiness",
    icon: "🧵",
    color: "#FFB800",
    state: "review_required",
    repository: "scrollverse_commerce",
    repositoryUrl: "https://github.com/chaishillomnitech1/scrollverse_commerce",
    observedPattern: "Headless commerce and revalidation architecture concepts.",
    operationalUse: "Informs a future catalog-readiness structure while current fashion commerce remains fail-closed.",
    evidence: ["Approved SKU evidence", "Fulfillment and policy records", "Explicit provider authorization"],
    portalRoute: "/fashion-portfolio",
    portalLabel: "View fashion readiness",
  },
  {
    id: "governance-ux",
    title: "Governance and routing",
    icon: "✦",
    color: "#B98CFF",
    state: "review_required",
    repository: "scrollverse-ai-legion",
    repositoryUrl: "https://github.com/chaishillomnitech1/scrollverse-ai-legion",
    observedPattern: "Modular role routing and communication-map structure.",
    operationalUse: "Informs transparent intake labels and escalation routes without giving an assistant autonomous authority.",
    evidence: ["Consent boundary", "Clear human escalation", "Visible capability state"],
    portalRoute: "/legion-commons",
    portalLabel: "Open Legion Commons",
  },
  {
    id: "source-ledger",
    title: "Source-led operating records",
    icon: "🧭",
    color: "#00D4FF",
    state: "next",
    repository: "chais-hill-portfolio",
    repositoryUrl: "https://github.com/chaishillomnitech1/chais-hill-portfolio",
    observedPattern: "Repository governance, onboarding, issue templates, and CI/CD conventions.",
    operationalUse: "Supports source-to-review records, build notes, and a repeatable contributor handoff.",
    evidence: ["Source link", "Implementation owner", "Test result and review note"],
    portalRoute: "/creator-operations",
    portalLabel: "Open Creator Operations",
  },
  {
    id: "quantum-review",
    title: "Post-quantum review track",
    icon: "🔐",
    color: "#86EFAC",
    state: "later",
    repository: "first-party quantum and contract reference cluster",
    repositoryUrl: "https://github.com/chaishillomnitech1",
    observedPattern: "Cryptographic, ZK, smart-contract, and deployment sequencing references collected from first-party repositories and submitted architecture notes.",
    operationalUse: "Maintains a traceable research and test pathway for future cryptographic validation; it is not a deployed validator or a security certification.",
    evidence: ["Independent cryptographic review", "Reproducible test vectors", "Audit and deployment decision"],
    portalRoute: "/evidence-standards",
    portalLabel: "Review security evidence",
  },
];

export const GITHUB_OPERATION_FLOW = [
  { step: "01", title: "Source", detail: "Record the first-party repository or submitted material precisely." },
  { step: "02", title: "Review", detail: "Check purpose, provenance, dependencies, rights, and intended scope." },
  { step: "03", title: "Test", detail: "Add reproducible tests, expected outcomes, and performance or gas evidence where relevant." },
  { step: "04", title: "Decide", detail: "Keep a human-controlled release decision separate from research and implementation." },
] as const;
