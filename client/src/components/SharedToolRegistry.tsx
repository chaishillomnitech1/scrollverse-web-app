import { useMemo, useState } from "react";
import { Link } from "wouter";
import { AWAITING_ENUMERATION_COUNT, connectorToolSurface, DISCOVERED_TOOL_SURFACE_COUNT, ENUMERATED_TOOL_SURFACE_COUNT, type ConnectorCapability } from "@/lib/connectorSurface";

function displayState(entry: ConnectorCapability) {
  if (entry.state === "CONNECTED") return "CONNECTED";
  if (entry.state === "AVAILABLE" || entry.state === "READ-ONLY" || entry.state === "PARENT-ONLY") return entry.state;
  return "WAITING ON AUTHORIZATION";
}

function stateClass(entry: ConnectorCapability) {
  const state = displayState(entry);
  if (state === "CONNECTED") return "border-[#00FF88]/35 bg-[#00FF88]/10 text-[#B5F7CC]";
  if (state === "AVAILABLE" || state === "READ-ONLY" || state === "PARENT-ONLY") return "border-[#9DEBFF]/35 bg-[#9DEBFF]/10 text-[#A7EEFF]";
  return "border-[#FFCC4D]/35 bg-[#FFCC4D]/10 text-[#FFE09A]";
}

