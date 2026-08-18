import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type RecordState = "source record" | "owner interpretation" | "research" | "requires owner release";

const stateStyles: Record<RecordState, { color: string; bg: string }> = {
  "source record": { color: "#9AEFFF", bg: "rgba(0,212,255,.13)" },
  "owner interpretation": { color: "#D6C4FF", bg: "rgba(185,140,255,.14)" },
  research: { color: "#8DFFBE", bg: "rgba(0,255,136,.12)" },
  "requires owner release": { color: "#FFCC4D", bg: "rgba(255,184,0,.14)" },
};

const archiveRows: Array<{ label: string; value: string; state: RecordState; note: string }> = [
  { label: "Birthplace context", value: "St. Luke’s Hospital · Harlem, New York", state: "source record", note: "Owner-provided family and biographical context for this archival record." },
  { label: "Time reference", value: "7:00 p.m. · “God hour”", state: "source record", note: "Owner-provided time marker; retained as a personal legacy reference." },
  { label: "Screen observation", value: "08:28 · New York · 78°", state: "source record", note: "Owner-supplied screenshot observation. The display is retained for review; this route does not independently validate its weather source or infer causation." },
  { label: "Physical-location context", value: "721 Embassy Terrace · Vineland, New Jersey", state: "source record", note: "Owner-provided location context associated with the screen observation." },
  { label: "Meaning in the record", value: "Harlem → Vineland synchronization", state: "owner interpretation", note: "The owner’s stated reading of the visible date, time, location, and weather-style details." },
];

const collectionWorlds = [
  { title: "Signal Ledger", state: "research" as RecordState, accent: "#00D4FF", type: "Archive-fashion world", description: "Deep-cyan field jackets, rose-gold signal tabs, and time-stamp patterning for an original visual archive line." },
  { title: "Lantern Court", state: "research" as RecordState, accent: "#FFB800", type: "Original basketball-city world", description: "An original city-court hero system built from movement, craft, neighborhood light, and family storytelling—not teams, athletes, or celebrity likenesses." },
  { title: "Promise Land Field Notes", state: "requires owner release" as RecordState, accent: "#B98CFF", type: "Illustrated legacy book", description: "A family-centered illustrated story and lookbook concept connecting Harlem, Vineland, memory, travel, and original designs." },
  { title: "Proofwalk Toys", state: "research" as RecordState, accent: "#00FF88", type: "Original toy and collectible study", description: "A character-led play and display concept for original figures, accessories, story cards, and maker activities." },
  { title: "Family Letter Press", state: "requires owner release" as RecordState, accent: "#FF6B9A", type: "Letters and artifact lane", description: "Private family messages, handwriting, screenshots, and memory materials prepared for selective archival treatment." },
];

