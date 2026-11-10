import {
  validateCapabilitySnapshot,
  type CapabilitySnapshot,
  type DeploymentObservation,
} from "../atlas/execution-control";

type FetchLike = typeof fetch;
type Clock = () => Date;

type AdapterEnvironment = {
  GITHUB_READ_TOKEN?: string;
  GITHUB_EVIDENCE_REPOSITORY?: string;
  VERCEL_READ_TOKEN?: string;
  VERCEL_EVIDENCE_PROJECT_ID?: string;
  VERCEL_TEAM_ID?: string;
};

export type GitHubCheckSummary = {
  total: number;
  completed: number;
  successful: number;
  failed: number;
  pending: number;
};

export type GitHubEvidenceResult = {
  capability: CapabilitySnapshot;
  repository: {
    fullName: string;
    url: string;
    visibility: "public" | "private";
    defaultBranch: string;
  } | null;
  commit: {
    sha: string;
    url: string;
    message: string;
    authoredAt: string | null;
  } | null;
  checks: GitHubCheckSummary | null;
};

export type VercelEvidenceResult = {
  capability: CapabilitySnapshot;
  deployments: DeploymentObservation[];
};

const GITHUB_API = "https://api.github.com";
const VERCEL_API = "https://api.vercel.com";

function capability(
  input: Omit<CapabilitySnapshot, "checkedAt" | "evidenceRef"> & {
    checkedAt?: string | null;
    evidenceRef?: string | null;
  },
): CapabilitySnapshot {
  const snapshot: CapabilitySnapshot = {
    ...input,
    checkedAt: input.checkedAt ?? null,
    evidenceRef: input.evidenceRef ?? null,
  };
  validateCapabilitySnapshot(snapshot);
  return snapshot;
}

async function getJson(
  fetchImpl: FetchLike,
  url: string,
  token: string,
  provider: "github" | "vercel",
): Promise<{ ok: true; data: any } | { ok: false; status: number }> {
  const response = await fetchImpl(url, {
    method: "GET",
    headers: provider === "github"
      ? {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        }
      : {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) return { ok: false, status: response.status };
  return { ok: true, data: await response.json() };
}

/**
 * Read-only GitHub evidence adapter. It fetches repository metadata, a commit,
 * and that commit's check runs. It never creates refs, comments, PRs, or writes.
 */
export async function readGitHubEvidence(options: {
  env?: AdapterEnvironment;
  fetchImpl?: FetchLike;
  now?: Clock;
  repository?: string;
  ref?: string;
} = {}): Promise<GitHubEvidenceResult> {
  const env = options.env ?? process.env;
  const fetchImpl = options.fetchImpl ?? fetch;
  const repositoryName = (options.repository ?? env.GITHUB_EVIDENCE_REPOSITORY ?? "chaishillomnitech1/scrollverse-web-app").trim();
  const token = env.GITHUB_READ_TOKEN?.trim();
  const base = {
    capabilityId: "github.repository.commit-checks.read",
    provider: "github" as const,
    domain: "source_control" as const,
    action: "read repository metadata, commit metadata, and commit check runs",
  };

  if (!token) {
    return {
      capability: capability({
        ...base, state: "NOT_CHECKED",
        limitation: "GITHUB_READ_TOKEN is not configured; no provider request was made.",
      }),
      repository: null, commit: null, checks: null,
    };
  }

  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repositoryName)) {
    return {
      capability: capability({ ...base, state: "UNAVAILABLE", checkedAt: (options.now ?? (() => new Date()))().toISOString(), limitation: "Repository must use owner/name format." }),
      repository: null, commit: null, checks: null,
    };
  }

  const checkedAt = (options.now ?? (() => new Date()))().toISOString();
  const repoUrl = `${GITHUB_API}/repos/${repositoryName}`;
  const repoResponse = await getJson(fetchImpl, repoUrl, token, "github");
  if (!repoResponse.ok) {
    return {
      capability: capability({ ...base, state: "UNAVAILABLE", checkedAt, evidenceRef: repoUrl, limitation: `GitHub repository read returned HTTP ${repoResponse.status}.` }),
      repository: null, commit: null, checks: null,
    };
  }

  const repo = repoResponse.data;
  const ref = options.ref?.trim() || repo.default_branch;
  const commitUrl = `${GITHUB_API}/repos/${repositoryName}/commits/${encodeURIComponent(ref)}`;
  const commitResponse = await getJson(fetchImpl, commitUrl, token, "github");
  if (!commitResponse.ok) {
    return {
      capability: capability({ ...base, state: "UNAVAILABLE", checkedAt, evidenceRef: commitUrl, limitation: `GitHub commit read returned HTTP ${commitResponse.status}.` }),
      repository: {
        fullName: repo.full_name,
        url: repo.html_url,
        visibility: repo.private ? "private" : "public",
        defaultBranch: repo.default_branch,
      },
      commit: null, checks: null,
    };
  }

  const commit = commitResponse.data;
  const sha = String(commit.sha ?? "");
  const checksUrl = `${GITHUB_API}/repos/${repositoryName}/commits/${sha}/check-runs?per_page=100`;
  const checksResponse = await getJson(fetchImpl, checksUrl, token, "github");
  if (!checksResponse.ok) {
    return {
      capability: capability({ ...base, state: "UNAVAILABLE", checkedAt, evidenceRef: checksUrl, limitation: `GitHub check-run read returned HTTP ${checksResponse.status}.` }),
      repository: {
        fullName: repo.full_name,
        url: repo.html_url,
        visibility: repo.private ? "private" : "public",
        defaultBranch: repo.default_branch,
      },
      commit: {
        sha, url: commit.html_url, message: String(commit.commit?.message ?? "").split("\n")[0],
        authoredAt: commit.commit?.author?.date ?? null,
      },
      checks: null,
    };
  }

  const checkRuns = Array.isArray(checksResponse.data.check_runs) ? checksResponse.data.check_runs : [];
  const summary: GitHubCheckSummary = {
    total: checkRuns.length,
    completed: checkRuns.filter((item: any) => item.status === "completed").length,
    successful: checkRuns.filter((item: any) => item.status === "completed" && item.conclusion === "success").length,
    failed: checkRuns.filter((item: any) => item.status === "completed" && ["failure", "timed_out", "action_required", "cancelled"].includes(item.conclusion)).length,
    pending: checkRuns.filter((item: any) => item.status !== "completed").length,
  };

  return {
    capability: capability({ ...base, state: "AUTHORIZED", checkedAt, evidenceRef: commit.html_url, limitation: null }),
    repository: {
      fullName: repo.full_name,
      url: repo.html_url,
      visibility: repo.private ? "private" : "public",
      defaultBranch: repo.default_branch,
    },
    commit: {
      sha,
      url: commit.html_url,
      message: String(commit.commit?.message ?? "").split("\n")[0],
      authoredAt: commit.commit?.author?.date ?? null,
    },
    checks: summary,
  };
}

