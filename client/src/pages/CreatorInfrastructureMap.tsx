import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Archive, ArrowRight, BookOpenCheck, CheckCircle2, Copy, FileKey2, Globe2, HeartHandshake, Languages, ShieldCheck, Sparkles, Waypoints } from "lucide-react";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type State = "available now" | "research" | "requires owner release";
type Pillar = {
  id: string;
  title: string;
  state: State;
  tone: string;
  icon: typeof Archive;
  local: string;
  next: string;
  route: string;
  routeLabel: string;
  interoperability: string;
};

const pillars: Pillar[] = [
  {
    id: "source",
    title: "Source & version record",
    state: "available now",
    tone: "#00D4FF",
    icon: FileKey2,
    local: "Local production desks, release packets, evidence routes, and asset checklists already capture source/version, contributor context, operating state, correction path, and owner-release fields.",
    next: "Attach a final asset identifier and its actual source files to one specific release packet.",
    route: "/production-control",
    routeLabel: "Open Production Control",
    interoperability: "A future Content Credentials or signed provenance layer can complement the local record; it does not replace rights or destination acceptance.",
  },
  {
    id: "access",
    title: "Accessible from the source",
    state: "available now",
    tone: "#00FF88",
    icon: HeartHandshake,
    local: "The portal includes visible transcript controls, browser voice tools, captions/transcript fields in release packets, reduced-motion support, and route-level accessibility guidance.",
    next: "Complete the exact captions, transcript, alt text, audio description, and readable edition fields for each final asset.",
    route: "/voice-language-studio",
    routeLabel: "Open Voice & Language Studio",
    interoperability: "Publication accessibility declarations can be added when a final EPUB, PDF, audiobook, video, or other destination package exists.",
  },
  {
    id: "commons",
    title: "Open knowledge commons",
    state: "available now",
    tone: "#B98CFF",
    icon: BookOpenCheck,
    local: "Free knowledge, books, learning routes, and contributor-oriented discovery are available as first-party ScrollVerse pathways.",
    next: "Choose a license or rights statement per knowledge asset before inviting reuse, translation, adaptation, or redistribution.",
    route: "/open-knowledge-verse",
    routeLabel: "Open Knowledge Verse",
    interoperability: "Creative Commons and OER practices are optional tools for assets the owner intentionally releases for sharing; no license is applied automatically.",
  },
  {
    id: "production",
    title: "Original production packet",
    state: "available now",
    tone: "#FFB800",
    icon: Sparkles,
    local: "Original media, books/media, fashion/artifacts, creator channels, release readiness, and crypto education each have a local lane and an asset-specific handoff checklist.",
    next: "Select one final title/version and complete its source, rights, accessibility, intended destination, and owner-release record.",
    route: "/original-media-readiness",
    routeLabel: "Open Original Media Readiness",
    interoperability: "A destination platform is selected only after the local packet is complete and the applicable account or provider is genuinely authorized.",
  },
  {
    id: "distribution",
    title: "Destination & outcome record",
    state: "requires owner release",
    tone: "#FF6B9A",
    icon: Globe2,
    local: "The Multi-Platform Release Desk prepares destination-specific packets for ScrollVerse, video, social, DSP, podcast, books, fashion, and community pathways.",
    next: "Confirm the exact asset and exact external submission before a platform upload, post, delivery, listing, payment, contract, or transaction is attempted.",
    route: "/release-destinations",
    routeLabel: "Open Release Destinations",
    interoperability: "A verified result is an actual public link, delivery confirmation, account/provider event, or public-network record—not a local preparation card.",
  },
  {
    id: "correction",
    title: "Correction & continuity trail",
    state: "research",
    tone: "#48B7FF",
    icon: Waypoints,
    local: "Source-labeled pages and protected intake records already preserve correction paths and distinguish research, available-now, and owner-release states.",
    next: "Add structured per-asset correction entries and non-destructive revision history when an asset record is ready to persist beyond the browser-local packet.",
    route: "/evidence-commons",
    routeLabel: "Open Evidence Commons",
    interoperability: "External provenance, archive, and repository systems remain optional companions to the local evidence trail.",
  },
];

