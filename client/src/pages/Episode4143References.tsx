import { useState } from "react";
import { Archive, ArrowLeft, ArrowRight, CheckCircle2, Copy, Download, FileWarning, Film, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type EpisodeSpec = {
  number: "41" | "42" | "43";
  title: string;
  state: "available now" | "research";
  color: string;
  source: string;
  narrative: string;
  reusable: string;
  evidence: string;
  accessibility: string;
  releaseGate: string;
  boundary: string;
};

const EPISODES: Record<EpisodeSpec["number"], EpisodeSpec> = {
  "41": {
    number: "41", title: "The Absolute World Ordered", state: "available now", color: "#FFA3A3",
    source: "One owner-supplied Google conversation fragment recorded under the existing truncated SHA-256 identifier 4964fcc9…ff6de828, companion extract Pasted_content_100_01.txt, and six supplied Google-rendered mobile screenshots: IMG_4216 through IMG_4221.",
    narrative: "A protected story-development reference for a Core Control Citadel scene, cast matrix, frequency-led atmosphere notes, local benchmark concept, and ingress-security concept.",
    reusable: "Use the control-citadel visual language, cast-matrix structure, source checksum, screenshot register, and browser-local readiness controls in original ScrollVerse planning.",
    evidence: "The supplied register describes a Google AI Mode query screen; Episode 41, local-cron, and firewall prompts; configuration language; a cast matrix; a Core Control Citadel scene; and a benchmark-harness excerpt. Code views visibly carry a caution notice.",
    accessibility: "Requires owner release for any public transcript excerpt, captioned screenplay, descriptive audio, visual master, credit list, contributor record, or distribution destination.",
    releaseGate: "Requires an exact owner-approved public-version script, final title/credit decision, accessibility packet, authorized media master, and destination record.",
    boundary: "No cron task, benchmark, server, firewall, Nginx configuration, WebSocket, wallet, treasury, RPC, IPFS node, smart contract, payment rail, network action, deployment, or claimed infrastructure result is created, verified, or activated by this source record.",
  },
  "42": {
    number: "42", title: "The Motherboard of the World", state: "available now", color: "#A9E7FF",
    source: "One owner-supplied Google conversation fragment received as Pasted_content_100.txt, 146 lines, with the existing truncated SHA-256 identifier b829c363…adb8a81b0 and supplemental supplied Google-rendered screenshots IMG_4223, IMG_4225, and IMG_4226.",
    narrative: "A protected story-development reference for a Mainboard Chamber scene, a four-character matrix, passive-reference language, and a source-provided archive-validator concept.",
    reusable: "Use a source register, explicit item identification, local notes, and a separate verified-project health check when carrying narrative evidence concepts into a creator archive.",
    evidence: "The supplied text and screenshots visibly present passive-reference framing, a Central Asset Catalog update, a code view with a caution notice, and an explicit source-trail versus independently checked-state distinction.",
    accessibility: "Requires owner release for any public transcript excerpt, captioned screenplay, descriptive audio, visual master, credit list, contributor record, or distribution destination.",
    releaseGate: "Requires an exact owner-approved public-version script, final title/credit decision, accessibility packet, authorized media master, and destination record.",
    boundary: "No forensic validator, hardware check, cryptographic chain-of-custody process, staging route, Nginx egress map, benchmark, local bash script, host, network, wallet, token, or deployment is created, verified, or activated by this source record.",
  },
  "43": {
    number: "43", title: "Final Core Infrastructure Nodes", state: "research", color: "#DCC8FF",
    source: "One owner-supplied Google-rendered screenshot, IMG_4222.PNG, presenting future-production, local-benchmark, and Nginx-egress prompts.",
    narrative: "A source-led prompt record, not a supplied Episode 43 script or an established production state.",
    reusable: "Retain future narrative and architecture prompts as browser-local planning material until a complete source record and exact implementation decision are supplied.",
    evidence: "The visible screenshot asks whether to construct an Episode 43 script, automate a local benchmark, and write Nginx egress routing maps. It is logged as a planning prompt only.",
    accessibility: "Requires a complete owner-supplied source record before accessibility planning can be scoped. Any public version will require captions, transcript review, descriptive-audio direction, credits, and a destination record.",
    releaseGate: "Requires a complete owner-supplied script or narrative source, final title/credit decision, accessibility packet, authorized media master, and destination record.",
    boundary: "No Episode 43 script, automated benchmark, Nginx routing configuration, server action, host change, or external deployment is created or active from this prompt record.",
  },
};

function exportRecord(value: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(href);
}

function EpisodeReference({ episode }: { episode: EpisodeSpec }) {
  useSovereignHeartbeat({ page: `episode-${episode.number}-protected-reference` });
  const [note, setNote] = useState("");
  const record = { recordId: `SV-EP-${episode.number}-REFERENCE-001`, episode: episode.number, title: episode.title, currentState: episode.state, source: episode.source, narrative: episode.narrative, reusablePlanningLesson: episode.reusable, sourceEvidence: episode.evidence, accessibilityGate: episode.accessibility, releaseGate: episode.releaseGate, operatingBoundary: episode.boundary, localNote: note, externalAction: "none" };
  const copy = async () => { await navigator.clipboard.writeText(JSON.stringify(record, null, 2)); toast.success(`Episode ${episode.number} protected reference copied.`); };
  const stateColor = episode.state === "available now" ? "#7CFFBB" : "#D9C1FF";

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b" style={{ borderColor: `${episode.color}40`, background: `radial-gradient(circle at 12% 5%, ${episode.color}20, transparent 29%), radial-gradient(circle at 87% 15%, rgba(0,212,255,.11), transparent 27%), #050B1A` }}><div className="container py-16 md:py-22"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/episodic-operations-archive" className="inline-flex items-center gap-2 text-xs font-mono tracking-[.16em]" style={{ color: episode.color }}><ArrowLeft className="h-4 w-4"/> EPISODIC OPERATIONS ARCHIVE</Link><span className="rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.14em]" style={{ borderColor: `${stateColor}66`, background: `${stateColor}12`, color: stateColor }}>{episode.state.toUpperCase()} · PROTECTED REFERENCE</span></div><div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em]" style={{ color: episode.color }}>SCROLLVERSE · EPISODE {episode.number} SOURCE RECORD</p><h1 className="mt-4 text-5xl font-black leading-[.92] md:text-7xl">{episode.title}</h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A browser-local protected-reference record. It makes the supplied source context, current state, evidence description, accessibility gate, and expansion path visible without presenting an episode as produced or released.</p></div><div className="rounded-[2rem] border p-7" style={{ borderColor: `${episode.color}45`, background: `${episode.color}08` }}><Film className="h-9 w-9" style={{ color: episode.color }}/><p className="mt-5 text-[10px] font-mono tracking-[.15em]" style={{ color: episode.color }}>CURRENT STATE</p><h2 className="mt-3 text-2xl font-black" style={{ color: stateColor }}>{episode.state.toUpperCase()}</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{episode.state === "available now" ? "The browser-local protected reference is readable now. Public media, transcript, media master, and destination remain owner-controlled release decisions." : "The browser-local prompt record is readable for research. A complete primary narrative source is required before it can progress to an episode preparation record."}</p></div></div></div></section>
    <section className="container py-8"><PortalTrustLens lane={`Episode ${episode.number} Protected Reference`} source={episode.source} readiness={`Read the browser-local source record, add a correction note, copy/export the metadata, and follow the archive or release-preparation handoffs. ${episode.releaseGate}`} boundary={episode.boundary} /></section>
    <section className="container py-3"><div className="grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border p-7" style={{ borderColor: `${episode.color}4E`, background: `${episode.color}07` }}><Sparkles className="h-7 w-7" style={{ color: episode.color }}/><p className="mt-5 text-[10px] font-mono tracking-[.16em]" style={{ color: episode.color }}>NARRATIVE REFERENCE</p><h2 className="mt-2 text-3xl font-black">What this source visibly supports.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{episode.narrative}</p><div className="mt-5 rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-5"><p className="text-[10px] font-mono text-[#9DEBFF]">REUSABLE ORIGINAL PLANNING LESSON</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{episode.reusable}</p></div></article><article className="rounded-[2rem] border border-white/10 bg-white/[.025] p-7"><Archive className="h-7 w-7 text-[#D9C1FF]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#D9C1FF]">SOURCE EVIDENCE REGISTER</p><h2 className="mt-2 text-3xl font-black">Visible record, not runtime proof.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{episode.evidence}</p><div className="mt-5 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.05] p-5"><p className="text-[10px] font-mono text-[#FFE19A]">OPERATING-STATE BOUNDARY</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{episode.boundary}</p></div></article></div></section>
    <section className="container py-3"><div className="grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-[#00FF88]/30 bg-[#00FF88]/[.05] p-7"><ShieldCheck className="h-7 w-7 text-[#7CFFBB]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#7CFFBB]">ACCESSIBILITY + PUBLIC VERSION GATE</p><h2 className="mt-2 text-3xl font-black">Release needs a complete record.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{episode.accessibility}</p><div className="mt-5 rounded-2xl border border-[#00FF88]/20 bg-black/20 p-5"><p className="text-[10px] font-mono text-[#7CFFBB]">EXACT NEXT GATE</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{episode.releaseGate}</p></div></article><article className="rounded-[2rem] border border-[#B98CFF]/30 bg-[#B98CFF]/[.05] p-7"><FileWarning className="h-7 w-7 text-[#D9C1FF]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#D9C1FF]">BROWSER-LOCAL CORRECTION PATH</p><h2 className="mt-2 text-3xl font-black">Add evidence without rewriting the source.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">A correction can attach an exact source identifier, title correction, accessibility note, or future release packet reference. It does not turn the protected record into a released episode.</p><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Browser-local source correction or release-record connection" className="mt-5 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none"/><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-4 py-3 text-xs font-black text-[#D9C1FF]"><Copy className="h-4 w-4"/> COPY</button><button type="button" onClick={() => { exportRecord(record, `scrollverse-episode-${episode.number}-protected-reference.json`); toast.success(`Episode ${episode.number} local record exported.`); }} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-4 py-3 text-xs font-black text-[#9DEBFF]"><Download className="h-4 w-4"/> JSON</button></div></article></div></section>
    <section className="container py-6"><div className="grid gap-4 md:grid-cols-3">{[{ href: "/episodic-operations-archive", title: "Episodic Operations Archive", text: "Return to the combined source register and screenshot evidence ledger." }, { href: "/youtube-episode-release-desk", title: "YouTube Release Desk", text: "Prepare a public-version record only after the exact owner-release gate is met." }, { href: "/film-animation-studio", title: "Film + Animation Studio", text: "Continue into original production packs and accessibility planning." }].map((item) => <Link key={item.href} href={item.href} className="rounded-[1.7rem] border border-white/10 bg-white/[.025] p-6 transition hover:-translate-y-0.5"><CheckCircle2 className="h-6 w-6" style={{ color: episode.color }}/><h2 className="mt-4 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: episode.color }}>Open route <ArrowRight className="h-4 w-4"/></span></Link>)}</div></section>
  </main>;
}

export const Episode41Reference = () => <EpisodeReference episode={EPISODES["41"]} />;
export const Episode42Reference = () => <EpisodeReference episode={EPISODES["42"]} />;
export const Episode43Reference = () => <EpisodeReference episode={EPISODES["43"]} />;
