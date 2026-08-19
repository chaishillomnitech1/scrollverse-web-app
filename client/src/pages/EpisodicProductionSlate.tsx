import { useState } from "react";
import { ArrowRight, Captions, CheckCircle2, Clapperboard, FileText, LockKeyhole, Mic2, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const episodes = [
  {
    id: "SV-EP-016",
    workingTitle: "Night Sentinel: Source Pathways",
    source: "Owner-provided Pasted_content_88.txt · Episode 16 development context",
    state: "Research · rights and contributor review",
    accent: "#00D4FF",
    needs: ["Original character/title decision", "Script and text rights", "Performer / likeness review", "Narration authority"],
  },
  {
    id: "SV-EP-017A",
    workingTitle: "Night Sentinel: Runtime Command",
    source: "Owner-provided Pasted_content_89.txt and Pasted_content_90.txt · Episode 17 development context",
    state: "Research · rights and contributor review",
    accent: "#DCC8FF",
    needs: ["Original character/title decision", "Visual/score source review", "Master and contributor records", "Caption and delivery plan"],
  },
] as const;

const packetChecks = [
  { title: "Identity & source", detail: "Working title, version, creator credit, source path, intended use, and record date." },
  { title: "Rights & contributors", detail: "Text, artwork, footage, performer, likeness, mark, split, and contributor authority fields." },
  { title: "Access & youth safety", detail: "Captions, transcript, audio description, sensitivity review, and adult-supported participation where needed." },
  { title: "Technical & release", detail: "Master format, mix/stems, secure asset location, destination, territory, free/paid decision, and owner release." },
] as const;

export default function EpisodicProductionSlate() {
  useSovereignHeartbeat({ page: "episodic-production-slate" });
  const [selectedId, setSelectedId] = useState<string>(episodes[0].id);
  const [briefReady, setBriefReady] = useState(false);
  const selected = episodes.find((episode) => episode.id === selectedId) ?? episodes[0];

  const prepareBrief = () => {
    setBriefReady(true);
    toast.success("Local episode packet outline prepared. No script, narration, media, playback, or publication action was created.");
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_80%_8%,rgba(0,212,255,.18),transparent_29%),radial-gradient(circle_at_10%_90%,rgba(185,140,255,.16),transparent_30%),#050B1A]">
        <div className="container py-14 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/meta-ai-artifacts-lookbooks" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← RETURN TO VISUAL DISCOVERY</Link><span className="rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.15em] text-[#9DEBFF]">EPISODIC DEVELOPMENT · REQUIRES OWNER RELEASE</span></div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-xs font-mono tracking-[.2em] text-[#9DEBFF]">SCROLLVERSE EPISODIC PRODUCTION SLATE</p><h1 className="mt-4 text-5xl font-black leading-[.92] md:text-7xl">A series earns its <span className="text-[#DCC8FF]">release record.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A production planning room for owner-provided episode drafts and original future story worlds. Each entry keeps source, title, character, contributor, accessibility, technical, and release decisions visible before any script becomes a recorded or playable work.</p></div><aside className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.05] p-7"><Clapperboard className="h-9 w-9 text-[#FFDEA0]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">CURRENT STATE</p><p className="mt-3 text-2xl font-black">Development context is available.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">No episode is published, playing, licensed, or represented as complete. A name or character reference stays in rights-aware review until its own record supports use.</p></aside></div>
        </div>
      </section>

      <section className="container py-10"><PortalTrustLens lane="Episodic Production Slate" source="Owner-provided Pasted_content_88.txt, Pasted_content_89.txt, and Pasted_content_90.txt; protected development context." readiness="Episode records can be planned locally with source, rights, contributor, accessibility, technical, and release fields." boundary="This route does not publish a script, create a performance, synthesize a voice, embed a player, host media, license a character, sell access, or activate a provider." /></section>

      <section className="container py-8"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">DEVELOPMENT RECORDS</p><h2 className="mt-3 text-4xl font-black">Select an episode context.</h2></div><p className="max-w-lg text-sm leading-7 text-[#B8C7D6]">The working titles below are original planning labels. Source references remain in protected rights review and do not establish an approved portrayal, episode, or release.</p></div><div className="mt-7 grid gap-5 lg:grid-cols-[.75fr_1.25fr]"><div className="grid gap-3">{episodes.map((episode) => <button key={episode.id} type="button" onClick={() => { setSelectedId(episode.id); toast.success("Local episode context selected. No production or media action was created."); }} className="rounded-2xl border p-5 text-left" style={{ borderColor: selectedId === episode.id ? `${episode.accent}AA` : `${episode.accent}42`, background: selectedId === episode.id ? `${episode.accent}14` : "rgba(255,255,255,0.025)" }}><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: episode.accent }}>{episode.id}</p><h3 className="mt-2 text-xl font-black">{episode.workingTitle}</h3><p className="mt-2 text-xs leading-5 text-[#B8C7D6]">{episode.state}</p></button>)}</div><article className="rounded-[2rem] border border-white/10 bg-white/[.025] p-7"><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: selected.accent }}>{selected.id} · RESEARCH RECORD</p><h3 className="mt-3 text-3xl font-black">{selected.workingTitle}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{selected.source}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{selected.needs.map((need) => <div key={need} className="flex gap-3 rounded-xl border border-white/10 bg-black/25 p-4"><LockKeyhole className="h-4 w-4 shrink-0" style={{ color: selected.accent }} /><p className="text-sm text-[#D6E2EE]">{need}</p></div>)}</div></article></div></section>

      <section className="container py-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{packetChecks.map((item, index) => <article key={item.title} className="rounded-[1.6rem] border border-white/10 bg-white/[.025] p-6"><p className="text-[10px] font-mono tracking-[.15em] text-[#9DEBFF]">PACKET {String(index + 1).padStart(2, "0")}</p><h3 className="mt-4 text-xl font-black">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.detail}</p></article>)}</div></section>

      <section className="container py-8"><div className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.045] p-7 md:p-9"><div className="flex flex-wrap items-start justify-between gap-6"><div><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">LOCAL EPISODE PACKET</p><h2 className="mt-3 text-3xl font-black">Prepare the next original production record.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">This local preparation step organizes the evidence categories. It cannot create a script, narration, media asset, player, hosting destination, release, product, or paid experience.</p></div><button type="button" onClick={prepareBrief} className="rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#04110A]">Prepare local outline</button></div>{briefReady && <div className="mt-6 rounded-2xl border border-[#00FF88]/35 bg-black/25 p-5 text-sm leading-7 text-[#D6E2EE]"><span className="font-black text-[#B5F7CC]">LOCAL OUTLINE READY · </span>{selected.workingTitle}. Continue only after original title/character choices, source, contributor authority, accessibility, secure technical plan, destination, and exact owner release are recorded.</div>}</div></section>

      <section className="container py-8"><div className="grid gap-5 md:grid-cols-3"><Link href="/narration-directions" className="rounded-[1.7rem] border border-[#DCC8FF]/35 bg-[#DCC8FF]/[.05] p-6"><Mic2 className="h-8 w-8 text-[#E8DFFF]" /><h3 className="mt-5 text-2xl font-black">Narration Directions</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Original voice-direction and release record requirements.</p></Link><Link href="/media-world-evidence-packets" className="rounded-[1.7rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.05] p-6"><FileText className="h-8 w-8 text-[#9DEBFF]" /><h3 className="mt-5 text-2xl font-black">Media Evidence Packets</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Move from source context to one item-specific release packet.</p></Link><Link href="/creator-catalog-readiness" className="rounded-[1.7rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-6"><Captions className="h-8 w-8 text-[#B5F7CC]" /><h3 className="mt-5 text-2xl font-black">Catalog Readiness</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Connect completed records to future creator-owned catalog lanes.</p></Link></div></section>
    </main>
  );
}
