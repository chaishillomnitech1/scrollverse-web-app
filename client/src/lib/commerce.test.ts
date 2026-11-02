import { describe, expect, it } from "vitest";
import { describeStatus, isPlaceholder, isValidAddress, readableError, STRIPE_PAYMENT_LINK, SALE_CONTRACT_ADDRESS } from "./commerce";

describe("commerce helpers", () => {
  it("keeps placeholders flagged and invalid", () => {
    expect(isPlaceholder(STRIPE_PAYMENT_LINK)).toBe(true);
    expect(isValidAddress(SALE_CONTRACT_ADDRESS)).toBe(false);
    expect(isValidAddress("0x" + "a".repeat(40))).toBe(true);
  });
  it("describes every status", () => {
    expect(describeStatus({ kind: "idle" })).toBe("Wallet: not connected");
    expect(describeStatus({ kind: "connecting" })).toBe("Connecting wallet...");
    expect(describeStatus({ kind: "checking-network" })).toBe("Checking network...");
    expect(describeStatus({ kind: "pending", hash: "0x1" })).toBe("Pending: 0x1");
    expect(describeStatus({ kind: "success", hash: "0x1" })).toBe("Success: 0x1");
    expect(describeStatus({ kind: "error", message: "x" })).toBe("Error: x");
  });
  it("maps wallet rejection", () => {
    expect(readableError({ code: 4001 })).toMatch(/rejected/);
  });
});