export default function HarlemVinelandLegacy() {
  useSovereignHeartbeat({ page: "harlem-vineland-legacy" });
  const [expanded, setExpanded] = useState<string | null>("Birthplace context");

  const copyArchiveDraft = async () => {
    const draft = `HARLEM–VINELAND SYNCHRONIZATION & LEGACY RECORD\n\nWorking title: \nSource / date: \nVisible time or screen text: \nOwner-provided location context: \nWhat is directly observable: \nOwner interpretation: \nAlternative explanation or missing record: \nAccessibility transcript / alt text: \nIntended use and destination: \nOperating state: research / requires owner release / available now\nOwner release decision: \nCorrection path: `;
    try {
      await navigator.clipboard.writeText(draft);
      toast.success("Legacy-record starter copied locally.");
    } catch {
      toast.error("Copy is unavailable in this browser. You can select the record fields on this page.");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B1A] px-4 py-10 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/synchronizations" className="text-sm font-black text-[#9AEFFF] transition hover:text-white">← Synchronizations</Link>
          <div className="flex flex-wrap gap-2">
            <Link href="/fashion-artifact-atlas" className="rounded-lg border border-[#FFB800]/45 px-3 py-2 text-xs font-black text-[#FFCC4D]">Fashion & Artifact Atlas</Link>
            <Link href="/creator-collection-records" className="rounded-lg border border-[#B98CFF]/45 px-3 py-2 text-xs font-black text-[#D6C4FF]">Collection records</Link>
          </div>
        </div>

        <header className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#00D4FF]/30 px-7 py-10 sm:px-12 sm:py-14" style={{ background: "radial-gradient(circle at 12% 16%, rgba(0,212,255,.20), transparent 26%), radial-gradient(circle at 88% 12%, rgba(255,184,0,.18), transparent 26%), radial-gradient(circle at 53% 105%, rgba(185,140,255,.20), transparent 38%), #071124" }}>
          <div className="pointer-events-none absolute right-[11%] top-10 h-48 w-48 rounded-full border border-[#FFB800]/20" />
          <div className="pointer-events-none absolute right-[15%] top-14 h-40 w-40 rounded-full border border-[#00D4FF]/25" />
          <div className="relative max-w-5xl">
            <p className="text-xs font-mono tracking-[.20em] text-[#00D4FF]">HARLEM → VINELAND · PERSONAL LEGACY RECORD</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">Keep the moment visible.<br /><span className="text-[#FFB800]">Build the world around the record.</span></h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">This first-party archive carries the owner’s Harlem birth context, a 7:00 p.m. time reference, an 08:28 / 78° screen observation, and Vineland location context into a living legacy lane for original fashion, story, toy, and artifact worlds.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#record" className="rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-black text-[#050B1A] transition hover:bg-white">Read the record ↓</a>
              <button type="button" onClick={copyArchiveDraft} className="rounded-xl border border-[#00D4FF]/55 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9AEFFF]">Copy archive-record starter</button>
            </div>
          </div>
          <div className="relative mt-9 grid gap-3 sm:grid-cols-4">
            {[{ value: "Harlem", label: "birthplace context", color: "#00D4FF" }, { value: "7:00", label: "time reference", color: "#FFB800" }, { value: "08:28", label: "screen observation", color: "#B98CFF" }, { value: "Vineland", label: "location context", color: "#00FF88" }].map(item => <div key={item.label} className="rounded-2xl border border-white/10 bg-[#050B1A]/55 p-4 backdrop-blur"><p className="font-mono text-xl font-black" style={{ color: item.color }}>{item.value}</p><p className="mt-1 text-xs text-[#B8C7D6]">{item.label}</p></div>)}
          </div>
        </header>

        <div className="mt-8">
          <PortalTrustLens lane="First-party personal legacy archive, original basketball-city worldbuilding, fashion, toys, story artifacts, and remembrance research" source="Owner-provided birth/time/location context, screenshots, family-message context, and protected visual intake batch" readiness="The local archive route and original collection pathways are ready for research, source review, and release-packet preparation. Supplied images remain individually classified as research." boundary="This page does not treat a screen display as proof of causation, does not display third-party sports/public-person likenesses as collection assets, and does not create a token, sale, fundraiser, incentive, price, wallet, marketplace, or commercial offer." />
        </div>

        <section id="record" className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.035] p-6 sm:p-8">
            <p className="text-xs font-mono tracking-[.18em] text-[#9AEFFF]">ARCHIVE RECORD · SOURCE AND INTERPRETATION KEPT DISTINCT</p>
            <h2 className="mt-3 text-3xl font-black">The Harlem–Vineland observation</h2>
            <div className="mt-6 space-y-3">
              {archiveRows.map(row => {
                const state = stateStyles[row.state];
                const isOpen = expanded === row.label;
                return <article key={row.label} className="rounded-2xl border border-white/10 bg-[#050B1A]/60 p-4"><button type="button" onClick={() => setExpanded(isOpen ? null : row.label)} className="flex w-full items-center justify-between gap-4 text-left"><div><p className="text-xs font-mono tracking-[.12em] text-[#8EA2B8]">{row.label}</p><h3 className="mt-1 text-lg font-black text-white">{row.value}</h3></div><span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.08em]" style={{ color: state.color, background: state.bg }}>{row.state}</span></button>{isOpen && <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-[#D6E2EE]">{row.note}</p>}</article>;
              })}
            </div>
          </div>

          <aside className="rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[.045] p-6 sm:p-8">
            <p className="text-xs font-mono tracking-[.18em] text-[#FFCC4D]">REMEMBRANCE AND PUBLIC CARE · RESEARCH PATHWAY</p>
            <h2 className="mt-3 text-3xl font-black">Honor the record with care.</h2>
            <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">A future public remembrance page can recognize lives, service, rebuilding, and family stories only from verified and appropriately licensed sources. It is not a fundraiser, benefit program, or incentive campaign on this route.</p>
            <div className="mt-6 space-y-3">
              {["Use authoritative memorial and public-service records for any named remembrance list.", "Obtain permission before publishing private family stories, letters, images, or contact details.", "Keep any charitable, rebuilding, or support initiative separate until its purpose, partner, terms, and outcome record are verified."].map((item, index) => <div key={item} className="flex gap-3 rounded-2xl border border-[#FFB800]/20 bg-[#050B1A]/55 p-4"><span className="font-mono text-[#FFCC4D]">0{index + 1}</span><p className="text-sm leading-6 text-[#D6E2EE]">{item}</p></div>)}
            </div>
          </aside>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.18em] text-[#B98CFF]">ORIGINAL COLLECTION WORLDS</p><h2 className="mt-2 text-3xl font-black">New characters. New looks. New artifacts.</h2></div><Link href="/production-control" className="rounded-lg border border-[#00FF88]/45 px-4 py-2 text-sm font-black text-[#8DFFBE]">Open production controls →</Link></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collectionWorlds.map(world => { const state = stateStyles[world.state]; return <article key={world.title} className="relative overflow-hidden rounded-3xl border p-6" style={{ borderColor: `${world.accent}55`, background: `linear-gradient(145deg, ${world.accent}18, rgba(5,11,26,.96) 68%)` }}><div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border opacity-50" style={{ borderColor: world.accent }} /><div className="relative"><div className="flex items-start justify-between gap-3"><p className="text-xs font-mono tracking-[.14em]" style={{ color: world.accent }}>{world.type}</p><span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.07em]" style={{ color: state.color, background: state.bg }}>{world.state}</span></div><h3 className="mt-6 text-2xl font-black">{world.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{world.description}</p><p className="mt-6 border-t border-white/10 pt-4 text-xs text-[#B8C7D6]">Source / rights / accessibility / intended destination / owner release required before public release.</p></div></article>; })}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-[#00FF88]/25 bg-[#00FF88]/[.035] p-7">
          <p className="text-xs font-mono tracking-[.18em] text-[#8DFFBE]">COLLECTION METHOD</p>
          <h2 className="mt-2 text-2xl font-black">The visual archive stays protected while the original world grows.</h2>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-[#D6E2EE]">The current visual intake is a private research archive. The public collection begins with original collection names, characters, visual systems, and accessible descriptions. A selected source image can only move into an exhibition, publication, product, collectible record, or destination packet after its individual provenance, rights, accessibility, intended-use, and owner-release fields are complete.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/fashion-artifact-atlas" className="rounded-lg border border-[#00FF88]/45 px-4 py-2 text-sm font-black text-[#8DFFBE]">Fashion & Artifact Atlas →</Link><Link href="/creator-collection-records" className="rounded-lg border border-[#00FF88]/45 px-4 py-2 text-sm font-black text-[#8DFFBE]">Collection records →</Link><Link href="/synchronizations" className="rounded-lg border border-[#00FF88]/45 px-4 py-2 text-sm font-black text-[#8DFFBE]">Synchronization story lane →</Link></div>
        </section>
      </section>
    </main>
  );
}
