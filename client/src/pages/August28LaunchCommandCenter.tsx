import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CalendarDays, CheckCircle2, ClipboardCheck, Compass, LockKeyhole, Rocket, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type LaunchState = "available now" | "research" | "requires owner release";

type LaunchLane = {
  id: string;
  number: string;
  title: string;
  state: LaunchState;
  summary: string;
  source: string;
  nextInput: string;
  boundary: string;
  href: string;
  action: string;
};

const LANES: LaunchLane[] = [
  {
    id: "evidence",
    number: "01",
    title: "Creator evidence",
    state: "available now",
    summary: "Turn a named original artifact into a readable source, purpose, accessibility, rights, and correction record.",
    source: "Owner-authored co-creation records, visual evidence intake, and the active Vibe Canvas route.",
    nextInput: "One cleared source or asset record with its intended public-display scope.",
    boundary: "No asset import, mint, sale, transfer, third-party likeness, upload, or publication.",
    href: "/vibe-canvas",
    action: "Open Vibe Canvas",
  },
  {
    id: "sku",
    number: "02",
    title: "First creator SKU",
    state: "requires owner release",
    summary: "Prepare the first original catalog record through rights, delivery, customer terms, fulfillment, and provider-release gates.",
    source: "First-SKU Activation Packet and creator catalog readiness controls.",
    nextInput: "Title, approved asset, rights record, price, delivery method, customer terms, and current provider confirmation.",
    boundary: "No product, inventory, checkout, payment, provider action, or revenue claim.",
    href: "/first-sku-activation-packet",
    action: "Open first-SKU packet",
  },
  {
    id: "media",
    number: "03",
    title: "Original media",
    state: "research",
    summary: "Move an episode, song, visual, or look concept from source context into a detailed production and accessibility plan.",
    source: "Episode Experience, fashion lookbook planning, and protected production-intake records.",
    nextInput: "Purpose, narrative, duration, format, aspect ratio, style, references, narration, accessibility, and music-use authorization.",
    boundary: "No music use, generated video, media upload, distribution, or release.",
    href: "/episode-experience",
    action: "Open episode experience",
  },
  {
    id: "learning",
    number: "04",
    title: "Free knowledge",
    state: "available now",
    summary: "Build a visitor-directed learning path that preserves source, date, perspective, limitation, and correction context.",
    source: "Learning Pathways and current source-labeled ScrollVerse research records.",
    nextInput: "One owner-cleared source or perspective with an intended learning scope and accessibility notes.",
    boundary: "No credential claim, professional advice, personal tracking, or hidden paywall.",
    href: "/learning-pathways",
    action: "Open learning pathways",
  },
  {
    id: "release",
    number: "05",
    title: "Exact release gate",
    state: "requires owner release",
    summary: "Make the final action explicit: identify the destination, current evidence, responsible provider, and exact owner confirmation.",
    source: "Continuation Readiness Register and the current fail-closed provider-release standard.",
    nextInput: "The exact provider, destination, action, current evidence, and same-conversation release confirmation.",
    boundary: "No account change, publishing, payment, wallet, contract, token, schedule, repository, or provider action.",
    href: "/continuation-readiness-register",
    action: "Open readiness register",
  },
];

const STATES: Array<LaunchState | "all"> = ["all", "available now", "research", "requires owner release"];

