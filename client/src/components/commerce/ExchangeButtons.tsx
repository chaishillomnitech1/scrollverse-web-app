import { useState } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import {
  DEFAULT_PRICE_MATIC,
  POLYGON_CHAIN_ID,
  POLYGON_CHAIN_PARAMS,
  SALE_ABI,
  SALE_CONTRACT_ADDRESS,
  STRIPE_PAYMENT_LINK,
  describeStatus,
  isPlaceholder,
  isValidAddress,
  readableError,
  type TxStatus,
} from "@/lib/commerce";

type Eip1193 = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };

export function ExchangeButtons({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<TxStatus>({ kind: "idle" });
  const inFlight = ["connecting", "checking-network", "pending"].includes(status.kind);
  const stripeReady = !isPlaceholder(STRIPE_PAYMENT_LINK);
  const contractReady = isValidAddress(SALE_CONTRACT_ADDRESS);

  const buyUsd = () => {
    if (!stripeReady) {
      setStatus({ kind: "error", message: "USD checkout is not configured yet (placeholder payment link)." });
      return;
    }
    window.open(STRIPE_PAYMENT_LINK, "_blank", "noopener,noreferrer");
  };

  const buyMatic = async () => {
    const wallet = (window as unknown as { ethereum?: Eip1193 }).ethereum;
    if (!wallet) {
      setStatus({ kind: "error", message: "No injected wallet found. Install MetaMask or a compatible wallet." });
      return;
    }
    if (!contractReady) {
      setStatus({ kind: "error", message: "MATIC checkout is not configured yet (placeholder contract address)." });
      return;
    }
    try {
      setStatus({ kind: "connecting" });
      await wallet.request({ method: "eth_requestAccounts" });

      setStatus({ kind: "checking-network" });
      const chainHex = (await wallet.request({ method: "eth_chainId" })) as string;
      if (parseInt(chainHex, 16) !== POLYGON_CHAIN_ID) {
        try {
          await wallet.request({ method: "wallet_switchEthereumChain", params: [{ chainId: POLYGON_CHAIN_PARAMS.chainId }] });
        } catch (switchErr) {
          if ((switchErr as { code?: number }).code !== 4902) throw switchErr;
          await wallet.request({ method: "wallet_addEthereumChain", params: [POLYGON_CHAIN_PARAMS] });
        }
      }

      const provider = new BrowserProvider(wallet);
      const signer = await provider.getSigner();
      const contract = new Contract(SALE_CONTRACT_ADDRESS, SALE_ABI as unknown as string[], signer);
      const tx = await contract.buy({ value: parseEther(DEFAULT_PRICE_MATIC) });
      setStatus({ kind: "pending", hash: tx.hash });
      await tx.wait();
      setStatus({ kind: "success", hash: tx.hash });
    } catch (err) {
      setStatus({ kind: "error", message: readableError(err) });
    }
  };

  const btn = "rounded-xl border px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <section className={`rounded-3xl border border-cyan-200/25 bg-slate-950/60 p-6 ${className}`} aria-labelledby="direct-exchange-title">
      <h2 id="direct-exchange-title" className="text-2xl font-black">Direct Exchange</h2>
      <p className="mt-2 text-sm text-slate-300">Choose card (USD) or wallet (MATIC).</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={buyUsd} disabled={inFlight} className={`${btn} border-cyan-200/35 bg-cyan-300/10 text-cyan-50 hover:bg-cyan-300/20`}>
          Buy with USD (Stripe)
        </button>
        <button type="button" onClick={buyMatic} disabled={inFlight} className={`${btn} border-purple-200/35 bg-purple-300/10 text-purple-50 hover:bg-purple-300/20`}>
          Buy with MATIC
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-4 break-all font-mono text-xs text-slate-300">{describeStatus(status)}</p>
      <p className="mt-2 text-[11px] text-slate-500">Placeholder price: {DEFAULT_PRICE_MATIC} MATIC. Checkout activates only after the owner replaces the placeholder Stripe link and contract address.</p>
    </section>
  );
}

export default ExchangeButtons;
