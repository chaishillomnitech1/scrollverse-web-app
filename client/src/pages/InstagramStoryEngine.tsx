import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type Pillar = {
  title: string;
  format: string;
  release: "available now" | "research" | "requires owner release";
  description: string;
  color: string;
};

const pillars: Pillar[] = [
  { title: "Fashion Signatures", format: "Carousel or hero visual", release: "research", description: "Original looks, color systems, maker notes, and the Fashion & Artifact Atlas pathway. Individual visuals require their own source, rights, mark, accessibility, and owner-release record.", color: "#FF8A4C" },
  { title: "Original Story Worlds", format: "Captioned Reel or carousel", release: "available now", description: "Creator-controlled story discovery through Digital Ships, Manus Hero, books, and youth-aware exploration routes.", color: "#B98CFF" },
  { title: "ScrollStorm Process", format: "Audio-first short or visualizer", release: "requires owner release", description: "Original music process, working title, and production context only after master/composition, contributor, cover, caption, and destination records are complete.", color: "#00D4FF" },
  { title: "Build Proof", format: "Carousel or concise post", release: "available now", description: "Public-facing summaries of routes, learning structures, creator tools, and evidence records without claiming unverified performance or platform integration.", color: "#00FF88" },
  { title: "Community Agency", format: "Prompt-led Story or carousel", release: "research", description: "Invitations to reflect, suggest, and co-create through moderated, creator-controlled ScrollVerse pathways rather than account-based promises.", color: "#FFB800" },
  { title: "Afrofuturist Design", format: "Hero visual or design study", release: "research", description: "Original design language using the ScrollVerse deep-space, cyan, gold, emerald, and violet visual system.", color: "#FF6B9A" },
];

const slots = [
  { time: "07:00 ET", format: "Story sequence or value-led carousel", purpose: "Open the day with a saveable learning, fashion, story, or build-proof insight." },
  { time: "12:00 ET", format: "Carousel or single visual post", purpose: "Present a focused original idea with a clear source label and a practical call to action." },
  { time: "18:00 ET", format: "6–15 second captioned Reel or hero post", purpose: "Close the cycle with a compact, accessible visual or story-forward moment." },
];

