import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 993 receipt viewer, Block 145 gallery, and profile feedback", () => {
  it("adds an exact-hash receipt viewer to the main dashboard", () => {
    const source = read("client/src/pages/Dashboard.tsx");
    expect(source).toContain("ReceiptViewer");
    expect(source).toContain("SHA-256");
    expect(source).toContain("scrollverse-oct27-block145-blueprints-v1");
    expect(source).toContain("aria-live=\"polite\"");
  });

  it("adds a dedicated, reduced-motion-safe Block 145 image receipt gallery", () => {
    const source = read("client/src/pages/MetaAIArtifactsLookbooks.tsx");
    const gallery = read("client/src/components/Block145Gallery.tsx");
    expect(source).toContain("Block145Gallery");
    expect(source).toContain("Block 145 image receipt gallery");
    expect(gallery).toContain("motion-reduce:transition-none");
    expect(gallery).toContain("metadata-only local accession");
  });

  it("adds profile success indicators and truthful local vaulting toasts", () => {
    const source = read("client/src/pages/GuardianProfile.tsx");
    expect(source).toContain('from "sonner"');
    expect(source).toContain("Vault receipt ready");
    expect(source).toContain("toast.success");
    expect(source).toContain("local metadata receipt");
  });
});
