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

type Tone = "idle" | "warn" | "error" | "ok";

const TONE_CLASS: Record<Tone, string> = {
  idle: "text-zinc-400",
  warn: "text-yellow-300",
  error: "text-red-400",
  ok: "text-emerald-400",
};

async function ensurePolygon(eth: any) {
  const current = await eth.request({ method: "eth_chainId" });
  if (current === POLYGON_CHAIN_ID) return;
  try {
    await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: POLYGON_CHAIN_ID }] });
  } catch (err: any) {
    if (err?.code !== 4902) throw err;
    await eth.request({ method: "wallet_addEthereumChain", params: [POLYGON_CHAIN_PARAMS] });
  }
}

export function ExchangeButtons() {
  const [status, setStatus] = useState("Wallet: not connected");
  const [tone, setTone] = useState<Tone>("idle");
  const [busy, setBusy] = useState(false);

  const stripeReady = isStripeConfigured();
  const contractReady = isContractConfigured();

  async function handleBuyMatic() {
    setBusy(true);
    try {
      const eth = (window as any).ethereum;
      if (!eth) throw new Error("No wallet found. Install MetaMask.");

      setTone("warn");
      setStatus("Connecting wallet...");
      await new BrowserProvider(eth).send("eth_requestAccounts", []);

      setStatus("Checking network...");
      await ensurePolygon(eth);

      // New provider after the chain switch so the signer reflects Polygon.
      const signer = await new BrowserProvider(eth).getSigner();
      const addr = await signer.getAddress();
      setStatus(`Connected: ${addr.slice(0, 6)}...${addr.slice(-4)}. Confirm in wallet...`);

      const contract = new Contract(SALE_CONTRACT_ADDRESS, SALE_CONTRACT_ABI, signer);
      const tx = await contract.buy({ value: parseEther(PRICE_MATIC) });
      setStatus(`Pending: ${tx.hash}`);

      const receipt = await tx.wait();
      if (receipt?.status !== 1) throw new Error("Transaction reverted.");
      setTone("ok");
      setStatus(`Success: ${tx.hash}`);
    } catch (e: any) {
      setTone("error");
      const msg = e?.code === "ACTION_REJECTED" ? "You rejected the transaction." : e?.shortMessage || e?.message || "Unknown error";
      setStatus(`Error: ${msg}`);
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
        {stripeReady ? (
          <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noreferrer noopener" className={`${btn} bg-indigo-600 hover:bg-indigo-500`}>
            Buy with USD (Stripe)
          </a>
        ) : (
          <button type="button" disabled className={`${btn} bg-indigo-600`}>Buy with USD (Stripe)</button>
        )}
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
      <p role="status" className={`mt-3 text-sm ${TONE_CLASS[tone]}`}>{status}</p>
    </section>
  );
}
