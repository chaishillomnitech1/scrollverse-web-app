import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Coins, Copy, Landmark, LockKeyhole, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ReleaseConcept = {
  id: string;
  state: string;
  title: string;
  source: string;
  detail: string;
  required: string;
  accent: string;
  icon: typeof Coins;
};

const TOKEN_AND_EDITION_RECORDS: ReleaseConcept[] = [
  {
    id: "londec-concept",
    state: "CONCEPT RECORD · REQUIRES OWNER RELEASE",
    title: "$LONDC release concept",
    source: "Owner-authored ScrollVerse token context and Activation Register",
    detail: "No contract, network, supply, allocation, price, exchange, wallet, custody, transfer, reward, governance enrollment, or sale is set.",
    required: "Named token record, chain/network, mechanism, rights and public description, eligibility, custody, transfer terms, provider, price/currency decision, owner release, and public verification.",
    accent: "#FFCC4D",
    icon: Coins,
  },
  {
    id: "guardian-concept",
    state: "MEMBERSHIP CONCEPT · REQUIRES OWNER RELEASE",
    title: "Guardian pathway concept",
    source: "Guardian readiness, Subscribe release record, and Product Release Pipeline",
    detail: "No paid tier, subscription, access entitlement, customer account, staking, Zakat distribution, reward, allocation, or delivery is active.",
    required: "Exact program, terms, eligibility, price/currency and tax basis where paid, payment destination, access/delivery, support/refund path, owner release, correction, and post-release verification.",
    accent: "#00D4FF",
    icon: ShieldCheck,
  },
  {
    id: "edition-records",
    state: "EDITION RECORDS · PRICE UNSET",
    title: "Original books and editions",
    source: "Books discovery, ScrollVerse Perspectives, and Creator Catalog Readiness",
    detail: "Titles and reader pathways are available as source and release-preparation records. A platform reference, digital format, or free-reader route does not establish a paid edition or delivery.",
    required: "One release record per title/version with source, creator, rights/contributors, accessible description, format, price/currency if paid, delivery, support/refund terms, destination/provider, owner release, and publication verification.",
    accent: "#B5F7CC",
    icon: BookOpen,
  },
];

