import { useMemo, useState } from "react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ReadinessState = "Available now" | "Browser-local planning" | "Owner/provider gate";

type ReadinessPath = {
  title: string;
  lane: string;
  detail: string;
  state: ReadinessState;
  href: string;
  boundary: string;
};

const paths: ReadinessPath[] = [
  { title: "Visual Worlds", lane: "Visual and comic discovery", detail: "Original-character stories, visual concepts, comic-panel outlines, and public source handoffs are readable and navigable today.", state: "Available now", href: "/visuals", boundary: "This route currently presents visual records and story material; it is not an in-page episode player, motion-picture release, or active collectible market." },
  { title: "Music Discovery", lane: "Public listening handoff", detail: "The Music route provides a public Spotify artist embed and direct public listening links alongside creator-release planning.", state: "Available now", href: "/music", boundary: "Listening availability is provided through the linked public destination; this route does not itself upload, distribute, account for, or pay royalties." },
  { title: "Books & Media Readiness", lane: "Reader and narration inventory", detail: "Four first-party reading routes and one playable English opening narration are documented with their media, language, and release states.", state: "Available now", href: "/books-media-readiness", boundary: "Readable routes and the opening narration do not represent full audiobook, translated-edition, external-store, checkout, or collectible release states." },
  { title: "Voice & Language Studio", lane: "Accessible reading controls", detail: "Device-voice selection, visible text, rate, pitch, mute, and browser-language controls are available when the visitor’s browser supports speech synthesis.", state: "Available now", href: "/voice-language-studio", boundary: "Browser speech is device-provided; owner-voice, custom synthesis, translation finalization, and provider activation remain separately controlled." },
  { title: "Media Readiness Lab", lane: "File facts", detail: "Inspect a locally selected image, audio, or video file and export a browser-local preparation record.", state: "Available now", href: "/media-readiness-lab", boundary: "No upload, provider submission, rights determination, or public release." },
  { title: "Original Media Readiness", lane: "Story and visual work", detail: "Plan original comics, animation, learning visuals, episodes, and story worlds with source and youth-safety context.", state: "Browser-local planning", href: "/original-media-readiness", boundary: "No publication, likeness license, distribution, or merch activation." },
  { title: "Music & Creator Release Readiness", lane: "Music release", detail: "Organize music, visual, publishing, distribution, direct-to-fan, and collectible preparation packets.", state: "Browser-local planning", href: "/music-creator-release-readiness", boundary: "No provider login, upload, payout, sale, mint, or release action." },
  { title: "GitHub Showcase", lane: "Public portfolio", detail: "Browse the dated public repository snapshot through portal, media, Web3, research, workflow, and portfolio lenses.", state: "Available now", href: "/github-showcase", boundary: "A public repository is source context, not proof of a live deployment, account, revenue, or authorization." },
  { title: "IP & Digital Evidence Navigator", lane: "Evidence and provenance", detail: "Map works, marks, repositories, domains, records, and evidence gaps before any rights or release conclusion.", state: "Browser-local planning", href: "/ip-digital-evidence-navigator", boundary: "No ownership decision, registration, filing, valuation, or legal conclusion." },
  { title: "NFT Monetization Blueprint", lane: "Blockchain learning", detail: "Study staged edition, patron, licensing, and phygital readiness concepts with visible collection and security questions.", state: "Owner/provider gate", href: "/nft-monetization-blueprint", boundary: "Fail-closed: no wallet, mint, token issue, sale, custody, exchange, or transaction." },
  { title: "Creator Operations Intelligence", lane: "Release operations", detail: "Prepare royalty evidence, traffic context, specialist role guidance, and public legal-information research.", state: "Browser-local planning", href: "/creator-operations-intelligence", boundary: "No account access, claim, payout, filing, representation, or provider action." },
  { title: "Consortium Nexus", lane: "Portfolio continuity", detail: "Navigate owner-confirmed project records, source states, resilience research, and explicit connection readiness.", state: "Available now", href: "/consortium-nexus", boundary: "No hidden synchronization, shared secrets, external-account access, or transaction execution." },
];

const states: Array<ReadinessState | "All states"> = ["All states", "Available now", "Browser-local planning", "Owner/provider gate"];

const stateStyle: Record<ReadinessState, { border: string; text: string; label: string }> = {
  "Available now": { border: "border-[#00FF88]/35", text: "text-[#00FF88]", label: "FIRST-PARTY ROUTE" },
  "Browser-local planning": { border: "border-[#00D4FF]/35", text: "text-[#00D4FF]", label: "LOCAL PREPARATION" },
  "Owner/provider gate": { border: "border-[#FFB800]/35", text: "text-[#FFB800]", label: "ACTIVATION GATE" },
};