export default function August28LaunchCommandCenter() {
  useSovereignHeartbeat({ page: "august-28-launch-command-center" });
  const [filter, setFilter] = useState<LaunchState | "all">("all");
  const [focusedLane, setFocusedLane] = useState("evidence");

  const visibleLanes = useMemo(
    () => (filter === "all" ? LANES : LANES.filter(lane => lane.state === filter)),
    [filter],
  );
  const focused = LANES.find(lane => lane.id === focusedLane) ?? LANES[0];

  const copyLaunchBrief = () => {
    const brief = [
      "ScrollVerse August 28 Creator Launch Command Center",
      `Focused lane: ${focused.number} / ${focused.title}`,
      `Operating state: ${focused.state}`,
      `Source context: ${focused.source}`,
      `Exact next input: ${focused.nextInput}`,
      `Boundary: ${focused.boundary}`,
      "This browser-local command center does not create external provider, payment, wallet, contract, token, media, repository, or publishing state.",
    ].join("\n");
    navigator.clipboard?.writeText(brief)
      .then(() => toast.success("August 28 launch brief copied."))
      .catch(() => toast.message("Copy is available in a browser with clipboard permission."));
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-20 text-white">
      <section className="overflow-hidden border-b border-[#FFB800]/20 bg-[radial-gradient(circle_at_12%_18%,rgba(255,184,0,.22),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(0,212,255,.18),transparent_27%),linear-gradient(135deg,#120b05_0%,#091429_52%,#061b24_100%)]">
        <div className="container relative py-16 md:py-24">
          <div className="absolute right-4 top-7 hidden h-64 w-64 rounded-full border border-[#FFB800]/25 md:block" />
          <div className="absolute right-20 top-20 hidden h-40 w-40 rounded-full border border-[#00D4FF]/20 md:block" />
          <Link href="/" className="relative inline-flex items-center gap-2 text-xs font-bold text-[#FFE3A0] hover:text-white"><ArrowLeft className="h-4 w-4" />Back to ScrollVerse</Link>
          <p className="relative mt-10 font-mono text-xs tracking-[.25em] text-[#FFCB55]">AUGUST 28 / CREATOR LAUNCH COMMAND CENTER</p>
          <h1 className="relative mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">A birthday milestone built for <span className="text-[#FFE3A0]">real creator movement</span>, one verified lane at a time.</h1>
          <p className="relative mt-6 max-w-3xl text-base leading-7 text-slate-300">This is a browser-local operating surface for the work already underway: original evidence, first-SKU readiness, media planning, free learning, and exact release controls. It makes the next move clear without pretending that an external action has already happened.</p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFB800]/35 bg-[#FFB800]/10 px-4 py-2 text-xs font-bold text-[#FFE3A0]"><CalendarDays className="h-4 w-4" />AUGUST 28 CREATOR MILESTONE</span>
            <span className="rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-4 py-2 text-xs font-bold text-[#B5F7CC]">BROWSER-LOCAL CONTROLS AVAILABLE NOW</span>
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <PortalTrustLens lane="August 28 Creator Launch Command Center" source="Owner-authored ScrollVerse roadmap, Vibe Canvas records, first-SKU packet, production-planning routes, learning pathways, and continuation readiness controls" readiness="Browser-local milestone route available now" boundary="No financial, provider, account, payment, wallet, contract, token, media, repository, schedule, upload, or publishing action is created here." />

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <article className="rounded-[2rem] border border-[#FFB800]/25 bg-[#100e0a]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,.24)] md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="font-mono text-[10px] tracking-[.2em] text-[#FFCB55]">FOCUSED LAUNCH LANE</p><h2 className="mt-2 text-3xl font-black">{focused.number} / {focused.title}</h2></div>
              <span className="rounded-full bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-[#FFE3A0]">{focused.state}</span>
            </div>
            <p className="mt-5 text-base leading-7 text-slate-300">{focused.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-black tracking-widest text-[#B5F7CC]">SOURCE CONTEXT</p><p className="mt-2 text-sm leading-6 text-slate-300">{focused.source}</p></div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-black tracking-widest text-[#FFE3A0]">NEXT REAL INPUT</p><p className="mt-2 text-sm leading-6 text-slate-300">{focused.nextInput}</p></div>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-400"><LockKeyhole className="mr-2 inline h-4 w-4 text-[#FFB800]" />{focused.boundary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={focused.href} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/35 px-4 py-3 text-xs font-black text-[#9DEBFF] hover:bg-[#00D4FF]/10"><Compass className="h-4 w-4" />{focused.action}</Link>
              <button onClick={copyLaunchBrief} className="inline-flex items-center gap-2 rounded-xl bg-[#FFB800] px-4 py-3 text-xs font-black text-[#1a1104] hover:bg-[#ffd26a]"><ClipboardCheck className="h-4 w-4" />Copy launch brief</button>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#00D4FF]/20 bg-[linear-gradient(150deg,rgba(0,212,255,.09),rgba(0,0,0,.16))] p-6 md:p-8">
            <div className="flex items-center gap-3"><Rocket className="h-5 w-5 text-[#00D4FF]" /><div><p className="font-mono text-[10px] tracking-[.2em] text-[#00D4FF]">BIRTHDAY MILESTONE RHYTHM</p><h2 className="mt-1 text-2xl font-black">From record to release</h2></div></div>
            <div className="mt-6 space-y-3">
              {[
                "Name one original work or source record.",
                "Set its public purpose, access needs, and rights/custody context.",
                "Complete the delivery, production, or provider requirements for that lane.",
                "Make the final destination and owner release decision explicit.",
              ].map((item, index) => <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00D4FF]/15 text-xs font-black text-[#9DEBFF]">{index + 1}</span><p className="text-sm leading-6 text-slate-300">{item}</p></div>)}
            </div>
            <p className="mt-6 rounded-2xl border border-[#FFB800]/25 bg-[#FFB800]/[.07] p-4 text-xs leading-5 text-[#FFE3A0]"><Sparkles className="mr-2 inline h-4 w-4" />The strongest launch claim is the work visitors can inspect: its source, operating state, next input, and owner-controlled release path.</p>
          </article>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" aria-label="Filter August 28 launch lanes">
          {STATES.map(state => <button key={state} onClick={() => setFilter(state)} aria-pressed={filter === state} className={`rounded-full px-4 py-2 text-xs font-black capitalize transition ${filter === state ? "bg-[#FFB800] text-[#1a1104]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{state}</button>)}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleLanes.map(lane => <article key={lane.id} className={`rounded-3xl border p-6 transition ${focusedLane === lane.id ? "border-[#FFB800]/70 bg-[#FFB800]/[.1]" : "border-white/10 bg-white/[.025] hover:border-[#00D4FF]/35"}`}>
            <p className="font-mono text-[10px] tracking-[.18em] text-[#FFCB55]">LANE {lane.number}</p>
            <div className="mt-4 flex items-start justify-between gap-3"><h2 className="text-xl font-black">{lane.title}</h2><span className="text-[10px] font-bold text-[#B5F7CC]">{lane.state}</span></div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{lane.summary}</p>
            <button onClick={() => { setFocusedLane(lane.id); toast.success(`${lane.title} is now the focused August 28 lane.`); }} className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#9DEBFF] hover:text-white"><CheckCircle2 className="h-4 w-4" />Focus this lane</button>
          </article>)}
        </div>

        <section className="mt-12 rounded-[2rem] border border-[#00FF88]/25 bg-[#00FF88]/[.045] p-6 md:p-8">
          <p className="font-mono text-[10px] tracking-[.22em] text-[#B5F7CC]">CREATOR CONTROL STANDARD</p>
          <h2 className="mt-3 text-2xl font-black">The birthday milestone stays open, original, and owner-directed.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">Every public release starts with the creator’s actual work and finishes with an explicit release decision. Visitors can study the source trail and available pathways; provider-side operations remain separate until current evidence and the exact lane decision are supplied. Free knowledge stays accessible, and youth-facing material requires adult-supported participation guidance.</p>
        </section>
      </section>
    </main>
  );
}
