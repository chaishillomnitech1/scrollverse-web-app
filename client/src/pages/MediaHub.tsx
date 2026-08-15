import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { Disc3, Film, Heart, ListPlus, MessageCircle, Radio, Sparkles, Tv } from "lucide-react";
import { PortalTrustLens } from "@/components/PortalTrustLens";

const SPOTIFY_ARTIST_ID = "3P0GWluMPNZ2xSCVffVGAr";
const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr";

const PROGRAMS = [
  { id: "music", icon: Disc3, title: "Music Listening Room", state: "Verified public listening source", detail: "The Chais The Great artist player is available through the linked public Spotify source.", href: "/music", color: "#1DB954" },
  { id: "scroll-tv", icon: Tv, title: "Scroll TV Program Desk", state: "Storyworld and episode preparation", detail: "Original show concepts, episode planning, source records, and audience programming intent live in the portal.", href: "/scroll-tv", color: "#00D4FF" },
  { id: "visuals", icon: Film, title: "Visual & Episode Studio", state: "Visual source and release preparation", detail: "Visual projects move through production, accessibility, source, and release evidence before a public player source is attached.", href: "/digital-hollywood-studio", color: "#FFB800" },
  { id: "catalog", icon: Sparkles, title: "Creator Media Catalog", state: "Browser-local catalog evidence", detail: "Books, tracks, episodes, and mixed media can be organized through first-party rights, source, accessibility, and release records.", href: "/creator-media-packet", color: "#B98CFF" },
];

const REACTION_CHOICES = ["Ready for the next episode", "Music source found", "Visual source requested", "Add this to my study list"];

