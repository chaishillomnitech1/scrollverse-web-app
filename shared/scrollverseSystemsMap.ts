export type SystemsMapStatus = "IMPLEMENTED" | "IN_PROGRESS" | "EXTERNAL_OPTIONAL" | "CONCEPTUAL" | "GATED";

export type SystemsMapNode = {
  title: string;
  href: string;
  summary: string;
  status: SystemsMapStatus;
};

export type SystemsMapLayer = {
  id: string;
  name: string;
  signal: string;
  summary: string;
  nodes: SystemsMapNode[];
};

export const SYSTEMS_MAP_STATUS: Record<SystemsMapStatus, { label: string; color: string; explanation: string }> = {
  IMPLEMENTED: { label: "Implemented", color: "#00FF88", explanation: "A first-party ScrollVerse route or controlled workflow exists." },
  IN_PROGRESS: { label: "In progress", color: "#FFB800", explanation: "A defined phase is actively being built and has not been presented as complete." },
  EXTERNAL_OPTIONAL: { label: "External optional", color: "#00D4FF", explanation: "A provider-owned or partner-controlled path may be useful but is not operated by ScrollVerse." },
  CONCEPTUAL: { label: "Conceptual", color: "#B98CFF", explanation: "A creative, narrative, or research direction rather than a deployed technical capability." },
  GATED: { label: "Gated", color: "#FF8DB5", explanation: "The design is available, while activation requires verified evidence, review, or explicit authorization." },
};

export const SCROLLVERSE_SYSTEMS_MAP: SystemsMapLayer[] = [
  {
    id: "front-door",
    name: "The Public ScrollVerse",
    signal: "ENTRY · ORIENTATION · IDENTITY",
    summary: "The visible first-party gateway for visitors who want to understand the world, find a route, and see the status of key systems.",
    nodes: [
      { title: "ScrollVerse Home", href: "/", summary: "Primary entrance and discovery field.", status: "IMPLEMENTED" },
      { title: "Journey Navigator", href: "/journey", summary: "Intent-based routes through the portal.", status: "IMPLEMENTED" },
      { title: "Identity System", href: "/identity-system", summary: "Concept marks, origin records, and release boundaries.", status: "IN_PROGRESS" },
      { title: "Evidence & Standards", href: "/evidence-standards", summary: "Public status language and first-party system register.", status: "IMPLEMENTED" },
    ],
  },
  {
    id: "creator-culture",
    name: "Creator & Culture Network",
    signal: "ORIGIN · COLLABORATION · DISTRIBUTION",
    summary: "A consent-led path for original work, private collaboration, public discovery, and responsibly sourced media handoffs.",
    nodes: [
      { title: "Convergence Commons", href: "/commons", summary: "Original ideas, personal signatures, and discovery pathways.", status: "IMPLEMENTED" },
      { title: "Creator Workspace", href: "/creator-workspace", summary: "Authenticated consent profiles, private requests, and provenance records.", status: "IMPLEMENTED" },
      { title: "Signalworks", href: "/signalworks", summary: "Source-labelled film, music, livestream, and creator-tool handoffs.", status: "EXTERNAL_OPTIONAL" },
      { title: "Think Space", href: "/think-space", summary: "Community publishing and knowledge exchange surface.", status: "IMPLEMENTED" },
    ],
  },
  {
    id: "intelligence",
    name: "Digital Intelligence Commons",
    signal: "GUIDANCE · LEARNING · TRANSPARENT EXCHANGE",
    summary: "An original network for visitor guidance, open exchange, and reviewed digital-intelligence experiences with visible activity states.",
    nodes: [
      { title: "AI Legion Apex", href: "/ai-legion-apex", summary: "Directory and orientation for the ScrollVerse Legion.", status: "IMPLEMENTED" },
      { title: "Legion Commons", href: "/legion-commons", summary: "Opt-in visible exchange; human, system, and awaiting-interaction states stay distinct.", status: "IMPLEMENTED" },
      { title: "Manus Hero Codex", href: "/manus-hero", summary: "Original guide, workflow archive, and story-development surface.", status: "IMPLEMENTED" },
      { title: "AI Upload Intake", href: "/ai-chat-upload", summary: "File-enabled conversation and intake path.", status: "IMPLEMENTED" },
    ],
  },
  {
    id: "knowledge",
    name: "Knowledge, Archive & Research",
    signal: "LIBRARY · MEMORY · STUDY",
    summary: "The archive and learning layer for source-oriented study, sacred materials, public documentation, and long-form context.",
    nodes: [
      { title: "Scroll Library", href: "/scroll-library", summary: "Library route for ScrollVerse knowledge materials.", status: "IMPLEMENTED" },
      { title: "Seerah Archive", href: "/seerah", summary: "Sacred-history reading and learning pathways.", status: "IMPLEMENTED" },
      { title: "Mesopotamia Library", href: "/mesopotamia-library", summary: "Research and exploration wing with source boundaries.", status: "IMPLEMENTED" },
      { title: "Future Research Fields", href: "/evidence-standards", summary: "Creative and speculative research stays labelled separately from verified implementation.", status: "CONCEPTUAL" },
    ],
  },
  {
    id: "worlds",
    name: "Digital Worlds & Interactive Space",
    signal: "PLAY · STORY · IMMERSIVE ROUTES",
    summary: "Interactive routes, story worlds, and spatial experiments that remain distinct from real-world location, property, or infrastructure claims.",
    nodes: [
      { title: "StreamVerse", href: "/stream-verse", summary: "A ScrollVerse media and streaming-world route.", status: "IMPLEMENTED" },
      { title: "Gaming Hub", href: "/gaming-hub", summary: "Interactive entertainment and play discovery.", status: "IMPLEMENTED" },
      { title: "Nexus", href: "/nexus", summary: "A visual archive and connected portal node.", status: "IMPLEMENTED" },
      { title: "World-building Studio", href: "/manus-hero", summary: "Original comic, podcast, and future-world development material.", status: "CONCEPTUAL" },
    ],
  },
  {
    id: "careful-activation",
    name: "Careful Activation Layer",
    signal: "CONSENT · EVIDENCE · AUTHORIZATION",
    summary: "Systems that may carry commercial, rights, payment, token, or high-impact implications remain visibly gated until the required records and authorizations exist.",
    nodes: [
      { title: "Fashion Review", href: "/admin/fashion-review", summary: "Protected asset review and evidence workflow.", status: "GATED" },
      { title: "Atlantis Catalog", href: "/admin/atlantis-catalog", summary: "Fail-closed catalog operations console.", status: "GATED" },
      { title: "IP Readiness", href: "/identity-system", summary: "Source records and professional-review readiness, not formal registration.", status: "IN_PROGRESS" },
      { title: "External Release Paths", href: "/signalworks", summary: "Provider-controlled routes remain optional and subject to their own review.", status: "EXTERNAL_OPTIONAL" },
    ],
  },
];
