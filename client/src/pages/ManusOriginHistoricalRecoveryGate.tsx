import { useState } from "react";
import { Archive, ArrowLeft, ArrowRight, Copy, Download, FileWarning, History, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const SOURCE_ID = "da851283-c28e-49fe-9128-b34d67e2f272";

function download(value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "scrollverse-manus-origin-historical-recovery.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function ManusOriginHistoricalRecoveryGate() {
  useSovereignHeartbeat({ page: "manus-origin-historical-recovery-gate" });
  const [note, setNote] = useState("");
  const record = {
    recordId: "SV-MANUS-ORIGIN-HISTORICAL-RECOVERY-001",
    state: "research — visible source reattachment required",
    source: { suppliedReferenceId: SOURCE_ID, directSourcePresentInActiveWorkspace: false },
    scope: "owner-identified historical Manus-origin reference recovery gate",
    localNote: note,
    externalAction: "none",
  };
  const copy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(record, null, 2));
    toast.success("Manus-origin recovery gate copied.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#B98CFF]/30 bg-[radial-gradient(circle_at_12%_5%,rgba(185,140,255,.16),transparent_29%),radial-gradient(circle_at_85%_18%,rgba(0,212,255,.11),transparent_26%),#050B1A]">
      <div className="container py-16 md:py-22"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/codex-source-chronology" className="inline-flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#DFC8FF]"><ArrowLeft className="h-4 w-4"/> CODEX SOURCE CHRONOLOGY</Link><span className="rounded-full border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#FFE19A]">RESEARCH · SOURCE REATTACHMENT REQUIRED</span></div><div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#DFC8FF]">SCROLLVERSE · MANUS-ORIGIN HISTORICAL RECOVERY</p><h1 className="mt-4 text-5xl font-black leading-[.92] md:text-7xl">Preserve the<br/><span className="text-[#9DEBFF]">historical question.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">An owner-identified historical shared Manus source is referenced in the project record, but its directly visible material and former component are not retained in the active workspace. This route preserves the recovery state without rewriting or recreating history.</p></div><aside className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.06] p-7"><History className="h-9 w-9 text-[#DFC8FF]"/><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-[#DFC8FF]">RETAINED REFERENCE ID</p><p className="mt-3 break-all font-mono text-xs leading-6 text-[#D6E2EE]">{SOURCE_ID}</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Available now: a browser-local recovery record. Requires owner release: a direct source reattachment, exact path, or visible public reference.</p></aside></div></div>
    </section>
    <section className="container py-8"><PortalTrustLens lane="Manus-Origin Historical Recovery" source="Owner-identified historical shared-source ID retained in project history; direct source bytes and previous component are absent from the active workspace." readiness="Copy/export the recovery state, add a browser-local correction note, and follow chronology or protected-source handoffs." boundary="This route does not access Manus accounts, recover unseen conversations, claim a service state, reconstruct historical content, or activate a provider, deployment, payment, or external action." /></section>
    <section className="container py-3"><div className="grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-[#00D4FF]/30 bg-[#00D4FF]/[.05] p-7"><Archive className="h-7 w-7 text-[#9DEBFF]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">WHAT IS PRESERVED</p><h2 className="mt-2 text-3xl font-black">A source pointer, not a substitute.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The historical source ID, owner-provided historical classification, current active-workspace absence, and a route back into the Codex chronology are preserved. The original language, dates, plans, and outcomes remain unexpanded until a direct source is available.</p></article><article className="rounded-[2rem] border border-[#00FF88]/30 bg-[#00FF88]/[.05] p-7"><ShieldCheck className="h-7 w-7 text-[#7CFFBB]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#7CFFBB]">REATTACHMENT PATH</p><h2 className="mt-2 text-3xl font-black">Reconnect evidence without editing the past.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">One supplied original file, an exact project-local path, or a visible public source that identifies the historical record can begin a new evidence-led intake. Any successor record will preserve only directly visible scope and its own stable metadata.</p></article></div></section>
    <section className="container py-3"><article className="rounded-[2rem] border border-[#B98CFF]/30 bg-[#B98CFF]/[.05] p-7"><FileWarning className="h-7 w-7 text-[#DFC8FF]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#DFC8FF]">BROWSER-LOCAL CORRECTION PATH</p><h2 className="mt-2 text-3xl font-black">Keep the handoff exact.</h2><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Browser-local historical-source correction, direct reference, or reattachment note" className="mt-5 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none"/><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-4 py-3 text-xs font-black text-[#D9C1FF]"><Copy className="h-4 w-4"/> COPY</button><button type="button" onClick={() => { download(record); toast.success("Manus-origin recovery gate exported."); }} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-4 py-3 text-xs font-black text-[#9DEBFF]"><Download className="h-4 w-4"/> JSON</button></div></article></section>
    <section className="container py-6"><div className="grid gap-4 md:grid-cols-3">{[{ href: "/codex-source-chronology", title: "Codex Source Chronology", text: "Return to source-labeled chronology and its evidence boundaries." }, { href: "/protected-source-convergence", title: "Protected Source Convergence", text: "Open the active protected-source classification and recovery paths." }, { href: "/supplied-public-references", title: "Supplied Public References", text: "Review visible public-source records separately from protected historical material." }].map((item) => <Link key={item.href} href={item.href} className="rounded-[1.7rem] border border-white/10 bg-white/[.025] p-6 transition hover:-translate-y-0.5"><Archive className="h-6 w-6 text-[#DFC8FF]"/><h2 className="mt-4 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#DFC8FF]">Open route <ArrowRight className="h-4 w-4"/></span></Link>)}</div></section>
  </main>;
}
