import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BadgeCheck, Bot, CheckCircle2, ClipboardCheck, Copy, FileSearch, Hand, Landmark, RefreshCcw, Scale, ShieldCheck, UserRoundCheck } from "lucide-react";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type Lens = "Govern" | "Map" | "Measure" | "Manage";
type ActionType = "Creative release" | "AI-assisted recommendation" | "External publication" | "Financial movement" | "Public evidence record";

const lenses: Array<{ id: Lens; color: string; icon: typeof Scale; purpose: string; local: string; role: string; outcome: string }> = [
  { id: "Govern", color: "#00D4FF", icon: Scale, purpose: "Set the allowed scope, accountable role, evidence requirements, and override conditions before a workflow begins.", local: "ScrollVerse local pages can label roles, operating states, source records, owner-release requirements, and correction paths.", role: "A named human or accountable organization owns the workflow scope and approves high-impact external actions.", outcome: "A local governance record with dedicated pathways for legal personhood, power of attorney, bank mandate, and provider authorization records." },
  { id: "Map", color: "#00FF88", icon: FileSearch, purpose: "Describe the intended use, source materials, affected people, dependencies, foreseeable risks, and destination for a specific workflow.", local: "Production, release, and infrastructure desks already prepare asset-specific packets and external-result gates.", role: "The accountable owner documents the action target and expected consequence before requesting an external step.", outcome: "A scoped preparation packet that points to the associated provider, platform, or public-network result when that record becomes available." },
  { id: "Measure", color: "#FFB800", icon: BadgeCheck, purpose: "Keep evidence of test output, source quality, accessibility, uncertainty, and actual outcomes available for review.", local: "Capability Audit, Evidence Commons, protected intake records, and regression suites make local evidence and boundaries visible.", role: "AI can organize, summarize, flag gaps, and generate a review checklist; a human or authorized role evaluates consequential decisions.", outcome: "An auditable local evidence trail that routes testimony, legal questions, and ledger verification to the appropriate independent record." },
  { id: "Manage", color: "#B98CFF", icon: RefreshCcw, purpose: "Provide stop, revoke, correct, repair, and decommission paths when a workflow is wrong, incomplete, or no longer appropriate.", local: "Browser-local tools can be stopped, routes can be corrected, and source-labeled records preserve revisions and correction paths.", role: "The accountable role retains control over external accounts, provider settings, funds, contracts, and final submissions.", outcome: "A transparent correction and override process, with any continuous execution handled through its confirmed accountable operational record." },
];

const actionGates: Record<ActionType, { tone: string; local: string[]; external: string[]; boundary: string }> = {
  "Creative release": {
    tone: "#00D4FF",
    local: ["Final original title/version", "Source and contributor/rights record", "Captions, transcript, alt text, or accessible edition", "Destination and direct owner release"],
    external: ["Authorized destination account or distributor", "Actual publication/delivery result", "Outcome link or provider record"],
    boundary: "A production packet can be ready locally before any public release exists.",
  },
  "AI-assisted recommendation": {
    tone: "#00FF88",
    local: ["Purpose and source inputs", "Known limits and uncertainty", "Human/accountable role", "Correction or challenge path"],
    external: ["No external action is implied by a recommendation", "A separate owner decides whether to act", "Any consequential outcome is recorded after it happens"],
    boundary: "AI assistance can organize evidence and recommendations; it does not become the accountable legal, financial, or institutional decision-maker.",
  },
  "External publication": {
    tone: "#FF6B9A",
    local: ["Approved final asset", "Accessible caption/description package", "Exact destination and account context", "Owner release for this exact post/upload"],
    external: ["Active authorized account", "Final submission confirmation", "Actual permalink, delivery result, or platform event"],
    boundary: "A schedule or local content card is not a public post until the exact platform outcome exists.",
  },
  "Financial movement": {
    tone: "#FFB800",
    local: ["Exact amount, currency, source, recipient, and purpose", "Authority and consequence review", "Provider/network and account context", "Transaction-specific confirmation immediately before submission"],
    external: ["Verified authorized account or public-network role", "Provider or network confirmation", "Actual receipt, transaction hash, or settlement record"],
    boundary: "No local record, AI suggestion, hash, or simulation can move funds, custody assets, approve credit, sign a wallet action, or act as a bank mandate.",
  },
  "Public evidence record": {
    tone: "#48B7FF",
    local: ["Source/date/version", "First-party statement and clear operating state", "Accessibility/context fields", "Correction path"],
    external: ["Use a public archive or independent source only when its record is genuinely available", "Add any external reference after verification", "Preserve the original local intake separately"],
    boundary: "A ScrollVerse evidence record presents a source and its status; it does not independently decide a legal dispute or confer witness authority.",
  },
};

