import { afterEach, describe, expect, it } from "vitest";
import { supportHighwaysRouter } from "./routers/supportHighways";

const original = process.env.SUPPORT_HIGHWAYS_PUBLIC_DESTINATIONS;

afterEach(() => {
  if (original === undefined) delete process.env.SUPPORT_HIGHWAYS_PUBLIC_DESTINATIONS;
  else process.env.SUPPORT_HIGHWAYS_PUBLIC_DESTINATIONS = original;
});

describe("Support Highways public-destination endpoint", () => {
  it("returns the owner-stated Cash App route and only validated public support URLs", async () => {
    process.env.SUPPORT_HIGHWAYS_PUBLIC_DESTINATIONS = JSON.stringify({
      paypal: "https://paypal.me/chaispublic",
      sofi: "not-a-public-url",
      chime: "http://not-secure.example",
    });

    const caller = supportHighwaysRouter.createCaller({} as never);
    const response = await caller.getDestinations();

    expect(response.cashApp).toMatchObject({
      handle: "$chaisthegreat28",
      url: "https://cash.app/$chaisthegreat28",
      source: "Owner-stated public handle",
    });
    expect(response.destinations).toEqual([{ id: "paypal", label: "PayPal", url: "https://paypal.me/chaispublic" }]);
    expect(response.privacyBoundary).toContain("Never enter passwords");
  });

  it("keeps an empty or malformed supplied destination configuration fail-closed", async () => {
    process.env.SUPPORT_HIGHWAYS_PUBLIC_DESTINATIONS = "not-json";
    const caller = supportHighwaysRouter.createCaller({} as never);
    const response = await caller.getDestinations();
    expect(response.destinations).toEqual([]);
  });
});