export default function InstagramStoryEngine() {
  useSovereignHeartbeat({ page: "instagram-story-engine" });
  const [activePillar, setActivePillar] = useState(pillars[0].title);
  const active = useMemo(() => pillars.find(pillar => pillar.title === activePillar) ?? pillars[0], [activePillar]);

  const copyBrief = async () => {
    const brief = `SCROLLVERSE GLOBAL STORY ENGINE — CONTENT BRIEF\n\nPillar: ${active.title}\nSuggested format: ${active.format}\nOperating state: ${active.release}\nCreative direction: ${active.description}\n\nRequired before publication: final source/version; creator and rights context; brand/mark/likeness check as needed; concise alt text or accurate captions; intended destination; owner release decision; post permalink/result after verified publication.\n\nCurrent status: schedule active for 07:00, 12:00, and 18:00 America/New_York; Instagram connector not enabled in the current task configuration, with no active authorized account selected. Do not claim publication until the external post result is recorded.`;
    try {
      await navigator.clipboard.writeText(brief);
      toast.success("Social content brief copied. It remains a browser-local preparation record.");
    } catch {
      toast.error("Copy is unavailable in this browser. You can select the brief text manually.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-sm font-black text-[#00D4FF] transition hover:text-white">← Return to ScrollVerse</Link><div className="flex flex-wrap gap-3"><Link href="/creator-channel-hub" className="rounded-lg border border-[#FF6B9A]/45 px-3 py-2 text-xs font-black text-[#FF9EB9]">Creator Channels</Link><Link href="/fashion-artifact-atlas" className="rounded-lg border border-[#FF8A4C]/45 px-3 py-2 text-xs font-black text-[#FFB37C]">Fashion & Artifacts</Link><Link href="/media-readiness-lab" className="rounded-lg border border-[#00D4FF]/45 px-3 py-2 text-xs font-black text-[#9AEFFF]">Media Readiness</Link></div></div>

        <header className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#FF6B9A]/35 p-8 sm:p-12" style={{ background: "radial-gradient(circle at 12% 12%, rgba(255,107,154,.18), transparent 29%), radial-gradient(circle at 88% 18%, rgba(0,212,255,.17), transparent 30%), radial-gradient(circle at 70% 88%, rgba(255,184,0,.14), transparent 33%), #071124" }}>
          <div className="pointer-events-none absolute -right-6 top-8 h-60 w-60 rounded-full border border-[#00D4FF]/25" /><div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full border border-[#FFB800]/20" />
          <div className="relative max-w-5xl"><p className="text-xs font-mono tracking-[.2em] text-[#FF9EB9]">SCROLLVERSE GLOBAL STORY ENGINE · INSTAGRAM</p><h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">A content rhythm with a visible record of what is—and is not—connected.</h1><p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">The current task includes an active three-slot publishing schedule for 07:00, 12:00, and 18:00 America/New_York. It directs original work across fashion, story worlds, ScrollStorm process, build proof, community, and Afrofuturist design. The current Instagram connector is disabled and no active authorized account is selected, so this page presents a creator-controlled preparation system—not a record of live posting.</p><div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={copyBrief} className="rounded-xl bg-[#FF6B9A] px-5 py-3 text-sm font-black text-[#050B1A] transition hover:bg-white">Copy current content brief</button><a href="#schedule" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9AEFFF] transition hover:border-[#00D4FF]">View schedule record ↓</a></div></div>
          <div className="relative mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-[#00FF88]/30 bg-[#00FF88]/10 p-4"><p className="font-mono text-sm font-black text-[#00FF88]">ACTIVE</p><p className="mt-1 text-xs text-[#D6E2EE]">current task schedule</p></div><div className="rounded-2xl border border-[#FFB800]/30 bg-[#FFB800]/10 p-4"><p className="font-mono text-sm font-black text-[#FFCC4D]">3 SLOTS / DAY</p><p className="mt-1 text-xs text-[#D6E2EE]">07:00 · 12:00 · 18:00 ET</p></div><div className="rounded-2xl border border-[#FF6B9A]/30 bg-[#FF6B9A]/10 p-4"><p className="font-mono text-sm font-black text-[#FF9EB9]">RECONNECT REQUIRED</p><p className="mt-1 text-xs text-[#D6E2EE]">connector disabled; no active account</p></div></div>
        </header>

        <PortalTrustLens lane="Scheduled social publishing preparation and creator channel discovery" source="Current-task schedule configuration and current-task Instagram connector configuration, inspected August 15, 2026." readiness="The schedule is configured and active. In the current task configuration, the Instagram connector is disabled and no active authorized account is selected, so no external post or publication result is asserted here." boundary="This page does not connect, reconnect, authorize, post to, schedule media on, retrieve analytics from, or establish ownership of an Instagram account. It does not claim a post has published unless a verified permalink and result are separately recorded." />

        <section id="schedule" className="mt-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">SCHEDULE RECORD</p><h2 className="mt-2 text-3xl font-black">Three daily moments, each with a distinct creative job.</h2></div><p className="text-sm text-[#B8C7D6]">Timezone · America/New_York</p></div><div className="mt-6 grid gap-4 md:grid-cols-3">{slots.map((slot, index) => <article key={slot.time} className="rounded-3xl border border-[#00D4FF]/30 bg-[#00D4FF]/[.055] p-6"><p className="font-mono text-xs text-[#9AEFFF]">SLOT 0{index + 1}</p><h3 className="mt-2 text-3xl font-black text-[#00D4FF]">{slot.time}</h3><p className="mt-4 text-sm font-black text-white">{slot.format}</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{slot.purpose}</p></article>)}</div></section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><article className="rounded-3xl border border-white/10 bg-white/[.025] p-6"><p className="text-xs font-mono tracking-[.18em] text-[#FF9EB9]">CONTENT PILLARS</p><div className="mt-5 space-y-3">{pillars.map(pillar => <button key={pillar.title} type="button" onClick={() => setActivePillar(pillar.title)} className="w-full rounded-2xl border p-4 text-left transition" style={{ borderColor: activePillar === pillar.title ? pillar.color : "rgba(255,255,255,.13)", background: activePillar === pillar.title ? `${pillar.color}13` : "rgba(0,0,0,.12)" }}><p className="font-black" style={{ color: pillar.color }}>{pillar.title}</p><p className="mt-1 text-xs text-[#B8C7D6]">{pillar.format}</p></button>)}</div></article><article className="rounded-3xl border p-7" style={{ borderColor: `${active.color}55`, background: `${active.color}0D` }}><p className="text-xs font-mono tracking-[.18em]" style={{ color: active.color }}>ACTIVE PREPARATION LANE</p><h2 className="mt-3 text-3xl font-black">{active.title}</h2><span className="mt-4 inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.1em]" style={{ background: `${active.color}18`, color: active.color }}>{active.release}</span><p className="mt-5 max-w-3xl text-base leading-8 text-[#D6E2EE]">{active.description}</p><div className="mt-6 rounded-2xl border border-white/10 bg-[#050B1A]/60 p-5"><p className="text-xs font-mono" style={{ color: active.color }}>PUBLICATION RECORD, ONCE CONNECTED</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">Timestamp · creative pillar · format · caption · hashtags · source/version · accessible alt text or video captions · operating state · owner release · permalink/result. If the external account remains unavailable, the schedule must log the connection state and not describe the content as posted.</p></div></article></section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2"><article className="rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[.055] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#FFCC4D]">ACCOUNT GATE</p><h2 className="mt-3 text-2xl font-black">The schedule can prepare; the account connection decides whether it may publish.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Before any external post, the designated Instagram account must be explicitly reconnected through the authorized integration interface, selected for this task, and confirmed for the intended content. A schedule flag or a copied status message is not a substitute for that authorization.</p></article><article className="rounded-3xl border border-[#00FF88]/30 bg-[#00FF88]/[.055] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#00FF88]">ACCESSIBILITY & ORIGINALITY</p><h2 className="mt-3 text-2xl font-black">Every public item needs an accessible, original, source-aware package.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Use concise alt text for still images, accurate captions for video, and original words, visuals, music, and character identities. Fashion, music, and story items move from research to release only after the individual source, contributor, rights, accessibility, destination, and owner-release records are ready.</p></article></section>

        <footer className="mt-10 border-t border-white/10 py-8 text-center"><p className="text-xs font-mono tracking-[.15em] text-[#8EA2B8]">SCROLLVERSE GLOBAL STORY ENGINE · SOURCE-LABELED CREATOR PUBLISHING · KUN FAYAKŪN × ∞</p></footer>
      </section>
    </main>
  );
}