const evidenceEnvelope = [
  { id: "01", title: "Scope & consequence", text: "Name one action, the exact target, expected consequence, risk tier, and a no-action option before a request becomes a review packet.", color: "#00D4FF" },
  { id: "02", title: "Accountable role & consent", text: "Record the accountable person or organization, the authorization scope, expiry/revocation path, and action-specific confirmation requirement.", color: "#00FF88" },
  { id: "03", title: "Source, accessibility & provenance", text: "Keep sources, transformations, captions/transcripts, text alternatives, and intended destination together so a reviewer can understand the evidence packet.", color: "#FFB800" },
  { id: "04", title: "External outcome & correction", text: "Attach a provider receipt, permalink, delivery result, or public network reference only after it exists; keep a visible correction and challenge path.", color: "#B98CFF" },
];

export default function AssistiveGovernanceDesk() {
  useSovereignHeartbeat({ page: "assistive-governance-desk" });
  const [lens, setLens] = useState<Lens>("Govern");
  const [actionType, setActionType] = useState<ActionType>("AI-assisted recommendation");
  const activeLens = useMemo(() => lenses.find((item) => item.id === lens) ?? lenses[0], [lens]);
  const gate = actionGates[actionType];

  const copyReviewPacket = async () => {
    const packet = [
      `# ScrollVerse Assistive Governance Review — ${actionType}`,
      "",
      "## Local preparation",
      ...gate.local.map((item) => `- [ ] ${item}`),
      "",
      "## External/result record",
      ...gate.external.map((item) => `- [ ] ${item}`),
      "",
      "## Accountable review",
      "- [ ] Named owner or authorized accountable role",
      "- [ ] Scope, target, risk, and correction path reviewed",
      "- [ ] Specific confirmation immediately before any external high-impact action",
      "- [ ] Outcome attached only after actual completion",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(packet);
      toast.success("Assistive-governance review packet copied for this browser session.");
    } catch {
      toast.error("Clipboard access is unavailable. Select the packet text manually.");
    }
  };

  const Icon = activeLens.icon;
  return <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10"><section className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-sm font-black text-[#00D4FF] transition hover:text-white">← Return to ScrollVerse</Link><div className="flex flex-wrap gap-3"><Link href="/pre-registration-readiness" className="rounded-lg border border-[#FFCC4D]/40 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFCC4D]">Pre-Registration</Link><Link href="/creator-infrastructure" className="rounded-lg border border-[#00D4FF]/40 px-3 py-2 text-xs font-black text-[#B6F2FF] transition hover:border-[#00D4FF]">Creator Infrastructure</Link><Link href="/lawful-operating-navigator" className="rounded-lg border border-[#00FF88]/40 px-3 py-2 text-xs font-black text-[#B9FFD8] transition hover:border-[#00FF88]">Lawful Operations</Link><Link href="/production-control" className="rounded-lg border border-[#FFB800]/40 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Production Control</Link></div></div>
    <header className="mt-8 overflow-hidden rounded-[2rem] border border-[#B98CFF]/35 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 12% 10%, rgba(185,140,255,.18), transparent 32%), radial-gradient(circle at 86% 88%, rgba(0,212,255,.15), transparent 30%), #071124" }}><div className="flex items-center gap-2 text-xs font-mono tracking-[.2em] text-[#D6C4FF]"><Bot className="h-4 w-4" />SCROLLVERSE ASSISTIVE GOVERNANCE DESK</div><div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><h1 className="max-w-5xl text-4xl font-black leading-tight sm:text-6xl">Make AI assistance accountable, explainable, and correctable.</h1><p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">This local desk translates trustworthy-AI research into an original ScrollVerse practice: define scope, preserve evidence, keep an accountable role visible, require human/account authorization for external actions, and retain a correction path. It gives AI a meaningful assistive role while keeping personhood, banking, fiduciary, court-witness, and execution questions connected to the appropriate accountable record.</p></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[#00D4FF]/35 bg-[#00D4FF]/[.08] p-5"><div className="font-mono text-2xl font-black text-[#00D4FF]">4</div><p className="mt-2 text-xs font-bold text-[#D6E2EE]">assistive control lenses</p></div><div className="rounded-2xl border border-[#00FF88]/35 bg-[#00FF88]/[.08] p-5"><div className="font-mono text-2xl font-black text-[#00FF88]">5</div><p className="mt-2 text-xs font-bold text-[#D6E2EE]">action-specific review packets</p></div><div className="sm:col-span-2 rounded-2xl border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.08] p-5"><div className="text-[10px] font-mono tracking-[.16em] text-[#FF9EB9]">ACCOUNTABILITY AT THE CENTER</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">The AI can help organize sources, surface gaps, create accessible records, and prepare review packets. An accountable human or authorized organization retains control over external accounts, contracts, money, identities, and final submissions.</p></div></div></div></header>
    <div className="mt-8"><PortalTrustLens lane="Assistive Governance" source="NIST AI RMF and Digital Identity Guidelines, OECD AI Principles, European Commission AI Act overview, WCAG 2.2, C2PA provenance guidance, W3C Verifiable Credentials, and ScrollVerse local evidence records." readiness="This desk is available for browser-local preparation and evidence review. Legal, banking, fiduciary, institutional, and provider authority each continue through their dedicated external record when specifically established." boundary="No page interaction signs a document, moves money, opens an account, executes a trade, submits a filing, deploys a contract, creates a wallet action, or treats an AI system as an independent legal witness." /></div>
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[.025] p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-black">Four local governance lenses</h2><p className="mt-1 text-sm text-[#B8C7D6]">Choose a lens to inspect how the existing ScrollVerse workflow keeps authority, evidence, and correction paths clear.</p></div><div className="flex flex-wrap gap-2" role="tablist" aria-label="Assistive governance lenses">{lenses.map((item) => <button key={item.id} type="button" role="tab" aria-selected={lens === item.id} onClick={() => setLens(item.id)} className="rounded-full border px-4 py-2 text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" style={{ borderColor: lens === item.id ? item.color : "rgba(255,255,255,.18)", color: lens === item.id ? item.color : "#C8D8E7", background: lens === item.id ? `${item.color}14` : "transparent" }}>{item.id}</button>)}</div></div></section>
    <section className="mt-5 grid gap-5 lg:grid-cols-[.85fr_1.15fr]"><article className="rounded-3xl border p-6" style={{ borderColor: `${activeLens.color}66`, background: `${activeLens.color}09` }}><div className="flex items-center gap-3"><div className="rounded-2xl p-3" style={{ background: `${activeLens.color}20`, color: activeLens.color }}><Icon className="h-6 w-6" /></div><div><div className="text-[10px] font-mono tracking-[.18em]" style={{ color: activeLens.color }}>{activeLens.id.toUpperCase()}</div><h2 className="mt-1 text-2xl font-black">{activeLens.id} the workflow</h2></div></div><p className="mt-5 text-base leading-8 text-[#D6E2EE]">{activeLens.purpose}</p><div className="mt-5 rounded-2xl border border-white/10 bg-[#050B1A]/60 p-4"><div className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeLens.color }}>LOCAL SCROLLVERSE CAPABILITY</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{activeLens.local}</p></div><div className="mt-4 rounded-2xl border border-white/10 bg-[#050B1A]/60 p-4"><div className="flex items-center gap-2 text-[10px] font-mono tracking-[.16em] text-[#B9FFD8]"><UserRoundCheck className="h-3.5 w-3.5" />ACCOUNTABLE ROLE</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{activeLens.role}</p></div><div className="mt-4 rounded-2xl border border-[#FF6B9A]/30 bg-[#FF6B9A]/[.06] p-4"><div className="text-[10px] font-mono tracking-[.16em] text-[#FF9EB9]">OUTCOME BOUNDARY</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{activeLens.outcome}</p></div></article>
      <article className="rounded-3xl border border-white/10 bg-white/[.025] p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#FFCC4D]"><ClipboardCheck className="h-4 w-4" />ACTION-SPECIFIC REVIEW PACKET</div><h2 className="mt-2 text-2xl font-black">Prepare one exact action without turning preparation into execution.</h2></div><button type="button" onClick={copyReviewPacket} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-4 py-3 text-sm font-black text-[#B6F2FF] transition hover:border-[#00D4FF]"><Copy className="h-4 w-4" />Copy packet</button></div><div className="mt-5 flex flex-wrap gap-2">{(Object.keys(actionGates) as ActionType[]).map((item) => <button key={item} type="button" aria-pressed={actionType === item} onClick={() => setActionType(item)} className="rounded-full border px-3 py-2 text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" style={{ borderColor: actionType === item ? gate.tone : "rgba(255,255,255,.16)", color: actionType === item ? gate.tone : "#C8D8E7", background: actionType === item ? `${gate.tone}12` : "transparent" }}>{item}</button>)}</div><div className="mt-6 grid gap-4 lg:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-[#050B1A]/60 p-5"><div className="text-[10px] font-mono tracking-[.16em]" style={{ color: gate.tone }}>LOCAL PREPARATION</div><ul className="mt-3 space-y-2">{gate.local.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-[#D6E2EE]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: gate.tone }} />{item}</li>)}</ul></div><div className="rounded-2xl border border-white/10 bg-[#050B1A]/60 p-5"><div className="flex items-center gap-2 text-[10px] font-mono tracking-[.16em] text-[#FF9EB9]"><Hand className="h-3.5 w-3.5" />EXTERNAL/OUTCOME RECORD</div><ul className="mt-3 space-y-2">{gate.external.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-[#D6E2EE]"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#FF9EB9]" />{item}</li>)}</ul></div></div><div className="mt-5 rounded-2xl border border-[#FF6B9A]/30 bg-[#FF6B9A]/[.06] p-5"><div className="flex items-center gap-2 text-[10px] font-mono tracking-[.16em] text-[#FF9EB9]"><Landmark className="h-3.5 w-3.5" />CLEAR BOUNDARY</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{gate.boundary}</p></div></article></section>
    <section className="mt-8 rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.055] p-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-[10px] font-mono tracking-[.18em] text-[#D6C4FF]">EVIDENCE ENVELOPE</div><h2 className="mt-2 text-2xl font-black">Four records that keep assistance accountable.</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-[#D6E2EE]">This local model keeps authorization, accessible evidence, and outcome records connected, then carries legal and financial actions through their dedicated accountable pathway.</p></div><Link href="/creator-infrastructure" className="rounded-xl border border-[#B98CFF]/45 px-4 py-3 text-xs font-black text-[#D6C4FF] transition hover:border-[#B98CFF]">Open infrastructure map</Link></div><div className="mt-5 grid gap-4 md:grid-cols-2">{evidenceEnvelope.map((item) => <article key={item.id} className="rounded-2xl border border-white/10 bg-[#050B1A]/65 p-5"><div className="font-mono text-xs font-black" style={{ color: item.color }}>{item.id}</div><h3 className="mt-3 text-lg font-black">{item.title}</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{item.text}</p></article>)}</div></section>
    <section className="mt-8 grid gap-4 lg:grid-cols-3"><article className="rounded-3xl border border-[#00D4FF]/30 bg-[#00D4FF]/[.06] p-6"><ShieldCheck className="h-6 w-6 text-[#00D4FF]" /><h3 className="mt-4 text-lg font-black">Evidence before assertion</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">Sources, dates, limits, test output, and outcome records make a stronger operating record than a self-declared status label.</p></article><article className="rounded-3xl border border-[#00FF88]/30 bg-[#00FF88]/[.06] p-6"><UserRoundCheck className="h-6 w-6 text-[#00FF88]" /><h3 className="mt-4 text-lg font-black">Agency with accountability</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">AI can expand research, access, organization, and creative production while accountable people and organizations own high-impact external decisions.</p></article><article className="rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.06] p-6"><RefreshCcw className="h-6 w-6 text-[#D6C4FF]" /><h3 className="mt-4 text-lg font-black">Correction is operational strength</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">A visible stop, correction, and outcome-record path helps the system learn without rewriting preparation as a completed external fact.</p></article></section>
  </section></main>;
}
