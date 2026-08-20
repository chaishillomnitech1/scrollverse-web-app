import { Copy, ExternalLink, Eye, Image as ImageIcon, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const COLLECTION = [
  {
    accession: "SV-EVO-001",
    title: "Evolution: From Instinct to Intelligence",
    asset: "/manus-storage/evolution-poster_8bac7f5e.webp",
    alt: "Four-panel illustrated Evolution poster showing stages from instinct and office calculation to a blue futuristic figure; token and profit text appears as artwork.",
    format: "WEBP · 1920 × 1280",
    note: "A source-labeled visual composition about intuition, analysis, and original-world evolution. Price and profit-style text are artwork elements, not portal market data.",
  },
  {
    accession: "SV-EVO-002",
    title: "Future Operator Composition",
    asset: "/manus-storage/evolution-future-scene_68b4707a.webp",
    alt: "Blue futuristic illustration of an armored character amid code panels, drones, tokens, and decorative price-style screens.",
    format: "WEBP · 2096 × 1184",
    note: "An owner-supplied future-facing visual world. Decorative token, code, and dashboard imagery is not an exchange, provider, wallet, or price-feed claim.",
  },
  {
    accession: "SV-EVO-003",
    title: "Original Set: Signal Composition I",
    asset: "/manus-storage/evolution-set-two-a_8ad68171.webp",
    alt: "Owner-supplied visual composition from the expanded Evolution collection; detailed visual description is in review.",
    format: "WEBP · 1600 × 1600",
    note: "A browser-local exhibit accession from the expanded original visual set. The source image is available for public viewing while its detailed descriptive record continues through collection intake.",
  },
  {
    accession: "SV-EVO-004",
    title: "Original Set: Signal Composition II",
    asset: "/manus-storage/evolution-set-two-b_16ad3b7b.webp",
    alt: "Owner-supplied wide visual composition from the expanded Evolution collection; detailed visual description is in review.",
    format: "WEBP · 2048 × 1152",
    note: "A browser-local exhibit accession from the expanded original visual set. The source image is available for public viewing while its detailed descriptive record continues through collection intake.",
  },
  {
    accession: "SV-EVO-005",
    title: "Original Set: Signal Composition III",
    asset: "/manus-storage/evolution-set-three-a_a702d986.webp",
    alt: "Owner-supplied visual composition from the third expanded Evolution collection set; detailed visual description is in review.",
    format: "WEBP · 1600 × 1600",
    note: "A third-set browser-local accession added for public viewing with source context, provisional accessibility text, and an ongoing collection record.",
  },
  {
    accession: "SV-EVO-006",
    title: "Original Set: Signal Composition IV",
    asset: "/manus-storage/evolution-set-three-b_de8cdbad.webp",
    alt: "Owner-supplied visual composition from the third expanded Evolution collection set; detailed visual description is in review.",
    format: "WEBP · 1600 × 1600",
    note: "A third-set browser-local accession added for public viewing with source context, provisional accessibility text, and an ongoing collection record.",
  },
  {
    accession: "SV-EVO-007",
    title: "Original Set: Motion Composition I",
    asset: "/manus-storage/evolution-set-four-a_8deec226.gif",
    alt: "Owner-supplied animated visual composition from the fourth Evolution collection set; detailed visual description is in review.",
    format: "GIF · motion asset",
    note: "An owner-supplied motion accession presented in the browser-local exhibit. No external video publication or channel activity is implied.",
  },
  {
    accession: "SV-EVO-008",
    title: "Original Set: Signal Composition V",
    asset: "/manus-storage/evolution-set-four-b_729aa367.webp",
    alt: "Owner-supplied visual composition from the fourth Evolution collection set; detailed visual description is in review.",
    format: "WEBP · source dimensions recorded in intake",
    note: "A fourth-set browser-local accession added for public viewing with source context, provisional accessibility text, and an ongoing collection record.",
  },
  {
    accession: "SV-EVO-009",
    title: "Original Set: Signal Composition VI",
    asset: "/manus-storage/evolution-set-five-a_1bfc9970.webp",
    alt: "Owner-supplied visual composition from the fifth Evolution collection set; detailed visual description is in review.",
    format: "WEBP · source dimensions recorded in intake",
    note: "A fifth-set browser-local accession added for public viewing with source context, provisional accessibility text, and an ongoing collection record.",
  },
  {
    accession: "SV-EVO-010",
    title: "Original Set: Motion Composition II",
    asset: "/manus-storage/evolution-set-five-b_0b4446a6.gif",
    alt: "Owner-supplied animated visual composition from the fifth Evolution collection set; detailed visual description is in review.",
    format: "GIF · motion asset",
    note: "An owner-supplied motion accession presented in the browser-local exhibit. No external video publication or channel activity is implied.",
  },
  {
    accession: "SV-EVO-011",
    title: "Original Set: Signal Composition VII",
    asset: "/manus-storage/evolution-set-six-a_3fcfb5ec.webp",
    alt: "Owner-supplied visual composition from the sixth Evolution collection set; detailed visual description is in review.",
    format: "WEBP · source dimensions recorded in intake",
    note: "A sixth-set browser-local accession added for public viewing with source context, provisional accessibility text, and an ongoing collection record.",
  },
  {
    accession: "SV-EVO-012",
    title: "Original Set: Motion Composition III",
    asset: "/manus-storage/evolution-set-six-b_188a6168.gif",
    alt: "Owner-supplied animated visual composition from the sixth Evolution collection set; detailed visual description is in review.",
    format: "GIF · motion asset",
    note: "An owner-supplied motion accession presented in the browser-local exhibit. No external video publication or channel activity is implied.",
  },
  {
    accession: "SV-EVO-013",
    title: "Creator Poster: Who You Got?",
    asset: "/manus-storage/evolution-set-seven-a_63694b0f.webp",
    alt: "Vertical black leather-textured poster with ornate gold framing, the words ‘Who you got?’, a gold nameplate reading ‘Chais’, and a circular ScrollVerse 963Hz Sovereign emblem.",
    format: "WEBP · 1280 × 1920",
    note: "A direct creator-poster accession from the expanded collection, presented for browser-local public choice with source context and an accessible text record.",
  },
  {
    accession: "SV-EVO-014",
    title: "Original Motion: Three Faces at Dusk",
    asset: "/manus-storage/evolution-set-seven-b_5e54ba84.gif",
    alt: "Vertical motion artwork showing three dark stylized faces above a misty landscape under a cloudy sky and warm horizon light.",
    format: "GIF · 576 × 1024 · motion asset",
    note: "A direct motion-art accession from the expanded collection. It is presented as owner-supplied artistic source context, not as a claim of a real-person identity or external affiliation.",
  },
  {
    accession: "SV-EVO-015",
    title: "Accessory Motion: Faceted Pendant",
    asset: "/manus-storage/evolution-accessory-motion_dd732a19.gif",
    alt: "Vertical motion artwork showing a gold-toned chain and a large clear faceted pendant against a dark background.",
    format: "GIF · 576 × 1024 · motion asset",
    note: "An owner-supplied accessory visual concept added for browser-local viewing. No material, price, inventory, seller, marketplace, or product listing is implied.",
  },
  {
    accession: "SV-EVO-016",
    title: "Vineland Signal Studio",
    asset: "/manus-storage/phase596-vineland-signal_83d5cb71.webp",
    alt: "Dark futuristic artwork with an armored figure, audio equipment, city skyline, studio silhouettes, a VINELAND tower, and gold-blue geometric circuitry.",
    format: "WEBP · 1280 × 1920",
    note: "An owner-supplied music-and-signal visual world, presented for browser-local discovery. Visible studio and city motifs are artwork composition, not a recording, artist, venue, or release claim.",
  },
  {
    accession: "SV-EVO-017",
    title: "Threefold Signal Diagram",
    asset: "/manus-storage/phase596-we3world-signal_6e248a9a.webp",
    alt: "Dark blue and gold network diagram with a glowing triangle, a large number three, circular technical border, and small cyan connection points.",
    format: "WEBP · 1600 × 1600",
    note: "An owner-supplied signal diagram artwork. Its visible labels and network motifs are visual composition, not a live system, metric, scientific, provider, or token claim.",
  },
] as const;

const CREATOR_LENSES = [
  { title: "Evolution", count: 10, note: "Operator studies, posters, and signal compositions", color: "#9DEBFF" },
  { title: "Motion", count: 5, note: "Animated visual worlds and accessory studies", color: "#DCC8FF" },
  { title: "Identity", count: 1, note: "Creator-poster accession", color: "#FFE09A" },
  { title: "Open Collection", count: 1, note: "Reviewed visual accession beyond the current lenses", color: "#B5F7CC" },
] as const;

function CreatorLensDock() {
  return <section className="container py-5"><div className="rounded-[1.7rem] border border-white/10 bg-white/[.035] p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#AFC0CF]">CREATOR-FIRST COLLECTION LENSES</p><p className="mt-2 max-w-3xl text-sm leading-6 text-[#D6E2EE]">Choose a visual thread, then enter the collection to experience the connected body of work.</p></div><a href="#collection" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-4 py-2 text-xs font-black text-[#9DEBFF]">Open all 17 accessions</a></div><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{CREATOR_LENSES.map((lens) => <a key={lens.title} href="#collection" className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-white/35"><div className="flex items-center justify-between gap-3"><span className="text-sm font-black" style={{ color: lens.color }}>{lens.title}</span><span className="text-[10px] font-mono text-[#AFC0CF]">{lens.count} ACCESSIONS</span></div><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">{lens.note}</p></a>)}</div></div></section>;
}

const releaseBrief = `Evolution Lookbook item-specific release brief\nAccession ID: [required]\nPublic representation: [approved image/version]\nCreator/rights context: [required]\nAccessibility alt text: [required]\nDestination: [browser-local exhibit, IPFS, marketplace, or other]\nIf external: chain/network or provider: [required]\nPublic media decision: [required]\nMarketplace/price decision: [required if applicable]\nOwner release: [same-conversation confirmation required]\nBoundary: Do not upload, pin, list, price, mint, transfer, or connect a wallet until the exact item record is complete.`;

export default function EvolutionLookbook() {
  useSovereignHeartbeat({ page: "evolution-lookbook" });

  const sourceGroups = [
    { title: "Browser-local exhibit", count: "17 accessions", state: "AVAILABLE NOW", detail: "Named Evolution Lookbook cards with source labels and accessibility text.", color: "#B5F7CC" },
    { title: "Numbered visual + motion works", count: "44 files", state: "SOURCE INTAKE", detail: "WEBP and GIF source files; select a record for the next direct visual review.", color: "#9DEBFF" },
    { title: "IMG visual archive", count: "220 files", state: "SOURCE INTAKE", detail: "PNG source sequence, including one separately held private-review candidate.", color: "#DCC8FF" },
    { title: "Attached image archive", count: "148 files", state: "SOURCE INTAKE", detail: "JPEG source sequence grouped by duplicate-aware source records.", color: "#FFE09A" },
    { title: "Other visual source", count: "38 files", state: "SOURCE INTAKE", detail: "Additional JPEG and PNG material retained for later selection and review.", color: "#FFB48C" },
  ] as const;

  const SourceCollectionGroups = () => <section className="container py-5"><div className="rounded-[1.7rem] border border-[#B98CFF]/30 bg-[#B98CFF]/[.045] p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#DCC8FF]">SOURCE-LABELED COLLECTION GROUPS</p><p className="mt-2 max-w-3xl text-sm leading-6 text-[#D6E2EE]">The local visual intake is organized by source family. Each group stays distinct until a selected file receives its own direct description and display decision.</p></div><Link href="/creator-collection-records" className="rounded-xl border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-4 py-2 text-xs font-black text-[#DCC8FF]">Open collection records</Link></div><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{sourceGroups.map((group) => <article key={group.title} className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-mono tracking-[.13em]" style={{ color: group.color }}>{group.state}</p><h3 className="mt-3 text-base font-black">{group.title}</h3><p className="mt-2 text-xs font-mono" style={{ color: group.color }}>{group.count}</p><p className="mt-3 text-xs leading-5 text-[#D6E2EE]">{group.detail}</p></article>)}</div></div></section>;

  const copyReleaseBrief = async () => {
    try {
      await navigator.clipboard.writeText(releaseBrief);
      toast.success("Item-specific Evolution Lookbook release brief copied.");
    } catch {
      toast.error("Copy is unavailable in this browser.");
    }
  };

  return <main className="min-h-screen overflow-hidden bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="relative border-b border-[#FFB800]/35 bg-[radial-gradient(circle_at_10%_10%,rgba(255,184,0,.19),transparent_26%),radial-gradient(circle_at_90%_12%,rgba(0,212,255,.18),transparent_28%),radial-gradient(circle_at_55%_95%,rgba(185,140,255,.14),transparent_32%),#050B1A]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:50px_50px]" aria-hidden="true" />
      <div className="container relative py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-xs font-mono tracking-[.16em] text-[#FFE09A]">← SCROLLVERSE FRONT DOOR</Link><span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">OWNER-AUTHORED VISUAL EXHIBIT · PUBLIC CHOICE</span></div>
        <div className="mt-12 grid gap-10 xl:grid-cols-[1.08fr_.92fr] xl:items-center"><div><p className="text-xs font-mono tracking-[.22em] text-[#FFE09A]">SCROLLVERSE EVOLUTION LOOKBOOK</p><h1 className="mt-4 max-w-4xl text-5xl font-black leading-[.9] md:text-7xl">Visual worlds for <span className="text-[#9DEBFF]">public discovery.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This browser-local exhibit presents owner-supplied original visual work with source context, accessibility text, and visible release states. Visitors can view the work and decide for themselves.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#collection" className="rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-black text-[#251B00]">View the collection</a><Link href="/tutorial-studio" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Open visual tutorials</Link></div></div><aside className="overflow-hidden rounded-[2rem] border border-[#FFB800]/40 bg-black/25 p-3 shadow-[0_24px_80px_rgba(255,184,0,.12)]"><img src={COLLECTION[0].asset} alt={COLLECTION[0].alt} className="h-full w-full rounded-[1.45rem] object-cover" /><div className="p-4"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE09A]">FEATURED ACCESSION · {COLLECTION[0].accession}</p><p className="mt-2 text-sm text-[#D6E2EE]">Artwork text is presented as visual composition, not as a live financial, token, or marketplace feed.</p></div></aside></div>
      </div>
    </section>

    <CreatorLensDock />

    <SourceCollectionGroups />

    <section className="container py-8"><PortalTrustLens lane="Evolution Lookbook" source="Owner-supplied visual assets, the Phase 590 asset evidence record, source hashes, accessibility drafts, and owner-authored collection interpretation." readiness="This browser-local public-choice exhibit is available now with two reviewed visual accessions and a release brief for any future item-specific external action." boundary="This page is a visual exhibit, not a live price, profit, product listing, IPFS pin, OpenSea collection, token, NFT, wallet, contract, marketplace, sale, transfer, or external publication." /></section>

    <section id="collection" className="container py-9"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-[.17em] text-[#9DEBFF]">COLLECTION RECORD · AVAILABLE NOW</p><h2 className="mt-3 text-4xl font-black">Seventeen visual accessions. More source sets in intake.</h2></div><span className="rounded-full border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-3 py-2 text-[10px] font-mono tracking-[.13em] text-[#DCC8FF]">IMAGE REVIEW CONTINUES</span></div><div className="mt-7 grid gap-6 lg:grid-cols-2">{COLLECTION.map((item) => <article key={item.accession} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.03]"><img src={item.asset} alt={item.alt} className="aspect-[1.45/1] w-full object-cover" /><div className="p-6"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] font-mono tracking-[.16em] text-[#FFE09A]">{item.accession} · {item.format}</span><span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1 text-[9px] font-mono text-[#B5F7CC]">PUBLIC BROWSER EXHIBIT</span></div><h3 className="mt-4 text-3xl font-black">{item.title}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{item.note}</p><div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-mono tracking-[.15em] text-[#AFC0CF]">ACCESSIBILITY DESCRIPTION</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{item.alt}</p></div></div></article>)}</div></section>

    <section className="container py-8"><div className="grid gap-5 lg:grid-cols-3"><article className="rounded-[1.8rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.06] p-6"><Eye className="h-7 w-7 text-[#9DEBFF]" /><h2 className="mt-5 text-2xl font-black">View the work directly</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The exhibit carries source labels, visual context, and accessibility descriptions so visitors can approach the work without an implied transaction.</p></article><article className="rounded-[1.8rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.06] p-6"><ImageIcon className="h-7 w-7 text-[#DCC8FF]" /><h2 className="mt-5 text-2xl font-black">More sets, separate records</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The broader owner-supplied image sequence remains in collection intake until each item receives a neutral description, accessibility text, and display decision.</p></article><article className="rounded-[1.8rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.06] p-6"><ShieldCheck className="h-7 w-7 text-[#FFDEA0]" /><h2 className="mt-5 text-2xl font-black">External steps stay exact</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">IPFS, marketplaces, tokens, pricing, and contracts require a separate accession-level release record and current confirmation.</p></article></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FFB800]/40 bg-[radial-gradient(circle_at_94%_0%,rgba(255,184,0,.19),transparent_30%),#071426] p-7 sm:p-9"><Sparkles className="h-8 w-8 text-[#FFE09A]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FFE09A]">CREATOR VALUE · VISITOR CHOICE</p><h2 className="mt-3 text-3xl font-black">Take the next useful path from the work itself.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Explore the visual tutorial system, follow owner-authored books and perspectives, or prepare one item-specific release record. The lookbook remains a direct exhibit; external release choices are kept separate and clear.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/tutorial-studio" className="inline-flex items-center gap-2 rounded-xl border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Learn the visual system</Link><Link href="/creator-books" className="inline-flex items-center gap-2 rounded-xl border border-[#00FF88]/50 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Explore creator catalog</Link><Link href="/continuation-readiness-register" className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Prepare a release record <ExternalLink className="h-4 w-4" /></Link></div><button type="button" onClick={copyReleaseBrief} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#FFB800]/55 bg-[#FFB800]/10 px-5 py-3 text-sm font-black text-[#FFE09A]"><Copy className="h-4 w-4" />Copy item release brief</button></div></section>
  </main>;
}
