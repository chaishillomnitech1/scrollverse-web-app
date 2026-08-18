import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const CHAPTERS = [
  { id: "signal", number: "01", title: "The Signal Library", color: "#00D4FF", premise: "A city archive begins answering questions in patterns of light. The Hero does not own the answers; he helps the crew preserve the question, its source, and its next kind step." },
  { id: "bridge", number: "02", title: "The Bridge of Many Hands", color: "#FFB800", premise: "A story fragment crosses neighborhoods, languages, and generations. The crew learns that a bridge is not a shortcut—it is a promise to carry every contributor’s name." },
  { id: "return", number: "03", title: "The Return Map", color: "#B98CFF", premise: "When a creation is ready to travel, the crew builds its release map: access notes, credits, consent, and a way back for every correction." },
] as const;

const CREW = [
  { name: "Manus Hero", role: "The pattern scribe", color: "#00D4FF", detail: "An original ScrollVerse fiction guide who turns a question into a map without deciding for anyone." },
  { name: "Chais the Wayfinder", role: "The creator captain", color: "#FFB800", detail: "A first-party story role who keeps the world rooted in imagination, responsibility, and creator control." },
  { name: "Luma Vale", role: "The access architect", color: "#00FF88", detail: "A story guide who asks how every voice can enter the page, including through captions, descriptions, and quiet modes." },
  { name: "Orin Bridge", role: "The sound courier", color: "#B98CFF", detail: "A sound-world guide who turns rhythm into scene cues while keeping every score and voice release-ready." },
] as const;

