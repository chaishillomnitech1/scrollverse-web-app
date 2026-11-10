export type ObservationSource = "github-api" | "github-commit-status" | "owner-confirmed" | "vercel-github-comment";
export type ObservationEnvironment = "main" | "preview" | "unspecified";

export type ControlTowerObservation = {
  id: string;
  provider: "GitHub" | "Vercel";
  observedAt: string;
  source: ObservationSource;
  sourceLabel: string;
  sourceUrl: string;
  status: "merged" | "success" | "ready";
  environment: ObservationEnvironment;
  commitSha?: string;
  deploymentId?: string;
  deploymentUrl?: string;
  details: string;
};

export const controlTowerObservations: ControlTowerObservation[] = [
  {
    id: "github-pr-22-merge",
    provider: "GitHub",
    observedAt: "2026-11-10T16:03:46Z",
    source: "github-api",
    sourceLabel: "GitHub pull request and merge commit",
    sourceUrl: "https://github.com/chaishillomnitech1/scrollverse-web-app/commit/6594fdb04190263aa3edf81c6ab78d5270907873",
    status: "merged",
    environment: "main",
    commitSha: "6594fdb04190263aa3edf81c6ab78d5270907873",
    details: "PR #22 was merged into main. The six-engine dashboard and both route aliases are present in the merged source.",
  },
  {
    id: "vercel-main-commit-status",
    provider: "Vercel",
    observedAt: "2026-11-10",
    source: "github-commit-status",
    sourceLabel: "Vercel context returned by GitHub commit status",
    sourceUrl: "https://vercel.com/chaishill999hz-5342s-projects/voltron-omni-hq-uxtq/53qCkDgQ8FTgbhYUkKbR71UiU274",
    status: "success",
    environment: "unspecified",
    commitSha: "6594fdb04190263aa3edf81c6ab78d5270907873",
    details: "The Vercel commit-status context returned success for the merge commit. The status response does not identify a deployment environment, deployment ID, or deployed-site URL.",
  },
  {
    id: "vercel-pr-22-preview-ready",
    provider: "Vercel",
    observedAt: "2026-11-10",
    source: "owner-confirmed",
    sourceLabel: "Owner-supplied PR activity record",
    sourceUrl: "https://github.com/chaishillomnitech1/scrollverse-web-app/pull/22",
    status: "ready",
    environment: "preview",
    commitSha: "39777ad7b088adbd233ea1a22365cd43b6da154b",
    details: "The PR activity record reports the Vercel Preview deployment as Ready. The deployment ID and direct preview URL were not included in the supplied record.",
  },
  {
    id: "vercel-pr-24-preview-ready",
    provider: "Vercel",
    observedAt: "2026-11-10T16:19:53.072Z",
    source: "vercel-github-comment",
    sourceLabel: "Vercel deployment comment on PR #24",
    sourceUrl: "https://github.com/chaishillomnitech1/scrollverse-web-app/pull/24",
    status: "ready",
    environment: "preview",
    commitSha: "0cdea6fc6b48f5709dcd1fd99cd21477a1d82182",
    deploymentId: "EnC54eaKzEBk6juACrQquqqNPVix",
    deploymentUrl: "https://voltron-omni-hq-uxtq-git-c-c2b288-chaishill999hz-5342s-projects.vercel.app",
    details: "Vercel's GitHub bot reports the Preview deployment as Ready for the follow-up branch. This is a Preview deployment, not a claim that the Production alias has been promoted.",
  },
  {
    id: "vercel-main-commit-ready",
    provider: "Vercel",
    observedAt: "2026-11-10",
    source: "github-commit-status",
    sourceLabel: "Vercel context returned by GitHub status on main",
    sourceUrl: "https://vercel.com/chaishill999hz-5342s-projects/voltron-omni-hq-uxtq/8XNGuDwiMBeEHhQuLJNGc8X68ocP",
    status: "success",
    environment: "unspecified",
    commitSha: "10bc330ed89be638390e609098debc950477e668",
    details: "The Vercel status context returned success for the PR #24 merge commit on main. The status response does not expose the deployment environment, production alias, or direct deployed-site URL.",
  },
];
