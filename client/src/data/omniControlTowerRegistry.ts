export type EvidenceState =
  | "verified-access"
  | "implementation-found"
  | "configured-not-tested"
  | "documented-only"
  | "not-checked"
  | "blocked";

export type IntegrationRecord = {
  id: string;
  name: string;
  category: string;
  state: EvidenceState;
  evidence: string;
  href?: string;
  note: string;
  productionActive: "verified" | "not-verified" | "not-applicable";
};

export const evidenceSnapshotAt = "2026-11-10";

export const integrationRecords: IntegrationRecord[] = [
  { id: "github", name: "GitHub", category: "Source control", state: "verified-access", evidence: "Connected repository, branch, PR, commit and workflow reads", href: "https://github.com/chaishillomnitech1", note: "Read access was exercised for the current repository inventory and source inspection. This does not authorize repository writes or merges.", productionActive: "not-applicable" },
  { id: "vercel", name: "Vercel", category: "Deployment", state: "configured-not-tested", evidence: "Provider adapter source and successful commit status checks", href: "https://vercel.com", note: "A live authenticated deployment snapshot and production alias were not retrieved in this inspection.", productionActive: "not-verified" },
  { id: "stripe", name: "Stripe", category: "Payments", state: "configured-not-tested", evidence: "Stripe SDK, webhook source and phase 782 financial-route audit", href: "https://github.com/chaishillomnitech1/scrollverse-web-app/blob/main/docs/phase782-financial-route-verification.md", note: "The audit identifies test-mode configuration. No live payment, payout or production charge was tested.", productionActive: "not-verified" },
  { id: "socketio", name: "Socket.IO", category: "Realtime", state: "implementation-found", evidence: "Socket.IO server and client dependencies plus application references", note: "Code implementation was located; a live production socket session was not tested.", productionActive: "not-verified" },
  { id: "tidb-mysql", name: "TiDB / MySQL", category: "Database", state: "blocked", evidence: "Drizzle and mysql2 dependencies, Atlas migration 0049, protected preflight run 42836859687", href: "https://github.com/chaishillomnitech1/scrollverse-web-app/actions/runs/42836859687", note: "The prior preflight stopped because DATABASE_URL was empty. Its log states no database was contacted and no migration was applied.", productionActive: "not-verified" },
  { id: "massive-s3", name: "Massive (S3-compatible)", category: "Storage", state: "implementation-found", evidence: "server/massiveStorage.ts and AWS S3 SDK usage", note: "The implementation targets files.massive.com. This is not evidence of an AWS S3 account integration.", productionActive: "not-verified" },
  { id: "pinata", name: "Pinata", category: "IPFS storage", state: "documented-only", evidence: "Gateway base URL and asset CID references in project source", href: "https://www.pinata.cloud/", note: "Current authenticated pinning, upload or gateway health was not checked.", productionActive: "not-verified" },
  { id: "thirdweb", name: "Thirdweb", category: "Web3", state: "documented-only", evidence: "Project integration and SDK references in source documentation", href: "https://thirdweb.com/", note: "No current authenticated provider snapshot or transaction was performed.", productionActive: "not-verified" },
  { id: "polygon", name: "Polygon", category: "Blockchain network", state: "documented-only", evidence: "Project chain references and contract documentation", href: "https://polygon.technology/", note: "No current RPC health, contract state or transaction was verified.", productionActive: "not-verified" },
  { id: "scroll", name: "Scroll", category: "Blockchain network", state: "documented-only", evidence: "Project chain references and contract documentation", href: "https://scroll.io/", note: "No current RPC health, contract state or transaction was verified.", productionActive: "not-verified" },
  { id: "mailchimp", name: "Mailchimp", category: "Marketing", state: "documented-only", evidence: "Partner/provider declaration in project documentation", href: "https://mailchimp.com/", note: "No authenticated audience or campaign operation was tested.", productionActive: "not-verified" },
  { id: "vydia", name: "Vydia", category: "Music distribution", state: "documented-only", evidence: "Partner/provider declaration in project documentation", href: "https://vydia.com/", note: "No authenticated catalog, distribution or royalty statement was retrieved.", productionActive: "not-verified" },
  { id: "manus", name: "Manus", category: "AI platform", state: "documented-only", evidence: "Project documentation and historical workspace references", note: "No current provider session or external execution was verified.", productionActive: "not-verified" },
  { id: "google-maps", name: "Google Maps", category: "Geospatial", state: "documented-only", evidence: "Project documentation and Google Maps type dependency", href: "https://maps.google.com/", note: "No authenticated maps API request or production usage was tested.", productionActive: "not-verified" },
  { id: "dropbox", name: "Dropbox", category: "ChatGPT connector", state: "not-checked", evidence: "Connector action available in this ChatGPT environment", href: "https://www.dropbox.com/", note: "A search was attempted for the current archive query and returned no matching files. Account authentication and other scopes were not independently verified.", productionActive: "not-applicable" },
  { id: "figma", name: "Figma", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://www.figma.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "canva", name: "Canva", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://www.canva.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "clickup", name: "ClickUp", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://clickup.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "hubspot", name: "HubSpot", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://www.hubspot.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "shopify", name: "Shopify", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://www.shopify.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "wix", name: "Wix", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://www.wix.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "quickbooks", name: "QuickBooks", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://quickbooks.intuit.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "docusign", name: "Docusign", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://www.docusign.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "honeybook", name: "HoneyBook", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://www.honeybook.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "digitalocean", name: "DigitalOcean", category: "ChatGPT connector", state: "not-checked", evidence: "Connector actions available in this ChatGPT environment", href: "https://www.digitalocean.com/", note: "Connector presence does not establish an authenticated account or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "finances", name: "Finances", category: "ChatGPT connector", state: "not-checked", evidence: "Finance connector actions available in this ChatGPT environment", note: "No personal financial data was accessed for this build. Connector presence does not establish consent or ScrollVerse production integration.", productionActive: "not-applicable" },
  { id: "bank-conversion", name: "Bank Statement Conversion", category: "ChatGPT connector", state: "not-checked", evidence: "Statement conversion actions available in this ChatGPT environment", note: "No financial documents were processed for this build.", productionActive: "not-applicable" },
  { id: "tembi", name: "Tembi Intelligence", category: "ChatGPT connector", state: "not-checked", evidence: "E-commerce intelligence connector actions available in this ChatGPT environment", note: "No authenticated provider query was performed.", productionActive: "not-applicable" },
  { id: "sequel", name: "Sequel.io", category: "ChatGPT connector", state: "not-checked", evidence: "Webinar content connector actions available in this ChatGPT environment", note: "No webinar source was accessed for this build.", productionActive: "not-applicable" },
  { id: "chatdata-sync", name: "ChatData Sync", category: "ChatGPT connector", state: "not-checked", evidence: "Structured tracker and CRM connector actions available in this ChatGPT environment", note: "No tracker records were created or modified.", productionActive: "not-applicable" },
  { id: "team30", name: "TEAM 30 AI Company OS", category: "ChatGPT connector", state: "verified-access", evidence: "Role routing and project planning tools were exercised for this initiative", note: "Planning and routing access was verified; this is not a deployed ScrollVerse agent runtime.", productionActive: "not-applicable" },
  { id: "automations", name: "ChatGPT Automations", category: "ChatGPT connector", state: "verified-access", evidence: "Existing weekly Omniverse Fusion readiness automation is recorded", note: "This is a ChatGPT-side scheduled report, not a ScrollVerse production integration. No duplicate schedule was created.", productionActive: "not-applicable" },
];

export const engineRecords = [
  { id: "atlas", name: "Sovereign Atlas", focus: "Entities, relationships, source lineage and approval-gated handoffs", state: "blocked", evidence: "Atlas migration 0049 is present; prior protected preflight stopped because DATABASE_URL was empty.", href: "https://github.com/chaishillomnitech1/scrollverse-web-app/actions/runs/42836859687", next: "Restore environment configuration and pass the read-only preflight before any protected migration." },
  { id: "nexus", name: "Integration Nexus", focus: "Provider inventory, authentication, exact capabilities and health", state: "partial", evidence: "Provider code, dependencies and documentation have mixed evidence states.", next: "Connect safe provider observations to this registry; never infer authentication from connector availability." },
  { id: "deployment", name: "Deployment Intelligence", focus: "Repositories, branches, Actions, Vercel and public routes", state: "partial", evidence: "GitHub read access and route source were inspected; Vercel commit checks succeeded, but live production snapshot is pending.", href: "https://github.com/chaishillomnitech1/scrollverse-web-app", next: "Capture current deployment ID, environment, alias, commit SHA and timestamp." },
  { id: "legion", name: "AI Legion Router", focus: "Specialist capabilities, scoped authorization and freshness", state: "partial", evidence: "Capability registry and 15-minute freshness policy exist; live runtime capability observations were not retrieved.", next: "Expose exact capability evidence with timestamps and action-level scopes." },
  { id: "creator", name: "Creator & Commerce", focus: "Books, music, Academy, membership, NFTs and payments", state: "partial", evidence: "Product surfaces and provider code exist; Stripe audit identifies test-mode configuration.", href: "https://github.com/chaishillomnitech1/scrollverse-web-app/blob/main/docs/phase782-financial-route-verification.md", next: "Map each customer journey to its actual provider, environment and release gate." },
  { id: "archive", name: "Eternal Archive", focus: "Original conversations, files, hashes, screenshots and provenance", state: "review", evidence: "Archive repositories exist; archive-named repositories were observed as public and Issue #13 remains the review record.", href: "https://github.com/chaishillomnitech1/scrollverse-web-app/issues/13", next: "Complete content and history review without changing repository visibility." },
] as const;

export const approvalBoundaries = [
  { action: "Read source, metadata and public provider evidence", gate: "Allowed within current read-only scope" },
  { action: "Draft code, tests and additive documentation", gate: "Allowed on this feature branch" },
  { action: "Open a reviewable draft pull request", gate: "Review boundary; no merge or deployment" },
  { action: "Production migration, deployment or secret change", gate: "Explicit owner approval and protected workflow required" },
  { action: "Provider writes, publishing, visibility changes or financial actions", gate: "Explicit owner approval required" },
] as const;
