import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 647 — Individual Episode 38–40 protected references", () => {
  it("builds dedicated source-led route records with reusable concepts and active-state boundaries", () => {
    const shared = read("client/src/components/ProtectedEpisodeWorkspace.tsx");
    const episode38 = read("client/src/pages/Episode38ExchangeMatrix.tsx");
    const episode39 = read("client/src/pages/Episode39ExchangePerimeter.tsx");
    const episode40 = read("client/src/pages/Episode40InfrastructureScaling.tsx");
    expect(shared).toContain('useSovereignHeartbeat({ page })');
    expect(shared).toContain('externalAction: "none"');
    expect(shared).toContain("EPISODIC OPERATIONS ARCHIVE");
    expect(episode38).toContain("The Sovereign Exchange Matrix");
    expect(episode39).toContain("The Hardened Perimeter Rings");
    expect(episode40).toContain("The Final Structural Scaling");
    expect(episode38).toContain("No exchange, bank, allocation");
    expect(episode39).toContain("No blockchain daemon");
    expect(episode40).toContain("No Nginx, WebSocket, TLS");
  });

  it("registers all three individual protected-reference routes", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import Episode38ExchangeMatrix from "./pages/Episode38ExchangeMatrix"');
    expect(app).toContain('import Episode39ExchangePerimeter from "./pages/Episode39ExchangePerimeter"');
    expect(app).toContain('import Episode40InfrastructureScaling from "./pages/Episode40InfrastructureScaling"');
    expect(app).toContain('<Route path={"/episode-38-exchange-matrix"} component={Episode38ExchangeMatrix} />');
    expect(app).toContain('<Route path={"/episode-39-exchange-perimeter"} component={Episode39ExchangePerimeter} />');
    expect(app).toContain('<Route path={"/episode-40-infrastructure-scaling"} component={Episode40InfrastructureScaling} />');
    const archive = read("client/src/pages/EpisodicOperationsArchive.tsx");
    expect(archive).toContain('href: "/episode-38-exchange-matrix"');
    expect(archive).toContain('href: "/episode-39-exchange-perimeter"');
    expect(archive).toContain('href: "/episode-40-infrastructure-scaling"');
  });
});
