import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Boxes, Copy, Eye, FileSearch, Layers3, Network, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type State = "Artwork record" | "Source record" | "Preparation pathway" | "Requires exact release record";
type Artifact = { title: string; type: string; state: State; color: string; detail: string; href: string; action: string; };

const ARTIFACTS: Artifact[] = [
  { title: "Exchange-and-evolution artwork", type: "Visual artifact", state: "Artwork record", color: "#00D4FF", detail: "Blue operator portraits, symbolic coin treatments, and evolution compositions held as source-labeled browser-local artwork.", href: "/evolution-lookbook", action: "Open Evolution Lookbook" },
  { title: "Physical and digital collection", type: "Archive record", state: "Artwork record", color: "#B5F7CC", detail: "Selected physical apparel, maps, character work, and visual accessions with direct-review notes and accessibility descriptions.", href: "/creator-collection-records", action: "Open Creator Collection" },
  { title: "Artifact evidence blueprint", type: "Evidence method", state: "Preparation pathway", color: "#B98CFF", detail: "A practical record structure for source, object details, accessibility, custody distinctions, and release preparation.", href: "/artifact-evidence-blueprint", action: "Open Evidence Blueprint" },
  { title: "Crypto systems atlas", type: "Educational system map", state: "Source record", color: "#FFB800", detail: "A browser-local educational map of crypto concepts and readiness layers with no wallet, custody, trade, or transfer function.", href: "/crypto-systems-atlas", action: "Open Crypto Systems Atlas" },
  { title: "Creator activation dossier", type: "Release preparation", state: "Requires exact release record", color: "#FF6B9A", detail: "Nine held external lanes mapped to their exact owner-controlled records for future item-specific activation review.", href: "/activation-dossier", action: "Open Activation Dossier" },
  { title: "Connected creator worlds", type: "Cross-promotion map", state: "Preparation pathway", color: "#FFE09A", detail: "Visual, media, books, learning, apps, and systems that visitors can explore through connected browser-local routes.", href: "/creator-atlas", action: "Open Creator Atlas" },
];

const states: Array<State | "All"> = ["All", "Artwork record", "Source record", "Preparation pathway", "Requires exact release record"];

const iconFor = (type: string) => type.includes("Visual") ? Eye : type.includes("Evidence") ? FileSearch : type.includes("Cross") ? Network : type.includes("Release") ? ShieldCheck : Layers3;

export default function CryptoArtifactLookbook() {
  useSovereignHeartbeat({ page: "crypto-artifact-lookbook" });
  const [filter, setFilter] = useState<State | "All">("All");
  const visible = useMemo(() => ARTIFACTS.filter(item => filter === "All" || item.state === filter), [filter]);

  const copyIndex = () => {
    const value = visible.map(item => `${item.title} | ${item.type} | ${item.state} | ${item.href}`).join("\n");
    navigator.clipboard?.writeText(value).then(() => toast.success("Local artifact index copied.")).catch(() => toast.message("Copy is available in a browser with clipboard permission."));
  };

  return <main className="min-h-screen bg-[#050B1A] pb-20 text-white">
    <section className="border-b border-cyan-300/15 bg-[radial-gradient(circle_at_10%_0%,rgba(255,184,0,.2),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(0,212,255,.18),transparent_27%)]">
      <div className="container py-16 md:py-24">
        <p className="font-mono text-xs tracking-[.26em] text-[#FFB800]">CRYPTO ARTIFACT LOOKBOOK</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">Artifacts become<br /><span className="text-[#00D4FF]">connected worlds.</span></h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">A cross-promotion layer for the creator’s visual artifacts, archive records, educational concepts, preparation pathways, apps, and sites. Each card names what it is and where it leads.</p>
      </div>
    </section>

    <section className="container py-10">
      <PortalTrustLens lane="Crypto Artifact Lookbook" source="Evolution Lookbook, Creator Collection Records, Artifact Evidence Blueprint, Crypto Systems Atlas, Creator Atlas, and the Phase 614 design record." readiness="Browser-local artifact discovery and connected route handoffs are available now." boundary="This page does not list an item, identify a market price, connect a wallet, issue a token, deploy a contract, provide custody, accept payment, execute a trade, create a yield product, or publish a transaction." />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><div className="flex flex-wrap gap-2" role="tablist" aria-label="Artifact operating-state filters">{states.map(state => <button key={state} onClick={() => setFilter(state)} role="tab" aria-selected={filter === state} className={`rounded-full border px-3 py-2 text-xs font-black transition ${filter === state ? "border-[#00D4FF]/80 bg-[#00D4FF]/15 text-[#B9F4FF]" : "border-white/10 text-slate-300 hover:border-white/30"}`}>{state}</button>)}</div><button onClick={copyIndex} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-black hover:bg-white/15"><Copy className="h-4 w-4" />Copy visible index</button></div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map(item => { const Icon = iconFor(item.type); return <article key={item.title} className="group rounded-3xl border border-white/10 bg-white/[.03] p-6 transition hover:-translate-y-1 hover:border-white/25"><div className="flex items-start justify-between gap-4"><div className="rounded-2xl p-3" style={{ background: `${item.color}18`, color: item.color }}><Icon className="h-6 w-6" /></div><span className="rounded-full border px-2 py-1 text-[10px] font-black" style={{ borderColor: `${item.color}70`, color: item.color }}>{item.state.toUpperCase()}</span></div><p className="mt-6 font-mono text-[10px] tracking-widest text-slate-400">{item.type.toUpperCase()}</p><h2 className="mt-2 text-xl font-black">{item.title}</h2><p className="mt-3 min-h-20 text-sm leading-6 text-slate-300">{item.detail}</p><Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-black transition hover:opacity-80" style={{ color: item.color }}>{item.action}<ArrowUpRight className="h-4 w-4" /></Link></article>; })}</div>

      <section className="mt-10 rounded-3xl border border-[#B98CFF]/25 bg-[#B98CFF]/[.055] p-7"><div className="flex gap-4"><Boxes className="h-7 w-7 shrink-0 text-[#D6C4FF]" /><div><h2 className="text-xl font-black">Cross-promotion is visitor choice</h2><p className="mt-2 max-w-4xl text-sm leading-7 text-slate-300">The lookbook connects ScrollVerse artifacts to the systems that give them context: visual exhibit, collection record, evidence blueprint, educational atlas, release preparation, and creator discovery. Visitors can follow any route from the artifact outward, with each page carrying its own source and operating label.</p></div></div></section>
    </section>
  </main>;
}
