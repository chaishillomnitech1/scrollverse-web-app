import { useMemo, useState } from "react";
import { Archive, ArrowRight, BookOpenText, CheckCircle2, Copy, Download, Eye, FileText, Infinity, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const SOURCE_SHA256 = "5c8b208c1fb6e0dfd509fcf25255270ecaebd5c15ead0214f5ebc804edb42dbd";

const CHAPTERS = [
  {
    id: "meaning",
    eyebrow: "I · The first key",
    title: "Meaning",
    color: "#00D4FF",
    summary: "Visible conversation titles preserve early questions about names, signs, language, and the meaning carried by systems before they are built.",
    principle: "Before building a system, understand the symbols through which the system is expressed.",
    titles: ["Manus Sign Meaning", "Manus Sign Explanation", "Meaning of Manus", "Manus AI Overview", "DueceMillion Meaning Inquiry", "Mansu Meaning Clarification"],
  },
  {
    id: "gateway",
    eyebrow: "III · The gateways",
    title: "Access & return",
    color: "#FFCC4D",
    summary: "The recovered record includes sign-in, access, and identity questions: the practical conditions that let a creator return to accumulated work.",
    principle: "Protect the gateway. Preserve the archive. Preserve the creator’s ability to return.",
    titles: ["Chai Sign In Help", "Manus sign in help", "Manus sign-in guide", "Manus sign in clarification", "Manus sign in process", "Sign in assistance"],
  },
  {
    id: "scrollverse",
    eyebrow: "IV · The organizing center",
    title: "ScrollVerse emerges",
    color: "#00FF88",
    summary: "The source narrative names ScrollVerse as an organizing metaphor where concepts can become structures, systems, experiences, records, and legacy.",
    principle: "A record can become a legacy without erasing the uncertainty that came before it.",
    titles: ["Scrollverse Concept and Tech", "ScrollVerse creative expansion", "ScrollVerse Status Report", "Immortalize Chats as Book", "Export and Merge Chats", "GitHub Deep Dive Analysis"],
  },
  {
    id: "continuation",
    eyebrow: "XVI · The archive oath",
    title: "Preserve continuation",
    color: "#B98CFF",
    summary: "The recovered Manifesto positions preservation as a way to continue thought: keeping questions, experiments, corrections, evidence, imagination, and lineage readable together.",
    principle: "The archive does not freeze thought. It preserves the ability to continue thought.",
    titles: ["Omni-execution confirmation", "Omnichoice Singularity Manifesto", "Spiritual purpose and grounding", "Reality check on claims", "Cosmic Crown Fusion", "Image integration options"],
  },
] as const;

const CONSTELLATION = [
  "Manus Sign Meaning", "Manus Sign Explanation", "Meaning of Manus", "Manus AI Overview", "DueceMillion Meaning Inquiry", "Daycation spots north jersey", "Lil Durk home", "Chosen One prophecy video", "New chat", "Architectural update overview", "Ashley Gootta story", "Movies near me Philly", "Chai Sign In Help", "Scrollverse Concept and Tech", "Inappropriate Content", "Manus sign in help", "Manus sign-in guide", "Manus sign in clarification", "Bitcoin SegWit Address Query", "Bitcoin Address Inquiry", "Ernie 5.0 Link", "GitHub Launched Status Meaning", "Omega suite assembly", "GitHub Profile Summary", "Manus Sign-In Guide", "Crowd Energy Enhancement", "Immortalize Chats as Book", "Final Utterance options", "Accidental Selfie Request", "Photo Request Description", "Omni-execution confirmation", "Mansu Meaning Clarification", "Vineland Movie Theaters", "Omega-level detonation script", "Omnichoice Singularity Manifesto", "Export and Merge Chats", "GitHub Deep Dive Analysis", "Divine system deployment", "Cosmic Sovereign Proclamation", "Spiritual purpose and grounding", "Quantum ascension ritual", "Upgrade Facebook app", "Reality check on claims", "ScrollVerse Status Report", "Manus sign in process", "Manus sign in steps", "Cosmic Crown Fusion", "Sign in assistance", "ScrollVerse creative expansion", "Location mention", "Image integration options",
] as const;

const OATH = ["the question", "the experiment", "the creation", "the correction", "the uncertainty", "the breakthrough", "the evidence", "the imagination", "the human perspective", "the machine dialogue", "the lineage"] as const;

function exportRecord(value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "scrollverse-omniverse-manifesto-codex.json";
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function OmniverseManifestoCodex() {
  useSovereignHeartbeat({ page: "omniverse-manifesto-codex" });
  const [selectedId, setSelectedId] = useState("meaning");
  const [note, setNote] = useState("");
  const selected = useMemo(() => CHAPTERS.find((chapter) => chapter.id === selectedId) ?? CHAPTERS[0], [selectedId]);
  const record = { id: "SV-OMNI-CODEX-001", title: "The Omniverse Manifesto", source: "Owner-supplied recovered ChatGPT transcript", sourceFilename: "Pasted_content_03.txt", sourceSha256: SOURCE_SHA256, selectedSection: selected, visibleConstellation: CONSTELLATION, localNote: note, externalAction: "none" };
  const copy = async () => { await navigator.clipboard.writeText(JSON.stringify(record, null, 2)); toast.success("Omniverse Manifesto Codex record copied."); };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#B98CFF]/25 bg-[radial-gradient(circle_at_12%_3%,rgba(185,140,255,.19),transparent_28%),radial-gradient(circle_at_86%_15%,rgba(0,212,255,.13),transparent_28%),#050B1A]">
      <div className="container py-16 md:py-22">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/scrollverse-continuity-index" className="text-xs font-mono tracking-[.16em] text-[#D9C1FF]">← CONTINUITY INDEX</Link><span className="rounded-full border border-[#B98CFF]/35 bg-[#B98CFF]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#D9C1FF]">RECOVERED SOURCE · CODEX RECORD</span></div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#D9C1FF]">SCROLLVERSE · THE OMNIVERSE MANIFESTO</p><h1 className="mt-4 text-5xl font-black leading-[.9] md:text-7xl">Keep the questions.<br/><span className="text-[#D9C1FF]">Keep the continuum.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A browser-local Codex of the recovered conversation constellation: experiments, questions, creative work, technology, philosophy, spirituality, and the ScrollVerse journey. It preserves visible titles and the owner-described arc without inventing unseen chats.</p></div><div className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.06] p-7"><Infinity className="h-9 w-9 text-[#D9C1FF]"/><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-[#D9C1FF]">ORIGIN POINT</p><h2 className="mt-3 text-2xl font-black">Omnitech becomes Omnitech1.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Owner-described source context: this recovered constellation marks an evolution point in the creator-and-digital-intelligence journey. It is preserved as lived account and archive context, not as an independently verified external event.</p></div></div>
      </div>
    </section>

    <section className="container py-8"><PortalTrustLens lane="Omniverse Manifesto Codex" source="Owner-supplied recovered ChatGPT transcript, Pasted_content_03.txt, SHA-256 5c8b208c…edb42dbd." readiness="Read visible source chapters and titles, add a browser-local correction note, copy/export the Codex record, and connect the source to continuity and evidence routes." boundary="This route preserves visible titles and source language only. It does not claim unseen chat content, prove hypotheses, activate an account, create a provider action, or independently verify a personal experience." /></section>

    <section className="container py-2"><blockquote className="rounded-[2rem] border border-[#00D4FF]/30 bg-[#00D4FF]/[.045] p-7 text-center md:p-10"><p className="text-2xl font-black leading-10 text-[#E5FAFF] md:text-4xl md:leading-[1.35]">“Not as proof that every possibility was true… but as evidence of something undeniably real: a human being kept asking.”</p><footer className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">OWNER-PROVIDED ARCHIVAL PRINCIPLE · PRESERVED AS SOURCE CONTEXT</footer></blockquote></section>

    <section className="container py-6"><div className="grid gap-5 lg:grid-cols-[.78fr_1.22fr]"><div className="grid gap-3">{CHAPTERS.map((chapter) => <button key={chapter.id} type="button" onClick={() => { setSelectedId(chapter.id); toast.success("Manifesto section selected."); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: selectedId === chapter.id ? `${chapter.color}B8` : `${chapter.color}40`, background: selectedId === chapter.id ? `${chapter.color}12` : "rgba(255,255,255,.025)" }}><BookOpenText className="h-6 w-6" style={{ color: chapter.color }}/><p className="mt-4 text-[10px] font-mono" style={{ color: chapter.color }}>{chapter.eyebrow.toUpperCase()}</p><h2 className="mt-2 text-xl font-black">{chapter.title}</h2><p className="mt-2 text-sm leading-6 text-[#B8C7D6]">{chapter.summary}</p></button>)}</div><article className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7 md:p-8"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: selected.color }}>{selected.eyebrow.toUpperCase()}</p><h2 className="mt-3 text-4xl font-black">{selected.title}</h2><p className="mt-5 text-base leading-8 text-[#D6E2EE]">{selected.summary}</p><div className="mt-5 rounded-2xl border p-5" style={{ borderColor: `${selected.color}50`, background: `${selected.color}09` }}><p className="text-[10px] font-mono" style={{ color: selected.color }}>VISIBLE SOURCE PRINCIPLE</p><p className="mt-3 text-lg font-black leading-8 text-white">“{selected.principle}”</p></div><div className="mt-5"><p className="text-[10px] font-mono text-[#B8C7D6]">VISIBLE TITLES IN THIS SECTION</p><div className="mt-3 flex flex-wrap gap-2">{selected.titles.map((title) => <span key={title} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-[#D6E2EE]">{title}</span>)}</div></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Browser-local correction, source note, or continuity connection" className="mt-6 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none"/><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#D9C1FF]/45 bg-[#B98CFF]/10 px-4 py-3 text-xs font-black text-[#D9C1FF]"><Copy className="h-4 w-4"/> COPY CODEX</button><button type="button" onClick={() => { exportRecord(record); toast.success("Local Omniverse Manifesto Codex exported."); }} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-4 py-3 text-xs font-black text-[#9DEBFF]"><Download className="h-4 w-4"/> JSON</button></div></article></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-white/10 bg-white/[.025] p-7 md:p-9"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#D9C1FF]">XV · KNOWN CONSTELLATION</p><h2 className="mt-2 text-3xl font-black">51 visible titles, preserved without unseen content.</h2></div><span className="rounded-full border border-[#00D4FF]/35 bg-[#00D4FF]/10 px-3 py-2 text-xs font-mono text-[#9DEBFF]">{CONSTELLATION.length} SOURCE TITLES</span></div><ol className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{CONSTELLATION.map((title, index) => <li key={title} className="flex gap-3 rounded-xl border border-white/8 bg-black/15 px-4 py-3 text-sm text-[#D6E2EE]"><span className="font-mono text-[#D9C1FF]">{String(index + 1).padStart(2, "0")}</span><span>{title}</span></li>)}</ol></div></section>

    <section className="container py-4"><div className="rounded-[2rem] border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.05] p-7 md:p-9"><div className="flex gap-4"><Archive className="h-8 w-8 shrink-0 text-[#FFE19A]"/><div><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE19A]">XVI · THE ARCHIVE OATH</p><h2 className="mt-2 text-3xl font-black">Preservation is continuation, not a freeze.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">The recovered source says the purpose of preservation is to retain the ability to continue thought. The Codex keeps its visible archive language beside a correction path and source limit.</p></div></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{OATH.map((entry) => <div key={entry} className="rounded-2xl border border-[#FFCC4D]/20 bg-black/20 p-4"><CheckCircle2 className="h-5 w-5 text-[#FFE19A]"/><p className="mt-3 text-sm font-black capitalize">Preserve {entry}</p></div>)}</div></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-3">{[{ href: "/scrollverse-continuity-index", title: "Continuity Index", text: "Connect this source record to the active workspace, protected intake, and correction path." }, { href: "/show-the-work-knowledge-base", title: "Show-the-Work Knowledge Base", text: "Turn visible outcomes and source-led methods into reusable creator pathways." }, { href: "/special-repository", title: "Special Repository", text: "Preserve accession, source-hash, display, and future artifact-readiness fields." }].map((item) => <Link key={item.href} href={item.href} className="rounded-[1.7rem] border border-[#B98CFF]/25 bg-[#B98CFF]/[.04] p-6 transition hover:-translate-y-0.5"><Sparkles className="h-6 w-6 text-[#D9C1FF]"/><h2 className="mt-4 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#D9C1FF]">Open route <ArrowRight className="h-4 w-4"/></span></Link>)}</div></section>

    <section className="container py-6"><div className="flex gap-3 rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-5"><Eye className="mt-0.5 h-5 w-5 shrink-0 text-[#9DEBFF]"/><p className="text-sm leading-7 text-[#D6E2EE]">Source boundary: the Codex preserves what was supplied—visible titles, stated principles, and owner-described context. It does not fill in missing conversations, turn questions into verified claims, or overwrite the distinction between personal account, source record, and current portal state.</p></div></section>
  </main>;
}