const states: Array<{ id: "all" | State; label: string }> = [
  { id: "all", label: "All infrastructure" },
  { id: "available now", label: "Available now" },
  { id: "research", label: "Research" },
  { id: "requires owner release", label: "Requires owner release" },
];

export default function CreatorInfrastructureMap() {
  useSovereignHeartbeat({ page: "creator-infrastructure-map" });
  const [state, setState] = useState<"all" | State>("all");
  const visible = useMemo(() => state === "all" ? pillars : pillars.filter((pillar) => pillar.state === state), [state]);

  const copyBlueprint = async () => {
    const text = [
      "# ScrollVerse Creator Infrastructure Map",
      "",
      "## Per-asset working record",
      "- [ ] Final title/version and source locator",
      "- [ ] Creator, contributor, and rights context",
      "- [ ] Accessibility materials for the actual format",
      "- [ ] License or sharing statement if intentionally offered",
      "- [ ] Intended destination and operating state",
      "- [ ] Correction path",
      "- [ ] Direct owner release for this asset and destination",
      "- [ ] Actual external outcome link, provider event, or public-network record only after completion",
      "",
      "## Creator infrastructure pillars",
      ...pillars.map((pillar) => `- ${pillar.title}: ${pillar.state}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Creator infrastructure blueprint copied for this browser session.");
    } catch {
      toast.error("Clipboard access is unavailable. Select the blueprint text manually.");
    }
  };

  return <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10"><section className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-sm font-black text-[#00D4FF] transition hover:text-white">← Return to ScrollVerse</Link><div className="flex flex-wrap gap-3"><Link href="/capability-audit" className="rounded-lg border border-[#B98CFF]/40 px-3 py-2 text-xs font-black text-[#D6C4FF] transition hover:border-[#B98CFF]">Capability Audit</Link><Link href="/production-control" className="rounded-lg border border-[#FFB800]/40 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Production Control</Link></div></div>
    <header className="mt-8 overflow-hidden rounded-[2rem] border border-[#00D4FF]/35 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 12% 12%, rgba(0,212,255,.18), transparent 32%), radial-gradient(circle at 88% 88%, rgba(185,140,255,.16), transparent 30%), #071124" }}>
      <div className="flex items-center gap-2 text-xs font-mono tracking-[.2em] text-[#00D4FF]"><Archive className="h-4 w-4" />SCROLLVERSE CREATOR INFRASTRUCTURE MAP</div>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><h1 className="max-w-5xl text-4xl font-black leading-tight sm:text-6xl">Build, preserve, prepare, and teach from a creator-controlled record.</h1><p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">This map joins the local ScrollVerse tools into an original operating model: source and version records, accessibility at creation, open-knowledge choices, production packets, destination records, and a correction trail. It is a working creator system—not a claim that an external platform, institution, or provider has already approved an asset.</p></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[#00FF88]/35 bg-[#00FF88]/[.08] p-5"><div className="font-mono text-2xl font-black text-[#00FF88]">6</div><p className="mt-2 text-xs font-bold text-[#D6E2EE]">creator infrastructure pillars</p></div><div className="rounded-2xl border border-[#FFB800]/35 bg-[#FFB800]/[.08] p-5"><div className="font-mono text-2xl font-black text-[#FFCC4D]">5</div><p className="mt-2 text-xs font-bold text-[#D6E2EE]">production lanes already mapped</p></div><div className="sm:col-span-2 rounded-2xl border border-[#B98CFF]/35 bg-[#B98CFF]/[.08] p-5"><div className="text-[10px] font-mono tracking-[.16em] text-[#D6C4FF]">CREATOR-DIRECTED OPERATING STANDARD</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">Present original work directly. Keep source, accessibility, rights, destination, and outcome fields exact. Use external standards or platforms when they serve the asset—not as a substitute for the creator’s record.</p></div></div></div>
    </header>
    <div className="mt-8"><PortalTrustLens lane="Creator Infrastructure" source="Local capability audit, production controls, evidence-first workflow, and external research on provenance, accessibility metadata, open licensing, and OER." readiness="The local infrastructure is available for preparation. A public or external outcome becomes verified only when the exact asset and destination have an actual completed result record." boundary="This map does not confer accreditation, publish an asset, open an account, apply a license, issue a token, process a payment, sign a wallet action, or replace platform/provider requirements." /></div>
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[.025] p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-black">Filter the operating map</h2><p className="mt-1 text-sm text-[#B8C7D6]">Use the state labels to see what the local portal can do now and what still needs a particular record.</p></div><button type="button" onClick={copyBlueprint} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-4 py-3 text-sm font-black text-[#B6F2FF] transition hover:border-[#00D4FF]"><Copy className="h-4 w-4" />Copy operating blueprint</button></div><div className="mt-5 flex flex-wrap gap-2">{states.map((item) => { const active = state === item.id; return <button key={item.id} type="button" aria-pressed={active} onClick={() => setState(item.id)} className="rounded-full border px-4 py-2 text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" style={{ borderColor: active ? "#00D4FF" : "rgba(255,255,255,.18)", background: active ? "rgba(0,212,255,.12)" : "transparent", color: active ? "#B6F2FF" : "#C8D8E7" }}>{item.label}</button>; })}</div></section>
    <section className="mt-8 grid gap-5 lg:grid-cols-2">{visible.map((pillar) => { const Icon = pillar.icon; return <article key={pillar.id} className="rounded-3xl border p-6" style={{ borderColor: `${pillar.tone}66`, background: `${pillar.tone}09` }}><div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-center gap-3"><div className="rounded-2xl p-3" style={{ background: `${pillar.tone}20`, color: pillar.tone }}><Icon className="h-6 w-6" /></div><div><div className="text-[10px] font-mono tracking-[.16em]" style={{ color: pillar.tone }}>{pillar.state.toUpperCase()}</div><h2 className="mt-1 text-xl font-black">{pillar.title}</h2></div></div><CheckCircle2 className="h-5 w-5" style={{ color: pillar.tone }} /></div><div className="mt-5 grid gap-4"><div className="rounded-2xl border border-white/10 bg-[#050B1A]/55 p-4"><div className="text-[10px] font-mono tracking-[.16em] text-[#A9BCCD]">LOCAL CAPABILITY</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{pillar.local}</p></div><div className="rounded-2xl border border-white/10 bg-[#050B1A]/55 p-4"><div className="text-[10px] font-mono tracking-[.16em]" style={{ color: pillar.tone }}>NEXT EXACT RECORD</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{pillar.next}</p></div><div className="rounded-2xl border border-white/10 bg-[#050B1A]/55 p-4"><div className="flex items-center gap-2 text-[10px] font-mono tracking-[.16em] text-[#D6C4FF]"><Languages className="h-3.5 w-3.5" />OPTIONAL INTEROPERABILITY</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{pillar.interoperability}</p></div></div><Link href={pillar.route} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-black text-white transition hover:border-white/50">{pillar.routeLabel}<ArrowRight className="h-4 w-4" /></Link></article>; })}</section>
    <section className="mt-8 grid gap-4 lg:grid-cols-3"><article className="rounded-3xl border border-[#00D4FF]/35 bg-[#00D4FF]/[.06] p-6"><ShieldCheck className="h-6 w-6 text-[#00D4FF]" /><h3 className="mt-4 text-lg font-black">Evidence is an asset record</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">The creator’s source record can be rich, direct, and transparent without overstating platform, legal, network, or provider outcomes.</p></article><article className="rounded-3xl border border-[#00FF88]/35 bg-[#00FF88]/[.06] p-6"><Languages className="h-6 w-6 text-[#00FF88]" /><h3 className="mt-4 text-lg font-black">Access is part of production</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">Captions, transcripts, descriptions, visual adjustment, and language choices belong in the asset packet from the start—not at the end.</p></article><article className="rounded-3xl border border-[#FFB800]/35 bg-[#FFB800]/[.06] p-6"><Globe2 className="h-6 w-6 text-[#FFCC4D]" /><h3 className="mt-4 text-lg font-black">Destinations are outcome records</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">A platform, library, shop, distributor, archive, or network becomes part of the record only after the exact real-world result exists.</p></article></section>
  </section></main>;
}
