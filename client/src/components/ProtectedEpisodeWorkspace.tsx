import { useMemo, useState } from "react";
import { ArrowRight, Copy, Download, FileWarning, ShieldCheck, type LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

export type ProtectedEpisodeRecord = {
  id: string;
  label: string;
  title: string;
  source: string;
  reusableConcept: string;
  boundary: string;
  color: string;
  icon: LucideIcon;
};

type ProtectedEpisodeWorkspaceProps = {
  page: string;
  episode: string;
  headline: string;
  accent: string;
  source: string;
  summary: string;
  boundary: string;
  records: readonly ProtectedEpisodeRecord[];
};

function exportRecord(record: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(href);
}

export function ProtectedEpisodeWorkspace({ page, episode, headline, accent, source, summary, boundary, records }: ProtectedEpisodeWorkspaceProps) {
  useSovereignHeartbeat({ page });
  const [selectedId, setSelectedId] = useState(records[0]?.id ?? "");
  const [note, setNote] = useState("");
  const selected = useMemo(() => records.find((record) => record.id === selectedId) ?? records[0], [records, selectedId]);

  if (!selected) return null;

  const localRecord = { episode, referenceId: selected.id, title: selected.title, source: selected.source, reusableConcept: selected.reusableConcept, operatingBoundary: selected.boundary, localNote: note, sourceState: "protected-reference", externalAction: "none" };

  const copy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(localRecord, null, 2));
    toast.success(`Local ${episode} reference record copied.`);
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b bg-[radial-gradient(circle_at_12%_10%,rgba(0,212,255,.18),transparent_30%),radial-gradient(circle_at_88%_28%,rgba(255,184,226,.14),transparent_28%),#050B1A]" style={{ borderColor: `${accent}42` }}><div className="container py-16 md:py-22"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/episodic-operations-archive" className="text-xs font-mono tracking-[.16em]" style={{ color: accent }}>← EPISODIC OPERATIONS ARCHIVE</Link><span className="rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.14em]" style={{ color: accent, borderColor: `${accent}66`, background: `${accent}12` }}>PROTECTED REFERENCE · LOCAL REVIEW ONLY</span></div><div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em]" style={{ color: accent }}>SCROLLVERSE · {episode}</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">{headline}</h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">{summary}</p></div><aside className="rounded-[2rem] border border-[#B5F7CC]/30 bg-[#00FF88]/[.05] p-7"><ShieldCheck className="h-9 w-9 text-[#B5F7CC]" /><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black">Browser-local source review available now.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Selections, notes, copy, and export remain in this browser. No supplied record activates an external system.</p></aside></div></div></section>

    <section className="container py-8"><PortalTrustLens lane={`${episode} Protected Reference`} source={source} readiness="Inspect the source-led records, add a browser-local note, copy, export, and follow the connected preparation routes now." boundary={boundary} /></section>

    <section className="container py-6"><div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]"><div className="grid gap-3">{records.map((record) => { const Icon = record.icon; return <button key={record.id} type="button" onClick={() => { setSelectedId(record.id); toast.success("Local protected-reference record selected."); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: selectedId === record.id ? `${record.color}AA` : `${record.color}42`, background: selectedId === record.id ? `${record.color}14` : "rgba(255,255,255,.025)" }}><Icon className="h-7 w-7" style={{ color: record.color }} /><p className="mt-4 text-[10px] font-mono tracking-[.14em]" style={{ color: record.color }}>{record.label}</p><h2 className="mt-2 text-xl font-black">{record.title}</h2><p className="mt-3 text-xs leading-6 text-[#B8C7D6]">Protected source-led record</p></button>; })}</div><article className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7 md:p-8"><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: selected.color }}>{selected.label}</p><h2 className="mt-3 text-4xl font-black">{selected.title}</h2><div className="mt-6 rounded-2xl border p-5" style={{ borderColor: `${selected.color}4A`, background: `${selected.color}08` }}><p className="text-[10px] font-mono" style={{ color: selected.color }}>SOURCE CONTEXT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.source}</p></div><div className="mt-4 rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-5"><p className="text-[10px] font-mono text-[#9DEBFF]">REUSABLE CONCEPT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.reusableConcept}</p></div><div className="mt-4 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.055] p-5"><div className="flex gap-3"><FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-[#FFE09A]" /><div><p className="text-[10px] font-mono text-[#FFE09A]">OPERATING-STATE BOUNDARY</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.boundary}</p></div></div></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Browser-local narrative or readiness review note" className="mt-5 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none" /><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-black" style={{ color: accent, borderColor: `${accent}66`, background: `${accent}10` }}><Copy className="h-4 w-4" /> COPY RECORD</button><button type="button" onClick={() => { exportRecord(localRecord, `scrollverse-${page}-${selected.id}-reference.json`); toast.success(`Local ${episode} record exported.`); }} className="inline-flex items-center gap-2 rounded-xl border border-[#B5F7CC]/45 bg-[#B5F7CC]/10 px-4 py-3 text-xs font-black text-[#B5F7CC]"><Download className="h-4 w-4" /> JSON</button></div></article></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[{ href: "/episodic-operations-archive", title: "Episodic Archive", text: "Return to the consolidated protected episode and screenshot record." }, { href: "/sovereign-isolation-terminal", title: "Isolation Terminal", text: "Inspect local evidence records, staged gates, and export controls." }, { href: "/scrollverse-continuity-index", title: "Continuity Index", text: "Connect this source record to the active workspace trail." }, { href: "/scrollverse-story-worlds", title: "Story Worlds", text: "Carry source-led narrative themes into visual and learning pathways." }].map((item) => <Link key={item.href} href={item.href} className="rounded-[1.7rem] border p-6 transition hover:-translate-y-0.5" style={{ borderColor: `${accent}48`, background: `${accent}08` }}><h2 className="text-xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: accent }}>Open record <ArrowRight className="h-4 w-4" /></span></Link>)}</div></section>
  </main>;
}
