import { describe, expect, it, vi } from "vitest";
import { readGitHubEvidence, readVercelEvidence } from "./provider-evidence";

function jsonResponse(data: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  } as Response;
}

const fixedNow = () => new Date("2026-11-10T15:00:00.000Z");

describe("read-only provider evidence adapters", () => {
  it("does not contact GitHub when its read token is missing", async () => {
    const fetchImpl = vi.fn();
    const result = await readGitHubEvidence({ env: {}, fetchImpl, now: fixedNow });
    expect(result.capability.state).toBe("NOT_CHECKED");
    expect(result.capability.limitation).toContain("GITHUB_READ_TOKEN");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("reads GitHub repository, commit, and check-run evidence", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce(jsonResponse({
        full_name: "chaishillomnitech1/scrollverse-web-app",
        html_url: "https://github.com/chaishillomnitech1/scrollverse-web-app",
        private: false,
        default_branch: "main",
      }))
      .mockResolvedValueOnce(jsonResponse({
        sha: "a".repeat(40),
        html_url: "https://github.com/chaishillomnitech1/scrollverse-web-app/commit/" + "a".repeat(40),
        commit: { message: "Add verified provider evidence", author: { date: "2026-11-10T14:00:00.000Z" } },
      }))
      .mockResolvedValueOnce(jsonResponse({
        check_runs: [
          { status: "completed", conclusion: "success" },
          { status: "completed", conclusion: "failure" },
          { status: "in_progress", conclusion: null },
        ],
      }));

    const result = await readGitHubEvidence({
      env: { GITHUB_READ_TOKEN: "test-token" },
      fetchImpl,
      now: fixedNow,
    });

    expect(result.capability.state).toBe("AUTHORIZED");
    expect(result.capability.checkedAt).toBe("2026-11-10T15:00:00.000Z");
    expect(result.repository?.defaultBranch).toBe("main");
    expect(result.commit?.sha).toBe("a".repeat(40));
    expect(result.checks).toEqual({ total: 3, completed: 2, successful: 1, failed: 1, pending: 1 });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    for (const call of fetchImpl.mock.calls) {
      const init = call[1] as RequestInit;
      expect(init.method).toBe("GET");
      expect((init.headers as Record<string, string>).Authorization).toBe("Bearer test-token");
    }
  });

  it("records a failed GitHub permission check without leaking response content", async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(jsonResponse({ message: "secret provider detail" }, 403));
    const result = await readGitHubEvidence({
      env: { GITHUB_READ_TOKEN: "test-token" },
      fetchImpl,
      now: fixedNow,
    });
    expect(result.capability.state).toBe("UNAVAILABLE");
    expect(result.capability.limitation).toContain("HTTP 403");
    expect(result.capability.limitation).not.toContain("secret provider detail");
  });

  it("does not contact Vercel until token and project ID are configured", async () => {
    const fetchImpl = vi.fn();
    const result = await readVercelEvidence({
      env: { VERCEL_READ_TOKEN: "test-token" },
      fetchImpl,
      now: fixedNow,
    });
    expect(result.capability.state).toBe("NOT_CHECKED");
    expect(result.capability.limitation).toContain("VERCEL_EVIDENCE_PROJECT_ID");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("normalizes recent Vercel deployments into sourced observations", async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(jsonResponse({
      deployments: [
        {
          uid: "dpl-preview-1", target: "preview", readyState: "READY",
          url: "scrollverse-preview.example", createdAt: 1794322800000,
          meta: { githubCommitSha: "b".repeat(40) },
        },
        {
          uid: "dpl-production-2", target: "production", readyState: "BUILDING",
          url: "scrollverse-production.example", createdAt: 1794322800000,
          meta: {},
        },
      ],
    }));

    const result = await readVercelEvidence({
      env: {
        VERCEL_READ_TOKEN: "test-vercel-token",
        VERCEL_EVIDENCE_PROJECT_ID: "prj_scrollverse",
        VERCEL_TEAM_ID: "team_scrollverse",
      },
      fetchImpl,
      now: fixedNow,
    });

    expect(result.capability.state).toBe("AUTHORIZED");
    expect(result.deployments).toHaveLength(2);
    expect(result.deployments[0]).toMatchObject({
      provider: "vercel", environment: "preview", state: "ready",
      url: "https://scrollverse-preview.example", commitSha: "b".repeat(40),
    });
    expect(result.deployments[1]).toMatchObject({
      environment: "production", state: "building",
      url: "https://scrollverse-production.example",
    });
    const requestedUrl = new URL(fetchImpl.mock.calls[0][0] as string);
    expect(requestedUrl.searchParams.get("projectId")).toBe("prj_scrollverse");
    expect(requestedUrl.searchParams.get("teamId")).toBe("team_scrollverse");
    expect((fetchImpl.mock.calls[0][1] as RequestInit).method).toBe("GET");
  });

  it("keeps Vercel authorization failures unavailable", async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(jsonResponse({}, 401));
    const result = await readVercelEvidence({
      env: { VERCEL_READ_TOKEN: "bad-token", VERCEL_EVIDENCE_PROJECT_ID: "prj_scrollverse" },
      fetchImpl,
      now: fixedNow,
    });
    expect(result.capability.state).toBe("UNAVAILABLE");
    expect(result.capability.limitation).toContain("HTTP 401");
    expect(result.deployments).toEqual([]);
  });
});
