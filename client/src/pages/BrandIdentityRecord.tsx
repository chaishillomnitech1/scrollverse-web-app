import { useMemo, useState } from "react";
import { ArrowRight, Copy, Download, ExternalLink, Fingerprint, Orbit, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const LOGO_URL = "/manus-storage/origin-ark-studios-auri-signal-warden-logo_62a2af6b.png";

const SYSTEMS = [
  { name: "Origin Ark Studios", role: "Working company identity", detail: "A browser-local working identity for an original creator studio, media label, archive system, and production world.", state: "research", color: "#FFCC4D", icon: Orbit },
  { name: "The Open Ark Seal", role: "Core brand mark", detail: "Two open arch strokes, a four-point signal star, and a broken orbit line form a compact sign for preservation, orientation, and forward motion.", state: "display-only", color: "#00D4FF", icon: Star },
  { name: "Auri, the Signal Warden", role: "Original mascot", detail: "A compact guardian sprite with a gold core, cyan signal fins, and a halo orbit. Its role is to signal care, curiosity, memory, and the next clear step.", state: "display-only", color: "#B98CFF", icon: Sparkles },
] as const;

function exportBrandRecord(record: unknown) {
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "origin-ark-studios-brand-identity-record.json";
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function BrandIdentityRecord() {
  useSovereignHeartbeat({ page: "brand-identity-record" });
  const [note, setNote] = useState("");
  const record = useMemo(() => ({
    recordId: "SV-BRAND-ORIGIN-ARK-001",
    workingCompany: "Origin Ark Studios",
    ownerContext: "ScrollVerse working brand system",
    mascot: "Auri, the Signal Warden",
    coreMark: "The Open Ark Seal",
    anchor: "Authenticity is the highest frequency.",
    asset: LOGO_URL,
    displayState: "display-only",
    localNote: note,
    externalAction: "none",
  }), [note]);
  const copy = async () => { await navigator.clipboard.writeText(JSON.stringify(record, null, 2)); toast.success("Local brand identity record copied."); };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="overflow-hidden border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_22%_0%,rgba(255,184,0,.18),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(185,140,255,.18),transparent_27%),#050B1A]"><div className="container py-14 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/creator-brand-registry" className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">← CREATOR BRAND REGISTRY</Link><span className="rounded-full border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#FFE19A]">WORKING IDENTITY · DISPLAY-ONLY</span></div><div className="mt-10 grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:items-center"><div className="relative mx-auto max-w-md"><div className="absolute -inset-8 rounded-full bg-[#00D4FF]/15 blur-3xl"/><img src={LOGO_URL} alt="The Open Ark Seal with Auri, the Signal Warden: an original Origin Ark Studios brand concept." className="relative aspect-square w-full rounded-[2.4rem] border border-[#00D4FF]/35 object-cover shadow-[0_0_70px_rgba(0,212,255,.16)]"/></div><div><p className="text-xs font-mono tracking-[.22em] text-[#FFCC4D]">ORIGIN ARK STUDIOS · AUTHENTICITY FREQUENCY</p><h1 className="mt-4 text-5xl font-black leading-[.9] md:text-7xl">A mark that<br/><span className="text-[#00D4FF]">remembers its source.</span></h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#D6E2EE]">An original ScrollVerse working brand system designed to stay recognizable from a small signal icon to a full production title. The Open Ark Seal holds the path; Auri, the Signal Warden, carries the signal.</p><blockquote className="mt-7 border-l-2 border-[#FFCC4D] pl-5 text-xl font-black text-[#FFE19A]">“Authenticity is the highest frequency.”</blockquote></div></div></div></section>

    <section className="container py-8"><PortalTrustLens lane="Origin Ark Studios Brand Identity Record" source="Original browser-local brand brief and generated concept asset for the ScrollVerse working identity system." readiness="Inspect the concept, use the browser-local copy/export controls, and connect it to creator brand, visual-story, and release-readiness records." boundary="This record does not establish a filing, registration, domain, handle, product, marketplace, token, mint, license, commercial availability, or third-party publication. Those actions require their own owner-release record." /></section>

    <section className="container py-6"><div className="grid gap-4 lg:grid-cols-3">{SYSTEMS.map((system) => { const Icon = system.icon; return <article key={system.name} className="rounded-[1.8rem] border p-6" style={{ borderColor: `${system.color}55`, background: `${system.color}0B` }}><Icon className="h-8 w-8" style={{ color: system.color }} /><p className="mt-5 text-[10px] font-mono tracking-[.15em]" style={{ color: system.color }}>{system.state.toUpperCase()}</p><h2 className="mt-2 text-2xl font-black">{system.name}</h2><p className="mt-1 text-xs font-bold text-[#B8C7D6]">{system.role}</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{system.detail}</p></article>; })}</div></section>

    <section className="container py-7"><div className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]"><article className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7"><div className="flex items-center gap-3"><Fingerprint className="h-6 w-6 text-[#00FF88]" /><div><p className="text-[10px] font-mono tracking-[.15em] text-[#00FF88]">BROWSER-LOCAL IDENTITY RECORD</p><h2 className="mt-1 text-3xl font-black">Preserve the method with the mark.</h2></div></div><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">Add a local source note, correction, or future release requirement. This note remains in your current browser session until you copy or export it.</p><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Local correction, source context, or future brand-release requirement" className="mt-5 min-h-32 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none"/><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#00FF88]/50 bg-[#00FF88]/10 px-4 py-3 text-xs font-black text-[#00FF88]"><Copy className="h-4 w-4"/> COPY RECORD</button><button type="button" onClick={() => { exportBrandRecord(record); toast.success("Local brand record exported."); }} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-4 py-3 text-xs font-black text-[#00D4FF]"><Download className="h-4 w-4"/> JSON</button></div></article><aside className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.055] p-7"><ShieldCheck className="h-8 w-8 text-[#FFE19A]"/><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-[#FFE19A]">EXACT RELEASE GATE</p><h2 className="mt-2 text-3xl font-black">Name, mark, and mascot are prepared—not externally claimed.</h2><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">A later owner-release record can specify the intended asset, destination, representation choice, public display, edition, chain or service, cost, visibility, and rollback condition. No external claim is made from this page.</p></aside></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[{ href: "/special-repository", title: "Special Repository", detail: "Accession the mark and preserve a non-deployable collector record." }, { href: "/creator-brand-registry", title: "Creator Brand Registry", detail: "Return to source trails and creator claim candidates." }, { href: "/visual-story-worlds", title: "Visual Story Worlds", detail: "Place the mark in original story and production pathways." }, { href: "/show-the-work-knowledge-base", title: "Show-the-Work Knowledge Base", detail: "Preserve the working method behind the identity." }].map((item) => <Link key={item.href} href={item.href} className="rounded-[1.7rem] border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-6 transition hover:-translate-y-0.5"><h2 className="text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.detail}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#00D4FF]">Open route <ArrowRight className="h-4 w-4"/></span></Link>)}</div><a href={LOGO_URL} target="_blank" rel="noreferrer" className="mx-auto mt-8 inline-flex items-center gap-2 text-xs font-mono text-[#B8C7D6] underline underline-offset-4">Open generated concept asset <ExternalLink className="h-3.5 w-3.5"/></a></section>
  </main>;
}
