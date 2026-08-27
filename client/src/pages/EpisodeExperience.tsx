import { useMemo, useState } from "react";
import { ArrowRight, Captions, Clapperboard, FileCheck2, Film, LockKeyhole, Play, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type EpisodeRecord = {
  id: string;
  title: string;
  label: string;
  state: string;
  accent: string;
  source: string;
  synopsis: string;
  scenes: readonly { title: string; purpose: string; state: string }[];
  gates: readonly string[];
};

const EPISODES: readonly EpisodeRecord[] = [
  {
    id: "SV-EP-001",
    title: "Archive Signal: First Light",
    label: "ORIGINAL SCROLLVERSE DEVELOPMENT RECORD",
    state: "Research · requires owner release",
    accent: "#FFCC4D",
    source: "Original ScrollVerse episode-planning record created for browser-local development.",
    synopsis: "An original series-opening concept about a creator entering a living archive and choosing which source trail the public can explore. The scene record is a planning outline, not a completed script, production, or playable episode.",
    scenes: [
      { title: "Signal arrival", purpose: "Establish the source-led archive world and the visitor’s viewing choice.", state: "Original concept" },
      { title: "The open record", purpose: "Show source, date, current state, and the difference between a concept and a release.", state: "Original concept" },
      { title: "The next gate", purpose: "Close with the selected episode’s evidence, access, and release requirements.", state: "Original concept" },
    ],
    gates: ["Working script and revision record", "Contributor, performer, and likeness decisions", "Caption, transcript, and audio-description plan", "Master, host, delivery, and exact owner release"],
  },
  {
    id: "SV-EP-016",
    title: "Night Sentinel: Source Pathways",
    label: "PROTECTED DEVELOPMENT CONTEXT",
    state: "Research · rights and contributor review",
    accent: "#00D4FF",
    source: "Owner-provided Pasted_content_88.txt · protected Episode 16 development context.",
    synopsis: "A protected source context retained for production planning. The route uses an original working title and does not establish a completed script, character portrayal, performer relationship, narration, media file, episode, or release.",
    scenes: [
      { title: "Source inventory", purpose: "Classify protected context and identify reusable planning fields without importing protected expression.", state: "Research" },
      { title: "Original identity decision", purpose: "Choose a separate original title, character identity, and permitted creative direction before production.", state: "Requires owner release" },
      { title: "Access pass", purpose: "Define captions, transcript, audio description, and youth-support review if needed.", state: "Requires owner release" },
    ],
    gates: ["Original character and title decision", "Script/text and visual source rights", "Performer, likeness, and narration authority", "Master, accessibility, hosting, and release record"],
  },
  {
    id: "SV-EP-017",
    title: "Night Sentinel: Runtime Horizon",
    label: "PROTECTED DEVELOPMENT CONTEXT",
    state: "Research · rights and contributor review",
    accent: "#DCC8FF",
    source: "Owner-provided Pasted_content_89.txt and Pasted_content_90.txt · protected Episode 17 development context.",
    synopsis: "A planning record for protected runtime-deck context. It separates source observation from a future original episode and keeps every media, role, score, delivery, and release decision unmade until recorded.",
    scenes: [
      { title: "Runtime map", purpose: "Define only the planning sequence, intended purpose, and evidence fields for a future original work.", state: "Research" },
      { title: "Contributor map", purpose: "Collect master, visual, score, writer, performer, and contributor questions before a production commitment.", state: "Requires owner release" },
      { title: "Destination choice", purpose: "Name an approved host, territory, viewer access, and publication decision only after the packet is complete.", state: "Requires owner release" },
    ],
    gates: ["Original script and visual treatment", "Master and contributor records", "Caption, transcript, and delivery plan", "Host, territory, access, and exact owner release"],
  },
] as const;

export default function EpisodeExperience() {
  useSovereignHeartbeat({ page: "episode-experience" });
  const [episodeId, setEpisodeId] = useState(EPISODES[0].id);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [packetVisible, setPacketVisible] = useState(false);
  const selected = useMemo(() => EPISODES.find((episode) => episode.id === episodeId) ?? EPISODES[0], [episodeId]);
  const scene = selected.scenes[sceneIndex] ?? selected.scenes[0];

  const selectEpisode = (id: string) => {
    setEpisodeId(id);
    setSceneIndex(0);
    setPacketVisible(false);
    toast.success("Local episode record selected. No player, narration, media, or publication action was created.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-[#DCC8FF]/25 bg-[radial-gradient(circle_at_84%_12%,rgba(185,140,255,.24),transparent_30%),radial-gradient(circle_at_12%_88%,rgba(0,212,255,.16),transparent_31%),#050B1A]"><div className="container py-14 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/episodic-production-slate" className="text-xs font-mono tracking-[.16em] text-[#E8DFFF]">← EPISODIC PRODUCTION SLATE</Link><span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.15em] text-[#FFDEA0]">EPISODE NAVIGATION · NO PLAYBACK ACTIVE</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.2em] text-[#E8DFFF]">SCROLLVERSE · EPISODE EXPERIENCE</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">A scene can be <span className="text-[#DCC8FF]">active</span> before a show is playing.</h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Explore original and protected-context episode records through local scene navigation, production gates, and accessibility planning. The interface is active now as a development experience; it does not host a video, play an episode, synthesize a narrator, or represent a work as released.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#episode-records" className="rounded-xl bg-[#DCC8FF] px-5 py-3 text-sm font-black text-[#071426]">Explore episode records</a><Link href="/episode-brief-builder" className="rounded-xl border border-[#00FF88]/45 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Build a local brief</Link><Link href="/sovereign-cinema" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Open Sovereign Cinema</Link></div></div><aside className="rounded-[2rem] border border-[#00FF88]/30 bg-[#00FF88]/[.05] p-7"><Film className="h-9 w-9 text-[#B5F7CC]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black">Development navigation is available now.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">No episode is published, playing, licensed, hosted, sold, or presented as complete from this route.</p></aside></div></div></section>

    <section className="container py-10"><PortalTrustLens lane="Episode Experience" source="Original ScrollVerse development record plus protected owner-provided Episode 16 and Episode 17 planning context." readiness="Visitors can inspect browser-local episode, scene, accessibility, and production-gate records now." boundary="This route does not publish a script, play or host media, create a performance, synthesize narration, license a character, use a third-party likeness, sell access, connect a provider, or make a release decision." /></section>

    <section id="episode-records" className="container scroll-mt-8 py-8"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#E8DFFF]">EPISODE RECORDS</p><h2 className="mt-2 text-3xl font-black">Choose a development record.</h2></div><p className="max-w-xl text-sm leading-7 text-[#B8C7D6]">The episode title, source, current state, scene purpose, and release gates remain visible during local exploration.</p></div><div className="mt-7 grid gap-5 lg:grid-cols-[.72fr_1.28fr]"><div className="grid gap-3">{EPISODES.map((episode) => <button key={episode.id} type="button" onClick={() => selectEpisode(episode.id)} className="rounded-2xl border p-5 text-left transition-all" style={{ borderColor: episodeId === episode.id ? `${episode.accent}AF` : `${episode.accent}40`, background: episodeId === episode.id ? `${episode.accent}14` : "rgba(255,255,255,.025)" }}><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: episode.accent }}>{episode.id} · {episode.label}</p><h3 className="mt-3 text-xl font-black">{episode.title}</h3><p className="mt-3 text-xs leading-5 text-[#B8C7D6]">{episode.state}</p></button>)}</div><article className="rounded-[2rem] border border-white/10 bg-white/[.025] p-7 md:p-8"><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: selected.accent }}>{selected.id} · {selected.label}</p><h3 className="mt-3 text-3xl font-black">{selected.title}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{selected.synopsis}</p><div className="mt-6 rounded-2xl border p-5" style={{ borderColor: `${selected.accent}48`, background: `${selected.accent}08` }}><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: selected.accent }}>SOURCE AND STATE</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.source}</p><p className="mt-3 text-xs font-black" style={{ color: selected.accent }}>{selected.state.toUpperCase()}</p></div></article></div></section>

    <section className="container py-8"><div className="rounded-[2.1rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.045] p-7 md:p-9"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">SCENE NAVIGATION</p><h2 className="mt-3 text-3xl font-black">Review the sequence, not a playback stream.</h2></div><span className="rounded-full border border-[#00D4FF]/35 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono text-[#9DEBFF]">{selected.id} · LOCAL VIEW</span></div><div className="mt-7 grid gap-5 lg:grid-cols-[.78fr_1.22fr]"><div className="space-y-3">{selected.scenes.map((entry, index) => <button key={entry.title} type="button" onClick={() => setSceneIndex(index)} className="w-full rounded-2xl border p-5 text-left" style={{ borderColor: sceneIndex === index ? `${selected.accent}A8` : "rgba(255,255,255,.12)", background: sceneIndex === index ? `${selected.accent}15` : "rgba(0,0,0,.14)" }}><p className="text-[10px] font-mono" style={{ color: sceneIndex === index ? selected.accent : "#B8C7D6" }}>SCENE {String(index + 1).padStart(2, "0")} · {entry.state.toUpperCase()}</p><h3 className="mt-3 text-lg font-black">{entry.title}</h3><p className="mt-2 text-xs leading-6 text-[#B8C7D6]">{entry.purpose}</p></button>)}</div><article className="rounded-[2rem] border border-white/10 bg-black/20 p-7"><Clapperboard className="h-9 w-9" style={{ color: selected.accent }} /><p className="mt-5 text-[10px] font-mono tracking-[.16em]" style={{ color: selected.accent }}>ACTIVE SCENE CARD</p><h3 className="mt-3 text-3xl font-black">{scene.title}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{scene.purpose}</p><div className="mt-6 rounded-2xl border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.06] p-5"><div className="flex gap-3"><Play className="mt-0.5 h-5 w-5 shrink-0 text-[#FFDEA0]" /><div><p className="text-xs font-black text-[#FFDEA0]">NO PLAYBACK ACTIVE</p><p className="mt-2 text-xs leading-6 text-[#D6E2EE]">This is a scene-planning card. It has no video, audio, narrator, media URL, embed, host, or player.</p></div></div></div></article></div></div></section>

    <section className="container py-8"><div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><article className="rounded-[2rem] border border-[#DCC8FF]/35 bg-[#DCC8FF]/[.055] p-7"><FileCheck2 className="h-8 w-8 text-[#E8DFFF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#E8DFFF]">RELEASE PACKET GATES</p><h2 className="mt-3 text-3xl font-black">What must exist before an episode can be released.</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{selected.gates.map((gate) => <div key={gate} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"><LockKeyhole className="h-4 w-4 shrink-0" style={{ color: selected.accent }} /><p className="text-sm leading-6 text-[#D6E2EE]">{gate}</p></div>)}</div></article><aside className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-7"><Captions className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">ACCESS AND YOUTH SAFETY</p><h2 className="mt-3 text-3xl font-black">Access is part of the episode record.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">A final episode record must identify captioning, transcript, audio-description, sensitivity review, and adult-supported participation when content is intended for or likely to be accessed by children. These fields are prepared before a host or release decision.</p><button type="button" onClick={() => { setPacketVisible(true); toast.success("Local episode packet checklist prepared. No media or publishing action was created."); }} className="mt-6 w-full rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#04110A]">Prepare local packet checklist</button></aside></div>{packetVisible && <div className="container mt-2"><div className="rounded-2xl border border-[#00FF88]/35 bg-black/20 p-5 text-sm leading-7 text-[#D6E2EE]"><ShieldCheck className="mr-2 inline h-5 w-5 text-[#B5F7CC]" /><strong className="text-[#B5F7CC]">LOCAL PACKET CHECKLIST READY.</strong> Continue only after the selected episode has an original title/character decision, source and contributor authority, accessibility plan, technical master and delivery record, host/access decision, and exact owner release.</div></div>}</section>

    <section className="container py-8"><div className="grid gap-5 md:grid-cols-3"><Link href="/episodic-production-slate" className="rounded-[1.75rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.05] p-6 transition-transform hover:-translate-y-0.5"><Clapperboard className="h-8 w-8 text-[#9DEBFF]" /><h3 className="mt-5 text-2xl font-black">Production slate</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Return to the complete source, rights, contributor, access, and release planning room.</p></Link><Link href="/sovereign-cinema" className="rounded-[1.75rem] border border-[#DCC8FF]/35 bg-[#DCC8FF]/[.05] p-6 transition-transform hover:-translate-y-0.5"><Film className="h-8 w-8 text-[#E8DFFF]" /><h3 className="mt-5 text-2xl font-black">Sovereign Cinema</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Discover the wider cinema route with every work carrying its own current state.</p></Link><Link href="/media-world-evidence-packets" className="rounded-[1.75rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.05] p-6 transition-transform hover:-translate-y-0.5"><ArrowRight className="h-8 w-8 text-[#FFDEA0]" /><h3 className="mt-5 text-2xl font-black">Media evidence packets</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Move from a source context into one item-specific release record before publication.</p></Link></div></section>
  </main>;
}