export default function MediaHub() {
  const [activeId, setActiveId] = useState(PROGRAMS[0].id);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [reaction, setReaction] = useState("Ready for the next episode");
  const [note, setNote] = useState("");
  const active = useMemo(() => PROGRAMS.find(program => program.id === activeId) ?? PROGRAMS[0], [activeId]);

  const toggleWatchlist = (id: string) => {
    setWatchlist(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
    toast.success(watchlist.includes(id) ? "Removed from this browser’s watchlist." : "Added to this browser’s watchlist.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-16 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <header className="border-b border-[#00D4FF]/20 bg-[radial-gradient(circle_at_top,_rgba(0,212,255,.16),_transparent_45%),linear-gradient(135deg,#050B1A,#0A1628,#050B1A)]">
      <div className="container py-14 md:py-20">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-[.16em] text-[#00D4FF]"><Radio className="h-4 w-4" /> SCROLLVERSE MEDIA SOURCE DESK · PLAYBACK · PROGRAMMING · PARTICIPATION</div>
        <h1 className="mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">Media that visitors can <span className="text-[#00D4FF]">hear, follow, and help shape.</span></h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#D6E2EE]">This first-party media hub gathers the current listening source, Scroll TV programming, visual production pathways, and creator catalog records in one interactive desk. Each program shows its direct operating state so visitors can move from source to story without guessing.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/music" className="rounded-xl bg-[#1DB954] px-5 py-3 text-sm font-black text-[#04120A]">Open music listening room</Link><Link href="/scroll-tv" className="rounded-xl border border-[#00D4FF]/50 px-5 py-3 text-sm font-black text-[#00D4FF]">Open Scroll TV desk</Link><Link href="/owner-workstation" className="rounded-xl border border-[#B98CFF]/50 px-5 py-3 text-sm font-black text-[#D6C4FF]">Owner Workstation</Link></div>
      </div>
    </header>

    <section className="container py-10">
      <PortalTrustLens lane="Media source and interaction" source="First-party ScrollVerse program records and the linked public Spotify artist source. Each pathway names its own source and readiness state." readiness="The Spotify artist player and browser-local participation controls are active. Story, visual, catalog, and release pathways are available as program and evidence workflows." boundary="Operating state: portal media interaction is browser-local until a cleared release source or separately configured live communication provider is attached to that specific program." />

      <section className="mt-8 grid gap-4 lg:grid-cols-4">{PROGRAMS.map(program => { const Icon = program.icon; const selected = program.id === active.id; return <button key={program.id} type="button" onClick={() => setActiveId(program.id)} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: selected ? program.color : "rgba(255,255,255,.13)", background: selected ? `${program.color}13` : "rgba(255,255,255,.025)" }}><Icon className="h-6 w-6" style={{ color: program.color }} /><p className="mt-5 text-[10px] font-mono tracking-[.16em]" style={{ color: program.color }}>{program.state.toUpperCase()}</p><h2 className="mt-2 text-xl font-black">{program.title}</h2><p className="mt-3 text-sm leading-6 text-[#BFD4E5]">{program.detail}</p></button>; })}</section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[.025] p-7">
          <p className="text-xs font-mono tracking-[.16em]" style={{ color: active.color }}>{active.state.toUpperCase()}</p>
          <h2 className="mt-3 text-3xl font-black">{active.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#D6E2EE]">{active.detail}</p>
          {active.id === "music" ? <div className="mt-6 overflow-hidden rounded-2xl border border-[#1DB954]/35"><iframe src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Chais The Great public Spotify listening source" /></div> : <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-black/20 p-6"><p className="text-sm font-bold text-white">Program pathway ready</p><p className="mt-2 text-sm leading-6 text-[#BFD4E5]">This program’s next action is its dedicated production, catalog, or story route. A player source is attached only after the source and release record for that program is complete.</p></div>}
          <div className="mt-6 flex flex-wrap gap-3"><Link href={active.href} className="rounded-xl px-4 py-3 text-sm font-black" style={{ background: `${active.color}22`, border: `1px solid ${active.color}66`, color: active.color }}>Open {active.title} →</Link>{active.id === "music" && <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" className="rounded-xl border border-[#1DB954]/45 px-4 py-3 text-sm font-black text-[#1DB954]">Listen at source ↗</a>}</div>
        </div>
        <aside className="rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[.04] p-7"><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">BROWSER-LOCAL AUDIENCE ROOM</p><h2 className="mt-3 text-2xl font-black">Program your own next move.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Your watchlist, reaction, and note stay in this browser session. They shape your personal navigation inside the hub.</p><button type="button" onClick={() => toggleWatchlist(active.id)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFCC4D] px-4 py-3 text-sm font-black text-[#050B1A]"><ListPlus className="h-4 w-4" />{watchlist.includes(active.id) ? "Remove from watchlist" : "Add active program"}</button><div className="mt-5 flex flex-wrap gap-2">{REACTION_CHOICES.map(choice => <button key={choice} type="button" onClick={() => { setReaction(choice); toast.success("Audience intent updated for this browser session."); }} className="rounded-full border px-3 py-2 text-xs font-bold" style={{ borderColor: reaction === choice ? "#FFCC4D" : "rgba(255,255,255,.16)", color: reaction === choice ? "#FFCC4D" : "#BFD4E5" }}>{choice}</button>)}</div><textarea value={note} onChange={event => setNote(event.target.value)} placeholder="What episode, visual, track, or question should you return to?" rows={5} maxLength={1200} className="mt-5 w-full resize-none rounded-xl border border-white/15 bg-black/20 p-3 text-sm outline-none" /><div className="mt-4 flex items-center gap-2 text-xs text-[#BFD4E5]"><Heart className="h-4 w-4 text-[#FF6B9A]" /> Watchlist: {watchlist.length} · Intent: {reaction}</div></aside>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3"><Info title="Live communication path" icon={<MessageCircle className="h-5 w-5 text-[#00D4FF]" />} text="Operating state: browser-local prompts and program intent are active. A live chat, channel, or social provider joins this desk only after its account, moderation, and release connection are configured." /><Info title="Accessibility pathway" icon={<Sparkles className="h-5 w-5 text-[#00FF88]" />} text="Episode and visual records route through caption, transcript, audio description, source, contributor, and release planning before a public player source is attached." /><Info title="Creator release pathway" icon={<Film className="h-5 w-5 text-[#B98CFF]" />} text="The Creator Media Packet keeps title, source, rights, master, metadata, and release evidence organized without uploading, licensing, distributing, or transacting from this page." /></section>
    </section>
  </main>;
}

function Info({ title, icon, text }: { title: string; icon: React.ReactNode; text: string }) { return <article className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="flex items-center gap-2">{icon}<h3 className="font-black text-white">{title}</h3></div><p className="mt-3 text-sm leading-7 text-[#BFD4E5]">{text}</p></article>; }