export default function ManusHero() {
  useSovereignHeartbeat({ page: "manus-hero" });
  const [chapterId, setChapterId] = useState("signal");
  const [seed, setSeed] = useState("");
  const [blueprint, setBlueprint] = useState("");
  const chapter = CHAPTERS.find(item => item.id === chapterId) ?? CHAPTERS[0];
  const voiceCue = useMemo(() => `Manus Hero Story Universe. Chapter ${chapter.number}: ${chapter.title}. ${chapter.premise}`, [chapter]);

  const buildBlueprint = () => {
    if (!seed.trim()) {
      toast.error("Add one story seed before building a local episode blueprint.");
      return;
    }
    setBlueprint(`MANUS HERO STORY UNIVERSE · ${chapter.title.toUpperCase()}\nStory seed: ${seed.trim()}\nNext visual: choose one clear image that carries the question.\nNext sound cue: choose silence, rhythm, or a single spoken line.\nRelease state: browser-local outline only.\nBefore public use: confirm source, character/brand rules, contributors, accessibility, youth guidance, and owner release.`);
    toast.success("A browser-local episode blueprint is ready to review.");
  };

  const playCue = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.info("Read the story cue on screen; this browser does not expose local speech synthesis.");
      return;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(voiceCue));
    toast.success("Playing a browser-local story cue. No external voice service or recording is used.");
  };

  return (
    <main className="min-h-screen bg-[#040A16] text-white">
      <section className="relative overflow-hidden border-b border-[#00D4FF]/20 px-4 pb-16 pt-24 sm:pb-24 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(0,212,255,.16),transparent_30%),radial-gradient(circle_at_85%_28%,rgba(255,184,0,.17),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(185,140,255,.14),transparent_36%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/digital-ships" className="rounded-full border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-4 py-2 text-xs font-black tracking-[.14em] text-[#00D4FF]">← DIGITAL SHIPS</Link><span className="rounded-full border border-[#FFB800]/40 bg-[#FFB800]/10 px-4 py-2 text-xs font-black tracking-[.14em] text-[#FFCC4D]">ORIGINAL STORY UNIVERSE · RESEARCH</span></div>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div><p className="font-mono text-xs tracking-[.24em] text-[#00D4FF]">SCROLLVERSE PRESENTS</p><h1 className="mt-5 max-w-4xl text-5xl font-black leading-[.92] sm:text-7xl">Manus Hero<br /><span className="text-[#FFB800]">Story Universe.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#C4D0E0]">An original comic, animation, music, and learning world about carrying a bright question through a living city—together, carefully, and with every creator’s name in view.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/junior-movies" className="rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-black text-[#08101E]">Enter Junior Movies</Link><Link href="/books" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#00D4FF]">Read story worlds</Link><Link href="/creator-media-packet" className="rounded-xl border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#D6C4FF]">Prepare a release packet</Link></div></div>
            <div className="rounded-[2rem] border border-[#FFCC4D]/40 bg-[#071426]/85 p-7 shadow-[0_24px_70px_rgba(0,0,0,.35)]"><p className="font-mono text-xs tracking-[.2em] text-[#FFCC4D]">UNIVERSE RULE</p><p className="mt-5 text-3xl font-black leading-tight">“The page becomes powerful when every person can find the way in.”</p><div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs"><div className="rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/[.06] p-3"><span className="block text-lg font-black text-[#00D4FF]">SOURCE</span><span className="text-[#AABCCC]">kept visible</span></div><div className="rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/[.06] p-3"><span className="block text-lg font-black text-[#FFCC4D]">CARE</span><span className="text-[#AABCCC]">built in</span></div><div className="rounded-xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.06] p-3"><span className="block text-lg font-black text-[#D6C4FF]">CHOICE</span><span className="text-[#AABCCC]">stays human</span></div></div></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16"><p className="font-mono text-xs tracking-[.2em] text-[#B98CFF]">THE STORY CREW</p><h2 className="mt-3 text-3xl font-black">Original guides for an original world.</h2><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{CREW.map(member => <article key={member.name} className="rounded-3xl border bg-white/[.025] p-5" style={{ borderColor: `${member.color}55` }}><p className="font-mono text-[10px] tracking-[.18em]" style={{ color: member.color }}>{member.role.toUpperCase()}</p><h3 className="mt-3 text-xl font-black">{member.name}</h3><p className="mt-3 text-sm leading-6 text-[#B8C7D6]">{member.detail}</p></article>)}</div></section>

      <section className="border-y border-[#00D4FF]/15 bg-[#071323] px-4 py-16"><div className="mx-auto max-w-6xl"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="font-mono text-xs tracking-[.2em] text-[#00D4FF]">SEASON ZERO · STORY COMPASS</p><h2 className="mt-3 text-3xl font-black">Choose a chapter. Build a private next step.</h2></div><button type="button" onClick={playCue} className="rounded-xl border border-[#00D4FF]/55 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#00D4FF]">Play local story cue</button></div><div className="mt-8 grid gap-5 lg:grid-cols-[.82fr_1.18fr]"><div className="space-y-3">{CHAPTERS.map(item => <button key={item.id} type="button" aria-pressed={chapterId === item.id} onClick={() => { setChapterId(item.id); setBlueprint(""); }} className="w-full rounded-2xl border p-5 text-left" style={{ borderColor: chapterId === item.id ? item.color : `${item.color}44`, background: chapterId === item.id ? `${item.color}16` : "rgba(4,10,22,.65)" }}><span className="font-mono text-xs" style={{ color: item.color }}>CHAPTER {item.number}</span><span className="mt-2 block text-xl font-black">{item.title}</span><span className="mt-2 block text-xs leading-6 text-[#B8C7D6]">{item.premise}</span></button>)}</div><div className="rounded-3xl border border-[#FFB800]/30 bg-[#040A16] p-6 sm:p-8"><p className="font-mono text-xs tracking-[.18em]" style={{ color: chapter.color }}>ACTIVE CHAPTER · {chapter.title.toUpperCase()}</p><p className="mt-4 text-lg leading-8 text-[#D6E2EE]">{chapter.premise}</p><label className="mt-6 block text-sm font-bold" htmlFor="manus-hero-seed">Your private story seed</label><textarea id="manus-hero-seed" value={seed} onChange={event => setSeed(event.target.value)} className="mt-3 min-h-36 w-full rounded-2xl border border-white/15 bg-white/[.03] p-4 text-sm leading-6 outline-none focus:border-[#FFB800]/70" placeholder="Describe one scene, song cue, lesson, character choice, or world detail you want to explore…" /><button type="button" onClick={buildBlueprint} className="mt-4 rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-black text-[#08101E]">Create local episode blueprint</button>{blueprint && <pre className="mt-6 whitespace-pre-wrap rounded-2xl border border-[#B98CFF]/40 bg-[#B98CFF]/[.07] p-4 font-mono text-xs leading-6 text-[#E7DFFF]" aria-live="polite">{blueprint}</pre>}</div></div></div></section>

      <section className="mx-auto max-w-6xl px-4 py-16"><div className="rounded-3xl border border-[#00FF88]/35 bg-[#00FF88]/[.045] p-6 text-sm leading-7 text-[#C4D0E0]"><span className="font-black text-[#00FF88]">Youth-aware creation:</span> Story seeds remain browser-local. This universe does not create profiles, collect public reactions, send messages, or publish a young creator’s idea automatically. Any contributor material needs adult support where applicable, consent, source and rights review, accessibility preparation, moderation, and an owner-controlled release decision.</div><div className="mt-10"><PortalTrustLens lane="Manus Hero Story Universe" source="Original ScrollVerse story-universe blueprint and owner-directed creative request." readiness="Available now as a browser-local story compass, voice-ready cue, and private episode-blueprint tool. No animation channel, public submission feed, external AI actor, media release, or merchandise offering is active." boundary="Manus Hero is an original fiction guide within this ScrollVerse experience; it does not represent an autonomous external system, an official partner character, or a live entertainment service. Each future episode, score, visual, book, channel entry, or product requires its own source, rights, accessibility, contributor, youth-safety, and owner-release record." correctionHref="/creator-media-packet" /></div></section>
    </main>
  );
}
