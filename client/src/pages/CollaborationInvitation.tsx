import { useState } from "react";
import { ArrowRight, ClipboardCopy, Compass, FileCheck2, Handshake, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const COLLABORATION_WORLDS = [
  { title: "Creator archives", detail: "Source-labeled visual, physical-object, media, and collection records with accessibility descriptions.", route: "/creator-collection-records", action: "Review creator collection", color: "#00D4FF" },
  { title: "Story and learning", detail: "Visual worlds, narration planning, tutorial paths, books, and free knowledge routes.", route: "/visual-story-worlds", action: "Open visual story worlds", color: "#B98CFF" },
  { title: "Evidence and correction", detail: "Capability comparison, source standards, and a visible correction path for reproducible updates.", route: "/capability-comparison", action: "Compare evidence", color: "#00FF88" },
  { title: "Release discipline", detail: "Replay records, local audit export, and exact-action checklists for consequential work.", route: "/replay-readiness", action: "Open replay readiness", color: "#FFB800" },
] as const;

const REVIEW_PROMPTS = [
  "How can a creator archive become more legible, accessible, and useful to a public audience?",
  "Which media, learning, or narrative workflow needs a source-led production path?",
  "What release, support, or approval sequence should be made visible before an external action?",
  "Where can an AI-assisted workflow make human roles, states, and correction paths clearer?",
] as const;

export default function CollaborationInvitation() {
  useSovereignHeartbeat({ page: "collaboration-invitation" });
  const [promptIndex, setPromptIndex] = useState(0);

  const copyInvitation = async () => {
    const copy = [
      "SCROLLVERSE — OPEN COLLABORATION INVITATION",
      "Build with the evidence in view.",
      "ScrollVerse offers source-led creator archives, visual storytelling, learning pathways, release discipline, and accountable AI workflow preparation.",
      `Review question: ${REVIEW_PROMPTS[promptIndex]}`,
      "Start with one real operating question. Inspect the browser-local evidence. Decide whether a focused conversation is useful.",
      "Boundary: This local invitation does not contact an entity, create a lead, schedule outreach, set terms, accept payment, connect a provider, or perform a wallet, token, trade, transfer, DNS, contract, or media-release action.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(copy);
      toast.success("Local collaboration invitation copied. No outreach was sent.");
    } catch {
      toast.error("Copy is unavailable in this browser. The invitation remains visible on this page.");
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="relative overflow-hidden border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_88%_10%,rgba(0,212,255,.17),transparent_28%),radial-gradient(circle_at_8%_83%,rgba(185,140,255,.14),transparent_29%),#050B1A]">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden="true" />
      <div className="container relative py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/partnership-engine" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← PARTNERSHIP ENGINE</Link><span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">INVITATION AVAILABLE NOW · EXTERNAL CONTACT NOT ACTIVE</span></div>
        <div className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_.8fr] xl:items-end">
          <div><p className="text-xs font-mono tracking-[.22em] text-[#9DEBFF]">SCROLLVERSE OPEN COLLABORATION INVITATION</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Build with the <span className="text-[#00D4FF]">evidence in view.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">ScrollVerse is an open record of creator archives, visual stories, learning paths, release controls, and accountable AI workflow preparation. Inspect the work, choose one real operating question, and decide whether a focused collaboration is useful.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#worlds" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Explore demonstrated worlds</a><Link href="/capability-comparison" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Compare evidence</Link></div></div>
          <aside className="rounded-[2rem] border border-[#00D4FF]/35 bg-[#071426]/85 p-7"><Handshake className="h-9 w-9 text-[#9DEBFF]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">THE COLLABORATION STANDARD</p><p className="mt-3 text-2xl font-black leading-tight">One real question. A visible source trail. A voluntary next step.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The portal prepares reviewable material. It does not presume a partner, a contract, a commercial outcome, or an external mandate.</p></aside>
        </div>
      </div>
    </section>

    <section className="container py-10"><PortalTrustLens lane="Open Collaboration Invitation" source="Creator Atlas, Creator Collection Records, Visual Story Worlds, Capability Comparison, Replay Readiness, Partnership Engine, and the Phase 608 collaboration-invitation design record." readiness="The invitation, evidence routes, operating questions, and local-copy review note are available now." boundary="This page does not contact an organization, send outreach, create a lead, schedule activity, post content, accept payment, set commercial terms, create a contract, connect a provider, or perform a wallet, token, trade, transfer, DNS, contract-deployment, or media-release action." /></section>

    <section id="worlds" className="container py-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-[.17em] text-[#9DEBFF]">START WITH THE WORK</p><h2 className="mt-2 text-4xl font-black">Four visible collaboration worlds.</h2></div><Compass className="h-10 w-10 text-[#9DEBFF]" /></div><div className="mt-7 grid gap-5 md:grid-cols-2">{COLLABORATION_WORLDS.map((world) => <article key={world.title} className="rounded-[1.7rem] border p-6" style={{ borderColor: `${world.color}55`, background: `${world.color}08` }}><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: world.color }}>BROWSER-LOCAL EVIDENCE</p><h3 className="mt-3 text-2xl font-black">{world.title}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{world.detail}</p><Link href={world.route} className="mt-6 inline-flex items-center gap-2 text-sm font-black" style={{ color: world.color }}>{world.action} <ArrowRight className="h-4 w-4" /></Link></article>)}</div></section>

    <section className="container py-8"><div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]"><article className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.05] p-7"><Sparkles className="h-8 w-8 text-[#DCC8FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">REVIEW QUESTION</p><h2 className="mt-3 text-3xl font-black">Choose one concrete place to begin.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">A useful collaboration begins with a specific workflow rather than a blanket promise. Change the prompt to frame the next review.</p><div className="mt-6 space-y-3">{REVIEW_PROMPTS.map((prompt, index) => <button key={prompt} type="button" onClick={() => setPromptIndex(index)} className="w-full rounded-xl border p-4 text-left text-sm leading-6 transition" style={promptIndex === index ? { borderColor: "#B98CFF", background: "rgba(185,140,255,.14)", color: "#fff" } : { borderColor: "rgba(255,255,255,.12)", background: "rgba(255,255,255,.02)", color: "#D6E2EE" }}><span className="mr-2 font-mono text-[#DCC8FF]">0{index + 1}</span>{prompt}</button>)}</div></article><article className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.045] p-7"><FileCheck2 className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">LOCAL REVIEW NOTE</p><h2 className="mt-3 text-3xl font-black">Prepare language. Keep the action human-approved.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Copy a general invitation for a future, owner-approved conversation. The note contains no recipient, delivery channel, pricing, contract, or execution instruction.</p><div className="mt-6 rounded-2xl border border-[#00FF88]/20 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">CURRENT REVIEW QUESTION</p><p className="mt-3 text-base font-bold leading-7 text-white">{REVIEW_PROMPTS[promptIndex]}</p></div><button type="button" onClick={copyInvitation} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FF88] px-4 py-3 text-sm font-black text-[#071426]"><ClipboardCopy className="h-4 w-4" />Copy local collaboration invitation</button><Link href="/partnership-engine" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#00FF88]/45 px-4 py-3 text-sm font-black text-[#B5F7CC]">Open focused partnership engine <ArrowRight className="h-4 w-4" /></Link></article></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FF6B9A]/35 bg-[radial-gradient(circle_at_85%_18%,rgba(255,107,154,.16),transparent_30%),rgba(255,107,154,.04)] p-7"><p className="text-xs font-mono tracking-[.16em] text-[#FFC4D5]">NARRATIVE SOURCE HANDOFF</p><div className="mt-3 grid gap-6 lg:grid-cols-[1fr_.85fr] lg:items-end"><div><h2 className="text-3xl font-black">Episode 35: <span className="text-[#FF6B9A]">The Global Convergence</span></h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">A creator-supplied Google AI Mode capture visibly presents the Episode 35 title and character-matrix framing. The story concept is retained as a source-labeled production handoff for future owner review, not as a completed episode, cast commitment, score, video, or release.</p><p className="mt-4 text-xs leading-6 text-[#AFC0CF]">Source record: Phase 609 collaboration narrative source record · Google AI Mode screenshot context retained with SHA-256 identifiers.</p></div><div className="flex flex-wrap gap-3 lg:justify-end"><Link href="/episodic-production-slate" className="rounded-xl border border-[#FF6B9A]/50 bg-[#FF6B9A]/10 px-5 py-3 text-sm font-black text-[#FFC4D5]">Open episodic production slate</Link><Link href="/creator-media-packet" className="rounded-xl border border-[#FF6B9A]/50 px-5 py-3 text-sm font-black text-[#FFC4D5]">Open creator media packet</Link></div></div></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FFB800]/35 bg-[#FFB800]/[.055] p-7"><ShieldCheck className="h-8 w-8 text-[#FFE09A]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FFE09A]">EXTERNAL-ACTION BOUNDARY</p><h2 className="mt-3 text-3xl font-black">The invitation opens a choice. It does not send a message.</h2><p className="mt-4 max-w-5xl text-sm leading-7 text-[#D6E2EE]">Any external conversation needs a named target, authorized source material, approved sender, delivery channel, copy, cadence, data boundary, and fresh exact confirmation. Pricing, contracts, payment, provider access, wallets, tokens, transfers, releases, DNS changes, and media ingestion remain separate item-specific decisions.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/partnership-engine" className="rounded-xl border border-[#FFB800]/50 px-5 py-3 text-sm font-black text-[#FFE09A]">Open approval-gated partnership brief</Link><Link href="/replay-readiness" className="rounded-xl border border-[#FFB800]/50 px-5 py-3 text-sm font-black text-[#FFE09A]">Open release checklist</Link></div></div></section>
  </main>;
}
