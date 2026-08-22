import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

const lanes = [
  ["Web / mobile / TV", "DESIGNED", "Browser and device-adaptive delivery research; no install package or TV certification is released."],
  ["Computer", "DESIGNED", "Desktop-compatible delivery research; no native runner, launcher, or performance claim is verified."],
  ["Existing console ecosystems", "REQUIRES OWNER RELEASE", "Platform adapters, certification, licensing, storefront access, and partner approval are not active."],
  ["Consoleless world packs", "DESIGNED", "A downloadable-world concept with optional attachments; no asset bundle, distribution channel, or entitlement system is published."],
];

export default function OmnilandConsolelessDelivery() {
  useSovereignHeartbeat({ page: "omniland-consoleless-delivery" });
  return <main className="min-h-screen bg-[#050B1A] px-5 py-24 text-slate-100"><div className="mx-auto max-w-6xl space-y-8">
    <PortalTrustLens lane="game systems" source="Protected owner-supplied Omniland source intake" readiness="designed" boundary="No platform, adapter, licensing, hardware, security, performance, or commerce claim is activated." />
    <header><p className="font-mono text-xs tracking-[.3em] text-cyan-300">OMNILAND · CONSOLELESS DELIVERY RESEARCH</p><h1 className="mt-3 text-4xl font-black">One world system. Many screen paths.</h1><p className="mt-4 max-w-3xl text-slate-300">A browser-local design record for consoleless-first world delivery, compatible edition research, and creator-owned game-system blueprints. Each delivery path remains a research or owner-release gate until it has direct platform evidence.</p></header>
    <section className="grid gap-4 md:grid-cols-2">{lanes.map(([title,state,body]) => <article key={title} className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-6"><p className="font-mono text-xs text-amber-300">{state}</p><h2 className="mt-2 text-xl font-bold">{title}</h2><p className="mt-3 text-sm text-slate-300">{body}</p></article>)}</section>
    <section className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-6"><h2 className="text-xl font-bold">Episode 55 source-attachment gate</h2><p className="mt-2 text-sm text-slate-300">The supplied “Consoleless Omniland Matrix” narrative remains protected source context. No episode, video, soundtrack, stream, or release is produced or scheduled from this record.</p></section>
    <nav className="flex flex-wrap gap-3 text-sm"><Link href="/game-systems-research-blueprint" className="rounded-lg border border-cyan-400/30 px-4 py-2 text-cyan-200">Game Systems Blueprint</Link><Link href="/scrollverse-story-worlds" className="rounded-lg border border-cyan-400/30 px-4 py-2 text-cyan-200">Story Worlds</Link><Link href="/special-repository" className="rounded-lg border border-cyan-400/30 px-4 py-2 text-cyan-200">Special Repository</Link><Link href="/empire-power-index" className="rounded-lg border border-cyan-400/30 px-4 py-2 text-cyan-200">Empire Power Index</Link></nav>
  </div></main>;
}
