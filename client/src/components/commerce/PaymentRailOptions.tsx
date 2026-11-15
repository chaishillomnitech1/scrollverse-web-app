import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  providers?: Eip1193Provider[];
};

type WalletInfo = {
  uuid: string;
  name: string;
  rdns: string;
  provider: Eip1193Provider;
};

type Announcement = {
  info: { uuid: string; name: string; rdns: string; icon?: string };
  provider: Eip1193Provider;
};

function getInjectedFallbacks(): WalletInfo[] {
  const ethereum = (window as Window & { ethereum?: Eip1193Provider }).ethereum;
  if (!ethereum) return [];
  const providers = ethereum.providers?.length ? ethereum.providers : [ethereum];
  return providers.map((provider, index) => ({
    uuid: `injected-${index}`,
    name: provider.isCoinbaseWallet ? "Coinbase Wallet" : provider.isMetaMask ? "MetaMask" : "Browser wallet",
    rdns: provider.isCoinbaseWallet ? "com.coinbase.wallet" : provider.isMetaMask ? "io.metamask" : "injected.wallet",
    provider,
  }));
}

function stateLabel(state: string): string {
  return state.replaceAll("-", " ");
}

export function PaymentRailOptions() {
  const { data, isLoading, isError } = trpc.paymentRails.getOptions.useQuery();
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [connected, setConnected] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const announce = (event: Event) => {
      const detail = (event as CustomEvent<Announcement>).detail;
      if (!detail?.info?.uuid || !detail.provider) return;
      setWallets((current) => {
        if (current.some((wallet) => wallet.uuid === detail.info.uuid)) return current;
        return [...current, {
          uuid: detail.info.uuid,
          name: detail.info.name,
          rdns: detail.info.rdns,
          provider: detail.provider,
        }];
      });
    };

    window.addEventListener("eip6963:announceProvider", announce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    setWallets((current) => {
      const fallbacks = getInjectedFallbacks();
      const merged = [...current];
      for (const wallet of fallbacks) {
        if (!merged.some((item) => item.rdns === wallet.rdns)) merged.push(wallet);
      }
      return merged;
    });

    return () => window.removeEventListener("eip6963:announceProvider", announce);
  }, []);

  async function connectWallet(wallet: WalletInfo) {
    setMessage("");
    try {
      const result = await wallet.provider.request({ method: "eth_requestAccounts" });
      const accounts = Array.isArray(result) ? result.filter((value): value is string => typeof value === "string") : [];
      if (!accounts[0]) throw new Error("The wallet did not return an account.");
      setConnected((current) => ({ ...current, [wallet.uuid]: accounts[0] }));
      setMessage(`${wallet.name} connected. No signature or transaction was requested.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Wallet connection was not completed.");
    }
  }

  return (
    <section className="rounded-3xl border border-cyan-200/20 bg-slate-950/70 p-6 md:p-8" aria-labelledby="payment-rail-options-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[.18em] text-cyan-200">SCROLLVERSE COMMERCE FABRIC</p>
          <h2 id="payment-rail-options-title" className="mt-2 text-2xl font-black">Choose your payment highway</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Merchant-directed checkout design with replaceable payment providers and customer-controlled wallets. Connecting a wallet does not authorize a payment.</p>
        </div>
        <span className="rounded-full border border-amber-200/30 px-3 py-1 text-[10px] font-mono text-amber-100">EXECUTION LOCKED · ROUTE DISCOVERY</span>
      </div>

      {isLoading && <p className="mt-5 text-sm text-slate-400">Reading configured payment routes…</p>}
      {isError && <p className="mt-5 text-sm text-amber-200">Payment route status is temporarily unavailable. No payment action is enabled.</p>}

      {data && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
            <h3 className="font-bold">Card and local methods</h3>
            <p className="mt-1 text-xs text-slate-400">Existing card adapter: {data.card.provider}</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-cyan-200">{stateLabel(data.card.state)}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
            <h3 className="font-bold">Bank transfer / ACH</h3>
            <p className="mt-1 text-xs text-slate-400">Direct merchant settlement through an approved bank or ACH partner.</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-cyan-200">{stateLabel(data.bankTransfer.state)}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
            <h3 className="font-bold">Self-custody on-chain payment</h3>
            <p className="mt-1 text-xs text-slate-400">Customer wallet signs directly; no ScrollVerse seed phrase or private key is collected.</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-cyan-200">{stateLabel(data.onchain.state)}</p>
            <p className="mt-1 text-xs text-slate-500">Configured chain ID: {data.onchain.chainId ?? "not set"}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
            <h3 className="font-bold">Storefront checkout</h3>
            <p className="mt-1 text-xs text-slate-400">Creator-owned products, delivery, tax, and refund terms.</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-cyan-200">{stateLabel(data.storefront.state)}</p>
          </article>
        </div>
      )}

      <div className="mt-7 rounded-2xl border border-white/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold">Connect a wallet you control</h3>
          <span className="text-xs text-slate-400">{wallets.length} injected wallet{wallets.length === 1 ? "" : "s"} detected</span>
        </div>
        {wallets.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {wallets.map((wallet) => (
              <button key={wallet.uuid} type="button" onClick={() => void connectWallet(wallet)} className="rounded-xl border border-cyan-200/30 px-4 py-2 text-sm font-semibold text-cyan-50 hover:bg-cyan-300/10">
                {connected[wallet.uuid] ? `${wallet.name} · ${connected[wallet.uuid].slice(0, 6)}…${connected[wallet.uuid].slice(-4)}` : `Connect ${wallet.name}`}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400">No injected wallet detected. MetaMask and Coinbase Wallet can connect through compatible browser providers; Robinhood Wallet is supported through WalletConnect when its SDK and project configuration are enabled.</p>
        )}
        <p className="mt-3 text-xs text-slate-500">WalletConnect configuration: {data ? stateLabel(data.walletConnect.state) : "not yet read"}. Wallet connection does not enable trading, custody, token sales, or transfers.</p>
        {message && <p role="status" aria-live="polite" className="mt-3 text-sm text-cyan-100">{message}</p>}
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">Provider configuration is not proof of underwriting, regulatory authority, mainnet contract verification, settlement, or live checkout. Fees, currency, destination, and refund terms must be shown before the customer confirms any future payment.</p>
    </section>
  );
}

export default PaymentRailOptions;
