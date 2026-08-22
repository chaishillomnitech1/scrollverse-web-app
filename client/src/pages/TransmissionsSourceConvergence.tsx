import { Link } from "wouter";
import { Archive, ArrowRight, BookOpen, CircleDollarSign, Film, Landmark, Network, Orbit, ShieldCheck, Sparkles, Store, Waypoints } from "lucide-react";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const RECORDS = [
  {
    id: "SV-TX-756",
    title: "Financial Continuum",
    icon: CircleDollarSign,
    color: "#FFCC4D",
    scope: "Finance, business, market, revenue, payment, and asset-readiness source context.",
    boundary: "The source does not establish a bank, broker, exchange, payment provider, customer account, asset offering, market feed, revenue ledger, transfer rail, or active financial service.",
    handoffs: [{ label: "Capital Readiness", href: "/capital-readiness" }, { label: "Sovereign Bank", href: "/sovereign-bank" }, { label: "Revenue Readiness", href: "/revenue" }],
  },
  {
    id: "SV-TX-757",
    title: "Multi-Vector Intake",
    icon: Waypoints,
    color: "#B98CFF",
    scope: "Contract, music, app-icon, campaign, and commerce references retained as protected source material.",
    boundary: "The source does not establish a contract event, media release, authenticated session, asset assignment, campaign launch, Shopify project, inventory, checkout, payout, or payment action.",
    handoffs: [{ label: "Media Release Concepts", href: "/media-release-concept-board" }, { label: "Campaign Center", href: "/campaign-activation-center" }, { label: "Commerce Readiness", href: "/commerce-financial-readiness-board" }],
  },
  {
    id: "SV-TX-758",
    title: "Global Orbital Matrix",
    icon: Orbit,
    color: "#00D4FF",
    scope: "Episode, satellite, telemetry, benchmark, Nginx, infrastructure, and external-agent references retained as protected context.",
    boundary: "The source does not establish an orbital asset, telemetry system, network, server, Nginx gateway, external-agent connection, security control, daemon, or deployed infrastructure.",
    handoffs: [{ label: "Media Readiness", href: "/original-media-readiness" }, { label: "Infrastructure Blueprint", href: "/future-infrastructure-blueprint" }, { label: "Game Worlds Studio", href: "/game-worlds-studio" }],
  },
];

export default function TransmissionsSourceConvergence() {
  useSovereignHeartbeat({ page: "transmissions-source-convergence" });
  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-cyan-300/20 bg-[radial-gradient(circle_at_10%_0%,rgba(0,212,255,.18),transparent_31%),radial-gradient(circle_at_90%_8%,rgba(185,140,255,.17),transparent_28%),#050B1A]"><div className="container py-16 md:py-24"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/connected-source-registry" className="inline-flex items-center gap-2 text-xs font-mono tracking-[.16em] text-cyan-200"><ArrowRight className="h-4 w-4 rotate-180"/> CONNECTED SOURCE REGISTRY</Link><span className="rounded-full border border-cyan-200/35 bg-cyan-300/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-cyan-100">THREE TRANSMISSIONS · PROTECTED CONTEXT</span></div><div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="font-mono text-xs tracking-[.22em] text-cyan-300">SCROLLVERSE · SOURCE CONVERGENCE REGISTER</p><h1 className="mt-4 text-5xl font-black leading-[.92] md:text-7xl">Three transmissions.<br/><span className="text-cyan-300">One legible source trail.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">This register connects the Financial Continuum, Multi-Vector Intake, and Global Orbital Matrix source records to their current browser-local planning routes. The records retain the creator’s narrative and design context while keeping every public operating state precise.</p></div><aside className="rounded-3xl border border-amber-200/25 bg-slate-950/60 p-7"><Sparkles className="text-amber-300"/><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-amber-200">CONVERGENCE RULE</p><p className="mt-3 text-2xl font-black">A source can inform multiple pathways without becoming an unverified capability.</p><p className="mt-3 text-sm leading-7 text-slate-300">Each record identifies its scope, its boundary, and its browser-local handoffs in one place.</p></aside></div><div className="mt-10"><PortalTrustLens lane="Transmissions and Source Convergence Register" source="Protected Financial Continuum, Multi-Vector, and Global Orbital Matrix source-intake records." readiness="Browser-local source discovery and direct readiness handoffs are available now." boundary="The register does not execute embedded code, validate operational assertions, access accounts, configure services, publish media, create contracts, activate commerce, connect providers, or initiate financial, network, or infrastructure actions." /></div></div></section>
    <section className="container py-14 md:py-20"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs tracking-[.2em] text-purple-200">CONVERGED SOURCE RECORDS</p><h2 className="mt-3 text-3xl font-black">Read the context. Follow the current readiness route.</h2></div><Link href="/active-pathways-release-gates-audit" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white">Open release-gates audit <ArrowRight size={16}/></Link></div><div className="mt-8 grid gap-6 xl:grid-cols-3">{RECORDS.map(({ id, title, icon: Icon, color, scope, boundary, handoffs }) => <article key={id} className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[.035] p-7"><div className="flex items-start justify-between gap-3"><span className="rounded-2xl border p-3" style={{ color, borderColor: `${color}55`, background: `${color}12` }}><Icon size={23}/></span><span className="rounded-full border px-2.5 py-1 text-[9px] font-mono" style={{ color, borderColor: `${color}55` }}>PROTECTED CONTEXT</span></div><p className="mt-6 font-mono text-[10px] tracking-[.15em]" style={{ color }}>{id}</p><h2 className="mt-2 text-2xl font-black">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-300">{scope}</p><div className="mt-5 rounded-2xl border border-amber-200/20 bg-amber-300/[.045] p-4"><p className="text-[10px] font-mono text-amber-200">SOURCE BOUNDARY</p><p className="mt-2 text-xs leading-6 text-slate-300">{boundary}</p></div><div className="mt-5 space-y-2">{handoffs.map((item) => <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/15 px-3 py-2.5 text-sm font-bold hover:bg-black/25" style={{ color }}> {item.label}<ArrowRight size={14}/></Link>)}</div></article>)}</div></section>
    <section className="border-y border-white/10 bg-slate-950/50"><div className="container py-14 md:py-20"><div className="grid gap-6 lg:grid-cols-[1fr_.95fr]"><div><p className="font-mono text-xs tracking-[.2em] text-purple-200">HOW TO USE THE REGISTER</p><h2 className="mt-3 text-3xl font-black">Begin with the source record, then choose the browser-local lane that matches the work.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">For finance and business language, begin with Financial Continuum. For music, icon, campaign, contract, or commerce design context, begin with Multi-Vector Intake. For episode, infrastructure, and Game Worlds context, begin with Global Orbital Matrix. A current readiness route provides the next appropriate local record.</p></div><div className="rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[.055] p-7"><ShieldCheck className="text-cyan-200"/><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-cyan-200">OPERATING-STATE DISCIPLINE</p><p className="mt-3 text-xl font-black">Source context and verified operating state stay distinct.</p><Link href="/ecosystem-discovery" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-100 hover:text-white">Explore the ecosystem <ArrowRight size={16}/></Link></div></div></div></section>
  </main>;
}
