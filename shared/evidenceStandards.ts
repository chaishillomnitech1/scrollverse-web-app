export type EvidenceStatus = "FIRST_PARTY_IMPLEMENTED" | "IN_PROGRESS" | "EXTERNAL_OPTIONAL" | "CONCEPTUAL";

export type EvidenceSystem = {
  id: string;
  name: string;
  status: EvidenceStatus;
  href: string;
  evidence: string;
  boundary: string;
};

export const EVIDENCE_STATUS_META: Record<EvidenceStatus, { label: string; color: string; explanation: string }> = {
  FIRST_PARTY_IMPLEMENTED: { label: "First-party implemented", color: "#00FF88", explanation: "A working ScrollVerse route or controlled workflow exists in this project." },
  IN_PROGRESS: { label: "In progress", color: "#FFB800", explanation: "A defined project phase exists, but the capability remains under active development." },
  EXTERNAL_OPTIONAL: { label: "Optional external pathway", color: "#00D4FF", explanation: "A provider-owned or partner-controlled route may be useful, but it is not operated or guaranteed by ScrollVerse." },
  CONCEPTUAL: { label: "Conceptual", color: "#B98CFF", explanation: "A narrative, design, or research direction; it is not presented as a deployed technical capability." },
};

export const EVIDENCE_SYSTEMS: EvidenceSystem[] = [
  { id: "creator-provenance", name: "Creator provenance", status: "FIRST_PARTY_IMPLEMENTED", href: "/creator-workspace", evidence: "Authenticated consent profile, private collaboration requests, and private provenance records.", boundary: "A provenance record is not a legal ownership, license, valuation, or rights-transfer decision." },
  { id: "legion-commons", name: "Legion Commons", status: "FIRST_PARTY_IMPLEMENTED", href: "/legion-commons", evidence: "Opt-in, transparent exchange states and a real signed-in contribution path.", boundary: "No artificial activity is represented as a live interaction; the Legion has no autonomous authority." },
  { id: "signalworks", name: "Signalworks", status: "EXTERNAL_OPTIONAL", href: "/signalworks", evidence: "Source-labelled public handoffs to provider-owned film, music, livestream, and creator-tool routes.", boundary: "No partnership, placement, eligibility, submission, or distribution outcome is implied." },
  { id: "identity", name: "Identity system", status: "IN_PROGRESS", href: "/identity-system", evidence: "First-party concept-mark family, IP readiness inventory model, source notes, and release boundaries.", boundary: "Concept marks are not presented as registered trademarks, provider marks, or legal certifications." },
  { id: "manus-hero", name: "Manus Hero Codex", status: "FIRST_PARTY_IMPLEMENTED", href: "/manus-hero", evidence: "A first-party guide, workflow archive, capability map, and original story-development brief.", boundary: "The guide does not claim private platform access, autonomous authority, or hidden-system control." },
  { id: "story-research", name: "Story & speculative research", status: "CONCEPTUAL", href: "/manus-hero", evidence: "Original comic, podcast, cosmology, and future-world development materials are recorded as creative source work.", boundary: "Creative and metaphysical themes are not presented as deployed technology, verified evidence, real-world communication, or professional authority." },
  { id: "systems-map", name: "Systems Map", status: "IN_PROGRESS", href: "/systems-map", evidence: "A planned original map connecting first-party digital, creator, research, and speculative-world routes.", boundary: "Speculative and metaphysical themes will be clearly separated from implemented technology and real-world claims." },
];

export function summarizeEvidenceSystems(systems: EvidenceSystem[] = EVIDENCE_SYSTEMS) {
  return (Object.keys(EVIDENCE_STATUS_META) as EvidenceStatus[]).map(status => ({
    status,
    count: systems.filter(system => system.status === status).length,
  }));
}
