import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, BookOpen, Copy, Landmark, LockKeyhole, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ExchangeReadinessRecord = {
  id: string;
  state: string;
  title: string;
  source: string;
  detail: string;
  gate: string;
  accent: string;
  icon: typeof BarChart3;
};

const EXCHANGE_RECORDS: ExchangeReadinessRecord[] = [
  {
    id: "market-research",
    state: "MARKET RESEARCH · NO PRICE FEED ACTIVE",
    title: "Market observation and study",
    source: "Trading Readiness, public financial literacy sources, and owner-directed ScrollVerse research context",
    detail: "This route does not display live or delayed market prices, performance, volume, liquidity, trade pairs, exchange listings, recommendations, confidence scores, or trading signals.",
    gate: "A future research display must name its data source, timestamp, market, methodology, limitations, correction path, and whether it is delayed or live. It must not become an order interface without the separate Trading Readiness activation record.",
    accent: "#00D4FF",
    icon: BarChart3,
  },
  {
    id: "londec-conversion",
    state: "$LONDC CONVERSION CONCEPT · NO EXCHANGE ACTIVE",
    title: "$LONDC conversion concept",
    source: "$LONDC Token Store readiness, CryptoHub readiness, Payment Launch Packets, and Activation Register",
    detail: "No exchange, pair, price, supply, liquidity, market maker, wallet, custody, transfer, or settlement path is active or represented as available.",
    gate: "Before an exchange or conversion action, name the token record, chain/network, contract or mechanism, custody/provider, market or pair, pricing method, liquidity and fee terms, eligibility, transfer terms, risk disclosure, owner release, rollback condition, and public verification.",
    accent: "#FFCC4D",
    icon: Landmark,
  },
  {
    id: "simulation-controls",
    state: "SIMULATION PATH · NO ORDER CAPABILITY",
    title: "Paper-trading and risk-control pathway",
    source: "Trading Readiness comparison and exact live-action register",
    detail: "No account, broker, exchange credential, order, stop, signal subscription, trading automation, funding, custody, transfer, or performance claim is active.",
    gate: "A simulation or monitored readiness record must name the provider if any, market, asset universe, data source, strategy version, order-size and loss caps, stop/cancel conditions, audit log, owner control, and an exact external-action boundary.",
    accent: "#B98CFF",
    icon: ShieldCheck,
  },
];

