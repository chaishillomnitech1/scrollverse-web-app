import { useMemo, useState } from "react";
import { ArrowRight, Copy, Download, ExternalLink, Image, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const ASSETS = [
  {
    id: "SV-CAM-001",
    title: "Origin Ark Studios · Open Ark Seal + Auri",
    kind: "Core brand concept",
    url: "/manus-storage/origin-ark-studios-auri-signal-warden-logo_62a2af6b.png",
    source: "Origin Ark Studios Brand Identity Record",
    sourceRoute: "/brand-identity-record",
    state: "display-only",
    accent: "#00D4FF",
    alt: "The Open Ark Seal with Auri, the Signal Warden, original brand concept.",
    use: "Owner-defined campaign purpose required before public placement.",
  },
  {
    id: "SV-CAM-002",
    title: "ScrollVerse Game Worlds Studio · Key Art",
    kind: "Original game-world illustration",
    url: "/manus-storage/scrollverse-game-worlds-studio-key-art_81480680.png",
    source: "Game Worlds Studio",
    sourceRoute: "/game-worlds-studio",
    state: "display-only",
    accent: "#B98CFF",
    alt: "Original ScrollVerse Game Worlds Studio key art showing inclusive hero-creators linking imaginative game worlds.",
    use: "Owner-defined campaign purpose required before public placement.",
  },
  {
    id: "SV-CAM-003",
    title: "Origin Ark Studios · 512px App Icon Candidate",
    kind: "Manifest-ready icon candidate",
    url: "/manus-storage/scrollverse-origin-ark-app-icon-candidate-512_62ef1f04.png",
    source: "App Icon Candidate Record",
    sourceRoute: "/app-icon-candidate",
    state: "candidate",
    accent: "#FFCC4D",
    alt: "The Open Ark Seal with Auri, the Signal Warden, 512 pixel application-icon candidate.",
    use: "Awaiting authenticated app-setting selection before manifest or store use.",
  },
] as const;

function exportRecord(value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "scrollverse-campaign-asset-registry.json";
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function CampaignAssetRegistry() {
  useSovereignHeartbeat({ page: "campaign-asset-registry" });
  const [selectedId, setSelectedId] = useState<(typeof ASSETS)[number]["id"]>(ASSETS[0].id);
  const [note, setNote] = useState("");
  const selected = useMemo(() => ASSETS.find((asset) => asset.id === selectedId) ?? ASSETS[0], [selectedId]);
  const record = useMemo(() => ({
    recordId: selected.id,
    title: selected.title,
    kind: selected.kind,
    managedAssetUrl: selected.url,
    source: selected.source,
    sourceRoute: selected.sourceRoute,
    currentState: selected.state,
    intendedUse: selected.use,
    localNote: note,
    publicRelease: "requires owner-defined destination, intended-use scope, and final release decision",
  }), [note, selected]);
  const copy = async () => { await navigator.clipboard.writeText(JSON.stringify(record, null, 2)); toast.success("Local campaign asset record copied."); };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#00D4FF]/20 bg-[radial-gradient(circle_at_90%_15%,rgba(185,140,255,.18),transparent_28%),radial-gradient(circle_at_20%_0%,rgba(0,212,255,.15),transparent_34%),#050B1A]">
      <div className="container py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/creator-brand-registry" className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">← CREATOR BRAND REGISTRY</Link><span className="rounded-full border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#FFE19A]">ASSET RECORDS · NO PUBLIC PLACEMENT</span></div>
        <p className="mt-10 text-xs font-mono tracking-[.2em] text-[#B5F7CC]">SCROLLVERSE · CAMPAIGN ASSET REGISTRY</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[.9] md:text-7xl">A clear source for<br/><span className="text-[#00D4FF]">every campaign signal.</span></h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D6E2EE]">A browser-local inventory of completed ScrollVerse visual assets with their source record, managed path, and next exact release requirement. Select an asset, preserve the intended-use note locally, and export the record when a specific public destination is approved.</p>
      </div>
    </section>

    <section className="container py-8"><PortalTrustLens lane="Campaign Asset Registry" source="Completed browser-local Origin Ark Studios, Game Worlds Studio, and App Icon Candidate records with managed asset references." readiness="Inspect an asset, capture the intended-use and destination record locally, then export it for an exact campaign release decision." boundary="This registry does not post, advertise, submit, upload, boost, license, sell, or otherwise place an asset publicly. Destination, intended-use scope, contributor record, visibility, budget, and release decision remain separate owner actions." /></section>

    <section className="container py-6"><div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]"><div className="grid gap-3">{ASSETS.map((asset) => <button key={asset.id} type="button" onClick={() => { setSelectedId(asset.id); toast.success("Local campaign asset selected."); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: selectedId === asset.id ? `${asset.accent}BB` : `${asset.accent}45`, background: selectedId === asset.id ? `${asset.accent}12` : "rgba(255,255,255,.025)" }}><div className="flex items-center justify-between gap-3"><Image className="h-6 w-6" style={{ color: asset.accent }}/><span className="text-[10px] font-mono" style={{ color: asset.accent }}>{asset.id}</span></div><p className="mt-4 text-[10px] font-mono tracking-[.14em] text-[#B8C7D6]">{asset.kind.toUpperCase()}</p><h2 className="mt-2 text-xl font-black">{asset.title}</h2></button>)}</div>
        <article className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7 md:p-8"><img src={selected.url} alt={selected.alt} className="aspect-[16/9] w-full rounded-2xl border border-white/10 object-cover"/><p className="mt-6 text-[10px] font-mono tracking-[.14em]" style={{ color: selected.accent }}>{selected.id} · {selected.state.toUpperCase()}</p><h2 className="mt-3 text-4xl font-black">{selected.title}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-mono text-[#B8C7D6]">SOURCE RECORD</p><p className="mt-2 text-sm font-bold text-white">{selected.source}</p></div><div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-mono text-[#B8C7D6]">NEXT RELEASE REQUIREMENT</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{selected.use}</p></div></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Local intended-use scope, destination, or correction note" className="mt-6 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none"/><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#00FF88]/45 bg-[#00FF88]/10 px-4 py-3 text-xs font-black text-[#00FF88]"><Copy className="h-4 w-4"/> COPY RECORD</button><button type="button" onClick={() => { exportRecord(record); toast.success("Local campaign asset record exported."); }} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-4 py-3 text-xs font-black text-[#00D4FF]"><Download className="h-4 w-4"/> JSON</button><a href={selected.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-xs font-black text-[#D6E2EE]"><ExternalLink className="h-4 w-4"/> OPEN ASSET</a></div></article></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-3"><article className="rounded-[1.7rem] border border-[#00FF88]/30 bg-[#00FF88]/[.05] p-6"><Sparkles className="h-7 w-7 text-[#00FF88]"/><h2 className="mt-4 text-2xl font-black">Source before scale</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Each asset points back to its creation record so a campaign can carry the source, correction path, and display condition with it.</p></article><article className="rounded-[1.7rem] border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.05] p-6"><ShieldCheck className="h-7 w-7 text-[#FFE19A]"/><h2 className="mt-4 text-2xl font-black">Exact public placement</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">A public campaign needs a named destination, intended-use scope, visibility, and final owner decision. This page keeps those records ready, not assumed.</p></article><article className="rounded-[1.7rem] border border-[#B98CFF]/30 bg-[#B98CFF]/[.05] p-6"><Image className="h-7 w-7 text-[#DFC8FF]"/><h2 className="mt-4 text-2xl font-black">Reusable release record</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Copy or export the selected asset record to create the starting point for a campaign release, collaborator brief, or destination-specific handoff.</p></article></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-3">{[{ href: "/brand-identity-record", title: "Brand Identity", text: "Return to the Open Ark Seal and Auri source record." }, { href: "/game-worlds-studio", title: "Game Worlds Studio", text: "Return to the original game-world visual system." }, { href: "/show-the-work-knowledge-base", title: "Show-the-Work", text: "Preserve the campaign method with the finished work." }].map((item) => <Link key={item.href} href={item.href} className="rounded-[1.7rem] border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-6 transition hover:-translate-y-0.5"><h2 className="text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#00D4FF]">Open route <ArrowRight className="h-4 w-4"/></span></Link>)}</div></section>
  </main>;
}
