import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const componentPath = path.resolve(process.cwd(), "client/src/components/NotificationBell.tsx");

describe("Phase 802 — Guardian Alerts disclosure", () => {
  it("keeps Guardian Alerts active while adding a settlement-verification boundary", () => {
    const component = fs.readFileSync(componentPath, "utf8");

    expect(component).toContain("ScrollVerse Guardian Alerts");
    expect(component).toContain("Issued in the ScrollVerse site");
    expect(component).toContain("Confirm transaction status in your account or provider record");
    expect(component).toContain("trpc.notifications.getMyNotifications.useQuery");
  });
});
