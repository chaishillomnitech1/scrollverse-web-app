import { useMemo, useState } from "react";
import { Download, Filter, FileCheck2, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type Vector = "Replay source" | "Local capability" | "External gate";

type ReplayRecord = {
  id: string;
  vector: Vector;
  title: string;
  state: "AVAILABLE NOW" | "RESEARCH" | "REQUIRES OWNER RELEASE";
  detail: string;
  needed: string;
  source: string;
  color: string;
};

const RECORDS: ReplayRecord[] = [
  { id: "REPLAY-001", vector: "Replay source", title: "Three-replay source index", state: "RESEARCH", detail: "The supplied replay set carries DNS, contract, master-media, replay filtering, audit export, and staging-checklist requests.", needed: "Source links are preserved in the local evidence record.", source: "Owner-supplied Manus replay references", color: "#DCC8FF" },
  { id: "LOCAL-001", vector: "Local capability", title: "Multi-vector replay filtering", state: "AVAILABLE NOW", detail: "Filter the local record list by replay source, browser-local capability, or external release gate.", needed: "No account, provider, or external delivery input is required.", source: "Current browser-local console", color: "#9DEBFF" },
  { id: "LOCAL-002", vector: "Local capability", title: "Offline audit export preparation", state: "AVAILABLE NOW", detail: "Export the currently visible local record set as a plain-text audit snapshot from this browser.", needed: "The visitor chooses where to save the local export.", source: "Current browser-local console", color: "#B5F7CC" },
  { id: "LOCAL-003", vector: "Local capability", title: "Staged release checklist", state: "AVAILABLE NOW", detail: "Track review of release prerequisites in a local checklist without altering a branch, provider, or production setting.", needed: "A separately authorized branch operation is required for any repository change outside this portal.", source: "Current browser-local console", color: "#FFE09A" },
  { id: "GATE-001", vector: "External gate", title: "scrollverse.co DNS binding", state: "REQUIRES OWNER RELEASE", detail: "Prepare the registrar-facing DNS record before asking an authorized owner to apply it.", needed: "Registrar, exact record type/name/value or target, TTL, current destination, rollback record, and current owner confirmation.", source: "Owner-supplied replay request", color: "#FFB48C" },
  { id: "GATE-002", vector: "External gate", title: "Star Dust Collective contract deployment", state: "REQUIRES OWNER RELEASE", detail: "Prepare a testnet-first contract release record and keep mainnet broadcast separate.", needed: "Exact network, audited source or ABI, named deployer/provider, metadata URI, royalty terms, maximum fee, exact transaction, and same-conversation confirmation.", source: "Owner-supplied replay request", color: "#FF8DAA" },
  { id: "GATE-003", vector: "External gate", title: "Master audio and 4K reel intake", state: "REQUIRES OWNER RELEASE", detail: "Prepare a per-file secure-media intake record for authorized masters and animated reels.", needed: "Authorized original file or exact local path, title, date, use scope, attribution, accessibility material, destination, and owner release.", source: "Owner-supplied replay request", color: "#FFB48C" },
];

const CHECKLISTS = [
  { id: "check-source", label: "Replay source and current portal route are identified", vector: "Replay source" as Vector },
  { id: "check-tests", label: "TypeScript and regression checks are recorded for local changes", vector: "Local capability" as Vector },
  { id: "check-dns", label: "DNS record, destination, and rollback record are exact", vector: "External gate" as Vector },
  { id: "check-contract", label: "Contract network, source, fee cap, and exact transaction record are complete", vector: "External gate" as Vector },
  { id: "check-media", label: "Authorized master file, use scope, and destination are complete", vector: "External gate" as Vector },
] as const;

export default function ReplayReadinessDesk() {
  useSovereignHeartbeat({ page: "replay-readiness" });
  const [vector, setVector] = useState<Vector | "All">("All");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const visibleRecords = useMemo(
    () => vector === "All" ? RECORDS : RECORDS.filter((record) => record.vector === vector),
    [vector],
  );

  const exportAudit = () => {
    const lines = [
      "SCROLLVERSE REPLAY-READINESS LOCAL AUDIT",
      `Generated locally: ${new Date().toISOString()}`,
      `Vector filter: ${vector}`,
      "",
      ...visibleRecords.flatMap((record) => [
        `${record.id} · ${record.vector} · ${record.state}`,
        record.title,
        `Detail: ${record.detail}`,
        `Required input: ${record.needed}`,
        `Source: ${record.source}`,
        "",
      ]),
      "Boundary: This is a browser-local audit export. It does not perform DNS, branch, provider, media-vault, contract, wallet, marketplace, payment, or publishing actions.",
    ];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "scrollverse-replay-readiness-audit.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Local replay-readiness audit export prepared.");
  };

  const stateColor = (state: ReplayRecord["state"]) => state === "AVAILABLE NOW" ? "#B5F7CC" : state === "RESEARCH" ? "#DCC8FF" : "#FFDEA0";

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <header className="border-b border-[#00D4FF]/20 bg-[radial-gradient(circle_at_12%_0%,rgba(0,212,255,.16),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(185,140,255,.17),transparent_28%),#050B1A]">
      <div className="container py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/creator-atlas" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← CREATOR ATLAS</Link><span className="rounded-full border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#DCC8FF]">SOURCE-LABELED · BROWSER-LOCAL</span></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.18fr_.82fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.19em] text-[#9DEBFF]">REPLAY TRANSMISSION CONSOLE</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Replay sources, <span className="text-[#DCC8FF]">clear next moves.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Filter the retained replay work by vector, export a local audit snapshot, and keep release prerequisites visible before any consequential external step.</p></div><div className="rounded-[1.75rem] border border-[#00FF88]/30 bg-[#00FF88]/[.045] p-6"><ShieldCheck className="h-7 w-7 text-[#B5F7CC]" /><p className="mt-4 text-xs font-mono tracking-[.15em] text-[#B5F7CC]">LOCAL CONTROL SURFACE</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Filtering, checklist state, and export are available now in this browser. DNS, contracts, and master-media moves remain item-specific release records.</p></div></div>
      </div>
    </header>

    <section className="container py-8"><PortalTrustLens lane="Replay Readiness" source="Three owner-supplied Manus replay references, Phase 602 replay-readiness source record, and browser-local route implementation." readiness="Interactive multi-vector filtering, staged checklist preparation, and browser-local audit export are available now." boundary="This console does not change DNS, mutate a branch, deploy a contract, access a wallet, upload masters, operate a media vault, or publish through an external provider." /></section>

    <section className="container py-6"><div className="rounded-[1.75rem] border border-white/10 bg-white/[.035] p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-[10px] font-mono tracking-[.15em] text-[#AFC0CF]">MULTI-VECTOR FILTER</p><p className="mt-2 text-sm text-[#D6E2EE]">{visibleRecords.length} source-labeled record{visibleRecords.length === 1 ? "" : "s"} in view.</p></div><button onClick={exportAudit} className="inline-flex items-center gap-2 rounded-xl border border-[#00FF88]/45 bg-[#00FF88]/10 px-4 py-2.5 text-xs font-black text-[#B5F7CC]"><Download className="h-4 w-4" />EXPORT CURRENT LOCAL AUDIT</button></div><div className="mt-5 flex flex-wrap gap-2">{(["All", "Replay source", "Local capability", "External gate"] as const).map((item) => <button key={item} onClick={() => setVector(item)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition" style={{ borderColor: vector === item ? "#00D4FF" : "rgba(255,255,255,.12)", background: vector === item ? "rgba(0,212,255,.14)" : "rgba(255,255,255,.03)", color: vector === item ? "#9DEBFF" : "#C8D8E7" }}><Filter className="h-3.5 w-3.5" />{item}</button>)}</div></div></section>

    <section className="container py-5"><div className="grid gap-4 lg:grid-cols-2">{visibleRecords.map((record) => <article key={record.id} className="rounded-[1.65rem] border border-white/10 bg-[#071426] p-6"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] font-mono tracking-[.15em]" style={{ color: record.color }}>{record.id} · {record.vector.toUpperCase()}</span><span className="rounded-full border px-3 py-1 text-[9px] font-mono" style={{ borderColor: `${stateColor(record.state)}70`, color: stateColor(record.state), background: `${stateColor(record.state)}12` }}>{record.state}</span></div><h2 className="mt-4 text-2xl font-black">{record.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{record.detail}</p><div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-mono tracking-[.14em] text-[#AFC0CF]">REQUIRED INPUT / NEXT CONTROL</p><p className="mt-2 text-xs leading-6 text-[#D6E2EE]">{record.needed}</p><p className="mt-3 text-[10px] font-mono text-[#AFC0CF]">SOURCE · {record.source}</p></div></article>)}</div></section>

    <section className="container py-8"><div className="rounded-[1.9rem] border border-[#FFB800]/35 bg-[radial-gradient(circle_at_88%_0%,rgba(255,184,0,.16),transparent_28%),#071426] p-7"><div className="flex items-start gap-4"><FileCheck2 className="mt-1 h-7 w-7 text-[#FFE09A]" /><div><p className="text-xs font-mono tracking-[.17em] text-[#FFE09A]">STAGED RELEASE-CHECKLIST VERIFICATION</p><h2 className="mt-3 text-3xl font-black">Prepare the record before an external move.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#D6E2EE]">These checks are browser-local preparation signals. They do not verify or change a branch, registrar, provider, wallet, vault, or network.</p></div></div><div className="mt-6 grid gap-3 md:grid-cols-2">{CHECKLISTS.map((item) => <label key={item.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"><input type="checkbox" checked={Boolean(checked[item.id])} onChange={() => setChecked((current) => ({ ...current, [item.id]: !current[item.id] }))} className="mt-1 h-4 w-4 accent-[#00D4FF]" /><span><span className="block text-sm font-bold text-white">{item.label}</span><span className="mt-1 block text-[10px] font-mono text-[#AFC0CF]">{item.vector.toUpperCase()}</span></span></label>)}</div><div className="mt-6 flex flex-wrap gap-3"><Link href="/continuation-readiness-register" className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]"><SlidersHorizontal className="h-4 w-4" />OPEN RELEASE REGISTER</Link><Link href="/creator-media-packet" className="rounded-xl border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">OPEN MEDIA PACKET</Link></div></div></section>
  </main>;
}