/**
 * Read-only Vercel adapter. It lists recent deployments for one configured
 * project and normalizes preview/production state without triggering builds.
 */
export async function readVercelEvidence(options: {
  env?: AdapterEnvironment;
  fetchImpl?: FetchLike;
  now?: Clock;
} = {}): Promise<VercelEvidenceResult> {
  const env = options.env ?? process.env;
  const fetchImpl = options.fetchImpl ?? fetch;
  const token = env.VERCEL_READ_TOKEN?.trim();
  const projectId = env.VERCEL_EVIDENCE_PROJECT_ID?.trim();
  const base = {
    capabilityId: "vercel.project.deployments.read",
    provider: "vercel" as const,
    domain: "deployment" as const,
    action: "read recent deployment status for the configured Vercel project",
  };

  if (!token || !projectId) {
    const missing = [!token ? "VERCEL_READ_TOKEN" : null, !projectId ? "VERCEL_EVIDENCE_PROJECT_ID" : null].filter(Boolean).join(" and ");
    return {
      capability: capability({
        ...base, state: "NOT_CHECKED",
        limitation: `${missing} is not configured; no provider request was made.`,
      }),
      deployments: [],
    };
  }

  const checkedAt = (options.now ?? (() => new Date()))().toISOString();
  const url = new URL(`${VERCEL_API}/v6/deployments`);
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("limit", "10");
  if (env.VERCEL_TEAM_ID?.trim()) url.searchParams.set("teamId", env.VERCEL_TEAM_ID.trim());

  const response = await getJson(fetchImpl, url.toString(), token, "vercel");
  if (!response.ok) {
    return {
      capability: capability({ ...base, state: "UNAVAILABLE", checkedAt, evidenceRef: url.toString(), limitation: `Vercel deployment read returned HTTP ${response.status}.` }),
      deployments: [],
    };
  }

  const deployments: DeploymentObservation[] = (Array.isArray(response.data.deployments) ? response.data.deployments : []).map((item: any) => {
    const ready = String(item.readyState ?? item.state ?? "").toUpperCase();
    const state: DeploymentObservation["state"] =
      ready === "READY" ? "ready" :
      ready === "BUILDING" ? "building" :
      ready === "QUEUED" ? "queued" :
      ready === "ERROR" ? "failure" :
      ready === "CANCELED" ? "canceled" : "unknown";
    const target = String(item.target ?? "").toLowerCase();
    const environment: DeploymentObservation["environment"] =
      target === "production" ? "production" :
      target === "preview" ? "preview" : "unknown";
    const domain = typeof item.url === "string" && item.url.length > 0
      ? (item.url.startsWith("http") ? item.url : `https://${item.url}`)
      : null;
    return {
      provider: "vercel",
      environment,
      state,
      url: domain,
      commitSha: typeof item.meta?.githubCommitSha === "string" ? item.meta.githubCommitSha : null,
      observedAt: item.createdAt ? new Date(item.createdAt).toISOString() : checkedAt,
      sourceRef: `vercel:deployment:${String(item.uid ?? item.id ?? "unknown")}`,
    };
  });

  return {
    capability: capability({ ...base, state: "AUTHORIZED", checkedAt, evidenceRef: url.toString(), limitation: null }),
    deployments,
  };
}
