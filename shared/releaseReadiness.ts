export type ReleaseState = "READY_IN_PORTAL" | "OWNER_ACTION_REQUIRED" | "NOT_STARTED";

export type ReleaseGate = {
  id: string;
  title: string;
  state: ReleaseState;
  owner: string;
  detail: string;
};

export const RELEASE_GATES: ReleaseGate[] = [
  { id: "installable-web", title: "Installable web experience", state: "READY_IN_PORTAL", owner: "ScrollVerse project", detail: "Web manifest, service worker, install banner, and Launchpad are present in the portal." },
  { id: "support-contact", title: "Monitored release support contact", state: "OWNER_ACTION_REQUIRED", owner: "Publisher", detail: "A reliable, monitored support channel must be designated before any native-store submission." },
  { id: "privacy-disclosure", title: "Store-specific privacy disclosures", state: "OWNER_ACTION_REQUIRED", owner: "Publisher and qualified reviewer", detail: "The public privacy summary is available; each store’s required disclosure must be completed against the submitted build." },
  { id: "signed-build", title: "Signed native build", state: "NOT_STARTED", owner: "Authorized developer account holder", detail: "Native store delivery requires a platform-appropriate, signed build and its own build pipeline." },
  { id: "review-access", title: "Review access and metadata", state: "NOT_STARTED", owner: "Publisher", detail: "Screenshots, accurate metadata, test or review access, category selection, and release notes must match the submitted product." },
  { id: "submission", title: "Store submission", state: "NOT_STARTED", owner: "Owner confirmation", detail: "A final submission is an external action and remains inactive until the owner explicitly approves the completed release bundle." },
];

export const RELEASE_STATE_META: Record<ReleaseState, { label: string; color: string }> = {
  READY_IN_PORTAL: { label: "Ready in portal", color: "#00FF88" },
  OWNER_ACTION_REQUIRED: { label: "Owner action required", color: "#FFB800" },
  NOT_STARTED: { label: "Not started", color: "#8899AA" },
};
