import { SPECIALIST_CONSTELLATION } from "./specialistConstellation";

export type KnowledgeStatus = "implemented" | "documented" | "owner-review";

export type LegionKnowledgeRecord = {
  id: string;
  title: string;
  category: string;
  summary: string;
  href: string;
  status: KnowledgeStatus;
  boundary: string;
  color: string;
};

export const LEGION_KNOWLEDGE_RECORDS: LegionKnowledgeRecord[] = [
  { id: "specialist-constellation", title: "Specialist Constellation", category: "First-party AI guide roles", summary: `${SPECIALIST_CONSTELLATION.length} named guide roles organize discovery, evidence, and professional handoffs across ScrollVerse.`, href: "/specialist-constellation", status: "implemented", boundary: "Assistive navigation only; no role acts as a clinician, bank, court, legal authority, or private-system operator.", color: "#B98CFF" },
  { id: "evidence-standards", title: "Evidence & Standards", category: "Source discipline", summary: "A visible way to distinguish implemented work, owner review, external dependencies, and concept records.", href: "/evidence-standards", status: "implemented", boundary: "A source record does not itself establish clearance, rights, certification, or third-party activation.", color: "#FFB800" },
  { id: "github-operations", title: "GitHub Operations", category: "Continuity and review", summary: "Routes first-party repository evidence through review, tests, and owner-controlled release decisions.", href: "/github-ops", status: "implemented", boundary: "Never execute unreviewed code or expose credentials through a repository path.", color: "#00D4FF" },
  { id: "revenue-operations", title: "Revenue Operations", category: "Readiness workflow", summary: "Organizes dependencies, records, and next steps for first-party revenue paths without claiming a transaction is active.", href: "/revenue-ops", status: "implemented", boundary: "No checkout, payout, pricing, token, inventory, or provider activation follows from a readiness record alone.", color: "#00FF88" },
  { id: "creator-media", title: "Creator Media Dock", category: "Media and provenance", summary: "A protected intake and discovery path for creator-provided images, audio, video, documents, and source notes.", href: "/media-dock", status: "implemented", boundary: "Submission does not create a public release, rights clearance, or distribution agreement.", color: "#FF8DB5" },
  { id: "continuity-memory", title: "If/Then/Else Continuity", category: "Recovery workflow", summary: "Documents the route-first, evidence-first restoration sequence used to recover ScrollVerse work after disruption.", href: "/empire-map", status: "documented", boundary: "Continuity documents preserve a record; they do not activate external systems.", color: "#FFB800" },
  { id: "connector-matrix", title: "Connector Integration Matrix", category: "Owner-reviewed integrations", summary: "Maps research, domain, marketplace, media, and operational connector lanes into explicit review gates.", href: "/revenue-ops", status: "documented", boundary: "Account mutations, posts, listings, payments, provider changes, and DNS actions remain owner-confirmed.", color: "#00D4FF" },
];

export const WORLD_LENS_SOURCES = [
  { id: "nasa-worldview", publisher: "NASA Earthdata", title: "Worldview", focus: "Earth-observation imagery layers", url: "https://worldview.earthdata.nasa.gov/", limitation: "Publisher-controlled coverage and interpretation; not private surveillance.", color: "#00D4FF" },
  { id: "usgs-earthquakes", publisher: "USGS", title: "Earthquake Hazards", focus: "Public earthquake information and hazard resources", url: "https://earthquake.usgs.gov/", limitation: "Not an emergency-alert replacement or safety direction.", color: "#FFB800" },
  { id: "nws", publisher: "National Weather Service", title: "Weather and warnings", focus: "Official U.S. weather and warning context", url: "https://www.weather.gov/", limitation: "Verify local official alerts and forecasts.", color: "#00FF88" },
  { id: "copernicus", publisher: "Copernicus", title: "Data Space Ecosystem", focus: "Public Earth-observation discovery", url: "https://dataspace.copernicus.eu/", limitation: "Access and license conditions remain publisher-controlled.", color: "#B98CFF" },
  { id: "openstreetmap", publisher: "OpenStreetMap", title: "Open map context", focus: "Community-maintained geographic data", url: "https://www.openstreetmap.org/", limitation: "Completeness and licensing must be evaluated for each use.", color: "#FF8DB5" },
  { id: "reliefweb", publisher: "ReliefWeb", title: "Humanitarian reports", focus: "Public situation reports and analysis", url: "https://reliefweb.int/", limitation: "Reports are source-specific and may be updated after publication.", color: "#FFB800" },
] as const;
