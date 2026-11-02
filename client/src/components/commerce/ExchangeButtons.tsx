import { useState } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import {
  POLYGON_CHAIN_ID,
  POLYGON_CHAIN_PARAMS,
  PRICE_MATIC,
  SALE_CONTRACT_ABI,
  SALE_CONTRACT_ADDRESS,
  STRIPE_PAYMENT_LINK,
  isContractConfigured,
  isStripeConfigured,
} from "@/lib/commerceConfig";

type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

type Tone = "idle" | "warn" | "error" | "ok";

const TONE_CLASS: Record<Tone, string> = {
  idle: "text-zinc-400",
  warn: "text-yellow-300",
  error: "text-red-400",
  ok: "text-emerald-400",
};

async function ensurePolygon(eth: Eip1193Provider) {
  const current = await eth.request({ method: "eth_chainId" });
  if (typeof current !== "string") throw new Error("Wallet returned an invalid network identifier.");
  if (current.toLowerCase() === POLYGON_CHAIN_ID) return;
  try {
    await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: POLYGON_CHAIN_ID }] });
  } catch (err: unknown) {
    const code = typeof err === "object" && err !== null && "code" in err ? err.code : undefined;
    if (code !== 4902) throw err;
    await eth.request({ method: "wallet_addEthereumChain", params: [POLYGON_CHAIN_PARAMS] });
  }

  const switchedChain = await eth.request({ method: "eth_chainId" });
  if (typeof switchedChain !== "string" || switchedChain.toLowerCase() !== POLYGON_CHAIN_ID) {
    throw new Error("Please switch your wallet to Polygon to continue.");
  }
}

function getErrorMessage(error: unknown): string {
  if (typeof error !== "object" || error === null) return "Unknown error.";

  const details = error as { code?: number | string; shortMessage?: string; message?: string };
  if (details.code === 4001 || details.code === "ACTION_REJECTED") return "You rejected the request in your wallet.";
  return details.shortMessage ?? details.message ?? "Unknown error.";
}

export function ExchangeButtons() {
  const [status, setStatus] = useState("Wallet: not connected");
  const [tone, setTone] = useState<Tone>("idle");
  const [busy, setBusy] = useState(false);

  const stripeReady = isStripeConfigured();
  const contractReady = isContractConfigured();

  function handleBuyUsd() {
    if (stripeReady) window.open(STRIPE_PAYMENT_LINK, "_blank", "noopener,noreferrer");
  }

  async function handleBuyMatic() {
    setBusy(true);
    try {
      const eth = (window as Window & { ethereum?: Eip1193Provider }).ethereum;
      if (!eth) throw new Error("No wallet found. Install MetaMask.");

      setTone("warn");
      setStatus("Connecting wallet...");
      await new BrowserProvider(eth).send("eth_requestAccounts", []);

      setStatus("Checking network...");
      await ensurePolygon(eth);

      const signer = await new BrowserProvider(eth).getSigner();
      setStatus("Confirm the purchase in your wallet...");

      const contract = new Contract(SALE_CONTRACT_ADDRESS, SALE_CONTRACT_ABI, signer);
      const tx = await contract.buy({ value: parseEther(PRICE_MATIC) });
      setStatus(`Pending: ${tx.hash}`);

      const receipt = await tx.wait();
      if (receipt?.status !== 1) throw new Error("Transaction reverted.");
      setTone("ok");
      setStatus(`Success: ${tx.hash}`);
    } catch (e: unknown) {
      setTone("error");
      setStatus(`Error: ${getErrorMessage(e)}`);
    } finally {
      setBusy(false);
    }
  }

  const btn = "rounded-xl px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <section id="direct-exchange" className="mx-auto my-6 max-w-4xl rounded-2xl border border-zinc-700 bg-black/40 p-6">
      <h3 className="mb-2 text-lg font-semibold text-yellow-300">Direct Exchange</h3>
      <p className="mb-4 text-zinc-300">Choose card (USD) or wallet (MATIC).</p>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleBuyUsd} disabled={busy || !stripeReady} className={`${btn} bg-indigo-600 hover:bg-indigo-500`}>
          Buy with USD (Stripe)
        </button>
        <button
          type="button"
          onClick={handleBuyMatic}
          disabled={busy || !contractReady}
          className={`${btn} bg-purple-600 hover:bg-purple-500`}
        >
          {busy ? "Processing..." : "Buy with MATIC"}
        </button>
      </div>

      {(!stripeReady || !contractReady) && (
        <p className="mt-3 text-xs text-amber-300/80">
          Checkout is not yet enabled: payment details are pending owner configuration.
        </p>
      )}
      <p className="mt-2 text-xs text-zinc-400">Placeholder amount: {PRICE_MATIC} MATIC. Verify sale terms before enabling checkout.</p>
      <p role="status" aria-live="polite" className={`mt-3 break-all text-sm ${TONE_CLASS[tone]}`}>{status}</p>
    </section>
  );
}
