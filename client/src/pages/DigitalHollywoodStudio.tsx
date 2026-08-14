import { useMemo, useState } from "react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type LaneId = "story" | "visual" | "sound" | "edit" | "access" | "release";

const lanes: Array<{ id: LaneId; number: string; title: string; icon: string; summary: string; evidence: string; state: "Browser-local" | "Owner review" }> = [
  { id: "story", number: "01", title: "Story room", icon: "✦", summary: "Define character purpose, audience promise, source references, and the choice that changes the story.", evidence: "Originality note · contributor list · age suitability note", state: "Browser-local" },
  { id: "visual", number: "02", title: "Visual world", icon: "◈", summary: "Plan character guides, scenes, art direction, and asset-source records for an original world.", evidence: "Asset source · likeness check · visual development record", state: "Browser-local" },
  { id: "sound", number: "03", title: "Sound and score", icon: "♫", summary: "Map voice, music, ambience, captions, contributors, and rights questions before a mix is locked.", evidence: "Contributor attribution · music rights packet · transcript plan", state: "Browser-local" },
  { id: "edit", number: "04", title: "Editorial room", icon: "▣", summary: "Shape pace, emotional consequence, continuity, content context, and a viewer-ready cut.", evidence: "Edit decision list · audience context · version record", state: "Browser-local" },
  { id: "access", number: "05", title: "Access room", icon: "◌", summary: "Choose captions, transcript, audio description, and player options before release review.", evidence: "Caption plan · description choice · media accessibility review", state: "Browser-local" },
  { id: "release", number: "06", title: "Release gate", icon: "⌁", summary: "Separate a completed draft from a real release decision, provider action, or commercial system.", evidence: "Rights review · provider terms · owner approval · destination decision", state: "Owner review" },
];

const connectedPaths = [
  { title: "Junior Movies Studio", href: "/junior-studio", note: "Adult-supported, browser-local story and comic drafting" },
  { title: "Visual Worlds", href: "/visuals", note: "Original-character and collectible-readiness records" },
  { title: "Music Discovery", href: "/music", note: "Public listening handoff and creator-release planning" },
  { title: "Original Media Readiness", href: "/original-media-readiness", note: "Story, visual, youth-safety, and release preparation" },
  { title: "Creator Media Studio", href: "/creator-media-studio", note: "Creator craft, collaboration, and protected review paths" },
  { title: "Media & Portfolio Readiness", href: "/media-portfolio-readiness", note: "Cross-system state map for media, portfolio, IP, and learning" },
];

const checklist = [
  "Original concept and contributor record",
  "Reference and cultural-context check",
  "Youth/privacy and adult-support decision",
  "Captions, transcript, and description choice",
  "Rights, likeness, and music-permission packet",
  "Owner release decision and destination review",
];

