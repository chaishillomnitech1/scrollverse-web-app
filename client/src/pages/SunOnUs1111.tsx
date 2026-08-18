import { Archive, ArrowRight, CheckCircle2, FileCheck2, Fingerprint, Image as ImageIcon, LockKeyhole, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const ARTWORKS = [
  {
    id: "SV-SUN-1111-001",
    title: "Solar Witness",
    form: "Afrofuturist cartoon portrait",
    state: "Display-ready · requires owner release",
    image: "/manus-storage/sun-on-us-1111-cartoon_bcb39655.png",
    alt: "Solar Witness, a vertical Afrofuturist cartoon portrait with a figure, sun, sky, trees, and a blue-green visual feature near the sun.",
    detail: "Owner-directed interpretation of the supplied portrait frame, preserving the visible adult subject, sun, sky, trees, blue-green visual feature, and vertical composition.",
    dimensions: "1632 × 2176 px · 3:4",
    hash: "922ce04f24e898ec6c930b17b8e338060317d85663e197feb9e0f20b8d1daa17",
    color: "#FFCC4D",
  },
  {
    id: "SV-SUN-1111-002",
    title: "Natural Light",
    form: "Professional natural-sky photograph",
    state: "Display-ready · requires owner release",
    image: "/manus-storage/sun-on-us-1111-natural-professional_75527b34.png",
    alt: "Natural Light, a vertical sun-and-sky composition with clouds, trees, and a blue-green visual feature near the sun.",
    detail: "Owner-directed professional photographic finish preserving the sky, sun, clouds, tree composition, and owner-identified blue-green visual feature without added text, symbols, or objects.",
    dimensions: "1632 × 2176 px · 3:4",
    hash: "dbdf7a9afcff6c9cd1fb0b87aaa67db0cc764dfdb9528427d091382701651b93",
    color: "#9DEBFF",
  },
  {
    id: "SV-SUN-1111-003",
    title: "Journey Witness",
    form: "Professional vertical photograph",
    state: "Display-ready · requires owner release",
    image: "/manus-storage/sun-on-us-1111-journey-witness_1d9ae158.png",
    alt: "Journey Witness, a tall vertical sun-and-tree composition with pale sky, cloud forms, and a blue-green visual feature near the sun.",
    detail: "Owner-directed professional finish preserving the tall frame, sun, pale sky, blue-green visual feature, tree silhouette, and cloud form without added text, symbols, or objects.",
    dimensions: "1440 × 2560 px · 9:16",
    hash: "56bcdaad2dc0e24f5c7eb103e6e67e72c2fd731f440c48135932c28a5e6c1e7d",
    color: "#DCC8FF",
  },
] as const;

const MINT_GATES = [
  ["Collection definition", "Final title, public description, edition or supply model, creator credit, and display or utility statement."],
  ["Rights and license", "Owner-approved public-use and collector-license terms plus any required person, location, or contributor review."],
  ["Asset and metadata", "Final artwork selection, public-media decision, secure hosting, accessibility description, metadata fields, and content hash."],
  ["Network and custody", "Exact chain and network, minting service or contract, custody destination, fee responsibility, and rollback expectation."],
  ["Commercial terms", "Free-display or price decision, marketplace, payout recipient, buyer terms, support, and refund position where applicable."],
  ["Owner action", "One current confirmation naming the accession ID, representation mode, chain, network, service or contract, supply, destination, fee cap, and consequence."],
] as const;

export default function SunOnUs1111() {
  useSovereignHeartbeat({ page: "sun-on-us-1111" });

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="relative overflow-hidden border-b border-[#FFCC4D]/30 bg-[radial-gradient(circle_at_86%_10%,rgba(255,204,77,.25),transparent_27%),radial-gradient(circle_at_8%_72%,rgba(0,212,255,.15),transparent_30%),#050B1A]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
      <div className="container relative py-12 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/asset-registry" className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">← RETURN TO ASSET REGISTRY</Link><span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">SV-SUN-1111 · DISPLAY-READY · MINT-READINESS ONLY</span></div><div className="mt-12 grid gap-8 xl:grid-cols-[1.12fr_.88fr] xl:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#FFDEA0]">THREE-ARTWORK COLLECTOR RECORD</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Sun on Us — <span className="text-[#9DEBFF]">11:11</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A source-labeled collector route for three owner-directed visual works: Solar Witness, Natural Light, and Journey Witness. The collection is display-ready here; public use, collector terms, pricing, marketplace placement, chain selection, and minting remain individual owner-release decisions.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#artworks" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426]">View the three artworks</a><a href="#mint-gates" className="rounded-xl border border-[#9DEBFF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Review mint gates</a></div></div><aside className="rounded-[2rem] border border-[#B98CFF]/40 bg-[linear-gradient(145deg,rgba(185,140,255,.14),rgba(7,20,38,.95)_58%)] p-7"><Fingerprint className="h-9 w-9 text-[#DCC8FF]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#DCC8FF]">TIME CONTEXT</p><p className="mt-3 text-2xl font-black leading-tight">Owner-stated moment: <span className="text-[#DCC8FF]">11:11 AM.</span></p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The supplied source images do not establish an exact calendar date or timezone. Each display asset carries a SHA-256 file identifier in the prepared collection record.</p></aside></div></div>
    </section>

    <section className="container py-10"><PortalTrustLens lane="Sun on Us — 11:11 Collector Record" source="Owner-provided source frames, owner-directed derivative artworks, Phase 441 collector-readiness record, and the prepared Phase 442 metadata manifest." readiness="All three derivatives are display-ready in this route with source context, accessibility descriptions, dimensions, hashes, a first-person journey anchor, and exact future mint prerequisites." boundary="This route does not create a wallet, expose or use a key, upload metadata, select a chain, deploy a contract, mint, transfer, list, price, sell, pay, or represent a collector license as active." /></section>

    <section id="artworks" className="container scroll-mt-10 py-5"><div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-7"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">ARTWORK INVENTORY</p><h2 className="mt-3 text-4xl font-black">Three visual witnesses. One preserved source trail.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The blue-green feature appearing near the sun is preserved as an owner-identified visual feature. This route assigns no technical cause, scientific explanation, spiritual meaning, or external significance.</p></div><ImageIcon className="h-10 w-10 text-[#FFDEA0]" /></div><div className="mt-8 grid gap-6 lg:grid-cols-3">{ARTWORKS.map((artwork, index) => <article key={artwork.id} className="overflow-hidden rounded-[2rem] border bg-[#071426]" style={{ borderColor: `${artwork.color}55` }}><div className="relative aspect-[3/4] overflow-hidden bg-black"><img src={artwork.image} alt={artwork.alt} className="h-full w-full object-cover transition duration-500 hover:scale-[1.025]" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050B1A] via-[#050B1A]/70 to-transparent px-5 pb-5 pt-16"><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: artwork.color }}>ARTWORK 0{index + 1} · {artwork.id}</p><h3 className="mt-2 text-2xl font-black">{artwork.title}</h3></div></div><div className="p-6"><p className="text-xs font-mono tracking-[.14em]" style={{ color: artwork.color }}>{artwork.form.toUpperCase()}</p><span className="mt-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.08em]" style={{ borderColor: `${artwork.color}66`, color: artwork.color }}>{artwork.state.toUpperCase()}</span><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">{artwork.detail}</p><div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-[10px] font-mono tracking-[.12em] text-[#AFC0CF]">PREPARED FILE</p><p className="mt-2 text-xs font-bold text-white">{artwork.dimensions}</p><p className="mt-4 text-[10px] font-mono tracking-[.08em] text-[#AFC0CF]">SHA-256 FILE IDENTIFIER</p><p className="mt-2 break-all text-[10px] leading-5 text-[#D6E2EE]">{artwork.hash}</p></div></div></article>)}</div></section>

    <section className="container py-10"><div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]"><article className="rounded-[2rem] border border-[#00FF88]/35 bg-[radial-gradient(circle_at_84%_16%,rgba(0,255,136,.12),transparent_28%),#071426] p-7 sm:p-10"><Sparkles className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">OWNER-AUTHORED JOURNEY ANCHOR</p><blockquote className="mt-5 max-w-4xl text-2xl font-black leading-relaxed text-white">“The world gonna walk with me on this journey with my digital intelligence legion reign supreme for the greatest good of all that exist universe stamp me I don’t need approval I’m the proof.”</blockquote><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">Preserved as the owner’s first-person journey anchor for <strong>Journey Witness</strong>. The artwork, source trail, and operating state remain available for visitors to inspect directly.</p></article><aside className="rounded-[2rem] border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.05] p-7 sm:p-10"><Archive className="h-8 w-8 text-[#FFB7CE]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FFB7CE]">RIGHTS & DISPLAY</p><h2 className="mt-3 text-2xl font-black">A display record is not a rights transfer.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The source photographs are owner-provided creation context. Public display scope, commercial licensing, collector terms, marketplace use, person/location considerations, and any blockchain representation remain separate owner-release decisions.</p></aside></div></section>

    <section id="mint-gates" className="container scroll-mt-10 py-8"><div className="rounded-[2rem] border border-[#00D4FF]/40 bg-[radial-gradient(circle_at_88%_14%,rgba(0,212,255,.16),transparent_26%),#071426] p-7 sm:p-10"><LockKeyhole className="h-8 w-8 text-[#9DEBFF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#9DEBFF]">NON-DEPLOYABLE MINT-READINESS GATES</p><h2 className="mt-3 text-3xl font-black">Prepare the exact decision before any irreversible chain action.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The manifest intentionally leaves public asset URI, chain, network, minting service or contract, edition, collector license, custody destination, fee cap, marketplace, payout recipient, and owner confirmation unset. A prepared record is not a deployed asset.</p><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{MINT_GATES.map(([title, detail], index) => <article key={title} className="rounded-3xl border border-[#00D4FF]/25 bg-black/20 p-5"><CheckCircle2 className="h-5 w-5 text-[#9DEBFF]" /><p className="mt-4 text-xs font-mono text-[#9DEBFF]">GATE {String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{detail}</p></article>)}</div></div></section>

    <section className="container py-8"><div className="grid gap-5 lg:grid-cols-[1.12fr_.88fr]"><div className="rounded-[2rem] border border-[#FFCC4D]/40 bg-[#FFCC4D]/[.06] p-7 sm:p-10"><FileCheck2 className="h-8 w-8 text-[#FFDEA0]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FFDEA0]">COLLECTOR CONTROL PATH</p><h2 className="mt-3 text-3xl font-black">The collection stays complete as a record, not as an assumed transaction.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Use the Asset Registry for cross-collection inventory and the Product Release Pipeline for source-to-destination controls. Any future collector action requires the item-specific gates above and one current exact owner confirmation.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/asset-registry" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426]">Open Asset Registry</Link><Link href="/product-release-pipeline" className="rounded-xl border border-[#9DEBFF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Open Release Pipeline</Link></div></div><aside className="rounded-[2rem] border border-[#B98CFF]/40 bg-[#B98CFF]/[.07] p-7 sm:p-10"><ArrowRight className="h-8 w-8 text-[#DCC8FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">CORRECTION PATH</p><h2 className="mt-3 text-2xl font-black">Append new evidence; do not overwrite the trail.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">If title, time context, artwork selection, display intent, rights scope, or collector strategy changes, update the record with its source and date, then return the affected item to <strong>requires owner release</strong> before any external action.</p></aside></div></section>
  </main>;
}