export default function MediaPortfolioReadiness() {
  useSovereignHeartbeat({ page: "media-portfolio-readiness" });
  const [selectedState, setSelectedState] = useState<ReadinessState | "All states">("All states");
  const visiblePaths = useMemo(() => selectedState === "All states" ? paths : paths.filter(path => path.state === selectedState), [selectedState]);

  return <main className="min-h-screen bg-[#050B1A] pb-16 text-white">
    <header className="border-b border-[#00D4FF]/15 bg-[#050B1A]/95"><div className="container flex items-center justify-between py-4"><Link href="/creator-operations" className="text-sm font-black hover:text-[#00D4FF]">ScrollVerse Creator Operations</Link><Link href="/empire-index" className="text-xs font-mono text-[#00FF88]">EMPIRE INDEX →</Link></div></header>
    <section className="container py-12 md:py-16">
      <p className="text-xs font-mono tracking-[0.22em] text-[#00D4FF]">PHASE 198 · FIRST-PARTY READINESS AUDIT</p>
      <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">Media, portfolio, and on-chain learning.<br /><span className="text-[#FFB800]">One readable readiness map.</span></h1>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8D8E7] md:text-lg">This route connects active ScrollVerse preparation surfaces without blending their states. Filter the map to see what is available now, what remains browser-local planning, and what requires a separate owner or provider decision.</p>

      <PortalTrustLens lane="media and portfolio audit" source="Current first-party route inventory, dated public repository context, and owner-supplied records with visible limits." readiness="The routes below are working navigation and local preparation tools; their underlying provider, rights, payment, wallet, or release states are tracked separately." boundary="No route here uploads, publishes, sells, mints, connects a wallet, determines rights, enters a provider account, or completes a transaction." />

      <section className="mt-10 rounded-3xl border border-[#FFB800]/25 bg-[#FFB800]/[.035] p-6"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-widest text-[#FFB800]">READINESS FILTER</p><h2 className="mt-2 text-2xl font-black">Choose the operating state you need.</h2></div><div className="flex flex-wrap gap-2">{states.map(state => <button key={state} type="button" onClick={() => setSelectedState(state)} className={`rounded-full border px-4 py-2 text-xs font-black transition ${selectedState === state ? "border-[#FFB800] bg-[#FFB800] text-[#050B1A]" : "border-white/15 text-[#D9E6EF] hover:border-[#FFB800]/60"}`}>{state}</button>)}</div></div><p className="mt-4 text-sm leading-relaxed text-[#C8D8E7]">Showing <strong className="text-white">{visiblePaths.length}</strong> of {paths.length} connected readiness paths. This filter is browser-local and does not create a visitor record.</p></section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">{visiblePaths.map(path => { const style = stateStyle[path.state]; return <article key={path.href} className={`rounded-3xl border ${style.border} bg-white/[.025] p-6`}><div className="flex flex-wrap items-center justify-between gap-3"><span className={`text-[10px] font-mono tracking-[0.16em] ${style.text}`}>{style.label}</span><span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-mono text-[#AFC3D1]">{path.lane.toUpperCase()}</span></div><h2 className="mt-4 text-2xl font-black">{path.title}</h2><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">{path.detail}</p><div className="mt-5 rounded-2xl border border-white/10 bg-[#020713]/65 p-4"><p className="text-[10px] font-mono tracking-widest text-[#B98CFF]">BOUNDARY</p><p className="mt-2 text-xs leading-5 text-[#D4E1EA]">{path.boundary}</p></div><Link href={path.href} className={`mt-5 inline-flex text-sm font-black ${style.text}`}>Open readiness path →</Link></article>; })}</section>

      <section className="mt-10 grid gap-5 md:grid-cols-3"><div className="rounded-2xl border border-[#00FF88]/25 bg-[#00FF88]/[.035] p-5"><p className="text-xs font-mono text-[#00FF88]">01 · PREPARE</p><p className="mt-2 text-sm leading-6 text-[#D5E8E0]">Use local inspection, source records, metadata, accessibility, and rights questions to prepare a release packet.</p></div><div className="rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.035] p-5"><p className="text-xs font-mono text-[#00D4FF]">02 · REVIEW</p><p className="mt-2 text-sm leading-6 text-[#D8E8F0]">Use the Creator Operations and evidence lanes for a protected review handoff when a human owner chooses to proceed.</p></div><div className="rounded-2xl border border-[#FFB800]/25 bg-[#FFB800]/[.035] p-5"><p className="text-xs font-mono text-[#FFB800]">03 · ACTIVATE SEPARATELY</p><p className="mt-2 text-sm leading-6 text-[#F0E2C8]">Provider accounts, contracts, wallets, payments, publishing, and customer delivery require their own verified evidence and confirmation.</p></div></section>
    </section>
  </main>;
}
