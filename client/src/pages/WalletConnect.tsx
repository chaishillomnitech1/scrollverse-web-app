import { useMemo, useState } from "react";
import { BookOpen, Copy, KeyRound, LockKeyhole, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type WalletReadinessRecord = {
  id: string;
  state: string;
  title: string;
  source: string;
  detail: string;
  gate: string;
  color: string;
  icon: typeof WalletCards;
};

const WALLET_READINESS: WalletReadinessRecord[] = [
  {
    id: "access",
    state: "WALLET ACCESS CONCEPT · NO CONNECTION ACTIVE",
    title: "Wallet access and consent record",
    source: "CryptoHub readiness, Token Store readiness, ScrollSoul collector readiness, and Activation Register",
    detail: "This route does not detect an extension, request accounts, connect a wallet, install a wallet, open a wallet provider, display an address, or retain any wallet state.",
    gate: "A future wallet connection must name the wallet or provider, chain/network, exact visitor purpose, data requested, signature or transaction scope, privacy notice, disconnect path, support route, rollback condition, and current owner release.",
    color: "#8B5CF6",
    icon: WalletCards,
  },
  {
    id: "custody",
    state: "CUSTODY + NETWORK RESEARCH · NO CHAIN ACTIVE",
    title: "Custody and network preparation",
    source: "Trading Readiness, CryptoHub readiness, token and collector release records",
    detail: "No chain, RPC endpoint, contract address, asset, balance, token, network switch, custody provider, or wallet compatibility claim is active or shown here.",
    gate: "Before a named chain or custody path is presented, record the network, contract or asset record where applicable, provider/custody model, public terms, risk and recovery boundaries, compatibility test, correction path, and explicit owner release.",
    color: "#00D4FF",
    icon: ShieldCheck,
  },
  {
    id: "collector",
    state: "COLLECTOR ACCESS PREPARATION · NO ASSET DELIVERY",
    title: "Collector and access preparation",
    source: "ScrollSoul collector readiness, Sun on Us collector record, Asset Registry, and Creator Catalog Readiness",
    detail: "No collectible, membership access, token, NFT, tier, entitlement, reward, claim, asset delivery, or transfer is active or represented as available.",
    gate: "An access or collector record requires the original asset or program ID, rights and public-media decision, representation mode, eligibility, network/provider/custody plan, terms, support and correction route, exact release, and post-release verification.",
    color: "#FFCC4D",
    icon: KeyRound,
  },
];

export default function WalletConnect() {
  useSovereignHeartbeat({ page: "wallet-access-readiness" });
  const [selectedId, setSelectedId] = useState(WALLET_READINESS[0].id);
  const [note, setNote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const selected = useMemo(() => WALLET_READINESS.find((record) => record.id === selectedId) ?? WALLET_READINESS[0], [selectedId]);

  const copyPacket = async () => {
    if (!acknowledged) {
      toast.error("Confirm the readiness boundary first", { description: "A local draft cannot connect an account, reveal a balance, request a signature, or create a transaction." });
      return;
    }
    const packet = [
      "SCROLLVERSE WALLET ACCESS READINESS PACKET · BROWSER-LOCAL DRAFT",
      `Record: ${selected.title}`,
      `State: ${selected.state}`,
      `Source: ${selected.source}`,
      `Current boundary: ${selected.detail}`,
      `Required before any external action: ${selected.gate}`,
      `Owner note: ${note.trim() || "Not supplied"}`,
      "No wallet provider, account, address, chain, RPC, contract, asset, balance, signature, custody, funding, transfer, token, NFT, membership, entitlement, reward, transaction, or external action is authorized by this browser-local draft.",
    ].join("\n\n");
    try {
      await navigator.clipboard.writeText(packet);
      toast.success("Wallet readiness packet copied", { description: "This is a browser-local preparation record only." });
    } catch {
      toast.error("Copy unavailable", { description: "Select the text manually; no external action was taken." });
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#8B5CF6]/30 bg-[radial-gradient(circle_at_82%_12%,rgba(139,92,246,.18),transparent_29%),radial-gradient(circle_at_10%_80%,rgba(0,212,255,.12),transparent_30%),#050B1A]"><div className="container py-14 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/crypto" className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">← CRYPTO READINESS</Link><span className="rounded-full border border-[#8B5CF6]/45 bg-[#8B5CF6]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#D6C4FF]">WALLET ACCESS READINESS · NO CONNECTION ACTIVE</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.13fr_.87fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.2em] text-[#D6C4FF]">SCROLLVERSE · WALLET + CUSTODY PREPARATION</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Consent before connection. <span className="text-[#B998FF]">No account, address, or transaction active.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This route prepares source, consent, custody, collector-access, and support records. It does not detect a wallet, connect an account, open a provider, switch a network, display an address or balance, request a signature, or create a transaction.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/crypto" className="rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-black text-white">Crypto readiness</Link><Link href="/token" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Token readiness</Link><Link href="/nft" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Collector readiness</Link></div></div><aside className="rounded-[2rem] border border-[#8B5CF6]/35 bg-[#071426]/90 p-7"><LockKeyhole className="h-9 w-9 text-[#D6C4FF]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#D6C4FF]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black leading-tight">Preparation only. No wallet provider or account access.</p><div className="mt-6 grid gap-3 text-xs leading-6 text-[#D6E2EE]"><p><span className="font-mono text-[#D6C4FF]">ACCOUNT + ADDRESS · </span>Unset</p><p><span className="font-mono text-[#D6C4FF]">NETWORK + CUSTODY · </span>No active route</p><p><span className="font-mono text-[#D6C4FF]">SIGNATURE + TRANSACTION · </span>No capability</p></div></aside></div></div></section>

    <section className="container py-10"><PortalTrustLens lane="Wallet access and custody readiness" source="CryptoHub readiness, Token Store readiness, ScrollSoul collector readiness, Asset Registry, Trading Readiness, Payment Launch Packets, and Activation Register." readiness="Source-labeled wallet, custody, network, consent, and collector-access preparation is available. No provider, account, address, balance, asset, signature, transaction, or chain action is active." boundary="This page does not detect, open, connect, install, or call a wallet provider; it does not request accounts, show addresses or balances, switch networks, add networks, request signatures, transfer funds, mint assets, or create transactions." /></section>

    <section className="container py-6"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">SOURCE-LABELED WALLET READINESS</p><h2 className="mt-2 text-3xl font-black">One consent and custody record before one connection.</h2></div><WalletCards className="h-9 w-9 text-[#D6C4FF]" /></div><div className="mt-7 grid gap-5 lg:grid-cols-[.82fr_1.18fr]"><div className="grid gap-3 self-start">{WALLET_READINESS.map((record) => { const Icon = record.icon; const active = record.id === selected.id; return <button type="button" key={record.id} onClick={() => { setSelectedId(record.id); setAcknowledged(false); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: active ? record.color : "rgba(255,255,255,.12)", background: active ? `${record.color}14` : "rgba(255,255,255,.02)" }}><div className="flex gap-3"><span className="mt-0.5 rounded-xl p-2" style={{ background: `${record.color}18`, color: record.color }}><Icon className="h-5 w-5" /></span><span><span className="block text-[10px] font-mono tracking-[.14em]" style={{ color: record.color }}>{record.state}</span><span className="mt-1 block text-lg font-black text-white">{record.title}</span></span></div></button>; })}</div><article className="rounded-[2rem] border p-7 sm:p-10" style={{ borderColor: `${selected.color}55`, background: `radial-gradient(circle at 90% 10%, ${selected.color}16, transparent 28%), #071426` }}><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: selected.color }}>{selected.state}</p><h3 className="mt-3 text-3xl font-black">{selected.title}</h3><p className="mt-5 text-xs font-mono tracking-[.12em] text-[#B8C7D6]">SOURCE · {selected.source}</p><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">{selected.detail}</p><div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: selected.color }}>REQUIRED BEFORE ANY EXTERNAL ACTION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.gate}</p></div></article></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_88%_10%,rgba(0,212,255,.12),transparent_25%),#071426] p-7 sm:p-10"><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">BROWSER-LOCAL WALLET ACCESS PACKET</p><h2 className="mt-3 text-3xl font-black">Prepare the consent record. Do not connect.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">A note can organize public-safe source, consent, custody, and release context. It remains in this browser until copied and is not sent to a wallet, chain, provider, account, custody service, or transaction endpoint.</p><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Record only public-safe source, consent, custody, support, and release context. Never enter an address, private key, recovery phrase, seed phrase, signature, account ID, credential, or customer data." className="mt-6 min-h-32 w-full rounded-2xl border border-[#00D4FF]/25 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-[#7F93A5] focus:border-[#00D4FF]/70" /><label className="mt-5 flex items-start gap-3 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4 text-sm leading-6 text-[#FFDEA0]"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I confirm this browser-local draft does not authorize wallet detection, provider connection, account access, network switching, signature, asset review, balance display, custody, funding, mint, transfer, token, or transaction action.</label><button type="button" onClick={copyPacket} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5"><Copy className="h-4 w-4" />Copy wallet readiness packet</button></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.05] p-7 sm:p-10"><BookOpen className="h-8 w-8 text-[#FF9EB9]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FF9EB9]">EXACT ACTION GATE</p><h2 className="mt-3 text-3xl font-black">A readiness packet is not wallet connection authority.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Before one provider-side wallet, account, address, network, signature, transaction, custody, token, collector access, or asset-delivery action, the active request must name the exact provider, purpose, data and permission scope, visitor impact, public terms, support and disconnect route, risk/rollback condition, and exact current owner release.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/activation-register" className="rounded-xl bg-[#FF6B9A] px-5 py-3 text-sm font-black text-[#071426]">Exact action register</Link><Link href="/creator-catalog-readiness" className="rounded-xl border border-[#FF6B9A]/45 bg-[#FF6B9A]/10 px-5 py-3 text-sm font-black text-[#FF9EB9]">Full catalog readiness</Link></div></div></section>
  </main>;
}
