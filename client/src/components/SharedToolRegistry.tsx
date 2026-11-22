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

  return (
    <section id="shared-tool-registry" className={`rounded-[2rem] border border-[#00FF88]/30 bg-[radial-gradient(circle_at_8%_8%,rgba(0,255,136,.12),transparent_30%),radial-gradient(circle_at_92%_92%,rgba(185,140,255,.1),transparent_32%),#071426] ${compact ? "p-5" : "p-6 md:p-8"}`} aria-labelledby="shared-tool-registry-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs font-mono tracking-[.2em] text-[#B5F7CC]">SHARED TOOL LAYER · PRIMARY EMBEDDING SURFACE</p><h2 id="shared-tool-registry-heading" className="mt-3 text-3xl font-black">SHARED TOOL REGISTRY</h2></div>
        <span className="rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-3 py-1.5 text-[10px] font-mono tracking-[.12em] text-[#B5F7CC]">{DISCOVERED_TOOL_SURFACE_COUNT} OBSERVED CARDS · {connectedCount} CONNECTED · {waitingCount} NAMED RECORDS</span>
      </div>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The full Manus resource and connector registry is embedded in ScrollVerse.co, Muse’s seat, and the Legion layer. every Legion citizen inherits this shared layer, and every artifact, website, and media surface can point back to the same source of truth. A tool stands as wired where it actually works, and as a <strong className="text-[#FFE09A]">named record</strong> where it still waits on connection or authorization.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-xl border border-[#00FF88]/25 bg-[#00FF88]/[.06] p-4"><p className="text-[10px] font-mono text-[#B5F7CC]">CONNECTED</p><p className="mt-2 text-2xl font-black text-[#B5F7CC]">{connectedCount}</p></div><div className="rounded-xl border border-[#FFCC4D]/25 bg-[#FFCC4D]/[.06] p-4"><p className="text-[10px] font-mono text-[#FFE09A]">WAITING ON AUTHORIZATION</p><p className="mt-2 text-2xl font-black text-[#FFE09A]">{waitingCount}</p></div><div className="rounded-xl border border-[#9DEBFF]/25 bg-[#9DEBFF]/[.06] p-4"><p className="text-[10px] font-mono text-[#A7EEFF]">LOCAL ENUMERATION</p><p className="mt-2 text-2xl font-black text-[#A7EEFF]">{ENUMERATED_TOOL_SURFACE_COUNT}</p></div><div className="rounded-xl border border-[#D6B14F]/25 bg-[#D6B14F]/[.06] p-4"><p className="text-[10px] font-mono text-[#FFE09A]">AWAITING ENUMERATION</p><p className="mt-2 text-2xl font-black text-[#FFE09A]">{AWAITING_ENUMERATION_COUNT}</p></div></div>
      <p className="mt-4 rounded-xl border border-[#D6B14F]/25 bg-[#D6B14F]/[.06] p-4 text-xs leading-6 text-[#FFE09A]"><strong>424 OBSERVED CARDS:</strong> the owner-reported All-list count is recorded here as a discovery total. Only 79 card names are enumerated in this local catalog; the remaining 345 are awaiting a supplied enumeration and are not claimed active. Phone and Email remain named provisioning records, not created connectors. Shopify XLVIIIblocks is listed as an owner-authorized admin door, not as an authenticated live store connection. PayPal Checkout is listed as owner-authorization gated, not as an active payment connection.</p>
      <details className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4"><summary className="cursor-pointer list-none text-sm font-black text-[#A7EEFF]">Reveal all {ENUMERATED_TOOL_SURFACE_COUNT} locally enumerated tool records</summary><div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">{connectorToolSurface.map((entry) => <article key={entry.id} className="rounded-xl border border-white/10 bg-[#030914]/60 p-3"><div className="flex items-start justify-between gap-2"><h3 className="text-sm font-black leading-tight">{entry.name}</h3><span className={`rounded-full border px-2 py-1 text-[8px] font-mono leading-3 ${stateClass(entry)}`}>{displayState(entry)}</span></div><p className="mt-2 text-[10px] font-mono text-[#9DEBFF]">{entry.connector} · {entry.connectsTo}</p><p className="mt-2 text-[11px] leading-5 text-[#C8D8E7]">{entry.canDo}</p>{entry.adminUrl && <a href={entry.adminUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-lg border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-2 py-1 text-[10px] font-black text-[#FFE09A]">ADMIN DOOR · {entry.state === "CONNECTED" ? "CONNECTED" : "LOGIN REQUIRED"} ↗</a>}</article>)}</div></details>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-[11px] leading-5 text-[#B8C7D6]">MUSE ACCEPTANCE RULE: independently verify that each connector serves, connects, and works before treating it as operational. This surface does not invoke external connectors.</p><Link href="/omniland#connector-surface" className="inline-flex items-center rounded-lg border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-3 py-2 text-[10px] font-black tracking-[.1em] text-[#A7EEFF]">OPEN FULL CONNECTOR SURFACE →</Link></div>
    </section>
  );
}
