import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Compass, Copy, FileText, HandHeart, HeartHandshake, Lightbulb, LockKeyhole, Scale, Sparkles, UsersRound, Vote } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { UltimateChoicePathway } from "@/components/UltimateChoicePathway";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ContributionLane = "Learn" | "Idea" | "Co-create" | "Community" | "Future exchange";
type LocalBrief = { lane: ContributionLane; title: string; outcome: string; note: string };

const CONTRIBUTION_LANES = [
  { lane: "Learn", icon: BookOpen, color: "#00D4FF", state: "Available now", title: "Learn and carry forward", detail: "Read free books, research, methods, and open records without signing up, paying, or contributing personal information.", href: "/book-of-the-journey", cta: "Open free learning" },
  { lane: "Idea", icon: Lightbulb, color: "#FFCC4D", state: "Available now · browser-local", title: "Offer an idea or research lead", detail: "Use the local planner to shape a question, source lead, insight, or system proposal before deciding whether it belongs in a connected community route.", href: "#contribution-planner", cta: "Open local planner" },
  { lane: "Co-create", icon: HeartHandshake, color: "#B98CFF", state: "Available now · preparation", title: "Prepare a co-creation brief", detail: "Frame a creative, technical, research, design, writing, or media collaboration with a purpose, scope, source context, and the next conversation.", href: "/creator-services-navigator", cta: "Open collaboration path" },
  { lane: "Community", icon: UsersRound, color: "#00FF88", state: "Available now · community route", title: "Join community reflection", detail: "Share a first-person experience or thoughtful response through the community exchange under its existing participation controls.", href: "/chosen-ones-exchange", cta: "Open community exchange" },
  { lane: "Future exchange", icon: Scale, color: "#FF9CC4", state: "Research · item release required", title: "Prepare a future fair exchange", detail: "Explore a possible barter, trade, service, support, or contribution concept without creating a payment, agreement, transfer, vote, or delivery obligation.", href: "/direct-fan-catalog", cta: "Open approved release paths" },
] as const;

const DECISION_PATHS = [
  { title: "Assistive governance", href: "/assistive-governance", color: "#B98CFF", detail: "Study transparent decision support, source records, and the boundary between input and action." },
  { title: "Governance reading", href: "/governance", color: "#00D4FF", detail: "Review the existing community and governance pathway before proposing a decision process." },
  { title: "Direct-to-fan support", href: "/direct-fan-catalog", color: "#FFCC4D", detail: "Explore approved creator work and release-gated future support paths." },
  { title: "Creator services", href: "/creator-services-navigator", color: "#00FF88", detail: "Prepare a creator-owned brief for an original project, release, or collaboration." },
] as const;

const PRACTICES = [
  "Say what the contribution is for before asking for it.",
  "Name the source, role, review path, and current operating state.",
  "Keep idea, reflection, collaboration, support, and future exchange in distinct lanes.",
  "Give a reasoned response path before treating a proposal as accepted, changed, or declined.",
  "Do not collect credentials, payment data, private agreements, or sensitive personal information in a planning brief.",
] as const;

