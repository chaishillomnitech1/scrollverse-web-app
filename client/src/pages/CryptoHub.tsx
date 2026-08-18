import { useMemo, useState } from "react";
import { ArrowRight, Coins, Copy, Landmark, LockKeyhole, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type CryptoReadinessRecord = {
  id: string;
  state: string;
  title: string;
  source: string;
  detail: string;
  gate: string;
  accent: string;
  icon: typeof Coins;
};

const CRYPTO_RECORDS: CryptoReadinessRecord[] = [
  {
    id: "contribution-path",
    state: "PAYMENT PATH · REQUIRES EXACT RELEASE",
    title: "Crypto contribution or payment path",
    source: "Payment Options Map, Support Path, Payment Launch Packets, and Activation Register",
    detail: "No wallet address, supported asset, exact amount, payment request, treasury balance, chain receipt, contribution receipt, or customer entitlement is active on this route.",
    gate: "Name the item or purpose, verified public destination, provider/network, accepted asset, amount and currency basis, visitor and financial effect, delivery/support/refund terms, destination verification, owner release, correction path, rollback condition, and post-release check.",
    accent: "#00D4FF",
    icon: WalletCards,
  },
  {
    id: "guardian-path",
    state: "MEMBERSHIP CONCEPT · PRICE UNSET",
    title: "Guardian access concept",
    source: "Subscribe readiness, Token Store readiness, and Creator Catalog Readiness",
    detail: "No tier price, token amount, chain conversion, membership access, reward, voting right, revenue share, allocation, or delivery is active.",
    gate: "One named membership record must specify eligibility, terms, price/currency/tax if paid, payment destination, access/delivery, support/refund path, any disclosed token relationship, owner release, and public verification.",
    accent: "#FFCC4D",
    icon: ShieldCheck,
  },
  {
    id: "collector-path",
    state: "COLLECTOR CONCEPT · NO MINT ACTIVE",
    title: "ScrollSoul collector pathway",
    source: "ScrollSoul collector readiness, Sun on Us record, Asset Registry, and Art Museum evidence",
    detail: "No contract, royalty, asset support list, mint, wallet, custody, transfer, market, or chain verification is active here.",
    gate: "One original-asset record must name representation mode, public media, rights/contributors, chain/network, service or contract, custody, edition, fee cap, terms, marketplace/price decision, owner release, correction, rollback, and post-release verification.",
    accent: "#B98CFF",
    icon: Sparkles,
  },
];

export default function CryptoHub() {
  useSovereignHeartbeat({ page: "crypto-release-readiness" });
  const [selectedId, setSelectedId] = useState(CRYPTO_RECORDS[0].id);
  const [note, setNote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const selected = useMemo(() => CRYPTO_RECORDS.find((record) => record.id === selectedId) ?? CRYPTO_RECORDS[0], [selectedId]);

  const copyPacket = async () => {
    if (!acknowledged) {
      toast.error("Confirm the release boundary first", { description: "This browser-local draft cannot authorize a wallet, payment, chain, asset, mint, transfer, or provider action." });
      return;
    }
    const packet = [
      "SCROLLVERSE CRYPTO / COLLECTOR RELEASE PACKET · BROWSER-LOCAL DRAFT",
      `Record: ${selected.title}`,
      `State: ${selected.state}`,
      `Source: ${selected.source}`,
      `Current boundary: ${selected.detail}`,
      `Required before any external action: ${selected.gate}`,
      `Owner note: ${note.trim() || "Not supplied"}`,
      "No wallet, address, chain, token, asset, payment, price, balance, contract, NFT, mint, transfer, custody, sale, payout, customer, or provider action is authorized by this draft.",
    ].join("\n\n");
    try {
      await navigator.clipboard.writeText(packet);
      toast.success("Crypto release packet copied", { description: "This is a browser-local preparation record only." });
    } catch {
      toast.error("Copy unavailable", { description: "Select the text manually; no external action was taken." });
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_84%_10%,rgba(0,212,255,.16),transparent_28%),radial-gradient(circle_at_10%_82%,rgba(185,140,255,.13),transparent_28%),#050B1A]"><div className="container py-14 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← SCROLLVERSE FRONT DOOR</Link><span className="rounded-full border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">CRYPTO + COLLECTOR READINESS · NO WALLET OR PAYMENT ACTIVE</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.13fr_.87fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.2em] text-[#9DEBFF]">SCROLLVERSE · CRYPTO RELEASE PREPARATION</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Source before chain. <span className="text-[#00D4FF]">No crypto payment or mint active.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This route prepares one payment, membership, or collector record at a time. It does not expose a wallet, fetch a balance, name accepted assets, connect a provider, request an account, send a transfer, verify a transaction, or queue a mint.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/payment-launch-packets" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Payment launch packets</Link><Link href="/token" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Token readiness</Link><Link href="/nft-marketplace" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Collector readiness</Link></div></div><aside className="rounded-[2rem] border border-[#00D4FF]/35 bg-[#071426]/90 p-7"><LockKeyhole className="h-9 w-9 text-[#9DEBFF]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black leading-tight">Release-ready preparation. External action unavailable.</p><div className="mt-6 grid gap-3 text-xs leading-6 text-[#D6E2EE]"><p><span className="font-mono text-[#9DEBFF]">WALLET + CUSTODY · </span>No active route</p><p><span className="font-mono text-[#9DEBFF]">ASSET + AMOUNT · </span>Unset</p><p><span className="font-mono text-[#9DEBFF]">CHAIN + CONTRACT · </span>Unset</p></div></aside></div></div></section>

    <section className="container py-10"><PortalTrustLens lane="Crypto and collector readiness" source="Payment Options Map, Support Path, Payment Launch Packets, Token Store readiness, ScrollSoul collector readiness, Sun on Us record, Asset Registry, Art Museum evidence, and Activation Register." readiness="Source-labeled release records and browser-local packet preparation are available. No wallet, payment, balance, asset, chain, mint, transfer, custody, or provider action is active." boundary="This page does not display a wallet or contract address, call a wallet API, fetch a treasury balance, name accepted assets, set a price, create a payment request, validate a transaction, issue a token, mint an NFT, move funds, connect custody, or publish a marketplace listing." /></section>

    <section className="container py-6"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">SOURCE-LABELED RELEASE LANES</p><h2 className="mt-2 text-3xl font-black">One named record before one irreversible crypto choice.</h2></div><Landmark className="h-9 w-9 text-[#9DEBFF]" /></div><div className="mt-7 grid gap-5 lg:grid-cols-[.82fr_1.18fr]"><div className="grid gap-3 self-start">{CRYPTO_RECORDS.map((record) => { const Icon = record.icon; const active = record.id === selected.id; return <button type="button" key={record.id} onClick={() => { setSelectedId(record.id); setAcknowledged(false); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: active ? record.accent : "rgba(255,255,255,.12)", background: active ? `${record.accent}14` : "rgba(255,255,255,.02)" }}><div className="flex gap-3"><span className="mt-0.5 rounded-xl p-2" style={{ background: `${record.accent}18`, color: record.accent }}><Icon className="h-5 w-5" /></span><span><span className="block text-[10px] font-mono tracking-[.14em]" style={{ color: record.accent }}>{record.state}</span><span className="mt-1 block text-lg font-black text-white">{record.title}</span></span></div></button>; })}</div><article className="rounded-[2rem] border p-7 sm:p-10" style={{ borderColor: `${selected.accent}55`, background: `radial-gradient(circle at 90% 10%, ${selected.accent}16, transparent 28%), #071426` }}><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: selected.accent }}>{selected.state}</p><h3 className="mt-3 text-3xl font-black">{selected.title}</h3><p className="mt-5 text-xs font-mono tracking-[.12em] text-[#B8C7D6]">SOURCE · {selected.source}</p><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">{selected.detail}</p><div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: selected.accent }}>REQUIRED BEFORE ANY EXTERNAL ACTION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.gate}</p></div></article></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_88%_10%,rgba(0,212,255,.12),transparent_25%),#071426] p-7 sm:p-10"><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">BROWSER-LOCAL RELEASE PACKET</p><h2 className="mt-3 text-3xl font-black">Prepare evidence without creating a transaction.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">A note can organize public-safe source, terms, delivery, and release context. It stays in this browser until copied and is not sent to a wallet, chain, provider, account, customer, or payment service.</p><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Record only public-safe source, rights, terms, delivery, and release context. Do not enter wallet addresses, credentials, private keys, recovery codes, bank details, or customer data." className="mt-6 min-h-32 w-full rounded-2xl border border-[#00D4FF]/25 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-[#7F93A5] focus:border-[#00D4FF]/70" /><label className="mt-5 flex items-start gap-3 rounded-2xl border border-[#00D4FF]/30 bg-[#00D4FF]/[.06] p-4 text-sm leading-6 text-[#9DEBFF]"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#00D4FF]" />I confirm this draft does not authorize a wallet, address, chain, asset, price, balance, payment, contract, token, NFT, mint, transfer, custody, sale, payout, customer, or provider action.</label><button type="button" onClick={copyPacket} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5"><Copy className="h-4 w-4" />Copy crypto release packet</button></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.05] p-7 sm:p-10"><Sparkles className="h-8 w-8 text-[#FF9EB9]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FF9EB9]">EXACT ACTION GATE</p><h2 className="mt-3 text-3xl font-black">A release packet is not a transfer, payment, or mint authority.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Before any provider-side wallet, payment, asset, chain, contract, mint, transfer, custody, listing, payout, or delivery action, the active request must name the exact record, provider or destination, asset or setting, amount/currency basis if applicable, visitor and financial consequence, public terms, and rollback condition. One exact current owner confirmation is required for that one action.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/activation-register" className="rounded-xl bg-[#FF6B9A] px-5 py-3 text-sm font-black text-[#071426]">Open Activation Register</Link><Link href="/payment-launch-packets" className="rounded-xl border border-[#FF6B9A]/45 bg-[#FF6B9A]/10 px-5 py-3 text-sm font-black text-[#FF9EB9]">Payment launch packets</Link><Link href="/creator-catalog-readiness" className="rounded-xl border border-white/15 bg-white/[.04] px-5 py-3 text-sm font-black text-white">Full catalog readiness</Link></div></div></section>

    <footer className="container py-8 text-center text-xs font-mono text-[#8FA3B5]">SCROLLVERSE · CRYPTO + COLLECTOR READINESS · SOURCE, TERMS, OWNER RELEASE, THEN ONE EXACT ACTION</footer>
  </main>;
}