export default function DigitalHollywoodStudio() {
  useSovereignHeartbeat({ page: "digital-hollywood-studio" });
  const [selectedLane, setSelectedLane] = useState<LaneId>("story");
  const [checked, setChecked] = useState<number[]>([]);
  const active = useMemo(() => lanes.find(lane => lane.id === selectedLane) ?? lanes[0], [selectedLane]);
  const complete = Math.round((checked.length / checklist.length) * 100);

  return <main className="min-h-screen bg-[#050B1A] pb-16 text-white">
    <header className="border-b border-[#FFB800]/20 bg-[#050B1A]/95"><div className="container flex items-center justify-between py-4"><Link href="/creator-operations" className="text-sm font-black transition hover:text-[#00D4FF]">ScrollVerse Creator Operations</Link><Link href="/media-portfolio-readiness" className="text-xs font-mono text-[#00FF88]">READINESS MAP →</Link></div></header>

    <section className="border-b border-[#00D4FF]/15" style={{ background: "radial-gradient(circle at 18% 20%, rgba(255,184,0,0.18), transparent 34%), radial-gradient(circle at 82% 18%, rgba(0,212,255,0.15), transparent 35%), #050B1A" }}>
      <div className="container py-14 md:py-20">
        <p className="text-xs font-mono tracking-[0.22em] text-[#FFB800]">PHASE 200 · DIGITAL HOLLYWOOD PRODUCTION BLUEPRINT</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">Original worlds deserve a production system.<br /><span className="text-[#00D4FF]">Not a shortcut to release.</span></h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8D8E7] md:text-lg">A first-party studio map for meaningful film, episodes, animation, music, art, and education. It combines character depth, visual clarity, editorial discipline, intentional sound, and accessibility planning without imitating any living filmmaker’s distinctive style.</p>
        <div className="mt-8 flex flex-wrap gap-3"><span className="rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-4 py-2 text-xs font-mono text-[#00FF88]">BROWSER-LOCAL PLANNING</span><span className="rounded-full border border-[#FFB800]/35 bg-[#FFB800]/10 px-4 py-2 text-xs font-mono text-[#FFB800]">OWNER-REVIEW RELEASE GATE</span><span className="rounded-full border border-[#B98CFF]/35 bg-[#B98CFF]/10 px-4 py-2 text-xs font-mono text-[#B98CFF]">YOUTH-SUPPORTED PARTICIPATION</span></div>
      </div>
    </section>

    <div className="container py-10">
      <PortalTrustLens lane="Digital Hollywood" source="Original ScrollVerse production standard, current first-party media routes, UNICEF child-safety context, FTC COPPA reference, and W3C media-accessibility guidance." readiness="Production planning, connected route discovery, and this browser-local checklist are live; media release requires a separate owner decision." boundary="No content is uploaded, distributed, sold, licensed, minted, tokenized, paid, or connected to a provider, wallet, contract, payout, or external account from this page." />

      <section className="mt-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-widest text-[#00D4FF]">THE SIX-ROOM PRODUCTION FLOW</p><h2 className="mt-2 text-3xl font-black">Make each creative decision visible.</h2></div><p className="max-w-sm text-sm leading-6 text-[#AFC3D1]">Select a room to reveal the evidence packet that should exist before a draft moves forward.</p></div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{lanes.map(lane => <button key={lane.id} type="button" onClick={() => setSelectedLane(lane.id)} className="rounded-3xl border p-5 text-left transition hover:-translate-y-0.5" style={{ background: selectedLane === lane.id ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.025)", borderColor: selectedLane === lane.id ? "rgba(0,212,255,0.56)" : "rgba(255,255,255,0.1)" }}><div className="flex items-center justify-between"><span className="text-xs font-mono text-[#00D4FF]">{lane.number}</span><span className="text-2xl">{lane.icon}</span></div><h3 className="mt-4 text-xl font-black">{lane.title}</h3><p className="mt-2 text-sm leading-6 text-[#C8D8E7]">{lane.summary}</p><p className={`mt-4 text-[10px] font-mono tracking-widest ${lane.state === "Browser-local" ? "text-[#00FF88]" : "text-[#FFB800]"}`}>{lane.state.toUpperCase()}</p></button>)}</div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"><article className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.035] p-7"><p className="text-xs font-mono tracking-widest text-[#00D4FF]">ACTIVE ROOM · {active.number}</p><div className="mt-3 flex items-center gap-3"><span className="text-3xl">{active.icon}</span><h2 className="text-3xl font-black">{active.title}</h2></div><p className="mt-4 max-w-xl text-base leading-7 text-[#D5E7F1]">{active.summary}</p><div className="mt-6 rounded-2xl border border-white/10 bg-[#020713]/60 p-5"><p className="text-[10px] font-mono tracking-widest text-[#B98CFF]">REQUIRED EVIDENCE PACKET</p><p className="mt-3 text-sm text-white">{active.evidence}</p></div><p className="mt-5 text-xs leading-5 text-[#AFC3D1]">A completed card indicates a planning prompt has been identified, not that rights, accessibility, provider, financial, or release review is complete.</p></article>
        <article className="rounded-3xl border border-[#FFB800]/25 bg-[#FFB800]/[.035] p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-mono tracking-widest text-[#FFB800]">BROWSER-LOCAL PACKET CHECK</p><h2 className="mt-2 text-2xl font-black">{complete}% planned</h2></div><div className="text-4xl font-black text-[#FFB800]">{checked.length}/{checklist.length}</div></div><div className="mt-6 space-y-3">{checklist.map((item, index) => <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-[#020713]/50 p-3"><input type="checkbox" checked={checked.includes(index)} onChange={() => setChecked(previous => previous.includes(index) ? previous.filter(value => value !== index) : [...previous, index])} className="mt-0.5 accent-[#FFB800]" /><span className="text-sm leading-5 text-[#DCE8F0]">{item}</span></label>)}</div><p className="mt-5 text-xs leading-5 text-[#AFC3D1]">Selections remain only in this browser state and do not create a submission, release, account, or record.</p></article></section>

      <section className="mt-10"><p className="text-xs font-mono tracking-widest text-[#B98CFF]">CONNECTED FIRST-PARTY WORKROOMS</p><div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{connectedPaths.map(path => <Link key={path.href} href={path.href} className="rounded-2xl border border-white/10 bg-white/[.025] p-5 transition hover:border-[#B98CFF]/55"><h3 className="font-black text-white">{path.title}</h3><p className="mt-2 text-sm leading-6 text-[#C8D8E7]">{path.note}</p><p className="mt-4 text-xs font-mono text-[#B98CFF]">OPEN WORKROOM →</p></Link>)}</div></section>

      <section className="mt-10 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-[#00FF88]/25 bg-[#00FF88]/[.035] p-5"><p className="text-xs font-mono text-[#00FF88]">YOUTH SAFETY</p><p className="mt-2 text-sm leading-6 text-[#D5E8E0]">Use adult-supported review, privacy-minimizing drafts, clear online-sharing rules, and no public release by default for child-facing work.</p></div><div className="rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.035] p-5"><p className="text-xs font-mono text-[#00D4FF]">ACCESSIBLE MEDIA</p><p className="mt-2 text-sm leading-6 text-[#D8E8F0]">Choose captions, transcript, and visual-description options before picture lock—not after a public launch.</p></div><div className="rounded-2xl border border-[#FFB800]/25 bg-[#FFB800]/[.035] p-5"><p className="text-xs font-mono text-[#FFB800]">RELEASE READINESS</p><p className="mt-2 text-sm leading-6 text-[#F0E2C8]">Rights, likenesses, provider terms, release copy, and the destination decision require a distinct owner-approved review.</p></div></section>
    </div>
  </main>;
}