export default function SovereignContributionExchange() {
  useSovereignHeartbeat({ page: "sovereign-contribution-exchange" });
  const [lane, setLane] = useState<ContributionLane>("Idea");
  const [title, setTitle] = useState("");
  const [outcome, setOutcome] = useState("");
  const [note, setNote] = useState("");
  const [briefs, setBriefs] = useState<LocalBrief[]>([]);

  const canCreate = useMemo(() => Boolean(title.trim() && outcome.trim()), [outcome, title]);
  const createBrief = () => {
    if (!canCreate) return;
    setBriefs((current) => [{ lane, title: title.trim(), outcome: outcome.trim(), note: note.trim() }, ...current].slice(0, 6));
    setTitle("");
    setOutcome("");
    setNote("");
    toast.success("Contribution brief added to this browser session. Nothing was submitted or activated.");
  };
  const copyBriefs = async () => {
    if (!briefs.length) {
      toast.error("Create a browser-local brief before copying it.");
      return;
    }
    const exportText = [
      "SCROLLVERSE SOVEREIGN CONTRIBUTION & CO-CREATION EXCHANGE — LOCAL BRIEFS",
      "Operating state: browser-local planning only. No proposal, payment, vote, contract, transfer, or delivery action was submitted.",
      ...briefs.flatMap((brief, index) => ["", `${String(index + 1).padStart(2, "0")}. ${brief.lane.toUpperCase()} — ${brief.title}`, `Intended outcome: ${brief.outcome}`, `Context note: ${brief.note || "Not provided"}`]),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(exportText);
      toast.success("Browser-local contribution brief copied. Review it before sharing anywhere.");
    } catch {
      toast.error("Copy was not available in this browser. You can select the text from the local cards.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-[#00FF88]/25 bg-[radial-gradient(circle_at_84%_14%,rgba(0,255,136,.16),transparent_28%),radial-gradient(circle_at_10%_74%,rgba(185,140,255,.15),transparent_31%),#050B1A]">
        <div className="container py-16 md:py-24">
          <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/direct-fan-catalog" className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">← DIRECT-TO-FAN CATALOG</Link><span className="rounded-full border border-[#00FF88]/45 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">CONTRIBUTION · CO-CREATION · CHOICE</span></div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#00FF88]">SCROLLVERSE · SOVEREIGN CONTRIBUTION EXCHANGE</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.93] md:text-7xl">Build the road together. <span className="text-[#B5F7CC]">Keep every gate visible.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This is a voluntary visitor pathway for learning, ideas, co-creation, community reflection, solution dialogue, and future approved exchange. Choose the lane that fits. Free knowledge remains open; every later exchange stays clear about its source, state, and next step.</p>
              <blockquote className="mt-6 max-w-3xl rounded-2xl border border-[#00FF88]/35 bg-[#00FF88]/[.06] px-5 py-4"><p className="text-lg font-black leading-7 text-[#B5F7CC]">“Influence is currency. Power without principle is poison.”</p><footer className="mt-2 text-[10px] font-mono tracking-[.16em] text-[#00FF88]">OWNER-AUTHORED · CONTRIBUTION ETHICAL ANCHOR</footer></blockquote>
              <div className="mt-8 flex flex-wrap gap-3"><a href="#contribution-planner" className="rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#04101D]">Create a local contribution brief</a><Link href="/chosen-ones-exchange" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Open community exchange</Link></div>
            </div>
            <aside className="rounded-3xl border border-[#00FF88]/35 bg-[#071426]/85 p-6"><HeartHandshake className="h-8 w-8 text-[#00FF88]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">VISITOR CHOICE STANDARD</p><blockquote className="mt-4 border-l-2 border-[#00FF88] pl-4 text-lg font-bold leading-8 text-white">“A contribution is an offer of participation, not a transfer of ownership. A collaboration brief starts a conversation; it does not create an agreement.”</blockquote><p className="mt-5 text-sm leading-7 text-[#C9D8E7]">The Exchange keeps learning, ideas, community voice, creator support, and future exchange in distinct lanes. No click here creates a payment, contract, vote, wallet action, transfer, or delivery obligation.</p></aside>
          </div>
        </div>
      </section>

      <section className="container py-10"><PortalTrustLens lane="Sovereign Contribution and Co-Creation Exchange" source="Owner-directed ScrollVerse contribution scope, public participation and co-creation learning sources, and connected local community, governance, creator, and catalog routes." readiness="Available now as a free discovery, learning, and browser-local planning path. Any submission, vote, support, trade, payment, or fulfillment feature requires its own source, privacy, rights, and owner-release record." boundary="This page does not accept funds, create a contract, transfer ownership, collect sensitive information, tally a binding vote, activate a wallet, or publish a visitor’s local planning brief." /></section>

      <section className="container py-4"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">CHOOSE YOUR PATH</p><h2 className="mt-2 text-3xl font-black">Multiple ways to align, contribute, or simply learn.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C9D8E7]">The lanes make the difference between an open learning path, a browser-local idea, an owner-directed co-creation preparation path, a community route, and a future exchange concept visible before anyone takes the next step.</p></div><Compass className="h-10 w-10 text-[#9DEBFF]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{CONTRIBUTION_LANES.map((entry) => { const Icon = entry.icon; const local = entry.href.startsWith("#"); return <article key={entry.lane} className="rounded-3xl border bg-[#071426]/90 p-5" style={{ borderColor: `${entry.color}55` }}><Icon className="h-7 w-7" style={{ color: entry.color }} /><p className="mt-4 text-xs font-mono tracking-[.14em]" style={{ color: entry.color }}>{entry.state}</p><h3 className="mt-2 text-xl font-black">{entry.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{entry.detail}</p>{local ? <a href={entry.href} onClick={() => setLane(entry.lane)} className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: entry.color }}>{entry.cta} <ArrowRight className="h-4 w-4" /></a> : <Link href={entry.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: entry.color }}>{entry.cta} <ArrowRight className="h-4 w-4" /></Link>}</article>; })}</div></section>

      <section id="contribution-planner" className="scroll-mt-10 border-y border-white/10 bg-white/[.018]"><div className="container py-12"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">BROWSER-LOCAL CONTRIBUTION PLANNER</p><h2 className="mt-2 text-3xl font-black">Shape the idea before deciding where it belongs.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C9D8E7]">This planner keeps drafts in the current browser session. It does not submit a proposal, contact anyone, post to the community, create a vote, or send an exchange request. Copy a brief only after you have reviewed the source, permission, and next route.</p></div><FileText className="h-10 w-10 text-[#FFCC4D]" /></div><div className="mt-7 grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><article className="rounded-3xl border border-[#FFCC4D]/35 bg-[#071426] p-6"><label htmlFor="contribution-lane" className="text-xs font-mono text-[#FFDEA0]">Contribution lane</label><select id="contribution-lane" value={lane} onChange={(event) => setLane(event.target.value as ContributionLane)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm font-bold text-white">{CONTRIBUTION_LANES.map((entry) => <option key={entry.lane} value={entry.lane}>{entry.lane} · {entry.state}</option>)}</select><label htmlFor="brief-title" className="mt-5 block text-xs font-mono text-[#FFDEA0]">Idea or brief title</label><input id="brief-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Example: community archive annotation pathway" className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white outline-none focus:border-[#FFCC4D]" /><label htmlFor="brief-outcome" className="mt-5 block text-xs font-mono text-[#FFDEA0]">Intended outcome</label><textarea id="brief-outcome" value={outcome} onChange={(event) => setOutcome(event.target.value)} rows={4} placeholder="What would this help people understand, create, improve, or discuss?" className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm leading-6 text-white outline-none focus:border-[#FFCC4D]" /><label htmlFor="brief-note" className="mt-5 block text-xs font-mono text-[#FFDEA0]">Context or source note (optional)</label><textarea id="brief-note" value={note} onChange={(event) => setNote(event.target.value)} rows={3} placeholder="Do not enter passwords, payment data, private agreements, sensitive personal information, or material you cannot share." className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm leading-6 text-white outline-none focus:border-[#FFCC4D]" /><button type="button" onClick={createBrief} disabled={!canCreate} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFCC4D] px-4 py-3 text-sm font-black text-[#08101D] disabled:cursor-not-allowed disabled:opacity-40"><Sparkles className="h-4 w-4" />Add local brief</button></article><article className="rounded-3xl border border-[#00D4FF]/30 bg-[#00D4FF]/[.05] p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-mono tracking-[.14em] text-[#9DEBFF]">CURRENT BROWSER SESSION</p><h3 className="mt-2 text-2xl font-black">Your contribution cards</h3></div><button type="button" onClick={copyBriefs} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/35 bg-[#071426] px-4 py-3 text-xs font-black text-[#9DEBFF]"><Copy className="h-4 w-4" />Copy</button></div>{briefs.length ? <div className="mt-6 space-y-3">{briefs.map((brief, index) => <article key={`${brief.title}-${index}`} className="rounded-2xl border border-white/10 bg-[#050B1A]/65 p-5"><p className="text-xs font-mono tracking-[.14em] text-[#B5F7CC]">{brief.lane.toUpperCase()}</p><h4 className="mt-2 text-lg font-black">{brief.title}</h4><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{brief.outcome}</p>{brief.note ? <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-6 text-[#AFC0CF]">{brief.note}</p> : null}</article>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-6"><p className="text-sm leading-7 text-[#AFC0CF]">No brief has been added in this browser session. Start with one idea, a desired outcome, and only the context you are comfortable keeping in a local note.</p></div>}<div className="mt-6 rounded-2xl border border-[#00FF88]/20 bg-[#00FF88]/[.04] p-5"><div className="flex gap-3"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#B5F7CC]" /><p className="text-sm leading-7 text-[#D6E2EE]">This is planning, not a submission system. If a future contribution intake is activated, it must clearly explain what is accepted, who can see it, how it is reviewed, how a contributor can correct or withdraw it, and what rights remain with the contributor.</p></div></div></article></div></div></section>

      <section className="container py-12"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">DIALOGUE AND DECISION PATHS</p><h2 className="mt-2 text-3xl font-black">Study the decision context before asking for a decision.</h2></div><Vote className="h-10 w-10 text-[#D6C4FF]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{DECISION_PATHS.map((path) => <Link key={path.title} href={path.href} className="rounded-3xl border bg-[#071426]/85 p-6 transition hover:-translate-y-0.5" style={{ borderColor: `${path.color}55` }}><p className="text-xs font-mono tracking-[.14em]" style={{ color: path.color }}>CONNECTED PATH</p><h3 className="mt-3 text-xl font-black">{path.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{path.detail}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: path.color }}>Open route <ArrowRight className="h-4 w-4" /></span></Link>)}</div></section>

      <section className="border-y border-white/10 bg-[#071426]/70"><div className="container py-12"><div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-mono tracking-[.16em] text-[#FF9CC4]">CLEAR PROCESS PROMISE</p><h2 className="mt-2 text-3xl font-black">Contribution without confusion.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The Exchange will grow by adding clear procedures, not hidden channels. A future feature can be activated only when its purpose, rights, privacy, review, response, and correction path are visible to the people it affects.</p></div><div className="grid gap-3 sm:grid-cols-2">{PRACTICES.map((practice, index) => <article key={practice} className="flex gap-3 rounded-2xl border border-[#FF9CC4]/25 bg-[#050B1A]/75 p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF9CC4]" /><div><p className="text-xs font-mono text-[#FFB8D1]">0{index + 1}</p><p className="mt-1 text-sm font-bold leading-6 text-white">{practice}</p></div></article>)}</div></div></div></section>
      <UltimateChoicePathway context="In the contribution exchange, the framework helps a visitor identify whether to shape a local idea, accept a present boundary, change the route, or step away before treating a plan as a commitment." />
    </main>
  );
}
