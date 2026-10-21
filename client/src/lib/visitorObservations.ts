export type VisitorObservationCategory = "reach" | "engagement" | "quality";

export type VisitorObservation = {
  id: string;
  label: string;
  metric: "page-views" | "visits" | "visitors" | "duration" | "bounce-rate";
  category: VisitorObservationCategory;
  value: number;
  displayValue: string;
  sourceLabel: string;
  observationWindow: string;
  detail: string;
};

export type VisitorObservationStatus = "elevated" | "watch" | "context";

export const VISITOR_OBSERVATIONS: readonly VisitorObservation[] = [
  { id: "oct20-views-724", label: "Page views", metric: "page-views", category: "reach", value: 724, displayValue: "724", sourceLabel: "owner-shared analytics screenshot · IMG_1568.jpeg · 2026-10-20", observationWindow: "Last 24 hours shown in the capture", detail: "Aggregate page-view value visibly displayed in the supplied first-party dashboard screenshot." },
  { id: "oct20-visits-15", label: "Visits", metric: "visits", category: "reach", value: 15, displayValue: "15", sourceLabel: "owner-shared analytics screenshot · IMG_1568.jpeg · 2026-10-20", observationWindow: "Last 24 hours shown in the capture", detail: "Aggregate visit value visibly displayed in the supplied first-party dashboard screenshot." },
  { id: "oct20-visitors-12", label: "Visitors", metric: "visitors", category: "reach", value: 12, displayValue: "12", sourceLabel: "owner-shared analytics screenshot · IMG_1568.jpeg · 2026-10-20", observationWindow: "Last 24 hours shown in the capture", detail: "Aggregate visitor value visibly displayed in the supplied first-party dashboard screenshot; no identity is inferred." },
  { id: "oct20-duration-701", label: "Average duration", metric: "duration", category: "engagement", value: 421, displayValue: "7m 01s", sourceLabel: "owner-shared analytics screenshot · IMG_1568.jpeg · 2026-10-20", observationWindow: "Last 24 hours shown in the capture", detail: "Displayed duration converted to seconds only to support local sorting." },
  { id: "oct20-bounce-533", label: "Bounce rate", metric: "bounce-rate", category: "quality", value: 53.3, displayValue: "53.3%", sourceLabel: "owner-shared analytics screenshot · IMG_1568.jpeg · 2026-10-20", observationWindow: "Last 24 hours shown in the capture", detail: "Displayed aggregate bounce-rate value; no cause or attribution is inferred." },
  { id: "views-353", label: "Page views", metric: "page-views", category: "reach", value: 353, displayValue: "353", sourceLabel: "owner-shared aggregate dashboard capture · Phase 539", observationWindow: "Displayed capture; reporting window not fully visible", detail: "Aggregate page-view value transcribed from the supplied dashboard capture." },
  { id: "visits-99", label: "Visits", metric: "visits", category: "reach", value: 99, displayValue: "99", sourceLabel: "owner-shared aggregate dashboard capture · Phase 539", observationWindow: "Displayed capture; reporting window not fully visible", detail: "Aggregate visit value transcribed from the supplied dashboard capture." },
  { id: "visitors-61", label: "Visitors", metric: "visitors", category: "reach", value: 61, displayValue: "61", sourceLabel: "owner-shared aggregate dashboard capture · Phase 539", observationWindow: "Displayed capture; reporting window not fully visible", detail: "Aggregate visitor value transcribed from the supplied dashboard capture; no identity is inferred." },
  { id: "duration-820", label: "Average duration", metric: "duration", category: "engagement", value: 500, displayValue: "8m 20s", sourceLabel: "owner-shared aggregate dashboard capture · Phase 539", observationWindow: "Displayed capture; reporting window not fully visible", detail: "Displayed duration converted to seconds only to support local sorting." },
  { id: "duration-818", label: "Average duration", metric: "duration", category: "engagement", value: 498, displayValue: "8m 18s", sourceLabel: "owner-shared aggregate dashboard capture · Phase 539", observationWindow: "Later displayed capture", detail: "Later displayed duration converted to seconds only to support local sorting." },
  { id: "bounce-485", label: "Bounce rate", metric: "bounce-rate", category: "quality", value: 48.5, displayValue: "48.5%", sourceLabel: "owner-shared aggregate dashboard capture · Phase 539", observationWindow: "Displayed capture; reporting window not fully visible", detail: "Displayed aggregate bounce-rate value; no cause or attribution is inferred." },
  { id: "bounce-490", label: "Bounce rate", metric: "bounce-rate", category: "quality", value: 49, displayValue: "49%", sourceLabel: "owner-shared aggregate dashboard capture · Phase 539", observationWindow: "Later displayed capture", detail: "Later displayed aggregate bounce-rate value; no cause or attribution is inferred." },
];

export function filterVisitorObservations(category: "all" | VisitorObservationCategory, query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return VISITOR_OBSERVATIONS.filter((observation) => {
    if (category !== "all" && observation.category !== category) return false;
    if (!normalizedQuery) return true;
    return [
      observation.id,
      observation.label,
      observation.metric,
      observation.category,
      observation.displayValue,
      observation.sourceLabel,
      observation.observationWindow,
      observation.detail,
    ].some((field) => field.toLocaleLowerCase().includes(normalizedQuery));
  });
}

export function getVisitorObservationStatus(observation: VisitorObservation): VisitorObservationStatus {
  if (observation.metric === "bounce-rate") return observation.value >= 50 ? "watch" : "context";
  if (observation.metric === "duration") return observation.value >= 480 ? "elevated" : "context";
  if (observation.metric === "page-views") return observation.value >= 700 ? "elevated" : "context";
  if (observation.metric === "visits") return observation.value >= 15 ? "elevated" : "context";
  if (observation.metric === "visitors") return observation.value >= 12 ? "elevated" : "context";
  return "context";
}

export function sortVisitorObservations(
  observations: readonly VisitorObservation[],
  sort: "value-asc" | "value-desc" | "label-asc",
) {
  return [...observations].sort((a, b) => {
    if (sort === "label-asc") return a.label.localeCompare(b.label) || a.id.localeCompare(b.id);
    return sort === "value-asc" ? a.value - b.value : b.value - a.value;
  });
}