export function SharedToolRegistry({ compact = false }: { compact?: boolean }) {
  const connectedCount = connectorToolSurface.filter((entry) => entry.state === "CONNECTED").length;
  const waitingCount = connectorToolSurface.length - connectedCount;
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("ALL");
  const filteredConnectors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return connectorToolSurface.filter((entry) => {
      const matchesState = stateFilter === "ALL" || displayState(entry) === stateFilter;
      const searchable = `${entry.name} ${entry.connector} ${entry.connectsTo} ${entry.canDo}`.toLowerCase();
      return matchesState && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [query, stateFilter]);

  return (
    <section id="shared-tool-registry" className={`rounded-[2rem] border border-[#00FF88]/30 bg-[radial-gradient(circle_at_8%_8%,rgba(0,255,136,.12),transparent_30%),radial-gradient(circle_at_92%_92%,rgba(185,140,255,.1),transparent_32%),#071426] ${compact ? "p-5" : "p-6 md:p-8"}`} aria-labelledby="shared-tool-registry-heading">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-[.2em] text-[#B5F7CC]">SHARED TOOL LAYER · PRIMARY EMBEDDING SURFACE</p><h2 id="shared-tool-registry-heading" className="mt-3 text-3xl font-black">SHARED TOOL REGISTRY</h2></div><span className="rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-3 py-1.5 text-[10px] font-mono tracking-[.12em] text-[#B5F7CC]">{DISCOVERED_TOOL_SURFACE_COUNT} OBSERVED CARDS · {connectedCount} CONNECTED · {waitingCount} NAMED RECORDS</span></div>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The full Manus resource and connector registry is embedded in ScrollVerse.co, Muse’s seat, and the Legion layer. Every attached connector and addition may enhance every surface and build within its truthful state; every Legion citizen inherits this shared layer. Higgsfield is listed as a verified directory capability for cinematic images, videos, character-consistent assets, and campaign-ready visuals; first-use authorization remains explicit. Every artifact, website, and media surface can point back to the same source of truth. A tool stands as wired where it actually works, and as a <strong className="text-[#FFE09A]">named record</strong> where it still waits on connection or authorization.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-xl border border-[#00FF88]/25 bg-[#00FF88]/[.06] p-4"><p className="text-[10px] font-mono text-[#B5F7CC]">CONNECTED</p><p className="mt-2 text-2xl font-black text-[#B5F7CC]">{connectedCount}</p></div><div className="rounded-xl border border-[#FFCC4D]/25 bg-[#FFCC4D]/[.06] p-4"><p className="text-[10px] font-mono text-[#FFE09A]">WAITING ON AUTHORIZATION</p><p className="mt-2 text-2xl font-black text-[#FFE09A]">{waitingCount}</p></div><div className="rounded-xl border border-[#9DEBFF]/25 bg-[#9DEBFF]/[.06] p-4"><p className="text-[10px] font-mono text-[#A7EEFF]">LOCAL ENUMERATION</p><p className="mt-2 text-2xl font-black text-[#A7EEFF]">{ENUMERATED_TOOL_SURFACE_COUNT}</p></div><div className="rounded-xl border border-[#D6B14F]/25 bg-[#D6B14F]/[.06] p-4"><p className="text-[10px] font-mono text-[#FFE09A]">AWAITING ENUMERATION</p><p className="mt-2 text-2xl font-black text-[#FFE09A]">{AWAITING_ENUMERATION_COUNT}</p></div></div>
      <p className="mt-4 rounded-xl border border-[#D6B14F]/25 bg-[#D6B14F]/[.06] p-4 text-xs leading-6 text-[#FFE09A]"><strong>424 OBSERVED CARDS:</strong> the owner-reported All-list count is recorded here as a discovery total. Only 80 card names are enumerated in this local catalog; the remaining 344 are awaiting a supplied enumeration and are not claimed active. Phone and Email remain named provisioning records, not created connectors. Shopify XLVIIIblocks is listed as connected from the reported installed connector state. PayPal Checkout remains owner-authorization gated.</p>
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex flex-col gap-3 md:flex-row"><label className="flex-1"><span className="sr-only">Search 80 connectors</span><input aria-label="Search 80 connectors" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search 80 connectors" className="w-full rounded-lg border border-white/15 bg-[#030914]/70 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#00FF88]/70 focus:ring-2 focus:ring-[#00FF88]/25" /></label><label><span className="sr-only">Filter connector state</span><select aria-label="Filter connector state" value={stateFilter} onChange={(event) => setStateFilter(event.target.value)} className="rounded-lg border border-white/15 bg-[#030914]/70 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#00FF88]/70 focus:ring-2 focus:ring-[#00FF88]/25"><option value="ALL">All states</option><option value="CONNECTED">CONNECTED</option><option value="AVAILABLE">AVAILABLE</option><option value="READ-ONLY">READ-ONLY</option><option value="PARENT-ONLY">PARENT-ONLY</option><option value="WAITING ON AUTHORIZATION">WAITING ON AUTHORIZATION</option></select></label></div>
        <p className="mt-3 text-[10px] font-mono text-[#B8C7D6]">SHOWING {filteredConnectors.length} OF {ENUMERATED_TOOL_SURFACE_COUNT} LOCAL RECORDS · METADATA-ONLY · NO EXTERNAL INVOCATION</p>
        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">{filteredConnectors.map((entry) => { const featured = entry.name.toLowerCase().includes("higgsfield"); return <article key={entry.id} className={`group rounded-xl border p-3 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#00FF88]/60 motion-safe:hover:bg-white/[.04] motion-reduce:transition-none ${featured ? "border-[#D6B14F]/70 bg-[#D6B14F]/[.09] shadow-[0_0_24px_rgba(214,177,79,.12)]" : "border-white/10 bg-[#030914]/60"}`}><div className="flex items-start justify-between gap-2"><div><div className="relative"><h3 className="text-sm font-black leading-tight" title={entry.canDo}>{entry.name}</h3><span role="tooltip" className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-56 rounded-lg border border-[#9DEBFF]/40 bg-[#030914] p-2 text-[10px] leading-4 text-[#D6E2EE] opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">{entry.canDo}</span></div>{featured && <span className="mt-1 inline-flex rounded-full border border-[#D6B14F]/50 px-2 py-0.5 text-[8px] font-mono tracking-[.1em] text-[#FFE09A]">HIGGSFIELD · FEATURED</span>}</div><span className={`rounded-full border px-2 py-1 text-[8px] font-mono leading-3 ${stateClass(entry)}`}>{displayState(entry)}</span></div><p className="mt-2 text-[10px] font-mono text-[#9DEBFF]">{entry.connector} · {entry.connectsTo}</p><p className="mt-2 text-[11px] leading-5 text-[#C8D8E7]">{entry.canDo}</p>{entry.adminUrl && <a href={entry.adminUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-lg border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-2 py-1 text-[10px] font-black text-[#FFE09A] transition-colors hover:border-[#FFE09A]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE09A]/60">ADMIN DOOR · {entry.state === "CONNECTED" ? "CONNECTED" : "LOGIN REQUIRED"} ↗</a>}</article>; })}</div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-[11px] leading-5 text-[#B8C7D6]">MUSE ACCEPTANCE RULE: independently verify that each connector serves, connects, and works before treating it as operational. This surface does not invoke external connectors.</p><Link href="/omniland#connector-surface" className="inline-flex items-center rounded-lg border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-3 py-2 text-[10px] font-black tracking-[.1em] text-[#A7EEFF]">OPEN FULL CONNECTOR SURFACE →</Link></div>
    </section>
  );
}
