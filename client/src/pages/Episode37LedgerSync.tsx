import { useMemo, useState } from "react";
import { ArrowRight, BookOpenText, Braces, Copy, Download, FileWarning, Film, Landmark, Layers3, ServerCog, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ReferenceRecord = {
  id: string;
  label: string;
  title: string;
  source: string;
  reusableConcept: string;
  currentState: string;
  boundary: string;
  color: string;
  icon: typeof Film;
};

const RECORDS: readonly ReferenceRecord[] = [
  {
    id: "narrative",
    label: "EPISODE 37 SOURCE CONTEXT",
    title: "The Immutable Ledger Sync",
    source: "Owner-supplied Google/Gemini reference text · Episode 37 narrative draft.",
    reusableConcept: "A production-planning story about evidence, history, review, and accountability inside a creator-controlled system.",
    currentState: "Source-led narrative preparation available now",
    boundary: "No completed script, performer, recording, film, broadcast, character use, narrator, or released episode is represented by this record.",
    color: "#DCC8FF",
    icon: Film,
  },
  {
    id: "schema",
    label: "LOCAL VALIDATION REFERENCE",
    title: "Schema Validator Pattern",
    source: "Owner-supplied Python/SQLite example from the protected reference text.",
    reusableConcept: "A local structural-review pattern: examine a data model in isolation before treating it as a live system.",
    currentState: "Architecture concept mapped to current local review controls",
    boundary: "ScrollVerse uses TypeScript, Drizzle, MySQL/TiDB, and Vitest. The pasted Python/SQLite snippet is not active project infrastructure.",
    color: "#9DEBFF",
    icon: Braces,
  },
  {
    id: "edge",
    label: "EDGE CONFIGURATION REFERENCE",
    title: "Environment-Specific Security Review",
    source: "Owner-supplied Nginx configuration block from the protected reference text.",
    reusableConcept: "Use explicit header, asset-boundary, and logging questions when reviewing an environment-specific deployment configuration.",
    currentState: "Architecture-readiness question set available now",
    boundary: "Managed hosting owns the production edge. The pasted configuration is not deployed, verified, editable, or active in this project.",
    color: "#FFCC4D",
    icon: ServerCog,
  },
  {
    id: "ledger",
    label: "ROYALTY RECORD REFERENCE",
    title: "Exact-Record Ledger Readiness",
    source: "Owner-supplied schema and blockchain-ingest language from the protected reference text.",
    reusableConcept: "Keep a record’s source, review status, and release gate visible before any external financial or chain operation is considered.",
    currentState: "Local non-custodial royalty record desk available now",
    boundary: "No RPC listener, blockchain event loop, wallet, token, transfer, contract, or automated ingestion process is active from this record.",
    color: "#B5F7CC",
    icon: Landmark,
  },
];

function exportRecord(record: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function Episode37LedgerSync() {
  useSovereignHeartbeat({ page: "episode-37-ledger-sync" });
  const [selectedId, setSelectedId] = useState("narrative");
  const [note, setNote] = useState("");
  const selected = useMemo(() => RECORDS.find((record) => record.id === selectedId) ?? RECORDS[0], [selectedId]);
  const localRecord = {
    referenceId: selected.id,
    title: selected.title,
    source: selected.source,
    reusableConcept: selected.reusableConcept,
    currentState: selected.currentState,
    boundary: selected.boundary,
    localNote: note,
    externalAction: "none",
    sourceState: "protected-reference",
  };

  const copy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(localRecord, null, 2));
    toast.success("Local Episode 37 reference record copied.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#DCC8FF]/25 bg-[radial-gradient(circle_at_12%_10%,rgba(185,140,255,.22),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(0,212,255,.17),transparent_28%),#050B1A]">
      <div className="container py-16 md:py-22">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/episode-experience" className="text-xs font-mono tracking-[.16em] text-[#E8DFFF]">← EPISODE EXPERIENCE</Link><span className="rounded-full border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#FFE09A]">PROTECTED REFERENCE · NO RUNTIME ACTIVE</span></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#DCC8FF]">SCROLLVERSE · EPISODE 37</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">The <span className="text-[#DCC8FF]">ledger</span> is a record.<br/>Not a claim of runtime.</h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This browser-local workspace preserves the supplied Episode 37 and infrastructure material as a source-led narrative and architecture-readiness record. It extracts reusable ideas while keeping deployment, ledger, blockchain, and network claims visibly separate from the current verified portal state.</p></div><aside className="rounded-[2rem] border border-[#B5F7CC]/30 bg-[#00FF88]/[.05] p-7"><ShieldCheck className="h-9 w-9 text-[#B5F7CC]" /><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black">Local reference review is available now.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">No server deployment, Nginx change, chain listener, wallet connection, transfer, or automated process is active from this route.</p></aside></div>
      </div>
    </section>

    <section className="container py-8"><PortalTrustLens lane="Episode 37 Protected Reference" source="Owner-supplied Google/Gemini Episode 37 narrative, schema-validator, server-configuration, and asset-catalog reference material." readiness="Inspect records, add a browser-local note, copy, export, and follow current verified preparation routes now." boundary="The supplied text does not establish a completed episode, locked deployment, active server configuration, live ledger, blockchain ingestion, contract, wallet, token, transfer, or external runtime state." /></section>

    <section className="container py-6"><div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]"><div className="grid gap-3">{RECORDS.map((record) => { const Icon = record.icon; return <button key={record.id} type="button" onClick={() => { setSelectedId(record.id); toast.success("Local protected-reference record selected."); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: selectedId === record.id ? `${record.color}AA` : `${record.color}42`, background: selectedId === record.id ? `${record.color}14` : "rgba(255,255,255,.025)" }}><Icon className="h-7 w-7" style={{ color: record.color }} /><p className="mt-4 text-[10px] font-mono tracking-[.14em]" style={{ color: record.color }}>{record.label}</p><h2 className="mt-2 text-xl font-black">{record.title}</h2><p className="mt-3 text-xs leading-6 text-[#B8C7D6]">{record.currentState}</p></button>; })}</div><article className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7 md:p-8"><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: selected.color }}>{selected.label}</p><h2 className="mt-3 text-4xl font-black">{selected.title}</h2><div className="mt-6 rounded-2xl border p-5" style={{ borderColor: `${selected.color}4A`, background: `${selected.color}08` }}><p className="text-[10px] font-mono" style={{ color: selected.color }}>SOURCE CONTEXT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.source}</p></div><div className="mt-4 rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-5"><p className="text-[10px] font-mono text-[#9DEBFF]">REUSABLE CONCEPT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.reusableConcept}</p></div><div className="mt-4 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.055] p-5"><div className="flex gap-3"><FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-[#FFE09A]}" /><div><p className="text-[10px] font-mono text-[#FFE09A]">OPERATING-STATE BOUNDARY</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.boundary}</p></div></div></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Browser-local architecture or narrative review note" className="mt-5 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none" /><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#DCC8FF]/45 bg-[#DCC8FF]/10 px-4 py-3 text-xs font-black text-[#E8DFFF]"><Copy className="h-4 w-4" /> COPY RECORD</button><button type="button" onClick={() => { exportRecord(localRecord, `scrollverse-episode-37-${selected.id}-reference.json`); toast.success("Local Episode 37 record exported."); }} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-black" style={{ borderColor: `${selected.color}66`, color: selected.color, background: `${selected.color}10` }}><Download className="h-4 w-4" /> JSON</button></div></article></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[{ href: "/episode-experience", title: "Episode Experience", text: "Return to the broader browser-local episode and scene-development record.", color: "#DCC8FF", icon: Film }, { href: "/omnitotality-core-deck", title: "Omnitotality Core Deck", text: "Review the protected Episode 24, visual-system, and source-bound production record.", color: "#B5F7CC", icon: Layers3 }, { href: "/trinity-sovereign-portal", title: "Trinity Portal", text: "Compare this protected architecture reference with the current browser-local Trinity route.", color: "#9DEBFF", icon: ServerCog }, { href: "/admin/royalty-records", title: "Local Royalty Records", text: "Review the non-custodial local record desk and its current controls.", color: "#B5F7CC", icon: Landmark }, { href: "/sovereign-isolation-terminal", title: "Isolation Terminal", text: "Open local evidence records, staged gates, and export controls.", color: "#FFE09A", icon: ShieldCheck }, { href: "/scrollverse-continuity-index", title: "Continuity Index", text: "Connect this protected reference to the active workspace source trail.", color: "#FFB8E2", icon: BookOpenText }, { href: "/scrollverse-story-worlds", title: "Story Worlds", text: "Carry the narrative themes into source-led visual and learning pathways.", color: "#B5F7CC", icon: ArrowRight }].map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} className="rounded-[1.7rem] border p-6 transition hover:-translate-y-0.5" style={{ borderColor: `${item.color}48`, background: `${item.color}08` }}><Icon className="h-8 w-8" style={{ color: item.color }} /><h2 className="mt-5 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: item.color }}>Open record <ArrowRight className="h-4 w-4" /></span></Link>; })}</div></section>
  </main>;
}
