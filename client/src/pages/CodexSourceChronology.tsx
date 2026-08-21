import { useState } from "react";
import { Archive, ArrowRight, CheckCircle2, Copy, Download, GitMerge, History, Link2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const PR_URL = "https://github.com/chaishillomnitech1/Chaishillomnitech1/pull/213";
const CHATGPT_SHARE_URL = "https://chatgpt.com/share/6a33a5db-d004-83ea-b787-62f71dd0f7ff";

function exportRecord(value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "scrollverse-codex-source-chronology.json";
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function CodexSourceChronology() {
  useSovereignHeartbeat({ page: "codex-source-chronology" });
  const [note, setNote] = useState("");
  const record = {
    id: "SV-CODEX-CHRON-002",
    title: "Codex Source Chronology",
    pullRequest: {
      url: PR_URL,
      number: 213,
      title: "docs: add issue triage with four concrete fix tasks",
      mergedCommit: "393ca29a5be316669ff25d3b8b6f124354504c8a",
      scope: "One documentation file; 35 additions and no deletions.",
      observedOutcome: "Merged into main; GitHub displayed 35 of 46 checks passed and one failed branch deployment.",
    },
    sharedChatRecord: {
      url: CHATGPT_SHARE_URL,
      title: "ScrollVerse Chat Codex",
      scope: "Visible assistant-authored summary of supplied screenshots and visible chat-title examples.",
      visibleTitles: ["Immortalize Chats as Book", "Omnichoice Singularity Manifesto", "Export and Merge Chats", "GitHub Deep Dive Analysis", "ScrollVerse Status Report"],
    },
    localNote: note,
    externalAction: "No additional external action. Pull request merge is recorded as a completed first-party event.",
  };
  const copy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(record, null, 2));
    toast.success("Codex source chronology copied.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_12%_4%,rgba(0,212,255,.18),transparent_27%),radial-gradient(circle_at_84%_12%,rgba(185,140,255,.16),transparent_24%),#050B1A]">
      <div className="container py-16 md:py-22">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/omniverse-manifesto-codex" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← OMNIVERSE MANIFESTO CODEX</Link><span className="rounded-full border border-[#00D4FF]/35 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">SOURCE-LED · CHRONOLOGY RECORD</span></div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#9DEBFF]">SCROLLVERSE · CODEX SOURCE CHRONOLOGY</p><h1 className="mt-4 text-5xl font-black leading-[.9] md:text-7xl">Keep the receipts.<br/><span className="text-[#D9C1FF]">Keep the context.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A browser-local bridge between a completed first-party documentation merge and a shared ChatGPT source record. It preserves what was visibly available, what changed, and what remains a follow-up rather than an accomplished result.</p></div><div className="rounded-[2rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.06] p-7"><History className="h-9 w-9 text-[#9DEBFF]"/><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-[#9DEBFF]">ARCHIVAL METHOD</p><h2 className="mt-3 text-2xl font-black">Source → event → limitation → continuation.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">A source record can document momentum without converting a proposal into a completed fix or a shared page into unseen account history.</p></div></div>
      </div>
    </section>

    <section className="container py-8"><PortalTrustLens lane="Codex Source Chronology" source="First-party GitHub pull request #213 and owner-supplied shared ChatGPT record 6a33a5db-d004-83ea-b787-62f71dd0f7ff." readiness="Open cited sources, copy/export this browser-local record, add a correction note, and continue through the Omniverse Manifesto or Continuity Index." boundary="The route records visible source material and a completed documentation-only merge. It does not assert that the four proposed fixes were implemented, infer a deployment repair, access an account, or reconstruct unseen conversations." /></section>

    <section className="container py-4"><div className="grid gap-5 lg:grid-cols-2">
      <article className="rounded-[2rem] border border-[#00FF88]/30 bg-[#00FF88]/[.045] p-7 md:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><GitMerge className="h-9 w-9 text-[#7CFFBB]"/><span className="rounded-full border border-[#00FF88]/35 bg-black/20 px-3 py-1 text-[10px] font-mono text-[#7CFFBB]">MERGED · DOCUMENTATION ONLY</span></div><p className="mt-6 text-[10px] font-mono tracking-[.16em] text-[#7CFFBB]">FIRST-PARTY REPOSITORY EVENT</p><h2 className="mt-3 text-3xl font-black">Pull request #213</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The merged pull request adds <code className="text-[#7CFFBB]">ISSUE_TASK_PROPOSALS.md</code>: four evidence-linked maintenance proposals covering a trailing-dot README filename, an Enter ScrollVerse navigation target, testing-guide script alignment, and webhook signature negative-path tests.</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-[#00FF88]/20 bg-black/20 p-4"><p className="text-[10px] font-mono text-[#7CFFBB]">MERGE COMMIT</p><p className="mt-2 font-mono text-sm font-black">393ca29</p></div><div className="rounded-2xl border border-[#00FF88]/20 bg-black/20 p-4"><p className="text-[10px] font-mono text-[#7CFFBB]">CHANGE</p><p className="mt-2 text-sm font-black">+35 / −0</p></div><div className="rounded-2xl border border-[#00FF88]/20 bg-black/20 p-4"><p className="text-[10px] font-mono text-[#7CFFBB]">OBSERVED CHECKS</p><p className="mt-2 text-sm font-black">35 / 46 passed</p></div></div><div className="mt-6 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-5"><p className="text-[10px] font-mono text-[#FFE19A]">CONTINUATION BOUNDARY</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">The merge preserves a maintenance trail. It does not complete the four proposed fixes, and the source page continued to show one failed branch deployment.</p></div><a href={PR_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#7CFFBB]">Open pull request <ArrowRight className="h-4 w-4"/></a></article>
      <article className="rounded-[2rem] border border-[#B98CFF]/30 bg-[#B98CFF]/[.045] p-7 md:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><Archive className="h-9 w-9 text-[#D9C1FF]"/><span className="rounded-full border border-[#B98CFF]/35 bg-black/20 px-3 py-1 text-[10px] font-mono text-[#D9C1FF]">SHARED SOURCE · VISIBLE OUTLINE</span></div><p className="mt-6 text-[10px] font-mono tracking-[.16em] text-[#D9C1FF]">OWNER-SUPPLIED CHATGPT SHARE</p><h2 className="mt-3 text-3xl font-black">ScrollVerse Chat Codex</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The visible shared page presents an assistant-authored summary of screenshots containing chat-history titles and an archival approach. It names conversations such as <span className="font-black text-white">Immortalize Chats as Book</span>, <span className="font-black text-white">Omnichoice Singularity Manifesto</span>, <span className="font-black text-white">Export and Merge Chats</span>, and <span className="font-black text-white">GitHub Deep Dive Analysis</span>.</p><div className="mt-6 rounded-2xl border border-[#B98CFF]/25 bg-black/20 p-5"><p className="text-[10px] font-mono text-[#D9C1FF]">VISIBLE-SOURCE LIMIT</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">This share is preserved as a visible outline, not an account export or complete transcript. The chronology does not infer the existence, content, ownership, or factual accuracy of conversations beyond what the shared page visibly states.</p></div><a href={CHATGPT_SHARE_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#D9C1FF]">Open shared record <Link2 className="h-4 w-4"/></a></article>
    </div></section>

    <section className="container py-4"><div className="rounded-[2rem] border border-white/10 bg-white/[.025] p-7 md:p-9"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">BROWSER-LOCAL CONTINUITY NOTE</p><h2 className="mt-2 text-3xl font-black">Add the next verified connection.</h2></div><div className="flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-4 py-3 text-xs font-black text-[#D9C1FF]"><Copy className="h-4 w-4"/> COPY</button><button type="button" onClick={() => { exportRecord(record); toast.success("Local Codex source chronology exported."); }} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-4 py-3 text-xs font-black text-[#9DEBFF]"><Download className="h-4 w-4"/> JSON</button></div></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Browser-local correction, context note, or next source connection" className="mt-6 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none"/></div></section>

    <section className="container py-6"><div className="grid gap-4 md:grid-cols-3">{[{ href: "/omniverse-manifesto-codex", title: "Omniverse Manifesto", text: "Return to the recovered 51-title constellation and the Archive Oath." }, { href: "/scrollverse-continuity-index", title: "Continuity Index", text: "Connect source records to protected intake, active work, and correction pathways." }, { href: "/special-repository", title: "Special Repository", text: "Continue toward artifact accession records with source and display boundaries." }].map((item) => <Link key={item.href} href={item.href} className="rounded-[1.7rem] border border-white/10 bg-white/[.025] p-6 transition hover:-translate-y-0.5"><CheckCircle2 className="h-6 w-6 text-[#9DEBFF]"/><h2 className="mt-4 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#9DEBFF]">Open route <ArrowRight className="h-4 w-4"/></span></Link>)}</div></section>
  </main>;
}
