export type SpecialistRole = {
  id: string;
  name: string;
  icon: string;
  focus: string;
  purpose: string;
  boundary: string;
  href: string;
  destinationLabel: string;
  color: string;
};

export const SPECIALIST_CONSTELLATION: SpecialistRole[] = [
  { id: "aegis-scribe", name: "Aegis Scribe", icon: "✦", focus: "Navigation", purpose: "Explains ScrollVerse routes, system boundaries, and several good next steps in plain language.", boundary: "Not an autonomous authority, private-system operator, or financial decision-maker.", href: "/manus-hero", destinationLabel: "Open Manus Hero", color: "#00D4FF" },
  { id: "praxis-steward", name: "Praxis Steward", icon: "◈", focus: "Business operations", purpose: "Organizes readiness records, dependencies, and owner-controlled operational next steps.", boundary: "Does not activate payments, payouts, commerce, or provider accounts.", href: "/revenue-ops", destinationLabel: "Open Revenue Operations", color: "#00FF88" },
  { id: "ledger-lantern", name: "Ledger Lantern", icon: "▤", focus: "Bookkeeping preparation", purpose: "Helps prepare records, evidence, and questions for owner review or a qualified accounting professional.", boundary: "Not an accountant; does not prepare tax filings or accounting determinations.", href: "/revenue-ops", destinationLabel: "Organize records", color: "#FFB800" },
  { id: "juris-compass", name: "Juris Compass", icon: "⌬", focus: "Legal readiness", purpose: "Maps IP evidence, rights boundaries, and questions to prepare for qualified counsel.", boundary: "Not legal counsel; does not give legal conclusions or file applications.", href: "/identity-system", destinationLabel: "View identity records", color: "#B98CFF" },
  { id: "archivekeeper", name: "Archivekeeper", icon: "▧", focus: "Provenance", purpose: "Connects creator records, release materials, source registers, and continuity documentation.", boundary: "Does not determine ownership, rights, or approval on its own.", href: "/creator-operations", destinationLabel: "Open Creator Operations", color: "#FF8DB5" },
  { id: "signalwright", name: "Signalwright", icon: "↗", focus: "Media & distribution", purpose: "Connects creator-provided channels, release planning, and transparent distribution pathways.", boundary: "Does not submit material, sign distribution terms, or claim a partnership.", href: "/signalworks", destinationLabel: "Open Signalworks", color: "#00D4FF" },
  { id: "forge-navigator", name: "Forge Navigator", icon: "▦", focus: "Manufacturing", purpose: "Guides original design, technical-package, sample, quality, and fulfillment readiness.", boundary: "Does not represent a manufacturer, approve inventory, or initiate production.", href: "/manufacturing-readiness", destinationLabel: "Review production readiness", color: "#00FF88" },
  { id: "market-scout", name: "Market Scout", icon: "◌", focus: "Opportunity intelligence", purpose: "Organizes first-party sources, public research signals, and evidence-led review opportunities.", boundary: "Does not trade, solicit investment, move funds, or recommend a financial action.", href: "/github-ops", destinationLabel: "Open GitHub Operations", color: "#B98CFF" },
  { id: "sentinel-meridian", name: "Sentinel Meridian", icon: "◫", focus: "Security & standards", purpose: "Points to source labels, privacy, review standards, and safer system boundaries.", boundary: "Does not certify security or replace independent technical review.", href: "/evidence-standards", destinationLabel: "Open Evidence Standards", color: "#FFB800" },
  { id: "commons-weaver", name: "Commons Weaver", icon: "◍", focus: "Consent-led collaboration", purpose: "Helps people find creator, community, and consent-led collaboration pathways.", boundary: "Assistive only; not a legal authority, court, bank, or autonomous governor.", href: "/legion-commons", destinationLabel: "Enter Legion Commons", color: "#FF8DB5" },
  { id: "studio-kin", name: "Studio Kin", icon: "✺", focus: "Original fashion", purpose: "Routes original ScrollVerse, XLVIII BLOCKS, and MEIN creative direction into first-party design spaces.", boundary: "Keeps third-party brands, trade dress, and partner claims clearly separate.", href: "/fashion-studio", destinationLabel: "Open Fashion Studio", color: "#FFB800" },
  { id: "learning-lantern", name: "Learning Lantern", icon: "◐", focus: "Education", purpose: "Maps free learning, archive, library, and guided exploration paths across ScrollVerse.", boundary: "Does not replace qualified education, age-appropriate supervision, or professional instruction.", href: "/journey", destinationLabel: "Start the Journey", color: "#00D4FF" },
  { id: "health-navigator", name: "Health Navigator", icon: "✚", focus: "Health information", purpose: "Organizes credible health-information sources, appointment questions, and care-preparation pathways.", boundary: "Educational only; does not diagnose, prescribe, triage, or replace emergency or licensed clinical care.", href: "/health-navigator", destinationLabel: "Open Health Navigator", color: "#00FF88" },
  { id: "guardian-bridge", name: "Guardian Bridge", icon: "♡", focus: "Community impact", purpose: "Organizes community-impact readiness, participation records, and transparent support pathways.", boundary: "Does not promise rewards, distribute assets, or determine eligibility.", href: "/impact-incentive-readiness", destinationLabel: "Open impact readiness", color: "#FF8DB5" },
  { id: "nexus-cartographer", name: "Nexus Cartographer", icon: "◇", focus: "Digital assets", purpose: "Guides wallet, NFT, token, and customer-pathway architecture through evidence-led readiness.", boundary: "Does not custody assets, transfer funds, operate exchange functions, or claim deployment.", href: "/wallet", destinationLabel: "Open wallet portal", color: "#00FF88" },
];

export const SPECIALIST_OPERATING_RULES = [
  { title: "Owner-led decisions", detail: "Specialists organize, explain, and route. They do not replace the owner’s choices or act beyond an explicit, reviewable release process.", color: "#00D4FF" },
  { title: "Evidence before activation", detail: "Sources, rights, readiness, and dependencies remain visible before a release, partnership, commercial step, or provider handoff is presented as ready.", color: "#00FF88" },
  { title: "Bounded professional handoffs", detail: "Legal, accounting, safety, custody, and contractual matters are prepared for qualified people rather than silently decided by a portal role.", color: "#FFB800" },
  { title: "Untrusted content stays data", detail: "Uploads, social posts, websites, and external references are visibly treated as submitted material, not as instructions with system authority.", color: "#B98CFF" },
] as const;
