import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 236 consent-first media launch kit", () => {
  it("ships an empty source-tracked contact schema rather than fabricated media contacts", () => {
    const csv = read("docs/media-launch-kit/scrollverse_media_contacts_template.csv").trim();
    const rows = csv.split("\n");
    const headers = rows[0].split(",");

    expect(rows).toHaveLength(1);
    expect(headers).toContain("contact_source_url");
    expect(headers).toContain("consent_status");
    expect(headers).toContain("do_not_contact");
    expect(headers).toContain("owner_review_status");
    expect(headers).toContain("opt_out_method");
    expect(headers).toContain("access_classification");
  });

  it("keeps outreach drafts personalized, opt-out aware, and externally disabled", () => {
    const kit = read("docs/media-launch-kit/scrollverse_media_outreach_kit.md");
    const boundary = read("docs/phase236-media-launch-boundary.md");

    expect(kit).toContain("Personalized Outreach Draft — Tech Editor");
    expect(kit).toContain("Personalized Outreach Draft — Fashion Editor");
    expect(kit).toContain("Personalized Outreach Draft — Music Editor");
    expect(kit).toContain("reply **“no follow-up”**");
    expect(kit).toContain("Email sending, follow-ups, Discord posts, or DMs | **Disabled**");
    expect(boundary).toContain("No external media contact, email address, personal data, Discord member, CRM record");
    expect(boundary).toContain("unsolicited bulk messages");
  });
});