export default function TokenStore() {
  useSovereignHeartbeat({ page: "token-release-readiness" });
  const [selectedId, setSelectedId] = useState(TOKEN_AND_EDITION_RECORDS[0].id);
  const [note, setNote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const selected = useMemo(() => TOKEN_AND_EDITION_RECORDS.find((record) => record.id === selectedId) ?? TOKEN_AND_EDITION_RECORDS[0], [selectedId]);

  const copyPacket = async () => {
    if (!acknowledged) {
      toast.error("Confirm the release boundary first", { description: "This browser-local record cannot authorize a token, book sale, wallet, checkout, or provider action." });
      return;
    }
    const packet = [
      "SCROLLVERSE TOKEN / EDITION RELEASE PACKET · BROWSER-LOCAL DRAFT",
      `Record: ${selected.title}`,
      `State: ${selected.state}`,
      `Source: ${selected.source}`,
      `Current boundary: ${selected.detail}`,
      `Required before any external action: ${selected.required}`,
      `Owner note: ${note.trim() || "Not supplied"}`,
      "No contract, chain, wallet, token, NFT, price, supply, checkout, payment, customer account, delivery, payout, transfer, sale, or provider action is authorized by this draft.",
    ].join("\n\n");
    try {
      await navigator.clipboard.writeText(packet);
      toast.success("Release packet copied", { description: "This is a browser-local preparation record only." });
    } catch {
      toast.error("Copy unavailable", { description: "Select the text manually; no external action was taken." });
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#FFCC4D]/25 bg-[radial-gradient(circle_at_82%_8%,rgba(255,204,77,.16),transparent_28%),radial-gradient(circle_at_10%_82%,rgba(0,212,255,.12),transparent_28%),#050B1A]">
      <div className="container py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← SCROLLVERSE FRONT DOOR</Link><span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">TOKEN + EDITION READINESS · NO CHECKOUT ACTIVE</span></div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.13fr_.87fr] lg:items-end">
          <div><p className="text-xs font-mono tracking-[.2em] text-[#FFDEA0]">$LONDC · SOURCE-LABELED RELEASE PREPARATION</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Original records first. <span className="text-[#FFCC4D]">No token sale or checkout active.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This route prepares one named token, membership, or edition record at a time. It does not represent a live Polygon deployment, token supply, price, exchange, wallet, book store, subscription, checkout, distribution, or reward program.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/creator-catalog-readiness" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426]">Full catalog readiness</Link><Link href="/activation-register" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Exact action register</Link><Link href="/nft-marketplace" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Collector readiness</Link></div></div>
          <aside className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#071426]/90 p-7"><LockKeyhole className="h-9 w-9 text-[#FFDEA0]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black leading-tight">Release-ready preparation. External action unavailable.</p><div className="mt-6 grid gap-3 text-xs leading-6 text-[#D6E2EE]"><p><span className="font-mono text-[#FFDEA0]">CONTRACT + NETWORK · </span>Unset</p><p><span className="font-mono text-[#FFDEA0]">PRICE + SUPPLY · </span>Unset</p><p><span className="font-mono text-[#FFDEA0]">WALLET + CUSTODY · </span>No active route</p></div></aside>
        </div>
      </div>
    </section>

    <section className="container py-10"><PortalTrustLens lane="$LONDC and edition readiness" source="Owner-authored ScrollVerse token context, Books discovery, ScrollVerse Perspectives, Creator Catalog Readiness, Activation Register, and controlled delivery records." readiness="Source-labeled release records and browser-local packet preparation are available. No external payment, token, membership, book sale, wallet, or provider action is active." boundary="This page does not create or inspect a contract, chain, exchange, wallet, custody account, token supply, payment session, customer account, subscription, book listing, delivery, payout, transfer, or sale." /></section>

    <section className="container py-6"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">SOURCE-LABELED RELEASE LANES</p><h2 className="mt-2 text-3xl font-black">One named record before one irreversible choice.</h2></div><WalletCards className="h-9 w-9 text-[#FFDEA0]" /></div><div className="mt-7 grid gap-5 lg:grid-cols-[.82fr_1.18fr]"><div className="grid gap-3 self-start">{TOKEN_AND_EDITION_RECORDS.map((record) => { const Icon = record.icon; const active = record.id === selected.id; return <button type="button" key={record.id} onClick={() => { setSelectedId(record.id); setAcknowledged(false); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: active ? record.accent : "rgba(255,255,255,.12)", background: active ? `${record.accent}14` : "rgba(255,255,255,.02)" }}><div className="flex gap-3"><span className="mt-0.5 rounded-xl p-2" style={{ background: `${record.accent}18`, color: record.accent }}><Icon className="h-5 w-5" /></span><span><span className="block text-[10px] font-mono tracking-[.14em]" style={{ color: record.accent }}>{record.state}</span><span className="mt-1 block text-lg font-black text-white">{record.title}</span></span></div></button>; })}</div><article className="rounded-[2rem] border p-7 sm:p-10" style={{ borderColor: `${selected.accent}55`, background: `radial-gradient(circle at 90% 10%, ${selected.accent}16, transparent 28%), #071426` }}><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: selected.accent }}>{selected.state}</p><h3 className="mt-3 text-3xl font-black">{selected.title}</h3><p className="mt-5 text-xs font-mono tracking-[.12em] text-[#B8C7D6]">SOURCE · {selected.source}</p><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">{selected.detail}</p><div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: selected.accent }}>REQUIRED BEFORE ANY EXTERNAL ACTION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.required}</p></div></article></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_88%_10%,rgba(0,212,255,.12),transparent_25%),#071426] p-7 sm:p-10"><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">BROWSER-LOCAL RELEASE PACKET</p><h2 className="mt-3 text-3xl font-black">Prepare the evidence. Do not infer the action.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">A note can help organize the missing source, rights, custody, delivery, or terms information. It stays in this browser until you choose to copy it; it is not saved to an account or transmitted to a provider.</p><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Record only public-safe source, rights, contributor, terms, delivery, and release context. Do not enter credentials, wallet addresses, customer data, bank details, private keys, or recovery codes." className="mt-6 min-h-32 w-full rounded-2xl border border-[#00D4FF]/25 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-[#7F93A5] focus:border-[#00D4FF]/70" /><label className="mt-5 flex items-start gap-3 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4 text-sm leading-6 text-[#FFDEA0]"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I confirm this draft does not authorize a contract, chain, token, supply, price, exchange, wallet, custody, checkout, payment, membership, book sale, delivery, payout, transfer, reward, or provider action.</label><button type="button" onClick={copyPacket} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5"><Copy className="h-4 w-4" />Copy release packet</button></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.05] p-7 sm:p-10"><Sparkles className="h-8 w-8 text-[#FF9EB9]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FF9EB9]">EXACT ACTION GATE</p><h2 className="mt-3 text-3xl font-black">A release packet is not an automatic issue, sale, or checkout authority.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Before any provider-side token, book, membership, wallet, custody, payment, checkout, exchange, or delivery action, the active request must name the exact record, provider or destination, setting or amount, visitor and financial consequence, public terms, and rollback condition. One exact current owner confirmation is required for that one action.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/activation-register" className="rounded-xl bg-[#FF6B9A] px-5 py-3 text-sm font-black text-[#071426]">Open Activation Register</Link><Link href="/payment-launch-packets" className="rounded-xl border border-[#FF6B9A]/45 bg-[#FF6B9A]/10 px-5 py-3 text-sm font-black text-[#FF9EB9]">Payment launch packets</Link><Link href="/books" className="rounded-xl border border-white/15 bg-white/[.04] px-5 py-3 text-sm font-black text-white">Books readiness</Link></div></div></section>

    <footer className="container py-8 text-center text-xs font-mono text-[#8FA3B5]">SCROLLVERSE · $LONDC RELEASE READINESS · SOURCE, TERMS, OWNER RELEASE, THEN ONE EXACT ACTION</footer>
  </main>;
}