export default function ExchangeCrypto() {
  useSovereignHeartbeat({ page: "exchange-crypto-readiness" });
  const [selectedId, setSelectedId] = useState(EXCHANGE_RECORDS[0].id);
  const [note, setNote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const selected = useMemo(() => EXCHANGE_RECORDS.find((record) => record.id === selectedId) ?? EXCHANGE_RECORDS[0], [selectedId]);

  const copyPacket = async () => {
    if (!acknowledged) {
      toast.error("Confirm the release boundary first", { description: "This browser-local draft cannot authorize an exchange, price, pair, wallet, order, transfer, or financial action." });
      return;
    }
    const packet = [
      "SCROLLVERSE EXCHANGE / MARKET READINESS PACKET · BROWSER-LOCAL DRAFT",
      `Record: ${selected.title}`,
      `State: ${selected.state}`,
      `Source: ${selected.source}`,
      `Current boundary: ${selected.detail}`,
      `Required before any external action: ${selected.gate}`,
      `Owner note: ${note.trim() || "Not supplied"}`,
      "No price feed, pair, asset, recommendation, signal, exchange, broker, wallet, custody, funding, order, stop, transfer, settlement, token, or provider action is authorized by this draft.",
    ].join("\n\n");
    try {
      await navigator.clipboard.writeText(packet);
      toast.success("Exchange readiness packet copied", { description: "This is a browser-local preparation record only." });
    } catch {
      toast.error("Copy unavailable", { description: "Select the text manually; no external action was taken." });
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#FFCC4D]/25 bg-[radial-gradient(circle_at_84%_10%,rgba(255,204,77,.16),transparent_28%),radial-gradient(circle_at_8%_78%,rgba(0,212,255,.12),transparent_28%),#050B1A]"><div className="container py-14 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/exchange" className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">← OMNIEX READINESS</Link><span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">MARKET + CONVERSION READINESS · NO EXCHANGE ACTIVE</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.13fr_.87fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.2em] text-[#FFDEA0]">SCROLLVERSE · MARKET RESEARCH + CONVERSION PREPARATION</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Evidence before exchange. <span className="text-[#FFCC4D]">No price, pair, or order active.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This route separates market research, future $LONDC conversion concepts, and paper-trading controls. It does not display active prices, volume, signals, trade pairs, assets, recommendations, wallet controls, order forms, or exchange access.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/trading-readiness" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426]">Trading readiness</Link><Link href="/token" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Token readiness</Link><Link href="/crypto" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Crypto readiness</Link></div></div><aside className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#071426]/90 p-7"><LockKeyhole className="h-9 w-9 text-[#FFDEA0]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black leading-tight">Research and release preparation. External action unavailable.</p><div className="mt-6 grid gap-3 text-xs leading-6 text-[#D6E2EE]"><p><span className="font-mono text-[#FFDEA0]">PRICE + PAIR · </span>Unset</p><p><span className="font-mono text-[#FFDEA0]">EXCHANGE + CUSTODY · </span>No active route</p><p><span className="font-mono text-[#FFDEA0]">ORDER + SETTLEMENT · </span>No capability</p></div></aside></div></div></section>

    <section className="container py-10"><PortalTrustLens lane="Exchange and market readiness" source="Trading Readiness, $LONDC Token Store readiness, CryptoHub readiness, Payment Launch Packets, Activation Register, and public financial-literacy research pathways." readiness="Source-labeled market research, conversion concepts, simulation controls, and browser-local packet preparation are available. No price feed, exchange, broker, order, wallet, custody, or provider action is active." boundary="This page does not display market prices, pairs, volume, assets, signals, recommendations, exchange listings, wallet controls, order capability, transfers, custody, funding, settlement, or financial outcomes." /></section>

    <section className="container py-6"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">SOURCE-LABELED READINESS LANES</p><h2 className="mt-2 text-3xl font-black">One market record before one financial action.</h2></div><Scale className="h-9 w-9 text-[#FFDEA0]" /></div><div className="mt-7 grid gap-5 lg:grid-cols-[.82fr_1.18fr]"><div className="grid gap-3 self-start">{EXCHANGE_RECORDS.map((record) => { const Icon = record.icon; const active = record.id === selected.id; return <button type="button" key={record.id} onClick={() => { setSelectedId(record.id); setAcknowledged(false); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: active ? record.accent : "rgba(255,255,255,.12)", background: active ? `${record.accent}14` : "rgba(255,255,255,.02)" }}><div className="flex gap-3"><span className="mt-0.5 rounded-xl p-2" style={{ background: `${record.accent}18`, color: record.accent }}><Icon className="h-5 w-5" /></span><span><span className="block text-[10px] font-mono tracking-[.14em]" style={{ color: record.accent }}>{record.state}</span><span className="mt-1 block text-lg font-black text-white">{record.title}</span></span></div></button>; })}</div><article className="rounded-[2rem] border p-7 sm:p-10" style={{ borderColor: `${selected.accent}55`, background: `radial-gradient(circle at 90% 10%, ${selected.accent}16, transparent 28%), #071426` }}><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: selected.accent }}>{selected.state}</p><h3 className="mt-3 text-3xl font-black">{selected.title}</h3><p className="mt-5 text-xs font-mono tracking-[.12em] text-[#B8C7D6]">SOURCE · {selected.source}</p><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">{selected.detail}</p><div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: selected.accent }}>REQUIRED BEFORE ANY EXTERNAL ACTION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.gate}</p></div></article></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_88%_10%,rgba(0,212,255,.12),transparent_25%),#071426] p-7 sm:p-10"><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">BROWSER-LOCAL MARKET PACKET</p><h2 className="mt-3 text-3xl font-black">Prepare the record. Do not infer a trade.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">A note can organize public-safe market, methodology, control, and release information. It stays in this browser until copied and is not sent to an exchange, broker, wallet, custody service, account, or market-data provider.</p><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Record only public-safe source, methodology, controls, terms, and release context. Do not enter credentials, account IDs, wallet addresses, private keys, recovery codes, bank details, or customer data." className="mt-6 min-h-32 w-full rounded-2xl border border-[#00D4FF]/25 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-[#7F93A5] focus:border-[#00D4FF]/70" /><label className="mt-5 flex items-start gap-3 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4 text-sm leading-6 text-[#FFDEA0]"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I confirm this draft does not authorize a price feed, pair, signal, exchange, broker, wallet, custody, funding, order, stop, transfer, settlement, token, or provider action.</label><button type="button" onClick={copyPacket} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5"><Copy className="h-4 w-4" />Copy market packet</button></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.05] p-7 sm:p-10"><Sparkles className="h-8 w-8 text-[#FF9EB9]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FF9EB9]">EXACT ACTION GATE</p><h2 className="mt-3 text-3xl font-black">A research packet is not a trade, exchange, or transfer authority.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Before any provider-side market data, exchange, broker, price, pair, wallet, custody, funding, order, stop, transfer, settlement, token, or delivery action, the active request must name the exact record, provider/destination, market/asset, amount/currency basis where applicable, visitor and financial consequence, public terms, risk controls, and rollback condition. One exact current owner confirmation is required for that one action.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/trading-readiness" className="rounded-xl bg-[#FF6B9A] px-5 py-3 text-sm font-black text-[#071426]">Open Trading Readiness</Link><Link href="/activation-register" className="rounded-xl border border-[#FF6B9A]/45 bg-[#FF6B9A]/10 px-5 py-3 text-sm font-black text-[#FF9EB9]">Exact action register</Link><Link href="/creator-catalog-readiness" className="rounded-xl border border-white/15 bg-white/[.04] px-5 py-3 text-sm font-black text-white">Full catalog readiness</Link></div></div></section>

    <footer className="container py-8 text-center text-xs font-mono text-[#8FA3B5]">SCROLLVERSE · EXCHANGE + MARKET READINESS · SOURCE, CONTROLS, OWNER RELEASE, THEN ONE EXACT ACTION</footer>
  </main>;
}
